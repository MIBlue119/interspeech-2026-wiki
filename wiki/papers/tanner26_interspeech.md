---
id: tanner26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-743
pdf: https://www.isca-archive.org/interspeech_2026/tanner26_interspeech.pdf
---

# wav2VOT: automatic estimation of voice onset time, closure duration, and burst realisation with wav2vec2

[PDF](https://www.isca-archive.org/interspeech_2026/tanner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tanner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-743)

**TL;DR** — The paper introduces wav2VOT, a modified wav2vec2-based tool for automatically estimating voice onset time, closure duration, and burst realisation, achieving high accuracy comparable to existing annotators while handling lenition.

## Problem

Existing automatic stop annotation tools like AutoVOT focus exclusively on voice onset time and assume a distinct stop burst, ignoring closure duration and reduced/lenited tokens where bursts are absent. Furthermore, traditional tools require extensive data formatting and programming expertise. Addressing these gaps is crucial to scaling phonetic and clinical speech studies without prohibitive manual annotation costs.

## Method

The authors modify the standard wav2vec2 architecture by replacing its convolutional feature encoder layers to use a stride of (2, 2, 2, 2), increasing temporal resolution from 20ms to 1ms. The downstream head performs frame-wise classification over four states: surrounding context window, closure, voice onset time, and lenition. Training combines a frame-wise cross-entropy loss with a connectionist temporal classification loss scaled by 0.05 to enforce valid sequence grammar. The base model is trained on 205,034 stop tokens from the Corpus of Spontaneous Japanese Core section using an 80GB NVIDIA H100 GPU for 10 epochs.

## Results

The base model trained on Japanese spontaneous speech achieved a framewise accuracy of 96.4%, a framewise F1-score of 0.93, a sequence word error rate of 0.06, and a burst realisation accuracy of 93.3%. Evaluated on five diverse English corpora (TIMIT, Switchboard, Sounds of the City, SPADE, and Buckeye), the base model successfully estimated 80% of voice onset times within a 5ms error threshold. Fine-tuning the model with a moderate amount of target data (200+ samples) improved voice onset time, closure duration, and lenition prediction accuracy across corpora with high recording variability.

## Code

- https://github.com/james-tanner/wav2VOT

## Applications

Phoneticians and clinical researchers use this tool to automatically annotate large-scale speech corpora for stop consonant characteristics, voicing contrasts, and lenition.

## Limitations

Fine-tuning with very small amounts of data (50-100 samples) on corpora with high recording variability can occasionally degrade performance relative to the zero-shot base model.

## Related

- (link related pages by id as the wiki grows)
