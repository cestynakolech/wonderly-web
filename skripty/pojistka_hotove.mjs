import { parse, parseExpression } from '@babel/parser';
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
const klic = p => p.computed || !p.key ? null : (p.key.type === 'Identifier' ? p.key.name : p.key.type === 'StringLiteral' ? p.key.value : null);
const vlastniCesta = o => o.properties.some(p => p.type === 'ObjectProperty' && ['cesta','panely'].includes(klic(p)));
// Kanonická hodnota objektu: změna mezer či uvozovek není změnou obsahu; pořadí klíčů ano.
function kanon(n, text) {
  if (!n) return null;
  switch (n.type) {
    case 'StringLiteral': case 'NumericLiteral': case 'BooleanLiteral': return n.value;
    case 'NullLiteral': return null;
    case 'TemplateLiteral': if (!n.expressions.length) return n.quasis[0].value.cooked; break;
    case 'ArrayExpression': return n.elements.map(e => kanon(e, text));
    case 'ObjectExpression': if (n.properties.every(p => p.type === 'ObjectProperty' && klic(p) !== null)) return n.properties.map(p => [klic(p), kanon(p.value, text)]);
  }
  return {zdroj: text.slice(n.start, n.end)};
}
// Povolené hodnoty v odkazy/materialy: jen doslovné řetězce, čísla, pravdivostní hodnoty, šablony bez ${},
// pole a objekty z nich (žádné volání funkcí, proměnné, spread, vypočtené klíče).
function doslovne(n) {
  if (!n) return false;
  switch (n.type) {
    case 'StringLiteral': case 'NumericLiteral': case 'BooleanLiteral': return true;
    case 'TemplateLiteral': return n.expressions.length === 0;
    case 'ArrayExpression': return n.elements.every(doslovne);
    case 'ObjectExpression': return n.properties.every(p => p.type === 'ObjectProperty' && !p.computed && !p.shorthand && klic(p) !== null && doslovne(p.value));
  }
  return false;
}
// Všechny cesty /materialy/ v doslovné hodnotě (položka materialy, odkaz); absolutní adresa webu se odmítne.
const VYNECHAT = ['loc','start','end','extra','range','leadingComments','trailingComments','innerComments'];
function materialoveCesty(n, out = []) {
  if (!n || typeof n !== 'object') return out;
  if (Array.isArray(n)) { for (const x of n) materialoveCesty(x, out); return out; }
  const v = n.type === 'StringLiteral' ? n.value : n.type === 'TemplateLiteral' && !n.expressions.length ? n.quasis[0].value.cooked : null;
  if (v !== null) {
    if (v.startsWith('/materialy/')) out.push('public' + v);
    else if (/^(https?:)?\/\/([a-z0-9-]+\.)*wonderly\.cz\/materialy\//i.test(v)) throw new Error(`Absolutní adresa materiálu ${v}: nelze bezpečně ověřit; změna odmítnuta.`);
    return out;
  }
  for (const k of Object.keys(n)) if (!VYNECHAT.includes(k) && n[k] && typeof n[k] === 'object') materialoveCesty(n[k], out);
  return out;
}
// Celý soubor (HEAD nebo index/pracovní kopie): materiálové objekty s adresou, vlastnosti odkazy/materialy
// a objekty, které je obsahují (adresa = klíče + slug/index v polích).
function rozborSouboru(text) {
  let ast;
  try { ast = parse(text, {sourceType: 'module', plugins: ['typescript']}); } catch (e) { throw new Error(`src/data/temata.ts nelze rozparsovat (${e.message}); změna odmítnuta.`); }
  const mats = [], pole = [], adresy = new Map(), kont = new Map(), kolize = [], divne = [];
  const slug = el => el?.type === 'ObjectExpression' ? el.properties.find(p => p.type === 'ObjectProperty' && klic(p) === 'slug' && p.value.type === 'StringLiteral')?.value.value : undefined;
  // cista = uzel leží v doslovné struktuře: deklarace na nejvyšší úrovni -> init -> jen objekty a pole.
  const walk = (node, path, cista) => {
    if (!node || typeof node.type !== 'string') return;
    if (node.type === 'ObjectExpression') {
      if (vlastniCesta(node)) { const m = {node, path, canon: JSON.stringify(kanon(node, text))}; mats.push(m); adresy.set(path, m); }
      const vl = [];
      for (const p of node.properties) {
        if (p.type !== 'ObjectProperty' || p.computed) divne.push(p);
        const k = klic(p);
        if (['odkazy','materialy'].includes(k)) { vl.push(p); if (p.type === 'ObjectProperty') pole.push({node: p, k}); }
        walk(p.type === 'ObjectProperty' ? p.value : p, `${path}.${k ?? '<' + p.type + p.start + '>'}`, cista === true && p.type === 'ObjectProperty' && !p.computed);
      }
      if (vl.length) {
        if (kont.has(path)) kolize.push(path);
        const mat = vl.filter(p => klic(p) === 'materialy');
        // Platné je poslední stejnojmenné pole (tak ho vyhodnotí JavaScript).
        kont.set(path, {node, vl, cista: cista === true, materialy: mat.at(-1), pocet: {materialy: mat.length, odkazy: vl.length - mat.length}});
      }
      return;
    }
    if (node.type === 'ArrayExpression') {
      const s = node.elements.map(slug), jedinecne = new Set(s.filter(Boolean)).size === s.filter(Boolean).length;
      node.elements.forEach((el, i) => walk(el, `${path}[${jedinecne && s[i] ? 'slug=' + s[i] : i}]`, cista === true));
      return;
    }
    const dal = key => cista === 'koren' && (['Program','ExportNamedDeclaration','VariableDeclaration'].includes(node.type) ? 'koren' : node.type === 'VariableDeclarator' && key === 'init');
    for (const key of Object.keys(node)) {
      if (VYNECHAT.includes(key)) continue;
      const v = node[key];
      if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}/${key}${i}`, dal(key)));
      else if (v && typeof v.type === 'string') walk(v, `${path}/${key}`, dal(key));
    }
  };
  walk(ast.program, '', 'koren');
  const radky = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') radky.push(i + 1);
  return {text, mats, pole, adresy, kont, kolize, divne, radky, line: n => text.slice(radky[n - 1], (radky[n] ?? text.length + 1) - 1)};
}
function cestyObjektu(o) {
  const out = [];
  for (const prop of o.properties) {
    if (prop.type !== 'ObjectProperty' || !['cesta','panely'].includes(klic(prop))) continue;
    if (!['ArrayExpression','StringLiteral'].includes(prop.value.type)) throw new Error('Dynamická cesta/panely v měněném objektu: nelze bezpečně ověřit.');
    for (const v of prop.value.type === 'ArrayExpression' ? prop.value.elements : [prop.value]) {
      if (v?.type !== 'StringLiteral') throw new Error('Neurčená položka panelu: změna odmítnuta.');
      if (v.value.startsWith('/materialy/')) out.push('public' + v.value);
    }
  }
  return out;
}
// Přesná varianta: hunky se ověří proti celým souborům (a stará verze + hunky musí dát novou),
// pole materialy se porovnají sémanticky po adresách podtémat.
// Vrací množinu cest; navíc .nove (položky připojené na konec pole, ve staré verzi neexistovaly)
// a .stavajici (všechny ostatní započtené cesty – na ně se plošná výjimka pro temata.ts nevztahuje).
function zmenySeSoubory(diff, {stary, novy}) {
  const strany = {'-': rozborSouboru(stary), '+': rozborSouboru(novy)};
  const zmeneno = {'-': new Set(), '+': new Set()};
  const hlavicky = [...diff.matchAll(/^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@.*$/gm)];
  if ((diff.match(/^@@/gm) ?? []).length !== hlavicky.length) throw new Error('Neznámá hlavička hunku; změna odmítnuta.');
  const S = stary.split('\n'), rek = [];
  let pos = 1;
  hlavicky.forEach((h, j) => {
    const telo = diff.slice(h.index + h[0].length + 1, hlavicky[j + 1]?.index ?? diff.length).split('\n');
    for (const [sign, zac, poc] of [['-', +h[1], h[2] === undefined ? 1 : +h[2]], ['+', +h[3], h[4] === undefined ? 1 : +h[4]]]) {
      const s = strany[sign];
      const lines = telo.filter(l => l.startsWith(' ') || l.startsWith(sign));
      // U posledního hunku nesmí do počtu vstoupit případné řádky za koncem (prázdný konec diffu).
      if (lines.length !== poc) throw new Error('Počet řádků hunku nesouhlasí s hlavičkou; změna odmítnuta.');
      const prvni = poc === 0 ? zac + 1 : zac;
      lines.forEach((l, k) => {
        if (s.line(prvni + k) !== l.slice(1) || prvni + k > s.radky.length) throw new Error('Diff nesouhlasí s obsahem souboru; změna odmítnuta.');
        if (l.startsWith(sign)) zmeneno[sign].add(prvni + k);
      });
      if (sign === '-') {
        // Rekonstrukce: stará verze + hunky musí dát přesně novou verzi (žádná změna mimo diff).
        if (prvni < pos) throw new Error('Překrývající se hunky; změna odmítnuta.');
        rek.push(...S.slice(pos - 1, prvni - 1));
        for (const l of telo) if (l.startsWith(' ') || l.startsWith('+')) rek.push(l.slice(1));
        pos = prvni + poc;
      }
    }
  });
  rek.push(...S.slice(pos - 1));
  const r = rek.join('\n');
  if (r !== novy && !(/^\\ /m.test(diff) && r.replace(/\n$/, '') === novy.replace(/\n$/, ''))) throw new Error('Stará verze + diff nedává novou verzi temata.ts; změna odmítnuta.');

  const O = strany['-'], N = strany['+'];
  const nove = new Set(), stavajici = new Set();
  // Struktura nové verze (HEAD 25. 10. 2026: 0 spreadů, 0 vypočtených klíčů, 0 metod, 0 duplicit, vše doslovné).
  // U2: pole materialy nesmí na existující adrese zmizet ani být přejmenováno (např. na odkazy).
  for (const [adr, ko] of O.kont) if (ko.materialy && !N.kont.get(adr)?.materialy) throw new Error(`Pole materialy na adrese ${adr} zmizelo nebo bylo přejmenováno; změna odmítnuta.`);
  if (N.divne.length) throw new Error('Spread, vypočtený klíč nebo metoda v objektu temata.ts: nelze bezpečně ověřit; změna odmítnuta.');
  if (N.kolize.length || O.kolize.length) throw new Error(`Nejednoznačná adresa podtématu (${[...N.kolize, ...O.kolize][0]}); změna odmítnuta.`);
  for (const [adr, k] of N.kont) {
    if (k.pocet.materialy > 1 || k.pocet.odkazy > 1) throw new Error(`Duplicitní klíč materialy/odkazy v jednom objektu (${adr}); změna odmítnuta.`);
    if (!k.cista) throw new Error(`Pole materialy/odkazy mimo doslovnou strukturu dat (${adr}); změna odmítnuta.`);
    for (const p of k.vl) {
      const ok = p.type === 'ObjectProperty' && p.value.type === 'ArrayExpression' && doslovne(p.value)
        && p.value.elements.every(e => e.type === 'ObjectExpression' && (klic(p) === 'materialy' || e.properties.some(q => klic(q) === 'url')));
      if (!ok) throw new Error(`Dynamický (nedoslovný) obsah v poli ${klic(p)} (${adr}): nelze bezpečně ověřit; změna odmítnuta.`);
    }
  }
  const prvky = (k, kdo, adr) => {
    if (k.materialy.value.type !== 'ArrayExpression') throw new Error(`Dynamický (nedoslovný) obsah v poli materialy (${adr}) ${kdo}: nelze bezpečně ověřit.`);
    return k.materialy.value.elements;
  };
  const zmenena = (e, adr) => {
    const c = materialoveCesty(e);
    if (!c.length) throw new Error(`Položka materialy bez cesty /materialy/ (např. video /media/) se mění, maže nebo vkládá doprostřed (${adr}); změna odmítnuta.`);
    for (const p of c) stavajici.add(p);
  };
  for (const [adr, ko] of O.kont) {
    if (!ko.materialy) continue;
    const kn = N.kont.get(adr);
    const A = prvky(ko, 've staré verzi', adr), B = prvky(kn, 'v nové verzi', adr);
    const ca = A.map(e => JSON.stringify(kanon(e, O.text))), cb = B.map(e => JSON.stringify(kanon(e, N.text)));
    if (ca.every((c, i) => c === cb[i])) { for (const e of B.slice(A.length)) for (const p of materialoveCesty(e)) nove.add(p); continue; }
    // Nová verze nezačíná celým starým seznamem: nejdelší společná podposloupnost, zbytek je změna.
    const m = A.length, n = B.length, dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) dp[i][j] = ca[i] === cb[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const parA = new Map(), parB = new Set();
    for (let i = 0, j = 0; i < m && j < n;) {
      if (ca[i] === cb[j] && dp[i][j] === dp[i + 1][j + 1] + 1) { parA.set(i, j); parB.add(j); i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
    }
    // Připojené na konec = za spárovaným posledním starým prvkem; jinak je to vložení doprostřed.
    const konec = parA.has(m - 1) ? parA.get(m - 1) : Infinity;
    A.forEach((e, i) => { if (!parA.has(i)) zmenena(e, adr); });
    B.forEach((e, j) => { if (parB.has(j)) return; if (j > konec) for (const p of materialoveCesty(e)) nove.add(p); else zmenena(e, adr); });
  }
  for (const [adr, kn] of N.kont) if (kn.materialy && !O.kont.get(adr)?.materialy) for (const e of kn.materialy.value.elements) for (const p of materialoveCesty(e)) nove.add(p);

  // Materiálové objekty mimo pole materialy (např. samostatný objekt s cestou) a odkazy: jako v kole 1.
  const vMaterialech = path => path.includes('.materialy[');
  for (const sign of ['-', '+']) {
    const s = strany[sign], druha = strany[sign === '-' ? '+' : '-'];
    const dotcene = s.mats.filter(m => !vMaterialech(m.path) && [...zmeneno[sign]].some(n => n >= m.node.loc.start.line && n <= m.node.loc.end.line));
    for (const m of dotcene) {
      const cesty = cestyObjektu(m.node);
      if (druha.adresy.get(m.path)?.canon === m.canon) continue; // stejná položka na stejném místě: nezměněna
      for (const p of cesty) stavajici.add(p);
    }
    const maska = [...dotcene.map(m => m.node), ...s.pole.filter(p => p.k === 'materialy').map(p => p.node.value)];
    for (const n of zmeneno[sign]) {
      const a = s.radky[n - 1], line = s.line(n), b = a + line.length;
      // Cesty v řetězcích mimo materiálové objekty a pole materialy (např. odkaz s url /materialy/) se berou jako dosud.
      let zbytek = line;
      for (const m of maska) if (m.start < b && m.end > a) { const x = Math.max(m.start, a) - a, y = Math.min(m.end, b) - a; zbytek = zbytek.slice(0, x) + ' '.repeat(y - x) + zbytek.slice(y); }
      for (const mm of zbytek.matchAll(/["'`](\/materialy\/[^"'`\s]+)["'`]/g)) stavajici.add('public' + mm[1]);
      if (dotcene.some(m => m.node.start < b && m.node.end > a) || !line.trim()) continue;
      // Řádek mimo materiálové objekty projde, jen když celý leží ve vlastnosti odkazy nebo materialy.
      const t0 = a + line.length - line.trimStart().length, t1 = a + line.trimEnd().length;
      if (!s.pole.some(({node: p}) => p.start <= t0 && (t1 <= p.end || (t1 === p.end + 1 && s.text[p.end] === ',')))) throw new Error('Změněný materiál nemá v omezeném diffu úplné hranice objektu; změna odmítnuta.');
    }
  }
  const paths = new Set([...nove, ...stavajici]);
  return Object.assign(paths, {nove, stavajici});
}
export function zmenyMaterialu(diff, soubory) {
  if (soubory) return zmenySeSoubory(diff, soubory);
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
  // Celé verze souboru (HEAD a index / pracovní kopie) pro přesné hranice objektů; bez nich původní omezený rozbor.
  let soubory;
  if (diff.trim()) {
    try {
      soubory = {stary: git('show', 'HEAD:src/data/temata.ts').toString(), novy: staged ? git('show', ':src/data/temata.ts').toString() : readFileSync(`${cwd}/src/data/temata.ts`, 'utf8')};
    } catch { soubory = undefined; }
  }
  const refs = zmenyMaterialu(diff, soubory);
  // Plošná výjimka pro temata.ts platí jen pro nově připojené položky (bez celých souborů: žádné nové).
  const nove = refs.nove ?? new Set(), stavajici = refs.stavajici ?? refs;
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
    const exception = allowed.has(p) || (nove.has(p) && !stavajici.has(p) && !git('diff', ...scope, 'HEAD', '--name-only', '--', p).length && allowed.has('src/data/temata.ts'));
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
