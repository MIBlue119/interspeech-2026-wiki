---
id: takagi26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1478
pdf: https://www.isca-archive.org/interspeech_2026/takagi26_interspeech.pdf
---

# Investigating Human-Model Discrepancies in Speech Quality Assessment via Acoustic and Prosodic Perturbations

*Masato Takagi, Masaya Kawamura, Reo Shimizu, Yuma Shirahata*

[PDF](https://www.isca-archive.org/interspeech_2026/takagi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/takagi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1478)

**TL;DR** — A systematic investigation of automated Mean Opinion Score (MOS) prediction models reveals that while they reliably track acoustic signal degradation, they are entirely blind to linguistically significant prosodic errors and exhibit uncalibrated speaker-specific biases. This uncovers a critical gap in scalar speech quality metrics.

## Key contributions

- Evaluates six prominent automated MOS estimators (SHEET-MB, SHEET-BV, UTMOS, UTMOSv2, NISQA, DNSMOS) against human listeners under controlled acoustic, prosodic, and speaker-level perturbations.
- Demonstrates that MOS models achieve high system-level correlation with human judgments on acoustic degradation (SRCC up to 0.964) but are completely insensitive to Japanese pitch-accent swapping errors (score variations under 0.1 points versus a 1.84-point drop in human MOS).
- Reveals a severe speaker-dependent bias: models exhibit strong negative correlations with mean F0 that are absent in human ratings, while failing to capture human-perceived sensitivities to F0 variability and speaking rate.
- Proves that altering training data composition alone (e.g., switching from MOS-Bench to BVCC) fixes acoustic sensitivity but fails to induce sensitivity to prosodic appropriateness.

## Problem

Scalar MOS prediction models serve as standard proxy metrics in modern text-to-speech (TTS) research, replacing costly human listening tests. However, researchers increasingly rely on them under the assumption that they capture multidimensional quality attributes. In reality, these models suffer from information loss due to scalarisation, limited sensitivity to fine-grained prosody, and systematic speaker-dependent biases. It remains unclear whether automated predictors actually share the perceptual dimensions used by human listeners when evaluating high-fidelity synthesized speech.

## Method

The study designs three experimental groups to isolate quality dimensions using Japanese speech data. Group A (Acoustic Degradation) applies signal-level distortions (clipping at +20/+40 dB, pink noise at 10/20 dB SNR, and MP3 compression at 8/16 kbps) to natural speech from four JVS corpus speakers. Group B (Prosodic Errors) uses a 24 kHz NANSYTTS model trained on 207.96 hours of internal Japanese speech, where binary pitch-accent labels within accentual phrases are systematically swapped at low (10-20%) and high (80-90%) probabilities to induce unnatural pitch accents. Group C (Speaker Variations) examines natural and manipulated variations across 20 natural speakers (Group C-1), F0 scaling factors ranging from 0.5x to 2.0x synthesized via SiFi-GAN (Group C-2), and speaking rate scaling factors from 0.5x to 2.0x synthesized via WORLD vocoder (Group C-3).

Human evaluations comprise 15 native Japanese listeners scoring all 656 samples on a 5-point MOS scale. Objective evaluations use VERSA, a unified toolkit running six models (SHEET-MB, SHEET-BV, UTMOS, UTMOSv2, NISQA, DNSMOS) with input audio resampled to 16 kHz. SHEET-MB and SHEET-BV use WavLM Large encoders trained on MOS-Bench and BVCC, respectively. UTMOS and UTMOSv2 use wav2vec 2.0 encoders with data augmentation. NISQA and DNSMOS utilize CNN architectures trained purely on codec/noise and enhancement data without TTS/VC datasets.

## Experimental setup

Evaluations rely on 656 total audio samples divided across Group A (120 samples), Group B (120 samples), and Group C (416 samples including 200 natural and 216 perturbed utterances). Human baselines consist of 15 native Japanese listeners rating naturalness on a 5-point scale. Automated baselines consist of six models evaluated via the VERSA toolkit. Metrics include Spearman's rank correlation coefficients (SRCC) for Group A and Pearson correlation coefficients (r) for Group C speaker characteristics.

## Results

In Group A, most models achieved high system-level SRCC (0.929 to 0.964) with human MOS, with SHEET-BV outperforming SHEET-MB (0.964 vs 0.750), proving that training data composition dominates over SSL architecture choice for acoustic fidelity. In Group B, while human MOS dropped by 1.84 points as accent error severity increased from None (4.00) to High (2.16), all models registered virtually zero variation (under 0.1 points change), demonstrating complete insensitivity to linguistic prosodic errors. In Group C, human MOS correlated moderately with speaking rate (r = -0.520) and F0 standard deviation (r = 0.477), but showed no correlation with mean log F0 (r = -0.059); conversely, automated models displayed strong spurious correlations with mean log F0 (r from -0.530 to -0.788) and near-zero sensitivity to F0 variability and speaking rate.

| Condition | Human MOS | SHEET-BV | UTMOSv2 | NISQA | DNSMOS |
|---|---|---|---|---|---|
| Natural | 3.49 | 3.10 | 3.65 | 4.56 | 3.81 |
| Clipping (light) | 1.73 | 1.87 | 2.56 | 2.26 | 3.40 |
| Clipping (heavy) | 1.12 | 1.39 | 1.92 | 1.26 | 2.55 |
| MP3 8 kbps | 1.43 | 1.51 | 2.01 | 1.39 | 2.85 |

## Limitations

The evaluation is restricted to Japanese, a pitch-accent language, which may emphasize certain accentuation sensitivities not present in stress-timed languages. The tested models were trained without Japanese speech data, which could exacerbate cross-lingual transfer issues, though these models are routinely deployed as language-independent metrics. Only six prominent MOS predictors and specific parametric perturbations (SiFi-GAN and WORLD vocoders) were tested.

## Why read this

Speech researchers and TTS developers relying on automatic MOS predictors must read this paper to understand the blind spots of metrics like UTMOS and SHEET-BV. It provides empirical proof that current models cannot detect prosodic/accent errors and introduces severe speaker biases, warning against uncritical reliance on automated evaluation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing and diagnosing automated speech quality metrics, improving objective loss functions for text-to-speech training, and designing multi-dimensional speech evaluation frameworks.

## Related

- (link related pages by id as the wiki grows)
