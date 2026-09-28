---
id: yen26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-488
---

# MDM-ASR: Bridging Accuracy and Efficiency in ASR with Diffusion-Based Non-Autoregressive Decoding

**TL;DR** — A masked-diffusion non-autoregressive ASR decoder that closes much of the accuracy gap with autoregressive models while keeping parallel decoding speed, aided by training the model on its own intermediate predictions.

## Problem

Autoregressive ASR models are accurate but decode slowly, while non-autoregressive models decode in parallel but usually lose significant accuracy, and this trade-off has lacked a principled diffusion-based solution.

## Method

A pretrained speech encoder feeds a Transformer diffusion decoder conditioned on acoustic features and partially masked transcripts for parallel token prediction; the authors add Iterative Self-Correction Training, which exposes the model to its own intermediate predictions during training, plus a Position-Biased Entropy-Bounded Confidence sampler.

## Results

Across multiple benchmarks, MDM-ASR shows consistent gains over prior non-autoregressive models and reaches performance competitive with strong autoregressive baselines while retaining parallel-decoding efficiency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Fast, near-autoregressive-accuracy ASR for latency-sensitive applications that still want the speed benefits of parallel decoding.

## Related

- (link related pages by id as the wiki grows)
