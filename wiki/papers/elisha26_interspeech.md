---
id: elisha26_interspeech
category: paralinguistics-emotion
institutions: ["Spotify", "Queen Mary University of London"]
code: https://github.com/spotify-research/audiobook-narrations-interspeech
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-453
pdf: https://www.isca-archive.org/interspeech_2026/elisha26_interspeech.pdf
---

# Audio-Based Understanding of Audiobook Narration Appeal

*Shahar Elisha, Mariano Beguerisse-Díaz, Emmanouil Benetos*

[PDF](https://www.isca-archive.org/interspeech_2026/elisha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/elisha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-453)

**Category:** `paralinguistics-emotion`

**TL;DR** — This paper presents the first systematic computational study linking audiobook narration acoustic features to real-world consumption and engagement data across genres and alternative recordings of the same title, achieving a pseudo-R² of up to 0.16 when predicting listener return-rates.

## Key contributions

- Conducted a large-scale statistical analysis of audiobook consumption on 8,854 LibriVox audiobooks to assess how interpretable acoustic features influence view-rates.
- Proposed a genre-specific modeling framework across 65 genres, demonstrating that the acoustic correlates of appeal (e.g., vocal shimmer, spectral indices) vary significantly by genre.
- Designed an intra-title comparison framework using Linear Mixed-Effects models to isolate narration-driven appeal from text-content biases across multiple recordings of the same book.
- Validated findings against proprietary Spotify engagement metrics (14-day return-rate), showing that acoustic features align more strongly with retention than with raw page views.

## Problem

As audiobook catalogs expand across platforms like Spotify, Audible, and LibriVox, user-item interaction data remains sparse compared to music (e.g., audiobooks are rarely replayed or consumed in high volumes). Prior research on audiobook narration relies on small datasets, qualitative surveys, or text-to-speech evaluations without connecting low-level acoustic properties to large-scale consumption data, leaving a major gap in understanding how to optimize narrator casting and audiobook recommendations.

## Method

The authors construct a 129-dimensional feature vector per audiobook by aggregating descriptors across 30-second audio segments (up to 10 minutes per recording). The feature extraction pipeline combines 84 functional openSMILE features from eGeMAPSv02 (frequency, energy, spectral, tempo), 34 aggregated YAMNet audio event embeddings covering speech subclasses and environmental sounds (max activation across 4 grouped classes), and 11 statistical summaries of word/syllable rates extracted via whisper-tiny with timestamped transcripts. Multicollinearity is mitigated via Variance Inflation Factor (VIF) pruning down to 70 features, which are then standardized.

For statistical modeling, the authors fit a Generalised Linear Model (GLM) with a log-transformed view-rate and Gaussian error distribution, applying Benjamini-Hochberg correction (p < 0.05). Genre-specific GLMs are trained across 65 genres with re-standardized features. To control for title-specific effects, a Linear Mixed-Effects (LME) model incorporates random intercepts per book-group (shared text source) with acoustic features as fixed effects. Predictive modeling evaluates 4 shallow classifiers (LR, SVM, XGBoost, MLP) on quartile-binned view-rates using 5-fold cross-validation grouped by narrator, alongside ranking models (XGBRanker, LGBMRanker, and pairwise/listwise objectives) evaluated via Kendall's tau on 305 book-groups of size two or greater.

Inference and evaluation leverage both public LibriVox metadata (view-rate divided by days since publication) and proprietary Spotify data (proportion of distinct users returning within 14 days, using total users as an exposure offset). These design choices were made to systematically decouple content bias from acoustic presentation, test the limits of coarse public proxies, and validate findings against true retention metrics.

## Experimental setup

Experiments use a public dataset of 8,854 single-narrator English LibriVox audiobooks read by 1,206 narrators across 65 genres, alongside a proprietary Spotify subset of 3,428 audiobooks with 14-day return-rate metrics. Baselines include random predictors (0.25 accuracy for quartile classification; 0.00 Kendall's tau for ranking) and pointwise logistic regression models. Models are evaluated using classification accuracy, pseudo-R², Akaike Information Criterion (AIC), and Kendall's rank correlation coefficient (τ).

## Results

The global GLM on LibriVox data achieves a pseudo-R² of 0.09 with 31 statistically significant acoustic features, indicating that audio properties alone explain nearly 10% of consumption variance. Intra-title analysis reveals that variation in appeal across different narrations of the same title (0.52) is nearly as large as variation across entirely different titles (0.54), while the mixed-effects model substantially improves fit (AIC difference of 210). In quartile classification, combining genre multi-hot encodings with audio features boosts accuracy to 0.35 compared to 0.25 for random and 0.32 for genre-only models, with simpler models (LR, SVM) outperforming MLPs and XGBoost.

When evaluated on ranking tasks using LibriVox view-rates, ranking models struggle on small groups (Kendall's tau ~0.02 to 0.13). However, substituting view-rate with Spotify's 14-day return-rate on the subset of 327 audiobooks yields strong and consistent ranking correlations (Kendall's tau between 0.26 and 0.28) and raises the global GLM pseudo-R² to 0.16 with a ΔAIC of ~6000, demonstrating that acoustic features predict retention better than raw popularity.

| System / Condition | Accuracy (Quartile Classification) | Kendall's τ (Ranking via View-Rate) | Kendall's τ (Ranking via Return-Rate) |
|---|---|---|---|
| Random Baseline | 0.25 | 0.00 | -- |
| Linear Regression (LR) | 0.32 (Audio only) / 0.35 (Combined) | 0.09 | 0.08 |
| XGBoost / XGBRanker | 0.29 (Audio) / 0.32 (Combined) | 0.13 (Lambda) | 0.28 (Lambda) |
| SVM | 0.31 (Audio) / 0.33 (Combined) | -- | -- |

## Limitations

The public LibriVox consumption metric (view-rate) is coarse, noisy, and biased against shorter recordings that require fewer page visits to complete. The study is restricted to single-narrator English audiobooks, omitting multi-voice productions, professional studio masterings with rich sound design, and listener demographic segmentations. Proprietary engagement metrics are limited to a subset of 3,428 titles, and feature correlations require cautious causal interpretation.

## Why read this

Speech and ML engineers building audiobook recommendation, personalization, or narrator casting systems should read this paper to understand how to isolate acoustic narration features from text content using mixed-effects models. It provides concrete evidence that paralinguistic markers significantly drive listener retention, offering an immediate roadmap for integrating audio embeddings into ranking and retrieval architectures.

## Code

- https://github.com/spotify-research/audiobook-narrations-interspeech

## Applications

Audiobook recommendation engines, automated narrator casting systems, personalized audiobook search, and text-to-speech stylistic conditioning.

## Institutions / 機構

Spotify, Queen Mary University of London

## Related

- (link related pages by id as the wiki grows)
