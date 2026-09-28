---
id: ito26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2942
---

# Unified Prosody Restoration Using Diffusion Models for Controllable Text-to-Speech Synthesis

**TL;DR** — Reframes prosody control for TTS as restoring frame-level prosody from simplified user inputs, using diffusion models so users don't have to specify every frame-level detail.

## Problem

Controllable TTS with explicit prosodic features enables fine-grained control, useful for emotional speech, but specifying frame-level detail imposes a heavy burden on users.

## Method

Formulates prosody restoration as recovering frame-level prosody from partial or coarse simplified inputs across five tasks (two prior plus three novel), using two diffusion-based restorers: a supervised model trained to reverse simulated degradations, and an unsupervised model using samplers for linear inverse problems.

## Results

Across all five tasks, both diffusion restorers recover prosody more accurately than non-diffusion baselines while preserving linguistically valid prosodic structures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Emotional and expressive TTS tools that let users sketch simplified prosody and get natural frame-level output.

## Related

- (link related pages by id as the wiki grows)
