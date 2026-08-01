#!/usr/bin/env node
// Ověření TabulkaVzorceSimulace.astro — relativní × absolutní odkaz při kopírování vzorce.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const novy = (id) => { const p = { id, atributy: {}, textContent: '', style: {}, dataset: {}, posluchaci: {}, classList: { add() {}, remove() {} }, setAttribute(k, v) { this.atributy[k] = String(v); }, getAttribute(k) { return this.atributy[k]; }, appendChild() {}, addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); } }; prvky.set(id, p); return p; };
const tlacitka = [];
const tl = (d) => { const x = novy('tl' + JSON.stringify(d)); Object.assign(x.dataset, d); tlacitka.push(x); return x; };
const document = { getElementById: (id) => prvky.get(id) || novy(id),
  querySelectorAll: (s) => s === '.tab-o-tl' ? [tl({ odkaz: 'absolutni' }), tl({ odkaz: 'relativni' })] : s === '.tab-k-tl' ? [tl({ kurz: '24' }), tl({ kurz: '25' }), tl({ kurz: '26' })] : [],
  createElementNS: () => novy('e' + Math.random()) };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);
const svg = prvky.get('tab-svg'), stav = prvky.get('tab-stav');
let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const CENY = svg.__ceny;

// Doplněno 2. 8. 2026 z mutačního testu (`node testy/mutace.mjs tabulka-vzorce`).
// Test dobře ověřoval vzorce a výsledky, ale VÝCHOZÍ STAV scény vůbec — mutace,
// která posunula počáteční kurz z 25 na 26 Kč, jím prošla. Žák by přitom otevřel
// tabulku s jiným zadáním, než na jaké se ptá výklad i kvíz.
console.log('— výchozí stav scény —');
{
	// hodnoty bez zkopírování = původní nastavení, se kterým se scéna otevírá
	const vychoziKurz = 25;
	ok(svg.__hodnotaB(2, vychoziKurz, 'absolutni', false) === CENY[0] * vychoziKurz,
		`na startu je kurz ${vychoziKurz} Kč/€ a první řádek dává ${CENY[0] * vychoziKurz} Kč`);
	ok(svg.__vzorecB(2, 'absolutni', false) === '=A2*$B$1',
		'a první buňka má rovnou správný absolutní vzorec');
	ok(svg.__vzorecB(3, 'absolutni', false) === '',
		'spodní buňky jsou zatím prázdné — kopíruje se až tlačítkem');
	ok(CENY.length === 4 && CENY.every(Number.isInteger),
		`ceny v eurech jsou čtyři a celočíselné: ${CENY.join(', ')} €`);
}

console.log('\n— ABSOLUTNÍ $B$1: po zkopírování musí být všechno správně —');
for (const kurz of [24, 25, 26]) {
  let vseSedi = true, cela = true;
  for (let r = 2; r <= 5; r++) {
    const v = svg.__hodnotaB(r, kurz, 'absolutni', true);
    if (v !== CENY[r - 2] * kurz) vseSedi = false;
    if (!Number.isInteger(v)) cela = false;
  }
  const rada = [2,3,4,5].map((r) => svg.__hodnotaB(r, kurz, 'absolutni', true));
  ok(vseSedi && cela, `kurz ${kurz} Kč → ${rada.join(', ')} Kč (celá čísla, všechna správně)`);
}

console.log('\n— RELATIVNÍ B1: odkaz se posune a čísla se rozjedou —');
{
  const rada = [2,3,4,5].map((r) => svg.__hodnotaB(r, 25, 'relativni', true));
  ok(rada[0] === CENY[0] * 25, `první vzorec je správně i tak: ${rada[0]} Kč`);
  ok(rada[1] !== CENY[1] * 25, `druhý už je špatně: ${rada[1]} místo ${CENY[1] * 25}`);
  let roste = true;
  for (let i = 1; i < rada.length; i++) if (rada[i] <= rada[i - 1]) roste = false;
  ok(roste, `chyba se lavinovitě zvětšuje: ${rada.join(' → ')}`);
  ok(rada.every(Number.isInteger), 'i chybné hodnoty jsou celá čísla (žák je umí přepočítat)');
}

console.log('\n— vzorce se zapisují správně —');
ok(svg.__vzorecB(2, 'absolutni', false) === '=A2*$B$1', `B2 absolutně: ${svg.__vzorecB(2, 'absolutni', false)}`);
ok(svg.__vzorecB(4, 'absolutni', true) === '=A4*$B$1', `B4 po kopírování absolutně: ${svg.__vzorecB(4, 'absolutni', true)}`);
ok(svg.__vzorecB(4, 'relativni', true) === '=A4*B3', `B4 po kopírování relativně: ${svg.__vzorecB(4, 'relativni', true)} (posunuto)`);
ok(svg.__vzorecB(4, 'absolutni', false) === '', 'dokud se nekopírovalo, jsou spodní buňky prázdné');

console.log('\n— vysvětlení pro žáka —');
const klik = (klic, h) => tlacitka.find((x) => x.dataset[klic] === h).posluchaci.click.forEach((f) => f());
prvky.get('tab-kopiruj').posluchaci.click.forEach((f) => f());
klik('odkaz', 'relativni');
ok(/ukotvit|\$B\$1/.test(stav.textContent), 'u chyby se žák dozví, že se má kurz ukotvit');
klik('odkaz', 'absolutni');
ok(/UKOTVEN/i.test(stav.textContent) && stav.style.color === '#2f9e44', 'správný stav je zeleně a vysvětlený');
console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
