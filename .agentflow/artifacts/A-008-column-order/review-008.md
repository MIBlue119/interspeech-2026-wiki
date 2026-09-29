* _2026-09-29 10:16:34 +0800 (claude-sonnet-5/inherited)_

## Summary

- Tiny, correct change. The table header and every row's cell order were swapped consistently, verified directly rather than assumed.

- No action needed.

## Findings

None. This round required no corrective findings.

## Verified-good, per the brief's checklist

- **Scope matches the description exactly.** `git show --stat 8bc7b2006244527e86aacc9ab12adcbf910cbce5` touches only `cmd/iswiki/readme.go` (4 lines) and `README.md`.

- **Diff read in full.** The header string and the `Fprintf` argument list both moved `codeCell(p)` from position 6 to position 5 and `labels` from position 5 to position 6 — a matched, symmetric swap with no other change to either line.

- **Mechanical suite.** `go build ./cmd/...` and `go vet ./...` clean. `go run ./cmd/iswiki readme` regenerates `README.md` byte-identical to committed (`1379 papers, 596 with code` — unchanged, as expected for a pure column reorder).

- **Header matches the requested order exactly.** `| Paper | Authors | Organizations | Category | Code | Labels | Wiki |`.

- **Sample row's cells line up under the right headers.** The `palka26_interspeech` (DiariZen) row: column 4 `speaker`, column 5 `[BUTSpeechFIT/DiariZen ★547](https://github.com/BUTSpeechFIT/DiariZen)`, column 6 empty (this paper has no `labels` in its yaml — correctly an empty cell in the right position, not a shifted one), column 7 the wiki link. Matches the brief's expectation exactly.

## Minimality note

- Smallest possible change for the ask: swap two argument positions and the matching header cells, nothing else touched.

Reviewed implementation commit: 8bc7b2006244527e86aacc9ab12adcbf910cbce5
Verdict: PASS
Outcome: PASS
Minimality: PASS
Conformance: PASS

Self-check: stayed read-only against every tracked file for the entire review (git show/diff/status/log, go build/vet, go run ./cmd/iswiki readme, grep checks on the rendered README table); `go run ./cmd/iswiki readme` regenerated README.md in place as part of the staleness check and was reverted with `git checkout` immediately after confirming zero diff; `git status --porcelain` was clean throughout except for `.agentflow/devlog.md`, modified by an external process (not this review) before and during this pass; the only file written was this report.
