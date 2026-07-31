#!/usr/bin/env node
// Ověření SouradniceSimulace.astro — soustava souřadnic scény Scratche a program čtverce.
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
const krokTlacitka = [];
const tl = (d) => { const x = novy('tl' + JSON.stringify(d)); Object.assign(x.dataset, d); krokTlacitka.push(x); return x; };
const document = {
  getElementById: (id) => prvky.get(id) || novy(id),
  querySelectorAll: (s) => s === '.sou-krok-tl' ? [tl({ dx: '-10' }), tl({ dx: '10' }), tl({ dy: '10' }), tl({ dy: '-10' })] : [],
  createElementNS: () => novy('e' + Math.random()),
  createElement: () => novy('e' + Math.random()),
};
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('sou-svg'), stavEl = prvky.get('sou-stav'), blokEl = prvky.get('sou-blok');
let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const [MEZ_X, MEZ_Y] = svg.__meze;
const PROGRAM = svg.__program;

console.log('— soustava souřadnic odpovídá Scratchi —');
ok(MEZ_X === 240 && MEZ_Y === 180, `scéna je ${-MEZ_X}…${MEZ_X} × ${-MEZ_Y}…${MEZ_Y}`);
{
  const [sx0, sy0] = svg.__naScenu(0, 0);
  const [, syNahore] = svg.__naScenu(0, 180);
  const [, syDole] = svg.__naScenu(0, -180);
  const [sxVlevo] = svg.__naScenu(-240, 0);
  const [sxVpravo] = svg.__naScenu(240, 0);
  ok(syNahore < sy0 && sy0 < syDole, `kladné y je na obrazovce NAHOŘE (y 180 → ${syNahore} px, y −180 → ${syDole} px)`);
  ok(sxVlevo < sx0 && sx0 < sxVpravo, `kladné x je VPRAVO (x −240 → ${sxVlevo} px, x 240 → ${sxVpravo} px)`);
  ok(sy0 - syNahore === syDole - sy0 && sx0 - sxVlevo === sxVpravo - sx0, 'střed je přesně uprostřed scény (měřítko je symetrické)');
  ok(Math.abs((syDole - syNahore) / (2 * MEZ_Y) - (sxVpravo - sxVlevo) / (2 * MEZ_X)) < 1e-9, 'stejné měřítko v obou osách — čtverec vyjde jako čtverec');
}

console.log('\n— popis polohy nesmí plést záporné y s „dolů" —');
ok(/vlevo/.test(svg.__popisPolohy(-100, 0)), `x −100: ${svg.__popisPolohy(-100, 0)}`);
ok(/DOLŮ/.test(svg.__popisPolohy(0, -100)), `y −100: ${svg.__popisPolohy(0, -100)}`);
ok(/nahoru/.test(svg.__popisPolohy(0, 100)), `y 100: ${svg.__popisPolohy(0, 100)}`);
ok(svg.__ctvrtina(-50, -50) === 'levá dolní čtvrtina', `(−50, −50) → ${svg.__ctvrtina(-50, -50)}`);
ok(svg.__ctvrtina(120, -90) === 'pravá dolní čtvrtina', `(120, −90) → ${svg.__ctvrtina(120, -90)}`);
ok(svg.__ctvrtina(0, 150) === 'přímo na ose', `(0, 150) → ${svg.__ctvrtina(0, 150)}`);
ok(/střed scény/.test(svg.__ctvrtina(0, 0)), `(0, 0) → ${svg.__ctvrtina(0, 0)} (střed je pointa podtématu)`);

console.log('\n— názvy bloků jsou české podle Scratche 3 (stejné, jaké zkouší kvíz) —');
{
  const popisy = PROGRAM.map((p) => p.popis).join(' | ');
  ok(!/pero (dolů|nahoru)/.test(popisy), `program nepoužívá doslovný překlad „pero dolů": ${popisy}`);
  ok(PROGRAM.some((p) => p.popis === 'pero zapni'), 'blok se jmenuje „pero zapni" — tak ho žák najde v paletě');
  const kviz = readFileSync(new URL('../../src/data/kvizy.ts', import.meta.url), 'utf8');
  const blok = kviz.split("'informatika/7-rocnik/programovani-vetveni-promenne/souradnice-a-kresleni'")[1].split(/\n\t'/)[0];
  const vKvizu = [...new Set([...blok.matchAll(/pero (zapni|vypni)/g)].map((m) => m[0]))];
  ok(vKvizu.length > 0, `kvíz na téže stránce mluví o: ${vKvizu.join(', ')}`);
  // hledat jen v tom, co žák uvidí — ne ve vysvětlujících komentářích kódu
  const videnyText = zdroj.replace(/^---[\s\S]*?^---/m, '').replace(/^\s*\/\/.*$/gm, '');
  ok(!/pero dolů|pero nahoru/.test(videnyText), 'ani tlačítka nepoužívají „pero dolů/nahoru" (protiřečilo by kvízu)');
}

console.log('\n— program čtverce: každý krok, celá čísla, uzavřený obrazec —');
{
  const kroky = [];
  for (let i = 0; i <= PROGRAM.length; i++) kroky.push(svg.__stavPoKroku(i));
  kroky.forEach((s, i) => {
    if (i > 0) console.log(`   ${i}. ${PROGRAM[i - 1].popis} → [${s.x}, ${s.y}]${s.pero ? ' (pero dolů)' : ''}`);
  });
  const konec = kroky[PROGRAM.length];
  const zacatek = kroky[1];
  ok(konec.x === zacatek.x && konec.y === zacatek.y, `čtverec se uzavřel: začátek [${zacatek.x}, ${zacatek.y}] = konec [${konec.x}, ${konec.y}]`);
  ok(kroky.every((s) => Number.isInteger(s.x) && Number.isInteger(s.y)), 'všechny souřadnice jsou celá čísla');
  ok(kroky.every((s) => Math.abs(s.x) <= MEZ_X && Math.abs(s.y) <= MEZ_Y), 'postava nikdy neopustí scénu');

  const usek = konec.stopa[0] || [];
  ok(konec.stopa.length === 1 && usek.length === 5, `pero nakreslilo jeden souvislý tah o ${usek.length} bodech`);
  const strany = [];
  for (let i = 1; i < usek.length; i++) {
    const dx = usek[i][0] - usek[i - 1][0], dy = usek[i][1] - usek[i - 1][1];
    strany.push(Math.abs(dx) + Math.abs(dy));
    if (dx !== 0 && dy !== 0) chyby++;
  }
  ok(strany.length === 4 && strany.every((d) => d === 100), `čtyři strany po 100 dílcích: ${strany.join(', ')}`);
  ok(strany.length === 4, 'každá strana je buď vodorovná (změna x), nebo svislá (změna y) — nikdy šikmá');
}

console.log('\n— pero: kreslí jen když je dole —');
{
  const s = svg.__stavPoKroku(0);
  ok(s.stopa.length === 0 && s.pero === false, 'na začátku je pero nahoře a stopa prázdná');
  const s1 = svg.__stavPoKroku(1);   // jen skok, pero ještě nahoře
  ok(s1.stopa.length === 0, 'skok se zvednutým perem nekreslí');
}

console.log('\n— cíle jsou dosažitelné klikáním i tlačítky po 10 —');
for (const [cx, cy] of svg.__cile) {
  const dosazitelny = cx % 10 === 0 && cy % 10 === 0 && Math.abs(cx) <= MEZ_X && Math.abs(cy) <= MEZ_Y;
  ok(dosazitelny, `cíl [${cx}, ${cy}] leží na scéně a je násobkem 10`);
}
ok(new Set(svg.__cile.map((c) => c.join(','))).size === svg.__cile.length, 'cíle se neopakují');
ok(svg.__cile.some(([x, y]) => x < 0 && y < 0) && svg.__cile.some(([x, y]) => x > 0 && y < 0), 'mezi cíli jsou i záporné souřadnice v obou osách');

console.log('\n— mřížka musí sedět na tom, co žák kreslí —');
{
  const KROK = svg.__mrizkaKrok;
  const rohy = [[-50, -50], [50, -50], [50, 50], [-50, 50]];
  ok(rohy.every(([x, y]) => x % KROK === 0 && y % KROK === 0), `rohy čtverce leží přesně na linkách mřížky (mřížka po ${KROK})`);
  ok(100 % KROK === 0, `strana čtverce (100) je celý násobek dílku (${KROK}) — jde odečíst z obrázku`);
}

console.log('\n— žák se dozví, co má dělat, a stav se nepřetvařuje —');
ok(/Úkol/.test(stavEl.textContent), `úvodní hláška zadává úkol: „${stavEl.textContent.slice(0, 90)}…"`);
ok(/Pero: nekreslí/.test(stavEl.textContent), 'stav říká i to, jestli pero kreslí, nebo ne');
ok(/zatím žádný blok/.test(blokEl.textContent), `na začátku se netvrdí, že se něco provedlo: „${blokEl.textContent}"`);
{
  // ruční posun tlačítkem „změň y o −10" musí snížit y (dolů), ne zvýšit
  const pred = svg.__stav().y;
  krokTlacitka.find((t) => t.dataset.dy === '-10').posluchaci.click.forEach((f) => f());
  ok(svg.__stav().y === pred - 10, `tlačítko „změň y o −10" posune dolů: ${pred} → ${svg.__stav().y}`);
  ok(blokEl.textContent === 'změň y o −10', `pilulka ukazuje blok, který se OPRAVDU provedl: „${blokEl.textContent}"`);
}
{
  // pero: tlačítko pojmenovává AKCI, stav pera se pozná z textu (ne jen z barvy)
  const btn = prvky.get('sou-pero');
  ok(btn.textContent === '✏️ zapnout pero', `vypnuté pero → tlačítko nabízí akci „${btn.textContent}"`);
  btn.posluchaci.click.forEach((f) => f());
  ok(svg.__stav().pero === true && btn.textContent === '✏️ vypnout pero', `po zapnutí pero kreslí a tlačítko nabízí „${btn.textContent}"`);
  ok(/Pero: kreslí/.test(stavEl.textContent), 'stavový řádek to potvrdí slovy, ne jen barvou tlačítka');
  btn.posluchaci.click.forEach((f) => f());
  ok(svg.__stav().pero === false, 'cesta zpět funguje (zapnout → vypnout)');
}

console.log('\n— kraj scény: tichý ořez by žáka mátl —');
{
  prvky.get('sou-reset').posluchaci.click.forEach((f) => f());
  const doprava = krokTlacitka.find((t) => t.dataset.dx === '10');
  for (let i = 0; i < 30; i++) doprava.posluchaci.click.forEach((f) => f());
  ok(svg.__stav().x === MEZ_X, `postava se zastaví na kraji scény (x = ${svg.__stav().x})`);
  ok(/kraj scény/.test(prvky.get('sou-hlaska').textContent), `a řekne proč: „${prvky.get('sou-hlaska').textContent}"`);
}

console.log('\n— klikat jde jen dovnitř scény —');
{
  const S = svg.__scena;
  svg.getBoundingClientRect = () => ({ left: 0, top: 0, width: 540, height: 430 });
  const klik = (cx, cy) => svg.posluchaci.click.forEach((f) => f({ clientX: cx, clientY: cy }));
  prvky.get('sou-reset').posluchaci.click.forEach((f) => f());
  klik((S.x1 + S.x2) / 2 + 100, (S.y1 + S.y2) / 2 - 50);   // dovnitř scény
  ok(svg.__stav().x === 100 && svg.__stav().y === 50, `klik dovnitř scény přesune na [${svg.__stav().x}, ${svg.__stav().y}]`);
  const pred = [svg.__stav().x, svg.__stav().y];
  klik(280, 418);                                            // pod scénou, na řádku hlášky
  klik(5, 10);                                               // levý horní roh mimo scénu
  ok(svg.__stav().x === pred[0] && svg.__stav().y === pred[1], 'klik MIMO scénu postavou nehne (rámeček scény platí)');
}

console.log('\n— program: nepředstírá, že běží, když neběží —');
{
  prvky.get('sou-reset').posluchaci.click.forEach((f) => f());
  const krokBtn = prvky.get('sou-krok');
  ok(krokBtn.textContent === '▶️ spustit program', `před spuštěním tlačítko říká „${krokBtn.textContent}"`);
  krokBtn.posluchaci.click.forEach((f) => f());
  ok(svg.__stav().x === -50 && svg.__stav().y === -50, 'první krok skočí na začátek čtverce');
  ok(krokBtn.textContent === '▶️ další krok', `pak nabízí „${krokBtn.textContent}"`);
  krokTlacitka.find((t) => t.dataset.dx === '10').posluchaci.click.forEach((f) => f());
  ok(krokBtn.textContent === '▶️ spustit program', 'ruční zásah program ukončí — tlačítko zase nabízí spuštění od začátku');
  ok(!/kroků programu/.test(stavEl.textContent), 'a stav už netvrdí, kolik kroků programu je provedeno');
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
