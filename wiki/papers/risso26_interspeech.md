---
id: risso26_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1253
pdf: https://www.isca-archive.org/interspeech_2026/risso26_interspeech.pdf
---

# OnDA: On-device Channel Pruning for Efficient Personalized Keyword Spotting

[PDF](https://www.isca-archive.org/interspeech_2026/risso26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/risso26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1253)

**TL;DR** — OnDA couples on-device weight adaptation with online structured channel pruning for personalized keyword spotting, achieving up to 9.63x model size compression at iso-task performance.

## Problem

Always-on keyword spotting systems must adapt to user- and environment-specific distribution shifts directly on-device under strict latency, memory, and energy budgets. While self-learning pipelines handle this via gradient-based fine-tuning and pseudo-labeling, they ignore architectural adaptation, leaving models unnecessarily bloated for specific target users or acoustic environments. This paper investigates whether integrating online structured channel pruning into the on-device adaptation loop can improve efficiency without sacrificing accuracy.

## Method

The framework builds upon a self-learning ProtoNet pipeline featuring offline pretraining on MSWC via triplet loss, calibration with a small user-provided set, and incremental on-device fine-tuning using pseudo-labeled incoming data. The authors propose OnDA, which introduces structured channel pruning either before (OnDA-1) or after (OnDA-2) on-device weight adaptation. OnDA-1 uses Hessian-Aware Pruning (HAP), a data-aware second-order sensitivity metric computed via Hutchinson's trace estimation on pseudo-labeled adaptation data prior to fine-tuning. OnDA-2 uses a data-agnostic global L1-norm magnitude criterion applied after the first fine-tuning phase, which then requires repeating fine-tuning. Experiments evaluate ResNet15 and DS-CNN-L backbone architectures across compression ratios of 25%, 50%, and 75%.

## Results

Evaluated on the HeySnips and HeySnapdragon datasets with performance measured by accuracy at a fixed false alarm rate (FARh = 0.5 false alarms per hour). OnDA achieves up to 3.33x and 9.63x model compression compared to ResNet15 and DS-CNN-L baselines at iso-task performance. When deployed on an NVIDIA Jetson Orin Nano embedded GPU, OnDA-1 achieves up to 1.52x and 1.57x improvements in online training latency and inference latency respectively, alongside 1.64x and 1.77x energy consumption reductions compared to weights-only adaptation. The data-aware OnDA-1 pipeline outperforms the data-agnostic OnDA-2 approach by avoiding the overhead of an extra adaptation loop.

## Code

- https://github.com/eml-eda/onda

## Applications

Embedded speech engineers and developers deploying always-on, personalized keyword spotting voice interfaces on resource-constrained edge hardware.

## Limitations

Evaluated specifically on keyword spotting tasks using ProtoNet-based embedding architectures.

## Related

- (link related pages by id as the wiki grows)
