---
id: choi26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1854
pdf: https://www.isca-archive.org/interspeech_2026/choi26c_interspeech.pdf
---

# Considerate Listener Modeling for Korean Streaming Backchannel Prediction

[PDF](https://www.isca-archive.org/interspeech_2026/choi26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1854)

**TL;DR** — The paper proposes a zero look-ahead streaming backchannel predictor that combines pause-aware soft scaling and text-guided fusion, reducing Semantic False Discovery Rate by 53.8% on a Korean counseling corpus.

## Problem

Streaming backchannel predictors often over-predict during pauses that follow direct questions or directives where a response is pragmatically required rather than a backchannel. Acoustic cues alone cannot capture this discourse context, leading to intrusive false positives that disrupt conversational flow. The authors formalize this issue through a new metric called Semantic False Discovery Rate (Semantic FDR).

## Method

The architecture builds upon a shared streaming acoustic encoder with zero look-ahead frames, dividing audio into fixed-size blocks (40 ms frames, 4-frame hop). A pause detector (PD) estimates block-level pause probabilities to softly scale acoustic representations, concentrating decisions near pause boundaries. Concurrently, partial ASR hypotheses are compressed using a BLIP-2-style Q-Former with 16 queries and fused via cross-attention with a 1-layer Transformer encoder. The multitask objective is optimized using cross-entropy losses for both PD and backchannel prediction, with dynamic loss weighting.

## Results

Evaluated on a private Korean counseling corpus consisting of 116 sessions (~99 hours, split into 83/22/11 for train/val/test), the proposed method is compared against an acoustic-only baseline and individual component ablations. The full system achieves a Macro-F1 score of 68.93% (compared to 67.77% for the baseline) and reduces Semantic FDR from 5.76% to 3.07%, marking a 53.8% relative reduction in semantic false positives. Text fusion alone reaches the highest Macro-F1 at 69.14% with a 37.1% Semantic FDR reduction.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Conversational speech agents and social robots requiring natural, non-disruptive timing for reactive listening tokens.

## Limitations

Evaluated solely on a private Korean counseling dataset, which may limit generalizability to other languages or dialogue domains.

## Related

- (link related pages by id as the wiki grows)
