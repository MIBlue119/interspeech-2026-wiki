---
id: mao26b_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1702
pdf: https://www.isca-archive.org/interspeech_2026/mao26b_interspeech.pdf
---

# Age-Related Changes in Mandarin Lexical Tone Production: Acoustic Properties and Tonal Distinctiveness

[PDF](https://www.isca-archive.org/interspeech_2026/mao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1702)

**TL;DR** — Older Mandarin speakers exhibit compressed tonal spaces, contour flattening, and reduced tone system distinctiveness—most notably in bidirectional T2-T3 confusion—paralleling age-related perceptual difficulties.

## Problem

While age-related speech changes are well-studied in non-tonal languages, their impact on lexical tone production in tonal languages like Mandarin remains largely unexplored. This gap matters because pitch functions as a primary linguistic cue for word meanings, and age-related acoustic shifts degrade automatic speech recognition and complicate clinical assessments for older populations.

## Method

The study analyzed 16,847 isolated syllable tokens covering 236 syllables across all four Mandarin tones, produced by 36 younger speakers (18-30 years) and 42 older speakers (55-77 years). Acoustic parameters including pitch height (t_mean), pitch slope (t_slope), F0 variability (t_SD), F0 range (t_range), onset/offset values, and duration were extracted using Praat and evaluated via linear mixed-effects models. Tonal distinctiveness was assessed using Bhattacharyya distance (BD) and radial basis function kernel support vector machine (SVM) classification, complemented by feature importance analysis.

## Results

Older speakers showed longer durations across all four tones and increased F0 variability, alongside gender-divergent F0 centralization and contour flattening. Bhattacharyya distances dropped markedly across tone pairs in older adults, with the T2-T3 pair exhibiting the steepest reductions (females dropping 84.5% from 2.13 to 0.33; males dropping 70.3% from 1.35 to 0.40). SVM classification revealed that errors in older adults heavily concentrated in bidirectional T2↔T3 misclassifications, whereas T1 and T4 maintained recognition rates above 90%. Feature importance analysis indicated that duration and F0 variability increased in prominence by Δ = +0.05 each for older speakers, pointing to temporal compensation for spectral compression.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers designing age-adaptive automatic speech recognition (ASR) systems, as well as clinicians assessing early laryngeal motor deterioration.

## Limitations

Voice quality parameters, specifically creaky voice which heavily affects low-F0 tones like T3, were not directly investigated.

## Related

- (link related pages by id as the wiki grows)
