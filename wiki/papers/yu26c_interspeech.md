---
id: yu26c_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1075
pdf: https://www.isca-archive.org/interspeech_2026/yu26c_interspeech.pdf
---

# Learning to Attend to Depression-Related Patterns: An Adaptive Cross-Modal Gating Network for Depression Detection

[PDF](https://www.isca-archive.org/interspeech_2026/yu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1075)

**TL;DR** — An adaptive cross-modal gating network for speech-based depression detection selectively attends to sparse diagnostic segments, achieving 81.25% average accuracy on PDCD2025.

## Problem

Standard automatic depression detection methods extract frame-level features and compress them uniformly, incorrectly assuming that diagnostic indicators are distributed evenly across an utterance. However, depression-related speech and text are sparse, localized in specific acoustic regions like low-energy pauses and linguistic markers like negative sentiment. Ignoring this sparsity leads to suboptimal classification performance by treating noisy or neutral segments with equal importance.

## Method

The architecture uses a dual-branch design combining frozen 12th-layer HuBERT acoustic features and instruction-aware Qwen-Embedding-0.6B textual features derived from WeNet ASR transcripts. An Adaptive Cross-Modal Gating (ACMG) module computes global context summaries via masked mean pooling and generates cross-modal or unimodal gating weights via sigmoid-activated linear projections. These weights modulate the representations element-wise to amplify salient frames and tokens before passing them through modality-specific Transformer encoders and an MLP classifier. The model is trained on multimodal audio-text session data using cross-validation and standard evaluation benchmarks.

## Results

Evaluated on the PDCD2025 dataset (5-fold cross-validation, 272 participants) and the DAIC-WOZ benchmark (development set, 189 interviews). On PDCD2025, adding cross-modal ACMG improves average accuracy from 79.78% (baseline Qwen Transformer) to 81.25%, and outperforms RoBERTa-based models. On DAIC-WOZ, the model achieves a 69.39% F1 score using participant speech segments. Pearson correlation analysis between acoustic gating weights and eGeMAPS energy reveals an inverse relationship of -0.329 overall, intensifying from -0.263 in normal subjects to -0.374 in moderate depression cases.

## Code

- https://github.com/wenet-e2e/wenet

## Applications

Clinicians, telehealth platforms, and digital health software developers building non-invasive, continuous mental health monitoring and early depression screening tools.

## Limitations

The study relies on audio and transcript modalities without exploring visual cues or alternative gating computation strategies.

## Related

- (link related pages by id as the wiki grows)
