#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/ucinnost.mjs (účinnost navijáku).
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
//
// Směr 1: zdravá kopie musí testem projít (jinak měřím něco jiného, než si myslím).
// Směr 2: každý podvrh — vždy nepravda, kterou by dítě z obrázku nebo z čísel
//         vyčetlo — musí test SHODIT.
// Spuštění:  node testy/podvrhy/ucinnost-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/UcinnostSimulace.astro');
const TEST = join(REPO, 'testy/simulace/ucinnost.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'ucinnost-podvrh-'));
const KOPIE = join(WORKDIR, 'ucinnost-podvrh.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	['účinnost je napsaná natvrdo, ne spočítaná z P a P₀',
		(s) => s.replace('const ucinnost = Math.round(presne);', 'const ucinnost = 85;')],
	['účinnost se počítá obráceně (P₀ : P), takže vyjde víc než 100 %',
		(s) => s.replace('const presne = (vykon * 100) / prikon;', 'const presne = (prikon * 100) / vykon;')],
	['tření nic nesebere — užitečná práce se rovná dodané',
		(s) => s.replace('const uzitecna = vykon * DOBA;', 'const uzitecna = prikon * DOBA;')],
	['ztráta se nikde nezapočítá (energie tiše zmizí)',
		(s) => s.replace('const ztracena = treni * DOBA;', 'const ztracena = 0;')],
	['výkon roste s třením místo aby klesal',
		(s) => s.replace('const vykon = prikon - treni;', 'const vykon = prikon + treni;')],
	['výška se počítá bez tíhy pytle, takže nesedí s prací',
		(s) => s.replace('const vyska = uzitecna / TIHA;', 'const vyska = uzitecna / G;')],
	['pytel má prý tíhu 10 N, ne 100 N (zapomenuté g)',
		(s) => s.replace('const TIHA = HMOTNOST * G;', 'const TIHA = HMOTNOST;')],
	['naviják běží 15 s, ale práce se počítá jako za 10 s',
		(s) => s.replace('const DOBA = 10;', 'const DOBA = 15;')],
	['pytel visí pořád ve stejné výšce, ať je tření jakékoli',
		(s) => s.replace('const pytelY = Y0 - v.vyska * PX_M - pytelV;', 'const pytelY = Y0 - 10 * PX_M - pytelV;')],
	['větší tření prý vytáhne pytel VÝŠ (obrázek lže proti výpočtu)',
		(s) => s.replace('const pytelY = Y0 - v.vyska * PX_M - pytelV;', 'const pytelY = Y0 - (MAX_M - v.vyska) * PX_M - pytelV;')],
	['modrý ukazatel výšky sahá k hornímu okraji pytle, tedy o celý pytel výš',
		(s) => s.replace('x2="110" y2="${pytelY + pytelV}" stroke="#1971c2" stroke-width="6"',
			'x2="110" y2="${pytelY}" stroke="#1971c2" stroke-width="6"')],
	['štítek s výškou nemá podklad — text splývá s kresbou',
		(s) => s.replace('width="146" height="30" rx="6" fill="#ffffff" stroke="#1971c2"',
			'width="146" height="30" rx="6" fill="none" stroke="#1971c2"')],
	['zelený díl pruhu ukazuje celou dodanou práci, ne užitečnou',
		(s) => s.replace('const sirkaU = v.uzitecna * PX_J;', 'const sirkaU = v.dodana * PX_J;')],
	['červená ztráta začíná na levém okraji a překryje zelený díl',
		(s) => s.replace('p += `<rect x="${PRUH_X + sirkaU}" y="${PRUH_Y}" width="${sirkaZ}"',
			'p += `<rect x="${PRUH_X}" y="${PRUH_Y}" width="${sirkaZ}"')],
	['legenda má barvy naopak — zelená prý znamená ztrátu',
		(s) => s.replace('p += `<rect x="${PRUH_X}" y="136" width="14" height="14" fill="#2f9e44"',
			'p += `<rect x="${PRUH_X}" y="136" width="14" height="14" fill="#e03131"')],
	['teplo se kouří z kladky i bez tření',
		(s) => s.replace('if (treni > 0) {', 'if (treni >= 0) {')],
	['vln tepla je pořád stejně, i když tření roste',
		(s) => s.replace('const vln = treni / 10;', 'const vln = 3;')],
	['žár u kladky se s třením nezvětšuje',
		(s) => s.replace('const zar = 14 + treni / 5;', 'const zar = 14;')],
	// Tahle dvojice hlídá vadu, kterou test dřív přehlédl: žár měl správné `r`,
	// ale kladka (r = 14 + obrys 3 px) ho celý zakryla, takže na obrázku nebyl.
	['žár se kreslí PŘED kladkou, takže ho bílá kladka úplně zakryje',
		(s) => s.replace('s += kladka + zarHtml;', 's += zarHtml + kladka;')],
	['žár je menší než kladka, takže z něj není vidět ani prstenec',
		(s) => s.replace('const zar = 14 + treni / 5;', 'const zar = 6 + treni / 5;')],
	['žár je neprůhledný a kladku pod sebou zakryje',
		(s) => s.replace('fill="#ff922b" opacity="0.55"', 'fill="#ff922b" opacity="1"')],
	['pytel malty je 44 px vysoký, tedy proti měřítku scény 2,4 m',
		(s) => s.replace('const pytelV = 11;', 'const pytelV = 44;')],
	['pytel malty je 60 px široký, tedy proti měřítku scény 3,3 m',
		(s) => s.replace('const pytelS = 10;', 'const pytelS = 60;')],
	// Trojice nálezů nezávislé kontroly kresby (25. 9. 2026): vlna zpola schovaná
	// pod rámečkem popisku, nula přeškrtnutá obrysem země a pytel, který vypadal
	// jako uzlík na laně. Každá z nich se sem vrací jako podvrh.
	['vlny tepla se kreslí do rámečku popisku, takže první je zpola zakrytá',
		(s) => s.replace('const wy = 124 + i * 16;', 'const wy = 110 + i * 16;')],
	['rámeček popisku „teplo z tření" sjede na vlny a zakryje jim začátek',
		(s) => s.replace("s += '<rect x=\"200\" y=\"90\"", "s += '<rect x=\"200\" y=\"120\"")],
	['popisek „0" sedí na zemi, takže ho 2px obrys země přeškrtne',
		(s) => s.replace('const ty = m === 0 ? my - 5 : my + 5;', 'const ty = my + 5;')],
	['pytel má hrdlo stejně široké jako tělo — z pytle je zase obdélníček',
		(s) => s.replace('const pytelHrdlo = 6;', 'const pytelHrdlo = 10;')],
	['pytel má dno na ostrý roh, ne zaoblené jako plný pytel',
		(s) => s.replace('Q ${pyP} ${pyDno} ${pyP - 2} ${pyDno}', 'L ${pyP - 2} ${pyDno}')],
	['přehyb pod hrdlem má barvu výplně, takže na pytli není vidět',
		(s) => s.replace('stroke="#7f5539" stroke-width="2"', 'stroke="#b08968" stroke-width="2"')],
	['štítek náklad nepojmenuje — dítě neví, co to na laně visí',
		(s) => s.replace('>pytel malty<', '>břemeno<')],
	['pytel visí vedle lana, ne na něm',
		(s) => s.replace('const pyHL = 166 - pytelHrdlo / 2;', 'const pyHL = 158 - pytelHrdlo / 2;')],
	['štítek s hmotností leží přes pytel, ne vedle něj',
		(s) => s.replace('s += `<rect x="176" y="${pytelY - 9}"', 's += `<rect x="150" y="${pytelY - 9}"')],
	['značka tíhy je ve výkladovém textu psaná podtržítkem F_g, ne F<sub>g</sub>',
		(s) => s.replace('F<sub>g</sub>', 'F_g')],
	['vlny tepla se kupí na jednom místě',
		(s) => s.replace('const wy = 124 + i * 16;', 'const wy = 124;')],
	['zaokrouhlení se přiznává i tam, kde procenta vycházejí přesně',
		(s) => s.replace('zaokrouhleno: ucinnost !== presne,', 'zaokrouhleno: true,')],
	['zaokrouhlené procento se vydává za přesné (rovnítko místo ≐)',
		(s) => s.replace('zaokrouhleno: ucinnost !== presne,', 'zaokrouhleno: false,')],
	['varování o ideálním stroji se při nulovém tření neobjeví',
		(s) => s.replace('if (v.idealni) {', 'if (false) {')],
	['100 % je vysázeno stejně nenápadně jako běžný výsledek',
		(s) => s.replace("const barva = v.idealni ? '#c92a2a' : '#1971c2';", "const barva = '#1971c2';")],
	['nulové tření se neoznačí jako ideální stroj',
		(s) => s.replace('idealni: vykon === prikon,', 'idealni: false,')],
	['příklad kladkostroje z výkladu se připomíná i u jiné účinnosti',
		(s) => s.replace('v.ucinnost === 83 ?', 'v.ucinnost >= 58 ?')],
	['věta pod scénou tvrdí jinou výšku, než jakou scéna kreslí',
		(s) => s.replace('= ${v.uzitecna} : ${TIHA} = <strong>${v.vyska} m</strong>',
			'= ${v.uzitecna} : ${TIHA} = <strong>${v.vyska + 1} m</strong>')],
	['popis červeného dílu mlčí o tom, že ztráta je teplo z tření',
		(s) => s.replace('>ztráta ${v.ztracena} J → teplo z tření<', '>ztráta ${v.ztracena} J<')],
	['měřítko výšky je popsané po jednom metru, ale značky jsou po dvou',
		(s) => s.replace('for (let m = 0; m <= MAX_M; m += 2) {', 'for (let m = 0; m <= MAX_M; m += 1) {')],
	['měřítko končí na jiné výšce, než kam pytel dosáhne',
		(s) => s.replace('const MAX_M = 12;', 'const MAX_M = 10;')],
	['metr je ve scéně jinak dlouhý, než s jakým se kreslí pytel',
		(s) => s.replace('const PX_M = 18;', 'const PX_M = 20;')],
	['pruh má jiné měřítko, než s jakým jsou spočítané popisky (nevejde se do scény)',
		(s) => s.replace('const PX_J = 0.2;', 'const PX_J = 0.5;')],
	['zvýrazní se nestisknuté tlačítko navijáku',
		(s) => s.replace("classList.toggle('uci-aktivni', q === motor)", "classList.toggle('uci-aktivni', q !== motor)")],
];

const spust = () => spawnSync('node', [TEST, KOPIE], { encoding: 'utf8' });

// Směr 1: ZDRAVÁ kopie musí projít.
writeFileSync(KOPIE, puvodni);
const zdravy = spust();
const kontrol = (zdravy.stdout.match(/✅/g) ?? []).length;
console.log(`ZDRAVÁ KOPIE: ${zdravy.status === 0 ? `✅ prošla, ${kontrol} kontrol` : '❌ NEPROŠLA — ověření nemá smysl'}`);
if (zdravy.status !== 0) {
	console.log(zdravy.stdout.split('\n').filter((r) => r.startsWith('❌')).join('\n'));
	process.exit(1);
}

// Směr 2: každý podvrh musí test SHODIT.
let neodhaleno = 0;
for (const [nazev, mutace] of PODVRHY) {
	const zmeneny = mutace(puvodni);
	if (zmeneny === puvodni) { console.log(`⚠️  ${nazev}: mutace se vůbec neaplikovala (vzor nesedí)`); neodhaleno++; continue; }
	writeFileSync(KOPIE, zmeneny);
	const v = spust();
	const padle = (v.stdout.match(/^❌ .*/gm) ?? []);
	if (v.status === 0) { console.log(`❌ NEODHALENO: ${nazev}`); neodhaleno++; }
	else console.log(`✅ odhaleno (${padle.length} kontrol spadlo): ${nazev}\n     ↳ ${padle[0]?.slice(0, 110) ?? v.stderr.split('\n')[0]}`);
}

writeFileSync(KOPIE, puvodni);
console.log(neodhaleno === 0
	? `\n✅ Obousměrně ověřeno: zdravá kopie mlčí, všech ${PODVRHY.length} podvrhů test shodí.`
	: `\n❌ ${neodhaleno} z ${PODVRHY.length} podvrhů prošlo — v testu je díra.`);
process.exit(neodhaleno === 0 ? 0 : 1);
