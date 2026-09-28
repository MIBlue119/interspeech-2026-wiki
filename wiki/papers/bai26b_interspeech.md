---
id: bai26b_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1056
---

# Controllable Accent Normalization via Discrete Diffusion

**TL;DR** — A masked discrete-diffusion model that lets users dial accent strength up or down when converting accented speech toward a native target, rather than only offering an all-or-nothing normalization.

## Problem

Existing accent normalization systems reduce an accent but give no way to control how much of it is retained, even though use cases like language learning or dubbing need tunable strength.

## Method

DLM-AN runs masked discrete diffusion over self-supervised speech tokens; a Common Token Predictor flags tokens that already sound native and reuses more or fewer of them to seed the reverse diffusion, while a flow-matching Duration Ratio Predictor retimes the output to match native rhythm.

## Results

On multi-accent English data, DLM-AN reaches the lowest word error rate among compared systems while giving smooth, interpretable control over accent strength and competitive accent reduction.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Accent coaching and language-learning feedback tools, and dubbing/localization pipelines that need adjustable rather than binary accent conversion.

## Related

- (link related pages by id as the wiki grows)
