---
id: truong26_interspeech
category: speech-deepfake-detection
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1098
pdf: https://www.isca-archive.org/interspeech_2026/truong26_interspeech.pdf
---

# QAMO: Quality-aware Multi-centroid One-class Learning For Speech Deepfake Detection

*Duc-Tuan Truong, Tianchi Liu, Ruijie Tao, Junjie Li, Kong Aik Lee, Eng Siong Chng*

[PDF](https://www.isca-archive.org/interspeech_2026/truong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/truong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1098)

**TL;DR** — QAMO improves speech deepfake detection by replacing single-centroid one-class learning with multiple quality-aware centroids, achieving a 5.21% Equal Error Rate (EER) on the In-the-Wild dataset.

## Key contributions

- Proposes Quality-Aware Multi-Centroid One-Class Learning (QAMO) to model intra-class variability in bona fide speech across distinct speech quality levels.
- Formulates a quality classification loss using discrete Mean Opinion Score (MOS) thresholds to supervise and prevent centroid collapse.
- Introduces a softmax-weighted ensemble scoring inference strategy that removes the need for explicit quality labels at test time while stabilizing decision margins.
- Demonstrates robust generalization across multiple deepfake benchmarks, including ASVspoof2021 DF and In-the-Wild.

## Problem

Traditional speech deepfake detection treats spoofing detection as a binary classification task, which tends to overfit known attack types and fails to generalize to unseen fakes. While single-centroid one-class learning (OC-Softmax) helps model a compact distribution around genuine speech, it oversimplifies genuine speech by forcing it into a unimodal distribution and ignores useful cues like naturalness and quality. Prior multi-centroid attempts (such as SAMO) group by speaker identity which is often unavailable and risks centroid collapse without explicit classification supervision.

## Method

QAMO establishes multiple learnable bona fide centroids corresponding to discrete speech quality levels (e.g., low and high quality, separated by an MOS threshold tau = 2.5 estimated using the Scoreq MOS predictor). These centroids are supervised exclusively on bona fide samples using an AM-Softmax quality classification objective with scale factor s = 20 and margin m = 0.4. 

For deepfake detection, QAMO extends the OC-Softmax loss by computing cosine similarity distances against the specific quality centroid for bona fide inputs, while penalizing the maximum similarity across all centroids for spoof inputs using margins m0 = 0.9 (bona fide) and m1 = 0.2 (spoof), scaled by alpha = 20. The final multi-task training loss combines the QAMO loss with the quality classification objective weighted by lambda = 0.1.

At inference time, rather than requiring an external MOS predictor, QAMO applies an ensemble-score inference strategy that computes a softmax-weighted sum of similarities across all quality-aware centroids. This avoids the hard assignment vulnerabilities and instability of max-score inference by emphasizing the most compatible quality level while aggregating evidence across all centroids at negligible computational overhead.

## Experimental setup

Evaluated on ASVspoof2019 LA (training/validation), ASVspoof2021 LA, ASVspoof2021 DF, In-the-Wild (ITW), and Fake-or-Real (FoR) norm-test subsets. Compared against baselines including XLSR-Conformer, XLSR-Mamba, XLSR-Conformer-NAC, XLSR-Nes2NetX, and XLSR-Conformer-TCM trained with Weighted Cross-Entropy (WCE) or OC-Softmax. Uses Equal Error Rate (EER) as the primary evaluation metric and applies RawBoost configuration 4 for on-the-fly data augmentation, mapping augmented data to the low-quality group.

## Results

When built on XLSR-Conformer-TCM, QAMO achieves an EER of 2.53% on ASVspoof2021 LA, 1.63% on ASVspoof2021 DF, 5.21% on In-the-Wild (ITW), and 3.45% on FoR, outperforming standard WCE and OC-Softmax baselines. When built on XLSR-Nes2NetX, QAMO yields 2.29% EER on ASVspoof2021 LA and 1.60% on ASVspoof2021 DF. Ablations demonstrate that removing the quality classification loss causes feature centroids to collapse and degrades DF/ITW performance, while max-score inference underperforms compared to the softmax-weighted ensemble scoring.

| System | 21LA EER(%) | 21DF EER(%) | ITW EER(%) | FoR EER(%) |
|---|---|---|---|---|
| XLSR-Conformer-TCM (WCE) | 1.37 | 2.39 | 7.13 | 5.70 |
| XLSR-Conformer-TCM (OC-Softmax) | 1.75 | 1.89 | 6.72 | 5.65 |
| XLSR-Conformer-TCM + QAMO (ours) | 2.53 | 1.63 | 5.21 | 3.45 |
| XLSR-Nes2NetX (WCE) | 3.90 | 2.76 | 9.76 | 10.12 |
| XLSR-Nes2NetX (OC-Softmax) | 3.36 | 2.29 | 8.23 | 3.97 |
| XLSR-Nes2NetX + QAMO (ours) | 2.29 | 1.60 | 8.83 | 4.90 |

## Limitations

The framework relies on a pre-trained MOS estimator (Scoreq) to establish quality thresholds, which introduces dependency on the accuracy of the quality predictor. The mapping of data augmentations directly to low-quality groups is an empirical heuristic rather than a direct measurement. Furthermore, QAMO does not universally dominate single-centroid baselines across all datasets, underperforming OC-Softmax slightly on the ITW and FoR datasets when paired with the XLSR-Nes2NetX backbone.

## Why read this

Speech anti-spoofing researchers looking to improve one-class learning generalization against unseen deepfakes should read this to see how multi-centroid quality modeling and ensemble-score inference can stabilize decision boundaries without heavy inference-time overhead.

## Code

- https://github.com/ductuantruong/QAMO

## Applications

Speech deepfake detection, audio forensics, speaker anti-spoofing systems for voice-controlled interfaces.

## Related

- (link related pages by id as the wiki grows)
