---
id: kuwar26_interspeech
category: multilingual
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2262
pdf: https://www.isca-archive.org/interspeech_2026/kuwar26_interspeech.pdf
---

# VINAYAKA: Multilingual Audio-Visual Hate Speech Detection via Cross-Modal Fusion in Hyperbolic Space

[PDF](https://www.isca-archive.org/interspeech_2026/kuwar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuwar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2262)

**TL;DR** — VINAYAKA is a multilingual audio-visual hate speech detection framework that relies entirely on non-lexical audio-visual cues, achieving state-of-the-art macro-F1 scores up to 0.901 through cross-modal fusion in hyperbolic space.

## Problem

Current multimodal hate speech detection systems are overly reliant on text and ASR transcripts, making them highly susceptible to ASR error propagation, cross-lingual noise, and domain shifts. Furthermore, they treat audio and visual signals merely as auxiliary features in Euclidean space, ignoring the inherent hierarchical structure of behavioral and paralinguistic cues that convey hostility.

## Method

The framework uses frozen WavLM for raw audio feature extraction and a frozen ImageBind visual encoder for video frames, passing both through 1D-CNN layers and max pooling. These Euclidean representations are mapped into a negative curvature hyperbolic Poincaré ball using exponential maps. It then performs cross-modal fusion in hyperbolic space (CFHS) via hyperbolic distance-based cross-attention, Möbius addition, and Möbius scalar multiplication before projecting the features back to Euclidean space for classification with a fully connected softmax layer.

## Results

Evaluated on HateMM, ToxCMM, MultiHateClip-En, and MultiHateClip-Ch datasets using 5-fold cross-validation and zero-intervention cross-dataset transfer, measured by accuracy and macro-F1. VINAYAKA achieves in-distribution macro-F1 scores of 0.901 on HateMM, 0.885 on ToxCMM, 0.841 on MHCE, and 0.831 on MHCC, outperforming Euclidean baselines like concatenation and Euclidean cross-attention. Geometric ablations confirm that hyperbolic curvature ($c = -1$, F1 0.901 on HMM) substantially outperforms Euclidean ($c = 0$, F1 0.877) and spherical ($c = +1$, F1 0.801) spaces.

## Code

- https://bhavin-19.github.io/vinayaka-interspeech26/

## Applications

Content moderation systems and online video platforms needing robust, language-agnostic hate speech and toxic content detection across multilingual and code-mixed short- or long-form videos.

## Limitations

Cross-lingual and cross-cultural transfer performance drops significantly when moving between highly divergent domains like Chinese and English datasets due to differences in symbolic and conversational context.

## Related

- (link related pages by id as the wiki grows)
