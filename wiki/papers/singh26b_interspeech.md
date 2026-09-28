---
id: singh26b_interspeech
category: speech-emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1591
pdf: https://www.isca-archive.org/interspeech_2026/singh26b_interspeech.pdf
---

# CHUCKLE - When Humans Teach AI to Learn Emotions the Easy Way

[PDF](https://www.isca-archive.org/interspeech_2026/singh26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/singh26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1591)

**TL;DR** — CHUCKLE introduces a human perception-driven curriculum learning framework for speech emotion recognition that leverages crowdsourced annotator agreement and label alignment, yielding consistent accuracy gains and up to 40% fewer gradient updates.

## Problem

Speech emotion recognition is heavily hindered by high variance, acoustic subjectivity, and label noise, making standard training prone to poor generalization. Existing curriculum learning methods rely on heuristics or model-based metrics while largely neglecting human perceptual difficulty, which is critical for subjective tasks. This paper argues that data samples posing challenges for human annotators behave similarly for neural models, and proposes structuring training around this human-centric difficulty.

## Method

The framework utilizes pre-extracted 1280-dimensional frame-level representations from HuBERT-Xlarge without task-specific fine-tuning. It constructs curricula by splitting the CREMA-D dataset into four progressive difficulty bins using either continuous score metrics (intended emotion proportion, Shannon entropy) or four categorical rule-based orderings (Clear Match, Clear Mismatch, Ambiguous Match, Ambiguous Mismatch). Evaluations are conducted on 2-layer BiLSTMs (128-dim, trained for 200 epochs) and 2-layer Transformers (4 heads, 128-dim, 400 epochs) using Adam and CosineAnnealingLR. Experiments examine both subject-dependent and subject-independent settings across 10 trials per configuration.

## Results

Evaluated on the CREMA-D dataset using mean macro accuracy across subject-dependent and subject-independent settings, compared against non-curriculum and random curriculum baselines. Rule-based curriculum strategies consistently outperformed score-based approaches and baselines. Specifically, Intended-Perceived Agreement 1 delivered the highest accuracy gains, achieving relative mean macro accuracy improvements of 1.6% in subject-dependent and 1.8% in subject-independent settings for LSTMs, and 2.1% (subject-dependent) and 3.0% (subject-independent) for Transformers, while simultaneously reducing training costs by approximately 17%. Furthermore, alternative rule-based configurations (such as Agreement 2) cut cumulative training gradient updates by nearly 40% while preserving baseline-matching performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building speech emotion recognition systems for speaker-dependent or cross-speaker deployment who want to improve model robustness and training efficiency.

## Limitations

The approach requires datasets that provide both intended actor labels and multi-annotator perceived labels.

## Related

- (link related pages by id as the wiki grows)
