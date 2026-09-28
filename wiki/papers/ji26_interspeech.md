---
id: ji26_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-190
pdf: https://www.isca-archive.org/interspeech_2026/ji26_interspeech.pdf
---

# Automatic Curation of Large-Scale, High-Quality, Multi-Category Music Source Separation Dataset

[PDF](https://www.isca-archive.org/interspeech_2026/ji26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ji26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-190)

**TL;DR** — An automated pipeline harvests and cleans large-scale multi-instrument data from the web to build ACMID, a 7-stem music source separation dataset that improves downstream separation SDR by an average of 1.16 dB.

## Problem

Supervised music source separation models are heavily limited by the lack of fine-grained, multi-instrument training data beyond the standard 4-stem setup. While web-scale crawling offers abundant audio, it introduces severe label noise and audio-mismatch issues that degrade supervised training. Manual curation is too labor-intensive and costly to scale.

## Method

The authors propose a 4-step automated pipeline: defining a fine-grained 7-category taxonomy (Piano, Drums, Bass, Acoustic Guitar, Electric Guitar, Strings, Wind-Brass), training instrument-specific binary single-source detectors, harvesting raw audio via multilingual YouTube keyword queries ('instrument + solo' across 9 languages), and cleaning the segments. The binary classifier utilizes a frozen Dasheng self-supervised audio encoder, followed by time-dimension average pooling, three Linear-ReLU hidden layers ([D, D/2, D/4]), and a sigmoid output. Training data for the detectors combined MedleyDB, MoisesDB, Bach10, ARME-Strings, SynthTab, and Maestro, augmented with multi-source mixing, reverberation, dynamic compression, and EQ adjustments.

## Results

The single-source detectors achieve an average accuracy of 97.14% across the 7 categories. Evaluated on MoisesDB and MedleyDB test sets using Signal-to-Distortion Ratio (SDR), training MSS models with the cleaned ACMID dataset combined with MoisesDB and MedleyDB achieves a headline average SDR of 6.05 dB, compared to 4.89 dB for the baseline alone (a 1.16 dB improvement). Ablations demonstrate that the Dasheng encoder outperforms Music2Latent and CNN-based encoders, and a classification threshold of 0.995 provides the best quality-quantity trade-off for data retention.

## Code

- https://github.com/scottishfold0621/ACMID

## Applications

Speech and ML engineers building advanced music source separation systems requiring fine-grained instrument stem isolation.

## Limitations

Vocals are excluded from the taxonomy due to existing data abundance, and a strict cleaning threshold sharply reduces retained audio duration.

## Related

- (link related pages by id as the wiki grows)
