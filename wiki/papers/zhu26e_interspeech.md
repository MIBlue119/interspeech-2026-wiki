---
id: zhu26e_interspeech
category: tts
labels: [low-resource, multilingual, generative-model]
institutions: ["Xiaomi"]
code: https://github.com/k2-fsa/OmniVoice
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3256
pdf: https://www.isca-archive.org/interspeech_2026/zhu26e_interspeech.pdf
---

# OmniVoice: Towards Omnilingual Zero-Shot Text-to-Speech with Diffusion Language Models

*Han Zhu, Lingxuan Ye, Wei Kang, Zengwei Yao, Liyong Guo, Fangjun Kuang, Zhifeng Han, Weiji Zhuang, Long Lin, Daniel Povey*

[PDF](https://www.isca-archive.org/interspeech_2026/zhu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3256)

**Category:** `tts` · **Labels:** `low-resource`, `multilingual`, `generative-model`

**TL;DR** — OmniVoice is a massively multilingual zero-shot text-to-speech model spanning over 600 languages that uses a single-stage diffusion language model architecture to map text directly to multi-codebook acoustic tokens, achieving a word error rate of 1.30 on LibriSpeech-PC test-clean.

## Key contributions

- Proposes a single-stage non-autoregressive discrete diffusion architecture that bypasses error propagation and information bottlenecks common in two-stage cascaded text-to-semantic-to-acoustic pipelines.
- Introduces a full-codebook random masking strategy that independently samples Bernoulli masks across all codebook layers, dramatically improving training convergence and generative quality compared to per-layer schedules.
- Applies pre-trained causal LLM weight initialization (Qwen3-0.6B) to a bidirectional NAR TTS backbone to inherit rich linguistic priors and fix typical single-stage intelligibility flaws.
- Curates and open-sources a 581k-hour multilingual speech dataset encompassing over 600 languages, built using automated speech restoration and rule-based transcript filtering.

## Problem

Current state-of-the-art zero-shot text-to-speech models are heavily constrained by limited linguistic scopes, leaving hundreds of low-resource languages unsupported. Existing autoregressive and non-autoregressive paradigms either suffer from slow decoding or rely on complex two-stage cascaded pipelines prone to error propagation and high-bitrate information bottlenecks. Single-stage discrete alternatives have historically failed to match the intelligibility of cascaded pipelines. OmniVoice solves this by building a streamlined, highly scalable single-stage framework that scales gracefully to over 600 languages while maintaining top-tier intelligibility and zero-shot voice cloning capabilities.

## Method

OmniVoice models speech via a discrete masked diffusion objective implemented over a bidirectional Transformer backbone initialized with Qwen3-0.6B weights (0.8B total parameters including auxiliary modules). The input text sequence concatenates instruction transcripts and text tokens, while the target acoustic matrix ($X \in \mathbb{R}^{T \times C}$ with $C=8$ codebooks from Higgs-audio) contains prompt segments and target masked segments where tokens are dynamically replaced with a special mask token. Unlike prior per-layer masking regimes, OmniVoice samples a binary mask $m_{i,j} \sim \text{Bernoulli}(p_t)$ with ratio $p_t \sim \mathcal{U}(0,1)$ across all codebooks independently for every instance, computing loss densely across roughly 50% of the token matrix on average.

Training leverages a sequence packing size of 8,192 tokens across 8 GPUs, totaling 2M updates for the multilingual version and 300k updates for the Emilia subset. To counteract extreme data imbalance, low-resource languages undergo explicit up-sampling. Multilingual text processing uses subword tokenizers directly from the LLM, entirely avoiding language-specific grapheme-to-phoneme rules.

At inference time, generation proceeds via 32-step iterative unmasking using a time-shifted schedule ($\tau = 0.1$), combined with log-softmax space layer penalties (forcing lower codebook layers to unmask first) and classifier-free guidance at a scale of 2. Additional multi-dimensional controls include prompt denoising via synthetic noise/reverberation injection paired with a <|denoise|> instruction token, attribute-guided voice design (injecting speaker traits into the prompt), and hybrid phonetic/paralinguistic token inputs.

## Experimental setup

Evaluated on LibriSpeech-PC, Seed-TTS (English and Chinese subsets), MiniMax multilingual benchmark (24 languages), and FLEURS-Multilingual-102. Datasets include a bilingual Emilia subset (100k hours) and a custom open-source multilingual corpus (581k hours across 600+ languages). Compared against SOTA systems like IndexTTS2, CosyVoice3, VoxCPM, Qwen3-TTS, F5-TTS, ZipVoice, and MaskGCT. Metrics include SIM-o (speaker similarity), Word/Character Error Rates (WER/CER for intelligibility), and UTMOS (naturalness), alongside CMOS and SMOS human evaluations.

## Results

OmniVoice-Emilia achieves a 1.57 WER on LibriSpeech-PC test-clean and 1.72 on Seed-TTS test-en, while the 500k-hour multilingual model pushes LibriSpeech-PC WER down to 1.30 with a SIM-o of 0.729. On the 24-language MiniMax benchmark, OmniVoice achieves an average WER of 2.850 and SIM-o of 0.830, outperforming ElevenLabs Multilingual v2 and MiniMax-Speech. Ablations confirm that full-codebook random masking dramatically improves LibriSpeech WER from 3.00 (SoundStorm mask) and 2.04 (MaskGCT mask) down to 1.57, and that randomizing LLM initialization weights degrades WER across all splits.

| System / Condition | LibriSpeech-PC test-clean (WER ↓) | Seed-TTS test-en (WER ↓) | Seed-TTS test-zh (CER ↓) | MiniMax-24 Avg WER ↓ |
|---|---|---|---|---|
| Ground-truth | 1.87 | 2.14 | 1.25 | - |
| Qwen3-TTS (1.1B) | 1.60 | 1.54 | 1.15 | - |
| MaskGCT (2.2B) | 2.26 | 2.88 | 2.40 | - |
| OmniVoice-Emilia (0.8B) | 1.57 | 1.72 | 0.89 | - |
| OmniVoice Multilingual (0.8B) | 1.30 | 1.60 | 0.84 | 2.850 |
| ElevenLabs Multilingual v2 | - | - | - | 10.950 |

## Limitations

While the model covers over 600 languages, low-resource performance relies heavily on data up-sampling heuristics which may amplify audio artifacts in extremely low-data regimes. The reliance on an external neural speech restoration model for data cleaning introduces potential preprocessing distortion into the 581k-hour corpus. Evaluation across all 102 FLEURS languages relies heavily on automatic objective metrics (CER/SIM-o) rather than exhaustive human MOS testing for every supported dialect.

## Why read this

Read this if you want to understand how to scale non-autoregressive discrete diffusion models to hundreds of languages without resorting to brittle, multi-stage cascaded pipelines. It provides actionable recipes for full-codebook random masking and utilizing pre-trained LLM weights in bidirectional speech transformers.

## Code

- https://github.com/k2-fsa/OmniVoice

## Applications

Massively multilingual cross-lingual voice cloning, zero-shot audio prompt denoising, attribute-controlled voice design, and low-resource speech synthesis.

## Institutions / 機構

Xiaomi

## Related

- (link related pages by id as the wiki grows)
