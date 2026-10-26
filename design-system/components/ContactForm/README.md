# ContactForm

Poptávkový formulář s kontaktními údaji: povinné jsou jen jméno, telefon, obec a souhlas, zbytek pomáhá s naceněním.

- Pole: Jméno, Telefon, E-mail, Obec, Typ podlahy (výběr PVC / Lepený vinyl / Koberec / Zatím nevím), Přibližná plocha (m²), Fotky místnosti, Zpráva, souhlas se zpracováním údajů.
- Popisek nad polem (15 px, 600), nepovinná pole s doplňkem „(nepovinné)“ v `ink-muted`.
- Pole: výška 48 px, pozadí `surface`, rámeček `line-strong`, rádius `radius-sm`, fokus `focus-ring`.
- Typ podlahy: přepínače ve tvaru pilulky (`radius-pill`, výška 44 px); vybraný má výplň `ink` a text `surface`. **Žádná volba není předvybraná** – výchozí hodnota by se odeslala i za toho, kdo pole přeskočil.
- Zástupný text vždy začíná „např.“ („např. Jablonec nad Nisou“), aby se nedal splést s vyplněnou hodnotou.
- Fotky: text „Přidat fotky místnosti“; skutečný `<input type="file">` uvnitř štítku, skrytý jen vizuálně (`sp-sr-only`), takže je dosažitelný Tabem; fokus kreslí rámeček na celé ploše (`:focus-within`). Po výběru se text změní na „Vybráno: 2 fotky“ (české tvary přes `Intl.PluralRules`).
- Kontrola při odeslání: povinná pole s chybou dostanou `aria-invalid="true"`, rámeček `danger` a text chyby propojený přes `aria-describedby`; fokus skočí na první chybné pole. Texty: „Zadejte jméno.“, „Zadejte telefon, ať se vám můžu ozvat.“, „Napište obec, kde je podlaha.“, „Bez souhlasu poptávku nemůžu zpracovat.“ Chyba zmizí, jakmile je pole opravené.
- Odesílání: tlačítko `disabled` + `aria-busy="true"`, text „Odesílám…“ s točítkem (při omezeném pohybu bez rotace) – brání dvojímu odeslání.
- Odesláno: formulář nahradí blok `sp-success` s `role="status"` a fokusem: „Děkuji, poptávka dorazila. Ozvu se vám do 24 hodin.“
- Všechny tři stavy ukazuje náhled pod formulářem.
- Vedle formuláře velký telefon, e-mail, oblast působnosti a pod tím jméno a IČO na dvou řádcích ve stylu `small`; pod 820 px jsou údaje nad formulářem.
- Web dodává: odesílání (např. formulářová služba nebo vlastní skript), ochranu proti spamu bez CAPTCHA (skryté pole) a stránku Zásady ochrany osobních údajů.
