(function () {
  var form = document.getElementById("poptavka");
  var file = document.getElementById("f-foto"), fileText = document.getElementById("foto-text");
  var plural = new Intl.PluralRules("cs");
  var WORD = { one: "fotka", few: "fotky", many: "fotky", other: "fotek" };
  file.addEventListener("change", function () {
    var n = file.files.length;
    fileText.textContent = n ? "Vybráno: " + n + " " + WORD[plural.select(n)] : "Přidat fotky místnosti";
  });

  var checks = [
    ["f-jmeno", "e-jmeno", function (el) { return el.value.trim().length > 0; }],
    ["f-tel", "e-tel", function (el) { return el.value.replace(/\D/g, "").length >= 9; }],
    ["f-obec", "e-obec", function (el) { return el.value.trim().length > 0; }],
    ["f-souhlas", "e-souhlas", function (el) { return el.checked; }]
  ];
  function mark(el, err, ok) {
    el.setAttribute("aria-invalid", String(!ok));
    if (ok) el.removeAttribute("aria-describedby"); else el.setAttribute("aria-describedby", err.id);
    err.hidden = ok;
  }
  checks.forEach(function (c) {
    var el = document.getElementById(c[0]), err = document.getElementById(c[1]);
    el.addEventListener(el.type === "checkbox" ? "change" : "blur", function () { if (el.getAttribute("aria-invalid") === "true") mark(el, err, c[2](el)); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var first = null;
    checks.forEach(function (c) {
      var el = document.getElementById(c[0]), ok = c[2](el);
      mark(el, document.getElementById(c[1]), ok);
      if (!ok && !first) first = el;
    });
    if (first) { first.focus(); return; }
    var btn = document.getElementById("f-odeslat");
    btn.disabled = true; btn.setAttribute("aria-busy", "true"); btn.textContent = "Odesílám…";
    /* OVĚŘIT: formulář zatím nic neodesílá, jen ukazuje stavy. Před spuštěním sem patří volání formulářové služby
       nebo skriptu na hostingu; do té doby by návštěvník viděl potvrzení, i když poptávka nikam nedorazila. */
    setTimeout(function () {
      var done = document.createElement("div");
      done.className = "sp-success sp-success--large"; done.setAttribute("role", "status"); done.tabIndex = -1;
      done.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11"/></svg><div><b>Děkuji, poptávka dorazila.</b><p class="sp-small">Ozvu se vám do 24 hodin.</p></div>';
      form.replaceWith(done); done.focus();
    }, 1200);
  });
})();
