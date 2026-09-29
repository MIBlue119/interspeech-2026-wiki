* _2026-09-29 09:09:23 +0800 (claude-sonnet-5/inherited)_

## Summary

- Clean, small, correct change. `README.md`'s open-source-code table now carries each paper's `Category`/`Labels` cells, verified against the yaml, and the 5 code.url clears found during this commit's own verification sweep all check out against the papers' own source text — 2 confirmed by me directly (the requested `ahn26b_interspeech`, `yu26c_interspeech`) plus the requested keep (`zhu26e_interspeech`).

- No issues found. Build, vet, and validate are clean; `readme`, `toc`, and `orgs` all regenerate byte-identical to what's committed.

- No action needed.

## Findings

None. This round required no corrective findings.

## Verified-good, per the brief's checklist

- **Scope matches the description exactly.** `git show --stat 4f28900b260cc8c9910a1bde461970c080e95204` touches exactly `README.md`, `cmd/iswiki/readme.go`, 5 `data/papers/*.yaml`, 5 `wiki/papers/*.md`, and `wiki/index.md` — 13 files, nothing unexpected.

- **`cmd/iswiki/readme.go` diff.** Read in full: the table header gains `Category`/`Labels` columns, each cell is wrapped in backticks only when non-empty (`category := ""` / `labels := ""` stay blank otherwise, so a paper missing either field renders a clean empty cell rather than a stray backtick pair) — no edge-case bug here, consistent with the same empty-safe pattern used elsewhere in this codebase (e.g. the A-004 `wiki.go` fix).

- **Mechanical suite.** `go build ./cmd/...` and `go vet ./...` are clean. `go run ./cmd/iswiki validate` reports `OK: 1379 paper files valid`. `go run ./cmd/iswiki readme` regenerates byte-identical (`1379 papers, 601 with code` — exactly 606 − 5, matching the commit's own count). `go run ./cmd/iswiki toc` and `go run ./cmd/iswiki orgs` also regenerate byte-identical (`72 topics`; `1084 institutions, 780 sponsors` — both unchanged, as expected since this commit doesn't touch topics/institutions/funding data).

- **Table's first rows — Category/Labels cells match yaml.** Checked the first 3 rows of the regenerated table against their yaml files directly: `ai26b_interspeech` (`tts` / `generative-model`), `akhtar26_interspeech` (`health-clinical` / `self-supervised`), `akti26_interspeech` (`tts` / `generative-model`, `robustness-noise`) — all three cells match their yaml's `category:`/`labels:` exactly, including the two-label case rendering as two separate code spans.

- **`wiki/index.md` diff is exactly the expected side effect.** All 4 hunks just drop the `· [code](...)` suffix for the 5 cleared papers' entries in the topic listings (`ahn26b`, `yu26c`, `huo26`, `bouziane26`, `li26w`) — nothing else changed in that file, confirming `toc` correctly propagates the code.url clears without touching anything unrelated.

- **Cleared entry 1 — `ahn26b_interspeech` (was `github.com/openai/whisper`).** `data/papers/ahn26b_interspeech.yaml` now has `code.url: ""` and the wiki page's Code section shows the standard "None released" text. Source grounding: `sources/md/ahn26b_interspeech.md:68` cites `https://github.com/openai/whisper/blob/.../transcribe.py#L278` — a link to a specific line in Whisper's own source as an implementation reference, not a self-announced release by this paper's authors. Correctly cleared.

- **Cleared entry 2 — `yu26c_interspeech` (was `github.com/wenet-e2e/wenet`).** Same pattern: `code.url: ""`, wiki page shows the standard text. Source grounding: `sources/md/yu26c_interspeech.md:60-62` describes using "a well-trained ASR model using the WeNet toolkit" — WeNet is a third-party dependency used to generate transcripts, not this paper's own code. Correctly cleared.

- **Kept entry — `zhu26e_interspeech` (`github.com/k2-fsa/OmniVoice`).** `sources/md/zhu26e_interspeech.md:17` reads "Our code and pre-trained models are publicly available¹", footnoted at line 27 to exactly `https://github.com/k2-fsa/OmniVoice` — and the paper is literally titled "OmniVoice". Unambiguously the paper's own self-announced release. Correctly kept.

- **No `sources/`, binaries, or `.env` newly tracked; no new dependencies; `go.mod`/`go.sum` untouched** (not shown in the diff, consistent with a pure display/data-cleanup change).

## Minimality note

- This is a small, surgical change that does exactly what the Ask requested (sync labels/categories into the README table) plus a bounded, well-evidenced cleanup of 5 stragglers the commit's own verification pass happened to catch — nothing beyond that scope. No doc updates were needed here (unlike A-003/A-004's stub-generator gaps): `category`/`labels` are already documented as concepts in `AGENTS.md`/`CONTRIBUTING.md` from A-004, and this commit only changes how one already-documented field pair is displayed, with no second code path (like `iswiki wiki`'s stub template) that independently needed to mirror the same table logic.

Reviewed implementation commit: 4f28900b260cc8c9910a1bde461970c080e95204
Verdict: PASS
Outcome: PASS
Minimality: PASS
Conformance: PASS

Self-check: stayed read-only against every tracked file for the entire review (git show/diff/status/log, go build/vet, go run ./cmd/iswiki validate/readme/toc/orgs, reads of local untracked sources/md/*.md files that already existed on disk); `go run ./cmd/iswiki readme`/`toc`/`orgs` regenerated README.md/wiki/index.md/wiki/institutions.md in place as part of the staleness checks and all three were reverted with `git checkout` immediately after confirming zero diff; `git status --porcelain` was clean throughout except for `.agentflow/devlog.md`, modified by an external process (not this review) before and during this pass; the only file written was this report.
