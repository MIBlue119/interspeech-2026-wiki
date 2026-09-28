---
id: onda26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1668
pdf: https://www.isca-archive.org/interspeech_2026/onda26_interspeech.pdf
---

# Leveraging Soft Distributions of SSL-Derived Discrete Speech Tokens for Downstream Inference

[PDF](https://www.isca-archive.org/interspeech_2026/onda26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/onda26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1668)

**TL;DR** — Applying soft token assignment over self-supervised learning cluster centroids exclusively during downstream inference enhances representation expressiveness while retaining training-time compression efficiency.

## Problem

Discretizing continuous self-supervised learning features via k-means clustering yields strong data compression and speaker-invariance benefits, but inevitably discards acoustic and phonetic information, causing performance degradation in downstream tasks. While alternative methods like soft training-time representations avoid this, they sacrifice training efficiency and incur high computational costs.

## Method

The authors propose computing a softmax-based posterior probability distribution (soft assignment) over pre-trained k-means token centroids using distances from continuous self-supervised features strictly at inference time. Downstream models are trained with conventional hard token assignment using ESPnet, utilizing HuBERT-large and WavLM-large models extracting features from the 21st layer. A softmax temperature parameter controls the distribution sharpness during inference, and a weighted sum of token embeddings serves as the downstream model input. Codebook sizes of 128, 1024, and 4096 clusters are evaluated.

## Results

Evaluated on LibriSpeech-100h ASR with in-domain and out-of-domain sets (TED-LIUM v2, CHiME4, ERJ) and LJSpeech/TIMIT speech synthesis, the method consistently outperforms hard token assignment across almost all metrics. For non-native ASR (ERJ set), HuBERT (K=1024, 4096) and WavLM (K=4096) with soft inference outperform continuous feature baselines, achieving WER reductions (e.g., dropping from 16.0% to 10.7% for K=4096 WavLM). In voice conversion using HiFi-GAN, the approach improves phonetic posteriorgram distance, F0 correlation, and speaker similarity compared to hard assignments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building speech recognition, synthesis, or voice conversion systems who want the training-time compression benefits of discrete speech tokens without sacrificing inference accuracy.

## Limitations

The approach requires hyperparameter tuning of the softmax temperature parameter for different tasks.

## Related

- (link related pages by id as the wiki grows)
