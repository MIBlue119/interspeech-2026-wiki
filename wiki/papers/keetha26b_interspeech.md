---
id: keetha26b_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://www.isca-archive.org/interspeech_2026/keetha26b_interspeech.html
---

# A light weight Continuous Speaker Verification System for Real time Monitoring

**TL;DR** — A lightweight, real-time speaker-verification system that continuously watches a phone call and alerts an agent if the speaker changes mid-call, aimed at preventing identity fraud in banking and insurance calls.

## Problem

Telephone-based customer interactions in banking and medical insurance need continuous identity verification, since a speaker swap mid-call could let an unauthorized person access sensitive information.

## Method

The system uses a two-stage ReDimNet-B1 backbone plus a triplet-trained projection network to extract speaker embeddings, continuously comparing incoming speech to an enrolled voice-print and alerting the agent interface on mismatch, with cross-lingual, noise, and reverberation augmentation for robustness.

## Results

The system runs in real time at an RTF of 0.05 with a low 318M-MAC computational footprint and achieves a 2.08% equal error rate on the TidyVoice evaluation dataset.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time identity-fraud prevention during banking, insurance, and other sensitive telephone customer-service calls.

## Related

- (link related pages by id as the wiki grows)
