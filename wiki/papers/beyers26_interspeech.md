---
id: beyers26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-408
pdf: https://www.isca-archive.org/interspeech_2026/beyers26_interspeech.pdf
---

# Scaling few-shot spoken word classification with generative meta-continual learning

[PDF](https://www.isca-archive.org/interspeech_2026/beyers26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/beyers26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-408)

**TL;DR** — This paper applies Generative Meta-Continual Learning (GeMCL) to large-scale few-shot spoken word classification, scaling up to 1,000 classes with 5 shots each while matching the accuracy of frozen HuBERT baselines with two orders of magnitude faster adaptation.

## Problem

Few-shot spoken word classification is typically evaluated on a small number of classes, leaving its potential for large-scale, continual adaptation largely unexplored. Creating flexible spoken word classifiers that can scale to thousands of classes is critical for applications like user-defined keyword spotting and data labelling flywheels in moderately-resourced languages. Traditional self-supervised models suffer from catastrophic forgetting or require expensive retraining when new classes are sequentially introduced, making efficient meta-continual learning necessary.

## Method

The authors employ the Generative Meta-Continual Learning (GeMCL) algorithm, which pairs a 12-layer, 12-head transformer encoder (85M parameters) taking MFCC inputs with a Bayesian generative classifier modeling class distributions as Normal-Gamma priors updated via closed-form Bayes' rule. GeMCL isolates class-specific parameters to eliminate catastrophic forgetting and is trained on 8,915 MSWC words using 5,000 steps on batches of 16 25-way-5-shot episodes (totaling roughly 477 hours of unique training data). It is compared against two HuBERT base baselines (94M+ parameters): full fine-tuning (full FT) and training a classifier head/projector on a frozen backbone (CH), both trained repeatedly from scratch across class increments from 25 to 1,000.

## Results

Evaluated on English words from the Multilingual Spoken Words Corpus (MSWC) across 10 distinct episodes scaling from 25 up to 1,000 classes, GeMCL achieves accuracy within 3% of the 1,000-way fine-tuned classifier-head (CH) baseline. GeMCL exhibits exceptional stability with a per-word accuracy volatility of 0.48% compared to 7.13% for CH and 24.55% for fully fine-tuned HuBERT. Furthermore, GeMCL adapts 2,000 times faster than the baselines, requiring only 0.06 hours for few-shot adaptation versus roughly 1,976 hours for the baselines, and is trained on less than half the data for two orders of magnitude less time overall.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building edge-device user-defined keyword spotting systems or few-shot data labelling pipelines for moderately-resourced spoken languages.

## Limitations

Evaluated exclusively on English speech data from the MSWC dataset.

## Related

- (link related pages by id as the wiki grows)
