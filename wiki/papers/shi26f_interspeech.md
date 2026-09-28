---
id: shi26f_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2407
pdf: https://www.isca-archive.org/interspeech_2026/shi26f_interspeech.pdf
---

# EffVOC: Low-Delay Efficient Speech Waveform Reconstruction from Spectral Representations Without Phase

*Renzheng Shi, Simon Welker, Timo Gerkmann, Tim Fingscheidt*

[PDF](https://www.isca-archive.org/interspeech_2026/shi26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2407)

**TL;DR** — EffVOC is a causal, low-delay (20 ms) speech vocoder that reconstructs wideband and fullband speech waveforms from either amplitude spectra or Mel coefficients, achieving a new state of the art in subjective MOS (up to 4.17 WB and 4.14 FB) while operating in real-time.

## Key contributions

- Unifies wideband (16 kHz) and fullband (48 kHz) speech waveform reconstruction from both amplitude spectrum and Mel coefficient inputs within a single low-delay framework.
- Achieves an algorithmic delay of only 20 ms by combining causal convolutions, recurrent LSTM layers, and efficient upsampling via transposed convolutions.
- Establishes a new state of the art in subjective Mean Opinion Scores (MOS), scoring within 0.05 of ground truth speech quality.
- Systematically evaluates model depth and capacity scaling (varying hidden feature multipliers F and stride configurations) to balance parameter count, GFLOPS, and real-time factor (RTF).

## Problem

Traditional phase reconstruction techniques like the Griffin-Lim algorithm require high algorithmic delay and numerous iterations, while low-delay variants such as RTISI-GLA suffer from degraded speech quality. Recent neural network and generative methods (e.g., BigVGAN, Vocos, MelFlow) yield high fidelity but rely on utterance-level processing or high algorithmic delays (32 ms or more). Simply forcing existing neural vocoders into causal setups often leads to performance drops, and prior low-delay models have been restricted to Mel inputs at single bandwidths without exploring amplitude spectra or fullband audio.

## Method

EffVOC adapts a hybrid convolution-recurrent architecture featuring two causal convolutional layers, two bidirectional or unidirectional LSTM layers for long-range temporal dependencies, and four (or more) transposed convolutional layers with residual blocks (ResBlocks) for progressive temporal upsampling. All (transposed) convolutional layers utilize weight normalization and causal padding. The network is configured to process either amplitude spectra derived via DFT (size K=512 for wideband, K=1024 for fullband) or 80-channel logarithmic Mel coefficients computed using a 20 ms Hann window with a 5 ms frame shift (75% overlap). 

For wideband experiments, the base feature width F is varied across {64, 32, 16, 8}, while fullband experiments fix F=32 and evaluate varying stride setups across deeper layers (e.g., {5,4,4,3}, {5,4,3,2,2}, and {5,3,2,2,2,2}). The network is trained end-to-end for 1M steps using the AdamW optimizer (initial learning rate 1.0e-4, batch size 32) along with the discriminator setup, multi-resolution losses, and training objective recipe adopted from BigVGAN.

## Experimental setup

Evaluated on the English VCTK dataset split into 35.8 hours for training (93 speakers), 2.5 hours for validation, and a standardized test set (D_VCTK^test) consisting of the last 8 speakers (160 files). Metrics include intrusive quality scores (PESQ-WB, POLQA, ESTOI, MCD, LSD), non-intrusive NISQA, Levenshtein phone similarity (LPS), real-time factor (RTF) measured on an NVIDIA A100 GPU, and ITU-T P.808 subjective mean opinion scores (MOS). Baselines include GLA, RTISI-GLA, RTISI-DM, DiffPhase, BAPEN, and MelFlow.

## Results

In the wideband setup (16 kHz), EffVOC with F=64 amplitude input achieves a top subjective MOS of 4.17 (vs 4.20 ground truth), outperforming BAPEN and MelFlow while requiring only 20 ms delay and maintaining an RTF of 0.652. For fullband speech (48 kHz), the F=32 model with stride {5,4,4,3} and amplitude input achieves an MOS of 4.14, while the smallest Mel-input fullband model (6.57 M parameters) achieves an MOS of 4.11, outperforming all baseline methods including MelFlow (MOS 3.89) while running in real-time (RTF 0.632). EffVOC consistently dominates baseline models in intelligibility (ESTOI) and signal fidelity (MCD, LSD).

| System | Input | Delay | Params | GFLOPS | RTF | PESQ-WB | POLQA | MOS |
|---|---|---|---|---|---|---|---|---|
| Ground Truth | - | - | - | - | - | 4.64 | 4.71 | 4.20 |
| GLA [2] | Amplitude | High | - | - | - | 4.34 | 4.55 | 3.95 |
| BAPEN [22] | Amplitude | 32 ms | 6.79 M | 31.56 | - | 4.26 | - | - |
| MelFlow [23] | Mel | 32 ms | 27.90 M | 1410.00 | 0.719 | 4.19 | 4.39 | 3.94 |
| EffVOC (F=64) | Amplitude | 20 ms | 27.19 M | 38.16 | 0.652 | 4.31 | 4.45 | 4.17 |
| EffVOC (F=32) | Mel | 20 ms | 6.63 M | 9.48 | 0.622 | 4.21 | 4.37 | 4.15 |

## Limitations

Evaluation is restricted to English-language speech from the VCTK dataset, leaving multi-language and noisy-acoustic robustness unverified. The 75% frame overlap design increases frame rate and computational cost relative to 50% overlap configurations. Performance of the smallest configurations (F=8) drops significantly in objective quality metrics.

## Why read this

Speech and ML engineers building real-time conversational systems will find EffVOC an essential reference for replacing high-delay vocoders with an efficient, 20 ms-latency model that matches ground-truth quality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech synthesis, streaming text-to-speech, real-time voice conversion, and low-latency audio communication pipelines.

## Related

- (link related pages by id as the wiki grows)
