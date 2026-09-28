---
id: li26d_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-476
---

# CAQA-Net: Continual Audio Quality Assessment Across Speech and Music Domains

**TL;DR** — CAQA-Net continually learns to assess new audio distortion types and domains without forgetting old ones, landing within 0.036 SRCC of a joint-training upper bound.

## Problem

Audio generation and processing techniques keep introducing new distortion types and audio domains, but traditional static audio quality assessment (AQA) models cannot keep up with this dynamic, evolving landscape.

## Method

CAQA-Net is a systematic continual-learning framework for AQA that acquires new task knowledge from a sequence of tasks while retaining old knowledge, using a dual-branch, multi-head architecture combining a trainable waveform encoder with a spectrogram-based semantic anchor, a knowledge-distillation regularizer to preserve old knowledge, and a prototype-based gating mechanism for task-agnostic inference.

## Results

CAQA-Net successfully balances plasticity and stability across a sequence of quality-assessment tasks, achieving performance within 0.036 SRCC (4.6%) of the joint-training upper bound that has access to all tasks at once.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Long-lived audio quality assessment services that must keep evaluating new generative models and distortion types (speech and music) without retraining from scratch.

## Related

- (link related pages by id as the wiki grows)
