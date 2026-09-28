---
id: zhu26e_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3256
pdf: https://www.isca-archive.org/interspeech_2026/zhu26e_interspeech.pdf
---

# OmniVoice: Towards Omnilingual Zero-Shot Text-to-Speech with Diffusion Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/zhu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3256)

**TL;DR** — OmniVoice is a massively multilingual zero-shot text-to-speech model spanning over 600 languages using a single-stage discrete non-autoregressive diffusion framework, achieving state-of-the-art intelligibility, naturalness, and speaker similarity.

## Problem

Conventional discrete non-autoregressive text-to-speech systems rely on complex two-stage pipelines (text-to-semantic to acoustic) that suffer from error propagation and information bottlenecks. While single-stage models bypass these issues, they historically lag behind in speech intelligibility and fail to scale to hundreds of low-resource languages.

## Method

OmniVoice utilizes a discrete masked diffusion objective with a bidirectional Transformer backbone to directly map text and prompt tokens to 8-codebook acoustic tokens derived from the Higgs-audio tokenizer. The model is initialized with pre-trained Qwen3-0.6B weights to inherit linguistic priors and employs a full-codebook random masking strategy where a Bernoulli mask is independently applied across all codebooks with uniform masking ratios. It was trained on an aggregate 581k-hour open-source multilingual dataset spanning over 600 languages, utilizing language-level data resampling and subword LLM tokenizers. During inference, it uses 32-step iterative unmasking with a time-shifted schedule, layer penalties, and log-softmax classifier-free guidance, and supports acoustic prompt denoising and attribute-based voice design.

## Results

Evaluated on LibriSpeech-PC test-clean, Seed-TTS (en/zh), MiniMax-24, and FLEURS-102 benchmarks, OmniVoice achieves superior performance compared to baselines such as MaskGCT, F5-TTS, and commercial systems. On the Emilia bilingual subset, OmniVoice-Emilia achieves a LibriSpeech-PC SIM-o of 0.697, WER of 1.57, and UTMOS of 4.23. The full-codebook random masking strategy outperforms SoundStorm-style and MaskGCT-style mask schedules, and LLM initialization drastically reduces word error rates across datasets (e.g., lowering LibriSpeech WER from 2.79 to 1.57).

## Code

- https://github.com/k2-fsa/OmniVoice

## Applications

Engineers and developers can use OmniVoice for zero-shot voice cloning, expressive multilingual text-to-speech synthesis across hundreds of low-resource languages, and customizable voice design with paralinguistic control.

## Related

- (link related pages by id as the wiki grows)
