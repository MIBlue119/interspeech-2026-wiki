---
id: xiang26b_interspeech
category: paralinguistics-emotion
institutions: ["University of New South Wales", "Massachusetts Institute of Technology", "University of Melbourne"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3030
pdf: https://www.isca-archive.org/interspeech_2026/xiang26b_interspeech.pdf
---

# Revisiting Delay Compensation via Feature-Level Temporal Accumulation in Continuous Emotion Recognition

*Jian Xiang, Jingyao Wu, Ting Dang, Vidhyasaharan Sethu, Eliathamby Ambikairajah*

[PDF](https://www.isca-archive.org/interspeech_2026/xiang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xiang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3030)

**Category:** `paralinguistics-emotion`

**TL;DR** — This paper introduces Accumulated Delay Compensation (ADC), which replaces traditional explicit label shifting with feature-level temporal moving averages to account for human annotation lag in continuous emotion recognition. ADC achieves competitive Concordance Correlation Coefficients (CCC of 0.820 for arousal and 0.493 for valence) on RECOLA while offering significantly greater robustness to temporal parameter selection.

## Key contributions

- Proposed Accumulated Delay Compensation (ADC), a feature-level temporal accumulation method using a causal linear-phase moving average filter to address prediction-annotation lag without modifying input-label alignment.
- Adopted a constrained Neural ODE predictive backend coupled with a frozen pre-trained wav2vec2.0 base encoder to model time-continuous emotion dynamics on RECOLA.
- Demonstrated that ADC exhibits substantially lower sensitivity to hyperparameter choices (delay parameter tau / window length TN) compared to standard shift-based delay compensation (SDC).
- Conducted rigorous spectral and partial-dimension ablation studies proving that performance gains stem from structural temporal integration and robustness rather than simple high-frequency noise filtering.

## Problem

Continuous emotion recognition (CER) models predict time-varying dimensional labels like arousal and valence, but ground-truth annotations consistently suffer from time lags due to human perception, decision, and reaction times. The standard approach, shift-based delay compensation (SDC), explicitly shifts labels and truncates sequence boundaries, requiring strict tuning of a 2-4 second delay offset. SDC is sensitive to this parameter choice and discards data via boundary truncation. This paper argues that annotator perception is better viewed as a cumulative, evidence-accumulating cognitive process over time, calling for a more robust and native delay compensation mechanism.

## Method

The pipeline consists of three stages: raw audio feature extraction via a frozen pre-trained wav2vec2.0 base encoder, input-level temporal accumulation, and a constrained Neural ODE time-series backend. Speech inputs are chunked into 60 non-overlapping 5-s segments from 300-s RECOLA utterances, yielding 768-dimensional latent frames at ~49 Hz which are mean-pooled to match the 25 Hz ground-truth annotation rate. ADC processes these sequences along each feature dimension using an N-tap causal moving average filter h[n], whose group delay tau = (N-1)/2 acts as the intrinsic delay compensation.

Unlike SDC which shifts supervision targets, ADC preserves the original input-label alignment while functioning simultaneously as a low-pass filter and delay injector. A two-layer MLP projects the 768-dimensional wav2vec2.0 features to a 128-dimensional latent space. The backbone uses a Constrained Neural ODE where the dynamics function F_theta is a 3-layer MLP (129 -> 64 -> 64 -> 1) taking concatenated post-accumulation features and predictions, bounded by a tanh-based scaling function alpha=1 for stability. Training optimizes Concordance Correlation Coefficient (CCC) loss using the Adam optimizer, an ExponentialLR scheduler (decay 0.9), initial learning rate of 1e-2, and early stopping on development-set CCC with a patience of 10 epochs across 5 random seeds.

## Experimental setup

Evaluated on the RECOLA corpus following official training and development partitions (300-s utterances, annotations at 0.04-s resolution). Compared against a baseline model without delay compensation, Realignment-Based SDC (RA-SDC), and standard SDC under unified effective delay tau. The primary evaluation metric is the Concordance Correlation Coefficient (CCC). Implementation uses the torchdiffeq solver with fixed step size 0.04 s, rtol=1e-7, and atol=1e-13.

## Results

Under practice-level comparison, ADC achieves a peak arousal CCC of 0.816 at tau=2s (TN=4s) and valence CCC of 0.485 at tau=6s (TN=12s; or 0.484 excluding one invalid seed at tau=4.5s), outperforming the base model (0.746 arousal, 0.385 valence) and matching RA-SDC (0.808 arousal, 0.473 valence). In a fair comparison sharing identical sequence expansions, ADC slightly outperforms SDC for arousal (0.820 vs 0.811) and significantly outperforms SDC for valence (0.493 vs 0.428, p=0.031). Sensitivity analyses demonstrate that ADC maintains a broader near-optimal region across seeds, indicating superior robustness to parameter selection.

| System / Condition | Arousal (CCC) | Valence (CCC) |
|---|---|---|
| Base (No Compensation) | 0.746 | 0.385 |
| RA-SDC (Best) | 0.808 | 0.473 |
| SDC (Fair Comparison) | 0.811 ± 0.021 | 0.428 ± 0.031 |
| ADC (Fair Comparison) | 0.820 ± 0.012 | 0.493 ± 0.035 |

## Limitations

Evaluated exclusively on a single dataset (RECOLA corpus), leaving multi-corpus and multilingual generalization unverified. The frozen wav2vec2.0 encoder prevents end-to-end task adaptation of front-end feature extractors. Optimal window lengths varied widely between arousal (shorter windows) and valence (longer windows), requiring dimension-specific or task-specific hyperparameter tuning.

## Why read this

Researchers and engineers working on continuous affective computing or time-series regression with delayed labels will learn how to replace brittle sequence truncation with a mathematically elegant, cognitively grounded feature accumulation filter.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time continuous emotion recognition, dimensional affect analysis, and dynamic affective computing systems for human-computer interaction.

## Institutions / 機構

University of New South Wales, Massachusetts Institute of Technology, University of Melbourne

## Related

- (link related pages by id as the wiki grows)
