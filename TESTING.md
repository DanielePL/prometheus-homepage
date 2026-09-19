# TESTING.md — offene Tests für prometheus.coach

Regeln aus `WORKFLOW.md`: Jede sichtbare Änderung legt im selben Commit ihren
Eintrag hier an. Schließen nur mit Beleg, der die Person nennt:
`✅ 2026-09-08, Thomas (Chrome, live): …` — nie nur „Claude".
Fehlgeschlagen → Eintrag bleibt offen, Fix direkt oder Bug-Task mit Repro,
Screenshot, Konto, Browser.

Testkonten `qa-<vorname>+coach@…`, alles Angelegte mit Präfix `[QA]`.

## Offen

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
