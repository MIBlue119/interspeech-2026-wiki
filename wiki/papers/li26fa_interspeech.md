---
id: li26fa_interspeech
category: speaker
labels: [multilingual, self-supervised]
institutions: ["Wuhan University", "Chinese University of Hong Kong, Shenzhen", "Duke Kunshan University"]
code: https://github.com/ZXHY-82/LI-MSV-TidyVoice2026
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2437
pdf: https://www.isca-archive.org/interspeech_2026/li26fa_interspeech.pdf
---

# Language-Invariant Multilingual Speaker Verification for the TidyVoice 2026 Challenge

*Ze Li, Xiaoxiao Miao, Juan Liu, Ming Li*

[PDF](https://www.isca-archive.org/interspeech_2026/li26fa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26fa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2437)

**Category:** `speaker` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — A language-invariant multilingual speaker verification system is developed for the TidyVoice 2026 Challenge by combining a w2v-BERT 2.0 backbone, SphereFace2 loss, language-adversarial training via gradient reversal, and zero-shot TTS augmentation, achieving an EER of 0.89% on the development set.

## Key contributions

- Adapts the 4.5-million-hour multilingual self-supervised w2v-BERT 2.0 model with Layer Adapters, Multi-scale Feature Aggregation (MFA), and Attentive Statistics Pooling for robust speaker embedding extraction.
- Applies a Gradient Reversal Layer (GRL) and an auxiliary language classifier for language-adversarial training to force embeddings to be language-invariant.
- Investigates the use of SphereFace2 (configs A and C) over ArcFace, aligning the training loss's hyperspherical binary classification objective with pairwise verification protocols.
- Explores multilingual zero-shot text-to-speech (ZS-TTS) data augmentation using Qwen3-TTS-12Hz-1.7B-Base across 10 languages to synthesize 349,500 utterances from 3,495 reference files.

## Problem

Multilingual speaker verification suffers significant performance degradation under language mismatch conditions, worsened by an over-reliance on English-centric corpora. Limited multilingual speech per speaker causes embeddings to entangle speaker identity with language-specific traits, reducing cross-lingual generalization. Prior standard multi-class formulations like ArcFace also mismatch the pairwise similarity evaluation protocol used in verification.

## Method

The system processes 80-dimensional fbank features (25ms window, 10ms hop) through a 24-layer Conformer w2v-BERT 2.0 backbone. Hidden representations from every layer pass through individual Layer Adapters to lower dimensionality and adapt domains. Adapted features are concatenated, aggregated via Attentive Statistics Pooling (ASP), and projected to yield a speaker embedding. Low-Rank Adaptation (LoRA) is used during fine-tuning.

To decouple speaker identity from language, an auxiliary language classifier is attached to the embedding space via a Gradient Reversal Layer (GRL). The total objective combines speaker loss (ArcFace or SphereFace2) and scaled language loss: L = L_spk(C_spk(e), y_spk) + lambda_lang * L_lang(C_lang(GRL_lambda_GRL(e)), y_lang), where lambda_GRL and lambda_lang are both set to 0.1. Training occurs in two stages: pre-training on large public datasets (VoxCeleb2, VoxBlink2, 3D-Speaker, KeSpeech, CN-Celeb1&2) using an AdamW optimizer (learning rate 1e-4 decaying to 1e-5 via StepLR, batch length 200-300 frames) with on-the-fly MUSAN noise and RIR reverberation, followed by domain adaptation on TidyVoiceX.

Score calibration utilizes a Quality Measure Function (QMF) driven by logistic regression over trial metadata (enrollment/test durations, embedding magnitudes, and max-min normalized SNRs). For synthetic augmentation, Qwen3-TTS-12Hz-1.7B-Base translates LibriTTS English text via M2M100 into 10 target languages, using reference audio transcribed by Whisper-large-v3.

## Experimental setup

Evaluated on the TidyVoice 2026 Challenge development set (tv26-dev) and evaluation subsets (tv26-eval-A with seen languages, tv26-eval-U with 38 unseen languages). Training uses VoxCeleb2, VoxBlink2, 3D-Speaker, KeSpeech, CN-Celeb1&2, and TidyVoiceX. Baselines include the official TidyVoice 2026 challenge baseline (SimAMResNet34). Metrics reported are Equal Error Rate (EER %) and minimum Detection Cost Function (mDCF at p_target = 0.01).

## Results

Fine-tuning w2v-BERT 2.0 without TidyVoiceX data yields an EER of 2.74% on tv26-dev, an 11% relative reduction over the official baseline's 3.07%. Replacing ArcFace with SphereFace2-C drastically improves performance, dropping the tv26-dev EER to 1.065% (and 0.893% when incorporating CN-Celeb1&2 and QMF score calibration). On the challenge evaluation splits, the full system achieves 2.458% EER on tv26-eval-A and 4.451% EER on tv26-eval-U.

Ablations demonstrate that fine-tuning solely on TidyVoiceX specializes well for seen languages (tv26-dev/eval-A) but hurts unseen language generalization (tv26-eval-U), which requires pre-training data mixing. Synthetic speech augmentation via Qwen3-TTS achieves a competitive 1.022% EER on tv26-dev when trained entirely on synthetic data (using only 1/10th the real reference data), but combining it with real data yields no further gains under sufficient data regimes, indicating a domain mismatch.

| System | tv26-dev EER (%) | tv26-dev mDCF | tv26-eval-A EER (%) | tv26-eval-U EER (%) |
|---|---|---|---|---|
| Official Baseline [22] | 3.07 | 0.82 | 9.058 | 11.59 |
| w2v-BERT 2.0 Based (ArcFace) | 1.466 | 0.66 | - | - |
| w2v-BERT 2.0 Based SF2-C | 1.065 | 0.62 | 3.061 | 4.338 |
| w2v-BERT 2.0 + GRL + KeSpeech | 0.937 | 0.60 | 2.964 | 5.020 |
| w2v-BERT 2.0 + GRL + QMF + CN-Celeb | 0.893 | 0.60 | 2.458 | 4.451 |

## Limitations

Synthetic speech augmentation fails to improve performance when large amounts of real training data are already accessible due to domain gaps. The language-adversarial training provides only modest improvements in suppressing language-specific variations while occasionally hurting zero-shot unseen language error rates. Evaluation is constrained to the specific language distributions provided by the TidyVoice 2026 Challenge splits.

## Why read this

Researchers building state-of-the-art multilingual speaker verification systems will learn how to effectively combine large self-supervised conformer models, hyperspherical binary classification losses, and gradient-reversal language invariance strategies.

## Code

- https://github.com/ZXHY-82/LI-MSV-TidyVoice2026

## Applications

Cross-lingual speaker verification, multilingual speaker recognition, and zero-shot voice cloning security systems.

## Institutions / 機構

Wuhan University, Chinese University of Hong Kong, Shenzhen, Duke Kunshan University

**Funding / 經費:** National Natural Science Foundation of China, Yangtze River Delta Science and Technology Innovation Community Joint Research Project

## Related

- [LaS-LCA: Layer-Selected Latent Cross-Attention Adapters and Margin-Mixup for Robust Cross-Lingual Speaker Verification](shen26b_interspeech.md) — same problem · relatedness 3.0/3
- [Dual-LoRA: Parameter-Efficient Adversarial Disentanglement for Cross-Lingual Speaker Verification](shangguan26_interspeech.md) — same problem · relatedness 3.0/3
- [Cross-Lingual Speaker Verification with Self-Supervised Pre-Trained Models](peng26f_interspeech.md) — same problem · relatedness 3.0/3
- [Progressive Learning for Robust Speaker Representation](keetha26_interspeech.md) — same problem · relatedness 3.0/3
- [Orthogonal Feature Projection and Manifold-Constrained Neural PLDA for the TidyVoice2026 Cross-Lingual Speaker Verification Challenge](du26c_interspeech.md) — same problem · relatedness 3.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
