---
id: ghosh26e_interspeech
category: on-device
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1316
---

# AnySimLite: A Lightweight Few-Shot Similarity Encoder for On-Device Speech-Adjacent Classification

**TL;DR** — A single tiny similarity encoder that reformulates many speech-adjacent text classification tasks as similarity matching, matching much larger models' accuracy at under 1/250th the size for on-device use.

## Problem

On-device apps often need several specialized text-classification models for speech-adjacent tasks, but deploying many separate models blows up the memory footprint on edge devices like smartphones.

## Method

ANYSIM-LITE combines word-level and character-level channels in one lightweight similarity encoder, paired with a dataset transformation strategy that reduces multiple classification tasks to a shared text-similarity formulation solvable in a few-shot setting.

## Results

Across multiple speech-adjacent classification tasks, ANYSIM-LITE reaches state-of-the-art or near state-of-the-art few-shot performance, with worst-case accuracy drop under 7% versus a qLLaMA_LoRA-7B baseline while using less than 1/250th of its model size.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving, low-latency on-device classification for smartphone assistants and other edge deployments that need to support many text-classification tasks without a model-per-task memory cost.

## Related

- (link related pages by id as the wiki grows)
