---
id: kim26j_interspeech
category: enhancement-separation
labels: [generative-model, robustness-noise]
institutions: ["KAIST"]
code: https://github.com/rlaehghks5/MECO
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1150
pdf: https://www.isca-archive.org/interspeech_2026/kim26j_interspeech.pdf
---

# MeCo: One-Step MeanFlow-based Corrector for Multi-Channel Speech Separation

*Dohwan Kim, Jung-Woo Choi*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1150)

**Category:** `enhancement-separation` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — MeCo is a one-step generative corrector based on Mean Flows that maps imperfect multi-channel speech separation outputs directly onto the clean speech manifold in a single step. It achieves state-of-the-art signal fidelity and human listening quality simultaneously across in-domain and out-of-domain environments.

## Key contributions

- Proposes MeCo, the first one-step generative corrector for multi-channel speech separation, bypassing the inference bottlenecks of iterative diffusion or flow models.
- Eliminates distribution mismatch by leveraging Mean Flows to learn the average velocity field, mapping the initial discriminative output directly to clean speech without trajectory truncation.
- Introduces Data-Space Optimization (DSO), combining an xr-loss (penalizing long displacement errors) with an Endpoint SI-SDR loss to optimize human listening quality and signal fidelity jointly.
- Demonstrates robust out-of-domain and cross-lingual generalization on unseen datasets (Librispeech + DEMAND) and low-resource languages using models trained solely on DeFTAN2 outputs.

## Problem

While deep discriminative models for multi-channel speech separation achieve high scores on objective signal fidelity metrics like SI-SDR, they often suffer from unnatural speech artifacts that degrade human auditory perception. Standalone generative models (such as diffusion and flow models) synthesize natural audio but incur high latency due to multi-step reverse iterations, while existing hybrid cascade correctors also rely on slow multi-step sampling. Although fast one-step correctors like Fast-GeCo exist, they require a two-stage training pipeline (score matching pretraining followed by SI-SNR distillation), suffer from distribution mismatch via heuristic trajectory truncation, and optimize solely for objective metrics rather than human perceptual quality.

## Method

MeCo operates in the complex Short-Time Fourier Transform (STFT) domain, utilizing an NCSN++ backbone adapted to process multi-channel spatial context via channel-wise concatenation of the noisy mixture and the discriminative estimate. Instead of instantaneous velocity, it parameterizes an average velocity field u_theta(xt, r, t, y, s_hat) over a finite time interval [r, t], eliminating the need for numerical ODE solvers and enabling true one-step generation (NFE = 1).

To optimize one-step performance, Data-Space Optimization (DSO) combines two objectives: an xr-loss, which penalizes predictions over longer displacement intervals (applying an implicit t^2 weighting that reduces to direct reconstruction error at t=1, r=0), and an Endpoint SI-SDR loss, which directly maximizes the negative scale-invariant signal-to-distortion ratio between the simulated one-step endpoint and ground-truth clean speech.

Models are trained on 4-second audio chunks sampled at 16 kHz using a 4-channel circular microphone array simulator. Discriminative separators (DeFTAN2-base, SpatialNet-small, CrossNet) provide initial estimates using negative SA-SDR loss for 150 epochs. MeCo correctors are trained for 100 epochs using the Adam optimizer with a learning rate of 1e-4, batch size of 4, exponential moving average of 0.999, and gradient clipping at 1.0, utilizing hyperparameters sigma_min = 0.0, sigma_max = 0.487, correction factor c = 0.5, and terminal time t_epsilon = 0.03.

## Experimental setup

Evaluated on in-domain WSJ0 mixed with WHAM! noise, and out-of-domain datasets including Librispeech mixed with DEMAND noise and 6 low-resource languages in studio environments mixed with DEMAND noise. Compared against discriminative baselines (DeFTAN2, SpatialNet, CrossNet), Fast-GeCo, and standard MeanFlow correctors. Metrics include PESQ, ESTOI, SI-SDR, DNSMOS, UTMOS, and NISQA. Implemented with PyTorch on a single RTX 4090 GPU.

## Results

MeCo consistently outperforms discriminative baselines and alternative generative correctors like Fast-GeCo across both objective fidelity metrics and reference-free human listening quality scores. For instance, using DeFTAN2 as the base separator on WSJ0+WHAM!, MeCo achieves an SI-SDR of 10.08 dB, PESQ of 1.93, ESTOI of 0.80, DNSMOS of 3.19, UTMOS of 3.70, and NISQA of 4.50, outperforming the baseline DeFTAN2 (SI-SDR 9.31 dB, DNSMOS 2.94) and Fast-GeCo.

Ablation studies on DSO confirm that combining the xr-loss and Endpoint SI-SDR loss yields superior performance compared to using either loss in isolation or standard MeanFlow. In out-of-domain evaluations on low-resource languages, MeCo maintains robustness, achieving an SI-SDR of 5.08 dB, DNSMOS of 3.11, and UTMOS of 2.82, outperforming Fast-GeCo and standard MeanFlow.

| System | PESQ ↑ | ESTOI ↑ | SI-SDR ↑ | DNSMOS ↑ | UTMOS ↑ | NISQA ↑ |
|---|---|---|---|---|---|---|
| DeFTAN2 (Baseline) | 1.88 | 0.75 | 9.31 | 2.94 | 3.12 | 3.92 |
| + Fast-GeCo (A) | 1.96 | 0.79 | 9.81 | 3.11 | 3.51 | 4.11 |
| + MeanFlow (B) | 1.78 | 0.77 | 10.01 | 3.04 | 3.63 | 4.43 |
| + MeCo (C, Ours) | 1.93 | 0.80 | 10.08 | 3.19 | 3.70 | 4.50 |

## Limitations

MeCo's independent speaker refinement relies strictly on channel-wise concatenation of spatial features, lacking explicit spatial modeling for complex multi-speaker overlap scenes. The evaluation is currently restricted to simulated acoustic environments with up to 3 speakers and specific microphone array geometries, and real-world acoustic mismatch (e.g., highly dynamic room impulse responses or unmodeled sensor noise) remains to be extensively tested.

## Why read this

Researchers and audio engineers working on real-time multi-channel speech enhancement and separation will learn how to bypass multi-step sampling bottlenecks using Mean Flows and Data-Space Optimization, achieving high human listening quality with minimal latency overhead.

## Code

- https://github.com/rlaehghks5/MECO

## Applications

Real-time multi-channel speech communication systems, smart speakers, hearing aids, and conferencing hardware requiring artifact-free speech separation with ultra-low latency.

## Institutions / 機構

KAIST

**Funding / 經費:** National Research Foundation of Korea, Ministry of Science and ICT of Korea, Ministry of Education of Korea

## Related

- [MeanFlow-TSE: One-Step Generative Target Speaker Extraction with Mean Flow](shimizu26_interspeech.md) — shared technique · relatedness 2.4/3
- [AV-FlowSep: Audio-Visual Target Speaker Separation via Flow Matching](tipaksorn26_interspeech.md) — shared technique · relatedness 2.4/3
- [TF-MoE: Time-Frequency Mixture-of-Experts for Efficient Speech Separation](hu26d_interspeech.md) — same problem · relatedness 2.4/3
- [Improving Audio Codec-based Speech Separation By Stacking Residual Vector Quantization Layers](dinh26_interspeech.md) — same problem · relatedness 2.4/3
- [PhASE-Flow: Phonetic-Conditioned Acoustic Flow Matching in SSL Representation Domain for Speech Enhancement](gao26e_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
