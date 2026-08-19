// Obousměrný důkaz brány proti cizím videům (testy/cizi-videa.mjs).
//
// Podvrhy běží nad KOPIÍ dat v paměti — do souborů webu se nesahá (poučení z 2. 8. 2026,
// kdy `git checkout` nad necommitnutou prací zahodil celý přepis).
// Spuštění: node testy/cizi-videa-obousmerne.mjs
import { nactiData } from './data.mjs';
import { zkontrolujCiziVidea, posbirejVidea, idZOdkazu, nactiSeznam, KANAL_UCITELE } from './cizi-videa.mjs';

let chyb = 0;
let kontrol = 0;
const tvrdi = (popis, podm) => {
	kontrol++;
	console.log(`${podm ? '✅' : '❌'} ${popis}`);
	if (!podm) chyb++;
};

const SCHVALENE = 'Y340hJrbpU8'; // skutečné ID učitelova videa
const CIZI = 'dQw4w9WgXcQ'; // podvržené cizí ID
const seznam = { videa: { [SCHVALENE]: { nazev: 'Video: Síla', kanal: KANAL_UCITELE, autor: 'Radek Micek', overeno: '2026-08-19' } } };

/** Postaví minimální strom `temata` v tom tvaru, v jakém ho vrací data.mjs. */
const strom = (podtema) => ({ 'fyzika/7-rocnik': [{ slug: 'sily', podtemata: [{ slug: 'zkouska', ...podtema }] }] });

// ---------- čtení ID z odkazu (všechny tvary, které se v praxi objeví) ----------
tvrdi("watch?v= se přečte", idZOdkazu('https://www.youtube.com/watch?v=dQw4w9WgXcQ') === CIZI);
tvrdi('youtu.be/ se přečte', idZOdkazu('https://youtu.be/dQw4w9WgXcQ') === CIZI);
tvrdi('/embed/ se přečte', idZOdkazu('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ') === CIZI);
tvrdi('/shorts/ se přečte', idZOdkazu('https://www.youtube.com/shorts/dQw4w9WgXcQ') === CIZI);
tvrdi('watch?v= s dalším parametrem se přečte', idZOdkazu('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s') === CIZI);
tvrdi('odkaz mimo YouTube se nepřečte jako video', idZOdkazu('https://www.zemepis.cz/planety') === null);

// ---------- PODVRHY: každý se musí najít ----------
const a = zkontrolujCiziVidea(strom({ materialy: [{ druh: 'youtube', nazev: 'Podvrh', cesta: CIZI }] }), seznam);
tvrdi('PODVRH cizí VLOŽENÉ video se najde', a.nalezy.length === 1);
tvrdi('  a hláška nese ID', a.nalezy[0]?.includes(CIZI));
tvrdi('  a hláška nese podtéma', a.nalezy[0]?.includes('fyzika/7-rocnik/sily/zkouska'));
tvrdi('  a hláška říká, co s tím', a.nalezy[0]?.includes('youtube-schval.mjs') && a.nalezy[0]?.includes('odstraň'));

// Odkaz na cizí video je tatáž vada jinou cestou — přesně tudy díra vedla dál
// (dvě cizí videa v `odkazy` u slunecni-soustava přežila odstraňování 19. 8. 2026).
const b = zkontrolujCiziVidea(strom({ odkazy: [{ nazev: 'Podvrh odkazem', url: `https://www.youtube.com/watch?v=${CIZI}` }] }), seznam);
tvrdi('PODVRH cizí video jako ODKAZ se najde', b.nalezy.length === 1 && b.nalezy[0].includes('odkaz na YouTube'));
tvrdi('  a odkaz se opravdu sbíral (nebyla to tichá nula)', b.odkazu === 1);

// Obejití tvarem zápisu: ID zapsané jako celá URL v poli `cesta`
const c = zkontrolujCiziVidea(strom({ materialy: [{ druh: 'youtube', nazev: 'Podvrh URL', cesta: `https://youtu.be/${CIZI}` }] }), seznam);
tvrdi('PODVRH cizí ID zapsané jako celá URL se najde', c.nalezy.length === 1 && c.nalezy[0].includes(CIZI));

// Seznam schválených se nesmí dát rozšířit ručním dopsáním ID bez doloženého kanálu
const d = zkontrolujCiziVidea(strom({ materialy: [{ druh: 'youtube', nazev: 'Dopsané', cesta: CIZI }] }), {
	videa: { ...seznam.videa, [CIZI]: { nazev: 'dopsáno rukou', overeno: '2026-08-19' } },
});
tvrdi('PODVRH ručně dopsané ID bez kanálu se najde', d.nalezy.some((n) => n.includes('cizím nebo chybějícím kanálem')));

const e = zkontrolujCiziVidea(strom({ materialy: [{ druh: 'youtube', nazev: 'Dopsané', cesta: CIZI }] }), {
	videa: { ...seznam.videa, [CIZI]: { nazev: 'dopsáno rukou', kanal: 'https://www.youtube.com/@nemecpetr', overeno: '2026-08-19' } },
});
tvrdi('PODVRH ID doložené CIZÍM kanálem se najde', e.nalezy.some((n) => n.includes('@nemecpetr')));

const f = zkontrolujCiziVidea(strom({ materialy: [{ druh: 'youtube', nazev: 'Bez data', cesta: CIZI }] }), {
	videa: { ...seznam.videa, [CIZI]: { nazev: 'x', kanal: KANAL_UCITELE } },
});
tvrdi('PODVRH schválení bez data ověření se najde', f.nalezy.some((n) => n.includes("pole 'overeno'")));

// ---------- ZDRAVÝ STAV: nic se nesmí ozvat ----------
const g = zkontrolujCiziVidea(strom({ materialy: [{ druh: 'youtube', nazev: 'Video: Síla', cesta: SCHVALENE }] }), seznam);
tvrdi(`ZDRAVÝ STAV schválené video mlčí (nálezů ${g.nalezy.length})`, g.nalezy.length === 0);
tvrdi('  a přitom opravdu měřil (1 vložené video)', g.videi === 1 && g.vlozenych === 1);

const h = zkontrolujCiziVidea(strom({ odkazy: [{ nazev: 'Český výklad', url: 'https://www.zemepis.cz/planety' }] }), seznam);
tvrdi('ZDRAVÝ STAV odkaz mimo YouTube mlčí', h.nalezy.length === 0 && h.odkazu === 0);

// ---------- VÝJIMKA DENÍKU: brána do dat cesty.wonderly.cz nesahá ----------
// Videa deníku mají jiný TVAR ({ id, nazev, odkaz } v roce cesty) a žijí v jiném datovém
// stromu (src/data/cesty/<rok>.ts), ne v `temata`. Kontroluje se to strukturou, ne názvem
// souboru: i kdyby takový záznam někdo bráně podstrčil, nesmí ho vzít jako materiál učiva.
const denik = { mesta: [], videa: [{ id: 'oVPrusnGcOk', nazev: 'Rühstädt', odkaz: 'https://youtu.be/oVPrusnGcOk' }] };
tvrdi('VÝJIMKA deník: záznam videa deníku se nesbírá jako materiál učiva', posbirejVidea(denik).length === 0);

// ---------- ostrá data: brána musí opravdu něco měřit a být zelená ----------
const { temata } = await nactiData();
const ostry = zkontrolujCiziVidea(temata);
tvrdi(`ostrá data: ${ostry.podtemat} podtémat, ${ostry.videi} YouTube výskytů, ${ostry.schvalenych} schválených ID`,
	ostry.podtemat > 100 && ostry.videi > 20 && ostry.schvalenych > 20);
tvrdi(`ostrá data jsou bez nálezu (${ostry.nalezy.length})`, ostry.nalezy.length === 0);
for (const n of ostry.nalezy) console.log('   •', n);

// A zpětná kotva: kdyby ze seznamu zmizelo jediné ID, ostrá data MUSÍ spadnout.
// Bez toho by „nula nálezů" mohla znamenat i to, že brána nic neporovnává.
const prvni = Object.keys(nactiSeznam().videa)[0];
const okleslely = { videa: Object.fromEntries(Object.entries(nactiSeznam().videa).filter(([k]) => k !== prvni)) };
const i = zkontrolujCiziVidea(temata, okleslely);
tvrdi(`KOTVA: ubrání ID '${prvni}' ze seznamu ostrá data shodí (nálezů ${i.nalezy.length})`, i.nalezy.length >= 1);

console.log(`\n${chyb === 0 ? '✅' : '❌'} kontrol: ${kontrol}, chyb: ${chyb}`);
process.exit(chyb ? 1 : 0);
