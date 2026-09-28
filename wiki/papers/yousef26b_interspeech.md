---
id: yousef26b_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3049
pdf: https://www.isca-archive.org/interspeech_2026/yousef26b_interspeech.pdf
---

# The Interspeech 2026 NeckVibe Challenge: Voice Disorder Detection via Real-World Monitoring of Neck-Surface Vibration

[PDF](https://www.isca-archive.org/interspeech_2026/yousef26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yousef26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3049)

**TL;DR** — The Interspeech 2026 NeckVibe Challenge released a 46,400-hour ambulatory voice dataset for detecting vocal hyperfunction (VH) from neck-surface accelerometer data, with top teams achieving an AUC of 0.93 for phonotraumatic VH and 0.86 for nonphonotraumatic VH.

## Problem

Brief clinic evaluations capture only isolated snapshots of voice use, failing to reflect how patients behave in real-world communicative and environmental contexts. While wearable neck-surface accelerometers enable continuous ambulatory tracking of vocal behavior, standard summary-only approaches miss rich temporal dynamics, making it difficult to accurately diagnose voice disorders like phonotraumatic and nonphonotraumatic vocal hyperfunction.

## Method

The challenge dataset includes 582 individuals (51,400 total hours across training and held-out test splits) monitored over one week using a smartphone-connected uniaxial neck accelerometer and auxiliary microphone calibration. Teams processed 50 ms voiced frames across 14 time-series features (including estimated SPL, waveform descriptors like CPP and spectral tilt, and model-based glottal airflow measures via impedance-based inverse filtering). Top-performing submissions engineered advanced representations such as within-day temporal windows, frame-to-frame change sequences (deltas and double deltas), feature-to-feature ratios, and distributional statistics, training nonlinear classifiers (such as regularized XGBoost and CNN-MIL architectures) rather than simple linear baselines.

## Results

Evaluated on a held-out test set comprising 20% of the cohort, Task 1 (phonotraumatic VH detection) saw all participating teams outperform the 0.82 baseline, with the top entry achieving an AUC of 0.93, 84% accuracy, 79% sensitivity, and 88% specificity. Task 2 (nonphonotraumatic VH detection) proved more challenging, with four teams beating the 0.78 baseline and top submissions reaching an AUC of 0.86. Ablations and top models revealed that capturing within-day variability and ratio features significantly boosted phonotraumatic VH detection, whereas nonphonotraumatic VH detection relied more on global subject-level distributions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, clinicians, and researchers can use these ambulatory models and datasets for remote voice disorder diagnosis, continuous vocal health monitoring, and personalized voice therapy management.

## Limitations

The dataset exhibits a sex imbalance with a predominance of female participants, and analysis was restricted to pre-extracted time-series features rather than raw accelerometer waveforms.

## Related

- (link related pages by id as the wiki grows)
