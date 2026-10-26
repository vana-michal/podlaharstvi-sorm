# BeforeAfter

Reference před a po: při scrollu přejede přes fotku kulatý odznak se zubovou stěrkou a za ním se stará podlaha mění v novou.

## Jak funguje

- Dvě fotky stejného záběru přes sebe; fotka „po“ je oříznutá `clip-path` zleva podle průběhu `--p` (0–1).
- Průběh řídí poloha fotky v okně: hrana jede, když střed fotky projde z 80 % do 35 % výšky okna. Fotka se nepřipíná, takže na stránce může být 6–9 referencí pod sebou bez dlouhého scrollování.
- Hodnota se vyhlazuje (20 % na snímek), takže pohyb působí jako tah stěrkou, ne skok.
- Na hraně je 2px linka `accent` a odznak `accent` s ikonou v `on-accent` a stínem `shadow-badge`. Odznak se při pohybu lehce kývá (±7°) a na začátku a konci zmizí.
- Štítky „Před“ (vpravo nahoře, na `surface-raised`) a „Po“ (vlevo nahoře, na výplni `accent` s textem `on-accent`) jsou vždy plně neprůhledné (min. 9,6 : 1). Každý zmizí, až když je jeho strana užší než 15 % rámu – nikdy se neprolínají přes poloprůhlednost.
- `prefers-reduced-motion`: scroll se nepoužije, pod fotkou se zobrazí posuvník, kterým si hranu posune uživatel sám.

## Co dodává web

- Dvě fotky se stejným záběrem a ořezem (ideálně ze stativu nebo ze stejného místa), poměr 4 : 3, šířka 1600 px, WebP.
- Alt texty obou fotek („Před: opotřebované PVC v kuchyni“, „Po: lepený vinyl v dekoru dub“).
- Popisek: název zakázky ve stylu `h3` a parametry ve stylu `measure`, oddělené čárkou („Lepený vinyl, 68 m², hotovo za 3 dny“).
- Na celé stránce jeden skript: `mountBeforeAfter(figure, scroller)` pro každý prvek `[data-ba]`; `scroller` je na webu `null` (okno).

## Ano / ne

- Ano: stejný úhel a světlo na obou fotkách – jinak efekt nefunguje.
- Ne: připínat fotku přes celou obrazovku; používat ilustrační fotky z fotobanky. Kresby v náhledu jsou jen zástupné.
