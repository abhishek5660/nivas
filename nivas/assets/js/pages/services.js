/* ============================================================
   NIVAS — Services, process, pricing and FAQ
   ============================================================ */
(function (global) {
  "use strict";

  const UI = global.NIVAS_UI;
  const D = global.NIVAS_DATA;
  const { $, $$, icon, esc, inr } = UI;

  /* ---------- Services ---------- */
  function paintServices() {
    const wrap = $("#svcGrid");
    if (!wrap) return;
    wrap.innerHTML = D.services
      .map((s, i) =>
        '<article class="svc-card reveal" data-d="' + (i % 3) + '" id="svc-' + s.id + '">' +
          '<div class="svc-icon">' + icon(s.icon, 26) + "</div>" +
          "<h3>" + esc(s.title) + "</h3>" +
          "<p>" + esc(s.text) + "</p>" +
          '<ul class="svc-points">' + s.points.map((p) => "<li>" + esc(p) + "</li>").join("") + "</ul>" +
        "</article>")
      .join("");
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

  /* ---------- Pricing ---------- */
  function paintPricing() {
    const wrap = $("#priceGrid");
    if (!wrap) return;
    wrap.innerHTML = D.pricing
      .map((p, i) =>
        '<article class="price-card reveal' + (p.popular ? " popular" : "") + '" data-d="' + i + '">' +
          (p.popular ? '<span class="badge badge-solid price-flag">Most chosen</span>' : "") +
          "<h3>" + esc(p.name) + "</h3>" +
          "<p>" + esc(p.blurb) + "</p>" +
          '<div class="price-amount">' +
            '<span class="from">From</span>' +
            '<span class="val">' + inr(p.from) + "</span>" +
            '<span class="unit">' + esc(p.unit) + "</span>" +
          "</div>" +
          '<p class="price-note">Excluding counter, chimney, hob and sink.</p>' +
          '<ul class="price-features">' +
            p.features.map((f) => "<li>" + icon("check", 18) + "<span>" + esc(f) + "</span></li>").join("") +
          "</ul>" +
          '<a class="btn ' + (p.popular ? "btn-brass" : "btn-outline") + ' btn-block" href="contact.html?package=' +
            p.id + '">Get a quote</a>' +
        "</article>")
      .join("");
  }

  /* ---------- FAQ ---------- */
  function paintFaq() {
    const wrap = $("#faqList");
    if (!wrap) return;
    wrap.innerHTML = D.faqs
      .map((f, i) =>
        '<div class="faq-item' + (i === 0 ? " open" : "") + '">' +
          '<button class="faq-q" aria-expanded="' + (i === 0) + '">' +
            "<span>" + esc(f.q) + "</span><span class=\"faq-icon\"></span></button>" +
          '<div class="faq-a"><div class="faq-a-inner"><p>' + esc(f.a) + "</p></div></div>" +
        "</div>")
      .join("");

    bindAccordion(wrap);
    injectFaqSchema();
  }

  function bindAccordion(wrap) {
    const setHeight = (item, open) => {
      const a = item.querySelector(".faq-a");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
    };
    $$(".faq-item.open", wrap).forEach((i) => setHeight(i, true));

    wrap.addEventListener("click", (e) => {
      const q = e.target.closest(".faq-q");
      if (!q) return;
      const item = q.parentElement;
      const isOpen = item.classList.contains("open");

      $$(".faq-item", wrap).forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          setHeight(other, false);
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("open", !isOpen);
      q.setAttribute("aria-expanded", String(!isOpen));
      setHeight(item, !isOpen);
    });

    window.addEventListener("resize", UI.debounce(() => {
      $$(".faq-item.open", wrap).forEach((i) => setHeight(i, true));
    }, 200));
  }

  /* FAQ structured data helps these answers surface in search results */
  function injectFaqSchema() {
    const node = document.getElementById("faqSchema");
    if (!node) return;
    node.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: D.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const hero = $("#pageHeroImg");
    if (hero) hero.src = D.img("1601760561441-16420502c7e0", 1920, 1080);

    const cta = $("#ctaImg");
    if (cta) {
      cta.setAttribute("data-src", D.img("1682662044733-9120471befc7", 1920, 1080));
      cta.setAttribute("data-fallback", D.placeholder("dark"));
      cta.src = D.placeholder("dark");
    }

    paintServices();
    paintProcess();
    paintPricing();
    paintFaq();

    global.NIVAS_APP.boot({ active: "services", overlay: true });
  });
})(window);
