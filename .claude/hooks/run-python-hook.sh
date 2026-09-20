#!/bin/sh
# Startet einen Python-Hook aus diesem Ordner:  run-python-hook.sh <datei>.py
#
# Warum ein Wrapper: Claude Code ruft Hooks per "sh -c <pfad>" auf. Solange die
# Python-Hooks als .sh-Dateien vorlagen, konnte die Shell sie selbst ausfuehren,
# sobald sie den Python-Interpreter nicht fand. Dann wurden Backticks im
# Docstring zu echten Befehlen: am 2026-09-06 lief bei JEDEM Bash-Aufruf ein
# "supabase db push" gegen die Live-DB (DanielePL/Peakforce#1). Deshalb liegt
# die Logik jetzt in .py-Dateien, die nur ueber diesen Wrapper starten.
#
# Interpreter-Suche: python3, python, py (Windows-Launcher). Jeder Kandidat wird
# probeweise gestartet, weil unter Windows ein "python3.exe"-Stub des Microsoft
# Store existieren kann, der kein Python ist. Ohne Interpreter blockt der Hook
# hart (deny) statt durchzulassen, damit die Schutzregeln nie stumm ausfallen.
set -u
here=$(cd "$(dirname "$0")" && pwd)
script="$here/$1"
if [ ! -f "$script" ]; then
  printf '%s\n' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"GEBLOCKT: Hook-Datei fehlt: '"$1"' neben run-python-hook.sh. Repo-Stand pruefen (git pull)."}}'
  exit 0
fi
for py in python3 python py; do
  if "$py" -c 'import sys' </dev/null >/dev/null 2>&1; then
    exec "$py" "$script"
  fi
done
printf '%s\n' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"GEBLOCKT: Hook-Wrapper findet keinen Python-Interpreter (python3, python, py). Python 3 installieren bzw. in den PATH der Hook-Shell aufnehmen, sonst laufen die Schutz-Hooks (kein git add -A, keine Dauerlaeufer im Vordergrund, kein Deploy aus ungepushtem Stand) nicht."}}'
exit 0