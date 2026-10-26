# BeforeAfter

Reference před a po: při scrollu se fotka připne a přejede přes ni kulatý odznak se zubovou stěrkou, za kterým se stará podlaha mění v novou. Teprve potom stránka pokračuje.

## Jak funguje

- Dvě fotky stejného záběru přes sebe; fotka „po“ je oříznutá `clip-path` zleva podle průběhu `--p` (0–1).
- **Připnutí.** Každá reference je v kontejneru `.sp-ba-pin`, který je o dráhu odkrytí vyšší než okno (`--ba-distance`, výchozí 120svh). Uvnitř je rám `.sp-ba-pin__frame` s `position: sticky`, vysoký jako okno, a v něm svisle vycentrovaná fotka i s popiskem. Stránka se tím zdánlivě zastaví: scroll běží dál, fotka stojí a stěrka ji odkrývá.
- Průběh `--p` je podíl odscrollované dráhy kontejneru: 0 na začátku připnutí, 1 na jeho konci. Na konci je fotka „po“ odkrytá celá a odznak zmizí; potom se rám odepne a stránka pokračuje. Při scrollu zpět se vše obrátí.
- Scroll se nikdy neblokuje: žádné `preventDefault` na wheel nebo touch, žádné `overflow: hidden` na `body`. Šipky, mezerník, Page Down i kotvy fungují jako jinde na stránce.
- Hodnota se vyhlazuje (20 % na snímek), takže pohyb působí jako tah stěrkou, ne skok. Počítá se v `requestAnimationFrame`, posluchače scrollu jsou `passive`; dráha se přepočítá při `resize`, `orientationchange` a změně velikosti kontejneru.
- Výšky jsou v jednotkách `svh`, aby připnutí neposkakovalo s lištou prohlížeče na mobilu. Fotka se do okna vejde i s popiskem: v nízkém okně se zmenší (šířka nejvýš (výška okna − `--ba-top` − `--ba-chrome`) × 4 / 3).
- `--ba-top` posune připnutý rám pod lepící hlavičku (výchozí 0).
- Na hraně je 2px linka `accent` a odznak `accent` s ikonou v `on-accent` a stínem `shadow-badge`. Odznak se při pohybu lehce kývá (±7°) a na začátku a konci zmizí.
- Štítky „Před“ (vpravo nahoře, na `surface-raised`) a „Po“ (vlevo nahoře, na výplni `accent` s textem `on-accent`) jsou vždy plně neprůhledné (min. 9,6 : 1). Každý zmizí, až když je jeho strana užší než 15 % rámu – nikdy se neprolínají přes poloprůhlednost.
- `prefers-reduced-motion`: žádné připínání, kontejner má přirozenou výšku a pod fotkou je posuvník, kterým si hranu posune uživatel sám.

## Co dodává web

- Dvě fotky se stejným záběrem a ořezem (ideálně ze stativu nebo ze stejného místa), poměr 4 : 3, šířka 1600 px, WebP.
- Alt texty obou fotek („Před: opotřebované PVC v kuchyni“, „Po: lepený vinyl v dekoru dub“).
- Popisek: název zakázky ve stylu `h3` a parametry ve stylu `measure`, oddělené čárkou („Lepený vinyl, 68 m², hotovo za 3 dny“).
- Obal každé reference: `<div class="sp-ba-pin"><div class="sp-ba-pin__frame"><figure class="sp-ba" data-ba>…</figure></div></div>`. Reference jdou pod sebou v jednom sloupci, každá se připne zvlášť; při `prefers-reduced-motion` může být mřížka 2 sloupce.
- Na webu s lepící hlavičkou nastavit `--ba-top` na její výšku.
- Na celé stránce jeden skript: `mountBeforeAfter(figure, scroller)` pro každý prvek `[data-ba]`; `scroller` je na webu `null` (okno).

## Ano / ne

- Ano: stejný úhel a světlo na obou fotkách – jinak efekt nefunguje.
- Ano: připnutí přes `position: sticky` a dráhu kontejneru; každá reference zvlášť.
- Ne: zamykat scroll přes `preventDefault` nebo `overflow: hidden`; dávat připínané reference vedle sebe do více sloupců; používat ilustrační fotky z fotobanky. Kresby v náhledu jsou jen zástupné.
