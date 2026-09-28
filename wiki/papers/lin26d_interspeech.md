---
id: lin26d_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1338
---

# BridgeCodec: Mamba Enhanced Neural Audio Codec with Schrödinger Bridge at Low Bitrate

**TL;DR** — A framework that translates between the latent spaces of mismatched, frozen neural audio codecs, letting a cheap 8kHz encoder feed a 48kHz decoder at just 1 kbps without retraining either.

## Problem

Neural audio codecs are closed ecosystems with rigidly co-trained encoder-decoder pairs, which severely hinders interoperability between codecs trained separately.

## Method

BridgeCodec formulates cross-codec latent translation as a Schrödinger Bridge optimal transport problem between frozen, mismatched endpoints, without predefined noise priors, and integrates a Mamba-enhanced U-Net to capture long-range temporal dependencies efficiently.

## Results

In an extreme test mapping a lightweight 8 kHz source encoder directly to a 48 kHz target decoder at an ultra-low 1 kbps bitrate, BridgeCodec achieves superior wideband reconstruction and high perceptual quality, successfully bridging heterogeneous codecs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Interoperability between independently developed neural audio codecs, and ultra-low-bitrate speech transmission.

## Related

- (link related pages by id as the wiki grows)
