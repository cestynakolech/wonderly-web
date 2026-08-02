#!/usr/bin/env node
// Ověření OpakovaniSimulace.astro — „opakuj dokud" × „opakuj 10krát" × „opakuj stále".
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novy = (id) => {
	const p = {
		id, atributy: {}, innerHTML: '', style: {}, dataset: {}, posluchaci: {}, deti: [],
		// POZOR: `textContent = ''` musí v atrapě vymazat i DĚTI, jinak se vypsané řádky
		// programu při každém překreslení hromadí a kontrola „zvýrazněn je právě jeden
		// řádek" začne selhávat podle toho, kolikrát se předtím kliklo. (Vada atrapy,
		// ne komponenty — objevila se, jakmile test začal víc klikat.)
		_text: '',
		get textContent() { return this._text; },
		set textContent(v) { this._text = String(v); if (v === '') this.deti = []; },
		classList: { tridy: new Set(), add(t) { this.tridy.add(t); }, remove(t) { this.tridy.delete(t); }, contains(t) { return this.tridy.has(t); } },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		appendChild(d) { this.deti.push(d); },
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	prvky.set(id, p);
	return p;
};
const tl = (d, id) => { const x = novy(id); Object.assign(x.dataset, d); return x; };
const skupiny = {
	'.opa-smycka': [tl({ smycka: 'dokud' }, 's-dokud'), tl({ smycka: 'krat' }, 's-krat'), tl({ smycka: 'stale' }, 's-stale')],
	'.opa-start': [tl({ start: 'daleko' }, 'z-daleko'), tl({ start: 'uOkraje' }, 'z-okraj')],
	'.opa-telo': [tl({ telo: 'jdi' }, 't-jdi'), tl({ telo: 'rekni' }, 't-rekni')],
};
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll: (s) => skupiny[s] || [],
	createElement: () => novy('e' + Math.random()),
	createElementNS: () => novy('e' + Math.random()),
};
const casovace = [];
const sandbox = {
	document, console, Array, Math, String, Object,
	setInterval: (f) => { casovace.push(f); return casovace.length; },
	clearInterval: (i) => { casovace[i - 1] = null; },
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('opa-svg');
const stavEl = prvky.get('opa-stav');
const pruchodyEl = prvky.get('opa-pruchody');
const podminkaEl = prvky.get('opa-podminka');
const prikazyEl = prvky.get('opa-prikazy');
const btnKrok = prvky.get('opa-krok');
const btnBezet = prvky.get('opa-bezet');
const btnReset = prvky.get('opa-reset');

let chyby = 0;
let kontrol = 0;
const ok = (p, t) => { kontrol++; console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (el) => (el.posluchaci.click || []).forEach((f) => f());

const { KROK, X_DALEKO, X_U_OKRAJE, OKRAJ, POCET_KRAT, STROP } = svg.__meze;
const S = (n, v) => svg.__stavPoPruchodech(n, v);
const DOKUD = { smycka: 'dokud', start: 'daleko', telo: 'jdi' };

// ———————————————————————— 1) HLAVNÍ POINTA VÝKLADU: podmínka se testuje PŘED tělem
{
	const uOkraje = { smycka: 'dokud', start: 'uOkraje', telo: 'jdi' };
	// (Dřív tu stálo `naOkraji(X_U_OKRAJE) === true`, což byla TAUTOLOGIE: obě konstanty
	// mají tutéž hodnotu, takže tvrzení nemohlo selhat. Nález nezávislého kontrolora.)
	ok(svg.__naOkraji(X_U_OKRAJE) === true && svg.__naOkraji(X_U_OKRAJE - KROK) === false,
		'hranice dotyku je ostrá: na okraji ano, o krok dřív ne');
	ok(svg.__pocetProvedeni(uOkraje) === 0, 'když podmínka platí už na startu, tělo smyčky neproběhne ANI JEDNOU');
	ok(S(1, uOkraje).konec === true, 'smyčka skončí hned v prvním testu');
	ok(S(1, uOkraje).x === X_U_OKRAJE, 'postava se přitom vůbec nepohne');
	ok(S(5, uOkraje).pruchody === 0, 'ani po pěti kliknutích průchod nepřibude (program skončil)');
}

// ———————————————————————— 2) „OPAKUJ DOKUD" — počet neznáme, ale víme, čím to skončí
{
	const ocekavano = Math.ceil((OKRAJ - X_DALEKO) / KROK);
	ok(svg.__pocetProvedeni(DOKUD) === ocekavano, `tělo proběhne přesně ${ocekavano}× (dráha ${OKRAJ - X_DALEKO} px po ${KROK} px)`);
	const konec = S(ocekavano + 1, DOKUD);
	ok(konec.konec === true && konec.duvod === 'podminka', 'smyčka končí splněnou podmínkou, ne stropem');
	ok(konec.x === OKRAJ, 'postava skončí přesně na okraji, nikde dál');
	ok([...Array(ocekavano).keys()].every((i) => Number.isInteger(S(i, DOKUD).x)), 'souřadnice zůstávají celá čísla');
	// Spojitost: mezi průchody se postava nesmí teleportovat.
	let nej = 0;
	let stav = S(0, DOKUD);
	for (let i = 0; i < 50; i++) { const d = svg.__jedenPruchod(stav, DOKUD); nej = Math.max(nej, Math.abs(d.x - stav.x)); stav = d; }
	ok(nej <= KROK, `největší posun v jednom průchodu je ${nej} px (limit ${KROK})`);
}

// ———————————————————————— 3) TŘI DRUHY SMYČEK SE OPRAVDU LIŠÍ
{
	const krat = { smycka: 'krat', start: 'daleko', telo: 'jdi' };
	const stale = { smycka: 'stale', start: 'daleko', telo: 'jdi' };
	ok(svg.__pocetProvedeni(krat) === POCET_KRAT, `„opakuj (${POCET_KRAT}) krát" proběhne přesně ${POCET_KRAT}×`);
	ok(S(POCET_KRAT + 1, krat).duvod === 'pocet', '…a končí kvůli počtu, ne kvůli podmínce');
	ok(S(POCET_KRAT + 1, krat).x < OKRAJ, 'postava přitom k okraji ještě nedojede — počet nezávisí na scéně');
	ok(svg.__pocetProvedeni(stale) >= STROP, '„opakuj stále" sám od sebe neskončí');
	ok(S(STROP + 1, stale).duvod === 'strop', '…zastaví ho až pojistka simulace, ne podmínka');
	// Tři smyčky = tři různé počty průchodů, jinak by přepínač nic neukazoval.
	const pocty = new Set([svg.__pocetProvedeni(DOKUD), svg.__pocetProvedeni(krat), svg.__pocetProvedeni(stale)]);
	ok(pocty.size === 3, 'každá ze tří smyček dá jiný počet průchodů');
}

// ———————————————————————— 4) NEKONEČNÁ SMYČKA: uvnitř se nemění nic, co by podmínku splnilo
{
	const nekonecna = { smycka: 'dokud', start: 'daleko', telo: 'rekni' };
	ok(svg.__pocetProvedeni(nekonecna) >= STROP, 'bez pohybu uvnitř se „opakuj dokud" nikdy nesplní');
	ok(S(STROP + 1, nekonecna).duvod === 'strop', 'program běží, dokud ho nezastaví pojistka');
	ok(S(STROP + 1, nekonecna).x === X_DALEKO, 'postava se za celou dobu ani nehne — to je ten příznak z výkladu');
	// A protikladem: totéž s pohybem uvnitř skončí.
	ok(svg.__pocetProvedeni(DOKUD) < STROP, 'stačí dát dovnitř „dopředu o 10 kroků" a smyčka skončí');
}

// ———————————————————————— 5) POSTAVA NIKDY NEPŘEJEDE ZEĎ
{
	for (const v of [DOKUD, { ...DOKUD, telo: 'rekni' }, { smycka: 'stale', start: 'daleko', telo: 'jdi' }]) {
		const presla = [...Array(STROP + 5).keys()].some((i) => S(i, v).x > OKRAJ);
		ok(!presla, `postava nepřejede okraj (smyčka ${v.smycka}, tělo ${v.telo})`);
	}
}

// ———————————————————————— 5b) HLÁŠKY NESMÍ ODPOROVAT TOMU, CO JE NA OBRAZOVCE
// Nález nezávislého kontrolora: u „opakuj stále" simulace tvrdila „nic se nemění",
// ačkoli postava ujela 200 px. Hlášky se proto kontrolují jako text, ne jen model.
{
	const hlaskaEl = prvky.get('opa-hlaska');
	const poznamkaEl = prvky.get('opa-poznamka');
	klik(skupiny['.opa-smycka'][2]);          // opakuj stále
	for (let i = 0; i < STROP + 2; i++) klik(btnKrok);
	ok(svg.__stav().duvod === 'strop', 'u „opakuj stále" zasáhne pojistka');
	ok(!/nic se nemění/.test(hlaskaEl.textContent), 'hláška u „opakuj stále" NETVRDÍ, že se nic nemění');
	ok(/pojistka/i.test(hlaskaEl.textContent + poznamkaEl.textContent), 'je řečeno, že zastavila POJISTKA, ne program');
	ok(svg.__stav().x > X_DALEKO, '…a postava se přitom opravdu posunula');
	// Zastavení pojistkou musí být poznat od regulérního konce smyčky.
	klik(skupiny['.opa-smycka'][0]);
	for (let i = 0; i < 25; i++) klik(btnKrok);
	ok(svg.__stav().duvod === 'podminka', 'u „opakuj dokud" končí smyčka podmínkou');
	ok(!/pojistka/i.test(hlaskaEl.textContent), 'a to se hlásí JINAK než zastavení pojistkou');
	klik(btnReset);
}

// ———————————————————————— 5c) PANEL PODMÍNKY U SMYČEK, KTERÉ SE NEPTAJÍ
{
	klik(skupiny['.opa-smycka'][1]);          // opakuj (10) krát
	ok(!/ANO|NE/.test(podminkaEl.textContent), 'u smyčky bez podmínky panel nehlásí ANO/NE');
	klik(skupiny['.opa-smycka'][0]);
	ok(/ANO|NE/.test(podminkaEl.textContent), 'u „opakuj dokud" panel podmínku ukazuje');
	klik(btnReset);
}

// ———————————————————————— 6) CO ŽÁK VIDÍ NA STRÁNCE
klik(btnReset);
ok(pruchodyEl.textContent === '0', 'po resetu je počítadlo průchodů na nule');
ok(String(stavEl.innerHTML).includes('jeden průchod'), 'úvodní hláška říká, co má žák udělat');
ok(podminkaEl.textContent.includes('NE'), 'na startu je vidět, že podmínka neplatí');
klik(btnKrok);
ok(svg.__stav().pruchody === 1, 'tlačítko „jeden průchod" posune program o průchod');
ok(pruchodyEl.textContent === '1', 'počítadlo se překreslí');
{
	const zvyraznene = prikazyEl.deti.filter((d) => d.className === 'opa-nyni');
	ok(zvyraznene.length === 1, 'zvýrazněn je právě jeden řádek programu (tělo smyčky)');
}
{
	klik(btnBezet);
	const bezi = btnBezet.textContent.includes('zastavit');
	klik(btnBezet);
	ok(bezi && btnBezet.textContent.includes('spustit'), 'běh jde spustit i zastavit týmž tlačítkem');
}
{
	// Přepínač smyčky mění vypsaný program a vrací simulaci na začátek.
	klik(skupiny['.opa-smycka'][1]);
	ok(svg.__programRadky().map((r) => r.text).join(' ').includes(`opakuj (${POCET_KRAT}) krát`), 'přepnutí na „opakuj krát" změní vypsaný program');
	ok(svg.__stav().pruchody === 0, 'přepnutí vrátí simulaci na začátek (nemíchají se dva běhy)');
	klik(skupiny['.opa-smycka'][0]);
	klik(skupiny['.opa-start'][1]);
	ok(svg.__stav().x === X_U_OKRAJE, 'přepínač startu postaví postavu k okraji');
	klik(btnKrok);
	ok(svg.__stav().pruchody === 0 && svg.__stav().konec, 'a z té polohy program skončí bez jediného průchodu — hlavní pointa je vidět i klikáním');
	ok(String(stavEl.innerHTML).includes('ani jednou'), 'stavový řádek to žákovi vysvětlí slovy');
	klik(skupiny['.opa-start'][0]);
}
{
	// Názvy bloků z české palety Scratche (zdroj pravdy scratch-l10n).
	const radky = svg.__programRadky().map((r) => r.text).join(' | ');
	// Bez čárky — cs.json má CONTROL_REPEATUNTIL = „opakuj dokud nenastane %1".
	// Čárka navíc byla drobný, ale skutečný rozpor s výkladem téže stránky.
	ok(radky.includes('opakuj dokud nenastane'), 'blok „opakuj dokud nenastane" je pojmenovaný česky (bez čárky)');
	ok(!radky.includes('opakuj, dokud'), 'a nepíše se s čárkou, kterou paleta nemá');
	ok(radky.includes('dopředu o 10 kroků'), 'blok „dopředu o 10 kroků" je pojmenovaný česky');
	// Názvy se NEporovnávají s literály (to by byl opis vlastního kódu — nález
	// kontrolora), ale proti tabulce zakázaných tvarů, kterou plní zdroj pravdy
	// scratch-l10n. Když někdo do simulace vrátí „jdi 10 kroků", spadne to tady.
	const { ZAKAZANE } = await import('../nazvy-bloku.mjs');
	const sedi = (v, t) => (v instanceof RegExp ? v.test(t) : t.includes(v));
	const spatne = ZAKAZANE.filter((z) => sedi(z.vzor, radky.toLowerCase()));
	ok(spatne.length === 0, `žádný název bloku neodporuje české paletě${spatne.length ? ': ' + spatne.map((z) => z.spravne).join(', ') : ''}`);
}

console.log(chyby === 0 ? `\n✅ Opakování: všech ${kontrol} kontrol prošlo.` : `\n❌ ${chyby} z ${kontrol} kontrol selhalo.`);
process.exit(chyby === 0 ? 0 : 1);
