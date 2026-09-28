---
id: bralios26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3031
---

# Elastic Time: Dynamic Frame Rate Bottlenecks for Neural Audio Coding

**TL;DR** — Elastic Time converts fixed-frame-rate neural audio autoencoders into ones that spend more latent frames on information-dense audio and fewer on sparse stretches, improving the quality-efficiency tradeoff for compression and generation.

## Problem

Most neural audio autoencoders used for compression, feature extraction, and generation operate at a fixed latent frame rate, spending equal temporal budget on regions of very different information density and producing unnecessarily long sequences.

## Method

The method learns a lightweight latent predictor that decides which frames can be skipped and later reconstructed, enabling a greedy boundary-selection procedure at inference time that turns a fixed-frame-rate autoencoder into a dynamic one.

## Results

Experiments show Elastic Time enables deployment-time control over compression rate while improving the efficiency-quality tradeoff relative to fixed-frame-rate baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More efficient audio codecs and downstream generative or long-context audio models that need adjustable temporal resolution.

## Related

- (link related pages by id as the wiki grows)
