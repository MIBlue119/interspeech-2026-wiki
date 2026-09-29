---
id: ulgen26b_interspeech
category: deepfake-security
labels: [generative-model]
institutions: ["Johns Hopkins University"]
code: https://github.com/rsmlgen/diffanon
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1331
pdf: https://www.isca-archive.org/interspeech_2026/ulgen26b_interspeech.pdf
---

# DiffAnon: Diffusion-based Prosody Control for Voice Anonymization

*Ismail Rasim Ulgen, Zexin Cai, Nicholas Andrews, Philipp Koehn, Berrak Sisman*

[PDF](https://www.isca-archive.org/interspeech_2026/ulgen26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ulgen26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1331)

**Category:** `deepfake-security` · **Labels:** `generative-model`

**TL;DR** — DiffAnon is a diffusion-based voice anonymization framework that uses classifier-free guidance to enable explicit, continuous, inference-time control over prosody preservation. By adjusting prosody conditioning weights within a single model, it navigates the utility-privacy trade-off, achieving competitive EER privacy while preserving word error and emotion recognition utility.

## Key contributions

- First voice anonymization framework providing explicit, continuous inference-time control over source prosody preservation via classifier-free guidance.
- A novel conditional diffusion formulation that refines acoustic details over speaker-agnostic semantic embeddings derived from an RVQ-based speech codec.
- Demonstration on the VoicePrivacy Challenge 2024 protocol that systematic modulation of prosody conditioning weights continuously scales privacy (EER) versus utility (WER, UAR, F0 correlation).

## Problem

Voice anonymization requires stripping speaker identity while retaining linguistic content, but identity and paralinguistic cues like prosody are tightly coupled. Existing cascaded ASR-TTS or voice conversion methods operate at fixed design points—either discarding prosody entirely to maximize privacy, or retaining it and exposing residual speaker leakage. This rigidity prevents users from dynamically tuning the utility-privacy trade-off for downstream tasks where emotional expressiveness or emphasis matters.

## Method

DiffAnon adopts a denoising diffusion probabilistic model (DDPM) predicting clean SpeechTokenizer embeddings x_0 (1024-dimensional RVQ vectors Q^{1:8} spanning 8 codebook levels) at timestep t given noisy input x_t. The content condition c_sem consists of the first-level semantic tokens Q^1 added directly at every timestep without projection to ensure linguistic preservation. Prosody condition c_pro utilizes frame-level latent features z_mpm (256-dim) from a masked prosody model, projected via 1D convolutions. Speaker condition c_spk uses a 256-dim utterance-level embedding from the FreeVC speaker encoder, repeated across frames and projected via 1D convolutions. Conditions are added to the noisy latent via addition.

During training, conditions are randomly dropped: 50% all conditions active, 30% prosody dropped (c_pro = null), and 20% both prosody and speaker dropped (c_pro = null, c_spk = null). Speaker-only dropping is explicitly avoided to prevent leakage. At inference, classifier-free guidance (CFG) is applied using either prosody-adjusted guidance (varying weight w_pro to interpolate source prosody preservation) or pseudo-speaker guidance (setting prosody to null and scaling speaker guidance weight w_spk) using a pseudo-speaker vector psi sampled from a training speaker pool.

The backbone architecture consists of 40 WaveNet-style residual blocks utilizing 1D non-dilated convolutions with kernel size 5 and 1024 channels, trained via x-prediction with DDIM sampling (100 steps) during inference.

## Experimental setup

Models are trained on the LibriTTS training dataset for approximately 400k steps with a learning rate of 1e-4 and batch size of 8 on a single NVIDIA H100 GPU. Evaluation follows the VoicePrivacy Challenge 2024 protocol: privacy via equal error rate (EER) under lazy-informed and semi-informed attacker scenarios; content utility via Word Error Rate (WER) and Character Error Rate (CER); emotion utility via Speech Emotion Recognition (SER) unweighted average recall (UAR) on IEMOCAP; and prosody preservation via F0 correlation on VoicePrivacy 2022 libri-dev and libri-test splits. Baselines include official VoicePrivacy B1-B6 systems and top challenge entries T8, T9, and T10.

## Results

Under full prosody guidance (w_pro = 1.0), DiffAnon achieves an F0 correlation of 75.58% and an emotion UAR of 50.80% on libri-test, while maintaining a lazy EER privacy of 33.09%. Decreasing w_pro smoothly degrades F0 correlation down to 62.45% and emotion UAR to 45.23%, while driving lazy EER privacy up to 42.43%. Applying null prosody alongside pseudo-speaker CFG (w_spk = 3.0) achieves a high lazy EER of 48.16% on libri-test with a modest WER increase from 4.62% to 6.22%. Across all settings, word error rate remains stable between 4.62% and 5.79% for standard prosody adjustments.

| System | Prosody Setting | EER (%) libri-test lazy | EER (%) libri-test semi | WER (%) dev | UAR (%) dev | F0-corr (%) dev |
|---|---|---|---|---|---|---|
| Ground Truth | – | 1.80 | 1.84 | 4.16 | 69.07 | 100.0 |
| B4 Baseline | – | 48.84 | 30.59 | 6.12 | 42.19 | 70.93 |
| DiffAnon | w_pro = 1.0 | 33.09 | 14.53 | 4.91 | 52.32 | 76.67 |
| DiffAnon | w_pro = 0.5 | 36.41 | 17.15 | 5.44 | 50.60 | 69.56 |
| DiffAnon | w_pro = null | 42.43 | 20.66 | 5.79 | 47.38 | 64.32 |
| DiffAnon | w_pro = null, w_spk = 3.0 | 48.16 | 22.78 | 6.63 | 42.74 | 57.05 |

## Limitations

Evaluations are primarily restricted to English data (LibriTTS and IEMOCAP corpora), leaving multilingual scalability unverified. The framework currently controls prosody via pitch and energy features but does not provide explicit separate control over speech duration or temporal pacing. Semi-informed attacker EER remains lower than lazy EER, showing that advanced adversaries retain some advantage.

## Why read this

Speech and machine learning researchers working on privacy-preserving generative audio should read this to understand how classifier-free guidance can be adapted for continuous control over paralinguistic attributes like prosody without retraining models.

## Code

- https://github.com/rsmlgen/diffanon

## Applications

Privacy-preserving voice modification software, anonymized speech data collection for conversational AI training, and secure voice communication tools.

## Institutions / 機構

Johns Hopkins University

**Funding / 經費:** National Science Foundation, Office of the Director of National Intelligence

## Related

- [VerAno: Speaker Anonymization via Self-Supervised Tokenization and Conditional Flow Matching](le26_interspeech.md) — same problem · relatedness 2.9/3
- [DECRA: Dynamic Emotion Control for Real-time Speech Anonymization](nasrallah26_interspeech.md) — same problem · relatedness 2.9/3
- [DP-VOXLET: Provable Speaker Anonymization for Disentangled Speech Representations](ngong26_interspeech.md) — same problem · relatedness 2.8/3
- [Controlled Generation of Synthetic Speaker Vectors for Voice Anonymization](kolos26_interspeech.md) — same problem · relatedness 2.7/3
- [Reducing Speaker Residual by Considering Pinhole Effect in Voice Anonymization](liu26q_interspeech.md) — same problem · relatedness 2.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
