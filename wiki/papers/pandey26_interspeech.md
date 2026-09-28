---
id: pandey26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1914
---

# Beyond Speaker Independence: Evaluating Cross-Lingual Acoustic-to-Articulatory Inversion Across Finnish and Russian

**TL;DR** — A new Finnish-Russian bilingual EMA corpus shows articulatory inversion models tolerate cross-gender mismatch reasonably well, but degrade noticeably more under cross-language mismatch.

## Problem

Acoustic-to-articulatory inversion (AAI) is challenging under domain shifts from speaker attribute or cross-language changes, and existing benchmark resources are English-biased with limited speaker diversity, making systematic evaluation of such shifts hard.

## Method

The authors introduce FROST-EMA, a Finnish-Russian bilingual EMA corpus, and benchmark combinations of articulatory targets (raw EMA coordinates vs. tract variables), acoustic front-ends (MFCC vs. SSL features), and inversion back-ends (BiLSTM vs. a lightweight attention-based sequence model), defining protocols for cross-gender (within language) and cross-language (within gender) transfer.

## Results

Cross-gender mismatch causes moderate Pearson correlation declines (roughly 0.05-0.10) relative to the in-domain baseline, while cross-language mismatch causes larger drops (roughly 0.10-0.20).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Benchmarking and improving articulatory inversion systems intended to generalize across languages, e.g. for multilingual speech therapy or pronunciation tools.

## Related

- (link related pages by id as the wiki grows)
