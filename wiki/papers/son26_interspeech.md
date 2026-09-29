---
id: son26_interspeech
category: audio-understanding
labels: [efficient-on-device]
institutions: ["Hanyang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-855
pdf: https://www.isca-archive.org/interspeech_2026/son26_interspeech.pdf
---

# Teacher-Agnostic Temporal Knowledge Distillation for Resource-Efficient Sound Event Detection

*Gihun Son, Pil Moo Byun, Joon-Hyuk Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/son26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/son26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-855)

**Category:** `audio-understanding` · **Labels:** `efficient-on-device`

**TL;DR** — The paper introduces Teacher-Agnostic Temporal Knowledge Distillation (TAT-KD), a framework that distills knowledge from high-capacity sound event detection (SED) teachers into compact student models using a common logit space, a conformer-based temporal context projector, and a confidence-aware loss. It achieves a polyphonic sound detection score (PSDS) of 0.574 with a 4.548M-parameter SE-CRNN student on the DESED dataset.

## Key contributions

- Proposes a teacher-agnostic distillation interface using teacher logits as a shared space, bridging heterogeneous teacher-student architectures without requiring matched intermediate layers.
- Introduces a Temporal Context Projector (TCP) featuring a convolutional pooling layer, a Conformer block, and an MLP to model both local and global temporal dependencies during feature projection.
- Develops the Teacher-Confidence-Aware Distillation (TCAD) loss, which downweights ambiguous teacher predictions near the decision boundary using normalized confidence weights.
- Achieves competitive SED performance (PSDS of 0.574) using a lightweight student model (4.548M parameters, 3.668G MACs) that substantially undercuts the computational footprint of SOTA teachers.

## Problem

Sound event detection requires frame-level event localization and activity prediction, driving recent reliance on large, high-capacity models like transformers that are prohibitive for resource-constrained edge environments. While knowledge distillation could bridge this accuracy-capacity gap, standard logit- and feature-based KD methods struggle in heterogeneous teacher-student setups due to architectural mismatches and unstable feature-space transfers. Furthermore, standard image classification distillation methods like OFA-KD fail to capture the critical frame-level temporal context and boundary dynamics required in acoustic event detection. This leaves resource-efficient SED under-explored, necessitating a specialized, architecture-agnostic temporal distillation framework.

## Method

The TAT-KD framework uses frozen teacher logits as a common distillation target space to bypass architectural discrepancies. Stage-wise Temporal Context Projectors (TCPs) are temporarily attached to the student's intermediate encoder layers during training and entirely removed at inference time to maintain zero overhead. Each TCP aligns student feature dimensions with teacher logits using a single convolutional layer followed by a pooling layer to match temporal resolution, a Conformer block combining convolutions and self-attention to capture short- and long-range temporal dependencies, and a multi-layer perceptron (MLP) projection head mapping to the teacher's class dimension.

To optimize knowledge transfer, the Teacher-Confidence-Aware Distillation (TCAD) loss replaces standard binary cross-entropy by incorporating normalized confidence weights. The teacher outputs are first sharpened using a sigmoid function with temperature $\tau = 0.5$. Confidence is computed as the element-wise distance from the decision boundary, scaled by an exponent $\gamma = 2$ to heavily emphasize confident predictions near 0 or 1 while suppressing ambiguous ones near 0.5. The overall training objective is purely distillation-based—omitting direct supervised loss to avoid pulling student distributions away from the teacher target space—by averaging the intermediate TCAD losses across all $N$ encoder stages and adding the final output TCAD loss.

## Experimental setup

Experiments are conducted on the DESED benchmark (DCASE 2023 Task 4), consisting of 1,578 weakly labeled, 3,470 strongly labeled, 10,000 synthetic strongly labeled, and 14,412 unlabeled 10-second audio training clips, evaluated on a real validation set of 1,168 strongly labeled clips. Evaluation uses PSDS1 (referred to as PSDS) alongside parameter counts and MACs. The student architecture is SE-CRNN scaled into variants SC32, SC16, SC8, and SC4 (with channel widths 32, 16, 8, 4), trained for 400 epochs with a learning rate of $5 \times 10^{-4}$. Heterogeneous teachers include ATST-SED, JiTTER, MDFD-SED, and a custom distillation variant MDFD-TAT.

## Results

On the DESED real validation set, the SC32 student distilled from MDFD-TAT via TAT-KD reaches a PSDS of 0.574 using only 4.548M parameters and 3.668G MACs, outperforming training from scratch (0.439) and standard logit-based (0.550) or feature-based (0.551) KD. Across every teacher-student pair, TAT-KD consistently outperforms traditional logit and feature distillation baselines. Ablations show that the Conformer-based TCP projector outperforms MLP, CNN, and RNN projectors (e.g., scoring 0.574 vs. RNN's 0.559 on SC32), and the TCAD loss consistently beats standard BCE across all configurations. The framework underperforms slightly when paired with teachers heavily reliant on post-processing median filtering like ATST-SED (whose raw frame-level outputs are less stable), showing that teacher output stability directly bounds distillation gains.

| System / Condition | Params (M) | MACs (G) | PSDS (DESED Real Val) |
|---|---|---|---|
| SC32 (Scratch) | 4.548 | 3.668 | 0.439 |
| SC32 + Logit KD (MDFD-TAT) | 4.548 | 3.668 | 0.550 |
| SC32 + Feature KD (MDFD-TAT) | 4.548 | 3.668 | 0.551 |
| SC32 + TAT-KD (MDFD-TAT) | 4.548 | 3.668 | 0.574 |
| SC16 + TAT-KD (MDFD-TAT) | 1.150 | 0.931 | 0.564 |
| SC8 + TAT-KD (MDFD-TAT) | 0.299 | 0.243 | 0.535 |

## Limitations

The framework's efficacy is bounded by the quality and temporal stability of the teacher model's frame-level outputs, as teachers heavily dependent on post-processing smoothing (like median filtering) yield unstable soft targets that degrade distillation gains. Evaluation is restricted to the domestic environment sound event detection (DESED) benchmark, leaving multi-domain or cross-dataset generalization untested. Furthermore, the study explores model compression down to 0.084M parameters (SC4) where performance drops to 0.471 PSDS, indicating lower bounds for extremely constrained hardware budgets.

## Why read this

Researchers and engineers building on-device or resource-constrained sound event detection systems should read this paper to learn how to effectively distill large transformer or CRNN teacher models into lightweight student networks without architectural constraints.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart home monitoring systems, acoustic anomaly detection, automated urban surveillance, and resource-constrained edge robotics.

## Institutions / 機構

Hanyang University

**Funding / 經費:** National Research Foundation of Korea

## Related

- (link related pages by id as the wiki grows)
