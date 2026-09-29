---
id: wu26f_interspeech
category: tts
labels: [generative-model]
institutions: ["University of Science and Technology of China", "iFLYTEK", "Huawei Technologies"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1834
pdf: https://www.isca-archive.org/interspeech_2026/wu26f_interspeech.pdf
---

# EmoInstruct-TTS: Dual-Path Instruction-Guided Emotional Speech Synthesis

*Minghui Wu, Ganjun Liu, Zikun Fang, Ting Meng, Hongchuan Wu, Bingao Xu, Yonglong Cai, Jiasheng Chen, Jun Du*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1834)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — EmoInstruct-TTS is a dual-path instruction-guided framework that combines natural language instructions with structured semantic-acoustic emotion embeddings to achieve fine-grained emotional control and high speech naturalness, outperforming CosyVoice baselines in emotion similarity MOS.

## Key contributions

- Introduces Emotion2embed, a structured semantic-acoustic emotion representation encoding 48 emotional states (27 categories and 21 intensity variations).
- Designs the Instruction-Conditioned Emotion Flow Model (ICE-Flow) to map free-form natural language instructions to acoustically grounded emotion embeddings.
- Proposes a dual-path TTS architecture that decouples semantic linguistic planning from explicit emotion-specific acoustic modulation.
- Achieves state-of-the-art emotional controllability and naturalness under zero-shot conditions compared to strong baselines like CosyVoice2 and CosyVoice3.

## Problem

Prior emotional TTS systems either rely on reference speech prompts that suffer from speaker dependency and timbre mismatch, or use pure text instructions that lack explicit mechanisms to model fine-grained emotional variations and intensity levels. Pure linguistic instructions alone are insufficient to capture detailed acoustic correlates of emotion, leading to unstable emotional control. Addressing this gap requires a framework that bridges the semantic flexibility of text instructions with precise acoustic modeling of emotion intensities.

## Method

EmoInstruct-TTS features a dual-path design comprising an instruction-conditioned emotion generator, an LLM semantic encoder, and a speaker-conditioned TTS decoder. Emotion2embed combines semantic features from a Sentence-BERT encoder (bge-large-zh v1.5) and acoustic features from an ECAPA-TDNN encoder, projected to an 896-dimensional space (z_emo). It is optimized using multi-task objectives including emotion classification, intensity classification, and a margin-based ranking loss enforcing ordinal intensity geometry. ICE-Flow uses a multilingual MiniLM text encoder to condition a conditional flow model on free-form instructions, trained with sample-level acoustic grounding and distribution-level regularization to prevent mode collapse and align embedding covariance with real targets.

The dual-path framework then splits instruction processing: the instruction-to-Emotion2embed path generates control embeddings via ICE-Flow, while the instruction-to-LLM path uses a Qwen2.5-0.5B model adapted with LoRA (rank 32, 9.87M parameters) to produce semantic tokens. These tokens, alongside the emotion embedding and a speaker embedding, are passed to a Conditional Flow Matching (CFM) mel-spectrogram decoder. Finally, a BigVGAN neural vocoder synthesizes the high-fidelity output waveform. Inference applies classifier-free guidance on ICE-Flow to control instruction adherence strength, adding negligible compute overhead (less than 1-2% latency increase).

## Experimental setup

Experiments use the Emotional Speech Dataset (ESD) and the Chinese Natural Complex Emotion Dataset (CNCED), split into Dataset-Base (49,903 utterances with auto-generated Gemini-2.5 Pro captions) and Dataset-Annotation (28,402 manually verified utterances covering 27 categories and 3 intensity levels across 7 primary emotions, with 7,600 reserved for evaluation). ICE-Flow is trained for 100 epochs with a batch size of 2048 using the Adam optimizer and cosine annealing (initial learning rate 1e-4). Evaluations compare against CosyVoice2 and CosyVoice3 using MOS, Emotion Similarity MOS (ESMOS), Speaker Similarity MOS (SSMOS), Emotion2embed Cosine Similarity (ECS), and Word Error Rate (WER) via 20 speech experts.

## Results

EmoInstruct-TTS achieves superior emotional performance, scoring a female/male MOS of 4.28/4.25 and ESMOS of 4.25/4.10 on the 21 emotion-intensity tasks, outperforming CosyVoice2 (MOS ~4.14, ESMOS ~3.80) and CosyVoice3. On 27 fine-grained emotion tasks, it secures a top MOS of 4.12/4.05 and ESMOS of 3.92/3.78, demonstrating significant gains in emotional similarity. Objective evaluations show a peak ECS of 0.870 compared to 0.865 for CosyVoice3, though CosyVoice3 retains a slightly lower WER (1.97% vs 2.59%). Ablations confirm that removing either path hurts performance, with text-only dropping emotion similarity and emotion-only causing a sharp WER increase to 4.86% due to unguided linguistic realization.

| System | MOS ↑ | ESMOS ↑ | SSMOS ↑ | ECS ↑ | WER (%) ↓ |
|---|---|---|---|---|---|
| CosyVoice2 | 4.14 | 3.80 | 4.50 | 0.855 | 3.57% |
| CosyVoice3 | 4.08 | 3.92 | 4.55 | 0.865 | 1.97% |
| EmoInstruct-TTS (Dual-Path) | 4.25 | 4.10 | 4.48 | 0.870 | 2.59% |
| - w/o Emo2embed (Text-Only) | 4.12 | 3.78 | 4.40 | 0.859 | 3.29% |
| - w/o Text Instruct (Emo2embed-Only) | 4.16 | 3.99 | 4.44 | 0.867 | 4.86% |

## Limitations

The evaluation is restricted to Chinese datasets (ESD and CNCED) and predefined categorical emotion spaces, limiting generalized cross-lingual claims. The framework relies heavily on a two-stage annotation pipeline (Gemini-2.5 Pro auto-captioning and manual verification) which may not scale easily to arbitrary unstructured wild audio. Additionally, the system currently trades off a slight increase in Word Error Rate compared to pure speech-token-centric LLM baselines.

## Why read this

Speech and ML researchers building expressive, instruction-controlled TTS systems should read this to learn how to couple language models with continuous, structured semantic-acoustic emotion embeddings via flow matching. It provides a blueprint for disentangling linguistic planning from fine-grained intensity modulation.

## Code

- https://huanyulab.github.io/EMOINSTRUCT-TTS

## Applications

Expressive conversational agents, interactive virtual assistants, audiobooks, and emotional character voices for gaming and animation.

## Institutions / 機構

University of Science and Technology of China, iFLYTEK, Huawei Technologies

## Related

- (link related pages by id as the wiki grows)
