---
id: cram26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3107
pdf: https://www.isca-archive.org/interspeech_2026/cram26_interspeech.pdf
---

# Vowel Allophony Improves Maximum-Likelihood Classification of Warlpiri Consonants

[PDF](https://www.isca-archive.org/interspeech_2026/cram26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cram26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3107)

**TL;DR** — A maximum-likelihood classifier shows that stop-intrinsic acoustic cues alone are insufficient to reliably distinguish the five place-of-articulation contrasts in Warlpiri, but incorporating vowel allophony from adjacent vowel midpoints significantly improves classification accuracy.

## Problem

Australian languages typically feature a dense place-of-articulation contrast inventory for stops with relatively few manner distinctions, making consonant place identification challenging. Traditional acoustic cues intrinsic to stops or short formant transitions often fail to distinguish these crowded categories, raising questions about how listeners achieve high perceptual accuracy. This study investigates whether probabilistic maximum-likelihood classifiers can model human speech perception to uncover how native listeners integrate intrinsic and extrinsic acoustic cues in the low-resource Australian language Warlpiri.

## Method

The authors analyzed 5,081 tokens of VCV sequences from 14 female speakers in the DoReCo Warlpiri corpus, force-aligned via MAUS with manual corrections. A total of 31 acoustic cues were extracted using Praat and AutoVOT, categorized into stop-internal/locus cues (S), formant transition cues (T), and vowel midpoint formant cues (M). Seven logical combinations of these cue sets were used to train multivariate Gaussian maximum-likelihood classifiers for both CV and VC sequences. Model evaluation employed a stratified 10-fold cross-validation, computing macro-averaged F-scores and performing permutation tests with Bonferroni correction for statistical significance.

## Results

Classifiers relying solely on stop-intrinsic cues yielded poor consonant classification (F-scores of 0.654 for CV and 0.647 for VC). Adding extrinsic vowel midpoint information (SM model) significantly improved consonant classification, raising F-scores to 0.702 in CV sequences and 0.681 in VC sequences. In CV sequences, vowel midpoint cues yielded nearly double the improvement in consonant identification compared to transition cues (ST model F-score of 0.676). Vowel classification remained remarkably stable and accurate across models that included vowel midpoint information, with F-scores ranging from 0.790 to 0.815 for CVs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Linguists and speech researchers studying low-resource languages, speech perception, and acoustic phonetics to model human cue integration and listener confusability.

## Limitations

The study is restricted to semi-spontaneous speech from 14 female speakers of a single language, and retroflex stops were grouped with retroflex flaps due to low token counts and neutralization.

## Related

- (link related pages by id as the wiki grows)
