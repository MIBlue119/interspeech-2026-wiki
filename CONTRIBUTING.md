# Contributing

Every paper lives in exactly two files, so a contribution is a small, conflict-free PR:

1. `data/papers/<id>.yaml` — factual metadata (see schema below).
2. `wiki/papers/<id>.md` — an **original** compiled summary (OKF page). Never paste the paper's full text or large verbatim excerpts; ISCA holds the copyright on the papers themselves.

`<id>` is the ISCA archive id, e.g. `barreiros26_interspeech`.

## Add a paper

```bash
# 1. Create a metadata stub (or copy an existing yaml and edit)
go run ./cmd/iswiki index --insecure --only <id>

# 2. Fill in the yaml (code URL, topics, arxiv…), then generate the wiki stub
go run ./cmd/iswiki wiki <id>

# 3. Write the summary sections in wiki/papers/<id>.md

# 4. Validate + regenerate the README table and wiki index
go run ./cmd/iswiki validate
go run ./cmd/iswiki readme
go run ./cmd/iswiki toc
```

Open a PR with those files. CI runs `validate` and checks the README table is regenerated.

## Metadata schema (`data/papers/*.yaml`)

```yaml
id: barreiros26_interspeech        # required, matches filename
title: "…"                         # required
authors: ["…", "…"]               # required
year: 2026                         # required
doi: 10.21437/Interspeech.2026-1444
isca_url: https://www.isca-archive.org/interspeech_2026/barreiros26_interspeech.html
pdf_url: https://www.isca-archive.org/interspeech_2026/barreiros26_interspeech.pdf
topics: [keyword-spotting, asr]    # kebab-case tags
arxiv: ""                          # optional arXiv URL
code:
  url: ""                          # GitHub/GitLab URL if the paper has open code
  license: ""                      # e.g. MIT, Apache-2.0
# Author opt-in fields — only the paper's authors should set these, via their own PR:
contact: ""
lab: ""
open_to_collaboration: false
```

## Wiki page rules (`wiki/papers/*.md`)

- Keep the OKF frontmatter: `id`, `category`, `updated` (YYYY-MM-DD), `confidence`, `source`; full-text digests also carry `pdf` (the ISCA PDF url) and `digest: v2`.
- `confidence` is one of `abstract-only`, `full-paper`, `author-verified` — be honest about what you read.
- Sections (v2 format): **TL;DR**, **Key contributions**, **Problem**, **Method**, **Experimental setup**, **Results** (a small markdown table of headline numbers is welcome), **Limitations**, **Why read this**, **Code**, **Applications**, **Related**. An `abstract-only` page may omit the sections its source can't support. Link related pages by id in backticks, e.g. `` `barreiros26_interspeech` ``.
- Only put a URL in **Code** / `code.url` if the paper itself announces it as the authors' own release (or you verified it out-of-band, e.g. the authors' repo README cites the paper). Third-party backbones the paper merely uses do not count.
- Write in your own words. Quotes of a sentence or two with attribution are fine; paragraphs are not.

## Claiming your paper (authors)

Send a PR from an account clearly linked to the paper (or note your author position in the PR description) that fills `contact` / `lab` / `open_to_collaboration` in your yaml, and optionally bumps your wiki page's `confidence` to `author-verified` after reviewing it.

## Licensing of contributions

By contributing you agree your code contributions are MIT-licensed and your content contributions (yaml/wiki/README) are CC BY 4.0.
