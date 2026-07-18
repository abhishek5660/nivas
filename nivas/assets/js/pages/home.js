/* ============================================================
   NIVAS — Home page
   Hero · categories · before-after · process · testimonials · FAQ
   ============================================================ */
(function (global) {
  "use strict";

  const UI = global.NIVAS_UI;
  const D = global.NIVAS_DATA;
  const C = global.NIVAS_COMPONENTS;
  const { $, $$, icon, esc } = UI;

  /* Category cover photos */
  const CAT_COVER = {
    kitchen:  "1778731660388-36c3a51bed99",
    wardrobe: "1629078691371-2c83d139c986",
    tvunit:   "1738168259543-d0c58e2b91ed",
    vanity:   "1676321688594-7c2e60a70de1",
    study:    "1679309981674-cef0e23a7864",
  };

  /* ---------- Hero + fixed images ---------- */
  function paintImages() {
    const hero = $("#heroImg");
    if (hero) hero.src = D.img("1778731660388-36c3a51bed99", 1920, 1280);

    const intro = $("#introImg");
    if (intro) {
      intro.setAttribute("data-src", D.img("1682662044733-9120471befc7", 900, 1125));
      intro.setAttribute("data-fallback", D.placeholder("warm"));
      intro.src = D.placeholder("warm");
    }

    const cta = $("#ctaImg");
    if (cta) {
      cta.setAttribute("data-src", D.img("1613545564241-296299063513", 1920, 1080));
      cta.setAttribute("data-fallback", D.placeholder("dark"));
      cta.src = D.placeholder("dark");
    }

    const wa = $("#ctaWhatsapp");
    if (wa) {
      wa.href = "https://wa.me/" + D.business.whatsapp + "?text=" +
        encodeURIComponent("Hi Nivas, I'd like to book a design consultation.");
    }
  }

  /* ---------- Marquee strip ---------- */
  function paintStrip() {
    const track = $("#stripTrack");
    if (!track) return;
    const words = [
      "Modular kitchens", "Wardrobes", "TV units", "Bathroom vanities",
      "Study desks", "Crockery units", "Loft storage", "3D design views",
    ];
    const run = words.map((w) => '<span class="strip-item">' + esc(w) + "</span>").join("");
    track.innerHTML = run + run; /* duplicated for a seamless loop */
  }

  /* ---------- Categories ---------- */
  function paintCategories() {
    const wrap = $("#catGrid");
    if (!wrap) return;
    wrap.innerHTML = D.categories
      .map((c, i) =>
        '<a class="cat-card reveal" data-d="' + (i % 4) + '" href="gallery.html?cat=' + c.id + '">' +
          '<img data-src="' + D.img(CAT_COVER[c.id], 900, 1200) + '" src="' + D.placeholder("warm") + '" ' +
            'data-fallback="' + D.placeholder("warm") + '" alt="' + esc(c.name) + '" loading="lazy" width="900" height="1200">' +
          '<div class="cat-body">' +
            "<h3>" + esc(c.name) + "</h3>" +
            "<p>" + esc(c.blurb) + "</p>" +
            '<span class="link-arrow">Explore' + icon("arrowRight", 15) + "</span>" +
          "</div>" +
        "</a>")
      .join("");
  }

  /* ---------- Before / after ---------- */
  let baIndex = 0;

  function paintBeforeAfter() {
    const wrap = $("#baWrap");
    const nav = $("#baNav");
    if (!wrap) return;

    const render = () => {
      const t = D.transformations[baIndex];
      wrap.innerHTML =
        '<article class="ba-card reveal">' +
          '<div class="ba-slider" id="baSlider">' +
            '<span class="ba-tag left">Before</span>' +
            '<span class="ba-tag right">After</span>' +
            '<img class="ba-before" src="' + D.img(t.before, 1400, 900) + '" alt="Before — ' + esc(t.title) + '">' +
            '<img class="ba-after" id="baAfter" src="' + D.img(t.after, 1400, 900) + '" alt="After — ' + esc(t.title) + '">' +
            '<span class="ba-handle" id="baHandle"><span class="ba-knob">' + icon("swap", 22) + "</span></span>" +
          "</div>" +
          '<div class="ba-body">' +
            "<h3>" + esc(t.title) + "</h3>" +
            "<p>" + esc(t.note) + "</p>" +
            '<div class="ba-meta"><span>' + t.days + " days on site</span><span>Design to handover</span></div>" +
          "</div>" +
        "</article>";
      bindSlider();
      UI.reveal(wrap);
    };

    nav.innerHTML = D.transformations
      .map((t, i) => '<button data-ba="' + i + '"' + (i === baIndex ? ' class="active"' : "") + ">" +
        esc(t.title.split("·")[0].trim()) + "</button>")
      .join("");

    nav.addEventListener("click", (e) => {
      const b = e.target.closest("[data-ba]");
      if (!b) return;
      baIndex = parseInt(b.getAttribute("data-ba"), 10);
      $$("[data-ba]", nav).forEach((x) => x.classList.toggle("active", x === b));
      render();
    });

    render();
  }

  function bindSlider() {
    const slider = $("#baSlider");
    if (!slider) return;
    const after = $("#baAfter"), handle = $("#baHandle");

    const set = (pct) => {
      const p = Math.max(0, Math.min(100, pct));
      after.style.clipPath = "inset(0 0 0 " + p + "%)";
      handle.style.left = p + "%";
    };

    const fromEvent = (e) => {
      const r = slider.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      set((x / r.width) * 100);
    };

    let dragging = false;
    const start = (e) => { dragging = true; fromEvent(e); };
    const move = (e) => { if (dragging) { fromEvent(e); if (e.cancelable) e.preventDefault(); } };
    const end = () => { dragging = false; };

    slider.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    slider.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
    slider.addEventListener("click", fromEvent);

    set(50);
  }

  /* ---------- Process ---------- */
  function paintProcess() {
    const wrap = $("#processList");
    if (!wrap) return;
    wrap.innerHTML = D.process
      .map((p) =>
        '<div class="process-step reveal">' +
          '<div class="process-n">' + p.n + "</div>" +
          '<div class="process-body"><h3>' + esc(p.title) + "</h3><p>" + esc(p.text) + "</p></div>" +
        "</div>")
      .join("");
  }

  /* ---------- Featured projects ---------- */
  function paintFeatured() {
    const wrap = $("#featuredGrid");
    if (!wrap) return;
    const picks = [2, 11, 1, 16, 5, 21].map((id) => D.projects.find((p) => p.id === id)).filter(Boolean);
    wrap.innerHTML = picks.map((p, i) => C.projectCard(p, i)).join("");
    UI.lazyImages(wrap);

    wrap.addEventListener("click", (e) => {
      const item = e.target.closest("[data-project]");
      if (item) location.href = "gallery.html?open=" + item.getAttribute("data-project");
    });
  }

  /* ---------- Stats ---------- */
  function paintStats() {
    const wrap = $("#statRow");
    if (!wrap) return;
    wrap.innerHTML = D.stats
      .map((s) =>
        '<div class="stat-item reveal">' +
          "<strong><span data-count=\"" + s.value + "\">0</span>" + esc(s.suffix) + "</strong>" +
          "<span>" + esc(s.label) + "</span>" +
        "</div>")
      .join("");
    UI.countUp(wrap);
  }

  /* ---------- Testimonials carousel ---------- */
  function paintTestimonials() {
    const track = $("#tstTrack");
    const dots = $("#tstDots");
    if (!track) return;

    track.innerHTML = D.testimonials
      .map((t) =>
        '<div class="tst-slide"><article class="tst-card">' +
          '<div class="tst-quote">&ldquo;</div>' +
          UI.stars(t.rating) +
          "<p>" + esc(t.text) + "</p>" +
          '<div class="tst-person">' +
            '<span class="tst-avatar">' + esc(t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")) + "</span>" +
            "<div><strong>" + esc(t.name) + "</strong><span>" + esc(t.place) + "</span></div>" +
          "</div>" +
        "</article></div>")
      .join("");

    let perView = 3;
    let page = 0;

    const computePerView = () => {
      const w = window.innerWidth;
      perView = w <= 620 ? 1 : w <= 1080 ? 2 : 3;
    };
    const pages = () => Math.ceil(D.testimonials.length / perView);

    const paintDots = () => {
      dots.innerHTML = Array.from({ length: pages() })
        .map((_, i) => '<button data-page="' + i + '"' + (i === page ? ' class="active"' : "") +
          ' aria-label="Go to page ' + (i + 1) + '"></button>')
        .join("");
    };

    const apply = () => {
      const slide = track.querySelector(".tst-slide");
      if (slide) slide.style.flexBasis = 100 / perView + "%";
      $$(".tst-slide", track).forEach((s) => { s.style.flexBasis = 100 / perView + "%"; });
      track.style.transform = "translateX(-" + page * 100 + "%)";
      $$("[data-page]", dots).forEach((d, i) => d.classList.toggle("active", i === page));
    };

    const go = (n) => { page = (n + pages()) % pages(); apply(); };

    computePerView(); paintDots(); apply();

    $("#tstPrev").innerHTML = icon("arrowLeft", 18);
    $("#tstNext").innerHTML = icon("arrowRight", 18);
    $("#tstPrev").addEventListener("click", () => go(page - 1));
    $("#tstNext").addEventListener("click", () => go(page + 1));
    dots.addEventListener("click", (e) => {
      const b = e.target.closest("[data-page]");
      if (b) go(parseInt(b.getAttribute("data-page"), 10));
    });

    window.addEventListener("resize", UI.debounce(() => {
      const before = perView;
      computePerView();
      if (before !== perView) { page = 0; paintDots(); apply(); }
    }, 200));

    /* autoplay, paused on hover */
    let timer = null;
    const play = () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      stop();
      timer = setInterval(() => go(page + 1), 6500);
    };
    const stop = () => { if (timer) clearInterval(timer); };
    const vp = $("#tstViewport");
    vp.addEventListener("mouseenter", stop);
    vp.addEventListener("mouseleave", play);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : play()));

    /* swipe */
    let sx = null;
    vp.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; stop(); }, { passive: true });
    vp.addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) go(page + (dx < 0 ? 1 : -1));
      sx = null; play();
    });

    play();
  }

  /* ---------- FAQ (teaser: first four) ---------- */
  function paintFaq() {
    const wrap = $("#faqList");
    if (!wrap) return;
    wrap.innerHTML = D.faqs.slice(0, 4)
      .map((f, i) =>
        '<div class="faq-item' + (i === 0 ? " open" : "") + '">' +
          '<button class="faq-q" aria-expanded="' + (i === 0) + '">' +
            "<span>" + esc(f.q) + "</span><span class=\"faq-icon\"></span></button>" +
          '<div class="faq-a"><div class="faq-a-inner"><p>' + esc(f.a) + "</p></div></div>" +
        "</div>")
      .join("");
    bindAccordion(wrap);
  }

  function bindAccordion(wrap) {
    const setHeight = (item, open) => {
      const a = item.querySelector(".faq-a");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
    };
    $$(".faq-item", wrap).forEach((item) => { if (item.classList.contains("open")) setHeight(item, true); });

    wrap.addEventListener("click", (e) => {
      const q = e.target.closest(".faq-q");
      if (!q) return;
      const item = q.parentElement;
      const isOpen = item.classList.contains("open");

      $$(".faq-item", wrap).forEach((other) => {
        if (other !== item) { other.classList.remove("open"); setHeight(other, false);
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false"); }
      });

      item.classList.toggle("open", !isOpen);
      q.setAttribute("aria-expanded", String(!isOpen));
      setHeight(item, !isOpen);
    });

    window.addEventListener("resize", UI.debounce(() => {
      $$(".faq-item.open", wrap).forEach((i) => setHeight(i, true));
    }, 200));
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    paintImages();
    paintStrip();
    paintCategories();
    paintBeforeAfter();
    paintProcess();
    paintFeatured();
    paintStats();
    paintTestimonials();
    paintFaq();

    global.NIVAS_APP.boot({ active: "home", overlay: true });
  });

  global.NIVAS_ACCORDION = bindAccordion;
})(window);
