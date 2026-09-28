---
id: purser26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3206
pdf: https://www.isca-archive.org/interspeech_2026/purser26_interspeech.pdf
---

# Variation and change in dynamicity of Australian English diphthongs in Sydney

[PDF](https://www.isca-archive.org/interspeech_2026/purser26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/purser26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3206)

**TL;DR** — This paper analyzes the dynamic trajectory changes of six Australian English diphthongs simultaneously across F1 and F2 using multivariate functional principal component analysis (MFPCA) on over 57,000 spontaneous speech tokens.

## Problem

Prior sociophonetic analyses of Australian English diphthongs have largely relied on static vowel measures or analyzed F1 and F2 formants separately, overlooking how simultaneous temporal dependencies across formants evolve over time. This gap matters because understanding holistic vowel trajectories is essential for accurately capturing ongoing sound changes and socio-indexical variation. Consequently, analyzing multiple vowels within a large spontaneous speech framework provides a more robust account of community-level linguistic shifts.

## Method

The study analyzes roughly 30 minutes of spontaneous speech from 119 speakers (63 female, 56 male; divided into older adults born in the 1960s and young adults born in the 1990s, stratified across social classes) sourced from the ANU Corpus of Sydney Speech. Formant values (F1 and F2) were extracted at nine equidistant timepoints (10%-90%) for 57,269 tokens across six diphthongs (FACE, FLEECE, NEAR, GOAT, MOUTH, PRICE) using FastTrack in LaBB-CAT, normalized via an adapted Lobanov method, and modeled using Multivariate Functional Principal Analysis (MFPCA). Linear mixed-effects models were subsequently fit using lme4 with seven predictors (age group, gender, social class, phonological context, duration, speech rate, and word frequency) selected via the Boruta algorithm.

## Results

The first two principal components (PC1 and PC2) accounted for 75% to 85% of the total variance across all six vowel categories. For FACE PC1, age group (b = -0.93) and gender (b = -0.51) significantly drove variation, with young adults and women showing higher and fronter realizations. For FLEECE PC1, an age-gender interaction (b = -0.42) revealed that adult men exhibited significantly more retracted realizations than all other groups (p < 0.001). Phonological context also played a major role, such as pre-nasal environments producing more open FLEECE (PC2 b = -0.90) and more peripheral FACE trajectories.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, sociolinguists, and speech researchers studying acoustic variation, dialect evolution, and speech corpora analysis.

## Limitations

Ethnic background was excluded from the analysis due to space constraints, and uncorrected automated formant extractions required aggressive standard deviation filtering to eliminate tracking noise.

## Related

- (link related pages by id as the wiki grows)
