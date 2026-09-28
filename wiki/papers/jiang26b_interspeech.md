---
id: jiang26b_interspeech
category: speech-coding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-466
pdf: https://www.isca-archive.org/interspeech_2026/jiang26b_interspeech.pdf
---

# VoCodec: A Low-bitrate Streamable Neural Speech Codec with Voicing-driven Quantization

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-466)

**TL;DR** — VoCodec is a low-bitrate streamable neural speech codec that integrates a voicing detector to allocate higher bitrates to perceptually sensitive voiced frames and lower bitrates to unvoiced frames, reducing bitrate by approximately 27% compared to uniform quantization.

## Problem

Most neural speech codecs employ uniform quantization across all frames, allocating identical bitrates regardless of whether content is voiced or unvoiced. Because voiced frames carry periodic structure and energy that dictate speech intelligibility while unvoiced frames have weaker perceptual impact, uniform allocation wastes valuable bits. This paper addresses the gap by tailoring quantization granularity to perceptual importance while maintaining strict streaming constraints.

## Method

VoCodec features a fully causal encoder-quantizer-decoder architecture built upon causal modified ConvNeXt v2 blocks, causal convolutions, and a unidirectional LSTM layer for sequential modeling. It embeds an independent voicing detector that processes FFT-derived frame energy against a threshold to assign a 1-bit voicing flag token. The voicing-driven quantizer applies residual scalar-vector quantization (RSVQ, combining coarse scalar quantizers and fine improved vector quantizers with online clustering and codebook balancing) to voiced frames, and simple scalar quantization (SQ) to unvoiced frames. During training, a mask-based dual-path parallel quantization strategy is employed to bypass the bottlenecks of sequential streaming computation.

## Results

Evaluated on LibriTTS (16 kHz) and VCTK (48 kHz) datasets. On LibriTTS at 1.1 kbps, VoCodec achieves an LSD of 0.896, STOI of 0.916, ViSQOL of 4.115, and MUSHRA of 75.18±5.16 using 9.31M parameters and 2.62G FLOPs, outperforming baseline streaming codecs like StreamCodec (MUSHRA 69.64) and closely matching heavyweight non-streamable models like BigCodec. ABX listening tests show VoCodec at 1.1 kbps achieves parity with higher-bitrate baselines at 1.5 kbps (saving ~27% or 400 bps). Ablations confirm that reversing the strategy (RSVQ on unvoiced, SQ on voiced, termed VoCodec-r) severely damages harmonic spectrogram structures and overall MUSHRA/ViSQOL scores.

## Code

- https://pb20000090.github.io/VoCodec/

## Applications

Speech communication systems, real-time telephony, and low-bandwidth speech transmission where low algorithmic latency and high perceptual quality are required.

## Limitations

Evaluated exclusively on clean speech datasets; generalizability to non-speech audio data remains a direction for future work.

## Related

- (link related pages by id as the wiki grows)
