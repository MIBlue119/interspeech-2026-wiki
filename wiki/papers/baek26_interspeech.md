---
id: baek26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3336
pdf: https://www.isca-archive.org/interspeech_2026/baek26_interspeech.pdf
---

# SPARK: Efficient Audio-Text Matching for User-Defined Keyword Spotting via Spiking Neural Networks

[PDF](https://www.isca-archive.org/interspeech_2026/baek26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/baek26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3336)

**TL;DR** — SPARK is a spike-driven user-defined keyword spotting framework that processes audio-text matching entirely within the spiking domain, achieving competitive performance while reducing energy consumption by 21.7 times compared to artificial neural network baselines.

## Problem

User-defined keyword spotting allows users to customize wake words via text input, but existing models rely heavily on floating-point multiply-accumulate operations that cause excessive memory overhead and power usage. This heavy computational burden hinders real-world, always-on deployment on resource-constrained, battery-powered edge devices. Spiking neural networks offer an energy-efficient alternative through sparse event-driven processing, but prior SNN works have been strictly restricted to closed-set classification rather than open-vocabulary text enrollment.

## Method

SPARK proposes an end-to-end spiking architecture comprising a spiking audio encoder, a spiking text encoder with time-sequence expansion, a spiking pattern extractor utilizing spike-driven self-attention, and a pattern discriminator. The system employs parametric leaky integrate-and-fire neurons across modules to replace power-hungry matrix multiplications with low-cost accumulate operations. Training uses a multi-task objective combining utterance-level and phoneme-level binary cross-entropy losses, optimized with surrogate gradients.

## Results

Evaluated on the LibriPhrase dataset, SPARK achieves an AUC of 99.07% on the easy split and 82.71% on the hard split, compared to PhonMatchNet's 99.67% and 83.17% while utilizing only 287K parameters, 10.11M SOPs, and consuming 18.44 µJ per inference. This represents a 2.1 times reduction in parameter count and a 21.7 times reduction in energy consumption relative to its ANN counterpart. Ablation studies confirm that replacing individual SNN modules with ANN components steadily increases energy consumption up to hundreds of microjoules.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Edge engineers and developers building low-power, always-on voice assistants and smart home devices that require personalized, user-defined wake-word enrollment via text.

## Related

- (link related pages by id as the wiki grows)
