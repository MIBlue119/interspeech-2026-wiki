---
id: zhang26ia_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3546
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ia_interspeech.pdf
---

# Mitigating Causality Mismatch with Causal Temporal Relation Distillation for Streaming Keyword Spotting

*Hanwen Zhang, Guosong Zhu, Zhen Qin*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ia_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ia_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3546)

**TL;DR** — The paper introduces Causal Temporal Relation Distillation to resolve causality mismatch in cross-architecture streaming keyword spotting, reducing false rejection rate by half (8.52% to 4.15%) on continuous streams without adding inference overhead.

## Key contributions

- Identifies capacity conflicts caused by causality mismatch when causal students point-wise regress absolute features from non-causal teachers.
- Proposes Causal Temporal Relation Distillation, using a lower-triangular mask to transfer intra-sample historical topology under zero-lookahead constraints.
- Introduces an offline bidirectional variant (Ours-Bi) that uses full-matrix topology as an anticipatory privileged prior anchored on the causal foundation.
- Establishes a continuous-stream event-level evaluation protocol (FRR @ FA/h) to test long-context noise robustness.

## Problem

On-device keyword spotting requires strict causal models for zero-lookahead streaming, often using high-capacity, non-causal sequence models like AST as teachers in knowledge distillation. However, forcing a causal student to point-wise regress the absolute, future-dependent features of a non-causal teacher creates a capacity conflict. This discrepancy between the supervision signal and the student's realizable receptive field reduces distillation stability and degrades continuous inference performance. Prior point-wise feature regression and mini-batch inter-sample relation methods fail to properly account for this temporal causality constraint.

## Method

To resolve resolution and dimension mismatches, the framework maps heterogeneous teacher (H_T) and student (H_S) features to a unified temporal length L using parameter-free 1D Adaptive Average Pooling. In their default setting, a 1.0-second input is mapped to L = 24 (approx. 41 ms per step, acting as a sub-phonetic abstraction), followed by per-timestep row-wise L2 normalization. Temporal relation matrices G_T and G_S are constructed to capture relative similarities between timesteps.

To make this compatible with streaming causality, a lower-triangular mask M is applied to eliminate future-dependent entries from the teacher's relation matrix. The unidirectional temporal relation distillation loss (L_rel) forces the student to match historical relation structures up to the current time index. For offline training, the bidirectional variant (Ours-Bi) adds an auxiliary loss (L_bi) using the teacher's full relation matrix (including future context) on top of the causal anchor. This full-matrix supervision acts as an implicit regularizer or privileged prior without altering the causal inference graph.

The joint objective combines cross-entropy (L_ce), logits distillation (L_kd), historical relation loss (L_rel), and full-topology auxiliary loss (L_bi). Because these relation computations occur entirely during offline training, edge inference incurs zero additional parameters, MACs, or algorithmic latency.

## Experimental setup

Evaluated on the Google Speech Commands V2 (GSC v2) 12-class dataset using standard splits, 16 kHz audio, and 64-dimensional log-Mel spectrograms. The teacher model is an AudioSet-pretrained AST (~85M parameters, frozen), while the student is a minimalist pure causal 1D-CNN (150K parameters, 5.2M MACs). Baselines include Scratch, Vanilla KD, Feature KD, and Inter-sample Relational KD. Evaluated using closed-set accuracy, parameters, MACs, per-step latency on a Raspberry Pi 4B (ARM Cortex-A72 via ONNX Runtime), and continuous-stream FRR @ FA/h.

## Results

On GSC v2, Scratch achieves 95.12% accuracy, Vanilla KD reaches 95.74%, Feature KD hits 95.45%, and Relational KD reaches 96.08%. The proposed unidirectional method (Ours) achieves 96.53%, while the offline bidirectional variant (Ours-Bi) achieves the highest closed-set accuracy at 96.91%. Under the continuous-stream streaming robustness protocol at 1.0 FA/h, Ours-Bi halves the False Rejection Rate compared to the Scratch baseline (down from 8.52% to 4.15%), outperforming Vanilla KD (7.15%) and Feature KD (7.60%). Ablations show that unmasked full-topology supervision alone (Only L_bi, 96.18%) underperforms compared to using the lower-triangular causal anchor (Ours, 96.53%), and an extreme temporal pooling length of L = 12 drops accuracy to 96.15% due to over-smoothing.

| System | Params (K) | MACs (M) | Lat./Step (ms) | Acc. (%) | FRR @ 1.0 FA/h (%) |
|---|---|---|---|---|---|
| Scratch | 150 | 5.2 | 0.15 | 95.12 | 8.52 |
| Vanilla KD | 150 | 5.2 | 0.15 | 95.74 | 7.15 |
| Feature KD | 150 | 5.2 | 0.15 | 95.45 | 7.60 |
| Relational KD | 150 | 5.2 | 0.15 | 96.08 | - |
| Ours | 150 | 5.2 | 0.15 | 96.53 | 4.86 |
| Ours-Bi | 150 | 5.2 | 0.15 | **96.91** | **4.15** |

## Limitations

The evaluation is restricted to the Google Speech Commands V2 dataset, a single teacher-student pair (AST to 1D-CNN), and strict zero-lookahead streaming conditions. Broader dataset domains, alternative network architectures, and multi-language coverage remain untested.

## Why read this

Speech and ML engineers building zero-latency streaming keyword spotting systems will learn how to safely leverage non-causal teacher models through temporal relation distillation without increasing deployment compute or latency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device voice assistants, edge-deployed smart home devices, and low-latency wake-word detection systems.

## Related

- (link related pages by id as the wiki grows)
