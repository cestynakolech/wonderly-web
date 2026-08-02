#!/usr/bin/env node
// Ověření UdalostiSimulace.astro — události a vstupy (klobouky, klávesnice, klik na postavu).
// Spouští SKUTEČNÝ <script> komponenty v náhradním DOM (node:vm), žádný prohlížeč.
//
// Hlavní hlídaná pointa: scénář BEZ klobouku události se nesmí spustit nikdy a nikdy —
// a zelená vlajka s takovou postavou nesmí hnout. Kdyby to někdo „opravil" tak, že se
// míč vrací na start i bez klobouku, celý smysl stránky padne a spadne to tady.
//
// Mutační test (`node testy/mutace.mjs udalosti`): 17 z 19 mutací odhaleno. Zbylé dvě
// posouvají mez pohybu o 1 px (OKRAJ_X, OKRAJ_Y) — na chování ani na obrázku se tím nic
// nezmění, postava se pořád vejde celá do rámečku. Jsou to ekvivalentní mutace, ne mezera.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const zdroj = readFileSync(process.argv[2], 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];

const prvky = new Map();
const novy = (id) => {
	const p = {
		id, atributy: {}, innerHTML: '', style: {}, dataset: {}, posluchaci: {}, deti: [],
		_text: '',
		get textContent() { return this._text; },
		// `textContent = ''` musí smazat i děti, jinak by se vypsané scénáře při každém
		// překreslení hromadily a kontroly zvýraznění by měřily nesmysl.
		set textContent(v) { this._text = String(v); if (v === '') this.deti = []; },
		classList: { tridy: new Set(), add(t) { this.tridy.add(t); }, remove(t) { this.tridy.delete(t); }, contains(t) { return this.tridy.has(t); } },
		// V prohlížeči jsou `className` a `classList` DVA pohledy na totéž. Když je atrapa
		// nechá oddělené, `classList.contains(…)` po zápisu do `className` mlčky vrací false
		// a kontrola zvýraznění měří nesmysl. (Tady to naštěstí spadlo nahlas.)
		get className() { return [...this.classList.tridy].join(' '); },
		set className(v) { this.classList.tridy = new Set(String(v).split(/\s+/).filter(Boolean)); },
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
	'.uda-udalost': [
		tl({ udalost: 'vlajka' }, 'u-vlajka'), tl({ udalost: 'vlevo' }, 'u-vlevo'),
		tl({ udalost: 'vpravo' }, 'u-vpravo'), tl({ udalost: 'mezernik' }, 'u-mezera'),
		tl({ udalost: 'klikMic' }, 'u-mic'),
	],
	'.uda-mic': [tl({ mic: 'ano' }, 'p-ano'), tl({ mic: 'ne' }, 'p-ne')],
};
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll: (s) => skupiny[s] || [],
	createElement: () => novy('e' + Math.random()),
	createElementNS: () => novy('e' + Math.random()),
};
const sandbox = { document, console, Array, Math, String, Object, Number };
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

const svg = prvky.get('uda-svg');
const stavEl = prvky.get('uda-stav');
const scenareEl = prvky.get('uda-scenare');
const kockaG = prvky.get('uda-kocka-g');
const micG = prvky.get('uda-mic-g');
const kockaPopis = prvky.get('uda-kocka-popis');
const btnReset = prvky.get('uda-reset');

let chyby = 0;
let kontrol = 0;
const ok = (p, t) => { kontrol++; console.log(`${p ? '✅' : '❌'} ${t}`); if (!p) chyby++; };
const klik = (el) => (el.posluchaci.click || []).forEach((f) => f());
const tlacitko = (sel, i) => skupiny[sel][i];

const { KROK, SKOK_MICE, OKRAJ_X, OKRAJ_Y, MERITKO, START_KOCKA, START_MIC } = svg.__meze;
const S = (seznam, volby) => svg.__stavPoUdalostech(seznam, volby);
const MA = { micMaUdalosti: true };
const NEMA = { micMaUdalosti: false };

// ———————————————————————— 1) KRESLENÍ SCÉNY
{
	const stred = svg.__naScenu(0, 0);
	ok(stred.px === 200 && stred.py === 150, 'střed scény (0, 0) je uprostřed obrázku');

	const nahore = svg.__naScenu(0, 100);
	const dole = svg.__naScenu(0, -100);
	ok(nahore.py < dole.py, 'kladné y je na obrazovce NAHOŘE (děti to pletou s řádky tabulky)');

	const vpravo = svg.__naScenu(100, 0);
	ok(vpravo.px > stred.px, 'kladné x je vpravo');

	// Stejné měřítko obou os — jinak by se kruh nakreslil jako elipsa a čtverec jako obdélník.
	const dx = (svg.__naScenu(60, 0).px - stred.px) / 60;
	const dy = (stred.py - svg.__naScenu(0, 60).py) / 60;
	ok(Math.abs(dx - dy) < 1e-9, `měřítko obou os je stejné (${dx.toFixed(4)})`);
	// Porovnává se s natvrdo napsaným poměrem, NE s konstantou z komponenty — jinak by
	// tvrzení bylo opisem vlastního kódu a přizpůsobilo by se každé hodnotě (nález kontrolora).
	ok(Math.abs(dx - 400 / 480) < 1e-9, 'měřítko odpovídá poměru scény 480 × 360 → 400 × 300 px');

	// Postava se u okraje musí vejít CELÁ do rámečku (rámeček je 1…399).
	const R_KOCKA = 19;
	const vpravoKraj = svg.__naScenu(OKRAJ_X, 0).px + R_KOCKA;
	const vlevoKraj = svg.__naScenu(-OKRAJ_X, 0).px - R_KOCKA;
	ok(vpravoKraj <= 397 && vlevoKraj >= 3, `kočka se na kraji vejde do rámečku (${vlevoKraj.toFixed(0)}…${vpravoKraj.toFixed(0)} px)`);
	const R_MIC = 15;
	ok(svg.__naScenu(0, OKRAJ_Y).py - R_MIC >= 3, 'míč se nahoře vejde do rámečku');

	ok(svg.__vRamci(-50) === 40 && svg.__vRamci(500) === 360, 'popisek souřadnic se u kraje zarazí a neutrhne se ven');
	ok(svg.__vRamci(200) === 200, 'uprostřed scény popisek nikam neuhýbá');
}

// ———————————————————————— 2) UDÁLOST SPOUŠTÍ SCÉNÁŘE (a klobouk rozhoduje)
{
	const zac = S([], MA);
	ok(zac.kocka.x === START_KOCKA.x && zac.kocka.y === START_KOCKA.y, 'na začátku stojí kočka na svém startu');
	ok(zac.mic.x === START_MIC.x && zac.mic.y === START_MIC.y, 'na začátku stojí míč na svém startu');
	ok(zac.spustene.length === 0 && zac.celkem === 0, 'dokud žádná událost nenastane, nespustí se nic');

	ok(svg.__scenareProUdalost('vlajka', MA).length === 2, 'zelená vlajka spustí DVA scénáře naráz (kočka i míč)');
	ok(svg.__scenareProUdalost('vlajka', NEMA).length === 1, 'bez klobouku u míče spustí vlajka jediný scénář');
	ok(svg.__scenareProUdalost('klikMic', NEMA).length === 0, 'klik na míč bez klobouku nespustí nic');
	ok(svg.__scenareProUdalost('klikMic', MA).length === 1, 'klik na míč s kloboukem spustí jeho scénář');
	ok(svg.__scenareProUdalost('vlevo', MA).length === 1 && svg.__scenareProUdalost('vpravo', MA).length === 1,
		'každá šipka má vlastní scénář');
	ok(svg.__scenareProUdalost('neznama-udalost', MA).length === 0, 'událost, kterou nikdo neposlouchá, nespustí nic');

	// Scénář bez klobouku se nesmí spustit ŽÁDNOU událostí — ani omylem přes null.
	const vsechny = ['vlajka', 'vlevo', 'vpravo', 'mezernik', 'klikMic', null, undefined];
	const kdykoliv = vsechny.flatMap((u) => svg.__scenareProUdalost(u, NEMA));
	ok(!kdykoliv.some((id) => id.startsWith('m-bez')), 'bloky bez klobouku nespustí ANI JEDNA událost (ani prázdná)');
}

// ———————————————————————— 3) CO SCÉNÁŘE UDĚLAJÍ
{
	ok(S(['vpravo'], MA).kocka.x === START_KOCKA.x + KROK, 'šipka vpravo posune kočku o krok doprava');
	ok(S(['vlevo'], MA).kocka.x === START_KOCKA.x - KROK, 'šipka vlevo posune kočku doleva');
	ok(S(['vpravo', 'vlevo'], MA).kocka.x === START_KOCKA.x, 'tam a zpět vrátí kočku na totéž místo');
	ok(S(['mezernik'], MA).bublina === 'mňau!', 'mezerník ukáže bublinu');
	ok(S(['mezernik', 'vlajka'], MA).bublina === '', 'zelená vlajka bublinu zruší (prázdná bublina)');
	ok(S(['vpravo', 'vpravo', 'vlajka'], MA).kocka.x === START_KOCKA.x, 'vlajka vrátí kočku na start');
	ok(S(['klikMic'], MA).mic.y === START_MIC.y + SKOK_MICE, 'klik na míč ho zvedne o 20');
	ok(S(['klikMic'], MA).mic.x === START_MIC.x, 'klik na míč mění jen y, x zůstává');

	// ★ Hlavní pointa stránky.
	const zvednuty = S(['klikMic', 'klikMic'], MA).mic.y;
	const poVlajce = svg.__provedUdalost(S(['klikMic', 'klikMic'], MA), 'vlajka', NEMA);
	ok(poVlajce.mic.y === zvednuty, '★ s míčem bez klobouku události zelená vlajka NEHNE');
	ok(poVlajce.kocka.x === START_KOCKA.x, '★ …zatímco kočka se toutéž vlajkou na start vrátí');
	ok(svg.__provedUdalost(S(['klikMic', 'klikMic'], MA), 'vlajka', MA).mic.y === START_MIC.y,
		's kloboukem se míč na start vrátí');

	ok(S(['vpravo', 'klikMic', 'mezernik'], MA).celkem === 3, 'počítadlo sečte všechny spuštěné scénáře');
	ok(S(['klikMic'], NEMA).celkem === 0, 'nespuštěné scénáře se do počítadla nepočítají');
}

// ———————————————————————— 4) MEZE A CELÁ ČÍSLA
{
	const daleko = S(Array(60).fill('vpravo'), MA);
	ok(daleko.kocka.x === OKRAJ_X, 'kočka se u okraje scény zastaví a nejde dál');
	const dozadu = S(Array(60).fill('vlevo'), MA);
	ok(dozadu.kocka.x === -OKRAJ_X, 'a stejně tak na druhé straně');
	const vysoko = S(Array(40).fill('klikMic'), MA);
	ok(vysoko.mic.y === OKRAJ_Y, 'míč se zastaví u horního okraje');

	const namatkou = ['vpravo', 'klikMic', 'vlevo', 'mezernik', 'vlajka', 'vpravo', 'klikMic', 'vlevo'];
	const s = S(namatkou, MA);
	const cela = Number.isInteger(s.kocka.x) && Number.isInteger(s.kocka.y) && Number.isInteger(s.mic.x) && Number.isInteger(s.mic.y);
	ok(cela, 'souřadnice zůstávají celá čísla i po namátkové posloupnosti událostí');
	ok(Math.abs(s.kocka.x) <= OKRAJ_X && Math.abs(s.mic.y) <= OKRAJ_Y, 'postavy nikdy neopustí scénu');

	// Čistá funkce: stejný vstup → stejný výstup, a starý stav se nezmění.
	const a = S(namatkou, MA);
	const b = S(namatkou, MA);
	ok(JSON.stringify(a) === JSON.stringify(b), 'stav je čistá funkce posloupnosti událostí (dvakrát totéž)');
	const puvodni = S(['vpravo'], MA);
	const kopie = JSON.stringify(puvodni);
	svg.__provedUdalost(puvodni, 'vlajka', MA);
	ok(JSON.stringify(puvodni) === kopie, 'provedení události původní stav nepřepisuje');
}

// ———————————————————————— 5) KLÁVESNICE
{
	ok(svg.__udalostZKlavesy('ArrowLeft') === 'vlevo', 'šipka vlevo je namapovaná');
	ok(svg.__udalostZKlavesy('ArrowRight') === 'vpravo', 'šipka vpravo je namapovaná');
	ok(svg.__udalostZKlavesy(' ') === 'mezernik', 'mezerník je namapovaný');
	ok(svg.__udalostZKlavesy('ArrowUp') === null && svg.__udalostZKlavesy('a') === null && svg.__udalostZKlavesy('Enter') === null,
		'klávesy, které v programu nejsou, nedělají nic');

	const posluchac = (svg.posluchaci.keydown || [])[0];
	ok(typeof posluchac === 'function', 'scéna poslouchá klávesnici');

	// Šipka nahoru se nesmí „ukrást" stránce — jinak by simulace zablokovala rolování.
	let zabraneno = false;
	posluchac({ key: 'ArrowUp', preventDefault: () => { zabraneno = true; } });
	ok(zabraneno === false, 'nepoužitá klávesa se stránce nekrade (rolování zůstane funkční)');

	const predtim = svg.__stav().kocka.x;
	posluchac({ key: 'ArrowRight', preventDefault: () => {} });
	ok(svg.__stav().kocka.x === predtim + KROK, 'stisk šipky opravdu pohne postavou');
	posluchac({ key: 'ArrowLeft', preventDefault: () => {} });
}

// ———————————————————————— 6) CO ŽÁK VIDÍ (DOM)
{
	klik(btnReset);
	ok(svg.__stav().kocka.x === START_KOCKA.x && svg.__stav().mic.y === START_MIC.y, 'tlačítko ↺ vrátí obě postavy na start');

	klik(tlacitko('.uda-udalost', 0)); // vlajka
	const zvyraznene = scenareEl.deti.filter((d) => d.classList.contains('uda-nyni'));
	ok(zvyraznene.length === 2, 'po zelené vlajce svítí právě dva scénáře');
	ok(/naráz/i.test(stavEl.innerHTML), 'a hláška říká, že běžely NARÁZ');

	klik(tlacitko('.uda-udalost', 1)); // šipka vlevo
	ok(scenareEl.deti.filter((d) => d.classList.contains('uda-nyni')).length === 1, 'po šipce svítí jediný scénář');

	// Přepnutí na „bez klobouku": bloky zůstanou, jen je nemá co spustit.
	klik(tlacitko('.uda-mic', 1));
	ok(svg.__volby().micMaUdalosti === false, 'přepínač míči vzal klobouky');
	const scenareBez = svg.__scenare(svg.__volby());
	// Porovnávají se oba režimy mezi sebou, ne s opsanými literály: míči smí zmizet klobouk,
	// ale ani jeden blok práce. (Literál by se navíc musel opravovat při každé změně čísel.)
	const blokyMice = (v) => svg.__scenare(v).filter((s) => s.postava.includes('míč')).flatMap((s) => s.telo).sort();
	ok(JSON.stringify(blokyMice(NEMA)) === JSON.stringify(blokyMice(MA)),
		'★ míči zůstaly STEJNÉ bloky — zmizel jen klobouk, ne práce');
	ok(scenareBez.filter((s) => s.postava.includes('míč')).every((s) => s.klobouk === null), 'a žádný z nich už klobouk nemá');
	ok(scenareEl.deti.filter((d) => d.classList.contains('uda-nyni')).length === 0, 'po přepnutí nesvítí žádný scénář jako právě spuštěný');

	const micPred = { ...svg.__stav().mic };
	klik(tlacitko('.uda-udalost', 4)); // klik na míč
	ok(svg.__stav().mic.y === micPred.y, 'klik na míč bez klobouku s ním nehne');
	ok(/nespustil se žádný scénář/i.test(stavEl.innerHTML), 'a simulace to žákovi napíše (ne mlčky nic)');

	// Klik přímo na míč ve scéně dělá totéž co tlačítko.
	klik(tlacitko('.uda-mic', 0));
	const predKlikem = svg.__stav().mic.y;
	klik(micG);
	ok(svg.__stav().mic.y === predKlikem + SKOK_MICE, 'kliknout jde i přímo na míč ve scéně');

	ok(kockaG.getAttribute('transform').includes('translate'), 'kočka se opravdu překresluje na své místo');
	ok(kockaPopis.textContent.includes('x:') && kockaPopis.textContent.includes('y:'), 'u postavy jsou vidět její souřadnice');
	ok(scenareEl.deti.length === 6, 'v seznamu je všech šest scénářů');
	ok(svg.__scenare(MA).every((s) => s.telo.length > 0), 'žádný scénář není prázdný');
}

// ———————————————————————— 7) ČÍSLA V SIMULACI SOUHLASÍ S BLOKY, KTERÉ ŽÁK ČTE
//
// Doplněno po mutačním testu: kontroly výše braly krok i startovní polohu z `svg.__meze`,
// takže se přizpůsobily jakékoli hodnotě — byl to opis vlastního kódu, ne tvrzení.
// Tady se čísla čtou z TEXTU bloku na obrazovce. Kdyby simulace posouvala o jiný počet,
// než co má žák napsané v programu, stránka by lhala a spadne to tady.
{
	const scen = svg.__scenare(MA);
	const najdi = (id) => scen.find((s) => s.id === id);
	const cisla = (t) => (t.match(/-?\d+/g) ?? []).map(Number);

	const [sx, sy] = cisla(najdi('k-vlajka').telo[0]);   // „skoč na x: (-140) y: (0)"
	const poVlajce = S(['vpravo', 'vlajka'], MA);
	ok(poVlajce.kocka.x === sx && poVlajce.kocka.y === sy, 'vlajka postaví kočku přesně tam, kam říká její blok');
	ok(S([], MA).kocka.x === sx && S([], MA).kocka.y === sy, 'a na tomtéž místě kočka i začíná');

	const [mx, my] = cisla(najdi('m-vlajka').telo[0]);   // „skoč na x: (140) y: (-60)"
	ok(S([], MA).mic.x === mx && S([], MA).mic.y === my, 'míč začíná tam, kam ho posílá jeho blok');

	const krokVpravo = cisla(najdi('k-vpravo').telo[0])[0];   // „změň x o 10"
	ok(S(['vpravo'], MA).kocka.x - sx === krokVpravo, `šipka vpravo posune přesně o tolik, kolik říká blok (${krokVpravo})`);
	const krokVlevo = cisla(najdi('k-vlevo').telo[0])[0];     // „změň x o -10"
	ok(S(['vlevo'], MA).kocka.x - sx === krokVlevo, `šipka vlevo posune přesně o ${krokVlevo}`);
	const skok = cisla(najdi('m-klik').telo[0])[0];           // „změň y o 20"
	ok(S(['klikMic'], MA).mic.y - my === skok, `klik na míč ho zvedne přesně o ${skok}`);

	// Mez pohybu má být TĚSNĚ u okraje — ne někde uprostřed scény. Postava se do rámečku
	// vejde celá, ale o jeden krok dál už by z něj vylezla.
	const R = 19;
	ok(svg.__naScenu(OKRAJ_X + KROK, 0).px + R > 397, 'ořez u okraje je těsný (o krok dál by kočka z rámečku vylezla)');
}

// ———————————————————————— 8) HLÁŠKY A POPISKY NELŽOU
{
	klik(btnReset);
	ok(!/přepni/i.test(stavEl.innerHTML), 'na začátku se nenabízí nápověda k pokusu, který ještě nedává smysl');

	klik(tlacitko('.uda-udalost', 1)); // šipka vlevo → jediný scénář
	ok(!/naráz/i.test(stavEl.innerHTML), 'u jediného scénáře se netvrdí, že běžely „naráz"');

	klik(tlacitko('.uda-udalost', 0)); // vlajka → dva scénáře
	ok(/naráz/i.test(stavEl.innerHTML), 'u dvou scénářů se to naopak zdůrazní');

	// Popisek souřadnic patří POD postavu, bublina NAD ni — jinak se překryjí.
	const yPostavy = Number(kockaG.getAttribute('transform').match(/translate\([-\d.]+ ([-\d.]+)\)/)[1]);
	const yPopisku = Number(kockaPopis.getAttribute('y'));
	const yBubliny = Number(prvky.get('uda-bublina').getAttribute('y'));
	ok(yPopisku > yPostavy, 'popisek se souřadnicemi je pod postavou');
	ok(yBubliny < yPostavy, 'bublina je nad postavou');
	ok(yPopisku - yBubliny > 40, 'popisek a bublina se nepřekrývají');
}

// ———————————————————————— 9) ŠABLONA, KTEROU ŽÁK OPRAVDU DOSTANE
//
// Doplněno po nálezu nezávislého kontrolora: test do téhle chvíle četl POUZE <script>,
// a atrapa `getElementById` chybějící prvek tiše vyrobila. Komponenta se smazanou scénou
// i všemi tlačítky proto testem prošla jako zdravá. Kontroluje se tedy i HTML.
{
	const html = zdroj.split('<script>')[0];
	for (const u of ['vlajka', 'vlevo', 'vpravo', 'mezernik', 'klikMic']) {
		ok(html.includes(`data-udalost="${u}"`), `v šabloně je tlačítko pro událost „${u}"`);
	}
	ok(html.includes('data-mic="ano"') && html.includes('data-mic="ne"'), 'v šabloně jsou oba přepínače míče');
	ok(html.includes('id="uda-reset"'), 'v šabloně je tlačítko na začátek');
	ok(/<svg[^>]*id="uda-svg"/.test(html), 'v šabloně je scéna');
	ok(/<svg[^>]*tabindex="0"/.test(html), 'scéna jde zaměřit, jinak by klávesnice nefungovala');
	ok(!/<svg[^>]*role="img"/.test(html), 'ovládaná scéna není deklarovaná jako pouhý obrázek');
	ok(/aria-label="[^"]*šipk/i.test(html), 'popis pro odečítač říká, čím se scéna ovládá');

	// Překlep v id by jinak zůstal němý: atrapa i prohlížeč vrátí „nic" a simulace mlčí.
	const idVHtml = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
	const idVeSkriptu = [...skript.matchAll(/getElementById\('([^']+)'\)/g)].map((m) => m[1]);
	const chybi = idVeSkriptu.filter((i) => !idVHtml.has(i));
	ok(chybi.length === 0, `každý prvek hledaný skriptem v šabloně existuje${chybi.length ? ' — chybí: ' + chybi.join(', ') : ''}`);
}

// ———————————————————————— 10) CESTA, KTEROU JDE ŽÁK (klikáním, ne funkcemi)
//
// Hlavní pointa se dosud ověřovala jen čistou funkcí. Podvrh kontrolora ukázal, že když
// přepínač postavy vrátí na start, test to nepozná — a hláška „Míč zůstal, kde byl" by lhala.
{
	klik(btnReset);
	klik(tlacitko('.uda-mic', 0));   // míč má klobouky
	klik(tlacitko('.uda-udalost', 4)); // klik na míč
	klik(tlacitko('.uda-udalost', 4));
	const zvednuty = svg.__stav().mic.y;
	ok(zvednuty > START_MIC.y, 'míč se klikáním opravdu zvedl');

	klik(tlacitko('.uda-mic', 1));   // přepnutí na „bez klobouku"
	ok(svg.__stav().mic.y === zvednuty, '★ přepnutí přepínače postavy NEVRACÍ na start (jinak by pointa nebyla vidět)');

	klik(tlacitko('.uda-udalost', 0)); // 🏁
	ok(svg.__stav().mic.y === zvednuty, '★ a zelená vlajka s míčem bez klobouku nehne ani touhle cestou');
	ok(svg.__stav().kocka.x === START_KOCKA.x, '★ …zatímco kočka se toutéž vlajkou vrátila na start');
	ok(/zůstal, kde byl/i.test(stavEl.innerHTML), 'a hláška to žákovi pojmenuje');

	// Počítadlo spuštěných scénářů má být vidět — dosud se počítalo jen do prázdna.
	ok(/Spuštěných scénářů celkem: \d+/.test(stavEl.innerHTML), 'žák vidí, kolik scénářů se dohromady spustilo');
	klik(btnReset);
	ok(!/Spuštěných scénářů celkem/.test(stavEl.innerHTML), 'po návratu na začátek se počítadlo schová');
}

// ———————————————————————— 11) POSTAVY SE NESMÍ PŘEKRÝT
//
// Kočka jezdí po dráze, míč nad ní stoupá. Kdyby se jejich dráhy protnuly, stály by obě
// na témže bodě a slily by se i jejich popisky souřadnic (nález kontrolora).
{
	let nejblize = Infinity;
	for (let x = -OKRAJ_X; x <= OKRAJ_X; x += KROK) {
		for (let y = START_MIC.y; y <= OKRAJ_Y; y += SKOK_MICE) {
			const k = svg.__naScenu(x, START_KOCKA.y);
			const m = svg.__naScenu(START_MIC.x, y);
			nejblize = Math.min(nejblize, Math.hypot(k.px - m.px, k.py - m.py));
		}
	}
	ok(nejblize > 34, `postavy se nikdy nedotknou (nejblíž ${nejblize.toFixed(1)} px, poloměry 19 + 15)`);

	// Mez míče má být těsně u horního okraje, ne někde v půli scény.
	ok(svg.__naScenu(0, OKRAJ_Y + SKOK_MICE).py - 15 < 3, 'ořez míče je těsný (o skok výš by z rámečku vylezl)');
}

// ———————————————————————— 12) NÁZVY BLOKŮ PODLE ČESKÉ PALETY
{
	const texty = svg.__scenare(MA).flatMap((s) => [s.klobouk ?? '', ...s.telo]).join(' \n ').toLowerCase();
	ok(texty.includes('po stisku klávesy (mezerník)'), 'klobouk klávesy má název z české palety');
	ok(texty.includes('po kliknutí na mě'), 'klobouk kliknutí na postavu má název z české palety');
	ok(texty.includes('po kliknutí na 🏁'), 'klobouk zelené vlajky má název z české palety');
	// Nejčastější omyl: doslovné „po stisknutí" místo „po stisku" (l10n: EVENT_WHENKEYPRESSED).
	ok(!texty.includes('po stisknutí klávesy'), 'nikde není tvar „po stisknutí klávesy", který v paletě není');

	// Názvy se neporovnávají s vlastními literály (to by byl opis vlastního kódu), ale
	// proti tabulce zakázaných tvarů, kterou plní zdroj pravdy scratch-l10n.
	const { ZAKAZANE } = await import('../nazvy-bloku.mjs');
	const sedi = (v, t) => (v instanceof RegExp ? v.test(t) : t.includes(v));
	const spatne = ZAKAZANE.filter((z) => sedi(z.vzor, texty));
	ok(spatne.length === 0, `žádný název bloku neodporuje české paletě${spatne.length ? ': ' + spatne.map((z) => z.spravne).join(', ') : ''}`);
}

console.log(chyby === 0 ? `\n✅ Události a vstupy: všech ${kontrol} kontrol prošlo.` : `\n❌ ${chyby} z ${kontrol} kontrol selhalo.`);
process.exit(chyby === 0 ? 0 : 1);
