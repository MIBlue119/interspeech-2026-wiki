# Tracker

## Identity

- **Work key:** A-004-categories-orgs.

- **Active Ask:** A-004.

- **Goal:** Add TypeSafe-judged canonical categories + labels and extracted institutions/funding (機構名稱) to every paper's yaml + wiki md, surface them in README and a searchable institutions index, batch-applied and pushed.

- **Last update:** 2026-09-29 11:40:00 +0800.

- **Evidence commit:** e2d09d617835d0d3437961209f0e60d2614e12b7.

## Overall state

- **State:** complete.

- **Reason:** All tasks proven; review PASS on e2d09d6.

- **Total:** 4.

- **Completed:** 4.

- **Remaining:** 0.

## Accepted task checklist

- [x] **T-1:** Host tooling: Paper struct gains category/labels/institutions/funding fields with category validation (14 canonical keys); `iswiki orgs` generates wiki/institutions.md; readme cmd fills a CATEGORIES block; README gains markers + links. Proof: go build/vet clean. Source: A-004.

- [x] **T-2:** ts-labeler (opus subagent) produces sources/labels.json for all 1379 ids via TypeSafe Jev choice+noul batch requests. Proof: file covers 1379 ids, category distribution reported. Source: A-004.

- [x] **T-3:** ts-orgs (opus subagent) produces sources/orgs.json for all 1379 ids (Gemini candidate extraction + Jev verification). Proof: file covers 1379 ids, top institutions reported. Source: A-004.

- [x] **T-4:** Batch apply (sources/apply_meta.py) to yaml+md, regenerate readme/toc/orgs, docs sync (AGENTS/CONTRIBUTING/CI), validate, independent review, closeout push. Proof: validate OK, regeneration byte-stable, review PASS, remote main updated. Source: A-004.

## Accepted scope changes

- None.

## Current recovery

- **Current item:** none — round complete.

- **Last proven result:** All four tasks proven; labels.json+orgs.json complete (1379 each), batch applied to all yaml+md, indexes regenerated, review-004 all PASS on e2d09d6.

- **Active blocker or running process:** None.

- **Next safe action:** None.

- **Expected changed files:** data/papers/*.yaml, wiki/papers/*.md, wiki/index.md, wiki/institutions.md, README.md, CONTRIBUTING.md, AGENTS.md, .github/workflows/ci.yml, cmd/iswiki/{paper,readme,orgs,main}.go, .agentflow records.

## Completion proof

- **All accepted tasks checked:** yes.

- **Blocking accepted decision:** none.

- **Operation running:** no.

- **Next action remaining:** none.

- **Evidence status:** complete.

- **Judgment:** complete.

## Update meaning

- Saving this tracker is a recovery checkpoint, not a stop signal.

- For completed work, Evidence commit names the Git evidence commit, or is not applicable in a plain folder. Local file and test proof is still required.

- Work continues with the next unfinished item unless an independent stop condition applies.
