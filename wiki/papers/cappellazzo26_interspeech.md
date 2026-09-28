---
id: cappellazzo26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-417
---

# Dr. SHAP-AV: Decoding Relative Modality Contributions via Shapley Attribution in Audio-Visual Speech Recognition

**TL;DR** — A Shapley-value attribution framework shows audio-visual speech recognizers keep leaning on audio even under severe noise, exposing a persistent audio bias.

## Problem

How audio-visual speech recognition (AVSR) models actually balance acoustic versus visual evidence internally is poorly understood.

## Method

Dr. SHAP-AV applies Shapley-value attribution to six AVSR models across two benchmarks and varying SNR levels, introducing three complementary analyses: global modality balance, contribution dynamics during decoding, and temporal input-output alignment.

## Results

Models shift toward visual reliance as noise increases but never lose a strong audio bias, even under severe degradation; modality balance evolves during generation, temporal alignment holds under noise, and SNR is the dominant driver of modality weighting.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic tooling for AVSR researchers, motivating adaptive modality-weighting mechanisms and Shapley-based attribution as a standard robustness check.

## Related

- (link related pages by id as the wiki grows)
