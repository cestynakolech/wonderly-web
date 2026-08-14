/**
 * Zabezpečení role „tabule" v herní místnosti Fyzikální ligy (worker.js).
 *
 * Proč to existuje: kód místnosti je čtyřpísmenný a píše se na tabuli, takže ho
 * zná celá třída. Dřív stačil k tomu, aby se kdokoli připojil jako `role=tabule`
 * a rozesílal stav hry všem týmům (nález revize 14. 8. 2026). Nově musí tabule
 * doložit tajný klíč, který vznikne při zakládání místnosti.
 *
 * Spuštění: node testy/liga-tabule.mjs
 */
import { pathToFileURL } from 'node:url';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const koren = join(dirname(fileURLToPath(import.meta.url)), '..');

let kontrol = 0;
let chyby = 0;
const ok = (podminka, popis) => {
	kontrol++;
	if (podminka) console.log(`✅ ${popis}`);
	else { chyby++; console.log(`❌ ${popis}`); }
};

// --- náhrada prostředí Cloudflare (WebSocketPair v Node není) ---
let poslednirPar = null;

class FalesnyWS {
	constructor(jmeno) {
		this.jmeno = jmeno;
		this.poslano = [];
		this.posluchaci = {};
		this.zavreno = null;
	}
	accept() {}
	send(data) { this.poslano.push(JSON.parse(data)); }
	close(kod, duvod) { this.zavreno = { kod, duvod }; }
	addEventListener(typ, fn) { (this.posluchaci[typ] ??= []).push(fn); }
	/** simuluje zprávu OD klienta DO workeru */
	prijmi(objekt) {
		for (const fn of this.posluchaci.message ?? []) fn({ data: JSON.stringify(objekt) });
	}
}

globalThis.WebSocketPair = function () {
	const klient = new FalesnyWS('klient');
	const server = new FalesnyWS('server');
	poslednirPar = { klient, server };
	return { 0: klient, 1: server };
};

// Node neumí Response se stavem 101 (WebSocket upgrade) — Cloudflare ano.
// Náhrada musí umět jen to, co worker skutečně používá.
class FalesnaOdpoved {
	constructor(telo, init = {}) {
		this.telo = telo;
		this.status = init.status ?? 200;
		this.webSocket = init.webSocket ?? null;
		this.headers = new Map(Object.entries(init.headers ?? {}));
	}
	get ok() { return this.status >= 200 && this.status < 300; }
	async json() { return JSON.parse(this.telo); }
	async text() { return this.telo; }
}
globalThis.Response = FalesnaOdpoved;

class FalesneUloziste {
	constructor() { this.data = new Map(); }
	async get(k) { return this.data.get(k); }
	async put(k, v) { this.data.set(k, v); }
}

const novyState = () => ({
	storage: new FalesneUloziste(),
	blockConcurrencyWhile: (fn) => fn(),
});

// cesta k workeru jde přebít argumentem — kvůli obousměrnému důkazu (podvrh na kopii)
const cestaWorker = process.argv[2] ?? join(koren, 'worker.js');
const { LigaMistnost } = await import(pathToFileURL(cestaWorker).href);

const KLIC = 'a'.repeat(36);
const pozadavekWS = (role) =>
	new Request(`https://liga/api/liga/ws?mistnost=ABCD&role=${role}`, { headers: { Upgrade: 'websocket' } });

/** připojí účastníka a vrátí jeho serverovou stranu */
async function pripoj(mistnost, role) {
	await mistnost.fetch(pozadavekWS(role));
	return poslednirPar.server;
}

async function novaMistnostSKlicem() {
	const m = new LigaMistnost(novyState());
	const odpoved = await m.fetch(new Request(`https://liga/zaloz?klic=${KLIC}`));
	return { m, odpoved };
}

console.log('— založení místnosti —');
{
	const { m, odpoved } = await novaMistnostSKlicem();
	ok(odpoved.ok, 'místnost se založí a klíč se uloží');
	const znovu = await m.fetch(new Request(`https://liga/zaloz?klic=${'b'.repeat(36)}`));
	ok(znovu.status === 409, 'do OBSAZENÉ místnosti se cizí klíč nepropíše (409) — běžící hru nelze převzít');
	const slaby = new LigaMistnost(novyState());
	const kratky = await slaby.fetch(new Request('https://liga/zaloz?klic=abc'));
	ok(kratky.status === 400, 'krátký klíč se odmítne');
}

console.log('\n— ÚTOČNÍK: zná kód místnosti, ale nemá klíč —');
{
	const { m } = await novaMistnostSKlicem();
	const tym = await pripoj(m, 'tym');
	tym.prijmi({ typ: 'prihlaseni', jmeno: 'Tým A' });
	tym.poslano.length = 0;

	// připojí se jako tabule a rovnou zkusí vysílat, bez autorizace
	const utocnik = await pripoj(m, 'tabule');
	utocnik.prijmi({ typ: 'faze', faze: 'otazka', text: 'PODVRŽENÁ OTÁZKA' });
	ok(tym.poslano.length === 0, 'tabule BEZ klíče nerozešle týmům vůbec nic');

	// ani odpojení či jiný typ zprávy nesmí projít
	utocnik.prijmi({ typ: 'vysledky', body: 999 });
	ok(tym.poslano.length === 0, 'ani jiný typ zprávy od neautorizované tabule neprojde');

	// špatný klíč → zamítnuto a spojení zavřeno
	utocnik.prijmi({ typ: 'autorizace', klic: 'uhodnuto' });
	ok(utocnik.poslano.some((z) => z.typ === 'zamitnuto'), 'se špatným klíčem přijde „zamitnuto"');
	ok(utocnik.zavreno !== null, 'a spojení se zavře');
	ok(tym.poslano.length === 0, 'tým se o pokusu vůbec nedozví');
}

console.log('\n— UČITEL: má klíč —');
{
	const { m } = await novaMistnostSKlicem();
	const tym = await pripoj(m, 'tym');
	tym.prijmi({ typ: 'prihlaseni', jmeno: 'Tým A' });
	tym.poslano.length = 0;

	const tabule = await pripoj(m, 'tabule');
	tabule.prijmi({ typ: 'autorizace', klic: KLIC });
	ok(tabule.poslano.some((z) => z.typ === 'autorizovano'), 'se správným klíčem se tabule autorizuje');
	ok(tabule.zavreno === null, 'a spojení zůstane otevřené');

	tabule.prijmi({ typ: 'faze', faze: 'otazka', text: 'Kolik voltů má monočlánek?' });
	ok(tym.poslano.some((z) => z.typ === 'faze'), 'autorizovaná tabule už týmům vysílá');

	// klíč se nikdy nesmí objevit v ničem, co dostane tým
	const vseTymu = JSON.stringify(tym.poslano);
	ok(!vseTymu.includes(KLIC), 'klíč se týmům NIKDY neposílá');
}

console.log('\n— tým funguje beze změny —');
{
	const { m } = await novaMistnostSKlicem();
	const tabule = await pripoj(m, 'tabule');
	tabule.prijmi({ typ: 'autorizace', klic: KLIC });
	tabule.poslano.length = 0;

	const tym = await pripoj(m, 'tym');
	tym.prijmi({ typ: 'prihlaseni', jmeno: 'Tým B' });
	ok(tym.poslano.some((z) => z.typ === 'prijat'), 'tým dostane potvrzení o přijetí');
	ok(tabule.poslano.some((z) => z.typ === 'prihlaseni' && z.jmeno === 'Tým B'), 'a tabule se o něm dozví');

	tym.prijmi({ typ: 'odpoved', volba: 1 });
	ok(tabule.poslano.some((z) => z.typ === 'odpoved'), 'odpověď týmu dojde tabuli');

	// tým nesmí získat roli tabule tím, že pošle autorizaci
	const tym2 = await pripoj(m, 'tym');
	tym2.prijmi({ typ: 'autorizace', klic: KLIC });
	tym2.prijmi({ typ: 'faze', faze: 'podvod' });
	ok(!tym.poslano.some((z) => z.faze === 'podvod'), 'tým se klíčem NEPOVÝŠÍ na tabuli (autorizace mu je k ničemu)');
}

console.log('\n— omezení počtu pokusů —');
{
	const { m } = await novaMistnostSKlicem();
	for (let i = 0; i < 5; i++) {
		const u = await pripoj(m, 'tabule');
		u.prijmi({ typ: 'autorizace', klic: `pokus-${i}` });
	}
	const dalsi = await pripoj(m, 'tabule');
	dalsi.prijmi({ typ: 'autorizace', klic: KLIC });
	ok(dalsi.poslano.some((z) => z.typ === 'zamitnuto'), 'po pěti špatných pokusech je místnost dočasně zavřená i pro správný klíč');
	ok(!dalsi.poslano.some((z) => z.typ === 'autorizovano'), 'a hádající se dovnitř nedostane');
}

console.log('\n— kód místnosti sám o sobě nestačí (jádro nálezu) —');
{
	// Přesně scénář z revize: žák zná kód „ABCD" z tabule a otevře si stránku
	// s ?role=tabule. Dřív mu to stačilo k převzetí hry.
	const { m } = await novaMistnostSKlicem();
	const tym = await pripoj(m, 'tym');
	tym.prijmi({ typ: 'prihlaseni', jmeno: 'Tým A' });
	tym.poslano.length = 0;

	const zak = await pripoj(m, 'tabule');
	for (const zprava of [
		{ typ: 'faze', faze: 'vysledky' },
		{ typ: 'faze', faze: 'otazka', text: 'cokoli' },
		{ typ: 'konec' },
	]) zak.prijmi(zprava);
	ok(tym.poslano.length === 0, 'znalost čtyřpísmenného kódu k řízení hry NESTAČÍ');
}

console.log(`\n${chyby === 0 ? '✅' : '❌'} Liga — zabezpečení tabule: ${chyby === 0 ? 'vše sedí' : `${chyby} chyb`}. (${kontrol} kontrol)`);
process.exit(chyby === 0 ? 0 : 1);
