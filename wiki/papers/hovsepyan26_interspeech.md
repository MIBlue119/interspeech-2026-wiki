---
id: hovsepyan26_interspeech
category: audio-understanding
institutions: ["Idiap Research Institute", "University of Zurich"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2168
pdf: https://www.isca-archive.org/interspeech_2026/hovsepyan26_interspeech.pdf
---

# Exploratory analysis of yellow mongoose vocalization: detection from in-the-wild recordings and call classification

*Sevada Hovsepyan, Imen Ben Mahmoud, Vanessa Rüegg, Marta Manser, Mathew Magimai Doss*

[PDF](https://www.isca-archive.org/interspeech_2026/hovsepyan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hovsepyan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2168)

**Category:** `audio-understanding`

**TL;DR** — This paper presents an exploratory analysis of yellow mongoose vocalization detection and call classification, showing that human speech-derived handcrafted spectrotemporal features combined with a Random Forest classifier outperform raw waveform CNNs for categorization.

## Key contributions

- Evaluated a speech-derived handcrafted feature representation (16x24 spectrogram flattened to 384 dimensions) combined with Random Forest for animal call classification, outperforming end-to-end CNNs.
- Curated and analyzed a dataset of 940 expert-annotated yellow mongoose pup vocalizations spanning 9 call types (including an ambiguous 'undefined' category).
- Benchmarked unsupervised (rVAD) and supervised (WhisperSeg) voice activity detection models on noisy in-the-wild directional microphone recordings.
- Introduced a temporal smoothing post-processing method (merging predictions within 0.1s to 1s thresholds) that significantly boosts VAD precision without hurting sensitivity.

## Problem

Analyzing vocal repertoires of facultatively social animals like the yellow mongoose is critical for testing the Social Complexity Hypothesis regarding the evolution of communication, but manual annotation is labor-intensive and error-prone due to naturalistic group settings. Existing machine learning tools are predominantly tailored to human speech or highly social model species, leaving a gap for robust, semi-automated acoustic analysis in wild, noisy environments. Furthermore, classifying ambiguous or potentially novel call types without predefined categories remains a key bottleneck for field researchers.

## Method

The classification pipeline downsamples pup vocalizations to 20.5 kHz, computes short-term Fourier transforms (STFT), averages power into F=24 frequency channels, and bins them into T=16 temporal segments. This standardized 16x24 spectrogram is converted to dB scale, flattened into a 1x384 feature vector, and classified using a Random Forest with 100 estimators via 5-fold stratified cross-validation. The deep learning baseline uses a 4-block CNN processing 16 kHz raw waveforms via convolution, batch normalization, max pooling, and ReLU activation, optimized with cross-entropy loss.

For in-the-wild vocalization detection, the study compares rVAD (an unsupervised robust voice activity detection model) and WhisperSeg (a supervised model pretrained on human and animal vocalizations) across 29 field recordings captured using a Sennheiser ME66 directional microphone at 48 kHz / 24-bit. Because raw detector outputs contain frequent brief false positives, a post-processing temporal smoothing step merges predictions falling within distance thresholds of 0.1, 0.5, or 1.0 second to optimize the precision-sensitivity trade-off for human annotators.

## Experimental setup

Evaluated on two distinct datasets collected in the Kalahari, South Africa: (1) 940 expert-annotated clean pup vocalizations across 9 types, and (2) 29 noisy field recordings (spanning several hours, containing 1,948 expert timestamps). Evaluated via 5-fold stratified cross-validation for classification and a 30% test / 70% train split for feature importance analysis. Baselines compared include a raw-waveform CNN and WhisperSeg (wSeg), measured using mean accuracy, macro/weighted F1-scores, overlap ratio, false positive rate, sensitivity, and precision.

## Results

The Random Forest classifier using handcrafted speech features achieved a mean 5-fold cross-validation accuracy of 0.684 (±0.016), consistently outperforming the raw-waveform CNN which achieved 0.610 (±0.029). On the test set, the Random Forest reached an overall accuracy of 0.67, with high precision on dominant classes like 'krr voc' (0.75) and 'begging call' (0.91), though rare classes ('downwhine', 'peepkrr', 'rattle', 'splitkrr') yielded 0.00 f1-scores due to extreme class imbalance and low support.

For in-the-wild detection, rVAD substantially outperformed WhisperSeg, achieving a high sensitivity of 0.81 (±0.27) compared to WhisperSeg's 0.16 (±0.21). Unmerged rVAD suffered from low precision (0.19), but applying a 1.0-second temporal merging threshold improved precision to 0.37 (±0.27) while preserving the 0.81 sensitivity.

| System / Condition | Accuracy / Sensitivity | Precision | F1-Score |
|---|---|---|---|
| CNN (Cross-Val) | 0.610 (±0.029) | - | - |
| Random Forest (Cross-Val) | 0.684 (±0.016) | - | - |
| RF Test Set (Weighted Avg) | 0.670 | 0.670 | 0.660 |
| rVAD (Unmerged) | 0.810 (Sensitivity) | 0.190 | - |
| rVAD (1.0s Threshold) | 0.810 (Sensitivity) | 0.370 | - |
| WhisperSeg (1.0s Threshold) | 0.170 (Sensitivity) | 0.180 | - |

## Limitations

The dataset suffers from severe class imbalance, dominated heavily by 'krr voc' samples while rare call types have sparse representation (e.g., splitkrr n=3), negatively impacting rare-class classification. Field detection models exhibit high false positive rates requiring manual post-processing, and the study is restricted to a single species (yellow mongoose) from one geographic region (Kalahari).

## Why read this

Speech and ML researchers building bioacoustic monitoring tools or exploring cross-domain feature transfer will benefit from seeing how human speech neurocomputational representations successfully parameterize animal syllable-like structures. It offers a practical blueprint for integrating unsupervised VAD with temporal smoothing to reduce human annotation bottlenecks in field ecology.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Semi-automated bioacoustic annotation pipelines, wildlife monitoring systems for behavioral ecology, and automated vocal repertoire cataloging for social animals.

## Institutions / 機構

Idiap Research Institute, University of Zurich

**Funding / 經費:** NCCR Evolving Language, Swiss National Science Foundation

## Related

- [Beyond task performance: Decoding bioacoustic embeddings with speech features](nolasco26_interspeech.md) — shared technique · relatedness 1.8/3
- [Ecologically-Constrained Task Arithmetic for Multi-Taxa Bioacoustic Classifiers Without Shared Data](nihal26_interspeech.md) — same problem · relatedness 1.7/3
- [USV-DETR: High-Resolution and Densely Supervised Detection of Ultrasonic Vocalizations](wei26d_interspeech.md) — same problem · relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
