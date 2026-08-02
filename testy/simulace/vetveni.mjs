#!/usr/bin/env node
// Ověření VetveniSimulace.astro — „když… tak… jinak…" (informatika 7).
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm), takže se měří kód,
// který na stránce opravdu běží, ne jeho opis.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novy = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {}, deti: [],
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
	'.vet-podm': [tl({ podminka: 'cervena' }, 'p-cervena'), tl({ podminka: 'ne-cervena' }, 'p-ne'), tl({ podminka: 'nebo' }, 'p-nebo')],
	'.vet-verze': [tl({ jinak: 'ano' }, 'v-ano'), tl({ jinak: 'ne' }, 'v-ne')],
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

const svg = prvky.get('vet-svg');
const stavEl = prvky.get('vet-stav');
const skoreEl = prvky.get('vet-skore');
const hlaskaEl = prvky.get('vet-hlaska');
const prikazyEl = prvky.get('vet-prikazy');
const btnKrok = prvky.get('vet-krok');
const btnBezet = prvky.get('vet-bezet');
const btnReset = prvky.get('vet-reset');

let chyby = 0;
let kontrol = 0;
const ok = (p, t) => { kontrol++; console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (el) => (el.posluchaci.click || []).forEach((f) => f());

const { START, KROK, VLEVO, VPRAVO, MODRY_DO, CERVENY_OD } = svg.__meze;
const S = (n, volby) => svg.__stavPoKrocich(n, volby);
const ZAKLAD = { podminka: 'cervena', sJinak: true };

// ————————————————————————————————— 1) ČÍSLA A POHYB
ok(S(0, ZAKLAD).x === START, 'start je na zadané poloze');
ok(S(1, ZAKLAD).x === START + KROK, 'jeden krok posune přesně o 10 (jdi 10 kroků)');
ok([...Array(40).keys()].every((i) => Number.isInteger(S(i, ZAKLAD).x)), 'souřadnice zůstávají celá čísla ve všech 40 krocích');
ok([...Array(60).keys()].every((i) => { const x = S(i, ZAKLAD).x; return x >= VLEVO && x <= VPRAVO; }), 'postava nikdy neopustí scénu');
{
	// Spojitost pohybu: mezi dvěma kroky se postava nesmí „teleportovat".
	let nejvetsiSkok = 0;
	let stav = S(0, ZAKLAD);
	for (let i = 0; i < 80; i++) {
		const dalsi = svg.__jedenKrok(stav, ZAKLAD);
		nejvetsiSkok = Math.max(nejvetsiSkok, Math.abs(dalsi.x - stav.x));
		stav = dalsi;
	}
	ok(nejvetsiSkok <= KROK, `největší skok mezi kroky je ${nejvetsiSkok} px (limit ${KROK})`);
}

// ————————————————————————————————— 2) PODMÍNKA SE VYHODNOCUJE SPRÁVNĚ
ok(svg.__vyhodnot('cervena', CERVENY_OD) === true, 'na červeném pruhu podmínka platí');
ok(svg.__vyhodnot('cervena', CERVENY_OD - 1) === false, 'krok před červeným pruhem neplatí');
ok(svg.__vyhodnot('ne-cervena', CERVENY_OD) === false, '„ne" otáčí platnost naruby (na červené neplatí)');
ok(svg.__vyhodnot('ne-cervena', START) === true, '„ne" platí mimo červenou');
ok(svg.__vyhodnot('nebo', MODRY_DO) === true, '„nebo" platí i na modré');
ok(svg.__vyhodnot('nebo', CERVENY_OD) === true, '„nebo" platí i na červené');
ok(svg.__vyhodnot('nebo', START) === false, '„nebo" neplatí mezi pruhy');

// ————————————————————————————————— 3) HLAVNÍ POINTA: běží VŽDY JEN JEDNA VĚTEV
{
	// Najdeme krok, ve kterém postava poprvé stoupne na červenou.
	let i = 1;
	while (i < 200 && S(i, ZAKLAD).vetev !== 'tak') i++;
	const naCervene = S(i, ZAKLAD);
	const predtim = S(i - 1, ZAKLAD);
	ok(i < 200, 'postava se na červený pruh opravdu dostane');
	ok(naCervene.vetev === 'tak', 'na červené jde program větví „tak"');
	ok(naCervene.skore === predtim.skore, 've větvi „tak" se skóre NEZVĚTŠÍ — větev „jinak" se přeskočí celá');
	ok(naCervene.smer === -predtim.smer, 'otočení o 180 stupňů opravdu obrátí směr');
	ok(S(i - 1, ZAKLAD).vetev === 'jinak', 'krok předtím šel větví „jinak"');
	ok(S(i - 1, ZAKLAD).skore === S(i - 2, ZAKLAD).skore + 1, 've větvi „jinak" přibude přesně 1 bod');
}

// ————————————————————————————————— 4) VERZE BEZ VĚTVE „JINAK"
{
	const bezJinak = { podminka: 'cervena', sJinak: false };
	ok(S(20, bezJinak).skore === 0, 'bez větve „jinak" nepřibude žádný bod');
	ok(S(20, bezJinak).x === S(20, ZAKLAD).x, 'pohyb je v obou verzích stejný — liší se jen to, co se děje ve větvích');
	const kroky = [...Array(30).keys()].map((i) => S(i + 1, bezJinak).vetev);
	ok(kroky.includes('zadna'), 'bez „jinak" se při nesplněné podmínce nestane NIC (větev „zadna")');
	ok(!kroky.includes('jinak'), 'bez „jinak" se větev „jinak" nikdy neprovede');
	// A naopak: s „jinak" se skóre opravdu zvětšuje
	ok(S(20, ZAKLAD).skore > 0, 's větví „jinak" body přibývají');
}

// ————————————————————————————————— 5) POSTAVA SE MEZI PRUHY ODRÁŽÍ (scéna dává smysl)
{
	const smery = new Set([...Array(120).keys()].map((i) => S(i, ZAKLAD).smer));
	ok(smery.has(1) && smery.has(-1), 'postava chodí oběma směry (odráží se)');
	// Postava nesmí nikde uváznout. Dřív došla po otočení k levému kraji a zůstala stát —
	// proto je v programu blok „když na okraji, odraz se".
	const polohy = [...Array(200).keys()].map((i) => S(i, ZAKLAD).x);
	const uvazla = polohy.slice(0, -3).some((x, i) => x === polohy[i + 1] && x === polohy[i + 2] && x === polohy[i + 3]);
	ok(!uvazla, 'postava nikde neuvázne (na okraji se odrazí)');
	ok(new Set(polohy).size > 10, 'postava projde mnoho různých poloh, scéna je živá');
}
{
	// „ne ⟨červená⟩" je poučně divná: postava se otáčí skoro pořád, takže se skoro nehne.
	// Musí ale zůstat na scéně a program nesmí spadnout.
	const volby = { podminka: 'ne-cervena', sJinak: true };
	const polohy = [...Array(60).keys()].map((i) => S(i, volby).x);
	ok(polohy.every((x) => x >= VLEVO && x <= VPRAVO), 'i s podmínkou „ne" zůstává postava na scéně');
	ok(new Set(polohy).size <= 3, 's podmínkou „ne" se postava skoro nehne (otáčí se každý krok)');
}

// ————————————————————————————————— 6) CO ŽÁK VIDÍ NA STRÁNCE
klik(btnReset);
ok(skoreEl.textContent === '0', 'po resetu je skóre 0');
ok(String(stavEl.innerHTML).includes('jeden krok'), 'úvodní hláška říká, co má žák udělat');
klik(btnKrok);
ok(svg.__stav().krok === 1, 'tlačítko „jeden krok" opravdu posune program o krok');
ok(hlaskaEl.textContent.length > 0, 'po kroku je vidět, kterou větví program šel');
{
	// Zvýrazňuje se JEN ten řádek, který běžel — a právě jeden.
	const zvyraznene = prikazyEl.deti.filter((d) => d.className === 'vet-nyni');
	ok(zvyraznene.length === 1, 'zvýrazněn je právě jeden řádek programu');
	ok(svg.__stav().vetev === 'jinak' ? zvyraznene[0].textContent === 'změň skóre o 1' : true, 'zvýrazněný řádek odpovídá provedené větvi');
}
{
	// Cesta TAM i ZPĚT (pravidlo z kontroly animací): co jde spustit, musí jít zastavit.
	klik(btnBezet);
	const bezi = btnBezet.textContent.includes('zastavit');
	klik(btnBezet);
	ok(bezi && btnBezet.textContent.includes('opakuj'), 'běh jde spustit i zastavit týmž tlačítkem');
}
{
	// Přepínač verze programu mění to, co je v programu vypsané.
	klik(skupiny['.vet-verze'][1]);   // bez „jinak"
	const radky = svg.__programRadky().map((r) => r.text);
	ok(!radky.includes('jinak'), 've verzi bez „jinak" není řádek „jinak" ani vypsaný');
	ok(!radky.includes('změň skóre o 1'), 've verzi bez „jinak" chybí i „změň skóre o 1"');
	klik(skupiny['.vet-verze'][0]);
	ok(svg.__programRadky().map((r) => r.text).includes('jinak'), 'přepnutí zpět vrátí větev „jinak"');
	ok(svg.__stav().krok === 0, 'přepnutí programu vrátí simulaci na začátek (nemíchají se dva běhy)');
}
{
	// Názvy bloků musí být z české palety Scratche (zdroj pravdy scratch-l10n).
	const radky = svg.__programRadky().map((r) => r.text).join(' | ');
	ok(radky.includes('jdi 10 kroků'), 'blok „jdi 10 kroků" je pojmenovaný česky');
	ok(radky.includes('otoč se o 180 stupňů'), 'blok „otoč se o 180 stupňů" je pojmenovaný česky');
	ok(radky.includes('opakuj stále'), 'smyčka se jmenuje „opakuj stále"');
	ok(radky.includes('když na okraji, odraz se'), 'blok držící scénu v pohybu je v programu vidět');
	ok(!/pero dolů|jdi na|řekni /.test(radky), 'nepoužívá se žádný neexistující český název bloku');
}

console.log(chyby === 0 ? `\n✅ Větvení: všech ${kontrol} kontrol prošlo.` : `\n❌ ${chyby} z ${kontrol} kontrol selhalo.`);
process.exit(chyby === 0 ? 0 : 1);
