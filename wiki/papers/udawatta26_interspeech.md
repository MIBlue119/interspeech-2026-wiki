---
id: udawatta26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1579
pdf: https://www.isca-archive.org/interspeech_2026/udawatta26_interspeech.pdf
---

# Phonetically Grounded Vowel Space Metrics for Evaluating Synthetic Speech During TTS Model Training

[PDF](https://www.isca-archive.org/interspeech_2026/udawatta26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/udawatta26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1579)

**TL;DR** — The paper introduces two phonetically grounded objective metrics, Vowel Space Overlap and Procrustes Normalised Disparity, to evaluate synthetic speech and track accent acquisition during text-to-speech model training without costly subjective listening tests.

## Problem

Traditional text-to-speech training relies on loss curves that lack linguistic interpretability and fail to capture perceptual changes in pronunciation or accent. Although subjective listening tests accurately measure accent similarity, they are expensive, time-consuming, and impractical to perform repeatedly during training. Prior efforts to track vowel space geometry have remained purely qualitative and visual rather than measurable, reproducible metrics.

## Method

The authors propose two geometric metrics calculated at various training checkpoints using formant frequencies (F1 and F2) extracted at vowel midpoints via Parselmouth/Praat after segmentation with WebMAUS. The Vowel Space Overlap metric measures the intersection area between synthesised and ground-truth corner vowel polygons using the Sutherland-Hodgman clipping algorithm and shoelace formula. The Procrustes Normalised Disparity metric computes the sum of squared residuals after centering, scaling via Frobenius norms, and optimally rotating synthesised corner vowels to match the target accent. A Tacotron 2 model pre-trained on General American English (24 hours) was fine-tuned separately on New Zealand English (1 hour, 28,000 steps) and General Indian English (10 hours, 28,000 steps) to evaluate the metrics.

## Results

Evaluated using online listening tests with 23 participants per accent rating 5-point Likert similarity scales across multiple training steps. Results confirm significant positive correlations between the proposed metrics and perceived accent similarity for both New Zealand English and General Indian English. Specifically, the Overlap metric reaches its maximum while the Procrustes metric hits near-zero minimum disparity at optimal training checkpoints (step 3000 for New Zealand English and step 24000 for General Indian English), successfully tracking how closely synthetic speech matches target accent phonology.

## Code

- https://github.com/pasindu-ud/vowel-space-metrics/tree/interspeech-2026

## Applications

Speech and machine learning engineers developing or fine-tuning text-to-speech systems can use these metrics to automatically monitor pronunciation accuracy and accent convergence during training.

## Limitations

Validated on Tacotron 2 fine-tuned on two specific accent pairs (General American English to New Zealand English and General Indian English), leaving evaluation on broader architectures and diverse languages for future work.

## Related

- (link related pages by id as the wiki grows)
