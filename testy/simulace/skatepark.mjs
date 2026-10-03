#!/usr/bin/env node
// Ověření SkateparkSimulace.astro (F8 přeměny energie na U-rampě).
// Spustí SKUTEČNÝ skript komponenty v Node s náhradním DOM.
//
// Proč vznikl (oprava 3. 10. 2026, odložený nález téma 2): sloupec ztráty třením měl
// popisek „Q“ a texty mluvily o „teple Q“ — výklad (zákon zachování mechanické
// energie) přitom říká, že se třením mechanická energie mění na VNITŘNÍ ENERGII,
// značku Q nezavádí. Test proto hlídá:
//  1) v ničem, co žák vidí (HTML, popisky SVG, texty ze skriptu ve všech stavech
//     i během jízdy), není „teplo“ ani značka „Q“ — místo nich „vnitřní energie“,
//     a ta má oporu ve výkladu podtématu;
//  2) popisek sloupce je SVG atribut (visibility), dvouřádkový a uvnitř scény;
//  3) ideální rampa: všechny polohy posuvníků (3 hmotnosti × 5 výšek × okamžitá
//     výška) dají celé jouly Ep + Ek = E0, sloupce mají správnou výšku;
//  4) se třením: každý přejezd ubere m · 10 · 1 J, ztráta přejde do vnitřní energie,
//     součet drží, skater po h0 přejezdech zastaví;
//  5) jízda (requestAnimationFrame) se třením sama dojede do zastavení.
//
// Spuštění: node testy/simulace/skatepark.mjs [cesta]
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const cesta = process.argv[2] || 'src/components/skola2/SkateparkSimulace.astro';
const zdroj = readFileSync(cesta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.replace(/^---[\s\S]*?---/, '').replace(/<script>[\s\S]*?<\/script>/, '').replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
const temata = readFileSync(new URL('../../src/data/temata.ts', import.meta.url), 'utf8');

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const konec = () => { console.log(`\n${chyby ? chyby + ' chyb' : 'vše v pořádku'}`); process.exit(chyby ? 1 : 0); };
const ZAKAZANE = /tepl[oa]\b|TEPLO|\bQ\b/;

// ---------- 1a) statický text ----------
const bezKomentaru = html.replace(/<!--[\s\S]*?-->/g, '');
const textStranky = bezKomentaru.replace(/<[^>]+>/g, ' ');
ok(!ZAKAZANE.test(textStranky), `statický text simulace nemá „teplo“ ani „Q“${ZAKAZANE.test(textStranky) ? ' — ' + textStranky.match(ZAKAZANE)[0] : ''}`);
const pop = bezKomentaru.match(/<text id="skate-q-pop" x="(\d+)" y="(\d+)" font-size="(\d+)"[^>]*visibility="hidden">(.*?)<\/text>/);
const radkyPop = pop ? [...pop[4].matchAll(/<tspan x="(\d+)"[^>]*>([^<]*)<\/tspan>/g)].map((m) => ({ x: +m[1], t: m[2] })) : [];
ok(radkyPop.map((r) => r.t).join(' ') === 'vnitřní energie', `popisek sloupce ztráty: „${radkyPop.map((r) => r.t).join(' ')}“ ve dvou řádcích`);
const vb = html.match(/id="skate-svg" viewBox="0 0 (\d+) (\d+)"/);
const sirka = (t, f) => t.length * 0.6 * f;
ok(!!pop && !!vb && radkyPop.every((r) => r.x === +pop[1] && r.x + sirka(r.t, +pop[3]) / 2 <= +vb[1] && r.x - sirka(r.t, +pop[3]) / 2 >= 610), `popisek „vnitřní energie“ se vejde do scény (střed ${pop && pop[1]}, šířka viewBoxu ${vb && vb[1]}) a nezasahuje do „Ek“`);
const sloupec = html.match(/<rect id="skate-bar-q" x="(\d+)" width="(\d+)"/);
ok(!!sloupec && !!pop && Math.abs(+sloupec[1] + +sloupec[2] / 2 - +pop[1]) < 1e-9, 'popisek je vystředěný pod sloupcem vnitřní energie');

// ---------- opora ve výkladu ----------
const radky = temata.split('\n');
const iVyklad = radky.findIndex((r, i) => /interakce: 'skatepark',/.test(r) && radky.slice(Math.max(0, i - 4), i).some((x) => /slug: 'zakon-zachovani-mechanicke-energie'/.test(x)));
const vyklad = iVyklad >= 0 ? radky.slice(iVyklad, iVyklad + 8).join('\n') : '';
ok(/část mechanické energie se přemění na vnitřní energii/.test(vyklad) && !/\bQ\b/.test(vyklad.replace(/<[^>]+>/g, ' ')), 'výklad zákona zachování mechanické energie mluví o vnitřní energii (a značku Q nemá)');

// ---------- náhradní DOM ----------
const prvky = new Map();
for (const m of html.matchAll(/<(\w+)\s([^>]*?)\/?>/g)) {
	const atr = {};
	for (const a of m[2].matchAll(/([\w-]+)="([^"]*)"/g)) atr[a[1]] = a[2];
	if (!atr.id) continue;
	prvky.set(atr.id, {
		id: atr.id, tag: m[1], atributy: { ...atr }, textContent: '', innerHTML: '', style: {}, posluchaci: {},
		value: atr.value ?? '', max: atr.max,
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	});
}
const rezimTl = [...html.matchAll(/<button [^>]*class="([^"]*)" data-rezim="(\w+)"/g)].map((m) => {
	const tridy = new Set(m[1].split(' '));
	return { dataset: { rezim: m[2] }, tridy, classList: { toggle: (t, a) => (a ? tridy.add(t) : tridy.delete(t)) } };
});
const fronta = [];
let zruseno = 0;
const document = { getElementById: (id) => prvky.get(id) || null, querySelectorAll: (s) => (s === '#skate-rezimy .skate-tl' ? rezimTl : []) };
let vyjimka = null;
try {
	vm.runInContext(skript, vm.createContext({ document, console, requestAnimationFrame: (f) => { fronta.push(f); return fronta.length; }, cancelAnimationFrame: () => { zruseno++; fronta.length = 0; } }));
} catch (e) { vyjimka = e; }
ok(!vyjimka, `skript komponenty doběhne bez výjimky${vyjimka ? ' — ' + String(vyjimka).split('\n')[0] : ''}`);
if (vyjimka) konec();

const el = (id) => prvky.get(id);
const at = (id, k) => el(id)?.getAttribute(k);
const klik = (id) => (el(id).posluchaci.click || []).forEach((f) => f());
const posun = (id, v) => { el(id).value = String(v); (el(id).posluchaci.input || []).forEach((f) => f()); };
const rezim = (r) => (el('skate-rezimy').posluchaci.click || []).forEach((f) => f({ target: { closest: () => rezimTl.find((b) => b.dataset.rezim === r) } }));
const aktivni = () => rezimTl.filter((b) => b.tridy.has('skate-aktivni')).map((b) => b.dataset.rezim).join();
const texty = [];
const zaznamenej = () => { for (const p of prvky.values()) for (const t of [p.textContent, p.innerHTML]) if (t) texty.push(t); };
const vyska = (id) => +at(id, 'height');
const sloupceSedi = (Ep, Ek, Q, E0) => {
	const mer = 250 / E0;
	return [['skate-bar-ep', Ep], ['skate-bar-ek', Ek], ['skate-bar-q', Q]].every(([id, v]) => Math.abs(vyska(id) - Math.max(v * mer, 0.5)) < 1e-9 && Math.abs(+at(id, 'y') - (310 - v * mer)) < 1e-9);
};

// ---------- výchozí stav (ideální rampa) ----------
ok(aktivni() === 'idealni' && at('skate-q-pop', 'visibility') === 'hidden' && at('skate-bar-q', 'visibility') === 'hidden', 'ideální rampa: sloupec i popisek vnitřní energie jsou skryté');
ok(el('skate-e-text').textContent === 'E = Ep + Ek = 1600 J', `výchozí stav: ${el('skate-e-text').textContent}`);
zaznamenej();

// ---------- 3) ideální rampa, všechny polohy ----------
let idealOk = true, chybaI = '';
for (const m of [20, 40, 60]) for (let h = 1; h <= 5; h++) {
	posun('skate-slider-m', m); posun('skate-slider-h', h);
	for (let y = h; y >= 0; y--) {
		posun('skate-slider-y', y);
		const E0 = m * 10 * h, Ep = m * 10 * y, Ek = E0 - Ep;
		const vz = el('skate-vypocet').innerHTML;
		const st = el('skate-stav').textContent;
		const cekSt = y === h ? 'Nahoře' : y === 0 ? 'Dole' : 'Mezi tím';
		const dobre = vz === `Ep = ${m} × 10 × ${y} = <strong>${Ep} J</strong> &nbsp;·&nbsp; Ek = <strong>${Ek} J</strong> &nbsp;·&nbsp; součet vždy <strong>${E0} J</strong>`
			&& el('skate-e-text').textContent === `E = Ep + Ek = ${E0} J` && st.includes(cekSt) && sloupceSedi(Ep, Ek, 0, E0)
			&& el('skate-out-y').textContent === `${y} m` && el('skate-out-m').textContent === `${m} kg` && el('skate-out-h').textContent === `${h} m`
			&& Number.isInteger(Ep) && Number.isInteger(Ek) && +el('skate-slider-y').max === h;
		if (!dobre && !chybaI) chybaI = `${m} kg, ${h} m, y ${y}: ${vz.replace(/<[^>]+>|&nbsp;/g, '')} | ${st}`;
		idealOk &&= dobre;
		zaznamenej();
	}
}
ok(idealOk, `ideální rampa: všech ${3 * 20} poloh dá celé jouly, Ep + Ek = E0, správné sloupce a texty${chybaI ? ' — ' + chybaI : ''}`);
// poloha skatera na levé stěně (Bézierova křivka): y = 5 m → x = 40, y = 0 → x = 200
posun('skate-slider-h', 5); posun('skate-slider-y', 5);
ok(+at('skate-telo', 'cx') === 40 && +at('skate-telo', 'cy') === 280 - 44 * 5 - 18 && +at('skate-prkno', 'x') === 23 && +at('skate-prkno', 'y') === 280 - 220 - 8, 'skater v 5 m stojí nahoře na levé stěně (x 40)');
posun('skate-slider-y', 0);
ok(+at('skate-telo', 'cx') === 200 && +at('skate-telo', 'cy') === 262, 'skater v 0 m je v patě levé stěny (x 200)');
posun('skate-slider-y', 1);
ok(Math.abs(+at('skate-telo', 'cx') - (40 + 160 * (1 - Math.sqrt(1 / 5)) ** 2)) < 1e-9, 'skater v 1 m leží na křivce rampy');

// ---------- 4) se třením ----------
rezim('treni');
ok(aktivni() === 'treni' && at('skate-q-pop', 'visibility') === 'visible' && at('skate-bar-q', 'visibility') === 'visible', 'se třením: sloupec i popisek „vnitřní energie“ jsou vidět (SVG atribut visibility)');
ok(el('skate-radek-y').style.display === 'none' && el('skate-prejezdy').style.display === '', 'se třením: místo posuvníku výšky tlačítka přejezdů');
let treniOk = true, chybaT = '';
for (const m of [20, 40, 60]) for (let h = 1; h <= 5; h++) {
	posun('skate-slider-m', m); posun('skate-slider-h', h);
	for (let n = 0; n <= h + 1; n++) {
		if (n > 0) klik('skate-dalsi');
		const prej = Math.min(n, h), hMax = h - prej;
		const E0 = m * 10 * h, Ep = m * 10 * hMax, Q = m * 10 * prej, Ek = E0 - Ep - Q;
		const vz = el('skate-vypocet').innerHTML, st = el('skate-stav').textContent;
		const cekSt = hMax === 0 ? `Skater zastavil — všech ${E0} J se postupně proměnilo třením na vnitřní energii`
			: prej === 0 ? `Každý přejezd sebere energii odpovídající 1 m výšky (${m * 10} J) — promění se třením na VNITŘNÍ ENERGII.`
				: `Přejezd č. ${prej}: každý přejezd sebere energii odpovídající 1 m výšky (${m * 10} J) — promění se třením na VNITŘNÍ ENERGII. Skater teď vyjede už jen do ${hMax} m.`;
		const dobre = vz === `Ep = ${m} × 10 × ${hMax} = <strong>${Ep} J</strong> &nbsp;·&nbsp; Ek = <strong>${Ek} J</strong> &nbsp;·&nbsp; třením přešlo do vnitřní energie <strong>${Q} J</strong> &nbsp;·&nbsp; součet vždy <strong>${E0} J</strong>`
			&& el('skate-e-text').textContent === `Ep + Ek + vnitřní energie = ${E0} J` && st.includes(cekSt) && sloupceSedi(Ep, Ek, Q, E0) && Ek === 0;
		if (!dobre && !chybaT) chybaT = `${m} kg, ${h} m, přejezd ${n}: ${vz.replace(/<[^>]+>|&nbsp;/g, '')} | ${el('skate-e-text').textContent} | ${st}`;
		treniOk &&= dobre;
		zaznamenej();
	}
	klik('skate-reset');
	if (!el('skate-stav').textContent.includes('Rozjeď skatera') || !el('skate-vypocet').innerHTML.includes('vnitřní energie <strong>0 J</strong>')) treniOk = false;
}
ok(treniOk, `se třením: každý přejezd ubere m · 10 J do vnitřní energie, součet drží, po h přejezdech stop (${3 * 5} kombinací)${chybaT ? ' — ' + chybaT : ''}`);

// ---------- 5) jízda se třením až do zastavení ----------
posun('skate-slider-m', 40); posun('skate-slider-h', 3);
klik('skate-play');
ok(el('skate-play').textContent.startsWith('⏸') && el('skate-stav').textContent.includes('mění třením na vnitřní energii'), 'start jízdy se třením: text mluví o vnitřní energii');
zaznamenej();
const sj = el('skate-svg').__stavJizdy;
let cas = 0, snimku = 0, snimkyOk = true, chybaS = '';
while (fronta.length && snimku < 5000) {
	const f = fronta.shift(); f(cas);
	const s = sj(cas, 'treni', 3);
	if (!s.konec) {
		const mer = 250 / 1200, Ep = 400 * s.y, Em = 400 * s.Emech;
		const dobre = Math.abs(vyska('skate-bar-ep') - Math.max(Ep * mer, 0.5)) < 1e-9 && Math.abs(vyska('skate-bar-ek') - Math.max(Math.max(Em - Ep, 0) * mer, 0.5)) < 1e-9
			&& Math.abs(vyska('skate-bar-q') - Math.max((1200 - Em) * mer, 0.5)) < 1e-9 && Math.abs(+at('skate-telo', 'cx') - s.x) < 1e-9 && Math.abs(+at('skate-telo', 'cy') - (280 - 44 * s.y - 18)) < 1e-9
			&& Math.abs(+at('skate-prkno', 'x') - (s.x - 17)) < 1e-9;
		if (!dobre && !chybaS) chybaS = `snímek ${snimku}, t ${cas} ms`;
		snimkyOk &&= dobre;
	}
	cas += 16; snimku++; if (snimku % 25 === 0) zaznamenej();
}
ok(snimkyOk, `během jízdy se třením sedí v každém snímku skater i sloupce Ep, Ek a vnitřní energie se stavem jízdy${chybaS ? ' — ' + chybaS : ''}`);
ok(snimku > 250 && snimku < 300, `jízda 3 přejezdy po 1,5 s doběhne sama (${snimku} snímků po 16 ms)`);
ok(el('skate-play').textContent === '▶ rozjeď skatera' && el('skate-stav').textContent.includes('Skater zastavil — všech 1200 J'), `po jízdě: ${el('skate-stav').textContent.slice(0, 60)}…`);
ok(sloupceSedi(0, 0, 1200, 1200), 'po jízdě je celá energie (1200 J) ve sloupci vnitřní energie');
zaznamenej();
// jízda na ideální rampě a zastavení tlačítkem
rezim('idealni');
ok(at('skate-q-pop', 'visibility') === 'hidden' && aktivni() === 'idealni', 'zpět na ideální rampu: popisek vnitřní energie zmizí');
klik('skate-play');
cas = 0; for (let i = 0; i < 40; i++) { fronta.shift()(cas); cas += 16; }
ok(fronta.length === 1 && el('skate-vypocet').style.opacity === '0.4', 'ideální jízda běží dál a čísla jsou při jízdě zašedlá');
klik('skate-play');
ok(zruseno > 0 && fronta.length === 0 && el('skate-vypocet').style.opacity === '1', 'druhé kliknutí jízdu zastaví a ukáže přesná čísla');

// ---------- stav jízdy (čistá funkce) přepočtený nezávisle ----------
const xStena = (h) => 40 + 160 * (1 - Math.sqrt(h / 5)) ** 2; // levá stěna ve výšce h
const blizko = (a, b) => Math.abs(a - b) < 1e-9;
let s = sj(0, 'idealni', 4);
ok(blizko(s.p, -1) && blizko(s.x, xStena(4)) && blizko(s.y, 4) && !s.konec, `ideální jízda t = 0: nahoře vlevo ve 4 m (x ${s.x.toFixed(1)})`);
s = sj(750, 'idealni', 4);
ok(Math.abs(s.p) < 1e-9 && blizko(s.x, 280) && s.y === 0, 'ideální jízda t = 750 ms (čtvrt kmitu): uprostřed dna');
s = sj(1500, 'idealni', 4);
ok(blizko(s.p, 1) && blizko(s.x, 560 - xStena(4)) && blizko(s.y, 4), 'ideální jízda t = 1500 ms: nahoře vpravo zase ve 4 m (bez ztrát)');
s = sj(450, 'idealni', 4);
const pI = -Math.cos((2 * Math.PI * 450) / 3000), tI = 1 - Math.sqrt(4 / 5) * ((Math.abs(pI) - 0.3) / 0.7);
ok(blizko(s.p, pI) && blizko(s.x, 40 + 160 * tI * tI) && blizko(s.y, 5 * (1 - tI) ** 2), `ideální jízda t = 450 ms: na levém oblouku (x ${s.x.toFixed(1)}, y ${s.y.toFixed(2)} m)`);
s = sj(0, 'treni', 3);
ok(blizko(s.y, 3) && blizko(s.x, xStena(3)) && s.Emech === 3 && s.prejezd === 1, 'jízda se třením t = 0: vlevo ve 3 m, 1. přejezd');
s = sj(375, 'treni', 3);
const p1 = -Math.cos(Math.PI / 4), t1 = 1 - Math.sqrt(3 / 5) * ((Math.abs(p1) - 0.3) / 0.7);
ok(blizko(s.y, 5 * (1 - t1) ** 2) && blizko(s.x, 40 + 160 * t1 * t1) && blizko(s.Emech, 2.75), `jízda se třením t = 375 ms: sjíždí levou stěnu vysokou 3 m, mechanická energie 2,75 m · m · g`);
s = sj(1125, 'treni', 3);
const t2 = 1 - Math.sqrt(2 / 5) * ((Math.abs(p1) - 0.3) / 0.7);
ok(blizko(s.y, 5 * (1 - t2) ** 2) && blizko(s.x, 560 - (40 + 160 * t2 * t2)), 'jízda se třením t = 1125 ms: vyjíždí pravou stěnu, obrat už jen ve 2 m');
s = sj(1500, 'treni', 3);
ok(blizko(s.y, 2) && blizko(s.x, 560 - xStena(2)) && s.Emech === 2 && s.prejezd === 2, 'jízda se třením t = 1500 ms: vpravo ve 2 m, 2. přejezd');
s = sj(4500, 'treni', 3);
ok(s.konec && s.y === 0 && s.Emech === 0 && s.prejezd === 3 && blizko(s.x, 360), 'jízda se třením t = 4500 ms: zastavil dole vpravo (x 360), energie 0');
s = sj(6000, 'treni', 4);
ok(s.konec && blizko(s.x, 200), 'jízda se třením ze 4 m: po sudém počtu přejezdů zastaví vlevo (x 200)');

// ---------- 1b) dynamické texty ----------
const vse = texty.join(' ').replace(/<[^>]+>/g, ' ');
ok(!ZAKAZANE.test(vse), `žádný z ${texty.length} vypsaných textů nemá „teplo“ ani „Q“${ZAKAZANE.test(vse) ? ' — ' + vse.match(new RegExp('.{0,40}(' + ZAKAZANE.source + ').{0,20}'))[0] : ''}`);
ok(/vnitřní energi/i.test(vse), 'texty simulace mluví o vnitřní energii');

konec();
