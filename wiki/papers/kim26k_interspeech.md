---
id: kim26k_interspeech
category: health-clinical
labels: [robustness-noise]
institutions: ["MODULABS", "Wonkwang University"]
code: https://github.com/RSC-Toolkit/QLung
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1213
pdf: https://www.isca-archive.org/interspeech_2026/kim26k_interspeech.pdf
---

# Quality Adaptive Angular Margin Learning for Respiratory Sound Classification

*Yoon Tae Kim, Heejoon Koo, Miika Toikkanen, June-Woo Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1213)

**Category:** `health-clinical` · **Labels:** `robustness-noise`

**TL;DR** — QLung introduces a quality-adaptive angular-margin learning framework for respiratory sound classification that dynamically adjusts margins based on audio spectral entropy and RMS energy. It achieves a 62.01% score on the ICBHI dataset (a 2.46% absolute improvement over the cross-entropy baseline) and superior out-of-distribution performance on the SPRSound dataset.

## Key contributions

- First application of angular margin-based learning to respiratory sound classification (RSC) to handle acoustically overlapping events and severe class imbalance.
- Proposed a dual-factor angular margin (DFAM) combining a no-reference audio quality score (AQS) and a log-scaled class-imbalance margin for stable training under data variability.
- Designed an angular classifier that normalizes features and class weights to unit hyperspheres to enforce strict angular similarity decision boundaries.
- Achieved state-of-the-art out-of-distribution performance on the SPRSound dataset (59.80% score) while improving standard ICBHI benchmark results across different backbones.

## Problem

Publicly available respiratory sound classification datasets like ICBHI suffer from variable recording quality, noise, and severe class imbalance, where normal cases dominate and abnormal events like crackles and wheezes frequently overlap (the 'both' class). Standard cross-entropy training on unconstrained features risks amplifying background noise and forming ambiguous decision boundaries that fail to generalize. Prior mitigation strategies primarily rely on heavy data augmentations or metadata guidance, leaving feature representation vulnerability to real-world clinical noise and distribution shifts unaddressed.

## Method

The framework utilizes an audio encoder (AST or Audio-CLAP) followed by an angular classifier that L2-normalizes both the feature vectors x and the class weight vectors w_k, ensuring inner products represent pure cosine similarities mapped via a fixed scale s_a. To handle recording variability, a no-reference Audio Quality Score (AQS) is computed by combining normalized spectral entropy H_norm and RMS energy R_norm with coefficients alpha=0.7 and beta=0.3, producing an audio quality margin mq = kappa * AQS where kappa=0.5.

To handle severe class imbalance without tail explosion, a log-scaled class-imbalance margin mc is formulated using the logarithmic inverse class frequency scaled by uniform anchor parameters. Dual Factor Angular Margin Regularization (DFAM) combines mq and mc via a relative weighting parameter gamma=0.5, forming a composite margin md = gamma * mq + (1 - gamma) * mc. This margin is injected as an additive angular penalty on the target class angle during training.

The unified training objective optimizes a combination of standard cross-entropy loss and the DFAM loss weighted by lambda=0.4. During inference, feature normalization forces decision-making purely based on angular proximity, producing compact, well-separated clusters even for co-occurring respiratory abnormalities.

## Experimental setup

Evaluated on the ICBHI 2017 dataset (~5.5 hours, 6,898 cycles split 60-40 into 4,142 train and 2,756 test samples across 4 classes) and the SPRSound dataset (out-of-distribution evaluation across 7 mapped classes). Backbones tested include Audio Spectrogram Transformer (AST) and Audio-CLAP. Models were trained using the Adam optimizer with a learning rate of 5e-5, batch size of 8, and trained for 50 epochs over 5 random seeds, using specificity (Sp), sensitivity (Se), and their arithmetic mean (Score) as evaluation metrics.

## Results

QLung on AST improved the ICBHI Score from 59.55% (CE baseline) to 62.01% (Sp: 81.90%, Se: 42.12%), while QLung on Audio-CLAP reached 63.39% Score (Sp: 81.98%, Se: 44.81%). In the out-of-distribution SPRSound evaluation, QLung on Audio-CLAP dominated prior architectures, achieving a headline Score of 59.80% (Sp: 74.71%, Se: 44.88%), outperforming BTS (53.42%) and Patch-Mix CL (51.01%). Ablations show that adding the fixed angular margin, audio quality margin, and class-imbalance margin incrementally raised the AST baseline Score from 59.55% to 60.47%, 60.56%, and finally 62.01% with the full angular classifier.

| System | Sp (%) | Se (%) | Score (%) |
|---|---|---|---|
| AST CE Baseline [3] | 77.14 | 41.97 | 59.55 |
| BTS (Audio-CLAP) [4] | 81.40 | 45.67 | 63.54 |
| QLung on AST [Ours] | 81.90 | 42.12 | 62.01 |
| QLung on Audio-CLAP [Ours] | 81.98 | 44.81 | 63.39 |
| QLung on Audio-CLAP (OOD SPRSound) | 74.71 | 44.88 | 59.80 |

## Limitations

While sensitivity improves on OOD data, absolute sensitivity values remain relatively low overall (around 42-45%), highlighting an ongoing trade-off between specificity and sensitivity in highly imbalanced respiratory classification. The quality metric relies strictly on heuristic low-level features (spectral entropy and RMS energy) which may not capture nuanced pathological distortions versus high-frequency ambient hospital noise. Evaluation is bounded to two public datasets, and performance on ultra-low resource or completely unlabelled clinical recording environments requires further validation.

## Why read this

Speech and audio ML researchers tackling noisy real-world acoustic environments or severe class imbalance will find a clean blueprint for integrating angular margin penalties with low-level quality indicators.

## Code

- https://github.com/RSC-Toolkit/QLung

## Applications

Automated respiratory disease screening, computer-aided auscultation tools, and robust biomedical sound analysis systems.

## Institutions / 機構

MODULABS, Wonkwang University

**Funding / 經費:** Ministry of Education, Jeonbuk State, National Research Foundation of Korea

## Related

- (link related pages by id as the wiki grows)
