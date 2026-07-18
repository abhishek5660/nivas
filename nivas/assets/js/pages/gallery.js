/* ============================================================
   NIVAS — Gallery
   Filtering by room + layout, lightbox with keyboard nav
   ============================================================ */
(function (global) {
  "use strict";

  const UI = global.NIVAS_UI;
  const D = global.NIVAS_DATA;
  const C = global.NIVAS_COMPONENTS;
  const { $, $$, icon, esc } = UI;

  const state = { cat: "all", layout: "all" };
  let visible = [];

  /* ---------- Filtering ---------- */
  function filtered() {
    return D.projects.filter((p) => {
      if (state.cat !== "all" && p.cat !== state.cat) return false;
      if (state.layout !== "all" && p.layout !== state.layout) return false;
      return true;
    });
  }

  function layoutsFor(cat) {
    const pool = cat === "all" ? D.projects : D.projects.filter((p) => p.cat === cat);
    return Array.from(new Set(pool.map((p) => p.layout))).sort();
  }

  /* ---------- Render ---------- */
  function paintFilters() {
    const catWrap = $("#catFilters");
    catWrap.innerHTML =
      '<button class="filter-btn' + (state.cat === "all" ? " active" : "") + '" data-cat="all">All work</button>' +
      D.categories.map((c) => {
        const n = D.projects.filter((p) => p.cat === c.id).length;
        return '<button class="filter-btn' + (state.cat === c.id ? " active" : "") +
          '" data-cat="' + c.id + '">' + esc(c.name) + " (" + n + ")</button>";
      }).join("");

    const layoutWrap = $("#layoutFilters");
    const layouts = layoutsFor(state.cat);
    layoutWrap.innerHTML =
      '<button class="filter-btn' + (state.layout === "all" ? " active" : "") + '" data-layout="all">Any layout</button>' +
      layouts.map((l) => '<button class="filter-btn' + (state.layout === l ? " active" : "") +
        '" data-layout="' + esc(l) + '">' + esc(l) + "</button>").join("");
  }

  function paintGrid() {
    visible = filtered();
    const grid = $("#galGrid");

    $("#filterCount").textContent =
      visible.length + (visible.length === 1 ? " project" : " projects");

    if (!visible.length) {
      grid.innerHTML = '<p class="gal-empty">No projects match that combination yet — ' +
        'try a different layout, or <a href="contact.html" style="color:var(--brass-600)">ask us directly</a>.</p>';
      return;
    }

    grid.innerHTML = visible.map((p, i) => C.projectCard(p, i)).join("");
    UI.lazyImages(grid);
  }

  function syncUrl() {
    const p = new URLSearchParams();
    if (state.cat !== "all") p.set("cat", state.cat);
    if (state.layout !== "all") p.set("layout", state.layout);
    history.replaceState({}, "", location.pathname + (p.toString() ? "?" + p : ""));
  }

  function update() {
    paintFilters();
    paintGrid();
    syncUrl();
  }

  /* ---------- Lightbox ---------- */
  let lbIndex = 0;

  function openLightbox(projectId) {
    const idx = visible.findIndex((p) => p.id === Number(projectId));
    lbIndex = idx > -1 ? idx : 0;
    paintLightbox();
    $("#lightbox").classList.add("open");
    document.body.classList.add("no-scroll");
    $("#lbClose").focus();
  }

  function closeLightbox() {
    $("#lightbox").classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  function paintLightbox() {
    const p = visible[lbIndex];
    if (!p) return;
    const cat = D.categories.find((c) => c.id === p.cat);
    const img = $("#lbImg");
    img.src = D.img(p.photo, 1600, 1100);
    img.alt = p.title + " — " + (cat ? cat.name : "");
    $("#lbTitle").textContent = p.title;
    $("#lbNote").textContent = p.note;
    $("#lbCount").textContent =
      (lbIndex + 1) + " / " + visible.length + " · " + p.layout + " · " + p.place + " · " + p.year;
  }

  function step(n) {
    lbIndex = (lbIndex + n + visible.length) % visible.length;
    paintLightbox();
  }

  /* ---------- Events ---------- */
  function bind() {
    $("#catFilters").addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      state.cat = b.getAttribute("data-cat");
      state.layout = "all";
      update();
    });

    $("#layoutFilters").addEventListener("click", (e) => {
      const b = e.target.closest("[data-layout]");
      if (!b) return;
      state.layout = b.getAttribute("data-layout");
      update();
    });

    $("#galGrid").addEventListener("click", (e) => {
      const item = e.target.closest("[data-project]");
      if (item) openLightbox(item.getAttribute("data-project"));
    });

    $("#galGrid").addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const item = e.target.closest("[data-project]");
      if (item) { e.preventDefault(); openLightbox(item.getAttribute("data-project")); }
    });

    $("#lbClose").innerHTML = icon("close", 20);
    $("#lbPrev").innerHTML = icon("arrowLeft", 20);
    $("#lbNext").innerHTML = icon("arrowRight", 20);

    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", (e) => { e.stopPropagation(); step(-1); });
    $("#lbNext").addEventListener("click", (e) => { e.stopPropagation(); step(1); });
    $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });

    document.addEventListener("keydown", (e) => {
      if (!$("#lightbox").classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });

    /* swipe on touch */
    let sx = null;
    const lb = $("#lightbox");
    lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
      sx = null;
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const hero = $("#pageHeroImg");
    if (hero) hero.src = D.img("1663811396777-05505d999151", 1920, 1080);

    const cta = $("#ctaImg");
    if (cta) {
      cta.setAttribute("data-src", D.img("1639173925921-5d5fd027713c", 1920, 1080));
      cta.setAttribute("data-fallback", D.placeholder("dark"));
      cta.src = D.placeholder("dark");
    }

    /* read filters from the URL so links like gallery.html?cat=wardrobe work */
    const cat = UI.param("cat");
    if (cat && D.categories.some((c) => c.id === cat)) state.cat = cat;
    const layout = UI.param("layout");
    if (layout) state.layout = layout;

    update();
    bind();

    global.NIVAS_APP.boot({ active: "gallery", overlay: true });

    /* deep link: gallery.html?open=<id> */
    const open = UI.param("open");
    if (open) setTimeout(() => openLightbox(open), 400);
  });
})(window);
