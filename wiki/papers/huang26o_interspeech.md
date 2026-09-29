---
id: huang26o_interspeech
category: enhancement-separation
labels: [efficient-on-device]
institutions: ["International Audio Laboratories Erlangen", "Fraunhofer IIS", "Friedrich-Alexander-Universitat Erlangen-Nurnberg"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2234
pdf: https://www.isca-archive.org/interspeech_2026/huang26o_interspeech.pdf
---

# Neural Directional Coding: Joint Spatial Coding and Filtering with Configurable Directivity Patterns

*Weilong Huang, Emanuël A. P. Habets*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2234)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`

**TL;DR** — Neural Directional Coding (NDC) jointly compresses microphone array spatial cues and estimates a configurable spatial filter, achieving superior speech quality at 0.25 kbps with 1.4M parameters compared to a 7.5 kbps baseline with 90.8M parameters.

## Key contributions

- Proposes a joint spatial coding and filtering framework (NDC) that bypasses full array transmission, encoding only spatial features while filtering a single transmitted reference channel.
- Combines residual vector quantization (RVQ) with feature-wise linear modulation (FiLM) to support real-time, user-defined high-order directivity patterns during inference.
- Introduces a two-stage training strategy: initial generalized source coding via basic patterns followed by pattern-adaptive mask estimation across varied directivity configurations.
- Demonstrates ultra-low-bitrate compression of a 4-channel, 16 kHz microphone array down to 0.25–0.5 kbps using a lightweight 1.4M-parameter model.

## Problem

Transmitting raw multichannel microphone array signals for spatial processing at a receiver requires excessively high bit rates, rendering standard spatial audio setups impractical for bandwidth-constrained communication. Prior cascaded pipelines that independently compress array signals using codecs like SpatialCodec and apply spatial filtering via user-defined neural directional filtering (UNDF) lead to massive model footprints and accumulated quantization errors. Furthermore, parametric directional audio coding schemes often lack frequency invariance or flexible high-order control over directional sensitivity. Joint spatial coding and filtering is critical to bridge the gap between low-bitrate transmission and high-fidelity virtual directional microphone synthesis.

## Method

The NDC framework decouples transmission into a standard single-channel codec for a reference microphone (using EVS at 12.8 kbps) and an auxiliary spatial stream. A 4-channel microphone array input tensor $\bar{\mathbf{y}} \in \mathbb{R}^{2 \times Q \times F \times_T}$ passes through a spatial information coding module $\Psi_{\text{cod}}$ adapted from SpatialCodec, configured with a latent dimension of $L=2$, and quantized via residual vector quantization (RVQ) with a temporal downsampling factor of 2. The resulting compressed spatial representation $\mathbf{S}$ is concatenated with the reference STFT $Y_{\text{ref}}$ to form input tensor $\mathbf{I}$.

The spatial filter estimation module $\Psi_{\text{est}}$ takes $\mathbf{I}$ and a sampled directivity pattern vector $\Lambda_t$ (evaluated at $D=72$ discrete angles). It processes the features using a bidirectional LSTM across frequency bins, incorporates pattern variations dynamically via feature-wise linear modulation (FiLM), and passes them through a unidirectional temporal LSTM. A final linear layer with Tanh activation outputs a complex mask $M(f,t)$ applied to the reference channel to reconstruct the target virtual directional microphone signal $\hat{Z}(f,t)$.

The training regimen relies on a two-stage process: stage one trains the encoder/quantizer on 32 hours of 4-second random source configurations using a first-order cardioid pattern, and stage two freezes the encoder while training the decoder and mask estimator on 144 hours using 60 randomized directivity patterns per setup (orders up to $J=10$). Optimization is guided by a hybrid time-domain L1 and multi-resolution STFT magnitude loss.

## Experimental setup

Training utilized speech signals from LibriSpeech ('train-clean-360', 'dev-clean'), while evaluation used the EARS dataset. Evaluations employed a 4-microphone uniform circular array (3 cm diameter) plus a center reference, sampled at 16 kHz. Performance was measured using wideband/narrowband directivity pattern wideband power ratios, Signal-to-Distortion Ratio (SDR), and PESQ evaluated against EVS-processed target signals. Baselines include standalone UNDF (oracle uncompressed), a 7.5 kbps baseline cascading Original SpatialCodec with UNDF (89.9M + 948K parameters), and classical parametric spatial filtering.

## Results

NDC at 0.25 kbps achieves an SDR of 19.74 dB and PESQ of 3.69 on a 2nd-order cardioid pattern, outperforming the 7.5 kbps baseline (19.09 dB SDR, 3.47 PESQ) despite utilizing only 1.4M parameters instead of 90.8M parameters. On an unseen 12th-order cardioid configuration, NDC reaches 22.29 dB SDR and 3.81 PESQ, surpassing the uncompressed parametric spatial filtering baseline (20.07 dB SDR). Ablations demonstrate that omitting the two-stage pretraining strategy degrades 0.25 kbps SDR from 19.29 dB down to 16.95 dB on 2nd-order patterns, and utilizing raw array inputs slightly outperforms pure spatial normalization by preserving minimal spectral scale cues.

| System | Bitrate | SDR (2nd-Order Cardioid) | PESQ (2nd-Order Cardioid) | Params |
|---|---|---|---|---|
| Parametric Spatial Filtering [10] | Uncompressed | 19.14 | 3.04 | - |
| Original SpatialCodec + UNDF | 7.5 kbps | 19.09 | 3.47 | 90.8 M |
| NDC (w/ Normalization) | 0.25 kbps | 19.17 | 3.68 | 1.4 M |
| NDC | 0.25 kbps | 19.74 | 3.69 | 1.4 M |
| NDC | 0.5 kbps | 19.29 | 3.64 | 1.4 M |

## Limitations

The evaluation is restricted to anechoic training conditions with static speech sources, simulated 4-channel microphone arrays with small apertures (3 cm diameter), and limited room acoustic testing (RT60 = 0.15 s). Performance on high-reverberation environments, moving speakers, or arrays with higher channel counts remains bounded by the current network architecture and training scope.

## Why read this

Researchers and audio engineers working on spatial audio codecs and microphone array signal processing should read this paper to learn how joint spatial coding and FiLM-modulated mask estimation can bypass high-bitrate multichannel transmissions while maintaining frequency-invariant directivity patterns.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Ultra-low-bitrate spatial audio teleconferencing, hearing aids, augmented reality spatial communication, and smart-speaker directional beamforming.

## Institutions / 機構

International Audio Laboratories Erlangen, Fraunhofer IIS, Friedrich-Alexander-Universitat Erlangen-Nurnberg

**Funding / 經費:** German Research Foundation

## Related

- (link related pages by id as the wiki grows)
