---
id: shi26f_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2407
pdf: https://www.isca-archive.org/interspeech_2026/shi26f_interspeech.pdf
---

# EffVOC: Low-Delay Efficient Speech Waveform Reconstruction from Spectral Representations Without Phase

[PDF](https://www.isca-archive.org/interspeech_2026/shi26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2407)

**TL;DR** — EffVOC is a real-time, low-delay (20 ms) speech vocoder that reconstructs wideband or fullband waveforms from either amplitude spectra or Mel coefficients, achieving top subjective MOS scores of 4.17 (wideband) and 4.14 (fullband).

## Problem

Traditional phase reconstruction algorithms like Griffin-Lim and RTISI suffer from either extreme computational overhead, high algorithmic delay, or degraded speech quality. Meanwhile, modern neural vocoders and generative models typically incur long lookaheads or utterance-level processing, making them unsuitable for real-time conversational tasks. Extending these models to causal settings often causes severe performance degradation, creating a need for an efficient, low-delay unified architecture that handles multiple spectral input representations.

## Method

The paper introduces EffVOC, a hybrid convolution-recurrent architecture adapted from a low-delay speech vocoder framework. It employs two initial convolutional layers, two LSTM layers for long-range temporal modeling, and four transposed convolutional layers interleaved with residual blocks (ResBlocks) featuring weight normalization and causal convolutions. The framework is evaluated using either amplitude spectra or Mel coefficients as inputs, processing frames with a 20 ms Hann window and a 5 ms frame shift (75% overlap) to yield a 20 ms algorithmic delay. Model sizes are modulated via channel multipliers F in {8, 16, 32, 64}, alongside explorations of increased network depth for fullband setups. Training follows the BigVGAN recipe using an AdamW optimizer, discriminator setup, and multi-resolution loss functions.

## Results

Evaluated on the 16 kHz VCTK wideband test set (DVCTK test), the large amplitude-based model (F = 64, 27.19M parameters) achieves a PESQ-WB of 4.31, an ESTOI of 0.976, and a top subjective MOS of 4.17, closely tracking ground truth (4.64 MOS). For 48 kHz fullband speech, the Mel-input variant with F = 32 sets a new SOTA with a subjective MOS of 4.11 using 6.57M parameters, outperforming baseline methods like MelFlow and BAPEN while maintaining real-time capability (RTF well below 1). Across both wideband and fullband tasks, EffVOC consistently outperforms or matches non-causal and iterative baselines (GLA, RTISI-GLA, DiffPhase, BAPEN, MelFlow) in intelligibility (ESTOI, LPS) and signal fidelity (MCD, LSD) metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building real-time conversational systems, streaming text-to-speech pipelines, or low-delay communication devices requiring waveform generation from spectral representations.

## Limitations

The use of a short analysis frame with 75% overlap increases the frame rate and computational cost compared to lower-overlap configurations.

## Related

- (link related pages by id as the wiki grows)
