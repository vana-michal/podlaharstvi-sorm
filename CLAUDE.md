# Web: Podlahářství Michal Šorm

Jednostránkový web liberecského podlaháře (PVC, lepený vinyl, koberce). Jazyk webu je čeština.

## Zdroje – čti před každou větší změnou

- `design-system/README.md` – brand book: barvy, typografie, rozvržení, skladba stránky, hlas textů, přístupnost. **Toto je hlavní pravidlo projektu.**
- `design-system/components/<Komponenta>/README.md` – pravidla každé komponenty.
- `design-system/components/<Komponenta>/preview.html` – hotové HTML a JS komponenty. Jsou to fragmenty: počítají s tím, že stránka už načetla `tokens.css`, `components/bundle.css` a `components/lib/hairline.js` (globál `HL`). Řádek `<!-- @dsCard … -->` na začátku je jen popisek galerie, na web nepatří.
- `design-system/tokens.json` – zdroj všech hodnot. `tokens.css` se z něj generuje příkazem `python3 nastroje/generuj-tokens.py`; ručně ho needituj.
- `obsah/texty-webu.md` – texty sekcí, recenze, SEO a seznam věcí k ověření s klientem.

Když se texty v `obsah/texty-webu.md` liší od náhledů komponent nebo od pravidel v `design-system/README.md`, platí design systém (je novější): bez teček mezi údaji („A · B“), bez šipek za odkazy, bez obecných přívlastků jako „precizní“ nebo „kompletní“, první osoba a vykání. Citované recenze se nemění.

## Technika

- Čisté HTML, CSS a JS bez frameworku a bez build kroku, dokud o něm nerozhodneme jinak.
- Struktura: `index.html`, `css/` (tokens.css, bundle.css, případně site.css), `js/` (hairline.js, skripty komponent), `img/`, `zasady-ochrany-osobnich-udaju.html`.
- Styly komponent ber z `bundle.css` beze změn; úpravy pro web dávej do `css/site.css`.
- Barvy, mezery a rádiusy jen přes CSS proměnné z tokenů, nikdy natvrdo.
- Písmo Archivo z Google Fonts (import je v `bundle.css`).
- Motiv Den je výchozí, Noc podle nastavení systému (`prefers-color-scheme`), řeší to `tokens.css`.
- Ikony vkládej jako inline SVG se `stroke="currentColor"` (podoby jsou v náhledech komponent).
- Lokální náhled: `python3 -m http.server 8000` ve složce webu.

## Pravidla práce

- Měň jen to, oč se žádá. Po každém hotovém kroku navrhni commit.
- Zástupné údaje (seznam v `design-system/README.md`, sekce „Ukázková data“, a body `[ověřit]` v textech) na web nepatří bez potvrzení. Dokud nejsou potvrzené, označ je v HTML komentářem `<!-- OVĚŘIT: … -->` a vypiš je na konci odpovědi.
- Fotky jen z realizací, 1600 px na šířku, WebP, alt text popisuje materiál a místnost. Dokud fotky nejsou, nech zástupné kresby z náhledů.
- Formulář zatím neodesílá nikam. Než se napojí (formulářová služba nebo skript na hostingu), zeptej se.
- Před dokončením zkontroluj: šířka 375 px i 1280 px, ovládání klávesnicí a viditelný fokus, `prefers-reduced-motion`, oba barevné motivy, kontrast textu min. 4,5 : 1.
