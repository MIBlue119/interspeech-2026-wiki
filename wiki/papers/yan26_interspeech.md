---
id: yan26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-192
---

# UniSE: A Unified Framework for Decoder-Only Autoregressive LM-Based Speech Enhancement

**TL;DR** — A single decoder-only language model, trained with progressive reinforcement learning, handles speech restoration, target speaker extraction, and speech separation all as autoregressive discrete-token generation.

## Problem

Neural audio codecs have enabled language-model-based approaches across speech tasks, but whether a single autoregressive LM can effectively unify diverse speech enhancement tasks (restoration, target speaker extraction, separation) was underexplored.

## Method

UniSE conditions a decoder-only LM on input speech features and autoregressively generates target discrete tokens, making it compatible with the differing learning patterns of multiple enhancement tasks, and adds a progressive reinforcement learning strategy using multiple assessment criteria to further optimize output quality.

## Results

Across several benchmarks, UniSE achieves competitive performance versus both discriminative and generative baselines, demonstrating that a unified LM can handle multiple speech enhancement tasks; code and demo are released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

A single unified model for production speech-enhancement pipelines needing restoration, target-speaker extraction, and separation without maintaining separate specialized systems.

## Related

- (link related pages by id as the wiki grows)
