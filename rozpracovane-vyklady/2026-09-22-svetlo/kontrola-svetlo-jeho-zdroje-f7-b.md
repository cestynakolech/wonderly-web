# Nezávislá kontrola B (po opravách) — vyklad-svetlo-jeho-zdroje-f7.md

VERDIKT: NEPROŠLO

NEVYŘEŠENÉ: žádné (1–9 ověřeno v textu jako vyřešené)
- 1 příklady zpět: „mléčné sklo, matné sklo" a „kov, dřevo, beton, zeď, zrcadlo" (OBSAH, Optické prostředí) ✓
- 2 ZAPIS.body telegraficky, 18 položek (dřív 20), duplicity druhotných/bodových zdrojů pryč ✓ (viz DROBNOSTI)
- 3 + 4 klíče `jednotky` i `vzorec: t = s : v` ze ZAPIS odstraněny, výpočet zůstal jen v textu ✓
- 5 `<h2>Světlo a jeho zdroje</h2>` = `nazev` ✓
- 6 prezentace „SVĚTELNÉ JEVY 7" citována jako zdroj snímků 1–15, snímek 15 označen MIMO SCOPE (patří k lom-svetla) ✓
- 7 bioluminiscence doplněna k chemickým zdrojům (PDF str. 3, ověřeno doslovně), rozbíhavost/rovnoběžnost slunečních paprsků doplněna (PDF str. 14, ověřeno) ✓
- 8 „Povrch Slunce má teplotu asi 5 500 °C" ✓ (fyzikálně správně, fotosféra ≈ 5 500 °C / 5 778 K)
- 9 „vidí ho hadi" — netopýři vypuštěni ✓ (PDF str. 2 má „vidí ho hadi, netopýři")

NOVÉ:
1. ZDROJE, řádky „OPRAVA (nález 8)" a „OPRAVA (nález 9)" — tvrzení „chyba podkladu nahlášena učiteli" / „Rozpor podkladu
   nahlášen" NENÍ doloženo: `~/Desktop/Omega/dokumenty/kontrola-podkladu-fyzika7.md` obsahuje k celku Světlo jediný
   záznam (str. 10/21 „ohyb" ze `stin-faze-mesice`), o teplotě 4 500 °C ani o netopýrech tam není nic; grep přes celý
   repozitář i Omega/dokumenty nenašel žádný jiný zápis. Obě změny jsou tedy zatím TICHÁ oprava podkladu proti pravidlu
   „zákaz tiché opravy podkladu" (sesterský výklad `stin-faze-mesice` to zvládl správně).
   OPRAVA: do `kontrola-podkladu-fyzika7.md` doplnit dvě položky — „19. Světlo…, str. 3: Slunce (teplota povrchu asi
   4500 °C) → fotosféra ≈ 5 500 °C" a „19. Světlo…, str. 2: IR — vidí ho hadi, netopýři → netopýři IR nevidí,
   orientují se echolokací"; teprve pak tvrzení v ZDROJE odpovídá skutečnosti. Text výkladu měnit netřeba.

DROBNOSTI:
- ZAPIS.body: 6 položek přes kontraktních „3–6 slov" — nejdelší „Slunce–Země = 150 000 000 km = 1 AU, světlo letí 500 s"
  (13 slov), „nad 525 °C: červená → žlutá → bílá → modrobílá" (10). Nález 2 tím je vyřešen jen zčásti.
- ZAPIS.body vypouští v barevné řadě „oranžovou" (OBSAH i PDF str. 3 ji mají): „červená → žlutá → bílá → modrobílá".
- „průsvitné … (mlha, kouř, mléčné sklo, matné sklo)" — mléčné a matné sklo je fakticky totéž, výčet se opakuje
  (vzniklo splněním nálezu 1, věcně to nevadí).
- „Infračervené záření snímají termokamery a používá se třeba v dálkových ovladačích." — v druhé části věty se mění
  podmět (záření → ono); plynulejší je „…a využívá se třeba v dálkových ovladačích".
- Převzato z PDF, nejde o regresi ani o nový nález: „Plošný zdroj … jeho paprsky jsou rovnoběžné" (PDF str. 13–14) je
  zjednodušení — plošný zdroj vyzařuje do všech směrů, rovnoběžnost platí až pro velkou vzdálenost. Pro 7. ročník
  únosné, ale hodí se to vědět při tvorbě simulace/kvízu.

Ověřeno strojově: JSON ZAPIS validní (18 bodů); v OBSAH žádná věta nad 20 slov, žádný odstavec nad 4 věty;
1× h2, 7× h3 (strop 7), 0× <em>; v OBSAH ani ZAPIS žádný metakomentář (MIMO SCOPE/HOTOVO jen v ZDROJE).
Čísla přepočítána: 150 000 000 : 300 000 = 500 s = 8 min 20 s; 300 000 000 m/s ✓. Citace PDF 19 str. 2, 3, 14, 15, 16
ověřeny doslovně (pypdf).
