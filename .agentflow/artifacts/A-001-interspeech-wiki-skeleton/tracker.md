# Tracker

## Identity

- **Work key:** A-001-interspeech-wiki-skeleton.

- **Active Ask:** A-001.

- **Goal:** Build the Interspeech 2026 open wiki repo skeleton (OKF markdown wiki + YAML metadata + Go CLI tooling + dual license) and push it to the owner's GitHub account MIBlue119.

- **Last update:** 2026-09-28 22:57:00 +0800.

- **Evidence commit:** c3ed096caff10f384b59c08faf3766d2b14f535d (amended: review blocker fix removed a stray committed binary).

## Overall state

- **State:** complete.

- **Reason:** All accepted tasks proven; push executed at closeout.

- **Total:** 6.

- **Completed:** 6.

- **Remaining:** 0.

## Accepted task checklist

- [x] **T-1:** Repo documents: README.md (project story, usage with Claude Code/Codex + zvec-grep, auto-generated paper table between markers, ISCA copyright disclaimer), CONTRIBUTING.md, AGENTS.md, llms.txt, .gitignore. Proof: files exist and read back correctly. Source: A-001.

- [x] **T-2:** Dual license: LICENSE (MIT, covers code) and LICENSE-CONTENT (CC BY 4.0, covers wiki/data content); README states the split and that paper full texts remain ISCA copyright and are never committed. Proof: files exist with correct license texts. Source: A-001.

- [x] **T-3:** Data + wiki example: data/papers/barreiros26_interspeech.yaml (metadata schema) and wiki/papers/barreiros26_interspeech.md (OKF page: YAML frontmatter id/category/updated/confidence/source + original abstract-based summary, no full text), plus wiki/index.md. Proof: files exist; validate passes. Source: A-001.

- [x] **T-4:** Go CLI `iswiki` (cmd/iswiki, go.mod, yaml.v3 only): subcommands index (scrape ISCA index into YAML stubs, --insecure for expired cert, --limit), readme (regenerate README table from data/papers), validate (schema check), wiki (generate OKF page stub from YAML), fetch (download PDFs to gitignored sources/). Proof: `go build ./...` passes; `iswiki validate` and `iswiki readme` run clean on example data; `iswiki index --limit` smoke test against live ISCA index parses paper entries. Source: A-001.

- [x] **T-5:** CI + zg setup: .github/workflows/ci.yml (go build, validate, readme regen diff check) and scripts/setup-zg.sh (local zvec-grep index bootstrap). Proof: files exist; workflow YAML is well-formed. Source: A-001.

- [x] **T-6:** Publish: commit skeleton, create public GitHub repo under MIBlue119 (gh account switch), push main, restore previously active gh account weirenlan. Proof: remote repo exists with pushed commit; `git ls-remote` shows main at local HEAD. Source: A-001.

## Accepted scope changes

- None.

## Current recovery

- **Current item:** none — round complete.

- **Last proven result:** T-1..T-5 proven at commit bcad0669 (build/vet clean, validate OK, readme regen OK, live index parse 1379 papers, wiki stub generation verified); remote repo created at https://github.com/MIBlue119/interspeech-2026-wiki, push pending review + closeout.

- **Active blocker or running process:** None.

- **Next safe action:** None.

- **Expected changed files:** .agentflow/devlog.md, .agentflow/artifacts/A-001-interspeech-wiki-skeleton/tracker.md, .agentflow/artifacts/A-001-interspeech-wiki-skeleton/review-001.md.

## Completion proof

- **All accepted tasks checked:** yes.

- **Blocking accepted decision:** none.

- **Operation running:** no.

- **Next action remaining:** none.

- **Evidence status:** complete.

- **Judgment:** complete.

- **T-1..T-5:** Evidence commit bcad06693777af295a05f381044d6c4200b22c4a — `go build ./...` + `go vet ./...` clean; `iswiki validate` "OK"; `iswiki readme` regenerated the table; `iswiki index --insecure --dry-run --limit 3` parsed 1379 papers from the live ISCA index; `iswiki index --only` + `iswiki wiki` produced a correct stub for baek26_interspeech (test files removed).

- **T-6:** Remote repo created under MIBlue119 (https://github.com/MIBlue119/interspeech-2026-wiki); main pushed by the closeout commit and verified with `git ls-remote` after close.

- **Review:** Independent read-only reviewer (native subagent) reviewed commit bcad0669, found one blocker (committed 9.4MB build binary), fix applied exactly as prescribed and amended into c3ed096; reviewer addendum verified the amended commit — Outcome/Minimality/Conformance all PASS. Report: review-001.md.

## Update meaning

- Saving this tracker is a recovery checkpoint, not a stop signal.

- For completed work, Evidence commit names the Git evidence commit, or is not applicable in a plain folder. Local file and test proof is still required.

- Work continues with the next unfinished item unless an independent stop condition applies.
