---
id: chang26e_interspeech
category: tts
labels: [low-resource, generative-model]
institutions: ["Academia Sinica", "National Cheng Kung University Hospital"]
code: https://devchang918.github.io/IS2026_one_shot_personalized_ELVC/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1942
pdf: https://www.isca-archive.org/interspeech_2026/chang26e_interspeech.pdf
---

# Personalized Electrolaryngeal Voice Conversion with a Single Pre-operative Utterance

*Devin Chang, Hsin-Te Hwang, Ming-Chi Yen, Shu-Wei Tsai, Yu Tsao, Hsin-Min Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/chang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1942)

**Category:** `tts` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — This paper establishes a benchmark for one-shot personalized electrolaryngeal voice conversion using only a single pre-operative reference utterance, showing that a feature-level cascaded framework with supervised refinement outperforms traditional supervised baselines in speaker similarity and intelligibility.

## Key contributions

- Formulates and benchmarks the one-shot personalized electrolaryngeal voice conversion problem with a single natural utterance timbre reference.
- Compares a pseudo-target generation strategy against a decoupled cascaded framework separating intelligibility restoration from timbre transfer.
- Proposes a feature-level cascade bypassing intermediate waveform reconstruction to reduce vocoder artifacts.
- Introduces a supervised fine-tuning strategy for zero-shot voice conversion backbones using dynamic time warping to align features.

## Problem

Electrolaryngeal speech generated after total laryngectomy suffers from robotic quality, low naturalness, and poor intelligibility. While personalized voice conversion can restore a patient's original voice, prior supervised methods require extensive pre-operative parallel recordings that are rarely available in clinical practice. Direct application of modern zero-shot voice conversion models to electrolaryngeal speech fails completely due to severe acoustic domain mismatch between mechanical and natural speech.

## Method

The paper evaluates three zero-/one-shot voice conversion backbones: FreeVC (VITS-based with WavLM features), Vevo (flow-matching transformer with HuBERT features), and Seed-VC (diffusion transformer with Whisper-small features and an external timbre shifter). The proposed cascaded framework first restores intelligibility using an exemplar-based LLE-ELVC front-end—employing Chinese-HuBERT for neighbor search and WavLM-6th layer for feature reconstruction—and then applies a second-stage voice conversion model for timbre transfer. 

To eliminate vocoder artifacts, the authors design a feature-level cascade that feeds intermediate LLE-ELVC acoustic representations directly into the voice conversion backbones instead of synthesized waveforms. To bridge cross-stage compatibility further, they perform speaker-dependent supervised fine-tuning on the second-stage model for up to 600 steps. Training data is generated via leave-one-utterance-out on 240 EL-NL pairs, using dynamic time warping to align source features and pseudo-targets derived from Seed-VC without updating the frozen vocoder.

## Experimental setup

Evaluated on 4 speaker pairs (3 male, 1 female) using 320 10-character Mandarin sentences from the TMHINT dataset per speaker, split into 240/40/40 for training, development, and evaluation resampled to 16 kHz. A single target natural utterance from the dev set serves as the one-shot identity reference. Baselines include unprocessed electrolaryngeal speech, a fully supervised LLE-ELVC baseline using all 240 parallel utterances, and direct application of Seed-VC, Vevo, and FreeVC. Metrics include SpeechBERTScore, Syllable Error Rate (SER), resemblyzer embedding cosine similarity, UTMOS for perceptual quality, and MOS/ABX subjective listening tests.

## Results

Direct zero-shot models fail with severe degradation, yielding SERs over 85% to 101.48%. The cascaded waveform framework with Seed-VC dramatically improves speaker similarity (0.82) and UTMOS (1.91) compared to the pseudo-target strategy (0.74 similarity). Bypassing waveform reconstruction via feature-level cascading further drops the SER for Seed-VC from 69.65% to 60.08% and raises UTMOS to 2.08.

The final Refined Cascade (Feature + Seed-VC) achieves the best overall performance, dropping SER to 59.65% (outperforming the fully supervised baseline's 61.98%) while achieving an embedding similarity of 0.84 (vs 0.75 for the supervised baseline) and a UTMOS of 2.30 (vs 1.86). In subjective evaluations, listeners preferred the refined cascaded system in 77.71% of ABX trials compared to 9.38% for the supervised baseline. FreeVC achieves high UTMOS (2.64) in waveform cascade mode but suffers from high SER (79.70%), showing sensitivity to residual artifacts.

| System | SpeechBERT_↑_ | UTMOS_↑_ | SER (%)_↓_ | Similarity_↑_ |
|---|---|---|---|---|
| EL (Unprocessed) | 0.62 | 1.31 | 79.48 | 0.52 |
| Supervised ELVC | 0.74 | 1.86 | 61.98 | 0.75 |
| Direct Zero-Shot (Seed-VC) | 0.68 | 1.65 | 85.03 | 0.78 |
| Cascade (Waveform) + Seed-VC | 0.73 | 1.91 | 69.65 | 0.82 |
| Cascade (Feature) + Seed-VC | 0.73 | 2.08 | 60.08 | 0.81 |
| Refined Cascade (Feature) + Seed-VC | 0.74 | 2.30 | 59.65 | 0.84 |

## Limitations

The study evaluates only four simulated speaker pairs and relies on simulated electrolaryngeal speech produced by non-laryngectomized individuals rather than clinical patients. The framework requires a multi-stage pipeline (LLE-ELVC followed by zero-shot VC) which increases system complexity and inference latency, and it was evaluated exclusively on Mandarin speech.

## Why read this

Speech researchers and engineers working on voice restoration or zero-shot voice conversion under extreme data scarcity will learn why direct zero-shot models fail on pathological or mechanical speech and how feature-level decoupled cascading can successfully bridge the domain gap.

## Code

- https://devchang918.github.io/IS2026_one_shot_personalized_ELVC/

## Applications

Biomedical speech restoration, voice banking for pre-laryngectomy patients, and assistive communication devices for laryngectomees.

## Institutions / 機構

Academia Sinica, National Cheng Kung University Hospital

**Funding / 經費:** National Science and Technology Council

## Related

- [One-to-Many Electrolaryngeal Voice Conversion with Synthetic Data](wu26l_interspeech.md) — same problem · relatedness 2.4/3
- [A Preclinical Study of Electrolaryngeal Voice Conversion for a Novel Nasal Electrolarynx: Feature Choice and Data Augmentation](chen26t_interspeech.md) — same problem · relatedness 2.2/3
- [SSL-GMMVC: Interpretable Voice Conversion via Locally Linear GMM Transforms in Self-Supervised Representation Space](tanabu26_interspeech.md) — same problem · relatedness 2.1/3
- [Universal Speech Content Factorization](xinyuan26_interspeech.md) — same problem · relatedness 2.1/3
- [ZeSTA: Zero-Shot TTS Augmentation with Domain-Conditioned Training for Data-Efficient Personalized Speech Synthesis](choi26b_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
