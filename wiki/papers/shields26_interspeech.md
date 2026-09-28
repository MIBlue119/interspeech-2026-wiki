---
id: shields26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1456
pdf: https://www.isca-archive.org/interspeech_2026/shields26_interspeech.pdf
---

# A preliminary exploration of stop-vowel coarticulation in Māori

[PDF](https://www.isca-archive.org/interspeech_2026/shields26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shields26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1456)

**TL;DR** — This study investigates stop-vowel coarticulation in Te reo Māori using Generalised Additive Mixed Models, demonstrating that oral stop contexts significantly alter vowel backness (F2) while leaving vowel height (F1) largely resistant.

## Problem

While the phonetics of Māori vowels have received attention, detailed analysis of consonant phonetics and coarticulatory processes influencing vowel realisation has been largely absent. Understanding these coarticulatory patterns is vital for accurately characterising allophonic variation and phonetic variation in indigenous languages with small vowel inventories.

## Method

The authors compiled a new read-speech corpus from 7 fluent female speakers of Māori (mean age 30 years) producing CVCV words embedded in carrier sentences, yielding 524 stressed vowel tokens across stop contexts (/p, t, k/) and monophthongs (/i, e, a, o, u/). Recordings were automatically segmented using WebMAUS General, hand-corrected, and formant trajectories (F1 and F2) were extracted using wrassp. Generalised Additive Mixed Models (GAMMs) with scaled-t distributed residuals were fitted using the mgcv package in R, incorporating parametric interaction terms, reference smooths, difference smooths over normalised time, and speaker-level random smooths.

## Results

GAMMs yielded adjusted R2 values of 0.67 for F1 and 0.82 for F2, with all parametric terms found to be significant. F1 showed minimal salient variation across stop contexts, indicating vowel height is resistant to context changes, though a marginal F1 reduction in /kVkV/ words suggested slight vowel raising. In contrast, F2 displayed substantial coarticulatory variation; front vowels /i/ and /e/ exhibited consistent F2 increases adjacent to /k/ (attributed to a raised tongue dorsum or palatalised realisation), while back vowels /o/ and /u/ showed notable fronting (higher F2) when surrounded by alveolar stop /t/.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, speech scientists, and speech technology developers working on under-resourced or indigenous languages like Te reo Māori can use these acoustic insights to improve pronunciation modeling and text-to-speech synthesis.

## Limitations

The study's scope is limited to read speech from a small cohort of 7 female speakers and focuses exclusively on word-medial/initial oral stops in symmetrical CVCV environments.

## Related

- (link related pages by id as the wiki grows)
