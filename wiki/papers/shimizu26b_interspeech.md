---
id: shimizu26b_interspeech
category: prosody
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-250
---

# Auditory Contrast Network for Text-Free Prominence Detection

**TL;DR** — A tiny, interpretable model (up to 238 parameters) built from psychoacoustic principles matches a 94.6M-parameter wav2vec2 baseline at detecting word prominence from acoustics alone, running 120x faster with no text needed.

## Problem

Detecting which words a speaker emphasizes (prominence) usually requires either large neural models or text input, limiting use in on-device, text-free settings like hearing aids.

## Method

The Auditory Contrast Network encodes three psychoacoustic principles — pairwise contrast, cue independence, and forward dominance — directly into an interpretable architecture using only three acoustic features and no text.

## Results

ACN reaches r=0.412 on cross-corpus transfer (Helsinki Prosody to Emphases), matching a frozen wav2vec2 baseline's r=0.409 at 120x lower latency (adding text features raises r to 0.451), and its learned weights confirm known prosodic patterns like forward-dominant context use, strict locality, and a duration > energy > spectral ≫ F0 cue hierarchy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device, text-free prominence detection for hearing aids and real-time pronunciation monitoring where computational budget is tight and text is unavailable.

## Related

- (link related pages by id as the wiki grows)
