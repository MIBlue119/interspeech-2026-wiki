---
id: li26fa_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2437
pdf: https://www.isca-archive.org/interspeech_2026/li26fa_interspeech.pdf
---

# Language-Invariant Multilingual Speaker Verification for the TidyVoice 2026 Challenge

[PDF](https://www.isca-archive.org/interspeech_2026/li26fa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26fa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2437)

**TL;DR** — This paper presents a language-invariant multilingual speaker verification system leveraging w2v-BERT 2.0, adversarial training, and zero-shot text-to-speech data augmentation, achieving a significant EER reduction on the TidyVoice 2026 Challenge benchmark.

## Problem

Multilingual speaker verification suffers from performance drops under language mismatch conditions and embedding entanglement where speaker identity mixes with language characteristics. This is exacerbated by English-centric datasets and limited multilingual speech samples per individual speaker, hindering cross-lingual generalization.

## Method

The system employs a 24-layer w2v-BERT 2.0 backbone pretrained on 4.5 million hours of speech, augmented with Layer Adapters and Multi-scale Feature Aggregation (MFA) followed by Attentive Statistics Pooling (ASP). It uses Low-Rank Adaptation (LoRA) for fine-tuning and incorporates a language-adversarial training strategy via a Gradient Reversal Layer (GRL) connected to an auxiliary language classifier. To enrich language diversity, Qwen3-TTS synthesizes speech across 10 languages using LibriTTS texts and Whisper transcriptions from reference audio. Training combines large-scale public datasets (VoxCeleb2, VoxBlink2, 3D-Speaker, KeSpeech, CN-Celeb1&2) with the TidyVoiceX training set, utilizing SphereFace2 and Quality Measure Function (QMF) score calibration.

## Results

Evaluated on the TidyVoice 2026 challenge sets, the fine-tuned w2v-BERT 2.0 model without TidyVoiceX data achieves a 2.74% EER on the dev set, representing an 11% relative reduction over the official SimAM-ResNet34 baseline (3.07%). SphereFace2-C loss significantly outperforms ArcFace by aligning training objectives with pairwise evaluation protocols. Purely synthetic speech augmentation yields a competitive 1.022% EER on the dev set compared to 0.95% using real data. Incorporating GRL adversarial training and QMF calibration further optimizes robustness across seen and unseen languages.

## Code

- https://github.com/ZXHY-82/LI-MSV-TidyVoice2026

## Applications

Speech engineers and researchers building robust multilingual speaker verification and biometric recognition systems for cross-lingual operational environments.

## Limitations

Augmenting training data with synthetic speech did not yield further performance improvements over models trained solely on real data.

## Related

- (link related pages by id as the wiki grows)
