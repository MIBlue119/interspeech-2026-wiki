---
id: patman26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-444
pdf: https://www.isca-archive.org/interspeech_2026/patman26_interspeech.pdf
---

# Assessing the effect of volitional and synthetic pitch raising in female speakers on automatic speaker recognition

[PDF](https://www.isca-archive.org/interspeech_2026/patman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/patman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-444)

**TL;DR** — This paper evaluates the impact of volitional and synthetic pitch raising on automatic speaker recognition (ASR) performance among female speakers, demonstrating that pitch raising generally degrades system accuracy while exhibiting marked speaker-specific variability.

## Problem

Volitional pitch raising serves as a common voice disguise in forensic casework, but its effect on automatic speaker recognition (ASR) has been studied almost exclusively in male speakers. Female speakers possess distinct baseline frequencies, different pitch-raising strategies, and remain largely underrepresented in forensic phonetics literature. Understanding these dynamics is critical for reliable forensic speaker attribution.

## Method

The study tests both real volitional pitch raising and synthetic pitch manipulations. Real speech is drawn from 3 female phoneticians in the Person-Specific Automatic Speaker Recognition (PASR) database, generating 27 same-speaker and 54 different-speaker trials for default-to-default (D-D) and default-to-raised (D-R) conditions. Synthetic manipulations are tested on 16 Southern Standard British English female speakers from the Leeds Multi-Session (LMS) database, adjusting long-term fundamental frequency ($f_0$) in Praat across five levels from +1.5 to +10.5 semitones (ST). Automatic speaker comparisons utilize the spectral x-vector model within the VOCALISE 2021 system using 22-dimensional MFCCs extracted with 25 ms windows and 10 ms shifts.

## Results

For the PASR volitional data, the x-vector model achieved 0.0% Equal Error Rate (EER) for D-D comparisons, which increased to 14.4% EER for D-R comparisons, driven primarily by one speaker (P5) who showed the highest median $f_0$ (342 Hz), largest $f_0$ increase (9.8 ST average), and limited pitch excursion. For the LMS synthetic manipulation data, baseline D-D EER was 3.9%, while synthetic raises produced EERs of 5.2% (Low, +1.5 ST), 8.7% (Mild, +2.5 ST), 12.0% (Medium, +3.5 ST), 13.1% (High, +7 ST), and 15.2% (Extreme, +10.5 ST). Outlier analysis ("doves" and "chameleons") revealed that synthetic pitch shifts beyond +3.5 ST cause previously distinctive speakers to lose distinctiveness, though synthetic approaches fail to fully replicate the acoustic strategies of volitional disguise.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic scientists and voice biometric engineers using ASR systems for speaker identification and verification casework.

## Limitations

The real speech evaluation relies on a very small sample size of three trained female phoneticians whose laryngeal control may not reflect the general population, and synthetic manipulations cannot accurately capture complex volitional articulation strategies.

## Related

- (link related pages by id as the wiki grows)
