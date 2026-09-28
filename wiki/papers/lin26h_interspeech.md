---
id: lin26h_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1567
---

# Improving Cross-Dataset Speech Intelligibility Prediction for Hearing-Impaired Listeners with Few-Shot Adaptation

**TL;DR** — CFA-SIPNet adapts a speech intelligibility predictor for hearing-impaired listeners to a new dataset using less than 20% of the target data, outperforming a model trained on the full target-domain dataset.

## Problem

Speech intelligibility prediction models for hearing-impaired listeners degrade substantially when applied to unseen datasets, and subjective listening evaluations needed for adaptation are costly and scarce, limiting cross-dataset generalization.

## Method

CFA-SIPNet performs cross-domain few-shot adaptation using adapter modules and contrastive learning to adapt a speech intelligibility prediction network with minimal target-domain labeled data.

## Results

CFA-SIPNet gives a relative RMSE reduction of 8.5% and relative PCC improvement of 4.2% over the prior state of the art in cross-dataset prediction, and with less than 20% of target-domain samples it outperforms models trained on the full in-domain dataset.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Hearing aid fitting and speech-intelligibility assessment tools that need to generalize across recording conditions and populations without large amounts of new labeled listening-test data.

## Related

- (link related pages by id as the wiki grows)
