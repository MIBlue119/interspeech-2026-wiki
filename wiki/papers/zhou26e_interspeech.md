---
id: zhou26e_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1696
pdf: https://www.isca-archive.org/interspeech_2026/zhou26e_interspeech.pdf
---

# Beyond One-Size-Fits-All: Personalized and Culturally Adaptive Emotional TTS via Interactive Optimization of Individual Emotion Perception Spaces

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1696)

**TL;DR** — This paper proposes a personalized and culturally adaptive emotional text-to-speech (TTS) framework that uses an interactive genetic algorithm to optimize arousal-valence perception spaces for individual listeners, achieving significantly higher emotional alignment and naturalness.

## Problem

Most emotional TTS systems rely on categorical labels or universal dimensional mappings trained on population-averaged data, ignoring individual and cross-cultural differences in emotional interpretation. This one-size-fits-all approach causes noticeable mismatches between modeled emotion coordinates and what a specific listener actually perceives. Relying on large-scale preference alignment methods like RLHF is computationally heavy, making rapid lightweight user-specific adaptation necessary.

## Method

The framework couples a Grad-TTS backbone with a dedicated Emotion Controller module containing an Emotion Feature Predictor, a Pitch Predictor, and an Energy Predictor. The Emotion Feature Predictor applies Gaussian Fourier feature mapping to low-dimensional arousal-valence (A-V) coordinates and maps them through a four-layer MLP to high-dimensional latent emotion vectors extracted from a pre-trained Speech Emotion Recognition (SER) model. To adapt these representations without retraining the backbone, an Interactive Genetic Algorithm (IGA) iteratively refines candidate A-V coordinates via multi-parent arithmetic crossover and a decaying uniform mutation strength based on direct user preference feedback.

## Results

Evaluated on a 9-hour American English female emotional speech dataset combining EXPRESSO, EmoV-DB, and ESD, using subjective listening tests and 30 participants across Chinese, Indonesian, and Japanese cultural groups. The proposed model improves Mean Opinion Score (MOS) from 3.37 to 3.75, reduces Word Error Rate (WER) from 21% to 17% (a 23.5% relative drop), and improves Concordance Correlation Coefficients (CCC) for arousal from 0.60 to 0.84 and valence from 0.64 to 0.77 compared to baseline Grad-TTS with emotion embeddings. Subjective A/B preference tests confirm that both individual personalization and cultural adaptation significantly outperform standard U.S. data-based A-V baselines.

## Code

- https://37integer.github.io/Beyond-One-Size-Fits-All/

## Applications

Conversational AI agents, interactive digital avatars, and assistive speech technologies requiring culturally sensitive or user-tailored emotional expression.

## Limitations

The interactive optimization requires multiple rounds of user feedback per target emotion to converge on personalized coordinates.

## Related

- (link related pages by id as the wiki grows)
