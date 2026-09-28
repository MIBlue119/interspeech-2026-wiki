---
id: lin26d_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1338
pdf: https://www.isca-archive.org/interspeech_2026/lin26d_interspeech.pdf
---

# BridgeCodec: Mamba Enhanced Neural Audio Codec with Schrödinger Bridge at Low Bitrate

[PDF](https://www.isca-archive.org/interspeech_2026/lin26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1338)

**TL;DR** — BridgeCodec decouples heterogeneous neural audio codecs by translating compressed latents via a Schrödinger Bridge and Mamba-enhanced U-Net, enabling high-fidelity 48 kHz wideband reconstruction from an 8 kHz 1 kbps source.

## Problem

State-of-the-art neural audio codecs operate as tightly coupled, closed encoder-decoder ecosystems, creating an interoperability gap when devices employ asymmetric or independently deployed models. Directly communicating across mismatched architectures is fundamentally broken because simultaneous endpoint updates are usually infeasible and risky. Furthermore, standard diffusion models require noise priors that destroy structural speech information when mapping compressed representations.

## Method

BridgeCodec formulates cross-codec latent translation as a Schrödinger Bridge (SB) optimal transport problem to adaptively map empirical distributions without predefined noise priors. It uses a U-Net backbone interleaved with Mamba selective state space blocks across 4 resolution levels to capture long-range temporal dependencies with linear complexity. The model is trained via a two-stage strategy: first optimizing the latent SB objective using a VP noise schedule, and then fine-tuning the translator cascaded with a frozen target decoder using a joint L1 time-domain, mel-spectrogram, and bridge loss.

## Results

Evaluated on the ICASSP 2022 DNS Challenge clean speech dataset spanning 2,425 hours across six languages, BridgeCodec bridges an 8 kHz source encoder (1 kbps, 2.8 MB) to a 48 kHz target decoder (6 kbps, 134 MB). It sustains strong performance using a single function evaluation (1 NFE) or a 10 NFE SDE sampler, outperforming an NCSN++ baseline lacking Mamba layers (BridgeCodecUNet) across perceptual and objective metrics. Ablations confirm that the Mamba-enhanced architecture and the two-stage training strategy are critical for maintaining phonetic coherence, speaker similarity, and high-frequency wideband recovery.

## Code

- https://thuhcsi.github.io/interspeech2026-BridgeCodec/

## Applications

Speech engineers and system designers building asymmetric audio communication pipelines or integrating lightweight transmission codecs with high-capacity generative speech decoders.

## Related

- (link related pages by id as the wiki grows)
