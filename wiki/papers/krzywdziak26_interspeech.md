---
id: krzywdziak26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1424
---

# Task-Conditioned Audio-Text-Image Fusion for Cognitive Score Estimation from Speech-Based Assessments

**TL;DR** — Fusing audio, text, and picture-description image information with task-conditioning predicts standard cognitive assessment scores (MoCA, MMSE) directly from speech tasks.

## Problem

People with mild cognitive impairment describe picture-description tasks differently than healthy individuals, often covering a narrower part of the scene and missing details and spatial relations, motivating automated scoring of such speech-based cognitive assessments.

## Method

The authors build a multimodal framework using pretrained audio, text, and optional vision encoders followed by modality-specific projections and task-conditioned fusion, comparing staged variants (acoustic features to foundation-model embeddings, late fusion, mid-level cross-attention fusion, and a mixture-of-experts model), and introduce a label-conditioned image-text alignment loss to model transcript-image consistency differences between healthy controls and MCI patients.

## Results

The best model reaches 2.11 (±0.03) RMSE for MoCA and 1.85 (±0.08) RMSE for MMSE on the picture description task.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated, multimodal cognitive score estimation from speech-based clinical assessments, supporting screening for mild cognitive impairment.

## Related

- (link related pages by id as the wiki grows)
