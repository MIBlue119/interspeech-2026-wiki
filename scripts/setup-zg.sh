#!/usr/bin/env bash
# Sets up zvec-grep (zg) semantic search over this wiki.
# zg unifies ripgrep + BM25 + vector search: https://github.com/zvec-ai/zvec-grep
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v zg >/dev/null 2>&1; then
  echo "zg not found — installing via npm…"
  npm install -g zvec-grep
fi

echo "Indexing wiki/, data/, and (if fetched) sources/ …"
zg index wiki data sources 2>/dev/null || zg index wiki data

cat <<'EOF'

Done. Try:
  zg "contextual biasing for rare words"
  zg "papers about low-resource TTS"

Your agent (Claude Code / Codex) can call zg too — see AGENTS.md.
EOF
