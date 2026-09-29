---
id: tatsumi26_interspeech
category: paralinguistics-emotion
labels: [multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3061
pdf: https://www.isca-archive.org/interspeech_2026/tatsumi26_interspeech.pdf
---

# Universality of Speech Emotion Recognition in Humans and Speech Language Models

*Yuka Tatsumi, Nathan Roll, Robert D. Hawkins, Meghan Sumner, Dan Jurafsky*

[PDF](https://www.isca-archive.org/interspeech_2026/tatsumi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tatsumi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3061)

**Category:** `paralinguistics-emotion` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — This study compares cross-language speech emotion recognition in 101 English monolingual humans and two frozen ASR models (Whisper and HuBERT), demonstrating that SLMs achieve human-level or superior "universality" (well above chance on French, Japanese, Greek, and Thai) despite operating under fundamentally different error profiles and response biases.

## Key contributions

- First direct, systematic comparison of cross-lingual emotional speech recognition between human listeners and frozen ASR-trained SLMs using identical emotion stimuli and tasks.
- Evaluation of two 24-layer English-only ASR encoders (Whisper-medium.en and HuBERT-large-ll60k) across 4 non-English languages using layer-wise probing without fine-tuning.
- Discovery that Whisper matches human accuracy (-1.4% diff, CI crosses zero) while HuBERT significantly outperforms human baseline (+6.8% diff).
- Identification of stark qualitative divergence in response biases: humans systematically default to neutral when uncertain, whereas Whisper exhibits a happy/angry bias and HuBERT a surprise bias.

## Problem

Psychological literature has long established that human listeners exhibit "universality" in recognizing emotions in unfamiliar, ununderstood languages, but it remains unknown whether computational speech models do the same. Prior work on cross-lingual Speech Emotion Recognition (SER) evaluates models trained specifically for emotion classification, leaving open whether broadly trained ASR models organically develop cross-lingual emotional representations. Furthermore, it is unclear whether machines and humans achieve this performance through similar acoustic-prosodic strategies or if they suffer from contrasting response biases and error distributions.

## Method

The study evaluates human perception through a controlled online experiment where 119 US-based monolingual English speakers judged 67 randomized utterances per session across Canadian French, Japanese, Greek, and Thai datasets, selecting from 6 basic emotion categories (happy, sad, angry, fear, surprise, neutral) under strict response time limits and attention checks.

For the computational experiments, the authors extracted hidden state embeddings from all 24 layers of two frozen English monolingual ASR models: Whisper-medium.en and HuBERT-large-ll60k. Global mean pooling was applied over the temporal dimension to yield 1024-dimensional utterance vectors. Multinomial logistic regression probes with L2 regularization were trained on 26,498 English emotional speech items pooled from CREMA-D, RAVDESS, and ESD using an 80/10/10 split.

Probes were tested zero-shot on the exact same non-English human test stimuli. The primary analysis relied on the layer achieving peak validation accuracy on held-out English data (Layer 17 for Whisper at 89.1% validation, Layer 11 for HuBERT at 88.0% validation), preventing any data leakage or tuning on the cross-lingual target data.

## Experimental setup

Human data comprised 119 monolingual English listeners evaluated on CaFE (French), JVNV (Japanese), AESDD (Greek), and THAI-SER (Thai). Model training used English datasets ESD (17,500 items), CREMA-D (7,442 items), and RAVDESS (1,556 items). Evaluation metrics focused on overall classification accuracy, layer-wise probing accuracy, and error-distribution response biases (analyzing incorrect predictions to expose system fallbacks).

## Results

On non-English test data, Whisper achieved 39.0% accuracy (statistically indistinguishable from the human mean of 43.8%, BCa CI [-6.7%, 3.9%]), while HuBERT achieved 48.3% accuracy, significantly outperforming human listeners (BCa CI [1.8%, 12.0%]), all well above the 21.4% majority-class chance level. When analyzing errors to measure bias, human listeners overwhelmingly defaulted to neutral (32.4% of incorrect responses), whereas Whisper’s primary layer defaulted to happy (52.4%) and HuBERT’s defaulted to surprise (53.0%), highlighting deep qualitative divergence in how machines handle acoustic ambiguity compared to humans.

| System | Overall Accuracy (%) | Primary Error Bias | Top Performing Emotion |
|---|---|---|---|
| Human Listeners | 43.8% | Neutral (32.4%) | Neutral (80.0%) |
| Whisper-medium.en | 39.0% | Happy (52.4%) | Happy (89.1%) |
| HuBERT-large-ll60k | 48.3% | Surprise (53.0%) | Surprise (81.0%) |

## Limitations

The study relies on acted rather than spontaneous emotional speech datasets, which may limit ecological validity. The English training corpora were collected independently and were not fully normalized in category definitions or acoustic intensity. Additionally, only a single dataset per non-English language was evaluated, and potential leakage of multilingual data during Whisper's web-scale pretraining cannot be strictly ruled out.

## Why read this

Speech and ML researchers studying affective computing or cross-lingual representations should read this to understand that standard ASR pretraining implicitly encodes universal emotion structures, yet exhibits radically different perceptual biases than human listeners.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual speech emotion recognition, affective spoken dialogue systems, and psychoacoustic evaluation benchmarks for self-supervised speech encoders.

## Institutions / 機構

Stanford University

## Related

- (link related pages by id as the wiki grows)
