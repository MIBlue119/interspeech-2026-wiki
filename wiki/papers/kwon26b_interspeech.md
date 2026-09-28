---
id: kwon26b_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1326
---

# Investigating ASR for Low-Intelligibility Dysarthric Speech

**TL;DR** — Shows that severe, low-intelligibility dysarthric speech can be recognized with under 14% WER given enough speaker-specific data, and that a fine-tuned Whisper generalizes to other severe patients too.

## Problem

Most dysarthric ASR research uses datasets dominated by mild-to-moderate cases, leaving severe, low-intelligibility dysarthria poorly studied.

## Method

Uses a large speaker-dependent dataset from an individual with severe, low-intelligibility speech to train a BLSTM-HMM model and fine-tune large pretrained Whisper models, then tests generalization of the fine-tuned Whisper to other patients.

## Results

Both speaker-dependent models achieve under 14% WER on severe dysarthria; the fine-tuned Whisper generalizes to other severe-dysarthria patients with a 6.4 percentage point improvement, without degrading performance on mild/moderate cases.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive ASR for individuals with severe dysarthria, supporting communication aids and clinical speech monitoring.

## Related

- (link related pages by id as the wiki grows)
