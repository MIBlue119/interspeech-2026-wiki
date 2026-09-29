---
id: warlewski26_interspeech
category: asr
labels: [efficient-on-device, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1343
pdf: https://www.isca-archive.org/interspeech_2026/warlewski26_interspeech.pdf
---

# Sub-Model Short-Term Memory Convolutions for Keyword Spotting Systems on Device

*Paweł Warlewski, Artur Czeczko, Artur Szumaczuk, Grzegorz Stefański, Szymon Klimaszewski*

[PDF](https://www.isca-archive.org/interspeech_2026/warlewski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/warlewski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1343)

**Category:** `asr` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — The paper introduces Sub-Model Short-Term Memory Convolutions (SM-STMC), a technique that adapts convolutional backbones for online keyword spotting without retraining, achieving up to an 82% MCPS reduction compared to sliding-window CNNs and 46% compared to vanilla STMC.

## Key contributions

- Proposes SM-STMC, which decomposes CNN backbones into independent sub-models connected via memory buffers to eliminate redundant temporal states in sparse-output streaming tasks.
- Implements static scheduling that runs deeper sub-models only when required (scaling with pooling depth), avoiding dynamic control flow unsupported by standard edge runtimes.
- Demonstrates zero-retraining deployment compatibility: applies directly to pretrained CNN weights while preserving full accuracy.
- Evaluates the framework extensively on edge hardware (ARM Cortex-M55 with Helium vector extensions using TFLite Micro).

## Problem

Keyword spotting (KWS) on heavily resource-constrained edge devices requires high temporal granularity and continuous processing under tight computational and memory limits. Traditional offline CNNs must be run in a sliding-window fashion with a small hop size to achieve high granularity, introducing massive redundant calculations. Meanwhile, vanilla Short-Term Memory Convolutions (STMC) maintain all intermediate pooled states across every time step, which results in unnecessary computational and memory overhead when classification outputs are only consumed sporadically rather than per-frame.

## Method

SM-STMC optimizes online convolutional networks by decomposing the convolutional backbone into a sequence of $N$ sub-models, where each sub-model ends with either a pooling layer or the original output layer. Rather than sharing layers or weights dynamically, these sub-models are connected via temporal memory buffers following standard STMC principles. At each time step $t$, a static schedule determines the deepest sub-model to execute based on an index sequence that cycles through $2^N$ states, using only fractions of the total network computation on intermediate steps and invoking the full network only once every $2^N$ steps.

The approach operates entirely at inference time and requires no retraining or parameter additions. The convolutional backbone is trained independently using standard supervised techniques on Mel spectrograms (1024-sample window, 256-sample hop size, yielding 62.5 temporal bins per second). Because the sub-models are statically scheduled and independent, the architecture avoids runtime control flow, ensuring direct compatibility with standard deployment pipelines like TensorFlow Lite Micro and CMSIS-NN targeting int8 quantized inference.

For evaluation, the models utilize two VGG-based embedding configurations with receptive fields of 41 and 38 frames, respectively, paired with an MLP classifier. The system evaluates the classifier every 8th frame (or every 4th frame depending on the sub-model configuration), resulting in roughly 7.81 inferences per second while preserving frame-synchronous streaming capability via the underlying memory buffers.

## Experimental setup

Evaluated on the Google Speech Commands (GSC) dataset (10 target classes plus a negative class) using two sets: the standard 1-second test set and a modified 2-second dataset padded with 0.5 seconds of leading and trailing silence. Compared against a standard VGG model (evaluated both 1x/second and 8x/second), vanilla STMC, and a conventional LSTM. Metrics include weighted average precision, recall (equivalent to classification accuracy in this setting), and F1-score, alongside Million Cycles Per Second (MCPS), buffer sizes, and computational/average latency. On-device experiments ran on an ARM Cortex-M55 CPU at 196 MHz using 128-bit M-Profile Vector Extension (ARM Helium) and TensorFlow Lite Micro.

## Results

SM-STMC achieved an accuracy of 93.8% on the standard GSC task (backbone 1) and 97.1% on the extended zero-padded GSC task, matching its equivalent vanilla STMC performance while significantly outperforming offline 1x/sec VGG baselines (which dropped to 49.8% recall on the 2-second dataset due to boundary truncation effects). Compared to a sliding-window VGG evaluated 8x/sec, SM-STMC achieved similar accuracy (97.10% vs 97.08% F1-score) while slashing MCPS by up to 82% (from 59.36 to 11.37 MCPS for backbone 1, and from 29.44 to 5.44 MCPS for backbone 2). Furthermore, SM-STMC reduced total memory buffer footprint by up to 65% compared to vanilla STMC (down to 9,280 bytes for configuration 1 and 7,520 bytes for configuration 2).

| Model | Emb (MCPS) | Cls (MCPS) | Memory (MCPS) | Total (MCPS) | Buffer Size (bytes) |
|---|---|---|---|---|---|
| VGG^1 (8×1s) | 59.20 | 0.16 | – | 59.36 | – |
| STMC^1 | 16.12 | 0.16 | 0.56 | 16.84 | 17,184 |
| SM-STMC^1 | 10.82 | 0.16 | 0.39 | 11.37 | 9,280 |
| STMC^2 | 9.42 | 0.16 | 0.44 | 10.02 | 21,632 |
| SM-STMC^2 | 5.12 | 0.16 | 0.16 | 5.44 | 7,520 |
| LSTM | 10.29 | 0.05 | 0.01 | 10.35 | – |

## Limitations

The evaluation is restricted to the Google Speech Commands dataset with a small fixed vocabulary of 10 keywords, leaving open how the method scales to large-vocabulary streaming tasks. Sparse classification scheduling introduces a trade-off that marginally increases average latency compared to frame-by-frame vanilla STMC. The method assumes a fixed convolutional backbone architecture with power-of-two pooling strides to govern sub-model scheduling.

## Why read this

Embedded speech engineers and TinyML researchers working on always-on keyword spotting will find this essential reading for learning how to convert standard pretrained CNNs into efficient streaming networks without retraining or accuracy loss.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device keyword spotting for resource-constrained edge hardware such as wearables, smartwatches, and wireless hearables.

## Institutions / 機構

Samsung R&D Institute Poland, Samsung AI Center Warsaw

## Related

- (link related pages by id as the wiki grows)
