---
id: hong26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1312
pdf: https://www.isca-archive.org/interspeech_2026/hong26_interspeech.pdf
---

# Convolutional Dynamic Rotary Positional Encoding

*Euijin Hong, Mengchun Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/hong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1312)

**Category:** `asr`

**TL;DR** — Convolutional Dynamic Rotary Positional Encoding (CD-RoPE) warps rotary temporal indices dynamically via a lightweight depthwise-separable convolution, improving ASR word error rates across LibriSpeech sets while using 2.2M fewer parameters than RelPos.

## Key contributions

- Proposes CD-RoPE, replacing static discrete position indices with an input-conditioned, continuous temporal shift (Δt) derived via depthwise-separable 1D convolution.
- Preserves RoPE's harmonic structure by applying Δt additively before multiplying by inverse frequencies, avoiding numerical instability associated with direct frequency modulation.
- Reduces parameter count by 2.2M compared to standard RelPos while achieving consistent LibriSpeech WER reductions.
- Validates temporal warping robustness on Speech Robust Bench (SRB), yielding significant gains under temporal perturbations like speedup and tempo changes.

## Problem

Standard transformer positional encodings like RoPE and RelPos assume rigid, discrete, uniformly-spaced chronological integer indices, which misaligns with the continuous, semantically elastic nature of speech features. Furthermore, vanilla RoPE diverges during ASR training when applied to architectures without local convolutions, and RelPos relies on rigid linear projections that struggle to capture complex temporal dynamics. These limitations cause performance degradation under acoustic variations and variable speech information density.

## Method

CD-RoPE integrates into the attention path of Branchformer, which otherwise lacks intermediate convolutions in its attention branch. For input representations X in R^{B x T x d_model}, a depthwise-separable 1D convolution with kernel size 9 extracts acoustic context across the full d-dimensional feature space. The output is bounded to [-1, 1] via a hyperbolic tangent (tanh) activation and scaled by a ReZero-style learnable parameter α to produce continuous time-shifts Δt in R^{B x T x d/2}.

Before computing self-attention, these shifts are added directly to the base absolute time index t. The shifted index is then multiplied by the inverse frequency vector θ_i (where base b = 10,000) to form the rotated query and key angles Theta^_t,i = (t + Δt) * θ_i. This additive modulation preserves RoPE's harmonic consistency since the inverse frequency acts purely as an outer multiplier, ensuring high-frequency bands continue to rotate faster than low-frequency ones without destabilizing training.

Computing the shift over the full d-dimensional embedding prior to head-splitting (rather than per-head in a lower-dimensional subspace) allows the convolution to leverage cross-feature temporal correlations from the complete local acoustic context. The model is trained end-to-end using standard ASR cross-entropy/CTC joint objectives within the SpeechBrain toolkit.

## Experimental setup

Evaluated on the 960-hour LibriSpeech dataset (train-clean-100, train-clean-360, and train-other-500 for training; dev-clean, test-clean, and test-other for evaluation) and Speech Robust Bench (SRB) featuring 9 perturbation types across severities 2 and 4. Compared against a RelPos baseline using Branchformer configurations of 109.8M parameters (RelPos) versus 107.6M parameters (CD-RoPE) with 18 encoder layers, 6 decoder layers, model dimension 512, and 8 attention heads. Models use gradient accumulation steps of 8 and a depthwise convolution kernel size of k=9.

## Results

On LibriSpeech, CD-RoPE lowers WER compared to RelPos from 2.02% to 1.96% on dev-clean, 2.17% to 2.13% on test-clean, and 5.07% to 4.95% on test-other while utilizing 2.2M fewer parameters. McNemar's test on test-other confirms statistical significance (p=0.043, with 205 discordant pairs favoring CD-RoPE vs 165 for RelPos).

On Speech Robust Bench under severity 2 temporal perturbations, CD-RoPE outperforms RelPos across all conditions, achieving lower WERs on tempo down (2.13 vs 2.29), tempo up (2.85 vs 2.95), slowdown (2.31 vs 2.44), and speedup (4.87 vs 5.34). At severity 4 extreme temporal shifts, CD-RoPE achieves an absolute 2.10% WER reduction on tempo up (8.63% vs 10.73%). Spectral and noise perturbations show mixed or negligible differences (e.g., environmental noise 2.87% vs 2.74% favoring RelPos).

| System | dev-clean | test-clean | test-other |
|---|---|---|---|
| Branchformer + RelPos | 2.02% | 2.17% | 5.07% |
| Branchformer + CD-RoPE | 1.96% | 2.13% | 4.95% |

## Limitations

Evaluated exclusively on a single corpus (LibriSpeech) using a single random seed and restricted to the Branchformer architecture to isolate the mechanism. Lacks a direct mechanistic interpretability analysis of the learned Δt shifts and omits a formal ablation study of individual architectural components.

## Why read this

Speech researchers and model builders working on attention-based ASR encoders will learn how to inject continuous, input-dependent temporal awareness into rotary position embeddings without causing training divergence.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust automatic speech recognition systems operating in acoustically challenging or temporally perturbed real-world environments.

## Institutions / 機構

Carnegie Mellon University, University of Pittsburgh

## Related

- (link related pages by id as the wiki grows)
