---
id: xie26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1157
pdf: https://www.isca-archive.org/interspeech_2026/xie26_interspeech.pdf
---

# FakeSound2: A Benchmark for Explainable, Traceable, and Generalizable Deepfake Sound Detection

[PDF](https://www.isca-archive.org/interspeech_2026/xie26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xie26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1157)

**TL;DR** — FakeSound2 is a diagnostic benchmark designed to evaluate audio deepfake detectors across localization, traceability, and generalization, revealing that current models collapse on unseen sources.

## Problem

Existing deepfake sound detection (DSD) approaches predominantly treat the task as clip-level binary classification, which fails to explain how audio is manipulated, trace its origins, or generalize to new generative sources. Because current detectors overfit to superficial artifacts of specific generators rather than learning intrinsic forgery representations, their performance drops drastically when evaluated on unseen out-of-domain sources. This lack of explainability and robustness severely limits their reliability in security-sensitive and legal applications.

## Method

The authors introduce FakeSound2, a benchmark constructed via an automated pipeline using AudioCaps comprising 369,929 training samples and 5,553 test samples across 6 manipulation types (generation, editing, inpainting, separation, splicing, addition) and 12 sources (11 synthetic, 1 genuine). The benchmark pipeline involves text-to-audio event localization, LLM-based metadata processing using DeepSeek for instruction parsing and event insertion, audio manipulation via diverse generative models and scripts, and CLAP-based quality filtering. The evaluated baseline model uses a frozen EAT self-supervised encoder, a 12-layer ResNet backbone with CNN blocks, a 2-layer Transformer encoder, a 1-layer bidirectional LSTM, and three linear heads for frame-level detection, manipulation type, and source classification. It is trained using binary cross-entropy and cross-entropy losses.

## Results

Evaluated on the FakeSound2 test set, the baseline model achieves strong in-domain localization performance with an F1segment score of 95.10% and clip-wise accuracy of 90.91%. However, its explainability drops and out-of-domain (OOD) generalization collapses severely, with manipulation-type accuracy plummeting from 93.10% in-domain down to 32.35% on unseen sources like X2Audio. t-SNE feature visualizations show that while authentic and forged audio are separable, categories with similar task objectives or model architectures exhibit entangled latent representations.

## Code

- https://zeyuxie29.github.io/FakeSound2/

## Applications

Engineers and researchers developing trustworthy audio authentication systems, forensic tools, and robust deepfake detection models can use this benchmark to test generalization and explainability.

## Limitations

The current benchmark focuses on general audio and does not yet sufficiently explore specific domains such as fake speech or joint audio-speech manipulation.

## Related

- (link related pages by id as the wiki grows)
