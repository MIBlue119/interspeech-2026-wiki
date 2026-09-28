---
id: gichamba26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3493
---

# Probing Low Frame Rate Degradation in Neural Audio Codecs

**TL;DR** — The quality cliff seen in ultra-low-frame-rate neural audio codecs turns out to be a training-configuration artifact, not a fundamental barrier — fixing clip-duration-induced token starvation lets codecs degrade smoothly down to 1.6 Hz.

## Problem

Low frame-rate neural audio codecs are attractive for autoregressive speech synthesis since generation cost scales with sequence length, but a previously reported quality cliff around 6.25 Hz is not well understood.

## Method

The authors run a controlled frame-rate ablation, reproducing the reported quality cliff and testing candidate explanations (phonemic collisions, codebook saturation), then identify that fixed clip duration during training yields too few tokens at low frame rates, starving the decoder of inter-token context.

## Results

Once the training configuration is corrected, word error rate degrades smoothly with phonemic load down to 3.1 Hz and even 1.6 Hz, showing the cliff was an artifact rather than a fundamental limit.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs codec and TTS system designers pursuing more efficient, lower-frame-rate audio tokenization for faster autoregressive speech generation.

## Related

- (link related pages by id as the wiki grows)
