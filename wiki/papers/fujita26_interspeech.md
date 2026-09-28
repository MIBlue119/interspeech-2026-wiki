---
id: fujita26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-919
---

# Scalable Direction-Following TTS via Voice Impression-Guided Pseudo Triplet Construction

**TL;DR** — A scalable pipeline auto-generates (reference, direction, modified-utterance) triplets to train TTS systems that re-read a script with a new performance direction while keeping the speaker's identity intact.

## Problem

Voice actors often re-read a script with a modified delivery based on a director's note, but building TTS systems that can do this ("direction-following TTS") is hampered by a lack of training data capturing such relative, direction-conditioned modifications.

## Method

The authors propose a scalable pseudo-triplet construction pipeline that generates controlled style variations with an impression-controllable TTS model and uses an LLM to turn estimated impression differences into natural-language direction text, producing (reference utterance, direction, modified utterance) triplets without manual recording.

## Results

Pseudo-triplets alone enable stable, speaker-preserving direction-following modification, and combining pseudo data with recorded data further improves direction alignment while maintaining speaker similarity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

TTS-based dubbing and voice-acting tools where a director can iterate on delivery style ("more excited," "calmer") without re-recording, and voice-cloning systems needing controllable style edits.

## Related

- (link related pages by id as the wiki grows)
