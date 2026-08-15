#!/usr/bin/env node
// Ověření RozpinaniVesmiruSimulace.astro — dvě scény:
// A) klik na tvar galaxie zobrazí odpovídající popisek,
// B) „rozepnutí" posune galaxie od středu úměrně jejich vzdálenosti
// (Hubbleův zákon: dál = větší skok), NASOBEK = 2, tedy posun == původní vzdálenost.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const novy = (id) => { const p = { id, atributy: {}, textContent: '', posluchaci: {}, classList: { add() {}, remove() {} }, setAttribute(k, v) { this.atributy[k] = String(v); }, getAttribute(k) { return this.atributy[k]; }, addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); } }; prvky.set(id, p); return p; };
const document = { getElementById: (id) => prvky.get(id) || novy(id), querySelectorAll: () => [] };
const sandbox = { document, console };
vm.createContext(sandbox);

// Kruhy galaxií jsou v HTML předkreslené na výchozích souřadnicích (skript
// jen mění jejich polohu) — načteme je přímo ze zdroje komponenty, aby test
// nezávisel na ručně opsaných číslech.
for (const shoda of zdroj.matchAll(/<circle id="(rv-b-g\d)" cx="([\d.]+)" cy="([\d.]+)"/g)) {
	const el = novy(shoda[1]);
	el.setAttribute('cx', shoda[2]);
	el.setAttribute('cy', shoda[3]);
}

vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

console.log('— scéna A: klik na tvar zobrazí popisek —');
{
	const aStav = prvky.get('rv-a-stav');
	const klik = (id) => (prvky.get(id).posluchaci.click || []).forEach((f) => f());
	klik('rv-a-spiralni');
	ok(/[Ss]pirální/.test(aStav.textContent), `spirální galaxie: „${aStav.textContent.slice(0, 40)}…"`);
	klik('rv-a-elipticka');
	ok(/[Ee]liptická/.test(aStav.textContent), `eliptická galaxie: „${aStav.textContent.slice(0, 40)}…"`);
	klik('rv-a-nepravidelna');
	ok(/[Nn]epravidelná/.test(aStav.textContent), `nepravidelná galaxie: „${aStav.textContent.slice(0, 40)}…"`);
}

console.log('\n— scéna B: rozepnutí posune galaxie úměrně vzdálenosti (Hubbleův zákon) —');
{
	const CX = 260, CY = 110;
	const g0 = prvky.get('rv-b-g0'); // vzdal 30, uhel 0.15
	const g4 = prvky.get('rv-b-g4'); // vzdal 110, uhel 3.0

	const vzdalenost = (el) => Math.hypot(Number(el.getAttribute('cx')) - CX, Number(el.getAttribute('cy')) - CY);
	const vzdalPred0 = vzdalenost(g0);
	const vzdalPred4 = vzdalenost(g4);
	ok(Math.round(vzdalPred0) === 30, `nejbližší galaxie začíná ve vzdálenosti 30 px (je ${vzdalPred0.toFixed(1)})`);
	ok(Math.round(vzdalPred4) === 110, `nejvzdálenější galaxie začíná ve vzdálenosti 110 px (je ${vzdalPred4.toFixed(1)})`);

	(prvky.get('rv-b-rozepnout').posluchaci.click || []).forEach((f) => f());

	const vzdalPo0 = vzdalenost(g0);
	const vzdalPo4 = vzdalenost(g4);
	const posun0 = vzdalPo0 - vzdalPred0;
	const posun4 = vzdalPo4 - vzdalPred4;
	ok(Math.round(posun0) === 30, `nejbližší galaxie se posunula o 30 px (je ${posun0.toFixed(1)})`);
	ok(Math.round(posun4) === 110, `nejvzdálenější galaxie se posunula o 110 px (je ${posun4.toFixed(1)})`);
	ok(posun4 > posun0, 'vzdálenější galaxie se posunula o VĚTŠÍ kus dráhy (Hubbleův zákon)');

	const stavB = prvky.get('rv-b-stav');
	ok(/Hubbleův zákon/.test(stavB.textContent), 'text po rozepnutí zmiňuje Hubbleův zákon');

	(prvky.get('rv-b-zpet').posluchaci.click || []).forEach((f) => f());
	const vzdalZpet0 = vzdalenost(g0);
	ok(Math.round(vzdalZpet0) === 30, `po „zpět" se galaxie vrátí na původní vzdálenost 30 px (je ${vzdalZpet0.toFixed(1)})`);
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
