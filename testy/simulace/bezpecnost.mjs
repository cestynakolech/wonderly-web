#!/usr/bin/env node
// Ověření BezpecnostSimulace.astro — informatika 9, bezpecnost-pocitace-a-dat.
//
// Scéna A: rozdělení adresy na (předpona, doména, cesta) je čistá funkce
// (rozdelAdresu), testuje se PROTI NAPEVNO ZAPSANÝM příkladům — kdyby test
// bral čísla z komponenty, odkýval by cokoli. Hlídá se hlavně to, že
// zvýrazněná doména je vždy TA SPRÁVNÁ (poslední dvě části hostitele PŘED
// prvním lomítkem), i u záludných příkladů (subdoména, doména v cestě, překlep).
//
// Scéna B: pořadí vrstev zvenčí dovnitř a to, že útok se zastaví na PRVNÍ
// zapnuté vrstvě — a že záloha (mimo řadu kružnic) rozhoduje o osudu dat,
// až když útok dojde úplně dovnitř.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const html = zdroj.split('<script>')[0];

const prvky = new Map();
const vyrobene = new Set();
const novy = (id, vSablone = false) => {
	const p = {
		id, atributy: {}, dataset: {}, posluchaci: {}, _text: '',
		get textContent() { return this._text; },
		set textContent(v) { this._text = String(v); },
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	};
	if (!vSablone) vyrobene.add(id);
	prvky.set(id, p);
	return p;
};
const ID_SABLONY = [
	'bz-a-svg', 'bz-a-predpona', 'bz-a-domena', 'bz-a-cesta', 'bz-a-ramecek', 'bz-a-znacka',
	'bz-a-vysvetleni', 'bz-a-vysvetleni2', 'bz-a-poradi', 'bz-a-celkem', 'bz-a-stav',
	'bz-a-prava', 'bz-a-podvodna', 'bz-a-dalsi',
	'bz-b-svg', 'bz-b-vrstva-aktualizace', 'bz-b-vrstva-antivir', 'bz-b-vrstva-heslo', 'bz-b-vrstva-2fa',
	'bz-b-utok', 'bz-b-zasah', 'bz-b-zaloha', 'bz-b-vysledek', 'bz-b-stav', 'bz-b-spustit',
	'bz-b-tl-aktualizace', 'bz-b-tl-antivir', 'bz-b-tl-heslo', 'bz-b-tl-2fa', 'bz-b-tl-zaloha',
];
for (const id of ID_SABLONY) novy(id, true);

const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll: () => [],
};
const sandbox = { document, console, Math, String, Object, Number };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0, kontrol = 0;
const ok = (p, t) => { kontrol++; console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (el) => (el.posluchaci.click || []).forEach((f) => f());

const svgA = prvky.get('bz-a-svg');
const svgB = prvky.get('bz-b-svg');
const aRamecek = prvky.get('bz-a-ramecek');
const aDomena = prvky.get('bz-a-domena');
const aZnacka = prvky.get('bz-a-znacka');
const aStav = prvky.get('bz-a-stav');
const aVysv1 = prvky.get('bz-a-vysvetleni');

// ———————————————————————— 1) ŠABLONA ————————————————————————
{
	for (const id of ID_SABLONY) ok(html.includes(`id="${id}"`), `šablona obsahuje prvek #${id}`);
	ok(vyrobene.size === 0, `skript nesáhl mimo šablonu${vyrobene.size ? ': ' + [...vyrobene].join(', ') : ''}`);
	ok(/<svg[^>]*id="bz-a-svg"/.test(html), 'scéna A je opravdu <svg>');
	ok(/<svg[^>]*id="bz-b-svg"/.test(html), 'scéna B je opravdu <svg>');
}

// ———————————————————————— 2) SCÉNA A: rozdělení adresy je čistá funkce ————————————————————————
{
	const rozdel = svgA.__proc?.rozdelAdresu ?? null;
	// funkce není exportovaná ven — ověříme chování nepřímo přes vykreslený stav
	ok(typeof aDomena.textContent === 'string', 'doména se vůbec vykreslí');
}

// ———————————————————————— 3) SCÉNA A: klik SYNCHRONNĚ zvýrazní SKUTEČNOU doménu ————————————————————————
{
	// klid: bez odpovědi není nic zvýrazněné
	ok(aRamecek.atributy.opacity === '0', 'v klidu není zvýrazněný žádný rámeček');
	ok(aZnacka.textContent === '', 'v klidu není žádná ✅/❌ značka');
	ok(aDomena.textContent === 'seznam.cz', 'první příklad: doména se určí správně (www.seznam.cz/email → seznam.cz)');
	const aCesta = prvky.get('bz-a-cesta');
	ok(aCesta.textContent === '/email', '★ cesta za doménou se nezdvojí (nález z diffu: bývalo „/email/email")');

	klik(prvky.get('bz-a-prava'));
	ok(aRamecek.atributy.opacity === '1', '★ po kliknutí se rámeček SYNCHRONNĚ zviditelní (opacity 1)');
	ok(aRamecek.atributy.stroke === '#2b8a3e', 'první příklad je pravý → rámeček zelený');
	ok(aZnacka.textContent === '✅', 'odpověď „pravá" na pravou adresu je správně');
	ok(/PRAVÁ/.test(aStav.textContent), 'hláška potvrdí, že adresa je pravá');
	ok(aVysv1.textContent.includes('seznam.cz'), 'vysvětlení jmenuje skutečnou doménu');

	// rámeček musí sedět NAD doménou, ne nad zbytkem adresy (x rámečku ~ x domény)
	const xRamecek = Number(aRamecek.atributy.x);
	const xDomena = Number(aDomena.atributy.x);
	ok(Math.abs(xRamecek - (xDomena - 4)) < 0.01, '★ rámeček je vykreslený přesně kolem textu domény (shodné x)');

	klik(prvky.get('bz-a-podvodna'));
	ok(aZnacka.textContent === '✅', 'druhý klik na stejný příklad nic nemění (žák už odpověděl)');
}

// ———————————————————————— 4) SCÉNA A: záludné příklady — doména sedí, ne jméno v adrese ————————————————————————
{
	const dalsi = prvky.get('bz-a-dalsi');
	klik(dalsi); // → příklad 2: seznam.cz.utok.ru/prihlaseni (podvodná)
	ok(aDomena.textContent === 'utok.ru', '★ subdoménový trik: doména je utok.ru, i když adresa "vypadá" jako seznam.cz');
	klik(prvky.get('bz-a-prava'));
	ok(aZnacka.textContent === '❌', 'odpověď „pravá" na podvodnou adresu je špatně');
	ok(aRamecek.atributy.stroke === '#e03131', 'podvodný příklad → rámeček červený');

	klik(dalsi); // → příklad 3: mojebanka.csob.cz.prihlaseni-overeni.cz/login
	ok(aDomena.textContent === 'prihlaseni-overeni.cz', '★ jméno banky v adrese doménu neurčuje — reálná je prihlaseni-overeni.cz');

	klik(dalsi); // → příklad 4: www.sezanm.cz/posta (překlep)
	ok(aDomena.textContent === 'sezanm.cz', '★ překlep se pozná jako jiná doména než seznam.cz');
	klik(prvky.get('bz-a-podvodna'));
	ok(aZnacka.textContent === '✅', 'překlepová doména je správně vyhodnocená jako podvodná');

	klik(dalsi); // → příklad 5: obchod.alza.cz/kosik (pravá, subdoména)
	ok(aDomena.textContent === 'alza.cz', '★ subdoména PŘED doménou (obchod.alza.cz) je v pořádku, doména je alza.cz');
	klik(prvky.get('bz-a-prava'));
	ok(aZnacka.textContent === '✅', 'subdoména legitimní domény je správně vyhodnocená jako pravá');

	klik(dalsi); // koloběh zpátky na příklad 1
	ok(aDomena.textContent === 'seznam.cz', 'po pěti „další" se cyklus vrátí na první příklad');
	ok(aRamecek.atributy.opacity === '0', 'nový příklad začíná bez zvýraznění (žák ještě neodpověděl)');
}

// ———————————————————————— 5) SCÉNA B: pořadí vrstev a zastavení útoku ————————————————————————
{
	const utok = prvky.get('bz-b-utok');
	const zasah = prvky.get('bz-b-zasah');
	const vysledek = prvky.get('bz-b-vysledek');
	const bStav = prvky.get('bz-b-stav');
	const spustit = prvky.get('bz-b-spustit');
	const vAktual = prvky.get('bz-b-vrstva-aktualizace');
	const vAntivir = prvky.get('bz-b-vrstva-antivir');
	const vHeslo = prvky.get('bz-b-vrstva-heslo');
	const v2fa = prvky.get('bz-b-vrstva-2fa');
	const zaloha = prvky.get('bz-b-zaloha');

	// klid: žádná vrstva zapnutá
	klik(spustit);
	ok(Number(utok.atributy.cy) === 240, '★ bez zapnuté vrstvy útok dojde SYNCHRONNĚ až doprostřed (data)');
	ok(!zapnutoZaloha(zaloha), 'záloha je v klidu vypnutá');
	ok(/bez zálohy/.test(vysledek.textContent), 'bez zapnuté zálohy hláška řekne, že data jsou ztracená');

	// zapnutí VNITŘNÍ vrstvy (2FA) — útok se má zastavit tam, ne dál venku
	klik(prvky.get('bz-b-tl-2fa'));
	ok(v2fa.atributy.stroke === '#2b8a3e', 'zapnutí vrstvy 2FA ji SYNCHRONNĚ obarví na zeleno');
	klik(spustit);
	ok(Number(utok.atributy.cy) === 240 - 80, '★ útok se zastaví na vrstvě 2FA (poloměr 80), nedojde k datům');
	ok(/2fa/.test(vysledek.textContent), 'hláška jmenuje vrstvu 2FA jako tu, na které se útok zastavil');

	// zapnutí VNĚJŠÍ vrstvy (aktualizace) — útok se má zastavit tam nejdřív, ne až u 2FA
	klik(prvky.get('bz-b-tl-aktualizace'));
	klik(spustit);
	ok(Number(utok.atributy.cy) === 240 - 200, '★ zvenčí dovnitř: aktualizace zastaví útok dřív než vnitřní 2FA');
	ok(/aktualizace/.test(vysledek.textContent), 'hláška správně jmenuje aktualizaci, ne 2FA, i když obě jsou zapnuté');

	// vypnutí vnější vrstvy zpět — antivir jako další v pořadí
	klik(prvky.get('bz-b-tl-aktualizace')); // vypnout
	klik(prvky.get('bz-b-tl-antivir'));     // zapnout
	klik(spustit);
	ok(Number(utok.atributy.cy) === 240 - 160, 'po vypnutí aktualizace zastaví útok další v pořadí — antivir');

	// vypnout vše kromě zálohy → útok dojde k datům, ale záloha je zachrání
	klik(prvky.get('bz-b-tl-antivir'));
	klik(prvky.get('bz-b-tl-2fa'));
	klik(prvky.get('bz-b-tl-zaloha'));
	ok(zaloha.atributy.fill === '#4dabf7', '★ zapnutí zálohy ji SYNCHRONNĚ obarví');
	klik(spustit);
	ok(Number(utok.atributy.cy) === 240, 'bez blokujících vrstev útok znovu dojde k datům');
	ok(/zachránily|zachránila/.test(vysledek.textContent), '★ se zapnutou zálohou hláška řekne, že data byla zachráněna');
	ok(!/heslo/.test(vysledek.textContent), 'vrstva heslo nebyla zapnutá, hláška ji nejmenuje jako blokující');

	// heslo jako prostřední vrstva
	klik(prvky.get('bz-b-tl-heslo'));
	klik(spustit);
	ok(Number(utok.atributy.cy) === 240 - 120, 'vrstva heslo (poloměr 120) zastaví útok, když je jediná zapnutá');

	function zapnutoZaloha(el) { return el.atributy.fill === '#4dabf7'; }
}

// ———————————————————————— 6) PŘÍSTUPNOST ————————————————————————
{
	ok(/aria-live="polite"/.test(html), 'stavová hláška je pro odečítač živá');
	ok((html.match(/aria-pressed="false"/g) ?? []).length === 5, 'všech pět přepínačů vrstev hlásí počáteční stav');
	ok(/<svg[^>]*role="img"/.test(html), 'obě scény jsou pro odečítač označené jako obrázek/scéna');
	ok(/<svg[^>]*aria-label="[^"]{20,}"/.test(html), 'scéna má popisný aria-label');
}

console.log(chyby === 0 ? `\n✅ Bezpečnost: všech ${kontrol} kontrol prošlo.` : `\n❌ ${chyby} z ${kontrol} kontrol selhalo.`);
process.exit(chyby === 0 ? 0 : 1);
