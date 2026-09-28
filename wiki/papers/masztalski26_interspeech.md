---
id: masztalski26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-763
---

# Samsone: A Family of Open Small Audio Language Models for On-Device Inference

**TL;DR** — An open family of small audio language models (99M-356M parameters) that hits state-of-the-art results for its size class while running in real time on Android devices, with full training code, weights, and demo app released.

## Problem

Large audio language models keep growing past billions of parameters, but privacy-preserving, low-latency use cases increasingly need small audio language models that can run entirely on-device.

## Method

The authors build Samsone, a family of small audio language models (Samsone-99M, -134M, -356M) trained entirely on publicly available data, and study scaling behavior across the three sizes for edge deployment.

## Results

Samsone-134M sets a new state of the art for its size class across multiple benchmarks, and the whole family performs competitively with models orders of magnitude larger; training code, weights, mobile-optimized checkpoints, and an open-source Android app are all released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device audio understanding assistants and edge-AI applications needing privacy-preserving, low-latency inference without cloud dependence.

## Related

- (link related pages by id as the wiki grows)
