---
id: mehralian26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3333
pdf: https://www.isca-archive.org/interspeech_2026/mehralian26_interspeech.pdf
---

# Predict-Then-Adapt: Inferring Coordinates from Speech for Continuous Geo-Conditioned Dialectal ASR

[PDF](https://www.isca-archive.org/interspeech_2026/mehralian26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mehralian26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3333)

**TL;DR** — This paper removes the requirement for known spatial metadata in geo-conditioned dialectal ASR by introducing a lightweight Coordinate Regression Head that infers speaker locations from speech at test time.

## Problem

Geo-conditioned adaptation methods like GLoRIA effectively improve dialectal ASR by leveraging continuous spatial coordinates rather than discrete dialect IDs. However, these techniques rely on the assumption that accurate speaker coordinates are available at inference time, which is frequently untrue, noisy, or unavailable in practice. Without metadata, applying continuous spatial conditioning becomes impossible, forcing a fallback to unconditioned models or rigid categorical labels.

## Method

The authors attach a lightweight Coordinate Regression Head (CRH) to a frozen ASR encoder to predict latitude and longitude coordinates directly from utterance-level representations using multi-head attentive pooling and a compact MLP with a SmoothL1 loss. Inference operates in two passes: first, coordinates are predicted with GLoRIA geo-conditioning disabled; second, the model decodes the transcription using GLoRIA enabled and conditioned on the estimated coordinates. The CRH adds under 0.1% additional parameters and introduces less than 3% inference latency overhead. The baseline ASR model is a 180M-parameter Dutch cascaded encoder dual features architecture featuring a 12-layer Conformer encoder and 6-layer Transformer decoder.

## Results

Evaluated on the 411-hour GCND corpus of spontaneous Dutch dialects, CRH achieves a mean great-circle localization error of 15–25 km when provided with 10–30 seconds of speech. Experiments demonstrate that GLoRIA is highly robust to coordinate perturbations within a 25 km radius, resulting in less than 1 WER point of degradation. Consequently, the two-pass CRH+GLoRIA setup outperforms rank-matched LoRA baselines and closely approaches the performance of adaptation using oracle true coordinates. Utterance duration ablations show that error rates saturate around 20–30 seconds of audio, with interpolation within training regions achieving better accuracy (approx. 15.44 km) than extrapolation into unseen regions (approx. 38.17 km).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech recognition engineers and developers working on dialect-heavy, low-resource, or geographically diverse spoken language systems where speaker metadata is missing at inference time.

## Limitations

Localization accuracy plateaus around 10-15 km even with longer audio segments due to inherent linguistic transition zones and acoustic ambiguity in dialect continuums, and coordinate regression performs noticeably worse when extrapolating to entirely unseen geographic regions.

## Related

- (link related pages by id as the wiki grows)
