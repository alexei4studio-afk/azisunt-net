# Demo Publisher Workflow

Sales demos live at `azisunt.net/demo/<slug>`.

Each demo is a standalone folder with one config object. No CMS, no database, no backend.

---

## Add a new demo

**1. Create the folder**
```bash
mkdir app/demo/<slug>
```

**2. Copy the template**
```bash
cp app/demo/egydent/page.js app/demo/<slug>/page.js
```

**3. Edit the config**

Open `app/demo/<slug>/page.js` and change the `config` object:

```js
const config = {
  name: "Nume Afacere",
  tagline: "Tip · Oraș",
  headline: "Titlu mare\npe două linii.",
  subheadline: "Descriere scurtă, orientată pe client.",
  phone: "+40 7XX XXX XXX",
  whatsapp: "407XXXXXXXX",          // format: 40 + număr fără +
  address: "Str. Exemplu 1, Oraș",
  primaryColor: "#2563eb",           // culoare accent (hex)
  accentColor: "#1d4ed8",
  cta: "Programează-te",             // textul butonului WhatsApp
  services: [
    { icon: "🛠️", name: "Serviciu 1", price: "de la 200 RON" },
    { icon: "✨", name: "Serviciu 2", price: "de la 400 RON" },
  ],
  gallery: [],                       // lasă gol = placeholder-uri colorate
  reviews: [
    { name: "Prenume N.", text: "Recenzie scurtă și reală.", stars: 5 },
  ],
};
```

**4. Update metadata**
```js
export const metadata = {
  title: "Nume Afacere | Tip",
  description: "Descriere scurtă.",
};
```

**5. Push**
```bash
git add app/demo/<slug>/
git commit -m "demo: add <slug>"
git push
```

Vercel auto-deployează. Demo live în ~60 secunde.

---

## Demo URLs

| Slug | URL |
|---|---|
| egydent | azisunt.net/demo/egydent |
| happywash | azisunt.net/demo/happywash |
| euphoria-beauty | azisunt.net/demo/euphoria-beauty |

---

## Template component

`components/DemoPage.jsx` — editează asta doar dacă vrei să schimbi layoutul pentru TOATE demo-urile.

---

## Culori recomandate per nișă

| Nișă | primaryColor |
|---|---|
| Dental | `#2563eb` |
| Beauty / Nails | `#7c3aed` |
| Auto Detailing | `#0f172a` + accent `#f59e0b` |
| Auto Service | `#1e293b` + accent `#3b82f6` |
| Restaurant | `#991b1b` |
| Fitness | `#16a34a` |

---

## Note

- Demo-urile au `noindex` — nu apar în Google.
- Galeria afișează placeholder-uri colorate dacă `gallery: []`.
- WhatsApp buton sticky apare întotdeauna în jos pe mobil.
- `primaryColor` colorează accent, butoane, tagline.
