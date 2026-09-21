VERDIKT: NEPROŠLO

NEVYŘEŠENÉ: žádné
- Nález 1 (ZÁVAŽNÝ) vyřešen: ZAPIS.body nově obsahuje „perioda T: doba jednoho kmitu" a
  „frekvence f: počet kmitů za sekundu" (10 bodů). Opora PDF 33 str. 3: „Perioda – Doba
  jednoho kmitu", „Frekvence – Počet kmitů za 1 sekundu" (ověřeno pdftotext).
- Nález 2, první část vyřešena: „Kyv — pohyb tělesa jen jedním směrem, tedy polovina kmitu."
  je v OBSAH (sekce Základní pojmy kmitání), opora From_Particle_to_Wave.md snímek 3.
  Druhá část viz NOVÉ 1.
- Nález 3 vyřešen: `<h2>Kmitání a vlnění (nad rámec RVP)</h2>` odpovídá poli `nazev`
  (temata.ts:2799) i precedentu temata.ts:2706.
- Nález 4 vyřešen: „Pro zvídavé" už příklad neopakuje, jen odkazuje („Houpačka z úvodu
  má f = 2 Hz. Spočítáme periodu.") a dopočítává.
- Nález 5 vyřešen: dlouhé věty rozděleny, strojově ověřeno — žádná věta v OBSAH nad 20 slov.

NOVÉ:
1. ZDROJE, poslední odrážka: „Popis prezentace From_Particle_to_Wave.md (snímek 12) obsahuje
   pojem „stojaté vlnění" … NAVRŽENO K DOPLNĚNÍ — k rozhodnutí učitele, do OBSAH zatím
   nezařazeno …". Formulace „NAVRŽENO K DOPLNĚNÍ" a „k rozhodnutí učitele" je metakomentář
   o rozhodovacím procesu, ne věcná citace zdroje. Rozhodnutí je přitom už učiněno (stojaté
   vlnění se nezařazuje). OPRAVA: nahradit celou odrážku věcnou citací, např.:
   „Prezentace From_Particle_to_Wave.md, snímek 12: stojaté vlnění (superpozice dvou
   protiběžných vln, uzly). V PDF 33 ani v dosavadním bloku temata.ts není; do OBSAH
   nezařazeno." — bez slov „navrženo", „k rozhodnutí", „zatím".

DROBNOSTI:
- OBSAH: dovětek „tedy polovina kmitu" u pojmu Kyv nemá doslovnou oporu — prezentace
  (snímek 3) uvádí jen „KYV – pohyb pouze jedním směrem", PDF 33 slovo „kyv" vůbec
  neobsahuje (grep). Tvrzení plyne z definice kmitu, je věcně správné, ale citace v ZDROJE
  ho nepokrývá celé.
- ZAPIS.body nově zavedený pojem „kyv" neobsahuje, ačkoli OBSAH ho učí; zápis má kopírovat
  výklad. Doporučení, ne nález.

OVĚŘENO STROJOVĚ:
- JSON v ZAPIS validní (json.loads), klíče vzorec/jednotky/vzorecSlovy/body, 10 bodů.
- Žádná věta nad 20 slov, žádný odstavec nad 4 věty, h2 = 1, h3 = 6, žádný `<em>`,
  žádné čtyřciferné číslo bez mezery, žádný metakomentář v OBSAH ani ZAPIS.
- Přepočítáno: T = 1 : 2 = 0,5 s; λ = 2 · 3 = 6 m; λ = 340 : 170 = 2 m — sedí.
- Citace stran proti PDF 33 (pdftotext, 8 stran): str. 3 perioda/frekvence/kmit/amplituda,
  str. 4 převrácené hodnoty a příklad houpačky, str. 6 vlnová délka, značka v, λ = v·T = v:f
  a věta o vazbě částic, str. 7 příčné/podélné včetně „klasy obilí v poli za větru" — vše sedí.
