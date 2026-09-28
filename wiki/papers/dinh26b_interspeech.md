---
id: dinh26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3474
pdf: https://www.isca-archive.org/interspeech_2026/dinh26b_interspeech.pdf
---

# LitCodec: ASR-Guided Streaming Speech Coding with Unified Quantization

[PDF](https://www.isca-archive.org/interspeech_2026/dinh26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dinh26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3474)

**TL;DR** — LitCodec is a causal, semantic-aware neural speech codec that injects pre-quantization ASR supervision and uses Finite Scalar Quantization to achieve state-of-the-art streaming speech coding, reaching a PESQ of 2.56 and a WER of 2.8% at 800 bps.

## Problem

Existing neural audio codecs force a trade-off: waveform-oriented codecs preserve acoustic quality but lose fine-grained phonetic cues at low bitrates, while semantic-aware codecs rely on non-causal encoders or multi-stream architectures incompatible with real-time streaming. Bridging this gap is critical for low-latency speech applications like voice assistants and real-time translation, but requires embedding linguistic structure without sacrificing single-pass causal execution.

## Method

LitCodec employs an encoder-quantizer-decoder pipeline operating in the STFT domain with a causal Conformer encoder and mirrored decoder. ASR supervision is injected pre-quantization using an auxiliary two-layer Conformer text decoder trained with a CTC loss and SpecAugment time masking (Nmask = 5, ptime = 5%), which forces the encoder to distribute phonetic information redundantly. It utilizes Finite Scalar Quantization (FSQ) with a 6-dimensional codebook projection ([8, 8, 8, 5, 5, 5] levels, yielding 64,000 entries) to produce a single, flat token stream without residual vector quantization complexity. To support causal streaming, it uses dynamic chunk training with chunk sizes drawn uniformly from {4, 8, 12, 16} frames alongside full-sequence context, yielding an algorithmic latency of 80 ms at 50 Hz.

## Results

Evaluated on LibriSpeech test-clean after training on LibriHeavy, LitCodec-V1 (800 bps, 50 tok/s) achieves a PESQ of 2.56, STOI of 0.925, and WER of 2.8%, outperforming streaming baselines like TS3-Codec and Mimi. LitCodec-V2 (640 bps, 40 tok/s) maintains a WER of 3.1% and PESQ of 2.41, demonstrating robustness compared to EnCodec which degrades to 29.0% WER at 750 bps. Ablations confirm that pre-quantization supervision outperforms post-quantization placement (WER 2.8% vs 3.2%) and that SpecAugment masking improves both WER (2.8% vs 3.1%) and PESQ.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building real-time interactive speech applications such as live captioning, voice assistants, and streaming speech-to-speech translation.

## Limitations

Evaluation is restricted to objective metrics on English clean speech (LibriSpeech), lacking subjective MUSHRA listening tests or evaluations on noisy, spontaneous, and multilingual speech.

## Related

- (link related pages by id as the wiki grows)
