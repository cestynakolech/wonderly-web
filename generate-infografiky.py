#!/usr/bin/env python3
"""
Generátor infografik pro VLNU 7 (F6, F8, F9)
Vytváří PNG infografiky v stylu existujících F7 infografik
"""

import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

# Definice infografik - struktura: {
#   "rocnik": "6|8|9",
#   "tema": "...",
#   "podtema": "...",
#   "nadpis": "...",
#   "popis": "...",
#   "items": [...]
# }

INFOGRAFIKY = [
    # F6
    {
        "rocnik": "6",
        "tema": "cas",
        "podtema": "cas-a-jeho-mereni",
        "nadpis": "Čas a jeho měření",
        "popis": "Jak se čas měří?",
        "items": [
            "1️⃣ Jednotky času: sekunda (s), minuta (min), hodina (h), den, rok",
            "2️⃣ Měření času: hodiny, stopky, chronometr",
            "3️⃣ Perioda: čas, za který se opakuje stejný jev",
        ]
    },
    {
        "rocnik": "6",
        "tema": "latka-a-teleso",
        "podtema": "atomy-a-molekuly",
        "nadpis": "Atomy a molekuly",
        "popis": "Nejmenší částice hmoty",
        "items": [
            "1️⃣ Atom: nejmenší částice prvku",
            "2️⃣ Molekula: spojení atomů",
            "3️⃣ Všechny látky se skládají z atomů a molekul",
        ]
    },
    {
        "rocnik": "6",
        "tema": "latka-a-teleso",
        "podtema": "telesa-a-latky",
        "nadpis": "Tělesa a látky",
        "popis": "Rozdíl mezi tělesem a látkou",
        "items": [
            "1️⃣ Těleso: věc s určitým tvarem (kniha, sklenice)",
            "2️⃣ Látka: druh hmoty (papír, sklo, voda)",
            "3️⃣ Jedno těleso = jedna látka → jedno podstupuje",
        ]
    },
    {
        "rocnik": "6",
        "tema": "teplota",
        "podtema": "teplota-a-jeji-mereni",
        "nadpis": "Teplota a její měření",
        "popis": "Jak měříme stupeň zahřátí",
        "items": [
            "1️⃣ Teplota: míra pohybu částic",
            "2️⃣ Jednotka: °C (stupeň Celsia) nebo K (Kelvin)",
            "3️⃣ Teplotu měříme teploměrem",
        ]
    },
    {
        "rocnik": "6",
        "tema": "elektrina-a-magnetismus",
        "podtema": "magneticke-vlastnosti-latek",
        "nadpis": "Magnetické vlastnosti látek",
        "popis": "Které látky přitahuje magnet?",
        "items": [
            "1️⃣ Feromagnetické: železo, nikl, kobalt (přitahuje magnet)",
            "2️⃣ Paramagnetické: slabě přitahované",
            "3️⃣ Diamagnetické: odpuzované magnetem",
        ]
    },
    {
        "rocnik": "6",
        "tema": "sila",
        "podtema": "vzajemne-pusobeni-teles-sila",
        "nadpis": "Vzájemné působení těles — síla",
        "popis": "Síla = tlačení nebo tažení",
        "items": [
            "1️⃣ Síla: vzájemné působení mezi tělesy",
            "2️⃣ Příklady: padající jablko, magnetická přitažlivost",
            "3️⃣ Jednotka: newton (N)",
        ]
    },
    {
        "rocnik": "6",
        "tema": "fyzikalni-veliciny",
        "podtema": "delka",
        "nadpis": "Délka — měření",
        "popis": "Jak měříme vzdálenosti?",
        "items": [
            "1️⃣ Jednotka: metr (m), centimetr (cm), milimetr (mm)",
            "2️⃣ Nástroje: měřítko, metr, posuvné měřítko",
            "3️⃣ Vztahy: 1 m = 100 cm = 1000 mm",
        ]
    },
    # F8
    {
        "rocnik": "8",
        "tema": "energie",
        "podtema": "energie-a-jeji-premeny",
        "nadpis": "Energie a její přeměny",
        "popis": "Energia se mění z jedné formy na druhou",
        "items": [
            "1️⃣ Energie: schopnost konnat práci",
            "2️⃣ Formy: tepelná, elektrická, mechanická, jaderná",
            "3️⃣ Zákon: energie se nemůže ztratit, jen přeměňuje",
        ]
    },
    {
        "rocnik": "8",
        "tema": "teplo-a-zmeny-skupenstvi",
        "podtema": "teplo-a-premeny-skupenstvi",
        "nadpis": "Teplo a přeměny skupenství",
        "popis": "Jak se mění skupenství látek?",
        "items": [
            "1️⃣ Tání: pevné → kapalné (led → voda)",
            "2️⃣ Varu: kapalné → plynné (voda → páry)",
            "3️⃣ Kondenzace: plynné → kapalné (páry → voda)",
        ]
    },
    {
        "rocnik": "8",
        "tema": "zvuk",
        "podtema": "zvuk-vznik-a-sireni",
        "nadpis": "Zvuk — vznik a šíření",
        "popis": "Jak vzniká a šíří se zvuk?",
        "items": [
            "1️⃣ Zvuk: kmitání a vlnění prostředím",
            "2️⃣ Potřebuje prostředí (není ve vakuu)",
            "3️⃣ Šíří se postupně, má omezenou rychlost (~340 m/s ve vzduchu)",
        ]
    },
    {
        "rocnik": "8",
        "tema": "mechanicka-prace-a-vykon",
        "podtema": "mechanicka-prace",
        "nadpis": "Mechanická práce",
        "popis": "Co je to práce ve fyzice?",
        "items": [
            "1️⃣ Práce: přenesení energie, W = F · s",
            "2️⃣ Jednotka: joule (J)",
            "3️⃣ Příklady: zvednutí tělesa, posun tělesa",
        ]
    },
    {
        "rocnik": "8",
        "tema": "tepelne-motory",
        "podtema": "tepelny-motor-parni-stroj",
        "nadpis": "Tepelné motory — parní stroj",
        "popis": "Jak funguje parní stroj?",
        "items": [
            "1️⃣ Parní stroj: přeměňuje teplo → mechanickou práci",
            "2️⃣ Pára se zahřívá ve котлі",
            "3️⃣ Vysokotlaká pára pohání píst",
        ]
    },
    {
        "rocnik": "8",
        "tema": "elektrina",
        "podtema": "ohmuv-zakon",
        "nadpis": "Ohmův zákon",
        "popis": "Vztah napětí, proudu a odporu",
        "items": [
            "1️⃣ U = R · I (napětí = odpor × proud)",
            "2️⃣ Čím vyšší odpor → čím nižší proud",
            "3️⃣ Jednotky: V (volt), Ω (ohm), A (ampér)",
        ]
    },
    {
        "rocnik": "8",
        "tema": "elektrina",
        "podtema": "elektricka-sila",
        "nadpis": "Elektrická síla",
        "popis": "Síla mezi nabitými částicemi",
        "items": [
            "1️⃣ Stejné náboje se odpuzují",
            "2️⃣ Opačné náboje se přitahují",
            "3️⃣ Síla závisí na velikosti nábojů a vzdálenosti",
        ]
    },
    # F9
    {
        "rocnik": "9",
        "tema": "elektricky-proud-a-naboj",
        "podtema": "elektricky-naboj",
        "nadpis": "Elektrický náboj",
        "popis": "Co je elektrický náboj?",
        "items": [
            "1️⃣ Náboj: základní vlastnost hmoty (kladný nebo záporný)",
            "2️⃣ Jednotka: coulomb (C)",
            "3️⃣ Elementární náboj: náboj jednoho elektronu = −1,6 × 10⁻¹⁹ C",
        ]
    },
]

def create_infografika(nadpis, popis, items, output_path, rocnik):
    """Vytvoř PNG infografiku v přibližném stylu F7 infografik"""
    
    # Rozměry
    width, height = 1200, 800
    bg_color = (240, 240, 237)
    
    # Vytvoř obraz
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Fonty (pokuš se načíst systémový font, fallback na default)
    try:
        title_font = ImageFont.truetype("/Library/Fonts/Arial Bold.ttf", 48)
        subtitle_font = ImageFont.truetype("/Library/Fonts/Arial.ttf", 24)
        text_font = ImageFont.truetype("/Library/Fonts/Arial.ttf", 18)
        small_font = ImageFont.truetype("/Library/Fonts/Arial.ttf", 14)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        text_font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Barvy podle ročníku
    colors = {
        "6": {"header": (220, 100, 80), "accent": (255, 120, 0), "text": (40, 40, 40), "border": (100, 100, 100)},
        "8": {"header": (80, 150, 220), "accent": (0, 120, 215), "text": (40, 40, 40), "border": (100, 100, 100)},
        "9": {"header": (150, 80, 200), "accent": (180, 100, 220), "text": (40, 40, 40), "border": (100, 100, 100)},
    }
    color = colors.get(rocnik, colors["6"])
    
    # Nadpis s čárou (jako v F7)
    y = 30
    draw.text((50, y), nadpis, fill=color["header"], font=title_font)
    draw.line([(50, y + 55), (1150, y + 55)], fill=color["accent"], width=3)
    
    # Popis
    y = 100
    draw.text((50, y), popis, fill=color["text"], font=subtitle_font)
    
    # Boxy s položkami
    y = 160
    box_height = 180
    box_width = 1100
    border_width = 2
    
    for i, item in enumerate(items[:3]):  # Max 3 položky
        # Rámeček
        box_y = y + i * (box_height + 20)
        draw.rectangle(
            [(40, box_y), (40 + box_width, box_y + box_height)],
            outline=color["border"],
            width=border_width
        )
        
        # Číslo
        circle_x, circle_y = 70, box_y + 20
        draw.ellipse(
            [(circle_x - 15, circle_y - 15), (circle_x + 15, circle_y + 15)],
            fill=color["accent"],
            outline=color["text"],
            width=2
        )
        draw.text((circle_x - 7, circle_y - 10), str(i + 1), fill="white", font=text_font)
        
        # Text položky
        text_x = circle_x + 40
        text_y = box_y + 25
        
        # Zalomení textu
        wrapped = textwrap.fill(item[2:], width=80)  # Odsekni emoji
        draw.text((text_x, text_y), wrapped, fill=color["text"], font=text_font)
    
    # Footer
    footer_y = height - 40
    draw.text((50, footer_y), f"Fyzika · {rocnik}. ročník · lab.wonderly.cz", 
              fill=(100, 100, 100), font=small_font)
    
    # Ulož PNG
    img.save(output_path, 'PNG', quality=85)
    print(f"✅ Vytvořena: {output_path}")

# Generuj infografiky
base_dir = "/Users/radek_soukromy/Desktop/wonderly-web/public/materialy/fyzika"

for info in INFOGRAFIKY:
    rocnik = info["rocnik"]
    tema = info["tema"]
    podtema = info["podtema"]
    
    # Cesta k souboru
    output_dir = f"{base_dir}/{rocnik}-rocnik/{tema}/{podtema}"
    os.makedirs(output_dir, exist_ok=True)
    
    output_path = f"{output_dir}/infografika-prehled.jpg"
    
    # Vytvoř infografiku
    create_infografika(
        nadpis=info["nadpis"],
        popis=info["popis"],
        items=info["items"],
        output_path=output_path,
        rocnik=rocnik
    )

print(f"\n✨ Vygenerováno {len(INFOGRAFIKY)} infografik")
print("Nyní je potřeba:")
print("1. Přidat materiály do temata.ts")
print("2. npm run build")
print("3. git push")
