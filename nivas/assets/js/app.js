/* ============================================================
   NIVAS — Application boot
   Theme · header behaviour · drawer · reveals · lazy load
   ============================================================ */
(function (global) {
  "use strict";

  const UI = global.NIVAS_UI;
  const C = global.NIVAS_COMPONENTS;
  const { $, $$, icon } = UI;

  const THEME_KEY = "nivas:theme";

  /* ---------- Theme ---------- */
  function stored() { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } }
  function systemTheme() {
    return matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function current() { return stored() || systemTheme(); }
  function applyTheme(t) { document.documentElement.setAttribute("data-theme", t); }

  function initTheme() {
    applyTheme(current());
    const btn = $("#themeToggle");
    if (!btn) return;

    const paint = () => {
      const dark = current() === "dark";
      btn.innerHTML = icon(dark ? "sun" : "moon");
      btn.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
    };
    paint();

    btn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* noop */ }
      applyTheme(next);
      paint();
    });

    if (matchMedia) {
      const mq = matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => { if (!stored()) { applyTheme(systemTheme()); paint(); } };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* ---------- Header: solid on scroll, hide on scroll down ---------- */
  function initHeader(opts) {
    const header = $(".site-header");
    if (!header) return;
    if (opts && opts.overlay) header.classList.add("header-light");

    let lastY = window.scrollY;

    const onScroll = UI.throttle(() => {
      const y = window.scrollY;
      const solid = y > 40;

      header.classList.toggle("solid", solid);
      if (opts && opts.overlay) header.classList.toggle("header-light", !solid);

      /* hide when scrolling down past the fold, show when scrolling up */
      if (y > 400 && y > lastY) header.classList.add("hidden");
      else header.classList.remove("hidden");
      lastY = y;

      const top = $("#floatTop");
      if (top) top.classList.toggle("show", y > 600);
    }, 100);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const top = $("#floatTop");
    if (top) top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- Mobile drawer ---------- */
  function initDrawer() {
    const drawer = $("#drawer"), back = $("#drawerBack"), toggle = $("#navToggle");
    if (!drawer || !back) return;

    const open = () => {
      drawer.classList.add("open"); back.classList.add("open");
      document.body.classList.add("no-scroll");
      if (toggle) { toggle.classList.add("open"); toggle.setAttribute("aria-expanded", "true"); }
    };
    const close = () => {
      drawer.classList.remove("open"); back.classList.remove("open");
      document.body.classList.remove("no-scroll");
      if (toggle) { toggle.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    };

    if (toggle) toggle.addEventListener("click", () => (drawer.classList.contains("open") ? close() : open()));
    back.addEventListener("click", close);
    const closeBtn = $("#drawerClose");
    if (closeBtn) closeBtn.addEventListener("click", close);
    $$("#drawer a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------- Smooth in-page scroll ---------- */
  function initAnchors() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", id);
    });
  }

  /* ---------- Declarative icons ----------
     Any empty element with data-ico="name" is filled with that icon, so markup
     stays readable and icons live in one place. */
  function paintIcons(root) {
    $$("[data-ico]", root || document).forEach((n) => {
      if (n.innerHTML.trim()) return;
      n.innerHTML = icon(n.getAttribute("data-ico"), parseInt(n.getAttribute("data-ico-size"), 10) || 20);
    });
  }

  /* ---------- Page veil ---------- */
  function hideVeil() {
    const veil = $("#pageVeil");
    if (!veil) return;
    setTimeout(() => {
      veil.classList.add("done");
      setTimeout(() => veil.remove(), 800);
    }, 200);
  }

  /* ---------- Boot ---------- */
  function boot(opts) {
    const o = opts || {};
    C.mount(o.active || "");
    initTheme();
    initHeader(o);
    initDrawer();
    initAnchors();
    paintIcons();
    UI.lazyImages();
    UI.reveal();
    UI.countUp();
    hideVeil();
  }

  global.NIVAS_APP = { boot, applyTheme, current, paintIcons };
})(window);
