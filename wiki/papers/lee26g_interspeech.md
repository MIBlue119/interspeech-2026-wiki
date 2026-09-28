---
id: lee26g_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-710
pdf: https://www.isca-archive.org/interspeech_2026/lee26g_interspeech.pdf
---

# AccentDrift: Real-time Streaming Accent Conversion via Sparse Speech Tokenization

[PDF](https://www.isca-archive.org/interspeech_2026/lee26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-710)

**TL;DR** — AccentDrift introduces a real-time streaming accent conversion system using sparse speech tokenization and hierarchical style adaptation, achieving a low latency of 520 ms while outperforming prior parallel models in intelligibility and naturalness.

## Problem

Existing accent conversion methods heavily rely on costly parallel datasets, utilize non-streaming parallel architectures unsuitable for interactive applications, and suffer from degraded audio quality or inflexible control. These limitations hinder seamless real-world communication for second-language speakers who require low-latency, natural accent transformation while retaining their original timbre and linguistic content.

## Method

The system builds on a pruned 17-layer cache-aware FastConformer ASR encoder to extract linguistic features, paired with improved Finite Scalar Quantization (iFSQ) operating as a narrow information bottleneck. An accent adapter utilizes a causal Transformer with rotary positional embeddings and a gradient reversal layer to inject target accent style embeddings without leaking prosody. Subsequently, a causal diffusion Transformer (DiT) conditioned on CAM++ timbre embeddings and an HiFTNet neural vocoder hierarchically generate speaker-specific acoustics. The model is trained jointly on LibriTTS, VCTK, and GLOBE V3 corpora using a combination of CTC and cross-entropy losses.

## Results

Evaluated on non-native L2-ARCTIC and VCTK Indian English datasets, AccentDrift achieves a word error rate (WER) of 6.27—significantly better than the parallel baseline Vevo-Style (13.8)—while maintaining high speaker similarity (SPK-SIM of 0.72) and competitive naturalness (UTMOS of 4.10, NMOS of 3.97). It operates with a minimal streaming latency of 520 ms. Layer-wise and quantization ablations confirm that intermediate ASR encoder layers (e.g., layer 17) and narrow information bottlenecks successfully balance speech intelligibility and accent conversion capability.

## Code

- https://accentdrift.github.io/demo/

## Applications

Real-time interactive communication tools, full-duplex spoken dialogue systems, and computer-assisted language learning platforms requiring low-latency accent transformation for second-language speakers.

## Limitations

The framework requires careful tuning of the information bottleneck size and gradient reversal scaling to prevent prosodic leakage or training instability.

## Related

- (link related pages by id as the wiki grows)
