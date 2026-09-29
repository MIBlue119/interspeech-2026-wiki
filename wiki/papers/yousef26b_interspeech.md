---
id: yousef26b_interspeech
category: health-clinical
labels: [dataset-or-benchmark-release]
institutions: ["Massachusetts General Hospital", "Harvard Medical School", "Universidad Tecnica Federico Santa Maria", "University of Central Florida"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3049
pdf: https://www.isca-archive.org/interspeech_2026/yousef26b_interspeech.pdf
---

# The Interspeech 2026 NeckVibe Challenge: Voice Disorder Detection via Real-World Monitoring of Neck-Surface Vibration

*Ahmed Yousef, Robert Hillman, Jarrad Van Stan, Matías Zañartu, Hamzeh Ghasemzadeh, Ben Kevelson, Daryush Mehta*

[PDF](https://www.isca-archive.org/interspeech_2026/yousef26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yousef26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3049)

**Category:** `health-clinical` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The Interspeech 2026 NeckVibe Challenge released 46,400 hours of week-long ambulatory smartphone-accelerometer voice data to detect vocal hyperfunction, yielding test AUCs up to 0.93 for phonotraumatic voice disorders and 0.86 for nonphonotraumatic disorders.

## Key contributions

- Released the largest real-world ambulatory voice monitoring dataset to date, comprising 46,400 hours from 582 participants across one week of daily activities.
- Benchmarked two distinct clinical binary classification tasks: phonotraumatic voice hyperfunction (PVH) and nonphonotraumatic voice hyperfunction (NPVH) detection.
- Demonstrated that preserving within-day temporal structure and utilizing frame-to-frame dynamic deltas (delta and delta-delta) and feature ratios significantly improves PVH classification.
- Revealed that NPVH detection is inherently more difficult, benefiting more from global subject-level distribution metrics and context separation (speech versus singing) than within-day variability.

## Problem

Clinic-based voice evaluations capture only brief snapshots that fail to represent real-world communicative and environmental voice usage, hiding the behavioral triggers of vocal hyperfunction (VH). Prior ambulatory monitors relied on summary-only logging due to on-device memory constraints, discarding the raw dynamics of neck skin-surface vibrations. Furthermore, existing models primarily used simple linear classifiers instead of leveraging rich temporal structures, leaving a major gap in reliably detecting both phonotraumatic (PVH) and nonphonotraumatic (NPVH) forms of VH from continuous tracking.

## Method

The challenge dataset was captured using a smartphone system coupled to a lightweight uniaxial accelerometer (Knowles BU-27135) mounted below the thyroid prominence, recording neck-surface vibrations at 11,025 Hz (16-bit). Data were processed into 50 ms non-overlapping frames yielding 14 voice measures across three tiers: estimated SPL (via microphone-ACC linear regression), raw waveform features (ACC magnitude, CPP, H1-H2, spectral tilt, low-to-high power ratio), and model-based impedance-based inverse filtering (IBIF) glottal airflow features (e.g., HRF, MFDR, open/speed/closing quotients).

Top-performing teams adopted contrasting architectural paradigms. For PVH detection, winning teams leveraged regularized XGBoost or logistic regression operating on windowed time-series samples or engineered dynamic sequences—calculating frame-to-frame deltas (delta and delta-delta), coefficient-of-variation-like ratio features (e.g., standard-deviation-to-mean ratios), and feature-to-feature ratios like CPP-to-H1–H2. Conversely, top NPVH entries used hybrid systems combining CatBoost on global daily/subject distribution metrics (such as Bowley's skewness, Crowley's kurtosis, Gini, and entropy) with Multiple Instance Learning (MIL) networks using attention pooling across multi-channel frame matrices.

Training recipes strictly enforced subject-level splits (80% train, 20% test across 468 vs 114 subjects) using Stratified Group K-Fold cross-validation to prevent data leakage. Inference involved day-level probability pooling averaged per subject to predict binary diagnostic status.

## Experimental setup

Evaluated on 46,400 hours of ambulatory data from 582 individuals (213 PVH, 169 PVH controls, 116 NPVH, 84 NPVH controls), averaging 11.25 hours per waking day over a week. Baselines consisted of standard logistic regression models using basic frame summary statistics (mean, median, SD, IQR, 5th/95th percentiles), yielding AUCs of 0.82 for PVH and 0.78 for NPVH. Metrics reported include area under the ROC curve (AUC), accuracy, sensitivity, specificity, and F1-score.

## Results

For Task 1 (PVH detection), all six competing teams surpassed the 0.82 baseline, with the top submission achieving an AUC of 0.925 (Team SR) and 0.917 (Team DD) at 84% accuracy, 79% sensitivity, and 88% specificity. Ablations demonstrated that feature-to-feature ratios (AUC 0.89) outperformed pure dynamic (0.87) and static (0.85) features, and ratio-enhanced logistic regression outperformed complex tree ensembles for certain teams. 

For Task 2 (NPVH detection), four teams exceeded the 0.78 baseline, achieving a top AUC of 0.861 (Teams SM and VA). However, NPVH was substantially harder, with lower-ranked teams dropping to AUCs of 0.579 and 0.633. Unlike PVH, NPVH models did not benefit from within-day variability features, relying instead on global distributional summaries and multi-task context separation.

| System / Condition | AUC | Acc (%) | Sens (%) | Spec (%) | F1 (%) |
|---|---|---|---|---|---|
| Baseline (PVH) | 0.820 | - | - | - | - |
| Team SR (PVH) | 0.925 | 84.2 | 78.6 | 87.5 | 78.6 |
| Team DD (PVH) | 0.917 | 84.2 | 78.6 | 87.5 | 78.6 |
| Baseline (NPVH) | 0.780 | - | - | - | - |
| Team SM (NPVH) | 0.861 | 82.5 | 78.3 | 83.5 | 64.3 |
| Team VA (NPVH) | 0.861 | 80.7 | 47.8 | 89.0 | 50.0 |

## Limitations

The dataset suffers from a significant sex imbalance with a heavy female predominance, reflecting the clinical population but limiting immediate generalizability to male cohorts. The challenge setup provided pre-extracted time-series feature files rather than raw accelerometer waveforms, preventing exploration of end-to-end raw-signal deep representation learning. Furthermore, disease severity was mostly mild-to-moderate, which hindered separability for nonphonotraumatic cases.

## Why read this

Speech and ML researchers focusing on wearable healthcare and bioacoustic modeling should read this to understand how to design robust temporal dynamics, feature ratios, and multi-instance learning architectures for week-long ambulatory sensor streams.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated remote screening, personalized diagnostic tracking, and real-time biofeedback systems for vocal hyperfunction and occupational voice disorders.

## Institutions / 機構

Massachusetts General Hospital, Harvard Medical School, Universidad Tecnica Federico Santa Maria, University of Central Florida

**Funding / 經費:** National Institutes of Health, National Institute on Deafness and Other Communication Disorders

## Related

- [A Hierarchical Feature Engineering Framework for Automated Classification of Phonotraumatic and Non-Phonotraumatic Vocal Hyperfunction](kim26x_interspeech.md) — same problem · relatedness 2.9/3
- [Temporal Partitioning of Vocal Activity for Detecting Vocal Hyperfunction from Neck-Surface Accelerometer Data](azarski26_interspeech.md) — same problem · relatedness 2.9/3
- [Attention-Based Multiple Instance Learning with Tabular Stacking for Ambulatory Detection of PVH and NPVH](yerpude26_interspeech.md) — shared data / evaluation · relatedness 2.9/3
- [Measuring Vocal Efficiency in Daily Life in Patients with Voice Disorders Using Wireless Accelerometer and Microphone Sensors](yousef26c_interspeech.md) — same problem · relatedness 2.2/3
- [Modeling Lombard Effects in Voice Disorders Using Daily-Life Monitoring of Ambient Noise and Voice Acoustics](yousef26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
