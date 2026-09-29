# Research website

The English website uses Next.js App Router and exports a static site. It reads the existing `data/papers/*.yaml` and `wiki/papers/*.md` at build time. There is no external database, AI API call, or server-side search service required for visitors.

## Develop

Use Node.js 22 or later.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Search covers titles, summaries, authors, affiliations, labels, topics, IDs, and DOIs. Categories, institutions, and organization types support multi-select: choices within a facet are OR, and separate facets intersect. Repeated URL parameters preserve selections when sharing or reloading. Selected institution and organization type must match the same affiliation. Resource and text filters further restrict results. Search is submitted with Enter or the Search button.

## Validate and build

```sh
npm test
npm run build
npm run typecheck
```

Tests validate all paper digests, category counts, intersecting filters, safe external URLs, and internal related-paper links. The build generates an individual page for every paper in `out/`, plus category and institution indexes, a sitemap, robots.txt, and the social sharing image. For a local production preview, serve `out/` with any static file server; `next start` is not used with static exports.

## Deploy to Vercel

```sh
vercel --prod
```

The Vercel project should use the repository root, Next.js framework detection, `npm run build`, and the static output selected by Next.js. `.vercelignore` excludes local source PDFs, credentials, agent work directories, and related-pair intermediate data. Only compiled digests and public paper metadata are used by the website.

Set `NEXT_PUBLIC_SITE_URL` to the production origin if using a different domain. Rebuild after paper metadata or wiki content changes. Git-based automatic deployments require connecting the Vercel project to the GitHub repository; CLI deployments work without that connection.

## Content conventions

- Category and institution statistics are calculated from YAML, not the older topic index.
- Institution names are displayed as recorded in the data; naming variants can appear separately. Counts are affiliation counts, not a research-quality ranking.
- “Code & resources” reflects a recorded `code.url`. Some links are demos, models, datasets, or referenced tools, not necessarily an author implementation.
- Every digest shows whether it is based on the full paper or only the abstract.
- Relative related-paper Markdown links become local website links. DOI links remain primary citations.
- Raw HTML in Markdown is not executed.

## Design

A restrained frontier-AI-lab direction, with locally bundled Geist Sans and Geist Mono, an off-white and sage palette, and a speech formant motif. The hero's small marks correspond to real paper counts in each category; the flowing lines are an abstract speech illustration. Motion respects reduced-motion preferences. Research pages prioritize readable text, section navigation, and horizontally scrollable tables. Institution cards use locally cached website icons where available, with deterministic monograms as fallback. `lib/institution-identities.json` maps exact institution names to assets; provenance is recorded in `public/institutions/SOURCES.md`.

Design consultation: Claude Code / Opus 5.5. Website implementation and integration: Codex.

## Organization classification

`lib/institution-classifications.json` contains TypeSafe Jev classifications for the 1,084 recorded institution names, including confidence and provenance. Suggestions below 0.8 confidence remain “Other / unclassified”. Classification is AI-assisted and is not a legal determination of organization structure.

To regenerate incrementally, provide an input JSON array of names and an external environment file with `TYPESAFE_API_KEY` or `JEV_API_KEY`:

```sh
uv run scripts/web/classify-institutions.py --input /tmp/institutions.json --env-file /path/to/.env
```

The script never writes credentials into output. Existing results are preserved. The website only uses generated public classification data; it does not call TypeSafe from visitors' browsers.

## Agent exports and human-selected scope

The hero offers a direct “Use with your agent” entry point. Visitors can copy a research prompt without installing a skill. `/llms.txt` describes the workflow, `/catalog.json` exposes public metadata and provenance, and `/papers/<id>/markdown.md` returns full metadata plus the unchanged compiled digest. Paper pages offer copy, download, and readable Markdown links. These endpoints never include local PDF contents or credentials.

“Copy filtered brief” and “Download brief” export every matching paper, not just the visible page. The brief freezes the selected IDs, filters, metadata, summaries and Markdown links, so an agent can respect the human-selected scope and fetch full digests as needed. Multiple selections use OR within each facet and AND between facets. Reset clears applied filters, unsubmitted search text and picker drafts while preserving sort and unrelated URL parameters.

## Math and additional icons

KaTeX renders inline and block mathematics. Recognizable control-character damage is repaired only inside parsed math nodes. Twelve ambiguous source expressions in nine papers retain escaped source and an explicit diagnostic rather than guessing the intended equation. Raw Markdown exports preserve the original compiled wiki.

Supplemental company, university and research icon manifests (`lib/institution-icons-*.json`) extend the shared exact-name lookup used by both filters and the directory. Sources and unresolved entries are documented in `public/institutions/SOURCES-*.md`. Unverified institutions retain a readable monogram instead of a guessed logo. LinkedIn is available beside GitHub in the shared header on every page.


## Reusing the website

Clone this repository, run `npm ci`, then `npm run dev` from the repository root. The complete Next.js source lives in `app/`, `components/`, and `lib/`; assets are in `public/`. No AI credentials are needed to run or build the website. Update `REPO` and `LINKEDIN` in `lib/catalog.ts`, creator copy and email links in the page/components, and `NEXT_PUBLIC_SITE_URL` before publishing your own fork.

Website source code uses the existing MIT license. Wiki/data and prose documentation use the separate content license. Institution logos identify their respective organizations; they are not project-created branding. Consult the icon source records when reusing those assets.

Paper pages have one primary **Copy for your agent** action. It copies instructions plus the complete wiki Markdown and metadata from the same static build as the displayed page, without a network fetch. Raw Markdown remains available through download/view links. The exact copy payload can be previewed and selected manually if clipboard access fails. The homepage prompt also explains an optional clone-and-read-AGENTS.md workflow; cloning is not required by default.

Paper handoffs request an immediate technical reading note: mechanism and equations, a method diagram, reported experimental setup, metric definitions, ablation analysis, and separate reproduction proposals. Agents with suitable tools attempt the original PDF and report actual source access; agents without those tools continue from the embedded digest without pretending to have read the PDF. A digest marked `full-paper` describes its provenance, not the receiving agent's source access.

Homepage discovery starts with at most five digests and asks one focused follow-up after a useful overview. PDF-assisted deep reading is bounded to at most three papers initially. Filtered briefs keep all selected IDs as scope while identifying an initial batch and the papers still pending. Original PDFs remain external or local/untracked; they are never included in the website export.
