---
id: kumar26g_interspeech
category: health-clinical
institutions: ["Indian Institute of Science", "St. Johns National Academy of Health Sciences"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2602
pdf: https://www.isca-archive.org/interspeech_2026/kumar26g_interspeech.pdf
---

# An auscultation location specific study on the relationship between expiratory-to-inspiratory acoustic patterns and spirometric airflow limitation across age and gender in asthmatic patients

*Dheeraj Harish Kumar, Sanjana MC, Perumal Keerthi Priya, K V Nikhath Khanam, Uma Maheshwari Krishnaswamy, Prasanta Kumar Ghosh*

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2602)

**Category:** `health-clinical`

**TL;DR** — This study investigates how the expiratory-to-inspiratory (E/I) spectral power ratio correlates with spirometric airflow limitation (FEV1/FVC) in asthma patients across different posterior auscultation sites, age groups, and genders. Results reveal that mid-frequency bands (100-400 Hz) yield significant correlations, with optimal auscultation locations shifting systematically across age and gender subgroups.

## Key contributions

- Analyzes location-specific respiratory acoustic patterns across four posterior chest sites (Left Lower, Left Upper, Right Lower, Right Upper) relative to FEV1/FVC in 141 clinically diagnosed asthma patients.
- Demonstrates that mid-frequency subbands (100-200 Hz and 200-400 Hz) consistently yield significantly stronger correlations with spirometric airflow limitation than broadband (0-800 Hz) or higher-frequency (400-800 Hz) ranges.
- Identifies age-dependent spatial shifts in acoustic-spirometric correlations, showing that younger adults (20-30 years) exhibit stronger associations at lower posterior sites, whereas older adults (50-60 years) show stronger correlations at upper posterior sites.
- Uncovers gender-stratified differences in optimal auscultation locations, with males showing stronger correlations at the Left Lower site and females showing stronger correlations at the Left Upper site.

## Problem

Spirometry is the clinical gold standard for monitoring asthma severity by measuring parameters such as FEV1/FVC to quantify expiratory airflow limitation. However, the forced expiratory maneuver requires high patient effort and cooperation, making it difficult to reliably execute in elderly individuals and children. While prior studies established that the expiratory-to-inspiratory (E/I) spectral power ratio correlates with airflow obstruction, they overlooked how demographic factors like age and gender, combined with specific auscultation locations, influence these acoustic markers. This work addresses this gap to determine if non-invasive respiratory sound analysis can reliably mirror physiological airflow limitation across diverse demographic cohorts.

## Method

Respiratory sounds were recorded using a Littmann CORE digital stethoscope at 4 kHz across four posterior chest auscultation locations (Left Upper, Left Lower, Right Upper, Right Lower), capturing 5 breath cycles per location per participant. Manual annotations segmented recordings into inspiration and expiration phases. Short-Time Fourier Transform (STFT) was applied using a 2048-sample Hanning window ($N=2048$) and a 512-sample hop length ($H=512$). Band-limited spectral power was calculated across four frequency ranges (0-800 Hz, 100-200 Hz, 200-400 Hz, and 400-800 Hz) by averaging squared STFT magnitudes over time frames and frequency bins within each band. The expiratory-to-inspiratory (E/I) ratio was computed per breath cycle, and subject-level representations were derived by taking the median of five breath cycles to mitigate motion artifacts and posture variations.

Spearman's rank correlation coefficient ($
ho$) was used to evaluate the monotonic relationship between the median E/I ratio and clinical FEV1/FVC values across age brackets (20-30, 30-40, 40-50, 50-60 years) and genders. Mid-frequency bands (100-400 Hz) were emphasized because 0-100 Hz contains cardiac and muscle noise while frequencies above 400 Hz feature reduced airflow-dependent acoustic energy. The spatial shifts observed with aging are attributed to physiological changes such as reduced lung elastic recoil and increased closing volume, leading to premature small airway closure in lower lung bases.

## Experimental setup

The dataset comprises 141 clinically verified asthma participants (66 males, 75 females, aged 20-60 years, yielding 2,815 total breath cycles) collected at St. John's National Academy of Health Sciences, Bangalore. Spirometric FEV1/FVC ratios ranged from 51% to 99%. The framework analyzes four posterior auscultation locations across four frequency bands using Spearman correlation, testing against a significance threshold of $\alpha = 0.05$.

## Results

Across all participants, the Left Lower site showed the strongest correlations with FEV1/FVC in the 100-200 Hz ($\rho$ peaking significantly) and 0-800 Hz bands. Frequency band analysis confirmed that the 100-200 Hz and 200-400 Hz bands consistently outperformed the 400-800 Hz and broadband 0-800 Hz ranges. In age-stratified evaluations, younger adults (20-30) exhibited strongest correlations at lower posterior sites (Left/Right Lower), whereas older adults (50-60) shifted entirely to the Left Upper site across all frequency bands (reaching statistical significance in 200-400 Hz and 400-800 Hz). In gender-stratified analyses, males demonstrated peak significant correlations at the Left Lower site across all bands, while females peaked consistently at the Left Upper site. Overall correlations were moderate ($\rho = 0.2$ to $0.4$).

| Condition / Subgroup | Optimal Auscultation Site | Best Frequency Band | Observed Trend |
|---|---|---|---|
| All Participants ($n=141$) | Left Lower | 100-200 Hz | Strongest association with FEV1/FVC |
| Age 20–30 years | Left Lower / Right Lower | 100-400 Hz | Lower posterior dominance |
| Age 50–60 years | Left Upper | 200-800 Hz | Shift to upper posterior dominance |
| Male Subgroup | Left Lower | All bands | Consistent lower-site correlation |
| Female Subgroup | Left Upper | All bands | Consistent upper-site correlation |

## Limitations

The study is limited by a moderate sample size ($n=141$) concentrated in a single clinical center, restricting broad demographic generalization. The observed Spearman correlations are moderate ($
ho = 0.2$ to $0.4$), meaning E/I ratios serve as exploratory indicators rather than a direct replacement for clinical spirometry. Furthermore, age-group comparisons represent within-group trends as formal cross-age statistical comparisons were not conducted, and the dataset lacks longitudinal tracking of disease progression.

## Why read this

Researchers and biomedical engineers working on non-invasive respiratory diagnostics or acoustic biomarkers of pulmonary disease should read this to understand how anatomical, age, and gender variations impact lung sound transmission. It provides concrete evidence that optimal auscultation sites for asthma assessment are demographic-dependent rather than universal.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of non-effort-dependent, age- and gender-aware digital stethoscope screening tools and machine learning classifiers for automated asthma severity assessment.

## Institutions / 機構

Indian Institute of Science, St. Johns National Academy of Health Sciences

**Funding / 經費:** Department of Science and Technology

## Related

- [AuscuTSLM: Patient-Level Multimodal Question Answering from Multi-Site Auscultation Recordings](wu26j_interspeech.md) — same problem · relatedness 1.7/3
- [SpiroPhonia: Non-Invasive Respiratory Health Assessment from Spontaneous Speech](khanom26_interspeech.md) — same problem · relatedness 1.6/3
- [Lung-SRAD: Spectral-Aware Regularized Audio DASS with Dual-Axis Patch-Mix Contrastive Learning for Respiratory Sound Classification](shridhar26_interspeech.md) — same problem · relatedness 1.6/3
- [Quality Adaptive Angular Margin Learning for Respiratory Sound Classification](kim26k_interspeech.md) — same problem · relatedness 1.5/3
- [Zero-Shot Respiratory Sound Classification through LLM-Augmented Audio-Text Alignment](ilerisoy26_interspeech.md) — same problem · relatedness 1.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
