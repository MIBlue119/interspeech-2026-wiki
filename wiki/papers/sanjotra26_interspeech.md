---
id: sanjotra26_interspeech
category: resources-evaluation
labels: [self-supervised]
institutions: ["Indian Institute of Technology Indore", "University of Groningen"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2203
pdf: https://www.isca-archive.org/interspeech_2026/sanjotra26_interspeech.pdf
---

# Investigating the Relationship between Objective AI-driven Metrics and Subjective MOS for In-the-Wild Speech

*Jasmer Sanjotra, Nagendra Kumar, Shekhar Nayak*

[PDF](https://www.isca-archive.org/interspeech_2026/sanjotra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sanjotra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2203)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`

**TL;DR** — Automated objective MOS (O-MOS) predictors completely lose correlation with human naturalness ratings when evaluated on in-the-wild (ITW) discrete-token TTS systems. Specifically, UTMOSv2 correlation drops from r = 0.51 on continuous clean speech to r = -0.01 (non-significant) on discrete ITW generative speech.

## Key contributions

- Demonstrated a statistically significant correlation collapse (Steiger's t(29) = 2.24, p = 0.033) for neural MOS predictors from continuous clean TTS (r = 0.51) to discrete ITW TTS (r = -0.01).
- Identified the 'additive-generative paradox' where neural MOS metrics penalise additive noise conditions up to 0.42 points more severely than generative-artefact conditions, despite listeners rating them equivalently.
- Uncovered the 'acoustic camouflage' effect where 7 out of 32 discrete ITW audio files rated below 2.5 by humans received misleadingly high UTMOSv2 scores exceeding 3.8.
- Conducted a rigorous 4-system controlled ablation study with 768 headphone-screened human naturalness ratings across internationally diverse participants.

## Problem

Current automated MOS predictors (such as UTMOSv2, DNSMOS P.835, and PLC-MOS) and traditional DSP metrics (PESQ, SI-SDR) are trained exclusively on studio-recorded or denoised continuous speech corpora. When applied to zero-shot, in-the-wild (ITW) discrete-token text-to-speech models—which suffer from token hallucinations, prosodic inversions, and semantic errors while maintaining smooth spectral texture—these metrics fail completely. This provenance mismatch creates a critical evaluation blind spot, as standalone objective metrics can no longer reliably measure true perceptual naturalness.

## Method

The study designs a controlled paired ablation across four systems using 32 diverse text transcripts and reference speaker prompts sourced from TITWEasy, holding speaker identity and content constant. SYS-A is a continuous clean anchor built using StyleTTS 2 conditioned on a denoised ITW reference. SYS-B is the discrete ITW target using an MQTTS model extended with a semantic token encoder operating on raw, unprocessed ITW reference audio. SYS-C is an additive noise control where MUSAN babble noise is added to SYS-A and calibrated using NISQA to match the perceived degradation level of SYS-B. SYS-D consists of the original real-world ground-truth recordings.

Subjective evaluation was administered via LimeSurvey with 48 participants yielding 768 valid ACR naturalness ratings (1-5 Likert scale) under a headphone-screened protocol with strict consistency checks (discarding trials with >1 point deviation on a repeated sample). Objective evaluation tested four neural O-MOS families (UTMOSv2, DNSMOS P.835 OVRL, DNS-Pro BVCC/VCC2018, and PLC-MOS) using the VERSA toolkit in reference-free mode. Statistical validation relies on linear mixed-effects modeling (lme4) and Steiger's test for dependent correlations to analyze metric failure modes.

## Experimental setup

The evaluation corpus consists of 32 files per system (128 files total) derived from TITWEasy. Systems compared include ground-truth recordings (SYS-D), StyleTTS 2 continuous clean TTS (SYS-A), MQTTS-based discrete ITW TTS (SYS-B), and an additive noise control (SYS-C). Metrics include human ACR Mean Opinion Score alongside UTMOSv2, DNSMOS P.835 OVRL, DNS-Pro (BVCC and VCC2018 checkpoints), and PLC-MOS evaluated via Pearson r, Spearman rho, and linear mixed-effects contrasts.

## Results

Human evaluation ranked the systems as SYS-D (3.93) > SYS-A (3.42) > SYS-B (3.32) > SYS-C (3.22), with SYS-B and SYS-C showing no statistically significant difference (delta MOS = 0.10, p = 0.14). However, objective metrics failed this ordering: DNSMOS P.835 OVRL penalized the additive noise control (SYS-C: 2.64) much more heavily than the generative artifact condition (SYS-B: 3.06). File-level Pearson correlations with human MOS collapsed on SYS-B for UTMOSv2 (r = -0.01, p = 0.95), DNSMOS OVRL (r = 0.13), DNS-Pro BVCC (r = 0.10), and PLC-MOS (r = 0.11), down from significant positive correlations on SYS-A (e.g., r = 0.51 for UTMOSv2). Acoustic camouflage was observed in 7 files where human MOS fell below 2.5 but UTMOSv2 assigned scores above 3.8.

| System | MOS [95% CI] | UTMOSv2 | DNS OVRL | DNS-Pro BVCC | DNS-Pro VCC2018 | PLC-MOS |
|---|---|---|---|---|---|---|
| SYS-D (Ground Truth) | 3.93 [3.77, 4.09] | 3.35 | 2.93 | 2.50 | 2.69 | 4.06 |
| SYS-A (Clean TTS) | 3.42 [3.28, 3.56] | 4.22 | 3.10 | 3.01 | 2.80 | 4.31 |
| SYS-B (Discrete ITW) | 3.32 [3.17, 3.47] | 3.40 | 3.06 | 2.77 | 2.82 | 4.06 |
| SYS-C (Additive Noise) | 3.22 [3.06, 3.38] | 3.49 | 2.64 | 2.35 | 2.90 | 3.87 |

## Limitations

The study demonstrates the correlation collapse specifically on a single discrete ITW architecture (MQTTS with a semantic encoder); whether alternative discrete models like VALL-E exhibit identical degradation magnitudes requires further verification. The analysis is limited to English-oriented evaluation items and focuses strictly on single-dimension naturalness rather than multidimensional perceptual attributes.

## Why read this

Speech and ML researchers developing or evaluating zero-shot and in-the-wild generative TTS models must read this paper to understand why current neural MOS predictors cannot be trusted as standalone evaluation metrics. It provides essential empirical evidence warning against metric inversion risks and advocates for composite evaluation protocols (such as combining acoustic MOS with semantic WER).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech synthesis evaluation pipelines, automated quality control for in-the-wild voice cloning, and the development of robust, semantic-aware speech quality metrics.

## Institutions / 機構

Indian Institute of Technology Indore, University of Groningen

**Funding / 經費:** IEEE Signal Processing Society Signal Processing Mentorship Academy

## Related

- [Iterate to Differentiate: Enhancing Discriminability and Reliability in Zero-Shot TTS Evaluation](shen26d_interspeech.md) — shared data / evaluation · relatedness 2.4/3
- [Investigating Human-Model Discrepancies in Speech Quality Assessment via Acoustic and Prosodic Perturbations](takagi26_interspeech.md) — same problem · relatedness 2.2/3
- [CodecMOS-Accent: A MOS Benchmark of Resynthesized and TTS Speech from Neural Codecs Across English Accents](huang26f_interspeech.md) — shared data / evaluation · relatedness 2.2/3
- [Evaluating Objective Speech Quality Metrics for Neural Audio Codecs](lanzendoerfer26_interspeech.md) — same problem · relatedness 2.2/3
- [TDScore: Learning Synthetic Speech Quality Predictors from TTS Training Dynamics without Human annotation](miniconi26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
