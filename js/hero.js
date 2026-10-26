(function () {
  /* ukázková plocha místo fotky z realizace */
  var NS = "http://www.w3.org/2000/svg", svg = document.querySelector('.sp-plan__photo svg[data-floor]');
  if (!svg) return;
  function el(t, a) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); svg.appendChild(n); return n; }
  var HZ = 170, K = 330, KX = 300;
  function pt(X, Z) { return [200 + X * KX / Z, HZ + K / Z]; }
  function quad(x0, z0, x1, z1) { return [pt(x0, z0), pt(x1, z0), pt(x1, z1), pt(x0, z1)].map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" "); }
  el("rect", { x: 0, y: 0, width: 400, height: HZ + 2, "class": "sp-ph-wall" });
  var W = 0.34;
  for (var xi = -16; xi < 16; xi++) {
    var x0 = xi * W, z = 1 - (((xi * 37) % 10 + 10) % 10) * 0.12;
    while (z < 10) {
      var L = 1.1 + (((xi * 13 + Math.round(z * 10)) % 7 + 7) % 7) * 0.12, z1 = Math.min(z + L, 10), zz = Math.max(z, 1);
      if (z1 > 1) {
        el("polygon", { points: quad(x0, zz, x0 + W, z1), "class": "sp-ph-plank" });
        el("path", { d: "M" + pt(x0 + W * 0.35, zz) + "L" + pt(x0 + W * 0.42, z1) + "M" + pt(x0 + W * 0.7, zz) + "L" + pt(x0 + W * 0.64, z1), "class": "sp-ph-grain" });
      }
      z = z1;
    }
  }
  el("rect", { x: -2, y: HZ - 8, width: 404, height: 11, "class": "sp-ph-skirt" });
})();
