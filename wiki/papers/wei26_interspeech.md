---
id: wei26_interspeech
category: health-clinical
institutions: ["Hunan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-46
pdf: https://www.isca-archive.org/interspeech_2026/wei26_interspeech.pdf
---

# Vowel Nasalization in Upper Airway Diseases: An Analysis Using the CUCO Database

*Yilan Wei, Qi Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/wei26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wei26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-46)

**Category:** `health-clinical`

**TL;DR** — This paper evaluates vowel nasalization acoustic measures (A1–P0 and A1–P1) on the CUCO database to analyze speech changes in upper airway disease patients before and after surgery, finding that A1–P0 and the high-vowel /u/ are significantly more sensitive to pathology and surgical intervention.

## Key contributions

- Systematically compares A1-P0 and A1-P1 spectral amplitude difference metrics across multiple upper airway pathologies (septoplasty, FESS, tonsillectomy) and healthy controls.
- Performs longitudinal tracking of speech across pre-surgery, 2 weeks post-surgery, and 3 months post-surgery time points.
- Demonstrates that vowel nasalization effects are heavily vowel-dependent, identifying /u/ as the most sensitive to resonance changes due to its constricted vocal tract configuration.
- Establishes that only the tonsillectomy group exhibits transient early postoperative nasalization changes that return to baseline by 3 months.

## Problem

Clinical speech analysis of upper airway diseases like allergic rhinitis or chronic rhinosinusitis has traditionally relied on general acoustic features like F0, jitter, shimmer, and HNR. Prior studies show these measures are frequently inconsistent or lack sensitivity because they reflect vocal fold vibration rather than nasal airflow restriction and nasal-oral resonance coupling. Furthermore, there is a lack of systematic, longitudinal evaluations connecting vowel nasalization directly to surgical interventions across different pathological types and vowel contexts.

## Method

The study uses the TDU subset of the CUCO database containing 107 Castilian Spanish speakers (26 controls, 29 septoplasty, 27 FESS, and 25 tonsillectomy patients) reading fixed sentences containing target VN (/e/, /u/) and CVN (/o/) structures. Phoneme alignment is performed using the Montreal Forced Aligner (MFA), followed by automated feature extraction of A1-P0 and A1-P1 spectral amplitude differences using a validated Praat script.

A1-P0 measures the difference between the first formant amplitude (A1) and the low-frequency spectral peak (P0) caused by nasal coupling (typically between H1 and H2). A1-P1 measures the difference between A1 and the nasal formant near 950 Hz (P1). Lower values indicate stronger nasalization. Cross-sectional group differences are evaluated via one-way ANOVA and Tukey HSD tests, while longitudinal trajectories are assessed using paired t-tests with Holm-Bonferroni corrections.

## Experimental setup

Evaluated on the TDU subset of the CUCO database consisting of 107 Castilian Spanish speakers across 4 groups (26 healthy controls, 29 septoplasty, 27 FESS, 25 tonsillectomy patients) recorded at pre-surgery, 2 weeks post-surgery, and 3 months post-surgery. Metrics include A1-P0 and A1-P1 in dB, analyzed using one-way ANOVA, Tukey HSD post-hoc tests, and paired t-tests with Holm-Bonferroni correction.

## Results

The A1-P0 metric successfully distinguished between pathological groups for the /u/ vowel (F = 4.287, p = 0.007), showing significantly lower (stronger nasalization) A1-P0 values in the septoplasty group (M = -8.81 dB) compared to FESS (M = -5.31 dB, p = 0.019, d = 0.693) and tonsillectomy (M = -5.27 dB, p = 0.016, d = -0.759). In contrast, the A1-P1 metric failed to yield any significant differences across pathological groups for all tested vowels (p > 0.10).

In longitudinal tracking, only the tonsillectomy group showed significant temporal shifts, displaying decreased nasalization (higher A1-P1 and A1-P0 values) at 2 weeks post-surgery (e.g., /u/ A1-P1 delta = 5.29 dB, p < 0.001, d = -1.023) before returning to baseline levels by 3 months. Septoplasty, FESS, and control groups showed no long-term or short-term longitudinal changes (p > 0.05).

| Patient Group / Condition | Vowel | A1-P0 Pre-Surgery Mean (dB) | Key Finding | | :--- | :--- | :--- | :--- | | Septoplasty | /u/ | -8.81 | Significantly lower A1-P0 than FESS and Tonsillectomy | | FESS | /u/ | -5.31 | No significant difference from controls | | Tonsillectomy | /u/ | -5.27 | Transient nasalization drop at 2 weeks post-op | | Healthy Controls | /u/ | -5.79 | Stable baseline reference |

## Limitations

The study is restricted to Castilian Spanish speech materials and a limited set of vowel and nasal contexts. The sample size per group is relatively small (25-29 patients), and evaluations are limited to three specific time points, potentially missing finer-grained intermediate healing dynamics.

## Why read this

Speech and medical researchers investigating clinical voice pathology will learn why traditional jitter/shimmer measures fail in upper airway disorders and how spectral amplitude metrics like A1-P0 provide a direct window into nasal-oral resonance coupling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical speech assessment, post-operative monitoring of upper airway surgeries, and objective voice pathology diagnostics.

## Institutions / 機構

Hunan University

## Related

- [Common Cold Corpus: Health-Aware Robustness Study of Modern Speaker Embeddings Under Physiological Domain Shift](hacker26_interspeech.md) — shared data / evaluation · relatedness 1.9/3
- [SpiroPhonia: Non-Invasive Respiratory Health Assessment from Spontaneous Speech](khanom26_interspeech.md) — same problem · relatedness 1.8/3
- [Synthetic Pathological Speech at Scale: A Flow Matching Approach for Clinical Data Augmentation](koudounas26_interspeech.md) — same problem · relatedness 1.8/3
- [Phy-VC: Physics-Informed Voice Conversion for Privacy-Preserving Pathological Speech](ghosh26_interspeech.md) — complementary · relatedness 1.7/3
- [What Does a Pathological Speech Assessment Model Know about Acoustic Features? A Case Study on Oral and Oropharyngeal Cancer Patients](nguyen26h_interspeech.md) — same problem · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
