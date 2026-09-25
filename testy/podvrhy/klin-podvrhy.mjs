#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/klin.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
// Spuštění:  node testy/podvrhy/klin-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/KlinSimulace.astro');
const TEST = join(REPO, 'testy/simulace/klin.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'klin-podvrh-'));
const KOPIE = join(WORKDIR, 'klin-podvrh.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	// —— fyzika: co scéna tvrdí ——
	['rozrážecí síla se poměrem DĚLÍ, místo aby se násobila', (s) => s.replace('rozrazeci: UDER * pomer,', 'rozrazeci: UDER / pomer,')],
	['poměr je obrácený (tloušťka ku délce)', (s) => s.replace('const pomer = l / b;', 'const pomer = b / l;')],
	['síla nezávisí na tloušťce klínu (poměr počítaný z pevné dvojky)', (s) => s.replace('const pomer = l / b;', 'const pomer = l / 2;')],
	['posuvník tloušťky umí i polohy, ve kterých poměr nevyjde celý', (s) => s.replace('id="kl-b" type="range" min="2" max="6" step="2"', 'id="kl-b" type="range" min="2" max="6" step="1"')],
	['výchozí klín není sekera A z výkladu (12 × 4 cm)', (s) => s.replace('id="kl-b" type="range" min="2" max="6" step="2" value="4"', 'id="kl-b" type="range" min="2" max="6" step="2" value="6"')],

	// —— kresba nesmí lhát ——
	['šipky sil mají pořád stejnou délku, ať síla vyjde jakkoli', (s) => s.replace('const delka = px(s.rozrazeci * PXNAN);', 'const delka = 120;')],
	['klín se kreslí pořád stejně tlustý, ať je nastavená tloušťka jakákoli', (s) => s.replace('points: `${STRED - B / 2},${hrbetY} ${STRED + B / 2},${hrbetY} ${STRED},${ostriY}`,', 'points: `${STRED - 8},${hrbetY} ${STRED + 8},${hrbetY} ${STRED},${ostriY}`,')],
	['klín se kreslí pořád stejně dlouhý (délka se na kresbě neprojeví)', (s) => s.replace('const hrbetY = px(POVRCH - L + t * L);', 'const hrbetY = px(POVRCH - 48 + t * L);')],
	['špalek se při zaražení klínu vůbec nerozevře', (s) => s.replace('const posun = px((t * B) / 2);', 'const posun = 0; const nepouzito = px((t * B) / 2);')],
	['špalek se rozevře jinak, než je klín v rovině povrchu široký', (s) => s.replace('const posun = px((t * B) / 2);', 'const posun = px((t * B) / 3);')],
	['klín při úderu nezajede do dřeva (jen se vznáší)', (s) => s.replace('const ostriY = px(POVRCH + t * L);', 'const ostriY = px(POVRCH);')],
	['vlákna dřeva zůstanou stát, i když se půlka špalku odsune', (s) => s.replace("nastav('kl-vlakno-l1', { x1: STRED - PULKA + 20 - posun, x2: STRED - 20 - posun });", "nastav('kl-vlakno-l1', { x1: STRED - PULKA + 20, x2: STRED - 20 });")],
	['pravá šipka míří dovnitř klínu místo do dřeva', (s) => s.replace('x1: STRED + okraj, x2: STRED + okraj + delka - 12,', 'x1: STRED + okraj, x2: STRED + okraj - delka + 12,')],
	['podklad popisku je užší než text (popisek přes kresbu nejde přečíst)', (s) => s.replace('const sirka = px(text.length * 7.6 + 14);', 'const sirka = 40;')],

	// —— před úderem nesmí scéna kreslit ani tvrdit působící sílu ——
	['šipky sil jsou plné už před úderem (síla vidět dřív, než kladivo udeří)', (s) => s.replace("const carkovane = predUderem ? CARKY : 'none';", "const carkovane = 'none';")],
	['předpověď sil se od působící síly neodliší průhledností', (s) => s.replace('const pruhlednost = predUderem ? PRUHLEDNOST : 1;', 'const pruhlednost = 1;')],
	['hroty šipek jsou vybarvené i před úderem', (s) => s.replace("const vypln = predUderem ? 'none' : CERVENA;", 'const vypln = CERVENA;')],
	['popisek u šipek hlásí sílu jako fakt i před úderem', (s) => s.replace("`${predUderem ? 'po úderu ' : ''}${s.rozrazeci} N do každé strany`", '`${s.rozrazeci} N do každé strany`')],
	['text pod scénou tvrdí přítomným časem, že klín rozráží, ještě před úderem', (s) => s.replace('po úderu klín rozrazí dřevo do stran silou', 'klín rozráží dřevo do stran silou')],
	['uprostřed úderu scéna dole pořád tvrdí, že klín nezajel do dřeva', (s) => s.replace('const dole = predUderem\n\t\t\t? `klín zatím nezajel do dřeva`\n\t\t\t: t < 1\n\t\t\t\t? `klín zajíždí do dřeva`\n\t\t\t\t: ', 'const dole = t < 1\n\t\t\t? `klín zatím nezajel do dřeva`\n\t\t\t: ')],

	// —— tvrzení nad rámec výkladu a rozvržení ——
	['popisek úderu vydává zvolených 100 N za danou hodnotu z výkladu', (s) => s.replace('`zvolený úder ${UDER} N`', '`úder F = ${UDER} N`')],
	['popisek úderu se vrátil nalevo, kde se dotýká rámečku poměru', (s) => s.replace("`zvolený úder ${UDER} N`, STRED + 16, hrbetY - 30, true", "`zvolený úder ${UDER} N`, STRED - 20, hrbetY - 23, false")],

	// —— texty ——
	['popisek poměru ukazuje jiné číslo, než scéna spočítala', (s) => s.replace('`l : b = ${s.l} : ${s.b} = ${s.pomer}`', '`l : b = ${s.l} : ${s.b} = ${s.pomer + 1}`')],
	['shrnutí dosazuje do zlatého pravidla prohozené hodnoty', (s) => s.replace('${UDER} N · ${s.l} cm = ${s.rozrazeci} N · ${s.b} cm', '${UDER} N · ${s.b} cm = ${s.rozrazeci} N · ${s.l} cm')],
	['text tvrdí, že klín ušetří práci (to zlaté pravidlo popírá)', (s) => s.replace('Zlaté pravidlo mechaniky sedí:', 'Klín ti práci ušetří:')],

	// —— ovládání ——
	['druhý úder do zaraženého klínu ho vymrští zpátky nad špalek', (s) => s.replace('if (bezi || t >= 1) return;', 'if (bezi) return;')],
	['animace zaražení trvá jinak dlouho, než scéna tvrdí', (s) => s.replace('const TRVANI = 600;', 'const TRVANI = 900;')],
	['přestavení posuvníku nechá klín zaražený ve starém dřevě', (s) => s.replace('const zmena = () => {\n\t\tif (bezi) return;\n\t\tt = 0;', 'const zmena = () => {\n\t\tif (bezi) return;')],
];

const spust = () => spawnSync('node', [TEST, KOPIE], { encoding: 'utf8' });

// Směr 1: ZDRAVÁ kopie musí projít — jinak měřím něco jiného, než si myslím.
writeFileSync(KOPIE, puvodni);
const zdravy = spust();
console.log(`ZDRAVÁ KOPIE: ${zdravy.status === 0 ? '✅ prošla' : '❌ NEPROŠLA — ověření nemá smysl'}`);
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
