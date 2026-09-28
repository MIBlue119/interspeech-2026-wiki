---
id: yi26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-157
pdf: https://www.isca-archive.org/interspeech_2026/yi26_interspeech.pdf
---

# Exploring the Scale and Diversity of Speech Anti-spoofing Datasets: Experiments and Analysis

[PDF](https://www.isca-archive.org/interspeech_2026/yi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-157)

**TL;DR** — This study evaluates the scale-first paradigm in speech anti-spoofing and demonstrates that generation method diversity outweighs dataset scale in improving model cross-domain generalization.

## Problem

Over the past decade, speech anti-spoofing datasets have grown exponentially in scale based on the assumption that larger data automatically leads to better performance. However, indiscriminately expanding training data within fixed generation methods incurs exorbitant costs while risking overfitting and marginal generalization gains. This study investigates whether data scale or data diversity is the primary driver of robust deepfake detection.

## Method

The authors perform two sets of controlled experiments using the Wav2Vec-AASIST architecture equipped with an official XLS-R 300M pretrained backbone and RawBoost data augmentation. First, they evaluate data scale by randomly sub-sampling the Speechfake-BD and ASVspoof5 training sets at proportions of 1%, 5%, 10%, 20%, 50%, and 100%. Second, they construct a high-diversity composite training set containing 63,000 utterances covering 53 generation methods sampled across four major datasets (ASVspoof5, Speechfake-BD, CD-ADD, and Spoofceleb). All experiments fix model capacity and hyperparameters to isolate the effects of training data composition.

## Results

Experiments reveal that model performance does not exhibit a continuous positive correlation with data scale, with cross-domain generalization peaking at only 10% to 20% data volume before degrading due to domain overfitting. Conversely, models trained on the compact 63,000-sample composite training set with high generator diversity consistently outperform models trained on much larger single datasets, such as the 2.5-million-sample Spoofceleb, during cross-domain evaluations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust audio deepfake detection systems, particularly when deciding how to curate and balance training corpora for cross-domain deployment.

## Limitations

The study defines data diversity primarily through the lens of generation methods, leaving other axes like acoustic channel or speaker variability for future exploration.

## Related

- (link related pages by id as the wiki grows)
