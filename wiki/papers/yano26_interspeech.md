---
id: yano26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2099
pdf: https://www.isca-archive.org/interspeech_2026/yano26_interspeech.pdf
---

# Adapting Text LLMs to Speech via Multimodal Depth Up-Scaling

[PDF](https://www.isca-archive.org/interspeech_2026/yano26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yano26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2099)

**TL;DR** — The paper introduces Multimodal Depth Up-scaling, which adapts frozen text LLMs into speech models by inserting and training new transformer or E-Branchformer layers, achieving competitive ASR performance while reducing text capability degradation by over 75%.

## Problem

Continual pre-training of text LLMs on speech data to build Speech LMs often causes catastrophic forgetting of original text capabilities. While experience replay requires unavailable pre-training data and parameter-efficient methods like LoRA lack sufficient capacity for modality adaptation, this work addresses the trade-off between acquiring speech skills and preserving text competency.

## Method

The method expands the base LLM vocabulary with semantic and acoustic speech tokens while freezing all original transformer layers. It then inserts 25% additional layers (either standard transformer or speech-tailored E-Branchformer blocks) via depth up-scaling, applying function-preserving initializations so added layers initially act as identity functions. The approach supports evenly interleaved, sandwich, or localized layer placements, and added layers can be completely dropped at inference to recover the exact pre-trained text model. Experiments use SmolLM2-360M and SmolLM2-1.7B trained on 48k hours of English ASR data from OWSM v3.2.

## Results

Evaluated on LibriSpeech WER and an average of 8 text benchmarks, multimodal depth up-scaling matches full fine-tuning ASR accuracy while drastically reducing text degradation. On the SmolLM2-1.7B model, interleaving E-Branchformer added layers achieves a LibriSpeech WER of 2.3 clean and 5.3 other (surpassing full fine-tuning's 2.3 and 5.6), while limiting text task drop to -6.8% (compared to -32.6% for full fine-tuning and -8.3% to -9.6% for LoRA) using 60% fewer trainable parameters. Ablations confirm that interleaved placement outperforms bottom, middle, top, or sandwich strategies, and the proposed function-preserving initialization for E-Branchformer is critical for stable training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers adapting pre-trained text LLMs into speech-capable models who need to retain general text instruction-following and translation abilities.

## Limitations

Evaluated primarily on English ASR data and English text benchmarks without investigating multilingual transfer or non-ASR speech downstream tasks.

## Related

- (link related pages by id as the wiki grows)
