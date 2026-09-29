---
id: cronenberg26_interspeech
category: phonetics-linguistics
labels: [multilingual]
institutions: ["Universite Paris Cite", "CNRS", "Universite Paris-Saclay", "Institut Universitaire de France"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2433
pdf: https://www.isca-archive.org/interspeech_2026/cronenberg26_interspeech.pdf
---

# To glide or not to glide: Acoustic realization of the diphthong-hiatus contrast in Italian and Romanian

*Johanna Cronenberg, Lori Lamel, Ioana Chitoran*

[PDF](https://www.isca-archive.org/interspeech_2026/cronenberg26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cronenberg26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2433)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This study analyzes the duration and formant dynamics of the vowel sequence /ia/ across large corpora of Italian and Romanian to investigate the diphthong-hiatus contrast. Results reveal that while Romanian exhibits overall steeper formant trajectories and longer durations consistent with a preference for hiatus, both languages display substantial phonetic overlap, indicating a gradient realization driven by lexical stress and word position.

## Key contributions

- Evaluated 23,681 Italian and 17,895 Romanian /ia/ tokens extracted from 168 hours and 300 hours of broadcast speech corpora respectively.
- Applied Functional Principal Component Analysis (FPCA) to time-normalized F1 and F2 trajectories to quantify gradient changes in vowel sequence shape, steepness, and curvature.
- Demonstrated that lexical stress primarily dictates acoustic duration and formant trajectory steepness in Italian, whereas Romanian gliding is predominantly preferred in unstressed medial positions.
- Revealed that Romanian /ia/ sequences have longer durations and steeper formant transitions than Italian across comparable contexts, empirically supporting the macro-level typological preference for hiatus.

## Problem

Phonological categories of rising vowel sequences like /ia/ are split across Romance languages: Italian predominantly classifies them as monosyllabic diphthongs (/jV/), whereas Romanian favors heterosyllabic hiatus (/i.V/). However, prior work predominantly relied on small, controlled laboratory datasets of isolated words from very few speakers, leaving open how these categories manifest in large-scale, continuous natural speech. Understanding whether this categorical contrast is discrete or gradient—and how it is modulated by lexical stress and word position—remains a critical gap in phonetic typology.

## Method

The authors extracted tokens of /ia/ from 168 hours of Italian and 300 hours of Romanian broadcast news and interviews using automated forced-aligner segmentations. Duration was rate-normalized by dividing by local articulation rate (phonemes/second excluding the vowel sequence and pauses) and log-transformed. Formants (F1, F2) were extracted using the wrassp::forest algorithm (v1.0.5), converted from Hertz to Bark scale using phonR, centered by subtracting the trajectory mean, time-normalized linearly, and smoothed via B-splines.

Functional Principal Component Analysis (FPCA) decomposed the 41,576 total vowel trajectories into mean curves and principal components. PC1 (capturing 27.0% variance) encoded transition steepness and curvature, while PC3 (13.5% variance) captured F1 peak timing and F2 steady-state presence. Linear Mixed Effects Models (LMERs) fitted with lmerTest tested language, stress, and initiality interactions, using random intercepts for word type and audio segment ID to control for speaker and recording variability.

## Experimental setup

Datasets comprised 168 hours of Italian broadcast recordings (24,371 raw tokens) and 300 hours of Romanian broadcast recordings (19,972 raw tokens). After automated outlier cleaning (replacing outlier points outside Q1/Q3 ± 1.5*IQR) and filtering frames with >25% unmeasurable formants, the final dataset contained 23,681 Italian tokens and 17,895 Romanian tokens categorized across 4 conditions (stressed/unstressed × initial/medial). Metrics included rate-normalized log duration and FPCA scores (PC1, PC3) evaluated via LMERs and estimated marginal means.

## Results

In Italian, stressed /ia/ sequences were substantially longer and featured significantly steeper, more peripheral formant trajectories with an F2 steady state compared to unstressed sequences (e.g., a 0.56 log-unit duration difference between stressed and unstressed medial tokens, t = 26.6, p < 0.001). Conversely, Romanian showed the flattest trajectories specifically for unstressed medial /ia/, indicating a preference for gliding in that exact context. Across languages, Romanian sequences were significantly longer (0.31 units in initial, 0.36 units in medial positions) and exhibited steeper formants overall than Italian counterparts, confirming a stronger hiatus preference. However, extensive overlap between distributions indicates the contrast is highly gradient.

## Limitations

The study lacks individual speaker IDs in the corpora, relying instead on coarse segment IDs to manage speaker and acoustic variability. Formant extraction relied entirely on automated algorithms (wrassp) with algorithmic outlier replacement rather than manual correction, which resulted in the exclusion of over 2,000 Romanian tokens due to unmeasurable formants. Furthermore, sociodemographic factors, fine-grained phonetic context, and morpheme boundaries were not controlled in this initial pass.

## Why read this

Phoneticians and speech engineers working on cross-lingual acoustic modeling or pronunciation variation should read this to understand how natural speech blurs theoretical phonological boundaries like the diphthong-hiatus contrast. It provides a blueprint for applying Functional Principal Component Analysis (FPCA) to large unconstrained broadcast corpora.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving forced alignment, cross-lingual acoustic modeling, and text-to-speech prosody generation for Romance languages.

## Institutions / 機構

Universite Paris Cite, CNRS, Universite Paris-Saclay, Institut Universitaire de France

**Funding / 經費:** ANR, IdEx program

## Related

- (link related pages by id as the wiki grows)
