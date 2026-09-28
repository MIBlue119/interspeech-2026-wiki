---
id: meng26c_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1618
pdf: https://www.isca-archive.org/interspeech_2026/meng26c_interspeech.pdf
---

# BiEAR: A Human Auditory-Inspired Adaptive Binaural Front-end for Multi-Speaker Localisation and Distance Estimation

[PDF](https://www.isca-archive.org/interspeech_2026/meng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1618)

**TL;DR** — BiEAR is a human auditory-inspired adaptive binaural front-end for multi-speaker localization and distance estimation that improves accuracy and acoustic robustness using neural-feedback-controlled Q-factor modulation.

## Problem

Computational auditory scene analysis struggles to achieve human-like sound localization and distance perception in dynamic and reverberant acoustic environments. Most deep learning binaural models rely on fixed inference graphs and purely feedforward pipelines, ignoring the critical adaptive efferent feedback found in biological hearing. This limits their ability to generalize to non-stationary scenes, unseen speakers, and novel rooms.

## Method

BiEAR incorporates ear-specific neural feedback controllers (using a 128-unit GRU and SiLU fully connected layers) to dynamically modulate filterbank Q-factors frame by frame based on instantaneous and smoothed subband sound pressure levels. It evaluates both absolute (additive) and relative (multiplicative) Q-control strategies across K=100 ERB-spaced Gabor filter subbands to generate time-frequency adaptive representations. Binaural spatial cues (ILD, IPD, and cross-correlation) are extracted from these modulated subbands and fed into eight sector-wise SAD-Nets for joint source detection, azimuth estimation, and distance classification. The multi-task network is optimized end-to-end using Adam on 72,000 anechoic simulated mixtures alongside baseline comparison models (AuralNet and DeepEar).

## Results

Evaluated on anechoic test sets and real-room BRIR datasets (meeting room and lecture hall) containing one-, two-, and three-speaker mixtures, BiEAR variants consistently outperform fixed front-end baselines like DeepEar and AuralNet in sound detection and azimuth MAE. The BiEAR + Dual Controller + Rel variant yields superior training stability and generalizability across unseen speakers. In diverse-room adaptation experiments, BiEAR paired with environment transfer achieves robust performance under high reverberation, outperforming adapted baseline models.

## Code

- https://github.com/Hanyu-Meng/BiEAR

## Applications

Engineers building binaural speech enhancement systems, acoustic scene analysis tools, robotic speaker tracking, or assistive listening devices operating in dynamic environments.

## Limitations

The neural controller is an engineering abstraction of medial olivocochlear efferent feedback rather than a biologically faithful neural circuit, and it is currently evaluated only on static sources.

## Related

- (link related pages by id as the wiki grows)
