---
id: zheng26c_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1760
---

# CtrlSpeech: Coarse-to-Fine Control for Expressive Speech Synthesis

**TL;DR** — CTRLSPEECH combines global speaker conditioning with phone-aligned pitch, loudness, and duration signals on a DiTAR-based TTS architecture, giving word/phoneme-level expressive control while preserving target speaker timbre and competitive zero-shot performance.

## Problem

Recent TTS systems achieve strong naturalness and zero-shot voice cloning, but fine-grained control of expressive speech at the word or phoneme level remains challenging.

## Method

CTRLSPEECH, built on the DiTAR architecture, combines global speaker conditioning with phone-aligned pitch, loudness, and duration control signals, enabling localized prosodic control at fine temporal granularity while preserving the target speaker's timbre.

## Results

CTRLSPEECH achieves competitive zero-shot TTS performance and improves controllability over expressive attributes compared to prior systems; demo, code, and model weights are released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for expressive dubbing, audiobook narration, or any TTS application needing precise word-level control over prosody without losing speaker identity.

## Related

- (link related pages by id as the wiki grows)
