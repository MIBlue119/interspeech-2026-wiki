---
id: fiedler26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-424
---

# Contrastive Time-Proximity Pre-Training for Speech-Based Heart Failure Monitoring

**TL;DR** — A self-supervised contrastive method that pulls together embeddings of speech recorded close in time (and pushes apart ones recorded far apart) learns heart-failure-predictive voice representations from natural speech, generalizing better across clinical sites than classical acoustic features.

## Problem

Voice is a promising non-invasive biomarker for detecting acute decompensated heart failure (ADHF) before hospitalization is needed, but prior work relies on sustained vowels requiring active patient engagement, limiting real-world applicability.

## Method

The authors propose Contrastive Time-Proximity (CTP), a self-supervised method that trains a segment-attentive LSTM to minimize embedding distance for recordings less than 3 days apart (presumed similar health state) while maximizing it for recordings over 100 days apart, exploiting the progressive nature of heart failure.

## Results

On a two-center dataset of 68 ADHF patients, classical acoustic features achieve similar within-center accuracy but fail to generalize cross-center, while CTP features show more robust cross-center generalization, outperforming random and human baselines, with attention analysis showing focus on breathing-related segments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Could enable passive, natural-speech-based remote monitoring for early detection of heart failure decompensation, reducing reliance on scripted vocal tasks.

## Related

- (link related pages by id as the wiki grows)
