#!/usr/bin/env python3
"""PreToolUse-Hook (Bash): blockt pauschales Git-Staging.

Warum: an einem Repo arbeiten mehrere Terminals / parallele Claude-Sessions
gleichzeitig. 'git add -A' (oder 'git add .', 'git commit -a') staged ALLES im
Working Tree — auch die halbfertige Arbeit der anderen Session. Die wandert dann
in einen fremden Commit mit einer Message, die nichts damit zu tun hat.

Real passiert am 2026-08-03/09 im prometheus_coach-Repo: eine RLS-
Sicherheitsmigration landete in einem Commit namens "fix(classes): book_class_slot
...", und Orphan-Loeschungen plus ein dev_log-Eintrag in "feat(white-label): ...".
Inhaltlich alles korrekt, aber 'git log' schreibt Sicherheitsaenderungen seither
unbeteiligten Commits zu — fuer ein Repo, dessen Audit an der Nachvollziehbarkeit
haengt, ist das teuer. Und im schlechteren Fall committet man fremden,
halbfertigen Code mit.

Verhalten: pauschales Staging -> deny mit Hinweis auf explizite Pfade.
Sonst still durchlassen (exit 0, keine Ausgabe).
Fehlertoleranz: bei jedem unerwarteten Problem wird durchgelassen, nie geblockt.

Bewusster Ausweg (z.B. echter Initial-Commit): den Marker
'# intentional-bulk-add' an den Befehl haengen. Das erzwingt eine bewusste
Entscheidung, statt den Hook stumpf zu umgehen.
"""
import json
import re
import shlex
import sys

ESCAPE_MARKER = 'intentional-bulk-add'

# Trenner, an denen ein Shell-Befehl in Teilbefehle zerfaellt.
SPLIT = re.compile(r'(?:\|\||&&|;|\||\n)')

REASON_ADD = (
    "GEBLOCKT: '{cmd}' staged den kompletten Working Tree. An diesem Repo "
    "arbeiten mehrere Terminals / parallele Sessions gleichzeitig — pauschales "
    "Staging reisst deren halbfertige Arbeit in DEINEN Commit, mit einer Message, "
    "die nicht dazu passt. Genau so landete eine RLS-Sicherheitsmigration in einem "
    "Commit namens \"fix(classes): ...\".\n"
    "Richtig: 'git status --short' lesen und NUR die eigenen Pfade nennen — "
    "'git add pfad/a pfad/b'. Beim Commit ebenso: 'git commit -F - -- pfad/a pfad/b', "
    "damit fremde gestagete Dateien nicht mitgehen.\n"
    "Echter Ausnahmefall (z.B. Initial-Commit): ' # intentional-bulk-add' anhaengen."
)

REASON_COMMIT = (
    "GEBLOCKT: 'git commit -a' committet alle getrackten Aenderungen, auch die der "
    "parallel laufenden Sessions in diesem Repo. Erst 'git status --short' lesen, "
    "dann gezielt: 'git add <eigene pfade>' und 'git commit -F - -- <eigene pfade>'.\n"
    "Echter Ausnahmefall: ' # intentional-bulk-add' anhaengen."
)


def deny(reason: str) -> None:
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }))


def git_subcommand(tokens):
    """Findet 'git' und liefert (subcommand, restliche_tokens) oder (None, [])."""
    i = 0
    # env-Praefixe und Wrapper ueberspringen: FOO=bar, sudo, command, nice ...
    while i < len(tokens) and ('=' in tokens[i] or tokens[i] in ('sudo', 'command', 'nice', 'time')):
        i += 1
    if i >= len(tokens) or tokens[i] != 'git':
        return None, []
    i += 1
    # globale git-Optionen mit Wert: -C <dir>, -c <cfg>, --git-dir=...
    while i < len(tokens):
        t = tokens[i]
        if t in ('-C', '-c', '--git-dir', '--work-tree'):
            i += 2
            continue
        if t.startswith('-'):
            i += 1
            continue
        break
    if i >= len(tokens):
        return None, []
    return tokens[i], tokens[i + 1:]


def check_add(rest) -> bool:
    """True wenn dieses 'git add' pauschal staged."""
    saw_pathspec_sep = False
    for t in rest:
        if t == '--':
            saw_pathspec_sep = True
            continue
        if t.startswith('--'):
            if t in ('--all', '--no-ignore-removal', '--update'):
                return True
            continue
        if t.startswith('-') and len(t) > 1:
            # Short-Flag-Gruppe: -A, -u, -Av, -uA ...
            if 'A' in t[1:] or 'u' in t[1:]:
                return True
            continue
        # Ab hier: Pathspec.
        if t in ('.', './', ':/', '*', ':/.'):
            return True
        _ = saw_pathspec_sep
    return False


def check_commit(rest) -> bool:
    """True wenn dieses 'git commit' alle getrackten Aenderungen mitnimmt."""
    for t in rest:
        if t == '--':
            break  # ab hier nur noch Pfade — explizit, also ok
        if t == '--all':
            return True
        if t.startswith('--'):
            continue
        if t.startswith('-') and len(t) > 1:
            # -a, -am, -ma ... aber NICHT --amend (faengt mit -- an, oben raus)
            if 'a' in t[1:]:
                return True
    return False


def main() -> int:
    try:
        data = json.load(sys.stdin)
    except Exception:
        return 0  # nie wegen eigener Fehler blocken

    if data.get('tool_name') != 'Bash':
        return 0

    ti = data.get('tool_input') or {}
    cmd = ti.get('command')
    if not isinstance(cmd, str) or not cmd.strip():
        return 0

    if ESCAPE_MARKER in cmd:
        return 0

    for part in SPLIT.split(cmd):
        part = part.strip()
        if not part or 'git' not in part:
            continue
        try:
            tokens = shlex.split(part, comments=True)
        except ValueError:
            continue  # unparsebar (offenes Quote o.ae.) -> durchlassen
        if not tokens:
            continue

        sub, rest = git_subcommand(tokens)
        if sub == 'add' and check_add(rest):
            deny(REASON_ADD.format(cmd=part[:80]))
            return 0
        if sub == 'commit' and check_commit(rest):
            deny(REASON_COMMIT)
            return 0

    return 0


if __name__ == '__main__':
    sys.exit(main())
