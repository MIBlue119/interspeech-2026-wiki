---
id: sohn26_interspeech
category: speech-coding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2984
pdf: https://www.isca-archive.org/interspeech_2026/sohn26_interspeech.pdf
---

# DTM-Codec: Dynamic Token Masking for VFR Speech Coding with Efficient Boundary Selection

*Hoyeol Sohn, Juhan Nam*

[PDF](https://www.isca-archive.org/interspeech_2026/sohn26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sohn26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2984)

**Category:** `speech-coding`

**TL;DR** — DTM-Codec is a 127M-parameter neural speech codec using dynamic token masking and path length equalization for variable-frame-rate (VFR) speech coding, outperforming fixed-frame-rate baselines at matched total bitrates across low-to-mid operating points. It achieves up to an 8.2% relative improvement in PESQ and a 12.1% reduction in word error rate (WER) at 800 bps.

## Key contributions

- Dynamic Token Masking (DTM): Retains selected encoder tokens and fills missing slots with a learnable <MASK> embedding rather than averaging features, avoiding information loss while transmitting a compact binary keep-mask.
- Path Length Equalization (PLE): An O(N) boundary selector that partitions the cumulative feature change along the encoder trajectory into equal-length segments with negligible runtime overhead.
- Strict Matched-Total-Bitrate Evaluation: A unified protocol counting both content bits and position-side-information bits, proving true VFR gains over fixed-frame-rate baselines.
- Demonstrated data and scale efficiency: Achieves competitive performance using only LibriSpeech-960 without large-scale multi-domain corpora or auxiliary semantic teacher models.

## Problem

Single-codebook neural audio codecs operate at fixed frame rates, allocating uniform temporal resolution to both redundant regions (silence, sustained vowels) and information-dense phonetic transitions. Prior variable frame rate (VFR) methods like TFC-Codec, VARSTok, CodecSlime, and FlexiCodec often fail to provide controlled, same-architecture VFR-vs-FFR comparisons where timing-side-information overhead is rigorously accounted for in the total bitrate. Furthermore, optimization parity is frequently violated because prior systems adapt pretrained backbones or rely on heavy post-training tuning. This leaves it unproven whether VFR can genuinely improve reconstruction once overhead bits are included.

## Method

DTM-Codec builds on a two-stage transformer encoder-decoder backbone similar to TAAE, replacing the learned front/back-end with an STFT/iSTFT pair and FSQ with a single-codebook vector quantization (VQ) bottleneck (|C| = 16,384, b = 14 bits/token). The architecture uses Pre-Norm transformer layers with RMSNorm, SwiGLU FFNs, Rotary Position Embeddings (RoPE), and LayerScale, sharing a hidden dimension of 512 with 4 attention heads (6 layers for Enc1/Dec2, 12 layers for Enc2/Dec1) plus a 128-step sliding attention window.

Between Stage 1 (dense resolution) and Stage 2 (compressed resolution), DTM-Codec applies Path Length Equalization (PLE) to select a keep ratio (target r = 0.5). PLE computes cosine distances between consecutive Stage-1 feature vectors, accumulating them into a monotonic path and placing boundaries whenever the cumulative distance crosses multiples of a threshold tau. The selected K tokens are quantized via VQ, while unselected positions are marked by transmitting a 1-bit-per-step binary keep-mask. At the decoder, masked positions are populated with a learnable <MASK> embedding, and the decoder reconstructs the full-resolution time-domain STFT representation using adversarial losses (MPD and MS-STFT discriminators with least-squares GAN loss, multi-scale mel-spectrogram L1 distance, and feature matching loss).

During training, tau is dynamically adapted via a Robbins-Monro controller to track the target keep ratio. The model is trained on LibriSpeech-960 at 16 kHz for 600k steps using AdamW and bf16 precision on 2× RTX 4090 GPUs with a batch size of 64.

## Experimental setup

Trained on LibriSpeech-960 (16 kHz) and evaluated on the LibriSpeech test-clean subset (2,620 utterances) across four bitrate anchors (400, 640, 800, and 1280 bps). Evaluated against fixed-frame-rate baselines (DAC, BigCodec, SNAC, WavTokenizer, X-Codec 2.0, TAAE) and VFR baselines (FlexiCodec, VARSTok). Metrics include UTMOSv2, UTMOS, wideband PESQ, STOI, speaker similarity via WavLM-Large, and ASR Word Error Rate (WER) using HuBERT-Large.

## Results

At matched total bitrates, DTM-Codec VFR outperforms FFR baselines across low-to-mid bitrates (400–800 bps). At the 800 bps operating point, VFR improves PESQ by +8.2% (2.46 to 2.66), increases speaker similarity by +10.5% (0.71 to 0.78), and reduces WER by 12.1% (3.31 to 2.91) compared to its FFR counterpart. Subjective MUSHRA evaluations confirm this trend, with VFR@50Hz scoring 81.62 compared to 78.79 for FFR.

At the highest bitrate anchor (1280 bps / 80 Hz), VFR gains diminish because consecutive frames are already temporally redundant, yielding slightly worse WER for VFR (2.98 vs 2.54 for FFR). Ablations show that the full DTM configuration (mask-guided packing with <MASK> fill) surpasses feature-averaging and token-repetition designs.

| System | Total bps | UTMOS | PESQ | STOI | Spk-Sim | WER ↓ |
|---|---|---|---|---|---|---|
| FFR@50Hz (Baseline) | 800 | 4.12 | 2.46 | 0.92 | 0.71 | 3.31 |
| DTM-Codec@50Hz (VFR) | 800 | 4.22 | 2.66 | 0.93 | 0.78 | 2.91 |
| FFR@25Hz (Baseline) | 400 | 4.01 | 1.97 | 0.89 | 0.55 | 5.61 |
| DTM-Codec@25Hz (VFR) | 400 | 4.11 | 2.07 | 0.90 | 0.58 | 4.73 |

## Limitations

The evaluation is restricted to clean English speech (LibriSpeech test-clean) and a limited out-of-domain evaluation on MLS non-English languages, leaving multi-domain general audio, music, and environmental sounds untested. The model's training is bounded to a moderate scale (LibriSpeech-960, 127M parameters) relative to massive multi-terabyte speech LLM backbones. Furthermore, position-bit overhead becomes less efficient at high bitrates (e.g., 80 Hz) where temporal redundancy is minimal.

## Why read this

Speech and audio researchers building neural tokenizers or speech language models should read this paper to understand how to rigorously design variable-frame-rate codecs with exact side-information accounting and linear-time boundary selection.

## Code

- https://github.com/hoyso48/DTM-Codec

## Applications

Low-bitrate neural speech compression, ultra-low-bandwidth communication, and tokenization backbones for speech language models.

## Institutions / 機構

KAIST

**Funding / 經費:** National Research Foundation of Korea

## Related

- (link related pages by id as the wiki grows)
