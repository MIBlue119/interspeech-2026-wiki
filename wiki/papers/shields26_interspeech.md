---
id: shields26_interspeech
category: phonetics-linguistics
labels: [low-resource]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1456
pdf: https://www.isca-archive.org/interspeech_2026/shields26_interspeech.pdf
---

# A preliminary exploration of stop-vowel coarticulation in Māori

*Isabella Shields, Hiraia Haami-Wells, C. T. Justine Hui, Peter J Keegan, C. I. Watson*

[PDF](https://www.isca-archive.org/interspeech_2026/shields26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shields26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1456)

**Category:** `phonetics-linguistics` · **Labels:** `low-resource`

**TL;DR** — This study presents a preliminary acoustic analysis of stop-vowel coarticulation in Te reo Māori using Generalized Additive Mixed Models, revealing that oral stop contexts significantly alter vowel backness (F2) while leaving vowel height (F1) relatively invariant.

## Key contributions

- Compiles a new read-speech corpus consisting of 524 stressed vowel tokens across /p, t, k/ stop contexts from 7 fluent female Māori speakers.
- Applies Generalized Additive Mixed Models (GAMMs) with Bark-scaled formants to analyze dynamic formant trajectories over normalized vowel duration.
- Demonstrates that while F1 remains largely resistant to stop contexts, F2 exhibits substantial variation indicating systematic shifts in vowel backness and fronting (e.g., /u/ and /o/ fronting in alveolar contexts).
- Provides quantitative counter-evidence to earlier qualitative claims that anticipatory stop-vowel coarticulation is uncommon in Māori.

## Problem

Phonetic research on Te reo Māori has historically focused heavily on vowel inventories and long-short vowel contrasts, leaving a major blind spot regarding consonant phonetics and coarticulatory processes. Prior work from the MAONZE project suggested that anticipatory consonant-to-vowel transitions were uncommon outside of /r/, contradicting cross-linguistic tendencies where languages with small vowel inventories often exhibit wide allophonic variation. Understanding how oral stops (/p/, /t/, /k/) influence vowel realization is vital for mapping contemporary phonetic variation, capturing sound change in progress, and supporting revitalization efforts for this indigenous language.

## Method

The corpus comprises 7 bilingual female speakers of Māori (mean age 30.0 years) reading CVCV target words embedded in the carrier sentence 'Ko [target word] te kupu' (where the target word has identical preceding and following stops: /p, t, k/ and short monophthongs /i, e, a, o, u/). Recordings were segmented using WebMAUS General with manual boundary corrections, followed by formant estimation via the wrassp package (12.5 ms window length) and hand-correction of F1 and F2 trajectories from vowel onset to offset.

Formant trajectories were analyzed using Generalized Additive Mixed Models (GAMMs) fitted via the bam() function from the mgcv package with scaled-t distributed residuals. The response variables were Bark-scaled F1 and F2 values. Each GAMM included a parametric interaction term between adjacent consonant contexts (/p, t, k/) and vowel quality (5 levels), alongside four smooth terms: a reference smooth over normalized time s(time), difference smooths for trajectory shapes across vowel qualities and consonant contexts, and a random smooth to account for speaker-level variation.

## Experimental setup

The dataset contains 524 stressed vowel tokens (525 recorded minus 1 mispronunciation error) produced across 5 repetitions by 7 speakers in a WhisperRoom sound enclosure. The primary evaluation metrics are the parametric estimates and smooth term significance (F-scores, p-values) from GAMMs, alongside adjusted R-squared values of 0.67 for F1 and 0.82 for F2 models.

## Results

The fitted GAMMs achieved adjusted R-squared values of 0.67 for F1 and 0.82 for F2. All parametric terms were statistically significant (p < 0.001) for both formants, confirming that consonant context shifts baseline formant values. F1 showed minimal salient trajectory divergence across consonant contexts, indicating that vowel height is largely invariant to stop place of articulation, though a minor F1 reduction in /kVkV/ words hints at slight vowel raising. In contrast, F2 demonstrated massive coarticulatory variation: front vowels /i/ and /e/ showed increased F2 under velar stops (/k/) due to palatalization, while back vowels /o/ and /u/ exhibited prominent fronting in alveolar contexts (/t/) with F2 values for /o/ reaching ranges comparable to /a/.

| System / Condition | Adjusted R² (F1) | Adjusted R² (F2) | Key Finding |
|---|---|---|---|
| GAMM Model (/p, t, k/ × /i, e, a, o, u/) | 0.67 | 0.82 | Significant parametric/smooth effects for all stops; F2 heavily modulated by stop context |

## Limitations

The study's scope is strictly limited to 7 young female speakers, leaving male speakers, children, and older generations unexamined. The dataset relies entirely on read-speech carrier sentences, omitting natural conversational speech rate and style variations. Furthermore, the symmetrical CVCV stimulus design prevents the independent separation of carryover versus anticipatory coarticulatory dynamics.

## Why read this

Phoneticians and speech researchers studying indigenous language revitalization, phonetic variation, and advanced statistical modeling of acoustic trajectories via GAMMs will find this a vital benchmark challenging prior assumptions about coarticulation in small vowel systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Acoustic phonetic analysis, documentation of indigenous and low-resource languages, and speech technology adaptations for Te reo Māori pronunciation modeling.

## Institutions / 機構

University of Auckland

**Funding / 經費:** Royal Society of New Zealand Marsden Fast-Start Fund

## Related

- (link related pages by id as the wiki grows)
