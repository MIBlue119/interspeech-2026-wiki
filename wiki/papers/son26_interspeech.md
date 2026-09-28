---
id: son26_interspeech
category: on-device
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-855
---

# Teacher-Agnostic Temporal Knowledge Distillation for Resource-Efficient Sound Event Detection

**TL;DR** — A knowledge-distillation framework that works with any teacher architecture, plus a temporal-context projector and confidence-aware loss, gets competitive sound event detection accuracy with a model under 5M parameters.

## Problem

Sound event detection (SED) needs frame-level, temporally precise detection, but recent work has focused on high-capacity models, leaving resource-efficient SED relatively underexplored.

## Method

The authors propose teacher-agnostic temporal knowledge distillation (TAT-KD), which distills from any teacher architecture using teacher logits as a common distillation space, adding a conformer-based temporal context projector to model temporal dependencies during projection and a teacher-confidence-aware distillation loss that downweights ambiguous teacher outputs via normalized confidence weights.

## Results

On the domestic environment SED benchmark, TAT-KD outperforms both training-from-scratch and logit-/feature-based KD baselines, achieving a polyphonic sound detection score of 0.574 with only 4.548M parameters and 3.668G MACs — competitive with state-of-the-art models using far fewer resources.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Resource-constrained, on-device sound event detection for smart home and IoT audio-monitoring devices.

## Related

- (link related pages by id as the wiki grows)
