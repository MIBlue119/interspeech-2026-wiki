---
id: stanek26_interspeech
category: deepfake-security
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-123
pdf: https://www.isca-archive.org/interspeech_2026/stanek26_interspeech.pdf
---

# What Do Deepfake Speech Detectors Actually Hear?

*Vojtěch Staněk, Veronika Jirmusová, Anton Firc, Kamil Malinka, Jakub Reš, Martin Perešíni*

[PDF](https://www.isca-archive.org/interspeech_2026/stanek26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stanek26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-123)

**Category:** `deepfake-security` · **Labels:** `self-supervised`

**TL;DR** — This paper presents an audio-native explainability pipeline using Integrated Gradients on time-aligned self-supervised WavLM representations to uncover what deepfake speech detectors actually learn. The authors discover that detectors with similar performance rely on fundamentally distinct cues—such as non-speech noise, localized phonemes, or spectral integrity—while sharing a common vulnerability to lossy audio compression.

## Key contributions

- Introduces an audio-native adaptation of Integrated Gradients (IG) to explain self-supervised deepfake speech detectors and localize evidence in time.
- Performs a structured manual semantic analysis of three detectors (AASIST, CA-MHFA, SLS) on ASVspoof 5 using 100 curated recordings.
- Conducts causal validation of primary detector cues via targeted masking experiments (silence, phoneme, spectral, compressor).

## Problem

Modern self-supervised deepfake speech detectors output a single score without explaining why a sample is flagged, where the evidence lies, or what cues drive the decision. Prior post-hoc explanations for speech remain mostly qualitative or rely on speculative visualization rather than axiomatic attribution. Addressing this opacity is critical for forensic accountability, anticipating deployment failures, and designing better detector architectures.

## Method

The pipeline analyzes hidden representations H from a fine-tuned WavLM Base+ model with dimensions L (layers) x T (time frames) x D (features), where T corresponds to ~20 ms frames at 16 kHz. The detector function F maps H to a scalar spoofing logit z. Integrated Gradients computes attributions along the straight-line path from a bona fide centroid baseline H' to the input H using a Riemann sum via the Captum library. The bona fide centroid H' is computed by averaging token features across all bona fide training samples and broadcasting across time, avoiding the distribution mismatch of zero or global noise vectors.

To yield a temporal attribution map At, the raw IG scores are summed across all L layers and D feature dimensions, and then smoothed using a 6-frame (approx. 120 ms) sliding window. A structured human annotation protocol across 100 carefully selected ASVspoof 5 evaluation recordings assigns semantic labels (such as local glitches, phonemes, silences, or breaths), locality scores (Likert scale 1-5), and qualitative descriptions. Causal validation is performed by applying targeted modifications across the entire evaluation set, including Wav2Vec2 forced-aligned silence masking, high-energy phoneme smoothing, 1000-1600 Hz spectral band reduction, and compressor simulations.

## Experimental setup

Evaluated on the ASVspoof 5 dataset using Equal Error Rate (EER) and minDCF metrics. Compares three modern architectures utilizing pretrained WavLM Base+ backbones: AASIST, Context-Aware MHFA (CA-MHFA), and Sensitive Layer Selection (SLS), alongside a logistic regression score fusion baseline. Systems are fine-tuned jointly for 10 epochs using AdamW (WavLM lr=1e-6, classifier lr=1e-3, batch size 16) with 30% stochastic data augmentations (time masking, mu-law, RawBoost, noise, and various filters).

## Results

On the ASVspoof 5 evaluation set, individual baseline EERs are 4.06% for AASIST, 5.26% for CA-MHFA, and 3.98% for SLS, while logistic regression score fusion achieves an EER of 3.77% and minDCF of 0.0970. Manual annotation and causal masking reveal that AASIST relies heavily on non-speech and environmental silence (silence masking causes its bona fide false-acceptance rate FAR_b to surge to 99.99%), CA-MHFA focuses on localized phoneme articulation and sibilants, and SLS targets global spectral integrity and word boundaries. All three models exhibit a shared vulnerability to heavy audio compression, where dynamic range compression boosts background noise and flattens energy dynamics, causing false rejection rates (FRR_b) to spike between 8.38% and 11.93%.

| System | EER (%) | minDCF |
|---|---|---|
| AASIST | 4.06 | 0.1015 |
| CA-MHFA | 5.26 | 0.1330 |
| SLS | 3.98 | 0.1040 |
| LR Fusion | 3.77 | 0.0970 |

## Limitations

The analysis focuses exclusively on WavLM-based architectures and is evaluated primarily on the ASVspoof 5 dataset and specific attack types like YourTTS. The human annotation subset is constrained to 100 recordings due to the high manual labor cost (~40 person-hours). Furthermore, the interpretability pipeline relies on a bona fide centroid baseline which assumes availability of clean canonical speech distributions.

## Why read this

Audio forensics researchers and speech security engineers should read this to understand the true decision logic of modern SSL deepfake detectors and learn how to construct complementary ensembles that avoid shared failure modes.

## Code

- https://github.com/Security-FIT/IG_for_SSL_detectors

## Applications

Explainable audio forensics, trustworthy deepfake speech detection, and informed multimodal or ensemble anti-spoofing system design.

## Institutions / 機構

Brno University of Technology

**Funding / 經費:** Brno University of Technology internal project

## Related

- (link related pages by id as the wiki grows)
