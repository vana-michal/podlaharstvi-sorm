(function () {
  var NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) { var n = document.createElementNS(NS, tag); for (var k in attrs) n.setAttribute(k, attrs[k]); parent.appendChild(n); return n; }

  /* --- ukázkové plochy místo fotek: podlaha v perspektivě --- */
  var HZ = 92, K = 208, KX = 250;
  function pt(X, Z) { return [200 + X * KX / Z, HZ + K / Z]; }
  function quad(x0, z0, x1, z1) { return [pt(x0, z0), pt(x1, z0), pt(x1, z1), pt(x0, z1)].map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" "); }
  var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }

  function drawBefore(svg) {
    el("rect", { x: 0, y: 0, width: 400, height: HZ + 2, "class": "sp-ph-wall" }, svg);
    for (var zi = 0; zi < 28; zi++) {
      var z0 = 1 + zi * 0.42, z1 = z0 + 0.42;
      for (var xi = -14; xi < 14; xi++) {
        var x0 = xi * 0.42, cls = (xi + zi) % 2 ? "sp-ph-tile" : "sp-ph-tile sp-ph-tile--alt";
        el("polygon", { points: quad(x0, z0, x0 + 0.42, z1), "class": cls }, svg);
      }
    }
    for (var s = 0; s < 22; s++) {
      var X = (rnd() - 0.5) * 3, Z = 1.05 + rnd() * 2.6, a = pt(X, Z), len = 8 + rnd() * 26, ang = rnd() * Math.PI;
      el("path", { d: "M" + a[0] + " " + a[1] + "q" + (Math.cos(ang) * len / 2) + " " + (Math.sin(ang) * len / 4 - 3) + " " + Math.cos(ang) * len + " " + Math.sin(ang) * len / 2, "class": "sp-ph-scuff" }, svg);
    }
    var t = pt(-0.6, 1.2), u = pt(0.1, 2.2);
    el("path", { d: "M" + t[0] + " " + t[1] + "L" + (t[0] + 30) + " " + (t[1] - 26) + "L" + u[0] + " " + u[1], "class": "sp-ph-scuff" }, svg);
  }

  function drawAfter(svg) {
    el("rect", { x: 0, y: 0, width: 400, height: HZ + 2, "class": "sp-ph-wall" }, svg);
    var W = 0.34;
    for (var xi = -16; xi < 16; xi++) {
      var x0 = xi * W, z = 1 - (((xi * 37) % 10 + 10) % 10) * 0.12;
      while (z < 10) {
        var L = 1.1 + (((xi * 13 + Math.round(z * 10)) % 7 + 7) % 7) * 0.12, z1 = Math.min(z + L, 10);
        var zz = Math.max(z, 1);
        if (z1 > 1) {
          el("polygon", { points: quad(x0, zz, x0 + W, z1), "class": "sp-ph-plank" }, svg);
          var g1 = pt(x0 + W * 0.35, zz), g2 = pt(x0 + W * 0.42, z1), g3 = pt(x0 + W * 0.7, zz), g4 = pt(x0 + W * 0.64, z1);
          el("path", { d: "M" + g1 + "L" + g2 + "M" + g3 + "L" + g4, "class": "sp-ph-grain" }, svg);
        }
        z = z1;
      }
    }
    el("rect", { x: -2, y: HZ - 6, width: 404, height: 9, "class": "sp-ph-skirt" }, svg);
  }

  document.querySelectorAll('.sp-ba svg[data-floor="before"]').forEach(drawBefore);
  document.querySelectorAll('.sp-ba svg[data-floor="after"]').forEach(drawAfter);

  /* --- odhalení na scroll --- */
  function mountBeforeAfter(fig, scroller) {
    var range = fig.querySelector(".sp-ba__range");
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var shown = 0, target = 0, raf = 0;
    function set(p) {
      fig.style.setProperty("--p", p.toFixed(4));
      fig.style.setProperty("--tilt", (Math.sin(p * Math.PI * 5) * 7).toFixed(2) + "deg");
    }
    if (reduce) { range.hidden = false; set(range.value / 100); range.addEventListener("input", function () { set(range.value / 100); }); return; }

    function measure() {
      var r = fig.querySelector(".sp-ba__frame").getBoundingClientRect(), top = 0, vh = window.innerHeight;
      if (scroller) { var rr = scroller.getBoundingClientRect(); top = rr.top; vh = rr.height; }
      var c = r.top - top + r.height / 2;
      /* hrana jede, když střed fotky projde z 80 % do 35 % výšky okna */
      target = Math.max(0, Math.min(1, (vh * 0.8 - c) / (vh * 0.45)));
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function tick() {
      shown += (target - shown) * 0.2;
      if (Math.abs(target - shown) < 0.001) shown = target;
      set(shown);
      raf = shown === target ? 0 : requestAnimationFrame(tick);
    }
    (scroller || window).addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();
  }

  /* na webu se hrana řídí scrollem okna */
  var scroller = null;
  document.querySelectorAll("[data-ba]").forEach(function (f) { mountBeforeAfter(f, scroller); });
})();
