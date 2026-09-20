#!/usr/bin/env python3
"""PreToolUse-Hook (Bash): blockt Dauerlaeufer im Vordergrund.

Warum: der Bash-Tool hat pro Session EINE persistente Shell. Ein Dauerlaeufer
(Dev-Server, Emulator, Gradle, publish-release) im Vordergrund kommt nie zurueck
-> der Tool-Call laeuft in den Timeout, der Prozess haelt die Shell weiter, und
ab dann haengt JEDER weitere Bash-Call dieser Session. Auf Danieles Maschine
lagen davon am 2026-07-29 fuenf Stueck, 17-24 h alt.

Verhalten: matcht ein Dauerlaeufer-Muster UND run_in_background ist nicht true
-> deny mit Hinweis. Sonst still durchlassen (exit 0, keine Ausgabe).
Fehlertoleranz: bei jedem unerwarteten Problem wird durchgelassen, nie geblockt.
"""
import json
import re
import sys

# (Regex, Klartext-Name) — bewusst eng gefasst, um False Positives zu vermeiden.
PATTERNS = [
    (r'\b(?:npm|pnpm|yarn|bun)\s+(?:run\s+)?dev\b', 'Dev-Server'),
    (r'\b(?:npm|pnpm|yarn)\s+start\b', 'Dev-Server'),
    (r'\b(?:next|vite|nuxt|remix)\s+dev\b', 'Dev-Server'),
    (r'\bnodemon\b', 'Dev-Server (nodemon)'),
    (r'\bexpo\s+start\b', 'Expo-Dev-Server'),
    (r'\bvite\s*$', 'Vite-Dev-Server'),
    (r'\bemulator\s+.*-avd\b', 'Android-Emulator'),
    (r'\bqemu-system', 'Emulator (qemu)'),
    (r'\bgradlew\b', 'Gradle-Build'),
    (r'publish-release\.sh', 'Release-Publish'),
    # logcat blockt nur als Stream — mit -d/-t/--dump ist es ein Einmal-Dump.
    (r'\badb\s+(?:-s\s+\S+\s+)?logcat\b(?!.*(?:\s-d\b|\s-t\b|--dump))', 'adb logcat (Stream)'),
    (r'\btail\s+(?:-\w*\s+)*-\w*f', 'tail -f'),
    (r'^\s*watch\s', 'watch-Loop'),
    (r'\bngrok\b', 'ngrok-Tunnel'),
    (r'\bsupabase\s+(?:start|functions\s+serve|db\s+start)\b', 'Supabase-Local'),
    (r'\bpython3?\s+-m\s+http\.server\b', 'HTTP-Server'),
    (r'\bhttp-server\b', 'HTTP-Server'),
    (r'\bserve\s+-', 'HTTP-Server (serve)'),
    (r'\bdocker(?:\s+compose)?\s+up\b(?!.*(?:\s-d\b|--detach))', 'docker compose up'),
]

# Wenn eines davon drin ist, laeuft es ohnehin nicht im Vordergrund fest.
ESCAPES = [
    r'&\s*$',              # trailing &
    r'\bnohup\b',
    r'\bdisown\b',
    r'--help\b', r'\s-h\s*$',
    r'--version\b', r'\s-v\s*$',
    r'\bscreen\s+-d', r'\btmux\s+new-session\s+-d',
]

GRADLE_SAFE = re.compile(r'gradlew\s+(?:--version|-v|--help|-h|--stop|tasks\b)')

REASON = (
    "GEBLOCKT: {what} im Vordergrund verriegelt die persistente Session-Shell "
    "(Tool-Call laeuft in den Timeout, der Prozess haelt die Shell weiter, danach "
    "haengt jeder weitere Bash-Call dieser Session). "
    "Denselben Befehl erneut mit run_in_background: true aufrufen — dann laeuft er "
    "getrackt im Hintergrund und die Shell bleibt frei. "
    "Siehe ~/.claude/CLAUDE.md; Diagnose verriegelter Shells: ~/.claude/bin/claude-doctor"
)


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

    if ti.get('run_in_background') is True:
        return 0

    for esc in ESCAPES:
        if re.search(esc, cmd):
            return 0

    for pat, what in PATTERNS:
        if re.search(pat, cmd):
            if what == 'Gradle-Build' and GRADLE_SAFE.search(cmd):
                return 0
            print(json.dumps({
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": REASON.format(what=what),
                }
            }))
            return 0

    return 0


if __name__ == '__main__':
    sys.exit(main())
