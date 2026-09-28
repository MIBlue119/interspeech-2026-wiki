---
id: kim26n_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1548
pdf: https://www.isca-archive.org/interspeech_2026/kim26n_interspeech.pdf
---

# Cross-Modal Consistency-Aware Structured Pruning for Efficient Speech Enhancement with Air- and Bone-Conduction Microphones

[PDF](https://www.isca-archive.org/interspeech_2026/kim26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1548)

**TL;DR** — The paper introduces cross-modal consistency-aware structured pruning (CCAP) to compress multimodal speech enhancement models, improving PESQ and STOI over prior pruning baselines while reducing inference latency.

## Problem

Multimodal speech enhancement models that combine air- and bone-conduction microphones require significant computational resources, making them difficult to deploy on resource-constrained wearable devices. Existing pruning techniques rely on modality-agnostic criteria or activation comparisons that fail under practical noise and cross-modal mismatches, often removing channels critical for multimodal fusion. This gap highlights the need for a compression method tailored specifically to preserve shared information across distinct sensing modalities.

## Method

The proposed CCAP framework estimates channel importance for convolutional layers using modality-wise zero masking, evaluating how well individual channels maintain their response relative to a multimodal reference when one modality is removed. Modality-specific sensitivities are normalized via L1-norm statistics over a calibration dataset and symmetrically aggregated into a final channel importance score. Low-scoring channels are then pruned in a structured manner, followed by a single fine-tuning stage. The approach is evaluated across three architectures (DCCRN, MMINet, and LAU-Net) using the TAPS paired dataset with background noise from the DNS Challenge added at -5 to 10 dB SNRs.

## Results

Evaluated on the TAPS dataset across pruning ratios from 0% to 80%, CCAP consistently outperforms parameter pruning, Taylor-expansion-based pruning, BatchNorm pruning, and modality-aware neuron unlearning in terms of narrowband PESQ and STOI. At an 80% pruning ratio, CCAP improves PESQ by 0.10 for DCCRN, 0.20 for MMINet, and 0.10 over the strongest baseline for LAU-Net. Post-pruning analyses demonstrate that CCAP reduces inter-channel redundancy while maintaining high linear centered kernel alignment (CKA) stability. Furthermore, deploying a 50% pruned LAU-Net on an Arm Cortex-M7 MCU achieves an inference latency of 87 ms for a 304 ms input segment, with substantial reductions in Flash and RAM usage.

## Code

- https://github.com/KYE-Postech/CCAP

## Applications

Engineers and developers building real-time, resource-constrained wearable devices, edge hardware, and microcontrollers for multimodal speech enhancement.

## Related

- (link related pages by id as the wiki grows)
