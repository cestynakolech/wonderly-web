#!/usr/bin/env node
// Ověření UcinkyProuduABezpecnostSimulace.astro — Ohmův zákon na lidském těle.
//
// Nejtišeji lžou tyhle věci, a test je proto měří natvrdo:
// (1) že by některá z 9 kombinací (3 napětí × 3 stavy kůže) dala ošklivé
//     číslo místo celého µA/mA na nejvýš 1 desetinné místo — projíždí se
//     VŠECH 9 kombinací, natvrdo proti očekávané tabulce (žádný odhad);
// (2) že by scéna B tvrdila, že cesta ruka→noha je STEJNĚ nebezpečná jako
//     ruka→ruka (má být MENŠÍ proud, ale POŘÁD v pásmu zástavy srdce);
// (3) že by se vykreslená barva ruky/srdce/ikony zdroje rozešla s tím, co
//     říká výpočet — měří se SKUTEČNĚ VYKRESLENÉ atributy po každé změně
//     posuvníku, ne jen návratová hodnota pure funkcí.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.replace(/<script>[\s\S]*?<\/script>/, '');

const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {},
		posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		classList: { add() {}, remove() {}, toggle() {} },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild(dite) { (this.deti ||= []).push(dite); },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
let vytvorenychNS = 0;
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	createElementNS: () => { vytvorenychNS++; return novy(`ns-${vytvorenychNS}`); },
};
// requestAnimationFrame/cancelAnimationFrame se POČÍTAJÍ, ne jen tiše
// odbaví — jinak by nekonečná smyčka spuštěná při načtení (nález nezávislé
// kontroly 14. 8. večer: 5 minut běhu, exit 143 po zabití) prošla testem
// beze stopy, protože stub `() => {}` volání přijme a nic neřekne.
let pocetRAF = 0, pocetCAF = 0;
const sandbox = {
	document, performance: { now: () => 0 }, console, Math,
	requestAnimationFrame: (fn) => { pocetRAF++; return pocetRAF; },
	cancelAnimationFrame: () => { pocetCAF++; },
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);
const pocetRAFPriNacteni = pocetRAF; // kolikrát se rAF zavolal BĚHEM startu skriptu, bez jediné interakce žáka

const svgA = prvky.get('upb-a-svg');
const svgB = prvky.get('upb-b-svg');
const {
	__odporTela: odporTela, __proudMA: proudMA, __pasmo: pasmo, __mAtoText: mAtoText,
	__PASMA: PASMA, __ODPORY: ODPORY, __NAPETI: NAPETI,
	__NAPETI_KLICE: NAPETI_KLICE, __NAPETI_NAZEV: NAPETI_NAZEV,
	__KUZE_KLICE: KUZE_KLICE, __KUZE_NAZEV: KUZE_NAZEV, __KUZE_BARVA: KUZE_BARVA,
	__PRAH_PRURAZU_V: PRAH_PRURAZU_V, __geometrieZonySegmentu: geometrieZonySegmentu,
	__PASMO_BAR: PASMO_BAR,
} = svgA;
const {
	__proudCestou: proudCestou, __CESTY: CESTY, __CESTA_KLICE: CESTA_KLICE,
	__BODY: BODY, __NAPETI_B: NAPETI_B, __boduNaCeste: boduNaCeste, __jedeB: jedeB,
} = svgB;

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

const nastavA = (iN, iK) => {
	prvky.get('upb-a-napeti').value = String(iN);
	prvky.get('upb-a-kuze').value = String(iK);
	for (const f of prvky.get('upb-a-napeti').posluchaci.input) f();
	for (const f of prvky.get('upb-a-kuze').posluchaci.input) f();
};
const nastavB = (iC) => {
	prvky.get('upb-b-cesta').value = String(iC);
	for (const f of prvky.get('upb-b-cesta').posluchaci.input) f();
};
const kliknoutPlay = () => { for (const f of prvky.get('upb-b-play').posluchaci.click) f(); };

console.log('— scéna B se PŘI NAČTENÍ nikdy sama nerozběhne (nezávislá kontrola 14. 8.) —');
{
	// Doklad, ne odhad: skutečně SPOČÍTANÝ počet volání requestAnimationFrame
	// od začátku vm.runInContext (celý běh <script> včetně počátečního
	// prekresliA()/prekresliB()) až do teď — bez jediného kliknutí žáka.
	// Předchozí verze volala requestAnimationFrame(krokB) bezpodmínečně na
	// posledním řádku skriptu → nekonečná smyčka, kterou náhledový nástroj
	// (jen vyrenderuje a čeká) nikdy nedoběhl (5 min běhu, exit 143).
	ok(pocetRAFPriNacteni === 0,
		`requestAnimationFrame se PŘI NAČTENÍ nezavolal ani jednou — animace čeká na klik (zavoláno ${pocetRAFPriNacteni}×)`);
	ok(jedeB() === false, `hned po načtení animace neběží (jedeB() = ${jedeB()})`);

	// I bez jediného kliknutí musí být cesta proudu srozumitelná — výchozí
	// cesta (ruka→ruka) je uzavřená, takže tečky musí mít hned po startu
	// smysluplnou (a vzájemně různou) polohu na cestě, ne (0,0) v rohu.
	const tecky0 = [1, 2, 3, 4, 5].map((n) => prvky.get(`ns-${n}`));
	const polohy = tecky0.map((t) => `${t.getAttribute('cx')},${t.getAttribute('cy')}`);
	ok(tecky0.every((t) => t.getAttribute('opacity') === '1'), 'tečky jsou hned po načtení viditelné (výchozí cesta je uzavřená)');
	ok(new Set(polohy).size === 5, `všech 5 teček má hned po načtení RŮZNOU polohu na cestě, bez animace: ${polohy.join(' | ')}`);
	ok(tecky0.every((t) => { const x = +t.getAttribute('cx'), y = +t.getAttribute('cy'); return x >= 0 && x <= 660 && y >= 0 && y <= 300; }),
		'a všechny leží uvnitř viewBoxu 660×300');
}

console.log('\n— konstanty odpovídají výkladu na stránce —');
{
	ok(PRAH_PRURAZU_V === 50, `práh průrazu kůže je 50 V, stejně jako výklad („Od zhruba 50 V se kůže prorazí“) (${PRAH_PRURAZU_V})`);
	ok(NAPETI.baterie === 4.5 && NAPETI.autobaterie === 12 && NAPETI.zasuvka === 230,
		`napětí: baterie 4,5 V, autobaterie 12 V, zásuvka 230 V (${NAPETI.baterie}, ${NAPETI.autobaterie}, ${NAPETI.zasuvka})`);
	ok(NAPETI_B === 230 && NAPETI_B === NAPETI.zasuvka, `napětí v části B (${NAPETI_B} V) je STEJNÉ jako zásuvka v části A`);
	ok(ODPORY.sucha.vysoky === 100000 && ODPORY.sucha.nizky === 1500,
		`suchá kůže: 100 000 Ω / 1 500 Ω — obě hodnoty přímo z výkladu (${ODPORY.sucha.vysoky}, ${ODPORY.sucha.nizky})`);
	ok(ODPORY.mokra.vysoky === 7500 && ODPORY.mokra.nizky === 1000,
		`mokrá kůže: 7 500 Ω / 1 000 Ω — 1 000 Ω přímo z výkladu (${ODPORY.mokra.vysoky}, ${ODPORY.mokra.nizky})`);
	ok(ODPORY.vlhka.vysoky === 20000 && ODPORY.vlhka.nizky === 1250,
		`vlhká kůže (mezistupeň): 20 000 Ω / 1 250 Ω (${ODPORY.vlhka.vysoky}, ${ODPORY.vlhka.nizky})`);
	ok(ODPORY.sucha.vysoky > ODPORY.vlhka.vysoky && ODPORY.vlhka.vysoky > ODPORY.mokra.vysoky,
		'seřazení odporů dává smysl: suchá > vlhká > mokrá (před průrazem)');
	ok(ODPORY.sucha.nizky > ODPORY.vlhka.nizky && ODPORY.vlhka.nizky > ODPORY.mokra.nizky,
		'a stejně tak i po průrazu: suchá > vlhká > mokrá');
}

console.log('\n— odporTela: práh 50 V platí STEJNĚ pro všechny tři stavy kůže —');
{
	for (const kuze of KUZE_KLICE) {
		ok(odporTela(kuze, 50) === ODPORY[kuze].vysoky, `${kuze}: na hranici 50 V (včetně) je kůže ještě NEporušená (${odporTela(kuze, 50)})`);
		ok(odporTela(kuze, 50.001) === ODPORY[kuze].nizky, `${kuze}: těsně nad 50 V se kůže prorazí (${odporTela(kuze, 50.001)})`);
	}
}

console.log('\n— proudMA: čistý Ohmův zákon I = U ÷ R —');
{
	ok(Math.abs(proudMA(230, 1000) - 230) < 1e-9, `proudMA(230,1000) = 230 mA (${proudMA(230, 1000)})`);
	ok(Math.abs(proudMA(4.5, 100000) - 0.045) < 1e-9, `proudMA(4.5,100000) = 0,045 mA (${proudMA(4.5, 100000)})`);
}

console.log('\n— pásma: hranice PŘESNĚ na prazích z výkladu (1 / 6 / 25 / 60 / 80 mA) —');
{
	const prahy = [1, 6, 25, 60, 80];
	let spatne = null;
	for (const prah of prahy) {
		if (pasmo(prah - 0.001).limit !== prah) spatne = `těsně pod ${prah} mA je pásmo s limitem ${pasmo(prah - 0.001).limit}, čekal jsem ${prah}`;
		if (pasmo(prah).limit === prah) spatne = `přesně na ${prah} mA už je pásmo s limitem ${prah} — hranice má být OSTRÁ (< ne ≤)`;
	}
	ok(spatne === null, spatne ?? 'všech 5 prahů (1,6,25,60,80 mA) je ostrých a odpovídá výkladu');
	ok(PASMA.length === 6, `6 pásem (${PASMA.length})`);
	ok(pasmo(0.5).klic === 'nevnimas' && pasmo(1000).klic === 'zastava', 'krajní pásma: pod 1 mA nevnímáš, vysoko nad 80 mA zástava srdce');
}

console.log('\n— mAtoText: celé µA pod 1 mA, nejvýš 1 desetinné místo nad 1 mA —');
{
	ok(mAtoText(0.045) === '45 µA', `0,045 mA → „${mAtoText(0.045)}“`);
	ok(mAtoText(0.12) === '120 µA', `0,12 mA → „${mAtoText(0.12)}“`);
	ok(mAtoText(0.225) === '225 µA', `0,225 mA → „${mAtoText(0.225)}“`);
	ok(mAtoText(0.6) === '600 µA', `0,6 mA → „${mAtoText(0.6)}“`);
	ok(mAtoText(1.6) === '1,6 mA', `1,6 mA → „${mAtoText(1.6)}“`);
	ok(mAtoText(184) === '184 mA', `184 mA → „${mAtoText(184)}“`);
	ok(mAtoText(230) === '230 mA', `230 mA → „${mAtoText(230)}“`);
	ok(mAtoText(0) === '0 mA', `0 mA → „${mAtoText(0)}“`);
	const priblizne = mAtoText(230000 / 1500);
	ok(priblizne === '≈ 153,3 mA', `230V/1500Ω (periodická desetina) se zobrazí zaokrouhleně se znaménkem ≈, stejně jako výklad: „${priblizne}“`);
}

console.log('\n— VŠECH 9 kombinací (3 napětí × 3 stavy kůže) natvrdo proti tabulce —');
{
	const ocekavano = [
		['baterie', 'sucha', 0.045, 'nevnimas'],
		['baterie', 'vlhka', 0.225, 'nevnimas'],
		['baterie', 'mokra', 0.6, 'nevnimas'],
		['autobaterie', 'sucha', 0.12, 'nevnimas'],
		['autobaterie', 'vlhka', 0.6, 'nevnimas'],
		['autobaterie', 'mokra', 1.6, 'brneni'],
		['zasuvka', 'sucha', 230000 / 1500, 'zastava'],
		['zasuvka', 'vlhka', 184, 'zastava'],
		['zasuvka', 'mokra', 230, 'zastava'],
	];
	ok(ocekavano.length === 9, `zkontrolováno všech 9 kombinací (${ocekavano.length})`);
	let spatne = null;
	for (const [nap, kuze, mAOcek, zonaOcek] of ocekavano) {
		const R = odporTela(kuze, NAPETI[nap]);
		const mA = proudMA(NAPETI[nap], R);
		if (Math.abs(mA - mAOcek) > 1e-6) spatne = `${nap}+${kuze}: čekal jsem ${mAOcek} mA, vyšlo ${mA} mA`;
		if (pasmo(mA).klic !== zonaOcek) spatne = `${nap}+${kuze}: čekal jsem pásmo „${zonaOcek}“, vyšlo „${pasmo(mA).klic}“`;
		// nejvýš 1 desetinné místo NEBO celé číslo v µA — žádná jiná desetinná lomenina
		const zobrazeno = mAtoText(mA);
		const jeMikro = / µA$/.test(zobrazeno);
		const jeMili = /^(≈ )?-?\d+(,\d)? mA$/.test(zobrazeno);
		if (!jeMikro && !jeMili) spatne = `${nap}+${kuze}: zobrazená hodnota „${zobrazeno}“ nemá tvar celé µA ani mA na nejvýš 1 des. místo`;
	}
	ok(spatne === null, spatne ?? 'všech 9 kombinací dává přesně očekávaný proud i pásmo, zobrazené jako celé µA nebo mA na nejvýš 1 des. místo');
}

console.log('\n— výchozí stav (baterie + suchá kůže) je přesně opening příklad z výkladu (0,045 mA) —');
{
	ok(prvky.get('upb-a-napeti').value === '0' && prvky.get('upb-a-kuze').value === '0',
		`oba posuvníky startují na indexu 0 (${prvky.get('upb-a-napeti').value}, ${prvky.get('upb-a-kuze').value})`);
	nastavA(0, 0);
	const info = prvky.get('upb-a-info').innerHTML;
	ok(info.includes('45 µA'), `info panel na startu ukazuje 45 µA (= 0,045 mA, přesně výkladový příklad): „${info.match(/I = [^<]*/)?.[0]}"`);
	ok(prvky.get('upb-a-srdce').getAttribute('fill') === PASMA[0].barva, 'srdce má na startu barvu nejnižšího pásma (nevnímáš)');
}

console.log('\n— scéna A: vykreslená barva ruky sedí s VYBRANÝM stavem kůže (pro všech 9 kombinací) —');
{
	let spatne = null;
	for (let iN = 0; iN < 3 && !spatne; iN++) {
		for (let iK = 0; iK < 3 && !spatne; iK++) {
			nastavA(iN, iK);
			const kuzeKlic = KUZE_KLICE[iK];
			const napetiKlic = NAPETI_KLICE[iN];
			const R = odporTela(kuzeKlic, NAPETI[napetiKlic]);
			const mA = proudMA(NAPETI[napetiKlic], R);
			const p = pasmo(mA);
			const rukaFill = prvky.get('upb-a-ruka').getAttribute('fill');
			const srdceFill = prvky.get('upb-a-srdce').getAttribute('fill');
			if (rukaFill !== KUZE_BARVA[kuzeKlic]) spatne = `${napetiKlic}+${kuzeKlic}: barva ruky „${rukaFill}“ neodpovídá KUZE_BARVA.${kuzeKlic} („${KUZE_BARVA[kuzeKlic]}“)`;
			if (srdceFill !== p.barva) spatne = `${napetiKlic}+${kuzeKlic}: barva srdce „${srdceFill}“ neodpovídá barvě pásma „${p.klic}“ („${p.barva}“)`;
			const info = prvky.get('upb-a-info').innerHTML;
			if (!info.includes(mAtoText(mA))) spatne = `${napetiKlic}+${kuzeKlic}: info panel neobsahuje očekávaný proud „${mAtoText(mA)}“: „${info}“`;
			const pasmoText = prvky.get('upb-a-pasmo-text').textContent;
			if (pasmoText !== p.nazev) spatne = `${napetiKlic}+${kuzeKlic}: štítek pásma „${pasmoText}“ neodpovídá „${p.nazev}“`;
		}
	}
	ok(spatne === null, spatne ?? 've všech 9 kombinacích sedí vykreslená barva ruky, barva srdce, text proudu i text pásma s výpočtem');
	nastavA(0, 0);
}

console.log('\n— scéna A: varování se slovem „nikdy“ se zobrazí JEN u zásuvky —');
{
	// hledá se BEZ ohledu na velikost písmen a na přesný tvar slova (nezkoušet/
	// nezkouší) — komponenta píše „nikdy nezkoušet!“, ne „nikdy se to nezkouší“;
	// \b v JS nefunguje nad českými znaky, proto se hranice slova nepoužívá.
	const maNikdy = (html) => /nikdy/i.test(html);
	nastavA(0, 0);
	const baterieHtml = prvky.get('upb-a-varovani').innerHTML;
	ok(baterieHtml === '', `u baterie se varovací box nevykresluje (obsah: ${JSON.stringify(baterieHtml)})`);
	nastavA(1, 0);
	const autobaterieHtml = prvky.get('upb-a-varovani').innerHTML;
	ok(autobaterieHtml === '', `u autobaterie se varovací box nevykresluje (obsah: ${JSON.stringify(autobaterieHtml)})`);
	nastavA(2, 0);
	const zasuvkaSuchaHtml = prvky.get('upb-a-varovani').innerHTML;
	ok(maNikdy(zasuvkaSuchaHtml), `u zásuvky (suchá kůže) se ve varovacím boxu vyskytuje slovo „nikdy“: „${zasuvkaSuchaHtml}"`);
	nastavA(2, 2);
	const zasuvkaMokraHtml = prvky.get('upb-a-varovani').innerHTML;
	ok(maNikdy(zasuvkaMokraHtml), `u zásuvky (mokrá kůže) se ve varovacím boxu vyskytuje slovo „nikdy“ — platí pro všechny stavy kůže: „${zasuvkaMokraHtml}"`);
	nastavA(0, 0);
}

console.log('\n— scéna A: ikona zdroje se skutečně mění s vybraným napětím —');
{
	nastavA(0, 0);
	const baterie = prvky.get('upb-a-zdroj').innerHTML;
	nastavA(1, 0);
	const autobaterie = prvky.get('upb-a-zdroj').innerHTML;
	nastavA(2, 0);
	const zasuvka = prvky.get('upb-a-zdroj').innerHTML;
	ok(baterie !== autobaterie && autobaterie !== zasuvka && baterie !== zasuvka, 'tři různá napětí dávají tři různé ikony');
	ok(baterie.includes('#e8590c'), `ikona baterie má oranžové kontakty: „${baterie.slice(0, 60)}…"`);
	ok(zasuvka.includes('#e9ecef'), `ikona zásuvky má šedý kryt: „${zasuvka.slice(0, 60)}…"`);
	const zdrojText = prvky.get('upb-a-zdroj-text').textContent;
	ok(zdrojText.includes('230'), `plaketa se zdrojem ukazuje 230 V: „${zdrojText}"`);
	nastavA(0, 0);
}

console.log('\n— scéna A: posuvník opravdu překreslí (různé kombinace dají různý výsledek) —');
{
	nastavA(0, 0);
	const stav1 = prvky.get('upb-a-stav').textContent;
	nastavA(2, 2);
	const stav2 = prvky.get('upb-a-stav').textContent;
	ok(stav1 !== stav2, 'text stavu se při změně posuvníku změní');
	nastavA(0, 0);
}

console.log('\n— pásmový ampérmetr: 6 segmentů dlaždicuje CELOU šířku, marker míří na správný segment —');
{
	let spatne = null, soucetSirek = 0;
	for (let i = 0; i < PASMA.length; i++) {
		const s = geometrieZonySegmentu(i);
		soucetSirek += s.sirka;
		if (i > 0) {
			const predchozi = geometrieZonySegmentu(i - 1);
			if (Math.abs(predchozi.x + predchozi.sirka - s.x) > 1e-6) spatne = `segment ${i}: nenavazuje na předchozí (mezera nebo překryv)`;
		}
	}
	if (Math.abs(soucetSirek - PASMO_BAR.sirkaCelkem) > 1e-6) spatne = `součet šířek segmentů (${soucetSirek}) neodpovídá PASMO_BAR.sirkaCelkem (${PASMO_BAR.sirkaCelkem})`;
	ok(spatne === null, spatne ?? '6 segmentů přesně dlaždicuje celou šířku pásmového ampérmetru bez mezer a překryvů');

	nastavA(2, 2); // zásuvka + mokrá → 230 mA → pásmo „zastava“ (poslední, index 5)
	const idxOcek = PASMA.findIndex((p) => p.klic === 'zastava');
	const seg = geometrieZonySegmentu(idxOcek);
	const cxOcek = seg.x + seg.sirka / 2;
	const body = prvky.get('upb-a-marker').getAttribute('points').split(' ').map((b) => b.split(',').map(Number));
	const apex = body[2]; // třetí bod polygonu je hrot směřující do pásma
	ok(Math.abs(apex[0] - cxOcek) < 1, `marker (hrot na x=${apex[0]}) ukazuje na střed segmentu „zastava“ (x=${cxOcek.toFixed(1)})`);
	ok(prvky.get('upb-a-marker').getAttribute('fill') === PASMA[idxOcek].barva, 'marker má barvu odpovídajícího pásma');
	nastavA(0, 0);
}

console.log('\n— pásmové pozadí je ve scéně A a B TOTOŽNÉ (stejný tvar = stejný význam) —');
{
	ok(prvky.get('upb-a-pasmo-pozadi').innerHTML === prvky.get('upb-b-pasmo-pozadi').innerHTML,
		'obě scény kreslí pásmový ampérmetr stejnou funkcí se stejným výsledkem');
	ok((prvky.get('upb-a-pasmo-pozadi').innerHTML.match(/<rect/g) || []).length === 6, 'pásmové pozadí má přesně 6 obdélníků');
}

// ── ČÁST B ───────────────────────────────────────────────────────────────
console.log('\n— cesta proudu tělem: CESTY tabulka a proudCestou —');
{
	ok(CESTY['ruka-ruka'].r === 1000 && CESTY['ruka-ruka'].uzavrena === true, `ruka→ruka: R=1000 Ω, obvod uzavřen (${CESTY['ruka-ruka'].r})`);
	ok(CESTY['ruka-noha'].r === 2000 && CESTY['ruka-noha'].uzavrena === true, `ruka→noha: R=2000 Ω (2× delší dráha), obvod uzavřen (${CESTY['ruka-noha'].r})`);
	ok(CESTY['jedna-ruka'].uzavrena === false, 'jedna ruka: obvod OTEVŘENÝ');
	ok(proudCestou('ruka-ruka') === 230, `proudCestou(ruka-ruka) = 230 mA (${proudCestou('ruka-ruka')})`);
	ok(proudCestou('ruka-noha') === 115, `proudCestou(ruka-noha) = 115 mA — přesně polovina, protože R je dvojnásobný (${proudCestou('ruka-noha')})`);
	ok(proudCestou('jedna-ruka') === 0, `proudCestou(jedna-ruka) = 0 mA — obvod se neuzavře (${proudCestou('jedna-ruka')})`);
	ok(pasmo(proudCestou('ruka-ruka')).klic === 'zastava', 'ruka→ruka spadá do pásma zástavy srdce');
	ok(pasmo(proudCestou('ruka-noha')).klic === 'zastava', 'ruka→noha ZŮSTÁVÁ v pásmu zástavy srdce, i když je proud menší — pořád smrtelně nebezpečné');
	ok(proudCestou('ruka-ruka') > proudCestou('ruka-noha'), 'ruka→ruka je i číselně nebezpečnější (větší proud) než ruka→noha');
	ok(pasmo(proudCestou('jedna-ruka')).klic === 'nevnimas', 'jedna ruka (0 mA) je v nejnižším pásmu — bezpečné, protože obvod se neuzavře');
}

console.log('\n— scéna B: vykreslení sedí s výběrem cesty (natvrdo pro všechny 3) —');
{
	let spatne = null;
	for (let i = 0; i < 3 && !spatne; i++) {
		nastavB(i);
		const klic = CESTA_KLICE[i];
		const c = CESTY[klic];
		const mA = c.uzavrena ? proudMA(NAPETI_B, c.r) : 0;
		const p = pasmo(mA);

		const srdceFill = prvky.get('upb-b-srdce').getAttribute('fill');
		if (srdceFill !== p.barva) spatne = `${klic}: barva srdce „${srdceFill}“ neodpovídá pásmu „${p.klic}“`;

		const d = prvky.get('upb-b-cesta-linka').getAttribute('d');
		if (c.uzavrena && !d) spatne = `${klic}: obvod je uzavřený, ale cesta (d atribut) je prázdná`;
		if (!c.uzavrena && d) spatne = `${klic}: obvod je OTEVŘENÝ, ale cesta se přesto kreslí („${d}“)`;
		if (c.uzavrena) {
			const ocekD = `M${BODY[c.waypoints[0]].x},${BODY[c.waypoints[0]].y} L${BODY[c.waypoints[1]].x},${BODY[c.waypoints[1]].y} L${BODY[c.waypoints[2]].x},${BODY[c.waypoints[2]].y}`;
			if (d !== ocekD) spatne = `${klic}: cesta „${d}“ neodpovídá souřadnicím waypointů „${ocekD}“`;
		}

		const rukaP = prvky.get('upb-b-ruka-p').getAttribute('fill');
		const nohaP = prvky.get('upb-b-noha-p').getAttribute('fill');
		const cekanaRukaP = c.kontakty.includes('ruka-p') ? '#4dabf7' : '#ced4da';
		const cekanaNohaP = c.kontakty.includes('noha-p') ? '#4dabf7' : '#ced4da';
		if (rukaP !== cekanaRukaP) spatne = `${klic}: pravá ruka má barvu „${rukaP}“, čekal jsem „${cekanaRukaP}“ (aktivní kontakt: ${c.kontakty.includes('ruka-p')})`;
		if (nohaP !== cekanaNohaP) spatne = `${klic}: pravá noha má barvu „${nohaP}“, čekal jsem „${cekanaNohaP}“ (aktivní kontakt: ${c.kontakty.includes('noha-p')})`;

		const info = prvky.get('upb-b-info').innerHTML;
		if (!info.includes(mAtoText(mA))) spatne = `${klic}: info panel neobsahuje očekávaný proud „${mAtoText(mA)}“`;
	}
	ok(spatne === null, spatne ?? 'pro všechny 3 cesty sedí barva srdce, nakreslená cesta, barvy aktivních kontaktů i info panel s výpočtem');
	nastavB(0);
}

console.log('\n— scéna B: „tečky proudu“ jsou vidět jen když je obvod uzavřený —');
{
	nastavB(0); // ruka-ruka, uzavřeno
	const opacityUzavreno = (prvky.get('ns-1') || {}).atributy?.opacity;
	nastavB(2); // jedna ruka, otevřeno
	const opacityOtevreno = (prvky.get('ns-1') || {}).atributy?.opacity;
	ok(opacityUzavreno === '1', `při uzavřeném obvodu jsou tečky viditelné (opacity=${opacityUzavreno})`);
	ok(opacityOtevreno === '0', `při otevřeném obvodu jsou tečky skryté (opacity=${opacityOtevreno})`);
	ok(vytvorenychNS >= 5, `vytvořeno aspoň 5 „teček proudu“ přes createElementNS (${vytvorenychNS})`);
	nastavB(0);
}

console.log('\n— scéna B: tlačítko play/pauza SKUTEČNĚ volá requestAnimationFrame/cancelAnimationFrame —');
{
	nastavB(0); // ruka-ruka, uzavřeno — tlačítko musí jít spustit
	const pocetRAFPredKlikem = pocetRAF;
	kliknoutPlay(); // 1. klik: start
	ok(pocetRAF === pocetRAFPredKlikem + 1, `klik na „pusť proud“ zavolá requestAnimationFrame přesně jednou (${pocetRAF - pocetRAFPredKlikem}×)`);
	ok(jedeB() === true, `po kliknutí animace běží (jedeB() = ${jedeB()})`);
	ok(prvky.get('upb-b-play').textContent.includes('zastav'), `text tlačítka se změní na „zastav“: „${prvky.get('upb-b-play').textContent}"`);

	const pocetCAFPredPauzou = pocetCAF;
	kliknoutPlay(); // 2. klik: pauza
	ok(pocetCAF === pocetCAFPredPauzou + 1, `klik na „zastav proud“ zavolá cancelAnimationFrame přesně jednou (${pocetCAF - pocetCAFPredPauzou}×)`);
	ok(jedeB() === false, `po druhém kliknutí animace stojí (jedeB() = ${jedeB()})`);
	ok(prvky.get('upb-b-play').textContent.includes('pusť'), `text tlačítka se vrátí na „pusť“: „${prvky.get('upb-b-play').textContent}"`);

	// otevřený obvod (jedna ruka): kliknutí nesmí nic spustit, animovat se nedá
	nastavB(2);
	ok(prvky.get('upb-b-play').disabled === true, 'u otevřeného obvodu je tlačítko vyřazené (disabled)');
	const pocetRAFPredKlikemOtevreno = pocetRAF;
	kliknoutPlay();
	ok(pocetRAF === pocetRAFPredKlikemOtevreno, `klik na vyřazené tlačítko (otevřený obvod) nezavolá requestAnimationFrame (${pocetRAF - pocetRAFPredKlikemOtevreno}×)`);
	ok(jedeB() === false, 'a animace se nerozběhne');
	nastavB(0);
}

console.log('\n— boduNaCeste: čistá funkce zůstává uvnitř úsečky waypointů —');
{
	const body = CESTY['ruka-ruka'].waypoints.map((id) => BODY[id]);
	const p0 = boduNaCeste(0, body);
	ok(Math.abs(p0.x - body[0].x) < 1e-6 && Math.abs(p0.y - body[0].y) < 1e-6, `t=0 vrací přesně první waypoint (${p0.x},${p0.y})`);
	let mimo = 0;
	const minX = Math.min(...body.map((b) => b.x)), maxX = Math.max(...body.map((b) => b.x));
	const minY = Math.min(...body.map((b) => b.y)), maxY = Math.max(...body.map((b) => b.y));
	for (let t = 0; t < 1; t += 0.02) {
		const bod = boduNaCeste(t, body);
		if (bod.x < minX - 0.01 || bod.x > maxX + 0.01 || bod.y < minY - 0.01 || bod.y > maxY + 0.01) mimo++;
	}
	ok(mimo === 0, `bod na cestě zůstává v obálce waypointů pro 50 vzorků t (mimo: ${mimo})`);
}

console.log('\n— nic neleze z obrázku A (viewBox 660×350) pro žádnou z 9 kombinací —');
{
	let mimo = null;
	for (let iN = 0; iN < 3 && !mimo; iN++) {
		for (let iK = 0; iK < 3 && !mimo; iK++) {
			nastavA(iN, iK);
			for (const g of [prvky.get('upb-a-info'), prvky.get('upb-a-zdroj'), prvky.get('upb-a-varovani'), prvky.get('upb-a-pasmo-pozadi')]) {
				for (const t of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
					if (+t[1] < 0 || +t[1] > 660 || +t[2] < 0 || +t[2] > 350) mimo = `${g.id}: text x=${t[1]} y=${t[2]}`;
				}
				for (const r of g.innerHTML.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)) {
					const [x, y, w, h] = [1, 2, 3, 4].map((i) => +r[i]);
					if (x < 0 || x + w > 660 || y < 0 || y + h > 350) mimo = `${g.id}: rect ${x},${y} ${w}×${h}`;
				}
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku A — ${mimo}` : 'texty a obdélníky zůstávají uvnitř viewBoxu 660×350 pro všech 9 kombinací');
	nastavA(0, 0);
}

console.log('\n— nic neleze z obrázku B (viewBox 660×300) pro žádnou ze 3 cest —');
{
	let mimo = null;
	for (let i = 0; i < 3 && !mimo; i++) {
		nastavB(i);
		for (const g of [prvky.get('upb-b-info'), prvky.get('upb-b-pasmo-pozadi')]) {
			for (const t of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
				if (+t[1] < 0 || +t[1] > 660 || +t[2] < 0 || +t[2] > 300) mimo = `${g.id}: text x=${t[1]} y=${t[2]}`;
			}
		}
		const d = prvky.get('upb-b-cesta-linka').getAttribute('d');
		if (d) {
			for (const bod of d.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)) {
				if (+bod[1] < 0 || +bod[1] > 660 || +bod[2] < 0 || +bod[2] > 300) mimo = `cesta-linka: bod ${bod[1]},${bod[2]}`;
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku B — ${mimo}` : 'texty a nakreslená cesta zůstávají uvnitř viewBoxu 660×300 pro všechny 3 cesty');
	nastavB(0);
}

console.log('\n— odolnost: neplatné hodnoty posuvníků nesmí shodit skript ani vypsat NaN —');
{
	let spadlo = null;
	try {
		prvky.get('upb-a-napeti').value = 'abc';
		for (const f of prvky.get('upb-a-napeti').posluchaci.input) f();
		prvky.get('upb-a-kuze').value = '';
		for (const f of prvky.get('upb-a-kuze').posluchaci.input) f();
		prvky.get('upb-b-cesta').value = '99';
		for (const f of prvky.get('upb-b-cesta').posluchaci.input) f();
	} catch (e) {
		spadlo = e.message;
	}
	ok(spadlo === null, spadlo ? `skript spadl na neplatné hodnotě: ${spadlo}` : 'neplatné hodnoty posuvníků skript nezhroutí');
	ok(!prvky.get('upb-a-stav').textContent.includes('NaN'), 'stav A neobsahuje „NaN“');
	ok(!prvky.get('upb-b-stav').textContent.includes('NaN'), 'stav B neobsahuje „NaN“');
	nastavA(0, 0);
	nastavB(0);
}

console.log('\n— kotvy: napevno v HTML —');
{
	for (const slovo of ['Účinky proudu na tělo', 'Napětí, vlhkost kůže', 'Kudy proud teče', 'Ohmův zákon', 'nikdy se to nezkouší']) {
		ok(html.includes(slovo), `ve viditelném HTML je „${slovo}“`);
	}
	ok(/id="upb-a-napeti"[^>]*min="0"[^>]*max="2"[^>]*step="1"[^>]*value="0"/.test(html), 'posuvník napětí (A) jde 0–2, výchozí 0 (baterie)');
	ok(/id="upb-a-kuze"[^>]*min="0"[^>]*max="2"[^>]*step="1"[^>]*value="0"/.test(html), 'posuvník kůže (A) jde 0–2, výchozí 0 (suchá)');
	ok(/id="upb-b-cesta"[^>]*min="0"[^>]*max="2"[^>]*step="1"[^>]*value="0"/.test(html), 'posuvník cesty (B) jde 0–2, výchozí 0 (ruka→ruka)');
	ok(html.includes('230 V'), 'napětí zásuvky (230 V) je vidět i v textu, ne jen ve výpočtu');
	ok(!zdroj.includes('import '), 'skript neobsahuje žádný import (hard rule)');
}

console.log(chyby === 0 ? '\n✅ Účinky proudu na člověka, bezpečnost: vše sedí.' : `\n❌ Účinky proudu na člověka, bezpečnost: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);
