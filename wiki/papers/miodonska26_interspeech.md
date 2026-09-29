---
id: miodonska26_interspeech
category: phonetics-linguistics
institutions: ["Silesian University of Technology", "University of Silesia in Katowice"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-799
pdf: https://www.isca-archive.org/interspeech_2026/miodonska26_interspeech.pdf
---

# Age-dependent acoustic changes of the frication noise in dental sibilants produced by typically developing Polish children between 5 and 8 years of age

*Zuzanna Miodońska, Oliwia Skórzewska, Natalia Mocko, Magdalena Krycha, Michal Krecichwost*

[PDF](https://www.isca-archive.org/interspeech_2026/miodonska26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/miodonska26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-799)

**Category:** `phonetics-linguistics`

**TL;DR** — An acoustic investigation of dental sibilants /s, z/ produced by 88 typically developing Polish children aged 5 to 8 years reveals age-dependent spectral shifts—specifically increased high-frequency energy and formant spacing—indicating improved articulatory precision. No significant sex differences were found in this age range.

## Key contributions

- Analyzed a controlled corpus of 88 typically developing children (61–96 months) producing Polish dental sibilants /s, z/ across 14 distinct words.
- Extracted 41 acoustic features per frame, combining 12 whole-spectrum measures and 29 frication noise markers (formants, formant distances, band energies).
- Employed comprehensive Linear Mixed-Effect (LME) models featuring speaker and word random intercepts alongside by-speaker random slopes for phonetic context, stress, and syllable count.
- Identified statistically significant age-related increases in fricative formant distance (FFD12) and high-band energies (NE8, NE9) for /s/, and decreases in FF1 and low-band energy (NE1) for /z/.

## Problem

Acquiring sibilant articulation is complex, requiring precise vocal tract geometry and airflow control, with sigmatism being the most common preschool articulation disorder. While adult sibilants are heavily studied, data quantifying continuous developmental acoustic changes in typically developing children remain extremely limited. Prior work has largely relied on subjective auditory assessments or small cohorts, lacking rigorous statistical modeling that isolates age from phonetic context and inter-speaker variability.

## Method

Audio data recorded at 44.1 kHz via a front-facing microphone were manually segmented and analyzed in MATLAB R2023b using 20 ms frames with a 10 ms overlap to compute STFTs with 50 Hz resolution. To target the most stable portion of the frication noise, the middle 50% of frames (excluding the first and last 25%) were retained, yielding 8,601 frames for /s/ and 3,632 frames for /z/. From these frames, 12 whole-spectrum features (spectral moments, crest, entropy, flatness, flux, rolloff, slope, pitch) and 29 frication noise metrics (formants FF1-FF4, levels, relations, distances FFD12-FFD34, peak amplitude, and 500 Hz subband energies NE0-NE9 from 2 to 7 kHz) were extracted.

Linear mixed-effect (LME) models were fitted independently for each of the 41 features. Fixed effects comprised Age (full months), Sex (male/female), and their interaction. The random effects structure included speaker and word random intercepts, plus by-speaker random slopes for word position, syllable count, stress, following/preceding sounds, and elicitation type (spontaneous vs. repeated). Model selection prioritized homoscedasticity and maximum log-likelihood. For unvoiced /s/, significant positive age trends emerged in FFD12, NE8, and NE9, reflecting a widening spectral peak structure. For voiced /z/, significant negative age trends appeared in FF1 and NE1, indicating that lower-frequency energy becomes relatively less prominent as higher-frequency cues mature.

## Experimental setup

The study analyzed speech samples from 88 typically developing Polish children (39 boys, 49 girls) aged 61 to 96 months (roughly 5 to 8 years old), captured from 52 total words/phrases (14 selected specifically for dental fricatives yielding 726 /s/ tokens and 413 /z/ tokens). Acoustic metrics were compared across age and sex using LME models implemented in MATLAB R2023b with a significance threshold of p = 0.05. No traditional ML/DL classification baselines were evaluated, as this is an inferential acoustic and statistical modeling study.

## Results

None of the 12 whole-spectrum features or fundamental frequency showed significant changes related to speaker age or sex, indicating that general vocal fold pitch remains stable across this narrow 25-month preschool window and that inter-child anatomical variance masks global spectral shifts. Similarly, speaker sex showed no significant main effect or interaction across any feature.

However, LME models revealed significant age-dependent acoustic changes in frication noise: unvoiced /s/ exhibited significant increases per month in FFD12 (estimate = 0.010, p = 0.046), NE8 between 6–6.5 kHz (estimate = 1.16, p = 0.043), and NE9 between 6.5–7 kHz (estimate = 1.32, p = 0.004). For voiced /z/, significant decreases per month were found in the first fricative formant FF1 (estimate = -0.003, p = 0.010) and low-band energy NE1 between 2–2.5 kHz (estimate = -1.35, p = 0.033). These patterns reflect a sharpening and high-frequency concentration of sibilant energy indicative of refining motor control.

| Phoneme | Acoustic Feature | Effect Type | Estimate | Std. Error | p-value |
| --- | --- | --- | --- | --- | --- |
| /s/ | FFD12 (FF2-FF1 distance) | Age (per month) | 0.010 | 0.005 | 0.046 |
| /s/ | NE8 (6.0–6.5 kHz energy) | Age (per month) | 1.16 | 0.57 | 0.043 |
| /s/ | NE9 (6.5–7.0 kHz energy) | Age (per month) | 1.32 | 0.46 | 0.004 |
| /z/ | FF1 (1st fricative formant) | Age (per month) | -0.003 | 0.001 | 0.010 |
| /z/ | NE1 (2.0–2.5 kHz energy) | Age (per month) | -1.35 | 0.63 | 0.033 |

## Limitations

The study features several limitations: the dataset lacks explicit documentation of children's bilingualism or home language backgrounds, uneven participant counts per specific month of age led to high data dispersion and irregular confidence intervals, and the repetition versus spontaneous elicitation conditions used non-identical words which may introduce uncontrolled lexical variability. Furthermore, the scope is strictly restricted to Polish dental fricatives /s, z/, omitting other sibilant places of articulation.

## Why read this

Speech researchers and clinical engineers working on automated speech therapy and developmental assessment tools should read this to understand how fine-grained acoustic features (such as frication subband energies and formant distances) track articulatory maturation in children better than broad spectral moments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech therapy diagnostic systems, objective computer-aided pronunciation scoring, and developmental speech monitoring tools for preschool children.

## Institutions / 機構

Silesian University of Technology, University of Silesia in Katowice

**Funding / 經費:** National Science Centre, Poland, European Funds for Silesia, Just Transition Fund, National Centre for Research and Development

## Related

- [From onset to coda: spectral variation in normative Polish /s/ produced by children](walczak26_interspeech.md) — same problem · relatedness 2.1/3
- [Informativity of high-frequency bands on the place of articulation shift in retroflex sibilants produced by children](skorzewska26_interspeech.md) — same problem · relatedness 2.0/3
- [Detection of Incorrect Place of Articulation in Polish Sibilants Using Convolutional Autoencoders](pieniazek26_interspeech.md) — same problem · relatedness 1.9/3
- [How does children's pronunciation develop? Capturing syllabic change with children's growth using unsupervised syllable discovery](horii26_interspeech.md) — same problem · relatedness 1.9/3
- [Phoneme-Level Mispronunciation Screening in Polish-Speaking Children with an Explainable Assistant](dudek26_interspeech.md) — complementary · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
