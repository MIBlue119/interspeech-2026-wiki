---
id: zhu26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-230
pdf: https://www.isca-archive.org/interspeech_2026/zhu26_interspeech.pdf
---

# Content-Aware Dynamic Compression for Efffcient Speech Recognition based on Large Language Model

[PDF](https://www.isca-archive.org/interspeech_2026/zhu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-230)

**TL;DR** — This paper proposes a content-aware dynamic acoustic mapping method using Continuous Integrate-and-Fire (CIF) for LLM-based ASR, cutting sequence lengths by ~60% while reducing error rates by 12-26%.

## Problem

Current LLM-based ASR systems use fixed-rate downsampling strategies like feature concatenation or convolutions, which overlook speech content dynamics and discard fine-grained acoustic information at higher compression ratios. This rigid compression leads to performance degradation and fails to adapt to speech rate variability and phonetic boundaries.

## Method

The architecture incorporates a frozen speech encoder (StepAudio2 or FireRedLLM-ASR at 25 Hz), a CIF-based dynamic mapper, a lightweight adapter with temporal downsampling, and a pre-trained LLM (Qwen3 or Qwen2). The dynamic mapper uses a 1D convolution residual block to transform encoder features, applies a linear-sigmoid layer to predict firing weights, and uses the CIF mechanism to integrate frames and dynamically fire embeddings conditioned on transcription token counts. Training uses a two-stage strategy: Stage 1 trains only the adapter and dynamic mapper using an MAE loss on integrated weights and transcription lengths, while Stage 2 fine-tunes the LLM on large datasets.

## Results

Evaluated on AISHELL-1, LibriSpeech, and GigaSpeech using CER, WER, Average Speech Embedding Length (ASEL), and Time to First Token (TTFT). On AISHELL-1 with FireRedLLM-ASR, the method achieves a 3.53% CER (Qwen3-1.7B) and 2.67% CER (Qwen2-7B) at an ASEL of 27, yielding 15.3% to 33.4% relative error reductions over a baseline ASEL of 70. On LibriSpeech test-clean and test-other, it cuts ASEL by ~59-60% while achieving 12-13% relative WER reductions over fixed-stride baselines. Across utterance durations from 6s to 18s, TTFT is reduced by 7.1% to 19.5% compared to the 2x downsampling baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building efficient, low-latency speech-enabled large language models for edge or cloud deployment where sequence length reduction is critical.

## Related

- (link related pages by id as the wiki grows)
