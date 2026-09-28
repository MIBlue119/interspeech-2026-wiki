---
id: fu26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2465
pdf: https://www.isca-archive.org/interspeech_2026/fu26b_interspeech.pdf
---

# Learnable Schrödinger Bridge and Activations for Efficient Diffusion-based Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/fu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2465)

**TL;DR** — EffDiffSE+ is a single-iteration diffusion-based speech enhancement model employing a learnable Schrödinger bridge that achieves a top overall rank and a subjective MOS of 3.95.

## Problem

Generative speech enhancement models improve speech quality in noisy environments, but their iterative sampling nature results in high inference computational complexity. Standard Schrödinger bridge (SB) formulations require a costly multi-iteration reverse process during inference, limiting their applicability and efficiency. Solving this requires an adaptive, single-iteration approach that matches training and inference distributions without sacrificing enhancement performance.

## Method

The proposed EffDiffSE+ model combines a discriminative condition DNN and a generative bridge DNN in a hybrid architecture. First, it replaces vanilla multi-step sampling with a single-iteration reverse process using a Gaussian distribution initialization. Second, a two-layer auxiliary network adaptively estimates the mean and standard deviation for the bridge DNN's initial state. Third, several topology improvements are incorporated: sub-pixel convolutions to mitigate checkerboard artifacts, SnakeBeta periodic activations, an interaction module to fuse bottleneck features between condition and bridge encoders, and sub-band Conv/DeConv blocks to extract band-aware features. The model is trained using a psychoacoustic loss combined with an L1 time-domain waveform loss.

## Results

The model is evaluated on a 634.5-hour training set (Dtrain), a 32.7-hour validation set (Dval), and a 1000-waveform test set (Dtest) derived from the URGENT 2024 Speech Enhancement Challenge. Compared against eight generative baselines (including SGMSE+, BBED, SB, CRP, CDiffuSE, StoRM, Universe++, and EffDiffSE), EffDiffSE+ achieves a top overall rank of 1.27, an ESTOI of 0.84, an LPS phone fidelity score of 0.84, and a subjective MOS of 3.95 (close to clean speech at 3.96). It maintains a compact model size of 9.40 million parameters and an exceptionally low computational complexity of 3.84 GMAC/s.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building real-time, on-device, or low-latency speech enhancement systems for noisy and reverberant acoustic environments.

## Related

- (link related pages by id as the wiki grows)
