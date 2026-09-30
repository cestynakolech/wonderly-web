#!/usr/bin/env node
// Ověření KladkaSimulace.astro (F7, jednoduché stroje): spustí SKUTEČNÝ skript
// komponenty v Node s náhradním DOM, nechá doběhnout animaci podle času
// a proměří, co scéna žákovi ukazuje.
//
// SMYSL scény podle výkladu podtématu „kladka“ a obrázků kladka-obr-01/02
// (opora: Omega/dokumenty/prezentace-popisy/7 Síla.md sn. 59–60):
//   · závaží 2 kg, tíha 20 N (g = 10 N/kg), zdvih 1 m,
//   · PEVNÁ kladka: ruka táhne DOLŮ silou 20 N a vytáhne 1 m lana,
//   · VOLNÁ kladka: jeden konec lana upevněný ke stropu, lano vede POD kladkou,
//     na které visí závaží, druhý konec táhne ruka NAHORU silou 10 N;
//     závaží se zvedne o 1 m, ruka vytáhne 2 m lana — kóty to ukazují v obraze.
// Oprava nálezu 16 (kontrola T3c, 30. 9. 2026): dřív vedl tažný konec volné
// kladky do kroužku u stropu, šipka „táhneš 50 N“ mířila dolů a letěla
// s kladkou nahoru, dvojnásobná dráha lana v obraze nebyla a čísla 10 kg /
// 100 N / 50 N neodpovídala výkladu. Test hlídá, aby se to nevrátilo.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novyPrvek = (id) => {
	const p = {
		id, atributy: {}, textContent: '', innerHTML: '', style: {}, value: '', posluchaci: {},
		classList: {
			_t: new Set(),
			add(...t) { t.forEach((x) => this._t.add(x)); },
			remove(...t) { t.forEach((x) => this._t.delete(x)); },
			contains(t) { return this._t.has(t); },
		},
		setAttribute(k, v) { this.atributy[k] = String(v); },
		getAttribute(k) { return this.atributy[k]; },
		addEventListener(ev, fn) { (this.posluchaci[ev] ||= []).push(fn); },
	};
	prvky.set(id, p);
	return p;
};
novyPrvek('kl-pevna').classList.add('kl-akt'); // jako ve zdroji (class="kl-akt")
// hodiny a fronta requestAnimationFrame — animace se posouvá podle času
let ted = 0;
let fronta = [];
const document = { getElementById: (id) => prvky.get(id) || novyPrvek(id), querySelectorAll: () => [] };
const sandbox = { document, performance: { now: () => ted }, requestAnimationFrame: (f) => { fronta.push(f); return fronta.length; }, console, Math };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

let chyby = 0;
const ok = (p, t) => { console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (id) => (prvky.get(id).posluchaci.click || []).forEach((f) => f());
// posune hodiny o ms po krocích 16 ms a spouští naplánované snímky
function cekej(ms) {
	const konec = ted + ms;
	while (ted < konec) {
		ted = Math.min(konec, ted + 16);
		const f = fronta; fronta = [];
		f.forEach((fn) => fn());
	}
}
const obsah = () => prvky.get('kl-obsah').innerHTML;
const info = () => prvky.get('kl-info').innerHTML;
const ma = (kus, popis) => ok(obsah().includes(kus), `${popis}: ${kus}`);
const nema = (kus, popis) => ok(!obsah().includes(kus), `${popis} (nesmí být: ${kus})`);
const geo = prvky.get('kl-svg').__geometrieKladky;
const KOTA = 'stroke="#f59f00"';
const CARKOVANE = 'stroke-dasharray';
// všechna čísla, která scéna (SVG i věta pod ní) ukazuje
const cislaVeScene = () => [...(obsah().replace(/<[^>]+>/g, ' ') + ' ' + info().replace(/<[^>]+>/g, ' ')).matchAll(/\d+/g)].map((m) => Number(m[0]));

console.log('— čísla podle výkladu: 2 kg, 20 N, 10 N, 1 m, 2 m —');
ok(geo(false, 0).sila === 20 && geo(false, 1).sila === 20, `pevná kladka: táhneme silou 20 N = tíha závaží (je ${geo(false, 0).sila})`);
ok(geo(true, 0).sila === 10 && geo(true, 1).sila === 10, `volná kladka: táhneme silou 10 N = 20 : 2 (je ${geo(true, 0).sila})`);
ok(geo(true, 0).sila + geo(true, 0).sila === geo(false, 0).sila, 'volná: strop 10 N + ruka 10 N = tíha 20 N');
ok(geo(false, 1).drahaLana === 1, `pevná: ruka vytáhne 1 m lana (je ${geo(false, 1).drahaLana})`);
ok(geo(true, 1).drahaLana === 2, `volná: ruka vytáhne 2 m lana (je ${geo(true, 1).drahaLana})`);

console.log('— geometrie: kam se co posune (1 m = 60 px) —');
{
	const p0 = geo(false, 0), p1 = geo(false, 1);
	ok(p0.bremenoY === 250 && p1.bremenoY === 190, `pevná: závaží z 250 do 190 px, tedy o 60 px = 1 m nahoru (je ${p0.bremenoY} → ${p1.bremenoY})`);
	ok(p0.rukaY === 120 && p1.rukaY === 180, `pevná: ruka z 120 do 180 px, tedy o 60 px DOLŮ (je ${p0.rukaY} → ${p1.rukaY})`);
	ok(p0.ky === 60 && p1.ky === 60, 'pevná kladka se neposouvá (ky = 60)');
	const v0 = geo(true, 0), v1 = geo(true, 1), vp = geo(true, 0.5);
	ok(v0.ky === 260 && v1.ky === 200, `volná kladka jede se závažím nahoru o 60 px (je ${v0.ky} → ${v1.ky})`);
	ok(v0.bremenoY === 300 && v1.bremenoY === 240, `volná: závaží visí pod kladkou a stoupá o 60 px = 1 m (je ${v0.bremenoY} → ${v1.bremenoY})`);
	ok(v0.rukaY === 155 && v1.rukaY === 35, `volná: ruka jede NAHORU o 120 px = 2 m (je ${v0.rukaY} → ${v1.rukaY})`);
	ok(v0.rukaY - v1.rukaY === 2 * (v0.bremenoY - v1.bremenoY), 'volná: ruka ujede dvakrát delší dráhu než závaží');
	ok(vp.bremenoY === 270 && vp.rukaY === 95, `v půlce zdvihu: závaží 270, ruka 95 — poměr 1 : 2 platí i během tahu (je ${vp.bremenoY}, ${vp.rukaY})`);
	// nález 2 kontroly oprav: čárkovaný obrys výchozí polohy ruky (spodek rukaY0 + 11) nesmí po zvednutí zmizet pod kotoučem (horní hrana ky − 26)
	ok(v0.rukaY + 11 < v1.ky - 26, `obrys výchozí polohy ruky (spodek ${v0.rukaY + 11}) leží nad zvednutou kladkou (horní hrana ${v1.ky - 26})`);
	ok(v1.rukaY - 11 > 18, `ruka se po zvednutí nedotkne stropu (horní hrana ${v1.rukaY - 11} > 18)`);
	ok(v0.bremenoY + 74 <= 390, `šipka tíhy se vejde do scény i na startu (konec ${v0.bremenoY + 74} ≤ 390)`);
	const delka = (g) => (g.ky - 18) + (g.ky - g.rukaY); // svislé části lana (půlkruh pod kladkou je stálý)
	ok([0, 0.25, 0.5, 0.75, 1].every((z) => delka(geo(true, z)) === delka(v0)), `volná: lano se nenatahuje — délka ${delka(v0)} px je stálá po celý tah`);
}

console.log('— pevná kladka, klid —');
ok(prvky.get('kl-pevna').classList.contains('kl-akt') && !prvky.get('kl-volna').classList.contains('kl-akt'), 'zvýrazněná je pevná kladka');
ma('<circle cx="210" cy="60" r="28"', 'kolo pevné kladky u stropu');
ma('<path d="M182 60 A28 28 0 0 1 238 60"', 'lano vede PŘES kladku (oblouk nahoře)');
ma('<line x1="182" y1="60" x2="182" y2="250"', 'levá část lana vede k závaží');
ma('<line x1="238" y1="60" x2="238" y2="120"', 'pravá část lana vede k ruce');
ma('<rect x="158" y="250" width="48" height="44"', 'závaží dole');
ma('<text x="182" y="278" text-anchor="middle" font-size="14" font-weight="bold" fill="#fff">2 kg</text>', 'na závaží stojí 2 kg');
ma('<rect x="228" y="109" width="20" height="22" rx="6" fill="#f4c7a1"', 'ruka na konci lana');
ma('<line x1="238" y1="131" x2="238" y2="165"', 'dřík šipky ruky');
ma('<polygon points="232,163 244,163 238,171"', 'hrot šipky ruky míří DOLŮ (hrot 171 pod základnou 163)');
ma('<text x="246" y="160" text-anchor="start" font-size="14" font-weight="bold" fill="#e03131">táhneš 20 N</text>', 'popisek síly ruky');
ma('<line x1="182" y1="294" x2="182" y2="318"', 'dřík šipky tíhy pod závažím');
ma('<polygon points="176,316 188,316 182,324"', 'šipka tíhy míří dolů');
ma('<text x="214" y="316" text-anchor="start" font-size="14" font-weight="bold" fill="#e03131">tíha 20 N</text>', 'popisek tíhy');
nema(KOTA, 'v klidu se nekreslí žádná kóta');
nema(CARKOVANE, 'v klidu se nekreslí čárkovaná výchozí poloha');
ok(/táhneš dolů silou <strong>20 N<\/strong>/.test(info()) && /Závaží 2 kg má tíhu <strong>20 N<\/strong>/.test(info()), `věta pod scénou: ${info().slice(0, 90)}`);

console.log('— pevná kladka, animace podle času —');
klik('kl-tahni');
cekej(750);
ma('<rect x="158" y="220" width="48" height="44"', 'po 0,75 s je závaží v půlce (220)');
ma('<rect x="228" y="139" width="20" height="22" rx="6" fill="#f4c7a1"', 'ruka v půlce (150)');
ok(obsah().includes(KOTA) && !/>\d+ m</.test(obsah()), 'během tahu roste kóta, ale ještě bez popisku (necelé metry se nepíší)');
cekej(750);
ok(fronta.length === 0, `po 1,5 s animace skončila, žádný další snímek (ve frontě ${fronta.length})`);
ma('<rect x="158" y="190" width="48" height="44"', 'závaží zvednuto o 1 m (190)');
ma('<rect x="228" y="169" width="20" height="22" rx="6" fill="#f4c7a1"', 'ruka stáhla lano o 1 m dolů (180)');
ma('<line x1="182" y1="60" x2="182" y2="190"', 'levá část lana se zkrátila');
ma('<line x1="238" y1="60" x2="238" y2="180"', 'pravá část lana se prodloužila');
ma('<line x1="120" y1="250" x2="120" y2="190" stroke="#f59f00" stroke-width="3" />', 'kóta zdvihu závaží 250 → 190');
ma('<line x1="113" y1="250" x2="127" y2="250" stroke="#f59f00"', 'dolní příčka kóty závaží');
ma('<line x1="113" y1="190" x2="127" y2="190" stroke="#f59f00"', 'horní příčka kóty závaží');
ma('<text x="112" y="225" text-anchor="end" font-size="15" font-weight="bold" fill="#2b2a26">1 m</text>', 'kóta závaží hlásí 1 m');
ma('<line x1="360" y1="120" x2="360" y2="180" stroke="#f59f00" stroke-width="3" />', 'kóta lana u ruky 120 → 180');
ma('<text x="368" y="155" text-anchor="start" font-size="15" font-weight="bold" fill="#2b2a26">1 m</text>', 'u pevné kladky ruka vytáhne také 1 m');
ma('<line x1="158" y1="250" x2="120" y2="250" stroke="#adb5bd" stroke-width="2" stroke-dasharray="4 4" />', 'vodicí linka od výchozí polohy závaží ke kótě');
ma('<line x1="248" y1="180" x2="360" y2="180" stroke="#adb5bd" stroke-width="2" stroke-dasharray="4 4" />', 'vodicí linka od ruky ke kótě');
ma('<rect x="158" y="250" width="48" height="44" rx="5" fill="none" stroke="#adb5bd" stroke-width="2" stroke-dasharray="5 4" />', 'čárkovaná výchozí poloha závaží');
ma('<rect x="228" y="109" width="20" height="22" rx="6" fill="none"', 'čárkovaná výchozí poloha ruky');
ok(/Táhl jsi silou <strong>20 N<\/strong> a vytáhl <strong>1 m<\/strong> lana/.test(info()) && /Zvednuto o 1 m/.test(info()), `po zvednutí: ${info().slice(0, 100)}`);
{
	const pred = obsah();
	klik('kl-tahni'); cekej(100);
	ok(obsah() === pred && fronta.length === 0, 'druhé „Táhni“ po zvednutí nic nezmění (nejdřív Zpět)');
}
klik('kl-reset');
ma('<rect x="158" y="250" width="48" height="44"', '„Zpět“ vrátí závaží dolů');
nema(KOTA, 'po „Zpět“ zmizí kóty');

console.log('— „Zpět“ a přepnutí zastaví rozběhnutou animaci (nález 1 kontroly oprav) —');
klik('kl-tahni'); cekej(300);
klik('kl-reset'); cekej(2000);
ma('<rect x="158" y="250" width="48" height="44"', '„Zpět“ uprostřed tahu: závaží zůstane dole i po 2 s');
nema(KOTA, '„Zpět“ uprostřed tahu: žádné kóty ani po 2 s');
ok(fronta.length === 0, 'po „Zpět“ neběží žádná animace');
klik('kl-tahni'); cekej(300);
klik('kl-volna'); cekej(2000);
ma('<circle cx="210" cy="260" r="26"', 'přepnutí na volnou uprostřed tahu: volná kladka se sama nezvedne');
nema(KOTA, 'přepnutí uprostřed tahu: žádné kóty');
klik('kl-tahni'); cekej(300);
klik('kl-pevna'); cekej(2000);
ma('<rect x="158" y="250" width="48" height="44"', 'přepnutí na pevnou uprostřed tahu: závaží zůstane dole');
klik('kl-tahni'); cekej(1600);
ma('<rect x="158" y="190" width="48" height="44"', 'po zastavení jde táhnout znovu až nahoru');
klik('kl-reset');

console.log('— přístupnost (nález 4 kontroly oprav) —');
ok(/<p id="kl-info" class="kl-info" aria-live="polite">/.test(zdroj), 'věta pod scénou má aria-live="polite"');
ok(/id="kl-pevna"[^>]*aria-pressed="true"/.test(zdroj) && /id="kl-volna"[^>]*aria-pressed="false"/.test(zdroj), 'přepínače mají ve zdroji aria-pressed (pevná zvolená)');
ok(prvky.get('kl-svg').getAttribute('aria-label') === 'Pevná kladka se závažím 2 kg, závaží dole', `popis scény: ${prvky.get('kl-svg').getAttribute('aria-label')}`);

console.log('— přepnutí druhu kladky vždy začíná od klidu —');
klik('kl-tahni'); cekej(1600);
klik('kl-volna');
ok(prvky.get('kl-volna').classList.contains('kl-akt') && !prvky.get('kl-pevna').classList.contains('kl-akt'), 'zvýrazněná je volná kladka');
ok(prvky.get('kl-volna').getAttribute('aria-pressed') === 'true' && prvky.get('kl-pevna').getAttribute('aria-pressed') === 'false', 'aria-pressed: volná true, pevná false');
ok(prvky.get('kl-svg').getAttribute('aria-label') === 'Volná kladka se závažím 2 kg, závaží dole', `popis scény: ${prvky.get('kl-svg').getAttribute('aria-label')}`);
nema(KOTA, 'volná kladka po přepnutí začíná v klidu');

console.log('— volná kladka, klid: strop drží jeden konec, ruka táhne NAHORU —');
ma('<circle cx="236" cy="18" r="4" fill="#2b2a26" />', 'pravý konec lana je upevněný ke stropu (bod na stropu)');
ma('<line x1="236" y1="18" x2="236" y2="260"', 'pravá část lana vede ze stropu dolů ke kladce');
ma('<circle cx="210" cy="260" r="26"', 'volná kladka visí na laně');
ma('<path d="M184 260 A26 26 0 0 0 236 260"', 'lano vede POD kladkou (oblouk dole)');
ma('<line x1="184" y1="260" x2="184" y2="155"', 'levá část lana vede z kladky NAHORU k ruce');
ma('<line x1="210" y1="260" x2="210" y2="300"', 'závaží visí na ose kladky');
ma('<rect x="186" y="300" width="48" height="44"', 'závaží pod kladkou');
ma('<rect x="174" y="144" width="20" height="22" rx="6" fill="#f4c7a1"', 'ruka drží volný konec lana');
ma('<line x1="212" y1="175" x2="212" y2="153"', 'dřík šipky ruky (vpravo od ruky)');
ma('<polygon points="206,155 218,155 212,147"', 'hrot šipky ruky míří NAHORU (hrot 147 nad základnou 155)');
ma('<text x="166" y="185" text-anchor="end" font-size="14" font-weight="bold" fill="#e03131">táhneš 10 N</text>', 'popisek síly ruky 10 N');
ma('<text x="244" y="210" font-size="14" font-weight="bold" fill="#1971c2">strop drží 10 N</text>', 'popisek: strop drží 10 N');
ma('<line x1="210" y1="344" x2="210" y2="368"', 'dřík šipky tíhy');
ma('<text x="242" y="366" text-anchor="start" font-size="14" font-weight="bold" fill="#e03131">tíha 20 N</text>', 'popisek tíhy 20 N');
{
	// dřívější vada: tažný konec vedl do šedého kroužku u stropu (skrytá pevná kladka)
	const koncuUStropu = [...obsah().matchAll(/<line x1="(\d+)" y1="18"/g)].map((m) => m[1]);
	ok(JSON.stringify(koncuUStropu) === '["236"]', `u stropu končí jediná část lana, ta upevněná (x = ${koncuUStropu.join(', ')})`);
	nema('<circle cx="236" cy="18" r="7"', 'u volné kladky už není skrytá kladka u stropu');
}
nema(KOTA, 'v klidu bez kót');
ok(/ty táhneš nahoru 10 N/.test(info().replace(/<\/?strong>/g, '')) && /10 \+ 10 = 20 N/.test(info()), `věta: ${info().slice(0, 110)}`);

console.log('— volná kladka, půlka tahu —');
klik('kl-tahni'); cekej(750);
ma('<circle cx="210" cy="230" r="26"', 'kladka v půlce (230)');
ma('<rect x="174" y="84" width="20" height="22" rx="6" fill="#f4c7a1"', 'ruka už ujela 60 px (95), dvakrát víc než závaží');
ok(!/>\d+ m</.test(obsah()), 'během tahu bez popisků kót');
ok(prvky.get('kl-svg').getAttribute('aria-label') === 'Volná kladka se závažím 2 kg, závaží se zvedá', `popis scény během tahu: ${prvky.get('kl-svg').getAttribute('aria-label')}`);

console.log('— volná kladka, po zvednutí: kóty 1 m a 2 m —');
cekej(800);
ok(fronta.length === 0, 'animace skončila');
ma('<line x1="236" y1="18" x2="236" y2="200"', 'upevněná část lana se zkrátila jen o 60 px');
ma('<circle cx="210" cy="200" r="26"', 'kladka zvednutá o 1 m');
ma('<line x1="184" y1="200" x2="184" y2="35"', 'levá část lana: z kladky k ruce');
ma('<rect x="186" y="240" width="48" height="44"', 'závaží zvednuté o 1 m (240)');
ma('<rect x="174" y="24" width="20" height="22" rx="6" fill="#f4c7a1"', 'ruka vytáhla lano o 2 m (35)');
ma('<line x1="212" y1="55" x2="212" y2="33"', 'šipka ruky jede s rukou');
ma('<text x="166" y="65" text-anchor="end"', 'popisek síly ruky jede s rukou');
ma('<text x="244" y="150" font-size="14" font-weight="bold" fill="#1971c2">strop drží 10 N</text>', 'popisek stropu jede s kladkou');
ma('<line x1="110" y1="300" x2="110" y2="240" stroke="#f59f00" stroke-width="3" />', 'kóta zdvihu závaží 300 → 240 (60 px)');
ma('<text x="102" y="275" text-anchor="end" font-size="15" font-weight="bold" fill="#2b2a26">1 m</text>', 'kóta závaží: 1 m');
ma('<line x1="44" y1="155" x2="44" y2="35" stroke="#f59f00" stroke-width="3" />', 'kóta lana u ruky 155 → 35 (120 px, dvakrát delší)');
ma('<line x1="37" y1="35" x2="51" y2="35" stroke="#f59f00"', 'horní příčka kóty lana');
ma('<text x="36" y="100" text-anchor="end" font-size="15" font-weight="bold" fill="#2b2a26">2 m</text>', 'kóta lana: 2 m');
ma('<line x1="186" y1="300" x2="110" y2="300" stroke="#adb5bd" stroke-width="2" stroke-dasharray="4 4" />', 'vodicí linka výchozí polohy závaží');
ma('<line x1="174" y1="35" x2="44" y2="35" stroke="#adb5bd" stroke-width="2" stroke-dasharray="4 4" />', 'vodicí linka konečné polohy ruky');
ma('<rect x="186" y="300" width="48" height="44" rx="5" fill="none"', 'čárkovaná výchozí poloha závaží');
ma('<rect x="174" y="144" width="20" height="22" rx="6" fill="none"', 'čárkovaná výchozí poloha ruky');
{
	// nález 3 kontroly oprav: vodicí linky kóty lana (vodorovné, končí u ruky x ≤ 174) nesmí křížit šipku ruky
	const linky = [...obsah().matchAll(/<line x1="(\d+)" y1="(\d+)" x2="(\d+)" y2="\2" stroke="#adb5bd"/g)].map((m) => [Number(m[1]), Number(m[3]), Number(m[2])]);
	const sipka = obsah().match(/<line x1="(\d+)" y1="(\d+)" x2="\1" y2="(\d+)" stroke="#e03131"/).slice(1).map(Number);
	const krizi = linky.filter(([a, b, y]) => Math.min(a, b) <= sipka[0] && sipka[0] <= Math.max(a, b) && Math.min(sipka[1], sipka[2]) - 8 <= y && y <= Math.max(sipka[1], sipka[2]));
	ok(linky.length === 4 && krizi.length === 0, `žádná ze ${linky.length} vodicích linek nekříží šipku ruky (x ${sipka[0]}, y ${sipka[2] - 8}–${sipka[1]})`);
}
ok(prvky.get('kl-svg').getAttribute('aria-label') === 'Volná kladka se závažím 2 kg, závaží zvednuto o 1 m', `popis scény po zvednutí: ${prvky.get('kl-svg').getAttribute('aria-label')}`);
ok(/vytáhl <strong>2 m<\/strong> lana/.test(info()) && /Zvednuto o 1 m poloviční silou/.test(info()), `po zvednutí: ${info().slice(0, 90)}`);

klik('kl-pevna');
ma('<rect x="158" y="250" width="48" height="44"', 'přepnutí zpět na pevnou kladku začíná se závažím dole');
nema(KOTA, 'po přepnutí na pevnou kladku nejsou kóty');
ok(prvky.get('kl-pevna').classList.contains('kl-akt') && !prvky.get('kl-volna').classList.contains('kl-akt'), 'zvýrazněná je zase pevná kladka');

console.log('— scéna neukazuje čísla, která výklad nemá —');
{
	const vsechna = new Set();
	klik('kl-pevna'); cislaVeScene().forEach((c) => vsechna.add(c));
	klik('kl-tahni'); cekej(1600); cislaVeScene().forEach((c) => vsechna.add(c));
	klik('kl-volna'); cislaVeScene().forEach((c) => vsechna.add(c));
	klik('kl-tahni'); cekej(1600); cislaVeScene().forEach((c) => vsechna.add(c));
	const dovolena = [1, 2, 10, 20];
	ok([...vsechna].every((c) => dovolena.includes(c)), `čísla ve scéně ${JSON.stringify([...vsechna].sort((a, b) => a - b))} ⊆ výklad ${JSON.stringify(dovolena)}`);
	ok(!/50 N|100 N|10 kg/.test(zdroj), 've zdroji už není 50 N, 100 N ani 10 kg');
}

console.log(chyby ? `\n❌ ${chyby} chyb` : '\n✅ vše sedí');
process.exit(chyby ? 1 : 0);
