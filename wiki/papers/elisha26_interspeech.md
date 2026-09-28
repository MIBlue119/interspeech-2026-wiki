---
id: elisha26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-453
pdf: https://www.isca-archive.org/interspeech_2026/elisha26_interspeech.pdf
---

# Audio-Based Understanding of Audiobook Narration Appeal

[PDF](https://www.isca-archive.org/interspeech_2026/elisha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/elisha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-453)

**TL;DR** — This work demonstrates that acoustic and vocal features of audiobook narration have a statistically significant, measurable association with consumer appeal, explaining nearly 10% of consumption variance even without content or genre metadata.

## Problem

As audiobook catalogs expand rapidly across platforms, understanding what makes a narration appealing is critical for personalization, search, and narrator casting. User interaction data in this domain is inherently sparse because listeners rarely replay audiobooks or consume as many titles as they do songs. Furthermore, prior studies have generally relied on small datasets or subjective surveys, failing to systematically link acoustic narration styles to large-scale, real-world consumption across different genres and alternative recordings of the same title.

## Method

The study analyzes 8,854 single-narrator English audiobooks from LibriVox spanning 65 genres and 1,206 narrators, grouped into book-groups for alternative recordings of identical texts. Audio is segmented into 30-second intervals (up to 20 segments per recording) to extract a 129-dimensional feature vector comprising 84 openSMILE eGeMAPSv02 features (frequency, energy, spectral, tempo), 34 YAMNet audio event statistics (speech, music, sound effects, non-verbal vocalizations), and 11 Whisper-tiny transcript-based temporal metrics (word and syllable rates). To tackle multicollinearity, Variance Inflation Factor pruning reduces the feature set to 70 standardized features, which are then used to fit Generalized Linear Models (GLMs) globally and per-genre, a Linear Mixed-Effects (LME) model with book-group random intercepts for intra-title analysis, and shallow machine learning classifiers and rankers (Logistic Regression, SVM, XGBoost, MLP, and LambdaMART-based rankers) to predict and rank view-rate quartiles.

## Results

A global GLM fit on acoustic features achieves a pseudo-R2 of 0.09, identifying 31 features with statistically significant effects on view-rate (e.g., vocal shimmer positively correlates with appeal, while higher spectral flux correlates negatively). Intra-title comparison via LME demonstrates that acoustic traits remain predictive even when controlling for book content. In predictive modeling, shallow classifiers and tree-based ranking models evaluated via 5-fold cross-validation confirm that narration acoustics capture non-trivial signal regarding listener engagement and relative audiobook preference.

## Code

- https://github.com/spotify-research/audiobook-narrations-interspeech

## Applications

Speech and ML engineers building audiobook streaming platforms, recommendation engines, or automated narrator casting systems to match voices with titles and listeners.

## Limitations

The primary public dataset relies on a coarse consumption proxy (view-rate divided by days since publication) which is biased toward shorter recordings and lacks fine-grained completion or listening-time data, though robustness is partially validated using proprietary engagement metrics.

## Related

- (link related pages by id as the wiki grows)
