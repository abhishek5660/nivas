/* ============================================================
   NIVAS — Shared components
   Header · drawer · footer · floating actions · project card
   ============================================================ */
(function (global) {
  "use strict";

  const UI = global.NIVAS_UI;
  const D = global.NIVAS_DATA;
  const B = D.business;
  const { icon, esc } = UI;

  const NAV = [
    { href: "index.html",    label: "Home",     key: "home" },
    { href: "services.html", label: "Services", key: "services" },
    { href: "gallery.html",  label: "Gallery",  key: "gallery" },
    { href: "about.html",    label: "About",    key: "about" },
    { href: "contact.html",  label: "Contact",  key: "contact" },
  ];

  function brand(light) {
    return (
      '<a class="brand" href="index.html" aria-label="' + esc(B.name) + ' home">' +
        '<span class="brand-name">' + esc(B.name) + "</span>" +
        '<span class="brand-sub">' + esc(B.tagline) + "</span>" +
      "</a>"
    );
  }

  /* ---------- Header ---------- */
  function headerHTML(active) {
    return (
      '<div class="topbar"><div class="container">' +
        '<div class="topbar-left">' +
          '<a class="topbar-item" href="tel:' + B.phonePrimary + '">' + icon("phone", 14) + B.phones[0] + "</a>" +
          '<a class="topbar-item" href="mailto:' + B.email + '">' + icon("mail", 14) + B.email + "</a>" +
          '<span class="topbar-item">' + icon("pin", 14) + esc(B.address.line1) + "</span>" +
        "</div>" +
        '<div class="topbar-right">' +
          '<span class="topbar-item">' + icon("clock", 14) + esc(B.hoursShort) + "</span>" +
          '<a class="topbar-item" href="' + B.social.instagram + '" target="_blank" rel="noopener">' +
            icon("instagram", 14) + "Instagram</a>" +
        "</div>" +
      "</div></div>" +

      '<div class="container header-main">' +
        brand() +
        '<nav class="main-nav" aria-label="Primary">' +
          NAV.map((n) => '<a href="' + n.href + '"' + (n.key === active ? ' class="active" aria-current="page"' : "") +
            ">" + n.label + "</a>").join("") +
        "</nav>" +
        '<div class="header-actions">' +
          '<button class="icon-btn" id="themeToggle" aria-label="Toggle dark mode"></button>' +
          '<a class="btn btn-brass btn-sm" href="contact.html">Book a consultation</a>' +
          '<button class="icon-btn nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">' +
            "<span></span><span></span><span></span></button>" +
        "</div>" +
      "</div>"
    );
  }

  function drawerHTML(active) {
    return (
      '<div class="drawer-head">' + brand() +
        '<button class="icon-btn" id="drawerClose" aria-label="Close menu">' + icon("close") + "</button>" +
      "</div>" +
      '<div class="drawer-body">' +
        NAV.map((n) => '<a class="drawer-link' + (n.key === active ? " active" : "") + '" href="' + n.href + '">' +
          n.label + "</a>").join("") +
      "</div>" +
      '<div class="drawer-foot">' +
        '<div class="contact-line">' + icon("phone", 16) +
          '<a href="tel:' + B.phonePrimary + '">' + B.phones[0] + "</a></div>" +
        '<div class="contact-line">' + icon("mail", 16) +
          '<a href="mailto:' + B.email + '">' + B.email + "</a></div>" +
        '<div class="contact-line">' + icon("clock", 16) + "<span>" + esc(B.hoursShort) + "</span></div>" +
        '<a class="btn btn-brass btn-block mt-2" href="contact.html">Book a consultation</a>' +
      "</div>"
    );
  }

  /* ---------- Footer ---------- */
  function footerHTML() {
    const catLinks = D.categories
      .map((c) => '<li><a href="gallery.html?cat=' + c.id + '">' + esc(c.name) + "</a></li>")
      .join("");

    return (
      '<div class="container">' +
        '<div class="footer-grid">' +

          '<div class="footer-brand">' +
            '<span class="brand-name serif" style="font-size:2rem;letter-spacing:.16em">' + esc(B.name) + "</span>" +
            "<p>Modular kitchens, wardrobes and interior joinery designed, manufactured and " +
            "installed by our own team across the Kangra valley.</p>" +
            '<div class="socials">' +
              '<a href="' + B.social.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + icon("instagram", 17) + "</a>" +
              '<a href="' + B.social.facebook + '" aria-label="Facebook">' + icon("facebook", 17) + "</a>" +
              '<a href="' + B.social.youtube + '" aria-label="YouTube">' + icon("youtube", 17) + "</a>" +
              '<a href="' + B.social.linkedin + '" aria-label="LinkedIn">' + icon("linkedin", 17) + "</a>" +
            "</div>" +
          "</div>" +

          "<div><h4>Explore</h4><ul>" +
            NAV.map((n) => '<li><a href="' + n.href + '">' + n.label + "</a></li>").join("") +
          "</ul></div>" +

          "<div><h4>What we build</h4><ul>" + catLinks + "</ul></div>" +

          '<div><h4>Visit &amp; contact</h4><ul class="footer-contact">' +
            "<li>" + icon("pin", 16) + "<span>" + esc(B.address.line1) + "<br>" +
              esc(B.address.line2) + "<br>" + esc(B.address.district) + "</span></li>" +
            "<li>" + icon("phone", 16) + "<span>" +
              B.phones.map((p) => '<a href="tel:+91' + p + '">' + p + "</a>").join("<br>") + "</span></li>" +
            "<li>" + icon("mail", 16) + '<a href="mailto:' + B.email + '">' + B.email + "</a></li>" +
            "<li>" + icon("clock", 16) + "<span>" + esc(B.hours) + "</span></li>" +
          "</ul></div>" +

        "</div>" +

        '<div class="footer-bottom">' +
          "<p>© " + new Date().getFullYear() + " " + esc(B.legal) + ". All rights reserved.</p>" +
          "<nav><a href=\"gallery.html\">Gallery</a><a href=\"services.html\">Services</a>" +
          "<a href=\"contact.html\">Get a quote</a></nav>" +
        "</div>" +
      "</div>"
    );
  }

  /* ---------- Floating actions ---------- */
  function floatHTML() {
    return (
      '<a class="float-btn float-whatsapp" href="https://wa.me/' + B.whatsapp +
        '?text=' + encodeURIComponent("Hi Nivas, I would like a design consultation for my ") +
        '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + icon("whatsapp", 24) + "</a>" +
      '<a class="float-btn float-call" href="tel:' + B.phonePrimary + '" aria-label="Call us">' + icon("phone", 22) + "</a>" +
      '<button class="float-btn float-top" id="floatTop" aria-label="Back to top">' + icon("arrowUp", 20) + "</button>"
    );
  }

  /* ---------- Project card ---------- */
  function projectCard(p, i) {
    const cat = D.categories.find((c) => c.id === p.cat);
    return (
      '<figure class="gal-item' + (i % 5 === 0 || i % 5 === 3 ? " tall" : "") + '" data-project="' + p.id + '" ' +
        'data-cat="' + p.cat + '" tabindex="0" role="button" aria-label="View ' + esc(p.title) + '">' +
        '<img data-src="' + D.img(p.photo, 900, 1100) + '" data-fallback="' + D.placeholder(p.tone) + '" ' +
          'src="' + D.placeholder(p.tone) + '" alt="' + esc(p.title) + ' — ' + esc(cat ? cat.name : "") + '" ' +
          'loading="lazy" width="900" height="1100">' +
        '<span class="gal-zoom-ico">' + icon("zoom", 18) + "</span>" +
        '<figcaption class="gal-overlay">' +
          "<span>" + esc(p.layout) + " · " + esc(p.place) + "</span>" +
          "<h4>" + esc(p.title) + "</h4>" +
        "</figcaption>" +
      "</figure>"
    );
  }

  /* ---------- Mount ---------- */
  function mount(active) {
    const header = document.getElementById("siteHeader");
    if (header) { header.className = "site-header"; header.innerHTML = headerHTML(active); }

    if (!document.getElementById("drawer")) {
      const back = UI.el("div", { class: "drawer-back", id: "drawerBack" });
      const drawer = UI.el("aside", { class: "drawer", id: "drawer", "aria-label": "Mobile menu" });
      drawer.innerHTML = drawerHTML(active);
      document.body.appendChild(back);
      document.body.appendChild(drawer);
    }

    const footer = document.getElementById("siteFooter");
    if (footer) { footer.className = "site-footer"; footer.innerHTML = footerHTML(); }

    if (!document.querySelector(".float-stack")) {
      const stack = UI.el("div", { class: "float-stack" });
      stack.innerHTML = floatHTML();
      document.body.appendChild(stack);
    }
  }

  global.NIVAS_COMPONENTS = { mount, projectCard, NAV };
})(window);
