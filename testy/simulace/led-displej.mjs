#!/usr/bin/env node
// Ověření LedDisplejSimulace.astro — displej 5×5, animace střídáním dvou obrázků.
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm).
//
// Nálezy nezávislého kontrolora (31. 7. 2026), na které tenhle test hlídá:
//  - zastavení programu NESMÍ změnit obraz na displeji (dřív skočil na kreslený obrázek);
//  - po doběhnutí „po spuštění" musí tlačítko nabízet spuštění, ne zastavení;
//  - v běžícím programu smí být zvýrazněný nejvýš JEDEN řádek („právě tady čeká");
//  - hromadné změny (ikona, kopie, mazání) musí jít vrátit zpět.
// Původní verze testu měla jednu kontrolu napsanou jako `podmínka || true`, takže
// nemohla nikdy selhat — tautologický test je horší než žádný.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const cesta = process.argv[2] || 'src/components/skola2/LedDisplejSimulace.astro';
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novy = (id) => {
  const p = {
    id, atributy: {}, _text: '', style: {}, dataset: {}, posluchaci: {}, deti: [], tridy: new Set(),
    // jako ve skutečném DOM: nastavení textContent nahradí dosavadní děti
    get textContent() { return this._text; },
    set textContent(v) { this._text = String(v); this.deti.length = 0; },
    classList: {
      add(t) { p.tridy.add(t); }, remove(t) { p.tridy.delete(t); },
      toggle(t) { p.tridy.has(t) ? p.tridy.delete(t) : p.tridy.add(t); },
    },
    setAttribute(k, v) { this.atributy[k] = String(v); },
    getAttribute(k) { return this.atributy[k]; },
    appendChild(d) { this.deti.push(d); },
    addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
  };
  prvky.set(id, p);
  return p;
};
const tl = (id, d) => { const x = novy(id); Object.assign(x.dataset, d); return x; };
// 25 LED a 50 náhledů — přesně jak je vykresluje šablona
const ledy = Array.from({ length: 25 }, (_, i) => tl('led' + i, { i: String(i) }));
const nahledy = Array.from({ length: 50 }, (_, n) =>
  tl('nah' + n, { s: String(Math.floor(n / 25)), i: String(n % 25) }));
const kamTl = [tl('kam1', { kam: '1' }), tl('kam2', { kam: '2' })];
const blokTl = [tl('blok1', { blok: 'opakuj' }), tl('blok2', { blok: 'spusteni' })];
const ikonaTl = ['srdce', 'srdcicko', 'smajlik', 'mracoun'].map((k) => tl('ik-' + k, { ikona: k }));
const skupiny = {
  '.led': ledy, '.nahled': nahledy, '.led-kam': kamTl, '.led-blok': blokTl, '.led-ikona': ikonaTl,
};
const document = {
  getElementById: (id) => prvky.get(id) || novy(id),
  querySelectorAll: (s) => skupiny[s] || [],
  createElementNS: () => novy('e' + Math.random()),
  createElement: () => novy('e' + Math.random()),
};
let ted = 1_000_000;   // řízené „hodiny" — animace se posouvá výpočtem, ne čekáním
let tik = null;        // zachycená funkce z setInterval = jedno překreslení
const sandbox = {
  document, console, Array,
  Date: { now: () => ted },
  setInterval: (f) => { tik = f; return 1; },
  clearInterval: () => { tik = null; },
  requestAnimationFrame: () => {}, performance: { now: () => ted },
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('led-svg');
const stavEl = prvky.get('led-stav');
const praveEl = prvky.get('led-prave');
const pocetEl = prvky.get('led-pocet');
const btnStart = prvky.get('led-start');
const btnZpet = prvky.get('led-zpet');
const prikazyEl = prvky.get('led-prikazy');
let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (el) => el.posluchaci.click.forEach((f) => f());
const PAUZA = svg.__pauza;
const sviticiLed = () => ledy.filter((e) => e.getAttribute('fill') === '#ff3b30').length;
/** Posune hodiny o daný počet ms a nechá simulaci překreslit — jako v prohlížeči. */
const posunCas = (ms) => { ted += ms; if (tik) tik(); };
/** Uvede simulaci do známého výchozího stavu (srdce × malé srdce, opakuj stále, stojí). */
function odZacatku() {
  if (svg.__bezi()) klik(btnStart);
  klik(blokTl[0]);
  klik(kamTl[0]); klik(ikonaTl[0]);
  klik(kamTl[1]); klik(ikonaTl[1]);
  klik(kamTl[0]);
}

console.log('— displej má 25 LED v mřížce 5×5 —');
{
  ok(svg.__pocetLed === 25, `simulace pracuje s ${svg.__pocetLed} LED`);
  ok(ledy.length === 25, 'šablona vykreslila 25 klikacích LED');
  const sour = new Set();
  for (let i = 0; i < 25; i++) sour.add(`${i % 5}-${Math.floor(i / 5)}`);
  ok(sour.size === 25, '5 sloupců × 5 řádků = 25 různých pozic, žádná se nepřekrývá');
  ok(Object.values(svg.__ikony).every((s) => s.length === 25 && /^[01]+$/.test(s)),
    'každá hotová ikona má právě 25 bodů');
}

console.log('\n— animace: obrázky se střídají po 400 ms —');
{
  ok(PAUZA === 400, `pauza mezi obrázky je ${PAUZA} ms — jako v programu`);
  const rada = [0, 399, 400, 799, 800, 1199, 1200].map((t) => svg.__stavVCase(t, true).snimek);
  ok(rada.join('') === '1122112', `„opakuj stále": ${rada.join(' ')} — pravidelné střídání`);
  ok(svg.__stavVCase(600000, true).dobehl === false, 'po deseti minutách běží dál — „opakuj stále" nikdy neskončí');
}

console.log('\n— „po spuštění" doběhne a zůstane stát (to je ta pointa) —');
{
  ok(svg.__stavVCase(0, false).snimek === 1 && svg.__stavVCase(400, false).snimek === 2,
    'napoprvé projde obrázek 1 → obrázek 2 stejně jako „opakuj stále"');
  ok(svg.__stavVCase(800, false).dobehl === true, 'po 800 ms je hotovo');
  const pozdeji = [800, 2000, 10000, 600000].map((t) => svg.__stavVCase(t, false));
  ok(pozdeji.every((s) => s.snimek === 2 && s.dobehl), 'a dál už displej stojí na obrázku 2 — nic nebliká');
}

console.log('\n— dva STEJNÉ obrázky = žádná animace —');
{
  const o = svg.__ikony.srdce.split('').map((z) => z === '1');
  const a = svg.__displejVCase(0, true, o, o);
  const b = svg.__displejVCase(400, true, o, o);
  ok(a.every((v, i) => v === b[i]), 'při shodných obrázcích je displej v obou fázích totožný');
  const o2 = svg.__ikony.srdcicko.split('').map((z) => z === '1');
  const c = svg.__displejVCase(400, true, o, o2);
  ok(!a.every((v, i) => v === c[i]), 'při různých obrázcích se displej mění — teprve to je animace');
}

console.log('\n— kreslení: klik rozsvítí a zhasne, druhý obrázek se nemění —');
{
  odZacatku();
  const pred2 = svg.__obrazky()[2].slice();
  const stav0 = svg.__obrazky()[1][0];
  klik(ledy[0]);
  ok(svg.__obrazky()[1][0] === !stav0, 'klik na LED ji přepne');
  ok(svg.__obrazky()[2].every((v, i) => v === pred2[i]), 'obrázek 2 zůstal beze změny — kreslí se jen do vybraného');
  klik(ledy[0]);
  ok(svg.__obrazky()[1][0] === stav0, 'druhý klik ji vrátí zpět (cesta tam i zpět)');
  ok(sviticiLed() === svg.__obrazky()[1].filter(Boolean).length,
    `na displeji svítí tolik LED, kolik jich je v kresleném obrázku (${sviticiLed()})`);
  ok(/svítí \d+ z 25 LED/.test(pocetEl.textContent), `počítadlo: „${pocetEl.textContent}"`);
}

console.log('\n— ZASTAVENÍ NESMÍ ZMĚNIT OBRAZ (nález kontrolora) —');
{
  odZacatku();
  klik(btnStart);
  posunCas(500);                       // uprostřed druhého obrázku
  const pred = sviticiLed();
  const snimekPred = praveEl.textContent;
  klik(btnStart);                      // ⏹ zastavit
  ok(!svg.__bezi(), 'program se zastavil');
  ok(sviticiLed() === pred, `displej po zastavení ukazuje totéž (${pred} LED před i po) — nic nepřeskočilo`);
  ok(/obrázek 2/.test(snimekPred) && svg.__kam() === 2,
    'a kreslí se nově do toho obrázku, který zůstal na displeji — žák kreslí do toho, co vidí');
  // totéž při kliknutí na LED během běhu
  klik(btnStart);
  posunCas(500);
  const pred2 = sviticiLed();
  klik(ledy[24]);                      // klik na LED program zastaví
  ok(!svg.__bezi(), 'klik na LED program zastaví (jinak by se kreslení pralo s animací)');
  ok(Math.abs(sviticiLed() - pred2) <= 1, `a displej se změní nejvýš o tu jednu LED, na kterou žák klikl (${pred2} → ${sviticiLed()})`);
}

console.log('\n— „po spuštění" na živém displeji: doběhne a SAMO skončí —');
{
  odZacatku();
  klik(blokTl[1]);                     // po spuštění
  klik(btnStart);
  const prubeh = [];
  for (let k = 0; k < 30; k++) { posunCas(100); prubeh.push(sviticiLed()); }
  ok(new Set(prubeh.slice(0, 8)).size === 2, 'zpočátku se oba obrázky vystřídají');
  const konec = prubeh.slice(12);
  ok(new Set(konec).size === 1, `pak displej zůstane stát (${konec[0]} rozsvícených LED) a už se nic nemění`);
  ok(svg.__dobehl() && !svg.__bezi(), 'program sám skončil — nezůstal „běžet" naprázdno');
  ok(btnStart.textContent === '▶️ spustit program',
    `tlačítko nabízí spuštění, ne zastavení programu, který skončil („${btnStart.textContent}")`);
  ok(/doběhl/.test(stavEl.textContent), `a žákovi se řekne proč: „${stavEl.textContent.slice(0, 60)}…"`);
  klik(btnStart);                      // spustit znovu
  ok(svg.__bezi() && !svg.__dobehl(), 'po novém spuštění se hláška o doběhnutí už neukazuje');
  ok(!/doběhl/.test(stavEl.textContent), 'a stavový řádek mluví o běžícím programu');
}

console.log('\n— běh „opakuj stále": 8 vteřin po 100 ms —');
{
  odZacatku();
  klik(btnStart);
  const pocty = [];
  const texty = new Set();
  for (let k = 0; k < 80; k++) { posunCas(100); pocty.push(sviticiLed()); texty.add(praveEl.textContent); }
  ok(new Set(pocty).size === 2, `na displeji se opravdu střídají dva obrázky (${[...new Set(pocty)].join(' a ')} rozsvícených LED)`);
  ok(pocty.every((p) => p > 0), 'displej během animace nikdy úplně nezhasne');
  ok(pocty.every(Number.isInteger), 'počty rozsvícených LED jsou celá čísla');
  ok(texty.size === 2 && [...texty].every((t) => /obrázek [12]/.test(t)),
    `popisek říká, který obrázek právě svítí: ${[...texty].join(' / ')}`);
  let vymen = 0;
  for (let i = 1; i < pocty.length; i++) if (pocty[i] !== pocty[i - 1]) vymen++;
  ok(vymen === 20, `za 8 s se displej vymění ${vymen}× (8000 : 400 = 20) — pravidelně, bez zadrhnutí`);
  ok(svg.__bezi(), 'a „opakuj stále" pořád běží');
}

console.log('\n— výpis programu: nejvýš JEDEN řádek „právě tady" —');
{
  odZacatku();
  klik(btnStart);
  const zvyraznenych = new Set();
  const hlavicky = new Set();
  for (let k = 0; k < 20; k++) {
    posunCas(100);
    zvyraznenych.add(prikazyEl.deti.filter((d) => d.className === 'led-nyni').length);
    hlavicky.add(prikazyEl.deti[0].textContent);
  }
  ok([...zvyraznenych].every((n) => n === 1), `zvýrazněn je vždy právě jeden řádek (naměřeno: ${[...zvyraznenych].join(', ')})`);
  ok([...hlavicky].join('') === 'opakuj stále', `první řádek: „${[...hlavicky].join('')}" — stejný název jako ve výkladu a v kvízu`);
  const radky = prikazyEl.deti.map((d) => d.textContent);
  ok(radky.filter((r) => r.trim().startsWith('pauza')).length === 2, 'dvě pauzy — po každém obrázku jedna');
  ok(radky.slice(1).every((r) => r.startsWith('   ')), 'příkazy uvnitř bloku jsou odsazené (CSS je nesbalí — white-space: pre)');
  klik(btnStart);
  klik(blokTl[1]);
  const radky2 = prikazyEl.deti.map((d) => d.textContent);
  ok(radky2[0] === 'po spuštění', 'po přepnutí bloku se změní PRVNÍ řádek…');
  ok(radky2.slice(1).join('|') === radky.slice(1).join('|'), '…a nic jiného — obě verze jdou poctivě srovnat');
  ok(!svg.__bezi(), 'přepnutí bloku program zastaví — stejně jako ostatní přepínače (nerestartuje ho potají)');
}

console.log('\n— hromadné změny jdou vrátit zpět —');
{
  odZacatku();
  klik(kamTl[1]); klik(ikonaTl[3]);          // do obrázku 2 mračoun
  const mracoun = svg.__obrazky()[2].slice();
  ok(btnZpet.disabled === false, 'po vložení ikony je „vrátit zpět" k dispozici');
  klik(prvky.get('led-kopie'));
  ok(svg.__obrazky()[1].every((v, i) => v === svg.__obrazky()[2][i]), 'kopie 1 → 2 udělá oba obrázky stejné');
  klik(btnZpet);
  ok(svg.__obrazky()[2].every((v, i) => v === mracoun[i]), 'a „vrátit zpět" původní kresbu obnoví (kopie už není nevratná)');
  ok(btnZpet.disabled === true, 'víc než jeden krok zpět se nenabízí — tlačítko zšedne');
  klik(prvky.get('led-smaz'));
  ok(svg.__obrazky()[2].every((v) => v === false), '„zhasni vše" zhasne celý vybraný obrázek');
  klik(btnZpet);
  ok(svg.__obrazky()[2].every((v, i) => v === mracoun[i]), 'i mazání jde vzít zpět');
}

console.log('\n— stavový řádek nemlčí a nelže —');
{
  odZacatku();
  klik(prvky.get('led-kopie'));
  klik(btnStart);
  ok(/STEJNÉ/.test(stavEl.textContent), `shodné obrázky: „${stavEl.textContent.slice(0, 55)}…"`);
  klik(prvky.get('led-smaz'));
  klik(kamTl[1]); klik(prvky.get('led-smaz'));
  ok(/zhasnut/.test(stavEl.textContent), `oba obrázky prázdné: „${stavEl.textContent.slice(0, 55)}…"`);
  ok(sviticiLed() === 0, 'a displej je opravdu tmavý');
  odZacatku();
  ok(/Kreslíš do obrázku/.test(stavEl.textContent), `před spuštěním se řekne, co dělat: „${stavEl.textContent.slice(0, 55)}…"`);
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
