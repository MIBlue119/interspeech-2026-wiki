---
id: shimizu26_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-109
pdf: https://www.isca-archive.org/interspeech_2026/shimizu26_interspeech.pdf
---

# MeanFlow-TSE: One-Step Generative Target Speaker Extraction with Mean Flow

[PDF](https://www.isca-archive.org/interspeech_2026/shimizu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shimizu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-109)

**TL;DR** — MeanFlow-TSE achieves one-step generative target speaker extraction using mean-flow objectives, outperforming existing diffusion and multi-step flow matching baselines on Libri2Mix with an SI-SDR of 12.85 dB on the clean set.

## Problem

Generative target speaker extraction (TSE) models based on diffusion and standard flow matching provide high perceptual quality but require costly iterative sampling (multiple function evaluations), restricting their deployment in real-time and low-latency environments like hearing aids. Although adaptive deterministic flow matching (AD-FlowTSE) attempts to start from a mixture mixing-ratio initialization to reduce steps, it still relies on objectives designed for multi-step ODE integration. This work adapts mean-flow principles to TSE to bypass multi-step refinement entirely.

## Method

MeanFlow-TSE models the average velocity across trajectories conditioned on a speaker enrollment cue to jump directly from the input mixture to the target speech in a single inference step. It adopts a U-Net style Diffusion Transformer (UDiT) backbone with 16 transformer layers, 16 attention heads, and a hidden dimension of 768. The training recipe incorporates the $\alpha$-Flow curriculum strategy (transitioning from trajectory flow matching to mean-flow identity via a sigmoid schedule) and an auxiliary mixing ratio predictor using an ECAPA-TDNN feature extractor and MLP. The model is trained for 2,000 epochs on Libri2Mix using AdamW with a cosine annealing learning rate schedule and 16-bit mixed precision on eight NVIDIA L40 GPUs.

## Results

Evaluated on the Libri2Mix clean and noisy benchmark datasets, MeanFlow-TSE is compared against generative baselines including DiffSep+SV, DDTSE, DiffTSE, FlowTSE, SR-SSL, SoloSpeech, and AD-FlowTSE. On Libri2Mix clean, MeanFlow-TSE achieves an SI-SDR of 12.85 dB, PESQ of 3.83, and ESTOI of 0.95. On Libri2Mix noisy, it achieves an SI-SDR of 11.28 dB, PESQ of 3.48, ESTOI of 0.83, and speaker similarity (SIM) of 0.82, outperforming AD-FlowTSE and previous multi-step diffusion models while operating in a single inference step.

## Code

- https://github.com/rikishimizu/MeanFlow-TSE

## Applications

Speech engineers and developers building real-time communication systems, hearing aids, and robust automatic speech recognition front-ends that require low-latency target speaker extraction.

## Related

- (link related pages by id as the wiki grows)
