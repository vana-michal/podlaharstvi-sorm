Design kit jednostránkového webu podlaháře Michala Šorma z Liberce (PVC, lepený vinyl, koberce). Vizuální jazyk vychází z řemesla: technický výkres, kóty a vlasové linky. Má působit přesně, čistě a klidně – tak, jak zákazníci v recenzích popisují jeho práci.

## Princip

- **Přesnost místo efektů.** Oddělují linky, ne stíny a barevné plochy. Jedinou výjimkou je `shadow-badge` u odznaku se stěrkou.
- **Jedna barva pro akci.** `accent` (žlutá svinovacího metru) je jen výplň: hlavní tlačítko, odznak se stěrkou, hrana před/po a hvězdy. Text na ní je vždy grafitový. Všechno ostatní je grafit `ink`, `ink-muted`, bílá a šeď stěrky.
- **Kresba ukazuje řemeslo.** Dva pohyblivé prvky – hairline podlahy ve Službách a stěrka v Referencích – jsou jediné animace na stránce.

## Obsah a hlas

- První osoba jednotného čísla, vykání: „Přijedu, změřím a poradím.“ Nikdy „naše firma“, „komplexní řešení“.
- Krátké věty, konkrétní čísla: „od roku 2004“, „68 m², hotovo za 3 dny“, „do 24 hodin“.
- Bez vykřičníků a emoji (kromě citovaných recenzí, ty se nemění).
- Štítky v `label` a parametry v `measure` píšeme běžnou velikostí písmen, údaje oddělujeme čárkou: „Lepený vinyl, 68 m², hotovo za 3 dny“.
- Nad nadpisy sekcí nedáváme štítky ani čísla. Čísla 01–04 patří jen ke skutečnému postupu (`ProcessSteps`).
- Nepoužíváme tečky mezi údaji („A · B · C“), šipky za textem odkazů ani dovětky za pomlčkou („Nadpis – dovětek“). Místo obecných přívlastků („precizní“, „kompletní“) píšeme, co se konkrétně udělá.
- Telefon se píše `607 770 193` a je vždy klikací (`tel:+420607770193`).
- Texty sekcí jsou v dokumentu „Texty webu – Podlahářství Michal Šorm“.
- Oblast působnosti se píše vždy stejně: „Liberec, Jablonec nad Nisou a okolí“.

## Ukázková data – nahradit před spuštěním

Náhledy obsahují zástupné údaje. Žádný z nich nesmí na web, dokud ho klient nepotvrdí nebo nenahradí skutečným:

- Hero: popisek fotky „Obývací pokoj, lepený vinyl, 22 m²“ a kóty 4,20 × 5,25 m – nahradit údaji ze skutečné zakázky na fotce.
- Hero: „5,0 na Googlu“ – ověřit aktuální hodnocení.
- Hero: „Zákazníci v recenzích nejčastěji píšou o přesné a čisté práci.“ – ověřit, že to platí pro všechny recenze.
- Oblast „Liberec, Jablonec nad Nisou a okolí“ – ověřit.
- BeforeAfter: „Byt 3+1, Liberec-Rochlice“ s parametry „Lepený vinyl, 68 m², hotovo za 3 dny“ a kreslené podlahy – nahradit skutečnými zakázkami a fotkami.
- ContactForm: „Ozvu se vám do 24 hodin.“ – ověřit, že to klient zvládne.
- ReviewCard: odkazy „Všechny recenze na Google“ a „Napsat recenzi“ – doplnit adresy profilu (teď `#`).

## Barvy

Paleta „stěrka a metr“: bílá, šeď nivelační stěrky, grafit tužky a žlutá svinovacího metru. Dva motivy: **Den** (výchozí) a **Noc** (podle nastavení systému). Hodnoty se nikdy nepíšou natvrdo, vždy přes tokeny.

- Pozadí stránky `surface`; karty, formulář a deska kresby `surface-raised`; střídavé sekce (Recenze, Kontakt) `surface-sunk`.
- Text `ink`, doprovodný text `ink-muted`; obojí čitelné na všech plochách i na `accent-soft` v obou motivech (min. 5 : 1).
- Žlutou `accent` nikdy jako text ani linku na světlé ploše (1,6 : 1). Barevný text a odkazy `accent-ink` (tmavá okrová), text na výplni `accent` vždy `on-accent` (grafit). Hover hlavního tlačítka `accent-hover`.
- Vybraná karta služby má podklad `accent-soft` a grafitový dvojitý rámeček.
- Linky `line` (dekor), okraje polí a vedlejších tlačítek `line-strong` (min. 3 : 1).
- Chyba `danger`, vždy s textem chyby.
- Hairline kresba čte `hairline-plate`, `hairline-hi`, `hairline-edge`, `hairline-mid`, `hairline-lo`.

## Typografie

- Jediné písmo je **Archivo** (Google Fonts, variabilní šířka i váha). Nadpisy `display` a `h2` sázej se šířkou 108–112 % (`font-stretch`), aby působily pevně; text v normální šířce.
- Štítky `label` jsou Archivo 600 v užším řezu (88 %), běžnou velikostí písmen, bez prostrkání. Parametry `measure` mají tabulkové číslice.
- Stupnice: `display` 64/60, `h2` 40/44, `h3` 22/28, `lead` 20/30, `body` 17/27, `small` 15/22, `button` 16/20. Na mobilu `display-mobile` 40/42 a `h2` 30/34.
- Písmo má českou diakritiku (latin-ext). Načítá se v `components/bundle.css`.

## Rozvržení

- Obsah max. `container` (1200 px), odstavce max. `text-max` (640 px).
- Boční okraj `space-8` na desktopu, `space-4` na mobilu (pod 720 px).
- Svislé odsazení sekce `space-24`, na mobilu `space-16`. Nadpis sekce od obsahu `space-12`.
- Rádiusy: `radius-sm` tlačítka a pole, `radius-md` karty a fotky, `radius-lg` deska kresby a rám před/po, `radius-pill` odznak a výběr typu podlahy.

## Skladba stránky

1. `Header` – lepí se nahoře.
2. `Hero` – nadpis, benefity, výzvy, fotka v kótách.
3. Služby – `SectionHeading`, `ServiceFloors`, `ProcessSteps`.
4. Reference – `SectionHeading`, mřížka `BeforeAfter` (2 sloupce, na mobilu 1), 6–9 zakázek.
5. Recenze – `SectionHeading` na `surface-sunk`, `ReviewCard`: jedna velká a dvě menší citace.
6. Kontakt – `SectionHeading` na `surface-sunk`, `ContactForm`.
7. Patička – jméno, IČO 86776070, odkaz na zásady ochrany osobních údajů, ve stylu `small`.

## Motivy

- **Kóta.** Kótovací čára s koncovými značkami se používá jen tam, kde nese údaj: kolem fotky v hero (rozměry místnosti) a jako osa kroků (`ProcessSteps`). Nad nadpisy sekcí ne. Značky jen na vnějších koncích.
- **Hairline kresba.** Izometrická kresba tenkými linkami s plochami v barvě podkladu. Jediná zvýrazněná linka je `hairline-hi` (okrová). Výjimkou je obálka kitu, kde je odlupovaný dílec vinylu vyplněný `accent`.
- **Zubová stěrka.** Nástroj na lepidlo pod vinyl – ikona v odznaku před/po a hřebeny lepidla v kresbě vinylu.

## Pohyb

- Přechody stavů: 700 ms, křivka `cubic-bezier(0.32, 0.72, 0, 1)`; hover barev 160 ms.
- Hairline kresba: pružiny a přechody z knihovny `components/lib/hairline.js`, odstup 45 ms mezi vzorky.
- Před/po: hrana sleduje scroll s vyhlazením, bez připínání.
- `prefers-reduced-motion`: všechno doskočí okamžitě, před/po se ovládá posuvníkem.
- Žádné animace při načtení stránky, parallax ani vyjíždění textů.

## Fotografie

- Jen vlastní fotky z realizací. Žádná fotobanka.
- Před/po: stejné místo, úhel a světlo; poměr 4 : 3. Hero: 4 : 5, ideálně Michal při práci.
- Denní světlo, široký záběr místnosti; k tomu jeden detail spoje nebo lišty.
- Export 1600 px na šířku, WebP, alt text vždy popisuje materiál a místnost.

## Ikony

- Vlastní lineární sada v `assets/Ikony`: mřížka 24 px, tah 1,5 px, zaoblené konce.
- Na webu vkládej SVG přímo se `stroke="currentColor"`; soubory v galerii mají pevnou grafitovou barvu.
- Ikona vždy s textem; samotná jen s `aria-label` (telefon v mobilní hlavičce).

## Značka

- Logo zatím neexistuje. Značkou je sazba jména „Michal Šorm“ (Archivo 750, šířka 112 %) se štítkem „Podlahářství od roku 2004“, viz `Header`.
- Až vznikne logo, nahradí jen slovní značku; barvy a písma zůstávají.

## Přístupnost

- Kontrast textu min. 4,5 : 1 v obou motivech, okraje ovládacích prvků a fokus min. 3 : 1.
- Fokus z klávesnice: 2px grafitová linka `focus-ring` s odstupem 2 px na všech ovládacích prvcích, nastavená jedním pravidlem v `bundle.css`.
- Dotykové cíle min. 44 px na zařízeních s `pointer: coarse`.
- Nic se nemění samo bez možnosti to zastavit; při `prefers-reduced-motion` se automatická prohlídka služeb nespustí.
- Karty služeb jsou tlačítka s `aria-pressed`; kresba má popis přes `aria-label`.
