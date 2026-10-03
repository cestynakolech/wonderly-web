// OBOUSMĚRNÉ OVĚŘENÍ měřidla `uniky-v-bloku.mjs` — podvrh se musí najít, zdravý stav musí mlčet.
// Spuštění: node testy/uniky-v-bloku-obousmerne.mjs
import { najdiUniky } from './uniky-v-bloku.mjs';
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, copyFileSync, symlinkSync, mkdtempSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

let chyb = 0;
let kontrol = 0;
function tvrdi(popis, podminka) {
	kontrol++;
	if (!podminka) { chyb++; console.log(`  ✗ ${popis}`); }
}
const ot = (text, odpovedi, vysvetleni = '') => ({ text, odpovedi, vysvetleni });

const zaklad = [
	ot('Jaká je jednotka elektrické práce?', ['joule neboli newtonmetr', 'watt', 'ampér'], 'Práci měříme v jednotkách energie.'),
	ot('Která veličina se značí U?', ['napětí', 'odpor', 'proud'], 'Měří se voltmetrem.'),
	ot('Čím se měří proud v obvodu?', ['ampérmetrem zapojeným sériově', 'teploměrem', 'váhou'], 'Zapojuje se do série.'),
	ot('Který materiál je izolant?', ['plast', 'měď', 'stříbro'], 'Neobsahuje volné nosiče náboje.'),
];

// ---- zdravý stav: čtyři nezávislé otázky mlčí
tvrdi('zdravý blok: 0 nálezů', najdiUniky(zaklad).nalezy.length === 0);
tvrdi('zdravý blok: porovnány dvojice (měřidlo opravdu něco měřilo)', najdiUniky(zaklad).dvojic > 0);

// ---- podvrh 1: zadání jiné otázky obsahuje správnou odpověď (joule)
const p1 = zaklad.map((o) => ({ ...o }));
p1[1] = ot('Kolik joulů neboli newtonmetrů je jedna wattsekunda?', ['jeden', 'tisíc', 'šedesát'], 'Měří se voltmetrem.');
const v1 = najdiUniky(p1);
tvrdi('podvrh zadání: únik 1 → 0 nalezen', v1.nalezy.some((n) => n.zdroj === 1 && n.cil === 0));

// ---- podvrh 2: vysvětlení jiné otázky prozrazuje odpověď (ampérmetr)
const p2 = zaklad.map((o) => ({ ...o }));
p2[3] = ot('Který materiál je izolant?', ['plast', 'měď', 'stříbro'], 'Proud se měří ampérmetrem zapojeným sériově, plast ho nevede.');
const v2 = najdiUniky(p2);
tvrdi('podvrh vysvětlení: únik 3 → 2 nalezen', v2.nalezy.some((n) => n.zdroj === 3 && n.cil === 2));

// ---- podvrh 3: číselná odpověď prozrazená ve vysvětlení
const p3 = [
	ot('Kolik wattů má žárovka z příkladu?', ['100 W', '60 W', '40 W'], 'Příklad.'),
	ot('Která veličina se značí U?', ['napětí', 'odpor', 'proud'], 'Žárovka z příkladu má 100 W.'),
	ot('Čím se měří proud v obvodu?', ['ampérmetrem zapojeným sériově', 'teploměrem', 'váhou'], 'Zapojuje se do série.'),
	ot('Který materiál je izolant?', ['plast', 'měď', 'stříbro'], 'Nevede proud.'),
];
tvrdi('podvrh čísla: únik 1 → 0 nalezen', najdiUniky(p3).nalezy.some((n) => n.zdroj === 1 && n.cil === 0));

// ---- KALIBRACE na SYNTETICKÉM bloku realistické velikosti (NEČTE živý kvizy.ts; běžná úprava kvízu test nerozbije)
const realny = [
	ot('Co uvede volné elektrony ve vodiči do usměrněného pohybu?', ['síla elektrického pole', 'teplo z okolního vzduchu', 'tíha samotných elektronů'], 'Ve vodiči vznikne pole a jeho síla žene volné elektrony jedním směrem.'),
	ot('Jaká je jednotka elektrické práce?', ['joule (J)', 'watt (W)', 'ampér (A)'], 'Elektrickou práci měříme v joulech.'),
	ot('Jaká je značka elektrického výkonu?', ['P', 'W', 'U'], 'Výkon značíme P.'),
	ot('Jaké výhody má elektrická energie?', ['snadno se přenáší a mění na jiné podoby', 'při přenosu se sama pokaždé zvětšuje', 'nelze ji přeměnit na žádnou jinou podobu'], 'Umíme ji přenášet na velké vzdálenosti a ve spotřebičích ji snadno měnit.'),
	ot('Čím se měří napětí na spotřebiči?', ['voltmetrem připojeným paralelně', 'ampérmetrem zapojeným v sérii', 'siloměrem'], 'Voltmetr se připojuje vedle spotřebiče.'),
	ot('Co se děje ve vařiči při průchodu proudu?', ['spirála se zahřívá', 'spirála se ochlazuje', 'spirála mizí'], 'Proud spirálu zahřívá.'),
	ot('Jaká je jednotka napětí?', ['volt (V)', 'newton (N)', 'pascal (Pa)'], 'Napětí měříme ve voltech.'),
	ot('Která látka je dobrý vodič?', ['měď', 'sklo', 'guma'], 'Obsahuje hodně volných nosičů náboje.'),
	ot('Do čeho se mění elektrická energie ve vařiči?', ['na vnitřní energii, která ohřívá tělesa', 'na pohyb kol', 'na světlo'], 'Vařič slouží k ohřevu.'),
	ot('Jak se nazývá přístroj na měření spotřeby?', ['elektroměr', 'tlakoměr', 'budík'], 'Počítá odebranou energii.'),
	ot('Jak se počítá výkon?', ['práce dělená časem', 'čas dělený prací', 'práce krát čas'], 'Výkon ukazuje, jak rychle se práce koná.'),
	ot('Kolik minut má hodina?', ['šedesát', 'třicet', 'sto'], 'Hodina se dělí na minuty.'),
	ot('Co je ztrátová energie?', ['energie, kterou nevyužijeme k zamýšlenému účelu', 'energie, která se vrací do zdroje', 'energie uložená v baterii'], 'Odchází většinou jako teplo.'),
	ot('Kde se spotřebovává nejvíce energie v domácnosti?', ['při vytápění', 'při nabíjení hodinek', 'při svícení LED'], 'Teplo potřebuje velký příkon.'),
];
const IA = 8, IB = 12; // odpověď otázky 8 (vařič) a 12 (ztrátová energie) je cíl podvrhu
tvrdi('syntetický blok realistické velikosti: 0 nálezů před podvrhem', najdiUniky(realny).nalezy.length === 0);
tvrdi('syntetický blok realistické velikosti: porovnány dvojice', najdiUniky(realny).dvojic >= realny.length);
const kopie = realny.map((o) => ({ ...o, odpovedi: [...o.odpovedi] }));
// únik A: vysvětlení otázky 3 prozradí odpověď otázky 8
kopie[3].vysvetleni += ' Ve vařiči se elektrická energie mění na vnitřní energii, která ohřívá tělesa.';
// únik B: ZADÁNÍ otázky 10 prozradí odpověď otázky 12
kopie[10].text = 'Co udává výkon, když ztrátová je energie, kterou nevyužijeme k zamýšlenému účelu?';
const vk = najdiUniky(kopie);
tvrdi('podvrh bloku A (vysvětlení 3 → odpověď 8) nalezen', vk.nalezy.some((n) => n.zdroj === 3 && n.cil === IA));
tvrdi('podvrh bloku B (zadání 10 → odpověď 12) nalezen', vk.nalezy.some((n) => n.zdroj === 10 && n.cil === IB));
tvrdi('podvrh bloku: nic navíc kromě dvou vložených úniků', vk.nalezy.length === 2);

// ---- exit kód CLI na SYNTETICKÉM kořeni projektu (kopie skriptů + vlastní kvizy.ts); živá data se nečtou.
// Soubor kvizy.ts je ve stejném formátu jako živý: apostrofy, `\'` pro apostrof v textu, jednořádkové otázky.
// Pracovní kořen je unikátní (mkdtemp) — souběžné běhy se nepřepisují. Nemaže se (úklid dělá OS).
const zdroj = dirname(fileURLToPath(import.meta.url));
const pisk = realpathSync(mkdtempSync(join(tmpdir(), 'uniky-v-bloku-koren-'))); // realpath: /var → /private/var, jinak CLI nepozná přímé spuštění
mkdirSync(join(pisk, 'testy'), { recursive: true });
mkdirSync(join(pisk, 'src/data'), { recursive: true });
for (const f of ['uniky-v-bloku.mjs', 'data.mjs', 'spusteno-primo.mjs']) copyFileSync(join(zdroj, f), join(pisk, 'testy', f));
symlinkSync(join(zdroj, '../node_modules'), join(pisk, 'node_modules'));
const uvoz = (t) => `'${t.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const radekTs = (o) => `\t\t{ text: ${uvoz(o.text)}, odpovedi: [${o.odpovedi.map(uvoz).join(', ')}], vysvetleni: ${uvoz(o.vysvetleni)} },`;
const blokTs = (klic, b) => `\t'${klic}': [\n${b.map(radekTs).join('\n')}\n\t],`;
// blok s apostrofem v textu otázky (jako v živých datech) a s únikem 1 → 0
const sApostrofem = p1.map((o) => ({ ...o }));
sApostrofem[0] = ot("Jaká je jednotka práce v Joule's zákoně?", sApostrofem[0].odpovedi, sApostrofem[0].vysvetleni); // cíl úniku s apostrofem v zadání
sApostrofem[2] = ot("Co je Ohm's law?", ["vztah napětí, proudu a odporu", 'druh baterie', 'značka ampéru'], 'Platí pro kovové vodiče.');
const prazdny = [ot('Je to tak?', ['ano', 'ne', 'asi'], 'Ano.'), ot('A teď?', ['ne', 'ano', 'asi'], 'Ne.')]; // žádné klíčové kmeny → 0 porovnaných dvojic
const souborTs = `export const kvizy: Record<string, any[]> = {\n${blokTs('synteticky/prazdny', prazdny)}\n${blokTs('synteticky/s-unikem', sApostrofem)}\n${blokTs('synteticky/cisty', zaklad)}\n${blokTs('synteticky/realny-s-unikem', kopie)}\n};\n`;
writeFileSync(join(pisk, 'src/data/kvizy.ts'), souborTs);
writeFileSync(join(pisk, 'src/data/temata.ts'), 'export const temata = {};\n');
writeFileSync(join(pisk, 'src/data/predmety.ts'), 'export const predmety = null;\n');
const radkyTs = souborTs.split('\n');
tvrdi('syntetický kvizy.ts má řádky v zápisu s apostrofy (jako živá data) a žádný s dvojitými uvozovkami', radkyTs.some((r) => /^\s*\{ text: '/.test(r)) && !radkyTs.some((r) => /^\s*\{ text: "/.test(r)));
const radekCe = (hledany) => radkyTs.findIndex((r) => r.includes(hledany)) + 1;
const cliS = (arg) => spawnSync(process.execPath, [join(pisk, 'testy/uniky-v-bloku.mjs'), arg], { encoding: 'utf8' });
const vU = cliS('--blok=synteticky/s-unikem');
tvrdi('CLI nad syntetickým blokem s vloženým únikem: exit 1', vU.status === 1);
tvrdi('CLI s únikem: filtr našel právě 1 blok', /Prošlo 1 bloků/.test(vU.stdout));
const vC = cliS('--blok=synteticky/cisty');
tvrdi('CLI nad syntetickým čistým blokem: exit 0', vC.status === 0);
tvrdi('CLI čistý blok: filtr našel právě 1 blok a porovnal dvojice (ne prázdný průchod)', /Prošlo 1 bloků \/ 4 otázek \/ [1-9]\d* dvojic; nálezů: 0/.test(vC.stdout));
tvrdi('CLI s neexistujícím filtrem prošlo 0 bloků (kontrola výše tedy opravdu rozlišuje)', /Prošlo 0 bloků/.test(cliS('--blok=neexistuje-takovy-blok').stdout));
const vR = cliS('--blok=synteticky/realny-s-unikem');
tvrdi('CLI nad syntetickým blokem realistické velikosti: exit 1 a 2 nálezy', vR.status === 1 && /nálezů: 2\./.test(vR.stdout));
const vP = cliS('--blok=synteticky/prazdny');
tvrdi('CLI: 0 porovnaných dvojic = SELHÁNÍ MĚŘIDLA, exit 1 (brána musí umět spadnout)', vP.status === 1 && /SELHÁNÍ MĚŘIDLA/.test(vP.stderr));
// ---- čísla řádků: výpis nese SKUTEČNÉ řádky kvizy.ts (zápis s apostrofy; ne „:?")
const ocekavany = `:${radekCe("{ text: 'Kolik joulů neboli")} → :${radekCe("{ text: 'Jaká je jednotka práce v Joule\\'s zákoně?'")}`;
tvrdi('výpis nálezu nese číslo řádku kvizy.ts (ne „:?")', /:\d+ → :\d+/.test(vU.stdout) && !/:\? →/.test(vU.stdout));
tvrdi('výpis CLI: přesné řádky zdroje a cíle odpovídají souboru (apostrofový zápis)', vU.stdout.includes(ocekavany));
tvrdi('výpis CLI realistický blok: řádky zdroje a cíle nejsou „?"', !/:\? →|→ :\?/.test(vR.stdout));
// ---- regrese falešných poplachů: konstanty a převody ve výpočtech nejsou únik
const fp = [
	ot('Jaká síla působí na těleso o hmotnosti 5 kg?', ['50 N', '5 N', '500 N'], '5 · 10 = 50 N (g = 10 N/kg).'),
	ot('Kolik newtonů je 1 kN?', ['1 000 N', '100 N', '10 N'], 'Kilo znamená tisíc.'),
	ot('Jaká je jednotka odporu?', ['ohm (Ω)', 'volt (V)', 'watt (W)'], 'Značka je Ω.'),
	ot('Kolik je 1 kΩ v ohmech?', ['1 000 Ω', '100 Ω', '10 Ω'], '1 kΩ = 1 000 Ω.'),
	ot('Kolik gramů je 1 kg?', ['1 000 g', '100 g', '10 g'], 'Kilo znamená tisíc.'),
	ot('Kolik gramů je 2 kg?', ['2 000 g', '200 g', '20 g'], 'Počítáme 2 · 1 000 g = 2 000 g.'),
	ot('Co se stane s nepoužívanými aplikacemi?', ['uvolní se místo a sníží se riziko', 'nic', 'zpomalí se'], 'Zbytečný program.'),
	ot('Proč mažeme staré aplikace?', ['aby bylo přehledno', 'z nudy', 'náhodou'], 'Zabírají místo a bývají riziko.'),
];
tvrdi('regrese: konstanta 10 a převod 1 000 ve výpočtu a značka Ω nejsou únik', najdiUniky(fp).nalezy.length === 0);
// ---- regrese: sdílený výraz, který nemají jen správná odpověď (distraktory ho obsahují taky), není únik
const nerozlisuje = [
	ot('Jak se nazývá zhroucená hvězda?', ['bílý trpaslík', 'bílý trpaslík je chladný', 'trpaslík bílý a malý'], 'Hvězda.'),
	ot('Jak se jmenuje pozůstatek hvězdy?', ['mlhovina', 'planeta', 'kometa'], 'Je to bílý trpaslík, ale ne vždy.'),
	ot('Která planeta má prstence?', ['Saturn', 'Merkur', 'Venuše'], 'Je plynný obr.'),
];
tvrdi('regrese: výraz přítomný i v distraktorech cíle neprozrazuje správnou odpověď', najdiUniky(nerozlisuje).nalezy.length === 0);
// ---- regrese: společné téma bloku (sdílené odborné slovo) nesmí být únik
const tema = [
	ot('Co je fyzika?', ['přírodní věda', 'druh umění', 'sport'], 'Fyzika je přírodní věda.'),
	ot('Z čeho vznikl název fyzika?', ['z řeckého physis', 'z latiny', 'z angličtiny'], 'Physis znamená příroda — přírodní jevy.'),
	ot('Co zkoumá fyzika?', ['přírodní jevy', 'dějiny', 'jazyky'], 'Přírodní vědy zkoumají přírodu.'),
];
tvrdi('regrese: slovo „přírodní" v celém bloku není únik', najdiUniky(tema).nalezy.length === 0);
if (chyb) { console.log(`❌ uniky-v-bloku: ${chyb} z ${kontrol} kontrol selhalo.`); process.exit(1); }
console.log(`✅ uniky-v-bloku.mjs — obousměrně ověřeno, ${kontrol} kontrol.`);
