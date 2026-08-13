#!/usr/bin/env node
// Ověření KolobehVodySimulace.astro — koloběh vody a jeho motor.
//
// Hlavní věc, kterou má scéna naučit, je zároveň to, co by nejtišeji lhalo:
// voda se v koloběhu NESPOTŘEBOVÁVÁ ani nevyrábí. Součet dílů musí být 100
// při každém nastavení Slunce; kdyby se rozešel, učila by stránka pravý opak
// toho, co má výklad označený jako běžný omyl.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild() {},
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const document = { getElementById: (id) => prvky.get(id) || novy(id), querySelectorAll: () => [] };
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('kol-svg');
const slider = prvky.get('kol-slider');
const rozdeleni = svg.__rozdeleni;
const CELKEM = svg.__celkem;

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const nastav = (s) => { slider.value = String(s); for (const f of slider.posluchaci.input) f(); };

console.log('— vody je pořád stejně (jádro učiva) —');
{
	// Test si celkové množství bere z komponenty, takže by sám o sobě přijal
	// i 101 dílů (odhalil mutační test). Číslo má být kulatých 100 — díly se
	// pak čtou rovnou jako procenta.
	ok(CELKEM === 100, `celek je ${CELKEM} dílů — kulaté číslo, které se čte i jako procenta`);
	let sedi = true, cela = true, zaporne = false;
	for (let s = 0; s <= 4; s++) {
		const d = rozdeleni(s);
		if (d.more + d.vzduch + d.led !== CELKEM) sedi = false;
		if (![d.more, d.vzduch, d.led].every(Number.isInteger)) cela = false;
		if (d.more < 0 || d.vzduch < 0 || d.led < 0) zaporne = true;
	}
	ok(sedi, `při všech pěti silách Slunce dává součet přesně ${CELKEM} dílů — voda se nespotřebovává ani nevyrábí`);
	ok(cela, 'a všechny díly jsou celá čísla');
	ok(!zaporne, 'nikde nevyjde záporné množství vody');
}

console.log('\n— Slunce je motor koloběhu —');
{
	const noc = rozdeleni(0);
	ok(noc.vzduch === 0, `bez Slunce není ve vzduchu ani díl vody (${noc.vzduch}) — koloběh stojí`);
	const rada = [0, 1, 2, 3, 4].map((s) => rozdeleni(s).vzduch);
	let roste = true;
	for (let i = 1; i < rada.length; i++) if (rada[i] <= rada[i - 1]) roste = false;
	ok(roste, `se silnějším Sluncem vody ve vzduchu přibývá: ${rada.join(' → ')} dílů`);
	const led = [0, 1, 2, 3, 4].map((s) => rozdeleni(s).led);
	let klesa = true;
	for (let i = 1; i < led.length; i++) if (led[i] >= led[i - 1]) klesa = false;
	ok(klesa, `a ledovce přitom tají: ${led.join(' → ')} dílů`);
	ok(rozdeleni(4).more > rozdeleni(0).more,
		`voda z roztátého ledu skončí v moři (${rozdeleni(0).more} → ${rozdeleni(4).more} dílů) — nikam se neztratí`);
}

// ── SCÉNA ────────────────────────────────────────────────────────────────────
const oblak = prvky.get('kol-oblak');
const sipky = prvky.get('kol-sipky');
const pocty = prvky.get('kol-pocty');
const ledovec = prvky.get('kol-ledovec');
const slunce = prvky.get('kol-slunce');
const paprsky = prvky.get('kol-paprsky');

console.log('\n— scéna v noci: nic se neděje —');
{
	nastav(0);
	ok(oblak.innerHTML === '', 'žádný oblak — ve vzduchu není voda, ze které by vznikl');
	ok(paprsky.innerHTML === '', 'slunce nemá paprsky');
	ok(slunce.atributy.fill === '#adb5bd', `a je zašedlé (${slunce.atributy.fill})`);
	ok(!sipky.innerHTML.includes('vypařování'), 'nekreslí se šipka vypařování — nic se nevypařuje');
	ok(prvky.get('kol-stav').textContent.includes('motorem'),
		`hláška to říká rovnou: „${prvky.get('kol-stav').textContent.slice(0, 70)}…"`);
}

console.log('\n— scéna ve dne: koloběh běží —');
{
	nastav(3);
	ok(oblak.innerHTML.includes('ellipse'), 'objeví se oblak');
	ok(paprsky.innerHTML.split('<line').length - 1 === 8, 'slunce dostane osm paprsků');
	for (const slovo of ['vypařování', 'srážky', 'kondenzace', 'odtok']) {
		ok(sipky.innerHTML.includes(slovo), `ve scéně je popsané „${slovo}"`);
	}
	// Výklad zdůrazňuje, že voda stěhuje energii: vypařování teplo spotřebuje,
	// kondenzace ho zase uvolní. Obojí musí být u své šipky, ne jen v textu.
	ok(sipky.innerHTML.includes('spotřebuje teplo') && sipky.innerHTML.includes('teplo se zase uvolní'),
		'a u šipek stojí, kde se teplo spotřebuje a kde zase uvolní');
}

console.log('\n— oblak roste s vodou ve vzduchu —');
{
	nastav(1);
	const maly = +/rx="([\d.]+)"/.exec(oblak.innerHTML)[1];
	nastav(4);
	const velky = +/rx="([\d.]+)"/.exec(oblak.innerHTML)[1];
	ok(velky > maly, `slabé Slunce → oblak rx=${maly}, nejsilnější → rx=${velky}`);
}

console.log('\n— ledovec ve scéně opravdu taje —');
{
	nastav(0);
	const zima = ledovec.atributy.points;
	nastav(4);
	const leto = ledovec.atributy.points;
	ok(zima !== leto, 'tvar ledovce se se Sluncem mění');
	const sirka = (b) => { const c = b.split(' ').map((x) => +x.split(',')[0]); return Math.max(...c) - Math.min(...c); };
	ok(sirka(zima) > sirka(leto), `a v létě je menší (šířka ${sirka(zima)} → ${sirka(leto)} px)`);
}

console.log('\n— počitadlo ve scéně ukazuje týž součet —');
for (const s of [0, 2, 4]) {
	nastav(s);
	const cisla = [...pocty.innerHTML.matchAll(/(\d+) díl/g)].map((m) => +m[1]);
	const d = rozdeleni(s);
	ok(cisla[0] === d.more && cisla[1] === d.vzduch && cisla[2] === d.led && cisla[3] === CELKEM,
		`Slunce ${s}: moře ${cisla[0]} + vzduch ${cisla[1]} + led ${cisla[2]} = ${cisla[3]} dílů`);
	ok(cisla[0] + cisla[1] + cisla[2] === cisla[3],
		`a ta čtyři čísla si sedí — počitadlo nemůže tvrdit něco jiného než scéna`);
}

console.log('\n— nic se ve scéně nepřekrývá —');
{
	// Nález z vyrenderovaného obrázku: počitadlo leželo vlevo nahoře PŘES oblak
	// a přes popisek kondenzace, který se tím stal nečitelným. Dostalo proto
	// vlastní pruh pod mořem (moře končí na y=400).
	nastav(4);
	const ram = /<rect x="\d+" y="(\d+)"/.exec(pocty.innerHTML);
	ok(+ram[1] >= 400, `počitadlo má vlastní pruh pod mořem (y=${ram[1]}), nekreslí se přes oblohu`);
	const yTextu = [...pocty.innerHTML.matchAll(/<text[^>]*y="(\d+)"/g)].map((m) => +m[1]);
	ok(yTextu.every((y) => y > 400), `a všechny jeho řádky taky (y = ${yTextu.join(', ')})`);
	// oblak musí zůstat v horní části, kde má místo
	const cy = +/ellipse cx="\d+" cy="(\d+)"/.exec(oblak.innerHTML)[1];
	ok(cy < 200, `oblak zůstává nahoře (cy=${cy}) — mezi ním a počitadlem je celá scéna`);
}

console.log('\n— čeština: díl, díly, dílů —');
{
	// Scéna psala „ve vzduchu: 4 dílů“. Chyby ve skloňování si žák všimne dřív
	// než učiva, a v počitadle se čísla mění při každém pohybu posuvníku.
	const dilu = svg.__dilu;
	const ocekavane = { 0: '0 dílů', 1: '1 díl', 2: '2 díly', 4: '4 díly', 5: '5 dílů', 8: '8 dílů', 14: '14 dílů', 100: '100 dílů' };
	for (const [n, tvar] of Object.entries(ocekavane)) {
		ok(dilu(+n) === tvar, `${n} → „${dilu(+n)}“`);
	}
	// a hlavně: žádné číslo, které se ve scéně opravdu objeví, nesmí být špatně
	let vsechny = true;
	for (let s = 0; s <= 4; s++) {
		nastav(s);
		if (/(?:^|[^\d])[234] dílů/.test(pocty.innerHTML) || / 1 díly| 1 dílů/.test(pocty.innerHTML)) vsechny = false;
	}
	ok(vsechny, 'a v počitadle nevyjde špatný tvar při žádném nastavení Slunce');
}

console.log(chyby === 0 ? '\n✅ Koloběh vody: vše sedí.' : `\n❌ Koloběh vody: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);
