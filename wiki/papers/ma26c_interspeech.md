---
id: ma26c_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1961
pdf: https://www.isca-archive.org/interspeech_2026/ma26c_interspeech.pdf
---

# MeanVC 2: Robust Low-Latency Streaming Zero-Shot Voice Conversion

[PDF](https://www.isca-archive.org/interspeech_2026/ma26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ma26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1961)

**TL;DR** — MeanVC 2 is a robust, low-latency streaming zero-shot voice conversion system that achieves an end-to-end first-packet latency of 110 ms while improving audio quality and speaker similarity over its predecessor.

## Problem

Prior streaming zero-shot voice conversion models like MeanVC suffer from several critical shortcomings, including slow and training-unfriendly chunkwise autoregressive denoising that doubles sequence length, performance degradation under small-chunk configurations, and high sensitivity to reference audio quality in timbre encoders. These issues hinder their deployment in real-time communication scenarios where both low latency and high fidelity are essential.

## Method

MeanVC 2 combines a pretrained streaming ASR bottleneck feature extractor (Fast-U2++), a universal timbre token encoder (UTTE), a 4-layer diffusion transformer (DiT) decoder, and a Vocos vocoder, containing 18M parameters in total. It introduces future-receptive chunking (FRC), a layer-wise receptive-field scheduling strategy with intra-chunk, backward, and forward masks across DiT blocks that eliminates clean-chunk teacher forcing and enables stable conversion with a 40 ms chunk size. Additionally, UTTE maps a global speaker embedding into key-value universal timbre tokens using MLPs and learnable priors, querying them with bottleneck features via cross-attention to isolate fine-grained speaker traits. The model is trained using the mean flows formulation to enable high-quality spectrogram generation in a single neural function evaluation (1-NFE).

## Results

Evaluated on 2,018 source-target pairs from the Mandarin Seed-TTS test set, MeanVC 2 achieves superior speaker similarity (SSIM) and speech quality (DNSMOS) compared to StreamVoice+ and MeanVC baselines. It reduces end-to-end first-packet latency from 211.52 ms (MeanVC 160 ms) down to 109.88 ms with an overall pipeline RTF of 0.633. In reference robustness evaluations using low-quality reference audio, MeanVC 2 outperforms variants utilizing multi-reference timbre encoders (MRTE). Ablation studies confirm that removing the forward mask causes the most severe degradation, while dropping UTTE or the tanh activation reduces speaker similarity.

## Code

- https://aslp-lab.github.io/MeanVC2/

## Applications

Real-time communication applications such as live broadcasting, online meetings, voice chat in multiplayer games, movie dubbing, and privacy protection tools.

## Limitations

Performance slightly trails models operating with larger 160 ms chunk sizes that benefit from richer contextual history for acoustic reconstruction.

## Related

- (link related pages by id as the wiki grows)
