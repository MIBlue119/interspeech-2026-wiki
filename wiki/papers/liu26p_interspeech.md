---
id: liu26p_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2125
---

# audiobook-cc: Controllable Long-context Speech Generation for Multicast Audiobook

**TL;DR** — A context-aware, emotion-controllable TTS framework built for multi-speaker (multicast) audiobooks, adding chapter-level consistency and disentangled style control that single-sentence TTS lacks.

## Problem

Existing TTS systems mostly synthesize single sentences and lack the contextual modeling and fine-grained control needed for coherent, multi-speaker (multicast) audiobooks.

## Method

Combines a context mechanism for cross-sentence/chapter consistency, a disentanglement paradigm to decouple style from prompts, and self-distillation to boost expressiveness.

## Results

Chapter-level generation reaches 4.25 M-MOS (14% relative gain over the strongest baseline), dialog reaches 4.11 S-MOS, and emotion control improves by 31 percentage points in high-intensity discrimination.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Producing long-form, multi-character audiobooks and podcast-style narration with consistent, emotionally controllable voices.

## Related

- (link related pages by id as the wiki grows)
