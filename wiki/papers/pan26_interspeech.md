---
id: pan26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-908
pdf: https://www.isca-archive.org/interspeech_2026/pan26_interspeech.pdf
---

# Supervised Post-training of Speech Foundation Models for Robust Adaptation in Speech Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/pan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-908)

**TL;DR** — A mix-frame supervised post-training strategy is proposed to adapt speech foundation models for deepfake detection, achieving a state-of-the-art EER of 4.50% on ASVspoof5 without data augmentation.

## Problem

Directly fine-tuning speech self-supervised learning (SSL) models for deepfake detection often fails because pre-training objectives prioritize phonetic and speaker content rather than subtle, localized spoofing artifacts like spectral discontinuities. Furthermore, utterance-level supervision tends to dilute these localized cues, causing models to overfit to known training attacks and struggle with out-of-domain generalization. This vulnerability becomes especially pronounced in low-resource data regimes where target training sets are small.

## Method

The method introduces Mix-Frames Post-Training (MFPT) using a WavLM-Large backbone. In the first stage, waveforms are cropped or padded to 4 seconds, and a random segment from an opposite-class injector utterance is spliced in using a mix ratio between 10% and 30% to deliberately disrupt local temporal coherence. Binary frame-level supervision is assigned based on the exact sample boundaries of the spliced region, and a linear head classifies the frames via binary cross-entropy. Parameter updates during both post-training and downstream fine-tuning are restricted to Low-Rank Adaptation (LoRA) adapters (rank 32) applied concurrently to self-attention projections (Q, K, V) and feed-forward dense layers, while backbone weights remain frozen. The final stage uses an attentive merging module and an ECAPA-TDNN classifier to perform utterance-level fine-tuning via cross-entropy loss.

## Results

Evaluated on ASVspoof benchmarks, the model achieves a single-model state-of-the-art EER of 4.50% on ASVspoof5 without data augmentation when using a mix ratio of 10-30% and an ECAPA-TDNN backend. On ASVspoof2021 LA and DF, it yields an absolute EER gap of only 0.16%, demonstrating balanced robustness across distortion conditions. In low-resource adaptation settings using fractions of ASVspoof19 LA, the post-trained models consistently outperform models without post-training across all data splits.

## Code

- https://github.com/pandarialTJU/Mix-Frame-

## Applications

Engineers and researchers building biometric security systems, voice authentication countermeasures, and media forensics tools can use this approach to develop robust deepfake speech detectors.

## Limitations

The text does not state any explicit limitations.

## Related

- (link related pages by id as the wiki grows)
