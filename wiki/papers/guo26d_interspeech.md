---
id: guo26d_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2689
pdf: https://www.isca-archive.org/interspeech_2026/guo26d_interspeech.pdf
---

# Lightweight Convolutional Front-ends for Real-time Framewise Phoneme Recognition in Cochlear Implants

[PDF](https://www.isca-archive.org/interspeech_2026/guo26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guo26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2689)

**TL;DR** — This paper evaluates lightweight, strictly causal convolutional front-ends paired with sequence back-ends for real-time framewise phoneme recognition in cochlear implants, achieving up to 38.94% accuracy while satisfying sub-10ms microcontroller latency constraints.

## Problem

Cochlear implants (CIs) require causal, low-latency (≤10 ms) real-time processing, rendering high-capacity cloud models or future-context-dependent architectures unusable on-device. While phoneme-based time-frequency mask estimation significantly improves speech enhancement in noise, its performance bottleneck is the accuracy of the underlying framewise phoneme classifier. Existing literature lacks a systematic benchmarking of lightweight architectures that balance accuracy, memory footprint, and strict hardware constraints on embedded microcontrollers.

## Method

The study tests causal 1D time (Conv1D-T), 1D frequency (Conv1D-F), and 2D time-frequency (Conv2D) convolutional front-ends combined with unidirectional sequence back-ends (LSTM and GRU). Model sizes are scaled across small, base, and large configurations, while front-end depth (layers L spanning 1 to 8) and dilation rates are systematically varied. Models are trained in PyTorch using cross-entropy loss and SGD, then exported to ONNX for simulated deployment and hardware benchmarking on an STM32F746G microcontroller using STM32Cube.AI.

## Results

Evaluated on an STM32F746G microcontroller (216 MHz), base LSTM and GRU models achieve baseline accuracies of 32.92% and 34.34%, respectively. Adding causal convolutional front-ends consistently improves frame-level accuracy, with Conv2D yielding up to 38.94% accuracy with a GRU back-end. 1D front-end structures reliably maintain sub-10ms latencies (e.g., Conv1D-F and Conv1D-T configurations operating between 2.34 ms and 4.30 ms latency). More complex attention and Mamba architectures failed to run on the target microcontroller due to platform deployment limitations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and biomedical device developers building on-device, real-time speech enhancement and phoneme recognition systems for cochlear implants and resource-constrained hearing aids.

## Limitations

Deformable convolutions, attention-based architectures, and Mamba-based models could not be successfully evaluated on the target STM32 microcontroller due to hardware and compiler limitations.

## Related

- (link related pages by id as the wiki grows)
