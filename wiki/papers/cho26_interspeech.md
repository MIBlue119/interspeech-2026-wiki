---
id: cho26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-885
pdf: https://www.isca-archive.org/interspeech_2026/cho26_interspeech.pdf
---

# Acoustic Prompting via Stage-wise Modulation for Few-Shot Learning in Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/cho26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cho26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-885)

**TL;DR** — Audio-Side Prompt Learning (ASPL) introduces light, continuous, multi-level affine modulations into the frozen audio encoder of Audio-Language Models, improving few-shot classification accuracy by an average of about 1.1% across 11 datasets with minimal parameter overhead.

## Problem

Existing prompt learning techniques for Audio-Language Models (ALMs) are exclusively text-centric, keeping the audio encoder entirely static. This introduces a bottleneck because audio signals suffer from continuous high-dimensional variations, background noise, and domain shifts that text-only prompts cannot resolve on their own. Mutual adaptation of both modalities is required for optimal cross-modal alignment.

## Method

The framework utilizes a CLAP-HTSAT audio encoder and a CLIP text encoder, both of which are completely frozen during training. ASPL injects learnable, channel-wise affine transformations (scaling parameter gamma and bias parameter beta) at three targeted stages: log-mel spectrogram extraction, the patch embedding output interface, and the early Swin Transformer block (forming the expanded ASPL* configuration). These continuous prompt vectors are shared across all classes and instances, ensuring extreme parameter efficiency independent of the dataset label space. The models are trained using cross-entropy loss and SGD for 100 epochs with a batch size of 16.

## Results

Evaluated across 11 downstream datasets covering instrument, sound event, emotion, vocal sound, surveillance, acoustic scene, and music classification under a 16-shot setting across three seeds. Integrated into text-side baselines like CoOp, CoCoOp, and PALM, ASPL and ASPL* yield consistent average accuracy gains (e.g., boosting PALM from 77.86% to 79.26% on average). Ablations show that early-layer structural conditioning outperforms late-layer conditioning, and simultaneous multi-stage modulation is necessary to prevent representational disruption.

## Code

- https://github.com/hyebin-c/aspl

## Applications

Engineers and researchers deploying Audio-Language Models for few-shot audio classification and sound recognition tasks under resource-constrained scenarios.

## Limitations

A slight performance degradation is observed in 1-shot settings due to insufficient supervision for optimizing continuous acoustic prompts without minor overfitting.

## Related

- (link related pages by id as the wiki grows)
