---
id: elelu26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-572
pdf: https://www.isca-archive.org/interspeech_2026/elelu26_interspeech.pdf
---

# ConformalMOS: Uncertainty-Aware MOS Prediction with Conformal Intervals and Ordinal Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/elelu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/elelu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-572)

**TL;DR** — ConformalMOS augments automated mean opinion score prediction with split conformal prediction and ordinal-aware Gaussian-smoothed modeling, achieving a 7.0% system-level MSE reduction over FUSE-MOS while delivering statistically valid uncertainty intervals.

## Problem

Current automatic Mean Opinion Score (MOS) predictors output single point estimates without quantifying predictive uncertainty, making them unreliable when deployed on unseen acoustic conditions or out-of-distribution synthetic speech. Furthermore, standard regression losses ignore the ranked, discrete structure of human ratings. Providing principled, distribution-free uncertainty intervals is crucial for trustworthy model selection and deployment in text-to-speech and voice conversion applications.

## Method

The framework feeds frozen upstream embeddings (such as M2D2 or wav2vec) through a temporal mean pooling layer into a lightweight two-layer MLP prediction head. To capture score ordering, one-hot MOS labels are converted into Gaussian-smoothed soft targets over evenly spaced ordinal bins, optimized via KL divergence combined with an auxiliary l1 loss. Post-hoc split conformal calibration computes absolute residuals on a dedicated calibration subset (10% of development data) to derive a statistically guaranteed prediction half-width interval. Training uses SGD with momentum on NVIDIA RTX A5000 GPUs with batches of 32 for up to 1000 epochs.

## Results

Evaluated on the standard VoiceMOS Challenge BVCC dataset (7,106 audio samples from 187 TTS and VC systems), the M2D2-backed ConformalMOS at alpha = 0.05 achieves a system-level MSE of 0.08, representing a 7.0% improvement over FUSE-MOS, alongside an LCC of 0.953 and SRCC of 0.805. Ablations across alpha levels (0.01, 0.05, 0.1, 0.2) demonstrate the expected coverage-sharpness trade-off, with M2D2 yielding closely matched empirical coverage and low calibration error compared to inferior performance from wav2vec backbones.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building text-to-speech, voice conversion, or generative audio systems who need reliable, uncertainty-aware quality evaluation prior to production deployment.

## Limitations

The evaluation is restricted to in-domain BVCC data, leaving out-of-domain robustness untested.

## Related

- (link related pages by id as the wiki grows)
