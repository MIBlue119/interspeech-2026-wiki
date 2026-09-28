---
id: filippakopoulos26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1299
---

# Segregate, Refine, Integrate: Decomposing Multimodal Fusion for Sentiment Analysis

**TL;DR** — SeRIn splits multimodal sentiment fusion into isolated per-modality refinement pathways plus a deferred cross-modal integration step, achieving state-of-the-art results on CH-SIMS and CMU-MOSEI.

## Problem

Multimodal fusion has to both refine each modality's own signal and model cross-modal interactions, but these two goals are usually entangled in a single fused operation, which the authors argue limits performance.

## Method

SeRIn (Segregate, Refine, Integrate) architecturally separates the two goals: modality-specific representations evolve along isolated pathways refined against their own encoder context, a dedicated cross-modal pathway accumulates joint evolution without contaminating the unimodal streams, and full cross-modal interaction is deferred to a final prediction step.

## Results

Ablations confirm the structured separation itself — not just added model capacity — drives the gains, and gate analysis under visual corruption shows emergent modality reweighting without explicit supervision; SeRIn achieves state-of-the-art results and improves all metrics on both the CH-SIMS and CMU-MOSEI benchmarks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multimodal sentiment and affect analysis systems that combine speech, text, and vision, including robustness to degraded or missing modalities.

## Related

- (link related pages by id as the wiki grows)
