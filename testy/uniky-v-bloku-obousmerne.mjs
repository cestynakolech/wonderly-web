// OBOUSMĚRNÉ OVĚŘENÍ měřidla `uniky-v-bloku.mjs` — podvrh se musí najít, zdravý stav musí mlčet.
// Spuštění: node testy/uniky-v-bloku-obousmerne.mjs
import { najdiUniky } from './uniky-v-bloku.mjs';
import { nactiData } from './data.mjs';
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, copyFileSync, existsSync, symlinkSync } from 'node:fs';
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

// ---- zdravá skutečná data: oba bloky F8 (po kole 3) mlčí a porovnávají dvojice
const { kvizy } = await nactiData();
for (const k of ['fyzika/8-rocnik/elektrina/elektricka-prace-a-vykon', 'fyzika/8-rocnik/elektrina/ucinky-proudu-a-bezpecnost']) {
	const v = najdiUniky(kvizy[k] || []);
	tvrdi(`skutečný blok ${k}: 21 otázek`, (kvizy[k] || []).length === 21);
	tvrdi(`skutečný blok ${k}: 0 nálezů`, v.nalezy.length === 0);
	tvrdi(`skutečný blok ${k}: porovnáno dvojic > 0`, v.dvojic > 0);
}

// ---- KALIBRACE 3. 10. 2026: podvrh na KOPII skutečného bloku (v paměti; kvizy.ts se nemění)
const F8 = 'fyzika/8-rocnik/elektrina/elektricka-prace-a-vykon';
const kopie = kvizy[F8].map((o) => ({ ...o, odpovedi: [...o.odpovedi] }));
tvrdi('kopie skutečného bloku F8: 0 nálezů před podvrhem', najdiUniky(kopie).nalezy.length === 0);
// únik A: vysvětlení otázky 3 prozradí odpověď otázky 9 („na vnitřní energii, která ohřívá tělesa")
kopie[3].vysvetleni = (kopie[3].vysvetleni || '') + ' Ve vařiči se elektrická energie mění na vnitřní energii, která ohřívá tělesa.';
// únik B: ZADÁNÍ otázky 16 prozradí odpověď otázky 19 („energii, kterou nevyužijeme k zamýšlenému účelu")
kopie[16].text = 'Co udává výkon, když ztrátová je energie, kterou nevyužijeme k zamýšlenému účelu?';
const vk = najdiUniky(kopie);
tvrdi('podvrh kopie A (vysvětlení 3 → odpověď 9) nalezen', vk.nalezy.some((n) => n.zdroj === 3 && n.cil === 9));
tvrdi('podvrh kopie B (zadání 16 → odpověď 19) nalezen', vk.nalezy.some((n) => n.zdroj === 16 && n.cil === 19));
// ---- exit kód CLI: čistý blok → 0, skutečný blok s nálezy → 1 (brána musí umět spadnout)
const cli = (arg) => spawnSync(process.execPath, [new URL('./uniky-v-bloku.mjs', import.meta.url).pathname, arg], { encoding: 'utf8' });
tvrdi('CLI nad čistým blokem F8: exit 0', cli('--blok=elektricka-prace-a-vykon').status === 0);
// Pozitivní CLI případ NEZÁVISÍ na živých datech: syntetický kořen projektu v /private/tmp
// (kopie skriptů + vlastní kvizy.ts se čistým blokem a blokem s vloženým únikem).
const zdroj = dirname(fileURLToPath(import.meta.url));
const pisk = '/private/tmp/uniky-v-bloku-synteticky-koren';
mkdirSync(join(pisk, 'testy'), { recursive: true });
mkdirSync(join(pisk, 'src/data'), { recursive: true });
for (const f of ['uniky-v-bloku.mjs', 'data.mjs']) copyFileSync(join(zdroj, f), join(pisk, 'testy', f));
if (!existsSync(join(pisk, 'node_modules'))) symlinkSync(join(zdroj, '../node_modules'), join(pisk, 'node_modules'));
const radekTs = (o) => `\t{ text: ${JSON.stringify(o.text)}, odpovedi: ${JSON.stringify(o.odpovedi)}, vysvetleni: ${JSON.stringify(o.vysvetleni)} },`;
const blokTs = (klic, b) => `\t'${klic}': [\n${b.map(radekTs).join('\n')}\n\t],`;
writeFileSync(join(pisk, 'src/data/kvizy.ts'), `export const kvizy: Record<string, any[]> = {\n${blokTs('synteticky/s-unikem', p1)}\n${blokTs('synteticky/cisty', zaklad)}\n};\n`);
writeFileSync(join(pisk, 'src/data/temata.ts'), 'export const temata = {};\n');
writeFileSync(join(pisk, 'src/data/predmety.ts'), 'export const predmety = null;\n');
const cliS = (arg) => spawnSync(process.execPath, [join(pisk, 'testy/uniky-v-bloku.mjs'), arg], { encoding: 'utf8' });
tvrdi('CLI nad syntetickým blokem s vloženým únikem: exit 1', cliS('--blok=synteticky/s-unikem').status === 1);
tvrdi('CLI nad syntetickým čistým blokem: exit 0', cliS('--blok=synteticky/cisty').status === 0);
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
// ---- regrese: společné téma bloku (sdílené odborné slovo) nesmí být únik
const tema = [
	ot('Co je fyzika?', ['přírodní věda', 'druh umění', 'sport'], 'Fyzika je přírodní věda.'),
	ot('Z čeho vznikl název fyzika?', ['z řeckého physis', 'z latiny', 'z angličtiny'], 'Physis znamená příroda — přírodní jevy.'),
	ot('Co zkoumá fyzika?', ['přírodní jevy', 'dějiny', 'jazyky'], 'Přírodní vědy zkoumají přírodu.'),
];
tvrdi('regrese: slovo „přírodní" v celém bloku není únik', najdiUniky(tema).nalezy.length === 0);
// ---- čísla řádků: výpis nesmí mít „:?" u bloku s jednořádkovým zápisem otázek
const vyp = cliS('--blok=synteticky/s-unikem').stdout;
tvrdi('výpis nálezu nese číslo řádku kvizy.ts (ne „:?")', /:\d+ → :\d+/.test(vyp) && !/:\? →/.test(vyp));

if (chyb) { console.log(`❌ uniky-v-bloku: ${chyb} z ${kontrol} kontrol selhalo.`); process.exit(1); }
console.log(`✅ uniky-v-bloku.mjs — obousměrně ověřeno, ${kontrol} kontrol.`);
