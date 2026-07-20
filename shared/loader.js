/* ============================================================
   loader.js — injects the paw-print preloader and plays it once
   before following any in-flow link (href="*.html" in the same
   folder). This is only included on 01-entry.html — the preloader
   plays on the very first navigation only, not on every screen
   change. Purely progressive enhancement: if this script fails to
   load, links just navigate normally.
   ============================================================ */
(function () {
  var LOOP_MS = 1200;

  function buildLoader() {
    var el = document.createElement('div');
    el.className = 'pp-loader';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
      '<img class="pp-frame pp-frame-1" src="assets/animation 1.png" alt="">' +
      '<img class="pp-frame pp-frame-2" src="assets/animation 2.png" alt="">' +
      '<img class="pp-frame pp-frame-3" src="assets/animation 3.png" alt="">' +
      '<div class="pp-caption">Sniffing the best snacks&hellip;</div>';
    var host = document.querySelector('.device') || document.body;
    host.appendChild(el);
    return el;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var loader = buildLoader();
    var links = document.querySelectorAll('a[href$=".html"]');

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        var href = link.getAttribute('href');
        if (!href) return;
        e.preventDefault();
        loader.classList.add('is-active');
        setTimeout(function () {
          window.location.href = href;
        }, LOOP_MS);
      });
    });
  });
})();
