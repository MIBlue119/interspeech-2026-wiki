---
id: lamba26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2382
---

# How Frequency Band Importance Affects Neural Network Predictions and Human Perception for Speech Quality Assessment

**TL;DR** — Explainability tools reveal that speech-quality-assessment networks focus mostly on a narrow low-frequency band, and a listening study finds humans similarly weight detrimental factors more than beneficial ones.

## Problem

Neural speech-quality-assessment models, commonly used to evaluate speech enhancement and noise suppression, don't always correlate well with human judgments, and it's unclear which frequency content drives their predictions versus human perception.

## Method

The authors use Shapley additive explanations, partial dependence plots, and perturbation analysis to identify the influential frequency bands for three quality-assessment models, then run a listening study to test whether human perception is sensitive to the same factors.

## Results

Both networks and humans are more sensitive to detrimental factors than beneficial ones, and the networks focus on a small portion of the input corresponding to low-frequency bands.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnosing and improving speech-quality-assessment metrics used to evaluate speech enhancement and noise-suppression systems, and identifying model biases/data gaps.

## Related

- (link related pages by id as the wiki grows)
