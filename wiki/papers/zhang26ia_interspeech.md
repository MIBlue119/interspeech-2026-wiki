---
id: zhang26ia_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3546
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ia_interspeech.pdf
---

# Mitigating Causality Mismatch with Causal Temporal Relation Distillation for Streaming Keyword Spotting

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ia_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ia_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3546)

**TL;DR** — The paper proposes Causal Temporal Relation Distillation to resolve causality mismatch in cross-architecture streaming keyword spotting, improving a 1D-CNN student's closed-set accuracy to 96.91% and halving its false rejection rate under continuous streams.

## Problem

In cross-architecture knowledge distillation for edge-deployed keyword spotting, lightweight causal student models are supervised by non-causal teachers whose features encode future context. Forcing a causal student to point-wise regress these absolute future-dependent features creates severe capacity conflicts and supervision inconsistency. This mismatch degrades performance, especially in continuous long-horizon streaming inference where long-context robustness is crucial.

## Method

The authors introduce Causal Temporal Relation Distillation, which transfers intra-sample temporal topology rather than point-wise features. Heterogeneous features from the teacher and student are mapped to a unified temporal length via parameter-free 1D adaptive average pooling (with an optimal setting of L=24, corresponding to approx. 41 ms steps) and normalized row-wise with L2 normalization. A lower-triangular causal mask is applied to the teacher's temporal relation matrix to remove future-dependent entries, establishing a strictly realizable historical anchor for the student. Additionally, an offline bidirectional variant (Ours-Bi) utilizes the teacher's full relation matrix as an unmasked auxiliary prior during training to provide global context awareness. The lightweight 1D-CNN student backbone uses 150K parameters and 5.2M MACs, and the extra distillation losses are dropped during inference to ensure zero added lookahead or compute overhead.

## Results

Evaluated on the 12-class Google Speech Commands V2 benchmark, a causal 1D-CNN student baseline achieves 95.12% accuracy, while Vanilla KD reaches 95.74% and point-wise Feature KD achieves 95.45%. The proposed unidirectional causal relation distillation (Ours) reaches 96.53%, and the offline bidirectional variant (Ours-Bi) achieves the highest accuracy of 96.91%. Under a rigorous continuous-stream event-level evaluation protocol on Raspberry Pi 4B (measured via False Rejection Rate at 1.0 FA/h), Ours-Bi halves the FRR from the scratch baseline's 8.52% down to 4.15%. Ablations confirm that L=24 is optimal for temporal pooling and that combining the lower-triangular causal anchor with the full-matrix auxiliary prior outperforms unmasked-only variants.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building on-device, zero-lookahead streaming keyword spotting systems for resource-constrained edge devices (such as microcontrollers or low-power processors) can use this method to leverage large non-causal teacher models without sacrificing causal latency constraints.

## Limitations

The evaluation scope is limited to the Google Speech Commands V2 dataset, a specific AST-to-1D-CNN teacher-student pair, and strict zero-lookahead settings.

## Related

- (link related pages by id as the wiki grows)
