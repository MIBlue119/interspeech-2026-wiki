---
id: elelu26_interspeech
category: resources-evaluation
institutions: ["Michigan State University", "Clemson University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-572
pdf: https://www.isca-archive.org/interspeech_2026/elelu26_interspeech.pdf
---

# ConformalMOS: Uncertainty-Aware MOS Prediction with Conformal Intervals and Ordinal Modeling

*Kehinde Elelu, Joshua E. Siegel, Mohammadali Saffary, Tashfain Ahmed, Simeon Babatunde, Ebuka Okpala*

[PDF](https://www.isca-archive.org/interspeech_2026/elelu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/elelu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-572)

**Category:** `resources-evaluation`

**TL;DR** — ConformalMOS integrates split conformal prediction and ordinal-aware Gaussian label smoothing into speech MOS predictors, achieving a system-level MSE of 0.080 while providing statistically valid uncertainty intervals.

## Key contributions

- Incorporation of split conformal prediction to generate finite-sample valid prediction intervals with theoretical coverage guarantees for MOS estimation.
- Ordinal-aware training using Gaussian-smoothed soft targets over discrete MOS bins to better align the objective with human rating behaviors and rank structures.
- Empirical demonstration that robust upstream backbones like M2D2 achieve superior calibration and tight interval sharpness compared to baseline models like wav2vec.
- Achieving a 7.0% reduction in system-level MSE (0.080) compared to FUSE-MOS on the BVCC dataset.

## Problem

Automatic Mean Opinion Score (MOS) predictors typically output single point estimates without quantifying uncertainty, exposing real-world speech deployment pipelines to silent failures under out-of-distribution acoustic variations. Prior probabilistic methods lack formal, distribution-free mathematical guarantees that their predicted intervals actually contain the true MOS score. Furthermore, standard continuous regression or purely categorical formulations ignore the inherent ordinal rank structure of MOS ratings, leading to suboptimal correlation with human scores.

## Method

ConformalMOS takes raw audio waveforms, extracts representations via a frozen upstream encoder (such as M2D2 or Wav2Vec2 yielding frame embeddings Z), and applies temporal mean pooling to generate a fixed-dimensional embedding vector h in R^D. This embedding is passed to a lightweight two-layer MLP prediction head featuring LayerNorm and dropout, which outputs logits over K evenly spaced ordinal bins spanning the range [1, 5]. To preserve label ordering, one-hot targets are converted into Gaussian-smoothed soft probability distributions where the standard deviation sigma is set slightly larger than the bin width. The objective combines KL divergence against these smoothed targets with an auxiliary l1 loss for training stability, and the scalar point estimate is computed as the expected value across bin centers.

To equip these point estimates with uncertainty, the framework utilizes split conformal prediction. The labeled data is split into training and calibration subsets (10%, or 497 samples out of the development set). After training convergence, absolute residuals on the calibration set are computed, and their empirical (1 - alpha) quantile establishes a scalar half-width q_hat. At inference time, final prediction intervals are obtained by adding and subtracting q_hat from the point estimate and clipping to the valid MOS bounds [1, 5]. This post-hoc calibration requires no retraining, scaling linearly during calibration and adding negligible overhead during inference.

## Experimental setup

Evaluated primarily on the BVCC dataset consisting of 7,106 English audio samples from 187 TTS and voice conversion systems (1,066 test, 1,066 validation, 497 calibration, and 4,477 training samples). Compared against baseline systems UTMOS and FUSE-MOS. Evaluated using utterance- and system-level metrics including Mean Squared Error (MSE), Linear Correlation Coefficient (LCC), Spearman's Rank Correlation Coefficient (SRCC), Kendall Tau (KTAU), empirical coverage, calibration error, and average interval width/sharpness. Models were trained using NVIDIA RTX A5000 24GB GPUs for up to 1000 epochs (early stopping patience 20) with SGD with momentum (LR 1e-4, momentum 0.9, weight decay 1e-4) and a batch size of 32.

## Results

Using the M2D2 backbone at alpha = 0.05, ConformalMOS achieves a system-level MSE of 0.080 (a 7.0% reduction compared to FUSE-MOS at 0.086), a system-level LCC of 0.953, and a system-level KTAU of 0.805, outperforming or matching prior state-of-the-art baselines on system-level ranking metrics. At the utterance level, M2D2 yields an MSE of 0.228 and an LCC of 0.878, maintaining competitive performance while trading off minor utterance-level accuracy for rigorous uncertainty quantification. 

Ablations over alpha parameters (0.01, 0.05, 0.1, 0.2) demonstrate the expected coverage-sharpness trade-off, where larger alpha values narrow the interval half-width but risk undercoverage. In contrast, substituting M2D2 with a weaker wav2vec backbone severely degrades uncertainty calibration, yielding significantly higher calibration errors, lower empirical coverage at strict alpha levels, and substantially wider interval sharpness.

| Model | Utt MSE | Utt LCC | Sys MSE | Sys LCC |
|---|---|---|---|---|
| UTMOS | 0.165 | 0.899 | 0.090 | 0.936 |
| FUSE-MOS | 0.191 | 0.887 | 0.086 | 0.946 |
| M2D2 (alpha=0.05) | 0.228 | 0.878 | 0.080 | 0.953 |
| wav2vec (alpha=0.05) | 0.334 | 0.814 | 0.162 | 0.908 |

## Limitations

The framework assumes data exchangeability between the calibration and test sets, which can be violated under severe domain shifts or unseen acoustic environments. Evaluations are restricted to in-domain English samples from the BVCC dataset, leaving cross-lingual and out-of-domain robustness unverified. Furthermore, the approach does not explicitly model individual listener bias or granular rater-specific disagreement distributions.

## Why read this

Speech and ML engineers building reliable synthetic speech evaluation tools should read this paper to learn how to wrap existing neural MOS models with distribution-free, statistically guaranteed conformal prediction intervals.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated quality assurance, risk-aware model selection, and deployment gating for text-to-speech (TTS) and voice conversion (VC) production systems.

## Institutions / 機構

Michigan State University, Clemson University

**Funding / 經費:** Michigan Translational Research and Commercialization Program, Michigan Strategic Fund, Michigan Economic Development Corporation, 21st Century Jobs Trust Fund, State of Michigan, U.S. Economic Development Administration, U.S. Department of Commerce

## Related

- [DNSMOS-C: Improving End-to-end Speech Quality Models via Contrastive Learning](liang26_interspeech.md) — same problem · relatedness 2.7/3
- [A Fine-Grained Acoustically-Aware Pre-training Encoder for Speech Quality Assessment](sultana26_interspeech.md) — same problem · relatedness 2.5/3
- [CAL-MOS: Bridging Layers with Adapters for Robust MOS Prediction Across Speech Foundation Models](ferreira26_interspeech.md) — same problem · relatedness 2.5/3
- [PrefSQA: Pairwise Preference Prediction for Speech Quality Assessment and the Critical Role of High Quality Datasets](fan26_interspeech.md) — same problem · relatedness 2.4/3
- [URGENT-MOS: Unified Multi-Metric and Preference Learning for Robust Speech Quality Assessment](wang26aa_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
