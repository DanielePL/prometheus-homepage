# WORKFLOW.md — gemeinsamer Prozess Daniele + Thomas (v2.2, 2026-09-20)

Gilt in jedem Peakforce/Prometheus-Repo identisch. Kanonische Kopie: `DanielePL/Peakforce/WORKFLOW.md`,
verteilt per `scripts/sync-workflow.sh`. Änderungen nur dort, nie in der Kopie.
Ausführliche Fassung: Vibe-Playbook Zürich–Bangkok (Artifact-Link bei Daniele).

## Wer bin ich
Zwei gleichberechtigte Operatoren: **Daniele** (@DanielePL, Zürich, Owner) und **Thomas** (@tomturbo69, Bangkok).
Claude liest `git config user.name`, um zu wissen, in wessen Session es arbeitet. Beide bauen, testen,
deployen, direkt auf `main`. Danieles OK braucht nur, was unten unter „Nur mit Danieles OK" steht.

## Git — ein Repo, ein main, kleine Commits
- **Im Origin-Repo arbeiten (`DanielePL/<repo>`), nie in einem Fork.** Beide haben Schreibrecht. Ein Fork
  sammelt Divergenz und bringt sie als einen Riesen-Merge zurück (2026-09-05: 1922 Dateien in einem PR,
  parallel zu sieben Commits auf main). Wer einen Fork hat, löscht ihn.
- Beide direkt auf `main`. Kleine Commits, sofort pushen. **Vor jedem Push `git pull`** (mit
  `pull.rebase=true`, `rebase.autoStash=true`). Kein `git merge main` in den eigenen Stand, keine Merge-Commits.
- Branch nur freiwillig (länger als ein Tag, oder zweite Meinung gewünscht): `dp/…` oder `tb/…`, täglich
  pushen, täglich auf `origin/main` rebasen, max. 2 Wochen, dann PR mit **Squash-Merge**, Branch löschen.
  Neues abgegrenztes Feature lieber „versteckt auf main" (keine Nav, Feature-Flag).
- **Nie:** Force-Push auf main, Rebase gepushter Commits, `git add -A` / `git add .` / `git commit -a`.
  Kaputtes main wird mit `git revert` repariert, nicht umgeschrieben.
- **Struktur-Umbauten (Ordner verschieben, Repo umbenennen, Build-Root ändern) nur nach Absprache im Task,
  als eigener Commit, nie zusammen mit Feature-Änderungen.** Sie brechen CI, Deploy-Root und den Checkout des
  anderen auf einen Schlag.
- Parallel-Sessions im selben Repo: eigener `git worktree` pro Session. Vor dem Commit `git status --short`
  lesen, nur eigene Pfade stagen.
- **Commit-Message:** `typ(bereich): Was sich für den Nutzer ändert` (feat, fix, test, chore, docs, refactor).
  Body sagt warum. Nie „ttt", „change1", „green build". Wenn etwas deployt wurde, eine Body-Zeile
  `Deploy: migration <ts> angewendet, fn <name>`. Claude hängt den Co-Authored-By-Trailer an.
- Commits sind SSH-signiert (`gpg.format ssh`, `commit.gpgsign true`). `user.name`/`user.email` = eigenes
  GitHub-Konto.

## Board (Forge /tasks) = die einzige Sicht darauf, wer wo arbeitet
- Kein Code in einem Bereich ohne eigenen Task auf „In Arbeit". Bereich der anderen Person „In Arbeit" →
  nicht anfassen, fragen. Aufgaben kommen aus „Bereit", nicht aus dem Chat. Nebenfunde → neuer Task.
- `/today` in der Forge jeden Morgen lesen (kommt um 7 Uhr Ortszeit auch per Mail): eigene Tasks,
  Bereit-Queue, offene Tests, was der andere seit gestern gepusht und deployt hat.
- **Abhol-Warteschlange.** Am To-Do in der Forge (oder in der Handy-PWA) der Knopf „Claude" → die Aufgabe wird
  beantwortet und, wenn sie im Code umsetzbar ist, mit Ziel-Repo zum Abholen freigegeben. Im Terminal holt
  `/work [repo]` die nächste: reservieren (45 Min, kein Doppelgriff), umsetzen, mit Commit zurückmelden — das
  schliesst sie auch auf dem Board. Direkt: `~/.claude/bin/work-queue.sh next|claim|done|failed|release`,
  Key in `~/.prometheus-todo-key`. Was Versand, Geld oder eine Entscheidung braucht, bleibt bewusst liegen
  und kommt nie in die Warteschlange.

## Datenbank und Deploy — ein Supabase-Projekt (zzluhirmmnkfkifriult), acht Repos
- **Deployt wird nur, was auf `origin/main` liegt:** vorher pullen, der zu deployende Stand ist committet
  und gepusht. Der Hook `.claude/hooks/block-stale-deploy.py` erzwingt das.
- Migration: Datei unter `supabase/migrations/` committen + pushen, dann `supabase db query --linked --file`,
  dann in `supabase_migrations.schema_migrations` eintragen. Nicht `db push`. Zeitstempel = UTC-Minute plus
  Repo-Kennung als Sekunden (Admin 00, Coach 10, Enterprise 20, Mobile 30). Additiv ist frei.
- Edge Function: `scripts/check-function-ownership.sh <slug>` muss grün sein (Slugs sind global über alle
  Repos, der letzte Deploy gewinnt lautlos). Deploy mit `--project-ref zzluhirmmnkfkifriult`.
- **Nur Soft-Delete.** Nie `DELETE`/`TRUNCATE`/`.delete()`. Reads filtern soft-gelöschte Zeilen.
- Keine Secrets im Repo, in Chat, Mail oder Client-Artefakten. Eigene Keys, nie geteilte.
- Dauerläufer (Dev-Server, Builds über 2 Minuten, Emulator, Log-Streams) immer im Hintergrund starten.

## Nur mit Danieles OK (gilt für beide, auch für Danieles eigenen Claude)
`DROP` / `DELETE` / `TRUNCATE` / Spaltentypen ändern / RLS abschalten · Function löschen oder fremden Slug
übernehmen · bestehende Secrets ändern oder rotieren · alles an Auth (Config, Login-Seiten, AuthContext,
Provider, Redirect-URLs, Policies auf `auth.*`) · Render-Env-Vars und Deploy-Hooks · Force-Push ·
Struktur-Umbauten des Repos.

## Testen
- Jede sichtbare Änderung legt im selben Commit ihren Eintrag in `TESTING.md` an. Nicht fertig ohne Eintrag.
- Offene Einträge = gemeinsame Queue. Schliessen nur mit Beleg, der die **Person** nennt:
  `✅ 2026-09-08, Thomas (Chrome, live): …` — nie nur „Claude". `/team/delivery` zählt danach.
- Fehlgeschlagen → Eintrag bleibt offen, Fix direkt oder Bug-Task mit Repro, Screenshot, Konto, Browser.
- Testkonten `qa-<vorname>+<app>@…`, alles Angelegte mit Präfix `[QA]`. Nie echte Kundenkonten, kein „Login als".

## Session-Start (Claude führt das aus bei „Session-Start")
1. `git pull` in den Repos des Tages. Prüfen: `git rev-parse --abbrev-ref HEAD` = main, kein Fork-Remote.
2. `/today` lesen bzw. nennen, was der andere seit gestern gepusht/deployt hat.
3. Board: eigener Task auf „In Arbeit".
4. Offene `TESTING.md`-Einträge lesen und nennen.
5. `~/.claude/bin/work-queue.sh next` — liegt eine vorbereitete Aufgabe bereit, nennen.

## Session-Ende (bei „Session-Ende")
1. `git pull`, Build laut `CLAUDE.md`, `git push`. Nichts Ungepushtes über Nacht.
2. `dev_log.md`: drei Zeilen (was, warum, Fallstrick).
3. Task auf „Auf main" bzw. „Getestet", Commit-Link rein.
4. Offene TESTING-Einträge vorlesen.

## Übergabe
- Überlappung 9–13 Uhr Zürich / 14–18 Uhr Bangkok: OKs, Fragen, gemeinsame Deploys.
- Daniele hält mindestens zwei Tasks auf „Bereit" für Thomas' nächsten Morgen.
- Ein Call pro Woche, 30 Minuten, im Überlappungsfenster.
