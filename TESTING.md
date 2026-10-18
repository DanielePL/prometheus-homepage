# TESTING.md — offene Tests für prometheus.coach

Regeln aus `WORKFLOW.md`: Jede sichtbare Änderung legt im selben Commit ihren
Eintrag hier an. Schließen nur mit Beleg, der die Person nennt:
`✅ 2026-09-08, Thomas (Chrome, live): …` — nie nur „Claude".
Fehlgeschlagen → Eintrag bleibt offen, Fix direkt oder Bug-Task mit Repro,
Screenshot, Konto, Browser.

Testkonten `qa-<vorname>+coach@…`, alles Angelegte mit Präfix `[QA]`.

## Offen

- [ ] **Neue Coach- und iOS-Screens nach dem Redesign (2026-10-17)** (live,
  Chrome + iPhone): `/coach/` zeigt im Hero das helle Coach-Dashboard („Good
  morning, Daniele"), darunter Sales-Pipeline ohne Call-Link, Bibliothek mit
  Übungsvideos plus iPhone (Push Session), Kundenliste und Rechnungsliste als
  helle Standbilder (keine dunklen Scroll-Videos mehr). `/nutrition/`,
  `/payments/`, `/video-review/`, `/sales-assistant/`: Hero-Bilder hell und
  scharf, Handys zeigen die iOS-App. `/schweiz/`: Block „Mitglieder-App" zeigt
  zwei iOS-Screens (Workout, Trainingswoche). Auf dem iPhone: nichts
  verpixelt, keine doppelte Dynamic Island im Handy-Rahmen.

- [ ] **Teamsport-Präsentation (2026-10-16)** (live, Chrome am Präsentations-
  Laptop + Beamer): `prometheus.coach/praesentation-team/?fuer=ZSC%20Lions`
  öffnet Folie 1 mit „für ZSC Lions", kein Cookie-Banner. Pfeil rechts,
  Leertaste und der Presenter-Clicker blättern vor, Pfeil links zurück, F
  schaltet Vollbild. Folie 2 nennt keine frühere Rolle beim Club (Satz am
  2026-10-17 gestrichen, er war falsch). Folien 4 und 6 zeigen echte Screenshots aus dem
  Team-Demo. Neu laden bleibt auf derselben Folie (#n in der Adresse).
  Seit 2026-10-17: Klick auf einen Screen öffnet ihn gross, jede Taste oder
  ein Klick schliesst ihn (am Beamer bei den Folien mit zwei Screens prüfen).
  VBT hat zwei Folien (Kamera statt Gerät; Schnellkraft mit Zonen-Leiste),
  die Schweiz-Folie heisst „Aus Zürich, nicht aus Übersee".
  Alle Screens neu im aktuellen Design (schwarz, ohne Flammen-Wasserzeichen,
  das nur für die Aufnahme ausgeblendet ist), Deutsch.
  Seit 2026-10-17 mittags: jede Kapitel-Folie Text links, genau ein Screen
  rechts, alle Screens gleich gross (volles App-Fenster 1418 x 840). VBT hat
  eine eigene Folie mit dem getrackten Lift hochkant. Kapitel 07 hat zwei
  iOS-Folien (Training, Ernährung), Team-Folie vor dem Vorschlag, Kapitel-
  Leiste unten. 25 Folien.
  Seitenquelltext enthält den Clubnamen nicht; `robots.txt` sperrt den Pfad.
- [ ] **Schweiz-Seite `/schweiz/` (öffentlich) + `/club/` für Anas (2026-10-16)**
  (live, iPhone Safari + Chrome Desktop): `prometheus.coach/schweiz/` öffnet mit
  „Dein ganzes Studio in einem System. CHF 149, 249 oder 399 im Monat.". Das
  Nacht-Gym zoomt **einmal langsam hin** und bleibt stehen (kein Zurückzoomen).
  Küchentisch, Handy-Anmeldung und Tür laufen stumm vorwärts im Loop, ohne
  sichtbaren Sprung, auch auf dem iPhone. Keine Frau mit Kurzhanteln mehr, bei
  der Mitglieder-App zwei echte App-Screens. Block „Jedes Studio läuft anders"
  mit Mit Empfang / Ohne Personal / Beides. Mahnwesen als 5 Stufen bis
  „Zutritt sperren – nur wenn du es einschaltest". Rechner: Beträge eintragen →
  „Heute" summiert, Tarif-Knöpfe wechseln, Ersparnis pro Jahr erscheint.
  Schweiz-Block zeigt „Daten in Zürich". Ohne `?n=` „Lass uns reden.", **kein**
  Satz über Anas. `prometheus.coach/club/?n=Marco` zeigt dieselbe Seite mit
  „Marco, lass uns reden." und „Anas hat dir diesen Link geschickt.". Quelle von
  `/schweiz/` ohne `noindex`, `/club/` mit `noindex`, beide canonical
  `/schweiz/`. `/schweiz/` steht in der Sitemap, robots.txt hat kein
  `Disallow: /club` mehr. Link in WhatsApp → Vorschau mit Titel und Nachtbild.

- [ ] **Startseite ohne Pilot, mit Gym-Preisen (2026-10-04)** (live, Chrome +
  Safari + iPhone): `prometheus.coach` H1 „Software for gyms, studios and
  boxes. Everything in it, from €149 a month.", Desk-Screenshot im Hero. Das
  Wort „pilot" kommt nirgends vor (Strg+F). Preisblock zeigt Starter €149,
  Studio €249, Pro €399 /mo per location. „Try it 30 days" und „Start free"
  in der Nav führen auf `enterprise.prometheus.coach/auth/register`, „Log in"
  auf die Gym-App. Unten „Not a gym?" mit Coach → `/coach/` und Studio Light
  → `/studios/`. Footer-Spalte „For gyms": Gym software, Gym pricing, Gym log
  in, Studio Light. Auf `/coach/` zeigen Nav-Login/Signup weiter auf die
  Coach-App. Geteilter Link von `/` zeigt das neue Vorschaubild mit €149.
- [ ] **Enterprise-Startseite (2026-10-04)** (live, Chrome + Safari + iPhone):
  `prometheus.coach` öffnet mit „Software for gyms and gym chains", HQ-
  Screenshot, Pilot-CTA (Mail an management@). Unten zwei Türen: Studio
  Light → `/studios/`, Coaches → `/coach/`. Nav: For chains · For studios ·
  For coaches · Pricing. `/coach/` zeigt die frühere Coach-Startseite mit
  eigenem Titel. `/enterprise` und `/enterprise/` leiten auf `/` um (301,
  DevTools → Network). Geteilter Link von `/` zeigt das neue Vorschaubild.
- [ ] **Startseite mit rotem Faden: Preis und Leistung zuerst (2026-10-03)**
  (live, Chrome + Safari, Desktop und iPhone):
  1. Ohne zu scrollen sichtbar, auch auf dem iPhone: „Win clients, coach them,
     get paid. One app, from $19 a month." und darunter „You pay for how many
     clients you coach. Never for features".
  2. Danach genau vier Blöcke (01 Win clients, 02 Coach them properly, 03 Keep
     them, 04 Get paid), jeder mit Screenshot oder Video, abwechselnd links und
     rechts; bei 02 steht ein Handy vor dem Bildschirm. Die Links (Sales
     assistant, Nutrition, Video review, Invoicing) führen auf ihre Seiten.
  3. Dann Preis (4 Stufen), FAQ (5 Fragen, neu: „I do not need every
     feature…"), Schlussblock. Kein Studio-Block, keine Türen, kein VBT, kein
     „Who builds this", kein Enterprise im Text.
  4. Nav: „What it does · Pricing · For gyms"; „What it does" springt zu den
     vier Jobs. Footer hat die Spalte „For gyms" mit Studio Light und Chains.
  5. Vorschaubild beim Teilen von `/` zeigt die neue Headline; das von
     `/payments/` sagt „Four payment providers".
- [ ] **Gym-Zonen auf `/`, `/studios/`, `/enterprise/` (2026-10-03)** (live, Chrome +
  Safari + iPhone): Je zwei dunkle Zonen mit Gym-Foto dahinter — Hero bis „What you get"
  und „Where you start" bis Client-App — mit weichem Übergang (Dämmerung → Tag)
  in die hellen Teile. Das Strength-Foto läuft randlos und löst sich unten in
  Graphit auf, kein harter Rand. Karten in den Zonen lesbar, die hervorgehobene
  Karte (Online coaching, Preis 15) orange statt dunkel. Auf dem Handy kein
  horizontales Scrollen.
- [ ] **Neuer Auftritt mit Gym-Fotos + Faktenkorrekturen (2026-10-02)** (live,
  Chrome + Safari, Desktop und iPhone):
  1. `/`: Hero ist ein Vollbild-Foto (Halle mit orangen Lichtlinien), Schrift
     weiß, Navigation weiß und transparent; nach dem ersten Scrollen wird sie
     zur weißen Leiste mit dunkler Schrift. Das Dashboard ragt aus dem Foto in
     die weiße Seite. Kein Flackern, Text auf dem Handy lesbar.
  2. Foto-Streifen „The coaching is the product." zeigt die Coaching-Fläche;
     die Tür „Small studio or box" ist eine Foto-Karte (Empfang), der
     Ketten-Streifen hat ein Gebäude-Thumbnail; der Schlussblock steht vor dem
     beleuchteten Gebäude (auch auf `/pricing/`, `/studios/`, `/enterprise/`,
     `/trainerize-alternative/`).
  3. `/studios/` und `/enterprise/` öffnen ebenfalls mit Foto-Hero; auf
     `/enterprise/` ragt das HQ-Dashboard aus dem Foto.
  4. Texte: überall „Four payment providers — Stripe, dLocal, Razorpay,
     Xendit" (Startseite, `/payments/`), kein Wise/Revolut. `/studios/`
     Check-in-Karte sagt Empfang statt Selbst-Check-in. `/enterprise/`:
     „German, English and French". `/privacy/` nennt Supabase „Singapore
     region" statt EU (nach dem Zürich-Umzug wieder anpassen).
  5. Mit „Bewegung reduzieren": kein Zoom-Effekt auf dem Hero-Foto.

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

- [ ] **Cookie-Banner, GA4, PostHog, Meta Pixel** (2026-10-09). Alles aus, solange die IDs in
  `src/lib/tracking.js` leer sind (dann kein Banner, kein Request). Nach dem Eintragen einer ID:
  Inkognito-Fenster → Banner unten rechts, vorher kein Request an googletagmanager/facebook
  (DevTools → Network). „Choose“ → nur Statistik → GA lädt, Pixel nicht. Footer „Cookie settings“
  → „Reject“ → Seite lädt neu, GA weg. Klick auf einen Signup-Knopf → GA-Event `sign_up_start`
  (GA4 → Echtzeit). `/privacy/` Abschnitt 7a nennt genau die eingeschalteten Werkzeuge.
  Claude (Chrome, Dev-Server mit Test-IDs, 2026-10-09): Banner, Teilzustimmung, Signup-Event
  (`product: gym`), Widerruf und Abschnitt 7a wie beschrieben gesehen; keine Konsolenfehler.
  Live seit 2026-10-09 mit GA4 `G-W2HY7HEGRH` (Property „prometheus.coach“, Konto Daniele Pauli).
  Claude (Chrome, live, 2026-10-09): Banner erscheint, vor Zustimmung kein GA-Skript; nach „Accept all“
  lädt GA. Dabei gefunden und gefixt (d92ac31): erster Seitenaufruf nach Zustimmung wurde nicht
  gemeldet; Banner-Text nannte Meta ohne Pixel. Fix nicht mehr im Browser nachgeprüft (Chrome hing).
  PostHog live seit 2026-10-09 (EU-Projekt 299984): Seite sendet `$pageview`, kein Cookie/Storage.
  Beim Live-Test antwortete PostHog dem Browser mit 503 (Server-Test mit gleichem Key: 200),
  Ereignisse noch nicht in PostHog sichtbar.
  **Offen:** GA4 → Echtzeit zeigt nach Zustimmung einen Nutzer; PostHog → Activity zeigt Pageviews; Pixel-ID.
- [ ] **Fasta-Blogging-Schnittstelle** (2026-10-08). Funktion `fasta-blog-publish` (Admin-Repo),
  Tabelle `blog_posts`, Bucket `blog-images`, Cron `blog-scheduled-build`.
  `node scripts/test-fasta-endpoint.mjs` (Token in `~/.prometheus-fasta-token`, Anon-Key in der
  Umgebung) prüft die Abnahmepunkte der Spezifikation; `--live` zusätzlich die fertige Seite.
  Claude (2026-10-08): 19/19 grün gegen die echte Funktion (401 ohne/falsches Token, Entwurf
  unsichtbar, Veröffentlichen live, Bearbeiten behält id/URL/Erstdatum, ältere Version ignoriert,
  geplanter Artikel versteckt, Bilder aus eigenem Speicher mit Alt-Text, Script/Handler entfernt,
  409 bei Slug-Kollision, 422 bei falschem Payload). Lokaler Build mit dem Testartikel: Artikelseite,
  Übersicht, Sitemap, Footer-Link „Blog“ im Browser gesehen. Testartikel danach soft-gelöscht.
  **Offen:** Deploy-Hook als Secret (dann baut ein Veröffentlichen die Seite neu), `--live`-Lauf,
  echte 404 (Render-Dashboard-Catch-all löschen), Testlauf zusammen mit Caitlin.
- [ ] **SEO-Paket: 7 neue + 7 überarbeitete Seiten** (2026-10-08, live nach Deploy).
  Neu: `/online-coaching-software/`, `/mindbody-alternative/`, `/everfit-alternative/`,
  `/truecoach-alternative/`, `/about/`, `/contact/`, `/faq/`. Überarbeitet: `/pricing/`,
  `/studios/`, `/trainerize-alternative/`, `/nutrition/`, `/video-review/`, `/payments/`,
  `/sales-assistant/`, Footer. Pro Seite (Desktop + Handy): lädt direkt per URL, eigener
  Titel im Tab, keine leeren Flächen nach dem Scrollen, alle CTAs landen im richtigen
  Signup (Gym → enterprise…/auth/register, Coach/Studio → app…/onboarding), Footer-Links
  führen nirgends ins Leere. `/pricing/`: Auswahl „Welche passt zu mir?“ springt zum
  richtigen Block, Rechner rechnet. Wechselseiten: Konkurrenzname nur in Überschrift/Titel,
  keine fremden Preise. Geteilter Link zeigt das neue Vorschaubild. Rich-Results-Test für
  `/faq/` (FAQPage) und eine Wechselseite.
  Claude (Chrome, Produktionsbuild lokal, 2026-10-08): alle 14 Seiten Titel ≤ 60, Description
  ≤ 155, genau ein H1, Canonical korrekt; im 390-px-Rahmen kein seitliches Scrollen; keine
  Konsolenfehler; Desktop-Sichtprüfung pricing, mindbody, online-coaching, studios, about,
  faq, contact. **Offen: Durchgang durch eine Person, und Caitlins Lektorat.**
- [ ] **Blog-Vorlage `/blog/` + Artikel** (2026-10-08, Dev-Server, da noch kein echter Post):
  Dev-Server im Hintergrund starten, `localhost:5180/blog/sample-long-article/`. Desktop:
  Breadcrumbs, Autor/Datum/Aktualisiert/Lesezeit, Titelbild, Inhaltsverzeichnis rechts
  klebt und markiert beim Scrollen den aktuellen Abschnitt, Teilen-Knöpfe (Link kopieren
  zeigt „Copied"), Autorbox, „Related articles", CTA „One system for the whole gym.".
  Handy: Inhaltsverzeichnis oben aufklappbar, Tabelle scrollt in sich, kein seitliches
  Scrollen. `/blog/sample-draft/`, `/blog/sample-future/`, `/blog/gibts-nicht/` → 404-Seite.
  Produktionsbuild: `/blog/` hat `noindex`, Sitemap ohne Blog, kein „Sample Author" in
  `dist/assets`. Nach dem ersten echten Post: Rich-Results-Test (BlogPosting +
  BreadcrumbList) und Seite live prüfen.
  Claude (Chrome, Dev-Server, 2026-10-08): Desktop + 390-px-Rahmen wie beschrieben gesehen,
  Entwürfe/Zukunft/unbekannt = 404, keine Konsolenfehler, Prod-Bundle ohne Beispielposts.
  **Offen: Durchgang durch eine Person.**

## Erledigt

(noch nichts belegt)

## OFFEN — Neue iOS-Handy-Screens (2026-10-17)
Handy-Bilder aus dem neuen iOS-Design (Simulator, 1320×2868 → 640×1385): `app-mobile-workout` (Deadlift Session), `app-mobile-training` (Trainingswoche), neu `app-mobile-nutrition` (Ernährung, auf /features/nutrition).
1. prometheus.coach/schweiz/ → Abschnitt mit den zwei Handys: Deadlift-Session und Trainingswoche, runde Ecken, nichts abgeschnitten.
2. /features/nutrition → erstes Handy zeigt Ernährung (618 kcal, Makro-Ringe), zweites die Trainingswoche.
3. Startseite (Outcomes, Bibliothek-Karte), /online-coaching, /features/video-review: Handy zeigt die neuen Screens.
Hinweis: Die Screens zeigen deutsche UI, auch auf den englischen Seiten.

## OFFEN — Enterprise-Screens neu + /schweiz/ mit Coach Web und Rundgängen (2026-10-18)
Neue Enterprise-Bilder im hellen Design (Demo Studio Apex): `enterprise/desk`, `hq`, `ceo` (Handy) und `surfaces/dark-accounting` (Kreditoren) auf Englisch; für /schweiz/ deutsche Fassungen `desk-de`, `accounting-de`, dazu `coach/web-de` (Bibliothek) und `enterprise/rounds-de` (Rundgänge/Compliance).
1. prometheus.coach/schweiz/ → nach „Übersicht“ (Desk auf Deutsch, „Kurs ohne Coach · HIIT Blast“) folgen „Coach Web für deine Trainer“ (deutsche Bibliothek) und „Rundgänge — Garderobe sauber, belegt“ (Verwarnungs-Dossier „abgehakt in 9s“). Danach die Mitglieder-App.
2. /schweiz/ Abschnitt Buchhaltung → deutsche Kreditoren-Liste.
3. /schweiz/ Preise → Satz „Die App für deine Mitglieder und Coach Web für deine Trainer sind dabei.“
4. Startseite EN → Desk, HQ, CEO-Handy und Payables zeigen das helle Design, kein Braun auf den CEO-Karten.
Bekannt: Kategorien in der Kreditoren-Demo sind englisch („Goods & consumables“), „4 Dokument“ statt „Dokumente“.

## OFFEN — /schweiz/ Preise: KI-Assistent im Abo (2026-10-18)
1. prometheus.coach/schweiz/#preise → Satz „Die App für deine Mitglieder, Coach Web für deine Trainer und der KI-Assistent sind dabei.“

## OFFEN — /schweiz/: helle Screens auf Studiofoto, drei ganze iOS-Handys (2026-10-18)
Owner: helle Enterprise-Screens gingen auf dem hellen Seitenhintergrund unter. Jetzt liegt jeder auf einem abgedunkelten Foto aus /images/gym (Desk → Empfang, Coach Web → Trainingsfläche, Rundgänge → Halle, Buchhaltung → Empfang am Abend). Die Mitglieder-App zeigt drei vollständige iPhones (Training, Deadlift-Session, Ernährung) mit Gehäuserand statt zwei oben abgeschnittener.
1. prometheus.coach/schweiz/ am Rechner → Desk, Coach Web, Rundgänge, Buchhaltung: Screenshot klar abgesetzt, Foto dahinter sichtbar.
2. Mitglieder-App → drei ganze Handys, nichts oben abgeschnitten, Ecken rund ohne schwarze Zwickel.
3. Dasselbe am iPhone: Handys nicht zu klein, nichts läuft über den Rand.
4. /online-coaching-software, /video-review, /nutrition: Handybilder haben jetzt transparente Ecken, keine schwarzen Ecken auf hellem Grund.

## OFFEN — /schweiz/ Übersicht: Kommandozentrale hell → dunkel → zwölf Markenfarben (2026-10-18)
Owner: statt Desk die Kommandozentrale (mehr Funktionen), zuerst hell, dann dunkel, am Schluss alle Farben im Schnelldurchlauf. Paletten-Bilder = echtes Dashboard (Demo Studio Apex) mit den CSS-Variablen aus Enterprise brandingCssVars(). Neuer Satz: „Wir arbeiten hinter dem Vorhang. Du hast freie Bahn auf der Bühne: hell, dunkel, in deinen Farben.“
1. prometheus.coach/schweiz/ → Abschnitt „Übersicht“ in den Blick scrollen: ~3,5 s hell, Überblendung dunkel, dann Ocean … Midnight schnell, dann Prometheus, von vorn. Schild unten rechts nennt den Modus/die Palette.
2. Alle fünf Schnellaktionen sichtbar (einchecken, anlegen, Termin, Karte, Verkauf).
3. Systemeinstellung „Bewegung reduzieren“ an → nur das helle Bild, kein Wechsel.
4. Am iPhone: Bild und Schild lesbar, nichts überlappt.
