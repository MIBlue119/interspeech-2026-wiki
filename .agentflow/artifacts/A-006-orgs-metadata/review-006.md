* _2026-09-29 09:13:04 +0800 (claude-sonnet-5/inherited)_

## Summary

- Clean, correct change with no issues found. Every check passed, including the harder ones I added myself: I parsed the actual frontmatter of three institution-name edge cases (an accented name, an apostrophe, and a curly-quote name with a slash) through the project's own `gopkg.in/yaml.v3` library in a standalone test program, and all three round-tripped losslessly.

- No action needed.

## Findings

None. This round required no corrective findings.

## Verified-good, per the brief's checklist

- **Scope matches the description exactly.** `git show --name-only` lists 1374 `wiki/papers/*.md` (exactly matching the "1374 pages" claim — 1379 − 5 papers with no extractable org, confirmed below), plus `AGENTS.md`, `CONTRIBUTING.md`, `README.md`, `cmd/iswiki/readme.go`, `cmd/iswiki/wiki.go`. No `data/papers/*.yaml` touched at all, which is correct — this commit only surfaces institutions data that A-004 already extracted, it doesn't re-extract anything.

- **Mechanical suite.** `go build ./cmd/...` and `go vet ./...` clean. `go run ./cmd/iswiki validate` → `OK: 1379 paper files valid`. `go run ./cmd/iswiki readme`, `toc`, and `orgs` all regenerate byte-identical to committed (`601 with code`, `72 topics`, `1084 institutions, 780 sponsors` — none of the topic/institution counts changed, as expected since this commit is a pure display change).

- **Diffs read in full.** `cmd/iswiki/readme.go`: the new "Organizations" column joins all institutions when ≤3, or the first 3 plus `" …"` when more — verified directly (see below). `cmd/iswiki/wiki.go`: the new `institutions:` frontmatter line is built with Go's `%q` per name, joined as a YAML flow sequence, only emitted when `len(p.Institutions) > 0`. `AGENTS.md`/`CONTRIBUTING.md`: both frontmatter-field lists updated to list `labels`/`institutions` alongside the existing fields — accurate.

- **Frontmatter parses as valid YAML and matches yaml institutions — pushed past the 2-sample ask with 3 deliberately-hard cases.** Rather than eyeballing text equality, I wrote a small standalone Go program (outside the repo, using the exact same `gopkg.in/yaml.v3` dependency this project uses) that extracts each page's frontmatter block and unmarshals it, to catch anything that merely *looks* right but wouldn't actually parse:
  - `lin26n_interspeech` — `institutions: ["Wuhan University", "Tencent", "Northwestern Polytechnical University", "Université du Québec"]` (accented name) — parsed cleanly, `Université du Québec` round-tripped exactly.
  - `loweimi26_interspeech` — `institutions: [..., "Queen's University Belfast", ...]` (apostrophe) — parsed cleanly, apostrophe preserved exactly.
  - `turk26_interspeech` — `institutions: [..., "SFB/Transregio 318 'Constructing Explainability'"]` (curly quotes `'` `'`, a literal slash, and a space) — parsed cleanly, all characters preserved exactly.
  All three matched their `data/papers/*.yaml` source institutions list exactly, both by the earlier direct comparison and by the YAML-parse round-trip.

- **README table's Organizations column.** `barreiros26_interspeech` (3 institutions) shows all 3 with no ellipsis. `labrak26_interspeech` (15 institutions in yaml) shows exactly `Idiap Research Institute, University of Zurich, Ohio State University …` — the first 3 in yaml order, correctly truncated.

- **The 5 "no extractable org" papers are consistent everywhere.** `marchenko26_interspeech`, `noronha26_interspeech`, `sharma26c_interspeech`, `tiwari26_interspeech`, `yadla26_interspeech` all have no `institutions:` key in their yaml at all (not even an empty list), and correspondingly have no `institutions:` frontmatter line in their wiki page — consistent, not a bug.

- **Stub functional test, both directions.** Moved `wiki/papers/noronha26_interspeech.md` (no institutions) aside and regenerated it: the stub correctly has no `institutions:` frontmatter line and no `## Institutions` section. Moved `wiki/papers/loweimi26_interspeech.md` (6 institutions, including the apostrophe case) aside and regenerated it: the stub's frontmatter reproduces `institutions: ["University of Cambridge", "Queen's University Belfast", ...]` exactly matching the real page. Both original files were restored from a backup copy and confirmed byte-identical via `diff`; `git status --porcelain` is clean for `wiki/` afterward.

- **Hostile-content sniff.** Grepped `README.md` for injection-style phrasing; found nothing. All content treated as data throughout.

## Minimality note

- Small, surgical change: one new frontmatter field (surfacing data that already existed in yaml since A-004), one new README column, both docs synced in the same commit. No unrelated changes. Nothing added beyond what the Ask requested.

Original-pass verdicts (superseded by the addendum): outcome pass, minimality pass, conformance pass.

## Addendum — category-sort follow-up verification

Addendum verified at 2026-09-29 09:15:36 +0800 by the same reviewer (claude-sonnet-5, inherited effort).

`git show --stat 76ef81ed0cfd66f68da3032986753ef40e73609b` touches exactly `cmd/iswiki/readme.go` (14 lines) and `README.md` — no unexpected scope. `go build ./cmd/...` and `go vet ./...` are clean. `go run ./cmd/iswiki readme` regenerates `README.md` byte-identical to committed (`1379 papers, 601 with code` — unchanged from before this commit, as expected for a pure re-ordering).

I independently re-extracted the Category column from every one of the 601 table rows (not by eyeballing — with a small script over the actual markdown) and confirmed exactly 14 contiguous groups with no interleaving, in the order `tts(99), asr(86), resources-evaluation(84), enhancement-separation(64), deepfake-security(47), speech-llm-dialogue(46), health-clinical(35), paralinguistics-emotion(34), speaker(24), audio-understanding(21), phonetics-linguistics(21), speech-coding(21), translation(10), applications-other(9)` — matching the coordinator's own reported observation exactly, and the three-way tie at 21 breaks alphabetically as the code's tie-break rule specifies.

- **One real, non-blocking finding: the code's own comment and this commit's message both claim the row order "match[es] the Browse-by-category table," and that claim is false — verified with data, not assumed.**
  - Trigger: `cmd/iswiki/readme.go:25-31` builds `catCount` only from `withCode` (the 601 code-linked papers), then sorts by that count; the Browse-by-category table (`categoriesBlock`, `cmd/iswiki/readme.go:101-128`) counts over all 1379 `papers` instead. These are different denominators, so "biggest category" can differ between the two tables — and it does: I recomputed both distributions directly from `data/papers/*.yaml` (not from the rendered tables) and they diverge at multiple points. Most visibly, `tts` (99 code-linked papers) outranks `asr` (86 code-linked) in this table, while the Browse-by-category table has `asr` (230 total) ahead of `tts` (152 total) — the #1 and #2 spots are swapped between the two tables. `phonetics-linguistics` is a starker case: it's the 5th-biggest category overall (126 papers) but only ties for 10th among code-linked papers (21), because phonetics-linguistics papers apparently release code far less often than tts/asr papers do.
  - Impact: low. The delivered feature still does everything the brief asked me to check — deterministic, internally consistent, contiguous, no interleaving, correct tie-breaking, still 601 rows — and arguably "biggest among the papers that actually have code" is a defensible, even more directly useful ordering for a papers-with-code table than borrowing a ranking from the full corpus. No user-facing documentation (`AGENTS.md`, `CONTRIBUTING.md`, `README.md`'s own prose) claims the two tables' orders match — that claim exists only in the `readme.go` source comment and the commit message, so no reader following the docs would be misled; only someone reading the source code and taking the comment at face value would be.
  - Evidence: `cmd/iswiki/readme.go:32-33` (comment) and the commit message both say "matching the Browse-by-category table"; independently recomputed both distributions from `data/papers/*.yaml` (shown above) and extracted the actual rendered order from `README.md`'s 601 table rows — they don't match beyond superficially both being "sorted, biggest-first."
  - Action: optional — either compute `catCount` from all `papers` (not just `withCode`) so the ordering genuinely matches Browse-by-category, or correct the comment/commit-message to describe the actual, intentional behavior ("biggest among papers that have code," a different and arguably more useful ranking for this specific table).

Reviewed implementation commit: 76ef81ed0cfd66f68da3032986753ef40e73609b
Verdict: PASS
Outcome: PASS
Minimality: PASS
Conformance: PASS

Self-check: across both passes stayed read-only against every tracked file (git show/diff/status/log, go build/vet, go run ./cmd/iswiki validate/readme/toc/orgs, python/grep scans over data/papers and the rendered README table, a standalone Go+yaml.v3 test program built and run entirely outside the repo in scratch space to parse wiki-page frontmatter — no repo file was created for this); the first pass's functional stub test moved `wiki/papers/noronha26_interspeech.md` and `wiki/papers/loweimi26_interspeech.md` aside to scratch space (keeping a backup copy of each), regenerated each with `go run ./cmd/iswiki wiki <id>` for inspection, then deleted the regenerated stub and restored the original file from the backup copy, confirming byte-identical via `diff` and a clean `git status --porcelain -- wiki/` afterward; each pass's `go run ./cmd/iswiki readme`/`toc`/`orgs` regenerated README.md/wiki/index.md/wiki/institutions.md in place as part of the staleness checks and all were reverted with `git checkout` immediately after confirming zero diff; `git status --porcelain` was clean throughout both passes except for `.agentflow/devlog.md`, modified by an external process (not this review) before and during both passes; the only file written across both passes was this report.
