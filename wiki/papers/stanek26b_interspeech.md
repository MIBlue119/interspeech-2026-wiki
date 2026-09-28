---
id: stanek26b_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-124
---

# Ethical and Technical Limits of Deepfake Speech Datasets

**TL;DR** — An audit of 39 deepfake speech datasets finds most lack demographic metadata (blocking fairness analysis) and share overlapping source corpora (inflating apparent cross-dataset generalization).

## Problem

Claims about deepfake speech detectors' robustness and fairness are only as credible as the datasets behind them, but no systematic audit of the deepfake speech dataset landscape existed.

## Method

The authors compile and analyze 39 deepfake speech datasets, examining accessibility, documentation, demographic and language coverage, dataset scale, and the underlying bona fide (real) speech sources used to build each dataset.

## Results

Fairness assessment is largely infeasible because most datasets lack demographic metadata (only a few include gender or language labels), preventing subgroup analysis; substantial overlap in underlying bona fide source corpora across datasets is also found, which can undermine cross-dataset evaluation and inflate reported generalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides researchers and dataset creators toward more rigorous, fairness-aware, and truly independent deepfake speech benchmark construction.

## Related

- (link related pages by id as the wiki grows)
