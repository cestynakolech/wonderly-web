/**
 * Zapamatovaný telefon pro odemčení tabule (worker.js, /api/tabule/potvrd
 * + TabuleOdemceni instance 'zapamatovane-telefony').
 *
 * Proč to existuje: telefon má po jednom zadání hesla příště jen klepnout.
 * Server si pamatuje POUZE otisk (SHA-256) náhodného klíče telefonu, nikdy
 * heslo ani klíč samotný. Test ověřuje, že cizí/neznámý klíč neprojde, že
 * zapamatovaný projde, že platí limit 5 pokusů i pro klíče, že špatné heslo
 * s „zapamatovat" nic nevyrobí a nic neuloží, že alarm jedné instance
 * (jednorázový kód) nesmaže seznam telefonů jiné instance, že zpackaný tvar
 * klíče neprojde, a že cesta „správné heslo + zapamatovat → nový klíč" funguje
 * (bez znalosti skutečného hesla — testovací heslo se podvrhne přes
 * monkeypatch crypto.subtle.digest, aby vyšlo na OTISK_TABULE).
 *
 * Spuštění: node testy/tabule-telefon.mjs
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

// Veřejná hodnota z worker.js (stejná jako v klientských zámcích) — NENÍ to
// tajemství, viz komentář u OTISK_TABULE ve worker.js. Test ji potřebuje, aby
// mohl podvrhnout „správné heslo" bez toho, aby ho znal.
const OTISK_TABULE = '8c0a8e314ec61cb5d61faea8ffa0dbded53adc2aa21f138cfcf90979f40a81fb';
const TESTOVACI_HESLO = 'testovaci-heslo-pro-zkousku-zapamatovani';

// --- podvrh crypto.subtle.digest: JEN pro přesně tenhle testovací řetězec,
// pro všechno ostatní (klíče telefonů, náhodné otisky) se použije skutečný SHA-256
const puvodniDigest = crypto.subtle.digest.bind(crypto.subtle);
const bajtyTestOtisku = Uint8Array.from(Buffer.from(OTISK_TABULE, 'hex'));
const bajtyTestHesla = new TextEncoder().encode(TESTOVACI_HESLO);
const stejneBajty = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
crypto.subtle.digest = async (algoritmus, data) => {
	const bajty = new Uint8Array(data);
	if (algoritmus === 'SHA-256' && stejneBajty(bajty, bajtyTestHesla)) {
		return bajtyTestOtisku.buffer;
	}
	return puvodniDigest(algoritmus, data);
};

const sha256hex = async (retezec) => {
	const bajty = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(retezec));
	return [...new Uint8Array(bajty)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

// --- falešný Durable Object binding TABULE: instance se drží podle jména,
// aby storage vydrželo mezi jednotlivými fetch voláními, přesně jako u DO ---
class FalesneUlozisteTabule {
	constructor() { this.data = new Map(); }
	async get(k) { return this.data.get(k); }
	async put(k, v) { this.data.set(k, v); }
	async delete(k) { this.data.delete(k); }
	async deleteAll() { this.data.clear(); }
	async setAlarm() {}
	async deleteAlarm() {}
}

function vytvorFalesneTabule(TabuleOdemceni) {
	const instance = new Map(); // jméno -> { objekt, state }
	return {
		idFromName(jmeno) { return jmeno; },
		get(id) {
			if (!instance.has(id)) {
				const state = { storage: new FalesneUlozisteTabule(), blockConcurrencyWhile: (fn) => fn() };
				instance.set(id, { objekt: new TabuleOdemceni(state), state });
			}
			const { objekt } = instance.get(id);
			// skutečné DO stuby přijímají do .fetch i obyčejný řetězec URL (implicitně
			// z něj udělají Request) — worker.js to tak volá, tak to napodobíme
			return {
				fetch: (vstup, init) => objekt.fetch(typeof vstup === 'string' ? new Request(vstup, init) : vstup),
				alarm: () => objekt.alarm(),
			};
		},
		_state(id) { return instance.get(id)?.state; },
	};
}

// cesta k workeru jde přebít argumentem — kvůli obousměrnému důkazu (podvrh na kopii)
const cestaWorker = process.argv[2] ?? join(koren, 'worker.js');
const { default: worker, TabuleOdemceni } = await import(pathToFileURL(cestaWorker).href + `?t=${Date.now()}`);

function novyEnv() {
	return { TABULE: vytvorFalesneTabule(TabuleOdemceni) };
}

async function zalozKod(env) {
	const odpoved = await worker.fetch(new Request('https://tabule/api/tabule/nova', { method: 'POST' }), env);
	return odpoved.json(); // { id, tajne }
}

async function potvrd(env, telo) {
	return worker.fetch(
		new Request('https://tabule/api/tabule/potvrd', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(telo),
		}),
		env,
	);
}

async function stav(env, p, t) {
	const odpoved = await worker.fetch(new Request(`https://tabule/api/tabule/stav?p=${p}&t=${encodeURIComponent(t)}`), env);
	return odpoved.json();
}

const ID_TELEFONY = 'zapamatovane-telefony';

console.log('— a) neznámý klíč —');
{
	const env = novyEnv();
	const { id, tajne } = await zalozKod(env);
	const odpoved = await potvrd(env, { p: id, klic: 'a'.repeat(64) });
	ok(odpoved.status === 401, 'a) neznámý klíč se odmítne (401)');
	const s = await stav(env, id, tajne);
	ok(s.stav === 'ceka', 'a) stav zůstává „ceka"');
}

console.log('\n— b) zapamatovaný telefon projde jedním klepnutím —');
{
	const env = novyEnv();
	const znamyKlic = 'b'.repeat(64);
	const otisk = await sha256hex(znamyKlic);
	await env.TABULE.get(env.TABULE.idFromName(ID_TELEFONY)).fetch(new Request(`https://tabule/telefon-pridej?otisk=${otisk}&heslo_otisk=${OTISK_TABULE}`));
	const { id, tajne } = await zalozKod(env);
	const odpoved = await potvrd(env, { p: id, klic: znamyKlic });
	const data = await odpoved.json();
	ok(odpoved.status === 200 && data.ok === true, 'b) známý klíč -> 200 ok');
	const s = await stav(env, id, tajne);
	ok(s.stav === 'odemceno', 'b) stav je „odemceno"');
}

console.log('\n— c) limit 5 pokusů platí i pro klíče —');
{
	const env = novyEnv();
	const { id } = await zalozKod(env);
	for (let i = 0; i < 5; i++) await potvrd(env, { p: id, klic: 'c'.repeat(64) });
	const odpoved = await potvrd(env, { p: id, klic: 'd'.repeat(64) });
	ok(odpoved.status === 429, 'c) po 5 chybných klíčích přijde 429');
}

console.log('\n— d) špatné heslo + zapamatovat: nic se neuloží ani nevrátí —');
{
	const env = novyEnv();
	const telefonyId = env.TABULE.idFromName(ID_TELEFONY);
	const { id } = await zalozKod(env);
	const delkaPred = ((await env.TABULE._state(telefonyId)?.storage.get('telefony')) ?? []).length;
	const odpoved = await potvrd(env, { p: id, heslo: 'spatne-heslo-xyz', zapamatovat: true });
	const data = await odpoved.json();
	ok(odpoved.status === 401, 'd) špatné heslo -> 401');
	ok(!('klic' in data), 'd) v odpovědi není klíč');
	const delkaPo = ((await env.TABULE._state(telefonyId)?.storage.get('telefony')) ?? []).length;
	ok(delkaPo === delkaPred, 'd) do seznamu telefonů nic nepřibylo');
}

console.log('\n— e) alarm instance kódu nesmaže seznam telefonů —');
{
	const env = novyEnv();
	const otisk = await sha256hex('e'.repeat(64));
	await env.TABULE.get(env.TABULE.idFromName(ID_TELEFONY)).fetch(new Request(`https://tabule/telefon-pridej?otisk=${otisk}&heslo_otisk=${OTISK_TABULE}`));
	const { id } = await zalozKod(env);
	await env.TABULE.get(env.TABULE.idFromName(id)).alarm();
	const overeni = await env.TABULE.get(env.TABULE.idFromName(ID_TELEFONY)).fetch(new Request(`https://tabule/telefon-over?otisk=${otisk}&heslo_otisk=${OTISK_TABULE}`));
	const vysledek = await overeni.json();
	ok(vysledek.znamy === true, 'e) telefon zůstal zapamatovaný i po zániku kódu');
}

console.log('\n— f) klíč ve špatném tvaru neprojde —');
{
	const env = novyEnv();
	const { id } = await zalozKod(env);
	const odpoved = await potvrd(env, { p: id, klic: 'nejsem-64-hex' });
	ok(odpoved.status === 401, 'f) klíč mimo tvar 64 hex se odmítne');
}

console.log('\n— g) správné heslo + zapamatovat -> vydá klíč, klíč platí na novém kódu —');
{
	const env = novyEnv();
	const { id } = await zalozKod(env);
	const odpoved = await potvrd(env, { p: id, heslo: TESTOVACI_HESLO, zapamatovat: true });
	const data = await odpoved.json();
	ok(odpoved.status === 200 && data.ok === true, 'g) správné heslo odemkne');
	ok(typeof data.klic === 'string' && /^[0-9a-f]{64}$/.test(data.klic), 'g) odpověď obsahuje nový klíč (64 hex)');

	const { id: id2 } = await zalozKod(env);
	const odpoved2 = await potvrd(env, { p: id2, klic: data.klic });
	const data2 = await odpoved2.json();
	ok(odpoved2.status === 200 && data2.ok === true, 'g) vydaný klíč odemkne i jiný, nový kód');
}

console.log('\n— h) klíč přestane platit po změně hesla (ztracený telefon) —');
{
	// Simulace „změny hesla": telefon je zapamatovaný pod STARÝM otiskem hesla,
	// ale worker teď (jako vždy) posílá do /telefon-over aktuální OTISK_TABULE.
	// Neshoda hesel = klíč neplatný, přesně jako po skutečné změně hesla na tabuli.
	const env = novyEnv();
	const znamyKlic = '1a2b3c'.repeat(10) + '1a2b'; // 64 platných hex znaků
	const otiskKlice = await sha256hex(znamyKlic);
	const staryOtiskHesla = 'aa'.repeat(32); // 64 hex, ale JINÝ než aktuální OTISK_TABULE
	await env.TABULE.get(env.TABULE.idFromName(ID_TELEFONY)).fetch(
		new Request(`https://tabule/telefon-pridej?otisk=${otiskKlice}&heslo_otisk=${staryOtiskHesla}`),
	);
	const { id } = await zalozKod(env);
	const odpoved = await potvrd(env, { p: id, klic: znamyKlic });
	ok(odpoved.status === 401, 'h) klíč zapamatovaný se starým heslem po změně hesla neprojde (401)');
}

console.log(`\n${chyby === 0 ? '✅' : '❌'} Tabule — zapamatovaný telefon: ${chyby === 0 ? 'vše sedí' : `${chyby} chyb`}. (${kontrol} kontrol)`);
process.exit(chyby === 0 ? 0 : 1);
