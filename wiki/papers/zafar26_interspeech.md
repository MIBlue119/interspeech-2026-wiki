---
id: zafar26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2862
---

# Rethinking Acoustic Variability Of ADReSS and ADReSSo Datasets For Dementia Detection

**TL;DR** — Randomly permuted labels can still reach competitive test performance on the widely-used ADReSS/ADReSSo dementia-detection datasets, exposing spurious correlations that undermine claimed state-of-the-art results.

## Problem

The ADReSS and ADReSSo datasets are the de-facto standard benchmarks for speech-based dementia detection, used by over half of recent ICASSP/Interspeech papers on the topic, yet their reliability had not been rigorously interrogated.

## Method

The authors systematically examine acoustic variability in the ADReSS and ADReSSo test sets, testing whether near-state-of-the-art performance can be reached with only two low-level acoustic features, whether classifiers trained on randomly permuted dementia labels can still perform competitively, and whether feature discriminability generalizes across Monte Carlo resampling.

## Results

Near-state-of-the-art classification is achievable with just two low-level acoustic features; classifiers trained on randomly permuted labels still reach competitive test performance; and feature discriminability does not generalize across resampling, with no stable discriminative features found — indicating strong reported results can stem from spurious correlations rather than pathology-relevant cues.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cautionary methodological guidance for researchers benchmarking dementia-detection systems on ADReSS/ADReSSo, urging more rigorous small-dataset evaluation practices.

## Related

- (link related pages by id as the wiki grows)
