#!/usr/bin/env node
// Ověření ElektrovaniSimulace.astro — TŘI FÁZE papírků podle popisu učitele:
// leží → při přiblížení se zvedají a napřimují → na určitou vzdálenost odskočí
// a přilepí se → po vybití spadnou zpátky.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const novy = (id) => { const p = { id, atributy: {}, textContent: '', dataset: {}, posluchaci: {}, classList: { add() {}, remove() {} }, setAttribute(k, v) { this.atributy[k] = String(v); }, getAttribute(k) { return this.atributy[k]; }, appendChild() {}, addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); } }; prvky.set(id, p); return p; };
const document = { getElementById: (id) => prvky.get(id) || novy(id), querySelectorAll: () => [], createElementNS: () => novy('p' + Math.random()) };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console };
vm.createContext(sandbox);
const slider = novy('ele-slider'); slider.value = '8';
vm.runInContext(skript, sandbox);

const svg = prvky.get('ele-svg');
const stav = prvky.get('ele-stav');
let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

const prah = svg.__prahy[0];   // nejlehčí papírek
console.log('— tři fáze podle síly —');
ok(svg.__stavPapirku(0, prah).faze === 'lezi', 'bez náboje papírek klidně leží');
ok(svg.__stavPapirku(prah * 0.2, prah).faze === 'lezi', 'při slabé síle pořád leží');
ok(svg.__stavPapirku(prah * 0.6, prah).faze === 'zveda', 'při střední síle se ZVEDÁ a napřimuje');
ok(svg.__stavPapirku(prah * 0.99, prah).faze === 'zveda', 'těsně pod prahem je napřímený, ale drží se stolu');
ok(svg.__stavPapirku(prah, prah).faze === 'chycen', 'při dosažení prahu ODSKOČÍ a přilepí se');

console.log('\n— napřimování musí být POSTUPNÉ, ne skokové —');
{
	let minule = 0, maxSkok = 0, roste = true;
	for (let x = 0; x <= 1.0001; x += 0.01) {
		const z = svg.__stavPapirku(prah * x, prah).zvednuti;
		if (z < minule - 1e-9) roste = false;
		maxSkok = Math.max(maxSkok, z - minule);
		minule = z;
	}
	ok(roste, 'zvednutí s rostoucí silou jen roste, nikdy neklesá');
	ok(maxSkok < 0.05, `největší skok zvednutí mezi kroky je ${(maxSkok * 100).toFixed(1)} % (plynulé)`);
}

console.log('\n— pořadí při přibližování pravítka (q = 3) —');
{
	const q = 3;
	const faze = [];
	for (let d = 10; d >= 1; d--) faze.push(svg.__stavPapirku(svg.__sila(q, d), prah).faze);
	const prvniZveda = faze.indexOf('zveda'), prvniChycen = faze.indexOf('chycen');
	ok(prvniZveda !== -1 && prvniChycen !== -1, `papírek projde oběma fázemi: ${faze.join(' → ')}`);
	ok(prvniZveda < prvniChycen, 'napřimování přijde DŘÍV než odskočení (ne naopak)');
}

console.log('\n— po vybití se papírky vrátí —');
{
	slider.value = '2';
	(prvky.get('ele-trit').posluchaci.click || []).forEach((f) => f());
	(prvky.get('ele-trit').posluchaci.click || []).forEach((f) => f());
	(prvky.get('ele-trit').posluchaci.click || []).forEach((f) => f());
	const chycenoPredVybitim = /Odskočilo/.test(stav.textContent);
	(prvky.get('ele-vybit').posluchaci.click || []).forEach((f) => f());
	ok(chycenoPredVybitim, 'po nabití a přiblížení papírky odskočí');
	ok(svg.__stavPapirku(svg.__sila(0, 2), prah).faze === 'lezi', 'po vybití papírky zase leží na stole');
	ok(/NEUTRÁLNÍ/.test(stav.textContent), 'text po vybití vysvětlí, že je pravítko neutrální');
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
