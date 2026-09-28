---
id: zhu26c_interspeech
category: multilingual
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2455
---

# Token-Independent Language Representations for Low-Latency Configurable Multilingual Speech Recognition

**TL;DR** — Decouples language identity from the per-token autoregressive decoding loop in configurable multilingual ASR, cutting peak inference latency by over 90% on long utterances without losing accuracy.

## Problem

Configurable multilingual ASR, which tailors a single model to any user-selected language combination via language-specific decoder modules, gives state-of-the-art accuracy but incurs high latency since those modules run at every decoding step, scaling cost linearly with output length.

## Method

Proposes token-independent language representations that replace the neural language-specific modules in the decoder with representations enriched by one-time, utterance-level encoder cues, reducing per-token complexity from quadratic to linear in the hidden dimension while preserving utterance-level adaptability.

## Results

Achieves accuracy comparable to the original per-token design while maintaining near-constant module overhead, reducing peak inference latency by over 90% for long utterances.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency, on-device configurable multilingual ASR for applications needing fast, per-user language customization.

## Related

- (link related pages by id as the wiki grows)
