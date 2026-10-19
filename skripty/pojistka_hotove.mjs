import { parseExpression } from '@babel/parser';
import { execFileSync } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const VYJIMKY = '/Users/Shared/Omega/koordinace/vyjimky-hotove.md';
const hash = b => createHash('sha256').update(b).digest('hex');
export function vyjimky(text) {
  return new Set(text.split('\n').flatMap(line => {
    const m = line.match(/^\s*(public\/materialy\/[^|]+|src\/data\/temata\.ts)\s*\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*(.+?)\s*$/);
    return m && /[„“"«][^„“"»]{5,}[“"»]/u.test(m[3]) && !Number.isNaN(Date.parse(m[2])) ? [m[1].trim()] : [];
  }));
}
// Diff obsahuje jen omezený kontext; celý temata.ts se nenačítá.
function objekty(text) {
  const stack = [], spans = [];
  let quote = null, comment = null;
  for (let i=0;i<text.length;i++) {
    const c=text[i], n=text[i+1];
    if (comment === 'line') { if(c === '\n') comment=null; continue; }
    if (comment === 'block') { if(c === '*' && n === '/') {comment=null;i++;} continue; }
    if (quote) { if(c === '\\') i++; else if(c === quote) quote=null; continue; }
    if(c === '/' && n === '/') {comment='line';i++;continue;}
    if(c === '/' && n === '*') {comment='block';i++;continue;}
    if(['"', "'", '`'].includes(c)) {quote=c;continue;}
    if(c === '{') stack.push(i);
    if(c === '}' && stack.length) spans.push([stack.pop(),i+1]);
  }
  return spans;
}
export function zmenyMaterialu(diff) {
  const paths = new Set();
  for (const hunk of diff.split(/^@@.*@@.*$/m).slice(1)) {
    for (const sign of ['-', '+']) {
      const lines = hunk.split('\n').filter(l => l.startsWith(' ') || l.startsWith(sign));
      let text='', changes=[];
      for(const line of lines) {
        if(line.startsWith(sign)) changes.push([text.length,text.length+line.length-1]);
        text+=line.slice(1)+'\n';
      }
      const covered = new Set();
      for(const [start,end] of objekty(text)) {
        const touched=changes.map(([a,b],i)=>a<end && b>start ? i : -1).filter(i=>i>=0);
        if(!touched.length) continue;
        const part=text.slice(start,end);
        let obj;
        try {obj=parseExpression(part, {plugins:['typescript']});} catch {
          if(part.includes('/materialy/')) throw new Error('Materiálový objekt v diffu nelze bezpečně rozpoznat.');
          continue;
        }
        if(obj.type !== 'ObjectExpression') continue;
        const hasOwnPath = obj.properties.some(prop => prop.type === 'ObjectProperty' && ['cesta','panely'].includes(prop.key.name ?? prop.key.value));
        if(hasOwnPath) for(const i of touched) covered.add(i);
        // Jen vlastní pole objektu; cestu sousedního materiálu ani nadřazeného tématu nepřebírat.
        for(const prop of obj.properties) {
          if(prop.type !== 'ObjectProperty') continue;
          const key=prop.key.name ?? prop.key.value;
          if(!['cesta','panely'].includes(key)) continue;
          if(!['ArrayExpression','StringLiteral'].includes(prop.value.type)) throw new Error('Dynamická cesta/panely v měněném objektu: nelze bezpečně ověřit.');
          const values=prop.value.type === 'ArrayExpression' ? prop.value.elements : [prop.value];
          for(const v of values) {
            if(v?.type !== 'StringLiteral') throw new Error('Neurčená položka panelu: změna odmítnuta.');
            if(v.value.startsWith('/materialy/')) paths.add('public'+v.value);
          }
        }
      }
      for(const [i,[a,b]] of changes.entries()) {
        const line=text.slice(a,b);
        for(const m of line.matchAll(/["'`](\/materialy\/[^"'`\s]+)["'`]/g)) paths.add('public'+m[1]);
        if(!covered.has(i) && line.trim()) {
          throw new Error('Změněný materiál nemá v omezeném diffu úplné hranice objektu; změna odmítnuta.');
        }
      }
    }
  }
  return paths;
}
export function kontrola({ cwd = process.cwd(), staged = false, fetchLive = stahni, exceptions } = {}) {
  const git = (...args) => execFileSync('git', args, {cwd, maxBuffer: 64 * 1024 * 1024});
  const scope = staged ? ['--cached'] : [];
  const files = new Set(git('diff', ...scope, 'HEAD', '--name-only', '-z', '--no-renames', '--', 'public/materialy/').toString().split('\0').filter(Boolean));
  if (!staged) for (const p of git('ls-files', '--others', '--exclude-standard', '-z', '--', 'public/materialy/').toString().split('\0').filter(Boolean)) files.add(p);
  const diff = git('diff', ...scope, 'HEAD', '--no-ext-diff', '--no-textconv', '--unified=40', '--', 'src/data/temata.ts').toString();
  const refs = zmenyMaterialu(diff);
  const allowed = exceptions ?? vyjimky(existsSync(VYJIMKY) ? readFileSync(VYJIMKY, 'utf8') : '');
  for (const p of refs) files.add(p);
  const results = [];
  for (const p of [...files].sort()) {
    if (!p.startsWith('public/materialy/') || p.split('/').some(x => x === '..') || /[?#\\]/.test(p)) throw new Error(`Neplatná cesta: ${p}`);
    const live = fetchLive(p);
    if (![200, 404].includes(live.status)) throw new Error(`${p}: HTTP ${live.status}; ověření selhalo, změna odmítnuta.`);
    let head;
    const tracked = git('ls-tree', '-z', 'HEAD', '--', p).length > 0;
    if (tracked) head = git('show', `HEAD:${p}`);
    const exception = allowed.has(p) || (refs.has(p) && !git('diff', ...scope, 'HEAD', '--name-only', '--', p).length && allowed.has('src/data/temata.ts'));
    if (live.status === 200 && (!head || hash(live.body) === hash(head)) && !exception) throw new Error(`${p}: hotový a nasazený materiál (nebo existující vzdálená cesta bez HEAD); změna odmítnuta. Výjimku zapisuje pouze učitel do ${VYJIMKY}.`);
    results.push({cesta:p, stav:live.status, vysledek:exception ? 'výjimka učitele' : 'povoleno'});
  }
  return results;
}
export function stahni(p) {
  const url = new URL('/' + p.slice('public/'.length).split('/').map(encodeURIComponent).join('/'), 'https://lab.wonderly.cz');
  url.searchParams.set('x', randomUUID());
  const b = execFileSync('curl', ['--silent', '--show-error', '--max-time', '30', '--connect-timeout', '10', '--proto', '=https', '-A', 'wonderly-check', '-H', 'Cache-Control: no-cache', '-H', 'Pragma: no-cache', '--write-out', '\n%{http_code}', url.href], {maxBuffer:128*1024*1024});
  const i = b.lastIndexOf(10);
  return {status:Number(b.subarray(i+1).toString()), body:b.subarray(0,i)};
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2);
    if (args.some(a => a !== '--staged')) throw new Error('Neznámý parametr. Povoleno pouze --staged.');
    const result = kontrola({staged:args.includes('--staged')});
    console.log(`Pojistka hotových materiálů: PROŠLO (${result.length} cest).`);
  } catch (e) { console.error(`Pojistka hotových materiálů: ODMÍTNUTO — ${e.message}`); process.exitCode = 1; }
}
