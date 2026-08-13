#!/usr/bin/env node
// Ověření OerstedSimulace.astro — natočení magnetky u vodiče s proudem.
//
// Měří se VÝSLEDEK: skript komponenty se spustí a ptáme se jeho vlastní funkce
// `__uhelVychylky(I, r, smer)`, ne vzorů v textu souboru. Kontroluje se to, co
// má žák ze stránky pochopit: bez proudu žádná výchylka, s proudem roste,
// se vzdáleností klesá, opačný proud vychýlí na druhou stranu — a magnetka se
// nikdy nepostaví přesně kolmo, protože pole Země nikdy nezmizí.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
// Posuvníky musí do sandboxu vstoupit s HODNOTOU, kterou mají v HTML — jinak by
// skript počítal s `undefined` a scéna by se otevřela s NaN. Test by tak měřil
// vlastní chudý mock místo stránky, kterou uvidí žák.
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

const svg = prvky.get('oer-svg');
const si = prvky.get('oer-slider-i');
const sr = prvky.get('oer-slider-r');
const stav = prvky.get('oer-stav');
const uhel = svg.__uhelVychylky;

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

console.log('— výchozí stav scény —');
// Žák musí stránku otevřít s VYPNUTÝM proudem, jinak přijde o celý Oerstedův objev:
// nejdřív má vidět klidnou magnetku na severu a teprve pak proud pustit sám.
ok(si.value === '0' && sr.value === '1',
	`scéna se otevírá s proudem ${si.value} A a vzdáleností ${sr.value} cm — skript to nepřepsal`);
ok(uhel(+si.value, +sr.value, 1) === 0, 'při tomhle nastavení je výchylka 0° — žák uvidí klidnou magnetku');
ok(stav.textContent.includes('sever'),
	`a úvodní hláška to říká: „${stav.textContent.slice(0, 60)}…"`);

console.log('\n— bez proudu se magnetka nehne —');
for (const r of [1, 2, 3, 4, 5]) {
	ok(uhel(0, r, 1) === 0, `proud 0 A, vzdálenost ${r} cm → výchylka 0° (míří na sever)`);
}

console.log('\n— větší proud = větší výchylka —');
{
	const rada = [0, 1, 2, 3, 4].map((I) => uhel(I, 2, 1));
	let roste = true;
	for (let i = 1; i < rada.length; i++) if (rada[i] <= rada[i - 1]) roste = false;
	ok(roste, `2 cm od vodiče: ${rada.map((u, i) => `${i} A → ${u}°`).join(', ')}`);
}

console.log('\n— dál od vodiče = menší výchylka (pole slábne) —');
{
	const rada = [1, 2, 3, 4, 5].map((r) => uhel(3, r, 1));
	let klesa = true;
	for (let i = 1; i < rada.length; i++) if (rada[i] >= rada[i - 1]) klesa = false;
	ok(klesa, `proud 3 A: ${rada.map((u, i) => `${i + 1} cm → ${u}°`).join(', ')}`);
}

console.log('\n— opačný proud vychýlí na druhou stranu, stejně silně —');
for (const [I, r] of [[1, 1], [2, 3], [4, 5]]) {
	const a = uhel(I, r, 1), b = uhel(I, r, -1);
	ok(a === -b && a > 0, `${I} A, ${r} cm → ${a}° k západu, po prohození ${b}° (tedy k východu)`);
}

console.log('\n— magnetka se nikdy nepostaví přesně kolmo —');
{
	let vsechny = true, cela = true, max = 0;
	for (let I = 0; I <= 4; I++) {
		for (let r = 1; r <= 5; r++) {
			const u = Math.abs(uhel(I, r, 1));
			if (u >= 90) vsechny = false;
			if (!Number.isInteger(u)) cela = false;
			if (u > max) max = u;
		}
	}
	ok(vsechny, `ani při největším proudu těsně u vodiče: nejvyšší výchylka je ${max}° (pole Země působí pořád)`);
	ok(cela, 'všechny výchylky jsou celá čísla stupňů — žák je umí odečíst');
}

console.log('\n— hláška odpovídá tomu, co se ve scéně děje —');
{
	si.value = '4'; sr.value = '1';
	for (const f of si.posluchaci.input) f();
	ok(stav.textContent.includes('kolmo'), `velký proud těsně u vodiče: „${stav.textContent.slice(0, 70)}…"`);
	si.value = '1'; sr.value = '5';
	for (const f of si.posluchaci.input) f();
	ok(/slab|Přidej/.test(stav.textContent), `slabé pole daleko od vodiče: „${stav.textContent.slice(0, 70)}…"`);
}

// ── SCÉNA ────────────────────────────────────────────────────────────────────
// Doplněno po mutačním testu (`node testy/mutace.mjs oersted`): první podoba
// testu odhalila jen 3 z 24 mutací. Měřila fyzikální model, ale vůbec ne to,
// co žák VIDÍ — a právě tam byly nejhorší vady. Obrácená podmínka `smer === 1`
// by prohodila značku ⊙/⊗ i šipky na čarách, takže by si žák pravidlo pravé
// ruky zapamatoval naopak; obrácené `odsazeni` by posuvníkem „vzdálenost"
// magnetku k vodiči naopak přibližovalo.
const magnetka = prvky.get('oer-magnetka');
const strelka = prvky.get('oer-strelka');
const kruznice = prvky.get('oer-kruznice');
const znacka = prvky.get('oer-znacka');
const posun = () => { const m = /translate\((-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)\)/.exec(magnetka.atributy.transform); return { x: +m[1], y: +m[2] }; };
const otoceni = () => +/rotate\((-?\d+(?:\.\d+)?)\)/.exec(strelka.atributy.transform)[1];
const nastav = (I, r) => { si.value = String(I); sr.value = String(r); for (const f of si.posluchaci.input) f(); };
const prohodSmer = () => { for (const f of prvky.get('oer-smer').posluchaci.click) f(); };

console.log('\n— scéna: kde magnetka leží —');
{
	nastav(0, 1);
	const bliz = posun();
	nastav(0, 5);
	const dal = posun();
	ok(bliz.y < 240 && dal.y < 240, 'magnetka leží SEVERNĚ od vodiče (nad ním), ne pod ním');
	ok(dal.y < bliz.y, `posuvník vzdálenosti ji od vodiče vzdaluje: 1 cm → y=${bliz.y}, 5 cm → y=${dal.y}`);
	ok(bliz.x === 330 && dal.x === 330, 'a drží se přímo nad vodičem (nestěhuje se do stran)');
}

console.log('\n— scéna: indukční čáry jsou jen tam, kde teče proud —');
{
	nastav(0, 2);
	ok(kruznice.innerHTML === '', 'bez proudu se nekreslí ani jedna čára — pole prostě není');
	nastav(3, 2);
	const pocet = (kruznice.innerHTML.match(/<circle/g) || []).length;
	ok(pocet === 3, `s proudem se objeví ${pocet} soustředné kružnice se středem ve vodiči`);
	ok((kruznice.innerHTML.match(/cx="330" cy="240"/g) || []).length === pocet, 'a všechny mají střed přesně ve vodiči');
	// Šipky nesmí zůstat nakupené v jedné řadě (tak vypadaly jako fajfky vedle
	// sebe, ne jako obíhající pole) — každá je otočená kolem vodiče jinam.
	const otoceni_sipek = new Set((kruznice.innerHTML.match(/rotate\((\d+) /g) || []));
	ok(otoceni_sipek.size === pocet, `a šipky jsou rozprostřené dokola (${otoceni_sipek.size} různých natočení), ne v jedné řadě`);
	// Kružnice se musí VEJÍT do rámečku scény (viewBox 660×380) — největší
	// dřív přetékala dolů a v obrázku byla useknutá.
	const nejvetsi = Math.max(...[...kruznice.innerHTML.matchAll(/<circle[^>]*r="(\d+)"/g)].map((m) => +m[1]));
	ok(240 + nejvetsi < 380, `největší kružnice (r=${nejvetsi}) se vejde do scény: dosahuje k ${240 + nejvetsi} z 380`);
}

console.log('\n— scéna: značka ve vodiči a šipky odpovídají směru proudu —');
{
	nastav(0, 2);
	ok(znacka.innerHTML.includes('—'), 'bez proudu je ve vodiči jen pomlčka (nic neteče)');
	nastav(3, 2);
	const kTobe = { z: znacka.innerHTML, k: kruznice.innerHTML, u: otoceni() };
	ok(kTobe.z.includes('<circle'), 'proud k tobě: ve vodiči je tečka ⊙');
	prohodSmer();
	const odTebe = { z: znacka.innerHTML, k: kruznice.innerHTML, u: otoceni() };
	ok(odTebe.z.includes('<line') && !odTebe.z.includes('<circle'), 'po prohození je tam křížek ⊗ — obě značky se nesmí zaměnit');
	// Nestačí, že se šipky změnily — musí ukazovat na SPRÁVNOU stranu. Šipka se
	// kreslí vpravo od vodiče: u proudu k tobě (⊙) obíhá pole proti směru
	// hodinových ručiček, takže tam míří NAHORU. Obrácená podmínka by žáka
	// naučila pravidlo pravé ruby naopak, a značka ⊙/⊗ by přitom byla správně.
	const hrotMiriNahoru = (html) => {
		const b = /points="[\d.]+,([\d.]+) [\d.]+,([\d.]+)/.exec(html);
		return +b[1] < +b[2];   // y hrotu menší než y základny = hrot nahoře
	};
	ok(hrotMiriNahoru(kTobe.k), 'proud k tobě ⊙: šipka vpravo od vodiče míří NAHORU (pole obíhá proti směru hodinových ručiček)');
	ok(!hrotMiriNahoru(odTebe.k), 'proud od tebe ⊗: táž šipka míří DOLŮ — směr obíhání se obrátil');
	ok(kTobe.u === -odTebe.u && kTobe.u !== 0, `střelka se překlopila na druhou stranu: ${kTobe.u}° → ${odTebe.u}°`);
	prohodSmer(); // vrátit scénu do výchozího směru
}

console.log('\n— scéna: střelka se natáčí na správnou stranu —');
{
	nastav(4, 1);
	// V SVG otáčí kladný úhel PO směru hodinových ručiček. Výchylka k západu
	// (doleva) proto musí být v transformaci se znaménkem mínus.
	ok(otoceni() < 0, `výchylka k západu se kreslí jako rotate(${otoceni()}) — hrot jde doleva`);
	ok(otoceni() === -uhel(4, 1, 1), 'a přesně o tolik stupňů, kolik hlásí výpočet');
	nastav(0, 1);
	ok(otoceni() === 0, 'bez proudu je střelka nenatočená — míří na sever');
}

console.log('\n— číslo pod scénou souhlasí s tím, jak je střelka natočená —');
{
	// Poznámka pod obrázkem ukazuje poměr „pole vodiče ku poli Země". Právě z něj
	// výchylka vychází (tan výchylky = ten poměr), takže když se rozejdou, učí
	// stránka dvě různé věci naráz. Tolerance 0,1 kryje zaokrouhlení na celé stupně.
	for (const [I, r] of [[1, 1], [2, 2], [3, 2], [4, 5]]) {
		nastav(I, r);
		const psany = +/= <strong>([\d,]+)<\/strong>/.exec(prvky.get('oer-vypocet').innerHTML)[1].replace(',', '.');
		const zNatoceni = Math.tan(Math.abs(otoceni()) * Math.PI / 180);
		ok(Math.abs(psany - zNatoceni) < 0.1,
			`${I} A na ${r} cm: pod scénou stojí poměr ${psany} a střelka je natočená o ${Math.abs(otoceni())}° (tan = ${zNatoceni.toFixed(2)})`);
	}
}

console.log('\n— ovládání nelže o tom, co udělá —');
{
	nastav(0, 2);
	ok(prvky.get('oer-vypnout').textContent.includes('ZAPNOUT'),
		`při vypnutém proudu tlačítko nabízí „${prvky.get('oer-vypnout').textContent}"`);
	nastav(3, 2);
	ok(prvky.get('oer-vypnout').textContent.includes('VYPNOUT'),
		`když proud teče, nabízí „${prvky.get('oer-vypnout').textContent}"`);
	for (const f of prvky.get('oer-vypnout').posluchaci.click) f();
	ok(+si.value === 0 && kruznice.innerHTML === '',
		'a kliknutí opravdu proud vypne — pole i čáry zmizí (to trvalý magnet neumí)');
}

console.log(chyby === 0 ? '\n✅ Oersted: vše sedí.' : `\n❌ Oersted: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);
