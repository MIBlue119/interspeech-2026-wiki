---
id: boo26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1246
---

# Referee: Reference-aware Audiovisual Deepfake Detection

**TL;DR** — An audiovisual deepfake detector that checks a suspect clip against a single genuine reference clip of the claimed speaker, improving generalization to unseen fake-generation methods.

## Problem

Audiovisual deepfake detectors struggle to generalize to manipulation methods not seen during training, limiting real-world reliability.

## Method

Referee uses an identity bottleneck and matching module to model fine-grained, speaker-specific audiovisual consistency between a suspect clip and a one-shot genuine reference clip acting as a biometric anchor.

## Results

Achieves state-of-the-art results on cross-dataset and cross-language evaluation across FakeAVCeleb, FaceForensics++, and KoDF.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Media forensics and platform trust-and-safety systems needing robust cross-dataset audiovisual deepfake detection.

## Related

- (link related pages by id as the wiki grows)
