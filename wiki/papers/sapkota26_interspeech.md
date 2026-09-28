---
id: sapkota26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2375
---

# IACC-HuBERT: Intelligibility-Aware Channel Conditioning of HuBERT Frontend for Dysarthric Speech Conformer ASR

**TL;DR** — Lightly conditioning HuBERT's channel-wise features on a speaker's intelligibility level, using FiLM-style modulation, adapts a generic speech foundation model to dysarthric speech ASR by training only a few million extra parameters.

## Problem

Speech foundation models advance ASR mainly for clean or controlled speech, but none are specifically designed for dysarthric speech, so adapting existing pretrained models is necessary, and prior SSL-feature-extraction approaches don't specifically account for speaker intelligibility differences.

## Method

The authors propose an efficient adaptation method that conditions self-supervised HuBERT features on speaker intelligibility using channel-wise modulation via FiLM-only and Gated-FiLM mechanisms within an end-to-end Conformer ASR system.

## Results

Training only 6.3M (FiLM) to 15.78M (Gated-FiLM) additional parameters achieves WERs of 21.3% and 21.0% respectively on dysarthric speech ASR.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Parameter-efficient adaptation of speech foundation models for assistive ASR systems serving speakers with dysarthria.

## Related

- (link related pages by id as the wiki grows)
