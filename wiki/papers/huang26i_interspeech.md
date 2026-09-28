---
id: huang26i_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1471
---

# Align-Consistency: Improving Non-autoregressive and Semi-supervised ASR with Consistency Regularization

**TL;DR** — Extending consistency regularization to a non-autoregressive iterative-refinement ASR model, and using it to generate fast online pseudo-labels, boosts both fully-supervised and semi-supervised accuracy.

## Problem

Consistency regularization improves CTC robustness and accuracy by keeping predictions stable under input perturbation, but it had not been extended to non-autoregressive iterative-refinement ASR models where predictions across refinement steps could also be stabilized.

## Method

The authors propose Align-Consistency, extending consistency regularization to Align-Refine, a non-autoregressive model that iteratively refines frame-level hypotheses, applying it to both the base CTC model and the refinement steps, and using fast non-AR decoding to generate online pseudo-labels on unlabeled data for semi-supervised training.

## Results

In the fully supervised setting, applying consistency regularization to both the base model and refinement steps is critical, and gains from non-AR decoding and consistency regularization are mutually additive; in the semi-supervised setting, fast pseudo-labeling with Align-Consistency yields substantial further gains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Faster, more accurate non-autoregressive ASR systems in both fully-supervised and semi-supervised training regimes.

## Related

- (link related pages by id as the wiki grows)
