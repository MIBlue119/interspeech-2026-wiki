---
id: xiang26b_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3030
pdf: https://www.isca-archive.org/interspeech_2026/xiang26b_interspeech.pdf
---

# Revisiting Delay Compensation via Feature-Level Temporal Accumulation in Continuous Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/xiang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xiang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3030)

**TL;DR** — The paper introduces accumulated delay compensation (ADC) via feature-level temporal moving-average filtering for continuous emotion recognition, achieving robust performance without explicit sequence truncation or label shifting.

## Problem

Continuous emotion recognition (CER) relies on time-continuous annotations that frequently suffer from reporting lag, prompting the use of shift-based delay compensation (SDC). However, SDC requires explicit temporal shifting and sequence boundary truncation, and its performance is highly sensitive to the chosen delay offset parameter.

## Method

The framework processes speech via a frozen pre-trained wav2vec2.0 base encoder and a 2-layer MLP to extract 128-dimensional latent representations, followed by causal linear phase mean filtering (N-tap moving average) along each feature dimension to accumulate past temporal context. This feature-level temporal accumulation implicitly introduces a group delay tau without modifying the original input-label alignment. A constrained Neural Ordinary Differential Equation (Neural ODE) model with a 3-layer MLP dynamics function predicts continuous arousal and valence values, optimized via concordance correlation coefficient (CCC) loss using the Adam optimizer.

## Results

Evaluated on the RECOLA corpus using concordance correlation coefficient (CCC), ADC achieves a peak arousal CCC of 0.816 (at tau=2s, integration window TN=4s) and a peak valence CCC of 0.485 (at tau=6s, TN=12s), compared to shift-based delay compensation (RA-SDC) peaks of 0.808 for arousal and 0.473 for valence, and baselines of 0.746 and 0.385 respectively. In a fair comparison across five seeds, ADC significantly outperforms SDC on valence (mean 0.493 vs 0.428, p=0.031) and performs comparably on arousal (mean 0.820 vs 0.811), while demonstrating broader near-optimal sensitivity spans indicating greater hyperparameter robustness. Ablation studies partitioning embedding dimensions by stop-band to pass-band power ratio confirm that performance gains stem from temporal context accumulation rather than high-frequency noise filtering.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building continuous affective computing, mental health monitoring, and human-computer interaction systems for real-time dimensional emotion prediction.

## Limitations

The study evaluates performance specifically on the RECOLA corpus using speech features extracted from a frozen wav2vec2.0 encoder.

## Related

- (link related pages by id as the wiki grows)
