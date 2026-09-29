---
id: kim26n_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1548
pdf: https://www.isca-archive.org/interspeech_2026/kim26n_interspeech.pdf
---

# Cross-Modal Consistency-Aware Structured Pruning for Efficient Speech Enhancement with Air- and Bone-Conduction Microphones

*Yeeun Kim, Yonghun Song, Yunsik Kim, Yoonyoung Chung*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1548)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — The paper introduces cross-modal consistency-aware structured pruning (CCAP) to compress multimodal speech enhancement models combining air- and bone-conduction microphones, improving PESQ by up to 0.20 over baselines at an 80% pruning ratio while reducing microcontroller latency by 43.1%.

## Key contributions

- Proposes a cross-modal consistency-aware structured pruning (CCAP) framework to compress multimodal speech enhancement models without dropping fusion-critical channels.
- Utilizes modality-wise zero masking and normalized response preservation relative to the full multimodal reference to compute robust channel importance scores, avoiding flaws in purely activation-based comparisons.
- Achieves consistent PESQ and STOI gains over four pruning baselines (PP, TP, BN, MANU) across three architectures (DCCRN, MMINet, LAU-Net) under pruning ratios up to 80%.
- Demonstrates successful deployment of a 50% pruned LAU-Net on an Arm Cortex-M7 microcontroller, cutting inference latency down to 87 ms for a 304 ms input segment.

## Problem

Single air-conduction microphone (ACM) speech enhancement systems degrade heavily under non-stationary ambient noise, while bone-conduction microphones (BCMs) are robust to noise but lack frequency response above 2 kHz. Multimodal speech enhancement (MMSE) fuses both signals to solve this, but models like DCCRN, MMINet, and LAU-Net carry heavy computational and parameter overheads that prevent real-time on-device edge deployment. Existing pruning strategies—such as l1/l2 norm pruning, parameter pruning, Taylor-expansion pruning, and activation-based modality-aware neuron unlearning (MANU)—either ignore cross-modal contributions or fail under practical noise and cross-modal mismatches like bandwidth scaling differences, inadvertently pruning channels vital for fusion.

## Method

CCAP targets convolutional output channels for structured pruning by processing a two-channel concatenated input of noisy ACM and BCM signals through the model. It defines three evaluation conditions: the full multimodal input, a zero-masked noisy ACM input (where ACM is replaced by an all-zero tensor), and a zero-masked BCM input. For every convolutional layer output channel, the response tensor magnitude is summarized via the l1 norm over a calibration set of 3,000 samples to compute dataset-level statistics.

Modality-specific normalized sensitivities are then calculated as the ratio of the zero-masked response magnitude to the multimodal reference response magnitude, stabilized with a small constant epsilon. The final channel importance score is derived via symmetric aggregation by averaging the ACM-only and BCM-only normalized sensitivities. A high score denotes a channel that reliably preserves its response even when one modality is missing, indicating fusion-relevant information. The lowest-scoring channels are pruned to meet the target pruning ratio, followed by a single fine-tuning stage using original pre-training configurations (e.g., 15-40 epochs depending on the network).

## Experimental setup

Evaluated on the Throat and Acoustic Paired Speech (TAPS) dataset containing 60 Korean speakers (40 train, 10 val, 10 test) reading 100 sentences each, with background noise from the DNS Challenge dataset mixed into ACM signals at -5, 0, 5, and 10 dB SNR. Baselines include parameter pruning (PP), Taylor-expansion-based pruning (TP), BatchNorm (BN) pruning, and modality-aware neuron unlearning (MANU) pruning, tested across DCCRN, MMINet, and LAU-Net architectures. Metrics include narrowband PESQ, short-time objective intelligibility (STOI), inter-channel Pearson correlation, and linear centered kernel alignment (CKA). Hardware setup utilized an AMD EPYC 7313 CPU, 128 GB RAM, and two NVIDIA RTX 3090 GPUs, alongside an on-device deployment test on an STM32H753ZI MCU featuring an Arm Cortex-M7 core with 2 MB Flash and 1 MB RAM.

## Results

At an 80% pruning ratio, CCAP improves narrowband PESQ over the strongest baseline by 0.10 for DCCRN, 0.20 for MMINet, and 0.10 for LAU-Net, while maintaining STOI scores above 0.91 for DCCRN and MMINet and above 0.88 for LAU-Net past 50% pruning. In terms of representation stability, CCAP achieves the highest linear CKA (0.950 at 80% pruning, representing only a 4.22% reduction from the original model) compared to baseline drops of 9.17% to 14.98%, confirming superior retention of core structure. On an Arm Cortex-M7 microcontroller, a 50% pruned LAU-Net cuts Flash usage from 411.5 KiB to 212.8 KiB, RAM usage from 353.2 KiB to 257.0 KiB, and inference latency down to 87 ms (a 43.1% reduction) for a 304 ms input segment.

| System / Condition | Pruning Ratio (%) | PESQ | STOI | Latency (ms) |
|---|---|---|---|---|
| LAU-Net Original | 0% | 2.50 | 0.90 | 153 |
| LAU-Net CCAP | 50% | 2.45 | 0.89 | 87 |
| LAU-Net PP [20] | 50% | 2.20 | 0.85 | 89 |
| LAU-Net MANU [26] | 50% | 2.30 | 0.86 | 88 |
| MMINet CCAP | 80% | 2.75 | 0.91 | -- |
| MMINet Baseline [29] | 80% | 2.55 | 0.89 | -- |

## Limitations

The evaluation relies entirely on a single paired air- and bone-conduction dataset featuring Korean speech (TAPS), leaving cross-lingual and cross-sensor generalization unverified. The study is bounded to convolutional-based MMSE architectures (DCCRN, MMINet, LAU-Net) and does not examine transformer-based or state-space multimodal speech models. Additionally, calibration requires a representative subset of clean-noise paired data, which may be difficult to acquire under extreme domain shifts.

## Why read this

Speech and ML engineers looking to deploy multimodal speech enhancement models on resource-constrained embedded hardware should read this paper to learn how zero-masking sensitivity analysis can protect cross-modal fusion channels from destructive pruning.

## Code

- https://github.com/KYE-Postech/CCAP

## Applications

Real-time on-device multimodal speech enhancement for hearables, smart glasses, and wearable communication devices operating in extremely noisy environments.

## Institutions / 機構

Pohang University of Science and Technology, Intus

**Funding / 經費:** National Research Foundation, Institute of Information & Communications Technology Planning & Evaluation, High-Performance Computing Support Project, Regional Innovation System & Education project

## Related

- (link related pages by id as the wiki grows)
