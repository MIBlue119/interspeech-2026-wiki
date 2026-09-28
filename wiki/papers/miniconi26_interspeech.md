---
id: miniconi26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-449
pdf: https://www.isca-archive.org/interspeech_2026/miniconi26_interspeech.pdf
---

# TDScore: Learning Synthetic Speech Quality Predictors from TTS Training Dynamics without Human annotation

[PDF](https://www.isca-archive.org/interspeech_2026/miniconi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/miniconi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-449)

**TL;DR** — The paper introduces TDScore, a framework that trains synthetic speech quality predictors using internal text-to-speech training dynamics (iteration index and loss) as pseudo-annotations instead of costly human ratings, achieving strong correlation with human MOS across multiple languages and datasets.

## Problem

Subjective listening tests for text-to-speech evaluation are costly, slow, and hard to scale, while existing automatic speech quality predictors depend heavily on expensive human annotations and struggle with domain shifts. Moreover, human evaluators have limited perceptual resolution, meaning subtle quality variations important for model development often go unnoticed. This creates a need for learning strategies that eliminate human annotation reliance and provide robust signals for model selection and training monitoring.

## Method

The proposed TDScore framework extracts audio samples from intermediate checkpoints of text-to-speech models trained from scratch, pairing each waveform with its training metadata (checkpoint iteration index and training loss). To avoid confusing the predictor with saturated checkpoints that lack perceptual variability, an ensemble of objective metrics determines a maximum training iteration threshold, discarding later checkpoints. The architecture builds on a self-supervised learning MOS prediction network (SSL-MOS) adapted to predict normalized iterations or standardized losses. Training uses a pairwise ranking objective optimized via binary cross-entropy over score differences. Experiments utilize three neural TTS architectures—FastSpeech 2, FastPitch, and F5-TTS—trained on 51 hours of French audiobook data from the Blizzard Challenge 2023.

## Results

Evaluated on the VoiceMOS Challenge 2023 (French), BVCC (English), and SOMOS (English) benchmarks, TDScore variants demonstrate competitive Spearman Rank Correlation Coefficients with human mean opinion scores. Specifically, the TDScore-F5 iteration predictor achieves high correlation on internal hold-out validation sets (up to 0.84 to 0.90 SRCC). The approach performs robustly across diverse architectures and languages without leveraging any human perceptual labels during training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing text-to-speech systems can use this approach to monitor training convergence, perform automated checkpoint selection, and evaluate synthetic speech quality without human listening tests.

## Limitations

The framework requires access to intermediate training checkpoints and training metadata from the target text-to-speech models, and performance depends on appropriately filtering out saturated checkpoints where perceptual quality plateaus.

## Related

- (link related pages by id as the wiki grows)
