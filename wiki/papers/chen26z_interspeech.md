---
id: chen26z_interspeech
category: tts
labels: [low-resource, generative-model]
institutions: ["Tsinghua University", "Giant Network"]
code: https://github.com/GiantAILab/DiaMoE-TTS
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2447
pdf: https://www.isca-archive.org/interspeech_2026/chen26z_interspeech.pdf
---

# DiaMoE-TTS: A Unified IPA-Based Dialect TTS Framework with Parameter-Efficient Adaptation and Reward-Driven Optimization

*Ziqi Chen, Gongyu Chen, Yihua Wang, Zihao Chen, Wei-Qiang Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2447)

**Category:** `tts` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — DiaMoE-TTS is a unified, low-resource dialect text-to-speech framework built on F5-TTS that utilizes a shared IPA front-end, a dialect-aware Mixture-of-Experts text encoder, parameter-efficient fine-tuning, and Flow-GRPO reinforcement learning. It enables high-quality speech generation across diverse Chinese dialects using only 1.1k hours of total training data.

## Key contributions

- Constructs a unified International Phonetic Alphabet (IPA) front-end to eliminate pronunciation ambiguities inherent in pinyin or character representations across Chinese dialects.
- Introduces a residual Mixture-of-Experts (MoE) module in the text embedding layer with an auxiliary classification loss to mitigate style averaging during joint multi-dialect training.
- Proposes a scalable parameter-efficient fine-tuning (PEFT) strategy combining LoRA and conditioning adapters with pitch/time-scale audio augmentation to adapt to new dialects using under 3 hours of speech.
- Applies Flow-GRPO reinforcement learning with an external ASR-based reward model to leverage high-quality dialect data, improving phonetic consistency and reducing WER across both target and related dialects.

## Problem

Building unified multi-dialect TTS models is hindered by data scarcity, inconsistent orthographic conventions, and dialect interference (style averaging) during joint training. Existing systems rely heavily on character or pinyin inputs, which introduce phonetic ambiguity when the same character maps to multiple regional pronunciations. Furthermore, low-resource dialects often have only a few hours of audio, causing standard fine-tuning to suffer from catastrophic forgetting or severe overfitting.

## Method

DiaMoE-TTS builds upon the F5-TTS architecture, which uses Optimal Transport Conditional Flow Matching (OT-CFM) and a Diffusion Transformer (DiT) backbone with ConvNeXt V2 text encoder blocks. The framework operates in four stages. Stage 0 initializes from a pre-trained F5-TTS checkpoint trained on Mandarin and English. Stages 1 and 2 perform joint training on a unified IPA phoneme space covering Mandarin and multiple dialects; Stage 2 introduces the dialect-style residual MoE module after text embedding. The MoE consists of multiple expert networks routed by a learnable gating mechanism driven by an auxiliary dialect classification loss (cross-entropy with lambda = 0.1). 

Stage 3 adapts to extremely low-resource dialects by freezing the backbone and MoE while applying LoRA (rank=16, alpha=1) to query and value projections in attention layers, alongside conditioning adapters. Training data for new dialects are augmented using pitch and time-scale modification factors (0.85, 0.9, 0.95, 1.05, 1.1, 1.15). For high-quality data integration, the paper applies Flow-GRPO reinforcement learning (group size 8, effective group number 12, KL weight 0.1, noise level alpha=0.4, SDE window steps 2-6, 10 diffusion steps, learning rate 1e-7) optimizing an ASR transcription consistency reward using Qwen3-ASR.

During training, AdamW is used with a peak learning rate of 7.5e-5, 2k warmup steps, and linear decay over 200k steps with 28k frames per GPU batch size. PEFT modules are trained for 100k steps at a 1e-5 learning rate.

## Experimental setup

Evaluated on Common Voice Cantonese, Emilia Mandarin, KeSpeech corpus, a Southern Min dataset, and commercial Shanghai and Tianjin datasets, plus 3 hours of Peking Opera (Jingbai/Yunbai) and Nanjing dialect for low-resource testing. The model is trained on roughly 0.7k hours of Mandarin and 0.4k hours of dialect data. Baselines include Edge TTS, CosyVoice2, and Qwen-TTS. Metrics include Word Error Rate (WER) using Qwen3-ASR, UTMOSv2 for speech naturalness, and subjective Mean Opinion Score (MOS) evaluated by native speakers and linguistics experts.

## Results

DiaMoE-TTS achieves competitive performance despite being trained on only 1.1k total hours compared to commercial systems trained on 150k to 3M hours. For instance, on Chengdu (CD) dialect, it achieves a WER of 29.25% and MOS of 2.22, while handling complex stylized registers like Yunbai (Peking Opera) with a WER of 61.30% and MOS of 1.75 (dialects entirely absent from commercial baselines). Ablation studies confirm that replacing IPA with pinyin causes catastrophic failure with WER exceeding 90% (e.g., CD WER jumps from 29.25% to 93.29%), and removing the MoE degrades both MOS and WER across all tested dialects.

In optimization comparisons for incorporating high-quality Chengdu dialect data, Flow-GRPO outperforms continued training by reducing WER from 29.25% (pretrained only) down to 23.93% and improving UTMOSv2 to 2.87, whereas continued training yields negligible or negative WER improvements on related cross-dialects.

| System | YUE (WER) | SH (WER) | CD (WER) | XA (WER) | ZZ (WER) | TJ (WER) |
|---|---|---|---|---|---|---|
| Ours | 34.01% | 51.48% | 29.25% | 37.85% | 33.83% | 21.94% |
| Edge TTS | 8.66% | - | 5.77% | 7.49% | 7.27% | - |
| CosyVoice2 | 23.23% | 22.48% | 8.06% | - | 7.72% | 7.68% |
| Qwen TTS | - | 12.44% | 9.55% | - | - | - |

## Limitations

The evaluation is restricted to Chinese dialects and specialized theatrical registers (Peking Opera), leaving cross-lingual and non-Chinese dialect generalization unverified. The model exhibits higher absolute WER than massive commercial systems, primarily constrained by training data scale (1.1k hours vs. up to 3M hours). Furthermore, the RL reward function relies exclusively on ASR transcription accuracy, omitting explicit multi-objective optimization for prosodic naturalness and fine-grained expressive style transfer.

## Why read this

Speech researchers and engineers working on low-resource and multi-dialect TTS will find this paper essential for its practical recipe combining IPA front-ends, dialect-aware MoE routing, and Flow-GRPO reinforcement learning to mitigate style interference and data scarcity.

## Code

- https://github.com/GiantAILab/DiaMoE-TTS

## Applications

Regional language preservation, localized voice assistants, cultural heritage speech synthesis (e.g., regional opera generation), and low-resource multilingual conversational interfaces.

## Institutions / 機構

Tsinghua University, Giant Network

## Related

- [K-DIALECT : Korean Dialect-Aware Face-Based Speech Synthesis](yang26d_interspeech.md) — same problem · relatedness 2.2/3
- [IN-F5: Adapting an English TTS Foundation Model for Multilingual and Zero-Resource Indian Speech Synthesis](varadhan26_interspeech.md) — shared technique · relatedness 2.2/3
- [Improving Flow Matching based Text-to-Speech with Dual-Model Preference Optimization and Classifier-Free Guidance](chen26y_interspeech.md) — same problem · relatedness 2.2/3
- [FlowTTS-GRPO: Online Reinforcement Learning with Multi-Objective Reward Optimization for Flow-Matching Based Text-to-Speech](wang26s_interspeech.md) — shared technique · relatedness 2.1/3
- [GLAD-CSpeech: A Dialectologically Comprehensive Benchmark for Genuine Chinese Dialect Speech](xu26j_interspeech.md) — complementary · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
