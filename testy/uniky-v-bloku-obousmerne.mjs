// OBOUSMĚRNÉ OVĚŘENÍ měřidla `uniky-v-bloku.mjs` — podvrh se musí najít, zdravý stav musí mlčet.
// Spuštění: node testy/uniky-v-bloku-obousmerne.mjs
import { najdiUniky } from './uniky-v-bloku.mjs';
import { nactiData } from './data.mjs';

let chyb = 0;
let kontrol = 0;
function tvrdi(popis, podminka) {
	kontrol++;
	if (!podminka) { chyb++; console.log(`  ✗ ${popis}`); }
}
const ot = (text, odpovedi, vysvetleni = '') => ({ text, odpovedi, vysvetleni });

const zaklad = [
	ot('Jaká je jednotka elektrické práce?', ['joule', 'watt', 'ampér'], 'Práci měříme v jednotkách energie.'),
	ot('Která veličina se značí U?', ['napětí', 'odpor', 'proud'], 'Měří se voltmetrem.'),
	ot('Čím se měří proud v obvodu?', ['ampérmetrem', 'teploměrem', 'váhou'], 'Zapojuje se do série.'),
	ot('Který materiál je izolant?', ['plast', 'měď', 'stříbro'], 'Neobsahuje volné nosiče náboje.'),
];

// ---- zdravý stav: čtyři nezávislé otázky mlčí
tvrdi('zdravý blok: 0 nálezů', najdiUniky(zaklad).nalezy.length === 0);
tvrdi('zdravý blok: porovnány dvojice (měřidlo opravdu něco měřilo)', najdiUniky(zaklad).dvojic > 0);

// ---- podvrh 1: zadání jiné otázky obsahuje správnou odpověď (joule)
const p1 = zaklad.map((o) => ({ ...o }));
p1[1] = ot('Kolik joulů je jedna wattsekunda?', ['jeden', 'tisíc', 'šedesát'], 'Měří se voltmetrem.');
const v1 = najdiUniky(p1);
tvrdi('podvrh zadání: únik 1 → 0 nalezen', v1.nalezy.some((n) => n.zdroj === 1 && n.cil === 0));

// ---- podvrh 2: vysvětlení jiné otázky prozrazuje odpověď (ampérmetr)
const p2 = zaklad.map((o) => ({ ...o }));
p2[3] = ot('Který materiál je izolant?', ['plast', 'měď', 'stříbro'], 'Proud se měří ampérmetrem, plast ho nevede.');
const v2 = najdiUniky(p2);
tvrdi('podvrh vysvětlení: únik 3 → 2 nalezen', v2.nalezy.some((n) => n.zdroj === 3 && n.cil === 2));

// ---- podvrh 3: číselná odpověď prozrazená ve vysvětlení
const p3 = [
	ot('Kolik wattů má žárovka z příkladu?', ['100 W', '60 W', '40 W'], 'Příklad.'),
	ot('Která veličina se značí U?', ['napětí', 'odpor', 'proud'], 'Žárovka z příkladu má 100 W.'),
	ot('Čím se měří proud v obvodu?', ['ampérmetrem', 'teploměrem', 'váhou'], 'Zapojuje se do série.'),
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

if (chyb) { console.log(`❌ uniky-v-bloku: ${chyb} z ${kontrol} kontrol selhalo.`); process.exit(1); }
console.log(`✅ uniky-v-bloku.mjs — obousměrně ověřeno, ${kontrol} kontrol.`);
