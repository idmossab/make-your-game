#!/bin/bash

LOG_FILE="script_execution.log"
DEPLOY_DIR="./deployed_scripts"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"; }

[[ -z "$1" || -z "$2" ]] && { log "⚠️ Usage: $0 <path> <commit_message>"; exit 1; }
[[ ! -e "$1" ]] && { log "⚠️ Path does not exist: $1"; exit 1; }
git rev-parse --is-inside-work-tree &>/dev/null || { log "❌ Not a Git repository!"; exit 1; }

BRANCH=$(git rev-parse --abbrev-ref HEAD)
[[ -z "$BRANCH" ]] && { log "❌ Failed to determine branch!"; exit 1; }

check_script() {
    [[ "$1" == *.sh && ! -x "$1" ]] && { chmod +x "$1"; log "🔧 Made executable: $1"; }
    bash -n "$1" 2>/dev/null || { log "❌ Syntax error in $1"; exit 1; }
}

if [ -d "$1" ]; then
    for script in $(find "$1" -name "*.sh"); do check_script "$script"; done
    git add "$1/"
else
    [[ "$1" == *.sh ]] && check_script "$1"
    git add "$1"
fi

[[ ${#2} -lt 10 ]] && { log "⚠️ Commit message too short!"; read -p "Continue? (y/n) " -n 1 -r; echo; [[ ! $REPLY =~ ^[Yy]$ ]] && exit 1; }

log "💾 Committing: $2"; git commit -m "$2" || { log "❌ Commit failed!"; exit 1; }
log "🚀 Pushing to $BRANCH"; git push origin "$BRANCH" || { log "❌ Push failed!"; exit 1; }

mkdir -p "$DEPLOY_DIR" && cp "$1" "$DEPLOY_DIR/" && log "✅ Deployed to $DEPLOY_DIR"
log "✅ Successfully pushed & deployed!"
