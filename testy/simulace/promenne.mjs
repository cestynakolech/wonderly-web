#!/usr/bin/env node
// Ověření PromenneSimulace.astro — proměnná jako krabička, „nastav" × „změň o".
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const novy = (id) => {
  const p = {
    id, atributy: {}, textContent: '', style: {}, dataset: {}, posluchaci: {}, deti: [],
    classList: { add() {}, remove() {}, toggle() {} },
    setAttribute(k, v) { this.atributy[k] = String(v); },
    getAttribute(k) { return this.atributy[k]; },
    appendChild(d) { this.deti.push(d); },
    addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
  };
  prvky.set(id, p);
  return p;
};
const tlacitka = [];
const tl = (d) => { const x = novy('tl' + JSON.stringify(d)); Object.assign(x.dataset, d); tlacitka.push(x); return x; };
const skupiny = {
  '.prom-p-tl': [tl({ reset: 'ano' }), tl({ reset: 'ne' })],
  '.prom-rucne': [tl({ nastav: '0' }), tl({ zmen: '1' }), tl({ zmen: '-1' })],
};
const document = {
  getElementById: (id) => prvky.get(id) || novy(id),
  querySelectorAll: (s) => skupiny[s] || [],
  createElementNS: () => novy('e' + Math.random()),
  createElement: () => novy('e' + Math.random()),
};
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Array };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('prom-svg');
const stavEl = prvky.get('prom-stav');
const hodnotaEl = prvky.get('prom-hodnota');
const okenkoEl = prvky.get('prom-okenko');
const btnKrok = prvky.get('prom-krok');
let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (el) => el.posluchaci.click.forEach((f) => f());
const CIL = svg.__cil;

console.log('— program s „nastav skóre na 0" dopadne VŽDY stejně —');
{
  const behy = [1, 2, 3, 4].map((b) => svg.__konecBehu(b, true));
  ok(behy.every((v) => v === CIL), `čtyři spuštění po sobě: ${behy.join(', ')} (vždy ${CIL})`);
  ok(behy.every(Number.isInteger), 'hodnoty jsou celá čísla');
}

console.log('\n— bez něj se hodnota přenáší z minulého běhu (to je pointa) —');
{
  const behy = [1, 2, 3, 4].map((b) => svg.__konecBehu(b, false));
  ok(behy[0] === CIL, `napoprvé to vyjde taky (${behy[0]}) — krabička byla prázdná`);
  ok(behy[1] === 2 * CIL && behy[2] === 3 * CIL, `pak se body sčítají: ${behy.join(' → ')}`);
  let roste = true;
  for (let i = 1; i < behy.length; i++) if (behy[i] <= behy[i - 1]) roste = false;
  ok(roste, 'chyba se s každým spuštěním zvětšuje — žák ji uvidí na první pohled');
  ok(behy.every(Number.isInteger), 'i chybné hodnoty jsou celá čísla');
}

console.log('\n— „nastav" přepisuje, „změň o" přičítá —');
{
  ok(svg.__hodnotaPoKroku(1, true, 99) === 0, 'nastav skóre na 0: z 99 udělá 0 (přepsání)');
  ok(svg.__hodnotaPoKroku(1, false, 99) === 100, 'změň skóre o 1: z 99 udělá 100 (přičtení)');
  ok(svg.__hodnotaPoKroku(0, true, 7) === 7, 'dokud se nic neprovede, hodnota se nemění');
}

console.log('\n— program obsahuje to, co je ve výkladu —');
{
  const sR = svg.__program(true).map((p) => p.popis);
  const bezR = svg.__program(false).map((p) => p.popis);
  ok(sR[0] === 'nastav skóre na 0', `první blok: „${sR[0]}"`);
  ok(sR.length === bezR.length + 1, 'obě verze se liší JEN prvním blokem (jinak by se nedaly srovnat)');
  ok(sR.filter((p) => p.startsWith('změň')).length === CIL, `${CIL}× „změň skóre o 1"`);
  ok(sR.some((p) => p.includes('když')), 'a použití hodnoty v podmínce — třetí operace z výkladu');
}

console.log('\n— krok za krokem a ovládání —');
{
  ok(btnKrok.textContent === '▶️ spustit program', `před spuštěním: „${btnKrok.textContent}"`);
  klik(btnKrok);
  ok(svg.__skore() === 0 && hodnotaEl.textContent === '0', 'první krok nastaví krabičku na 0');
  klik(btnKrok); klik(btnKrok); klik(btnKrok);
  ok(svg.__skore() === CIL, `po třech „změň o 1" je v krabičce ${svg.__skore()}`);
  ok(okenkoEl.textContent === String(CIL), 'okénko na scéně ukazuje totéž co krabička');
  klik(btnKrok);
  ok(/Mám 3 body/.test(prvky.get('prom-rekni').textContent), 'na konci postava řekne, co má říct');
}
{
  // ruční tlačítka: cesta tam i zpět
  klik(tlacitka.find((t) => t.dataset.zmen === '1'));
  const po = svg.__skore();
  klik(tlacitka.find((t) => t.dataset.zmen === '-1'));
  ok(svg.__skore() === po - 1, `„změň o −1" vrátí hodnotu zpět (${po} → ${svg.__skore()})`);
  klik(tlacitka.find((t) => t.dataset.nastav === '0'));
  ok(svg.__skore() === 0, 'a „nastav na 0" krabičku vynuluje');
  ok(/krabičce/.test(stavEl.textContent), `stav mluví o krabičce: „${stavEl.textContent.slice(0, 60)}…"`);
}
{
  // přepnutí programu musí začít načisto, jinak by čísla lhala
  klik(tlacitka.find((t) => t.dataset.reset === 'ne'));
  ok(svg.__skore() === 0, 'přepnutí na program bez „nastav" začíná od nuly');
  klik(prvky.get('prom-znovu'));
  ok(svg.__skore() === CIL, `první běh bez „nastav“ končí na ${svg.__skore()}`);
  klik(prvky.get('prom-znovu'));
  ok(svg.__skore() === 2 * CIL, `druhý běh končí na ${svg.__skore()} — hodnota se přenesla`);
  ok(/pamatuje/.test(stavEl.textContent), 'a žákovi se vysvětlí proč');
  klik(prvky.get('prom-reset'));
  ok(svg.__skore() === 0, 'tlačítko „úplně od začátku" vrátí vše na začátek');
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
