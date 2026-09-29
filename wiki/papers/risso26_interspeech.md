---
id: risso26_interspeech
category: asr
labels: [efficient-on-device, streaming-real-time]
institutions: ["Politecnico di Torino"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1253
pdf: https://www.isca-archive.org/interspeech_2026/risso26_interspeech.pdf
---

# OnDA: On-device Channel Pruning for Efficient Personalized Keyword Spotting

*Matteo Risso, Alessio Burrello, Daniele Jahier Pagliari*

[PDF](https://www.isca-archive.org/interspeech_2026/risso26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/risso26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1253)

**Category:** `asr` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — OnDA couples weight adaptation with online structured channel pruning for personalized on-device keyword spotting, achieving up to 9.63x model compression at iso-task performance.

## Key contributions

- Formulates and evaluates edge-deployment pipelines combining offline pretraining, online structured pruning, and on-device self-learning adaptation.
- Demonstrates Pareto frontiers for keyword spotting accuracy at a False Alarm Rate (FARh) of 0.5 per hour versus model size on HeySnips and HeySnapdragon.
- Achieves up to 3.33x and 9.63x model compression at iso-task performance compared to ResNet15 and DS-CNN-L baselines.
- Provides NVIDIA Jetson Orin Nano hardware measurements, showing up to 1.57x/1.93x lower inference latency and 1.77x/2.07x lower inference energy consumption on GPU and CPU.

## Problem

Always-on keyword spotting (KWS) systems must operate under severe inter-speaker variability, acoustic domain shifts, and tight device constraints on memory, compute, and energy. Prior work utilizes self-learning pipelines with pseudo-labeling and gradient-based fine-tuning on-device, but focuses strictly on adapting weights while leaving network architectures static. This paper argues that online architectural adaptation via structured pruning is essential to cope with distribution shifts and maximize efficiency during deployment. Applying pruning online presents a unique trade-off: in-field data matches the target distribution better but provides significantly fewer samples and relies on noisy pseudo-labels.

## Method

The OnDA framework builds upon a baseline ProtoNet self-learning pipeline (B1, B2, B3) that maps audio segments to embeddings via triplet loss pretraining, then calibrates thresholds to pseudo-label incoming utterances for on-device fine-tuning. OnDA introduces structured channel pruning online to transform architecture A into A' at a pruning ratio rho. Two distinct online pruning schemes are investigated: OnDA-2, which uses data-agnostic global L1-norm magnitude pruning after an initial weights adaptation phase followed by retraining; and OnDA-1, which employs data-aware Hessian-Aware Pruning (HAP) prior to fine-tuning. HAP uses a block-diagonal, trace-based approximation of the Hessian via Hutchinson’s trace estimation to score the second-order sensitivity of channel removal against the task loss using in-domain pseudo-labeled data. 

By applying data-aware pruning at the start of adaptation (OnDA-1), the model size is reduced before the costly fine-tuning step, whereas data-agnostic magnitude pruning requires prior weight adaptation to reliably compute channel statistics. The pipelines were evaluated on ResNet15 and DS-CNN-L models, using global channel importance scoring to drop entire activation channels globally across layers until achieving target compression ratios of 25%, 50%, and 75%.

## Experimental setup

Evaluated on the HeySnips and HeySnapdragon datasets using MSWC for offline pretraining (D_pre). Models compared include unpruned ResNet15 and DS-CNN-L baselines from prior work, alongside offline-pruned versions at 25% and 50% ratios. Performance is measured via accuracy at a fixed False Alarm Rate of 0.5 false alarms per hour (FAR_h = 0.5), model parameter size, and hardware measurements (latency and energy) captured on an NVIDIA Jetson Orin Nano embedded GPU and multi-core CPU using three random seeds.

## Results

On the HeySnips dataset, the best OnDA configuration achieves 3.33x compression at iso-performance with the ResNet15 baseline, and up to 9.63x compression compared to DS-CNN-L. On HeySnapdragon, OnDA achieves up to 1.7x compression at iso-performance with ResNet15. On the NVIDIA Jetson Orin Nano GPU, OnDA-1 improves adaptation latency/energy by 1.52x/1.64x and inference latency/energy by 1.57x/1.77x, while OnDA-2 achieves 1.91x/2.55x inference speedups/energy savings but suffers a delayed break-even point due to its second fine-tuning phase.

| System / Condition | Model Size (Params) | Acc. @ FARh=0.5 (%) | GPU Inf. Latency Impr. | GPU Inf. Energy Impr. |
|---|---|---|---|---|
| Baseline ResNet15 [3] | ~500k | ~95.0 | 1.0x | 1.0x |
| Baseline DS-CNN-L [3] | ~500k | ~93.0 | 1.0x | 1.0x |
| OnDA-1 (ResNet15 adapted) | ~150k | ~95.0 | 1.57x | 1.77x |
| OnDA-2 (ResNet15 adapted) | ~150k | ~95.0 | 1.91x | 2.55x |

## Limitations

The evaluation is bounded by the chosen keyword spotting datasets (HeySnips and HeySnapdragon) and specific CNN architectures (ResNet15 and DS-CNN-L). The reliance on pseudo-labeling introduces potential noise in low-data adaptation regimes. Additionally, hardware deployment metrics are exclusively reported for the NVIDIA Jetson Orin Nano platform, leaving microcontroller or ultra-low-power DSP deployment untested.

## Why read this

Researchers and embedded speech engineers working on on-device model personalization and resource-constrained edge deployment should read this to understand how coupling structured pruning with online adaptation outperforms weights-only fine-tuning.

## Code

- https://github.com/eml-eda/onda

## Applications

Always-on edge voice assistants, smart-home devices, and wake-word detectors requiring personalized acoustic adaptation under strict energy budgets.

## Institutions / 機構

Politecnico di Torino

**Funding / 經費:** NEURAL research project, Fondazione Compagnia di San Paolo

## Related

- (link related pages by id as the wiki grows)
