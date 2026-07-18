/* ============================================================
   NIVAS — UI utilities
   Icons · DOM helpers · toasts · validation · reveal · lazy load
   ============================================================ */
(function (global) {
  "use strict";

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  function el(tag, attrs, kids) {
    const n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach((k) => {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach((c) => n.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
    return n;
  }

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function debounce(fn, ms) {
    let t;
    return function () { const a = arguments, c = this; clearTimeout(t); t = setTimeout(() => fn.apply(c, a), ms || 200); };
  }

  function throttle(fn, ms) {
    let last = 0, timer;
    return function () {
      const now = Date.now(), a = arguments, c = this;
      if (now - last >= ms) { last = now; fn.apply(c, a); }
      else { clearTimeout(timer); timer = setTimeout(() => { last = Date.now(); fn.apply(c, a); }, ms - (now - last)); }
    };
  }

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  const param = (k) => new URLSearchParams(location.search).get(k);

  const inr = (n) => "₹" + (Number(n) || 0).toLocaleString("en-IN");

  /* ---------- Icons ---------- */
  const ICONS = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m2.5 7.5 9.5 6 9.5-6"/>',
    pin: '<path d="M20 10.5c0 6-8 11.5-8 11.5s-8-5.5-8-11.5a8 8 0 1 1 16 0z"/><circle cx="12" cy="10.3" r="3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.3l3.4 2"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="m4.5 12.5 5 5 10-11"/>',
    checkCircle: '<circle cx="12" cy="12" r="9.5"/><path d="m8 12.5 2.7 2.7L16 9.5"/>',
    star: '<path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8.5v5M8.5 11h5"/>',
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6"/>',
    moon: '<path d="M20.5 14.3A8.5 8.5 0 1 1 9.7 3.5a7 7 0 0 0 10.8 10.8z"/>',
    whatsapp: '<path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.5 14.1c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.2-.8-2.7-1.1-4.4-3.9-4.5-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9 1-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2 0 .4-.1.5l-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1.9 2 1.2 2.3 1.4.2.1.4.1.5-.1l.7-.9c.2-.2.3-.2.6-.1l1.9.9c.3.1.5.2.6.3.1.2.1.7-.1 1.2z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1.1"/>',
    facebook: '<path d="M14.5 8.5H17V5h-2.5A4.5 4.5 0 0 0 10 9.5V12H7.5v3.5H10V22h3.5v-6.5H16l.5-3.5h-3V9.5a1 1 0 0 1 1-1z"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10.5 9.5 5 2.5-5 2.5z"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.6v.1M12 17v-3.6a2 2 0 0 1 4 0V17"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    compass: '<circle cx="12" cy="12" r="9.5"/><path d="m15.5 8.5-2 5.4-5.4 2 2-5.4z"/>',
    kitchen: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18M8 6.5v2M8 15.5v2"/>',
    wardrobe: '<rect x="3.5" y="2.5" width="17" height="19" rx="1.6"/><path d="M12 2.5v19M9.6 11h.01M14.4 11h.01"/>',
    sofa: '<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M2.5 12.5a2 2 0 0 1 4 0V16h11v-3.5a2 2 0 0 1 4 0V19H2.5z"/>',
    hammer: '<path d="m14 6 4.5 4.5-8 8L6 14z"/><path d="M14 6 17 3l4 4-3 3M9 16l-6 6"/>',
    shield: '<path d="M12 2.5 4.5 5.6v5.7c0 4.6 3.1 8.6 7.5 9.9 4.4-1.3 7.5-5.3 7.5-9.9V5.6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    ruler: '<path d="m3 17 14-14 4 4L7 21z"/><path d="m7 9 2 2M10.5 5.5l2 2M13.5 12.5l2 2M10 16l2 2"/>',
    sparkle: '<path d="M12 3l1.7 5L19 9.7l-5.3 1.7L12 16.4l-1.7-5L5 9.7 10.3 8z"/><path d="m18.5 15.5.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 7-9.5 16-9.5C20 12 16 20 11 20z"/><path d="M4.5 20c2.5-4 6-7 11-9.5"/>',
    users: '<circle cx="9" cy="8" r="3.6"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16.5 5.2a3.6 3.6 0 0 1 0 6.6M17.5 14.4A6.5 6.5 0 0 1 21.5 20"/>',
    swap: '<path d="M8 5 4 9l4 4M4 9h12M16 19l4-4-4-4M20 15H8"/>',
    send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
  };

  function icon(name, size) {
    const p = ICONS[name] || "";
    const s = size || 20;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" ' +
      'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>";
  }
  function iconFill(name, size) {
    const p = ICONS[name] || "";
    const s = size || 20;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="currentColor" aria-hidden="true">' + p + "</svg>";
  }

  function stars(rating) {
    let out = '<span class="tst-stars">';
    for (let i = 1; i <= 5; i++) {
      out += '<svg viewBox="0 0 24 24" width="15" height="15" fill="' + (rating >= i ? "currentColor" : "none") +
        '" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" class="' + (rating >= i ? "" : "off") + '">' +
        ICONS.star + "</svg>";
    }
    return out + "</span>";
  }

  /* ---------- Toast ---------- */
  function toast(msg, opts) {
    const o = Object.assign({ type: "success", title: "", duration: 3600 }, opts || {});
    let stack = $(".toast-stack");
    if (!stack) { stack = el("div", { class: "toast-stack", role: "status", "aria-live": "polite" }); document.body.appendChild(stack); }

    const n = el("div", { class: "toast " + o.type });
    n.innerHTML = icon(o.type === "error" ? "close" : "checkCircle") +
      "<div>" + (o.title ? "<strong>" + esc(o.title) + "</strong>" : "") + esc(msg) + "</div>";
    stack.appendChild(n);

    setTimeout(() => { n.classList.add("hiding"); setTimeout(() => n.remove(), 350); }, o.duration);
    return n;
  }

  function loading(btn, promise) {
    btn.classList.add("loading");
    btn.disabled = true;
    const done = () => { btn.classList.remove("loading"); btn.disabled = false; };
    return Promise.resolve(typeof promise === "function" ? promise() : promise)
      .then((v) => { done(); return v; }, (e) => { done(); throw e; });
  }

  /* ---------- Reveal on scroll ---------- */
  function reveal(root) {
    const items = $$(".reveal:not(.in), .reveal-img:not(.in)", root || document);
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((i) => i.classList.add("in"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    items.forEach((i) => obs.observe(i));
  }

  /* ---------- Lazy images ----------
     Images carry data-src. They are only fetched when they approach the
     viewport, which keeps first paint fast on a photo-heavy site. */
  function lazyImages(root) {
    const imgs = $$("img[data-src]", root || document);
    if (!imgs.length) return;

    const load = (img) => {
      const src = img.getAttribute("data-src");
      if (!src) return;
      img.classList.add("img-loading");
      img.src = src;
      img.removeAttribute("data-src");
      const finish = () => { img.classList.remove("img-loading"); img.classList.add("img-loaded"); };
      if (img.complete) finish();
      else {
        img.addEventListener("load", finish, { once: true });
        img.addEventListener("error", () => {
          img.classList.remove("img-loading");
          img.classList.add("img-loaded");
          const fb = img.getAttribute("data-fallback");
          if (fb && img.src !== fb) img.src = fb;
        }, { once: true });
      }
    };

    if (!("IntersectionObserver" in window)) { imgs.forEach(load); return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { load(e.target); obs.unobserve(e.target); } });
    }, { rootMargin: "300px 0px" });
    imgs.forEach((i) => obs.observe(i));
  }

  /* ---------- Count-up ---------- */
  function countUp(root) {
    const nodes = $$("[data-count]", root || document);
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => { n.textContent = n.getAttribute("data-count"); });
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const n = e.target;
        const target = parseFloat(n.getAttribute("data-count")) || 0;
        const start = performance.now(), dur = 1500;
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          n.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(n);
      });
    }, { threshold: 0.5 });
    nodes.forEach((n) => obs.observe(n));
  }

  /* ---------- Validation ---------- */
  const rules = {
    required: (v) => (String(v || "").trim() ? "" : "This field is required."),
    name: (v) => (String(v || "").trim().length >= 2 ? "" : "Please enter your name."),
    email: (v) => (!String(v).trim() || /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(v).trim()) ? "" : "Enter a valid email address."),
    emailRequired: (v) => (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(v).trim()) ? "" : "Enter a valid email address."),
    phone: (v) => (/^[6-9]\d{9}$/.test(String(v).replace(/\D/g, "").slice(-10)) ? "" : "Enter a valid 10-digit mobile number."),
    select: (v) => (String(v || "").trim() ? "" : "Please choose an option."),
  };

  function validateField(input, list) {
    let msg = "";
    for (let i = 0; i < list.length && !msg; i++) {
      const r = list[i];
      msg = typeof r === "function" ? r(input.value) : rules[r](input.value);
    }
    const holder = input.closest(".field");
    const errEl = holder && holder.querySelector(".field-error");
    input.classList.toggle("invalid", !!msg);
    if (errEl) errEl.textContent = msg;
    return !msg;
  }

  function validateForm(form, schema) {
    let ok = true, first = null;
    Object.keys(schema).forEach((name) => {
      const input = form.querySelector('[name="' + name + '"]');
      if (!input) return;
      if (!validateField(input, schema[name])) { ok = false; if (!first) first = input; }
    });
    if (first) { first.scrollIntoView({ behavior: "smooth", block: "center" }); first.focus({ preventScroll: true }); }
    return ok;
  }

  global.NIVAS_UI = {
    $, $$, el, esc, debounce, throttle, delay, param, inr,
    icon, iconFill, ICONS, stars,
    toast, loading, reveal, lazyImages, countUp,
    rules, validateField, validateForm,
  };
})(window);
