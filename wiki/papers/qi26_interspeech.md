---
id: qi26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1381
---

# MuVAP: Multimodal Multiparty Voice Activity Projection for Turn-taking Prediction in the wild

**TL;DR** — A causal audiovisual model that predicts multiparty turn-taking from just one camera and a single microphone by grounding voice activity projection in face tracks, plus a new 31-hour unedited multiparty conversation dataset.

## Problem

Existing multiparty turn-taking models typically need complex microphone arrays or multi-camera setups, which limits their use in practical human-robot interaction, and existing audiovisual datasets have editing cuts that break causal tracking.

## Method

MuVAP extends Voice Activity Projection by grounding acoustic predictions in face tracks from a single camera, and introduces Role-Relative Projection to map any N-speaker interaction onto a fixed current-vs-next floor-holder representation, avoiding combinatorial blowup; the authors also release the Audio-Visual Conversation Corpus, 31 hours of unedited single-camera multiparty conversation.

## Results

MuVAP outperforms strong baselines on Shift-Hold and next-speaker prediction tasks across two- and three-speaker settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Turn-taking and floor-management prediction for social robots and conversational agents operating with simple monaural-audio-plus-single-camera setups.

## Related

- (link related pages by id as the wiki grows)
