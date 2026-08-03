#!/usr/bin/env node
// Ověření SenzoryRobotaSimulace.astro — senzory robota (informatika 8).
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm), žádný prohlížeč.
//
// Hlídané pointy výkladu:
//  ★ bez opakování jede robot NASLEPO — podmínku vyhodnotí jen jednou na začátku,
//  ★ ultrazvuk od šikmé stěny a od měkké látky nedostane ozvěnu a hlásí „volno",
//    takže robot poslušně nabourá, i když je zeď kousek před ním,
//  ★ dotykový senzor je spolehlivý, ale pozná překážku až PO nárazu — proto se
//    oba senzory kombinují.
//
// Očekávané hodnoty jsou v testu psané RUČNĚ (120, 10, 200), ne brané z komponenty —
// jinak by prohození významu prošlo a test by sám vypisoval nepravdu (nález z kontroly
// simulace „funkce v tabulkách" 3. 8. 2026).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.split('<script>')[0];
const sablona = html.slice(html.indexOf('<section'));

const prvky = new Map();
const vyrobene = new Set();
const novy = (id, vTemplatu = false) => {
	const p = {
		id, atributy: {}, innerHTML: '', style: {}, dataset: {}, posluchaci: {}, deti: [],
		_text: '',
		get textContent() { return this._text; },
		set textContent(v) { this._text = String(v); },
		classList: { tridy: new Set(), add(t) { this.tridy.add(t); }, remove(t) { this.tridy.delete(t); }, contains(t) { return this.tridy.has(t); } },
		get className() { return [...this.classList.tridy].join(' '); },
		set className(v) { this.classList.tridy = new Set(String(v).split(/\s+/).filter(Boolean)); },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild(d) { this.deti.push(d); },
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	if (!vTemplatu) vyrobene.add(id);
	prvky.set(id, p);
	return p;
};
const tl = (d, id) => { const x = novy(id, true); Object.assign(x.dataset, d); return x; };

const volbyEl = [tl({ opakovat: '1' }, 'v-opak-1'), tl({ opakovat: '0' }, 'v-opak-0')];
const prekazkyEl = [tl({ prekazka: 'kolma' }, 'v-kolma'), tl({ prekazka: 'sikma' }, 'v-sikma'),
	tl({ prekazka: 'zaclona' }, 'v-zaclona')];
function querySelectorAll(s) {
	if (s === '.sr-volba') return volbyEl;
	if (s === '.sr-prekazka') return prekazkyEl;
	return [];
}
const ID_SABLONY = ['sr-scena', 'sr-robot', 'sr-oko', 'sr-paprsek', 'sr-zed', 'sr-hlaseni',
	'sr-skutecnost', 'sr-ujel', 'sr-tab-hlaseni', 'sr-tab-skutecnost', 'sr-rozhodnuti',
	'sr-pozn-hlaseni', 'sr-pozn-rozhodnuti', 'sr-pozn-krok', 'sr-stav', 'sr-krok', 'sr-spust',
	'sr-reset', 'sr-dotyk'];
for (const id of ID_SABLONY) novy(id, true);

const document = { getElementById: (id) => prvky.get(id) || novy(id), querySelectorAll,
	createElement: () => novy('e' + Math.random(), true), createElementNS: () => novy('e' + Math.random(), true) };
const sandbox = { document, console, Array, Math, String, Object, Number };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const scena = prvky.get('sr-scena');
const stavEl = prvky.get('sr-stav');
const el = (id) => prvky.get(id);
const klik = (e) => (e.posluchaci.click || []).forEach((f) => f());
const btn = { krok: el('sr-krok'), spust: el('sr-spust'), reset: el('sr-reset'), dotyk: el('sr-dotyk') };

let chyby = 0;
let kontrol = 0;
const ok = (p, t) => { kontrol++; console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };

const { START, KROK, PRAH, MAX_DOSAH, PREKAZKY } = scena.__meze;
const cistyText = (h) => h.replace(/<[^>]*>/g, '');
const stav = () => cistyText(stavEl.innerHTML);

// Pomůcka: nastav situaci a pusť celý program.
const nastav = (opakovat, prekazka, dotyk = false) => {
	klik(prekazkyEl.find((p) => p.dataset.prekazka === prekazka));
	klik(volbyEl.find((v) => v.dataset.opakovat === String(opakovat)));
	const chceme = dotyk;
	if ((scena.__stav().dotyk) !== chceme) klik(btn.dotyk);
	klik(btn.reset);
};

// ———————————————————————— 0) VÝCHOZÍ STAV (měří se PŘED prvním klikem — potom už je pozdě)
{
	const v = scena.__stav();
	ok(v.ujel === 0, 'robot začíná na startu');
	ok(v.opakovat === 1, '★ a program začíná ten s OPAKOVÁNÍM — dítě má nejdřív vidět, jak to má být');
	ok(v.prekazka === 'kolma', 'před robotem je nejdřív obyčejná kolmá zeď');
	ok(v.dotyk === false, 'dotykový senzor je vypnutý, aby šlo ukázat, co ultrazvuk sám nezvládne');
	ok(sablona.match(/data-opakovat="(\d)"[^>]*aria-pressed="true"/)?.[1] === String(v.opakovat),
		'★ a zvýrazněné tlačítko v šabloně ukazuje totéž nastavení, se kterým kód opravdu startuje');
	ok(sablona.match(/data-prekazka="(\w+)"[^>]*aria-pressed="true"/)?.[1] === v.prekazka,
		'i u překážky souhlasí zvýraznění se skutečností');
}

// ———————————————————————— 1) ČÍSLA JSOU CELÁ A SEDÍ S VÝKLADEM
{
	ok(START === 120 && KROK === 10 && PRAH === 10, 'zeď je 120 cm daleko, krok 10 cm, práh 10 cm');
	ok(MAX_DOSAH === 200, 'a senzor bez ozvěny hlásí 200 cm — svůj největší dosah');
	ok(START % KROK === 0, '★ dráha je dělitelná krokem, takže dětem vycházejí celá čísla');
	ok((START - PRAH) / KROK === 11, 'k zastavení na prahu je přesně 11 kroků');
	ok(Object.keys(PREKAZKY).length === 3, 'na výběr jsou tři překážky');
}

// ———————————————————————— 2) ČISTÉ FUNKCE (očekávání spočítaná ručně)
{
	ok(scena.__skutecnaVzdalenost(0) === 120, 'na startu je zeď 120 cm daleko');
	ok(scena.__skutecnaVzdalenost(30) === 90, 'po 30 cm zbývá 90 cm');
	ok(scena.__skutecnaVzdalenost(120) === 0, 'po 120 cm je robot u zdi');
	ok(scena.__skutecnaVzdalenost(200) === 0, 'a dál než ke zdi se nedostane (nejede skrz)');

	ok(scena.__hlaseni(0, 'kolma') === 120, '★ od kolmé zdi hlásí senzor pravdu (120 cm)');
	ok(scena.__hlaseni(90, 'kolma') === 30, 'a mění se, jak robot jede (30 cm)');
	ok(scena.__hlaseni(90, 'sikma') === 200, '★ od šikmé stěny hlásí 200 cm — ozvěna se nevrátí');
	ok(scena.__hlaseni(90, 'zaclona') === 200, '★ a záclona zvuk pohltí, takže taky 200 cm');
	ok(scena.__hlaseni(119, 'sikma') === 200 && scena.__skutecnaVzdalenost(119) === 1,
		'★ i kousek před stěnou senzor pořád tvrdí 200 cm, ačkoli zeď je 1 cm daleko');

	ok(scena.__jedeDal(120) === true && scena.__jedeDal(11) === true, 'nad prahem robot jede');
	ok(scena.__jedeDal(10) === false, 'na prahu už stojí (podmínka je „větší než", ne „aspoň")');
	ok(scena.__jedeDal(0) === false, 'a u zdi taky');
	ok(scena.__dotykSepnul(120) === true, 'dotykový senzor sepne u zdi');
	ok(scena.__dotykSepnul(110) === false, '★ ale ani 10 cm před ní nic nehlásí — pozná až náraz');
}

// ———————————————————————— 3) ★ S OPAKOVÁNÍM ROBOT ZASTAVÍ
{
	nastav(1, 'kolma');
	ok(scena.__stav().ujel === 0, 'na startu robot ještě nejel');
	klik(btn.spust);
	const s = scena.__stav();
	ok(s.ujel === 110, `★ s opakováním ujel 110 cm a zastavil (ujel ${s.ujel})`);
	ok(scena.__skutecnaVzdalenost(s.ujel) === 10, 'a stojí přesně 10 cm před zdí — na prahu');
	ok(s.duvodStani === 'podminka', 'zastavil ho program, ne náraz');
	ok(el('sr-tab-skutecnost').textContent === '10 cm', 'v tabulce je vidět skutečných 10 cm');
	ok(el('sr-tab-hlaseni').textContent === '10 cm', 'a senzor hlásí totéž — od kolmé zdi nelže');
	ok(el('sr-rozhodnuti').textContent === 'stůj', 'program vypsal rozhodnutí „stůj"');

	// Krokování musí dát tentýž výsledek jako spuštění najednou.
	nastav(1, 'kolma');
	for (let i = 0; i < 30; i++) klik(btn.krok);
	ok(scena.__stav().ujel === 110, '★ krok za krokem skončí robot na témž místě jako po spuštění');
}

// ———————————————————————— 4) ★ BEZ OPAKOVÁNÍ JEDE NASLEPO
{
	nastav(0, 'kolma');
	klik(btn.spust);
	const s = scena.__stav();
	ok(s.ujel === 120, `★ bez opakování dojel až do zdi (ujel ${s.ujel} cm)`);
	ok(scena.__skutecnaVzdalenost(s.ujel) === 0, 'skutečná vzdálenost je 0 — narazil');
	ok(s.duvodStani === 'naslepo', 'a důvodem je jízda naslepo, ne rozhodnutí programu');
	ok(el('sr-tab-skutecnost').textContent === '0 cm', 'tabulka ukazuje 0 cm');
	ok(/naslepo|jen jednou/.test(stav()), 'hláška vysvětlí, že se program rozhodl jen jednou');

	// Tentýž program s opakováním nabourat nesmí — v tom je celá pointa.
	nastav(1, 'kolma');
	klik(btn.spust);
	ok(scena.__skutecnaVzdalenost(scena.__stav().ujel) > 0,
		'★ a s opakováním tentýž robot nenabourá — jediný rozdíl je opakování');
}

// ———————————————————————— 5) ★ KDYŽ SENZOR LŽE, NEPOMŮŽE ANI OPAKOVÁNÍ
{
	for (const p of ['sikma', 'zaclona']) {
		nastav(1, p);
		klik(btn.spust);
		const s = scena.__stav();
		ok(s.ujel === 120, `★ ${PREKAZKY[p].nazev}: robot dojel až do překážky, i když měří pořád dokola`);
		ok(el('sr-tab-hlaseni').textContent === '200 cm', 'senzor přitom hlásí 200 cm');
		ok(el('sr-tab-skutecnost').textContent === '0 cm', 'a doopravdy je překážka 0 cm daleko');
		ok(el('sr-tab-hlaseni').textContent !== el('sr-tab-skutecnost').textContent,
			'★ obě čísla se liší — přesně to má dítě uvidět');
	}
}

// ———————————————————————— 6) ★ DOTYKOVÝ SENZOR ZASTAVÍ, ALE AŽ PO NÁRAZU
{
	nastav(1, 'sikma', true);
	klik(btn.spust);
	const s = scena.__stav();
	ok(s.dotyk === true, 'dotykový senzor je zapnutý');
	ok(s.duvodStani === 'dotyk', '★ zastavil ho dotyk, ne ultrazvuk');
	ok(scena.__skutecnaVzdalenost(s.ujel) === 0, 'a stalo se to až u zdi — dotyk pozná až náraz');
	ok(/nárazu|narazil/.test(stav()), 'hláška to říká i slovy');
	ok(/kombin/.test(stav()), 'a vysvětlí, proč se senzory kombinují');

	// U kolmé zdi se dotyk vůbec neuplatní — zastaví dřív ultrazvuk.
	nastav(1, 'kolma', true);
	klik(btn.spust);
	ok(scena.__stav().duvodStani === 'podminka',
		'★ u kolmé zdi zastaví dřív ultrazvuk a dotyk nemá co dělat');
}

// ———————————————————————— 7) SCÉNA: ČTOU SE SKUTEČNĚ VYKRESLENÉ HODNOTY
{
	nastav(1, 'kolma');
	const xNaStartu = Number(el('sr-robot').atributy.x);
	klik(btn.krok);
	const xPoKroku = Number(el('sr-robot').atributy.x);
	ok(xPoKroku > xNaStartu, '★ robot se po kroku opravdu posune doprava, ke zdi');
	ok(Math.abs((xPoKroku - xNaStartu) - 440 / (START / KROK)) < 0.01,
		'a posune se přesně o jeden krok dráhy, ne o náhodný kus');
	klik(btn.spust);
	const xNaKonci = Number(el('sr-robot').atributy.x);
	ok(xNaKonci > xPoKroku && xNaKonci < 480, 'na konci stojí u zdi, ale ne ve zdi');
	ok(el('sr-hlaseni').textContent === el('sr-tab-hlaseni').textContent,
		'číslo v obrázku a v tabulce je totéž — nejsou to dva různé výpočty');
	ok(el('sr-skutecnost').textContent === el('sr-tab-skutecnost').textContent, 'a totéž u skutečné vzdálenosti');

	// Barva paprsku odlišuje „ozvěna se vrátila" od „nevrátila se".
	nastav(1, 'kolma');
	const barvaKolma = el('sr-paprsek').atributy.stroke;
	nastav(1, 'sikma');
	const barvaSikma = el('sr-paprsek').atributy.stroke;
	ok(barvaKolma !== barvaSikma, '★ paprsek vypadá jinak, když se ozvěna nevrátí');
	klik(btn.reset);
	ok(el('sr-ujel').textContent === '0 cm', 'tlačítko ↺ vrátí robota na start');
	ok(scena.__stav().stoji === false, 'a program zase může jet');

	// Nálezy mutačního testu: vizuální části scény, které nikdo neměřil.
	nastav(1, 'kolma');
	const x0 = Number(el('sr-robot').atributy.x);
	const sirka = Number(sablona.match(/id="sr-robot"[^>]*\swidth="(\d+)"/)?.[1] ?? 0);
	ok(x0 === 40, 'na startu stojí robot u levého okraje scény (x = 40)');
	ok(sirka === 80, `robot je v šabloně 80 jednotek široký (naměřeno ${sirka})`);
	const oko = Number(el('sr-oko').atributy.cx);
	ok(oko > x0 && oko <= x0 + sirka, `★ senzor (oko) je na PŘEDNÍ straně robota, ne za ním (oko ${oko}, robot ${x0}–${x0 + sirka})`);
	ok(Number(el('sr-paprsek').atributy.x1) >= x0 + sirka,
		'★ a paprsek vychází z předku robota směrem ke zdi, ne dozadu');
	klik(btn.spust);
	const xKonec = Number(el('sr-robot').atributy.x);
	const xZdi = Number(sablona.match(/id="sr-zed"[^>]*x="(\d+)"/)?.[1] ?? 0);
	ok(xKonec + sirka <= xZdi, '★ ani na konci robot do zdi nevjede — obrázek zůstane logický');

	// Barvy nesou informaci: náraz × jízda, záclona × zeď.
	const slozky = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
	const cervenost = (h) => slozky(h)[0] - slozky(h)[1];      // čím víc červené proti zelené
	const sedost = (h) => { const [r, g, b] = slozky(h); return Math.max(r, g, b) - Math.min(r, g, b); };
	nastav(1, 'kolma');
	const barvaJede = el('sr-robot').atributy.fill;
	nastav(0, 'kolma');
	klik(btn.spust);
	const barvaNaraz = el('sr-robot').atributy.fill;
	ok(scena.__skutecnaVzdalenost(scena.__stav().ujel) === 0 && barvaNaraz !== barvaJede,
		'★ po nárazu je robot vidět jinou barvou než při jízdě');
	ok(cervenost(barvaNaraz) > cervenost(barvaJede),
		`★ a je to barva ČERVENĚJŠÍ (${barvaNaraz}), ne náhodná jiná — náraz má vypadat jako poplach`);
	// Zeď je šedá, záclona je látka: tvrdé překážky vypadají stejně, měkká jinak.
	nastav(1, 'kolma');
	const barvaKolme = el('sr-zed').atributy.fill;
	nastav(1, 'sikma');
	const barvaSikme = el('sr-zed').atributy.fill;
	nastav(1, 'zaclona');
	const barvaZaclony = el('sr-zed').atributy.fill;
	ok(barvaKolme === barvaSikme, 'obě tvrdé překážky vypadají stejně — obojí je zeď');
	ok(barvaZaclony !== barvaKolme, '★ záclona vypadá jinak — je z jiného materiálu');
	ok(sedost(barvaKolme) < 20 && sedost(barvaZaclony) > 20,
		`★ a je to tak, jak dítě čeká: zeď šedá (${barvaKolme}), látka barevná (${barvaZaclony})`);

}

// ———————————————————————— 8) ★ TEXTY MUSÍ ŘÍKAT TOTÉŽ CO KÓD
{
	// a) Čísla v hlášce jsou jen ta, která na obrazovce opravdu jsou.
	let cizich = 0, stavuOvereno = 0;
	for (const [op, p, d] of [[1, 'kolma', false], [0, 'kolma', false], [1, 'sikma', false],
		[1, 'zaclona', true], [1, 'sikma', true], [0, 'zaclona', false]]) {
		nastav(op, p, d);
		for (const faze of [0, 1, 2]) {
			if (faze === 1) klik(btn.krok);
			if (faze === 2) klik(btn.spust);
			stavuOvereno++;
			const u = scena.__stav().ujel;
			const platna = new Set([START, KROK, PRAH, MAX_DOSAH, u, scena.__skutecnaVzdalenost(u),
				scena.__hlaseni(u, p)].map((x) => scena.__cz(x)));
			for (const c of stav().match(/\d+(?:,\d+)?/g) ?? []) if (!platna.has(c)) cizich++;
		}
	}
	ok(cizich === 0, `★ každé číslo v hlášce je hodnota, která na obrazovce opravdu je (${stavuOvereno} stavů)`);
	ok(stavuOvereno >= 15, 'a stavů se prošlo dost, aby to něco znamenalo');

	// b) Popisky tlačítek souhlasí s tím, co tlačítka udělají.
	const tlacitka = [...sablona.matchAll(/<button[^>]*data-opakovat="(\d)"[^>]*>([^<]*)</g)]
		.map((m) => ({ opakovat: m[1], text: m[2].trim() }));
	ok(tlacitka.length === 2, 'přepínač programu má dvě tlačítka');
	for (const t of tlacitka) {
		nastav(Number(t.opakovat), 'kolma');
		klik(btn.spust);
		const zastavilSam = scena.__stav().duvodStani === 'podminka';
		ok(zastavilSam === /opakuj/.test(t.text),
			`★ „${t.text}" opravdu dělá to, co slibuje (robot ${zastavilSam ? 'zastavil' : 'naboural'})`);
	}

	// c) Popisky překážek souhlasí s tím, jestli se ozvěna vrátí.
	const tlPrekazek = [...sablona.matchAll(/<button[^>]*data-prekazka="(\w+)"[^>]*>([^<]*)</g)]
		.map((m) => ({ klic: m[1], text: m[2].trim() }));
	ok(tlPrekazek.length === 3, 'na výběr jsou tři překážky i v šabloně');
	for (const t of tlPrekazek) {
		ok(t.text === PREKAZKY[t.klic].nazev, `tlačítko „${t.text}" je pojmenované stejně jako v kódu`);
		nastav(1, t.klic);
		const lze = el('sr-tab-hlaseni').textContent !== el('sr-tab-skutecnost').textContent;
		ok(lze === !PREKAZKY[t.klic].ozvenaSeVrati,
			`★ u „${t.text}" senzor ${lze ? 'lže' : 'říká pravdu'} — a poznámka to vysvětluje`);
		ok(el('sr-pozn-hlaseni').textContent === PREKAZKY[t.klic].proc, 'poznámka u hlášení sedí s překážkou');
	}

	// d) Nadpis i úvod slibují to, co simulace ukazuje.
	const nadpis = cistyText(sablona.match(/<h2>([\s\S]*?)<\/h2>/)?.[1] ?? '').toLowerCase();
	ok(/zastav|nabour|naráz/.test(nadpis), `★ nadpis slibuje právě to, co se dá vyzkoušet („${nadpis}")`);
	const uvod = cistyText(sablona.match(/<\/h2>\s*<p>([\s\S]*?)<\/p>/)?.[1] ?? '');
	ok(/hlásí/.test(uvod) && /doopravdy|skutečn/.test(uvod),
		'★ úvod posílá dítě porovnávat hlášení se skutečností — to je celá pointa');

	// e) Věty, které jsou doloženým opakem toho, co kód dělá.
	const zakazane = [
		[/senzor (vždy )?(hlásí|měří) (vždy )?pravdu/i, 'ultrazvuk u šikmé stěny lže', scena.__hlaseni(119, 'sikma') === 200],
		[/dotyk(ový senzor)? (pozná|hlásí) překážku (včas|předem|dřív)/i, 'dotyk pozná až náraz', scena.__dotykSepnul(110) === false],
		[/stačí (změřit|měřit) jednou/i, 'bez opakování robot nabourá', true],
	];
	for (const [op, p] of [[1, 'kolma'], [0, 'sikma'], [1, 'zaclona']]) {
		nastav(op, p);
		klik(btn.spust);
		for (const [vzor, proc, doklad] of zakazane) {
			if (!doklad) { ok(false, `doklad k „${proc}" neplatí — kontrola by nic neznamenala`); continue; }
			if (vzor.test(cistyText(sablona) + ' ' + stav())) ok(false, `★ na stránce stojí nepravda: ${proc}`);
		}
	}
	ok(true, `★ žádná ze ${zakazane.length} zakázaných vět na stránce není`);
}

// ———————————————————————— 9) ŠABLONA A PŘÍSTUPNOST
{
	for (const id of ID_SABLONY) ok(sablona.includes(`id="${id}"`), `šablona obsahuje prvek #${id}`);
	ok(vyrobene.size === 0, `skript nesáhl na žádný prvek mimo šablonu${vyrobene.size ? ': ' + [...vyrobene].join(', ') : ''}`);
	const bezScope = sablona.match(/<th(?=[\s>])(?![^>]*scope=)[^>]*>/g) ?? [];
	ok(bezScope.length === 0, `každé záhlaví má scope${bezScope.length ? ' — chybí u ' + bezScope.join(' ') : ''}`);
	ok(/<caption/.test(sablona), 'tabulka má titulek, aby ji odečítač uměl uvést');
	ok(/aria-live="polite"/.test(sablona), 'stavová hláška je označená jako živá');
	ok((sablona.match(/aria-pressed="(true|false)"/g) ?? []).length === 6, 'všech šest přepínačů hlásí odečítači stav');
	const stisknute = [...sablona.matchAll(/<button[^>]*class="([^"]*)"[^>]*aria-pressed="(true|false)"/g)];
	for (const t of stisknute)
		ok(t[1].includes('sr-aktivni') === (t[2] === 'true'),
			'★ stisknuté podle odečítače je totéž tlačítko, které je zvýrazněné pro oko');
	ok(/<title id="sr-popis">/.test(sablona) && /aria-labelledby="sr-popis"/.test(sablona),
		'obrázek má popis pro odečítač');
	// Robot musí odečítači hlásit, kde je — samotný obrázek mu nic neřekne.
	nastav(1, 'kolma');
	klik(btn.krok);
	const label = el('sr-robot').atributy['aria-label'] ?? '';
	ok(label === `robot ujel ${scena.__cz(scena.__stav().ujel)} cm, zeď je ${scena.__cz(scena.__skutecnaVzdalenost(scena.__stav().ujel))} cm daleko`,
		`★ a hlásí skutečné hodnoty („${label}")`);

	// Kontrast čar a šrafů: na promítačce mizí bledá grafika jako první.
	const sytost = (h) => {
		const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
			.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
		return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
	};
	const kontrast = (b) => 1.05 / (sytost(b) + 0.05);
	const cary = [...new Set([...zdroj.matchAll(/border[^;:]*:\s*\d+px\s+solid\s+(#[0-9a-f]{6})/gi)].map((m) => m[1]))];
	const bledé = cary.filter((b) => kontrast(b) < 3);
	ok(cary.length >= 1 && bledé.length === 0,
		`★ každá čára má proti bílé aspoň 3 : 1${bledé.length ? ' — bledé: ' + bledé.join(', ') : ''}`);
}

console.log(chyby === 0 ? `\n✅ Senzory robota: všech ${kontrol} kontrol prošlo.` : `\n❌ ${chyby} z ${kontrol} kontrol selhalo.`);
process.exit(chyby === 0 ? 0 : 1);
