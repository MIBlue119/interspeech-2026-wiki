---
id: lin26l_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2408
pdf: https://www.isca-archive.org/interspeech_2026/lin26l_interspeech.pdf
---

# Decoding the Ear (DeEAR): A Framework for Objectifying Expressiveness from Human Preference Through Efficient Alignment

[PDF](https://www.isca-archive.org/interspeech_2026/lin26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2408)

**TL;DR** — DeEAR is an objective evaluation framework for speech expressiveness that converts human preferences into a 0-100 score, achieving strong agreement with expert ratings (SRCC=0.85).

## Problem

Modern speech-to-speech models often generate intelligible yet robotic speech lacking necessary expressiveness. Existing evaluation relies on expensive, unscalable subjective human ratings or inadequate objective metrics like low-level acoustic features and narrow emotion recognition systems. Without an automated, objective expressiveness metric, systematic benchmarking and data curation remain significant bottlenecks.

## Method

DeEAR operationalizes expressiveness into three distinct dimensions: Emotion, Prosody, and Spontaneity. It employs a multi-stage pipeline: fine-tuned wav2vec2 models for emotion intensity and spontaneity scoring (incorporating a penalty for perceptual incongruence in hyper-clean synthetic speech), Gemini-2.5-Pro with Chain-of-Thought prompting for prosodic richness, and an XGBoost non-linear fusion module to predict overall expressiveness. Finally, a cross-lingual wav2vec2-large-xlsr-53 student model is distilled from the teacher ensemble to enable efficient inference.

## Results

Tested on human-annotated clips and benchmark datasets, DeEAR achieves a Spearman rank correlation coefficient (SRCC) of 0.85 and Pearson correlation of 0.91 with human ratings for overall expressiveness. When applied to automated benchmarking of seven state-of-the-art speech-to-speech models, DeEAR matches human rankings with an SRCC of 0.93. Furthermore, filtering open-source corpora with DeEAR yielded the 14-hour bilingual ExpressiveSpeech dataset, and fine-tuning a baseline model on it boosted expressiveness scores from 2.0 to 23.4.

## Code

- https://freedomintelligence.github.io/ExpressiveSpeech/

## Applications

Speech and ML engineers can use DeEAR for automated benchmarking of expressive speech-to-speech models and as a reward model or data curation filter to build higher-quality emotional dialogue datasets.

## Related

- (link related pages by id as the wiki grows)
