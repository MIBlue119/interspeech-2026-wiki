---
id: monir26_interspeech
category: enhancement-separation
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3416
pdf: https://www.isca-archive.org/interspeech_2026/monir26_interspeech.pdf
---

# Time–Frequency Weighted Losses for Phoneme Reconstruction in DNN-Based Speech Enhancement

*Nasser-Eddine Monir, Paul Magron, Romain Serizel*

[PDF](https://www.isca-archive.org/interspeech_2026/monir26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/monir26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3416)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — This paper proposes a time-frequency (TF) weighted SDR loss for multichannel speech enhancement that modulates loss contributions based on local speech-to-interference ratio (SIR), speech presence, and transient spectral flux. By emphasizing TF bins with high speech-noise competition, the method improves consonant reconstruction and phoneme accuracy under white and speech-shaped noise.

## Key contributions

- Formulates a differentiable TF-weighted SDR loss framework that explicitly models local speech-noise competition through learned SIR gating and speech-presence functions.
- Extends the weighting framework with frame-wise spectral flux to capture rapid transient phonetic cues like plosive bursts.
- Introduces a learnable frequency-weighting scheme initialized with ANSI 1997 band-importance weights to evaluate perceptual inductive biases versus data-driven weighting.
- Demonstrates consistent gains in phoneme accuracy, particularly for consonants and plosives, and improved mid-frequency spectral reconstruction at moderate-to-high input SIR levels.

## Problem

Conventional deep learning-based speech enhancement relies on unweighted time-domain or global SDR losses that treat all time-frequency regions uniformly. This approach overlooks the uneven perceptual contributions of different speech components, such as consonantal transitions and plosive bursts, which carry vital linguistic information. Because masking effects peak when speech and noise magnitudes are comparable, uniform loss functions fail to prioritize regions of strong speech-noise interaction where intelligibility is most vulnerable. The paper addresses this gap by introducing spectrally targeted loss formulations that mirror speech perception theories.

## Method

The proposed framework computes short-time Fourier transforms, groups frequencies into Mel-scale bands, and calculates an orthogonal projection of estimated speech onto clean speech to define a TF-weighted SDR objective controlled by a bin-wise weight $w(f,t)$. The SIR-speech presence loss ($L_{\text{SIR}\cdot\text{SP}}$) applies two sigmoid gating functions with learned thresholds $\tau_1$ and $\tau_2$ to emphasize bins where speech remains active despite low SIR.

To capture rapid transients, the SIR-speech presence-spectral flux loss ($L_{\text{SIR}\cdot\text{SP}\cdot\text{SF}$) incorporates a frame-wise spectral flux term scaled by a factor $k = 0.2$ (tuned on validation data) to boost sensitivity to plosive bursts and fricatives. A data-driven variant ($L_{\text{learn}}$) uses time-independent learnable weights $\theta_f$ initialized with ANSI 1997 band-importance curves.

The speech enhancement backbone is FaSNet, an end-to-end time-domain two-stage adaptive beamformer implemented via Asteroid. Microphone permutation is disabled for a 4-channel binaural hearing-aid setup to maintain a fixed front-left reference channel, evaluating on the left ear.

## Experimental setup

Clean speech is drawn from LibriSpeech, mixed with Disconoise ecological noise and speech-shaped noise (SSN), and spatialized using Pyroomacoustics room impulse responses across SIR values from -10 dB to 10 dB. Evaluation uses dedicated test sets from the Binaurec dataset with target speech at 0 degrees and maskers at 45 degrees, tested at SIR levels from -8 dB to 8 dB across 10 speakers. Baselines include unweighted time-domain SDR ($L_T$), unweighted TF-SDR, and prior SIR weighting ($L_{\text{logSIR}}$); metrics include scale-invariant SDR, SIR, SAR, frequency-weighted (FW) variants, STOI, Word Error Rate (WER), and Phoneme Accuracy (PA) using Wav2Vec2.

## Results

Under white noise (WN), $L_{\text{SIR}\cdot\text{SP}\cdot\text{SF}$ achieves an improved SIR of 17.2 dB (vs 13.3 dB for $L_T$) and FW-SIR of 8.4 dB (vs 5.1 dB), while raising consonant PA to 36.1% (vs 34.0%) and overall WN word error rates. Under speech-shaped noise (SSN), $L_{\text{SIR}\cdot\text{SP}\cdot\text{SF}$ reaches an SIR of 15.1 dB (vs 14.3 dB) and FW-SDR of 4.9 dB (vs 4.4 dB), with consonant PA rising to 45.5% (vs 43.6%).

In ablations, purely SIR-based gating ($L_{\text{logSIR}}$ and $L_{\text{SIR}\cdot\text{SP}}$) exhibits unstable performance and drops in STOI under SSN, showing that spectral flux and learned profiles are necessary for stable interference suppression. The method does not win at extremely low input SIR levels (-8 dB), where the baseline occasionally preserves mid-to-high frequency bands better.

| System / Condition | SIR (WN) | FW-SIR (WN) | STOI (WN) | SIR (SSN) | FW-SDR (SSN) | PA Consonants (WN) |
|---|---|---|---|---|---|---|
| Input | -2.0 | -6.0 | 0.50 | -2.0 | - | - |
| $L_T$ (Baseline) | 13.3 | 5.1 | 0.63 | 14.3 | 4.4 | 34.0 |
| $L_{\text{logSIR}}$ | 16.2 | 7.6 | 0.61 | 14.2 | 3.9 | - |
| $L_{\text{learn}}$ | 16.1 | 7.5 | 0.64 | 15.0 | 4.6 | - |
| $L_{\text{SIR}\cdot\text{SP}}$ | 15.1 | 6.6 | 0.63 | 13.4 | 3.6 | - |
| $L_{\text{SIR}\cdot\text{SP}\cdot\text{SF}}$ | 17.2 | 8.4 | 0.64 | 15.1 | 4.9 | 36.1 |

## Limitations

Evaluated exclusively on simulated binaural hearing-aid room geometries with a fixed front-target/side-interferer configuration, limiting generalization to complex multi-talker cocktail party environments. Testing relies on objective proxies (Wav2Vec2-based phoneme accuracy and WER) rather than subjective human listening tests. Performance gains under spectrally shaped noise (SSN) are more modest compared to white noise, and weighted losses can incur slight degradation in classical SAR and overall distortion metrics.

## Why read this

Speech enhancement and audio researchers seeking to move beyond uniform global loss functions will find a principled framework for incorporating phonetic intelligibility priors and transient dynamics into neural training objectives.

## Code

- https://github.com/Nasseredd/fw-se-loss

## Applications

Hearing-aid signal processing, real-time telephony speech enhancement, and robust frontend speech processing for ASR systems in noisy environments.

## Institutions / 機構

Universite de Lorraine, CNRS, Inria, LORIA

**Funding / 經費:** French National Research Agency, REFINED project

## Related

- (link related pages by id as the wiki grows)
