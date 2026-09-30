#!/usr/bin/env node
// Obousměrné ověření testu testy/simulace/teziste-stabilita.mjs.
// (1) ZDRAVÁ kopie komponenty musí testem projít, (2) každý PODVRH musí test shodit.
// Pracuje jen na kopiích v dočasné složce — do repa se nesahá.
// Spuštění z kořene repa: node testy/podvrhy/teziste-stabilita-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const koren = process.cwd();
const komponenta = join(koren, 'src/components/skola2/TezisteStabilitaSimulace.astro');
const test = join(koren, 'testy/simulace/teziste-stabilita.mjs');
const puvodni = readFileSync(komponenta, 'utf8');
const slozka = mkdtempSync(join(tmpdir(), 'tzs-podvrh-'));

const PODVRHY = [
	['olovnice šikmo (ne svisle)', "o.setAttribute('x2', tx);", "o.setAttribute('x2', r2(tx + 8));"],
	['prohozený sinus a kosinus ve vzorci', 'v.teziste * Math.sin(u * RAD) - (v.kola / 2) * Math.cos(u * RAD)', 'v.teziste * Math.cos(u * RAD) - (v.kola / 2) * Math.sin(u * RAD)'],
	['převrácení až za celou šířkou (kola místo kola/2)', '- (v.kola / 2) * Math.cos(u * RAD)', '- v.kola * Math.cos(u * RAD)'],
	['mezní úhel počítaný s celou šířkou', 'Math.atan2(v.kola / 2, v.teziste)', 'Math.atan2(v.kola, v.teziste)'],
	['hláška tvrdí aktuální náklon (nepravda při skoku posuvníku)', 'převrátilo se · vydrží nejvýš ${vydrzi(k)}°', 'převrátilo se při ${uhel}°'],
	['hláška „vydrží" s úhlem převrácení místo posledního stojícího', 'const vydrzi = (k) => mezniCely(k) - 1;', 'const vydrzi = (k) => mezniCely(k);'],
	['formule s koly 160 cm (neodpovídá kótě 200 cm)', 'kola: 200', 'kola: 160'],
	['náklaďák s těžištěm 140 cm (neodpovídá kótě)', 'teziste: 150', 'teziste: 140'],
	['hrana na vnitřním okraji kola', 'const d = (STRED - VOZY[k].kola / 2) * S;', 'const d = (STRED - VOZY[k].kola / 2 + 20) * S;'],
	['převrácení bez animace (okamžitě)', 'const PAD = 700;', 'const PAD = 1;'],
	['pád rovnoměrný místo zrychleného', 'py: ey + t * t * (ZEM - ey),', 'py: ey + t * (ZEM - ey),'],
	['vozidlo se napřed otočí a teprve pak padá (visí ve vzduchu)', 'py: ey + t * t * (ZEM - ey),', 'py: ey + Math.max(0, 2 * t - 1) ** 2 * (ZEM - ey),'],
	['vozidlo zůstane přilepené na desce (nepadá na zem)', 's.pad = Math.min(1, (ted - s.start) / PAD);', 's.pad = 0;'],
	['ležící vozidlo se dál naklání s deskou', 'fi: u + t * (90 - u),', 'fi: u + t * 90,'],
	['pád se počítá z aktuálního úhlu desky (nález recheck 3)', 'const u = s.prevraceno ? s.uhel0 : uhel;', 'const u = uhel;'],
	['deska během pádu sleduje posuvník (projede vozidlem)', 'const uhelDesky = (k) => (stav[k].bezi ? stav[k].uhel0 : uhel);', 'const uhelDesky = (k) => uhel;'],
	['úhel převrácení se neuloží', 's.uhel0 = uhel;', ''],
	['vozidlo dopadne pod stojan', 'const DOPAD_X = 260;', 'const DOPAD_X = 200;'],
	['vozidlo dopadne ke kraji scény', 'const DOPAD_X = 260;', 'const DOPAD_X = 280;'],
	['kóty zůstanou i po převrácení', "s.prevraceno ? '0' : '1'", "'1'"],
	['olovnice končí nad zemí', "o.setAttribute('y2', ZEM - ZAVAZI);", "o.setAttribute('y2', ty + 5);"],
	['popisek výšky leží na kótě', 'bod(k, -hrana - 50, v.teziste / 2, p)', 'bod(k, -hrana - 24, v.teziste / 2, p)'],
	['aria-valuetext chybí aktualizace', "$('tzs-uhel').setAttribute('aria-valuetext', `${uhel} ${stupne(uhel)}`);", ''],
	['aria-valuetext špatný tvar pro 2–4', "2 <= n && n <= 4 ? 'stupně'", "2 <= n && n <= 4 ? 'stupňů'"],
	['písmo kót 17 (na telefonu 360 px pod 12 px)', 'font-size="20"', 'font-size="17"'],
	['mřížka s pevným minimem 260 px (na telefonu přeteče)', 'minmax(min(260px, 100%), 1fr)', 'minmax(260px, 1fr)'],
	['scény na telefonu neroztažené do okraje rámečku', '.tzs-sceny { margin-inline: -1rem; }', '.tzs-sceny { margin-inline: 0rem; }'],
	['závěr bez nízkého těžiště', '<strong>těžiště nízko</strong>', '<strong>těžiště vysoko</strong>'],
	['Znovu nevrátí posuvník', "$('tzs-uhel').value = '0';", ''],
	['vozidlo se po zmenšení náklonu samo postaví', 'if (!s.prevraceno && 0 < presah(k, uhel)) {', 'if (!(0 < presah(k, uhel))) s.prevraceno = false;\n\t\t\t\tif (!s.prevraceno && 0 < presah(k, uhel)) {'],
	['podložka se naklápí o polovinu úhlu', '`rotate(${uhelDesky(k)} ${OSA_X} ${OSA_Y})`);', '`rotate(${uhelDesky(k) / 2} ${OSA_X} ${OSA_Y})`);'],
	['posuvník do 80° místo 90°', 'max="90"', 'max="80"'],
	['chybí věta o sklouznutí', 'Předpokládáme, že stojící vozidlo po podložce nesklouzne.', 'Tření zanedbáváme.'],
];

function spust(zdroj) {
	const cesta = join(slozka, 'TezisteStabilitaSimulace.astro');
	writeFileSync(cesta, zdroj);
	const b = spawnSync(process.execPath, [test, cesta], { encoding: 'utf8', timeout: 60_000 });
	return { kod: b.status, spadlo: ((b.stdout ?? '').match(/❌/g) ?? []).length };
}

let chyby = 0;
const zdravy = spust(puvodni);
console.log(`${zdravy.kod === 0 ? '✅' : '❌'} zdravá kopie projde (kód ${zdravy.kod})`);
if (zdravy.kod !== 0) chyby++;
for (const [nazev, co, cim] of PODVRHY) {
	if (!puvodni.includes(co)) { console.log(`❌ podvrh „${nazev}": vzor v komponentě nenalezen — podvrh by nic neměnil`); chyby++; continue; }
	const r = spust(puvodni.replace(co, cim));
	const ok = r.kod !== 0;
	console.log(`${ok ? '✅' : '❌'} podvrh „${nazev}" ${ok ? `shodí test (${r.spadlo} kontrol)` : 'test NESHODÍ'}`);
	if (!ok) chyby++;
}
console.log(chyby === 0 ? `\n✅ ${PODVRHY.length} podvrhů odhaleno, zdravá kopie prošla` : `\n❌ CHYB: ${chyby}`);
process.exit(chyby === 0 ? 0 : 1);
