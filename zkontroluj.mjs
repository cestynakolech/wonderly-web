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
const pouzite = [...temata.matchAll(/^\s*interakce:\s*'([^']+)'/gm)].map((m) => m[1]);
const unikatni = [...new Set(pouzite)];

// 2) Union typ na začátku souboru musí každou z nich obsahovat
const union = temata.match(/interakce\?:\s*([^;]+);/);
for (const i of unikatni) {
	if (!union || !union[1].includes(`'${i}'`)) {
		chyby.push(`interakce '${i}' se používá u podtématu, ale CHYBÍ v seznamu povolených typů (interakce?: … v temata.ts)`);
	}
}

// 3) Každá použitá interakce musí být vykreslená na stránce podtématu
for (const i of unikatni) {
	if (!stranka.includes(`interakce === '${i}'`)) {
		chyby.push(`interakce '${i}' se používá v temata.ts, ale NENÍ vykreslená v [podtema]/index.astro (chybí řádek {podtema.interakce === '${i}' && <…Simulace />})`);
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
const pocetOtazek = [...kvizy.matchAll(/^\s*text:\s*'/gm)].length;
const pocetOdpovedi = [...kvizy.matchAll(/^\s*odpovedi:\s*\[\s*('|$)/gm)].length;
if (pocetOtazek !== pocetOdpovedi) {
	chyby.push(`v kvizy.ts je ${pocetOtazek} otázek, ale ${pocetOdpovedi} seznamů odpovědí — někde chybí odpovědi`);
}

// Výpis česky
console.log(`Kontrola webu — ${unikatni.length} interakcí u podtémat, ${komponenty.length} komponent simulací, ${pocetOtazek} kvízových otázek.`);
for (const v of varovani) console.log(`⚠️  ${v}`);
if (chyby.length === 0) {
	console.log('✅ Vše zapojené správně.');
	process.exit(0);
}
for (const c of chyby) console.log(`❌ ${c}`);
console.log(`\nNAŠLO SE ${chyby.length} chyb — oprav je před buildem.`);
process.exit(1);
