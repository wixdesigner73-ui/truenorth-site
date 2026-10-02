/* True North — shared site behaviour */
(function () {
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile menu ---------- */
  var nav = document.getElementById('nav'), mb = document.getElementById('menuBtn');
  if (nav && mb) {
    mb.addEventListener('click', function () {
      var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', o);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---------- home slider ---------- */
  var slider = document.querySelector('.slider');
  if (slider) {
    var slides = [].slice.call(slider.querySelectorAll('.slide'));
    var tabs = [].slice.call(slider.querySelectorAll('.s-tab'));
    var pauseBtn = slider.querySelector('.s-pause');
    var DUR = parseFloat(getComputedStyle(slider).getPropertyValue('--dur')) || 9;
    var i = 0, timer = null, playing = !reduce, hoverPause = false;
    var compass = slider.querySelector('.hero-fx .compass');
    var HEADINGS = [0, -38, 26, -18, 42, -28, 16, -44]; // compass body turns; needle swings back to north

    function go(n, focus) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, j) {
        var on = j === i;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', !on);
        s.querySelectorAll('a,button').forEach(function (a) { a.tabIndex = on ? 0 : -1; });
        var v = s.querySelector('video');
        if (v) { if (on && !reduce) { v.currentTime = 0; v.play().catch(function(){}); } else { v.pause(); } }
        // restart animations on the newly active slide
        if (on) { s.querySelectorAll('.bg img,.bg video,.reveal,.line>span,.big-stage').forEach(function (el) { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; }); }
      });
      tabs.forEach(function (t, j) {
        t.setAttribute('aria-selected', j === i);
        t.tabIndex = j === i ? 0 : -1;
        t.classList.toggle('is-done', j < i);
        var bar = t.querySelector('.bar i'); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
      });
      if (compass) compass.style.setProperty('--h', HEADINGS[i % HEADINGS.length] + 'deg');
      if (focus) tabs[i].focus();
      schedule();
    }
    function schedule() {
      clearTimeout(timer);
      slider.classList.toggle('is-playing', playing && !hoverPause);
      if (playing && !hoverPause) timer = setTimeout(function () { go(i + 1); }, DUR * 1000);
    }
    function setPlaying(p) {
      playing = p;
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-label', p ? 'Pause slideshow' : 'Play slideshow');
        pauseBtn.innerHTML = p ? '<svg class="icon"><use href="#i-pause"/></svg>' : '<svg class="icon"><use href="#i-play"/></svg>';
      }
      go(i);
    }
    tabs.forEach(function (t, j) { t.addEventListener('click', function () { go(j); }); });
    slider.querySelector('.s-tabs').addEventListener('keydown', function (e) {
      var d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (d) { e.preventDefault(); go(i + d, true); }
      if (e.key === 'Home') { e.preventDefault(); go(0, true); }
      if (e.key === 'End') { e.preventDefault(); go(slides.length - 1, true); }
    });
    var prev = slider.querySelector('.s-prev'), next = slider.querySelector('.s-next');
    if (prev) prev.addEventListener('click', function () { go(i - 1); });
    if (next) next.addEventListener('click', function () { go(i + 1); });
    if (pauseBtn) pauseBtn.addEventListener('click', function () { setPlaying(!playing); });
    // pause while the visitor is reading or using the slider
    slider.addEventListener('mouseenter', function () { hoverPause = true; schedule(); });
    slider.addEventListener('mouseleave', function () { hoverPause = false; go(i); });
    slider.addEventListener('focusin', function () { hoverPause = true; schedule(); });
    slider.addEventListener('focusout', function (e) { if (!slider.contains(e.relatedTarget)) { hoverPause = false; schedule(); } });
    // swipe
    var x0 = null;
    slider.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); x0 = null;
    });
    // stop when off screen or tab hidden
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { hoverPause = !en[0].isIntersecting; schedule(); }, { threshold: .25 }).observe(slider);
    }
    document.addEventListener('visibilitychange', function () { hoverPause = document.hidden; schedule(); });
    setPlaying(playing);
  }

  /* ---------- scroll reveal ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.sr-reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.sr-reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- filters (plans / resources) ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(function (bar) {
    var target = document.getElementById(bar.getAttribute('data-filter-group'));
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      bar.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      var f = b.getAttribute('data-f');
      target.querySelectorAll('[data-cat]').forEach(function (c) {
        c.hidden = !(f === 'all' || c.getAttribute('data-cat').split(' ').indexOf(f) > -1);
      });
    });
  });

  /* ---------- enquiry form ---------- */
  var msg = document.getElementById('f-msg'), cnt = document.getElementById('count');
  if (msg && cnt) {
    var words = function () { return msg.value.trim() ? msg.value.trim().split(/\s+/).length : 0; };
    msg.addEventListener('input', function () { var w = words(); cnt.textContent = w + ' / 200 words'; cnt.classList.toggle('over', w > 200); });
    document.getElementById('enquiry').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target;
      if (!f.checkValidity() || words() > 200) { f.reportValidity(); if (words() > 200) msg.focus(); return; }
      document.getElementById('sent').hidden = false;
    });
    var st = new URLSearchParams(location.search).get('stage');
    var sel = document.getElementById('f-stage');
    if (st && sel) [].forEach.call(sel.options, function (o) { if (o.value === st) o.selected = true; });
  }

  /* ---------- site search ---------- */
  var sBox = document.getElementById('search');
  if (sBox && window.TN_INDEX) {
    var q = document.getElementById('q'), res = document.getElementById('results'), last;
    var esc = function (s) { return s.replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; }); };
    function run() {
      var v = q.value.trim().toLowerCase();
      var hits = v ? TN_INDEX.filter(function (x) { return (x.t + ' ' + x.k).toLowerCase().indexOf(v) > -1; }) : TN_INDEX.slice(0, 10);
      res.innerHTML = hits.length
        ? hits.slice(0, 14).map(function (h) { return '<li><a href="' + h.u + '"><span>' + esc(h.t) + '</span><small>' + h.c + '</small></a></li>'; }).join('')
        : '<li class="empty">No results for “' + esc(q.value) + '”. Try “land”, “budget”, “contract” or “energy”.</li>';
    }
    function open() { last = document.activeElement; sBox.hidden = false; q.value = ''; run(); q.focus(); }
    function close() { sBox.hidden = true; if (last) last.focus(); }
    document.querySelectorAll('[data-open-search]').forEach(function (b) { b.addEventListener('click', open); });
    document.getElementById('closeSearch').addEventListener('click', close);
    q.addEventListener('input', run);
    sBox.addEventListener('click', function (e) { if (e.target === sBox) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !sBox.hidden) close();
      if (e.key === '/' && sBox.hidden && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
    });
  }
})();
