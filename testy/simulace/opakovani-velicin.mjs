#!/usr/bin/env node
// Ověření OpakovaniVelicinSimulace.astro — souhrnné opakování veličin 6. ročníku.
// Část A: kvíz značka/jednotka/měřidlo se třemi možnostmi (dvě špatné jsou
// SKUTEČNÉ hodnoty jiných veličin, ne vymyšlené nesmysly). Část B: klik na
// řádek zvýrazní celý řádek tabulky.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', dataset: {}, posluchaci: {},
		classList: { add() {}, remove() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild() {},
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll: () => [],
	createElementNS: () => novy('p' + Math.random()),
};
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svgA = prvky.get('ov-a-svg');
const svgB = prvky.get('ov-b-svg');
const nazevEl = prvky.get('ov-a-nazev');
const hlaskaEl = prvky.get('ov-a-hlaska');
const skoreEl = prvky.get('ov-a-skore');
const dalsiBtn = prvky.get('ov-a-dalsi');
const rectyA = [0, 1, 2].map((k) => prvky.get('ov-a-rect-' + k));
const textyA = [0, 1, 2].map((k) => prvky.get('ov-a-text-' + k));

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (el) => (el.posluchaci.click || []).forEach((f) => f());

console.log('— data odpovídají tabulce ve výkladu (temata.ts) —');
const V = svgA.__veliciny;
ok(V.length === 7, `sedm veličin: ${V.map((v) => v.nazev).join(', ')}`);
ok(V.find((v) => v.nazev === 'Hustota').znacka === 'ρ (ró)', 'hustota má značku ρ');
ok(V.find((v) => v.nazev === 'Hustota').jednotka === 'kg/m³', 'hustota v kg/m³');
ok(V.find((v) => v.nazev === 'Objem').meridlo === 'odměrný válec', 'objem se měří odměrným válcem');
ok(V.find((v) => v.nazev === 'Síla').znacka === 'F' && V.find((v) => v.nazev === 'Síla').jednotka === 'newton (N)', 'síla F v newtonech');
ok(V.find((v) => v.nazev === 'Čas').meridlo === 'hodiny, stopky', 'čas se měří hodinami/stopkami');

console.log('\n— moznosti() je čistá a deterministická —');
{
	const a1 = svgA.__moznosti(1, 'znacka', 0);
	const a2 = svgA.__moznosti(1, 'znacka', 0);
	ok(JSON.stringify(a1) === JSON.stringify(a2), 'stejné vstupy dají stejný výstup (deterministické, ne Math.random)');
	ok(a1.options.length === 3, 'tři možnosti');
	ok(a1.options[a1.correctIndex] === V[1].znacka, 'správná odpověď na správném indexu odpovídá datům veličiny');
	ok(new Set(a1.options).size === 3, 'tři možnosti jsou tři různé texty (žádný duplicitní distraktor)');
	// oba distraktory musí být skutečné hodnoty JINÝCH veličin, ne vymyšlené
	const spravna = V[1].znacka;
	const zbyle = a1.options.filter((o) => o !== spravna);
	const jsouSkutecne = zbyle.every((o) => V.some((v) => v.znacka === o));
	ok(jsouSkutecne, `distraktory jsou skutečné značky jiných veličin: ${zbyle.join(', ')}`);
}
{
	// pozice správné odpovědi se má měnit podle kroku, ne být napořád na 0
	const pozice = new Set([0, 1, 2].map((krok) => svgA.__moznosti(0, 'znacka', krok).correctIndex));
	ok(pozice.size > 1, `pozice správné odpovědi se mezi kroky mění: ${[...pozice].join(', ')}`);
}

console.log('\n— průběh kvízu (část A) —');
ok(nazevEl.textContent === 'Délka', `start na první veličině: „${nazevEl.textContent}"`);
{
	// zjistíme, který index je teď správný, a klikneme na něj
	const stavPredKlikem = svgA.__moznosti(0, 'znacka', 0);
	klik(rectyA[stavPredKlikem.correctIndex]);
	ok(rectyA[stavPredKlikem.correctIndex].getAttribute('fill') === '#b2f2bb', 'správná volba zezelená (fill na SVG rectu)');
	ok(/Správně/.test(hlaskaEl.textContent), `hláška potvrzuje úspěch: „${hlaskaEl.textContent}"`);
	ok(dalsiBtn.getAttribute('opacity') === '1', 'tlačítko Další se odkryje (opacity 0 → 1) SYNCHRONNĚ po kliku');
	ok(skoreEl.textContent === 'Skóre: 1 / 1', `skóre se ihned zvýší: „${skoreEl.textContent}"`);

	// druhý klik na stejném kroku se ignoruje (žák nemůže odpověď měnit donekonečna)
	const jinyIndex = (stavPredKlikem.correctIndex + 1) % 3;
	klik(rectyA[jinyIndex]);
	ok(skoreEl.textContent === 'Skóre: 1 / 1', 'po zodpovězení dalsí klik na jinou možnost nic nemění');

	svgA.__dalsi();
	ok(nazevEl.textContent === 'Délka', 'po první otázce zůstává stejná veličina (teď se ptá na jednotku)');
	ok(dalsiBtn.getAttribute('opacity') === '0', 'tlačítko Další se po posunu zase skryje');
}

console.log('\n— špatná odpověď se pozná a ukáže se správná —');
{
	// dojedeme zbylé dva kroky Délky (jednotka, měřidlo) tak, že na každý
	// odpovíme (jinak __dalsi() zodpovězení vyžaduje a krok neposune)
	for (let i = 0; i < 2; i++) {
		const s = svgA.__moznosti(0, ['znacka', 'jednotka', 'meridlo'][i + 1], i + 1);
		klik(rectyA[s.correctIndex]);
		svgA.__dalsi();
	}
	ok(nazevEl.textContent === 'Hmotnost', `po třech krocích Délky jede Hmotnost: „${nazevEl.textContent}"`);
	const stavZnacky = svgA.__moznosti(1, 'znacka', 0);
	const spatnyIndex = (stavZnacky.correctIndex + 1) % 3;
	const skorePred = skoreEl.textContent;
	klik(rectyA[spatnyIndex]);
	ok(rectyA[spatnyIndex].getAttribute('fill') === '#ffc9c9', 'špatná volba zčervená');
	ok(rectyA[stavZnacky.correctIndex].getAttribute('fill') === '#b2f2bb', 'a správná se přesto ukáže zeleně');
	ok(/Správně je/.test(hlaskaEl.textContent), `hláška ukáže správnou hodnotu: „${hlaskaEl.textContent}"`);
	ok(skoreEl.textContent !== skorePred && /\/ \d+/.test(skoreEl.textContent), `skóre se aktualizovalo: „${skoreEl.textContent}"`);
}

console.log('\n— část B: klik na řádek zvýrazní celý řádek —');
{
	const radky = svgB.__radky;
	ok(radky.length === 7, `sedm klikacích řádků: ${radky.length}`);
	// klid: žádný řádek není zvýrazněný
	ok(radky.every((r) => r.getAttribute('fill') !== '#ffe8cc'), 'v klidu není zvýrazněný žádný řádek');

	// SKUTEČNÝ klik na obdélník řádku (ne jen volání hooku) — ověří, že
	// posluchač „click" je opravdu zapojený na prvku, na který žák klikne.
	klik(prvky.get('ov-b-rect-3')); // Hustota
	ok(radky[3].getAttribute('fill') === '#ffe8cc', 'kliknutý řádek (Hustota) dostane zvýrazňující fill');
	ok(radky[3].getAttribute('stroke-width') === '4', 'a silnější obrys');
	ok(radky.filter((r) => r.getAttribute('fill') === '#ffe8cc').length === 1, 'zvýrazněný je jen ten jeden řádek');
	const detailEl = prvky.get('ov-b-detail');
	ok(/Hustota/.test(detailEl.textContent) && /kg\/m³/.test(detailEl.textContent), `detail popisuje kliknutou veličinu: „${detailEl.textContent}"`);

	klik(prvky.get('ov-b-rect-0')); // Délka
	ok(radky[0].getAttribute('fill') === '#ffe8cc' && radky[3].getAttribute('fill') !== '#ffe8cc', 'přepnutí na jiný řádek zruší předchozí zvýraznění (jen jeden aktivní)');
}

console.log(chyby === 0 ? '\n✅ VŠE V POŘÁDKU' : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
