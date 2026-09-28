---
id: ilerisoy26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2235
---

# Zero-Shot Respiratory Sound Classification through LLM-Augmented Audio-Text Alignment

**TL;DR** — Aligning a self-supervised respiratory sound encoder with LLM-synthesized medical reports turns it into a zero-shot classifier that beats CLAP and Qwen2-Audio on respiratory diagnostics.

## Problem

Self-supervised respiratory sound encoders lack grounding in clinical terminology, so they need task-specific labeled data and cannot perform zero-shot inference for diagnostic tasks.

## Method

The authors align respiratory encoders with medical terminology in a shared latent space, using a medical LLM to synthesize structured reports from metadata as dense semantic anchors for contrastive learning (since paired audio-report data is scarce), combining a sigmoid-based contrastive loss with the encoder's native self-supervised objective and similarity-aware negative sampling.

## Results

Across 9 tasks on 6 datasets, the method reaches 61.3% mean zero-shot AUC versus 51.4% for CLAP and 54.9% for Qwen2-Audio, and achieves the highest linear-probing AUC (71.6%) using only 43% of the data used by full-scale baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Zero-shot or low-data clinical diagnostic tools for respiratory sound analysis (e.g., screening for respiratory conditions from stethoscope recordings) where labeled data is scarce.

## Related

- (link related pages by id as the wiki grows)
