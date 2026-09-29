---
id: udawatta26_interspeech
category: resources-evaluation
institutions: ["University of Auckland"]
code: https://github.com/pasindu-ud/vowel-space-metrics/tree/interspeech-2026
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1579
pdf: https://www.isca-archive.org/interspeech_2026/udawatta26_interspeech.pdf
---

# Phonetically Grounded Vowel Space Metrics for Evaluating Synthetic Speech During TTS Model Training

*Pasindu Udawatta, Jesin James, Sally Akevai Nicholas, B. T. Balamurali, C. I. Watson*

[PDF](https://www.isca-archive.org/interspeech_2026/udawatta26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/udawatta26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1579)

**Category:** `resources-evaluation`

**TL;DR** — The paper proposes two phonetically grounded objective metrics—Vowel Space Overlap and Procrustes Normalised Disparity—to evaluate synthetic speech during TTS training, showing strong correlations with human perceived accent similarity across two distinct English accents.

## Key contributions

- Introduces Vowel Space Overlap, an area-based metric calculated via Sutherland-Hodgman polygon clipping and the shoelace formula to quantify shared acoustic space between synthetic and ground-truth vowels.
- Introduces Procrustes Normalised Disparity, a statistical shape analysis metric that measures geometric mismatch independent of translation, scale, and rotation.
- Demonstrates through online perception tests (N=46 total participants) that both metrics correlate strongly with mean accent similarity across New Zealand English and General Indian English fine-tuning runs.

## Problem

Synthetic speech is traditionally monitored using standard loss curves during training and costly subjective listening tests post-training. Loss curves lack linguistic interpretability, fail to reflect pronunciation accuracy or perceptual shifts, and provide no insight into how well a TTS model adapts to a target language or accent. Prior qualitative observations noted that synthesized vowel spaces visually converge toward target accents, but this phenomenon lacked a quantitative, reproducible formulation.

## Method

The approach tracks the geometric evolution of corner vowel spaces in the first (F1) and second (F2) formant frequency plane across training steps. The base model is a Tacotron 2 trained on 24 hours of General American English (GAE) for 376,000 steps, which is then fine-tuned on either 1 hour of New Zealand English (NZE) or 10 hours of General Indian English (GIE). Vowels are mapped using Wells' lexical sets (11 monophthongs per accent), with corner vowels selected to define the polygonal vowel space: FLEECE, THOUGHT, and START for NZE; FLEECE, GOOSE, and PALM for GIE.

At selected training steps, audio is synthesized from balanced word lists, phoneme boundaries are segmented using WebMAUS, and formants are extracted using Parselmouth (Praat) with a 25 ms Gaussian window at temporal midpoints. The Overlap metric computes the intersection polygon of synthesized and ground-truth shapes using Sutherland-Hodgman clipping and the shoelace formula, yielding values from 0 to the target area. The Procrustes metric centers, normalizes by Frobenius norm, and applies the orthogonal Procrustes algorithm (via scipy.linalg.orthogonal_procrustes) to find an optimal rotation matrix and scaling factor, outputting sum-of-squared residuals normalised by ground-truth variance.

These choices allow engineers to track accent acquisition objectively during training without waiting for full subjective evaluations. Overlap increases with better coverage, while Procrustes disparity decreases as shapes align, capturing complementary geometric dimensions of accent adaptation.

## Experimental setup

Evaluated using a Tacotron 2 model fine-tuned on a 1-hour NZE female corpus (NVIDIA K80 GPU, lr=0.001, ~36 hours) and a 10-hour GIE male corpus (NVIDIA RTX 4090 GPU, lr=0.001, ~6 hours). Evaluation relies on two online listening tests with 5-point Likert scale similarity ratings from 23 participants per accent. Metrics are computed at 8 discrete training checkpoints per accent, and Pearson correlation coefficients are calculated against mean accent similarity.

## Results

For NZE, both metrics and human ratings converge at step 3000 (Overlap peak = 5.9867, Procrustes minimum = 0.0002, Mean Accent Similarity = 2.50), after which alignment degrades. For GIE, metrics improve progressively, hitting optimal alignment at step 24000 (Overlap peak = 6.5546, Procrustes minimum = 0.0033, Mean Accent Similarity = 3.76). Pearson correlations with human ratings are strong and statistically significant for both accents: Vowel Space Overlap achieves r = 0.72 (p = 0.04) for NZE and r = 0.79 (p = 0.02) for GIE; Procrustes Disparity achieves r = -0.79 (p = 0.02) for both accents.

| System / Checkpoint | Overlap Metric | Procrustes Metric | Mean Accent Similarity |
| :--- | :--- | :--- | :--- |
| NZE Step 0 | 1.4644 | 0.2027 | 2.0556 |
| NZE Step 3000 (Optimal) | 5.9867 | 0.0002 | 2.5000 |
| NZE Step 16000 | 3.9862 | 0.0405 | 2.5000 |
| GIE Step 0 | 2.3343 | 0.1063 | 1.1594 |
| GIE Step 24000 (Optimal) | 6.5546 | 0.0033 | 3.7609 |
| GIE Step 28000 | 6.2040 | 0.0048 | 3.6957 |

## Limitations

The study is restricted to English accents, focusing solely on monophthong vowel spaces and ignoring consonants and coarticulation effects which may carry more weight in other language families. The evaluation is limited to a single Tacotron 2 architecture and two specific fine-tuning datasets of modest size (1 hour and 10 hours).

## Why read this

Speech researchers and TTS engineers building accent adaptation or low-resource fine-tuning pipelines will learn how to replace opaque loss curves with linguistically interpretable geometric metrics that correlate directly with human perception.

## Code

- https://github.com/pasindu-ud/vowel-space-metrics/tree/interspeech-2026

## Applications

Monitoring accent adaptation during TTS training, automating early stopping criteria based on pronunciation accuracy, and integrating phonetic objectives directly into loss functions or attention mechanisms.

## Institutions / 機構

University of Auckland

**Funding / 經費:** Marsden Fund

## Related

- (link related pages by id as the wiki grows)
