---
id: mandel26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1663
pdf: https://www.isca-archive.org/interspeech_2026/mandel26_interspeech.pdf
---

# From A to B to A: Palindromic Zero-Shot Voice Conversion with Non-Parallel Data

[PDF](https://www.isca-archive.org/interspeech_2026/mandel26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mandel26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1663)

**TL;DR** — A zero-shot voice conversion framework uses KNN-retrieved WavLM features and a waveform-level speaker loss to achieve strong speaker similarity without parallel data.

## Problem

Traditional voice conversion systems either require expensive parallel speech corpora or rely on imperfect disentanglement techniques that leak speaker information or damage linguistic content. Collecting large-scale parallel data is impractical, making scalable non-parallel training paradigms essential for any-to-any zero-shot voice conversion.

## Method

The framework utilizes a three-stage training pipeline consisting of a pre-trained WavLM encoder (6th layer), a 77M-parameter six-layer Transformer converter (1024 hidden dimension, 16 attention heads) trained with an L1 feature loss and a waveform-level speaker verification loss, and a HiFi-GAN vocoder post-trained on converted features. Training data is constructed palindromically by generating synthetic source inputs via k-nearest neighbors (KNN) retrieval over target speech from LibriSpeech (960 hours). The model is optimized using Adam with a learning rate of 3e-4, incorporating adversarial multi-period and multi-scale discriminators.

## Results

Evaluated on LibriSpeech and Multilingual LibriSpeech datasets across 3, 10, 30, and 60-second prompt durations using Speaker Similarity, Equal Error Rate (EER), Word Error Rate (WER), Character Error Rate (CER), DNS-MOS, MOS, and SMOS metrics. Compared against Seed-VC, KNN-VC, Vevo, and OOVC baselines, the proposed approach achieves superior speaker similarity and EER while maintaining competitive WER/CER and perceptual quality. An ablation study confirms that vocoder post-training mitigates auditory artifacts and improves DNS-MOS scores.

## Code

- https://palindromic-vc.github.io

## Applications

Speech engineers and developers building zero-shot any-to-any voice conversion systems, cross-lingual voice cloning applications, and dubbing tools requiring identity preservation from short reference audio.

## Limitations

The model's expressive range and performance on highly expressive or real-time streaming speech are scope bounds left for future work.

## Related

- (link related pages by id as the wiki grows)
