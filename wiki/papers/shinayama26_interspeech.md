---
id: shinayama26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1630
pdf: https://www.isca-archive.org/interspeech_2026/shinayama26_interspeech.pdf
---

# Upcycling Pretrained Transformers into Mixture-of-Experts for Multilingual Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/shinayama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shinayama26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1630)

**TL;DR** — Upcycling the feed-forward network layers of pretrained Transformer speech models into a mixture-of-experts architecture mitigates negative transfer during multilingual fine-tuning, outperforming standard multilingual training and LoRA-based mixture-of-experts.

## Problem

Multilingual automatic speech recognition often suffers from negative knowledge transfer when diverse languages share a single parameter space and limited model capacity, leading to performance degradation compared to separate monolingual models. While parameter-efficient adaptation methods like LoRA-based mixture-of-experts help, their bottleneck modules constrain effective representational capacity. This paper addresses these capacity bottlenecks by directly expanding model capacity without increasing inference computation.

## Method

The proposed approach converts the feed-forward network (FFN) layers of the Whisper decoder into a sparse mixture-of-experts (MoE) architecture via upcycling, duplicating pretrained FFN parameters to form multiple distinct experts while keeping self-attention layers shared. During inference, top-1 sparse routing activates only a single expert per token, ensuring that active parameters and compute costs remain identical to the original dense model. The authors examine soft routing (with or without auxiliary language embeddings) and language-wise hard routing, where each expert maps deterministically to a specific training language.

## Results

Evaluated on a 10-language subset of CommonVoice and a 4-language Asian dataset using the Whisper-small backbone, language-wise hard routing achieves the best overall performance, surpassing standard multilingual fine-tuning and even outperforming monolingual fine-tuning upper bounds. On CommonVoice 10 languages, language-wise hard routing reduces error rates across both Western and non-Western subsets compared to the multilingual baseline. Ablation studies reveal that applying MoE exclusively to the top 3 to 6 decoder layers yields performance comparable to full-layer MoE while utilizing significantly fewer trainable parameters. Furthermore, upcycling larger Whisper models (medium and large-v2) demonstrates consistent statistically significant improvements.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building multilingual speech recognition systems who need to scale performance across diverse languages without inflating test-time inference compute.

## Limitations

Soft routing architectures can exhibit performance variations depending on the language due to noisy routing probabilities and may require improved expert diversification strategies.

## Related

- (link related pages by id as the wiki grows)
