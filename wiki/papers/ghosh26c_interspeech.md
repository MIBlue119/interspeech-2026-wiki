---
id: ghosh26c_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-560
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26c_interspeech.pdf
---

# V-Align: Visual Forced Alignment via Phoneme to Video Optimal Path Traversal

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-560)

**TL;DR** — V-Align is a visual forced alignment framework that formulates timestamp localization in silent videos as optimal monotonic path traversal over a frame-phoneme lattice, achieving state-of-the-art MAE and frame accuracy on LRS2 and LRS3.

## Problem

Traditional audio-based forced aligners fail when audio is noisy, corrupted, or completely missing, necessitating Visual Forced Alignment (VFA) from silent talking-face videos. Existing VFA methods struggle to recover sharp, temporally consistent phoneme boundaries and rely heavily on explicit audio-derived supervision during training. This paper addresses these gaps by building a structured, globally consistent alignment model that can learn robust path structures without initial boundary supervision.

## Method

The framework extracts visual lip-motion embeddings using Visual Transformer Pooling (VTP) and contextual phoneme representations using XPhoneBERT, projecting both via stacked 1D convolutional networks. A dense frame-phoneme compatibility lattice is constructed using a Gaussian distance kernel controlled by temperature parameter tau, generating a soft traversal posterior. Discrete boundaries are decoded via dynamic programming (Viterbi-style monotonic decoding). Training follows a two-stage strategy: Stage 1 uses a forward-sum loss and a path binarization loss without boundary annotations, while Stage 2 refines word-level boundary precision using Montreal Forced Aligner (MFA) targets.

## Results

Evaluated on LRS2 and LRS3 datasets, V-Align is compared against baselines including KWS-Net, CTC-based alignment, Transpotter, DVFA, and He et al. On LRS3, Stage 1 achieves 82.9ms MAE and 79.6% accuracy, while Stage 2 reaches 56.9ms MAE and 88.5% accuracy. On LRS2, Stage 1 achieves 54.6ms MAE and 86.13% accuracy, while Stage 2 improves to 32.9ms MAE and 91.2% accuracy, reducing alignment error by 13.6ms on LRS3 and 17.3ms on LRS2 compared to prior best methods. Ablations confirm that combining forward-sum, binarization, and word-level supervision with optimal path decoding outperforms greedy or frame-argmax strategies.

## Code

- https://valign-interspeech.github.io/

## Applications

Engineers building automated subtitle generation, archival video processing, or talking-face video editing tools under silent or noisy acoustic conditions.

## Related

- (link related pages by id as the wiki grows)
