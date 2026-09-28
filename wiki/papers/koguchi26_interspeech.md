---
id: koguchi26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3202
pdf: https://www.isca-archive.org/interspeech_2026/koguchi26_interspeech.pdf
---

# Instantaneous Pitch Estimation via Wave-U-Net-Based Fundamental Waveform Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/koguchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koguchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3202)

**TL;DR** — This paper frames fundamental waveform filtering as a speech enhancement task using a Wave-U-Net model to improve instantaneous pitch estimation (IPE), achieving higher raw pitch accuracy than conventional deterministic methods across clean and noisy conditions.

## Problem

Conventional instantaneous pitch estimation (IPE) relies on complex filterbanks and heuristic channel selection (via autocorrelation or standard deviation) to isolate the fundamental frequency component from harmonics and noise. These deterministic approaches are fragile when applied to out-of-domain signals or noisy real-world environments. Furthermore, frame-wise fo estimators introduce unnatural discontinuities during continuous pitch variations like vibrato or chirp signals, making robust continuous tracking difficult.

## Method

The authors train a Wave-U-Net regression model (FWUN) directly on time-domain waveforms to extract the fundamental waveform from input speech, bypassing heuristic channel selection. The network architecture consists of 6 downsampling blocks and 6 upsampling blocks with skip connections and interpolation-based upsampling to prevent aliasing, using LeakyReLU nonlinearities and a final tanh activation. Training utilizes a composite loss function combining mean absolute error (MAE) on both the fundamental and residual components (to enforce mixture consistency) and an instantaneous frequency (IF) loss weighted at lambda = 5.0. The training data comprises 20.67 hours across 42 speakers, 19 singers, and 25 musical instruments, augmented dynamically with NOISEX92 and QUT-NOISE at 0 to 30 dB SNR.

## Results

Evaluated on a strictly disjoint test set across speech, singing, and instrument domains using Raw Pitch Accuracy (RPA) under cent thresholds (5, 25, 50 cents) and frequency modulation response tests. Under clean conditions, the proposed method achieves the highest RPA50 of 88.47% compared to IRAPT (83.84%), Halcyon (86.80%), and NINJAL (84.87%), while maintaining a lower standard deviation in cent error. Under additive noise, the proposed method exhibits robust performance, maintaining 86.40% RPA at 0 dB SNR where competing methods drop sharply (e.g., NINJAL falls to 62.35%). Modulation-response analysis shows lower time-varying random responses under noisy conditions compared to baseline algorithms.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers working on speech prosody analysis, singing technique evaluation, and robust pitch tracking in noisy acoustic environments.

## Limitations

Downsampling operations introduce minor aliasing artifacts that can leave residual harmonic components, leading to slightly higher nonlinear and random responses during rapid frequency modulations compared to specialized traditional filters.

## Related

- (link related pages by id as the wiki grows)
