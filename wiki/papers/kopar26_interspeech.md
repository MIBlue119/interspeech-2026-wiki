---
id: kopar26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2725
---

# Beyond Binary: Speech Representations Across the Cognitive Score Hierarchy

**TL;DR** — Self-supervised speech embeddings outperform hand-crafted acoustic features for most cognitive score levels, but hand-crafted features win at the top-level task of classifying mild cognitive impairment itself.

## Problem

It's unclear how well speech representations track the hierarchical structure of clinical cognitive assessments (individual task, cognitive domain, and global score levels) in mild cognitive impairment (MCI).

## Method

Using 5,754 German neuropsychological assessment recordings across six cognitive tasks and three score levels (task, domain, global), the authors compare hand-crafted acoustic features against self-supervised learning (SSL) embeddings.

## Results

SSL representations generally outperform hand-crafted features at lower (task/domain) levels, but this trend reverses for MCI classification itself; tasks with more response freedom show performance dilution at higher hierarchical levels ("specialist" representations), while highly structured tasks improve toward higher levels ("generalist" representations).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides feature and model selection for automated clinical speech analysis systems screening for mild cognitive impairment at different assessment granularities.

## Related

- (link related pages by id as the wiki grows)
