# Tracker

## Identity

- **Work key:** A-001-interspeech-wiki-skeleton.

- **Active Ask:** A-001.

- **Goal:** Build the Interspeech 2026 open wiki repo skeleton (OKF markdown wiki + YAML metadata + Go CLI tooling + dual license) and push it to the owner's GitHub account MIBlue119.

- **Last update:** 2026-09-28 22:45:00 +0800.

- **Evidence commit:** uncommitted.

## Overall state

- **State:** active.

- **Reason:** Work remains.

- **Total:** 6.

- **Completed:** 0.

- **Remaining:** 6.

## Accepted task checklist

- [ ] **T-1:** Repo documents: README.md (project story, usage with Claude Code/Codex + zvec-grep, auto-generated paper table between markers, ISCA copyright disclaimer), CONTRIBUTING.md, AGENTS.md, llms.txt, .gitignore. Proof: files exist and read back correctly. Source: A-001.

- [ ] **T-2:** Dual license: LICENSE (MIT, covers code) and LICENSE-CONTENT (CC BY 4.0, covers wiki/data content); README states the split and that paper full texts remain ISCA copyright and are never committed. Proof: files exist with correct license texts. Source: A-001.

- [ ] **T-3:** Data + wiki example: data/papers/barreiros26_interspeech.yaml (metadata schema) and wiki/papers/barreiros26_interspeech.md (OKF page: YAML frontmatter id/category/updated/confidence/source + original abstract-based summary, no full text), plus wiki/index.md. Proof: files exist; validate passes. Source: A-001.

- [ ] **T-4:** Go CLI `iswiki` (cmd/iswiki, go.mod, yaml.v3 only): subcommands index (scrape ISCA index into YAML stubs, --insecure for expired cert, --limit), readme (regenerate README table from data/papers), validate (schema check), wiki (generate OKF page stub from YAML), fetch (download PDFs to gitignored sources/). Proof: `go build ./...` passes; `iswiki validate` and `iswiki readme` run clean on example data; `iswiki index --limit` smoke test against live ISCA index parses paper entries. Source: A-001.

- [ ] **T-5:** CI + zg setup: .github/workflows/ci.yml (go build, validate, readme regen diff check) and scripts/setup-zg.sh (local zvec-grep index bootstrap). Proof: files exist; workflow YAML is well-formed. Source: A-001.

- [ ] **T-6:** Publish: commit skeleton, create public GitHub repo under MIBlue119 (gh account switch), push main, restore previously active gh account weirenlan. Proof: remote repo exists with pushed commit; `git ls-remote` shows main at local HEAD. Source: A-001.

## Accepted scope changes

- None.

## Current recovery

- **Current item:** T-1.

- **Last proven result:** None.
