---
id: dinh26_interspeech
category: speech-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2296
pdf: https://www.isca-archive.org/interspeech_2026/dinh26_interspeech.pdf
---

# Improving Audio Codec-based Speech Separation By Stacking Residual Vector Quantization Layers

[PDF](https://www.isca-archive.org/interspeech_2026/dinh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dinh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2296)

**TL;DR** — RVQ-Grid improves neural audio codec-based speech separation by explicitly preserving and modeling the coarse-to-fine residual vector quantization hierarchy, achieving a +3.6 dB SI-SDRi gain over prior codec-based methods on WSJ0-2Mix.

## Problem

Current neural audio codec-based speech separation models aggregate per-layer residual vector quantization (RVQ) vectors into a single combined vector, which discards the multi-scale coarse-to-fine acoustic hierarchy. This collapse of layer-wise structure limits separation fidelity compared to raw waveform models. Addressing this allows efficient compressed-domain separation without sacrificing vital acoustic details.

## Method

The paper introduces RVQ-Grid, which stacks per-layer RVQ outputs into a 3D grid defined by codebook layers, embedding dimensions, and temporal frames, using a frozen pre-trained codec. A trainable separator projects this grid via a 2D convolution and processes it using multiple dual-axis recurrent blocks. These blocks alternate between a cross-layer BiLSTM path to capture inter-layer dependencies and a temporal BiLSTM path to model time context. Two variants are implemented: RVQ-Grid (DAC) using a 12-layer DAC codec with 6 blocks and Snake activation, and RVQ-Grid (EnCodec) using a 32-layer EnCodec with 16 blocks and ELU activation.

## Results

Evaluated on the WSJ0-2Mix benchmark dataset, RVQ-Grid (EnCodec) achieves an SI-SDRi of 8.6 dB and SDRi of 10.7 dB, outperforming the Codecformer baseline. For downstream automatic speech recognition evaluated with Whisper large-v3-turbo, RVQ-Grid reaches an 8.6% word error rate, approaching the performance of the uncompressed SepFormer baseline while requiring a 6x reduction in MACs during inference. Ablation studies show that scaling up the number of RVQ layers and training on longer audio contexts consistently improves separation performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech/ML engineers working on resource-constrained edge devices or compressed-domain audio streaming applications requiring efficient speech separation and downstream speech recognition.

## Related

- (link related pages by id as the wiki grows)
