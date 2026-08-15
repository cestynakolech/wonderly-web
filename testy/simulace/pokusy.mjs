#!/usr/bin/env node
// Ověření PokusySimulace.astro — dvě scény: „co se stane?" (3 domácí pokusy,
// tlačítko Spustit) a kyvadlo do hloubky (délka × perioda).
//
// Nejtišeji by lhalo: (1) kliknutí na Spustit nic nezmění na SVG atributech
// (jen v textu mimo <svg>, což sandbox náhledu nevidí), (2) posuvník u kyvadla
// by dal neceločíselnou periodu, (3) přepínání záložek by neschovávalo
// neaktivní scény (žák by viděl všechny 3 pokusy najednou přes sebe).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2] ?? 'src/components/skola2/PokusySimulace.astro';
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
// Pořadí odpovídá EXPY v komponentě — tlačítka se hledají přes querySelectorAll('.poka-tab')
// VOLANÉ NA #poka-taby (ne na document), stejně jako to dělá skutečný skript
// (dataset se v atrapě nepoužívá).
const EXPY = ['gumicka', 'balonek', 'kov'];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild() {},
		querySelectorAll: (s) => (id === 'poka-taby' && s === '.poka-tab' ? tabTlacitka : []),
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const tabTlacitka = EXPY.map((exp) => novy('poka-tab-' + exp));
const document = { getElementById: (id) => prvky.get(id) || novy(id), querySelectorAll: () => [] };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

// ── Scéna A: záložky + tlačítko Spustit ───────────────────────────────────
const spustit = prvky.get('poka-spustit');

function klikNaTab(exp) {
	const tl = tabTlacitka[EXPY.indexOf(exp)];
	for (const f of tl.posluchaci.click) f();
}
function klikSpustit() {
	for (const f of spustit.posluchaci.click) f();
}

console.log('— scéna A: přepínání pokusů schovává ostatní ——');
{
	klikNaTab('gumicka');
	ok(prvky.get('poka-scena-gumicka').getAttribute('display') === '',
		'gumička je vidět (display="")');
	ok(prvky.get('poka-scena-balonek').getAttribute('display') === 'none' &&
		prvky.get('poka-scena-kov').getAttribute('display') === 'none',
		'balónek i kov jsou schované — vidět je jen jeden pokus naráz');

	klikNaTab('balonek');
	ok(prvky.get('poka-scena-balonek').getAttribute('display') === '' &&
		prvky.get('poka-scena-gumicka').getAttribute('display') === 'none',
		'přepnutím na balónek se schová gumička');
}

console.log('\n— scéna A: Spustit mění SVG atributy SYNCHRONNĚ (ne jen text) ——');
{
	klikNaTab('gumicka');
	const cara0 = +prvky.get('poka-guma-cara').getAttribute('y2');
	const zavaziDisplay0 = prvky.get('poka-guma-zavazi').getAttribute('display');
	klikSpustit();
	const cara1 = +prvky.get('poka-guma-cara').getAttribute('y2');
	const zavaziDisplay1 = prvky.get('poka-guma-zavazi').getAttribute('display');
	ok(cara1 > cara0, `gumička se protáhla hned po kliknutí (y2 ${cara0} → ${cara1})`);
	ok(zavaziDisplay0 === 'none' && zavaziDisplay1 === '', 'závaží se zobrazí (display "none" → "")');

	klikNaTab('balonek');
	const r0 = +prvky.get('poka-balonek').getAttribute('r');
	klikSpustit();
	const r1 = +prvky.get('poka-balonek').getAttribute('r');
	ok(r1 > r0, `balónek se nafoukl (r ${r0} → ${r1})`);

	klikNaTab('kov');
	const kulR0 = +prvky.get('poka-kulicka').getAttribute('r');
	const kulFill0 = prvky.get('poka-kulicka').getAttribute('fill');
	klikSpustit();
	const kulR1 = +prvky.get('poka-kulicka').getAttribute('r');
	const kulFill1 = prvky.get('poka-kulicka').getAttribute('fill');
	ok(kulR1 > kulR0, `kulička se zahřátím zvětšila (r ${kulR0} → ${kulR1})`);
	ok(kulFill0 !== kulFill1, `kulička změnila barvu (studená ${kulFill0} → zahřátá ${kulFill1})`);
}

// ── Scéna B: kyvadlo — délka × perioda ─────────────────────────────────────
console.log('\n— scéna B: T = 2·√L vychází celé pro všechny polohy posuvníku ——');
{
	const slider = prvky.get('pokb-slider');
	const MAX = +/id="pokb-slider"[^>]*max="(\d+)"/.exec(zdroj)[1];
	const DELKY = [1, 4, 9, 16];
	let vseCele = true;
	const podpurka = prvky.get('pokb-provazek');
	let predY = -Infinity;
	for (let i = 0; i <= MAX; i++) {
		slider.value = String(i);
		for (const f of slider.posluchaci.input) f();
		const L = DELKY[i];
		const T = 2 * Math.sqrt(L);
		if (!Number.isInteger(T)) vseCele = false;
		const y2 = +podpurka.getAttribute('y2');
		ok(y2 > predY, `L=${L} m: provázek delší než u předchozí polohy (y2=${y2.toFixed(1)})`);
		predY = y2;
		ok(prvky.get('pokb-hodnota-l').textContent === `${L} m`, `posuvník ${i}: čtečka ukazuje ${L} m`);
	}
	ok(vseCele, 'perioda T=2·√L je celé číslo pro všechny 4 hodnoty L (1,4,9,16 → 2,4,6,8 s)');
}

console.log(chyby ? `\n❌ ${chyby} chyb` : '\n✅ Vše v pořádku');
process.exit(chyby ? 1 : 0);
