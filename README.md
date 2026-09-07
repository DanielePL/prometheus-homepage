# prometheus.coach — Marketing-Website

Die Website für das Prometheus-Coach-Produkt (Personal Trainer, Online-Coaches,
Studio Light). Englisch, vorgerendert, gehostet auf Render.

Arbeitsregeln, Positionierung, Preis-Wahrheit und Design-Tokens stehen in
`CLAUDE.md`. Der gemeinsame Prozess steht in `WORKFLOW.md`. Offene Tests in
`TESTING.md`.

## Entwickeln

```bash
cp .env.example .env   # öffentliche Supabase-Werte, keine Secrets
npm install
npm run dev            # http://localhost:5180
```

## Bauen und prüfen

```bash
npm run build          # Prerender nach dist/, dann Pretty-URLs (<slug>/index.html)
npm run preview
```

Der Build rendert jede Seite aus `ssgOptions.includedRoutes` in `vite.config.js`
zu echtem HTML. Neue Seite = Route in `src/routes.jsx`, Eintrag in
`vite.config.js`, Rewrite in `render.yaml`, Zeile in `public/sitemap.xml`.

## Deploy

Push auf `main` deployt über Render (`render.yaml`). Vor dem Push `git pull`,
Build lokal grün.

## Struktur

```
src/
  main.jsx               ViteReactSSG-Einstieg, zählt Seitenaufrufe
  routes.jsx             Routen als Daten (Build braucht sie in Node)
  pages/                 eine Datei pro Route
  components/home/       die aktive Startseite
  components/site/       Section-Primitive (aktiv) + geparkte Enterprise-Sektionen
  components/            Uralt-Seite, nur noch von /growth benutzt
  lib/links.js           alle Produkt-Links
  lib/beacon.js          cookieloser Seitenaufruf-Zähler
public/
  .well-known/           Universal/App Links — nicht anfassen
  images/coach/          die aktiven Produkt-Screenshots (WebP)
  images/photos/         Fotografie
scripts/
  postbuild-pretty-urls.mjs
```
