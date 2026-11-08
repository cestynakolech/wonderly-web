// OBOUSMĚRNÉ OVĚŘENÍ měřidla bezpecnost-laborek.mjs — podvrh se musí najít, zdravý stav mlčet.
// Spuštění: node testy/bezpecnost-laborek-obousmerne.mjs
import { zkontrolujBezpecnost } from './bezpecnost-laborek.mjs';

let chyb = 0;
const tvrdi = (popis, ok) => { if (!ok) { chyb++; console.log(`  ✗ ${popis}`); } };
const lab = (pomucky, postup, extra = {}) => ({ nazev: 'x', cil: 'Změřit.', pomucky, postup, otazky: ['Co vidíš?'], ...extra });
const pr = (l) => zkontrolujBezpecnost('k', l).map((n) => n.pravidlo);

// podvrhy (musí se najít)
tvrdi('B1: přepojení bez spínače a bez vypnutí', pr(lab(['plochá baterie 4,5 V', 'vodiče'], ['Sestav obvod.', 'Přepoj žárovku na druhý vodič.'])).includes('B1'));
tvrdi('B2: přepojení před vypnutím', pr(lab(['stejnosměrný zdroj', 'spínač'], ['Zapni spínač.', 'Přepoj vodič na jinou svorku.', 'Rozepni spínač.'])).includes('B2'));
tvrdi('B3: výzva ke zkratu', pr(lab(['baterie'], ['Spoj svorky baterie a pozoruj jiskru.'])).includes('B3'));
// zdravé (musí mlčet)
tvrdi('zdravé: vypnutí před přepojením', pr(lab(['stejnosměrný zdroj', 'spínač'], ['Rozepni spínač.', 'Přepoj vodič.', 'Sepni spínač.'])).length === 0);
tvrdi('zdravé: zákaz zkratu se nehlásí', pr(lab(['baterie'], ['Nikdy nespojuj svorky baterie vodičem.'])).length === 0);
tvrdi('zdravé: laborka bez zdroje (světelný zdroj) se nekontroluje', pr(lab(['svíčka jako zdroj světla'], ['Přepoj zrcadlo.'])).length === 0);
tvrdi('zdravé: baterie bez přepojování', pr(lab(['plochá baterie 4,5 V'], ['Sestav obvod.', 'Zapiš, zda svítí.'])).length === 0);

if (chyb) { console.log(`bezpecnost-laborek-obousmerne: ${chyb} chyb`); process.exit(1); }
console.log('bezpecnost-laborek-obousmerne: OK (3 podvrhy nalezeny, 4 zdravé mlčí)');
