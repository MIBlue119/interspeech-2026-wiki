---
id: shimizu26_interspeech
category: enhancement-separation
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-109
pdf: https://www.isca-archive.org/interspeech_2026/shimizu26_interspeech.pdf
---

# MeanFlow-TSE: One-Step Generative Target Speaker Extraction with Mean Flow

*Riki Shimizu, Xilin Jiang, Nima Mesgarani*

[PDF](https://www.isca-archive.org/interspeech_2026/shimizu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shimizu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-109)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — MeanFlow-TSE is a one-step generative target speaker extraction framework that uses mean-flow objectives and mixing-ratio-aware initialization, achieving state-of-the-art SI-SDR (18.80 dB on Libri2Mix Clean) in a single inference step.

## Key contributions

- Adapts the mean-flow and alpha-flow objectives to target speaker extraction for direct one-step generation from mixture to target speech.
- Implements a mixing-ratio-aware initialization strategy that skips noise-dominant trajectory segments by starting inference at the estimated mixing ratio t = λ.
- Employs an alpha curriculum training schedule transitioning smoothly from trajectory flow matching to mean-flow identity, avoiding Jacobian-vector product overhead.
- Outperforms multi-step diffusion and standard flow-matching baselines in speech quality and intelligibility (PESQ, ESTOI, SI-SDR) with a real-time factor of 0.018.

## Problem

Traditional target speaker extraction (TSE) uses discriminative mask estimation (e.g., ConvTasNet, SepFormer) which struggles with unseen acoustic conditions and artifacts. Recent generative diffusion and flow-matching models (like DiffSep+SV, DDTSE, FlowTSE) produce high perceptual quality but require 10 to 50 function evaluations (NFEs), prohibiting their use in low-latency real-time applications such as hearing aids. While AD-FlowTSE reduced steps using mixing ratios, it relied on standard rectified flow objectives designed for multi-step sampling, leaving performance gains on the table for one-step inference.

## Method

MeanFlow-TSE models the average velocity across trajectories rather than instantaneous velocities, enabling direct one-step jumps from the mixture to the target speaker. The neural backbone is a UDiT (U-Net style Diffusion Transformer) with 16 transformer layers, 16 attention heads, and a hidden dimension of 768, operating on complex STFT representations (hop size 128, window 510). 

During training, an alpha curriculum strategy shifts the objective from standard trajectory flow matching (alpha = 1) to mean-flow identity (alpha -> 0.005) using a sigmoid schedule across epochs, accompanied by an adaptive loss weight to stabilize training without requiring costly Jacobian-vector products. 

At inference, an auxiliary network comprising an ECAPA-TDNN feature extractor and an MLP estimates the mixing ratio lambda from the mixture and enrollment cues. This estimate sets the starting time t_start = lambda_hat on the trajectory, allowing the Euler solver to extract the clean target spectrum in precisely one function evaluation (NFE = 1).

## Experimental setup

Evaluated on the Libri2Mix corpus (combining train-360 and train-100 subsets for training, evaluated on dev and test sets) at 16 kHz using 6-second segments (3s mixture + 3s enrollment). Compared against baselines including DiffSep+SV, DDTSE, DiffTSE, FlowTSE, SR-SSL, SoloSpeech, and AD-FlowTSE. Evaluated using PESQ, ESTOI, SI-SDR, DNSMOS, OVRL, and SIM. Implemented on 8 NVIDIA L40 GPUs using AdamW (weight decay 0.01, cosine learning rate schedule from 1e-4 to 1e-5), trained for 2,000 epochs with a batch size of 32 and 16-bit mixed precision.

## Results

On the Libri2Mix Clean set, MeanFlow-TSE achieves an SI-SDR of 18.80 dB and a PESQ of 3.26, outperforming the direct AD-FlowTSE baseline by 1.31 dB in SI-SDR and 0.37 in PESQ. On the Libri2Mix Noisy set, it reaches an SI-SDR of 12.85 dB and a PESQ of 2.21, establishing new state-of-the-art results for intrusive metrics among generative TSE models.

NFE analysis confirms that performance peaks strictly at NFE = 1, as additional Euler steps degrade results due to accumulated discretization errors. Non-intrusive metrics (OVRL, DNSMOS) show competitive performance (OVRL 3.17 vs FlowTSE's 3.30), reflecting a mild trade-off where intrusive extraction fidelity is heavily prioritized over absolute subjective naturalness.

| System | PESQ (Clean) | ESTOI (Clean) | SI-SDR (Clean) | PESQ (Noisy) | SI-SDR (Noisy) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Mixture | 1.15 | 0.54 | 0.00 | 1.08 | -1.93 |
| FlowTSE [15] | 2.58 | 0.84 | - | 1.86 | - |
| AD-FlowTSE [10] | 2.89 | 0.90 | 17.49 | 2.15 | 12.69 |
| **MeanFlow-TSE** | **3.26** | **0.93** | **18.80** | **2.21** | **12.85** |

## Limitations

Evaluated exclusively on simulated anechoic two-speaker mixtures from Libri2Mix, leaving real-world reverberation and multi-speaker overlapping scenarios untested. The auxiliary mixing ratio predictor adds a small estimation dependency, and non-intrusive perceptual scores (OVRL/DNSMOS) lag slightly behind specialized multi-step generative models.

## Why read this

Researchers and audio engineers building real-time, low-latency speech extraction systems on edge hardware will find this paper essential reading for how to eliminate multi-step sampling bottlenecks in flow-matching models without sacrificing extraction performance.

## Code

- https://github.com/rikishimizu/MeanFlow-TSE

## Applications

Real-time hearing aids, live telecommunications, and robust front-ends for downstream automatic speech recognition in noisy environments.

## Institutions / 機構

Columbia University

**Funding / 經費:** National Institutes of Health, Marie-Josée and Henry R. Kravis

## Related

- (link related pages by id as the wiki grows)
