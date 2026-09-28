---
id: ramesh26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2568
---

# Duration-Aware Soft Targets for Text-Independent Supervised Phone Segmentation

**TL;DR** — Replaces hard phone-boundary labels with duration-scaled soft Gaussian targets for training phone segmentation models, giving statistically significant accuracy gains especially out-of-domain and across languages.

## Problem

Text-independent phone segmentation is usually trained on hard boundary labels that do not model the inherent uncertainty in where a phone transition actually occurs.

## Method

The authors replace hard boundaries near each transition with values from two unnormalized zero-mean half-Gaussian pulses whose standard deviations scale with the duration of neighboring phone segments, leaving labels farther from boundaries unchanged, and train a baseline BiGRU segmentation model with these soft targets.

## Results

The soft-target BiGRU reaches an R-val of 91.53% on the TIMIT test split, and experiments on out-of-domain and multilingual data show statistically significant improvements over hard-target training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More accurate automatic phone segmentation for pronunciation assessment, forced alignment, and speech corpus annotation pipelines.

## Related

- (link related pages by id as the wiki grows)
