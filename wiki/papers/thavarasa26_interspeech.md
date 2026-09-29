---
id: thavarasa26_interspeech
category: paralinguistics-emotion
labels: [multilingual, self-supervised]
institutions: ["University of Moratuwa"]
code: https://github.com/aaivu/KuralHub
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3502
pdf: https://www.isca-archive.org/interspeech_2026/thavarasa26_interspeech.pdf
---

# KuralHub: Exposing Typological Capability Frontiers in Multilingual Speech Emotion Recognition

*Luxshan Thavarasa, Jubeerathan Thevakumar, Thanikan Sivatheepan, Uthayasanker Thayasivam*

[PDF](https://www.isca-archive.org/interspeech_2026/thavarasa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/thavarasa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3502)

**Category:** `paralinguistics-emotion` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — KuralHub benchmarks 11 self-supervised speech models across 33 datasets in 29 languages, revealing that SER cross-lingual transferability is bottlenecked by structural linguistic typology rather than pre-training data volume or model parameter scale.

## Key contributions

- Introduces KuralHub, an open-science multilingual SER benchmark covering 29 diverse languages and 33 emotional speech datasets.
- Exposes a critical typological capability frontier: state-of-the-art models systematically fail on morphologically complex and agglutinative language families like Dravidian.
- Demonstrates through linear mixed-effects modeling that raw parameter scaling yields no positive correlation with multilingual SER performance (and log(ModelSize) shows a negative correlation).
- Provides a systematic evaluation of 11 pretrained models (HuBERT, Wav2vec 2.0, WavLM, and Whisper) using frozen feature extraction and standardized classification heads.

## Problem

Speech Emotion Recognition advancements are heavily constrained by high-resource language bias, leaving the global linguistic diversity of over 7,000 languages largely unsupported. While self-supervised learning models have excelled in automatic speech recognition and speaker identification, their cross-lingual SER capabilities remain under-explored. Prior approaches assume that simply scaling model parameters or pre-training data volume solves cross-lingual transfer, ignoring structural linguistic differences, phonological variations, and cultural nuances in emotional expression.

## Method

The study evaluates 11 pretrained speech models: HuBERT (base, large-ft), Wav2Vec 2.0 (base, large-960h, large-lv60, xls-r-1b, xls-r-300m), WavLM (base-plus, large), and Whisper (small, large). To maintain a computationally equitable evaluation and avoid large-scale label adaptation costs, the pretrained feature extractors are kept entirely frozen, leveraging their learned acoustic representations.

A lightweight classification head is appended on top of the frozen backbone, consisting of a two-layer feedforward network with GELU activations and dropout regularization. The classification head maps the extracted embeddings to emotion class probabilities. Audio inputs are resampled to 16 kHz and normalized using Librosa before being passed through the backbones.

Models are trained end-to-end on the classification head using cross-entropy loss and the Adam optimizer for up to 30 epochs with early stopping based on validation loss. Each dataset is split into 70% training, 15% validation, and 15% test sets. Evaluation focuses on five core categorical emotions present across all datasets: Anger, Happiness, Sadness, Neutral, and Fear.

## Experimental setup

The benchmark utilizes 33 datasets spanning 29 languages, comprising both high-resource (e.g., Mandarin, English, French) and under-resourced languages (e.g., Amharic, Odia, Quechua, Kannada, Tamil, Telugu), ranging from 300 to over 300,000 samples per dataset. Baselines include 11 self-supervised configurations across HuBERT, Wav2Vec 2.0, WavLM, and Whisper families. Metrics include precision, recall, macro/weighted F1-scores, Unweighted Average Recall (UAR), and Weighted Accuracy (WA). Implementation uses PyTorch, Librosa, Adam optimizer, and early stopping on validation loss.

## Results

Whisper models achieved the highest average F1-score (µ_whisper-small = 0.70, µ_whisper-large = 0.70), followed by HuBERT-base (µ = 0.68) and WavLM (µ_wavlm-large = 0.64). Wav2Vec 2.0 showed significant performance degradation in a mixed-effects model (β = -0.195, p < 0.001). Contrary to scaling expectations, log(ModelSize) exhibited a significant negative correlation with F1-score (r = -0.1769, p = 0.0007), where increasing parameter scale by a factor of e reduced F1 by approximately 4.8 points.

Notable successes included Mandarin (µ = 0.755), Indonesian (µ = 0.720), Persian (µ = 0.67), and Amharic (µ = 0.636), which outperformed several resource-rich European languages like French (µ = 0.421) and Russian (µ = 0.344). Conversely, models universally collapsed on Dravidian languages such as Kannada (µ = 0.275) and Tamil (µ = 0.306), exposing a structural capability frontier.

| Model Architecture | Mean F1-Score | Key Findings |
|---|---|---|
| Whisper-small / large | 0.70 | Highest average robustness across languages |
| HuBERT-base | 0.68 | Strong cross-lingual baseline performance |
| WavLM-large | 0.64 | Moderate generalization, outperformed by Whisper |
| Wav2Vec 2.0 (large-lv60) | 0.25 | Significant degradation (β = -0.195 vs reference) |

## Limitations

The study relies exclusively on frozen last-layer features from pretrained models, which may omit critical paralinguistic cues trapped in intermediate layers. Dataset conditions (acted versus spontaneous speech) account for roughly 40% of performance variance, complicating zero-shot comparisons. Furthermore, 25 of the 29 evaluated languages were represented by a single dataset, limiting dialectal robustness assessment.

## Why read this

Speech and ML researchers building multilingual speech technologies should read this to understand why blind parameter scaling fails for cross-lingual emotion recognition. It provides an essential blueprint for identifying and addressing structural typological capability frontiers.

## Code

- https://github.com/aaivu/KuralHub

## Applications

Development of inclusive, typologically-aware spoken dialogue systems, cross-lingual affective computing, and emotionally intelligent human-computer interfaces for under-resourced languages.

## Institutions / 機構

University of Moratuwa

## Related

- [Universality of Speech Emotion Recognition in Humans and Speech Language Models](tatsumi26_interspeech.md) — same problem · relatedness 2.7/3
- [TIMBRE: Layer-Wise Cross-Lingual Speech Emotion Recognition Across 49 Layers and 26 Corpora](marchenko26_interspeech.md) — same problem · relatedness 2.6/3
- [Quantifying Cross-Lingual Transfer in Paralinguistic Speech Tasks](buitrago26_interspeech.md) — same problem · relatedness 2.5/3
- [How Language-Independent Are Emotional Attributes? A Study on Training Data Scaling and Cross-Lingual Generalization](halmai26_interspeech.md) — same problem · relatedness 2.5/3
- [Learning Emotion-discriminative Representations for Zero-Shot Cross-Lingual Speech Emotion Recognition](mi26_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
