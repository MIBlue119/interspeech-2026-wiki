---
id: mao26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1248
---

# Neural Multichannel Distant Speaker Diarization and Source Separation with Beta Speaker Activity Prior

**TL;DR** — Adding a Bayesian beta prior over speaker activity to a model-driven multichannel diarization system, trained with a variational-lower-bound objective instead of cross-entropy, cuts Diarization Error Rate by 16% and Jaccard Error Rate by 20% relative to the baseline on AMI.

## Problem

Distant speaker diarization is challenging due to adverse acoustics, varying speaker counts, and overlapping speech; model-driven methods that use multichannel spatial information offer a compelling alternative to purely data-driven approaches but can be made more robust.

## Method

The authors propose a Bayesian diarization model that extends the model-driven neural FCASA method with a beta prior over speaker activity, deriving a variational lower bound objective that acts as a regularized continuous speaker activity score, replacing the original cross-entropy training loss.

## Results

On the AMI dataset, the method improves Diarization Error Rate by at least 3 absolute points (16% relative) and Jaccard Error Rate by at least 4 absolute points (20% relative) versus the baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to meeting-recording diarization and source separation systems using multichannel microphone arrays in distant/far-field settings.

## Related

- (link related pages by id as the wiki grows)
