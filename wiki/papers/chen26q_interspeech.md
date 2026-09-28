---
id: chen26q_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1676
---

# Streaming Open-Vocabulary Keyword Spotting via Role Swapping in Cross-Attention

**TL;DR** — Swapping which signal plays the Query versus Key/Value role in cross-attention fixes a data-flow mismatch that was blocking streaming, open-vocabulary keyword spotting, enabling a tiny (~0.8M parameter) streaming-capable model.

## Problem

Attention-based open-vocabulary keyword spotting normally treats streaming speech as Key/Value (needing global context it doesn't have yet in streaming mode) and the enrolled keyword as Query (carrying only local info despite being globally meaningful), which blocks efficient streaming deployment.

## Method

The authors swap these roles: streaming speech becomes the Query, carrying frame-level local information, while the enrollment representation becomes Key/Value, encoding global semantics, which enables genuinely streaming processing; they instantiate this as a small text-registered model.

## Results

On LibriPhrase the ~0.8M-parameter model achieves EER/AUC of 6.82%/97.95% on the easy negative subset and 28.21%/79.19% on the hard negative subset.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device, low-power streaming keyword spotting for wake words and custom voice triggers where open-vocabulary enrollment is needed.

## Related

- (link related pages by id as the wiki grows)
