---
id: kuwar26_interspeech
category: multilingual
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2262
---

# VINAYAKA: Multilingual Audio-Visual Hate Speech Detection via Cross-Modal Fusion in Hyperbolic Space

**TL;DR** — Fusing audio and visual cues in hyperbolic (non-Euclidean) space gives state-of-the-art multilingual hate speech detection that stays robust to ASR errors and generalizes across languages and datasets.

## Problem

Robustly detecting hate speech from audio-visual content across languages is difficult, especially when relying on paralinguistic and behavioral cues rather than just transcribed text, which is vulnerable to ASR errors.

## Method

VINAYAKA relies solely on audio-visual cues, combining WavLM and ImageBind representations with Cross-modal Fusion in Hyperbolic Space (CFHS), a technique designed to better align paralinguistic and behavioral audio-visual cues to capture hateful intent.

## Results

Achieves state-of-the-art performance in both in-distribution and out-of-distribution settings across cross-lingual and cross-dataset evaluations, and remains robust to ASR error propagation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Content moderation systems for multilingual audio-visual platforms that need robust hate speech detection even when transcripts are noisy or unreliable.

## Related

- (link related pages by id as the wiki grows)
