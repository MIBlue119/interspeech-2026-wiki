---
id: marchenko26_interspeech
category: speech-emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-579
pdf: https://www.isca-archive.org/interspeech_2026/marchenko26_interspeech.pdf
---

# TIMBRE: Layer-Wise Cross-Lingual Speech Emotion Recognition Across 49 Layers and 26 Corpora

[PDF](https://www.isca-archive.org/interspeech_2026/marchenko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/marchenko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-579)

**TL;DR** — This paper evaluates 31,850 cross-lingual speech emotion recognition experiments across 49 layers of wav2vec2-xls-r-1b and 26 corpora, identifying layer 15 as the optimal feature extraction sweet spot for cross-corpus transfer.

## Problem

As multilingual speech emotion recognition systems grow, it remains unclear which representational depths of self-supervised speech models allow emotional cues to generalize across typologically diverse languages. Prior studies either restricted their scope to final layers, evaluated within-corpus performance rather than cross-corpus transfer, or examined only a handful of corpora. Resolving this gap is essential for determining how to extract robust emotional features for zero-shot or cross-lingual deployment.

## Method

The author performs a large-scale layer-wise analysis of wav2vec2-xls-r-1b (48 transformer layers plus a CNN encoder, giving 49 extraction points) across 26 corpora spanning 23 languages and 14 families, standardized to 4 core emotions. Using fixed logistic regression classifiers ($C=1.0$) with mean-pooled representations, the study runs cross-corpus transfer experiments for every layer independently, applying training-corpus z-score normalization. It also compares these self-supervised representations against a 27-dimensional handcrafted acoustic baseline (comprising perturbation, frequency, MFCC, spectral, formant, and energy features) evaluated under identical cross-corpus conditions.

## Results

Grand-average cross-corpus F1 peaks at layer 15 (31% model depth, termed the CRIS layer with F1=0.392), dropping gracefully before collapsing by 24.6% at layer 45 down to baseline input levels. Mean-pooled wav2vec2 representations outperform the 27-dimensional acoustic feature baseline by 41% on average (F1 of 0.355 vs. 0.252), though handcrafted features retain 71% of this performance with orders of magnitude lower complexity, winning on 3 out of 26 corpora. Typological analyses reveal distinct layer profiles, such as a Romance U-curve and a tonal late-peaking rise, though per-corpus expressiveness and elicitation style ultimately drive transferability more strongly than genetic family membership.

## Code

- https://doi.org/10.5281/zenodo.20584918

## Applications

Speech and ML engineers building multilingual or zero-shot speech emotion recognition systems who need to select optimal feature extraction layers from large self-supervised models.

## Limitations

The evaluation relies predominantly on acted, read, or crowd-performed speech corpora rather than naturalistic dialogue, and the typology-specific subgroups rely on a small number of corpora.

## Related

- (link related pages by id as the wiki grows)
