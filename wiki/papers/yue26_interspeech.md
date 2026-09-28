---
id: yue26_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1733
pdf: https://www.isca-archive.org/interspeech_2026/yue26_interspeech.pdf
---

# G2C-NET: A Grid-to-Continuous Neural Network for Sound Source Localization in Distributed Microphone Arrays

[PDF](https://www.isca-archive.org/interspeech_2026/yue26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yue26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1733)

**TL;DR** — G2C-NET introduces a grid-to-continuous neural network with an adaptive pairwise feature aggregator and continuous position estimation module for sound source localization in distributed microphone arrays, reducing quantization error without increasing grid density.

## Problem

Grid-based sound source localization with distributed microphone arrays faces a severe trade-off where coarse spatial grids introduce heavy quantization errors, while dense grids cause excessive computational complexity. Furthermore, existing architectures treat all microphone pairs equally, making them vulnerable to performance degradation caused by noisy or reverberant acoustic conditions. Addressing these issues is critical for robust acoustic front-end processing in smart homes and robotic navigation.

## Method

The architecture comprises two main stages: Global Likelihood Estimation (GLE) and Continuous Position Estimation (CPE). The GLE module extracts local pairwise features using GCC- or SLF-based functions combined with node geometry embeddings, and fuses them via an Adaptive Pairwise Feature Aggregator (APFA) driven by an attention mechanism with a learnable global query vector and key-value projections. The CPE module then avoids hard argmax grid selection by computing a likelihood-weighted centroid over the peak grid and its local neighborhood (window size R = 2). A composite loss function combines a distribution consistency loss (L1 norm against a Gaussian target distribution) with a direct coordinate regression loss (L2 distance on continuous coordinates) to supply fine-grained sub-grid supervision. Training uses simulated VCTK data with 15,000 samples (M in {5, 7} nodes, 625 discrete grids) and an Adam optimizer.

## Results

The evaluation utilizes a simulated test set of 5,000 samples (including harsh conditions with reverberation times up to 1.0s) and the real-world Libri-adhoc40 dataset via a balanced mixed fine-tuning strategy across variable node counts ranging from M = 4 to 7. The paper compares G2C-NET against classical SRP, GNN-based baselines, and LMSL. The proposed model achieves superior localization accuracy over baseline methods at equivalent grid resolutions by mitigating quantization errors and suppressing noisy pairwise features.

## Code

- https://github.com/Zhiyuan-Yue/G2C-NET.git

## Applications

Engineers building audio front-ends for smart home environments, video conferencing systems, and robotic auditory navigation using distributed or ad-hoc microphone arrays.

## Related

- (link related pages by id as the wiki grows)
