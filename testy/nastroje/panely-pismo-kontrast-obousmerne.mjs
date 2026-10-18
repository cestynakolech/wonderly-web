// OBOUSMĚRNÉ OVĚŘENÍ panely-pismo-kontrast.mjs: podvrh se musí najít, zdravý panel i známý starý panel musí mlčet.
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { zkontrolujPismoAKontrast, nejmensiPismo, najdiMeridlo } from './panely-pismo-kontrast.mjs';

let chyb = 0;
const tvrdi = (p, ok) => { if (!ok) { chyb++; console.log(`  ✗ ${p}`); } };
const svg = (pismo) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 300">${pismo}</svg>`;

tvrdi('atribut font-size=11 → 11', nejmensiPismo(svg('<text font-size="11">a</text><text font-size="18">b</text>')) === 11);
tvrdi('CSS font-size:12px → 12', nejmensiPismo(svg('<style>.a{font-size:12px}</style><text class="a">a</text>')) === 12);
tvrdi('bez písma → null', nejmensiPismo(svg('<rect/>')) === null);

function beh(soubory, zname) {
	const d = mkdtempSync(join(tmpdir(), 'pismo-'));
	try {
		mkdirSync(join(d, 'public/materialy/x'), { recursive: true });
		mkdirSync(join(d, 'testy/nastroje'), { recursive: true });
		for (const [n, t] of Object.entries(soubory)) writeFileSync(join(d, 'public/materialy/x', n), t);
		writeFileSync(join(d, 'testy/nastroje/pismo-panelu-zname.json'), JSON.stringify(zname));
		const chybyP = [], varo = [];
		const log = console.log; console.log = () => {};
		try { zkontrolujPismoAKontrast({ chyby: chybyP, varovani: varo }, { koren: d, bezKontrastu: true }); } finally { console.log = log; }
		return chybyP;
	} finally { rmSync(d, { recursive: true, force: true }); }
}
tvrdi('PODVRH: nový panel s písmem 11 padá', beh({ 'a-panel-1.svg': svg('<text font-size="11">a</text>') }, {}).length === 1);
tvrdi('ZDRAVÝ: panel s písmem 14 mlčí', beh({ 'a-panel-1.svg': svg('<text font-size="14">a</text>') }, {}).length === 0);
tvrdi('ZNÁMÝ starý panel (13) mlčí', beh({ 'a-panel-1.svg': svg('<text font-size="13">a</text>') }, { 'public/materialy/x/a-panel-1.svg': 13 }).length === 0);
tvrdi('PODVRH: známý starý panel zmenšený 13→11 padá', beh({ 'a-panel-1.svg': svg('<text font-size="11">a</text>') }, { 'public/materialy/x/a-panel-1.svg': 13 }).length === 1);
tvrdi('soubor, který není panel, se neměří', beh({ 'obrazek.svg': svg('<text font-size="9">a</text>') }, {}).length === 0);

// ---- KONTRASTNÍ větev: mini git repo (zdravý commit → tracked změna / nesledovaný panel / chybějící skript)
const bila = '<rect width="460" height="300" fill="#ffffff"/>';
const panel = (barva) => svg(`${bila}<text x="20" y="100" font-size="24" fill="${barva}">Text</text>`);
function kontrastBeh(uprav, opt = {}) {
	const d = mkdtempSync(join(tmpdir(), 'kontrast-'));
	try {
		const dir = join(d, 'public/materialy/x');
		mkdirSync(dir, { recursive: true });
		mkdirSync(join(d, 'testy/nastroje'), { recursive: true });
		writeFileSync(join(d, 'testy/nastroje/pismo-panelu-zname.json'), '{}');
		writeFileSync(join(dir, 'a-panel-1.svg'), panel('#000000'));
		const g = (...a) => execFileSync('git', a, { cwd: d, stdio: 'pipe' });
		g('init', '-q'); g('add', '.'); g('-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'x');
		uprav(dir);
		const chybyP = [], varo = [];
		const log = console.log; console.log = () => {};
		try { zkontrolujPismoAKontrast({ chyby: chybyP, varovani: varo }, { koren: d, ...opt }); } finally { console.log = log; }
		return { chyby: chybyP, varo };
	} finally { rmSync(d, { recursive: true, force: true }); }
}
if (najdiMeridlo()) {
	const zdravy = kontrastBeh(() => {});
	tvrdi('KONTRAST zdravý stav mlčí', zdravy.chyby.length === 0 && zdravy.varo.length === 0);
	const trk = kontrastBeh((dir) => writeFileSync(join(dir, 'a-panel-1.svg'), panel('#eeeeee')));
	tvrdi('KONTRAST PODVRH: tracked změna na #eee padá', trk.chyby.length === 1);
	const nes = kontrastBeh((dir) => writeFileSync(join(dir, 'b-panel-1.svg'), panel('#eeeeee')));
	tvrdi('KONTRAST PODVRH: nesledovaný nízký kontrast = varování o kontrastu, ne chyba',
		nes.chyby.length === 0 && nes.varo.length === 1 && /kontrast pod 4,5:1/.test(nes.varo[0]));
} else {
	console.log('PŘESKOČENO: kontrastní větev (měřidlo kontrast_textu_svg.py / python3+PIL / sharp není dostupné, např. Cloudflare)');
}
const bezSkriptu = kontrastBeh((dir) => writeFileSync(join(dir, 'a-panel-1.svg'), panel('#eeeeee')), { skript: '/neexistuje/kontrast.py' });
tvrdi('KONTRAST: chybějící měřidlo = varování, ne tichá zelená', bezSkriptu.varo.length === 1 && bezSkriptu.chyby.length === 0);

if (chyb) { console.log(`❌ panely-pismo-kontrast: ${chyb} selhání`); process.exit(1); }
console.log('✅ panely-pismo-kontrast: obousměrné ověření prošlo');
