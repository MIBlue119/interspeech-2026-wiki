---
id: thavarasa26_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3502
pdf: https://www.isca-archive.org/interspeech_2026/thavarasa26_interspeech.pdf
---

# KuralHub: Exposing Typological Capability Frontiers in Multilingual Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/thavarasa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/thavarasa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3502)

**TL;DR** — KuralHub is a comprehensive multilingual speech emotion recognition benchmark evaluating 11 self-supervised models across 33 datasets in 29 languages, revealing that cross-lingual transfer is constrained by linguistic typology rather than pre-training data volume or model parameter scale.

## Problem

Speech emotion recognition research suffers from a heavy high-resource language bias, leaving the vast majority of the world's 7,000 languages unsupported. While self-supervised learning models have advanced rapidly, their cross-lingual transferability and performance across diverse linguistic families remain insufficiently understood. This gap prevents the development of equitable, inclusive emotional intelligence systems for global populations.

## Method

The study benchmarks 11 pretrained self-supervised models—including variants of HuBERT, Wav2Vec 2.0, WavLM, and Whisper—across 33 publicly available datasets spanning 29 languages. The authors employ a frozen feature extractor configuration combined with a lightweight two-layer feedforward classification head using GELU activation and dropout. Each dataset is split into 70% training, 15% validation, and 15% testing, with the classification heads trained using cross-entropy loss and the Adam optimizer for up to 30 epochs.

## Results

Across all models and languages, the mean accuracy was 0.52 and the mean F1-score was 0.524, with Whisper models achieving the highest average F1-score (0.70) followed by HuBERT-base (0.68) and WavLM-large (0.64). The benchmark uncovers systematic failures on Dravidian languages (such as Kannada with a mean accuracy of 0.275 and Tamil at 0.306) due to their morphologically complex and agglutinative nature. Furthermore, linear mixed-effects modeling demonstrates a significant negative correlation between log model size and F1-score (r = -0.1769), showing that parameter scaling alone fails to resolve typological bottlenecks.

## Code

- https://github.com/aaivu/KuralHub

## Applications

Speech engineers and researchers can use this benchmark to evaluate, select, and design typologically-aware speech emotion recognition systems that perform equitably across diverse global languages.

## Limitations

The evaluation relies strictly on frozen last-layer features which may underrepresent paralinguistic cues stored in intermediate layers, and dataset recording conditions account for roughly 40% of performance variance.

## Related

- (link related pages by id as the wiki grows)
