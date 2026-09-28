---
id: monir26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3416
pdf: https://www.isca-archive.org/interspeech_2026/monir26_interspeech.pdf
---

# Time–Frequency Weighted Losses for Phoneme Reconstruction in DNN-Based Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/monir26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/monir26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3416)

**TL;DR** — The paper proposes a time-frequency (TF) weighted SDR loss that emphasizes regions of strong speech-noise competition and transient phonetic cues, improving phoneme recognition accuracy and interference suppression in multichannel speech enhancement.

## Problem

Conventional speech enhancement losses based on signal-to-distortion ratio (SDR) treat all time-frequency regions uniformly, failing to account for the uneven perceptual importance of fine-grained spectral cues crucial for phoneme intelligibility. This shortcoming is particularly acute in noisy conditions where masking effects degrade transient sounds like plosives, fricatives, and consonant bursts. Consequently, models optimized with global losses often underperform on speech perception and acoustic-phonetic reconstruction.

## Method

The authors introduce a differentiable TF-weighted SDR objective modulated by local signal-to-interference ratio (SIR), speech presence gating, and spectral flux. They test three primary weighting variants: SIR combined with speech presence (LSIR·SP), further augmented with frame-wise spectral flux to capture transients (LSIR·SP·SF), and a data-driven learnable spectral profile initialized with ANSI band-importance weights (Llearn). Experiments utilize FaSNet as the multichannel speech enhancement architecture in a binaural hearing-aid setup, trained on LibriSpeech mixed with Disconoise ecological noise and simulated room impulse responses.

## Results

Evaluated on white noise (WN) and speech-shaped noise (SSN) test sets across SIR levels from −8 dB to 8 dB using Asteroid, the proposed LSIR·SP·SF loss consistently improves SIR, frequency-weighted SIR (FW-SIR), and phoneme accuracy (PA). Specifically, LSIR·SP·SF yields higher consonant and vowel phoneme accuracy and lower word error rates (WER) compared to unweighted time-domain SDR (LT) and baseline SIR weighting, especially under white noise conditions. Spectral analysis confirms that the flux-augmented weighting yields superior mid-frequency reconstruction of plosive spectra.

## Code

- https://github.com/Nasseredd/fw-se-loss

## Applications

Speech and ML engineers designing hearing-assistive devices, robust automatic speech recognition front-ends, or multichannel communication systems operating in noisy environments.

## Limitations

Performance improvements vary depending on the noise type, with gains being more consistent and pronounced under white noise than under spectrally shaped noise.

## Related

- (link related pages by id as the wiki grows)
