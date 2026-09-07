@WORKFLOW.md

# Prometheus Homepage — CLAUDE.md (Stand 2026-09-07)

Die Marketing-Website auf `prometheus.coach`. **Nicht** die Produkt-App (die
liegt auf `app.prometheus.coach`, das Enterprise-Cockpit auf
`enterprise.prometheus.coach`). Dieses Repo verkauft das Produkt, es ist kein
Teil davon.

**Chat-/Antwortsprache: Deutsch.** Der **Website-Text ist Englisch** (seit
2026-08-18), die Rechtsseiten sind Deutsch. Code-Kommentare sind Englisch.

---

## Was die Seite heute ist

Seit dem 18.08.2026 verkauft die Startseite das **Coach-Produkt an Personal
Trainer und Online-Coaches, in Englisch.** Vorher war sie eine deutsche
Enterprise-Seite für Studios und Ketten. Grund für den Wechsel, aus dem Commit:
Enterprise ist geparkt, ein Coach, der über `trainerize alternative` kam, las
„Ich führe ein Studio oder eine Kette" und ging wieder. Englisch, weil der
Markt dort ist: 156'100 Suchen im Monat gegen 250 auf Deutsch
(`prometheus-admin/docs/GROWTH_PLAN.md` §3).

**Argumentationsfolge, von Daniele festgelegt:** alles in einem System → der
Sales-Assistant → alles inklusive → VBT als Fußnote, nie als Headline.

**Was die Seite bewusst nicht tut:**
- **Keine Zahlen als Beweis.** Am 18.08. waren es sieben Coach-Konten und null
  Coach-Klient-Verknüpfungen. Eine kleine Zahl beantwortet „nutzt das jemand?"
  mit Nein, eine erfundene beendet die Marke. Die Screenshots beweisen, bis die
  Zahlen druckreif sind.
- **Nichts gratis.** Kein Free-Tier, kein Founding-Coach-Rabatt, keine
  Gutscheine. Danieles Regel: „Was nichts kostet, ist nichts wert." Der
  14-Tage-Trial bleibt, das ist ein Blick aufs Produkt, kein Geschenk.
- **Kein Gründerkult.** Kein „gegründet vom Weltmeister". Daniele hat das selbst
  gestrichen: Die Firma darf nicht von einer Person abhängen.
- **Der Studio-Teil ist eine Tür, keine Sektion.** Drei Zeilen mit Link auf
  `/studios/`. Ein voller Studio-Block zieht ein zweites Vokabular (Check-in,
  Mitgliedschaften, Kasse) auf eine Seite, die für Coaching ranken muss. Eine
  Seite, eine Absicht.
- **Studio Light ist ein Schalter im Coach-Produkt, keine Gym-Suite.**
  Enterprise (Ketten, HQ, Regionen) kommt auf `/studios/` genau einmal vor, als
  ehrlicher Satz an Pilotstudios. Sonst nirgends.
- **Der primäre CTA ist der Trial, nicht die Demo.** Ein Coach kauft, ohne mit
  jemandem zu reden. Alle Produkt-Links stehen in `src/lib/links.js` und zeigen
  auf `/onboarding`, nie auf die nackte App-Domain (die landet im Login).

---

## Stack

React 19 · Vite 7 · **vite-react-ssg** (Prerender) · Tailwind v4
(`@tailwindcss/vite`) · lucide-react · react-router-dom 6 · Supabase-Client
(nur Auth-Callback und Demo-Formular). framer-motion ist installiert, wird aber
nur noch von geparkten Sektionen und `/growth` benutzt.

```
npm run dev      # vite-react-ssg dev auf Port 5180 (strictPort, kollidiert sonst mit den anderen Prometheus-Projekten)
npm run build    # Prerender nach dist/ + scripts/postbuild-pretty-urls.mjs
npm run preview  # Build lokal prüfen
```

Dev-Server immer im Hintergrund starten (siehe globale Regeln).

### Prerender — drei Listen, die synchron bleiben müssen

Die Seite wird zur Build-Zeit in Node gerendert, damit ein Crawler Text sieht
(vorher lieferte prometheus.coach 67 Zeichen Text und kein `<h1>`). Wer eine
Seite hinzufügt oder entfernt, pflegt **alle drei**:

1. `src/routes.jsx` — die Route
2. `vite.config.js` → `ssgOptions.includedRoutes` — was vorgerendert wird
3. `render.yaml` → `routes` — die Rewrites auf `<slug>/index.html`

Dazu `public/sitemap.xml` und ggf. `public/robots.txt`.

**Nicht vorrendern:** `/auth/callback`, `/stripe/success` (lesen
`window.location`, crashen in Node) und `/growth` (Investor-Pitch, soll nicht
ranken, rendert in Node nicht).

**Trailing Slash zählt:** Interne Links, Canonicals und Sitemap benutzen
`/studios/` mit Slash, weil der Host nur diese Form aus der Datei bedient.

**Kein Catch-all in `render.yaml`.** Was keine Datei trifft, bekommt
`dist/404.html` mit echtem 404-Status. Ein Blanket-Rewrite auf `index.html`
macht aus jedem Tippfehler eine 200-Startseite (Soft-404).

**`<Head>` pro Seite,** nicht in `index.html`. Die Head-Verarbeitung hängt an,
statt zu ersetzen. Und **keine HTML-Kommentare mit Tag-Markup in
`index.html`**, die Tags tauchen im Build als echte, leere Tags wieder auf.

### Deployment

**Render** (`render.yaml`, Static Site, Node 20), Apex-DNS zeigt dorthin.
Push auf `main` deployt live. Vor dem Push `git pull`, Build muss lokal grün
sein.

### Nicht anfassen — bricht die Mobile-Apps

`public/.well-known/apple-app-site-association` und
`public/.well-known/assetlinks.json` müssen byte-identisch am Apex-Origin
ausgeliefert werden, sonst brechen Universal Links (iOS) und App Links
(Android) in beiden Member-Apps. `public/_headers` und der Header-Block in
`render.yaml` steuern das mit. Details in `Prometheus-Enterprise/docs/DOMAINS.md`.

---

## Seiten und Struktur

| Route | Datei | Prerender | Zweck |
|---|---|---|---|
| `/` | `pages/HomePage.jsx` | ✓ | Coach-Startseite (EN) |
| `/studios/` | `pages/StudiosPage.jsx` | ✓ | Studio Light, die Tiefe hinter der Studio-Tür |
| `/trainerize-alternative/` | `pages/TrainerizeAlternative.jsx` | ✓ | SEO-Seite für Wechsel-Absicht, zitierbar für AI-Antworten |
| `/privacy/` `/terms/` `/impressum/` `/goodbye/` | `pages/*`, `layouts/LegalLayout.jsx` | ✓ | Rechtsseiten (DE) |
| `/404` + `*` | `pages/NotFound.jsx` | ✓ | echte 404 |
| `/growth` | `pages/GrowthPitch.jsx` | – | Investor-Pitch, per robots ausgeschlossen |
| `/auth/callback`, `/stripe/success` | | – | reine Runtime-Redirects |

**Startseite:** `HomeNav · Hero · Included · SalesAssistant · PhotoBreak ·
Doors · ClientApp · Makers · Pricing · FinalCta · HomeFooter`

- `src/components/home/` — die **aktive** Seite. Jede Datei trägt oben einen
  Kommentar, warum sie so ist, wie sie ist. Lesen, bevor man umbaut.
- `src/components/site/` — `Section.jsx` (`<Section tone width>`,
  `<SectionHeader>`, `<Reveal>`, `useReveal()`) und `PhotoBreak.jsx` sind
  **aktiv** und Grundlage jeder neuen Sektion. Der Rest ist die **geparkte
  deutsche Enterprise-Seite** vom Juli: `HeroOperator, PainSection,
  ProofSection, EntryPoints, PricingSection, FinalCta, SiteNav, SiteFooter,
  BentoGrid, EcosystemDiagram, SurfacesSection, MemberSection,
  VerticalsSection, TrustSection`. Fertig gebaut, absichtlich nicht eingebunden,
  Basis für eine Enterprise-Seite, wenn das Produkt kommt. Nicht als Vorlage
  für Coach-Inhalte nehmen.
- `src/components/` (Wurzel) — die **uralte** Seite (Hero.jsx, Technology.jsx,
  Team.jsx …). Nur `GrowthPitch.jsx` greift noch darauf zu. Nicht anfassen,
  nicht kopieren.
- `src/context/DemoModalContext.jsx` — Demo-Formular, schickt an die Edge
  Function `website-demo-request`. Wird nur von den geparkten Sektionen
  benutzt; die aktive Seite hat keinen Demo-CTA.
- `src/lib/beacon.js` — zählt Seitenaufrufe per `sendBeacon` an die Function
  `site-beacon`. Kein Cookie, kein Storage, kein Identifier. Visits, nicht
  Personen. Läuft aus `main.jsx` bei jedem Routenwechsel. Ein Fehler darf die
  Seite nie beeinflussen.
- `src/lib/links.js` — alle Produkt-Links (`SIGNUP`, `SIGNUP_STUDIO`,
  `PRICING`, `CONTACT`).

---

## Preis-Wahrheit

**Coach:** `prometheus_coach/src/integrations/stripe/config.ts`. Das ist die
Quelle, an Stripe verdrahtet. Zehnstufige Leiter nach Klientenzahl, alle
Features in jeder Stufe, USD:

| Klienten | 5 | 10 | 15 ★ | 20 | 25 | 30 | 40 | 50 | 60 | 70 |
|---|---|---|---|---|---|---|---|---|---|---|
| $/Monat | 19 | 29 | 35 | 39 | 45 | 49 | 59 | 69 | 79 | 89 |

Die Startseite zeigt vier Sprossen (5/15/30/70), die volle Leiter gehört auf
die Pricing-Seite der App. **Studio Light: $79/Monat, alles drin** (derselbe
Config). 14 Tage Trial ohne Karte.

**Veraltet und nicht mehr benutzen:** `prometheus_coach/docs/COACH_PRODUCT_PRICING.md`
($29–229, Basic/Pro-Split) und `Prometheus-Enterprise/docs/PRICING_SHEET.md`
(Studio Light $129). Beide widersprechen dem Code. **Code vor Doc.**

**Enterprise** (`Prometheus-Enterprise/src/config/plans.ts`, EUR/CHF 149/249/399)
steht **nicht** auf der Seite, weil das Produkt geparkt ist. **Member-App**
(B2C, `Prometheus/PRICING.md`) steht auch nicht drauf, die Seite ist nicht für
Mitglieder. Nie „kostenlos" nennen, sie ist Freemium.

---

## Inhaltsregeln — hart

- **Keine erfundenen Zahlen.** Keine Uptime, keine Sync-Zeiten, keine
  Prozentwerte, keine Nutzerzahlen ohne Beleg im Repo mit Fundstelle. Auch
  Suchvolumen im Code-Kommentar nur mit Quelle und Datum (Keyword Planner).
- **Keine Wettbewerber im Text.** Kein Trainerize, TrueCoach, Zen Planner,
  Wodify, Magicline, EGYM usw. Stattdessen „most coaching software", „the
  established providers". **Einzige Ausnahme:** der Name im Titel von
  `/trainerize-alternative/` ist nominative Nutzung. Auf dieser Seite gilt
  zusätzlich: **jede Behauptung ist eine über uns** (was wir enthalten, was wir
  kosten, was wir nicht haben). Nie beschreiben, was der andere kostet oder
  kann. EU-Regeln zu vergleichender Werbung greifen auch bei impliziter
  Nennung. In Anzeigentexten bleibt der Name verboten (Markenrecht).
- **Keine Kundenlogos, -namen, Zitate, Partner** ohne schriftliche Freigabe.
  Pipeline-Namen aus dem Investor-Briefing sind Prospects. Die Seite nennt
  derzeit **keine** Dritten.
- **Keine unausgelieferten Compliance-Versprechen.** Deutsche Kassensicherung
  (TSE/fiskaly) ist nicht verdrahtet.
- **Kein „API / Integrationen / Marketplace".** Das geschlossene System ist
  Absicht.
- **Nichts gratis, kein Gründerkult, keine Zahlen als Beweis** (siehe oben).
- **The Forge** (`prometheus-admin`) ist intern, nie zeigen.
- **LED Pro** steht seit 2026-08-18 nicht mehr auf der Seite (Streifen
  entfernt). Falls es zurückkommt: eigenes Produkt, eigenes Supabase-Projekt,
  nie „ein Backend", nie als Enterprise-Feature, Firma LED Pro Solutions
  ungenannt.

---

## Design

Brand-Tokens aus dem Produkt (`src/index.css`), damit Website → Trial sich wie
dieselbe Firma anfühlt.

- **Akzent: genau eine Farbe**, warmes Orange `#E67E22` (`--color-accent`),
  hell `#F39C12`, dunkel `#D35400`. Keine zweite Akzentfarbe. Rot nur für
  Fehler.
- **Dunkel als Basis, Glassmorphism:** `.glass` / `.glass-strong`. Keine
  flachen grauen Karten.
- **Drei Gründe:** `--color-dark #0D0D0F` (Standard), `--color-raised #14141A`
  (`<Section tone="raised">`), Creme `--color-cream #F4F1EB`
  (`<Section tone="light">`, `.section-light` kippt `glass` und
  `text-white/xx` im Scope mit). Zwei dunkle Sektionen hintereinander nehmen
  verschiedene Gründe.
- **Karten liegen über dem Grund:** `.glass` liefert `--card-catch` (1 px helle
  Oberkante) und `--card-shadow`. Der Hebel ist Kontrast Karte/Grund, nicht der
  Farbton (getestet, drei Kandidaten, nicht unterscheidbar).
- **Navigation nie `.glass`:** `.nav-solid` (0.97 + Blur), Mobile-Menü
  `.nav-panel` voll deckend.
- **Schrift:** `font-display` = Cormorant Garamond (Serif, Headlines, über
  `.display` bei 400–500, nie `font-bold`), `font-body` = Inter. Labels,
  Preise, Tabellenzahlen bleiben Inter, Serif unter 14 px wird Matsch.
- **Signature-Glow** `0 0 30px rgba(230,126,34,0.3)` nur auf aktiven CTAs.
- **Kein framer-motion für Einblendungen, nirgends.** `Reveal`/`SectionHeader`
  laufen über `useReveal()` (IntersectionObserver setzt eine Klasse, CSS macht
  die Blende), Hero über `.hero-rise`, Modal über `.modal-scrim`/`.modal-card`.
  Grund: rAF steht in gedrosselten Tabs still, das Demo-Formular blieb einmal
  bei 15 % Deckkraft hängen. Was über der Falz liegt, hängt nie an einer
  JS-Animation. framer-motion deshalb auch **nicht in `manualChunks`**.
- **Screenshots: echt, nie nachgebaut.** Aktiv: `public/images/coach/*.webp`
  (sechs Aufnahmen aus der Coach-App, 320 KB zusammen) und
  `public/images/photos/*.webp`. Neue Aufnahmen als WebP, ~1600 px breit, nie
  PNG. **Vor dem Einbinden jedes Bild öffnen:** Kundenmarken, Personendaten,
  KI-Anbieter-Nennung, Dev-Mandantennamen.
- **Bildgeneratoren nicht für Produkt-UI.** Sie malen Zahlen und Text neu.
  3D-Geräte-Mockups sind CSS (`.device-stage`, `.phone-shell`, …).

---

## Das Ökosystem — alle Repos

Produktwahrheit kommt aus den Repos, nie aus dem Gedächtnis und nie aus alten
Marketing-Texten.

| Rolle | Pfad |
|---|---|
| **Coach Web** (PT-Arbeitsplatz + Studio Light) — **das verkaufte Produkt** | `/Users/danielepauli/AndroidStudioProjects/prometheus_coach` |
| Coach Mobile (Android) | `/Users/danielepauli/AndroidStudioProjects/PrometheusCoachMobile` |
| Coach Mobile (iOS) | `/Users/danielepauli/iOSProjects/PrometheusCoach` |
| Member App (Android) | `/Users/danielepauli/AndroidStudioProjects/Prometheus/Prometheus_V1` |
| Member App (iOS) | `/Users/danielepauli/iOSProjects/Prometheus_iOS` |
| Enterprise Web (geparkt) | `/Users/danielepauli/Desktop/Prometheus-Enterprise` |
| LED Pro Studio / Web | `…/AndroidStudioProjects/LED_PRO`, `…/ledpro-web` |
| Admin „The Forge" (intern) | `/Users/danielepauli/AndroidStudioProjects/prometheus-admin` |
| Diese Website | `/Users/danielepauli/Desktop/prometheus-homepage` |

**Docs, die die Seite steuern:** `prometheus-admin/docs/GROWTH_PLAN.md`
(Markt, Suchvolumen), `prometheus-admin/docs/CONTENT_PLAN.md` (Visits-to-
Signups, Anzeigen), `prometheus-admin/docs/HOMEPAGE_DRAFT.md`,
`prometheus_coach/dev_log.md` (was zuletzt gebaut wurde). Der alte Website-
Brief `Prometheus-Enterprise/docs/WEBSITE_REDESIGN_BRIEF_JESSE.md` (26.05.)
gilt nur noch für Design-Tokens und Tonalität, seine IA (Enterprise-first,
Deutsch) ist überholt.

---

## Offene Punkte

- **`public/images/screenshots/` (25 MB) und `public/videos/` (10 MB)** sind
  Altlasten der Uralt-Seite. Darunter liegen `forge-*.png`, Screenshots des
  internen Admin-Tools, **öffentlich per URL erreichbar**, obwohl nicht
  verlinkt. Aufräumen (mit Daniele abstimmen, was bleibt).
- **Enterprise-Seite** fehlt, bis das Produkt kommt. Die geparkten Sektionen
  sind die Basis. Beim Wiedereinbinden Anker und Nav mitziehen.
- **Hell-Modus und Sprachschalter** aus dem alten Brief: nicht gebaut, derzeit
  nicht geplant.
- **Zahlen als Beweis:** erst wieder aufnehmen, wenn Konten und Klient-Links
  eine Zahl ergeben, die größer ist, als der Leser erwartet.
- **Rechtsseiten sind Deutsch** auf einer englischen Seite.
- **Conversion messen:** `site-beacon` liefert Visits pro Route mit gclid/utm.
  Ob die Seite verkauft, steht in Visits-to-Signups, nicht im Gefühl.
