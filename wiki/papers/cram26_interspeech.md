---
id: cram26_interspeech
category: phonetics-linguistics
labels: [low-resource]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3107
pdf: https://www.isca-archive.org/interspeech_2026/cram26_interspeech.pdf
---

# Vowel Allophony Improves Maximum-Likelihood Classification of Warlpiri Consonants

*Coralie Cram, John McGahay, Megha Sundara*

[PDF](https://www.isca-archive.org/interspeech_2026/cram26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cram26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3107)

**Category:** `phonetics-linguistics` · **Labels:** `low-resource`

**TL;DR** — This paper investigates acoustic cues for distinguishing five-way stop place contrasts in Warlpiri using maximum-likelihood classification, demonstrating that consonant-intrinsic cues alone are insufficient and that adjacent vowel allophony (midpoint formants) significantly improves classification.

## Key contributions

- Evaluated a maximum-likelihood classifier framework on semi-spontaneous speech from a low-resource Australian language (Warlpiri) across 5 places of articulation.
- Systematically tested combinations of 31 acoustic cues split into stop-intrinsic (S), formant transition (T), and vowel midpoint allophony (M) groups.
- Demonstrated that adding vowel midpoint cues (M) to intrinsic cues (S) yields a larger improvement in consonant classification than adding formant transitions (T) alone, particularly in CV sequences.
- Established that incorporating vowel midpoint information does not degrade vowel classification accuracy while substantially reducing consonant confusability.

## Problem

Australian languages typically feature a dense place-of-articulation inventory for stops (4 to 6 places) combined with fewer manner contrasts, creating a crowded perceptual continuum. Traditional consonant-intrinsic cues and F2 transitions often fail to cleanly separate adjacent places like alveolars, retroflexes, dentals, and palatals due to acoustic overlap. This paper addresses how optimal cue integration allows native speakers to overcome these high confusability levels, providing a computational window into speech perception for low-resource languages.

## Method

The study utilized semi-spontaneous monologic narratives from DoReCo Warlpiri field recordings (14 female speakers, aged 25-50), processed with MAUS forced alignment and hand-corrected boundaries. A set of 31 acoustic cues was extracted using Praat and AutoVOT, grouped into stop-intrinsic cues (S: duration, burst spectral moments COG, SD, skewness, kurtosis, E-H/M, relative intensity, and F1-F4 locus at boundaries), formant transition cues (T: F1-F4 change in the 25% vowel portion adjacent to the consonant), and vowel midpoint formants (M: F1-F4 at the vowel midpoint representing allophonic quality). 

Maximum-likelihood classifiers modeled each token category (CV or VC sequences) using multivariate Gaussian distributions parameterized by sample means and covariances over all logical combinations of cue sets (S, T, M), resulting in 7 models per sequence type. Classification performance was evaluated using stratified 10-fold cross-validation with macro-averaged F-scores. The architecture leveraged probabilistic modeling to simulate optimal Bayesian listener performance, testing whether extrinsic coarticulatory and allophonic cues could resolve acoustic ambiguities present in the consonant closure and release bursts.

## Experimental setup

Evaluated on 4,755 tokens for CV sequences and 4,801 tokens for VC sequences extracted from Warlpiri VCV contexts involving five stops (/p, t, ó, c, k/). The framework compared 7 distinct cue-set configurations (S, T, M, ST, SM, TM, STM) using stratified 10-fold cross-validation, reporting macro-averaged F-scores for consonants, vowels, and whole sequences, with significance assessed via permutation tests and Bonferroni correction (alpha < 0.005).

## Results

Consonants were highly confusable using stop-intrinsic cues alone, yielding a baseline consonant F-score of 0.654 for CVs and 0.647 for VCs. Adding vowel midpoint information (SM model) significantly boosted CV consonant F-score to 0.702 (d = 0.048, p = 0.0011), outperforming the transition-only addition (ST model at 0.681; d = 0.021, p = 0.0015). For VCs, both midpoint and transition additions improved consonant classification to roughly 0.681 and 0.676 respectively, though VC models generally performed slightly worse than CV models overall.

| Cue Set | CV Consonant F-score | CV Vowel F-score | VC Consonant F-score | VC Vowel F-score |
|---|---|---|---|---|
| S | 0.654 | 0.689 | 0.647 | 0.587 |
| T | 0.276 | 0.559 | 0.356 | 0.458 |
| M | 0.312 | 0.815 | 0.508 | 0.769 |
| ST | 0.681 | 0.798 | 0.676 | 0.740 |
| SM | 0.702 | 0.810 | 0.681 | 0.748 |
| STM | 0.691 | 0.812 | 0.691 | 0.760 |

## Limitations

The study is limited to a single under-resourced Australian language (Warlpiri) with a specific 3-vowel inventory, restricting immediate generalizability to languages with larger vowel spaces. The dataset was restricted to 14 female speakers from archival recordings, excluding male speaker variability. Automatic formant tracking and burst detection via AutoVOT and Praat introduced minor data loss due to extraction errors.

## Why read this

Speech and ML researchers studying low-resource phonetic analysis or Bayesian models of speech perception should read this to see how maximum-likelihood classifiers on semi-spontaneous corpora can quantify cue utility and evaluate the role of vowel allophony in place distinctions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computational speech perception modeling, automated acoustic analysis for low-resource languages, and linguistic fieldwork validation.

## Institutions / 機構

UCLA

## Related

- (link related pages by id as the wiki grows)
