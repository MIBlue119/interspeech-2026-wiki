---
id: yu26e_interspeech
category: source-separation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1999
---

# Online Audiovisual Speaker Separation Using Efficient Visual Knowledge Distillation

**TL;DR** — A visual knowledge distillation method that compresses a heavy, non-causal visual front-end for audiovisual speaker separation into a lightweight causal student model, shrinking it over 48x while reaching state-of-the-art real-time performance.

## Problem

Causal (online, streaming) audiovisual speaker separation systems degrade significantly because they lack future context and rely on heavily parameterized visual embedding models originally built non-causally.

## Method

Visual Knowledge Distillation (VKD) progressively transfers knowledge from a causally inferred pretrained visual front-end to a lightweight, task-oriented student model via a dynamic weighting mechanism, preserving speaker-discriminative embeddings while cutting complexity.

## Results

VKD compresses the visual front-end by more than 48x in model size and 7.5x in computational complexity, and combined with a top-performing online separator, achieves state-of-the-art causal audiovisual speaker separation performance across multiple datasets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time audiovisual speaker separation for video calls, AR/VR, and on-device applications with limited compute.

## Related

- (link related pages by id as the wiki grows)
