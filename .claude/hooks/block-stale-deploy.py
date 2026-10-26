#!/usr/bin/env python3
"""PreToolUse-Hook (Bash): Deploy nur aus dem gepushten origin/main.

Warum: Zwei Operatoren deployen in EIN Supabase-Projekt. Wer aus einem alten oder
ungepushten Stand eine Edge Function deployt oder eine Migration anwendet, ersetzt
lautlos, was der andere vor zwei Stunden ausgeliefert hat, und die Datei in Git
sagt etwas anderes als das, was live laeuft. Regel 3 des Vibe-Playbooks.

Geblockt wird 'supabase functions deploy <name>', 'supabase db push' und
'supabase db query ... --file <pfad>', wenn
  (a) HEAD nicht auf origin/main liegt (dahinter ODER ungepusht voraus), oder
  (b) die Function bzw. die Migrationsdatei uncommittete Aenderungen hat.
Fremde WIP in anderen Pfaden stoert nicht (Parallel-Sessions).

Bewusster Ausweg: Marker '# intentional-stale-deploy' an den Befehl haengen.
Fehlertoleranz: bei jedem unerwarteten Problem wird durchgelassen, nie geblockt.

Zweite Regel (CHG-1, 2026-10-03): eine Datei unter supabase/migrations/, die per
'db query --file' angewendet wird, muss 'SET lock_timeout' setzen. Ohne wartet
ein ALTER/CREATE POLICY/CREATE INDEX bis 120 s auf eine Sperre, und jede neue
Anfrage auf die Tabelle reiht sich dahinter ein; unter Last steht die API fuer
alle Apps. Ausnahme: Dateien mit CONCURRENTLY (muessen eine einzelne Anweisung
sein, ein vorangestelltes SET macht daraus einen Transaktionsblock).
Ausweg: '# intentional-no-lock-timeout' an den Befehl haengen.

Gilt fuer das Bash- und das PowerShell-Tool, und fuer 'supabase' wie fuer
'supabase.exe' mit vollem Pfad (vorher griff der Hook dort gar nicht).

Dritte Regel (CHG-10, 2026-10-04): eine Migration, die etwas wegnimmt (DROP,
REVOKE), braucht ihren Rueckweg im selben Commit: eine Datei
'ROLLBACK_<dateiname>' im selben Ordner oder einen Abschnitt '-- ROLLBACK' in der
Datei. Es gibt kein Staging und kein PITR; ohne aufgeschriebenen Rueckweg wird im
Ernstfall unter Druck improvisiert. Dateien, die selbst 'ROLLBACK_' heissen, sind
ausgenommen. Ausweg: '# intentional-no-rollback' an den Befehl haengen.

Arbeitsverzeichnis (2026-10-26): geprueft wird das Verzeichnis, in dem der
supabase-Befehl wirklich laeuft: das letzte 'cd <pfad>' davor (auch 'W=<pfad>;
cd $W'), oder '--workdir <pfad>'. Vorher galt immer das Startverzeichnis der
Session; ein Deploy aus einem eigenen Worktree auf origin/main wurde geblockt,
weil das Haupt-Checkout (mit fremder WIP, nicht pullbar) hinter origin/main lag,
und der Marker als einziger Ausweg sah aus wie das Umgehen einer Schutzregel.

Vierte Regel (AUTH-2, 2026-10-04): 'supabase config push' ist geblockt. Der Befehl
schreibt sofort live (kein Diff-Modus) und setzt alles, was config.toml nicht nennt,
auf Defaults zurueck; das hat dreimal den Login bzw. die Auth-Mails gebrochen.
Ausweg: '# intentional-config-push' an den Befehl haengen.
"""
import json, os, re, subprocess, sys

MARKER = "intentional-stale-deploy"
LOCK_MARKER = "intentional-no-lock-timeout"
ROLLBACK_MARKER = "intentional-no-rollback"
CONFIG_MARKER = "intentional-config-push"
CONTRACT = re.compile(
    r"^\s*(drop\s+(table|view|materialized\s+view|function|type|schema|policy)\b"
    r"|revoke\b|alter\s+table\b[^;]*\bdrop\s+(column|constraint)\b)", re.I | re.M)
CLI = r"supabase(?:\.exe)?['\"]?\s+"

def git(cwd, *args):
    r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, timeout=20)
    return r.returncode, r.stdout.strip()

def deny(reason):
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse",
                      "permissionDecision": "deny", "permissionDecisionReason": reason}}))
    sys.exit(0)

def effective_cwd(cmd, cwd, start):
    """Directory the supabase command at offset `start` really runs in."""
    before = cmd[:start]
    env = dict(os.environ)
    for m in re.finditer(r"(?:^|[\s;&|(])([A-Za-z_][A-Za-z0-9_]*)=(\"[^\"]*\"|'[^']*'|[^\s;&|]+)", before):
        env[m.group(1)] = m.group(2).strip("'\"")
    def resolve(raw, base):
        raw = raw.strip("'\"")
        raw = re.sub(r"\$\{?([A-Za-z_][A-Za-z0-9_]*)\}?", lambda m: env.get(m.group(1), m.group(0)), raw)
        raw = os.path.expanduser(raw)
        full = raw if os.path.isabs(raw) else os.path.join(base, raw)
        return full if os.path.isdir(full) else None
    d = cwd
    for m in re.finditer(r"(?:^|[\s;&|(])cd\s+(\"[^\"]+\"|'[^']+'|[^\s;&|)]+)", before):
        d = resolve(m.group(1), d) or d
    wd = re.search(r"--workdir[=\s]+(\"[^\"]+\"|'[^']+'|\S+)", cmd[start:].split("\n")[0])
    if wd:
        d = resolve(wd.group(1), d) or d
    return d

def check_lock_timeout(cwd, path):
    """Deny applying a migration file that does not set lock_timeout (CHG-1)."""
    norm = path.replace("\\", "/")
    if "supabase/migrations/" not in norm:
        return  # ad-hoc read queries from a temp file are not migrations
    full = norm if os.path.isabs(path) or re.match(r"^[A-Za-z]:/", norm) else os.path.join(cwd, path)
    try:
        with open(full, encoding="utf-8", errors="replace") as f:
            sql = f.read()
    except OSError:
        return
    if re.search(r"\bconcurrently\b", sql, re.I):
        return
    if re.search(r"\bset\s+(local\s+)?lock_timeout\b", sql, re.I):
        return
    deny(f"GEBLOCKT (CHG-1): '{path}' setzt kein lock_timeout. Ohne wartet eine DDL bis 120 s auf eine "
         "Sperre und haelt dabei alle neuen Anfragen auf die Tabelle auf — unter Last steht die API. "
         "Kopf der Datei: SET lock_timeout = '3s'; SET statement_timeout = '60s'; — bei Lock-Fehler kurz "
         "warten und erneut anwenden. Indizes: CREATE INDEX CONCURRENTLY als einzige Anweisung der Datei. "
         "Bewusster Ausweg: '# intentional-no-lock-timeout' an den Befehl haengen.")

def check_rollback(cwd, path):
    """Deny applying a contract migration (DROP/REVOKE) that has no written way back (CHG-10)."""
    norm = path.replace("\\", "/")
    base = os.path.basename(norm)
    if "supabase/migrations/" not in norm or base.upper().startswith("ROLLBACK_"):
        return
    full = norm if os.path.isabs(path) or re.match(r"^[A-Za-z]:/", norm) else os.path.join(cwd, path)
    try:
        with open(full, encoding="utf-8", errors="replace") as f:
            sql = f.read()
    except OSError:
        return
    code = "\n".join(l for l in sql.splitlines() if not l.lstrip().startswith("--"))
    # 'REVOKE ... ON FUNCTION f' right after 'CREATE FUNCTION f' in the same file is
    # the usual hardening of a NEW function, not a contract change: nobody had it yet.
    created = {m.lower() for m in re.findall(r"create\s+(?:or\s+replace\s+)?function\s+([\w.\"]+)", code, re.I)}
    code = re.sub(r"^\s*revoke\b[^;]*\bon\s+function\s+([\w.\"]+)[^;]*;",
                  lambda m: "" if m.group(1).lower() in created else m.group(0), code, flags=re.I | re.M)
    hit = CONTRACT.search(code)
    if not hit:
        return
    if re.search(r"^\s*--\s*ROLLBACK\b", sql, re.I | re.M):
        return
    if os.path.exists(os.path.join(os.path.dirname(full), "ROLLBACK_" + base)):
        return
    deny(f"GEBLOCKT (CHG-10): '{path}' nimmt etwas weg ('{' '.join(hit.group(0).split())}'), hat aber keinen "
         f"Rueckweg. Lege 'ROLLBACK_{base}' in denselben Ordner (im selben Commit) oder einen Abschnitt "
         "'-- ROLLBACK' in die Datei. Es gibt kein Staging und kein PITR. "
         "Bewusster Ausweg: '# intentional-no-rollback' an den Befehl haengen.")

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return
    if data.get("tool_name") not in ("Bash", "PowerShell"):
        return
    cmd = (data.get("tool_input") or {}).get("command") or ""
    if re.search(CLI + r"config\s+push\b", cmd) and CONFIG_MARKER not in cmd:
        deny("GEBLOCKT (AUTH-2): 'supabase config push' schreibt sofort live und ersetzt ganze Abschnitte durch "
             "Defaults fuer alles, was config.toml nicht nennt (2026-08-14: Apple-Login abgeschaltet; 2026-05-18: "
             "Mail-Bestaetigung aus; 2026-09-01: Mail-Limit zurueck auf 2/h). Auth-, SMTP- und Rate-Limit-Werte "
             "im Dashboard aendern und danach in config.toml nachtragen. "
             "Bewusster Ausweg: '# intentional-config-push' an den Befehl haengen.")
    fn = re.search(CLI + r"functions\s+deploy\s+([A-Za-z0-9_-]+)", cmd)
    dbpush = re.search(CLI + r"db\s+push\b", cmd)
    dbfile = re.search(CLI + r"db\s+query\b[^\n|;&]*--file\s+(\S+)", cmd)
    if not (fn or dbpush or dbfile):
        return
    hit = fn or dbpush or dbfile
    cwd = effective_cwd(cmd, data.get("cwd") or os.getcwd(), hit.start())
    if dbfile and LOCK_MARKER not in cmd:
        check_lock_timeout(cwd, dbfile.group(1).strip("'\""))
    if dbfile and ROLLBACK_MARKER not in cmd:
        check_rollback(cwd, dbfile.group(1).strip("'\""))
    if MARKER in cmd:
        return
    code, top = git(cwd, "rev-parse", "--show-toplevel")
    if code != 0:
        return
    git(top, "fetch", "-q", "origin", "main")
    _, head = git(top, "rev-parse", "HEAD")
    _, remote = git(top, "rev-parse", "origin/main")
    if head and remote and head != remote:
        _, behind = git(top, "rev-list", "--count", "HEAD..origin/main")
        _, ahead = git(top, "rev-list", "--count", "origin/main..HEAD")
        deny("GEBLOCKT: Deploy nur aus dem gepushten origin/main. HEAD ist "
             f"{behind} Commit(s) hinter und {ahead} voraus. Erst 'git pull', dann committen + pushen, "
             "dann deployen — sonst ersetzt dieser Deploy lautlos den Stand der anderen Person. "
             "Bewusster Ausweg: '# intentional-stale-deploy' an den Befehl haengen.")
    paths = []
    if fn:
        paths.append(f"supabase/functions/{fn.group(1)}")
    if dbfile:
        paths.append(dbfile.group(1).strip("'\""))
    if dbpush:
        paths.append("supabase/migrations")
    for p in paths:
        _, st = git(top, "status", "--porcelain", "--", p)
        if st:
            deny(f"GEBLOCKT: '{p}' hat uncommittete Aenderungen:\n{st}\nWas deployt wird, muss committet "
                 "und gepusht sein, sonst laeuft live etwas, das in Git nicht existiert. "
                 "Bewusster Ausweg: '# intentional-stale-deploy' an den Befehl haengen.")

if __name__ == "__main__":
    try:
        main()
    except Exception:
        pass
