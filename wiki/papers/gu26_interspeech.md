---
id: gu26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1290
pdf: https://www.isca-archive.org/interspeech_2026/gu26_interspeech.pdf
---

# Mutual Cancellation between Masking Effects Benefits Speech Intelligibility

[PDF](https://www.isca-archive.org/interspeech_2026/gu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1290)

**TL;DR** — This study investigates how informational and modulation masking affect speech intelligibility by constraining energetic masking using high-energy glimpse proportions, demonstrating that release from modulation masking can cancel out energetic masking effects.

## Problem

Competing speech impairs speech perception through energetic masking, informational masking, and modulation masking, which heavily interact and confound one another in natural listening conditions. Isolating these factors is difficult because standard global signal-to-noise ratio adjustments fail to control for acoustic variations across different maskers. Understanding how linguistic similarity and spectro-temporal modulation properties independently affect speech intelligibility is crucial for advancing auditory perception models and speech processing systems.

## Method

The experiment evaluated 25 native American English listeners on Harvard target sentences masked by competing speech in English, Mandarin, or modulated noise maskers derived via linear predictive coding (LPC orders 50, 12, and 5) and temporal modulation (TM) or temporally-stationary (TS) noise. Energetic masking was explicitly controlled at three levels corresponding to high-energy glimpse proportions (HEGP) of 0.3, 0.4, and 0.5 using an adaptive approach across 36 experimental conditions. Masker modulation similarity was quantified using 2D Gabor-filtered spectrogram cross-correlations and STEP dynamic ranges. Participants performed a word recognition task in a sound-treated booth across randomized stimulus blocks.

## Results

Word recognition rates (WRR) increased as energetic masking decreased, rising from a mean of 17.4% at 0.3 HEGP to 56.9% at 0.5 HEGP. At low energetic masking (0.5 HEGP), Mandarin competing speech and its STM-50 masker yielded significantly higher intelligibility than their English counterparts (e.g., 5.6 percentage points higher), confirming informational masking release from cross-language dissimilarity. Reducing masker modulation in spectro-temporal and temporal domains improved listening performance, with temporally-stationary (TS) noise achieving comparable or higher intelligibility than temporally-modulated (TM) noise despite having fewer total glimpses. This counterintuitive result demonstrates that release from modulation masking can effectively cancel out increased energetic masking.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and audiologists can use these insights to design better noise-suppression algorithms, hearing aids, and speech intelligibility predictors that account for modulation and informational masking.

## Limitations

The study tested native English listeners using American English target sentences, restricting the cross-language findings to English-Mandarin pairings.

## Related

- (link related pages by id as the wiki grows)
