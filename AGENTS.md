# For AI agents

This repo is an OKF-style llm-wiki of Interspeech 2026 papers. How to answer questions with it:

## Layout

- `wiki/papers/<id>.md` — one compiled page per paper. YAML frontmatter (`id`, `category`, `labels`, `institutions`, `code` when a verified code URL exists, `updated`, `confidence`, `source`, plus `pdf` and `digest: v2` on full-text pages) + sections: TL;DR, Key contributions, Problem, Method, Experimental setup, Results (often with a numbers table), Limitations, Why read this, Code, Applications, Related. **Read these first** — they are distilled and interlinked. `confidence: full-paper` pages were digested from the full PDF; the few `abstract-only` pages (keynotes without an archived PDF) carry only what the abstract supports.
- `data/papers/<id>.yaml` — structured metadata: title, authors, DOI, ISCA/arXiv/PDF links, `topics` tags, `category` (one of 14 canonical categories), `labels` (cross-cutting tags like `low-resource`, `multilingual`), `institutions` (authors' universities/companies, canonical English names), `funding` (sponsors), `code.url` for open-source implementations, and author opt-in fields (`contact`, `lab`, `open_to_collaboration`).
- `wiki/index.md` — topic index of all wiki pages.
- `wiki/institutions.md` — papers grouped by author institution and funding sponsor (機構索引) — use it for "who works on X" / collaboration questions.
- `sources/` — local-only PDFs (gitignored). May be absent; never assume it exists.

## Searching

1. Topic questions ("papers about X"): grep `category:`/`labels:`/`topics:` in `data/papers/*.yaml` and grep the wiki pages; cross-reference `wiki/index.md`. Institution questions ("what did CMU/NVIDIA publish"): grep `institutions:` or use `wiki/institutions.md`.
2. If `zg` (zvec-grep) is installed and an index exists, prefer `zg "<natural language query>"` for semantic search; fall back to plain grep otherwise.
3. "Who works on X / who can I collaborate with": use `authors`, `lab`, `contact`, `open_to_collaboration` in the yaml files.
4. Deep detail beyond a wiki page's `confidence` level: fetch the paper via its `doi`/`isca_url` (note: isca-archive.org TLS certificate is currently expired) or tell the user to run `go run ./cmd/iswiki fetch --insecure --only <id>`.

## Rules

- Frontmatter `confidence: abstract-only` means the summary was written from the abstract — say so when answering from it.
- Cite papers by DOI, not by wiki page.
- When editing: one paper = one yaml + one wiki page; after metadata edits run `go run ./cmd/iswiki validate && go run ./cmd/iswiki readme`. Never commit paper full text (ISCA copyright).
