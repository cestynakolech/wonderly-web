#!/usr/bin/env node
// Ověření RazeniClankuSimulace.astro — řazení článků a proud v obvodu (F9,
// chemicke-zdroje-napeti). Měří se VÝSLEDEK: skript komponenty se spustí ve VM
// sandboxu a testuje se to, co skript zapsal do DOMu (innerHTML, textContent)
// i jeho vlastní čisté funkce (__stavA, __geometriePack, __bodNaCeste…), ne
// vzory nad zdrojovým textem.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj
	.replace(/^---[\s\S]*?\n---/, '')
	.replace(/<script>[\s\S]*?<\/script>/, '');
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
		value: hodnotaZHtml(id) ?? '',
		disabled: false,
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
let posledniRafId = 0;
const rafCallbacky = new Map();
const sandbox = {
	document, performance: { now: () => 0 },
	// requestAnimationFrame se v náhledu/testu NESPOUŠTÍ automaticky (stejná
	// pojistka jako v ostatních testech animovaných simulací) — sleduje se
	// jen VÝSLEDEK prvního synchronního vykreslení po kliknutí.
	requestAnimationFrame: (f) => { posledniRafId += 1; rafCallbacky.set(posledniRafId, f); return posledniRafId; },
	cancelAnimationFrame: (id) => { rafCallbacky.delete(id); },
	console, Math,
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

const klik = (id) => { for (const f of prvky.get(id).posluchaci.click) f(); };
const nastavSlider = (id, hodnota) => { prvky.get(id).value = String(hodnota); for (const f of prvky.get(id).posluchaci.input) f(); };

// ══════════════════════════ SCÉNA A: sériové řazení ══════════════════════════
const svgA = prvky.get('rc-a-svg');
const {
	__TYPY: TYPY, __stavA: stavA, __jasZarovky: jasZarovky, __jasPopis: jasPopis,
	__pocetPaprsku: pocetPaprsku, __geometriePack: geometriePack, __napetiText: napetiText,
	__NAPETI_MAX_MOZNE: NAPETI_MAX_MOZNE,
} = svgA;

console.log('— tabulka typů (natvrdo, ať test nic neodkývá) —');
{
	ok(TYPY.length === 2, `dva typy článků v nabídce (${TYPY.length})`);
	ok(TYPY[0].nazev.includes('suchý') && TYPY[0].napeti === 1.5, `suchý článek: 1,5 V (mám ${TYPY[0].napeti})`);
	ok(TYPY[1].nazev.includes('olověný') && TYPY[1].napeti === 2, `olověný článek: 2 V (mám ${TYPY[1].napeti})`);
}

console.log('\n— čistá funkce: napětí = počet × napětí jednoho článku —');
{
	ok(stavA(1, 0).napeti === 1.5, `1 suchý článek = 1,5 V (mám ${stavA(1, 0).napeti})`);
	ok(stavA(2, 0).napeti === 3, `2 suché články = 3 V (mám ${stavA(2, 0).napeti})`);
	ok(stavA(4, 0).napeti === 6, `4 suché články = 6 V (mám ${stavA(4, 0).napeti}) — příklad z hodiny na této stránce`);
	ok(stavA(6, 0).napeti === 9, `6 suchých článků = 9 V (mám ${stavA(6, 0).napeti})`);
	ok(stavA(1, 1).napeti === 2, `1 olověný článek = 2 V (mám ${stavA(1, 1).napeti})`);
	ok(stavA(6, 1).napeti === 12, `6 olověných článků = 12 V — autobaterie (mám ${stavA(6, 1).napeti})`);
	ok(stavA(3, 0).napeti === 4.5, `3 suché články = 4,5 V, desetinné schválně (mám ${stavA(3, 0).napeti})`);
}

console.log('\n— čistá funkce: jas žárovky roste s napětím, olověný svítí jasněji než suchý při stejném počtu —');
{
	ok(jasZarovky(1.5) < jasZarovky(3), 'víc suchých článků = víc jasu');
	ok(jasZarovky(stavA(3, 1).napeti) > jasZarovky(stavA(3, 0).napeti), `3 olověné (${stavA(3, 1).napeti} V) svítí víc než 3 suché (${stavA(3, 0).napeti} V)`);
	ok(jasZarovky(12) === 1, 'maximální dosažitelné napětí (12 V) dává plný jas 1');
	ok(jasZarovky(1.5) > 0 && jasZarovky(1.5) <= 1, `jas je vždy v rozsahu (0,1] (mám ${jasZarovky(1.5)})`);
	// Kotva PŘESNĚ na konstantu 12 V (6 olověných článků, autobaterie) —
	// jasZarovky(12)===1 by prošlo i s jinou konstantou ≥ 9, proto se kontroluje
	// i MEZIHODNOTA 9 V, která má vyjít přesně 0,75 jen při stropu 12.
	ok(NAPETI_MAX_MOZNE === 12, `konstanta stropu jasu je přesně 12 V — 6 olověných článků (mám ${NAPETI_MAX_MOZNE})`);
	ok(jasZarovky(9) === 0.75, `9 V dá jas přesně 0,75 jen při stropu 12 V (mám ${jasZarovky(9)})`);
	ok(jasZarovky(6) === 0.5, `6 V (výchozí stav) dá jas přesně 0,5 (mám ${jasZarovky(6)})`);
}

console.log('\n— čistá funkce: slovní popis jasu (jasPopis) sedí s prahy —');
{
	ok(jasPopis(0.9) === 'jasně', `jas 0,9 → „jasně" (mám „${jasPopis(0.9)}")`);
	ok(jasPopis(0.5) === 'středně jasně', `jas 0,5 → „středně jasně" (mám „${jasPopis(0.5)}")`);
	ok(jasPopis(0.2) === 'slabě', `jas 0,2 → „slabě" (mám „${jasPopis(0.2)}")`);
}

console.log('\n— čistá funkce: počet paprsků žárovky roste s jasem (hlavní VIDITELNÝ nosič rozdílu) —');
{
	ok(pocetPaprsku(0) === 0, `jas 0 → 0 paprsků (mám ${pocetPaprsku(0)})`);
	ok(pocetPaprsku(0.5) === 4, `jas 0,5 (výchozí 6 V) → 4 paprsky (mám ${pocetPaprsku(0.5)})`);
	ok(pocetPaprsku(1) === 8, `jas 1 (12 V) → 8 paprsků (mám ${pocetPaprsku(1)})`);
	ok(pocetPaprsku(0.5) < pocetPaprsku(1), '6 V má MÉNĚ paprsků než 12 V');
}

console.log('\n— čistá funkce: geometrie řady roste doprava, terminály se nepřekrývají —');
{
	let rosteVpravo = true;
	let g0 = geometriePack(1);
	for (let n = 2; n <= 6; n++) {
		const g = geometriePack(n);
		if (g.xLastRight <= g0.xLastRight) rosteVpravo = false;
		g0 = g;
	}
	ok(rosteVpravo, 'pravý okraj řady se s přibývajícími články posouvá doprava');
	const g6 = geometriePack(6);
	ok(g6.cells.length === 6, `6 článků v poli (mám ${g6.cells.length})`);
	ok(g6.startX - 16 >= 0 && g6.xLastRight + 16 <= 660, `terminály (${g6.startX - 16}, ${g6.xLastRight + 16}) leží uvnitř plátna 660`);
}

console.log('\n— výchozí stav scény A: 4 suché články, 6 V —');
{
	ok(prvky.get('rc-a-pocet').value === '4', 'posuvník počtu začíná na 4');
	ok(prvky.get('rc-a-typ').value === '0', 'posuvník typu začíná na 0 (suchý)');
	ok(prvky.get('rc-a-out-pocet').textContent.includes('4'), `popisek počtu: „${prvky.get('rc-a-out-pocet').textContent}"`);
	ok(prvky.get('rc-a-voltmetr').innerHTML.includes('6 V'), `voltmetr ukazuje 6 V: ${prvky.get('rc-a-voltmetr').innerHTML}`);
	ok(prvky.get('rc-a-stav').textContent.includes('6 V'), `hláška hlásí 6 V: „${prvky.get('rc-a-stav').textContent}"`);
}

console.log('\n— žárovka na VYKRESLENÉM SVG se skutečně liší mezi 6 V a 12 V —');
{
	// Přímá kontrola VÝSTUPU (ne jen výpočtu jasu): kolik paprsků a jaké
	// opacity/poloměr skutečně skončí v innerHTML žárovky při výchozím stavu
	// (4 suché = 6 V) a při 6 olověných (12 V). Musí se LIŠIT, jinak je to
	// přesně vada, kterou dřív žádný test neodhalil — výpočet jasu existoval,
	// ale do SVG se nepropisoval dost viditelně.
	nastavSlider('rc-a-pocet', 4);
	nastavSlider('rc-a-typ', 0);
	// Počítají se jen paprsky (oranžové, stroke="#f08c00") — bulb má navíc
	// napevno dva černé čárky křížku (symbol žárovky), ty jsou na jasu
	// nezávislé a nesmí se do počtu paprsků započítat.
	const zarovka6V = prvky.get('rc-a-zarovka').innerHTML;
	const paprsku6V = (zarovka6V.match(/<line [^>]*stroke="#f08c00"/g) || []).length;
	const jadro6V = /<circle cx="330" cy="100" r="20" fill="#ffd43b" opacity="([\d.]+)"/.exec(zarovka6V);

	nastavSlider('rc-a-typ', 1);
	nastavSlider('rc-a-pocet', 6);
	ok(prvky.get('rc-a-voltmetr').innerHTML.includes('12 V'), `voltmetr: ${prvky.get('rc-a-voltmetr').innerHTML}`);
	ok(prvky.get('rc-a-out-typ').textContent.includes('olověný'), `typ: „${prvky.get('rc-a-out-typ').textContent}"`);
	const zarovka12V = prvky.get('rc-a-zarovka').innerHTML;
	const paprsku12V = (zarovka12V.match(/<line [^>]*stroke="#f08c00"/g) || []).length;
	const jadro12V = /<circle cx="330" cy="100" r="20" fill="#ffd43b" opacity="([\d.]+)"/.exec(zarovka12V);

	ok(paprsku6V === 4, `při 6 V je ve žárovce 4 paprsky (mám ${paprsku6V})`);
	ok(paprsku12V === 8, `při 12 V je ve žárovce 8 paprsků (mám ${paprsku12V})`);
	ok(paprsku12V > paprsku6V, `12 V má VÍC paprsků než 6 V (${paprsku12V} > ${paprsku6V}) — rozdíl je VIDĚT v SVG, ne jen ve výpočtu`);
	ok(!!jadro12V && !!jadro6V && Number(jadro12V[1]) > Number(jadro6V[1]), `jádro žárovky je při 12 V neprůhlednější než při 6 V (12V=${jadro12V && jadro12V[1]}, 6V=${jadro6V && jadro6V[1]})`);
	ok(!!jadro12V && Number(jadro12V[1]) > 0.9, `jádro žárovky svítí při 12 V téměř naplno (opacity=${jadro12V && jadro12V[1]})`);

	nastavSlider('rc-a-pocet', 4);
	nastavSlider('rc-a-typ', 0);
}

console.log('\n— scéna: každý článek má vlastní − vlevo a + vpravo (správná polarita v řadě) —');
{
	nastavSlider('rc-a-pocet', 3);
	const pack = prvky.get('rc-a-pack').innerHTML;
	const minusy = (pack.match(/fill="#74c0fc">−<\/text>/g) || []).length;
	const plusy = (pack.match(/fill="#ff8787">\+<\/text>/g) || []).length;
	ok(minusy === 3, `3 popisky „−" (po jednom na článek), mám ${minusy}`);
	ok(plusy === 3, `3 popisky „+" (po jednom na článek), mám ${plusy}`);
	nastavSlider('rc-a-pocet', 4);
}

console.log('\n— nic ve scéně A nevyleze z obrázku (viewBox 660×420) —');
{
	let mimo = null;
	for (const pocet of [1, 3, 6]) {
		for (const typ of [0, 1]) {
			nastavSlider('rc-a-typ', typ);
			nastavSlider('rc-a-pocet', pocet);
			for (const g of [prvky.get('rc-a-voltmetr'), prvky.get('rc-a-obvod'), prvky.get('rc-a-zarovka'), prvky.get('rc-a-pack'), prvky.get('rc-a-info')]) {
				for (const t of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
					if (+t[1] < 0 || +t[1] > 660 || +t[2] < 0 || +t[2] > 420) mimo = `${g.id}: x=${t[1]} y=${t[2]} (počet=${pocet}, typ=${typ})`;
				}
			}
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku — ${mimo}` : 'všechny texty zůstávají uvnitř viewBoxu 660×420');
	nastavSlider('rc-a-typ', 0);
	nastavSlider('rc-a-pocet', 4);
}

// ══════════════════════════ SCÉNA B: proud uvnitř a vně ══════════════════════
const svgB = prvky.get('rc-b-svg');
const {
	__DRAHA_ELEKTRONU: DRAHA_ELEKTRONU, __DRAHA_KATIONTU: DRAHA_KATIONTU, __DRAHA_ANIONTU: DRAHA_ANIONTU,
	__bodNaCeste: bodNaCeste, __vykresliCastice: vykresliCastice, __STRED_X: STRED_X, __MEZERA_STRED: MEZERA_STRED,
} = svgB;

console.log('\n— čistá funkce: elektrony vně tečou OD − K + —');
{
	const zacatek = bodNaCeste(DRAHA_ELEKTRONU, 0);
	const konec = bodNaCeste(DRAHA_ELEKTRONU, 1);
	ok(zacatek.x === 270, `elektron začíná u − elektrody (x=${zacatek.x})`);
	ok(konec.x === 390, `elektron končí u + elektrody (x=${konec.x})`);
}

console.log('\n— čistá funkce: kladné ionty směřují k + (do pravé poloviny), záporné k − (do levé poloviny) —');
{
	const kZac = bodNaCeste(DRAHA_KATIONTU, 0), kKonec = bodNaCeste(DRAHA_KATIONTU, 1);
	ok(kKonec.x === 390, `kation končí u + elektrody (x=${kKonec.x})`);
	ok(kZac.x > STRED_X, `kation začíná v PRAVÉ polovině elektrolytu, ne u zinku (x=${kZac.x}, střed=${STRED_X})`);
	const aZac = bodNaCeste(DRAHA_ANIONTU, 0), aKonec = bodNaCeste(DRAHA_ANIONTU, 1);
	ok(aKonec.x === 270, `anion končí u − elektrody (x=${aKonec.x})`);
	ok(aZac.x < STRED_X, `anion začíná v LEVÉ polovině elektrolytu, ne u mědi (x=${aZac.x}, střed=${STRED_X})`);
}

console.log('\n— STRUKTURÁLNÍ INVARIANTA: iont blíž mědi je VŽDY kladný, iont blíž zinku je VŽDY záporný —');
{
	// Nezávislá re-kontrola (15. 8. 2026) našla vadu, kterou předchozí verze
	// testu měřená JEN na t=0 neodhalila: obě dráhy jely po TÉŽE ose (270↔390)
	// opačným směrem, takže se v čase nutně křížily a na některých snímcích
	// vyšel anion NAPRAVO od kationtu. Test proto prochází CELOU periodu
	// animace (21 časů 0,00 – 1,00), ne jediný okamžik — jinak by se stejná
	// třída chyby mohla znovu propašovat kolem jednobodové kontroly.
	ok(MEZERA_STRED > 0, `dráhy mají definovanou nenulovou mezeru uprostřed (${MEZERA_STRED} px) — bez ní se mohou dotknout`);
	let poruseno = null;
	for (let i = 0; i <= 20; i++) {
		const t = i / 20;
		vykresliCastice(t);
		const html = prvky.get('rc-b-castice').innerHTML;
		const kationyX = [...html.matchAll(/<circle cx="([\d.]+)"[^>]*data-castice="kation"/g)].map((m) => Number(m[1]));
		const anionyX = [...html.matchAll(/<circle cx="([\d.]+)"[^>]*data-castice="anion"/g)].map((m) => Number(m[1]));
		if (!kationyX.length || !anionyX.length) { poruseno = `t=${t}: chybí částice (kationů=${kationyX.length}, aniontů=${anionyX.length})`; break; }
		const minKation = Math.min(...kationyX), maxAnion = Math.max(...anionyX);
		if (minKation <= maxAnion) {
			poruseno = `t=${t}: nejlevější kation (x=${minKation}) NENÍ napravo od nejpravějšího aniontu (x=${maxAnion}) — kladné a záporné ionty se prohodily`;
			break;
		}
	}
	ok(poruseno === null, poruseno ?? 'na všech 21 změřených okamžicích animace platí: každý kation leží napravo od každého aniontu (blíž mědi = +, blíž zinku = −)');
	// úklid: test si scénu „nastartoval“ přes vykresliCastice, ale obvod je
	// pořád oficiálně vypnutý (nekliklo se na tlačítko) — vrátit scénu do
	// klidu, ať navazující kontrola výchozího stavu neuvidí cizí částice.
	prvky.get('rc-b-castice').innerHTML = '';
}

console.log('\n— čistá funkce: bodNaCeste postupuje plynule po dráze, bez skoků zpátky —');
{
	// Součet vzdáleností mezi po sobě jdoucími body (t=0,0.1,…,1) se musí
	// rovnat CELKOVÉ délce dráhy — kdyby částice poskočila zpátky, součet by
	// byl větší (ušla by kus navíc tam a zase zpátky).
	function delkaDrahy(body) {
		let d = 0;
		for (let i = 1; i < body.length; i++) d += Math.hypot(body[i].x - body[i - 1].x, body[i].y - body[i - 1].y);
		return d;
	}
	const celkem = delkaDrahy(DRAHA_ELEKTRONU);
	// Krok se volí JEMNÝ (200 dílků) — u hrubšího kroku "uřezává rohy" ve
	// dvou zalomeních dráhy (chorda přes roh je kratší než dva úseky), což je
	// jen nepřesnost odhadu, ne skutečný zpětný skok. S jemným krokem je
	// rozdíl řádově desetiny procenta.
	let usla = 0;
	let predchozi = bodNaCeste(DRAHA_ELEKTRONU, 0);
	for (let i = 1; i <= 200; i++) {
		const p = bodNaCeste(DRAHA_ELEKTRONU, i / 200);
		usla += Math.hypot(p.x - predchozi.x, p.y - predchozi.y);
		predchozi = p;
	}
	ok(Math.abs(usla - celkem) < celkem * 0.01, `ušlá dráha (${usla.toFixed(1)}) odpovídá celkové délce (${celkem.toFixed(1)}) — bez zpětných skoků`);
}

console.log('\n— výchozí stav scény B: obvod vypnutý, žádné částice —');
{
	ok(prvky.get('rc-b-tlacitko').textContent.includes('Spustit'), `tlačítko nabízí spuštění: „${prvky.get('rc-b-tlacitko').textContent}"`);
	ok(prvky.get('rc-b-castice').innerHTML === '', 'na startu nejsou ve scéně žádné částice');
	ok(prvky.get('rc-b-stav').textContent.includes('vypnutý'), `hláška hlásí vypnutý obvod: „${prvky.get('rc-b-stav').textContent}"`);
	const elektrody = prvky.get('rc-b-elektrody').innerHTML;
	ok(elektrody.includes('zinek') && elektrody.includes('měď'), 'obě elektrody jsou popsané (zinek, měď)');
	const smer = prvky.get('rc-b-smer').innerHTML;
	ok(smer.includes('technický směr proudu'), 'technický směr proudu je popsaný natrvalo, nezávisle na spuštění');
}

console.log('\n— klik na „Spustit“: objeví se elektrony i oba druhy iontů, tlačítko se přepne —');
{
	klik('rc-b-tlacitko');
	const castice = prvky.get('rc-b-castice').innerHTML;
	ok((castice.match(/data-castice="elektron"/g) || []).length === 3, `3 elektrony ve scéně (${(castice.match(/data-castice="elektron"/g) || []).length})`);
	ok((castice.match(/data-castice="kation"/g) || []).length === 3, `3 kladné ionty ve scéně (${(castice.match(/data-castice="kation"/g) || []).length})`);
	ok((castice.match(/data-castice="anion"/g) || []).length === 3, `3 záporné ionty ve scéně (${(castice.match(/data-castice="anion"/g) || []).length})`);
	ok(prvky.get('rc-b-tlacitko').textContent.includes('Zastavit'), `tlačítko nabízí zastavení: „${prvky.get('rc-b-tlacitko').textContent}"`);
	ok(prvky.get('rc-b-stav').textContent.includes('zapnutý'), `hláška hlásí zapnutý obvod: „${prvky.get('rc-b-stav').textContent}"`);
	const obvod = prvky.get('rc-b-obvod').innerHTML;
	const jadro = /<circle cx="330" cy="40" r="18" fill="#ffd43b" opacity="([\d.]+)"/.exec(obvod);
	ok(!!jadro && Number(jadro[1]) > 0.8, `žárovka svítí po spuštění (opacity=${jadro && jadro[1]})`);

	// Kontrola PROTI přesně tomu artefaktu, který nahlásil nezávislý kontrolor:
	// v prvním vykresleném snímku (t=0) nesmí žádný kladný iont sedět přesně
	// u záporné (zinkové, x=270) elektrody a žádný záporný iont přesně u
	// kladné (měděné, x=390) — i když směr pohybu je správný, taková poloha
	// vypadá staticky jako popletený popisek.
	const kationyX = [...castice.matchAll(/<circle cx="([\d.]+)"[^>]*data-castice="kation"/g)].map((m) => Number(m[1]));
	const anionyX = [...castice.matchAll(/<circle cx="([\d.]+)"[^>]*data-castice="anion"/g)].map((m) => Number(m[1]));
	ok(kationyX.every((x) => Math.abs(x - 270) > 5), `žádný kladný iont nesedí přímo u zinkové (−) elektrody (x=270): ${kationyX.join(', ')}`);
	ok(anionyX.every((x) => Math.abs(x - 390) > 5), `žádný záporný iont nesedí přímo u měděné (+) elektrody (x=390): ${anionyX.join(', ')}`);
	// A zároveň musí být všechny hodnoty uvnitř dráhy 270–390 (nikde jinde).
	ok(kationyX.every((x) => x >= 270 && x <= 390) && anionyX.every((x) => x >= 270 && x <= 390), 'všechny ionty leží na dráze mezi elektrodami (270–390)');
}

console.log('\n— klik na „Zastavit“: částice zmizí, žárovka zhasne —');
{
	klik('rc-b-tlacitko');
	ok(prvky.get('rc-b-castice').innerHTML === '', 'po zastavení jsou částice pryč');
	ok(prvky.get('rc-b-tlacitko').textContent.includes('Spustit'), `tlačítko zpět nabízí spuštění: „${prvky.get('rc-b-tlacitko').textContent}"`);
	const obvod = prvky.get('rc-b-obvod').innerHTML;
	const jadro = /<circle cx="330" cy="40" r="18" fill="#ffd43b" opacity="([\d.]+)"/.exec(obvod);
	ok(!!jadro && Number(jadro[1]) < 0.5, `žárovka po zastavení zhasla (opacity=${jadro && jadro[1]})`);
}

console.log('\n— nic ve scéně B nevyleze z obrázku (viewBox 660×480) —');
{
	klik('rc-b-tlacitko'); // spustit, ať se změří i částice
	let mimo = null;
	for (const g of [prvky.get('rc-b-elektrody'), prvky.get('rc-b-obvod'), prvky.get('rc-b-castice'), prvky.get('rc-b-info'), prvky.get('rc-b-smer')]) {
		for (const t of g.innerHTML.matchAll(/<text x="(-?[\d.]+)" y="(-?[\d.]+)"/g)) {
			if (+t[1] < 0 || +t[1] > 660 || +t[2] < 0 || +t[2] > 480) mimo = `${g.id}: x=${t[1]} y=${t[2]}`;
		}
	}
	ok(mimo === null, mimo ? `něco leze z obrázku — ${mimo}` : 'všechny texty zůstávají uvnitř viewBoxu 660×480');
	klik('rc-b-tlacitko'); // zastavit zpátky do klidu
}

console.log('\n— odolnost: neplatná hodnota na posuvníku nezhroutí překreslení scény A —');
{
	let spadlo = null;
	try {
		prvky.get('rc-a-pocet').value = 'abc';
		for (const f of prvky.get('rc-a-pocet').posluchaci.input) f();
	} catch (e) { spadlo = e.message; }
	ok(spadlo === null, spadlo ? `scéna A spadla na neplatném posuvníku: ${spadlo}` : 'scéna A přežije neplatnou hodnotu posuvníku (spadne na 4 články)');
	ok(prvky.get('rc-a-voltmetr').innerHTML.includes('6 V'), 'a ukáže rozumný výchozí stav (4 × 1,5 V = 6 V), ne „NaN V"');
	nastavSlider('rc-a-pocet', 4);
}

console.log('\n— kotvy: napevno v HTML —');
{
	for (const slovo of ['Sestav baterii', 'proud v obvodu', 'elektrony', 'ionty', 'technický směr proudu']) {
		ok(html.includes(slovo), `v HTML je natvrdo „${slovo}"`);
	}
	ok(/id="rc-a-pocet"[^>]*min="1"[^>]*max="6"[^>]*value="4"/.test(html), 'posuvník počtu jde 1 až 6, výchozí 4');
	ok(/id="rc-a-typ"[^>]*min="0"[^>]*max="1"[^>]*value="0"/.test(html), 'posuvník typu jde 0 až 1, výchozí 0 (suchý)');
}

console.log(chyby === 0 ? '\n✅ Řazení článků: vše sedí.' : `\n❌ Řazení článků: ${chyby} chyb.`);
process.exit(chyby === 0 ? 0 : 1);
