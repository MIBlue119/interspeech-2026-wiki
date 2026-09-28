---
id: constantin26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2654
pdf: https://www.isca-archive.org/interspeech_2026/constantin26_interspeech.pdf
---

# A multilingual composite speech index to assess passage reading in Huntington’s disease

[PDF](https://www.isca-archive.org/interspeech_2026/constantin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/constantin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2654)

**TL;DR** — The paper introduces a multilingual composite temporal speech index (CTSI) derived from passage reading tasks to assess Huntington's disease severity, achieving strong correlations with clinical cognitive and motor scores (e.g., $r = -0.77$ for SDMT).

## Problem

Huntington's disease causes heterogeneous speech alterations linked to neurodegeneration, which are crucial for tracking progression in clinical trials. However, prior digital speech markers derived from passage reading tasks have been limited to single languages or require excluding speech features due to language barriers when merging international datasets. Developing a robust, language-independent metric is necessary to leverage global multi-site cohorts in rare disease research.

## Method

The study analyzes 89 Huntington's disease patients and 82 matched controls across three languages (English, Polish, and Spanish) reading language-specific standard passages (e.g., Rainbow Passage). Audio is recorded via mobile devices, band-pass filtered (10 Hz–5 kHz), and down-sampled, after which voiced speech bursts are detected using an adaptive threshold based on Otsu's method applied to the Teager-Kaiser Energy Operator (TKEO) envelope. Ten temporal speech features (such as Total Speech Time, Net Speech Time, Pause Time, and Mean Burst Duration) are extracted, and linear mixed models are used to identify features stable across languages. Six robust features are standardized against language-matched controls and averaged to create the final Composite Temporal Speech Index (CTSI).

## Results

Evaluated on 89 HD patients and 82 controls across English, Polish, and Spanish using mobile device recordings. Out of 10 temporal features, 6 showed significant and consistent group differences across all three languages (TST, NST, TPT, MBD, NBR, and nP; $p < 0.05$ to $p < 0.001$). Ordinary least squares regression revealed strong correlations between the resulting CTSI and clinical metrics from the Unified Huntington's Disease Rating Scale: composite UHDRS ($r = -0.74, p < 0.001$), Symbol Digit Modality Test ($r = -0.77, p < 0.001$), Stroop Word Reading Test ($r = -0.70, p < 0.001$), and Total Motor Score ($r = 0.64, p < 0.001$).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and clinical researchers can use this automated multilingual framework to quantify neurodegenerative disease progression and monitor cognitive-motor decline during clinical trials using mobile device audio.

## Related

- (link related pages by id as the wiki grows)
