---
id: zhang26z_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1679
---

# Time-Unconditional Generative Speech Enhancement via Autonomous Rectified Flow

**TL;DR** — Challenges the assumption that generative speech enhancement needs explicit time-step conditioning, showing a time-unconditional rectified-flow model that infers denoising direction purely from spatial state improves quality and efficiency.

## Problem

Most generative speech enhancement methods rely on explicit time-step embeddings for temporal conditioning, but whether this conditioning is actually necessary had not been challenged.

## Method

Proposes Autonomous Rectified Flow, using a linear interpolation path to show the target vector field is inherently time-invariant, then introduces a time-unconditional network that eliminates explicit time-step information and infers the denoising direction solely from the spatial relationship between the current state and the noisy observation.

## Results

By avoiding overfitting to temporal trajectories, the autonomous, time-unconditional design significantly improves generation quality, robustness, and inference efficiency compared to time-conditioned approaches.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Simpler, more efficient generative speech enhancement and restoration pipelines that drop unnecessary time-conditioning complexity.

## Related

- (link related pages by id as the wiki grows)
