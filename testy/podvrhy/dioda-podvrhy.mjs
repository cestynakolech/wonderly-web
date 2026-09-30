#!/usr/bin/env node
// Obousměrné ověření testy/simulace/dioda.mjs (DiodaSimulace, přechod PN).
// Pracuje VÝHRADNĚ nad kopií komponenty v dočasné složce — do repa nesahá.
// Směr 1: zdravá kopie musí testem projít. Směr 2: každý podvrh (vrácená vada
// z protokolu kontrolora T3e nebo obdobná) musí test SHODIT.
// Spuštění: node testy/podvrhy/dioda-podvrhy.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ZDROJ = join(REPO, 'src/components/skola2/DiodaSimulace.astro');
const TEST = join(REPO, 'testy/simulace/dioda.mjs');
const WORKDIR = mkdtempSync(join(tmpdir(), 'dioda-podvrh-'));
const KOPIE = join(WORKDIR, 'DiodaSimulace.astro');
process.on('exit', () => { try { rmSync(WORKDIR, { recursive: true, force: true }); } catch {} });
const puvodni = readFileSync(ZDROJ, 'utf8');

const PODVRHY = [
	['nález 1: šipka proudu přechodem N → P', 'x1="330" y1="312" x2="30" y2="312"', 'x1="30" y1="312" x2="330" y2="312"'],
	['nález 1: šipka na horním vodiči proti smyčce', 'points="280,62 260,54 260,70"', 'points="260,62 280,54 280,70"'],
	['elektrony v přechodu jdou k typu N (s proudem)', 'return [1, 0]; // přechodem od N k P', 'return [-1, 0]; // přechodem od N k P'],
	['díry jdou proti proudu', 'pohyb: vede ? [-1, 0] : null', 'pohyb: vede ? [1, 0] : null'],
	['elektron na levém vodiči jde nahoru', 'if (x === 14) return [0, 1];', 'if (x === 14) return [0, -1];'],
	['nález 2: vrácený práh 2 V v úvodu', 'se hradlová vrstva <strong>zužuje</strong>, proud prochází', 'od <strong>2 V</strong> se hradlová vrstva <strong>zužuje</strong>, proud prochází'],
	['nález 2: „hradlová vrstva zmizela"', "'hradlová vrstva se zužuje.'", "'hradlová vrstva zmizela.'"],
	['nález 2: vrácený údaj mA', 'Proud prochází (od +', 'Proud 5 mA prochází (od +'],
	['nález 3: díra červené „+"', 'stroke="#1b6b2d" stroke-width="2" stroke-dasharray="4 2" /><text x="${c.x}" y="${c.y + 7}" text-anchor="middle" font-size="19" font-weight="bold" fill="#1b6b2d">', 'stroke="#e03131" stroke-width="2" /><text x="${c.x}" y="${c.y + 7}" text-anchor="middle" font-size="19" font-weight="bold" fill="#e03131">'],
	['nález 3: typ N modrý', 'fill="#ffe3e3" stroke="#c2255c"', 'fill="#d0ebff" stroke="#2b2a26"'],
	['nález 4: popisek LED přes vodič', '<text x="8" y="24" font-size="19"', '<text x="8" y="66" font-size="19"'],
	['závěrný směr hradlovou vrstvu zúží', 'const ZONA_UZKA = 16, ZONA_SIROKA = 140;', 'const ZONA_UZKA = 140, ZONA_SIROKA = 16;'],
	['zdroj se při otočení nepřepóluje', "nastav('dioda-bat-dlouha', { x1: s.plusUP ? 192 : 168, x2: s.plusUP ? 192 : 168 });", "nastav('dioda-bat-dlouha', { x1: 192, x2: 192 });"],
	['LED svítí i v závěrném směru', "nastav('dioda-paprsky', { opacity: s.ledSviti ? 1 : 0 });", "nastav('dioda-paprsky', { opacity: 1 });"],
	['K1 mobil: stará široká scéna 660', 'viewBox="0 0 360 516"', 'viewBox="0 0 660 516"'],
	['K1 mobil: drobné písmo v legendě', 'font-size="19" font-weight="bold" fill="#2b2a26">pohyb nositele náboje', 'font-size="13" font-weight="bold" fill="#2b2a26">pohyb nositele náboje'],
	['K2/D7: světle oranžový popisek šipky', 'fill="#b33d06">směr proudu: P → N', 'fill="#e8590c">směr proudu: P → N'],
	['K4: „pohyb nosiče"', '>pohyb nositele náboje<', '>pohyb nosiče<'],
	['K5: tlačítka bez aria-pressed', "g(t.id).setAttribute('aria-pressed', zvoleno ? 'true' : 'false');", ''],
	['K5: statický aria-label scény', "nastav('dioda-svg', { 'aria-label': s.popisSceny });", ''],
];

const beh = () => { const r = spawnSync(process.execPath, [TEST, KOPIE], { encoding: 'utf8' }); return { status: r.status, pad: ((r.stdout ?? '').match(/❌/g) || []).length }; };
let spatne = 0;
writeFileSync(KOPIE, puvodni);
const zdrava = beh();
if (zdrava.status === 0) console.log('✅ ZDRAVÁ KOPIE prošla (0 ❌)');
else { console.log(`❌ ZDRAVÁ KOPIE neprošla (${zdrava.pad} ❌)`); process.exit(1); }
for (const [nazev, co, cim] of PODVRHY) {
	if (!puvodni.includes(co)) { console.log(`⚠️  vzor nenalezen — ${nazev}`); spatne++; continue; }
	writeFileSync(KOPIE, puvodni.replace(co, cim));
	const r = beh();
	if (r.status !== 0) console.log(`✅ odhaleno (${r.pad} ❌): ${nazev}`);
	else { console.log(`❌ PROŠLO: ${nazev}`); spatne++; }
}
console.log(spatne ? `\n❌ ${spatne} podvrhů neodhaleno` : `\n✅ všech ${PODVRHY.length} podvrhů odhaleno`);
process.exit(spatne ? 1 : 0);
