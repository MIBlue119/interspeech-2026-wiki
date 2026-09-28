---
id: perezgonzalezdemartos26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1407
---

# Not Quite My Tempo: Voice Activity-aware Speech Synthesis for Lip-Synchronous Dubbing

**TL;DR** — A dubbing TTS model that matches the target language's speech timing to the source video by conditioning on a simple, optional binary voice-activity signal instead of raw lip-movement video.

## Problem

Lip-synchronous dubbing requires TTS output whose voice/silence timing precisely matches the source clip, but prior work conditions synthesis directly on lip movements extracted from video, which is heavier and less flexible.

## Method

Conditions speech generation on a lightweight binary voice-activity signal (producible in multiple ways), and randomly masks this condition during training so the feature becomes entirely optional at inference, letting editors enforce or relax lip-sync constraints as desired.

## Results

Objective and subjective evaluations show the model follows the voice-activity signal with high accuracy while maintaining natural prosody and semantically appropriate pause placement within sentences.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automatic dubbing pipelines for film, TV, and video localization that need timing-accurate, lip-synchronous speech in a target language.

## Related

- (link related pages by id as the wiki grows)
