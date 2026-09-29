---
id: skorzewska26_interspeech
category: phonetics-linguistics
institutions: ["Silesian University of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2606
pdf: https://www.isca-archive.org/interspeech_2026/skorzewska26_interspeech.pdf
---

# Informativity of high-frequency bands on the place of articulation shift in retroflex sibilants produced by children

*Oliwia Skórzewska, Maria Filipek, Wojciech Pieniążek, Zuzanna Miodońska*

[PDF](https://www.isca-archive.org/interspeech_2026/skorzewska26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/skorzewska26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2606)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates the informativity of high-frequency acoustic bands up to 16 kHz for diagnosing place-of-articulation errors in children's retroflex sibilants, showing that aggregated noise energy ratios explain up to 30% of articulatory variance. By moving beyond traditional low-pass cutoffs, the proposed FNER features capture voicing-independent spectral shifts caused by speech distortions like sigmatism.

## Key contributions

- Extended acoustic analysis of pediatric retroflex sibilants up to 16 kHz, uncovering diagnostically critical high-frequency cues (up to 14–16 kHz) typically missed by standard low-pass filtering.
- Introduced and evaluated 34 frame-level features comprising 28 Noise Energy (NE) subbands, integrated Fricative Noise Energies (FNE), and Fricative Noise Energy Ratios (FNER).
- Applied Linear Mixed-Effects (LME) models on 4,429 segments from 186 Polish preschool children to robustly account for speaker and word-level hierarchy despite class imbalance.
- Demonstrated that aggregated band-ratio features (FNER) achieve superior variance explanation ($R^2_m$ up to ~30%) and provide a voicing-independent representation of articulatory misplacement.

## Problem

Standard acoustic analyses of children's speech frequently apply low-pass cutoffs that discard critical high-frequency diagnostic information. Children have shorter vocal tracts that shift sibilant spectral energy into higher frequency ranges (above 10 kHz). Consequently, subtle articulatory distortions—such as sigmatism (dental, interdental, and postalveolar substitutions of retroflex sibilants /ʂ/, /ʐ/, /ʈʂ/) common in Polish preschool children—are poorly differentiated by low-frequency features. This lack of robust, objective acoustic markers impairs computer-aided speech diagnosis and clinical assessment.

## Method

The study analyzes audio recordings sampled at 44.1 kHz from the PAVSig database. Sibilant segments are linearly normalized (0 to 1), framed into 20 ms windows with 10 ms overlap, and restricted to the middle 50% of frames to minimize coarticulation effects from neighboring phonemes. For each frame, 34 features are extracted: 28 raw Noise Energy (NE) values in 500 Hz subbands spanning 2 kHz to 16 kHz ($K=28$), calculated via Discrete Fourier Transform (DFT) squared magnitude sums; three integrated Fricative Noise Energy (FNE) measures over intervals bounded by mean spectral formant frequencies (FF1 = 2 kHz, FF2 = 4.0 kHz, FF3 = 5.5 kHz, FF4 = 7.5 kHz) yielding FNE12, FNE23, and FNE34; and three Fricative Noise Energy Ratios (FNER(12,23), FNER(12,34), FNER(23,34)) capturing spectral balance.

To model the hierarchical data structure and unequal group sizes without dropping rare pathological categories, Linear Mixed-Effects (LME) models are fit per phoneme using the R package lme4. The fixed effect is Place of Articulation (PoA with 4 levels: retroflex as intercept, postalveolar, dental, interdental), while random intercepts account for speaker and parent word variability: Feature ~ PoA + (1 | speaker) + (1 | parent word). Segment-level observations are obtained by averaging frame-wise feature vectors within tokens prior to modeling, resulting in 4,429 analyzed segments.

## Experimental setup

Evaluated on data from 186 Polish preschool children aged 4 to 8 years from the PAVSig dataset (totaling 4,429 segments across 26 distinct words covering unvoiced retroflex fricative /ʂ/, voiced retroflex fricative /ʐ/, and unvoiced retroflex affricate /ʈʂ/). The dataset exhibits natural corpus-based class imbalance across Places of Articulation (1,288 retroflex/normative, 730 postalveolar, 638 dental, 187 interdental). Models are compared across features using marginal $R^2$ ($R^2_m$, variance from fixed effects) and conditional $R^2$ ($R^2_c$, variance from full model). Implemented using MATLAB 2023b for signal processing and R 4.4.2 (lme4, lmerTest) for statistical modeling.

## Results

The newly introduced aggregated FNER features substantially outperformed individual subband measures, with FNER(12,23) achieving a marginal $R^2$ of 0.298 ($R^2_c = 0.647$) for the affricate /ʈʂ/, and FNER(12,34) reaching $R^2_m = 0.228$ ($R^2_c = 0.684$) for the voiced fricative /ʐ/. Dental realizations exhibited globally significant deviations across almost the entire spectrum compared to the retroflex norm, whereas interdental and postalveolar variants showed localized high-frequency signatures extending up to 14–16 kHz (e.g., NE13–NE23 for interdental /ʐ/). Postalveolar productions proved most similar to normative retroflex speech, showing significant differences restricted to narrow bands (e.g., 5–5.5 kHz for /ʐ/).

| Phoneme | Top Acoustic Feature | Marginal $R^2$ ($R^2_m$) | Conditional $R^2$ ($R^2_c$) | Significant PoA Distortions ($p < 0.05$) |
|---|---|---|---|---|
| /ʂ/ (/ù/) | FNER(12,23) | 0.195 | 0.647 | Dental |
| /ʂ/ (/ù/) | FNER(12,34) | 0.174 | 0.715 | Dental, Interdental |
| /ʐ/ (/ü/) | FNER(12,34) | 0.228 | 0.684 | Dental, Interdental |
| /ʐ/ (/ü/) | FNER(12,23) | 0.190 | 0.589 | Dental |
| /ʈʂ/ (/tù/) | FNER(12,23) | 0.289 | 0.647 | Dental |
| /ʈʂ/ (/tù/) | FNER(12,34) | 0.214 | 0.608 | Dental, Interdental |

## Limitations

The dataset contains a substantial class imbalance across places of articulation (e.g., only 187 interdental segments vs. 2,874 retroflex), reducing precision for underrepresented distortion types despite LME partial pooling. The analysis is purely exploratory and does not control for individual anatomical factors such as dentition characteristics or missing teeth. Furthermore, the evaluation is limited to Polish preschool children and specific retroflex phonemes, leaving generalizability to other languages and sibilant categories unverified.

## Why read this

Speech researchers and SLP technology developers should read this paper to understand the necessity of incorporating high-frequency acoustic bands (up to 16 kHz) and band-energy ratios for detecting pediatric articulation errors. It demonstrates how Linear Mixed-Effects modeling handles imbalanced clinical corpora and introduces robust, voicing-independent spectral features.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-aided speech therapy, automated diagnosis tools for pediatric speech disorders (sigmatism), and clinical acoustic evaluation software for speech-language pathologists.

## Institutions / 機構

Silesian University of Technology

**Funding / 經費:** National Science Centre, Poland, European Union, Ministry of Science and Higher Education, Poland

## Related

- [Detection of Incorrect Place of Articulation in Polish Sibilants Using Convolutional Autoencoders](pieniazek26_interspeech.md) — same problem · relatedness 2.1/3
- [Age-dependent acoustic changes of the frication noise in dental sibilants produced by typically developing Polish children between 5 and 8 years of age](miodonska26_interspeech.md) — same problem · relatedness 2.0/3
- [SayCheck: Gamified Speech Practice and Attribute-Based Speech Analysis for Children](shahin26_interspeech.md) — same problem · relatedness 1.9/3
- [From onset to coda: spectral variation in normative Polish /s/ produced by children](walczak26_interspeech.md) — same problem · relatedness 1.9/3
- [Phoneme-Level Mispronunciation Screening in Polish-Speaking Children with an Explainable Assistant](dudek26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
