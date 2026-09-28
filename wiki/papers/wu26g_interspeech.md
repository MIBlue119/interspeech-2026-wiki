---
id: wu26g_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1953
pdf: https://www.isca-archive.org/interspeech_2026/wu26g_interspeech.pdf
---

# Accelerating End-to-End ASR via Semi-Autoregressive Speculative Decoding

[PDF](https://www.isca-archive.org/interspeech_2026/wu26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1953)

**TL;DR** — Semi-Autoregressive Speculative Decoding (SASD) accelerates end-to-end ASR by using CTC greedy search to generate draft tokens and selectively applying the attention decoder only to low-confidence tokens, achieving attention-rescoring accuracy with a 2.8x to 3.5x speedup.

## Problem

Autoregressive attention-based encoder-decoder (AED) models offer high recognition accuracy but suffer from slow, step-by-step sequential inference. Conversely, non-autoregressive (NAR) models provide fast parallel decoding but typically sacrifice accuracy due to alignment challenges and weak semantic modeling. Conventional hybrid CTC/attention decoding strategies also encounter computational bottlenecks when computing complex CTC prefix scores.

## Method

SASD operates within a joint CTC-attention framework without requiring model retraining. First, CTC greedy search generates an initial token sequence and computes confidence masks based on a peaky probability threshold of 0.99. High-confidence tokens are directly retained from the CTC output, while low-confidence tokens trigger the autoregressive attention decoder to rescore and interpolate scores with CTC probabilities. The algorithm preserves the exact length of the initial CTC hypothesis since the attention decoder only substitutes tokens at flagged index positions.

## Results

Evaluated on AISHELL-1, WenetSpeech, and industrial datasets using pretrained models from WeNet (such as U2++ Conformer), SASD achieves Character Error Rates comparable to attention rescoring while improving GPU-based Real-Time Factor (RTF) by 2.8x to 3.5x. On AISHELL-1, SASD attains a 4.73% CER with an RTF of 0.0188 on GPU (batch size 1) and 0.0098 (batch size 8).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers deploying production-grade, streaming or chunk-based end-to-end automatic speech recognition systems where low latency and high accuracy are both required.

## Related

- (link related pages by id as the wiki grows)
