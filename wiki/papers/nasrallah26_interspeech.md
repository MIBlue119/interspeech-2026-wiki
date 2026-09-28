---
id: nasrallah26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2927
---

# DECRA: Dynamic Emotion Control for Real-time Speech Anonymization

**TL;DR** — A real-time streaming voice-conversion system that anonymizes a speaker's identity while independently and continuously steering their emotional expression, running end-to-end under 80ms of GPU latency.

## Problem

Real-time speaker anonymization needs to neutralize or control emotional state to avoid leaking sensitive paralinguistic information, but most expressive voice-conversion systems are offline, use static global style conditioning, and entangle speaker identity with emotional attributes, limiting real-time dynamic emotion control.

## Method

DECRA conditions synthesis on continuous valence-arousal trajectories predicted online by a causal speech emotion recognition model while explicitly disentangling speaker identity from emotion, enabling closed-loop, time-varying prosody control in a fully streamable pipeline.

## Results

DECRA runs end-to-end with under 80ms GPU latency and shows improved valence-arousal emotion steering over state-of-the-art baselines, demonstrating genuine dynamic, time-varying emotion control.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving real-time voice anonymization for call centers or telehealth that still needs to convey or control emotional tone, and interactive voice agents needing dynamic affect control.

## Related

- (link related pages by id as the wiki grows)
