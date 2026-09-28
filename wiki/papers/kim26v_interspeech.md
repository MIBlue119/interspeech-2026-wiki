---
id: kim26v_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3108
pdf: https://www.isca-archive.org/interspeech_2026/kim26v_interspeech.pdf
---

# SDP-Codec: A Speaker-Decoupled Speech Codec with Pitch Injection for Low-Bitrate Coding and Zero-Shot Voice Conversion

[PDF](https://www.isca-archive.org/interspeech_2026/kim26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3108)

**TL;DR** — SDP-Codec is a single-stage speaker-decoupled neural speech codec that integrates normalized pitch injection, achieving low-bitrate compression and robust zero-shot voice conversion with minimal speaker leakage.

## Problem

Existing speaker-decoupled neural speech codecs struggle with a trade-off: complex multi-stage pipelines with gradient reversal or perturbation are unstable, while simpler designs fail to prevent speaker identity from leaking into local content tokens. This leakage impairs downstream speech language models and zero-shot voice conversion performance. A clean, single-stage disentanglement approach is required to preserve fine-grained prosody and content while strictly isolating speaker attributes.

## Method

SDP-Codec uses a single-stage optimization pipeline combining a local content-prosody branch and a global speaker branch. The local branch processes continuous pre-quantization features from a frozen vq-wav2vec encoder through a residual CNN post-encoder, and fuses them with speaker-normalized F0 contours extracted via a pretrained FCPE model. This joint stream passes through a single codebook bottleneck (300 entries for small models, 1536 entries for large models) and is decoded via a waveform decoder and a pitch decoder supervised by a soft-label pitch reconstruction loss. The global branch compresses frozen WavLM features into time-invariant embeddings using a perceiver resampler and conditions the decoders via position-agnostic cross-attention and adaptive snake modules. Models total 406M parameters with 74M trainable, trained for 600k steps on LibriSpeech, LibriTTS, and Multilingual LibriSpeech.

## Results

Evaluated on LibriSpeech and LibriTTS test-clean sets at bitrates between 0.45 and 0.52 kbps, SDP-Codec-16-L achieves a UTMOS of 3.9954, SECS of 0.9436, and WER of 3.08% on zero-shot voice conversion. SDP-Codec-24-S achieves a UTMOS of 4.0055, SECS of 0.8133, and F0 correlation of 0.6162 for 24 kHz reconstruction and conversion. Probing evaluations demonstrate that SDP-Codec achieves the lowest local token speaker-probing accuracy (4.45% for the large variant and 6.87% for the 24kHz variant) compared to baselines like MSRCodec (up to 46.1%) and BiCodec (9.00%), confirming superior speaker decoupling.

## Code

- https://github.com/hanshounsu/sdpcodec-open/

## Applications

Speech language model backbones, ultra-low-bitrate neural audio communication, and zero-shot voice conversion systems.

## Limitations

The current large-scale evaluation is restricted to a 16 kHz variant due to computing resource constraints during training.

## Related

- (link related pages by id as the wiki grows)
