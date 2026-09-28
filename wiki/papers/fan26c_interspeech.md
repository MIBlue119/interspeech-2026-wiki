---
id: fan26c_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2750
---

# Bayesian Generalized Additive Multilevel Models for Accurate ERP Latency Estimation under Moderate Downsampling

**TL;DR** — Moderate downsampling of EEG data keeps Bayesian GAMM-based ERP latency estimates accurate and much cheaper to compute, but extreme downsampling blurs timing precision, especially for later-occurring components.

## Problem

Fitting single-trial Bayesian Generalized Additive Multilevel Models at high EEG sampling rates to pin down when event-related potential effects begin and end is computationally demanding, and it isn't clear how much downsampling can be tolerated.

## Method

The authors compare ERP latency estimates from Bayesian GAMMs across a range of sampling rates, from full resolution to an extreme downsampled rate, using a passive oddball paradigm and two ERP components.

## Results

Mismatch negativity latency stays stable from full to moderate downsampling, but the later discriminative negativity shows a later onset and shorter duration as sampling rate drops; at the most extreme downsampling both components are still detectable but with reduced temporal precision.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides EEG/ERP researchers on how aggressively they can downsample data to save computation without compromising latency estimation, informing study design in psycholinguistics and clinical EEG.

## Related

- (link related pages by id as the wiki grows)
