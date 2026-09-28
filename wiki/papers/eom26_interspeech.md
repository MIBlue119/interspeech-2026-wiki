---
id: eom26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3190
---

# Transcript-Free Flow-Matching Text-to-Speech via Speech Feature Conditioning

**TL;DR** — A zero-shot TTS model that drops the usual reference-transcript requirement, making it far more robust for accented and dysarthric speakers whose transcripts an ASR system would get wrong anyway.

## Problem

Flow-matching TTS models like F5-TTS need an ASR-generated reference transcript at inference, which is brittle for accented or dysarthric speakers and can leak atypical acoustic patterns into the synthesized voice even when ground-truth transcripts are available.

## Method

RTFree-F5 replaces the reference transcript with continuous self-supervised speech representations, mapped into F5-TTS's text-conditioning space via a lightweight adapter while reusing the pretrained checkpoint.

## Results

On dysarthric speech, cuts WER from 24.6% to 10.4%, surpassing even ground-truth-transcript baselines, while improving naturalness and staying competitive on standard benchmarks without any reference transcript.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice cloning and synthesis for users with atypical speech, such as dysarthria or strong accents, where reliable reference transcripts aren't available.

## Related

- (link related pages by id as the wiki grows)
