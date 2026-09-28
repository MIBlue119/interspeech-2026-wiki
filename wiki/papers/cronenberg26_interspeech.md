---
id: cronenberg26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2433
pdf: https://www.isca-archive.org/interspeech_2026/cronenberg26_interspeech.pdf
---

# To glide or not to glide: Acoustic realization of the diphthong-hiatus contrast in Italian and Romanian

[PDF](https://www.isca-archive.org/interspeech_2026/cronenberg26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cronenberg26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2433)

**TL;DR** — This study analyzes large broadcast corpora of Italian and Romanian to investigate how lexical stress and word position shape the acoustic realization of the diphthong-hiatus contrast in /ia/ sequences.

## Problem

Romance languages differ in whether rising vowel sequences like /ia/ are phonologically categorized as diphthongs (such as in Italian) or hiatuses (such as in Romanian), but phonetic realizations often show gradient overlap rather than discrete categories. Understanding how linguistic factors like stress and initiality facilitate or block glide formation across these languages remains an open empirical challenge. Addressing this gap clarifies the phonetic basis of syllabification and provides foundational insights for speech perception modeling.

## Method

The authors analyzed 24,371 Italian tokens (from 168 hours of radio/TV broadcasts) and 19,972 Romanian tokens (from 300 hours) extracted via forced alignment. Formant trajectories (F1 and F2) were extracted using the wrassp algorithm, automatically cleaned of outliers, converted to Bark, gender-normalized, and time-normalized using B-splines. Linear mixed-effects regression (LMER) evaluated log-normalized, rate-adjusted sequence durations, while Functional Principal Component Analysis (FPCA) decomposed the first four principal components of the F1 and F2 trajectories to quantify shape variations across language, lexical stress, and initiality conditions.

## Results

Italian speakers produced shorter and shallower formant trajectories compared to Romanian speakers, consistent with an underlying diphthong preference in Italian and hiatus preference in Romanian. Lexical stress strongly affected timing and formants, with gliding blocked under stressed conditions in Italian, whereas Romanian favored gliding specifically for unstressed medial /ia/ sequences. Substantial acoustic overlap between the two languages emerged, confirming that the diphthong-hiatus distinction is gradient both cross-linguistically and intra-linguistically.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, speech technologists, and researchers developing multilingual automatic speech recognition (ASR) or forced aligners seeking to understand pronunciation variation and phonological contrasts.

## Limitations

The corpora lacked metadata regarding individual speakers, preventing speaker-level random effects in the duration regression models, and formant extraction relied on automated heuristics rather than manual correction due to dataset scale.

## Related

- (link related pages by id as the wiki grows)
