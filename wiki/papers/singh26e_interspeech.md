---
id: singh26e_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3451
---

# ProSarc: Prosody-Aware Sarcasm Recognition Framework via Temporal Prosodic Incongruity

**TL;DR** — An audio-only sarcasm detector that scores the mismatch between an utterance's moment-to-moment prosody and its overall emotional baseline, beating prior audio-only methods and generalizing across spontaneous and cross-lingual speech.

## Problem

Detecting sarcasm from audio alone is hard because it requires capturing subtle temporal mismatches between local prosodic dynamics and the overall emotional tone of an utterance, which prior audio-only methods do not explicitly model.

## Method

ProSarc uses a Global Emotion Encoder and a Temporal Prosody Encoder (BiLSTM plus multi-head attention) feeding a Prosodic Incongruity Analyzer that outputs a scalar incongruity score, with Monte Carlo dropout for uncertainty estimation and an attention mechanism that localizes sarcastic onset without frame-level labels.

## Results

ProSarc outperforms prior audio-only methods on MUStARD++ (F1=75.3) and generalizes to spontaneous podcast speech (PodSarc, F1=62.9) and cross-lingual speech (MuSaG, F1=65.6); ten-run validation confirms incongruity modeling's contribution (p=0.002, d=1.51), and human evaluation shows model uncertainty tracks perceptual ambiguity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio-only sarcasm and irony detection for content moderation, sentiment analysis of podcasts/calls, and cross-lingual affective computing.

## Related

- (link related pages by id as the wiki grows)
