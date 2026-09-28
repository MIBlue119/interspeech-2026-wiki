---
id: kashyap26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1654
pdf: https://www.isca-archive.org/interspeech_2026/kashyap26_interspeech.pdf
---

# Quantifying Dimensional Independence in Speech: An Information-Theoretic Framework for Disentangled Representation Learning

[PDF](https://www.isca-archive.org/interspeech_2026/kashyap26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kashyap26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1654)

**TL;DR** — An information-theoretic framework evaluates cross-dimension statistical independence in handcrafted speech features, showing weak cross-dimension coupling with mutual information below 0.15 nats across six corpora.

## Problem

Speech simultaneously encodes emotional, linguistic, and pathological information, but disentanglement quality is typically assessed indirectly through downstream task performance rather than principled measures. Without knowing the statistical independence of these information streams, it remains unclear whether complete separation is theoretically achievable or how well disentangled representations generalize across diverse speaker populations and accents.

## Method

The framework integrates bounded neural mutual information estimators—specifically MINE with EMA stabilization and CLUB with variance clamping—alongside a non-parametric KSG validation estimator and adaptive uncertainty weighting. Features are partitioned into emotional (28D), linguistic (33D), and pathological (16D) operationally defined sets, plus source (9D) and filter (32D) components extracted via Praat, librosa, and openSMILE. Neural estimators use 2-layer MLPs with 256 hidden units and ReLU activations, trained with Adam across 8 dataset combinations.

## Results

Evaluated across six corpora (RAVDESS, IEMOCAP, L2-ARCTIC, GMU Speech Accent Archive, UA-Speech, and MDVR-KCL) using 500 stratified samples per combination. Cross-dimension pairs exhibit mean mutual information below 0.15 nats (Final mean MI: Emotion-Linguistic 0.12, Emotion-Pathology 0.10, Linguistic-Pathology 0.10) with tight estimation bounds (delta < 0.15 nats). Source-filter mutual information is substantially higher at 0.47 nats. Attribution analysis reveals source dominance for emotional dimensions at 80%, and filter dominance for linguistic and pathological dimensions at 60% and 58% respectively.

## Code

- https://github.com/avrpixel-design/P1

## Applications

Speech and ML engineers working on disentangled representation learning, emotion recognition, speaker verification, and clinical speech assessment can use this framework to evaluate feature independence.

## Limitations

The analysis relies on handcrafted acoustic descriptors rather than learned latent representations from self-supervised models.

## Related

- (link related pages by id as the wiki grows)
