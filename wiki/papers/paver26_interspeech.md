---
id: paver26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2053
pdf: https://www.isca-archive.org/interspeech_2026/paver26_interspeech.pdf
---

# Acoustic correlates of voice quality settings: variation within and between individual speakers

*Alice Paver, Kirsty McDougall*

[PDF](https://www.isca-archive.org/interspeech_2026/paver26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/paver26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2053)

**TL;DR** — This study investigates whether acoustic correlates of laryngeal and supralaryngeal voice quality (VQ) settings are universal or speaker-contingent, demonstrating via linear mixed-effects modeling that significant speaker x quality interactions undermine the assumption of one-to-one acoustic-to-articulatory mappings.

## Key contributions

- Evaluated both laryngeal (breathy, lowered larynx) and supralaryngeal (fronted tongue body, nasal, denasal) voice quality settings alongside a default baseline using a multi-session British English corpus.
- Uncovered novel group-level acoustic interactions, such as denasality displaying opposite spectral tilt trends (lower H1-A1* and H2-H4*) compared to nasality.
- Demonstrated significant individual speaker variation (speaker x quality interactions, F(195, 9359) = 3.34, p < 0.001) that invalidates group-averaged acoustic correlates in forensic phonetic analysis.
- Challenged the theoretical baseline assumption of a universal 'modal' voice by proving acoustic correlates index positions relative to speaker-specific habitual configurations rather than absolute articulatory states.

## Problem

Perceptual voice quality (VQ) assessments like the Vocal Profile Analysis protocol are often criticized as subjective, driving researchers to treat acoustic measures as objective articulatory correlates. However, prior studies frequently generalize measurements across speakers without accounting for inter-speaker variation or default habitual baselines, and they heavily neglect supralaryngeal settings in favor of steady-state laryngeal vowels. This creates a critical validity gap in fields like forensic phonetics and sociophonetics, where experts must reliably distinguish between-speaker baseline differences from within-speaker VQ manipulation across separate recordings.

## Method

The study utilized a subset of 4 male British English speakers selected from the Person-Specific Automatic Speaker Recognition (PASR) dataset, reading the Rainbow passage across 3 sessions with 3 repetitions per guise (216 total samples of ~30s each). Six VQ guises were evaluated: default (DEF), breathy (BRT), fronted tongue body (FTB), nasal (NAS), denasal (DEN), and lowered larynx (LLX). Transcripts were phoneme-aligned via the Montreal Forced Aligner, and acoustic parameters were extracted from vocalic segments using VoiceSauce and Praat. Eleven measures were targeted: cepstral peak prominence (CPP), spectral tilt indices (H1-A1*, H1-A2*, H1-A3*, H1-H2*, H2-H4*), harmonics-to-noise ratios across four frequency bands (HNR05, HNR15, HNR25, HNR35), and long-term formants (LTF: F1 through F4 extracted at 5 kHz max with 5 formants).

Extracted averages per speaker, setting, and segment were z-score normalized and modeled using linear mixed-effects regression via the lme4 package in RStudio, incorporating a three-way interaction of VQ setting, acoustic measure, and speaker, with a random intercept for segments. Pairwise comparisons were derived using estimated marginal means (emmeans package) to contrast non-modal VQ settings against the default baseline while explicitly isolating group-level effects from speaker-contingent variations.

## Experimental setup

The dataset comprised 216 audio recordings (~30 seconds each) from 4 male native British English speakers reading the Rainbow passage across 3 separate sessions. Acoustic metrics (CPP, spectral tilt, HNR05-35, LTF F1-F4) were evaluated via linear mixed-effects regression ANOVA models using lme4 and emmeans in RStudio.

## Results

At the group level, a significant interaction between measure and VQ setting was observed (F(65, 9359) = 24.7, p < 0.001), where breathy voice (BRT) and nasal voice (NAS) significantly increased spectral tilt measures, and BRT reduced noise-related measures (CPP, HNR) relative to default voice. However, a significant three-way interaction between measure, quality, and speaker (F(195, 9359) = 3.34, p < 0.001) revealed that most acoustic shifts were heavily speaker-dependent rather than universal; for instance, the spectral tilt and F2 increases for NAS were significant only for speaker 6, and lower HNR05 in BRT was exclusive to speaker 3. Furthermore, expected group-level reductions in H1-A1* and H2-H4* for denasal voice failed to reach significance for any single individual speaker.

## Limitations

The study is constrained by a small speaker cohort (only 4 male speakers of a single regional variety), limiting statistical power and generalizability across diverse demographics and female voices. It assumes controlled laboratory read speech, leaving open how heavily real-world acoustic degradation, background noise, and telephone channel transmission would distort these fragile spectral and formant correlates.

## Why read this

Speech and ML researchers developing forensic speaker verification systems or automated voice quality classifiers should read this paper to understand why treating acoustic measures as speaker-independent labels fails. The findings provide a cautionary empirical baseline showing that acoustic correlates of voice quality index speaker-specific articulatory spaces rather than universal physical states.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic speech comparison, automated voice disguise detection, and speech pathology assessment.

## Related

- (link related pages by id as the wiki grows)
