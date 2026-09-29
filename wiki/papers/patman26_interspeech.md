---
id: patman26_interspeech
category: speaker
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-444
pdf: https://www.isca-archive.org/interspeech_2026/patman26_interspeech.pdf
---

# Assessing the effect of volitional and synthetic pitch raising in female speakers on automatic speaker recognition

*Chloe Patman, Linda Gerlach, Anil Alexander, Finnian Kelly, Kirsty McDougall*

[PDF](https://www.isca-archive.org/interspeech_2026/patman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/patman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-444)

**Category:** `speaker`

**TL;DR** — This paper investigates how volitional and synthetic pitch raising in female speakers impacts automatic speaker recognition (ASR) performance, finding that pitch increases degrade recognition accuracy (EER rising from 0.0% to 14.4%) with strong speaker-dependent variability. Synthetic pitch manipulations isolate the effect but fail to fully replicate the phonetic strategies of volitional disguise.

## Key contributions

- Evaluates the impact of volitional pitch raising on ASR performance using female speakers (a demographic underrepresented in forensic speech studies).
- Analyzes acoustic and phonetic correlates of speaker vulnerability, identifying extreme f0 shifts and limited pitch excursion as key drivers of reduced recognizability.
- Conducts a systematic pilot study using 5 levels of synthetic pitch raising (ranging from +1.5 to +10.5 STs) across 16 speakers to isolate f0 effects.
- Demonstrates via zooplot outlier analysis that synthetic pitch manipulations cause speakers at distribution extremes to lose distinctiveness ('doves' to 'chameleons') but cannot proxy real volitional disguise strategies.

## Problem

Pitch raising is a common form of voice disguise in forensic casework and can also be triggered by emotion or stress. While male speakers' volitional pitch raising has been studied, female speakers exhibit different baseline f0 averages (~200 Hz vs ~120 Hz) and distinct disguise strategies (relying less on falsetto). Understanding how these pitch changes affect speaker embeddings and machine recognition is critical for forensic automatic speaker recognition (ASR), where prior systems often fail to generalize across atypical voice qualities.

## Method

The study employs a spectral x-vector model implemented via the VOCALISE 2021 (v.3.0.0.1746) speaker recognition system. Mel-Frequency Cepstral Coefficients (MFCCs)—specifically 22-dimensional features including energy extracted using 25 ms Hamming windows with a 10 ms frame shift—are used to capture short-term spectral shape. For volitional analysis, studio-quality 48 kHz recordings from three female phoneticians in the Person-Specific Automatic Speaker Recognition (PASR) database are used, yielding 27 same-speaker and 54 different-speaker comparisons for both default-default (D-D) and default-raised (D-R) conditions. Acoustic long-term f0 analysis is performed in Praat (100–600 Hz range).

For the synthetic evaluation, default voice recordings from 16 Southern Standard British English female speakers in the Leeds Multi-Session (LMS) database (44.1 kHz, 25-35s read passages) are systematically manipulated in Praat. A custom script adjusts long-term f0 across five conditions: Low (+1.5 ST, Condition A), Mild (+2.5 ST, B), Medium (+3.5 ST, C), High (+7 ST, D), and Extreme (+10.5 ST, E). VOCALISE computes x-vector similarity scores and Equal Error Rates (EERs), while zooplots categorize outlier speakers ('doves', 'chameleons', 'worms', 'phantoms') based on same- and different-speaker score distributions.

## Experimental setup

Evaluates two datasets: the PASR database (3 female speakers, 3 repetitions across 2 sessions, 27 same-speaker and 54 different-speaker trials) and the Leeds Multi-Session (LMS) database (16 Southern Standard British English females, 16 same-speaker and 240 different-speaker comparisons per condition). Evaluated using Equal Error Rate (EER) and x-vector similarity score zooplots. Implemented with the VOCALISE 2021 spectral x-vector system.

## Results

For volitional pitch raising (PASR data), baseline D-D comparisons achieved a perfect EER of 0.0%, whereas D-R comparisons degraded system performance to an EER of 14.4%. Speaker-specific analysis showed that this drop was primarily driven by speaker P5, who exhibited the highest median raised f0 (342 Hz), the largest f0 increase (9.8 ST), and limited pitch excursion. For synthetic pitch raising (LMS data), baseline D-D performance yielded an EER of 3.9%, which progressively worsened with larger f0 shifts: Low (+1.5 ST) gave 5.2% EER, Mild (+2.5 ST) gave 8.7%, Medium (+3.5 ST) gave 12.0%, High (+7 ST) gave 13.1%, and Extreme (+10.5 ST) gave 15.2% EER. Zooplots revealed that previously distinctive speakers ('doves' at baseline) lost distinctiveness (becoming 'chameleons') at synthetic shifts of +3.5 ST and above.

| Comparison / Condition | SS Trials | DS Trials | EER % |
|---|---|---|---|
| PASR Default-Default (D-D) | 27 | 54 | 0.0 |
| PASR Default-Raised (D-R) | 27 | 54 | 14.4 |
| LMS Default-Default (D-D) | 16 | 240 | 3.9 |
| LMS Low (+1.5 ST) | 16 | 240 | 5.2 |
| LMS Medium (+3.5 ST) | 16 | 240 | 12.0 |
| LMS Extreme (+10.5 ST) | 16 | 240 | 15.2 |

## Limitations

The volitional PASR dataset relies on a very small sample size of three speakers who are trained phoneticians, whose laryngeal control and articulatory awareness may not reflect the general population or lay forensic suspects. The synthetic manipulation study uses controlled f0 shifts that cannot capture complex compensatory laryngeal adjustments (such as vocal fold tension changes or spectral envelope alterations) present in real voice disguise. Furthermore, the evaluation uses a single spectral x-vector architecture without domain calibration or anti-spoofing/synthetic speech countermeasures.

## Why read this

Forensic speech scientists and speech researchers working on speaker recognition robustness should read this to understand how pitch disguise impacts female speaker embeddings and why synthetic f0 shifts fail to mimic real physiological disguise strategies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic voice comparison, speaker verification security audits, and robust speaker embedding model evaluation.

## Institutions / 機構

University of Cambridge, Oxford Wave Research

**Funding / 經費:** Harding Distinguished Postgraduate Scholarship

## Related

- (link related pages by id as the wiki grows)
