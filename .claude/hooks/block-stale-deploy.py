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
"""
import json, os, re, subprocess, sys

MARKER = "intentional-stale-deploy"

def git(cwd, *args):
    r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, timeout=20)
    return r.returncode, r.stdout.strip()

def deny(reason):
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse",
                      "permissionDecision": "deny", "permissionDecisionReason": reason}}))
    sys.exit(0)

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return
    if data.get("tool_name") != "Bash":
        return
    cmd = (data.get("tool_input") or {}).get("command") or ""
    if MARKER in cmd:
        return
    fn = re.search(r"supabase\s+functions\s+deploy\s+([A-Za-z0-9_-]+)", cmd)
    dbpush = re.search(r"supabase\s+db\s+push\b", cmd)
    dbfile = re.search(r"supabase\s+db\s+query\b[^\n|;&]*--file\s+(\S+)", cmd)
    if not (fn or dbpush or dbfile):
        return
    cwd = data.get("cwd") or os.getcwd()
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
