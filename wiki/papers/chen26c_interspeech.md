---
id: chen26c_interspeech
category: phonetics-linguistics
institutions: ["Peking University"]
code: https://github.com/Dzaau/pingdingshanIS2026
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-361
pdf: https://www.isca-archive.org/interspeech_2026/chen26c_interspeech.pdf
---

# Beyond Pitch: Multidimensional Cue Reweighting of Two High-Falling Tones in Pingdingshan Mandarin

*Zhuo Chen, Bingliang Zhao, Xiyu Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-361)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates the diachronic cue reweighting of two high-falling tones (T2 and T4) in Pingdingshan Mandarin across three generations using acoustic and EGG data, revealing a shift from pitch dominance to a multidimensional system incorporating creaky voice and duration. Results show that younger speakers compensate for narrowing pitch differences by significantly increasing the relative weights of phonation and duration, demonstrating a reverse pitch-to-phonation tonal evolution.

## Key contributions

- Provides rare apparent-time empirical evidence for a reverse tonal evolution (pitch-to-phonation reweighting) within a Sinitic language variety, contrasting with traditional unidirectional phonation-to-pitch paths.
- Combines synchronized acoustic recordings, electroglottography (EGG) physiological data (OQ, SQ), and automated creaky voice detection across 32 speakers spanning three generations.
- Applies functional principal data analysis (fPCA and logistic fPCA) along with conditional random forests to rigorously quantify multidimensional cue weights (AUC > 0.97).
- Reveals micro-level individual variation and community-level transition patterns where specific young and middle-aged speakers elevate phonation cues above pitch.

## Problem

Traditional tonogenesis theory predominantly outlines a unidirectional historical path where consonant voicing evolves into phonation and subsequently into pitch distinctions. While the reverse trajectory—tonoexodus, where pitch contrasts erode and phonation sustains differences—has been documented in scattered dialects like Nghe An Vietnamese, apparent-time sociolinguistic and physiological evidence for such pitch-to-phonation cue reweighting within Sinitic tonal systems remains virtually non-existent. Prior work on Henan Mandarin dialects noted that speakers use creaky voice to distinguish two acoustically similar high-falling tones (T2 and T4), but lacked systematic physiological analyses and cross-generational datasets. This gap leaves it uncertain whether phonation's role is actively undergoing diachronic shift or how speakers dynamically compensate when pitch contours converge.

## Method

The study recorded 32 native Pingdingshan Mandarin speakers divided into three age groups (Old: mean 76.10 years; Middle: mean 48.75 years; Young: mean 21.90 years) uttering 28 monosyllabic CV words in two conditions: isolated forms and carrier sentences ('I say [X] for you to hear'). Acoustic and electroglottography (EGG) signals were captured synchronously using an ECM-44B microphone and a Laryngograph EGG-D200, digitized at 44.1 kHz/16-bit. Vowels were segmented in Praat; voice parameters (f0, RMS duration, Open Quotient OQ, Speed Quotient SQ) were extracted via VoiceSauce and KayPentax CSL using a 25% amplitude threshold, while a custom MATLAB program detected creaky voice segments using a 0.4 threshold.

Data preprocessing in R (v.4.4.3) involved dividing vowel segments into 18 intervals (analyzing the middle 16), log-transforming f0 and energy, and applying within-subject z-score normalization. Functional PCA (fPCA) and logistic fPCA extracted trajectory principal components for f0, OQ, SQ, Energy, and binarized Creak, with cumulative variance exceeding 70% in all features. Linear Mixed Models (LMMs via lme4) evaluated fixed effects (Tone, Age, Condition) and random effects (Participant, Word) using Type III Wald F-tests with Satterthwaite approximations. Conditional random forests (party package with 300 trees, min split 10, min bucket 4) over 100 iterations calculated conditional permutation importance and relative cue weights using 11 predictors (duration, null baseline, and PC scores for f0, OQ, SQ, Energy, Creak), achieving an average AUC exceeding 0.97.

## Experimental setup

The study utilized a dataset of 32 native speakers (16 female, 16 male) divided across Old (N=10, mean age 76.10), Middle (N=12, mean age 48.75), and Young (N=10, mean age 21.90) cohorts, reading 28 monosyllabic words across four tones in isolation and carrier sentence contexts, resulting in 4,252 valid post-outlier samples. Evaluations relied on linear mixed models and conditional random forest classification metrics (AUC > 0.97). Notable implementations include R for statistical modeling (lme4, party, emmeans packages), Praat for acoustic segmentation, and custom MATLAB/VoiceSauce scripts for physiological feature extraction.

## Results

Linear mixed models revealed significant Tone × Age interactions, showing that younger speakers exhibited a higher f0 PC2 for T4 (beta = 0.84, p = 0.007), a reduced OQ PC1 (beta = -1.40, p = 0.037), and shorter T4 duration (beta = -0.39, p = 0.010) compared to older speakers. Creak PC1 differences widened due to decreased creak probability in T2 and increased probability in T4. Random forest relative weightings demonstrated a clear intergenerational reorganization: older speakers relied primarily on f0 PC1 and f0 PC2, middle-aged speakers reduced f0 PC2 reliance, and younger speakers retained high f0 PC1 weights while elevating duration and Creak PC1 to major cue status. Individual-level analysis showed that nine speakers (six young, three middle-aged) used creak as a primary/secondary cue, with five showing phonation weights surpassing pitch. Experimental condition (isolation vs. carrier sentence) acted as a global reduction variable causing overall acoustic reduction but did not disrupt the intergenerational cue reweighting trend.

## Limitations

The study is currently restricted to speech production data from a single Mandarin variety (Pingdingshan Mandarin) and requires future perceptual validation experiments to confirm listener decoding. The sample size of 32 speakers across three generations, while adequate for mixed-effects modeling and random forests, limits broad geographic generalization. Furthermore, the apparent-time construct assumes generational trends reflect diachronic sound change rather than age-grading, and the investigation focused strictly on high-falling tonal pairs.

## Why read this

Phoneticians, historical linguists, and speech researchers should read this paper to understand rare empirical evidence of a reverse pitch-to-phonation sound change trajectory. It offers a methodological blueprint using functional PCA and conditional random forests to quantify multidimensional cue reweighting in tone languages.

## Code

- https://github.com/Dzaau/pingdingshanIS2026

## Applications

Improving multi-cue modeling in automatic speech recognition and speech synthesis systems for dialectal and tone-shifting languages where traditional pitch-only models fail.

## Institutions / 機構

Peking University

**Funding / 經費:** National Social Science Foundation of China

## Related

- [The role of phonation type in Chinese Jin tones: a study using acoustic metrics](du26b_interspeech.md) — shared technique · relatedness 2.1/3
- [Age-Related Changes in Mandarin Lexical Tone Production: Acoustic Properties and Tonal Distinctiveness](mao26b_interspeech.md) — same problem · relatedness 2.0/3
- [Acoustic Differences Between Citation and Sandhi Tones Across Three Generations in Xiamen Southern Min](xie26d_interspeech.md) — shared technique · relatedness 1.9/3
- [Age-related Differences in Acoustic Realization of Aspirated Fricatives in Shaxi Bai](zhang26q_interspeech.md) — shared technique · relatedness 1.9/3
- [Tonal Contrasts in Different Vowel Contexts and Different Tonal Systems](li26v_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
