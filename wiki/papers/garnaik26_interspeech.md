---
id: garnaik26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2197
---

# When Machines Speak Like Local Peers: Improving Conversational Experiences with Accent-Adaptive Voice Agents

**TL;DR** — LocalMATE is an accent-adaptive airport voice agent that estimates a user's accent, retrieves grounded answers, and responds in accent-conditioned synchronized speech-and-video, significantly boosting user trust in a live study.

## Problem

Public voice agents often underperform for accented English speakers, reducing usability and trust, and existing systems rarely adapt their own responses to the user's detected accent.

## Method

LocalMATE (i) estimates a user's accent with calibrated confidence using a WavLM-Base-Plus accent estimator with layer-weighted statistics pooling, (ii) retrieves grounded answers, and (iii) returns accent-conditioned speech with a synchronized talking-face video, falling back gracefully when confidence is low.

## Results

The accent estimator reaches 85% speaker-disjoint accuracy on L2-ARCTIC (Indian/Korean/Spanish) and 92.3% on out-of-domain Korean-accented Speech Accent Archive data, and a within-participant study (N=20) found correct accent adaptation significantly improved user confidence and trust.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Directly applicable to public-facing conversational kiosks (e.g. airports, transit hubs) serving linguistically diverse users who benefit from accent-aware responses.

## Related

- (link related pages by id as the wiki grows)
