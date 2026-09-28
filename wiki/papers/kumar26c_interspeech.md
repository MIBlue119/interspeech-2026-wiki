---
id: kumar26c_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1007
---

# Overcoming Decoder Inconsistencies in Whisper for Dravidian and Low-Resource Languages

**TL;DR** — Two decoder-level fixes for Whisper that reduce its disproportionately high error rates on Dravidian languages by rebalancing how much it trusts linguistic context versus acoustic cues.

## Problem

Whisper performs well on high-resource languages but has substantially higher WER on Dravidian languages than Indo-Aryan ones, driven by longer words, higher vocabulary diversity, sparse token distributions, and decoder imbalance between self-attention and cross-attention.

## Method

Introduces two decoder-level enhancements: Weighted-Attention, which adaptively balances linguistic self-attention against acoustic cross-attention, and Self-Conditioning, which reinjects intermediate predictions to improve token consistency.

## Results

Experiments show consistent WER reductions for Dravidian and other low-resource, agglutinative languages compared to baseline fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving multilingual ASR quality for Dravidian and other agglutinative low-resource languages without new pretraining data.

## Related

- (link related pages by id as the wiki grows)
