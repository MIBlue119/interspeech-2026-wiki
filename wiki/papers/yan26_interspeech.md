---
id: yan26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-192
pdf: https://www.isca-archive.org/interspeech_2026/yan26_interspeech.pdf
---

# UniSE: A Unified Framework for Decoder-Only Autoregressive LM-Based Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/yan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-192)

**TL;DR** — UniSE is a unified decoder-only autoregressive language model framework for speech enhancement, target speaker extraction, and speech separation, optimized via progressive reinforcement learning.

## Problem

Prior language model-based speech enhancement approaches are typically confined to single distortions or isolated tasks, limiting their broad applicability. Furthermore, standard supervised training relies on signal-level objectives like SI-SNR that correlate poorly with human auditory perception. Addressing these gaps is crucial for building universal, perceptually aligned speech processing backbones.

## Method

UniSE employs a 63M parameter LLaMA-style decoder-only architecture (12 layers, 8 heads, 512 hidden dimension) conditioned on acoustic and semantic features. Continuous conditioning features are extracted via a frozen WavLM encoder and mapped through a trainable linear adapter, while a neural audio codec (BiCodec) quantizes target speech into discrete global and semantic tokens. To unify tasks, learnable task indicators—namely SR, TSE, and reverse TSE modes—are prepended to the input sequence. The model is trained on a mixture of 460 hours of noise corpora, 60,000 RIR samples, and 4,760 hours of clean speech, followed by a two-stage progressive reinforcement learning (PRL) alignment phase using Direct Preference Optimization (DPO).

## Results

Evaluated on DNS 2020 Challenge test sets, UniSE with PRL achieves a DNSMOS overall score of 3.83 (no reverb) and 3.57 (with reverb), outperforming comparable generative baselines. On the URGENT 2025 Challenge blind test set, UniSE + PRL secures superior ratings with an OVRL of 3.68, NISQA of 3.83, and UTMOS of 2.85. Ablation experiments demonstrate consistent gains from each progressive DPO stage, moving from DNSMOS-based preference tuning to combined DNSMOS and WavLM feature distance metrics.

## Code

- https://github.com/alibaba/unifiedaudio

## Applications

Speech and ML engineers building on-device or cloud audio pre-processing pipelines for telecommunications, hearing aids, or multi-speaker transcription systems requiring joint denoising, extraction, and separation.

## Limitations

The speech separation inference pipeline is restricted to two-speaker mixtures.

## Related

- (link related pages by id as the wiki grows)
