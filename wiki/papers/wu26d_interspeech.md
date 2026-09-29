---
id: wu26d_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1593
pdf: https://www.isca-archive.org/interspeech_2026/wu26d_interspeech.pdf
---

# Articulatory Analysis of the Mandarin Alveolar–Retroflex Contrast Using Real-Time MRI

*Qi Wu, Tatsuya Kitamura*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1593)

**Category:** `phonetics-linguistics`

**TL;DR** — This study uses real-time magnetic resonance imaging (rtMRI) to quantify the articulatory correlates of the Mandarin alveolar-retroflex contrast, revealing that retroflexion is reliably characterized by posterior constriction displacement and anterior cavity expansion rather than stereotyped tongue-tip curling.

## Key contributions

- Quantified vocal-tract geometry across 96 monosyllabic items and 4 native speakers using midsagittal rtMRI and grid-based tracking.
- Established that primary constriction location ($F(1,361)=1073.93, p<0.001$) and front cavity volume ($F(1,361)=1433.47, p<0.001$) are robust invariant correlates of Mandarin retroflexion.
- Demonstrated via rtMRI frames that retroflex tokens frequently adopt a tongue-tip-down posture rather than physical tongue-tip curling.
- Showed that constriction length and back cavity measures are unstable or weak discriminators across phonetic pairs.

## Problem

Traditional phonology classifies Mandarin coronal sibilants and approximants (zh, ch, sh, r) as retroflex and teaches L2 learners to curl the tongue tip upward. However, prior ultrasound, X-ray, and palatographic studies report widespread non-curling realizations, postalveolar constrictions, and substantial interspeaker variation. This discrepancy highlights the need for precise instrumental measurement of vocal tract cavity configurations and constriction geometry to define the true articulatory targets of the contrast.

## Method

The study examined 96 target stimuli combining 8 Mandarin consonants (/ts, ts^h, s, l, tʂ, tʂ^h, ʂ, ʐ/) with 12 vocalic contexts in Tone 4, embedded in a carrier phrase. Data were gathered from 4 native Northern Mandarin speakers using a 3T Siemens MAGNETOM Prisma MRI scanner acquiring midsagittal rtMRI frames at a temporal resolution of 13.78 fps (256x256 matrix, 1 mm in-plane resolution, 10 mm slice thickness). 

For steady-state consonant frames, a custom MATLAB toolbox performed grid-based vocal tract tracking. Air-tissue boundaries were detected along orthogonal gridlines spaced 2 mm apart along a manually traced airway midline. Four continuous dependent variables were calculated: normalized constriction location (0 to 1 scale from anterior to posterior oral boundary), constriction length (number of spanning grid positions), front cavity pseudo-area ($S_{front}$), and back cavity pseudo-area ($S_{back}$). 

Linear mixed-effects models were fitted using restricted maximum likelihood in R via the nlme package, treating consonant class and pair as fixed effects, vowel context and vocal tract length (VTL) deviations as covariates, and speaker intercepts as random effects. P-values were adjusted using Benjamini-Hochberg FDR control.

## Experimental setup

Evaluated on 4 native Mandarin speakers (2 male, 2 female, mean age 26.75) producing 96 items each, yielding a dataset modeled across 361 degrees of freedom in mixed-effects analyses. Evaluated 4 minimal phonetic pairs: ts-tʂ, ts^h-tʂ^h, s-ʂ, and l-ʐ. Metrics included fixed-effect F-tests and Benjamini-Hochberg adjusted q-values for front cavity, constriction location, constriction length, and back cavity.

## Results

Retroflex consonants exhibited a statistically robust posterior shift in constriction location across all pairs (main effect $F(1,361)=1073.93, p<0.001$). Front cavity expansion was similarly significant across classes ($F(1,361)=1433.47, p<0.001$) with a significant class-by-pair interaction, showing increased anterior cavity pseudo-areas ranging from +33.20 to +56.66 units. Constriction length displayed mixed behavior, showing significant shortening for specific pairs like $ts^h-tʂ^h$ (estimate -1.31, $q<0.001$) and $s-ʂ$ (estimate -2.13, $q<0.001$), but no significant difference for $ts-tʂ$ or $l-ʐ$. Back cavity failed to reliably separate consonant classes ($F(1,361)=1.43, p=0.232$).

| Consonant Pair | Front Cavity Estimate | Front Cavity q-value | Constriction Location Estimate | Constriction Location q-value | Constriction Length Estimate | Constriction Length q-value |
| --- | --- | --- | --- | --- | --- | --- |
| ts–tʂ | +52.18 | < 0.001 | +0.046 | < 0.001 | +0.23 | 0.496 |
| tsʰ–tʂʰ | +51.38 | < 0.001 | +0.040 | < 0.001 | −1.31 | < 0.001 |
| s–ʂ | +56.66 | < 0.001 | +0.039 | < 0.001 | −2.13 | < 0.001 |
| l–ʐ | +33.20 | < 0.001 | +0.042 | < 0.001 | −0.39 | 0.196 |

## Limitations

The study relies on a very small sample size of only 4 speakers, limiting demographic generalization. Measurements were restricted to manually selected steady-state frames rather than time-varying continuous articulatory trajectories. Acoustic recordings were not directly coupled to acoustic-articulatory modeling, and back cavity estimations were constrained by midsagittal pseudo-area approximations.

## Why read this

Phoneticians, speech scientists, and L2 pronunciation instructors should read this paper to replace outdated tongue-curling dogma with evidence-based vocal-tract geometry targets for Mandarin retroflexes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Pronunciation training software, computer-aided language learning (CALL) systems for L2 Mandarin, and clinical speech therapy for coronal misarticulations.

## Institutions / 機構

University of Tsukuba, Konan University

**Funding / 經費:** JSPS KAKENHI, Kawai Foundation for Sound & Music

## Related

- (link related pages by id as the wiki grows)
