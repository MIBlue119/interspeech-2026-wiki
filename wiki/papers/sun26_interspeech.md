---
id: sun26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-478
pdf: https://www.isca-archive.org/interspeech_2026/sun26_interspeech.pdf
---

# Prosodic ABX: A Language-Agnostic Method for Measuring Prosodic Contrast in Speech Representations

[PDF](https://www.isca-archive.org/interspeech_2026/sun26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-478)

**TL;DR** — The paper introduces Prosodic ABX, a training-free evaluation framework utilizing dynamic time warping to quantify lexical prosody encoding in self-supervised speech models, demonstrating that S3Ms substantially outperform traditional acoustic baselines across English, Japanese, and Mandarin.

## Problem

While self-supervised speech models (S3Ms) are well-studied for phonetic sensitivity, their capacity to capture prosodic contrasts—such as lexical stress, pitch accent, and tone—remains poorly understood because existing probing methods rely on heavy supervision, mean-pooling that destroys temporal structure, and labeled datasets. This lack of direct geometric measurement hinders the use of S3Ms in distance-based applications like clustering and utterance comparison where prosodic prominence is critical. To address this, the authors develop a language-agnostic minimal-pair evaluation framework that bypasses explicit classifiers and operates directly on representation space.

## Method

The authors propose Prosodic ABX, adapting the classical ABX discrimination task via dynamic time warping (DTW) to compare representation sequences from minimal pairs without training or explicit labels. Given a triplet where A and B share identical phonemic sequences and speakers but possess contrasting prosody, and X represents a separate speaker with the same prosody as A, frame-wise DTW alignment computes a normalized distance metric to evaluate whether representations emphasize linguistically relevant features. The evaluation suite covers 17 diverse S3Ms spanning wav2vec 2.0, HuBERT, XLSR, mHuBERT, and WavLM in base and large configurations, pretrained across English, Japanese, Mandarin, and multilingual sets. The study introduces and releases specialized natural recording corpora for English (15 noun-verb stress pairs across 10 speakers) and Japanese (23 pitch-accent pairs across 10 speakers), alongside 2310 Mandarin tone pairs from an existing corpus, plus synthetic evaluation counterparts generated via Google Cloud TTS and Kokoro.

## Results

Across natural speech evaluations, the best-performing S3M layers achieve error rates of roughly 26% on English stress, 19% on Japanese pitch accent, and 5% on Mandarin tone, substantially outperforming traditional acoustic baselines like mel-spectrograms and MFCCs. Human listening experiments reveal that while native English listeners underperform the weakest S3Ms on stress (29% vs 26%), native Japanese and Mandarin speakers outperform the top model variants on pitch accent (9% vs 19%) and tone (2% vs 5%). Furthermore, a strong word-level correlation (r = 0.94) is observed between human and model error rates on English stress pairs, highlighting that models and humans struggle with the same specific lexical items.

## Code

- https://github.com/stephenmac7/prosodic-abx

## Applications

Speech engineers and researchers can use this framework to evaluate, select, and rank self-supervised speech models for prosody-sensitive tasks such as computer-assisted pronunciation training, visual pronunciation feedback, and expressive speech synthesis.

## Limitations

The evaluation relies on minimal pairs clipped from carrier sentences or generated via text-to-speech, and performance is bounded by the availability or construction of clean prosodic minimal-pair data.

## Related

- (link related pages by id as the wiki grows)
