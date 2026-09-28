---
id: zafar26_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2862
pdf: https://www.isca-archive.org/interspeech_2026/zafar26_interspeech.pdf
---

# Rethinking Acoustic Variability Of ADReSS and ADReSSo Datasets For Dementia Detection

[PDF](https://www.isca-archive.org/interspeech_2026/zafar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zafar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2862)

**TL;DR** — This paper evaluates the vulnerability of the ADReSS and ADReSSo dementia detection benchmarks to spurious acoustic variability, revealing that near state-of-the-art results can be achieved using only two low-level acoustic features or randomly permuted class labels.

## Problem

The ADReSS and ADReSSo datasets are widely used benchmarks for speech-based dementia detection, accounting for over half of recent ICASSP and Interspeech papers on the topic. Despite organizers' preprocessing efforts to normalize recording conditions, residual acoustic imbalances and channel artifacts remain. This work investigates whether high classifier performance on these datasets stems from true pathology-relevant speech cues or merely exploits incidental acoustic artifacts and brittle low-level features.

## Method

The authors examine the stability of low-level acoustic descriptors extracted using openSMILE—specifically eGeMAPS (88 features) and ComParE (6,373 features)—using scikit-learn logistic regression classifiers with liblinear solvers. They evaluate classifiers under three distinct regimes: the original challenge test splits, label permutation controls (100 iterations of randomized dementia labels), and Monte Carlo resampling (100 random 70/30 train/test splits). Additionally, voice activity detection via pyannote is used to segment audio into silence-only and speech-only variants to test whether features rely on non-speech acoustic cues.

## Results

Using only two openSMILE features, logistic regression achieved macro-F1 scores of 0.875 on ADReSS and 0.831 on ADReSSo, closely matching competition state-of-the-art benchmarks. Under randomized label permutation controls, classifiers still reached maximum test macro-F1 scores of 0.875 (ADReSS) and 0.831 (ADReSSo), demonstrating that chance label configurations can yield deceptively strong performance. Under 100-iteration Monte Carlo resampling, mean performance dropped significantly to 0.622 for ADReSS and 0.667 for ADReSSo, with very few feature pairs recurring in at least 50% of splits (3 pairs for ADReSS and 1 for ADReSSo from eGeMAPS, and 0 from ComParE). Furthermore, silence-only dataset variants outperformed speech-only variants using the same top-performing two-feature combinations (e.g., macro-F1 of 0.702 vs 0.643 on ADReSS), indicating reliance on channel and background noise rather than speech cues.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing health-related diagnostic tools, particularly those working with small datasets and benchmark challenges, to establish more robust evaluation protocols.

## Limitations

The study focuses specifically on linear logistic regression models and openSMILE low-level descriptors on the ADReSS and ADReSSo datasets derived from the Pitt Cookie Theft corpus.

## Related

- (link related pages by id as the wiki grows)
