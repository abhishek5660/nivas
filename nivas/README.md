# NIVAS Modular Concepts — Website

A premium, multi-page site for a modular kitchen and interior studio in the Kangra
valley. Vanilla HTML, CSS and JavaScript — no frameworks, no build step.

---

## Running it

Double-click `index.html`, or serve the folder:

```bash
python -m http.server 8000     # http://localhost:8000
# or
npx serve .
```

---

## Structure

```
nivas/
├── index.html        Home — hero, categories, before/after, process, work, testimonials, FAQ
├── services.html     Services, seven-step process, pricing packages, full FAQ
├── gallery.html      Filterable project gallery with lightbox
├── about.html        Story, values, workshop mosaic, areas served
├── contact.html      Enquiry form, Google Map, all contact routes
│
└── assets/
    ├── css/
    │   ├── main.css      Tokens, theming, base, buttons, forms, header, footer
    │   └── pages.css     Hero, gallery, before/after, pricing, FAQ, contact
    ├── data/
    │   └── site.js       All content: business details, 26 projects, services,
    │                     pricing, testimonials, FAQs, image helpers
    └── js/
        ├── ui.js         Icons, toasts, validation, reveal, lazy loading, count-up
        ├── components.js Header, drawer, footer, floating buttons, project card
        ├── app.js        Boot: theme, sticky header, drawer, smooth scroll
        └── pages/        One module per page
```

Header, mobile drawer and footer are rendered once from `components.js` and injected
into every page, so navigation and contact details are written in a single place.

---

## Content lives in one file

Everything a non-developer would want to change sits in `assets/data/site.js`:

```js
const BUSINESS = {
  phones: ["9418189944", "8360170194"],
  email: "nivasmodular@gmail.com",
  address: { line1: "Khaira Road, Bhawarna", line2: "Near PNB Bank", ... },
  hours: "Every day 9:00 am – 6:00 pm · Sunday closed",
  ...
};
```

Change a phone number there and it updates in the top bar, the drawer, the footer,
the contact page and the floating call button at once.

Projects, services, pricing tiers, testimonials and FAQs are all plain arrays in the
same file — add an object, it appears on the site.

---

## Features

**Design**
- Warm-stone and brass palette with a Cormorant Garamond / Jost type pairing
- Dark and light mode, following the system by default, applied before first paint
- Sticky header that turns solid on scroll and hides when scrolling down
- Scroll reveals, image clip-path reveals, count-up statistics, marquee strip

**Functionality**
- Gallery filtered by room and by layout, with the filter state reflected in the URL
- Lightbox with arrow-key navigation, swipe support and captions
- Draggable before/after comparison sliders
- Testimonial carousel — autoplay, dots, arrows, swipe, responsive slides per view
- FAQ accordion with smooth height animation and `FAQPage` structured data
- Validated enquiry form that hands the message to WhatsApp or email
- Google Maps embed, click-to-call, WhatsApp float button

**Performance**
- Images lazy-loaded through IntersectionObserver, 300px before entering view
- Explicit `width`/`height` on images to prevent layout shift
- Inline SVG placeholders shown while photos load, and as fallback if one fails
- `preconnect` to font and image hosts
- Zero dependencies — no jQuery, no icon font, no carousel library

**SEO & accessibility**
- Per-page titles, meta descriptions and canonical URLs
- `HomeAndConstructionBusiness` and `FAQPage` structured data
- Semantic landmarks, skip link, ARIA labels, visible focus rings
- Keyboard-navigable gallery and lightbox
- `prefers-reduced-motion` respected throughout

---

## Images

Photography comes from Unsplash, referenced by ID:

```js
{ id: 1, title: "Ivory Handleless Kitchen", photo: "1663811396777-05505d999151", ... }
```

To use real NIVAS project photos instead — which is strongly recommended before
showing this to clients — put them in `assets/img/` and swap the helper:

```js
// in site.js, replace the img() helper body with:
function img(id) { return "assets/img/" + id; }
// then set photo: "kitchen-palampur-1.jpg" on each project
```

Unsplash photos are free for commercial use with no attribution required.

---

## Deploying

No build step. Point any static host at the repo root.

**Render** — push to GitHub, then New → Static Site. Build Command empty,
Publish Directory `.`. `render.yaml` is included for the Blueprint flow.

**Vercel** — `npx vercel --prod`, framework preset Other, build and output empty.

Also works as-is on Netlify, Cloudflare Pages, GitHub Pages or any nginx root.

---

## Before going live

1. **Replace the stock photography** with real project photos — this matters more
   than anything else on the list.
2. **Verify the pricing figures.** The per-square-foot numbers are realistic
   placeholders, not quotes from the business.
3. **Check the testimonials.** They are written as realistic examples; replace them
   with real client words before publishing.
4. **Confirm the map pin.** It currently points at Bhawarna generally — replace
   `mapEmbed` in `site.js` with the exact Google Maps embed for the showroom.
5. **Consider a form backend.** The enquiry form currently opens WhatsApp or the
   visitor's email client. Formspree or Web3Forms would let you receive submissions
   directly without changing the markup.

Built for Nivas Modular Concepts, Bhawarna.
