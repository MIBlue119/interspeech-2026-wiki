---
id: marchenko26_interspeech
category: paralinguistics-emotion
labels: [multilingual, self-supervised]
code: https://doi.org/10.5281/zenodo.20584918
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-579
pdf: https://www.isca-archive.org/interspeech_2026/marchenko26_interspeech.pdf
---

# TIMBRE: Layer-Wise Cross-Lingual Speech Emotion Recognition Across 49 Layers and 26 Corpora

*Anatoly Marchenko*

[PDF](https://www.isca-archive.org/interspeech_2026/marchenko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/marchenko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-579)

**Category:** `paralinguistics-emotion` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — This paper presents a large-scale layer-wise cross-lingual speech emotion recognition analysis across 49 layers and 26 corpora, identifying layer 15 (the CRIS layer) as the optimal feature extraction point for frozen wav2vec2 models. Mean-pooled wav2vec2 representations outperform traditional 27-dimensional acoustic features by 41% in cross-corpus transfer.

## Key contributions

- Discovered the CRIS layer (Cross-lingual Representational Integration Stratum) at layer 15 (31% depth) of wav2vec2-xls-r-1b, where cross-corpus emotion transfer peaks at F1=0.392 before collapsing by 24.6% at upper layers.
- Identified distinct typological layer profiles, showing a Romance U-shaped relative advantage at early and late layers, and a tonal advantage that grows steadily with depth.
- Conducted a systematic feature comparison demonstrating that mean-pooled wav2vec2 achieves an average F1 of 0.355 compared to 0.252 for handcrafted 27-dimensional acoustic features.
- Showed that per-corpus expressiveness and elicitation style drive transferability more strongly than broader language family or genetic group membership.

## Problem

As speech emotion recognition expands across diverse languages, it remains unclear which hierarchical levels of self-supervised speech models generalize best for cross-lingual transfer. Prior evaluations either relied exclusively on final transformer layers, focused solely on within-corpus performance, or scaled to only a handful of languages and datasets. Understanding how typological constraints (such as lexical tone) and model depth interact is crucial for building robust, multilingual affective computing systems without costly end-to-end fine-tuning.

## Method

The study evaluates wav2vec2-xls-r-1b, which features 48 transformer layers plus a CNN feature encoder, yielding 49 extraction points. For each utterance, 1280-dimensional representations are mean-pooled across time at every layer, and z-scored using training-corpus statistics exclusively. The authors perform an exhaustive 49 x 26 x 26 cross-corpus probing matrix totaling 31,850 experiments using an L2-regularized logistic regression classifier with fixed hyperparameter C=1.0, avoiding per-pair tuning.

For the acoustic baseline, 27 handcrafted features comprising pitch, perturbation, formants, energy, MFCCs, and spectral properties are extracted using Parselmouth and librosa without normalization. A complementary ablation study evaluates per-corpus SVM classification with RBF kernels, using leave-one-out feature group dropping across 25 corpora. These design choices isolate the representational capacity of frozen features across network depth while keeping classification overhead minimal and strictly avoiding data leakage during cross-corpus evaluation.

## Experimental setup

Evaluated across 26 speech emotion corpora spanning 23 languages and 14 language families, harmonized to four core emotions (angry, happy, sad, neutral) with up to 500 utterances per class. Baseline comparisons contrast 27-dimensional handcrafted acoustic features against 1280-dimensional mean-pooled wav2vec2 embeddings using identical logistic regression classifiers over 650 off-diagonal cross-corpus pairs. Evaluation metrics focus on macro F1-score for cross-corpus transfer, supported by corpus-clustered bootstrap confidence intervals and Mann-Whitney tests.

## Results

Mean-pooled wav2vec2 achieves a grand average cross-corpus F1 of 0.3553, outperforming the 27-dimensional acoustic baseline (0.2521) by 41%. Acoustic features retain 71.0% of this baseline performance despite a 3.7 x 10^7-fold reduction in model complexity, though they prevail on only 3 of the 26 test corpora (TurEV-DB, Hi,KIA, and MESD). Layer-wise analysis reveals performance rising from L0 (F1=0.263) to a peak at layer 15 (F1=0.392), before dropping sharply to 0.296 at layer 45. In the feature ablation study, MFCCs emerge as the universally most important acoustic feature group (mean delta F1 = -0.097), while perturbation measures exhibit statistically significant language-dependent utility.

| System / Condition | Grand Avg F1 | Acoustic Wins | wav2vec2 Wins |
|---|---|---|---|
| Acoustic Features (27-dim) | 0.2521 | 3 | -- |
| wav2vec2 Mean-Pool (L12-18) | ~0.37-0.39 | -- | 23 |
| wav2vec2 Layer 15 (CRIS) | 0.3920 | -- | -- |
| wav2vec2 Layer 45 (Upper) | 0.2960 | -- | -- |

## Limitations

Twenty-five of the twenty-six evaluated corpora rely on acted, read, or crowd-performed speech rather than naturalistic utterances, restricting direct generalization to spontaneous affective data. The identified typological layer profiles rely on small subsets (e.g., n=5 for Romance, n=4 for tonal corpora) where corpus size and elicitation style heavily co-vary with language group. Furthermore, probing was restricted to a single model architecture (wav2vec2-xls-r-1b) using linear probing, which may underestimate the affective capacity extractable via fine-tuning.

## Why read this

Speech and ML engineers building multilingual or cross-lingual emotion recognition systems will find immediate value in knowing precisely which transformer layers to extract from without wasting compute on upper-layer fine-tuning. Researchers will appreciate the rigorous large-scale typological analysis quantifying how prosodic structures shape emotional representations across self-supervised layers.

## Code

- https://doi.org/10.5281/zenodo.20584918

## Applications

Cross-lingual speech emotion recognition, call center analytics, multilingual virtual assistants, and affective computing pipelines requiring robust zero-shot or cross-domain transfer.

## Related

- (link related pages by id as the wiki grows)
