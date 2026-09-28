---
id: huang26h_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1409
---

# RAS: a Reliability Oriented Metric for Automatic Speech Recognition

**TL;DR** — RAS is a new ASR evaluation metric and abstention-aware training recipe that rewards models for flagging uncertain transcription segments instead of confidently guessing wrong, improving transcript reliability without sacrificing accuracy.

## Problem

Standard Word Error Rate only measures accuracy and can't capture reliability: ASR systems often output confident but wrong transcriptions under noisy or ambiguous conditions, which can mislead users and downstream systems.

## Method

The authors introduce an abstention-aware transcription framework where the ASR model can explicitly abstain on uncertain segments, propose the RAS metric to balance informativeness against error aversion with a trade-off parameter calibrated by human preference, and train an abstention-aware model via supervised bootstrapping followed by reinforcement learning.

## Results

Experiments show substantial improvements in transcription reliability while maintaining competitive accuracy compared to standard non-abstaining ASR.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

High-stakes transcription settings (legal, medical, safety) where knowing what the system is unsure about matters as much as raw accuracy.

## Related

- (link related pages by id as the wiki grows)
