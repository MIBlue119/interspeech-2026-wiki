---
id: zhao26e_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1339
---

# Decoding Order Matters in Autoregressive Speech Synthesis

**TL;DR** — Testing arbitrary decoding orders via a masked-diffusion framework shows the traditional left-to-right order is suboptimal for speech synthesis — right-to-left consistently does better, and an adaptive confidence-based order scores highest of all.

## Problem

Autoregressive speech synthesis traditionally decodes left-to-right, but generation order is really a modeling choice, and it wasn't well understood whether other decoding orders could better capture complex acoustic dependencies.

## Method

The authors investigate decoding order through a masked diffusion framework that enables arbitrary decoding orders at inference time, operating on scalar-quantised Mel-spectrograms to isolate the effect of decoding order from inductive biases introduced by learned discrete encoders.

## Results

The left-to-right strategy is suboptimal for capturing complex acoustic dependencies; the reverse right-to-left order consistently outperforms it; an adaptive confidence-based strategy ("top1") achieves the highest MOS among all model outputs; the most effective orders maintain local clusters of consecutive frames, balancing long-range dependencies with local coherence.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs architecture and decoding-strategy choices for next-generation autoregressive/diffusion TTS systems seeking higher naturalness.

## Related

- (link related pages by id as the wiki grows)
