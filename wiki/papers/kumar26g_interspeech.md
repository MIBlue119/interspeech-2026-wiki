---
id: kumar26g_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2602
pdf: https://www.isca-archive.org/interspeech_2026/kumar26g_interspeech.pdf
---

# An auscultation location specific study on the relationship between expiratory-to-inspiratory acoustic patterns and spirometric airflow limitation across age and gender in asthmatic patients

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2602)

**TL;DR** — This study evaluates how the expiratory-to-inspiratory spectral power ratio correlates with spirometric airflow limitation across age and gender in asthma patients, finding that the 100-400 Hz frequency bands yield the strongest associations.

## Problem

Spirometry is the gold standard for assessing asthma severity through the FEV1/FVC ratio, but it depends heavily on patient effort and is difficult to administer reliably to children and the elderly. Non-invasive respiratory acoustic biomarkers could offer an easier alternative, but prior studies have underexplored how demographic factors like age and gender influence regional lung sound patterns. Understanding these demographic variations is critical to ensure that acoustic markers accurately reflect underlying physiological airflow limitation.

## Method

The authors recorded respiratory sounds from 141 clinically diagnosed asthma patients across four posterior chest auscultation locations (Left Upper, Left Lower, Right Upper, Right Lower) using a digital stethoscope at 4 kHz. Five breath cycles per location were manually segmented into inspiration and expiration phases by experts. Time-frequency representations were computed via STFT using a 2048-sample Hanning window and 512-sample hop length. Expiratory-to-inspiratory (E/I) spectral power ratios were calculated across four frequency bands (0-800 Hz, 100-200 Hz, 200-400 Hz, and 400-800 Hz) and summarized using subject-level median values. Spearman's rank correlation was used to measure associations with spirometric FEV1/FVC ratios stratified by age groups and gender.

## Results

Evaluated on 141 asthma participants (66 males, 75 females, aged 20-60 years) yielding 2,815 total breath cycles, the 100-200 Hz and 200-400 Hz frequency bands consistently showed stronger and statistically significant Spearman correlations with FEV1/FVC compared to broadband or 400-800 Hz ranges. Overall, lower posterior sites showed stronger associations, but younger adults (20-30 years) exhibited stronger correlations at the Left Lower site, while older adults (50-60 years) showed stronger correlations at the Left Upper site due to age-related loss of elastic recoil. Gender-stratified analysis revealed stronger Left Lower correlations in males versus stronger Left Upper correlations in females.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing non-invasive, digital health tools for remote asthma monitoring and automated respiratory screening.

## Limitations

The observed correlations are moderate (r = 0.2 to 0.4), indicating that acoustic markers should be viewed as exploratory evidence rather than a direct replacement for spirometry.

## Related

- (link related pages by id as the wiki grows)
