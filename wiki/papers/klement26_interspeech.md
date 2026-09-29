---
id: klement26_interspeech
category: enhancement-separation
labels: [generative-model]
institutions: ["Brno University of Technology", "Johns Hopkins University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2511
pdf: https://www.isca-archive.org/interspeech_2026/klement26_interspeech.pdf
---

# Analysing Adversarial Priors for Data-driven Unsupervised Speech Enhancement

*Dominik Klement, Matthew Maciejewski, Sanjeev Khudanpur, Honza Černocký, Lukáš Burget*

[PDF](https://www.isca-archive.org/interspeech_2026/klement26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/klement26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2511)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — This paper presents a dual-branch unsupervised GAN-based speech enhancement framework that explicitly models both clean speech and noise to prevent source leakage. Utilizing aligned in-domain noise priors achieves a superior COVL of 3.08 and PESQ of 2.58 compared to prior single-branch unsupervised baselines.

## Key contributions

- Proposes a dual-branch unsupervised GAN architecture (derived from Neural Audio Codec) that independently estimates clean speech and noise components in parallel latent spaces.
- Demonstrates that mismatched or out-of-domain data priors directly cause source leakage due to an unbalanced mixture consistency loss.
- Shows that incorporating aligned, environment-specific noise prior data effectively acts as a noise sink, preventing speech over-suppression and reducing speech-to-noise/noise-to-speech leakage.
- Provides an empirical analysis of in-domain versus out-of-domain clean speech and noise priors on the VCTK+Demand benchmark.

## Problem

Deep learning-based speech enhancement traditionally requires large pairs of clean and noisy speech corpora, introducing a domain gap when deployed to real-world acoustic environments. Existing unsupervised methods avoid paired data by either relying on external black-box quality metrics (like DNSMOS) which require costly retraining, or using single-branch GAN models with consistency losses. These single-branch models estimate clean speech directly from noisy inputs without modeling noise, causing consistency constraints to overpower the speech prior and leading to severe noise leakage. This paper tackles this limitation by examining how data-driven priors affect unsupervised separation in a structured dual-branch system.

## Method

The architecture takes a noisy input audio waveform x_NS in R^T, mapped through a convolutional encoder E into a latent representation z_NS in R^{L x M} with a 320 downsampling ratio (50Hz at 16kHz) and 1024 embedding dimensions. This latent sequence is processed by two parallel RoFormer transformer branches (8 layers, 8 attention heads, 1536 feed-forward dimensionality) to produce separate clean speech and noise latent sequences (z_CS and z_N). A shared DAC-derived decoder Dec maps both back to time-domain signals (x^_CS and x^_N), which are combined using analytically computed scalar weights (alpha*, beta*) to reconstruct the input mixture x^_NS.

Training relies on LS-GAN adversarial losses across three discriminator ensembles: a DAC-like multi-period and multi-scale STFT discriminator (DNS) for input reconstruction fidelity, and two branch-specific single-band multi-scale STFT discriminators (D_CS and D_DN) enforcing clean speech and noise priors (P_CS and P_N). The generator minimizes a combined loss consisting of multi-scale mel spectrogram loss, SI-SDR consistency loss (L_con), adversarial and feature-matching losses, and a specialized energy-maximization loss designed to prevent mode collapse where the clean speech branch collapses into silence.

## Experimental setup

Evaluated on the VCTK+Demand dataset containing 28 training speakers and an 824-utterance 2-speaker test set, alongside out-of-domain data from URGENT Challenge Task 1. Models are trained on 3-second audio chunks for up to 50k iterations using AdamW (weight decay 0.02, peak LR 2e-4 with linear warmup and cosine decay), bfloat16 mixed precision, and gradient clipping of 1.0. Evaluated against input speech, MetricGAN-U (half/full), MOS-GAN, unSE, and unSE+ using DNSMOS, PESQ, CSIG, CBAK, COVL, and specialized SI-SDR-based source leakage metrics.

## Results

The dual-branch model achieves a headline PESQ of 2.58 and COVL of 3.08, outperforming prior single-branch unSE (COVL 3.05) and MOS-GAN (PESQ 2.40). Ablating the noise branch (Ours 1 branch) drops performance across all metrics (COVL falling from 3.08 to 2.90), proving the necessity of explicit noise modeling. Furthermore, using aligned in-domain noise priors reduces speech-to-noise leakage from 0.23 down to 0.02 and noise-to-speech leakage from 0.10 to 0.03. However, the model falls slightly behind MetricGAN-U (full) on absolute DNSMOS (2.99 vs 3.15) and trails in CBAK composite scores, indicating that background artifacts can occasionally appear in the enhanced speech estimate.

| Model | DNSMOS ↑ | PESQ ↑ | CSIG ↑ | CBAK ↑ | COVL ↑ |
|---|---|---|---|---|---|
| Input Speech | 2.54 | 1.97 | 3.35 | 2.44 | 2.63 |
| MGAN-U (full) [5] | **3.15** | 2.13 | 3.22 | 2.42 | 2.63 |
| MOS-GAN [6] | 2.91 | 2.40 | - | - | - |
| unSE [10] | 2.92 | 2.45 | **3.69** | 3.05 | 3.05 |
| unSE+ [11] | 2.94 | 2.48 | 3.31 | **3.07** | 2.85 |
| Ours (Dual-Branch) | 2.99 | **2.58** | 3.61 | 2.39 | **3.08** |

## Limitations

The framework assumes access to clean speech priors and environment-specific noise recordings (prior distributions), which may not be readily available for completely unconstrained or highly dynamic real-world environments. The evaluation is currently restricted to simulated datasets (VCTK+Demand and URGENT Challenge wind noise) at a 16kHz sampling rate. Additionally, the lower CBAK scores highlight that background artifacts can still persist in the enhanced audio output.

## Why read this

Speech and ML researchers working on unsupervised or zero-shot speech enhancement will learn why single-branch GANs fail due to consistency loss dominance and how dual-branch signal partitioning resolves source leakage.

## Code

- https://github.com/BUTSpeechFIT/USED

## Applications

Real-time speech communication pipelines, hearing aids, and voice call enhancement systems operating without paired clean speech training data.

## Institutions / 機構

Brno University of Technology, Johns Hopkins University

**Funding / 經費:** National Science Foundation, Technology Agency of the Czech Republic, Czech Ministry of Education, Youth and Sports

## Related

- (link related pages by id as the wiki grows)
