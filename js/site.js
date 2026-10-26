(function () {
  /* výška lepící hlavičky: odsazení kotev a lepící kresby ve Službách */
  var header = document.querySelector(".sp-header");
  if (!header) return;
  function set() { document.documentElement.style.setProperty("--sp-header-h", header.offsetHeight + "px"); }
  set();
  if ("ResizeObserver" in window) new ResizeObserver(set).observe(header);
  else window.addEventListener("resize", set);
})();
