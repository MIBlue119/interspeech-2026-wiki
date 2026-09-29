* _2026-09-29 09:00:09 +0800 (claude-sonnet-5/inherited)_

## Summary

- The actual data delivered here is excellent and I verified it hard: every institution, funding sponsor, and category I checked against the paper's own source text (including all 4 keynotes) traced back exactly, with no fabrication. The category distribution I independently recomputed from all 1379 yaml files matches the README's generated table number-for-number, and it sums to exactly 1379 with no gaps or double-counts.

- One real, reproducible gap: `cmd/iswiki/wiki.go` — the tool `CONTRIBUTING.md` itself tells a new contributor to run when adding a paper — was not updated in this commit. It still emits the old frontmatter (no `labels:` line, and its `category:` comes from a legacy `topics[0]`/`session` fallback, not the new canonical `category`/`labels` judged fields) and has no `**Category:** · **Labels:**` line or `## Institutions / 機構` section anywhere in its template. This is the same class of bug flagged and fixed in A-003 (stale stub generator vs. documented schema) recurring a second time, one commit after the last fix — this time the docs (`AGENTS.md`/`CONTRIBUTING.md`) are accurate, but the tool that's supposed to produce pages matching those docs isn't.

- Mechanical suite is fully clean: build, vet, validate (1379), and all three regenerators (`readme`, `toc`, `orgs`) reproduce byte-identical output to what's committed. No `sources/`, binaries, or `.env` tracked.

- Next action: update `cmd/iswiki/wiki.go`'s template to emit `category`/`labels` frontmatter (sourced from `p.Category`/`p.Labels`, not the legacy `topics[0]` fallback), the visible Category/Labels line, and an Institutions/Funding section — matching what `CONTRIBUTING.md` already (correctly) documents.

## Findings

- **`iswiki wiki` stub generator doesn't emit the new category/labels/institutions schema (repeat of an A-003 finding, different fields).**
  - Trigger: this commit added `Category`, `Labels`, `Institutions`, and `Funding` to the `Paper` struct (`cmd/iswiki/paper.go:30-33`) and to every one of the 1379 wiki pages' frontmatter/body, and updated `CONTRIBUTING.md`'s metadata-schema example to show `category:`, `labels:`, `institutions:`, `funding:` fields — but `git show 31b139bade70c8f0dac5e9603e2912cc1836b134 -- cmd/iswiki/wiki.go` is empty; the file was not touched.
  - Impact: reading the current `cmd/iswiki/wiki.go` template (lines 26-31, 45-103) directly: its `category` local variable is computed from `p.Topics[0]`/`p.Session`, never from the new `p.Category` field; the frontmatter block (lines 46-52) has no `labels:` line at all; the body has no `**Category:** ... · **Labels:** ...` line (present on every real page, e.g. `wiki/papers/barreiros26_interspeech.md:18`) and no `## Institutions / 機構` section (present on every real page, e.g. `wiki/papers/barreiros26_interspeech.md:71-75`). A contributor following `CONTRIBUTING.md`'s own step 2 (`go run ./cmd/iswiki wiki <id>`) — even after correctly filling in `category`/`labels`/`institutions`/`funding` in the yaml per step 1's now-updated example — would get a page inconsistent with all 1379 existing ones, and nothing in `validate` or the new CI staleness checks (`readme`/`toc`/`orgs`) would catch it, since none of them inspect an individual wiki page's frontmatter completeness.
  - Evidence: `cmd/iswiki/wiki.go:26-31,45-103` (current file, read in full); empty diff for that path in `git show 31b139bade70c8f0dac5e9603e2912cc1836b134`.
  - Action: update `wiki.go`'s template to source `category`/`labels` from `p.Category`/`p.Labels`, add the `labels:` frontmatter line, the visible Category/Labels line, and an Institutions/Funding section (can reasonably read "none yet" when `p.Institutions` is empty, matching the existing "None released" pattern for Code).

## Verified-good, per the brief's checklist

- **Mechanical suite.** `go build ./cmd/...` and `go vet ./...` are clean. `go run ./cmd/iswiki validate` reports `OK: 1379 paper files valid`. `go run ./cmd/iswiki readme`, `go run ./cmd/iswiki toc`, and the new `go run ./cmd/iswiki orgs` all regenerate byte-identical to what's committed (`README.md`: 1379 papers, 606 with code; `wiki/index.md`: 72 topics; `wiki/institutions.md`: 1084 institutions, 780 sponsors — all three matching the commit description exactly), so the three CI staleness checks in `.github/workflows/ci.yml` (the third one newly added for `orgs`) would pass against this commit.

- **Scope matches the description exactly.** `git show --name-only` lists all 1379 `data/papers/*.yaml` and all 1379 `wiki/papers/*.md` as changed (my first pass with `--stat` undercounted by 1 due to `git show --stat`'s line-wrapping on long filenames — rechecked with `--name-only` for an exact count), plus exactly the 9 other files the description names: `.github/workflows/ci.yml`, `AGENTS.md`, `CONTRIBUTING.md`, `README.md`, `cmd/iswiki/main.go`, `cmd/iswiki/orgs.go` (new), `cmd/iswiki/paper.go`, `cmd/iswiki/readme.go`, `wiki/institutions.md` (new). `go.mod`/`go.sum` untouched; no `sources/`, `.env`, or compiled binaries tracked.

- **Spot-check 1 — `barreiros26_interspeech` (the exact example the brief predicted).** yaml and wiki page both show `category: asr`, `institutions: [Priberam Labs, Instituto Superior Tecnico, Instituto de Telecomunicacoes]`, `funding: [Portuguese Recovery and Resilience Plan]` — matching the paper's own affiliation footer and acknowledgments section (which I'd already read in full during the A-001 review) word-for-word aside from stripped diacritics (`Tecnico` for `Técnico`, `Telecomunicacoes` for `Telecomunicações` — a reasonable ASCII-normalization choice for a plain-text metadata field, not an error). The visible `**Category:** \`asr\` · **Labels:** ...` line and `## Institutions / 機構` section are both present and correctly formatted.

- **Spot-check 2 — `li26g_interspeech`.** `category: deepfake-security` (correct for an anti-spoofing paper), `institutions: [Hong Kong Polytechnic University, Brno University of Technology, Shenzhen Zhuiyi Technology]` and all 4 funding sponsors (`Innovation and Technology Fund of the Hong Kong SAR`, `National Key R&D Program of China`, `Digital Europe Programme`, `Ministry of Education, Youth and Sports of the Czech Republic`) match the paper's Acknowledgements section at `sources/md/li26g_interspeech.md:261` exactly, including correctly splitting a compound funding sentence into two separate sponsors.

- **Spot-check 3 and category sanity — 3 random papers.** `raybarman26_interspeech` (`tts`, phonology-informed TTS evaluation — correct), `wang26c_interspeech` (`enhancement-separation`, blind room-impulse-response identification — a defensible best fit among the 14 categories, since there's no dedicated room-acoustics bucket), `sanjotra26_interspeech` (`resources-evaluation`, MOS-metric evaluation study — correct). All three institution lists are plausible and none showed signs of fabrication.

- **Keynotes (check #4).** All 4 keynote pages carry a category and a real, correctly-identified institution with no fabricated detail beyond what's publicly known: `yamagishi26_interspeech` → `deepfake-security` / National Institute of Informatics (Yamagishi is an NII researcher — correct, and exactly what the brief predicted); `hansen26_interspeech` → `resources-evaluation` / University of Texas at Dallas (John Hansen is UTD faculty — correct); `bird26_interspeech` → `asr` / Charles Darwin University (Steven Bird is CDU-affiliated — correct); `hay26_interspeech` → `phonetics-linguistics` / University of Canterbury (Jennifer Hay is UC-affiliated — correct). None of the 4 has a fabricated `funding` entry — all are empty, correctly, since keynote abstracts carry no acknowledgments section.

- **Category and label distribution sanity (went beyond the 3-sample ask).** I independently recomputed the category distribution across all 1379 yaml files and it matches the README's generated Browse-by-category table exactly, number for number (`asr` 230 … `translation` 16), summing to exactly 1379 with no gaps or overlaps. The 8 cross-cutting labels (`self-supervised` 347, `generative-model` 273, `multilingual` 215, `low-resource` 164, `dataset-or-benchmark-release` 161, `efficient-on-device` 157, `robustness-noise` 150, `streaming-real-time` 103) show a plausible spread for a 2026 speech conference — `self-supervised` being the most common (25%) is unsurprising given how many papers build on Whisper/wav2vec2/WavLM-style pretrained backbones, which resolved an initial concern I had about `barreiros26`'s `self-supervised` label (it reflects using a self-supervised-pretrained backbone, not a claim about the paper's own training method).

- **Hostile-content sniff.** Grepped `wiki/institutions.md` and a sample of funding/institution lines for injection-style phrasing; found nothing. All content treated as data throughout.

## Minimality note

- This is a direct, appropriately-scoped answer to the Ask: one new field group (`category`/`labels`/`institutions`/`funding`) added once to the existing per-paper files, one new subcommand (`orgs`) to keep the new institutions index regenerable rather than hand-maintained, and no unrelated refactors. I didn't find anything added beyond what the Ask called for.

Original-pass verdicts (superseded by the addendum): outcome pass, minimality pass, conformance blocking.

## Addendum — wiki.go fix verification

Addendum verified at 2026-09-29 09:02:35 +0800 by the same reviewer (claude-sonnet-5, inherited effort).

The fix commit resolves the finding cleanly. `git show --stat e2d09d617835d0d3437961209f0e60d2614e12b7` touches exactly one file, `cmd/iswiki/wiki.go` (28 insertions, 8 deletions) — no unexpected scope. `go build ./cmd/...` and `go vet ./...` are both clean.

I read the diff directly rather than trusting the description: `category` now sources from `p.Category` first, falling back to `p.Topics[0]` only if that's empty and finally to `"uncategorized"` — matching what the commit message claims. The template gained conditional blocks that only emit the `labels:` frontmatter line, the `**Category:** ... · **Labels:** ...` line's label half, and the `## Institutions / 機構` section when those fields are actually populated.

I then ran the functional test myself rather than trusting the reported one, on two cases:

- **`barreiros26_interspeech`** (has category, labels, institutions, and funding in its yaml): moved the real wiki page aside, ran `go run ./cmd/iswiki wiki barreiros26_interspeech`, and got a stub with `category: asr`, `labels: [efficient-on-device, self-supervised, streaming-real-time]` in frontmatter, the visible `**Category:** \`asr\` · **Labels:** \`efficient-on-device\`, \`self-supervised\`, \`streaming-real-time\`` line, and a correctly populated `## Institutions / 機構` section (`Priberam Labs, Instituto Superior Tecnico, Instituto de Telecomunicacoes` plus the funding line) — matching `CONTRIBUTING.md`'s documented format and the real page's content exactly.

- **`noronha26_interspeech`** (an edge case I found by scanning for a paper with neither `labels` nor `institutions` set — worth checking since the empty-field branches are exactly where this kind of template code tends to break): the generated stub correctly omits the `labels:` frontmatter line entirely, shows a clean `**Category:** \`speech-llm-dialogue\`` line with no trailing `· **Labels:**` artifact, and has no `## Institutions / 機構` section at all rather than an empty/broken one.

Both test files were restored from a copy I made before moving them, and `diff` confirmed the restored files are byte-identical to the originals. `git status --porcelain` shows no changes under `wiki/` after the test.

Reviewed implementation commit: e2d09d617835d0d3437961209f0e60d2614e12b7
Verdict: PASS
Outcome: PASS
Minimality: PASS
Conformance: PASS

Self-check: across both passes stayed read-only against every tracked file (git show/diff/status/log, go build/vet, go run ./cmd/iswiki validate/readme/toc/orgs, grep/python scans over data/papers and wiki/papers, reads of local untracked sources/md/*.md files that already existed on disk); the first pass's `go run ./cmd/iswiki readme`/`toc`/`orgs` regenerated README.md/wiki/index.md/wiki/institutions.md in place as part of the staleness checks and all three were reverted with `git checkout` immediately after confirming zero diff; the addendum pass's functional test moved `wiki/papers/barreiros26_interspeech.md` and `wiki/papers/noronha26_interspeech.md` aside to scratch space (keeping a backup copy of each), ran `go run ./cmd/iswiki wiki <id>` to regenerate each as a fresh stub for inspection, then deleted the regenerated stub and restored the original file from the backup copy, confirming byte-identical via `diff` and a clean `git status --porcelain -- wiki/` afterward; `git status --porcelain` was clean throughout both passes except for `.agentflow/devlog.md`, modified by an external process (not this review) before and during both passes; the only file written across both passes was this report.
