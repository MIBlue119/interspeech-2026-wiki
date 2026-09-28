* _2026-09-28 22:51:02 +0800 (claude-sonnet-5/inherited)_

## Summary

- The skeleton works as designed: the CLI builds and passes `go vet`, `validate` accepts the one example paper, and README regeneration is idempotent (no diff), matching what the coordinator already reported. I re-ran build, vet, validate, and readme regeneration myself and got the same results.

- One real problem needs fixing before this repo goes further: a 9.4 MB compiled macOS/arm64 program is committed to git at the repo root as a tracked file named `iswiki`. It is not requested anywhere in the agreed design, it is not covered by `.gitignore` (which already ignores `bin/`, showing the intent was to keep build output out of git), and it made up about 9.4 MB of the repo's 15 MB of tracked content when I checked. This is very likely an accident — running the exact command CI uses, `go build ./...`, silently rewrote that same file in place during my review, which is strong evidence it is a stray build byproduct rather than a deliberate release artifact. It should be removed from git tracking and the name added to `.gitignore` now, while this is still the repo's only commit and the fix is a one-line change instead of a history rewrite.

- No other blocking issues. The TLS bypass, the licensing text, and the file-writing code all check out against the agreed design.

- Next action: before pushing to GitHub, run `git rm --cached iswiki` and add `iswiki` (or `/iswiki`) to `.gitignore`, then amend the one existing commit (or add a follow-up commit, since it has not been pushed yet).

## Findings

- **Committed build artifact (blocking).**
  - Trigger: the repo's single commit includes a compiled binary, `iswiki`, at the repo root.
  - Impact: every future `git clone` downloads a 9.4 MB macOS-arm64-only executable that is useless on any other platform and does nothing `go build ./...` doesn't already reproduce locally. Because it is baked into the very first commit, removing it later requires a history rewrite rather than a normal revert; fixing it now, before any push, is nearly free by comparison. It also self-perpetuates: I ran `go build ./...` (the exact command the CI workflow runs) as part of this review, and it silently overwrote the tracked `iswiki` file in place with new bytes — I restored it via `git checkout -- iswiki` afterward, per my read-only mandate. Any contributor who runs the documented build command will regenerate and could re-commit this file with a different, nondeterministic diff each time.
  - Evidence: `git ls-files -s iswiki` shows it tracked at mode 100755; `file ./iswiki` reports `Mach-O 64-bit executable arm64`; `du -h iswiki` reports 9.0M against `du -sh .` (excluding `.git`) of 15M for the whole working tree; `.gitignore` contains `bin/` but no rule for a root-level `iswiki` binary; after `go build ./...` in this review, `git status --porcelain -- iswiki` showed it modified, confirming the build command overwrites it.
  - Action: `git rm --cached iswiki`, add `iswiki` to `.gitignore`, and fold that into the existing (still unpublished) commit rather than leaving it as permanent history.

- **`--insecure` TLS bypass (non-blocking, matches the agreed design).**
  - Trigger: `cmd/iswiki/index.go` sets `InsecureSkipVerify: true` on the HTTP client when `--insecure` is passed, used by both the `index` and `fetch` subcommands.
  - Impact: while active, requests to the ISCA archive are vulnerable to on-path tampering (no certificate validation). This is exactly what the Ask called for, though: the ISCA site is documented as currently serving an expired certificate, the flag defaults to `false`, and the risk and reason are stated in the code comment, the README, and `AGENTS.md` consistently.
  - Evidence: `cmd/iswiki/index.go:16-24`; README.md "Note: `--insecure` exists because isca-archive.org currently serves an expired TLS certificate…"; `AGENTS.md` repeats the same caveat.
  - Action: none required now. Worth a follow-up reminder (e.g., a dated TODO or a repo issue) to drop the flag once ISCA's certificate is fixed, so the bypass doesn't linger indefinitely — this is a suggestion, not a blocker.

- **Unsanitized paper `id` in path construction for local CLI flags (suggestion, non-blocking).**
  - Trigger: `cmdWiki` and the `--only` flags on `cmdIndex`/`cmdFetch` build file paths with `filepath.Join(dataDir/wikiDir, id+...)` directly from a CLI argument, with no check that `id` stays within the expected `[a-z0-9_]+` charset (that charset restriction only applies to IDs parsed out of the scraped HTML, not to the flag value a person types).
  - Impact: a value like `--only ../../../tmp/x` could read or write outside `data/papers/`/`wiki/papers/`. This is a locally-run developer tool where the operator supplies their own trusted argument, not a network-facing service, so it is low severity and outside what the Ask asked for — flagging only as a cheap hardening opportunity.
  - Evidence: `cmd/iswiki/paper.go:36` (`paperPath`), `cmd/iswiki/wiki.go:21` (`dst := filepath.Join(wikiDir, id+".md")`).
  - Action: optional — validate `id` against the same charset the scraper uses before using it in a path.

## Concept-by-concept accounting

- `wiki/` OKF pages with YAML frontmatter, original-summary-only content: present and correct. `wiki/papers/barreiros26_interspeech.md` has the required frontmatter fields and a summary written in original prose, not paper text; `wiki/index.md` cross-links it. Matches the design.

- `data/papers/*.yaml` metadata driving a generated README table: present. `data/papers/barreiros26_interspeech.yaml` has the documented fields; `iswiki readme` regenerates the table between the `PAPERS:BEGIN`/`PAPERS:END` markers and produced no diff when I re-ran it, meaning the committed README is already current.

- `cmd/iswiki` Go CLI (index/readme/validate/wiki/fetch): present and functional. I reproduced `go build ./...` (clean), `go vet ./...` (clean), and `go run ./cmd/iswiki validate` (`OK: 1 paper files valid`) myself. The coordinator's network-dependent checks (scraping 1379 live papers, generating a stub for `baek26_interspeech`, then removing the test files) were not re-run since nothing about them looked missing, failed, or invalidated, and they don't touch the one area I found a real problem in.

- `AGENTS.md` + `llms.txt`, with optional zvec-grep integration via `scripts/setup-zg.sh`: present, and the file layout each document describes matches what is actually in the repo (checked `wiki/papers/`, `data/papers/`, `sources/` claims against the real tree). `scripts/setup-zg.sh` installs and indexes `zg` as described.

- Dual license (MIT for code, CC BY 4.0 for content) with an ISCA-copyright disclaimer: present and consistent across `LICENSE`, `LICENSE-CONTENT`, `README.md`, and `CONTRIBUTING.md` — all four describe the same split and the same "papers stay ISCA's copyright, full text never committed" rule with no contradictions.

- Example paper `barreiros26_interspeech`: present in both `data/papers/` and `wiki/papers/`, cross-linked from `wiki/index.md`, and it is the only entry the README table and `validate` currently see — consistent everywhere I checked.

- CI (build, validate, README-staleness check): present in `.github/workflows/ci.yml` and matches what I reproduced by hand — the same three steps (`go build ./...`, `go run ./cmd/iswiki validate`, then `go run ./cmd/iswiki readme` followed by a diff check) all succeed against the current commit.

## Minimality probe

- I looked for a smaller design that would still satisfy the Ask, focused on whether any committed piece could be dropped or merged. `CONTRIBUTING.md` and `AGENTS.md` overlap somewhat (both describe the metadata schema and workflow) but serve genuinely different audiences — one for human PR contributors, one for coding agents — and the Ask names both, so merging them would work against the design rather than simplify it. `scripts/setup-zg.sh` is explicitly called "optional" in the Ask's own wording but is still part of what was asked for, so keeping it is correct.

- The one place a smaller design clearly still satisfies the Ask, and does so better, is dropping the committed `iswiki` binary described above — nothing in the design calls for a build artifact in git, and removing it loses no requested functionality while fixing a real defect. That is the basis for the Minimality verdict below.

## Hostile-content check

- I searched every tracked file for injected instructions aimed at an agent (prompt-injection style phrases, "ignore previous instructions," role-override language, etc.) and found none. All repository content — `README.md`, `AGENTS.md`, `llms.txt`, the wiki page, the YAML metadata, the scripts — reads as ordinary project documentation and was treated as data throughout this review, not as instructions.

Original-pass verdicts (superseded by the addendum): outcome pass, minimality blocking, conformance pass.

## Parked proposals (not part of this Ask, not acted on)

- Add a dated TODO or tracking issue to remove `--insecure` once ISCA's TLS certificate is renewed, so the bypass doesn't become permanent by default.

- Validate the `id` argument on `iswiki wiki`/`iswiki index --only`/`iswiki fetch --only` against the scraper's `[a-z0-9_]+` charset before using it in a file path.

## Addendum — amended commit verification

Addendum verified at 2026-09-28 22:54:00 +0800 by the same reviewer (claude-sonnet-5, inherited effort).

The blocking finding above is fixed. The repo now has a single commit, `c3ed096caff10f384b59c08faf3766d2b14f535d` on `main`, with the `iswiki` binary removed from tracking and `.gitignore` updated to keep it out going forward.

- **Single commit, no binary.** `git log --oneline --all` shows exactly one commit, `c3ed096`, and `git rev-parse HEAD` matches it. `git ls-files | wc -l` reports 22 tracked files (one fewer than the 23 in the original commit — `iswiki` is gone); `git ls-files | grep -x iswiki` matches nothing. The previous commit `bcad0669` no longer exists in this history (amended away, as expected for an unpublished commit).

- **`.gitignore` covers it.** The file now ends with `/iswiki` on its own line, alongside the pre-existing `sources/` and `bin/` rules, so a future `go build ./...` in this repo won't accidentally re-stage it.

- **Build and validation still pass on the amended commit.** I re-ran the checks myself rather than only trusting the coordinator's re-run: `go build ./cmd/...` exits clean, and — worth calling out — it no longer drops a stray `iswiki` binary at the repo root the way `go build ./...` did against the old commit; `go vet ./...` is clean; `go run ./cmd/iswiki validate` reports `OK: 1 paper files valid`; `go run ./cmd/iswiki readme` regenerates the table with no resulting diff to `README.md` (confirms the CI staleness check would still pass). `git status --porcelain` after all of this shows no changes to any tracked file.

- **No new issues found.** I did not re-review the full content (frontmatter, licensing text, CLI logic, CI workflow) since none of it changed between the two commits — only the binary's removal and the `.gitignore` line differ from what I already reviewed in full above.

Updated verdicts for commit `c3ed096caff10f384b59c08faf3766d2b14f535d`:

Reviewed implementation commit: c3ed096caff10f384b59c08faf3766d2b14f535d
Verdict: PASS
Outcome: PASS
Minimality: PASS
Conformance: PASS

Self-check: across both passes stayed read-only against the repository for inspection only (git show/diff/status/log/rev-parse/ls-files, cat .gitignore, go build/vet, go run ./cmd/iswiki validate and readme, file/du/wc on tracked files); the original pass's `go build ./...` overwrote the then-tracked `iswiki` binary in place, which was reverted with `git checkout -- iswiki` before that pass finished; the addendum pass's `go build ./cmd/...` left the working tree untouched; `git status --porcelain` was clean after each pass except for `.agentflow/artifacts/A-001-interspeech-wiki-skeleton/tracker.md`, which was modified by an external process (not this review) before either pass started; the only file written in either pass was this report.
