---
id: alhammad26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2250
---

# Interpretable Frequency-Band Attention with Gated SSL Fusion for Audio Deepfake Detection

**TL;DR** — BandMIL pairs self-supervised speech embeddings with per-frequency-band analysis so an anti-spoofing detector can both catch synthetic speech and show which part of the spectrum gave it away.

## Problem

Self-supervised front-ends give strong spoof detection accuracy but act as black boxes, offering no insight into which spectral regions actually carry the synthesis artifacts.

## Method

Overlapping audio windows are split into eight frequency-band spectrogram images, each encoded by a shared CNN and combined with hand-crafted per-band features under an attention pooling; a gated fusion layer merges these band-level cues with WavLM embeddings, and multiple-instance learning aggregates per-window scores into one utterance-level decision.

## Results

On ASVspoof 2019 LA the system reaches 1.28% EER and 0.0331 min t-DCF, beating an SSL-only baseline (1.73% EER), and per-attack analysis shows the band-based and SSL-based cues catch different types of spoofing.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speaker-verification systems and voice-based authentication pipelines that need both accurate deepfake screening and an interpretable, auditable basis for flagging a sample.

## Related

- (link related pages by id as the wiki grows)
