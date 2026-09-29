---
id: xu26d_interspeech
category: enhancement-separation
labels: [generative-model]
institutions: ["Victoria University of Wellington", "Lincoln University", "GN Advanced Science"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-833
pdf: https://www.isca-archive.org/interspeech_2026/xu26d_interspeech.pdf
---

# Speech Enhancement Based on Drifting Models

*Liang Xu, Diego Caviedes-Nozal, W. Bastiaan Kleijn, Longfei Felix Yan, Rasmus Kongsgaard Olsson*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-833)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — DriftSE frames speech enhancement as a distributional equilibrium problem using a learned latent drifting field, achieving high-fidelity single-step (1-NFE) denoising without iterative sampling.

## Key contributions

- Formulates speech enhancement as a pushforward distribution alignment problem using a drifting field, bypassing the need for multi-step diffusion sampling.
- Proposes two distinct generative paradigms: a direct mapping variant (with optional noise injection σ) and a stochastic conditional generator from a Gaussian prior.
- Computes multi-layer frame-wise latent drifting using frozen self-supervised speech models (HuBERT, WavLM, DistilHuBERT) to balance acoustic fidelity and semantic content.
- Demonstrates native fully unpaired learning capabilities across cross-dataset and cross-gender generative tasks.

## Problem

Traditional speech enhancement relies heavily on discriminative regression objectives, which tend to introduce spectral oversmoothing and robotic artifacts, or score-based diffusion models, which require computationally heavy iterative sampling (10-100 steps) that creates a latency bottleneck. Although trajectory compression and consistency distillation aim to bypass this, they remain bound to approximating curved continuous probability flow trajectories. DriftSE replaces trajectory discretization with a native one-step distributional equilibrium approach that avoids trajectory accumulation errors while remaining fast enough for real-time applications.

## Method

DriftSE maps input noisy speech spectrograms (or noise priors) to clean targets using an NCSN++V2 architecture (without time embedding) operating on 16 kHz audio processed via STFT (510-point Hann window, 128 hop length) with spectral compression. The training objective minimizes a latent Drifting Field that combines an attraction force toward positive clean reference frames and a repulsion force away from model-generated negative frames. This drift is computed in a semantic latent space via a frozen SSL extractor (HuBERT-Large, WavLM-Large layers 6, 12, 24, or DistilHuBERT layers 0, 1, 2) using an exponential similarity kernel across multi-temperatures (τ ∈ {0.1, 0.5, 1.0}).

In the direct mapping formulation, enhanced speech is generated via x̂ = fθ(y + σϵ), where the noise injection level σ is sampled from a truncated log-normal distribution log σ ~ N(-3.0, 1.2) over [0.01, 0.3] to smooth the acoustic distribution during training (set to σ=0 at inference for deterministic mapping). In the conditional generator formulation, a Gaussian noise prior ϵ is mapped to the target distribution conditioned on the noisy STFT spectrogram y. By aggregating the drift across hierarchical encoder layers, the model guides the generator's pushforward distribution toward equilibrium with the clean data distribution.

## Experimental setup

Evaluated on the VoiceBank-DEMAND (VB-DMD) benchmark (10,802 training utterances dynamically mixed with 18 noise types at SNRs {0, 5, 10, 15} dB; 824 test utterances) and the DNS Challenge 2020 blind test set (300 real-world recordings). Compared against MetricGAN+, UNIVERSE++, SGMSE+ (30 steps), ROSE-CD, SBCTM, and MeanFlowSE. Metrics include PESQ, SI-SDR, ESTOI, DNSMOS, SCOREQ, and WV-MOS. Implemented using an A6000 GPU with AdamW (batch size 16, learning rate 5×10^-4, weight decay 0.01) for 100 epochs.

## Results

On the VB-DMD dataset, the deterministic direct-mapping DriftSE (DistilHuBERT, σ=0) achieves a PESQ of 3.15 and SI-SDR of 16.10 dB in a single step (1 NFE), outperforming multi-step SGMSE+ (PESQ 2.90, SI-SDR 16.9 dB over 30 steps) and single-step MeanFlowSE on PESQ. The conditional variant DriftSE* reaches a top SCOREQ of 4.33 and DNSMOS of 3.64. When incorporating auxiliary PESQ and SI-SDR losses (DriftSE†), performance scales to PESQ 3.45 and SI-SDR 20.60 dB.

On the real-world DNS Challenge 2020 blind test set, DriftSE (DistilHuBERT) establishes strong generalization with a state-of-the-art WV-MOS of 2.65 and SCOREQ of 2.97. Unpaired cross-dataset training (mapping VoiceBank to DNS targets) achieves a DNSMOS of 3.61 and SCOREQ of 3.92, though pairwise metrics drop significantly (PESQ 2.00, SI-SDR 6.60 dB) due to the lack of rigid frame-level pairing.

| System | NFE | PESQ | SI-SDR (dB) | ESTOI | DNSMOS | SCOREQ |
|---|---|---|---|---|---|---|
| SGMSE+ | 30 | 2.90 | 16.90 | 0.85 | 3.48 | 3.98 |
| ROSE-CD | 1 | 3.49 | 17.80 | 0.87 | 3.49 | 4.23 |
| MeanFlowSE | 1 | 2.81 | 19.97 | 0.88 | 3.58 | 4.25 |
| DriftSE (DistilHuBERT, σ=0) | 1 | 3.15 | 16.10 | 0.86 | 3.47 | 4.08 |
| DriftSE* (Conditional) | 1 | 2.99 | 17.98 | 0.86 | 3.64 | 4.33 |
| DriftSE† (With Aux Loss) | 1 | 3.45 | 20.60 | 0.87 | 3.49 | 4.11 |

## Limitations

Unpaired training setups exhibit a substantial drop in direct sample-matching fidelity metrics (e.g., PESQ dropping to 2.00) because distributional equilibrium matches global manifolds rather than individual time-aligned samples. Cross-gender unpaired mapping forces speaker characteristic alterations, reducing perceptual scores when ground-truth references are absent. The reliance on a frozen SSL feature extractor also bounds representation quality to the domain coverage of the pre-trained encoder.

## Why read this

Researchers and engineers looking to bypass the latency bottleneck of multi-step diffusion models should read this paper to learn how distributional equilibrium and latent drifting fields can be adapted for high-fidelity, single-step speech generation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech communication systems, hearing aids, and telephony pipelines requiring low-latency single-step noise suppression.

## Institutions / 機構

Victoria University of Wellington, Lincoln University, GN Advanced Science

## Related

- [Schrödinger Bridge Mamba for One-Step Speech Enhancement](yang26e_interspeech.md) — same problem · relatedness 2.9/3
- [Learnable Schrödinger Bridge and Activations for Efficient Diffusion-based Speech Enhancement](fu26b_interspeech.md) — same problem · relatedness 2.9/3
- [Time-Unconditional Generative Speech Enhancement via Autonomous Rectified Flow](zhang26z_interspeech.md) — same problem · relatedness 2.9/3
- [Absorbing Discrete Diffusion for Speech Enhancement](gonzalez26_interspeech.md) — same problem · relatedness 2.9/3
- [PhASE-Flow: Phonetic-Conditioned Acoustic Flow Matching in SSL Representation Domain for Speech Enhancement](gao26e_interspeech.md) — same problem · relatedness 2.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
