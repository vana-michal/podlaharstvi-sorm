# Button

Tlačítka a odkazy: hlavní (`sp-btn--primary`), vedlejší s rámečkem (`sp-btn--secondary`), menší varianta (`sp-btn--small`) a textový odkaz (`sp-link`).

- **Hlavní** – výplň `accent` (žlutá), text `on-accent` (grafit), hover `accent-hover`. Jedno na obrazovku: „Nezávazná poptávka“, „Odeslat poptávku“, telefon v hlavičce.
- **Vedlejší** – průhledné, rámeček `line-strong`, text `ink`, hover `surface-sunk`. Pro „Zavolat 607 770 193“ vedle hlavního tlačítka.
- **Odkaz** – `accent-ink` (okrová), podtržení 1 px s odstupem 4 px, při hoveru 2 px. Bez šipky za textem.
- Výška 48 px (malé 40 px, na dotykových zařízeních 44 px), rádius `radius-sm`, text ve stylu `button`. Ikona 20 px vlevo, vždy s textem.
- Stisk: posun o 1 px dolů. Neaktivní (`disabled`): `surface-sunk`, text `ink-muted`. Odesílání (`aria-busy="true"`): hlavní tlačítko si nechá barvu a přibude točítko.
- Telefon je vždy odkaz `tel:+420607770193`, nikdy jen text.
- Fokus: 2px grafitová linka `focus-ring` s odstupem 2 px – jedno pravidlo pro všechny odkazy, tlačítka a pole v `bundle.css`.
- Na mobilu se tlačítka v hero roztáhnou na celou šířku.
- Ne: víc než jedno hlavní tlačítko vedle sebe; tlačítko jen s ikonou bez `aria-label`.
