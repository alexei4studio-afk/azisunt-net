# Demo Import Workflow

Sales demos live at `azisunt.net/demo/<slug>`.
Each demo is a static page powered by a single config object — no CMS, no DB, no backend.

---

## Full Pipeline: ZIP → Live Demo

### Step 1 — Receive the ZIP

Place the AI-generated ZIP in the staging area:

```bash
cp ~/Downloads/<project>.zip demo-sites/_imports/
cd demo-sites/_imports/
unzip <project>.zip -d <client-slug>/
```

### Step 2 — Inspect the generated site

```bash
cd demo-sites/_imports/<client-slug>
npm install
npm run dev
```

Open on mobile viewport (Chrome DevTools → iPhone 14 or similar).

**What to look at:**
- Hero headline and subheadline
- Services list — names and prices
- Color scheme (check the CSS variables or Tailwind config)
- Phone number and WhatsApp number
- Address
- Reviews if present
- Gallery images if present (usually placeholder or stock)

**What to ignore / throw away:**
- Routing, pages, components structure — you only need the content
- Any AI-added "loading" states, animations, or scroll magic
- Blog sections, FAQ sections, team sections — unless explicitly needed
- Environment files, unused dependencies

### Step 3 — Extract content

Write down (or copy into a scratch file):

```
businessName: "..."
tagline: "Tip · Oraș"
headline: "..."
subheadline: "..."
phone: "+40 7XX XXX XXX"
whatsapp: "407XXXXXXXX"   ← format: 40 + number without leading +
address: "Str. ..., Oraș"
primaryColor: "#XXXXXX"
services: [...]
reviews: [...]
```

### Step 4 — Create the demo page

```bash
mkdir app/demo/<slug>
cp app/demo/egydent/page.js app/demo/<slug>/page.js
```

Open `app/demo/<slug>/page.js` and fill in the `demoConfig`:

```js
export const demoConfig = {
  businessName: "Nume Afacere",
  hero: {
    tagline: "Tip · Oraș",
    headline: "Titlu mare\npe două linii.",
    subheadline: "Descriere scurtă, orientată pe client.",
    badge: null,                          // or: "RECOMANDAT DE 200+ CLIENȚI"
  },
  colors: {
    primary: "#2563eb",
    accent: "#1d4ed8",
  },
  cta: "Programează-te",
  contact: {
    phone: "+40 7XX XXX XXX",
    whatsapp: "407XXXXXXXX",
    address: "Str. Exemplu 1, Oraș",
    mapUrl: null,                         // or: Google Maps link
  },
  services: [
    { icon: "🛠️", name: "Serviciu 1", price: "de la 200 RON" },
    { icon: "✨", name: "Serviciu 2", price: "de la 400 RON" },
  ],
  gallery: [],                            // empty = colored placeholders
  reviews: [
    { name: "Prenume N.", text: "Recenzie scurtă.", stars: 5 },
  ],
  sections: ["services", "gallery", "reviews", "contact"],
};
```

**Update the metadata too:**
```js
export const metadata = {
  title: "Nume Afacere | Tip",
  description: "Descriere scurtă.",
};
```

### Step 5 — Verify on mobile

```bash
cd /home/alexei4studio/azisunt-net
npm run dev
```

Open `http://localhost:3000/demo/<slug>` in Chrome.
Switch to mobile viewport (iPhone 14 or similar, 390px wide).

Check:
- [ ] Hero reads well on small screen
- [ ] CTA button is visible above the fold
- [ ] Services grid is clean (2-column, nothing overflows)
- [ ] Gallery placeholders look decent (or real photos load correctly)
- [ ] Reviews are readable
- [ ] Sticky WhatsApp bar appears at bottom
- [ ] Colors match the business niche feel

### Step 6 — Push

```bash
git add app/demo/<slug>/
git commit -m "demo: add <slug>"
git push
```

Vercel auto-deploys. Demo is live in ~60 seconds at:
`azisunt.net/demo/<slug>`

### Step 7 — Send on WhatsApp

Share the URL directly. On mobile it renders as a full preview.

```
azisunt.net/demo/<slug>
```

### Step 8 — Archive the ZIP

```bash
mv demo-sites/_imports/<slug>/ demo-sites/_archive/
```

---

## Demo URLs

| Slug | URL |
|---|---|
| egydent | azisunt.net/demo/egydent |

---

## Config reference

### `sections` array

Controls which sections appear and in what order:

```js
sections: ["services", "gallery", "reviews", "contact"]
```

Omit a key to hide that section. Reorder to change page flow.
Default if omitted: all four in the order above.

### `hero.badge`

Optional trust signal above the headline:

```js
badge: "RECOMANDAT DE 200+ CLIENȚI"
badge: "NR. 1 ÎN CLUJ"
badge: null   // hidden
```

### `contact.mapUrl`

Optional Google Maps link shown in the Contact section:

```js
mapUrl: "https://maps.google.com/..."
mapUrl: null   // hidden
```

### `gallery`

Empty array = 4 colored placeholder squares using `primaryColor`.
Real photos:

```js
gallery: [
  { src: "/demos/<slug>/photo1.jpg", alt: "Cabinet" },
]
```

Place photos in `public/demos/<slug>/`.

---

## Color reference by niche

| Nișă | primary | accent |
|---|---|---|
| Dental | `#2563eb` | `#1d4ed8` |
| Beauty / Nails | `#7c3aed` | `#6d28d9` |
| Beauty / Lashes | `#be185d` | `#9d174d` |
| Auto Detailing | `#0f172a` | `#f59e0b` |
| Auto Service | `#1e293b` | `#3b82f6` |
| Restaurant | `#991b1b` | `#7f1d1d` |
| Fitness | `#16a34a` | `#15803d` |
| Accounting | `#0f766e` | `#0d9488` |

---

## Component

`components/DemoPage.jsx` — shared layout for ALL demos.
Edit only if you want to change the layout structure for all demos simultaneously.
Individual demo colors and content come entirely from the config object.
