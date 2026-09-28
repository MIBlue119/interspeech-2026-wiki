---
id: warlewski26_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1343
pdf: https://www.isca-archive.org/interspeech_2026/warlewski26_interspeech.pdf
---

# Sub-Model Short-Term Memory Convolutions for Keyword Spotting Systems on Device

[PDF](https://www.isca-archive.org/interspeech_2026/warlewski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/warlewski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1343)

**TL;DR** — The paper introduces SM-STMC, a sub-model scheduling framework for online convolutional networks that cuts computational complexity by up to 82% over sliding-window baselines and memory footprint by up to 65% over vanilla STMC without requiring model retraining.

## Problem

Deploying keyword spotting systems on heavily resource-constrained edge devices like wearables requires high accuracy alongside strict limits on power, memory, and latency. Standard convolutional neural networks executed via sliding windows introduce massive computational redundancy, while vanilla Short-Term Memory Convolutions (STMC) maintain unnecessary intermediate temporal states when applied to classification tasks that do not require frame-synchronous outputs.

## Method

The method, Sub-Model Short-Term Memory Convolutions (SM-STMC), decomposes a pretrained CNN backbone into independent sub-models ending at pooling or output layers, which are connected via temporal memory buffers and executed using a deterministic static schedule based on time-step modulo operations. By avoiding dynamic control flow, the design remains fully compatible with standard conversion pipelines like TensorFlow Lite Micro and requires zero model retraining or extra parameters. The models use int8 quantization and are evaluated on an ARM Cortex-M55 CPU using CMSIS-NN and ARM Helium vector extensions.

## Results

Evaluated on the Google Speech Commands (GSC) dataset using two VGG-based backbone configurations, SM-STMC1 achieves 93.8% accuracy (97.1% with zero-padded silence data) while reducing million cycles per second (MCPS) by up to 82% compared to equivalently frequent sliding-window CNN execution and by 46% compared to vanilla STMC. Total buffer sizes are reduced to 9,280 and 7,520 int8 elements for the two model variants, representing a footprint reduction of up to 65% compared to standard STMC.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building voice-controlled applications and wake-word detectors for heavily resource-constrained edge devices, hearables, and smartwatches.

## Limitations

The reduced classification frequency introduces a marginal increase in prediction latency compared to frame-synchronous vanilla STMC models.

## Related

- (link related pages by id as the wiki grows)
