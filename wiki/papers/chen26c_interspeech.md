---
id: chen26c_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-361
pdf: https://www.isca-archive.org/interspeech_2026/chen26c_interspeech.pdf
---

# Beyond Pitch: Multidimensional Cue Reweighting of Two High-Falling Tones in Pingdingshan Mandarin

[PDF](https://www.isca-archive.org/interspeech_2026/chen26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-361)

**TL;DR** — This study investigates the diachronic cue reweighting of two high-falling tones in Pingdingshan Mandarin across three generations, revealing a transition from a pitch-dominant system to a multidimensional cue system incorporating phonation and duration.

## Problem

Traditional tonogenesis and sound change theories emphasize a unidirectional evolution from consonant voicing to phonation and subsequently to pitch distinctions, while reverse trajectories like tonoexodus remain poorly documented in apparent-time Sinitic studies. As pitch differences between certain high-falling tones narrow, it remains unclear whether secondary features like creaky voice and duration undergo a systematic diachronic shift to preserve phonemic contrast. Without systematic physiological and sociolinguistic analyses across generations, the precise contribution of phonation and multidimensional cue competition in tonal evolution is not well understood.

## Method

The study conducted a speech production experiment with 32 native speakers divided into three age groups (older, middle-aged, and younger), recording synchronized acoustic and electroglottography (EGG) data from 28 monosyllabic words in isolated and carrier-sentence conditions. Extracted features included fundamental frequency (f0), RMS energy, duration, open quotient (OQ), speed quotient (SQ), and automatically detected creaky voice segments. Functional principal component analysis (fPCA) and logistic fPCA extracted time-course trajectory features, which were then analyzed using linear mixed models (LMMs) and conditional random forests (with 300 trees and 100 conditional permutation iterations) to quantify cue importance and intergenerational differences.

## Results

Across all models, the average AUC exceeded 0.97, confirming robust classification accuracy. Linear mixed models revealed significant Tone × Age interactions showing that younger speakers exhibited a higher f0 PC2 for T4 (β = 0.84, p = 0.007), a reduced OQ PC1 (β = −1.40, p = 0.037), and a shorter T4 duration (β = −0.39, p = 0.010) compared to older speakers. Random forest analyses demonstrated that while pitch remains the primary cue at the group level, individual variation showed nine speakers (6 young, 3 middle-aged) utilizing creak as a primary or secondary cue, with five individuals exhibiting phonation weights that surpassed pitch.

## Code

- https://github.com/Dzaau/pingdingshanIS2026

## Applications

Phoneticians, linguists, and speech engineers studying sound change, tonal mechanics, and speech production datasets.

## Limitations

The conclusions are currently drawn exclusively from speech production data without accompanying perception experiments to test listener identification.

## Related

- (link related pages by id as the wiki grows)
