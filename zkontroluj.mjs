#!/usr/bin/env node
// Kontrolní brána webu (verifier) — spouštěj PŘED buildem: node zkontroluj.mjs
// Hlídá nejčastější chybu při přidávání simulace: zapojení musí být na VŠECH místech.
// Nic nemění, jen čte a hlásí. Konec s kódem 1 = něco je špatně.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const koren = dirname(fileURLToPath(import.meta.url));
const cestaTemata = join(koren, 'src/data/temata.ts');
const cestaKvizy = join(koren, 'src/data/kvizy.ts');
const cestaKomponenty = join(koren, 'src/components/skola2');
const cestaStranka = join(koren, 'src/pages/skola2/[predmet]/[rocnik]/[tema]/[podtema]/index.astro');

const chyby = [];
const varovani = [];

const temata = readFileSync(cestaTemata, 'utf8');
const stranka = readFileSync(cestaStranka, 'utf8');
const kvizy = readFileSync(cestaKvizy, 'utf8');

// 1) Které interakce se v temata.ts opravdu používají u podtémat
// (interakce = první simulace na stránce, interakce2 = druhá — kontrolují se obě)
const pouzite = [...temata.matchAll(/^\s*interakce:\s*'([^']+)'/gm)].map((m) => m[1]);
const unikatni = [...new Set(pouzite)];
const pouzite2 = [...temata.matchAll(/^\s*interakce2:\s*'([^']+)'/gm)].map((m) => m[1]);
const unikatni2 = [...new Set(pouzite2)];

// 2) Union typ na začátku souboru musí každou z nich obsahovat
const union = temata.match(/interakce\?:\s*([^;]+);/);
for (const i of unikatni) {
	if (!union || !union[1].includes(`'${i}'`)) {
		chyby.push(`interakce '${i}' se používá u podtématu, ale CHYBÍ v seznamu povolených typů (interakce?: … v temata.ts)`);
	}
}
const union2 = temata.match(/interakce2\?:\s*([^;]+);/);
for (const i of unikatni2) {
	if (!union2 || !union2[1].includes(`'${i}'`)) {
		chyby.push(`interakce2 '${i}' se používá u podtématu, ale CHYBÍ v seznamu povolených typů (interakce2?: … v temata.ts)`);
	}
}

// 3) Každá použitá interakce musí být vykreslená na stránce podtématu
for (const i of unikatni) {
	if (!stranka.includes(`interakce === '${i}'`)) {
		chyby.push(`interakce '${i}' se používá v temata.ts, ale NENÍ vykreslená v [podtema]/index.astro (chybí řádek {podtema.interakce === '${i}' && <…Simulace />})`);
	}
}
for (const i of unikatni2) {
	if (!stranka.includes(`interakce2 === '${i}'`)) {
		chyby.push(`interakce2 '${i}' se používá v temata.ts, ale NENÍ vykreslená v [podtema]/index.astro (chybí řádek {podtema.interakce2 === '${i}' && <…Simulace />})`);
	}
}

// 4) Každý import na stránce musí ukazovat na existující komponentu
for (const m of stranka.matchAll(/import\s+(\w+)\s+from\s+'([^']*components\/skola2\/([\w.]+))'/g)) {
	const soubor = join(cestaKomponenty, m[3]);
	if (!existsSync(soubor)) chyby.push(`stránka importuje ${m[1]}, ale soubor ${m[3]} NEEXISTUJE`);
}

// 5) Komponenta simulace, která existuje, ale nikde se nepoužívá (jen varování)
const komponenty = readdirSync(cestaKomponenty).filter((f) => /Simulace\.astro$/.test(f));
for (const k of komponenty) {
	const nazev = k.replace('.astro', '');
	if (!stranka.includes(nazev)) varovani.push(`komponenta ${k} existuje, ale není zapojená na stránce podtématu`);
}

// 6) Kvízy: správná odpověď musí být PRVNÍ — hlídáme aspoň hrubé chyby ve struktuře
// (řádky s definicí typu — `text: string;`, `odpovedi: string[];` — se nepočítají)
// Pozor: otázky jsou psané dvojím způsobem — přes několik řádků i celé na JEDNOM
// řádku (`{ text: '…', odpovedi: […] }`). Do 31. 7. 2026 se počítaly jen ty víceřádkové,
// takže u většiny otázek kontrola „ke každé otázce patří odpovědi“ vůbec neplatila.
const pocetOtazek = [...kvizy.matchAll(/(?:^|\{)\s*text:\s*'/gm)].length;
const pocetOdpovedi = [...kvizy.matchAll(/(?:^|,)\s*odpovedi:\s*\[\s*('|$)/gm)].length;
if (pocetOtazek !== pocetOdpovedi) {
	chyby.push(`v kvizy.ts je ${pocetOtazek} otázek, ale ${pocetOdpovedi} seznamů odpovědí — někde chybí odpovědi`);
}

// 6b) DÉLKOVÁ NÁPOVĚDA (přidáno 31. 7. 2026 po nálezu nezávislého kontrolora).
// Správná odpověď je v datech vždy první a web ji zamíchá — jenže míchání mění POŘADÍ,
// ne DÉLKU. Když je správná odpověď nejdelší, žák ji uhodne bez znalosti látky.
// Náhoda dává ~33 %; při nálezu bylo na webu 68 %. Neblokuje build (staré kvízy by
// zhaslo naráz), ale ukáže nejhorší bloky, aby se daly dorovnávat po dávkách.
const bloky = new Map();
{
	let klic = null;
	for (const radek of kvizy.split('\n')) {
		const mk = radek.match(/^\t'([^']+)': \[/);
		if (mk) { klic = mk[1]; bloky.set(klic, { celkem: 0, nejdelsi: 0 }); continue; }
		if (!klic) continue;
		const m = radek.match(/odpovedi:\s*\[([^\]]+)\]/);
		if (!m) continue;
		const odp = m[1].split(/',\s*'/).map((s) => s.replace(/^\s*'|'\s*$/g, ''));
		if (odp.length !== 3) continue;
		const stat = bloky.get(klic);
		stat.celkem++;
		if (odp[0].length > Math.max(odp[1].length, odp[2].length)) stat.nejdelsi++;
	}
}
const celkemOtazek = [...bloky.values()].reduce((s, b) => s + b.celkem, 0);
const celkemNejdelsi = [...bloky.values()].reduce((s, b) => s + b.nejdelsi, 0);
const podilNejdelsi = celkemOtazek ? Math.round((celkemNejdelsi / celkemOtazek) * 100) : 0;
const nejhorsi = [...bloky.entries()]
	.filter(([, b]) => b.celkem >= 8 && b.nejdelsi / b.celkem >= 0.75)
	.sort((a, b) => b[1].nejdelsi / b[1].celkem - a[1].nejdelsi / a[1].celkem)
	.slice(0, 5);
if (podilNejdelsi > 45) {
	varovani.push(
		`u ${podilNejdelsi} % otázek je správná odpověď nejdelší (náhoda je 33 %) — jde uhodnout bez znalosti látky. ` +
			`Nejhorší bloky: ${nejhorsi.map(([k, b]) => `${k.split('/').slice(2).join('/')} (${b.nejdelsi}/${b.celkem})`).join(', ')}`,
	);
}

// 7) DENÍK (přidáno 31. 7. 2026 po nezávislém auditu): brána hlídala jen školu,
// a tak se na web dostal popis Loketu o anatomickém lokti i „336 dnů na cestě".
// Kontroly jsou schválně hloupé a rychlé — chytají to, co se opravdu stalo.
const cestyDir = new URL('./src/data/cesty/', import.meta.url);
const rokySoubory = readdirSync(cestyDir).filter((f) => /^\d{4}\.ts$/.test(f));
let mistCelkem = 0;
const PODEZRELE = [
	['v textu není popsáno', 'popis vznikl z článku o něčem jiném'],
	['je název dvou', 'popis je z rozcestníku, ne o konkrétním místě'],
	['je název více', 'popis je z rozcestníku, ne o konkrétním místě'],
	['je název několika', 'popis je z rozcestníku, ne o konkrétním místě'],
	['Text se zabývá', 'popis mluví o textu místo o místě'],
];
for (const soubor of rokySoubory) {
	const obsah = readFileSync(new URL(soubor, cestyDir), 'utf8');
	const slugy = [...obsah.matchAll(/^\t\t\tslug: '([^']+)'/gm)].map((m) => m[1]);
	mistCelkem += slugy.length;
	const duplicity = slugy.filter((s, i) => slugy.indexOf(s) !== i);
	if (duplicity.length) {
		chyby.push(`${soubor}: dvě místa mají stejný slug (${[...new Set(duplicity)].join(', ')})`);
	}
	for (const [vzor, proc] of PODEZRELE) {
		if (obsah.includes(vzor)) chyby.push(`${soubor}: ${proc} — hledej „${vzor}"`);
	}
	// videoId musí mít protějšek v seznamu videí roku, jinak karta místa ukáže prázdno
	const videaId = [...obsah.matchAll(/\{ id: '([^']+)'/g)].map((m) => m[1]);
	for (const [, vid] of obsah.matchAll(/videoId: '([^']+)'/g)) {
		if (!videaId.includes(vid)) chyby.push(`${soubor}: videoId ${vid} není v seznamu videí roku`);
	}
	// místo bez souřadnic by se nevykreslilo na mapě
	const pocetX = [...obsah.matchAll(/^\t\t\tx: /gm)].length;
	if (pocetX !== slugy.length) {
		chyby.push(`${soubor}: ${slugy.length} míst, ale ${pocetX} souřadnic x`);
	}
}

// Výpis česky
console.log(`Deník: ${rokySoubory.length} roků, ${mistCelkem} míst.`);
console.log(`Kontrola webu — ${unikatni.length} interakcí (+${unikatni2.length} druhých na stránce), ${komponenty.length} komponent simulací, ${pocetOtazek} kvízových otázek.`);
for (const v of varovani) console.log(`⚠️  ${v}`);
if (chyby.length === 0) {
	console.log('✅ Vše zapojené správně.');
	process.exit(0);
}
for (const c of chyby) console.log(`❌ ${c}`);
console.log(`\nNAŠLO SE ${chyby.length} chyb — oprav je před buildem.`);
process.exit(1);
