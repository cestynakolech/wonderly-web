#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/hydraulika-strikacky.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
// Spuštění:  node testy/podvrhy/hydraulika-strikacky-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = process.env.REPO ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/HydraulikaStrikackySimulace.astro');
const TEST = join(REPO, 'testy/simulace/hydraulika-strikacky.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'hydraulika-strikacky-podvrh-'));
const KOPIE = join(WORKDIR, 'hydraulika-strikacky-podvrh.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	// —— fyzika ——
	['velký píst se posune stejně jako malý (zapomenutý poměr ploch)', (s) => s.replace('const s2 = s1 / pomer;', 'const s2 = s1;')],
	['velký píst se posune VÍC než malý (obrácený poměr)', (s) => s.replace('const s2 = s1 / pomer;', 'const s2 = s1 * pomer;')],
	['velký píst jede dolů místo nahoru', (s) => s.replace('const spodek2 = DNO - SKALA * (KLID2 + s2);', 'const spodek2 = DNO - SKALA * (KLID2 - s2);')],
	['šipka F₂ stejně dlouhá jako F₁ (síla se nezvětší)', (s) => s.replace('sipka2: SIPKA1 * pomer', 'sipka2: SIPKA1')],
	['šipka F₂ míří dolů', (s) => s.replace("nastav('hs-sipka2', { y1: pata2, y2: pata2 - m.sipka2, opacity: tlaci });", "nastav('hs-sipka2', { y1: pata2, y2: pata2 + m.sipka2, opacity: tlaci });")],
	['šířka válce úměrná průměru, ne ploše (velký jen 2krát širší)', (s) => s.replace('const sirka2 = S2 * NA_CM2;', 'const sirka2 = (S2 / 2 + 1) * NA_CM2;')],
	['přiteklý objem počítaný z posunu malé (8 · 4 = 32)', (s) => s.replace('V2: S2 * s2', 'V2: S2 * s1')],
	['velká stříkačka 3 cm² (s₂ = 8 : 3 necelé)', (s) => s.replace("$('hs-velka2').addEventListener('click', () => { S2 = 2; kresli(); });", "$('hs-velka2').addEventListener('click', () => { S2 = 3; kresli(); });")],
	['posuvník po 1 cm (necelé s₂)', (s) => s.replace('type="range" min="0" max="8" step="4"', 'type="range" min="0" max="8" step="1"')],

	// —— kresba ——
	['obrys „odteklo" vyplněný (prázdno nad pístem vypadá jako látka)', (s) => s.replace('<rect id="hs-odteklo" x="98" y="331" width="24" height="0" fill="none"', '<rect id="hs-odteklo" x="98" y="331" width="24" height="0" fill="#ffc078"')],
	['obrys „přiteklo" se nezobrazí', (s) => s.replace("height: m.klid2 - m.spodek2, opacity: tlaci });", "height: m.klid2 - m.spodek2, opacity: 0 });")],
	['šipky vidět i bez zatlačení', (s) => s.replace('const tlaci = s1 > 0 ? 1 : 0;', 'const tlaci = 1;')],
	['krátké táhlo velké (rukojeť zajede do válce)', (s) => s.replace('const TAHLO2 = 114;', 'const TAHLO2 = 60;')],
	['stěna velkého válce nemění šířku s plochou', (s) => s.replace("nastav('hs-stena2', { x: m.x2 - 2, width: m.sirka2 + 4 });", '')],
	['popisek F₂ bez plakety (text přímo přes kresbu)', (s) => s.replace(/\t\t<rect id="hs-f2-pl"[^\n]*\n/, '').replace("nastav('hs-f2-pl', { x: STRED2 + 14, y: stredF2 - 14, opacity: tlaci });", '')],
	['popisek s₂ vyjede ze scény', (s) => s.replace("nastav('hs-s2-pl', { x: m.x2 + m.sirka2 + 10,", "nastav('hs-s2-pl', { x: m.x2 + m.sirka2 + 60,")],
	['skrytý popisek není prázdný (měří se jako neviditelný text)', (s) => s.replace("$(id).textContent = tlaci ? t : '';", '$(id).textContent = t;')],
	['oranžová s nízkým kontrastem (#d9480f)', (s) => s.replaceAll('#c2410c', '#d9480f')],
	['necelá souřadnice (střed obrysu bez zaokrouhlení)', (s) => s.replace('const stredS2 = Math.round((m.spodek2 + m.klid2) / 2);', 'const stredS2 = (m.spodek2 + m.klid2) / 2;')],

	// —— texty ——
	['plaketa s₂ s chybným vzorcem (s₁ · S₂ : S₁)', (s) => s.replace("`s₂ = ${s1} · ${S1} : ${S2} = ${m.s2} cm`", "`s₂ = ${s1} · ${S2} : ${S1} = ${m.s2} cm`")],
	['plaketa síly ukazuje F₂ = F₁', (s) => s.replace("tlaci ? `síla F₂ = ${m.pomer} · F₁`", "tlaci ? 'síla F₂ = F₁'")],
	['plaketa v klidu tvrdí sílu F₁', (s) => s.replace("tlaci ? 'síla F₁' : 'F₁ zatím nepůsobí'", "'síla F₁'")],
	['výsledek bez věty o nestlačitelnosti', (s) => s.replace(' — stejně, protože voda je téměř nestlačitelná.', ' — stejně.')],
	['číslo navíc v textu (10 N)', (s) => s.replace('zato tlačí ${m.pomer}krát větší silou.', 'zato tlačí silou ${m.pomer * 10} N.')],
	['HTML obraz pro telefon bez přiteklého objemu', (s) => s.replace(", ${$('hs-v2-t').textContent}", '')],
	['tlačítka nepřepínají aria-pressed', (s) => s.replace("$('hs-velka4').setAttribute('aria-pressed', String(S2 === 4));", '')],
];

const spust = () => spawnSync('node', [TEST, KOPIE], { encoding: 'utf8', timeout: 60_000 });

// Směr 1: ZDRAVÁ kopie musí projít — jinak měřím něco jiného, než si myslím.
writeFileSync(KOPIE, puvodni);
const zdravy = spust();
const kontrol = (zdravy.stdout.match(/^✅ /gm) ?? []).length;
console.log(`ZDRAVÁ KOPIE: ${zdravy.status === 0 ? `✅ prošla, ${kontrol} kontrol` : '❌ NEPROŠLA — ověření nemá smysl'}`);
if (zdravy.status !== 0) { console.log(zdravy.stdout.split('\n').filter((r) => r.startsWith('❌')).join('\n')); process.exit(1); }

// Směr 2: každý podvrh musí test SHODIT.
let neodhaleno = 0;
for (const [nazev, mutace] of PODVRHY) {
	const zmeneny = mutace(puvodni);
	if (zmeneny === puvodni) { console.log(`⚠️  ${nazev}: mutace se vůbec neaplikovala (vzor nesedí)`); neodhaleno++; continue; }
	writeFileSync(KOPIE, zmeneny);
	const v = spust();
	const kolik = (v.stdout.match(/^❌ /gm) ?? []).length;
	if (v.status === 0) { console.log(`❌ NEODHALENO: ${nazev}`); neodhaleno++; }
	else console.log(`✅ odhaleno (${kolik} kontrol spadlo): ${nazev}`);
}

writeFileSync(KOPIE, puvodni);
console.log(neodhaleno === 0
	? `\n✅ Obousměrně ověřeno: zdravá kopie mlčí, všech ${PODVRHY.length} podvrhů test shodí.`
	: `\n❌ ${neodhaleno} z ${PODVRHY.length} podvrhů prošlo — v testu je díra.`);
process.exit(neodhaleno === 0 ? 0 : 1);
