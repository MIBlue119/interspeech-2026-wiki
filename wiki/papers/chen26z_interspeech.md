---
id: chen26z_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2447
pdf: https://www.isca-archive.org/interspeech_2026/chen26z_interspeech.pdf
---

# DiaMoE-TTS: A Unified IPA-Based Dialect TTS Framework with Parameter-Efficient Adaptation and Reward-Driven Optimization

[PDF](https://www.isca-archive.org/interspeech_2026/chen26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2447)

**TL;DR** — DiaMoE-TTS is a unified, IPA-frontended text-to-speech framework built on F5-TTS that utilizes dialect-aware Mixture-of-Experts, parameter-efficient fine-tuning, and Flow-GRPO reinforcement learning to achieve robust zero-shot multi-dialect synthesis with only ~1.1k hours of training data.

## Problem

Building unified multi-dialect text-to-speech systems remains difficult due to scarce, heterogeneous speech data, inconsistent orthographic conventions, and pronunciation ambiguity caused by shared characters across disparate dialects. Without structural guidance, joint training suffers from style averaging and phonological interference, while expanding to low-resource dialects with only a few hours of data typically causes severe overfitting or catastrophic forgetting.

## Method

The framework builds upon the non-autoregressive F5-TTS architecture using an Optimal Transport Conditional Flow Matching (OT-CFM) and Diffusion Transformer (DiT) backbone, initialized from a pre-trained Mandarin-English checkpoint (Stage 0). Stage 1 and 2 perform joint multidialect training using a standardized International Phonetic Alphabet (IPA) front-end to eliminate character ambiguity, combined with a residual dialect-style Mixture-of-Experts (MoE) module inserted after the text embedding layer and guided by an auxiliary dialect classification loss. Stage 3 adapts to new low-resource dialects using parameter-efficient fine-tuning (PEFT) via LoRA (rank 16, alpha 1) on query-value attention projections and Conditioning Adapters while freezing the main model, accompanied by pitch/time-scale audio augmentations (factors 0.85 to 1.15). Finally, high-quality data integration is explored via Flow-GRPO reinforcement learning, optimizing a word error rate (WER) reward derived from an external ASR model while updating only the DiT backbone.

## Results

Evaluated across multiple Chinese dialects (YUE, SH, CD, XA, ZZ, TJ, NAN, SJZ, NJ, Jingbai, and Yunbai) using ~0.7k hours of Mandarin and ~0.4k hours of dialect data, comparing against Edge TTS, CosyVoice2, and Qwen-TTS. Ablation studies confirm that replacing the IPA front-end with pinyin causes catastrophic failure (WER spiking from ~33% to over 90%), and removing the dialect MoE degrades both MOS and WER. Furthermore, Flow-GRPO optimization on high-quality Chengdu (CD) dialect data improves UTMOSv2 to 3.15 and reduces WER to 23.93%, outperforming standard continued training (29.15% WER).

## Code

- https://github.com/GiantAILab/DiaMoE-TTS

## Applications

Speech engineers and developers building culturally diverse, low-resource, or multi-dialect text-to-speech systems and regional voice cloning applications.

## Limitations

The model exhibits higher absolute word error rates on phonologically distant or stylized varieties like Southern Min (74.39% WER) and Yunbai Peking Opera (61.30% WER), and current reinforcement learning reward signals rely strictly on pronunciation accuracy rather than prosody or naturalness.

## Related

- (link related pages by id as the wiki grows)
