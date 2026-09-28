---
id: shi26f_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2407
---

# EffVOC: Low-Delay Efficient Speech Waveform Reconstruction from Spectral Representations Without Phase

**TL;DR** — EffVOC is a low-delay, efficient vocoder that reconstructs high-quality wideband or fullband speech waveforms from phase-free amplitude spectra or Mel coefficients, setting a new state of the art in subjective quality at lower delay than prior neural methods.

## Problem

Classic Griffin-Lim phase reconstruction needs very high algorithmic delay for good quality, and its low-delay variant sacrifices speech quality; recent generative neural vocoders improve quality but often at medium-to-high delay and are typically optimized for only one specific input representation.

## Method

Building on an efficient low-delay speech vocoder, EffVOC supports synthesizing wideband or fullband speech from either amplitude spectrum or Mel coefficient inputs, and is evaluated across multiple model sizes in a single unified framework against prior state-of-the-art vocoders.

## Results

EffVOC achieves top-ranked subjective MOS scores at a lower algorithmic delay (20ms vs. 32ms or more) than competitors — 4.17/4.15 for wideband and 4.14/4.11 for fullband across amplitude/Mel input representations — very close to ground truth.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency vocoding for real-time TTS, voice conversion, and speech coding systems where both quality and delay budget matter.

## Related

- (link related pages by id as the wiki grows)
