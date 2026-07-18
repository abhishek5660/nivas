/* ============================================================
   NIVAS — About page
   ============================================================ */
(function (global) {
  "use strict";

  const UI = global.NIVAS_UI;
  const D = global.NIVAS_DATA;
  const { $, esc } = UI;

  const MOSAIC = [
    { photo: "1581674662583-5e89b374fae6", cls: "m-wide", alt: "Floor plans and material swatches on a designer's desk", tone: "warm" },
    { photo: "1507089947368-19c1da9775ae", cls: "m-tall", alt: "Custom kitchen cabinets during installation", tone: "warm" },
    { photo: "1602028915047-37269d1a73f7", cls: "", alt: "A white kitchen unit set ready for fitting", tone: "cool" },
    { photo: "1588854337221-4cf9fa96059c", cls: "", alt: "A carpenter assembling cabinetry on site", tone: "warm" },
    { photo: "1675684733820-63caf8704230", cls: "", alt: "Close-up of a house plan blueprint", tone: "cool" },
    { photo: "1661295665154-34615f961f8c", cls: "m-wide", alt: "Finished kitchen with pendant lighting", tone: "warm" },
  ];

  function paintMosaic() {
    const wrap = $("#mosaic");
    if (!wrap) return;
    wrap.innerHTML = MOSAIC
      .map((m) =>
        '<div class="media reveal-img ' + m.cls + '">' +
          '<img data-src="' + D.img(m.photo, 900, 700) + '" src="' + D.placeholder(m.tone) + '" ' +
            'data-fallback="' + D.placeholder(m.tone) + '" alt="' + esc(m.alt) + '" loading="lazy" width="900" height="700">' +
        "</div>")
      .join("");
    UI.lazyImages(wrap);
  }

  function paintStats() {
    const wrap = $("#statRow");
    if (!wrap) return;
    wrap.innerHTML = D.stats
      .map((s) =>
        '<div class="stat-item reveal">' +
          '<strong><span data-count="' + s.value + '">0</span>' + esc(s.suffix) + "</strong>" +
          "<span>" + esc(s.label) + "</span>" +
        "</div>")
      .join("");
    UI.countUp(wrap);
  }

  function paintImages() {
    const set = (id, photo, tone, w, h) => {
      const n = $(id);
      if (!n) return;
      n.setAttribute("data-src", D.img(photo, w || 1200, h || 900));
      n.setAttribute("data-fallback", D.placeholder(tone));
      n.src = D.placeholder(tone);
    };

    const hero = $("#pageHeroImg");
    if (hero) hero.src = D.img("1596205250168-c3583813eea0", 1920, 1080);

    set("#storyImg", "1507089947368-19c1da9775ae", "warm", 900, 1125);
    set("#areaImg", "1748217392776-aaa328792c0b", "warm", 1200, 900);
    set("#ctaImg", "1755771984341-546c2a04f236", "dark", 1920, 1080);

    const call = $("#aboutCall");
    if (call) call.href = "tel:" + D.business.phonePrimary;
  }

  document.addEventListener("DOMContentLoaded", () => {
    paintImages();
    paintMosaic();
    paintStats();
    global.NIVAS_APP.boot({ active: "about", overlay: true });
  });
})(window);
