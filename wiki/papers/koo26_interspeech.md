---
id: koo26_interspeech
category: enhancement-separation
labels: [generative-model, robustness-noise]
institutions: ["MAGO", "KAIST"]
code: https://vere-flow.github.io/VeRe-Flow-Demo/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-712
pdf: https://www.isca-archive.org/interspeech_2026/koo26_interspeech.pdf
---

# VeRe-Flow: Guiding Flow Matching toward Clean Speech via Velocity Contrastive Regularization and Representation Alignment for Noise-Robust Bandwidth Expansion

*Sujin Koo, Sangyoon Kim, Ji Sub Um, Hoirin Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/koo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-712)

**Category:** `enhancement-separation` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — VeRe-Flow is a clean-guided flow matching framework for noise-robust bandwidth expansion that uses velocity contrastive regularization and representation alignment to suppress noise and restore high frequencies, achieving state-of-the-art LSD (1.10) and DNSMOS OVRL (3.12).

## Key contributions

- Introduces velocity contrastive regularization (VeCoR) to provide two-sided supervision in velocity space, attracting predicted velocity toward clean trajectories while repelling noisy ones.
- Integrates a representation alignment objective (REPA) that encourages intermediate model features to match clean self-supervised learning (SSL) representations.
- Combines convolutional residual blocks and noise-robust SSL conditioning (XEUS) within a unified flow-based noise-robust bandwidth expansion (NR-BWE) architecture.
- Demonstrates superior performance on Valentini-Botinhao, outperforming generative and non-generative baselines across LSD, all DNSMOS metrics, and subjective MOS.

## Problem

Traditional bandwidth expansion (BWE) models assume clean inputs and degrade severely when exposed to background noise, whereas standard speech enhancement methods remove noise but fail to reconstruct missing high-frequency components. Prior joint approaches struggle with the fundamental trade-off between accurate high-frequency spectral recovery and effective noise suppression. Furthermore, standard flow matching relies on one-sided supervision, which leads to ambiguous velocity estimation under noisy conditions and causes generative trajectories to drift away from the clean speech manifold.

## Method

The model parameterizes a conditional flow matching velocity field using a sandwich architecture containing a convolutional pre-stage, a central transformer stage, and a convolutional post-stage (each convolutional stage built from 4 DiC-style Conv ResBlocks using GroupNorm, activations, kernel size 3, and mid-block scale-and-shift time conditioning). The network receives a noisy low-resolution mel-spectrogram concatenated with frame-wise noise-robust SSL features from frozen XEUS (extracted every 20 ms and projected into the input space). Unlike standard flow matching which starts from a data-dependent prior, VeRe-Flow employs a Gaussian prior ($x_0 \sim \mathcal{N}(0, I)$) mapped to high-resolution clean mel targets ($x_1 = x_{\text{HR}}^{\text{clean}}$).

The training objective combines a velocity contrastive regularization loss ($\mathcal{L}_{\text{VeCoR}}$) and a representation alignment loss ($\mathcal{L}_{\text{align}}$). VeCoR pulls the predicted velocity toward the clean velocity vector while explicitly repelling it from the noisy velocity vector ($x_{\text{HR}}^{\text{noisy}}$) using a repulsion weight $\lambda_{\text{VeCoR}} = 0.05$. Representation alignment (adapted from REPA) minimizes cosine similarity losses between intermediate hidden states and clean XEUS SSL features with a weight $\lambda_{\text{align}} = 0.25$. At inference, the model solves the learned ordinary differential equation using an Euler solver with an extremely low number of function evaluations (NFE = 2), and wave reconstruction is performed using a pre-trained BigVGAN vocoder operating at 16 kHz with 80 mel bins.

## Experimental setup

Evaluated on the merged 84-speaker Valentini-Botinhao parallel clean-noisy corpus (combining the 28- and 56-speaker sets) with 20 unseen noise conditions in the test set. Inputs are simulated via Chebyshev Type-I low-pass filtering and downsampled to 8 kHz (reconstructed outputs evaluated at 16 kHz). Compared against non-generative baselines (UEE, MTL-MBE, EP-WUN, I-DTLN+, SDNet, Liu et al.) and generative baselines (NU-Wave2 and FLowHigh retrained under NR-BWE conditions). Metrics include Log-Spectral Distance (LSD), DNSMOS (SIG, BAK, OVRL), and 5-point Mean Opinion Score (MOS) evaluated via Amazon Mechanical Turk. Implementation uses the Adam optimizer for 400k iterations, batch size 16, learning rate $3 \times 10^{-4}$ with a cosine annealing schedule, and random SNR sampling between 5 dB and 20 dB during training.

## Results

VeRe-Flow achieves the lowest LSD (1.10) and highest DNSMOS OVRL (3.12) among all compared methods, alongside a top generative MOS of 4.14. Against retrained generative baseline FLowHigh (NFE=2, Euler solver), VeRe-Flow improves LSD from 1.12 to 1.10, SIG from 3.40 to 3.43, BAK from 3.91 to 3.97, and OVRL from 3.07 to 3.12. Diffusion baseline NU-Wave2 achieves an LSD of 1.35 and OVRL of 2.98 at NFE=48. Ablations show that XEUS SSL features outperform WavLM (LSD 1.15) and Wav2Vec 2.0 (LSD 1.47), and component-wise additions verify that XEUS primarily drives LSD reduction while REPA and VeCoR specifically boost DNSMOS SIG and BAK scores.

| Method | NFE | LSD ↓ | SIG ↑ | BAK ↑ | OVRL ↑ | MOS ↑ |
|---|---|---|---|---|---|---|
| GT | – | 0.00 | 3.51 | 4.04 | 3.22 | 4.30 |
| EP-WUN [3] | 1 | 1.23 | 3.50 | 2.94 | 2.86 | – |
| SDNet [5] | 1 | 1.16 | 3.29 | 3.32 | 2.92 | – |
| NU-Wave2† [9] | 48 | 1.35 | 3.29 | 3.93 | 2.98 | 3.76 |
| FLowHigh† [7] | 2 | 1.12 | 3.40 | 3.91 | 3.07 | 4.03 |
| Proposed VeRe-Flow | 2 | 1.10 | 3.43 | 3.97 | 3.12 | 4.14 |

## Limitations

The evaluation is restricted to English speech corpora and a fixed 8 kHz input to 16 kHz output bandwidth expansion setting. The method relies on a frozen external SSL model (XEUS) for feature extraction during both training and inference, adding computational overhead and dependency on pre-trained semantic representations. Additionally, performance has not been tested on extremely low signal-to-noise ratios below 5 dB or highly non-stationary real-world acoustic environments outside the Valentini-Botinhao dataset distribution.

## Why read this

Speech and generative modeling researchers should read this paper to learn how to inject two-sided velocity guidance and representation alignment into continuous flow matching frameworks to prevent trajectory drift in noise-corrupted generative tasks.

## Code

- https://vere-flow.github.io/VeRe-Flow-Demo/

## Applications

Noise-robust telephony, hearing aids, and legacy audio archiving where low-resolution, noisy speech must be restored to wideband studio quality.

## Institutions / 機構

MAGO, KAIST

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- [HFMSE: Harmonic-Guided Speech Enhancement with Flow Matching](li26l_interspeech.md) — shared technique · relatedness 2.5/3
- [LavaSR: Fast and Flexible Audio Bandwidth Extension via Vocos](sharma26c_interspeech.md) — same problem · relatedness 2.5/3
- [mmWave Radar Aware Dual-Conditioned GAN for Speech Reconstruction of Signals With Low SNR](karani26_interspeech.md) — same problem · relatedness 2.5/3
- [HWB-plus: A Lightweight Speech Bandwidth Extension Method with Separate Modeling for Consonants and Vowels](liu26k_interspeech.md) — same problem · relatedness 2.5/3
- [Seed-Enh: Generative Speech Enhancement in Decoupled Semantic and Timbre Spaces](shang26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
