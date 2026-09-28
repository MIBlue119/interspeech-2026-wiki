---
id: ma26b_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-527
pdf: https://www.isca-archive.org/interspeech_2026/ma26b_interspeech.pdf
---

# More than a feeling: Expressive style influences cortical speech tracking in subjective cognitive decline

[PDF](https://www.isca-archive.org/interspeech_2026/ma26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ma26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-527)

**TL;DR** — This study investigates how subjective cognitive decline (SCD) affects cortical speech tracking in older adults, discovering that higher-level linguistic tracking degrades while acoustic tracking remains stable.

## Problem

Subjective cognitive decline (SCD) doubles the risk of progressing to dementia, yet early neural indicators during naturalistic speech perception remain poorly understood. While older adults suffer from degrading auditory and cognitive abilities, standard clinical tests often fail to capture subtle everyday listening and processing impairments. Identifying sensitive neural markers during speech processing is therefore critical for early detection and intervention.

## Method

The authors collected 64-channel EEG data from 60 cognitively normal older adults (aged 60-70) listening to 16 one-minute Cantonese speech recordings across four expressive styles (scrambled, descriptive, dialogue, exciting). Multivariate temporal response function (mTRF) encoding models using Boosting were built to map three feature sets to EEG signals: acoustic (speech envelope and onset), subsyllabic segmentation, and phonotactic features (initial, final, and tone surprisal). Feature extraction utilized a Montreal Forced Aligner trained on a 109-hour Cantonese corpus and corpus-derived surprisal values. Linear mixed-effects models analyzed how cortical tracking strength (CTS) was modulated by SCDS scores, expressive styles, and scalp sites, controlling for age, gender, education, MoCA scores, pure-tone audiometry (PTA), and subjective perceptual ratings.

## Results

Across models, phonotactic features significantly outperformed subsyllabic segmentation, which in turn outperformed acoustic models (ps < .001). Crucially, greater SCD severity (higher SCDS scores) was associated with significantly weaker CTS for subsyllabic (t = -2.05, p = .044) and phonotactic features, whereas acoustic feature tracking showed no such decline. Furthermore, SCD severity interacted significantly with expressive style (F(3, 4208.67) = 25.43, p < .001), showing that tracking deficits were more pronounced during prosodically flat speech.

## Code

- https://doi.org/10.5281/zenodo.20748010

## Applications

Neurologists and speech engineers can use these findings to design non-invasive, speech-based digital biomarkers and screening tools for early-stage cognitive decline and dementia risk.

## Limitations

The study focuses specifically on Cantonese speakers aged 60-70, and findings must be validated across broader linguistic and demographic cohorts.

## Related

- (link related pages by id as the wiki grows)
