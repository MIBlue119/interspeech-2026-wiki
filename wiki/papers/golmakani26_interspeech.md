---
id: golmakani26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1949
---

# Acoustic token admixture for joint speaker and content anonymization

**TL;DR** — A token-space method that anonymizes both who is speaking and what identifying content they said, in one pass, by mixing encoder and phoneme-conditioned tokens instead of fully resynthesizing the audio.

## Problem

Speech recordings in regulated domains can't be shared or reused for AI development without suppressing two independent re-identification channels — biometric speaker identity and linguistically identifying content — but existing approaches handle each channel separately and require full re-synthesis, sacrificing the in-domain acoustic character that makes the recordings valuable.

## Method

The authors propose a unified acoustic token-space framework that jointly anonymizes both channels via per-frame admixture of encoder-derived and phoneme-conditioned tokens, with NER-triggered span replacement that preserves the surrounding prosody.

## Results

On the VoicePrivacy 2024 benchmark, the system achieves 42.54% EER — within one point of the challenge's top submission — with 3.73% WER.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving release and sharing of sensitive speech data, e.g. healthcare or legal recordings, for downstream AI development.

## Related

- (link related pages by id as the wiki grows)
