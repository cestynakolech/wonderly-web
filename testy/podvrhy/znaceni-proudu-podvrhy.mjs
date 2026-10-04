#!/usr/bin/env node
// Obousměrné ověření kontrol v testy/simulace/znaceni-proudu.mjs.
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
// Spuštění:  node testy/podvrhy/znaceni-proudu-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = process.env.REPO ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/ZnaceniProuduSimulace.astro');
const TEST = join(REPO, 'testy/simulace/znaceni-proudu.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'znaceni-proudu-podvrh-'));
const KOPIE = join(WORKDIR, 'znaceni-proudu-podvrh.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });

const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	// —— fyzika / význam značek ——
	['čela vodiče prohozená (k nám křížek, od nás tečka)', (s) => s.replace("[[190, 'tecka'], [-190, 'krizek']]", "[[190, 'krizek'], [-190, 'tecka']]")],
	['šíp se otáčí na opačnou stranu než vodič (hrot od nás při „k nám")', (s) => s.replace('gSip.innerHTML = sipSvg(s.phi, s.m, SIP);', 'gSip.innerHTML = sipSvg(-s.phi, s.m, SIP);')],
	['popisek u tečky tvrdí „od nás"', (s) => s.replace("r1: 'proud teče k nám'", "r1: 'proud teče od nás'")],
	['popisek u křížku tvrdí „k nám"', (s) => s.replace("r1: 'proud teče od nás'", "r1: 'proud teče k nám'")],
	['kreslí se i odvrácená čela (tečka i křížek naráz)', (s) => s.replace('if (!celo) continue;', 'if (!celo) { /* nic */ }').replace("data-dil=\"tecka\" />`;", "data-dil=\"tecka\" />`;").replace('const celo = plocha(kruh(x, 22, 32), \'#ffd43b\', phi, stred,\n\t\t\t\t{ uvnitr: [0, 0, 0],', 'const celo = plocha(kruh(x, 22, 32), \'#ffd43b\', phi, stred,\n\t\t\t\t{ oboustranna: true, uvnitr: [0, 0, 0],')],
	['široký hrot (jako dřív) místo štíhlé špičky', (s) => s.replace('rHrotu = 10 - 1 * m', 'rHrotu = 12 + 10 * m')],
	['opeření jen ze 2 per (jedna plocha, ne zkřížené)', (s) => s.replace('for (const uhel of [45, 135, 225, 315])', 'for (const uhel of [45, 225])')],
	['pera opeření rovně (+ místo ×)', (s) => s.replace('for (const uhel of [45, 135, 225, 315])', 'for (const uhel of [0, 90, 180, 270])')],
	['bez perspektivy (rovnoběžné promítání)', (s) => s.replace('const k = D / (D - q[2]);', 'const k = 1;')],
	['malířův algoritmus obráceně (blízké se kreslí první)', (s) => s.split('casti.sort((a, b) => a.z - b.z);').join('casti.sort((a, b) => b.z - a.z);')],
	['bez ostří hrotu (tečka nevznikne)', (s) => s.replace('okraj + tecka, natoc', 'okraj, natoc')],
	['bez kolečka opeření', (s) => s.replace("casti.push(soucast([kolecko], '', kolecko.z));", '')],

	// —— časování ——
	['otáčení skokem (bez plynulého přechodu)', (s) => s.replace('const hladce = (u) => u * u * (3 - 2 * u);', 'const hladce = (u) => (u < 0.5 ? 0 : 1);')],
	['pohled z čela kratší (k nám jen do 6,5 s)', (s) => s.replace("{ od: 5, do: 7.5, r1: 'proud teče k nám'", "{ od: 5, do: 6.5, r1: 'proud teče k nám'").replace('else if (t < 7.5) { phi = 90; }', 'else if (t < 6.5) { phi = 90; }')],
	['smyčka 12 s místo 14 s', (s) => s.replace('const DELKA = 14;', 'const DELKA = 12;')],
	['smyčka podle počtu snímků, ne podle hodin', (s) => s.replace('tPauza = (((ted - zacatek) / 1000) % DELKA);', 'tPauza = (tPauza + 0.016) % DELKA;')],

	// —— ovládání a přístupnost ——
	['tlačítko ⊙ zastaví ve špatném čase', (s) => s.replace('zastav(6));', 'zastav(4));')],
	['tlačítko ⊗ zastaví ve špatném čase', (s) => s.replace('zastav(11));', 'zastav(9));')],
	['ignoruje prefers-reduced-motion', (s) => s.replace("const omezitPohyb = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;", 'const omezitPohyb = false;')],
	['statický obraz ukáže jen jednu značku', (s) => s.replace('sipSvg(90, 1, [120, 95]) + sipSvg(-90, 1, [360, 95])', 'sipSvg(90, 1, [120, 95]) + sipSvg(90, 1, [360, 95])').replace('dratSvg(90, [120, 235]) + dratSvg(-90, [360, 235])', 'dratSvg(90, [120, 235]) + dratSvg(90, [360, 235])')],
	['aria-label bez popisu značek', (s) => s.replace('hrot šípu je vidět jako tečka v kolečku', 'hrot šípu je vidět')],
];

const spust = () => spawnSync('node', [TEST, KOPIE], { encoding: 'utf8', timeout: 60_000 });

// Směr 1: ZDRAVÁ kopie musí projít.
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
