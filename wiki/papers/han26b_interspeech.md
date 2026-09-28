---
id: han26b_interspeech
category: acoustic-scene-classification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-865
pdf: https://www.isca-archive.org/interspeech_2026/han26b_interspeech.pdf
---

# Branch-wise Complementary Attention for Acoustic Scene Classification

[PDF](https://www.isca-archive.org/interspeech_2026/han26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-865)

**TL;DR** — The paper introduces Branch-wise Complementary Attention (BCA) to explicitly model relationships across parallel convolutional branches in multi-scale acoustic scene classification models, achieving 72.03% accuracy on TAU Urban Acoustic Scenes 2020 Mobile.

## Problem

Acoustic scene classification (ASC) requires lightweight models capable of capturing multi-scale temporal and spectral cues for resource-constrained mobile hardware. While multi-branch convolutional networks increase receptive field diversity through parallel kernels of different sizes, their outputs are typically merged via simple concatenation or summation without exploiting cross-branch complementary traits. Standard attention modules are designed for single-path backbones and fail to adaptively leverage the distinct structural strengths of individual convolutional branches.

## Method

The authors propose the Branch-wise Complementary Attention (BCA) module built upon the Rep-Mobile backbone, preserving individual parallel branches (3x3, 3x1, 1x3, and 1x1 kernels) instead of reparameterizing them during training. BCA extracts global channel, time, and frequency descriptors from fused features, projects them through 1D convolutions and sigmoid activations, and computes joint time-frequency attention maps via element-wise and outer products. These attention weights are normalized using an element-wise softmax across branches and complementarily allocated based on receptive field characteristics—assigning time attention to spectral-oriented branches, frequency attention to temporal-oriented branches, channel attention to joint time-frequency branches, and joint attention to 1x1 branches. A lightweight channel-split variant termed BCA-Lite is also introduced to further reduce parameters and multiply-accumulate operations (MACs) on mobile devices.

## Results

Evaluated on the TAU Urban Acoustic Scenes 2020 Mobile and TAU Urban Acoustic Scenes 2022 Mobile benchmarks using log-Mel spectrograms, the proposed BCA achieves 72.03% accuracy on TAU 2020 (surpassing the Rep-Mobile baseline by 3.17%) and 63.24% on TAU 2022 (a 1.72% gain) while outperforming traditional attention mechanisms like SE, ECA, and CTFA. The lightweight BCA-Lite variant reduces parameters to 125K and MACs to 274.0M on TAU 2020 while retaining a competitive 71.26% accuracy. Ablation studies confirm that removing any single attention component degrades performance, and gradient-based effective receptive field (ERF) analyses demonstrate that BCA substantially expands the network's spatio-temporal coverage.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers developing embedded systems, mobile sensing applications, and smart devices requiring high-accuracy acoustic scene classification under strict hardware constraints.

## Related

- (link related pages by id as the wiki grows)
