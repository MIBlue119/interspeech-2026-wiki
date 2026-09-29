---
id: constantin26_interspeech
category: health-clinical
labels: [multilingual]
institutions: ["University College Dublin", "Universidad de Burgos", "Hospital Universitario of Burgos", "Institute of Psychiatry and Neurology", "Military Institute of Aviation Medicine", "Cardiff University", "North Bristol NHS Trust", "King's College London"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2654
pdf: https://www.isca-archive.org/interspeech_2026/constantin26_interspeech.pdf
---

# A multilingual composite speech index to assess passage reading in Huntington’s disease

*Valentina G. Constantin, Vitoria S. Fahed, Emer P. Doheny, Ruth Filan, Carla Collazo, Joanna Krzysztofik, Elliot Mann, Philippa Morgan-Jones, Laura Mills, Cheney Drew, Anne E. Rosser, Rebecca Cousins, Grzegorz Witkowski, Esther Cubo, Monica Busse, Madeleine M. Lowery*

[PDF](https://www.isca-archive.org/interspeech_2026/constantin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/constantin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2654)

**Category:** `health-clinical` · **Labels:** `multilingual`

**TL;DR** — This paper introduces a multilingual composite temporal speech index (CTSI) derived from automated passage reading analysis to assess motor and cognitive progression in Huntington's disease, achieving strong correlations with standard clinical rating scales across English, Polish, and Spanish cohorts.

## Key contributions

- Developed a fully automated speech analysis pipeline using Teager-Kaiser Energy Operator (TKEO) envelopes and adaptive Otsu-based thresholding to detect voiced bursts and pauses across multilingual audio data.
- Proposed a language-standardized composite temporal speech index (CTSI) that effectively overcomes language and passage disparities to pool multi-site data.
- Demonstrated strong linear correlations between the CTSI and key clinical metrics in Huntington's disease, including composite UHDRS (r = -0.74) and cognitive processing speed via SDMT (r = -0.77).
- Evaluated the method across 89 HD patients and 82 matched controls spanning three distinct languages (English, Polish, and Spanish).

## Problem

Huntington's disease (HD) causes heterogeneous speech alterations driven by neurodegeneration in the basal ganglia, making automated digital speech measures highly attractive for tracking disease progression. However, prior studies have typically been single-language or struggled to pool multilingual datasets because passage-reading materials, linguistic structures, and baseline speech rates vary considerably. Furthermore, detecting subtle cognitive changes—which often emerge years before formal HD diagnosis—requires high-cognitive-load tasks like passage reading rather than simple phonation, necessitating robust, cross-lingually invariant biomarkers.

## Method

Audio recordings were captured using mobile devices positioned 5 cm away while participants read language-specific passages three times (Rainbow Passage in English, North Wind and the Sun in Polish, and a doctor-themed passage in Spanish). Signals were band-pass filtered (10 Hz-5 kHz) using a zero-phase 4th-order Butterworth filter, downsampled, and mean-subtracted. Voiced activity bursts were extracted via the Teager-Kaiser Energy Operator (TKEO) envelope, rectified, smoothed, and processed with a 10 Hz low-pass filter. An adaptive threshold calculated via Otsu's method on 50 ms windows (75% overlap) segmented onsets and offsets, filtering out false positives using a noise-area ratio.

From these detected segments, 10 temporal features were computed (including Total Speech Time, Net Speech Time, Total Pause Time, Mean Burst Duration, Net Burst Rate, and Number of Pauses). Linear mixed models with language and sex as fixed effects and participant intercept as a random effect identified features robust across tongues. Six features showing consistent, significant group differences across all three languages were z-score standardized against language-matched control groups, directionally aligned, and averaged to formulate the final CTSI per subject. Ordinary least squares linear regression was subsequently used to measure correlations against clinical scores.

## Experimental setup

The dataset comprised 89 genetically confirmed HD patients (pre-manifest and manifest stages) and 82 sex- and age-matched healthy controls across English (24 controls, 29 HD), Polish (23 controls, 24 HD), and Spanish (35 controls, 36 HD) cohorts. Recordings were sampled at 44.1 or 48 kHz using Android mobile devices (Samsung Galaxy Tab A6, Huawei Mate 10 lite, Samsung A51) and analyzed using Python 3.11.9 and RStudio 4.5.1. Evaluation metrics included Pearson's correlation coefficient against the composite Unified Huntington’s Disease Rating Scale (cUHDRS), Symbol Digit Modality Test (SDMT), Stroop Word Reading Test (SWRT), and Total Motor Score (TMS), applying Benjamini-Hochberg and Bonferroni corrections.

## Results

Linear mixed models revealed significant differences between HD patients and controls across all 10 temporal features, with TST, NST, TPT, and nP exhibiting significant group-language interactions. Post-hoc analysis isolated 6 core features (TST, NST, TPT, MBD, NBR, and nP) that consistently discriminated HD participants from controls across English, Polish, and Spanish (p < 0.05 to p < 0.001). The resulting CTSI showed strong, statistically significant correlations (p < 0.001) with clinical evaluation metrics: r = -0.74 for cUHDRS, r = -0.77 for SDMT, r = -0.70 for SWRT, and r = 0.64 for TMS. The index demonstrated the highest sensitivity toward cognitive processing speed (SDMT) and the lowest (though still strong) toward pure motor function (TMS).

| Clinical Metric | Correlation with CTSI (r) | Corrected p-value |
|---|---|---|
| Symbol Digit Modality Test (SDMT) | -0.77 | < 0.001 |
| Composite UHDRS (cUHDRS) | -0.74 | < 0.001 |
| Stroop Word Reading Test (SWRT) | -0.70 | < 0.001 |
| Total Motor Score (TMS) | 0.64 | < 0.001 |

## Limitations

The study relies on a relatively small cohort size (89 HD patients total split unevenly across three languages), limiting generalizability to broader populations and more diverse dialects. Different reading passages were used across languages (Rainbow Passage for English versus North Wind and the Sun for Polish), which introduces confounding textual and linguistic complexity despite normalization. The evaluation scope is restricted to read speech, leaving spontaneous speech and dialogue unverified under this specific index framework.

## Why read this

Researchers and clinical engineers working on digital biomarkers for neurodegenerative diseases should read this paper to learn how to construct language-agnostic composite speech indices via control-group z-score standardization, enabling multi-site and multilingual clinical trial data pooling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated remote monitoring of neurodegenerative disease progression, clinical trial endpoint stratification, and early screening for cognitive impairment via smartphone speech recordings.

## Institutions / 機構

University College Dublin, Universidad de Burgos, Hospital Universitario of Burgos, Institute of Psychiatry and Neurology, Military Institute of Aviation Medicine, Cardiff University, North Bristol NHS Trust, King's College London

**Funding / 經費:** EU Joint Programme - Neurodegenerative Disease Research, Research Ireland

## Related

- (link related pages by id as the wiki grows)
