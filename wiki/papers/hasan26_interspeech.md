---
id: hasan26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3374
pdf: https://www.isca-archive.org/interspeech_2026/hasan26_interspeech.pdf
---

# Dual-Stream DNN-KAN Networks with Bangla-Specific Features for Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/hasan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hasan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3374)

**TL;DR** — The paper proposes a dual-stream DNN-KAN architecture for Bangla speech emotion recognition that matches or exceeds massive pre-trained models with only 1.1M parameters, achieving 92.12% speaker-independent accuracy on SUBESCO.

## Problem

Speech emotion recognition (SER) for low-resource languages like Bangla is underexplored, and existing literature predominantly relies on speaker-dependent evaluations that inflate accuracy through speaker memorization rather than true emotion generalization. Furthermore, generic large-scale models lack language-specific inductive biases and impose heavy computational overhead, while traditional architectures fail to capture the nuanced non-linear prosodic patterns critical for tonal and semi-tonal languages.

## Method

The model uses a 131-dimensional input combining an 80-dimensional spectral descriptor and 51 prosodic descriptors selected via eta-squared discriminative analysis. A dual-stream architecture processes MFCCs through factorized DNN blocks and prosodic features through lightweight Kolmogorov-Arnold Networks (KANs) utilizing shared quadratic B-spline bases and output-specific control points. Bidirectional cross-modal attention mechanisms and an emotion-adaptive gating network dynamically weight and fuse the streams based on predicted emotional states before final classification.

## Results

Evaluated on SUBESCO and BanglaSER datasets under strict speaker-independent (SI) protocols, the 1.1M-parameter model achieves 92.12% SI accuracy on SUBESCO and 82.79% on BanglaSER. It outperforms emotion2vec (25M parameters) by 2.70% and wav2vec2-xlsr (326M parameters) by 1.07% on SUBESCO SI. Ablation studies confirm incremental gains from adding prosodic features, KAN modules, bidirectional cross-attention, and emotion gating. Re-running the feature selection pipeline on EmoDB yields 93.92%, demonstrating cross-lingual portability of the methodology.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building efficient, low-resource, or on-device speech emotion recognition systems for interactive agents or mental health monitoring.

## Limitations

Evaluated primarily on acted emotional speech corpora with isolated utterances and single emotion labels.

## Related

- (link related pages by id as the wiki grows)
