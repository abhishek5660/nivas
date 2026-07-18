/* ============================================================
   NIVAS Modular Concepts — site content
   Single source of truth for business details, projects,
   services, pricing, testimonials and FAQs.
   ============================================================ */
(function (global) {
  "use strict";

  /* ---------- Business details (real) ---------- */
  const BUSINESS = {
    name: "NIVAS",
    tagline: "Modular Concepts",
    legal: "Nivas Modular Concepts",
    phones: ["9418189944", "8360170194"],
    phonePrimary: "+919418189944",
    whatsapp: "919418189944",
    email: "nivasmodular@gmail.com",
    address: {
      line1: "Khaira Road, Bhawarna",
      line2: "Near PNB Bank",
      district: "Kangra, Himachal Pradesh",
      country: "India",
    },
    hours: "Every day 9:00 am – 6:00 pm · Sunday closed",
    hoursShort: "Mon–Sat, 9am – 6pm",
    social: {
      instagram: "https://www.instagram.com/nivas.modular.concepts?igsh=MXZ4ejNvYWlxZWhpZQ==",
      linkedin: "#",
      youtube: "#",
      facebook: "#",
    },
    /* Google Maps embed for the showroom area */
    mapEmbed:
      "https://www.google.com/maps?q=Bhawarna,+Kangra,+Himachal+Pradesh&output=embed",
    mapLink: "https://www.google.com/maps/search/Bhawarna,+Kangra,+Himachal+Pradesh",
  };

  /* ---------- Image helper ----------
     One Unsplash photo ID per project. Variants are produced by requesting
     different crop anchors, which keeps the gallery visually varied without
     ever showing an unrelated room. */
  function img(id, w, h, crop) {
    return (
      "https://images.unsplash.com/photo-" + id +
      "?auto=format&fit=crop&w=" + (w || 1200) +
      "&h=" + (h || 900) + "&q=80&crop=" + (crop || "entropy")
    );
  }

  /* Soft neutral placeholder shown while a photo loads or if it fails */
  function placeholder(tone) {
    const tones = {
      warm: ["#e8ded2", "#d6c7b4"],
      cool: ["#dfe4e6", "#c6ced2"],
      dark: ["#2c2925", "#413b34"],
    };
    const t = tones[tone] || tones.warm;
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='" + t[0] + "'/>" +
      "<stop offset='1' stop-color='" + t[1] + "'/></linearGradient></defs>" +
      "<rect width='4' height='3' fill='url(#g)'/></svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  /* ---------- Categories ---------- */
  const CATEGORIES = [
    { id: "kitchen",  name: "Modular Kitchens", blurb: "Straight, L-shaped, U-shaped, parallel and island layouts." },
    { id: "wardrobe", name: "Wardrobes",        blurb: "Sliding, hinged and walk-in wardrobes built to the wall." },
    { id: "tvunit",   name: "TV Units",         blurb: "Living room consoles with concealed storage and cable routing." },
    { id: "vanity",   name: "Bathroom Vanities", blurb: "Moisture-resistant units in marine ply and acrylic." },
    { id: "study",    name: "Study & Storage",  blurb: "Work desks, crockery units, lofts and utility storage." },
  ];

  /* ---------- Projects ---------- */
  const PROJECTS = [
    { id: 1,  title: "Ivory Handleless Kitchen",     cat: "kitchen",  layout: "L-shaped",  place: "Palampur",  year: 2025, photo: "1663811396777-05505d999151", tone: "warm",
      note: "Acrylic ivory shutters with a quartz counter and a tall-unit tower for the oven and microwave." },
    { id: 2,  title: "Graphite Island Kitchen",      cat: "kitchen",  layout: "Island",    place: "Dharamshala", year: 2025, photo: "1778731660388-36c3a51bed99", tone: "dark",
      note: "Matte graphite laminate with a breakfast overhang and three pendant lights over the island." },
    { id: 3,  title: "Oak & White U-Kitchen",        cat: "kitchen",  layout: "U-shaped",  place: "Bhawarna",  year: 2024, photo: "1682662044733-9120471befc7", tone: "warm",
      note: "Warm oak veneer paired with white membrane shutters and a wooden false ceiling." },
    { id: 4,  title: "Monochrome Parallel Kitchen",  cat: "kitchen",  layout: "Parallel",  place: "Kangra",    year: 2024, photo: "1661964027195-4df42ba76842", tone: "cool",
      note: "Black base units, white wall units and a full-height tandem pantry pull-out." },
    { id: 5,  title: "Marble Island Kitchen",        cat: "kitchen",  layout: "Island",    place: "Palampur",  year: 2025, photo: "1613545564241-296299063513", tone: "cool",
      note: "Statuario-look quartz waterfall island with brass pendants and integrated seating." },
    { id: 6,  title: "Café-Style Breakfast Kitchen", cat: "kitchen",  layout: "Island",    place: "Baijnath",  year: 2024, photo: "1639173925921-5d5fd027713c", tone: "warm",
      note: "Island with bar stools, open display niches and a concealed appliance garage." },
    { id: 7,  title: "Compact Straight Kitchen",     cat: "kitchen",  layout: "Straight",  place: "Bhawarna",  year: 2024, photo: "1664300622993-2b748c662751", tone: "cool",
      note: "A 9-foot run that fits a sink, hob, tall pantry and full crockery storage." },
    { id: 8,  title: "Loft Kitchen & Dining",        cat: "kitchen",  layout: "L-shaped",  place: "Dharamshala", year: 2023, photo: "1643949915134-73a4c880f7c7", tone: "dark",
      note: "Open kitchen flowing into the dining space, with a shared material palette throughout." },
    { id: 9,  title: "Skylight White Kitchen",       cat: "kitchen",  layout: "U-shaped",  place: "Palampur",  year: 2023, photo: "1601760561441-16420502c7e0", tone: "warm",
      note: "High-gloss white with a profile-lit wall unit and a deep single-bowl sink." },
    { id: 10, title: "Pendant-Lit Family Kitchen",   cat: "kitchen",  layout: "Parallel",  place: "Kangra",    year: 2025, photo: "1661295665154-34615f961f8c", tone: "warm",
      note: "Soft-close hardware throughout, with a dedicated tea and coffee counter." },

    { id: 11, title: "Full-Wall Sliding Wardrobe",   cat: "wardrobe", layout: "Sliding",   place: "Palampur",  year: 2025, photo: "1629078691371-2c83d139c986", tone: "warm",
      note: "Wall-to-wall sliding wardrobe with internal drawers, tie rack and a hidden safe cavity." },
    { id: 12, title: "Walk-In Dressing Room",        cat: "wardrobe", layout: "Walk-in",   place: "Dharamshala", year: 2024, photo: "1530411554903-7e745b9f1f6d", tone: "cool",
      note: "Open-shelf walk-in with a full-length mirror, island drawer unit and profile lighting." },
    { id: 13, title: "Bedroom Wardrobe & Loft",      cat: "wardrobe", layout: "Hinged",    place: "Bhawarna",  year: 2024, photo: "1573311392049-4186e3a47e9c", tone: "warm",
      note: "Hinged wardrobe with a matching headboard panel and loft storage above." },
    { id: 14, title: "Glass-Front Display Wardrobe", cat: "wardrobe", layout: "Sliding",   place: "Kangra",    year: 2023, photo: "1672137233327-37b0c1049e77", tone: "cool",
      note: "Frosted glass shutters in slim aluminium profiles, lit from within." },
    { id: 15, title: "His & Hers Wardrobe",          cat: "wardrobe", layout: "Hinged",    place: "Baijnath",  year: 2025, photo: "1646592491352-b1c02c48e72a", tone: "warm",
      note: "Split hanging zones, pull-out trouser rack and a dedicated accessory drawer." },

    { id: 16, title: "Floating Oak TV Console",      cat: "tvunit",   layout: "Wall-mounted", place: "Palampur", year: 2025, photo: "1738168259543-d0c58e2b91ed", tone: "warm",
      note: "Wall-hung console with concealed cable routing and a back-lit panel." },
    { id: 17, title: "Panelled Media Wall",          cat: "tvunit",   layout: "Full wall",  place: "Dharamshala", year: 2024, photo: "1663811397219-c572550dffc5", tone: "cool",
      note: "Fluted panelling across the full wall with a recessed niche for the television." },
    { id: 18, title: "TV Unit with Bookshelf",       cat: "tvunit",   layout: "Full wall",  place: "Bhawarna", year: 2024, photo: "1683141392308-aaa39d916686", tone: "warm",
      note: "Media unit combined with open shelving for books and display pieces." },
    { id: 19, title: "Walnut Entertainment Wall",    cat: "tvunit",   layout: "Full wall",  place: "Kangra",   year: 2023, photo: "1636206508343-a6c955887476", tone: "dark",
      note: "Walnut-finish slats with a soundbar shelf and closed storage below." },
    { id: 20, title: "Living Room Storage Console",  cat: "tvunit",   layout: "Wall-mounted", place: "Palampur", year: 2025, photo: "1724582586508-8f06117dc979", tone: "cool",
      note: "Low console with push-to-open drawers and a matching side unit." },

    { id: 21, title: "Green Marble Vanity",          cat: "vanity",   layout: "Double",    place: "Dharamshala", year: 2025, photo: "1676321688594-7c2e60a70de1", tone: "cool",
      note: "Marine-ply vanity in a deep green finish with a marble counter and under-mount basin." },
    { id: 22, title: "Twin-Basin Vanity",            cat: "vanity",   layout: "Double",    place: "Palampur", year: 2024, photo: "1613891593663-290ad585dca1", tone: "cool",
      note: "Two basins, a full-width mirror with backlighting and drawer storage between." },
    { id: 23, title: "Compact Powder-Room Vanity",   cat: "vanity",   layout: "Single",    place: "Bhawarna", year: 2024, photo: "1661963215502-dc2bc471ab2a", tone: "warm",
      note: "Wall-hung single vanity in a moisture-sealed finish, built for a small footprint." },

    { id: 24, title: "Study & Work Desk",            cat: "study",    layout: "Built-in",  place: "Kangra",   year: 2025, photo: "1679309981674-cef0e23a7864", tone: "cool",
      note: "Built-in desk with an overhead cabinet, cable grommet and open display shelving." },
    { id: 25, title: "Corner Study Nook",            cat: "study",    layout: "Corner",    place: "Palampur", year: 2024, photo: "1732721750677-b9e410a2c335", tone: "warm",
      note: "A corner nook that turns an unused bay into a full working setup." },
    { id: 26, title: "Home Office Storage Wall",     cat: "study",    layout: "Built-in",  place: "Baijnath", year: 2023, photo: "1751107807635-a2ac6035e8dd", tone: "warm",
      note: "Desk with a floor-to-ceiling storage wall in a matching oak finish." },
  ];

  /* ---------- Before & after ---------- */
  const TRANSFORMATIONS = [
    { id: "t1", title: "Bhawarna · 3BHK kitchen", days: 21,
      before: "1507089947368-19c1da9775ae", after: "1682662044733-9120471befc7",
      note: "A dark, cluttered kitchen with loose cabinetry replaced by a full modular U-layout in oak and white." },
    { id: "t2", title: "Palampur · Apartment kitchen", days: 18,
      before: "1596205250168-c3583813eea0", after: "1663811396777-05505d999151",
      note: "Bare civil work turned into a handleless ivory kitchen with a quartz counter and tall pantry." },
    { id: "t3", title: "Kangra · Master bedroom", days: 14,
      before: "1588854337221-4cf9fa96059c", after: "1629078691371-2c83d139c986",
      note: "An open, unusable alcove converted into a wall-to-wall sliding wardrobe with internal drawers." },
  ];

  /* ---------- Services ---------- */
  const SERVICES = [
    { id: "design", icon: "compass", title: "Design consultation",
      text: "We measure your space, understand how you cook and live, and produce a layout with 3D views before anything is cut.",
      points: ["On-site measurement", "3D design views", "Layout options", "Material sampling"] },
    { id: "kitchen", icon: "kitchen", title: "Modular kitchens",
      text: "Complete kitchens in straight, L, U, parallel and island layouts — carcass, shutters, counter, hardware and appliances.",
      points: ["Marine ply / HDHMR carcass", "Acrylic, laminate, membrane", "Quartz and granite counters", "Soft-close hardware"] },
    { id: "wardrobe", icon: "wardrobe", title: "Wardrobes & storage",
      text: "Sliding, hinged and walk-in wardrobes measured to the wall, with internal organisation planned around what you own.",
      points: ["Wall-to-wall fit", "Internal drawers and racks", "Loft storage", "Profile lighting"] },
    { id: "living", icon: "sofa", title: "Living & bedroom units",
      text: "TV consoles, crockery units, study desks, bathroom vanities and pooja units — finished in the same palette as your kitchen.",
      points: ["TV and media walls", "Study and work desks", "Bathroom vanities", "Crockery and pooja units"] },
    { id: "execution", icon: "hammer", title: "Manufacturing & installation",
      text: "Machine-cut in our workshop, delivered flat and installed by our own team — not sub-contracted labour.",
      points: ["Factory-cut precision", "In-house install team", "Site protection", "Snag list before handover"] },
    { id: "care", icon: "shield", title: "Warranty & after-care",
      text: "Ten years on the carcass and one year on hardware, with service visits handled directly by us.",
      points: ["10-year carcass warranty", "1-year hardware warranty", "Free first service", "Local support"] },
  ];

  /* ---------- Process ---------- */
  const PROCESS = [
    { n: "01", title: "Talk to us", text: "Call, WhatsApp or send an enquiry. We understand your space, family size and rough budget." },
    { n: "02", title: "Site measurement", text: "We visit, measure every wall, and note plumbing, electrical and window positions." },
    { n: "03", title: "Design & 3D views", text: "You get a layout with 3D views, material options and a line-by-line quotation." },
    { n: "04", title: "Approve & book", text: "Once the design and quote are signed off, we book production with a booking amount." },
    { n: "05", title: "Manufacturing", text: "Panels are machine-cut and edge-banded in our workshop while your site is prepared." },
    { n: "06", title: "Installation", text: "Our own team installs on site, usually in three to six days depending on scope." },
    { n: "07", title: "Handover", text: "We walk through with you, clear the snag list and hand over care instructions and warranty." },
  ];

  /* ---------- Pricing ---------- */
  const PRICING = [
    {
      id: "essential", name: "Essential", from: 1450, unit: "per sq ft",
      blurb: "Honest, hard-wearing modular work for a first home or a rental.",
      features: [
        "BWR plywood carcass",
        "Laminate shutters (0.8 mm)",
        "Standard soft-close hinges",
        "Granite counter",
        "Basic accessory set",
        "10-year carcass warranty",
      ],
      popular: false,
    },
    {
      id: "signature", name: "Signature", from: 1950, unit: "per sq ft",
      blurb: "Our most-chosen package — the balance most families land on.",
      features: [
        "710 marine ply carcass",
        "Acrylic or membrane shutters",
        "Premium soft-close hardware",
        "Quartz counter",
        "Tall unit and pantry pull-out",
        "Under-cabinet profile lighting",
        "10-year carcass + 1-year hardware",
      ],
      popular: true,
    },
    {
      id: "bespoke", name: "Bespoke", from: 2650, unit: "per sq ft",
      blurb: "Fully custom joinery when the space and the brief deserve it.",
      features: [
        "HDHMR / marine ply, your choice",
        "Veneer, PU or glass finishes",
        "Imported hardware options",
        "Engineered stone or full marble",
        "Appliance integration planned in",
        "Motorised and lift-up fittings",
        "Priority scheduling",
      ],
      popular: false,
    },
  ];

  /* ---------- Testimonials ---------- */
  const TESTIMONIALS = [
    { name: "Rakesh Thakur", place: "Palampur", rating: 5,
      text: "We compared three vendors in Kangra and went with Nivas because they measured properly and showed us a 3D view before asking for money. The kitchen was installed in four days and the finish is exactly what was shown." },
    { name: "Sunita Rana", place: "Bhawarna", rating: 5,
      text: "The tall pantry pull-out has changed how I cook — everything is reachable now. They also fixed a hinge six months later without charging me anything." },
    { name: "Amit Sharma", place: "Dharamshala", rating: 5,
      text: "Quote was line by line, so I knew what I was paying for. No surprise additions at the end, which is rare. The island came out better than the drawing." },
    { name: "Neha Kaushal", place: "Kangra", rating: 4,
      text: "Very good work and a patient team. Installation ran two days over what was promised because of a site delay, but they communicated it and stayed till it was finished." },
    { name: "Vikas Chauhan", place: "Baijnath", rating: 5,
      text: "Got a wardrobe and TV unit done together. Both match perfectly and the internal organisation was planned around what we actually own, not a standard template." },
    { name: "Pooja Sood", place: "Palampur", rating: 5,
      text: "They handled the whole thing while we were living out of town, sent photos every few days, and handed over a clean site. Would recommend to anyone in the valley." },
  ];

  /* ---------- FAQ ---------- */
  const FAQS = [
    { q: "How much does a modular kitchen cost?",
      a: "Most kitchens we build in the Kangra valley land between ₹1.6 lakh and ₹4.5 lakh, depending on size, material and hardware. Pricing works out per square foot — from ₹1,450 in Essential to ₹2,650 in Bespoke. After a site visit you get a line-by-line quotation, so you can see exactly what each part costs." },
    { q: "How long does the whole process take?",
      a: "Typically four to six weeks from design approval to handover. Manufacturing takes two to three weeks, and installation on site is usually three to six days. A wardrobe alone is faster — often two weeks end to end." },
    { q: "What material do you use for the carcass?",
      a: "BWR plywood in the Essential package and 710-grade marine ply in Signature and Bespoke. Both are moisture resistant, which matters in our climate. We do not use plain MDF for carcasses in wet areas — it swells." },
    { q: "Do you handle plumbing, electrical and civil work?",
      a: "We plan and mark all of it during design, and we coordinate with your electrician and plumber so the points land where they should. Civil work and tiling are usually done by your contractor, though we can recommend people we have worked with." },
    { q: "What is covered in the warranty?",
      a: "Ten years on the carcass against manufacturing defects and delamination, and one year on hardware — hinges, channels and baskets. Normal wear, water damage from leaks and physical damage are not covered. Service visits are handled by our own team." },
    { q: "Can you work with my existing kitchen layout?",
      a: "Often yes. If the plumbing and window positions are workable we can rebuild within the same layout, which keeps civil cost down. Sometimes moving the sink by two feet transforms how the kitchen works — we will tell you honestly which is worth it." },
    { q: "Do you take on projects outside Bhawarna?",
      a: "Yes. We regularly work across Palampur, Dharamshala, Kangra, Baijnath and the surrounding areas. For sites further out we will discuss transport and installation stay costs upfront." },
    { q: "What payment schedule do you follow?",
      a: "Typically a booking amount on design approval, a larger instalment when manufacturing begins, and the balance on installation and handover. The exact split is written into your quotation before anything is signed." },
  ];

  /* ---------- Stats ---------- */
  const STATS = [
    { value: 200, suffix: "+", label: "Homes completed" },
    { value: 12,  suffix: "",  label: "Years in the valley" },
    { value: 10,  suffix: "yr", label: "Carcass warranty" },
    { value: 98,  suffix: "%", label: "On-time handover" },
  ];

  global.NIVAS_DATA = {
    business: BUSINESS,
    categories: CATEGORIES,
    projects: PROJECTS,
    transformations: TRANSFORMATIONS,
    services: SERVICES,
    process: PROCESS,
    pricing: PRICING,
    testimonials: TESTIMONIALS,
    faqs: FAQS,
    stats: STATS,
    img, placeholder,
  };
})(window);
