---
id: takagi26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1478
pdf: https://www.isca-archive.org/interspeech_2026/takagi26_interspeech.pdf
---

# Investigating Human-Model Discrepancies in Speech Quality Assessment via Acoustic and Prosodic Perturbations

[PDF](https://www.isca-archive.org/interspeech_2026/takagi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/takagi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1478)

**TL;DR** — Evaluating automatic Mean Opinion Score (MOS) prediction models under controlled perturbations reveals that while they reliably track acoustic degradation, they are entirely insensitive to prosodic accent errors and display ungrounded speaker-dependent biases.

## Problem

Automated MOS prediction models (such as SSL-MOS and UTMOS) are increasingly used as direct substitutes for costly human listening tests in text-to-speech (TTS) research. However, it remains unclear whether these scalar models capture the multidimensional perceptual criteria that humans use, specifically beyond coarse acoustic fidelity. This risks misguiding TTS optimization if models overlook fine-grained prosodic errors and speaker characteristics.

## Method

The study tests human listeners and six automatic MOS predictors—SHEET-MB, SHEET-BV, UTMOS, UTMOSv2, NISQA, and DNSMOS—against three controlled perturbation dimensions in Japanese (a pitch-accent language): acoustic degradation (clipping, pink noise, low-bitrate MP3), prosodic errors (synthesized speech with manipulated high-low pitch-accent swaps at 10-20% and 80-90% rates), and speaker characteristics (natural and artificially shifted F0 and speaking rate via SiFi-GAN and WORLD vocoders). Human ratings were gathered from 15 native listeners evaluating 656 total utterances on a 5-point scale, and model inferences were processed through the VERSA evaluation toolkit at 16 kHz.

## Results

For acoustic degradation (Group A), most models achieved high system-level Spearman rank correlations (up to 0.964 for SHEET-BV and UTMOSv2), though multi-domain training degraded SHEET-MB's MP3 ranking. For prosodic errors (Group B), human MOS dropped dramatically by 1.84 points as accent swap severity increased, but all automatic models exhibited negligible score variations of less than 0.1 points. For speaker characteristics (Group C), humans showed moderate correlations with speaking rate (r = -0.520) and log F0 variability (r = 0.477), but near-zero correlation with mean log F0 (r = -0.059); conversely, most models showed strong negative correlations with mean log F0 and failed to replicate human-like sensitivity to F0 variability and speaking rate.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers developing text-to-speech systems, voice conversion models, or automated speech quality evaluation pipelines.

## Limitations

The study focuses primarily on Japanese speech datasets (JVS and NANSYTTS) and a specific set of pretrained SSL and CNN models.

## Related

- (link related pages by id as the wiki grows)
