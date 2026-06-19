(function () {
  var panels = document.querySelectorAll('.landing-scroll__panel');
  var navRoot = document.getElementById('landing-nav');
  var buttons = document.querySelectorAll('.landing-nav__btn');

  if (!panels.length || !buttons.length) {
    return;
  }

  var total = panels.length;
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setActive(index) {
    if (index < 0 || index >= total) {
      return;
    }

    buttons.forEach(function (btn, j) {
      var on = j === index;
      btn.classList.toggle('is-active', on);
      if (on) {
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.removeAttribute('aria-current');
      }
    });

    panels.forEach(function (panel, j) {
      panel.classList.toggle('is-landing-active', j === index);
    });

    if (navRoot) {
      navRoot.classList.toggle('landing-nav--on-hero', index === 0);
    }

    document.body.setAttribute('data-landing-index', String(index));
  }

  function scrollToPanel(index) {
    if (index < 0 || index >= total) {
      return;
    }
    var el = panels[index];
    el.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  function pickActiveIndex() {
    var center = window.innerHeight * 0.42;
    var bestIdx = 0;
    var bestDist = Infinity;
    panels.forEach(function (panel, i) {
      var r = panel.getBoundingClientRect();
      var panelCenter = (r.top + r.bottom) / 2;
      var d = Math.abs(panelCenter - center);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });
    return bestIdx;
  }

  var scrollTickScheduled = false;
  function onScrollOrResize() {
    if (scrollTickScheduled) {
      return;
    }
    scrollTickScheduled = true;
    window.requestAnimationFrame(function () {
      scrollTickScheduled = false;
      setActive(pickActiveIndex());
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var idx = parseInt(btn.getAttribute('data-landing-index'), 10);
      if (!isNaN(idx)) {
        scrollToPanel(idx);
      }
    });
  });

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize, { passive: true });

  document.addEventListener('keydown', function (e) {
    var tag = e.target && e.target.tagName;
    if (
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      tag === 'SELECT' ||
      e.target.isContentEditable === true
    ) {
      return;
    }

    var idx = pickActiveIndex();

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToPanel(Math.min(total - 1, idx + 1));
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToPanel(Math.max(0, idx - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      scrollToPanel(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      scrollToPanel(total - 1);
    }
  });

  setActive(0);
  onScrollOrResize();
})();
