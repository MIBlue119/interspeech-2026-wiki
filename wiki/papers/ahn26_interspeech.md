---
id: ahn26_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2897
pdf: https://www.isca-archive.org/interspeech_2026/ahn26_interspeech.pdf
---

# Context-Adaptive Automated Audio Captioning with Symmetric Dual-MoE and Dynamic Reward Routing

[PDF](https://www.isca-archive.org/interspeech_2026/ahn26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ahn26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2897)

**TL;DR** — The paper introduces a symmetric dual mixture-of-experts automated audio captioning framework optimized via group relative policy optimization, achieving state-of-the-art semantic alignment and human preference scores on Clotho and AudioCaps.

## Problem

Standard automated audio captioning systems optimize uniform cross-entropy objectives or static reward formulations, failing to adapt to heterogeneous acoustic environments. This causes poor contextual adaptability, a mismatch between training metrics and evaluation goals, and an inability to capture fine-grained audio-text alignments. Traditional reinforcement learning approaches also suffer from high computational complexity and static reward weighting.

## Method

The architecture utilizes a pretrained BART-base decoder augmented with LoRA-based mixture-of-experts in the feed-forward layers of the 4th and 5th blocks, guided by cross-attention routing conditioned on acoustic context. The reward model employs parallel RoBERTa-based LoRA experts and an Audio-Text Fusion Transformer to decompose caption quality into semantic relevance, grammatical correctness, lexical diversity, and fine-grained alignment, which are dynamically aggregated using a context-aware reward router. Training is performed in two stages: supervised cross-entropy pretraining followed by reinforcement learning using group relative policy optimization with variance-clamped normalization.

## Results

Evaluated on Clotho v2.1 and AudioCaps datasets, comparing against supervised and reinforcement learning baselines including CIDEr [21] and CRRP [22]. On Clotho v2.1, the proposed model achieved top performance across multiple automatic metrics, including a CIDEr score of 0.4137, S-BERT similarity of 0.4803, FENSE of 0.4642, and SPIDEr-FL of 0.2626. On AudioCaps, it yielded an S-BERT similarity of 0.6937 and SPIDEr-FL of 0.3570. Human evaluation (30 annotators) confirmed superior caption naturalness (MOSn of 4.16 on Clotho, 4.22 on AudioCaps) and audio-text alignment (MOSa of 4.52 on Clotho, 3.96 on AudioCaps). Ablations confirmed that removing either the policy MoE, the reward MoE, or any individual reward component degrades performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building automated audio captioning systems for multimedia indexing, audio surveillance, and content accessibility.

## Related

- (link related pages by id as the wiki grows)
