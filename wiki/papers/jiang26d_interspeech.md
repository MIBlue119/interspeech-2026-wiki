---
id: jiang26d_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1121
---

# FreeSonic: Training-Free Temporal-Aware Decoupled Attention for Precise Audio Editing

**TL;DR** — FreeSonic edits specific segments of generated audio — adding, removing, or replacing sounds — without any additional training, by manipulating attention inside a pretrained text-to-audio diffusion model while preserving the rest of the clip.

## Problem

Text-to-audio generation has advanced quickly, but precise, temporally consistent editing of existing audio (changing one part while preserving the acoustic context around it) remains hard to do well.

## Method

Built on the Rectified Flow-based TangoFlux model, FreeSonic uses an optimized inversion-reverse process with joint text-audio attention maps to locate the target segment precisely, a scheduled attention-decoupling mechanism to confine edits to that region, and task-oriented noise injection to support operations like removal and non-rigid replacement.

## Results

Experiments show FreeSonic achieves a strong balance of high fidelity and efficiency for precise, consistent audio editing compared to existing methods; demos are released online.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Sound design, podcast/video post-production, and any workflow needing targeted edits to generated or existing audio clips without retraining a model.

## Related

- (link related pages by id as the wiki grows)
