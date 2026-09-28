---
id: li26x_interspeech
category: prosody
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1487
---

# What Makes Synthetic Speech Sound Sarcastic? A Prosody-Controlled Perception Study

**TL;DR** — A controlled TTS-based perception study isolating which prosodic cue drives perceived sarcasm, finding humans lean on loudness while an audio foundation model leans on speech rate instead.

## Problem

Prosody is known to matter for sarcasm perception, but because prosodic cues co-vary naturally, isolating the independent contribution of each cue (rate, pitch, loudness) has been hard to study.

## Method

Uses neural TTS with prompt-based prosodic conditioning to independently manipulate speech rate, pitch variation, and loudness, building an orthogonal stimulus set for causal testing, then compares human sarcasm/naturalness ratings against predictions from an audio-capable foundation model.

## Results

Loudness primarily drives human sarcasm perception, while the foundation model instead weights speech rate more heavily, indicating limited behavioral alignment between human and model cue-weighting.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs prosody control in expressive TTS for conveying sarcasm/irony, and highlights a human-model alignment gap for audio foundation models used as perceptual judges.

## Related

- (link related pages by id as the wiki grows)
