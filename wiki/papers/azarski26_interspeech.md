---
id: azarski26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1435
pdf: https://www.isca-archive.org/interspeech_2026/azarski26_interspeech.pdf
---

# Temporal Partitioning of Vocal Activity for Detecting Vocal Hyperfunction from Neck-Surface Accelerometer Data

[PDF](https://www.isca-archive.org/interspeech_2026/azarski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/azarski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1435)

**TL;DR** — An ensemble machine learning framework using temporal partitioning of ambulatory neck-surface accelerometer recordings won 1st place in the NeckVibe Challenge for detecting phonotraumatic vocal hyperfunction with an AUC of 0.925.

## Problem

Vocal hyperfunction involves chronic muscular misuse and is split into phonotraumatic (PVH, involving structural lesions like nodules) and nonphonotraumatic (NPVH, involving muscle tension dysphonia) variants. Detecting these conditions accurately from ambulatory neck-surface accelerometer data remains challenging due to intra-day behavioral variability and the limitation of relying solely on full-day aggregated statistics. Overcoming this is crucial for enabling non-invasive, continuous clinical assessment and real-time biofeedback.

## Method

The system processes neck-surface accelerometer signals into 50 ms frame-level features including fundamental frequency, sound pressure level, spectral tilt, cepstral peak prominence, and inverse filtering glottal airflow metrics. For PVH detection, the authors implement two parallel strategies: an XGBoost model fed by statistics extracted across ten daily time segments, and a Logistic Regression classifier fed by separate speech and singing features grouped into four non-overlapping intervals. The final PVH prediction is an unweighted average ensemble of both models. For NPVH detection, an XGBoost model processes features extracted from optimized 5-minute segments using 90th percentile statistics to capture intermittent high-intensity tension states.

## Results

Evaluated on the NeckVibe Challenge dataset comprising 582 total individuals using Leave-One-Group-Out cross-validation, the PVH ensemble model achieved a subject-level ROC AUC of 0.891 and an accuracy of 0.840 (with the official challenge test set reaching an AUC of 0.925). On the official challenge test set, the NPVH model achieved a ROC AUC of 0.820, outperforming baseline and state-of-the-art benchmarks. Simpler classic neural network architectures like MLPs, CNNs, and LSTMs were evaluated but suffered from severe overfitting due to the limited subject sample size.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Healthcare engineers and clinicians developing wearable, non-invasive diagnostic tools and ambulatory biofeedback systems for continuous monitoring of voice disorders.

## Limitations

Neural network architectures suffered from severe overfitting caused by the limited number of distinct subjects in the dataset.

## Related

- (link related pages by id as the wiki grows)
