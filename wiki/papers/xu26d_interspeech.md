---
id: xu26d_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-833
pdf: https://www.isca-archive.org/interspeech_2026/xu26d_interspeech.pdf
---

# Speech Enhancement Based on Drifting Models

[PDF](https://www.isca-archive.org/interspeech_2026/xu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-833)

**TL;DR** — DriftSE frames speech enhancement as a distributional equilibrium problem using a semantic drifting field, achieving high-fidelity single-step denoising with a PESQ of 3.15 and SI-SDR of 16.1 dB on VoiceBank-DEMAND.

## Problem

Traditional discriminative speech enhancement models suffer from oversmoothing and robotic artifacts, while score-based diffusion models achieve high quality but require costly iterative sampling of 10 to 100 steps, creating a latency bottleneck for real-time systems. Trajectory compression and linearization methods attempt to address this, but they remain trajectory-based and difficult to approximate accurately in very few steps. This work introduces a distribution-matching approach that natively operates in a single step without relying on discretized ODE/SDE trajectories.

## Method

The framework, termed DriftSE, uses a learned Drifting Field that applies pulling forces toward clean speech features and repelling forces away from generated features within a semantic latent space. It utilizes frozen pre-trained self-supervised encoders, specifically HuBERT-Large, WavLM-Large, and DistilHuBERT, aggregating multi-layer features (e.g., layers 0, 1, and 2 for DistilHuBERT) to compute frame-wise latent drift. Two configurations are explored: a direct mapping function (with optional noise injection σ sampled from a log-normal distribution) and a stochastic conditional generator from a Gaussian prior. The generator is trained on 16 kHz audio processed via STFT using an AdamW optimizer, a batch size of 16, and a learning rate of 5 × 10^-4 for 100 epochs on an A6000 GPU.

## Results

Evaluated on the VoiceBank-DEMAND benchmark, the deterministic direct mapping variant (DistilHuBERT, σ=0) achieves a PESQ of 3.15 and SI-SDR of 16.1 dB in a single evaluation step, outperforming 30-step SGMSE+ and MeanFlowSE. The conditional generative variant (DriftSE*) achieves superior reference-free perceptual scores with a SCOREQ of 4.33 and DNSMOS of 3.64. On the DNS Challenge 2020 blind test set, DriftSE achieves state-of-the-art generalization with a WV-MOS of 2.65 and SCOREQ of 2.97. Unpaired cross-dataset and cross-gender experiments further validate its distribution-matching capability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech/ML engineers and developers building real-time communication systems, hearing aids, or voice assistants requiring high-quality speech enhancement with ultra-low latency single-step inference.

## Limitations

Unpaired cross-dataset and cross-gender mappings experience a drop in pairwise objective fidelity (such as PESQ falling to 2.00) due to the extreme difficulty of distribution shifting without direct pairing.

## Related

- (link related pages by id as the wiki grows)
