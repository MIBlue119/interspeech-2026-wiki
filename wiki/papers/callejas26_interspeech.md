---
id: callejas26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2352
pdf: https://www.isca-archive.org/interspeech_2026/callejas26_interspeech.pdf
---

# MultiLinguahah : A New Unsupervised Multilingual Acoustic Laughter Segmentation Method

[PDF](https://www.isca-archive.org/interspeech_2026/callejas26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/callejas26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2352)

**TL;DR** — This paper presents MultiLinguahah, an unsupervised multilingual laughter segmentation approach that outperforms existing English-centric methods in non-English acoustic settings.

## Problem

Current automatic laughter segmentation models rely heavily on costly manual annotations and are overwhelmingly optimized for English contexts like sitcoms, struggling when transferred to diverse, in-the-wild multilingual environments with background noise and music. Because laughter acoustics are universal across cultures, an unsupervised, language-agnostic detection system is necessary to bypass the bottleneck of collecting precise timestamp labels across multiple languages.

## Method

The pipeline begins with speech removal using either a DenseNet-based audio source separation model or channel subtraction for studio recordings, followed by energy-based peak detection via auditok to extract non-speech audio events. These events are encoded into general-purpose vector representations using BYOL-A—pretrained on AudioSet and FSD50K with target-domain unlabelled data adaptation. Finally, an Isolation Forest anomaly detection algorithm isolates laughter from background noise and music by exploiting its consistent acoustic profile.

## Results

Evaluated across four corpora including StandUp4AI (7 languages, 100 videos), AudioSet, Friends, and Kuznetsova, the method is tested using Intersection over Union (IoU) thresholds of 0.3 and 0.7 to measure interval detection and temporal precision. MultiLinguahah achieves competitive or superior F1 and IoU scores compared to supervised baselines like Gillick et al. and Omine et al., and unsupervised K-means clustering (Liu et al.), particularly excelling in non-English settings such as Hungarian (HU), Czech (CS), and Russian (RU) where it reaches an IoU=0.3 F1-score of up to 0.796.

## Code

- https://github.com/sofia-callejas/Multilinguahah

## Applications

Engineers and researchers building socially interactive agents, emotion recognition systems, or humor extraction pipelines for multilingual and in-the-wild audio content.

## Limitations

The approach relies on the efficacy of an initial speech removal step, meaning imperfect separation of overlapping speech and laughter can degrade down-stream anomaly detection performance.

## Related

- (link related pages by id as the wiki grows)
