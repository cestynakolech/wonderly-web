# 🎵 SUNO MEGA WAVE 1 — Návod na stahování

## TL;DR
1. Otevři https://suno.ai/me (tvůj Suno profil)
2. Projdi skladby a klikni **Download** na každou
3. Soubory půjdou do `~/Downloads/`
4. Spusť: `python3 ~/Desktop/wonderly-web/suno-organize.py --auto`
5. ✅ Skladby se zorganizují do fyziky!

---

## Podrobný postup

### KROK 1: Otevři Suno profil
```bash
open "https://suno.ai/me"
```

### KROK 2: Stáhni skladby
- Na každou skladbu klikni → **⬇️ Download**
- Soubory se uloží do `~/Downloads/` (defaultní umístění)
- Tempo: ~1 MP3 za 2-5 sekund (bez bottlenecku!)

### KROK 3: Organizuj v terminále
Jakmile máš MP3 v Downloads, spusť:

```bash
python3 ~/Desktop/wonderly-web/suno-organize.py --auto
```

**Výstup:**
```
📁 Nalezeno 50 MP3 souborů v Downloads

✓ energie-vsude.mp3
  ↳ 6-rocnik/uvod-do-fyziky/
✓ skladani-sil.mp3
  ↳ 7-rocnik/sily-kolem-nas/
...

📊 Výsledek:
  Organizováno: 50
  Přeskočeno:   0

✅ Přidáno: 50 nových MP3 (celkem: 51)
```

### KROK 4: Ověření
```bash
# Počet MP3 v každém ročníku
find ~/Desktop/wonderly-web/public/materialy/fyzika -name "*.mp3" | wc -l

# Detailní rozpis
find ~/Desktop/wonderly-web/public/materialy/fyzika -name "*.mp3" -exec dirname {} \; | sort | uniq -c
```

---

## 📋 Kontrolní seznam skladeb

Najdi v Suno profilu tyto skladby a stáhni je:

### 6. ročník (15 skladeb)
- energie-vsude, fyzika-v-prirode, zakladni-pojmy, sila-a-pohyb
- teplo-a-teplota-zaklady, zvuk-a-sluch, svetlo-a-viden
- elektricita-zaklady, magnet-a-pole, pohyb-v-kosmou
- voda-a-vzduch, masa-a-vaha, tření-a-odpor, energia-prenosy

### 7. ročník (25 skladeb)
- sila-a-jeji-ucinky, skladani-sil, pravaidelnost-sil
- gravitace-a-hmotnost, hybnost-a-impuls, paka-a-kladka
- mecanicke-energie, prace-a-vykon, jednoduche-stroje
- mecanicke-vlastnosti, pevnost-a-tuhost, elasticita, plasticnost
- kapaline-tlakem, atmosfericky-tlak, archimeduvprincip, vztlak
- plynny-tlak, stavy-hmoty, tepelna-roztaznost, tepelna-kapacita
- premeny-energie, tření-druhy, odpor-prostredku

### 8. ročník (20 skladeb)
- prace-jako-fyzikalni-velicina, vykon-a-ucinnost
- kinetická-energia, potenciální-energia, zakon-zachovani-energie
- energia-v-prirode, sluneční-energia, fosilní-paliva, jaderna-energia
- elektricka-energia, elektricke-pole, napeti-a-proud
- odpor-vodiče, ohmův-zakon, elektricke-obvody
- magneticke-pole, elektromegnet, indukcí-elektrickeho-proudu
- transformátor, elektromotor

### 9. ročník (30+ skladeb)
- elektricka-nabjatost, elektricke-pole-rozbor, vodiče-izolanty
- elektricke-obvody-komplexni, kondenzátor, baterie-clanky
- elektrolýza, magneticke-pole-detaily, magneticke-spektrum
- permanentní-magnety, elektromegnetizmus, transformátor-detaily
- elektromagnet-detaily, indukce-faraday, vlastní-indukce
- vzajemná-indukce, generátor, motor-detaily, alternátor
- transformace-energie-elektrizace, svetlo-jako-vlna
- pritomnost-svetla, odraz-svetla, zrcadla-druhy, kulata-zrcadla
- lomena-svetla, hranol-disperze, cočka-druhy, tenka-čočka
- oko-jako-opticky-pristroj, optické-vady, korekce-zraku
- dalekohled, mikroskop, spektrální-složení

---

## 🛠️ Troubleshooting

### ❌ Script nepřesouvá soubory
```bash
# Ověř, že soubory opravdu jsou v Downloads
ls -la ~/Downloads/*.mp3

# Ověř, že script je spustitelný
chmod +x ~/Desktop/wonderly-web/suno-organize.py

# Spusť s verbózním režimem
python3 ~/Desktop/wonderly-web/suno-organize.py
```

### ❌ Soubory nejsou rozpoznány
- Jména souborů musí obsahovat klíčová slova (energie, sila, atd.)
- Pokud Suno jmenuje "song-abc123.mp3", ručně přejmenuj a pak spusť script znovu

### ❌ Permission denied
```bash
sudo chown -R $(whoami) ~/Desktop/wonderly-web/
```

---

## 📊 Cíl
- **Dnes: 50+ MP3** (31% pokrytí)
- **Brzy: 116 MP3** (100% fyziky)

Tempo: ~1 MP3 za 2-5 sekund = **50 MP3 ≈ 5-10 minut**

Jdeme na to! 🚀
