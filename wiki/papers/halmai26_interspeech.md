---
id: halmai26_interspeech
category: speech-emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2143
pdf: https://www.isca-archive.org/interspeech_2026/halmai26_interspeech.pdf
---

# How Language-Independent Are Emotional Attributes? A Study on Training Data Scaling and Cross-Lingual Generalization

[PDF](https://www.isca-archive.org/interspeech_2026/halmai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/halmai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2143)

**TL;DR** — This paper investigates cross-lingual speech emotion recognition and model adaptation scaling across English and Taiwanese Mandarin corpora, demonstrating that arousal benefits significantly from cross-lingual transfer even with just 1-2 hours of target data.

## Problem

State-of-the-art speech emotion recognition systems require large amounts of training data, which are typically restricted to high-resource languages like English. For low-resource languages, practitioners must choose between training from scratch, using cross-lingual models, or domain adaptation, but the required amount of target-language adaptation data remains unclear. Furthermore, emotional attributes like arousal, valence, and dominance may generalize differently across languages and cultural boundaries.

## Method

The authors utilize the WavLM Large model (316M parameters, 24 transformer layers, pre-trained on 94k hours) as a feature extractor with frozen convolutional layers. The model is trained on a regression task with three output neurons for arousal, valence, and dominance, using mean squared error (MSE) loss and the Adam optimizer (learning rate 5e-5) via the SpeechBrain toolkit. Experiments compare models trained directly from scratch on Taiwanese Mandarin subsets (BIIC-Podcast: 1h, 2h, 5h, 10h, 20h, and 102h) versus transfer learning models pre-trained on the English MSP-Podcast corpus (104 hours) and fine-tuned on the Mandarin subsets for 20 epochs.

## Results

Evaluated on the BIIC-Podcast development set using Pearson's correlation and Concordance Correlation Coefficient (CCC) across 5 random seeds, the cross-lingual transfer models significantly outperformed direct training from scratch for the arousal attribute. For arousal, adapting a model with as little as 1 to 2 hours of target data matched or surpassed a 100-hour mono-lingual baseline (e.g., Transfer-2h achieving ~0.683 Pearson compared to Direct-100h at ~0.721). In contrast, predicting valence and dominance proved more difficult for cross-lingual transfer, where transfer models failed to surpass the 100-hour mono-lingual baseline, requiring 10-20 hours of target adaptation data to achieve competitive performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building speech emotion recognition systems or affective computing pipelines for low-resource languages.

## Limitations

The study is restricted to two languages (English and Taiwanese Mandarin) and podcast datasets, and focuses specifically on continuous emotional attributes (arousal, valence, dominance) rather than discrete emotion categories.

## Related

- (link related pages by id as the wiki grows)
