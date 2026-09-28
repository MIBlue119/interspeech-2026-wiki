---
id: gao26e_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-916
pdf: https://www.isca-archive.org/interspeech_2026/gao26e_interspeech.pdf
---

# PhASE-Flow: Phonetic-Conditioned Acoustic Flow Matching in SSL Representation Domain for Speech Enhancement

*Jun Gao, Xiaobin Rong, Yu Sun, Dahan Wang, Jing Lu*

[PDF](https://www.isca-archive.org/interspeech_2026/gao26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gao26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-916)

**TL;DR** — PhASE-Flow is a phonetic-conditioned acoustic flow matching speech enhancement framework operating entirely in the WavLM self-supervised latent space, achieving top-tier perceptual quality and intelligibility with only 4 sampling steps.

## Key contributions

- Formulates speech enhancement entirely within the self-supervised representation domain using flow matching instead of traditional spectral or Mel domains.
- Proposes a decoupled strategy extracting acoustic representations from WavLM's first layer for generative flow modeling and phonetic representations from the final layer as conditioning.
- Adopts an x-prediction training objective paired with optimal transport conditional vector fields for stable loss convergence and high sampling efficiency.
- Demonstrates that 4-step Euler ODE discretization is sufficient to yield competitive performance without diffusion-based iterative bottlenecks.

## Problem

Traditional speech enhancement methods operate in spectral or Mel-spectrogram domains, which either lack phase information or exhibit heavy-tailed distributions where pitch, timbre, and linguistic content are tightly entangled. Generative models in these spectral spaces struggle with training instability (GANs), high inference latency (diffusion), or semantic degradation and hallucinations (discrete language models). This mismatch prevents generative systems from reliably preserving speaker identity and linguistic integrity under challenging acoustic conditions.

## Method

PhASE-Flow consists of a frozen WavLM encoder, a trainable DiT-based flow matching module, and a neural vocoder. The framework takes raw noisy waveforms and extracts acoustic representations from WavLM's 1st Transformer layer ($z_{a,y}$) and phonetic representations from the final layer ($z_{p,y}$). 

The generative backbone is a Diffusion Transformer (DiT) adapted from prior architectures, configured with 22 layers, 16 attention heads, a 1024 hidden size, and a 2048 feed-forward network dimension. It models the conditional distribution of clean acoustic representations ($z_{a,s}$) given the phonetic condition ($z_{p,y}$) via flow matching. The intermediate flow state $z_t$ follows a Gaussian probability path where optimal transport defines the vector field parameters $\mu_t = t z_{a,s}$ and $\sigma_t = 1 - t$. The model is trained using an $x$-prediction objective to directly predict the clean target representation from Gaussian noise and noisy conditions, with acoustic representations randomly dropped at probability $p_a$ to encourage robust utilization of phonetic cues.

During inference, the model derives the velocity vector field $v_theta$ from the predicted clean data $x_\theta$ and solves the ordinary differential equation using a 4-step Euler method with step size $\Delta t$. The generated enhanced acoustic representations are converted back into waveforms using an improved Vocos backbone vocoder consisting of a linear projection to a 768-dimensional latent space, an attention module, and 12 ConvNeXt blocks with an intermediate dimension of 2304, reconstructing waveforms via iSTFT with an FFT size of 1280 and hop length of 320.

## Experimental setup

The clean training corpus comprises 1,021 hours of filtered data from DNS5 LibriVox, VCTK, EARS, and LibriSpeech, retaining samples with DNSMOS > 3.0 and UTMOS > 4.0. Noise sources include DNS5, WHAM!, FSD50K, and FMA, mixed dynamically with RIRs at SNRs from -5 to 15 dB. Evaluation uses the DNS 2020 synthetic test set (no-reverb and with-reverb subsets) at 16 kHz. Baselines include TF-GridNet, StoRM, LLaSE-G1, AnyEnhance, and FlowSE. Models are trained on 4 NVIDIA RTX 4090 GPUs using AdamW for 100k iterations with batch size 128, a peak learning rate of $5 \times 10^{-4}$ with linear warm-up over 10% steps, and cosine annealing.

## Results

On the DNS 2020 no-reverb test set, PhASE-Flow achieves a DNSMOS of 3.40, UTMOS of 4.11, SpeechBERTScore of 0.93, Levenshtein phoneme similarity of 0.97, speaker similarity of 0.94, and a word error rate (dWER) of 2.79%, outperforming generative baselines like FlowSE (dWER 4.65%, UTMOS 3.76) and matching or beating discriminative TF-GridNet on perceptual metrics while avoiding hallucinations. On the with-reverb set, it delivers a DNSMOS of 3.36, UTMOS of 3.81, SBS of 0.85, LPS of 0.90, SpkSim of 0.75, and dWER of 13.19%, significantly outperforming all other generative approaches (e.g., StoRM dWER 49.65%, FlowSE dWER 15.58%). Ablations confirm that operating entirely in the SSL space with acoustic-phonetic separation yields superior quality over Mel-domain (Flow-M) or STFT-domain (Flow-S) alternatives.

| System | DNSMOS ↑ | UTMOS ↑ | SBS ↑ | LPS ↑ | SpkSim ↑ | dWER (%) ↓ |
|---|---|---|---|---|---|---|
| Noisy | 2.48 | 2.36 | 0.80 | 0.90 | 0.96 | 3.51 |
| TF-GridNet | 3.34 | 3.86 | 0.91 | 0.97 | 0.96 | 2.86 |
| StoRM | 3.31 | 3.73 | 0.89 | 0.95 | 0.95 | 4.41 |
| FlowSE | 3.38 | 3.76 | 0.90 | 0.94 | 0.89 | 4.65 |
| PhASE-Flow | 3.40 | 4.11 | 0.93 | 0.97 | 0.94 | 2.79 |

## Limitations

The framework relies on a frozen, large-scale SSL encoder (WavLM-Large) and independent neural vocoders, which increases the overall inference memory footprint and pipeline complexity compared to end-to-end waveform models. While 4-step generation accelerates sampling, performance under heavy reverberation still experiences speaker similarity and transcription degradation typical of generative speech priors. Evaluation is limited to 16 kHz clean-to-noisy/reverberant English datasets (DNS and LibriSpeech subsets), leaving multi-lingual robustness and cross-sampling-rate generalization unexplored.

## Why read this

Researchers building generative speech enhancement or representation-based speech synthesis systems should read this to see how moving flow matching directly into the self-supervised latent space bypasses the limitations of traditional spectral domains.

## Code

- https://anonymous.4open.science/w/phase-flow-demo-E6E1/

## Applications

Real-time speech enhancement and dereverberation for telecommunications, hearing aids, and voice-controlled assistant front-ends.

## Related

- (link related pages by id as the wiki grows)
