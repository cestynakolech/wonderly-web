#!/usr/bin/env node
// Ověření BludisteSimulace.astro — hra Bludiště, detekce a řešení kolize (informatika 7).
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm), žádný prohlížeč.
//
// Hlídané pointy (výklad je jmenuje jako „chyby, které dělá skoro každý"):
//  ★ velký krok + tenká zeď = postava PROJEDE zdí,
//  ★ obě rady z výkladu opravdu pomáhají (menší krok NEBO silnější zeď),
//  ★ návrat schovaný v ⟨opakuj stále⟩ nechá postavu UVÍZNOUT ve zdi,
//  ★ a fáze mřížky kroku zůstane celá i po nárazu do okraje scény — na tom celá
//    pointa stojí (ořez na okraji ji dřív posunul a zdí pak nešlo projet vůbec).
//
// Co si tenhle test odnesl z nálezů nezávislých kontrolorů:
//  – čte i HTML ŠABLONU (atrapa DOMu chybějící prvek tiše vyrobí),
//  – čte SKUTEČNÉ atributy nakreslených prvků, ne jen čisté funkce,
//  – názvy bloků kontroluje po VARIANTÁCH programu zvlášť (ve spojeném textu stačilo,
//    aby správný název byl v té druhé variantě, a podvrh prošel),
//  – ověřuje čísla v hláškách proti nastaveným volbám (hláška uměla tvrdit „krok 5 px
//    je delší než zeď 40 px"),
//  – a ověřuje, že hláška o nárazu neříká něco jiného, než co se opravdu stalo.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.split('<script>')[0];

const prvky = new Map();
const vyrobene = new Set();
const novy = (id, vTemplatu = false) => {
	const p = {
		id, atributy: {}, innerHTML: '', style: {}, dataset: {}, posluchaci: {}, deti: [],
		_text: '',
		get textContent() { return this._text; },
		set textContent(v) { this._text = String(v); if (v === '') this.deti = []; },
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

const smery = ['nahoru', 'dolu', 'vlevo', 'vpravo'].map((s) => tl({ smer: s }, 'smer-' + s));
const volbyEl = [
	tl({ volba: 'krok', hodnota: '5' }, 'v-krok-5'),
	tl({ volba: 'krok', hodnota: '30' }, 'v-krok-30'),
	tl({ volba: 'tl', hodnota: '10' }, 'v-tl-10'),
	tl({ volba: 'tl', hodnota: '40' }, 'v-tl-40'),
	tl({ volba: 'navrat', hodnota: 'hned' }, 'v-navrat-hned'),
	tl({ volba: 'navrat', hodnota: 'zvlast' }, 'v-navrat-zvlast'),
];
function querySelectorAll(s) {
	if (s === '.bl-smer') return smery;
	if (s === '.bl-volba') return volbyEl;
	const m = s.match(/^\.bl-volba\[data-volba="([a-z]+)"\]$/);
	if (m) return volbyEl.filter((v) => v.dataset.volba === m[1]);
	return [];
}
const ID_SABLONY = ['bl-svg', 'bl-zdi', 'bl-cil', 'bl-hrac', 'bl-znacka', 'bl-program', 'bl-stav', 'bl-projeti', 'bl-reset'];
for (const id of ID_SABLONY) novy(id, true);

const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll,
	createElement: () => novy('e' + Math.random(), true),
	createElementNS: () => novy('e' + Math.random(), true),
};
const sandbox = { document, console, Array, Math, String, Object, Number };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('bl-svg');
const zdiEl = prvky.get('bl-zdi');
const cilEl = prvky.get('bl-cil');
const hracEl = prvky.get('bl-hrac');
const znackaEl = prvky.get('bl-znacka');
const stavEl = prvky.get('bl-stav');
const programEl = prvky.get('bl-program');
const projetiEl = prvky.get('bl-projeti');
const btnReset = prvky.get('bl-reset');

let chyby = 0;
let kontrol = 0;
const ok = (p, t) => { kontrol++; console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (el) => (el.posluchaci.click || []).forEach((f) => f());

const { SCENA, R, START, CIL, ZDI, SMERY } = svg.__meze;
const MALY = 5, VELKY = 30, TENKA = 10, TLUSTA = 40;
const V = (krok, tloustka, navrat = 'hned') => ({ krok, tl: tloustka, navrat });

/** Projde všechny dosažitelné pozice a vrátí, co se cestou stalo. Čistá procházka. */
function projdi(volby) {
	const klic = (s) => `${s.x},${s.y}`;
	const start = svg.__cistyStav();
	const videne = new Map([[klic(start), start]]);
	const fronta = [start];
	let projeti = 0, veZdi = 0, vCili = false, mimoScenu = 0;
	while (fronta.length) {
		const s = fronta.shift();
		if (svg.__jeVCili(s)) vCili = true;
		if (!svg.__veScene(s.x, s.y)) mimoScenu++;
		for (const smer of Object.keys(SMERY)) {
			const n = svg.__krok(s, smer, volby);
			if (n.projel) projeti++;
			if (svg.__kolize(n.x, n.y, volby.tl)) veZdi++;
			if (!videne.has(klic(n))) { videne.set(klic(n), n); fronta.push(n); }
		}
	}
	return { projeti, veZdi, vCili, mimoScenu, pozic: videne.size, pozice: [...videne.values()] };
}

// ———————————————————————— 1) MAPA: bludiště dává smysl
{
	ok(ZDI.length >= 3, `bludiště má aspoň tři zdi (má ${ZDI.length})`);
	for (const t of [TENKA, TLUSTA]) {
		ok(!svg.__kolize(START.x, START.y, t), `postava nezačíná ve zdi (zeď ${t} px)`);
		ok(!svg.__kolize(CIL.x, CIL.y, t), `cíl neleží ve zdi (zeď ${t} px)`);
	}
	ok(!svg.__jeVCili(svg.__cistyStav()), 'na startu ještě není vyhráno');
	const uvnitr = (z) => z.x - TLUSTA / 2 > SCENA.x0 && z.x + TLUSTA / 2 < SCENA.x1
		&& z.y1 >= SCENA.y0 && z.y2 <= SCENA.y1;
	ok(ZDI.every(uvnitr), 'všechny zdi leží uvnitř scény i v tlusté variantě');
	const mezery = ZDI.slice(1).map((z, i) => z.x - ZDI[i].x - TLUSTA);
	ok(mezery.every((m) => m > 2 * R + 10), `chodby mezi zdmi jsou průchodné (nejužší ${Math.min(...mezery)} px)`);

	// Popis pro odečítač i nápověda tvrdí, že cíl je vpravo dole — musí to být pravda.
	ok(CIL.x > (SCENA.x0 + SCENA.x1) / 2 && CIL.y > (SCENA.y0 + SCENA.y1) / 2,
		'cíl opravdu leží vpravo dole, jak říká popis pro odečítač');
	ok(START.x < (SCENA.x0 + SCENA.x1) / 2 && START.y < (SCENA.y0 + SCENA.y1) / 2,
		'a start vlevo nahoře');
}

// ———————————————————————— 2) OKRAJ SCÉNY: fáze mřížky se nesmí posunout
// Nález nezávislého kontrolora: ořez na okraji posunul postavu mimo mřížku velkého kroku
// a osy zdí pak nebyly uprostřed mezi zastávkami — jediný stisk ← nadobro vypnul pointu
// stránky, přičemž hra dál vypadala, že funguje.
{
	const vlevoNahore = svg.__krok(svg.__cistyStav(), 'vlevo', V(VELKY, TENKA));
	ok(vlevoNahore.x === START.x && vlevoNahore.y === START.y,
		'★ krok, který by vedl za okraj scény, se neprovede vůbec (nic se neořezává)');
	ok(vlevoNahore.mimo === true, 'a je poznat, že to bylo o okraj, ne o zeď');

	const na = (p) => (p.x - START.x) % VELKY === 0 && (p.y - START.y) % VELKY === 0;
	ok(projdi(V(VELKY, TENKA)).pozice.every(na), '★ všechny dosažitelné pozice zůstanou na mřížce velkého kroku');
	ok(projdi(V(MALY, TENKA)).pozice.every((p) => (p.x - START.x) % MALY === 0 && (p.y - START.y) % MALY === 0),
		'totéž platí pro malý krok');
	ok(projdi(V(MALY, TENKA)).mimoScenu === 0, 'postava se nikdy nedostane za okraj scény (popisek scény nelže)');

	// Regrese přímo k nálezu: po nárazu do okraje musí jít zdí pořád projet.
	let s = svg.__cistyStav();
	s = svg.__krok(s, 'vlevo', V(VELKY, TENKA));       // náraz do levého okraje
	let projela = false;
	for (let i = 0; i < 6; i++) {
		s = svg.__krok(s, 'vpravo', V(VELKY, TENKA));
		if (s.projel) projela = true;
	}
	ok(projela, '★ i po nárazu do okraje jde zdí dál projet — pointa přežije');
}

// ———————————————————————— 3) BLUDIŠTĚ JDE POCTIVĚ PROJÍT
{
	const maleTenke = projdi(V(MALY, TENKA));
	ok(maleTenke.vCili, '★ malým krokem se dá dojít až do cíle');
	ok(maleTenke.projeti === 0, '★ a při malém kroku se ANI JEDNOU neprojede zdí');
	ok(maleTenke.veZdi === 0, 'se správným návratem postava nikdy nestojí ve zdi');
	ok(maleTenke.pozic > 200, `postava se pohybuje po celé scéně (${maleTenke.pozic} pozic)`);

	const maleTluste = projdi(V(MALY, TLUSTA));
	ok(maleTluste.vCili, 'i se silnými zdmi je bludiště průchodné (chodby jsou dost široké)');
	ok(maleTluste.projeti === 0, 'a ani tam se zdí neprojede');
	ok(maleTluste.pozic < maleTenke.pozic, 'silnější zdi ubírají prostor — zdi tedy opravdu překážejí');
}

// ———————————————————————— 4) CHYBA Č. 1: postava projede zdí
{
	let s = svg.__cistyStav();
	let projela = false;
	for (let i = 0; i < 6; i++) {
		s = svg.__krok(s, 'vpravo', V(VELKY, TENKA));
		if (s.projel) projela = true;
	}
	ok(projela, '★ krok 30 px přeskočí tenkou zeď 10 px — postava PROJEDE zdí');
	ok(!svg.__kolize(s.x, s.y, TENKA), 'a skončí za zdí, kde blok žádnou barvu nenajde');
	ok(s.x > ZDI[0].x, 'je opravdu na druhé straně první zdi');

	ok(projdi(V(MALY, TENKA)).projeti === 0, '★ rada „zmenši krok" pomáhá: 0 projetí zdí');
	ok(projdi(V(VELKY, TLUSTA)).projeti === 0, '★ rada „zesil zdi" pomáhá taky: 0 projetí zdí');
	ok(projdi(V(VELKY, TENKA)).projeti > 0, 'a jen při velkém kroku na tenké zdi se zdí projíždí');

	// Skutečná podmínka projetí je krok > zeď + průměr postavy, ne jen krok > zeď.
	ok(VELKY > TENKA + 2 * R, `velký krok (${VELKY}) přesáhne tenkou zeď i s šířkou postavy (${TENKA + 2 * R})`);
	ok(VELKY < TLUSTA + 2 * R, `ale na silnou zeď (${TLUSTA + 2 * R}) nestačí — obě varianty mají smysl`);
}

// ———————————————————————— 5) CHYBY Č. 2 A 3: návrat, který nezná směr
{
	let s = svg.__cistyStav();
	for (let i = 0; i < 30; i++) {
		const n = svg.__krok(s, 'vpravo', V(MALY, TENKA));
		if (n.x === s.x) break;                    // dál to nejde, stojíme u zdi
		s = n;
	}
	ok(s.x < ZDI[0].x, 'postava se malým krokem zastaví PŘED zdí, nedostane se za ni');

	const spravne = svg.__krok(s, 'vpravo', V(MALY, TENKA, 'hned'));
	ok(spravne.x === s.x && spravne.y === s.y, '★ návrat hned pod pohybem vrátí přesně ten krok, který náraz způsobil');
	ok(spravne.naraz === true && spravne.vezdi === false, 'a postava zůstane venku ze zdi');

	const spatne = svg.__krok(s, 'vpravo', V(MALY, TENKA, 'zvlast'));
	ok(spatne.vezdi === true, '★ návrat zvlášť v ⟨opakuj stále⟩ nechá postavu UVÍZNOUT ve zdi');
	ok(spatne.x !== s.x, 'protože posun v ose x se nevzal zpět (program o něm neví)');
	ok(spatne.y > s.y, 'a program místo toho poslal postavu dolů — vždycky stejným směrem');
	ok(svg.__kolize(spatne.x, spatne.y, TENKA), 'kontrola barvy by na téhle pozici hlásila zeď');

	ok(projdi(V(MALY, TENKA, 'zvlast')).veZdi > 0, 'se špatným návratem se ve zdi končí opakovaně');
	ok(projdi(V(MALY, TENKA, 'hned')).veZdi === 0, 'se správným návratem ani jednou');
}

// ———————————————————————— 6) SCÉNA: čtou se SKUTEČNÉ nakreslené prvky
{
	klik(btnReset);
	ok(zdiEl.deti.length === ZDI.length, `na scéně jsou nakreslené všechny zdi (${zdiEl.deti.length})`);
	ok(zdiEl.deti.every((r) => Number(r.atributy.width) === TENKA), 'a mají šířku podle zvolené tloušťky (tenká)');
	ok(zdiEl.deti.every((r) => r.atributy.fill === '#212529'), 'zdi jsou černé — právě tu barvu blok hledá');
	ok(Number(hracEl.atributy.cx) === START.x && Number(hracEl.atributy.cy) === START.y,
		'postava je nakreslená na startu (čtou se atributy, ne jen vnitřní stav)');
	ok(cilEl.deti.some((d) => d.textContent === '🏁'), 'u cíle je opravdu nakreslená vlajka');

	klik(prvky.get('v-tl-40'));
	ok(zdiEl.deti.every((r) => Number(r.atributy.width) === TLUSTA), '★ přepínač tloušťky opravdu překreslí zdi na scéně');
	ok(!svg.__kolize(svg.__stav().x, svg.__stav().y, 40), '★ po zesílení zdi postava nikdy nezůstane stát uvnitř zdi');
	ok(/začíná znovu|na startu/.test(stavEl.innerHTML), 'a hláška žákovi řekne, proč se postava vrátila na start');
	klik(prvky.get('v-tl-10'));
	ok(zdiEl.deti.every((r) => Number(r.atributy.width) === TENKA), 'a zpátky na tenké — cesta tam i zpět');

	// Postava ve zdi musí být poznat i na scéně, ne jen v textu — a kreslí se přes ČERNOU zeď.
	klik(prvky.get('v-navrat-zvlast'));
	for (let i = 0; i < 40 && !svg.__stav().vezdi; i++) klik(prvky.get('smer-vpravo'));
	ok(svg.__stav().vezdi === true, 'přes ovládací tlačítka se postava se špatným návratem opravdu dostane do zdi');
	ok(hracEl.atributy.fill === '#ff8787' && hracEl.atributy.stroke === '#ffffff',
		'★ postava ve zdi má světlou výplň a bílý obrys — na černé zdi je vidět');
	ok(znackaEl.textContent === '✗', '★ a je označená ✗, takže stav nepozná jen podle barvy i barvoslepý žák');
	ok(/uvízla ve zdi/.test(stavEl.innerHTML), 'hláška to říká i slovy');
	klik(prvky.get('v-navrat-hned'));
	ok(znackaEl.textContent === '', 'po návratu na start značka zmizí');
}

// ———————————————————————— 7) OVLÁDÁNÍ: cesta přes tlačítka a klávesy
{
	klik(btnReset);
	ok(svg.__stav().x === START.x && svg.__stav().y === START.y, 'tlačítko ↺ vrátí postavu na start');
	ok(projetiEl.textContent === '0', 'a vynuluje počítadlo projetí zdí');

	klik(prvky.get('smer-dolu'));
	ok(svg.__stav().y === START.y + MALY, 'tlačítko ↓ posune postavu o zvolený krok dolů');
	klik(prvky.get('smer-nahoru'));
	ok(svg.__stav().y === START.y, 'a ↑ ji vrátí — každý směr má cestu tam i zpět');
	klik(prvky.get('smer-vpravo'));
	ok(svg.__stav().x === START.x + MALY, '→ posune doprava');
	klik(prvky.get('smer-vlevo'));
	ok(svg.__stav().x === START.x, 'a ← doleva — směry nejsou prohozené');

	// Šipky na klávesnici musí dělat totéž co tlačítka a nesmí rolovat stránkou.
	let zabraneno = 0;
	const stisk = (key) => (svg.posluchaci.keydown || []).forEach((f) => f({ key, preventDefault() { zabraneno++; } }));
	stisk('ArrowRight');
	ok(svg.__stav().x === START.x + MALY, 'šipka na klávesnici funguje stejně jako tlačítko');
	ok(zabraneno === 1, '★ a simulace potlačí výchozí chování, jinak by šipky rolovaly stránkou');
	stisk('ArrowDown');
	ok(svg.__stav().y === START.y + MALY, 'šipka dolů posune dolů, ne jinam');
	stisk('Tab');
	ok(svg.__stav().x === START.x + MALY && zabraneno === 2,
		'jiná klávesa scénou nehne a nechá si ji stránka (simulace nebere klávesnici celé stránce)');
	klik(btnReset);

	// Počítadlo projetí zdí musí růst jen tehdy, když se opravdu projelo.
	klik(prvky.get('v-krok-30'));
	for (let i = 0; i < 8 && Number(projetiEl.textContent) === 0; i++) klik(prvky.get('smer-vpravo'));
	ok(Number(projetiEl.textContent) > 0, '★ počítadlo projetí zdí se žákovi opravdu ukáže');
	ok(/projela zdí/i.test(stavEl.innerHTML), 'a hláška projetí rovnou pojmenuje');
	klik(prvky.get('smer-dolu'));
	ok(/projel zdí/i.test(stavEl.innerHTML), '★ důkaz o projetí nezmizí hned dalším krokem');
	klik(btnReset);
	ok(Number(projetiEl.textContent) === 0, 'po resetu je počítadlo zase na nule');
	ok(!/projel zdí/i.test(stavEl.innerHTML), 'a hláška se s ním vrátí do klidového stavu');
	klik(prvky.get('v-krok-5'));
}

// ———————————————————————— 8) HLÁŠKY NESMÍ LHÁT PROTI TOMU, CO JE VIDĚT
// Oba případy našel nezávislý kontrolor: hláška brala čísla i směr z AKTUÁLNÍCH voleb,
// ne z toho, co se opravdu stalo, takže po přepnutí tvrdila nesmysl („krok 5 px je delší
// než zeď 40 px") nebo popisovala pohyb, ke kterému nedošlo.
{
	klik(btnReset);
	klik(prvky.get('v-krok-30'));
	for (let i = 0; i < 8 && !/projela zdí/i.test(stavEl.innerHTML); i++) klik(prvky.get('smer-vpravo'));
	const cisla = stavEl.innerHTML.match(/(\d+) px/g) ?? [];
	ok(cisla.includes(`${VELKY} px`) && cisla.includes(`${TENKA} px`),
		'★ poplašná hláška uvádí čísla, která jsou opravdu nastavená');
	klik(prvky.get('v-krok-5'));
	ok(!/projela zdí/i.test(stavEl.innerHTML), '★ po přepnutí programu hláška o projetí zmizí (jinak by lhala čísly)');

	klik(btnReset);
	for (let i = 0; i < 40 && !svg.__stav().naraz; i++) klik(prvky.get('smer-vpravo'));
	ok(/hned pod pohybem/.test(stavEl.innerHTML), 'po nárazu se správným návratem to hláška tak i popíše');
	const kde = { x: svg.__stav().x, y: svg.__stav().y };
	klik(prvky.get('v-navrat-zvlast'));
	ok(!/poslal dolů|uvízla/.test(stavEl.innerHTML),
		'★ pouhé přepnutí přepínače netvrdí pohyb, ke kterému nedošlo');
	ok(svg.__stav().x === START.x && svg.__stav().y === START.y && kde.x !== START.x,
		'a přepnutí programu vrátí postavu na start, místo aby jela od rozdělané pozice');
	klik(prvky.get('v-navrat-hned'));
}

// ———————————————————————— 9) PROGRAM NA OBRAZOVCE
{
	klik(btnReset);
	klik(prvky.get('v-krok-5'));
	const hned = svg.__programRadky().map((r) => r.text);
	ok(hned.some((t) => t.includes('změň x o 5')), 'program ukazuje krok, který je opravdu nastavený');
	ok(hned.some((t) => t.includes('změň x o −5')), 'a návrat je opačný o tutéž hodnotu');

	klik(prvky.get('v-krok-30'));
	const velky = svg.__programRadky().map((r) => r.text);
	ok(velky.some((t) => t.includes('změň x o 30')) && !velky.some((t) => t.includes('změň x o 5')),
		'★ po přepnutí kroku se změní i číslo v programu — stránka si neprotiřečí');
	ok(programEl.deti.length === velky.length, 'program se opravdu vypíše na stránku (ne jen do funkce)');
	klik(prvky.get('v-krok-5'));

	klik(prvky.get('v-navrat-zvlast'));
	const zvlast = svg.__programRadky().map((r) => r.text);
	ok(zvlast.some((t) => t.includes('opakuj stále')), 'chybná verze má návrat uvnitř ⟨opakuj stále⟩');
	ok(zvlast.some((t) => t.includes('změň y o −5')), 'a vrací pořád stejným směrem');
	ok(zvlast.some((t) => /běží ve Scratchi pořád/.test(t)),
		'a je řečeno, že ⟨opakuj stále⟩ ve Scratchi běží pořád — tady se ukazuje jeden průchod');
	ok(!hned.some((t) => t.includes('opakuj stále')), 'správná verze žádné ⟨opakuj stále⟩ nepotřebuje');
	ok(svg.__programRadky().some((r) => r.chyba), 'chybný řádek je v programu označený');
	klik(prvky.get('v-navrat-hned'));
	ok(svg.__programRadky().some((r) => r.dobre), 'a ve správné verzi je označený ten správný');

	// Šachovnicová vlajka patří CÍLI, klobouk programu má zelenou — jinak by týž znak
	// na jedné obrazovce znamenal dvě různé věci (nález kontrolora).
	ok(zvlast.some((t) => t.includes('po kliknutí na zelenou vlajku')), 'klobouk programu mluví o ZELENÉ vlajce');
	ok(![...hned, ...zvlast].some((t) => t.includes('🏁')), 'a šachovnicovou vlajku si s ním program neplete');

	// Názvy bloků se ověřují v KAŽDÉ variantě zvlášť. Ve spojeném textu stačilo, aby byl
	// správný název v té druhé variantě, a podvrh prošel (nález kontrolora).
	const { ZAKAZANE } = await import('../nazvy-bloku.mjs');
	const sedi = (v, t) => (v instanceof RegExp ? v.test(t) : t.includes(v));
	for (const [jmeno, radky] of [['hned', hned], ['zvlast', zvlast], ['velký krok', velky]]) {
		const t = radky.join(' \n ').toLowerCase();
		ok(t.includes('po stisku klávesy'), `varianta „${jmeno}": klobouk klávesy má název z české palety`);
		ok(t.includes('když ⟨dotýkáš se barvy (černá)?⟩ tak'),
			`varianta „${jmeno}": podmínka má tvar z palety a ptá se na ČERNOU (barvu skutečných zdí)`);
		const spatne = ZAKAZANE.filter((z) => sedi(z.vzor, t));
		ok(spatne.length === 0, `varianta „${jmeno}": žádný název neodporuje paletě${spatne.length ? ': ' + spatne.map((z) => z.spravne).join(', ') : ''}`);
	}
}

// ———————————————————————— 10) ŠABLONA A PŘÍSTUPNOST
// Atrapa DOMu chybějící prvek tiše vyrobí, takže bez téhle kontroly by komponenta
// se smazanou scénou prošla jako zdravá (nález nezávislého kontrolora).
{
	for (const id of ID_SABLONY) ok(html.includes(`id="${id}"`), `šablona opravdu obsahuje prvek #${id}`);
	ok(vyrobene.size === 0, `skript nesáhl na žádný prvek mimo šablonu${vyrobene.size ? ': ' + [...vyrobene].join(', ') : ''}`);
	for (const s of ['nahoru', 'dolu', 'vlevo', 'vpravo']) {
		ok(html.includes(`data-smer="${s}"`), `šablona má tlačítko pro směr ${s}`);
	}
	for (const [v, h] of [['krok', '5'], ['krok', '30'], ['tl', '10'], ['tl', '40'], ['navrat', 'hned'], ['navrat', 'zvlast']]) {
		ok(new RegExp(`data-volba="${v}"[^>]*data-hodnota="${h}"`).test(html), `šablona má přepínač ${v} = ${h}`);
	}
	// Všechna čtyři šipková tlačítka, ne jen první (test dřív hlídal jen „šipka nahoru").
	for (const p of ['šipka nahoru', 'šipka dolů', 'šipka vlevo', 'šipka vpravo']) {
		ok(html.includes(`aria-label="${p}"`), `tlačítko „${p}" má popis pro odečítač`);
	}
	ok((html.match(/aria-pressed="(true|false)"/g) ?? []).length === 6,
		'★ všech šest přepínačů hlásí odečítači, jestli je zvolené');
	ok((html.match(/aria-pressed="true"/g) ?? []).length === 3, 'a v každé ze tří skupin je zvolený právě jeden');
	ok(/aria-live="polite"/.test(html), 'stavová hláška je pro odečítač označená jako živá');
	ok(/tabindex="0"/.test(html), 'scéna jde vybrat klávesnicí, jinak by šipky nefungovaly');
	ok(/<svg[^>]*role="group"/.test(html), 'ovládaná scéna není odečítači vydávaná za statický obrázek');
	ok(/<svg[^>]*aria-label="[^"]{20,}"/.test(html), 'a má popis, který říká, co se v ní děje a jak se ovládá');
}

console.log(chyby === 0 ? `\n✅ Bludiště: všech ${kontrol} kontrol prošlo.` : `\n❌ ${chyby} z ${kontrol} kontrol selhalo.`);
process.exit(chyby === 0 ? 0 : 1);
