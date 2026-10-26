(function () {
  var star = '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.5l-4.2 2.3 1-4.6L1.3 6l4.7-.5z"/></svg>';
  document.querySelectorAll("[data-stars]").forEach(function (s) { s.innerHTML = star + star + star + star + star; });
})();
