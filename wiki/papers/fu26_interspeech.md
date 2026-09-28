---
id: fu26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1014
pdf: https://www.isca-archive.org/interspeech_2026/fu26_interspeech.pdf
---

# Acoustic and Semantic Feature Fusion Mapping for Lyric Intelligibility Prediction

[PDF](https://www.isca-archive.org/interspeech_2026/fu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1014)

**TL;DR** — A multi-dimensional feature fusion system combining acoustic features and Whisper encoder embeddings with gradient-boosted trees achieves state-of-the-art lyric intelligibility prediction, yielding an RMSE of 27.367 and a Pearson correlation of 0.654 on the Cadenza dataset.

## Problem

Predicting human subjective understanding of song lyrics is difficult because simple ASR word transcription accuracy fails to account for musical factors like melody, harmony, and heavy accompaniment that create a representation gap. Conventional methods rely on shallow handcrafted features or unoptimized cascaded pipelines that lose critical phonetic and semantic cues.

## Method

The system extracts waveform/spectrum acoustic features (energy, RMS, zero-crossing rate, spectral centroid, bandwidth, rolloff, duration, SNR) and temporal embeddings from the Whisper base.en encoder. Feature engineering computes temporal statistics and pairwise interaction features, all normalized to zero mean and unit variance. Several regression models map these features to intelligibility scores, including neural architectures (FCN, MoE FCN, CNN+GRU, Transformers) and gradient-boosted trees (CatBoost, LightGBM, XGBoost). Experiments use 5-fold cross-validation on a manually annotated dataset with a training configuration utilizing Adam, cosine annealing, and CatBoost tree depths of 8-10.

## Results

Evaluated on the Cadenza 2026 Challenge dataset using Root Mean Square Error (RMSE) and Pearson Correlation Coefficient (Corr). The Whisper-based ASR baseline achieved an RMSE of 29.32 and Corr of 0.59. Neural networks struggled with the small data scale, yielding Transformers with 34.896 RMSE and 0.461 Corr. Gradient-boosted trees significantly outperformed neural models, with LightGBM reaching 27.797 RMSE / 0.648 Corr, and the proposed CatBoost with feature interactions achieving the best performance at 27.367 RMSE and 0.654 Corr. Encoder comparisons showed Whisper outperforms Mert and Wav2Vec2.

## Code

- https://cadenzachallenge.org/docs/clip1/baseline

## Applications

Engineers and researchers working on music information retrieval, audio evaluation tools, and music production systems can use this framework to objectively and automatically quantify lyric intelligibility.

## Related

- (link related pages by id as the wiki grows)
