---
id: kagoshima26_interspeech
category: few-shot
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-153
pdf: https://www.isca-archive.org/interspeech_2026/kagoshima26_interspeech.pdf
---

# POP-SED: Prototype Orthogonal Projection for Robust Few-shot Sound Event Detection

[PDF](https://www.isca-archive.org/interspeech_2026/kagoshima26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kagoshima26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-153)

**TL;DR** — POP-SED is a fine-tuning-free few-shot sound event detection method that projects event prototypes onto a subspace orthogonal to estimated background vectors, achieving an F-score of 62.35% on DCASE2024 Task 5 without encoder training.

## Problem

Few-shot sound event detection (SED) struggles when target events overlap with background sounds, and while existing adaptation methods rely on computational-heavy fine-tuning of domain and support data, achieving background robustness without parameter updates remains an open challenge.

## Method

The framework utilizes a fixed acoustic foundation model as an encoder (BEATs or CLAP) to extract frame-level features from support and query sets. It fits a von Mises-Fisher mixture model (vMFMM, with M=4 components) on unit hypersphere background and query features to identify background mean vectors. A robustness-aware support-set criterion optimizes subset selection of background vectors to project the target event prototype onto an orthogonal subspace, suppressing background interference before cosine-similarity thresholding.

## Results

Evaluated on the DCASE2024 Task 5 validation set (six subsets: HB, PB, ME, RD, PB24, PW) under a one-way five-shot setting with event-based F-measure. POP-SED with BEATs achieved a total F-score of 62.35% (and 53.21% with CLAP), approaching top-performing fine-tuned systems (70.60%) without requiring parameter adaptation. Ablations demonstrate that the proposed dual IoU selection criterion outperforms single IoU (+5.1%), vMFMM outperforms GMM (+4.3%), and waveform stretching significantly outperforms conventional resampling (+14.8%).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building on-site customizable few-shot acoustic monitoring and bioacoustic event detection systems where training data is scarce and background interference is high.

## Limitations

The complexity of background vector selection scales exponentially as 2^M with the number of vMFMM components M, potentially limiting larger mixture sizes.

## Related

- (link related pages by id as the wiki grows)
