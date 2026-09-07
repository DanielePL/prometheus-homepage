# TESTING.md — offene Tests für prometheus.coach

Regeln aus `WORKFLOW.md`: Jede sichtbare Änderung legt im selben Commit ihren
Eintrag hier an. Schließen nur mit Beleg, der die Person nennt:
`✅ 2026-09-08, Thomas (Chrome, live): …` — nie nur „Claude".
Fehlgeschlagen → Eintrag bleibt offen, Fix direkt oder Bug-Task mit Repro,
Screenshot, Konto, Browser.

Testkonten `qa-<vorname>+coach@…`, alles Angelegte mit Präfix `[QA]`.

## Offen

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
