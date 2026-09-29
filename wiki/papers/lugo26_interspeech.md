---
id: lugo26_interspeech
category: enhancement-separation
labels: [efficient-on-device, generative-model, robustness-noise]
institutions: ["Technische Universitat Braunschweig", "GN Advanced Science"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2337
pdf: https://www.isca-archive.org/interspeech_2026/lugo26_interspeech.pdf
---

# DiffVQE: Hybrid Diffusion Voice Quality Enhancement Under Acoustic Echo and Noise

*Haljan Lugo, Ernst Seidel, Pejman Mowlaee, Ziyue Zhao, Tim Fingscheidt*

[PDF](https://www.isca-archive.org/interspeech_2026/lugo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lugo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2337)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `generative-model`, `robustness-noise`

**TL;DR** — DiffVQE is the first fully reproducible, single-step hybrid diffusion-based acoustic echo control and noise reduction model, outperforming Microsoft's discriminative DeepVQE in speech quality and intelligibility while using significantly less computational complexity (4.32 GFLOPS).

## Key contributions

- Introduces the first fully reproducible hybrid diffusion-based AEC and denoising model (DiffVQE) with publicly accessible training data.
- Applies a single-step score-based diffusion formulation adapted from EffDiffSE to drastically reduce inference computational load.
- Proposes architectural modifications to U-Net backbones, replacing strided convolutions with subpixel convolutions to mitigate aliasing.
- Achieves superior near-end speech quality, intelligibility, and lower model complexity/size compared to the state-of-the-art DeepVQE baseline.

## Problem

Joint acoustic echo control (AEC) and noise reduction in hands-free speakerphones require suppressing far-end reference signals nonlinearly distorted by loudspeakers and room acoustics while preserving near-end speech quality. Classical DSP methods combined with small neural networks or purely discriminative deep models (like DeepVQE) often struggle to balance aggressive echo suppression with preserving natural speech details, frequently introducing artifacts during double-talk scenarios. Furthermore, prior generative diffusion approaches for AEC lacked public reproducibility, clear mathematical formulations for reference signal fusion, or relied on private datasets.

## Method

DiffVQE uses a hybrid two-stage architecture comprising a discriminative Cond DNN and a generative Score DNN sharing a U-Net backbone. The Cond DNN takes early-fused microphone signal Y and far-end reference signal X as inputs via channel concatenation to perform robust initial echo suppression, yielding intermediate estimate S^_cond and condition C. The Score DNN then operates in the frequency domain via a single-step variance-exploding (VE) stochastic differential equation (SDE) score-matching framework, solving the reverse diffusion process using noise-consistent Langevin dynamics at a fixed diffusion time t~ = T = 0.3.

The training loss combines the compressed complex mean squared error (CCMSE) applied to both the conditional and final score outputs along with a denoising score-matching loss weighted by hyperparameter alpha = 0.005. The network architecture replaces standard transposed convolutions with subpixel convolutions to eliminate aliasing, and includes specialized DSBlock/USBlock modules. Base and small variants adjust channel dimensions across layers (e.g., base channels {11, 16, 23, 33, 50}).

During inference, the non-causal pipeline processes 16 kHz audio through a K-point STFT (frame length 512, hop size 128, square-root Hann window, frequency bins padded from K=257 to 260) with far-end delay compensation via GCC-PHAT, running efficiently as a single-step model.

## Experimental setup

Models were trained on ~600 hours of synthetic data (71,777 samples, 30s each) generated using the Interspeech 2025 URGENT Challenge corpora, filtered via DNSMOS, SigMOS, UTMOS, NISQA, and SQUIM SDR, plus 23 hours from the ICASSP 2023 AEC Challenge. Validation used D_val (TIMIT, ETSI noise, Aachen impulse responses) and testing used the reverberant blind test set D_test from the ICASSP 2023 AEC Challenge. Baselines included unprocessed signals, clean references, and a retrained DeepVQE model. Evaluation metrics encompassed AECMOS (DT/ST Echo, DT/ST Other), DNSMOS (OVRL, SIG, BAK), PESQ, LPS (Levenshtein phone similarity), and ESTOI, alongside parameter count, FLOPS, and RTF measured on an AMD EPYC 9575F CPU.

## Results

On the validation set D_val, DeepVQE achieved slightly better echo suppression (DT Echo 4.66 vs 4.65 for DiffVQE), but DiffVQE consistently outperformed it across quality and intelligibility metrics, achieving a top average rank of 1.3 compared to DeepVQE's 2.5. Specifically, DiffVQE reached a PESQ of 2.63 (vs 2.30 for DeepVQE) and ESTOI of 0.68 (vs 0.60). Similar gains appeared on the ICASSP 2023 D_test blind set, where DiffVQE secured an average rank of 1.17. Notably, the smaller variant DiffVQE-S achieved these gains with only 3.43M parameters and 4.32 GFLOPS (an RTF of 0.172), consuming roughly 10.3% of the computational complexity of DeepVQE (42.24 GFLOPS).

| Method | # Param. | # FLOPS | RTF | DT Echo | DT Other | PESQ | ESTOI | Avg. Rank ↓ |
|---|---|---|---|---|---|---|---|---|
| Unprocessed | — | — | — | 1.70 | 4.01 | 1.62 | 0.41 | — |
| Clean | — | — | — | 4.58 | 4.21 | 4.64 | 1.00 | — |
| DeepVQE | 5.29M | 42.24G | 0.317 | **4.66** | 3.83 | 2.30 | 0.60 | 2.5 |
| DiffVQE-S | **3.43M** | **4.32G** | **0.172** | 4.63 | 4.05 | 2.50 | 0.65 | 2.0 |
| DiffVQE | 5.13M | 5.37G | 0.185 | 4.65 | **4.10** | **2.63** | **0.68** | **1.3** |

## Limitations

The model is currently non-causal, which precludes real-time deployment on ultra-low-latency edge applications without buffering adjustments. The evaluation relies primarily on simulated acoustic echo datasets and synthetic room impulse responses rather than complex real-world recorded dual-talk scenarios with severe unmodelled hardware distortions. Language coverage and generalization are bounded by the underlying English-dominated training corpora (TIMIT and URGENT challenge datasets).

## Why read this

Speech and audio researchers building generative enhancement pipelines should read this paper to see how single-step score-based diffusion can match or exceed discriminative state-of-the-art AEC models while drastically reducing computational overhead. It provides a blueprint for reproducible hybrid diffusion architectures complete with data preprocessing recipes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Hands-free communication systems, smart speakers, automotive speakerphones, and teleconferencing software requiring simultaneous acoustic echo cancellation and background noise suppression.

## Institutions / 機構

Technische Universitat Braunschweig, GN Advanced Science

## Related

- (link related pages by id as the wiki grows)
