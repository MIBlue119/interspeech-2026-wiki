---
id: jung26b_interspeech
category: speaker-diarization
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1198
pdf: https://www.isca-archive.org/interspeech_2026/jung26b_interspeech.pdf
---

# Hierarchical Permutation Consistency Learning for Self-Conditioned End-to-End Speaker Diarization

*Bongsu Jung, Wooil Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/jung26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jung26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1198)

**TL;DR** — The paper introduces Continuous Influence Permutation Invariant Training (CI-PIT) to resolve hierarchical permutation inconsistency in self-conditioned end-to-end speaker diarization, achieving a lower Diarization Error Rate (DER) of 7.52% on CALLHOME 2-speaker compared to 8.30% for the baseline.

## Key contributions

- Formalized Hierarchical Permutation Inconsistency (HPI), showing how independent per-layer PIT in self-conditioned EEND injects structured permutation noise into the conditioning path.
- Proposed Group-Wise PIT (GW-PIT) to enforce a hard global permutation constraint across all intermediate layers.
- Proposed Continuous Influence PIT (CI-PIT), applying Gaussian-weighted cost matrix aggregation to softly regularize inter-layer permutations while preserving local representation flexibility.
- Introduced three diagnostic metrics—Permutation Mismatch Ratio (PMR), Adjacent Switching Ratio (ASR), and Epoch Switching Ratio (ESR)—to quantify permutation dynamics across layers and epochs.

## Problem

Self-conditioned end-to-end neural diarization (EEND) improves performance by iteratively feeding intermediate speaker predictions back into subsequent encoder layers for progressive refinement. However, conventional layer-wise permutation invariant training (LW-PIT) independently resolves the optimal speaker permutation at each layer via hard minimization. In a self-conditioned architecture, these uncoordinated per-layer permutations cause adjacent layers to adopt conflicting speaker assignments, a failure mode termed Hierarchical Permutation Inconsistency (HPI). HPI propagates permutation noise directly into the self-conditioning path, destroying the progressive feature refinement intended by the architecture and destabilizing training convergence.

## Method

The base architecture uses an 8-layer Transformer encoder (256-dim embedding, 4 attention heads, 2048-dim FFN) with non-autoregressive (NA) multi-head self-attention extracting speaker attractors via 500-frame input segments. Intermediate predictions are fed back into subsequent layers using a shared weight matrix $W \in \mathbb{R}^{D \times D}$. To fix HPI, the paper replaces standard Layer-Wise PIT ($L_{LW-PIT}$) with two alternatives.

Group-Wise PIT ($L_{GW-PIT}$) relocates the minimum operator outside the summation over layers, enforcing a single global permutation $\phi$ across all encoder layers simultaneously. While this completely eliminates inter-layer mismatch by construction, it imposes an overly rigid constraint that restricts layer-specific gradients.

Continuous Influence PIT ($L_{CI-PIT}$) provides a soft regularization scheme through a three-step process: (1) computing Gaussian weights $w_{l,i} = \exp(-\frac{|l-i|^2}{2\sigma^2})$ to determine the influence of layer $i$ on target layer $l$; (2) aggregating pairwise BCE cost matrices $M_i$ from neighboring layers into a unified cost matrix $M_l^* = \sum_i w_{l,i} M_i$; and (3) solving for the optimal permutation via the Hungarian algorithm on $M_l^*$. By tuning $\sigma$ (set to 1.0 optimally), CI-PIT interpolates between local flexibility and global consistency, suppressing permutation noise while maintaining necessary layer-wise differentiation.

## Experimental setup

Models were trained on simulated conversations (SimConv) containing 2,478 hours for 2-speaker and 2,513 hours for 3-speaker scenarios, generated using LibriSpeech source speech augmented with MUSAN noise and downsampled to 8 kHz. Evaluation was conducted on the CALLHOME (NIST SRE 2000) dataset (adaptation/test splits with lengths of ~3 hours per condition). The system uses the EEND-NA architecture trained from scratch for 100 epochs on SimConv with the Noam scheduler, then fine-tuned on CALLHOME adaptation for 100 epochs at a learning rate of $10^{-5}$ using Adam optimization. Diarization Error Rate (DER) with a 0.25-second forgiveness collar and an 11-frame median filter post-processing is the primary metric.

## Results

On the CALLHOME 2-speaker test set, the proposed $L_{CI-PIT}$ ($\sigma=1.0$) achieves a headline DER of 7.52%, outperforming the $L_{LW-PIT}$ baseline (8.30%) and $L_{GW-PIT}$ (8.02%), primarily driven by a drop in False Alarm rate from 3.65% to 2.59%. On the more challenging 3-speaker scenario, $L_{CI-PIT}$ achieves the best DER of 12.52% compared to the baseline's 13.04% and $L_{GW-PIT}$'s 13.66%, demonstrating that the hard global constraint of GW-PIT degrades when scaling to more speakers whereas CI-PIT scales effectively. Ablations isolating self-conditioning (SC) show that SC alone yields negligible gains with LW-PIT (8.34% to 8.30%) due to noise corruption, whereas pairing SC with CI-PIT yields a substantial drop from 8.67% to 7.52% DER. Varying the Gaussian width $\sigma$ demonstrates that broadening the scope degrades performance (7.97% at $\sigma=2.0$ and 8.12% at $\sigma=3.0$), confirming that localized, layer-proximate alignment is critical.

| Training Objective | MI (%) | FA (%) | CF (%) | DER (2-spk %) | DER (3-spk %) |
|---|---|---|---|---|---|
| $L_{LW-PIT}$ (Baseline) | 4.11 | 3.65 | 0.53 | 8.30 | 13.04 |
| $L_{GW-PIT}$ | 4.21 | 3.17 | 0.64 | 8.02 | 13.66 |
| $L_{CI-PIT}$ ($\sigma=1.0$) | 4.36 | 2.59 | 0.57 | 7.52 | 12.52 |

## Limitations

The evaluation is restricted to telephone speech (CALLHOME and LibriSpeech-based simulations downsampled to 8 kHz), leaving open how the method performs on wideband 16kHz audio or reverberant environments requiring Room Impulse Response (RIR) augmentation. The study focuses exclusively on 2- and 3-speaker scenarios, so scaling behavior for highly overlapping or many-speaker conversations (e.g., meeting room domains) remains unexplored. Furthermore, compute overhead introduced by the Hungarian algorithm cost matrix aggregation across layers during training is not explicitly quantified.

## Why read this

Researchers and engineers building self-conditioned end-to-end neural diarization systems should read this paper to understand how layer-wise permutation inconsistency destabilizes training, and adopt CI-PIT as a plug-and-play training objective to properly unlock the benefits of self-conditioning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speaker diarization systems for multi-speaker conversational transcription, meeting transcription, and call center analytics.

## Related

- (link related pages by id as the wiki grows)
