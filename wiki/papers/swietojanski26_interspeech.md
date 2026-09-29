---
id: swietojanski26_interspeech
category: asr
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-341
pdf: https://www.isca-archive.org/interspeech_2026/swietojanski26_interspeech.pdf
---

# Segmental Attention Decoding With Long Form Acoustic Encodings

*Pawel Swietojanski, Xinwei Li, Mingbin Xu, Takaaki Hori, Dogan Can, Xiaodan Zhuang*

[PDF](https://www.isca-archive.org/interspeech_2026/swietojanski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/swietojanski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-341)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper resolves the fundamental failure of attention encoder-decoder (AED) speech models on long-form audio by introducing explicit cross-attention positional encodings, acoustic context expansion, segment concatenation, and CTC-based semantic segmentation, achieving long-form parity with short-form decoding and matching or beating Whisper baselines.

## Key contributions

- Identifies the permutation invariance and edge-cue dependency problem in attention-based ASR when processing long-form acoustic encodings (LFEs).
- Proposes injecting auxiliary absolute positional encodings into cross-attention keys and values, resetting per segment.
- Introduces data-level long-form training strategies combining acoustic context expansion (AC) and segment concatenation (SC).
- Extends the model with a first-pass CTC semantic segmentation head to trigger attention decoding, replacing brittle heuristics like VAD.
- Achieves parity between segmented and long-form performance while maintaining competitive offline/streaming trade-offs against models like Whisper.

## Problem

Attention-based encoder-decoder models are traditionally trained on short, segmented utterances where the attention mechanism implicitly relies on boundary edge effects to track temporal order. When fed continuous long-form acoustic encodings (LFEs) without these boundaries, cross-attention keys and values become permutation invariant. Consequently, the attention decoder loses its ability to order acoustic frames, fails to emit end-of-sentence (EOS) tokens, and enters catastrophic repetition loops with exploding insertion errors.

## Method

The architecture builds upon a CTC-AED framework where the acoustic encoder uses causal Conformer blocks (with LayerNorm and RoPE) coupled with a 3-layer unidirectional transformer decoder (18M parameters). To fix long-form decoding, four modifications are introduced: First, explicit absolute positional encodings (p) are added directly to the long-form acoustic encodings ($H^s$) before cross-attention keys and values, with position indices resetting for each decoded segment. Second, acoustic context expansion is applied during training, padding inputs with max left/right context ($C_L^{\max} = L \cdot N \cdot R$ and $C_R^{\max} = M \cdot R$) while discarding non-target regions from loss computation to force reliance on explicit positional codes rather than edge artifacts. Third, segment concatenation stitches consecutive audio streams into 2.5-minute training examples to expose the attention decoder to diverse segment durations. Fourth, a CTC head is trained to emit semantic segmentation tokens (segE) using transcript labels parsed by a 'Segment any Text' model, dictating exact boundaries for second-pass attention decoding without relying on audio-only VAD.

Models are trained on an English mixture of LDC corpora, SpeechOcean, LibriHeavy, and a large-scale pseudo-labeled conversational dataset (SpeechCrawl) using the Adam optimizer for 300k updates (6144 sentences/update, 33s average length). Downsampling factor $R = 6$. Two sizes are scaled: Ours.base (90M total: 70M encoder with 12 blocks/2048 FF units) and Ours.small (240M total: 219M encoder with 28 blocks/3072 FF units). Inference utilizes joint CTC-Attention (CAT) or attention rescoring, supporting configurable chunk sizes like 0.96s or 3.84s for low-latency streaming.

## Experimental setup

Evaluated on public benchmarks including Tedlium3 and Earnings21 for long-form, and LibriSpeech (clean/other) and CommonVoice for short-form. Compared against Whisper (base.en and small.en). Metrics include Word Error Rate (WER %) across attention-only decoding (AD), attention rescoring (AR), and joint CTC-Attention (CAT) configurations.

## Results

On the Tedlium3 long-form test using the base model, the unadapted baseline suffers a catastrophic 295% WER under pure attention decoding due to repeated chunks and missing EOS tokens. Adding segment concatenation alone fails to fix long-form decoding (295% WER), while acoustic context expansion reduces it to 40.3% WER and positional encodings alone yield 145% WER. Combining acoustic context and positional encodings (Model 4) drops long-form attention WER to 5.0%, matching short-form performance (4.9%). Integrating CTC semantic segmentation (Model 5) pushes joint CTC-Attention long-form WER down to 4.3% (vs 4.7% AR and 4.8% AD).

On the final public benchmarks, Ours.base achieves 4.7% WER on Tedlium3 long-form (matching Whisper base.en's 4.6%) and 13.4% on Earnings21, while outperforming Whisper on LibriSpeech other (5.5% vs 9.6% for base). Ours.small further improves performance, scoring 3.9% on Tedlium3 long-form and 11.4% on Earnings21 (beating Whisper small.en's 10.8%). The approach does not win on zero-shot domain generalization gaps where external large unconstrained weak-supervision models hold structural advantages, though it outperforms them when trained natively.

| Model | Decoder | Chunk (s) | Lbs clean | Lbs other | CommonV. | Tedlium3 (S) | Tedlium3 (LF) | Earnings21 |
|---|---|---|---|---|---|---|---|---|
| Whisper base.en | AD | 30.0 | 4.1 | 9.6 | 17.5 | 4.6 | 4.6 | 12.5 |
| Ours.base | CAT | 0.96 | 2.1 | 5.4 | 14.4 | 4.4 | 4.3 | 12.2 |
| Ours.base | CAT | 3.84 | 1.9 | 4.9 | 13.7 | 4.3 | 4.3 | 12.1 |
| Whisper small.en | AD | 30.0 | 3.2 | 6.7 | 12.6 | 4.3 | 4.6 | 10.8 |
| Ours.small | CAT | 0.96 | 1.8 | 4.4 | 12.4 | 4.1 | 4.0 | 11.4 |
| Ours.small | CAT | 3.84 | 1.7 | 3.9 | 11.4 | 3.9 | 3.9 | 11.4 |

## Limitations

The evaluation is restricted entirely to English datasets (LDC, LibriSpeech, SpeechCrawl, Tedlium3, Earnings21), leaving multilingual robustness unproven. The approach relies heavily on pseudo-labeled large-scale private/crawl data (SpeechCrawl) which may contain label noise, and the semantic segmentation relies on an auxiliary offline text segmentation model during training.

## Why read this

Speech and ML researchers building production-grade streaming or hybrid attention encoder-decoder ASR systems should read this to understand how to eliminate long-form attention degradation without resorting to expensive global context windows or multi-pass rescoring hacks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device speech recognition, live translation, real-time meeting transcription, system-wide live captions, and long-form audio editing suites.

## Institutions / 機構

Apple

## Related

- (link related pages by id as the wiki grows)
