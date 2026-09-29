---
id: zhao26_interspeech
category: enhancement-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-218
pdf: https://www.isca-archive.org/interspeech_2026/zhao26_interspeech.pdf
---

# TF-MossFormer: Integrating Convolution Gated Local-Global Attentions for Enhanced Time-Frequency Domain Monaural Speech Separation

*Shengkui Zhao, Zexu Pan, Haoxu Wang, Biao Tian, Bin Ma, Xiangang Li*

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-218)

**Category:** `enhancement-separation`

**TL;DR** — TF-MossFormer is a time-frequency transformer for monaural speech separation that combines content-aware sliding-window local attention with global multi-head self-attention, achieving a state-of-the-art 24.4 dB SI-SDRi on WSJ0-2Mix at the large scale.

## Key contributions

- Proposes a time-frequency (TF) transformer architecture that models 2D spectrogram structure along both time and frequency axes instead of using 1D time-domain chunks.
- Introduces a content-aware sliding-window local attention mechanism with dynamically adapted receptive fields to capture fine-grained spectral continuity.
- Integrates convolutional gating (Conv-SwiGLU) and RMSGroupNorm around attention blocks to enhance feature selection and information flow.
- Establishes new state-of-the-art performance across small (6.0M), medium (16.9M), and large (25.4M) parameter scales on WSJ0-2Mix.

## Problem

Traditional time-domain dual-path models like DPRNN and SepFormer excel at global context but often struggle to capture fine-grained local spectral continuity, harmonic structures, and phoneme-level transitions essential for clean speech separation. While time-frequency alternatives such as TF-GridNet and SPMamba leverage 2D spectrograms, they rely on recurrent neural networks or state-space models that can be computationally expensive or limited in capturing complex local-global interactions. TF-MossFormer addresses this gap by unifying adaptive sliding-window local attention with global self-attention in the TF domain, bridging the trade-off between local detail retention and long-range speaker context modeling.

## Method

TF-MossFormer operates in the short-time Fourier transform (STFT) domain, taking concatenated real and imaginary spectrogram components as input. A 2D convolutional encoder followed by global Layer Normalization projects the features into a latent representation of shape D x T x F. The separator stacks B TF-MossFormer blocks, each alternating between a frequency modeling module and a temporal modeling module that share identical architectures.

Within each modeling module, the input tensor is permuted, processed by a convolutional SwiGLU feed-forward network (Conv-SwiGLU), normalized via RMSGroupNorm, and passed to the core Local & Global Multi-Head Self-Attention (MHSA) module. The optimal configuration (V1) cascades local sliding-window attention (with window sizes w_T = 31 and w_F = 7) followed by global MHSA, both augmented with Conv1D-Swish convolutional gates. This cascade preserves subtle short-range harmonic details before global attention aggregates utterance-level speaker identity. A final Conv-SwiGLU block and residual connection refine the features before a 2D transposed convolution decoder and iSTFT reconstruct the separate time-domain waveforms.

Models are trained using the ESPnet pipeline with the SI-SDR loss function. Optimization uses the AdamW optimizer with a weight decay of 1e-2, a linear learning rate warmup to 1e-3 over the first 4,000 steps, a plateau scheduler that halves the learning rate after 3 stagnant epochs, and gradient norm clipping capped at 5.

## Experimental setup

Evaluated on the WSJ0-2Mix dataset comprising 30 hours of training data (20,000 mixtures), 10 hours for validation (5,000 mixtures), and 5 hours for testing (3,000 mixtures) sampled at 8 kHz with signal-to-noise ratios between -5 dB and 5 dB. Baselines include Conv-TasNet, DualPathRNN, DPTNet, SepFormer, TF-GridNet, SPMamba, and TF-Locoformer across small, medium, and large tiers. Metrics reported are Scale-Invariant Source-to-Distortion Ratio improvement (SI-SDRi), Source-to-Distortion Ratio improvement (SDRi), model parameter count, and computational cost in MACS per second.

## Results

TF-MossFormer(S) (6.0M params, 99.5 G MACS/s) achieves 22.61 dB SI-SDRi, outperforming SPMamba (22.5 dB) while using less than half the computation, and beating TF-Locoformer(S*) (22.2 dB). At the medium scale, TF-MossFormer(M) (16.9M params, 283.4 G MACS/s) reaches 24.0 dB SI-SDRi, surpassing TF-GridNet (23.5 dB) and TF-Locoformer(M) (23.6 dB). At the large scale, TF-MossFormer(L) (25.4M params, 425.0 G MACS/s) establishes a new state-of-the-art with 24.4 dB SI-SDRi (24.5 dB SDRi), outperforming TF-Locoformer(L) (24.2 dB) and MossFormer2(L)+DM (24.1 dB).

Ablation studies demonstrate that cascading local attention before global attention (V1) outperforms the reverse order (V2: 24.45 dB SI-SDRi) and parallel layouts (V3: 22.49 dB SI-SDRi), while removing convolutional gating (V4) degrades performance to 22.51 dB. Moderate window sizes (w_T = 31, w_F = 7) consistently outperform both smaller windows and full-length attention (22.38 dB).

| System | Params [M] | SI-SDRi [dB] | MACS [G/s] |
|---|---|---|---|
| TF-Locoformer(S) | 5.0 | 22.0 | 85.9 |
| SPMamba(S) | 6.1 | 22.5 | 238.6 |
| **TF-MossFormer(S)** | 6.0 | **22.6** | 99.5 |
| TF-GridNet | 14.4 | 23.5 | 445.5 |
| TF-Locoformer(M) | 15.0 | 23.6 | 251.1 |
| **TF-MossFormer(M)** | 16.9 | **24.0** | 283.4 |
| TF-Locoformer(L) | 22.6 | 24.2 | 377.1 |
| **TF-MossFormer(L)** | 25.4 | **24.4** | 425.0 |

## Limitations

Evaluation is restricted to clean, 2-speaker simulated mixtures derived from the WSJ0 corpus at an 8 kHz sampling rate under controlled signal-to-noise ratios (-5 dB to 5 dB). The paper does not evaluate robustness against real-world acoustic reverberation, background noise, or a dynamic number of speakers exceeding two. Computational complexity remains substantial at larger scales (425.0 G MACS/s), which may constrain deployment on edge or resource-limited devices.

## Why read this

Audio and speech engineers building monaural source separation systems should read this paper to understand how cascading content-aware sliding-window local attention with global MHSA in the TF domain surpasses traditional recurrent or state-space models. The architectural blueprint and ablation insights on convolutional gating and attention ordering provide practical takeaways for designing efficient spectrogram-based neural networks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Monaural speech separation, cocktail party problem mitigation, and pre-processing front-ends for automatic speech recognition systems operating in multi-speaker acoustic environments.

## Institutions / 機構

Alibaba Group

## Related

- (link related pages by id as the wiki grows)
