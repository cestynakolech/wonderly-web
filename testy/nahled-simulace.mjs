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
const nastaveni = [];
const kliky = [];
for (const dvojice of argumenty) {
	if (dvojice.startsWith('svg=')) volbaScény = dvojice.slice(4);
	else if (dvojice.startsWith('klik=')) kliky.push(dvojice.slice(5));
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
const prazdnyPrvek = (id) => ({
	id, atributy: {}, textContent: '', innerHTML: '', style: {}, dataset: {}, posluchaci: {},
	value: hodnotaZHtml(id) ?? '',
	classList: { add() {}, remove() {}, toggle() {} },
	setAttribute(k, v) { this.atributy[k] = String(v); },
	getAttribute(k) { return this.atributy[k]; },
	appendChild() {},
	addEventListener(e, f) { (this.posluchaci[e] ||= []).push(f); },
	querySelectorAll(selektor) { return najdiPotomky(this.id, selektor); },
	querySelector(selektor) { return najdiPotomky(this.id, selektor)[0] ?? null; },
});
const novy = (id) => {
	const p = prazdnyPrvek(id);
	prvky.set(id, p);
	return p;
};
const document = {
	getElementById: (id) => prvky.get(id) || novy(id),
	querySelectorAll: () => [],
	// Prvek vyrobený za běhu nemá id, takže se do náhledu nevkládá zpátky —
	// stačí, aby se o něj skript nezabil (dřív tu createElement chyběl úplně
	// a celá komponenta spadla ještě před vykreslením, viz micro:bit rádio).
	createElement: () => prazdnyPrvek(undefined),
	// Totéž pro SVG prvky (14. 8. 2026): komponenta, která si tečky/značky skládá
	// přes createElementNS, tu jinak spadne uprostřed kreslení — a protože se to
	// stane až v posluchači, náhled se ZASEKNE místo aby zhavaroval (hledalo se
	// to půl hodiny u simulace účinků proudu). Chová se stejně jako createElement.
	createElementNS: () => prazdnyPrvek(undefined),
};
// cancelAnimationFrame patří k requestAnimationFrame — komponenta, která umí
// animaci zastavit (a to má umět každá), by bez něj spadla při prvním zastavení.
const sandbox = { document, performance: { now: () => 0 }, requestAnimationFrame: () => {}, cancelAnimationFrame: () => {}, console, Math };
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
for (const [id, p] of prvky) {
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
