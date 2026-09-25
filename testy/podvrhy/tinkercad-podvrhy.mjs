#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/tinkercad.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
//
// Směr 1: zdravá kopie musí testem projít (jinak měřím něco jiného, než si myslím).
// Směr 2: každý podvrh — vždy nepravda, kterou by dítě z obrázku vyčetlo — musí test SHODIT.
// Spuštění:  node testy/podvrhy/tinkercad-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/TinkercadSimulace.astro');
const TEST = join(REPO, 'testy/simulace/tinkercad.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'tinkercad-podvrh-'));
const KOPIE = join(WORKDIR, 'tinkercad-podvrh.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	['díra se vykousne i BEZ seskupení (Ctrl+G by nebyl k ničemu)',
		(s) => s.replace("const diraSeVykousla = seskupeno && rezim === 'dira' && hloubka > 0;",
			"const diraSeVykousla = rezim === 'dira' && hloubka > 0;")],
	['otvor udělá i PLNÉ těleso',
		(s) => s.replace("const diraSeVykousla = seskupeno && rezim === 'dira' && hloubka > 0;",
			'const diraSeVykousla = seskupeno && hloubka > 0;')],
	['zvednutá díra prý pořád projde skrz',
		(s) => s.replace('const projdeSkrz = (h) => hloubkaVykusu(h) === TLOUSTKA;',
			'const projdeSkrz = (h) => true;')],
	['zvednutí nemá na hloubku výkusu vliv',
		(s) => s.replace('const hloubkaVykusu = (h) => Math.min(TLOUSTKA, h + VYSKA_VALCE) - Math.max(0, h);',
			'const hloubkaVykusu = (h) => TLOUSTKA;')],
	['zbytek materiálu se počítá z průměru, ne z poloměru',
		(s) => s.replace('const okrajMaterialu = (x, prumer) => x - polomer(prumer);',
			'const okrajMaterialu = (x, prumer) => x - prumer;')],
	['panel hlásí místo hloubky výkusu tloušťku placky',
		(s) => s.replace('return `Výkus hluboký ${hloubka} mm ze ${TLOUSTKA} mm',
			'return `Výkus hluboký ${TLOUSTKA} mm ze ${TLOUSTKA} mm')],
	['dno průchozího otvoru a mělkého důlku prohozené',
		(s) => s.replace("otvorVnitrek.setAttribute('fill', skrz ? PLOCHA : DNO_DULKU);",
			"otvorVnitrek.setAttribute('fill', skrz ? DNO_DULKU : PLOCHA);")],
	// ——— podvrhy k nálezům nezávislé kontroly z 25. 9. 2026 (druhé kolo) ———
	// Obě vady byly typu „obrázek lže" a starý test je propustil, protože hlídal jen
	// atribut `fill`, ne to, co je z kresby VIDĚT. Vrácená vada teď musí test shodit.
	['stěna otvoru se zase kreslí jako trubka POD ústím (626 z 819 px² mimo ústí)',
		(s) => s.replace("otvorStena.setAttribute('d', stenaOtvoru(cx, cyUsti, rx, ry));",
			"otvorStena.setAttribute('d', plast(cx, cyUsti, py(SIRKA / 2, TLOUSTKA - hloubka), rx, ry));")],
	['stěna otvoru vyboulená přes okraj ústí (podíl 1,6 místo 0,45)',
		(s) => s.replace('const STENA_PODIL = 0.45;', 'const STENA_PODIL = 1.6;')],
	['vnitřek otvoru se kreslí pod ústím, kde ho ořez horní plochy sežere',
		(s) => s.replace('elipsa(otvorVnitrek, cx, cyUsti, rx, ry);',
			'elipsa(otvorVnitrek, cx, cyUsti + S * TLOUSTKA, rx, ry);')],
	['řez zboku zamlčí otvor — placka v něm zůstane celá, i když panel hlásí „projde skrz"',
		(s) => s.replace("rezPlacka.setAttribute('d', rezObrys(vykusOd, dirkaDo, rezY(TLOUSTKA - hloubka), diraSeVykousla, skrz));",
			"rezPlacka.setAttribute('d', rezObrys(vykusOd, dirkaDo, rezY(TLOUSTKA - hloubka), false, skrz));")],
	['mělký důlek se v řezu kreslí jako průchozí otvor',
		(s) => s.replace("rezObrys(vykusOd, dirkaDo, rezY(TLOUSTKA - hloubka), diraSeVykousla, skrz)",
			"rezObrys(vykusOd, dirkaDo, rezY(TLOUSTKA - hloubka), diraSeVykousla, true)")],
	['mezera v řezu nesahá až na pracovní plochu (poloviční hloubka)',
		(s) => s.replace("rezOtvor.setAttribute('height', zaokr(S * hloubka));",
			"rezOtvor.setAttribute('height', zaokr(S * hloubka / 2));")],
	['válec zůstane v řezu stát i po seskupení a mezeru po díře zakryje',
		(s) => s.replace("rezValec.setAttribute('opacity', valecVidet ? '1' : '0');",
			"rezValec.setAttribute('opacity', '1');")],
	['řez zboku kreslí placku silnější, než jaká je (pracovní plocha o 6 px níž)',
		(s) => s.replace('const REZ_Y0 = 158;', 'const REZ_Y0 = 164;')],
	['seskupená plná tělesa zůstanou dvoubarevná (jako by se nespojila)',
		(s) => s.replace("valecPlast.setAttribute('fill', seskupeno ? PLACKA_PLAST : VALEC_PLAST);",
			"valecPlast.setAttribute('fill', VALEC_PLAST);")],
	['panel zase vypíše záporný výsledek (2 − 6 = −4), který 6. ročník ještě nezná',
		(s) => s.replace('? `dírka ⌀ ${d} mm → poloměr ${r} mm přesahuje kraj o ${r} − ${xStred} = ${presahKraje(xStred, d)} mm`',
			'? `dírka ⌀ ${d} mm → u kraje zbyde ${xStred} − ${r} = ${okraj} mm materiálu`')],
	['přesah kraje se počítá z průměru, ne z poloměru',
		(s) => s.replace('const presahKraje = (x, prumer) => polomer(prumer) - x;',
			'const presahKraje = (x, prumer) => prumer - x;')],
	['díra je neprůhledná — pod ní není placku vidět',
		(s) => s.replace("valecPlast.setAttribute('fill-opacity', '0.7');", "valecPlast.setAttribute('fill-opacity', '1');")],
	['válec nižší než placka (dírka by nikdy neprošla skrz)',
		(s) => s.replace('const VYSKA_VALCE = 6;', 'const VYSKA_VALCE = 3;')],
	['posuvník průměru po 1 mm → poloměr v půlkách milimetru',
		(s) => s.replace('id="tc-d" min="4" max="12" step="2"', 'id="tc-d" min="4" max="12" step="1"')],
	['ořez otvoru je větší než placka (zářez by se překreslil přes vzduch)',
		(s) => s.replace('<polygon points="100,226 360,226 424,184 164,184" />',
			'<polygon points="60,266 400,266 464,144 124,144" />')],
	['popisek v obrázku tvrdí jinou tloušťku placky',
		(s) => s.replace('placka je 4 mm silná', 'placka je 5 mm silná')],
	['kresba placky neodpovídá rozměru 40 mm (natažená přední stěna)',
		(s) => s.replace('id="tc-placka-predni" points="100,226 360,226 360,252 100,252"',
			'id="tc-placka-predni" points="100,226 380,226 380,252 100,252"')],
	['dírka, která se kraje jen DOTÝKÁ, se vydává za přetečenou (text by odporoval obrázku)',
		(s) => s.replace('if (okraj < 0) return `Dírka přetekla', 'if (okraj <= 0) return `Dírka přetekla')],
	['a totéž ve vysvětlení pod obrázkem (dotyk kraje = prý zářez)',
		(s) => s.replace('if (okraj < 0) {', 'if (okraj <= 0) {')],
	['vysvětlení zamlčí, že se dírka kraje právě dotýká',
		(s) => s.replace("+ (okraj === 0 ? ' — dírka se kraje přesně dotýká, blíž už nesmí.' : '.');", "+ '.';")],
	['tlačítko zapomnělo zkratku Ctrl+G',
		(s) => s.replace("'🔗 Seskupit (Ctrl+G)'", "'🔗 Spojit tělesa'")],
	['↺ nevrací zvednutí válce',
		(s) => s.replace("d = 6; xStred = 6; zvednuti = 0; seskupeno = false;", 'd = 6; xStred = 6; seskupeno = false;')],
	['nadpis slibuje něco jiného, než simulace ukazuje',
		(s) => s.replace('Vyzkoušej: jak v Tinkercadu vznikne DÍRA 🕹️', 'Vyzkoušej: jak se v Tinkercadu otáčí pohled 🕹️')],
	['kóta pod plackou ukazuje jinam, než kde dírka je',
		(s) => s.replace("kotaSvisla.setAttribute('x1', zaokr(cx));", "kotaSvisla.setAttribute('x1', zaokr(cx + 20));")],
	['zploštění volené od oka (0,55) — dírka ⌀ 12 mm vyleze přes hranu placky',
		(s) => s.replace('const ZPLOSTENI = KY_Y / S;', 'const ZPLOSTENI = 0.55;')],
	['zploštění spočítané obráceně (S / KY_Y) — z dírky je svislý ovál',
		(s) => s.replace('const ZPLOSTENI = KY_Y / S;', 'const ZPLOSTENI = S / KY_Y;')],
	['zploštění kružnice se mění s velikostí dírky',
		(s) => s.replace('const ry = rx * ZPLOSTENI;', 'const ry = rx * ZPLOSTENI * 0.8;')],
	['měřítko kresby neodpovídá milimetrům (8 px místo 6,5)',
		(s) => s.replace('const S = 6.5;', 'const S = 8;')],
	// ——— podvrhy k nálezům nezávislé kontroly z 25. 9. 2026 (třetí kolo) ———
	// Obě závažné vady byly zase typu „text popírá obrázek" / „pohledy si odporují".
	['text zase tvrdí, že se zvednutá díra placky ani nedotkla (a přitom na ní přesně stojí)',
		(s) => s.replace('return `Díra začínala přesně na povrchu placky: překryv 0 mm, nevykousla nic.`',
			'return `Díra byla zvednutá o ${zvednuti} mm — placky se ani nedotkla.`')],
	['vysvětlení pod obrázkem zase tvrdí, že díra začínala až NAD plackou',
		(s) => s.replace('jejím spodkem se placky <strong>přesně dotýkala</strong>, ale ani o milimetr do ní `',
			'začínala až nad plackou, takže se jí ani nedotkla `')],
	['silueta placky se shora zase kreslí celá — zářez přes kraj vypadá jako uzavřená kapsa',
		(s) => s.replace('siluetaHorni(diraSeVykousla && okraj < 0 && skrz, cx, cyUsti, rx, ry)',
			'siluetaHorni(false, cx, cyUsti, rx, ry)')],
	['silueta se přeruší i u mělkého důlku, ačkoli pod ním materiál ke kraji zůstává (řez ho kreslí)',
		(s) => s.replace('siluetaHorni(diraSeVykousla && okraj < 0 && skrz, cx, cyUsti, rx, ry)',
			'siluetaHorni(diraSeVykousla && okraj < 0, cx, cyUsti, rx, ry)')],
	['výkus siluety obchází ústí větším obloukem, než jaké ústí je (mezi obrysem a dírkou by byl proužek)',
		(s) => s.replace('vykus.push(`${zaokr(cx + rx * Math.cos(fi))},${zaokr(cy + ry * Math.sin(fi))}`);',
			'vykus.push(`${zaokr(cx + rx * 1.2 * Math.cos(fi))},${zaokr(cy + ry * 1.2 * Math.sin(fi))}`);')],
	['průsečíky kraje se počítají z jiné elipsy, než jaká je nakreslená jako ústí',
		(s) => s.replace('const A = (b1 / rx) ** 2 + (b2 / ry) ** 2;', 'const A = (b1 / rx) ** 2 + (b2 / rx) ** 2;')],
	['panel počítá zbytek materiálu u kraje i tam, kde žádná dírka není (plné těleso)',
		(s) => s.replace("\t\tif (rezim === 'plne') return `válec ⌀ ${d} mm vysoký ${VYSKA_VALCE} mm je PLNÝ — nic nevykousne`;\n", '')],
	['zvednutá díra přes kraj hlásí zářez, jako by šel přes celou tloušťku',
		(s) => s.replace('`mělký zářez hluboký ${hloubka} mm ze ${TLOUSTKA} mm.`',
			'`zářez přes celou tloušťku ${TLOUSTKA} mm.`')],
	// ——— podvrhy k nálezům nezávislé kontroly z 25. 9. 2026 (čtvrté kolo) ———
	['vysvětlení ukazuje na dvě hrany v řezu, jenže po seskupení je válec neviditelný (opacity 0)',
		(s) => s.replace("'nezasahovala — před seskupením ležely v řezu zboku obě hrany na sobě. Překryv byl '",
			"'nezasahovala (v řezu zboku obě hrany leží na sobě). Překryv je '")],
	['stěna otvoru se kreslí třikrát hlubší, než je ústí — z dírky trčí trubka nad plochu placky',
		(s) => s.replace("otvorStena.setAttribute('d', stenaOtvoru(cx, cyUsti, rx, ry));",
			"otvorStena.setAttribute('d', stenaOtvoru(cx, cyUsti, rx, ry * 3));")],
	['zadní oblouk stěny otvoru vede mimo ústí (ry × 3) — srpek přeteče na neporušenou plochu',
		(s) => s.replace('+ ` A ${zaokr(rx)},${zaokr(ry)} 0 0 1 ${zaokr(cx + rx)},${zaokr(cy)}`',
			'+ ` A ${zaokr(rx)},${zaokr(ry * 3)} 0 0 1 ${zaokr(cx + rx)},${zaokr(cy)}`')],
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
