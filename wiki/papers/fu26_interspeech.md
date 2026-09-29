---
id: fu26_interspeech
category: resources-evaluation
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1014
pdf: https://www.isca-archive.org/interspeech_2026/fu26_interspeech.pdf
---

# Acoustic and Semantic Feature Fusion Mapping for Lyric Intelligibility Prediction

*Yuxiang Fu, Guodong Lin, Da Shen, Wenlin Huang, Weili Jiang, Kai Gao, Boyu Zhao, Wei-Qiang Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/fu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1014)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`

**TL;DR** — A multi-dimensional feature fusion framework for lyric intelligibility prediction combines acoustic features and Whisper encoder representations with gradient-boosted trees, achieving an RMSE of 27.367 and a Pearson correlation of 0.654 on the Cadenza dataset.

## Key contributions

- Proposes a unified prediction pipeline integrating handcrafted acoustic features (energy, spectral metrics, SNR) and pre-trained Whisper base.en encoder embeddings.
- Engineers temporal statistics and weight-based pairwise interaction features specifically tailored for tree-based regression models.
- Conducts comprehensive architectural evaluations proving that gradient-boosted trees (CatBoost, LightGBM, XGBoost) significantly outperform deep neural networks (FCN, MoE-FCN, CNN+GRU, Transformers) under limited data scales.
- Demonstrates that Whisper-derived representations outperform music-specialized (Mert) and general speech (Wav2Vec2) encoders for lyric intelligibility assessment.

## Problem

Evaluating lyric intelligibility is critical for understanding song memorability and emotional transmission, but traditional systems face two main bottlenecks: reliance on shallow handcrafted acoustic features without semantic awareness, and relying solely on ASR word transcription accuracy. Machine transcription correctness suffers from a severe discrepancy against human-perceived intelligibility in musical contexts due to pitch variations, vowel stretching, and heavy accompaniment interference. Consequently, simple word-matching fails to capture human auditory perception, creating a major evaluation gap.

## Method

The system processes input music segments by extracting two distinct feature categories: explicit acoustic features (energy, RMS, zero-crossing rate, spectral centroid, bandwidth, rolloff, duration, and source-separation SNR) and high-dimensional temporal embeddings from the Whisper base.en encoder. For feature engineering, representative temporal statistics (mean, std, max, min, skewness, and kurtosis) are computed to produce fixed-dimensional representations, alongside weight-computed pairwise interaction features. All features are normalized to zero mean and unit variance before feeding into the regression mapping module.

The mapping phase evaluates multiple neural network architectures (FCN with 4 projection layers of dimensions 1024-512-256-64, dropout 0.4, and ReLU activation; MoE-FCN; CNN+GRU; and a single-layer Transformer encoder) optimized via the Adam optimizer with a cosine learning rate schedule, as well as gradient-boosted tree frameworks (XGBoost, LightGBM, and CatBoost with tree depths of 8-10, up to 31 leaves, and L1/L2 regularization). Gradient-boosted trees are chosen because they handle heterogeneous, structured statistical inputs and resist overfitting much better than data-hungry neural models on thousands of training samples.

## Experimental setup

Experiments are conducted on the manually annotated lyric intelligibility dataset from the Cadenza 2026 Challenge, utilizing a rigorous 5-fold cross-validation protocol. Performance is measured using Root Mean Squared Error (RMSE) and Pearson Correlation Coefficient (Corr). Implementation details include a single NVIDIA RTX 3090 GPU (24 GB), Python 3.9, PyTorch 2.1 for neural models, and Scikit-learn 1.3 with official LightGBM and CatBoost libraries for tree models.

## Results

The ASR transcription baseline achieves an RMSE of 29.32 and a correlation of 0.59. Gradient-boosted trees consistently outperform deep neural models, with the Transformer performing worst (RMSE 34.896, Corr 0.461) due to severe overfitting on the limited dataset size. Among tree models, CatBoost with feature interactions achieves the headline result of 27.367 RMSE and 0.654 Corr, representing a 6.66% reduction in RMSE and a 10.85% improvement in correlation over the baseline. Ablation studies confirm that adding pairwise feature interactions improves CatBoost performance from 27.532 to 27.367 RMSE.

| Systems/Conditions | RMSE (↓) | Corr (↑) |
|---|---|---|
| Baseline | 29.32 | 0.590 |
| FCN | 27.827 | 0.645 |
| Transformer | 34.896 | 0.461 |
| LightGBM | 27.797 | 0.648 |
| CatBoost (without interaction) | 27.532 | 0.651 |
| CatBoost (Proposed) | 27.367 | 0.654 |

## Limitations

The current framework relies on a cascaded architecture where feature extraction and score mapping are optimized independently rather than end-to-end. The study is bounded by the scale and genre diversity of the Cadenza challenge dataset, and the evaluation relies exclusively on intrusive settings requiring reference lyrics.

## Why read this

Researchers and engineers tackling paralinguistic scoring or subjective audio quality prediction will learn why shallow feature fusion paired with gradient-boosted trees outperforms data-hungry neural models in low-resource regression tasks.

## Code

- https://cadenzachallenge.org/docs/clip1/baseline

## Applications

Automated music production evaluation, language learning tools, and music streaming recommendation platforms optimizing for vocal clarity and lyric accessibility.

## Institutions / 機構

Tsinghua University, Institute of Forensic Science, Ministry of Public Security

## Related

- (link related pages by id as the wiki grows)
