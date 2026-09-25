# TESTING.md — offene Tests für prometheus.coach

Regeln aus `WORKFLOW.md`: Jede sichtbare Änderung legt im selben Commit ihren
Eintrag hier an. Schließen nur mit Beleg, der die Person nennt:
`✅ 2026-09-08, Thomas (Chrome, live): …` — nie nur „Claude".
Fehlgeschlagen → Eintrag bleibt offen, Fix direkt oder Bug-Task mit Repro,
Screenshot, Konto, Browser.

Testkonten `qa-<vorname>+coach@…`, alles Angelegte mit Präfix `[QA]`.

## Offen

- [ ] **Vier Feature-Seiten (2026-09-25)** (live, Chrome + Safari + iPhone):
  `/nutrition/`, `/video-review/`, `/payments/`, `/sales-assistant/` laden
  direkt per URL mit eigenem Titel, auch ohne Slash. Screenshots ohne
  QA-Avatar, ohne E-Mail-Adressen, ohne fremde Produktnamen. „Learn more"
  auf den Karten der Startseite, „How the assistant works" beim Assistant
  und die vier Footer-Links führen hin. Sitemap enthält alle vier.
- [ ] **Preis-Rechner „Add up what you pay today" (2026-09-24)** (live, Chrome +
  Safari + iPhone): Auf `/pricing/`, `/trainerize-alternative/` und
  `/studios/`. Zahlen in die Zeilen tippen → Summe rechnet live; liegt sie
  über unserem Preis, ist sie orange durchgestrichen und rechts steht „$X a
  month less … and $Y a year". Klientenzahl-Auswahl (Coach) wechselt unseren
  Preis entsprechend der Leiter, Studio zeigt fest $79. Ohne JS: Felder und
  „$0" sichtbar, nichts kaputt. Hero auf `/` trägt die Zeile „From $19 a
  month, all of it."
- [ ] **Nutrition-Screenshot und Video-Loops (2026-09-24)** (live, Chrome +
  Safari + iPhone): In „What you get" hat die Nutrition-Karte einen echten
  Screenshot der Nutrition Library. Die Kundenliste beim Assistant und die
  Rechnungsliste bei Payments sind stumme 8-Sekunden-Loops: laufen erst, wenn
  sie im Viewport sind, kein Ton, keine Controls, Poster liegt sofort. Mit
  „Bewegung reduzieren" (macOS/iOS) bleibt nur das Poster. Kein QA-Name, kein
  „[L"-Avatar, kein Demo-Banner im Bild.
- [ ] **`/pricing/` (2026-09-23)** (live, Chrome + Safari, Desktop und iPhone):
  Zehn Sprossen 5–70 Klienten mit Monats- und Jahrespreis stimmen mit
  `prometheus_coach/webapp/src/integrations/stripe/config.ts` überein, Studio
  Light $79/$790. Jeder „Start free" landet auf `/onboarding`. Nav „Pricing",
  Footer „Pricing" und „See every plan" auf `/` und `/trainerize-alternative/`
  führen hierher. Auf dem Handy kein horizontales Scrollen, Jahresspalte
  ausgeblendet. Rechtsseiten (`/privacy/`, `/terms/`, `/impressum/`,
  `/goodbye/`) hell mit weißen Karten, keine dunklen Kästen mehr.
- [ ] **SEO-Durchgang (2026-09-22)** (live, Chrome + Safari): Jede Seite hat
  den Suchbegriff als erste Zeile im `<h1>` (sichtbar als Chip), Titel ≤ 62
  Zeichen (Tab-Titel prüfen). Geteilter Link von `/`, `/studios/`,
  `/enterprise/`, `/trainerize-alternative/` in iMessage/Slack zeigt das neue
  helle Vorschaubild (`/images/og/*.jpg`), nicht mehr das Athletenfoto.
  FAQ auf der Startseite klappt ohne JS auf (`<details>`). Schrift lädt von
  `/fonts/geist-latin.woff2` (DevTools → Network, kein Aufruf an
  fonts.googleapis.com). Rich-Results-Test von Google zeigt Organization,
  SoftwareApplication und FAQPage auf `/`, SoftwareApplication auf
  `/studios/` und `/enterprise/`.
- [x] **Soft-404 im Render-Dashboard** ✅ 2026-09-22, Daniele (Render-Dashboard,
  live per curl geprüft): Catch-all `/* → /index.html` durch die zehn Rewrites
  aus `render.yaml` ersetzt. `/gibt-es-nicht` → 404, `/enterprise` und
  `/studios` ohne Slash → eigene Seite, `/auth/callback` und `/growth` → App-Shell.
  Fallstrick: Ziel ohne führenden Slash (`index.html`) liefert 200 mit 0 Bytes.
- [ ] **`/enterprise/` Pilot-Seite (2026-09-18)** (live, Chrome + Safari,
  Desktop und iPhone): Direktaufruf zeigt die Seite mit eigenem Titel (View
  Source). Beide „Talk to us about a pilot"-Buttons öffnen eine Mail an
  management@prometheus.coach mit Betreff „Enterprise pilot". Nav-Link „For
  chains", die Zeile unter den drei Türen auf `/` und der Footer-Link führen
  hin. HQ-, Desk- und Handy-Screenshot sichtbar und **auf Englisch** (neu
  aufgenommen 2026-09-19, `public/images/enterprise/`), kein Kundenname (nur
  Demo „Studio Apex"), kein Demo-Banner, keine schwebenden Buttons im Bild. `sitemap.xml` enthält `/enterprise/`.
- [ ] **Helles Redesign (2026-09-16)** (live, Chrome + Safari, Desktop und
  iPhone): `/`, `/studios/`, `/trainerize-alternative/`, `/impressum/`, 404.
  Weißer Grund, Geist-Schrift geladen (keine Fallback-Sans), Pill-Buttons,
  ein dunkler Schlussblock mit Footer. Kein horizontales Scrollen auf dem
  Handy. Nav bei Scroll weiß mit Linie, Mobile-Menü deckend. Alle sechs
  Screenshots und beide Handy-Mockups sichtbar, PhotoBreak mit runden Ecken
  ab Tablet. Logo in Nav und Footer lesbar (Flamme + Text).
Die Seite vom 18.–22.08.2026 ist live, aber ohne dokumentierten Test durch
eine Person. Diese Einträge holen das nach.

- [ ] **Startseite `/`** (live, Chrome + Safari, Desktop und Mobile): Alle
  Sektionen sichtbar, kein hängender Reveal, Hero ohne Layout-Sprung. Jeder
  „Start free trial"-CTA landet auf `app.prometheus.coach/onboarding`, nie im
  Login. Nav-Links „What you get" und „Pricing" scrollen zum Anker, auch von
  `/studios/` aus.
- [ ] **`/studios/`** (live): Seite lädt direkt per URL mit eigenem Titel
  (View Source, nicht erst nach Hydration). Studio-CTA landet auf
  `/onboarding?plan=studio_light`. Kontakt-Link öffnet Mail an management@.
- [ ] **`/trainerize-alternative/`** (live): Direktaufruf zeigt die Seite,
  nicht die Startseite. Die Fakten-Tabelle nennt nur uns. Preise stimmen mit
  `stripe/config.ts` überein ($19–89, Studio $79).
- [ ] **404** (live): `https://prometheus.coach/gibt-es-nicht` liefert
  HTTP 404 (DevTools → Network) und die 404-Seite, nicht die Startseite.
- [ ] **Seitenaufruf-Zähler**: Nach Besuch von `/` → `/studios/` stehen zwei
  `site.page_view`-Events in der Zieltabelle von `site-beacon`, Route korrekt,
  kein Cookie gesetzt (DevTools → Application → Cookies leer).
- [ ] **SEO-Grundlagen**: `sitemap.xml` und `robots.txt` erreichbar, jede
  vorgerenderte Seite hat genau einen `<title>` und eine Description
  (View Source). Geteilter Link (z. B. in iMessage/Slack) zeigt og:image.
- [ ] **Universal/App Links**: `/.well-known/apple-app-site-association` und
  `/.well-known/assetlinks.json` antworten mit `application/json` und
  unverändertem Inhalt (gegen Repo-Datei diffen).
- [ ] **Rechtsseiten**: `/privacy/`, `/terms/`, `/impressum/` laden, Firmen-
  angaben entsprechen dem Handelsregisterstand (Commit vom 16.08.).

## Erledigt

(noch nichts belegt)
