---
id: akti26_interspeech
category: tts
labels: [generative-model, robustness-noise]
institutions: ["Karlsruhe Institute of Technology", "Carnegie Mellon University", "KIT Campus Transfer"]
code: https://seymanurakti.github.io/synthesizing-lombard-effect/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1159
pdf: https://www.isca-archive.org/interspeech_2026/akti26_interspeech.pdf
---

# Synthesizing the Lombard Effect: Multi-Level Control of Speech Clarity and Vocal Effort in TTS

*Seymanur Akti, Alexander Waibel*

[PDF](https://www.isca-archive.org/interspeech_2026/akti26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/akti26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1159)

**Category:** `tts` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — A flow-matching-based TTS model uses dual-axis pseudo-label conditioning to achieve continuous, independent, and joint control over vocal effort and articulation, successfully simulating human Lombard speech intelligibility gains in noisy environments.

## Key contributions

- A dual-axis conditioning framework providing independent and joint control of vocal effort and articulation along separate continuous axes.
- A factorized injection strategy applying style and speaker embeddings to both the text encoder (duration/rate control) and the flow-matching acoustic decoder (spectral tilt, formant clarity).
- Multi-level adjustment support enabling both utterance-level global style scaling and word-level localized emphasis and hyper-articulation.
- Demonstrated significant Word Error Rate (WER) and Speech Intelligibility Index (SII) improvements over naive signal-processing baselines under multi-condition noise masks.

## Problem

Standard text-to-speech systems are predominantly trained on neutral speaking styles, failing to account for how humans dynamically adapt their speech clarity and vocal effort in noisy or challenging listening conditions (the Lombard effect). Prior data-driven attempts rely on global acoustic adjustments or handle vocal effort and articulation independently, lacking a unified disentangled control framework. Furthermore, signal-processing baselines like simple time-stretching and RMS amplitude matching lead to unnatural artifacts and suboptimal intelligibility gains because they fail to capture hyper-articulation and spectral redistribution.

## Method

The system builds upon Matcha-TTS, utilizing an Optimal Transport flow-matching decoder with Monotonic Alignment Search (MAS) for phoneme-to-frame duration modeling, and Vocos as the neural vocoder. Style classes from the Expresso dataset (default, enunciated, fast, projected) are mapped into pseudo-labels along two dimensions: articulation (fast to enunciated) and vocal effort (default to projected). Each discrete label is projected via learnable linear layers into a 32-dimensional continuous embedding space, concatenated with speaker identity embeddings, and injected at two points: encoder-side injection (before text encoding and duration prediction for speaking rate and phoneme stretching) and decoder-side injection (into the U-Net flow-matching decoder for spectral tilt, energy distribution, and formant clarity).

During inference, vocal effort (alpha) and articulation (beta) are treated as continuous controllable scalars in the range [0, 1] to allow smooth interpolation. For word-level emphasis, fine-grained control is achieved by assigning a high articulation index (beta = 1.5) to target word tokens while applying a lower index (beta = 0.1) to surrounding tokens to prevent acoustic leakage and maintain normal neighboring phoneme rates. Training combines ~11 hours of subset Expresso data (across 4 speakers) augmented with the LJ Speech corpus as a neutral speaker anchor to stabilize phoneme coverage.

## Experimental setup

Trained on ~11 hours of Expresso subset data combined with the LJ Speech corpus. Evaluated using the Harvard Sentences dataset across three noise types (restaurant babble, overlapping speech, and white noise) at SNR levels of 1, 5, 10, and clean. Compared against a naive signal-processing baseline (RMS matching for effort and linear time-stretching for rate). Metrics include Word Error Rate (WER) using Whisper-medium, Spectral Tilt (5-1kHz vs below 1kHz), Mean Vowel Dispersion (MVD) of /i/, /a/, /u/ in F1-F2 space, Phoneme Rate, Speech Intelligibility Index (SII), and a CMOS study with 10 participants.

## Results

The proposed system outperforms the naive time-stretching and RMS-matching baseline across clarity metrics, achieving lower WER and natural preference in CMOS testing (Naturalness CMOS: 1.97, Intelligibility CMOS: 1.13). Articulation scaling (beta) steadily decreases WER and increases Mean Vowel Dispersion, with optimal gains saturating at mid-to-high levels, whereas vocal effort scaling (alpha) primarily drives spectral tilt improvements and audibility (SII) under energetic masking like restaurant babble. Combining joint scaling of articulation and vocal effort provides the greatest robustness under severe noise (SNR = 1). In word-level targeted tests on previously misrecognized words, combining hyper-articulation and emphasis yields a drop in WER to 3.90% compared to 17.61% for the baseline.

| System / Condition | WER (%) ↓ | MVD (Bark) ↑ | Spectral Tilt (dB) ↑ |
|---|---|---|---|
| Baseline (beta=0.5, alpha=0.3) | 3.07 | 2.00 | -19.94 |
| Proposed (beta=0.7, alpha=0.3) | 1.15 | 2.11 | -13.86 |
| Proposed (beta=0.9, alpha=0.3) | 1.09 | 2.14 | -14.70 |
| Baseline (beta=0.5, alpha=0.9) | 4.86 | 2.09 | -19.89 |
| Proposed (beta=0.9, alpha=0.9) | 0.77 | 2.37 | -20.44 |

## Limitations

ASR-based evaluation using Whisper-medium shows performance degradation at extreme projection levels (alpha = 0.9) due to distribution mismatch rather than true intelligibility loss. Token-level word conditioning exhibits minor acoustic leakage, requiring careful tuning of surrounding token parameters. The scope is bounded by the acoustic and speaker diversity of the Expresso and LJ Speech datasets used for training.

## Why read this

Researchers and engineers building conversational agents or accessibility tools seeking a flexible, disentangled neural control framework for speech clarity and Lombard effects will find this an effective alternative to rigid signal-processing heuristics.

## Code

- https://seymanurakti.github.io/synthesizing-lombard-effect/

## Applications

Accessibility technologies for hearing-impaired listeners, robust conversational agents operating in noisy environments, and dynamic repair strategies for spoken dialogue systems.

## Institutions / 機構

Karlsruhe Institute of Technology, Carnegie Mellon University, KIT Campus Transfer

**Funding / 經費:** European Union Horizon Europe programme, KIT Campus Transfer GmbH

## Related

- [FineCombo-TTS: Collaborative and Precise Controllable Speech Synthesis Using Text Descriptions and Reference Speech](zhou26h_interspeech.md) — shared technique · relatedness 2.0/3
- [RobustSpeechFlow: Learning Robust Text-to-Speech Trajectories via Augmentation-based Contrastive Flow Matching](yang26p_interspeech.md) — shared technique · relatedness 2.0/3
- [PhASE-Flow: Phonetic-Conditioned Acoustic Flow Matching in SSL Representation Domain for Speech Enhancement](gao26e_interspeech.md) — shared technique · relatedness 2.0/3
- [Vocal Effort Modulation Strategies: A Cross-Corpus Taxonomy with Noise Robustness and ASR Implications](marcinek26_interspeech.md) — same problem · relatedness 2.0/3
- [Improving Flow Matching based Text-to-Speech with Dual-Model Preference Optimization and Classifier-Free Guidance](chen26y_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
