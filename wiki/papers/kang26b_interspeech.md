---
id: kang26b_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3246
pdf: https://www.isca-archive.org/interspeech_2026/kang26b_interspeech.pdf
---

# What Do Neural Networks Learn for TDOA Estimation? A Cross-Architecture Probing Study

*Yaozhong Kang, Jiang Wang, Runwu Shi, Takeshi Ashizawa, Benjamin Yen, Kazuhiro Nakadai*

[PDF](https://www.isca-archive.org/interspeech_2026/kang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3246)

**TL;DR** — A probing study across MLP, CNN, and Transformer architectures reveals that neural networks for TDOA estimation learn cross-power computation but consistently bypass PHAT whitening, adopting a magnitude-aware frequency weighting instead that makes PHAT an information bottleneck. Removing PHAT from classical and neural GCC pipelines improves additive noise performance by up to 52%, while end-to-end models achieve lower error on reverberant real-world data.

## Key contributions

- Formulates a representation probing framework using mathematically specified GCC-PHAT intermediate steps as diagnostic targets to examine internal strategies of unconstrained neural networks.
- Demonstrates across architectures that cross-power consistently emerges in early layers, whereas PHAT whitening fails to emerge in any decodable form.
- Shows that networks learn a magnitude-aware frequency weighting that amplifies high-energy bins and correlates with Wiener/maximum-likelihood weighting.
- Proves causally via single-bin frequency masking and empirically across benchmark datasets that PHAT whitening acts as an information bottleneck, and removing it improves performance under additive noise.
- Establishes that while PHAT remains the best classical weighting for real-world reverberation, end-to-end Transformer models achieve superior accuracy by learning data-adaptive weights.

## Problem

Generalized cross-correlation with phase transform (GCC-PHAT) is the dominant classical method for time-difference-of-arrival (TDOA) estimation, but its whitening step normalizes all frequencies to unit magnitude, discarding reliability information and degrading under colored noise and reverberation. Modern localization systems increasingly use hybrid or end-to-end neural networks, yet their internal representations and computational strategies remain largely unexplored. Understanding what these networks learn internally is critical to principled design, preventing engineers from inheriting suboptimal signal-processing bottlenecks.

## Method

The study evaluates three architectures with systematically varying frequency connectivity: an independent per-bin MLP-per-bin (3 layers, d=64, 8.8k params, and a capacity control of d=256 with 133k params), a 1D-CNN (4 layers, d=64, kernel size 5, 129k params), and a Transformer (4 layers, d=64, 209k params). Each network receives narrowband observation vectors formed by the real and imaginary parts of complex STFT coefficients from two microphone channels (256-point FFT, hop size 128, F=129 bins). The regression target is the normalized inter-channel delay tau / tau_max in [-1, 1] with tau_max = 30 samples, trained using Huber loss.

To unpack internal representations, the authors train linear Ridge probes (alpha = 1.0) on layer activations to predict exact algorithmic targets including cross-power (crossre) and theoretical PHAT phase (phatcos). Gradient-based frequency attribution yields effective importance weights per frequency bin, and single-bin causal frequency masking (zeroing input tokens at test time) validates whether highlighted bins affect performance. For classical and neural GCC evaluations, weighted correlation is computed using four weighting functions: PHAT (1 / |G12|), Flat (1), Magnitude (|G12|), and a Learned gradient-attribution profile, paired with either an argmax or a 3-layer neural MLP back-end.

## Experimental setup

Experiments use synthetic dual-channel signals with white and colored (1/f) noise across SNRs from +20 to -10 dB (50k training, 5k validation samples). Validation data includes speech utterances from LibriSpeech paired with simulated room impulse responses via pyroomacoustics (ShoeBox rooms, T60 in {0.2, 0.4, 0.6} s), and real multi-channel recordings from the LOCATA Challenge Task 1 (105 mic pairs across 3 static speaker recordings, 72k frames at 16 kHz). Models are trained using AdamW, a cosine learning rate schedule, and batch size 1024 for 120 epochs.

## Results

In synthetic evaluations, cross-power emerges at layer 1 with high linear decodability (R^2 = 0.42 to 0.94 across architectures), while theoretical PHAT phase remains near zero (R^2 <= 0.21). In classical GCC pipelines, removing the PHAT bottleneck improves performance: Flat weighting outperforms PHAT across all 7 additive noise conditions, and a learned weighting achieves a 44.8% MAE reduction over PHAT at -10 dB colored noise. In neural GCC pipelines, Flat preprocessing outperforms PHAT in 11 of 12 SNR/noise conditions, yielding up to 52% MAE reduction. On real-world LOCATA recordings where classical methods approach chance level (MAE 13.9 to 17.4 samples), the end-to-end Transformer achieves an MAE of 5.75 samples, outperforming fixed classical weightings.

| System / Condition | PHAT MAE | Flat MAE | Magnitude MAE | Learned MAE |
|---|---|---|---|---|
| Classical GCC (-10 dB Colored Noise) | 15.4 | 11.7 | 10.9 | 8.51 |
| Classical GCC (0 dB Colored Noise) | 7.94 | 6.74 | 4.64 | 9.21 |
| Neural GCC (-10 dB Colored Noise) | 17.8 | 16.7 | 17.4 | 18.0 |
| Neural GCC (0 dB Colored Noise) | 1.77 | 1.68 | 2.21 | 2.92 |

## Limitations

The investigation is currently restricted to single-source scenarios and does not address multi-source overlapping acoustic events. The probing analyses and synthetic training data focus on dual-channel setups, leaving larger microphone array geometries and waveform-domain (time-domain) models unexplored. Furthermore, while the work demonstrates that reverberation degrades delay decodability, the specific internal mechanisms networks use for implicit dereverberation require further study.

## Why read this

Speech and ML engineers building sound source localization or acoustic front-ends should read this to understand why classical PHAT whitening hurts neural performance, and how replacing fixed signal-processing transformations with magnitude-aware learned weightings yields substantial error reductions.

## Code

- https://github.com/york1to/cross-power-is-all-you-need

## Applications

Sound source localization for hearing aids, smart speakers, meeting transcription systems, and mobile robotics platforms.

## Related

- (link related pages by id as the wiki grows)
