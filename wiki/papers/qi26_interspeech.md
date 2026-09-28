---
id: qi26_interspeech
category: turn-taking
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1381
pdf: https://www.isca-archive.org/interspeech_2026/qi26_interspeech.pdf
---

# MuVAP: Multimodal Multiparty Voice Activity Projection for Turn-taking Prediction in the wild

[PDF](https://www.isca-archive.org/interspeech_2026/qi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/qi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1381)

**TL;DR** — MuVAP is a causal multimodal framework for multiparty turn-taking prediction that uses a single camera and monaural audio stream, outperforming strong baselines on Shift-Hold and next-speaker prediction tasks.

## Problem

Traditional Voice Activity Projection models are predominantly restricted to dyadic (two-party) interactions and monomodal speech inputs, while existing multiparty turn-taking and active speaker detection models either depend on complex microphone arrays, multi-camera setups, or suffer from editing artifacts like jump cuts in training data. This makes them impractical for unconstrained human-robot interaction scenarios where a robot must fluidly predict turn shifts and speaker identities from a single viewpoint without spatial audio separation.

## Method

The framework introduces Role-Relative Projection to abstract arbitrary N-speaker interactions onto a fixed current versus next floor-holder state, avoiding combinatorial explosions in the label space. It utilizes a modular training recipe combining a 1,960-hour telephone corpus for acoustic turn-taking, 140 hours of active speaker detection data, and the newly introduced Audio-Visual Conversation Corpus (AVCC). The architecture is strictly causal, taking a monaural audio stream and synchronized face tracks to jointly predict GlobalVAP (GVAP) and SpeakerVAP (SVAP) distributions without utilizing spatial audio cues or multi-view geometry.

## Results

Evaluated on the AVCC dataset comprising roughly 31 hours of unedited, continuous two- and three-speaker conversations from web videos. MuVAP is assessed on Shift-Hold and next-speaker prediction tasks against strong baselines, demonstrating superior performance in capturing natural conversational dynamics like overlaps, pauses, and gaps.

## Code

- https://github.com/Haotian-Qi/MuVAP

## Applications

Social robots and conversational agents operating in unconstrained multiparty environments that require real-time, speaker-aware turn-taking and active speaker prediction from standard single-camera and monaural hardware.

## Limitations

Evaluated primarily on two- and three-speaker settings derived from unscripted web video streams.

## Related

- (link related pages by id as the wiki grows)
