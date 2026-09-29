---
id: ma26b_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-527
pdf: https://www.isca-archive.org/interspeech_2026/ma26b_interspeech.pdf
---

# More than a feeling: Expressive style influences cortical speech tracking in subjective cognitive decline

*Matthew King-Hang Ma, Yun Feng, Cloris Pui-Hang Li, Manson Cheuk-Man Fong*

[PDF](https://www.isca-archive.org/interspeech_2026/ma26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ma26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-527)

**Category:** `health-clinical`

**TL;DR** — This study demonstrates that greater subjective cognitive decline (SCD) severity in older adults is associated with weaker cortical tracking of subsyllabic linguistic features and prosodically flat speech, while acoustic tracking and tracking of prosodically rich speech remain preserved. The cortical tracking of higher-level linguistic features during prosodically flat speech emerges as a potential neural marker for early-stage cognitive decline.

## Key contributions

- Evaluated multivariate temporal response function (mTRF) encoding models across three feature sets (acoustic, subsyllabic segmentation, and phonotactic) to study naturalistic speech perception in older adults with subjective cognitive decline.
- Curated and validated Cantonese speech stimuli across four expressive styles (scrambled, descriptive, dialogue, exciting) scaled across Valence-Arousal-Dominance dimensions.
- Established a phonological feature extraction pipeline for Cantonese using forced alignment and surprisal metrics, releasing resources for community research.
- Revealed a double dissociation where higher-level linguistic feature tracking (not acoustic tracking) and prosodically flat speech tracking (not rich dialogue/exciting speech) are degraded in higher SCD severity.

## Problem

Subjective cognitive decline (SCD) doubles the risk of progressing to mild cognitive impairment and dementia, yet monitoring early cognitive worsening during ecologically valid tasks like naturalistic speech perception remains underexplored. While older adults generally compensate for degrading auditory perception via top-down linguistic processing, how self-perceived cognitive worsening alters the cortical tracking of diverse speech features across different prosodic contexts is largely unknown. Prior studies often lack naturalistic ecological validity, rely on memory-centric tasks rather than everyday communication challenges, and lack comprehensive linguistic feature sets for tone-rich languages like Cantonese.

## Method

The study collected 64-channel EEG data from 60 cognitively normal older Cantonese adults (aged 60-70) listening to 16 one-minute clean speech recordings across four expressive styles (scrambled, descriptive, dialogue, exciting). Speech representations were extracted across three levels: acoustic features (speech envelope derived from 24 gammatone filterbanks scaled to 0.6 power plus onset), subsyllabic segmentation features (initials and finals derived using a Cantonese Montreal Forced Aligner trained on the 109-hour Common Voice HK corpus), and phonotactic features (unigram probability for initials, conditional probability for finals given initials, and conditional probability for tones given initials and finals, converted to surprisal values from a 230,000-word lexicon).

Multivariate temporal response functions (mTRFs) were fitted using the boosting algorithm via the Eelbrain toolkit over time lags from -200 ms to 600 ms, modeling EEG signals as a linear convolution of stimulus features. Cortical tracking strength (CTS) was quantified as the Pearson correlation coefficient between observed and predicted EEG signals using leave-one-out cross-validation across 6 scalp electrode sites. Linear mixed-effect models (with backward elimination and Type-III ANOVA) were used to analyze CTS against SCDS scores, mTRF models, expressive styles, and comprehensive covariates including age, gender, education, MoCA scores, pure-tone audiometry (PTA), and subjective VAD/enjoyment ratings.

## Experimental setup

Evaluated on 60 older Cantonese adults (aged 60-70, 30 female) with normal objective cognition (MoCA-HK) but varying subjective cognitive decline (SCDS scores 14-58). EEG was recorded using a 64-channel BioSemi ActiveTwo system at 2048 Hz, preprocessed via MNE-Python (downsampled to 512 Hz, ICA artifact removal, 1-40 Hz bandpass filter). Models were evaluated via leave-one-out cross-validation comparing acoustic, segmentation, and phonotactic mTRF models across four expressive speech styles.

## Results

Phonotactic models significantly outperformed segmentation models, which in turn outperformed acoustic models in cortical tracking strength (p < 0.001 for all pairs). SCDS scores significantly and negatively modulated CTS for the segmentation model (t = -2.05, p = 0.044) and marginally for the phonotactic model (t = -1.76, p = 0.084), while acoustic tracking showed no significant modulation by SCD. Furthermore, SCDS significantly and negatively modulated CTS for prosodically flat scrambled (t = -2.89, p = 0.005) and descriptive speech (t = -2.32, p = 0.023), whereas rich dialogue and exciting styles showed no such decline, suggesting rich prosody acts as an acoustic scaffold compensating for diminished linguistic processing.

| Model / Condition | Metric (Mean CTS / Trend) | Key Finding |
|---|---|---|
| Acoustic (Aco) Model | Lowest baseline CTS | Unaffected by SCD severity |
| Subsyllabic Segmentation (Seg) Model | Intermediate CTS | Negatively modulated by SCD (t = -2.05) |
| Phonotactic (Pho) Model | Highest baseline CTS | Outperformed all other models (p < 0.001) |
| Scrambled Style | High sensitivity to SCD | Significant negative CTS modulation by SCDS (p = 0.005) |
| Descriptive Style | High sensitivity to SCD | Significant negative CTS modulation by SCDS (p = 0.023) |
| Dialogue / Exciting Styles | Resilient to SCD | Prosodic richness acts as a compensatory scaffold |

## Limitations

The study is limited by examining only subsyllabic and acoustic features without explicit word-level surprisal or pitch contour features. The participant pool is restricted to Cantonese speakers aged 60-70, limiting cross-linguistic generalization to non-tonal languages. Additionally, the cross-sectional design prevents direct causal claims regarding progression from subjective cognitive decline to clinical dementia.

## Why read this

Speech and ML researchers investigating neural markers of cognitive decline or speech perception mechanisms in aging will find a rigorous blueprint for combining mTRF encoding models with fine-grained linguistic surprisal features. It challenges assumptions by showing that prosodically rich speech can mask cognitive deficits, pointing researchers toward prosodically flat stimuli for sensitive early-stage cognitive screening.

## Code

- https://github.com/KHMMA/SCD_CTS_Interspeech2026

## Applications

Early-stage non-invasive neurological screening tools for cognitive decline, hearing-aid adaptive processing algorithms, and voice-based digital biomarkers for elderly healthcare.

## Institutions / 機構

Hong Kong Polytechnic University

**Funding / 經費:** HKRGC Postdoctoral Fellowship Scheme

## Related

- (link related pages by id as the wiki grows)
