---
title: "Cum am automatizat StartFIRMĂ: 5500 de firme înregistrate fără intervenție umană"
date: "2025-04-10"
category: "Studii de Caz"
tag: "AI & Automatizare"
featured: true
excerpt: "De la un formular simplu la o mașinărie digitală care generează dosare ONRC în 5 minute. Arhitectura, greșelile și cifrele reale."
readTime: "8 min"
stats:
  - value: "5.500+"
    label: "Firme procesate"
  - value: "5 min."
    label: "Per dosar"
  - value: "0"
    label: "Intervenții manuale"
---

## Problema inițială

Procesul clasic de înregistrare a unei firme în România implica minimum 3 vizite la ONRC, 15+ documente tipărite și o săptămână de așteptare. **StartFIRMĂ** a schimbat asta complet.

## Arhitectura soluției

```
Formular web → Validare date → Generator PDF (dosare ONRC) → Email automat → Dashboard status
```

Am folosit:
- **Next.js** pentru interfața utilizatorului
- **Supabase** pentru stocarea datelor și autentificare
- **pdf-lib** pentru generarea dinamică a documentelor ONRC
- **Resend** pentru emailuri tranzacționale

## Greșelile care ne-au costat timp

1. **Prima versiune** genera PDF-urile pe client (browser). La fișiere mari, browserul se bloca.
2. **A doua versiune** muta totul pe server — dar fără queue, cererile simultane supraîncărcau funcțiile Vercel Edge.
3. **Versiunea finală** folosește un job queue asincron: formularul returnează imediat un ID de urmărire, procesarea e în background.

## Cifrele după 12 luni

| Metric | Valoare |
|--------|---------|
| Firme procesate | 5.500+ |
| Timp mediu per dosar | 5 minute |
| Erori de generare | < 0.3% |
| NPS utilizatori | 71 |

## Lecția principală

> Automatizarea nu înseamnă înlocuirea omului. Înseamnă eliminarea pașilor care nu necesită judecată umană — lăsând oamenii să facă ceea ce contează.

Fiecare minut salvat din birocrație e un minut investit în construirea afacerii reale.

---

*Vrei un sistem similar pentru afacerea ta? [Vorbim →](https://azisunt.net/#contact)*
