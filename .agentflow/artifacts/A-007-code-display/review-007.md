* _2026-09-29 09:30:49 +0800 (claude-sonnet-5/inherited)_

## Summary

- Solid work across a wide surface (display formatting, a new GitHub API integration, a frontmatter addition, and a 36-link dead-link audit) — everything I checked held up, including two source-text verifications I pushed further than requested (live HTTP checks on both repaired repos) and a full-file grep on one clear to rule out a missed URL. One purely cosmetic, non-blocking observation about field ordering in patched yaml files, with no functional consequence.

- No action needed.

## Findings

- **Cosmetic: `patchStars` inserts a new `stars:` line before `license:`, not after (non-blocking).**
  - Trigger: `cmd/iswiki/paper.go`'s `Code` struct declares fields in the order `URL, License, Stars`, so a fresh `yaml.Marshal` (used by `savePaper` for new stubs) would render `url, license, stars`. But `cmd/iswiki/stars.go`'s `patchStars` function, used to add a `stars:` line to an *existing* yaml file that doesn't have one yet, inserts it immediately after the `url:` line via `urlRe := regexp.MustCompile(`(?m)^(code:\n([ \t]+)url: .*\n)`)`, landing it *before* `license:`.
  - Impact: none functionally — I confirmed by direct read of several patched files (`bhagtani26_interspeech.yaml`, `palka26_interspeech.yaml`, `chao26_interspeech.yaml`) that they render as `url, stars, license`, and `yaml.v3` reads fields by key name regardless of order, so `loadPaper`/`validatePaper`/every consumer is unaffected. I also checked for orphaned `stars:` fields left behind on any of the cleared/repaired entries (a paper whose `code.url` was reset to `""` but which still carries a stale `stars: N`) — found none; all clears removed both cleanly.
  - Evidence: `cmd/iswiki/paper.go:13-19` (struct field order) vs. `cmd/iswiki/stars.go:101-107` (`patchStars`); direct reads of the three yaml files named above.
  - Action: optional — if this bothers future readers, either reorder the `Code` struct's `Stars` field before `License` to match, or have `patchStars` insert after the full `code:` block instead of right after `url:`.

## Verified-good, per the brief's checklist

- **Mechanical suite at HEAD (`6d896e82a8f4eb1ff24540f108f3fdc3bce7bda2`).** `go build ./cmd/...` and `go vet ./...` clean. `go run ./cmd/iswiki validate` → `OK: 1379 paper files valid`. `readme`/`toc`/`orgs` all regenerate byte-identical (`596 with code`, `72 topics`, `1084 institutions, 780 sponsors`).

- **Both cumulative commits scoped as described.** `2018b409` touches `AGENTS.md`, `CONTRIBUTING.md`, `README.md`, `cmd/iswiki/{main,paper,readme,stars,wiki}.go`, plus ~601 `data/papers/*.yaml` and ~601 `wiki/papers/*.md` (the `code:` frontmatter rollout). `6d896e82` (the xu26j clear) touches exactly `README.md`, `data/papers/xu26j_interspeech.yaml`, `wiki/index.md`, `wiki/papers/xu26j_interspeech.md` — 4 files, nothing unexpected. No `go.mod`/`go.sum` changes (`stars.go` uses only the standard library); no `sources/`, binaries, or `.env` newly tracked.

- **Display forms — all 3 checked directly against yaml.** GitHub-with-stars: `palka26_interspeech` renders `[BUTSpeechFIT/DiariZen ★547](https://github.com/BUTSpeechFIT/DiariZen)`, matching `code.url`/`code.stars: 547` in its yaml exactly. Hugging Face: `anand26b_interspeech` renders `[ai4bharat/SpeechArenaBench (HF)](https://huggingface.co/datasets/ai4bharat/SpeechArenaBench/)` — correctly strips the `datasets/` prefix and tags `(HF)`. Demo page: `chen26t_interspeech` renders the bare hostname `[ymchiqq.github.io](https://ymchiqq.github.io/nelvc_demo/)` — correctly falls through to the default case since `ymchiqq.github.io` isn't `github.com` itself.

- **Repair 1 — `cho26b_interspeech` → `Speech-AI-Research-Center/taigi-speech2chinese-subtitle`.** The source PDF's own extracted text (`sources/md/cho26b_interspeech.md:43`) reads a garbled `https://github.com/Speech-AI-Research-Center/taigispeech2chinese-subtitlen` (a PDF-extraction artifact — missing the hyphen after "taigi" and a stray trailing "n"). The yaml's repaired URL, `.../taigi-speech2chinese-subtitle`, is the clean, correctly-hyphenated version. I went further than a text comparison and `curl`'d the repaired URL live: `HTTP 200`, confirming it's a real, resolvable repository, not just a plausible-looking guess.

- **Repair 2 — `masuyama26_interspeech` → `merlresearch/s2rnf`.** Source text at `sources/md/masuyama26_interspeech.md:149-155`: "Our code is available online²" footnoted to `https://github.com/merlresearch/s2rnf`, exact match to the yaml. The `merlresearch` org name matches the paper's stated affiliation ("Mitsubishi Electric Research Laboratories (MERL)," `sources/md/masuyama26_interspeech.md:11`). Live `curl` check: `HTTP 200`.

- **Clear 1 — `xu26j_interspeech` (GPT-SoVITS).** Source text at `sources/md/xu26j_interspeech.md:157`: "we adopt GPT-SoVITS² as our backbone" — an explicit, unambiguous statement that this is an adopted third-party framework, not the paper's own release; the footnote at line 163 even points to GPT-SoVITS's own separate repo (`RVC-Boss/GPT-SoVITS`), further confirming it isn't this paper's code. Correctly cleared; wiki page now shows the standard "None released" text.

- **Clear 2 — `arora26b_interspeech`.** Source text says "The implementation code is publicly available for reproducibility at Github repository" — a genuine self-announcement, but I grepped the *entire* converted PDF text for any URL pattern at all and found zero matches anywhere in the document. There is no URL to recover; the paper's own PDF text never actually states one, so leaving `code.url` empty (rather than guessing a plausible-looking one) is the correct, conservative call, consistent with the project's established "don't fabricate" standard from earlier rounds.

- **Stub functional test.** Moved `wiki/papers/palka26_interspeech.md` aside and regenerated it with `go run ./cmd/iswiki wiki palka26_interspeech`: the stub's frontmatter includes `code: https://github.com/BUTSpeechFIT/DiariZen` in the position `CONTRIBUTING.md` documents (after `institutions`, before `updated`), and correctly omits a `labels:` line since this paper has none. Restored the original file from a backup copy, confirmed byte-identical via `diff`, and `git status --porcelain -- wiki/` is clean afterward. Separately confirmed 596 wiki pages carry the `code:` frontmatter line — exactly matching the 596-with-code count from `readme`.

- **`stars.go` review.**
  - Token handling: `token := os.Getenv("GITHUB_TOKEN")` is read once, used only in the `Authorization: Bearer` header, and is never passed to any `fmt.Print*`/log call anywhere in the file — confirmed by reading the whole file, not just the auth lines.
  - Batching: `for start := 0; start < len(targets); start += 100` with `batch := targets[start:min(start+100, len(targets))]` correctly chunks into GraphQL queries of ≤100 aliased `repository(...)` fields each.
  - `patchStars` regex: correctly anchored to a literal `code:\n` line immediately preceding `url:`, so it can't accidentally match `isca_url:`/`pdf_url:` elsewhere in the file. I found and reported one purely cosmetic field-ordering quirk (see Findings) but no functional or data-integrity issue — checked for orphaned `stars:` fields on cleared entries and found none.
  - Star-gating: `codeCell` only appends `★N` when `p.Code.Stars > 0 && strings.HasPrefix(p.Code.URL, "https://github.com/")`, and `stars.go` only ever queries/writes `Stars` for URLs matching the `github.com` regex, so a non-GitHub repo can never end up with a stray star count.

## Minimality note

- This is a reasonably large round (display formatting + a new API-backed subcommand + a frontmatter rollout + a targeted dead-link audit), but every piece maps directly to one of the three explicit Asks (display names, frontmatter code info, star counts) or to cleanup work that resolution of the third Ask surfaced (the 36 dead links). Nothing unrelated was bundled in.

Reviewed implementation commit: 6d896e82a8f4eb1ff24540f108f3fdc3bce7bda2
Verdict: PASS
Outcome: PASS
Minimality: PASS
Conformance: PASS

Self-check: stayed read-only against every tracked file for the entire review (git show/diff/status/log, go build/vet, go run ./cmd/iswiki validate/readme/toc/orgs, python/grep scans over data/papers and README.md, reads of local untracked sources/md/*.md files that already existed on disk, two outbound `curl` HEAD-style checks against live github.com URLs already present in the yaml — no write, no auth token used or needed); the stub functional test moved `wiki/papers/palka26_interspeech.md` aside to scratch space (keeping a backup copy), regenerated it with `go run ./cmd/iswiki wiki palka26_interspeech` for inspection, then deleted the regenerated stub and restored the original file from the backup copy, confirming byte-identical via `diff` and a clean `git status --porcelain -- wiki/` afterward; `go run ./cmd/iswiki readme`/`toc`/`orgs` regenerated README.md/wiki/index.md/wiki/institutions.md in place as part of the staleness checks and all three were reverted with `git checkout` immediately after confirming zero diff; `git status --porcelain` was clean throughout except for `.agentflow/devlog.md`, modified by an external process (not this review) before and during this pass; the only file written was this report.
