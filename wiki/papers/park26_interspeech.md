---
id: park26_interspeech
category: sound-event-detection
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-130
pdf: https://www.isca-archive.org/interspeech_2026/park26_interspeech.pdf
---

# Sleep Sound Event Detection Powered by Learnable Multi-Resolution Adaptive Line Enhancer

[PDF](https://www.isca-archive.org/interspeech_2026/park26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-130)

**TL;DR** — The paper introduces ACF-SED, a sound event detection framework that integrates learnable multi-resolution adaptive line enhancer confidence maps into transformer attention and feature modulation to diagnose obstructive sleep apnea from audio.

## Problem

Conventional polysomnography for diagnosing obstructive sleep apnea is costly, invasive, and restricted to specialized medical facilities, while simpler polygraphy lacks electroencephalography to accurately measure total sleep time. Although microphone-only sound event detection offers a non-invasive alternative, prior methods treat adaptive filtering solely as a preprocessing step and discard internal filter confidences. Failing to utilize these filter states limits the model's ability to accurately isolate pseudo-periodic snoring from stochastic apnea and hypopnea events.

## Method

The framework, named ACF-SED, employs a Multi-Resolution ALE Bank (MRAB) using three parallel normalized least-mean-square filters configured with distinct decorrelation delays to decompose audio into event and noise streams alongside per-frame confidence maps. A Learnable Confidence Pooler collapses the frequency-resolution confidence tensor into a trace, while dual-stream CNN encoders extract features from the enhanced and noise mel-spectrograms. These representations are processed by Confidence-Guided Cross-Path (CCP) blocks that leverage gated cross-attention and transformer architectures. The system is trained end-to-end to predict frame-level event probabilities for snore, hypopnea, and obstructive sleep apnea classes.

## Results

Evaluated on the Audio-Polygraphy Dataset for Sleep Apnea Analysis (APSAA), ACF-SED achieves state-of-the-art performance across Event-F1, Segment-F1, and Polyphonic Sound Detection Scores (PSDS). The method successfully translates frame-level sound event detection into end-to-end Apnea-Hypopnea Index (AHI) estimation. Detailed comparisons against baseline configurations demonstrate superior event localization and noise robustness when injecting the adaptive filter confidence maps directly into transformer attention biasing and feature modulation.

## Code

- https://github.com/honeysleep/sed

## Applications

Biomedical engineers and clinical researchers building non-invasive, low-cost home screening tools and acoustic front-ends for sleep-disordered breathing and obstructive sleep apnea monitoring.

## Limitations

The framework relies on ambient acoustic recordings and is evaluated specifically on the APSAA dataset for sleep apnea symptom types.

## Related

- (link related pages by id as the wiki grows)
