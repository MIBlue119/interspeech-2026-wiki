---
id: zhang26p_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1187
pdf: https://www.isca-archive.org/interspeech_2026/zhang26p_interspeech.pdf
---

# MultiAPI Spoof: A Multi-API Dataset and Local-Attention Network for Speech Anti-spoofing Detection

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1187)

**TL;DR** — The paper introduces MultiAPI Spoof (a 230-hour dataset spanning 30 synthesis APIs) and Nes2Net-LA, achieving state-of-the-art anti-spoofing generalization and enabling fine-grained API source attribution.

## Problem

Current speech anti-spoofing benchmarks rely on a narrow selection of public models, creating a substantial domain gap when deployed against real-world commercial systems that use diverse, proprietary APIs. Models trained exclusively on legacy open-source datasets generalize poorly to unseen commercial generators and web platforms. To bridge this gap, speech systems need training data representing the modern landscape of closed-source and open-source APIs, alongside fine-grained attribution capabilities.

## Method

The authors introduce MultiAPI Spoof, comprising 230 hours of synthetic speech (paired 1:1 with bona fide CommonVoice data) generated from 30 distinct APIs, split into seen (A0–A20) and unseen (A21–A29) sets. They propose Nes2Net-LA, an enhanced variant of Nes2Net-X that uses the XLSR-300M encoder for high-dimensional feature extraction. Between the nested multi-scale feature blocks, Nes2Net-LA integrates a sliding-window local attention mechanism (with a window radius of K=1 and J=8 channel splits) to capture long-range cross-block dependencies and refine fine-grained spoofing cues without the high computational cost of global attention. Furthermore, they define an API tracing task formulated as a 22-class classification problem (21 seen APIs plus an unseen threshold category) using an attention pooling backend.

## Results

Evaluated across multiple benchmarks (ITW, AI4T, and MultiAPI Spoof test sets), incorporating MultiAPI Spoof training data drastically lowers Equal Error Rate (EER) and minDCF across all models. For instance, training with MultiAPI Spoof drops the EER of XLSR+AASIST from 7.30% to 0.70% and XLSR+Nes2Net from 7.08% to 0.69% on the MultiAPI Spoof test set. On the main evaluation, the proposed XLSR+Nes2Net-LA achieves state-of-the-art performance, recording an EER of 1.42% on ITW, 0.48% on MultiAPI Spoof seen, 0.62% on MultiAPI Spoof unseen, 0.56% overall, and 5.64% on AI4T. On the API tracing task, the baseline achieves an overall macro F1 score of 0.778.

## Code

- https://github.com/XuepingZhang/MultiAPI-Spoof

## Applications

Engineers building robust speech deepfake detectors and digital forensic analysts tracking the origins of malicious synthetic audio or unauthorized commercial API usage.

## Limitations

The dataset and evaluation are currently restricted to English speech audio segments.

## Related

- (link related pages by id as the wiki grows)
