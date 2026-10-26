# ServiceFloors

Sekce Služby: hairline kresba tří vzorků podlahy na jednom betonovém podkladu, propojená se třemi kartami služeb – vybraný vzorek se otevře.

## Co se děje

- **Lepený vinyl** – dílec se nadzvedne a odloupne a odhalí hřebeny lepidla po zubové stěrce.
- **PVC** – role se rozroluje k divákovi.
- **Koberec** – vlas se rozvlní.
- Ostatní vzorky se zavřou, s odstupem 45 ms od vybraného. Horní plocha otevřeného vzorku je jediná linka v barvě `hairline-hi` (okrová).

## Ovládání

- **Výběr** (klik, klepnutí, Enter nebo mezerník na kartě, klepnutí na vzorek): vzorek se otevře a zůstane otevřený; karta má `aria-pressed="true"`, podklad `accent-soft` a dvojitý grafitový rámeček `ink`. Karty nemají čísla: pořadí nese poloha vzorku v kresbě. Druhý výběr stejné karty ho zavře.
- **Náhled** (jen myš): najetí na kartu nebo vzorek ho dočasně otevře a kartu orámuje linkou `line-strong`; po odjetí se vrátí vybraný vzorek.
- Fokus z klávesnice sám nic neotevírá, takže procházení Tabem neblikají vzorky.
- Nápověda v rohu kresby: „Najeďte na službu“, na zařízeních bez hoveru (`hover: none`) „Klepněte na službu“. Není to živá oblast – stav nese `aria-pressed` karet.
- Při prvním zobrazení (50 % plochy v okně) proběhne jednou krátká prohlídka 0 → 1 → 2 → klid. Jakýkoli zásah ruky ji zruší. Při `prefers-reduced-motion` se prohlídka nespustí a pružiny doskočí okamžitě.

## Co dodává web

- Knihovnu `components/lib/hairline.js` (globální `HL`), načtenou před skriptem sekce.
- Pořadí karet musí odpovídat pořadí vzorků v kresbě: lepený vinyl, PVC, koberec (vzadu vlevo → vpředu vpravo).
- Barvy kresby se berou z tokenů `hairline-plate`, `hairline-hi`, `hairline-edge`, `hairline-mid`, `hairline-lo`; nic se nenastavuje natvrdo.

## Rozvržení

- Desktop: kresba vlevo (1,1 fr, lepí se při scrollu), karty vpravo (0,9 fr), pod nimi štítky doplňkových služeb.
- Pod 720 px: kresba nahoře, lepí se (max. 34 % výšky okna) a karty pod ní projíždějí, takže je změna vidět i u karty 03. Odsazení shora nastav proměnnou `--sp-header-h` na výšku lepící hlavičky; karty mají `scroll-margin-top`, aby se karta s fokusem neschovala pod kresbu.

## Ano / ne

- Ano: texty karet z dokumentu Texty webu, sekce 2.
- Ne: přidávat čtvrtý vzorek bez úpravy kresby; měnit barvy linek mimo tokeny; spouštět prohlídku opakovaně.
