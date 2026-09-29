---
id: moon26_interspeech
category: enhancement-separation
labels: [generative-model, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1715
pdf: https://www.isca-archive.org/interspeech_2026/moon26_interspeech.pdf
---

# SLICE: Speech Enhancement via Layer-wise Injection of Conditioning Embeddings

*Seokhoon Moon, Kyudan Jung, Jaegul Choo*

[PDF](https://www.isca-archive.org/interspeech_2026/moon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/moon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1715)

**Category:** `enhancement-separation` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — The paper introduces SLICE, a speech enhancement framework that handles compound corruptions (additive noise, reverberation, and nonlinear distortion) by injecting multi-task degradation embeddings layer-wise via the timestep embedding of a score-based diffusion model. It achieves an ESTOI of 0.80 and SI-SDR of 3.7 dB on multi-degradation test sets, outperforming shallow input conditioning which degrades performance below unconditioned models.

## Key contributions

- Reveals that shallow input-level conditioning injection significantly hurts compound-degradation speech enhancement performance, often performing worse than an unconditioned model.
- Proposes layer-wise conditioning injection via the timestep embedding of the NCSN++ score backbone, propagating degradation information across ~37 residual blocks without structural backbone modifications.
- Employs a frozen WavLM-Base encoder with three specialized auxiliary heads (noise classification, $T_{60}$ room impulse response regression, and distortion intensity estimation) to produce disentangled degradation representations.
- Demonstrates robust generalization to complex multi-degradation mixtures and diverse in-the-wild recordings from VOiCES, DAPS, and URGENT datasets.

## Problem

Real-world speech encounters simultaneous multi-type corruptions like environmental noise, room reverberation, and nonlinear recording artifacts, whereas prior score-based enhancement models (e.g., SGMSE+) and noise-aware methods (e.g., NASE, NADiffuSE) focus exclusively on additive noise. Furthermore, prior conditioning strategies inject external information solely at the input layer, which disrupts learned spectrogram processing and gets progressively diluted through deep score network backbones. Addressing compound corruptions effectively is crucial for robust real-world communication systems, but naive conditioning approaches often fail or underperform relative to unconditioned models.

## Method

The SLICE architecture builds upon the complex STFT score-based SDE framework (SGMSE+) and incorporates a degradation-aware encoder and a layer-wise conditioning mechanism. Given a degraded waveform, a frozen WavLM-Base encoder extracts frame-level features ($d_w=768$) which are mean-pooled and processed by a convolutional network into a shared representation $h \in \mathbb{R}^{d_h}$ ($d_h=256$). Three auxiliary heads supervise this representation via multi-task learning: an 11-class noise classifier using cross-entropy, a reverberation head regressing $T_{60}$ via MSE, and a distortion head estimating soft-clipping intensity via MSE.

The shared representation $h$ is projected into three branch-specific embeddings ($d_b=128$), concatenated, and mapped via an MLP to match the score network's timestep embedding dimension ($d=512$). This conditioning vector $c_{extra}$ is injected into every residual block by simple addition to the existing timestep embedding $e_t = \text{MLP}_{time}(t) + c_{extra}$, propagating through ~37 residual blocks without altering the NCSN++ backbone geometry. During training, classifier-free guidance (CFG) is implemented by independently dropping each branch embedding with probability $p=0.1$, enabling robust inference under missing degradation subsets.

The overall training loss combines the denoising score matching objective with auxiliary multi-task losses weighted by $\lambda = 0.3$. Inference utilizes an ordinary differential equation reverse sampler with 30 steps.

## Experimental setup

The base dataset is VoiceBank-DEMAND (11,572 training utterances). Multi-degradation training data is synthesized by augmenting clean utterances with DEMAND noise, synthetic room impulse responses ($T_{60} \in [0.3, 1.0]$ s), and soft-clipping nonlinear distortion ($\alpha \in [1.5, 5.0]$), totaling 34,716 utterances. Evaluations use a noise-only test set (824 files), a multi-degradation test set (2472 files), and in-the-wild datasets (VOiCES, DAPS, URGENT). Models are trained for 160 epochs using the Adam optimizer with learning rate $10^{-4}$, EMA decay of 0.999, and global batch size 32 across eight RTX 3090 GPUs. Metrics include PESQ, ESTOI, SI-SDR, and UTMOS.

## Results

On the multi-degradation test set, SLICE achieves an ESTOI of 0.80, SI-SDR of 3.7 dB, PESQ of 2.60, and UTMOS of 3.71, significantly outperforming input-addition conditioning (ESTOI 0.73, SI-SDR 1.4 dB) and unconditioned multi-degradation training (ESTOI 0.77, SI-SDR 2.3 dB). Noise-only pretrained baselines like MP-SENet and SGMSE+ collapse under multi-degradation conditions, yielding negative SI-SDRs and ESTOIs around 0.62-0.66.

Ablation studies show that removing auxiliary losses ($\lambda=0$) severely damages performance on combined noise-reverb-distortion mixtures (ESTOI drops from 0.647 to 0.517). Zeroing out the conditioning vector at inference collapses PESQ from 2.60 to 2.14, confirming heavy reliance on the conditioning signal. Uniform weighting performs identically to adaptive confidence weighting, indicating the score network inherently prioritizes the correct branches.

| System | PESQ | ESTOI | SDR (dB) | UTMOS |
|---|---|---|---|---|
| MP-SENet (noise-only) [19] | 2.39 | 0.62 | -0.3 | 3.00 |
| SGMSE+ (noise-only) [1] | 2.30 | 0.63 | 0.0 | 2.99 |
| NASE (noise-only) [12] | 2.22 | 0.64 | -0.5 | 2.99 |
| Multi-degradation w/o encoder | 2.60 | 0.77 | 2.3 | 3.70 |
| Multi-degradation w/ input addition | 2.49 | 0.73 | 1.4 | 3.62 |
| **SLICE (Ours)** | **2.60** | **0.80** | **3.7** | **3.71** |

## Limitations

The framework assumes degradations can be effectively modeled through synthetic combinations of additive noise, room impulse responses, and soft-clipping distortion, which may not capture every real-world acoustic artifact. Performance metrics show that reverberation remains challenging, yielding severe drops in SI-SDR on reverberant subsets even when perceptual quality (UTMOS) remains high. Additionally, evaluation is restricted to English-centric datasets, leaving multilingual generalizability unverified.

## Why read this

Speech and ML researchers studying conditional diffusion models or robust speech enhancement should read this paper to understand why injection depth matters more than conditioning presence alone. It provides a drop-in design pattern for deep generative backbones that avoids the pitfalls of input-level perturbations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust speech enhancement for telephony, VoIP conferencing systems, smart speakers, and hearing aids operating in severely corrupted acoustic environments.

## Institutions / 機構

KAIST

**Funding / 經費:** Institute for Information & Communications Technology Planning & Evaluation, Korea government (MSIT), National Research Foundation of Korea

## Related

- (link related pages by id as the wiki grows)
