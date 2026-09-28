---
id: edraki26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-319
pdf: https://www.isca-archive.org/interspeech_2026/edraki26_interspeech.pdf
---

# Energy Redistribution in the Spectro-Temporal Modulation Domain for Near-End Listening Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/edraki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/edraki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-319)

**TL;DR** — The paper introduces a near-end listening enhancement algorithm that redistributes speech energy in the spectro-temporal modulation domain, yielding consistent intelligibility gains over time-frequency baselines.

## Problem

Conventional near-end listening enhancement methods reallocate a fixed energy budget across time-frequency regions but fail to explicitly manipulate spectro-temporal modulation patterns, which are crucial for speech perception and formant transitions. Operating solely in the time-frequency domain limits their ability to highlight perceptually critical speech structures under noisy playback conditions. Addressing this gap is vital for improving speech intelligibility in public announcements or communication devices operating in noisy environments.

## Method

The proposed framework computes the Modulation Power Spectrum from log-magnitude STFT spectrogram segments using a 2D Fourier transform. A real-valued, non-negative modulation mask is then applied to the modulation power spectrum to redistribute speech energy under an overall energy constraint. The mask parameters are optimized via gradient descent using a differentiable loss based on the negative Extended Short-Time Objective Intelligibility index. Training utilizes 4,000 utterances from LibriSpeech train-clean-100 mixed with AudioSet environmental noise at −15 to 0 dB SNR. An ablation study evaluates temporal-only, spectral-only, joint, and factorized separable mask parameterizations, identifying the separable mask (260 parameters) as the most effective balance of performance and efficiency.

## Results

Evaluated on LibriSpeech dev-clean subsets mixed with DEMAND noise (restaurant, living room, station) and speech-shaped noise at −10 and −5 dB SNR, the method is assessed using ESTOI, wSTMI, STGI, and Whisper-small ASR WER. Across metrics and conditions, the proposed spectro-temporal modulation approach achieves the highest mean improvement compared to baselines SSDRC, OptimalSII, and iMetricGAN. At −5 dB SNR, the proposed method demonstrates statistically significant improvements over all baselines across all metrics and noise types. A preliminary subjective listening test with 5 native Mandarin listeners using matrix sentences in restaurant noise at −5 dB SNR confirms significant perceptual intelligibility gains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers designing public announcement systems, hearing-aid devices, or communication applications operating in noisy environments.

## Limitations

Subjective evaluation was restricted to a small-scale test with 5 participants under a single noise condition due to time constraints.

## Related

- (link related pages by id as the wiki grows)
