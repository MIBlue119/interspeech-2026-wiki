---
id: turavecino26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-803
---

# Learnable Classifier-Free Guidance Null Embeddings for Enhanced Controllable Speech Synthesis

**TL;DR** — Replacing the fixed empty 'null' vector in classifier-free guidance with a learned unconditional embedding improves TTS speaker similarity, stability, and expressiveness, and lets each conditioning modality be tuned independently.

## Problem

Classifier-free guidance in TTS commonly uses a fixed empty vector to represent the unconditional case, but this may not represent a meaningful unconditional state, potentially limiting generation quality and controllability.

## Method

The authors replace the fixed null vector with a learnable unconditional embedding optimized during training, and further learn a distinct unconditional embedding for each TTS conditioning modality (e.g. speaker, text) to enable fine-grained separate control.

## Results

Objective and subjective evaluations show learnable null embeddings consistently outperform fixed null embeddings on speaker similarity, speech stability, and expressiveness, with greater robustness to larger guidance scales, and per-modality embeddings expose a tunable trade-off between similarity/quality and stability/expressiveness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improved controllability and quality for classifier-free-guidance-based TTS systems that need fine-grained control over speaker identity versus expressiveness.

## Related

- (link related pages by id as the wiki grows)
