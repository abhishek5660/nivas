/* ============================================================
   NIVAS — Contact page
   Business details · validated enquiry form · map
   ============================================================ */
(function (global) {
  "use strict";

  const UI = global.NIVAS_UI;
  const D = global.NIVAS_DATA;
  const B = D.business;
  const { $, icon, esc } = UI;

  /* ---------- Static details ---------- */
  function paintDetails() {
    const hero = $("#pageHeroImg");
    if (hero) hero.src = D.img("1746888841237-72fcf8f5cf5b", 1920, 1080);

    $("#phoneLinks").innerHTML = B.phones
      .map((p) => '<a href="tel:+91' + p + '">' + p + "</a>")
      .join(" &nbsp;·&nbsp; ");

    const mail = $("#emailLink");
    mail.href = "mailto:" + B.email;
    mail.textContent = B.email;

    $("#addressText").innerHTML =
      esc(B.address.line1) + "<br>" + esc(B.address.line2) + "<br>" +
      esc(B.address.district);

    $("#hoursText").textContent = B.hours;
    $("#mapLink").href = B.mapLink;
    $("#callBtn").href = "tel:" + B.phonePrimary;
    $("#waBtn").href = "https://wa.me/" + B.whatsapp + "?text=" +
      encodeURIComponent("Hi Nivas, I'd like to book a design consultation.");

    const frame = $("#mapFrame");
    if (frame) frame.src = B.mapEmbed;

    /* service dropdown from the category list, plus a general option */
    const sel = $("#cService");
    D.categories.forEach((c) => {
      const o = document.createElement("option");
      o.textContent = c.name;
      sel.appendChild(o);
    });
    ["Full home interiors", "Not sure — need advice"].forEach((t) => {
      const o = document.createElement("option");
      o.textContent = t;
      sel.appendChild(o);
    });

    /* pre-select a package if the visitor came from the pricing page */
    const pkg = UI.param("package");
    if (pkg) {
      const match = D.pricing.find((p) => p.id === pkg);
      if (match) {
        $("#cMessage").value = "I'm interested in the " + match.name + " package.";
      }
    }
  }

  /* ---------- Form ---------- */
  const SCHEMA = {
    name: ["name"],
    phone: ["phone"],
    email: ["email"],          /* optional, but validated when filled */
    service: ["select"],
    location: ["select"],
  };

  function summary(form) {
    const v = (n) => (form.querySelector('[name="' + n + '"]') || {}).value || "—";
    return [
      "New enquiry from the Nivas website",
      "",
      "Name: " + v("name"),
      "Phone: " + v("phone"),
      "Email: " + v("email"),
      "Requirement: " + v("service"),
      "Location: " + v("location"),
      "Budget: " + v("budget"),
      "Timeline: " + v("timeline"),
      "",
      "Message:",
      v("message"),
    ].join("\n");
  }

  function showSuccess(name, sendVia) {
    $("#formCard").innerHTML =
      '<div class="form-success">' +
        '<div class="ok-ring">' + icon("checkCircle", 34) + "</div>" +
        "<h2 style=\"font-size:1.9rem\">Thank you, " + esc(name.split(" ")[0]) + ".</h2>" +
        '<p class="mt-2 muted">Your enquiry is ready to send in your ' + sendVia +
        " app. We reply within one working day — usually the same afternoon.</p>" +
        '<div class="flex gap-1 wrap mt-3" style="justify-content:center">' +
          '<a class="btn btn-brass" href="gallery.html">Browse our work</a>' +
          '<a class="btn btn-outline" href="services.html">See pricing</a>' +
        "</div>" +
      "</div>";
  }

  function bindForm() {
    const form = $("#enquiryForm");
    if (!form) return;

    const phone = $("#cPhone");
    phone.addEventListener("input", () => {
      phone.value = phone.value.replace(/\D/g, "").slice(0, 10);
    });

    Object.keys(SCHEMA).forEach((n) => {
      const input = form.querySelector('[name="' + n + '"]');
      if (!input) return;
      input.addEventListener("blur", () => {
        if (input.value || n !== "email") UI.validateField(input, SCHEMA[n]);
      });
      input.addEventListener("change", () => UI.validateField(input, SCHEMA[n]));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!UI.validateForm(form, SCHEMA)) {
        UI.toast("Please check the highlighted fields.", { type: "error", title: "Almost there" });
        return;
      }

      const btn = form.querySelector('[type="submit"]');
      const name = form.querySelector('[name="name"]').value.trim();
      const body = summary(form);
      const viaWhatsapp = $("#cConsent").checked;

      UI.loading(btn, UI.delay(700)).then(() => {
        /* No backend on a static site — hand the message to the visitor's own
           WhatsApp or email client so nothing is silently lost. */
        const url = viaWhatsapp
          ? "https://wa.me/" + B.whatsapp + "?text=" + encodeURIComponent(body)
          : "mailto:" + B.email + "?subject=" +
            encodeURIComponent("Website enquiry — " + name) + "&body=" + encodeURIComponent(body);

        window.open(url, viaWhatsapp ? "_blank" : "_self");
        UI.toast("Enquiry ready to send.", { type: "success", title: "Nearly done" });
        showSuccess(name, viaWhatsapp ? "WhatsApp" : "email");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    paintDetails();
    bindForm();
    global.NIVAS_APP.boot({ active: "contact", overlay: true });
  });
})(window);
