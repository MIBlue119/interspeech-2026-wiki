---
id: ilerisoy26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2235
pdf: https://www.isca-archive.org/interspeech_2026/ilerisoy26_interspeech.pdf
---

# Zero-Shot Respiratory Sound Classification through LLM-Augmented Audio-Text Alignment

[PDF](https://www.isca-archive.org/interspeech_2026/ilerisoy26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ilerisoy26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2235)

**TL;DR** — The paper introduces REACH, a semantic alignment framework that converts pre-trained unimodal respiratory sound encoders into zero-shot capable models using LLM-augmented medical reports, achieving a 61.3% mean zero-shot AUC across 9 tasks.

## Problem

Self-supervised respiratory encoders lack semantic grounding in clinical terminology, meaning they cannot perform zero-shot inference without task-specific labeled data. Because paired audio-report datasets do not exist at scale for respiratory health, training multimodal models from scratch is impractical. This leaves current diagnostic tools dependent on scarce, expert-curated annotations.

## Method

The framework leverages a medical-grade LLM (GPT-4) to synthesize structured clinical reports from discrete patient metadata, producing dense semantic anchors. It couples a pre-trained transformer-based respiratory audio encoder with a frozen medical text encoder (from MedSigLIP) using lightweight linear projection heads with layer normalization. The training objective combines a SigLIP-based sigmoid contrastive loss with the audio encoder's native masked spectrogram reconstruction mean squared error (MSE) loss to prevent feature degradation. Additionally, it implements similarity-aware negative sampling via an offline FAISS index to mine distant clinical negatives (selecting the 10th furthest embedding).

## Results

Evaluated across 9 tasks on 6 public datasets (spanning in-domain and out-of-domain settings), REACH achieves a mean zero-shot AUC of 61.3%, outperforming CLAP (51.4%) and Qwen2-Audio (54.9%). Furthermore, it attains the highest mean linear probing AUC of 71.6% while utilizing only 43% of the pre-training data required by full-scale baseline models.

## Code

- https://github.com/mtilerisoy/REACH

## Applications

Engineers and clinicians can use this framework to develop automated, objective respiratory screening tools that generalize to novel clinical pathologies without needing task-specific labeled training data, particularly in low-resource settings.

## Limitations

The text does not explicitly state notable limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
