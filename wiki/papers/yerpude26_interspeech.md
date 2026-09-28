---
id: yerpude26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2355
pdf: https://www.isca-archive.org/interspeech_2026/yerpude26_interspeech.pdf
---

# Attention-Based Multiple Instance Learning with Tabular Stacking for Ambulatory Detection of PVH and NPVH

[PDF](https://www.isca-archive.org/interspeech_2026/yerpude26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yerpude26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2355)

**TL;DR** — This paper proposes a dual-branch stacked architecture combining a tabular CatBoost model and a deep multiple instance learning model for ambulatory detection of vocal hyperfunction disorders, achieving rank 3 for PVH (AUC 0.891) and rank 1 for NPVH (AUC 0.861) on the NeckVibe Challenge 2026.

## Problem

Phonotraumatic (PVH) and nonphonotraumatic vocal hyperfunction (NPVH) result from excessive laryngeal muscle activity, but clinical assessment typically relies on limited laboratory recordings rather than ecological daily voice monitoring. While ambulatory accelerometers capture real-world voice behavior, the data is noisy and variable, and prior approaches mostly rely on hand-crafted summary features and shallow models with subject-level labels. Developing robust multi-scale methods that can effectively isolate informative segments and handle long-term distributional statistics is critical for early detection.

## Method

The system employs a stacked two-branch architecture combining a day-level tabular model and a deep multiple instance learning (MIL) model over short windows. The tabular branch uses CatBoost trained on day-aggregated robust statistics, interaction features, and explicitly encoded missingness indicators across multi-channel neck-surface accelerometer data. The MIL branch processes 12-second windows of 50 ms frames using a 1D residual network with squeeze-and-excitation modules, pooled via gated attention into subject-level representations. A logistic regression metaclassifier fuses rank-normalized probability outputs from both branches using 5-fold stratified GroupKFold cross-validation.

## Results

Evaluated on the NeckVibe Challenge 2026 dataset containing multi-day accelerometer recordings from 582 individuals, the method achieves an official test AUC of 0.891 for PVH and 0.861 for NPVH. In internal 5-fold cross-validation, the stacked ensemble achieves an OOF AUC of 0.886 for PVH and 0.756 for NPVH, consistently outperforming individual CatBoost and MIL branches. Ablations confirm that removing the MIL branch drops PVH AUC by 0.010, while omitting interaction features or day-level stats hurts NPVH performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and speech-language pathologists can use this system for automated, continuous, privacy-preserving ambulatory monitoring and early detection of vocal hyperfunction disorders from wearable accelerometer sensors.

## Limitations

NPVH predictions exhibit notable undercalibration due to greater intra-class diversity and severe class imbalance.

## Related

- (link related pages by id as the wiki grows)
