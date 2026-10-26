(function () {
  if (!window.HL) { document.getElementById("floors-tag").textContent = "Knihovna hairline se nenačetla"; return; }
  var H = window.HL;
  var Cam = H.Cam, fit = H.fit, proj = H.proj, facing = H.facing, rings = H.rings, prism = H.prism, solid = H.solid, put = H.put,
      hull = H.hull, poly = H.poly, open = H.open, lerp = H.lerp, rrect = H.rrect, ringAt = H.ringAt, run = H.run,
      spring = H.spring, stepS = H.stepS, tween = H.tween, tset = H.tset, tval = H.tval, tdone = H.tdone, mk = H.mk,
      register = H.register, pointer = H.pointer;

  /* Tři vzorky na jednom betonovém podkladu, zleva (vzadu) doprava (vpředu):
     lepený vinyl na hřebenech lepidla, PVC role, koberec s vlasem. */
  var W = 48, D = 48, G = 14, PAD = 8, SLAB = 12, X1 = 3 * W + 2 * G, BX = 18;
  var NAMES = ["Lepený vinyl", "PVC v roli", "Koberec"];
  var STACK = [
    [[1.6, "glue"], [3, "sheet"]],
    [[1.2, "roll"]],
    [[4, "pad"], [6, "pile"]]
  ];
  var REST = [0.3, 0.5, 0.12], STEP = 45, MARK = 0, gap = 12;

  var stage = document.getElementById("floors-stage");
  var tag = document.getElementById("floors-tag");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".sp-service"));

  H.inject(document);
  stage.setAttribute("data-hairline", "floors");
  stage.setAttribute("role", "img");
  stage.setAttribute("aria-label", "Tři podlahy na jednom podkladu: lepený vinyl, PVC role a koberec. Vybraný vzorek se otevře.");
  var svg = mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, stage);

  var C = Cam(45, 0.5, 1.95), HI = 13 + 2 * 18;
  fit(C, [[-PAD, -24, HI], [-PAD, -PAD, -SLAB], [X1 + PAD, D + PAD + 11, -SLAB], [BX + 9, D + PAD + 21, -SLAB], [X1 + PAD, -PAD, -SLAB], [-PAD, D + PAD, -SLAB],
    [0, 0, HI], [W + G, 0, HI], [X1, 0, HI]], 200, 166);
  var P = proj(C), front = facing(C);
  function box(s, x0, y0, x1, y1, z0, z1, r, b) { var rg = rings(x0, y0, x1, y1, r, b); put(s, prism(P, front, rg[0], rg[1], z0, z1)); }

  var g = mk("g", {}, svg);
  box(solid(g), -PAD, -PAD, X1 + PAD, D + PAD, -SLAB, 0, 6, 1.8);

  var samples = STACK.map(function (layers, i) {
    var grp = mk("g", {}, g);
    var parts = layers.map(function (l) {
      var p = { h: l[0], kind: l[1], s: solid(grp) };
      if (p.kind === "glue") p.lines = mk("path", { "class": "nf lo" }, grp);
      if (p.kind === "sheet") { p.seams = mk("path", { "class": "nf" }, grp); p.grain = mk("path", { "class": "nf lo" }, grp); }
      if (p.kind === "pile") p.shag = mk("path", { "class": "nf" }, grp);
      if (p.kind === "roll") p.roll = solid(grp);
      return p;
    });
    var last = parts[parts.length - 1];
    return { x0: i * (W + G), parts: parts, top: [last.s.sil, last.roll && last.roll.sil].filter(Boolean), e: tween(REST[i]), drawn: NaN };
  });

  function turn(x, yc, zc, n, r, turns) {
    turns = turns || 1;
    var out = [];
    for (var k = 0; k <= n; k++) { var t = (k / n) * turns * 2 * Math.PI; out.push(P(x, yc + r(k / n) * Math.cos(t), zc + r(k / n) * Math.sin(t))); }
    return out;
  }

  var amp = spring(0), clock = 0;
  function shag(p) {
    var d = [];
    for (var k = 0; k < 720; k++) {
      var u = p.x0 + 3 + (k % 24) * 1.83, v = 3 + Math.floor(k / 24) * 1.45, w = amp.x * 1.8 * Math.sin(clock / 260 + u * 0.35 + v * 0.15);
      var lu = 2.25 * Math.sin(k * 2.3) + w, lv = 2.25 * Math.cos(k * 1.7) + w * 0.5;
      d.push(open([P(u, v, p.z1), P(u + lu * 0.3, v + lv * 0.3, p.z1 + 2.6), P(u + lu, v + lv, p.z1 + 4.5)]));
    }
    p.shag.setAttribute("d", d.join(""));
  }

  /* horní plocha vinylu: prkna se střídanými spoji a dvěma letokruhy jako na fotce v úvodu (hero.js) */
  var PW = W / 6;
  function planks(p, x0, y0, z) {
    var sd = [], gd = [], lo = y0 + 1.5, hi = y0 + D - 1.5;
    for (var k = 0; k < 6; k++) {
      var u0 = x0 + k * PW, y = y0 - ((k * 37) % 10) * 1.6;
      if (k) sd.push(open([P(u0, lo, z), P(u0, hi, z)]));
      while (y < hi) {
        var L = 18 + (((k * 13 + Math.round(y - y0)) % 7 + 7) % 7) * 1.5, ya = Math.max(y, lo), yb = Math.min(y + L, hi);
        if (y > lo) sd.push(open([P(u0, y, z), P(u0 + PW, y, z)]));
        if (yb > ya) gd.push(open([P(u0 + PW * 0.35, ya, z), P(u0 + PW * 0.42, yb, z)]), open([P(u0 + PW * 0.7, ya, z), P(u0 + PW * 0.64, yb, z)]));
        y += L;
      }
    }
    p.seams.setAttribute("d", sd.join(""));
    p.grain.setAttribute("d", gd.join(""));
  }

  function draw(sm, e) {
    var x0 = sm.x0, x1 = x0 + W, z = 0;
    sm.parts.forEach(function (p) {
      if (p.kind === "roll") {
        var len = 12 + gap * e * 1.6, yc = D - len, R = lerp(10, 6, len / 41);
        box(p.s, x0, yc, x1, D, 0, p.h, 1.5, 0.6);
        var ends = [x0 + 1, x1 - 1].map(function (x) { return turn(x, yc, R, 24, function () { return R; }); });
        p.roll.sil.setAttribute("d", poly(hull(ends[0].concat(ends[1]))));
        p.roll.cr.setAttribute("d", poly(ends[1]) + open(turn(x1 - 1, yc, R, 72, function (f) { return R * (0.25 + 0.7 * f); }, 3)));
        return;
      }
      z += gap * e;
      var z0 = z, z1 = z + p.h;
      z = z1;
      var back = p.kind === "sheet" ? gap * e * 1.3 : 0;
      box(p.s, x0, -back, x1, D - back, z0, z1, 3, 1.2);
      if (p.seams) planks(p, x0, -back, z1);
      if (p.lines) {
        var d = [];
        for (var r = 10; r < 78; r += 3) {
          var pts = [];
          for (var j = 0; j <= 48; j++) {
            var t = (-j / 48) * Math.PI / 2, u = x0 - 6 + r * Math.cos(t), v = D + 6 + r * Math.sin(t);
            var inside = u > x0 + 3 && u < x1 - 3 && v > 3 && v < D - 3;
            if (inside) pts.push(P(u, v, z1));
            if ((!inside || j === 48) && pts.length > 1) { d.push(open(pts)); pts = []; } else if (!inside) pts = [];
          }
        }
        p.lines.setAttribute("d", d.join(""));
      }
      if (p.shag) { p.x0 = x0; p.z1 = z1; shag(p); }
    });
  }

  /* kbelík s lepidlem vedle vinylu, nejblíž divákovi */
  var BY = D + PAD + 12, B0 = -SLAB, B1 = B0 + 15;
  function disc(r) { return rrect(BX - r, BY - r, BX + r, BY + r, r, 8); }
  var pail = solid(g), foot = disc(7), lip = disc(8.5);
  pail.sil.setAttribute("d", poly(hull(ringAt(P, foot, B0).concat(ringAt(P, lip, B1)))));
  pail.cr.setAttribute("d", poly(ringAt(P, disc(7.6), B1)) + open(ringAt(P, run(disc(7.4), function (q) { return !front(q); }), B1 - 2.5)));
  var bail = [];
  for (var j = 0; j <= 16; j++) { var t = (j / 16) * Math.PI; bail.push(P(BX + 8.5 * Math.cos(t), BY, B1 + 7 * Math.sin(t))); }
  mk("path", { "class": "nf", d: open(bail) }, g);

  var pile = samples[2].parts[1];
  var loop = register(stage, function (dt, now) {
    clock = now;
    var moving = stepS(amp, dt) || amp.t > 0;
    if (moving || amp.x !== 0) shag(pile);
    samples.forEach(function (sm) {
      var e = tval(sm.e, now);
      if (e !== sm.drawn) { draw(sm, e); sm.drawn = e; }
      if (!tdone(sm.e, now)) moving = true;
    });
    return moving;
  });

  var centre = samples.map(function (sm) { return P(sm.x0 + W / 2, D / 2, 6); });
  function hit(pt) {
    var best = -1, bd = 45;
    centre.forEach(function (c, i) { var d = Math.abs(pt[0] - c[0]); if (d < bd && Math.abs(pt[1] - c[1]) < 70) { bd = d; best = i; } });
    return best;
  }

  /* pinned = vzorek vybraný klepnutím, kliknutím nebo klávesou; hover jen dočasně ukáže jiný */
  var act = -2, pinned = -1;
  var touchOnly = window.matchMedia && matchMedia("(hover: none)").matches;
  var HINT = touchOnly ? "Klepněte na službu" : "Najeďte na službu";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function setActive(a) {
    if (a === act) return;
    var now = performance.now(), from = a >= 0 ? a : Math.max(act, 0);
    act = a;
    amp.t = a === 2 ? 1 : 0;
    samples.forEach(function (sm, i) {
      tset(sm.e, a < 0 ? REST[i] : i === a ? 1 : 0, now, Math.abs(i - from) * STEP);
      var on = a < 0 ? i === MARK : i === a;
      sm.top.forEach(function (el) { el.classList.toggle("hi", on); });
    });
    cards.forEach(function (c, i) { c.setAttribute("aria-pressed", String(i === pinned)); c.classList.toggle("is-preview", i === a && i !== pinned); });
    tag.textContent = a < 0 ? HINT : NAMES[a];
    tag.dataset.on = String(a >= 0);
    loop.wake();
  }
  setActive(-1);

  function pin(i) { pinned = i; act = -2; setActive(i); }

  pointer(stage, {
    move: function (p, e) { if (e.pointerType !== "mouse") return; var h = hit(p); setActive(h >= 0 ? h : pinned); },
    down: function (p) { var h = hit(p); if (h >= 0) pin(pinned === h ? -1 : h); },
    leave: function () { setActive(pinned); }
  });
  cards.forEach(function (c, i) {
    c.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") { setActive(i); } });
    c.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") setActive(pinned); });
    /* klik, klepnutí i Enter/mezerník: první otevře a připne, druhý na stejné kartě zavře */
    c.addEventListener("click", function () { pin(pinned === i ? -1 : i); });
  });

  /* scroll řídí výběr: na desktopu podle dráhy připnutého kontejneru (třetina na vzorek),
     pod 720 px podle karty, která projede pod lepící kresbou. Klik platí, dokud scroll nepřejde na další vzorek. */
  var pinBox = document.querySelector(".site-floors-pin"), frame = pinBox && pinBox.querySelector(".site-floors-pin__frame");
  var floors = stage.closest(".sp-floors"), section = stage.closest("section") || pinBox;
  var scrolled = -1, raf = 0;
  function isPinned() { return frame && getComputedStyle(frame).position === "sticky"; }
  function index() {
    var r = section.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return -1;
    if (isPinned()) {
      var top = parseFloat(getComputedStyle(frame).top) || 0, dist = Math.max(1, pinBox.offsetHeight - frame.offsetHeight);
      var p = (top - pinBox.getBoundingClientRect().top) / dist;
      return p < 0 ? -1 : Math.min(2, Math.floor(p * 3));
    }
    /* mobil: čára v polovině volného místa pod kresbou */
    var line = floors.getBoundingClientRect().bottom, at = line + (innerHeight - line) / 2, k = -1;
    cards.forEach(function (c, i) { if (c.getBoundingClientRect().top < at) k = i; });
    return k;
  }
  function tick() {
    raf = 0;
    var k = index();
    if (k === scrolled) return;
    scrolled = k;
    pin(k);
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
  if (!reduce) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
  }
})();
