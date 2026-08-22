#!/usr/bin/env node
// NÁHLED SIMULACE: udělá z komponenty obrázek, na který se dá podívat OKEM.
//
// Proč existuje: zelený test je slepý k tomu, jak scéna vypadá. U Oersteda
// i u koloběhu vody našel pohled na vyrenderovaný obrázek vady, které žádné
// měřidlo nevidělo — useknutou kružnici, šipky nakupené v řadě, počitadlo
// ležící přes oblak, popisek přeškrtnutý vlastní čárou. Dokud se skládalo
// ručně přes prohlížeč, dělalo se to pokaždé jinak (a screenshot v session
// vracel prázdno). Tohle je jediný domov toho postupu.
//
// Jak to funguje: skript komponenty se spustí v sandboxu (jako v testech),
// zapsané innerHTML a atributy se vloží zpátky do SVG ze zdroje a výsledek
// se uloží jako .svg. PNG z něj udělá `qlmanage -t` (viz hlášku na konci).
//
// Spuštění:
//   node testy/nahled-simulace.mjs <komponenta.astro> <výstup.svg> [svg=id|pořadí] [id=hodnota ...]
// Příklad:
//   node testy/nahled-simulace.mjs src/components/skola2/VnitrniEnergieSimulace.astro \
//        /tmp/nahled.svg vne-teplota=60 vne-castic=20 vne-rychlost-slider=2
//
// `cas=<sekundy>` (22. 8. 2026) nechá po klikání DOBĚHNOUT animaci o zadaný čas
// místo jediného prvního snímku. Dřív byl requestAnimationFrame v sandboxu
// no-op — po kliknutí na tlačítko proběhl jen první krok animace (t≈0,05 s) a
// scéna vypadala jako výchozí stav, i když logika počítala správně (bedna
// tažená 50 N nahoru vypadala, že stojí na podlaze). Teď se rAF chová jako
// FRONTA: každé zavolání se zařadí a teprve po klicích se fronta postupně
// vyprazdňuje po krocích ~16 ms (fake performance.now), dokud neuplyne
// požadovaný čas, fronta nezůstane prázdná (animace sama skončila) nebo se
// nevyčerpá pojistka 100 000 kroků (nekonečná animace by jinak zacyklila skript).
// Příklad (bedna 3 s po startu, síla už nastavená posuvníkem/klikem):
//   node testy/nahled-simulace.mjs src/components/skola2/SilaVektorSimulace.astro \
//        /tmp/sv.svg sv-smer-90=1 klik=sv-smer-90 sv-f=50 klik=sv-jed cas=3
// BEZ `cas=` se chová přesně jako dosud (žádná fronta, jediný synchronní krok) —
// zpětná kompatibilita ověřena porovnáním otisků výstupu před/po této úpravě.
//
// Když má komponenta VÍC samostatných scén (víc značek <svg>), vykreslí se bez
// další volby ta PRVNÍ — jako vždycky. Druhou a další scénu vybere vyhrazený
// argument `svg=` (jediný, který se nechápe jako nastavení ovládacího prvku):
//   svg=gc-b-svg  … podle id značky <svg id="…">
//   svg=2         … podle pořadí ve zdroji (1 = první scéna)
// Bez toho by druhá scéna zůstala neviděná — přesně to se stalo galvanickému
// článku, micro:bit rádiu a senzorům robota. Příklad (scéna B, šest článků):
//   node testy/nahled-simulace.mjs src/components/skola2/GalvanickyClanekSimulace.astro \
//        /tmp/b.svg svg=gc-b-svg gc-b-pocet=6 gc-b-velikost=1
import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';

const [komponenta, vystup, ...argumenty] = process.argv.slice(2);
if (!komponenta || !vystup) {
	console.log('Použití: node testy/nahled-simulace.mjs <komponenta.astro> <výstup.svg> [svg=id|pořadí] [id=hodnota ...]');
	process.exit(1);
}

// `svg=` je jediné vyhrazené klíčové slovo — vybírá scénu, nenastavuje prvek.
// Všechno ostatní jde do nastavení ovládacích prvků přesně jako dosud.
// `klik=<id>` (14. 8. 2026) klikne na tlačítko — bez toho šlo prohlédnout jen
// výchozí stav u simulací ovládaných TLAČÍTKY, ne posuvníky, takže se u nich
// nedala udělat povinná vizuální kontrola jiného než výchozího stavu. Klikat lze
// i opakovaně (`klik=a klik=b`), pořadí se zachovává.
let volbaScény = null;
let pozadovanyCas = null; // ms — `cas=`, viz komentář nahoře
const nastaveni = [];
const kliky = [];
for (const dvojice of argumenty) {
	if (dvojice.startsWith('svg=')) volbaScény = dvojice.slice(4);
	else if (dvojice.startsWith('klik=')) kliky.push(dvojice.slice(5));
	else if (dvojice.startsWith('cas=')) pozadovanyCas = Number(dvojice.slice(4)) * 1000;
	else nastaveni.push(dvojice);
}

const zdroj = readFileSync(komponenta, 'utf8');
const skript = zdroj.match(/<script>([\s\S]*?)<\/script>/)[1];
const prvky = new Map();
const hodnotaZHtml = (id) => (zdroj.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`)) || [])[1];
// najde ve ZDROJI konec bloku otevřeného na pozici `odKonecOteviraci` (index za
// úvodním „>") pro danou značku — počítá zanoření stejné značky, aby si třeba
// vnořené <div> uvnitř <div> nespletl s koncem toho vnějšího.
function najdiKonecBloku(tag, odKonecOteviraci) {
	const udalosti = [
		...[...zdroj.matchAll(new RegExp(`<${tag}(?=[\\s>])`, 'g'))].map((m) => ({ i: m.index, d: 1 })),
		...[...zdroj.matchAll(new RegExp(`</${tag}>`, 'g'))].map((m) => ({ i: m.index, d: -1 })),
	].filter((u) => u.i >= odKonecOteviraci).sort((a, b) => a.i - b.i);
	let hloubka = 1;
	for (const u of udalosti) { hloubka += u.d; if (hloubka === 0) return u.i; }
	return zdroj.length;
}
// querySelectorAll na jednotlivém prvku (14. 8. 2026): komponenta, která si
// potomky hledá přes `nejakyElement.querySelectorAll('.trida')` (typicky
// přepínání záložek), tu jinak spadne — mock DOM to uměl jen na `document`.
// OMEZENÍ: prvek se hledá podle POZICE VE ZDROJI (od jeho otvírací značky po
// spárovanou zavírací téhož jména), ne podle skutečného stromu DOM — u dobře
// vnořeného HTML/SVG to vyjde stejně, u neplatně/křížem vnořeného značkování
// ne. Podporuje selektor podle třídy (`.trida`) a podle jména značky.
function najdiPotomky(elementId, selektor) {
	if (!elementId) return [];
	const otevM = zdroj.match(new RegExp(`<(\\w+)[^>]*\\bid="${elementId}"[^>]*>`));
	if (!otevM) return [];
	const tag = otevM[1];
	const konecOtev = zdroj.indexOf(otevM[0]) + otevM[0].length;
	const konecBloku = najdiKonecBloku(tag, konecOtev);
	const blok = zdroj.slice(konecOtev, konecBloku);
	const podleTridy = selektor.startsWith('.');
	const hledana = podleTridy ? selektor.slice(1) : selektor;
	const vysledky = [];
	for (const m of blok.matchAll(/<(\w+)([^>]*)>/g)) {
		const [, tagJmeno, atributy] = m;
		const tridy = (atributy.match(/\bclass="([^"]*)"/) || [])[1]?.split(/\s+/) ?? [];
		if (podleTridy ? tridy.includes(hledana) : tagJmeno === hledana) {
			// Skutečné id má přednost. Bez id (běžné u <button> ve výběru
			// záložek) se prvek zaregistruje pod hodnotou PRVNÍHO data-* atributu
			// (u záložek typicky data-exp="balonek") — jinak by šlo tenhle prvek
			// vrátit z querySelectorAll, ale nedal by se adresovat argumentem
			// `klik=`, protože ten hledá výhradně podle id v mapě `prvky`.
			const id = (atributy.match(/\bid="([^"]+)"/) || [])[1]
				?? (atributy.match(/\bdata-\w+="([^"]+)"/) || [])[1];
			vysledky.push(id ? (prvky.get(id) || novy(id)) : prazdnyPrvek(undefined));
		}
	}
	return vysledky;
}
// prazdnyPrvek: dřív byl appendChild no-op, takže prvky VYROBENÉ ZA BĚHU
// (createElement/createElementNS + appendChild — běžný a správný způsob
// dynamického kreslení) se v náhledu neobjevily vůbec, i když komponenta
// nespadla. Autoři pak kreslení přepisovali na innerHTML jen kvůli nástroji.
// Od 22. 8. 2026 (viz hlavička souboru) appendChild/insertBefore/removeChild
// SKUTEČNĚ zařazují potomky do `p.potomci` a ty se na konci serializují zpátky
// do výsledného SVG (viz `serializujPotomky` a smyčka „obsah zapsaný přes…“).
// Beze změny zůstává: prvek bez id (typicky nový, ještě nikam nezapojený)
// se do zdroje vkládat nemá kam — proto ho `querySelectorAll` na `document`
// pořád nevidí a je vidět, jen když ho někdo appendChildem zavěsí pod prvek
// se ZNÁMÝM id ze zdroje.
const prazdnyPrvek = (id, tag) => ({
	id, tagName: tag, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
	potomci: [], rodic: null,
	value: hodnotaZHtml(id) ?? '',
	classList: {
		_mnozina(atributy) { return new Set((atributy.class ?? '').split(/\s+/).filter(Boolean)); },
		add(...t) { const s = this._mnozina(this._p.atributy); t.forEach((x) => s.add(x)); this._p.atributy.class = [...s].join(' '); },
		remove(...t) { const s = this._mnozina(this._p.atributy); t.forEach((x) => s.delete(x)); this._p.atributy.class = [...s].join(' '); },
		toggle(t) { const s = this._mnozina(this._p.atributy); s.has(t) ? s.delete(t) : s.add(t); this._p.atributy.class = [...s].join(' '); },
		contains(t) { return this._mnozina(this._p.atributy).has(t); },
	},
	setAttribute(k, v) { this.atributy[k] = String(v); },
	getAttribute(k) { return this.atributy[k]; },
	removeAttribute(k) { delete this.atributy[k]; },
	appendChild(dite) { this.potomci.push(dite); dite.rodic = this; return dite; },
	insertBefore(novy, pred) {
		const i = pred ? this.potomci.indexOf(pred) : -1;
		if (i === -1) this.potomci.push(novy); else this.potomci.splice(i, 0, novy);
		novy.rodic = this;
		return novy;
	},
	removeChild(dite) { const i = this.potomci.indexOf(dite); if (i > -1) this.potomci.splice(i, 1); dite.rodic = null; return dite; },
	remove() { if (this.rodic) this.rodic.removeChild(this); },
	addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	querySelectorAll(selektor) { return najdiPotomky(this.id, selektor); },
	querySelector(selektor) { return najdiPotomky(this.id, selektor)[0] ?? null; },
});
const novy = (id, tag) => {
	const p = prazdnyPrvek(id, tag);
	p.classList._p = p; // classList potřebuje odkaz na svůj prvek, viz výše
	if (id) prvky.set(id, p);
	return p;
};
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll: () => [],
	// Prvek vyrobený za běhu nemá id, takže ho `document.getElementById` nenajde —
	// do výsledku se dostane, JEN když ho skript appendChildem/insertBefore zavěsí
	// pod prvek se známým id ze zdroje (viz `serializujPotomky` níže). Bez zavěšení
	// zůstává osamocený stejně jako ve skutečném prohlížeči bez vložení do stromu.
	createElement: (tag) => novy(undefined, tag),
	// Totéž pro SVG prvky (14. 8. 2026, appendChild doplněn 22. 8. 2026): komponenta,
	// která si tečky/značky skládá přes createElementNS, tu dřív spadla uprostřed
	// kreslení (chyběl createElement) nebo se prvky ztratily (appendChild byl no-op).
	// Jmenný prostor se ignoruje — pro serializaci do SVG stačí jméno značky.
	createElementNS: (_ns, tag) => novy(undefined, tag),
};
// cancelAnimationFrame patří k requestAnimationFrame — komponenta, která umí
// animaci zastavit (a to má umět každá), by bez něj spadla při prvním zastavení.
//
// Bez `cas=` zůstává requestAnimationFrame no-op jako dosud (zpětná kompatibilita).
// S `cas=` se zavolání zařadí do fronty `radaFronta` a fronta se vyprázdní až po
// klikání — viz smyčka „doběhnutí animace" níže.
let fakeNyni = 0;
const radaFronta = [];
const sandbox = {
	document,
	performance: { now: () => fakeNyni },
	requestAnimationFrame: pozadovanyCas === null ? () => {} : (cb) => { radaFronta.push(cb); return radaFronta.length; },
	cancelAnimationFrame: pozadovanyCas === null ? () => {} : (id) => { radaFronta[id - 1] = null; },
	console,
	Math,
};
vm.createContext(sandbox);
vm.runInContext(skript, sandbox);

// nastavení posuvníků a překreslení (spustí se posluchači „input" všech prvků)
for (const dvojice of nastaveni) {
	const [id, hodnota] = dvojice.split('=');
	const p = prvky.get(id) ?? novy(id);
	p.value = hodnota;
}
let prekresleno = 0;
for (const p of [...prvky.values()]) for (const f of p.posluchaci.input ?? []) { f(); prekresleno++; break; }
if (!prekresleno && !kliky.length) console.log('⚠️  žádný posuvník neměl posluchač „input" — kreslí se výchozí stav');

// klikání (po nastavení posuvníků, aby šlo obojí kombinovat)
for (const id of kliky) {
	const p = prvky.get(id);
	if (!p) { console.error(`❌ klik=${id}: prvek s tímhle id ve scéně není`); process.exit(1); }
	const posluchaci = p.posluchaci.click ?? [];
	if (!posluchaci.length) { console.error(`❌ klik=${id}: prvek nemá posluchač „click" — nedá se na něj kliknout`); process.exit(1); }
	for (const f of posluchaci) f({ currentTarget: p, target: p, preventDefault() {} });
	console.log(`   klik: ${id}`);
}

// doběhnutí animace (`cas=`, 22. 8. 2026): fronta requestAnimationFrame se
// vyprazdňuje po krocích ~16 ms, dokud neuplyne požadovaný čas, fronta
// nezůstane prázdná (animace sama doběhla), nebo se nevyčerpá pojistka —
// bez pojistky by nekonečná animace (nikdy nevolá cancelAnimationFrame)
// zacyklila skript navždy.
if (pozadovanyCas !== null) {
	let kroky = 0;
	const POJISTKA = 100000;
	while (fakeNyni < pozadovanyCas && radaFronta.length && kroky < POJISTKA) {
		const cb = radaFronta.shift();
		fakeNyni += 16;
		kroky++;
		if (cb) cb(fakeNyni);
	}
	if (kroky >= POJISTKA) console.log(`⚠️  doběhnutí animace zastaveno pojistkou po ${POJISTKA} krocích — animace sama nekončí`);
	console.log(`   doběhlo: ${(fakeNyni / 1000).toFixed(2)} s (${kroky} kroků)`);
}

// SVG ze zdroje + to, co do něj skript zapsal
const sceny = zdroj.match(/<svg[\s\S]*?<\/svg>/g) ?? [];
if (!sceny.length) {
	console.error(`❌ V souboru ${komponenta} není žádná značka <svg> — není co vykreslit.`);
	process.exit(1);
}
const idScény = (s) => (s.match(/<svg[^>]*\bid="([^"]*)"/) || [])[1] ?? '(bez id)';
const seznamScén = () => sceny.map((s, i) => `   svg=${i + 1}   id: ${idScény(s)}`).join('\n');

let index = 0; // bez volby vždy PRVNÍ scéna — jako dosud
if (volbaScény !== null) {
	if (/^\d+$/.test(volbaScény)) {
		index = Number(volbaScény) - 1;
		if (index < 0 || index >= sceny.length) {
			console.error(`❌ Scéna číslo ${volbaScény} v komponentě není — má jich ${sceny.length}. Dostupné scény:\n${seznamScén()}`);
			process.exit(1);
		}
	} else {
		index = sceny.findIndex((s) => idScény(s) === volbaScény);
		if (index === -1) {
			console.error(`❌ V komponentě není <svg id="${volbaScény}">. Dostupné scény:\n${seznamScén()}`);
			process.exit(1);
		}
	}
}
if (sceny.length > 1) console.log(`ℹ️  scén v komponentě: ${sceny.length} — kreslí se ${index + 1}. (id: ${idScény(sceny[index])})`);
let svg = sceny[index];
// serializace prvků vyrobených za běhu (createElement/createElementNS + appendChild),
// zavěšených pod prvek se ZNÁMÝM id ze zdroje — viz komentář u `prazdnyPrvek` výše.
const escXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAtrib = (s) => escXml(s).replace(/"/g, '&quot;');
function serializujPrvek(el) {
	const tag = el.tagName || 'g';
	const idAtr = el.id ? ` id="${escAtrib(el.id)}"` : '';
	const ostatni = Object.entries(el.atributy).map(([k, v]) => ` ${k}="${escAtrib(v)}"`).join('');
	const obsahPotomku = el.potomci.map(serializujPrvek).join('');
	const obsah = obsahPotomku || (el.innerHTML || (el.textContent ? escXml(el.textContent) : ''));
	return `<${tag}${idAtr}${ostatni}>${obsah}</${tag}>`;
}
for (const [id, p] of prvky) {
	// potomci zavěšení za běhu (appendChild/insertBefore) — vloží se AŽ ZA stávající
	// obsah značky, ten se nemaže (na rozdíl od innerHTML, které obsah nahrazuje celý).
	if (p.potomci.length) {
		const parovy = new RegExp(`(<(\\w+)([^>]*)\\bid="${id}"[^>]*>)([\\s\\S]*?)(</\\2>)`);
		if (parovy.test(svg)) {
			svg = svg.replace(parovy, (cely, otev, tag, _atr, stred, konec) => `${otev}${stred}${p.potomci.map(serializujPrvek).join('')}${konec}`);
		} else {
			// rodič může být zapsaný jako SAMOUZAVÍRACÍ (<g id="x" />) — párový
			// regex výše na něj tiše nesedne a potomci by beze stopy zmizeli
			// (mlčení není klid). Takový tag se rozvine na párový a potomci
			// se vloží dovnitř; když nesedne ani tohle, jde o chybu k nahlášení.
			const samouzaviraci = new RegExp(`<(\\w+)([^>]*)\\bid="${id}"([^>]*)\\/\\s*>`);
			if (samouzaviraci.test(svg)) {
				svg = svg.replace(samouzaviraci, (cely, tag, pred, za) => `<${tag}${pred}id="${id}"${za}>${p.potomci.map(serializujPrvek).join('')}</${tag}>`);
			} else {
				console.error(`❌ V komponentě ${komponenta} nebyl nalezen prvek s id="${id}" (ani párový, ani samouzavírací tag) — vygenerovaní potomci se nevloží.`);
				process.exit(1);
			}
		}
	}
	// atributy zapsané přes setAttribute (points, fill, …)
	if (Object.keys(p.atributy).length) {
		svg = svg.replace(new RegExp(`<(\\w+)([^>]*\\bid="${id}"[^>]*)>`), (cely, tag, atributy) => {
			// SAMOUZAVÍRACÍ ZNAČKA (<circle … />): lomítko patří až ÚPLNĚ NAKONEC.
			// Dřív se nové atributy lepily na konec zachyceného úseku — a ten
			// u samouzavírací značky končí lomítkem, takže vznikalo
			// `… cx="440"/ fill="red"`, tedy NEPLATNÉ XML. qlmanage takovou
			// stránku vykreslí jen do první chyby, z náhledu byla vidět jen část
			// scény a nikdo to nepoznal (Alternátoru chyběl voltmetr, graf
			// i všechny popisky). Proto se lomítko (i s mezerami a novými řádky
			// před ním) odřízne, atributy se vloží PŘED něj a lomítko se vrátí zpět.
			const uzavreni = atributy.match(/^([\s\S]*?)\s*\/\s*$/);
			let a = uzavreni ? uzavreni[1] : atributy;
			const konec = uzavreni ? ' /' : '';
			for (const [k, v] of Object.entries(p.atributy)) {
				a = new RegExp(`\\s${k}="[^"]*"`).test(a) ? a.replace(new RegExp(`\\s${k}="[^"]*"`), ` ${k}="${v}"`) : `${a} ${k}="${v}"`;
			}
			return `<${tag}${a}${konec}>`;
		});
	}
	// obsah zapsaný přes innerHTML
	if (p.innerHTML) {
		svg = svg.replace(new RegExp(`(<(\\w+)[^>]*\\bid="${id}"[^>]*>)[\\s\\S]*?(</\\2>)`), `$1${p.innerHTML}$3`);
	}
	// …a totéž pro textContent (14. 8. 2026). Bez tohohle zůstávaly v náhledu
	// PRÁZDNÉ všechny <text> popisky plněné přes textContent — na webu přitom
	// text mají. Vizuální kontrola pak ukazovala prázdné bílé rámečky a nedalo
	// se rozeznat, jestli je vada ve scéně, nebo jen v náhledu (stálo to hledání
	// u simulace účinků proudu). innerHTML má přednost, když je zapsané obojí.
	else if (p.textContent) {
		const text = String(p.textContent).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		svg = svg.replace(new RegExp(`(<(\\w+)[^>]*\\bid="${id}"[^>]*>)[\\s\\S]*?(</\\2>)`), `$1${text}$3`);
	}
}
svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');

// ─────────────────────────────────────────────────────────────────────────────
// POJISTKA: než se soubor uloží, ověří se, že je SVG dobře utvořené.
//
// Proč: `qlmanage` vykreslí vadné SVG JEN DO PRVNÍ CHYBY — místo obrázku vznikne
// červený rámeček „error parsing attribute name" a pod ním USEKNUTÁ scéna.
// Kdo si takový náhled prohlíží, vidí půlku scény a netuší to: buď mu chybějící
// části uniknou, nebo nahlásí jako chybu něco, co ve scéně doopravdy je.
// Falešná kotva je horší než žádná — proto se vadné SVG raději NEULOŽÍ vůbec
// a nástroj skončí nenulovým kódem.
//
// Kontrola je psaná vlastním kódem (žádná další závislost): projde text jako
// XML — komentáře, značky, atributy, párování — a u první vady řekne, kde je.
function zkontrolujUtvorenost(text) {
	const misto = (i) => {
		const pred = text.slice(0, i);
		const radek = pred.split('\n').length;
		const sloupec = i - pred.lastIndexOf('\n');
		return { radek, sloupec, vyrez: text.slice(Math.max(0, i - 60), i + 60).replace(/\n/g, ' ') };
	};
	const vada = (i, popis) => ({ ...misto(i), popis });
	const JMENO = /^[A-Za-z_][A-Za-z0-9_.:-]*/;
	const stoh = [];
	let i = 0;
	while (i < text.length) {
		const lt = text.indexOf('<', i);
		const usek = text.slice(i, lt === -1 ? text.length : lt);
		const amp = usek.search(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9A-Fa-f]+);)/);
		if (amp !== -1) return vada(i + amp, 'znak „&" mimo platnou entitu (má být &amp;)');
		if (lt === -1) break;
		if (text.startsWith('<!--', lt)) {
			const konec = text.indexOf('-->', lt + 4);
			if (konec === -1) return vada(lt, 'neukončený komentář <!-- … -->');
			i = konec + 3; continue;
		}
		if (text.startsWith('<![CDATA[', lt)) {
			const konec = text.indexOf(']]>', lt + 9);
			if (konec === -1) return vada(lt, 'neukončená sekce <![CDATA[ … ]]>');
			i = konec + 3; continue;
		}
		if (text.startsWith('<!', lt) || text.startsWith('<?', lt)) {
			const konec = text.indexOf('>', lt);
			if (konec === -1) return vada(lt, 'neukončená hlavička <! … > / <? … >');
			i = konec + 1; continue;
		}
		if (text.startsWith('</', lt)) {
			const m = JMENO.exec(text.slice(lt + 2));
			if (!m) return vada(lt, 'koncová značka bez jména');
			let j = lt + 2 + m[0].length;
			while (/\s/.test(text[j])) j++;
			if (text[j] !== '>') return vada(j, `v koncové značce </${m[0]}> je něco navíc`);
			const otevrena = stoh.pop();
			if (!otevrena) return vada(lt, `koncová značka </${m[0]}> bez odpovídající otevírací`);
			if (otevrena.jmeno !== m[0]) return vada(lt, `</${m[0]}> zavírá jinou značku, než která je otevřená (<${otevrena.jmeno}> z řádku ${misto(otevrena.kde).radek})`);
			i = j + 1; continue;
		}
		const m = JMENO.exec(text.slice(lt + 1));
		if (!m) return vada(lt, 'znak „<" mimo značku (má být &lt;)');
		const jmeno = m[0];
		let j = lt + 1 + jmeno.length;
		for (;;) {
			const zacatekMezer = j;
			while (/\s/.test(text[j])) j++;
			if (text[j] === '>') { stoh.push({ jmeno, kde: lt }); j++; break; }
			if (text.startsWith('/>', j)) { j += 2; break; }
			if (text[j] === '/') {
				return vada(j, `ve značce <${jmeno}> je za lomítkem samouzavírací značky ještě další atribut — lomítko musí být až úplně na konci (…/>)`);
			}
			if (j >= text.length) return vada(lt, `neukončená značka <${jmeno}`);
			if (j === zacatekMezer) return vada(j, `ve značce <${jmeno}> chybí mezera mezi atributy`);
			const a = /^[A-Za-z_][A-Za-z0-9_.:-]*\s*=\s*("[^"]*"|'[^']*')/.exec(text.slice(j));
			if (!a) return vada(j, `ve značce <${jmeno}> je něco, co není atribut ve tvaru jméno="hodnota"`);
			j += a[0].length;
		}
		i = j;
	}
	if (stoh.length) {
		const p = stoh[stoh.length - 1];
		return { ...misto(p.kde), popis: `značka <${p.jmeno}> zůstala neuzavřená` };
	}
	return null;
}

const vada = zkontrolujUtvorenost(svg);
if (vada) {
	console.error('❌ NÁHLED SE NEULOŽIL: složené SVG není dobře utvořené (neplatné XML).');
	console.error(`   Kde: řádek ${vada.radek}, sloupec ${vada.sloupec} — ${vada.popis}`);
	console.error(`   Okolí: …${vada.vyrez}…`);
	console.error('   Proč to vadí: qlmanage vykreslí takový soubor JEN DO PRVNÍ CHYBY,');
	console.error('   takže by vznikl obrázek s USEKNUTOU scénou a chybovou hláškou navrchu —');
	console.error('   a člověk by si myslel, že scénu viděl celou. Radši nic než falešný náhled.');
	console.error(`   Komponenta: ${komponenta}`);
	process.exit(1);
}

writeFileSync(vystup, svg);

console.log(`✅ ${vystup} — ${svg.length} znaků`);
console.log(`   PNG:  qlmanage -t -s 900 -o "$(dirname ${vystup})" "${vystup}"`);
