---
id: wang26ea_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2730
---

# Not Flat, But Dissociated: Prosodic and Segmental Divergence in Neural TTS

**TL;DR** — Global TTS quality metrics like MOS hide where synthesis actually diverges from natural speech; a detailed acoustic analysis finds that prosodic F0 dynamics and segmental vowel-space precision are two largely uncorrelated failure modes, not one single "flat intonation" problem.

## Problem

Standard TTS evaluation metrics such as MOS and mel-cepstral distortion give only a global score and don't pinpoint where synthesized speech diverges from natural speech.

## Method

The authors analyze four TTS systems (Tacotron2-DDC, FastSpeech2, Glow-TTS, MixerTTS) across 13,100 matched LJ-TTS utterances at both the prosodic level (F0 variability, pitch reversals, timing) and the segmental level (vowel space size, formant bias, coarticulation via locus analysis).

## Results

Global F0 variability is compressed while local pitch reversals actually increase, suggesting a cross-timescale dissociation rather than simple monotone intonation, with timing showing no reliable deviation; separately, vowel spaces shrink to 9-30% of the human baseline with articulatory-undershoot formant biases and reduced place-conditioned coarticulation, most consistently for alveolars; the prosodic and segmental deviations are largely uncorrelated.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guiding more diagnostic, multi-dimensional TTS evaluation protocols that go beyond single global quality scores to pinpoint specific synthesis weaknesses.

## Related

- (link related pages by id as the wiki grows)
