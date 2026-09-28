---
id: makarov26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3448
pdf: https://www.isca-archive.org/interspeech_2026/makarov26_interspeech.pdf
---

# Repurposing a Speech Classifier for Guided Diffusion-Based Speech Generation

*Rostislav Makarov, Timo Gerkmann*

[PDF](https://www.isca-archive.org/interspeech_2026/makarov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/makarov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3448)

**TL;DR** — This paper presents a parameter-efficient method to repurpose a conventionally trained noise-conditioned speech classifier as a backbone for diffusion generation by attaching a lightweight subnetwork trained via Denoising Score Matching. It achieves speech quality competitive with or exceeding a standard U-Net baseline on the SC09 benchmark while reducing trainable parameters and inference compute.

## Key contributions

- Demonstrates that a standard noise-conditioned speech classifier can be successfully repurposed for diffusion-based speech generation.
- Proposes a parameter-efficient adapter architecture (Score Subnet) that freezes the classifier backbone and trains only a lightweight decoder subnetwork on intermediate representations.
- Introduces 'gradient taps' derived from JEM-style marginal probability backpropagation to supply score-relevant signals alongside standard forward feature taps.
- Validates the method on the SC09 benchmark across unconditional, conditional, and low-data/zero-shot guidance regimes.

## Problem

Standard classifier guidance (CG) for diffusion models requires maintaining two separate models (a diffusion score model and a noise-conditioned classifier) and evaluating both at every reverse sampling step, making it computationally expensive. Joint Energy-based Models (JEM) attempt to unify classification and generation by interpreting logits as an unnormalized joint distribution, but training them directly leads to optimization instabilities due to an intractable normalizing constant. The paper addresses this gap by exploiting a frozen classifier solely for its intermediate representations and gradients, decoupling the discriminative training from a stable Denoising Score Matching objective for generation.

## Method

The method operates in log-Mel spectrogram space ($F=80$ Mel bins, FFT size 1024, hop length 256). The backbone is a pretrained noise-conditioned classifier (derived from a U-Net encoder via cross-entropy training on noisy inputs) whose weights $\phi^{\star}$ are completely frozen. To build the generative model, a decoder-style adapter called the Score Subnet is attached. At multiple stages $k$, the subnet extracts forward feature taps $h^{(k)}$ from the frozen classifier and gradient taps $g^{(k)}$ obtained by backpropagating the JEM-style marginal log-density $p_{\phi,t}(X_t)$.

These forward and gradient taps are RMS-normalized, projected to a shared channel dimension, and fused using cross-attention modules. Starting from the deepest fused tap, the decoder applies three ResBlocks per stage, upsamples, and merges with coarser-taps in a coarse-to-fine fashion until matching the original log-Mel resolution. A final GroupNorm-SiLU-Conv head yields a one-channel score estimate $s_\psi(X_t, t)$. The subnet parameters $\psi$ are optimized using Denoising Score Matching (DSM) under a variance-preserving (VP) SDE with 100 Euler-Maruyama reverse steps.

At inference, unconditional generation uses the subnet directly ($s_\psi$), while conditional generation applies classifier guidance by combining the subnet score with gradients from the frozen classifier using a guidance weight $\gamma$. This eliminates the need for a separate diffusion U-Net backbone.

## Experimental setup

Evaluated on the SC09 spoken-digit subset of the Speech Commands dataset using official splits. Audio is processed into 80-bin log-Mel filterbanks normalized to $[-1, 1]$ and synthesized back to waveforms using a pretrained 16 kHz HiFi-GAN vocoder. Baselines include DiffWave (24.2M params), SaShiMi (23.0M params), EDMSound (45.2M params), and an end-to-end U-Net score model (16.6M params). Metrics include ScoreQ MOS, Fréchet Audio Distance (FAD), Fréchet distance in ResNeXt embeddings (FID), Inception Score (IS), class-balanced mIS, and Activation Maximization (AM). Inference cost is measured in GMACs per diffusion step for a 1-second input.

## Results

For unconditional generation on SC09, the U-Net baseline (16.6M params, 14.56 GMACs) achieves a ScoreQ of 3.06, FAD of 0.74, FID of 0.17, and IS of 7.51. The proposed Score Subnet matches or improves these figures with a total of 12.3M parameters and only 4.4M trainable parameters, reducing compute to 12.07 GMACs while achieving a ScoreQ of 3.10, FAD of 0.84, FID of 0.17, and IS of 7.82. An ablation removing gradient taps drops performance (ScoreQ 3.04, FAD 0.90, IS 7.02) and reduces compute to 7.71 GMACs, demonstrating the utility of gradient taps. For conditional generation ($\gamma=3.0$), Score Subnet (12.3M total / 4.4M trainable, 16.44 GMACs) performs on par with the standard U-Net + Classifier pipeline (24.5M total, 22.74 GMACs) across metrics (ScoreQ 3.26 vs 3.25, FID 0.03 vs 0.03, IS 8.65 vs 8.36), while being more computationally efficient. In low-data and zero-shot guidance regimes (e.g., training on 3% data, labels {3,5,7}, or label 4 only), the Score Subnet consistently outperforms the standard classifier-guided U-Net in FID across sweeping guidance strengths $\gamma$.

| Model | Params Total [Train] (M) | GMACs / Step | ScoreQ MOS $\uparrow$ | FAD $\downarrow$ | FID $\downarrow$ | IS $\uparrow$ |
|---|---|---|---|---|---|---|
| U-Net (Uncond.) | 16.6 [16.6] | 14.56 | 3.06 | 0.74 | 0.17 | 7.51 |
| Score Subnet (Uncond.) | 12.3 [4.4] | 12.07 | 3.10 | 0.84 | 0.17 | 7.82 |
| Score Subnet w/o gradients | 11.9 [4.0] | 7.71 | 3.04 | 0.90 | 0.28 | 7.02 |
| U-Net + Classifier ($\gamma=3$) | 24.5 [16.6] | 22.74 | 3.25 | 0.82 | 0.03 | 8.36 |
| Score Subnet + Classifier ($\gamma=3$) | 12.3 [4.4] | 16.44 | 3.26 | 1.02 | 0.03 | 8.65 |

## Limitations

The evaluation is restricted to the closed-vocabulary, single-word SC09 dataset, meaning generalization to complex continuous speech, diverse acoustic environments, or large-scale text-to-speech corpora remains unverified. The reliance on a frozen classifier backbone means the generative capacity is fundamentally bounded by the quality and representational breadth of the underlying classifier. Vocoder dependency (HiFi-GAN) introduces an external source of potential artifacts during waveform reconstruction.

## Why read this

Speech and ML researchers working on efficient conditional generation or unified discriminative-generative models should read this paper to learn how to leverage intermediate features and JEM gradients from frozen discriminators for score-based synthesis without training separate heavy backbones.

## Code

- https://sp-uhh.github.io/classifier-to-diffusion/

## Applications

Efficient class-conditional speech generation, resource-constrained spoken keyword synthesis, and unified discriminative-generative speech modeling.

## Related

- (link related pages by id as the wiki grows)
