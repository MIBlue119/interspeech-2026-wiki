---
id: arcosholzinger26_interspeech
category: asr
labels: [self-supervised, robustness-noise]
institutions: ["University of Melbourne", "Monash University", "Johns Hopkins University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2719
pdf: https://www.isca-archive.org/interspeech_2026/arcosholzinger26_interspeech.pdf
---

# GRIDS: Dimensionality-Aware Anomaly Detection in Learned Representations of Self-Supervised Speech Models

*Sandra Arcos-Holzinger, Sarah M. Erfani, James Bailey, Sanjeev Khudanpur*

[PDF](https://www.isca-archive.org/interspeech_2026/arcosholzinger26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arcosholzinger26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2719)

**Category:** `asr` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — GRIDS is a framework that uses layer-wise Local Intrinsic Dimensionality (LID) to analyze geometric deformations in self-supervised speech models under perturbation, achieving 0.78 to 1.00 AUROC for transcript-free anomaly detection.

## Key contributions

- Proposed GRIDS, applying layer-wise Local Intrinsic Dimensionality (LID) to diagnose internal representation changes in self-supervised speech models.
- Demonstrated that adversarial perturbations cause persistent early-layer LID elevations whereas benign noise profiles converge toward clean speech at high SNR.
- Established empirical links showing that layer-wise LID increases co-occur with rising ASR Word Error Rates (WER) without requiring reference transcripts.
- Achieved strong adversarial anomaly detection performance (AUROC 0.78-1.00) using lightweight logistic regression on 12-dimensional LID feature vectors.

## Problem

Prior analyses of self-supervised speech models (S3Ms) under natural and adversarial perturbations rely heavily on representation similarity metrics like CKA or global dimensionality measures like effective rank. These global metrics fail to capture local geometric changes around individual samples or predict layer-specific vulnerability and task degradation. Understanding how local neighborhood structures deform under distributional shifts is critical for robustness monitoring, yet existing techniques are typically bound to supervised setups or vision and text domains, leaving S3M representation geometry underexplored.

## Method

The GRIDS framework computes Local Intrinsic Dimensionality (LID) across all 12 transformer layers of WavLM and wav2vec 2.0 BASE models. Given an input audio waveform $x \in \mathbb{R}^T$ passed through an S3M, frame-level hidden representations $h^l_t(x) \in \mathbb{R}^d$ (with hidden size $d=768$) are extracted at each transformer layer $l \in \{1, \dots, 12\}$. Prior to nearest-neighbor search, representations are standardized per layer to zero mean and unit variance. Local LID is estimated using the maximum likelihood estimator (MLE) formulation based on Levina and Bickel, utilizing the Euclidean distances $r_i(z)$ to the first $k-1$ nearest neighbors for each embedding $z$, with neighborhood size set to $k=50$.

To aggregate frame-level values into a condition-level statistic, condition-specific embeddings are pooled across utterances (yielding roughly 230k to 460k frames per condition), and a harmonic mean is computed per layer over valid local LID estimates. Perturbations are evaluated under matched-SNR constraints (0 to 40 dB) and include benign Gaussian noise, Noizeus babble noise, and full-overlap LibriSpeech speech noise. Adversarial perturbations are generated via Projected Gradient Descent (PGD) over 300 iterations using either mean squared error (MSE) loss on final-layer hidden representations or Connectionist Temporal Classification (CTC) loss on output logits, bounded by an $\ell_2$ perturbation budget calibrated to target SNRs.

The resulting 12-dimensional per-layer harmonic-mean LID vectors are used to train a lightweight logistic-regression binary classifier via 5-fold grouped cross-validation to distinguish adversarial perturbations from benign ones. This design enables a transcript-free, per-layer geometric diagnostic that isolates local density expansions in embedding space without depending on textual decoding or reference labels.

## Experimental setup

Experiments use 918 fully paired utterances selected from the LibriSpeech test-clean corpus, restricted to speakers with 5-10 second durations. Models evaluated are WavLM BASE and wav2vec 2.0 BASE, both featuring 12 transformer layers and 768 hidden dimensions pretrained on 960 hours of LibriSpeech. Baselines compare clean speech against benign Gaussian, babble, and speech noise alongside PGD-MSE and PGD-CTC adversarial attacks across target SNRs of 0, 10, 20, 30, and 40 dB. Evaluation metrics include Word Error Rate (WER), attack success rate (SR), Area Under the ROC Curve (AUROC), Area Under the Precision-Recall Curve (AUPRC), and False Positive Rate at a True Positive Rate of 0.95 (FPR at TPR=0.95).

## Results

Under matched-SNR conditions, adversarial attacks induce substantially larger and more persistent LID increases than benign acoustic noise, especially in early transformer layers where LID peaks. At 0 dB SNR, PGD-MSE produces massive layer-averaged LID shifts ($\Delta \text{LID} = 16.03$ for WavLM, $10.11$ for wav2vec 2.0) accompanied by severe WER degradation ($\Delta \text{WER} = 0.94$ and $0.96$). As SNR increases toward 40 dB, benign perturbations converge back toward the clean representation profile with negligible WER changes, whereas PGD adversarial examples maintain elevated early-layer LID signatures even when downstream transcription errors diminish. Across anomaly detection tasks, 12-dimensional LID features combined with logistic regression achieve an AUROC ranging from 0.78 to 1.00 depending on the model and SNR level.

Performance degrades at higher SNRs (e.g., wav2vec 2.0 with PGD-MSE drops to 0.78 AUROC at 40 dB) because the restricted perturbation budget narrows the geometric divergence between clean and adversarial manifolds. Furthermore, while full-overlap speech noise maximally damages ASR at 0 dB ($\Delta \text{WER} = 1.00$ for both models), its corresponding geometric shift is lower than adversarial counterparts, indicating that extreme transcription failure can occur without maximal local dimensional expansion.

| System / Condition | SNR (dB) | WavLM AUROC | WavLM FPR@TPR0.95 | w2v 2.0 AUROC | w2v 2.0 FPR@TPR0.95 |
|---|---|---|---|---|---|
| PGD-MSE | 0 | 1.00 | 0.00 | 1.00 | 0.00 |
| PGD-MSE | 20 | 1.00 | 0.00 | 0.85 | 0.48 |
| PGD-MSE | 40 | 0.98 | 0.11 | 0.78 | 0.69 |
| PGD-CTC | 0 | 1.00 | 0.00 | 1.00 | 0.00 |
| PGD-CTC | 20 | 0.97 | 0.20 | 1.00 | 0.02 |
| PGD-CTC | 40 | 0.87 | 0.60 | 0.94 | 0.33 |

## Limitations

The evaluation is restricted to 12-layer BASE model variants (WavLM and wav2vec 2.0) and focuses solely on untargeted adversarial attacks within English datasets (LibriSpeech). The framework relies on hyperparameter choices such as neighborhood size $k=50$ and requires frame-level pooling over utterances, which may limit real-time streaming anomaly detection capabilities. Additionally, classifier separation degrades at high SNR as adversarial and benign distributions converge toward the clean manifold.

## Why read this

Speech and ML researchers focusing on model robustness or representation geometry should read this paper to see how Local Intrinsic Dimensionality provides a localized, transcript-free diagnostic superior to global rank or linear similarity metrics. It offers actionable methodology for detecting adversarial manipulation in hidden layers across transformer-based speech architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Transcript-free anomaly and adversarial attack detection for deployed self-supervised speech recognition systems and online audio security monitoring pipelines.

## Institutions / 機構

University of Melbourne, Monash University, Johns Hopkins University

**Funding / 經費:** Australian Government Research Training Program Scholarship

## Related

- (link related pages by id as the wiki grows)
