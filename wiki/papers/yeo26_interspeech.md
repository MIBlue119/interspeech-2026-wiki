---
id: yeo26_interspeech
category: asr
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2063
pdf: https://www.isca-archive.org/interspeech_2026/yeo26_interspeech.pdf
---

# Pushing the Limits of Compression: Sub-1-Bit Conformer via Variable-Rank Binary Decomposition

*Jinsu Yeo, Banseok Lee, Youngmin Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/yeo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yeo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2063)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — LittleASR is a mixed-precision framework that applies variable-rank binary decomposition to Conformer-Transducers, bypassing the 1-bit limit of standard integer quantization to achieve sub-1-bit compression. By using gradient-aware sensitivity to compress robust encoder layers down to 0.2 bpw while protecting the sensitive decoder, it achieves a 6.01% dev-other WER at 1.0 bpw and an extreme compression footprint of 7.1 MB (0.2 bpw).

## Key contributions

- Introduces rank-adaptive binary low-rank decomposition to reparameterize weights into binary matrices plus learnable row, column, and latent scaling vectors.
- Decouples model compression from discrete integer grids (1, 2, 4 bits) to provide quasi-continuous bit-width adjustments (e.g., 0.1 to 2.0 bpw) controlled by the inner rank r.
- Formulates a gradient-aware layer-wise sensitivity metric and differentiable search objective to automatically allocate higher rank to the autoregressive decoder/joint network and aggressive sub-1-bit compression to the encoder.
- Extends compression limits of a 120M-parameter Conformer-Transducers down to 7.1 MB (0.2 bpw) where standard integer quantization baselines cannot operate.

## Problem

End-to-end ASR models like Conformer-Transducers exceed 100M parameters, creating bottlenecks for on-device deployment under strict memory and power budgets. Prior mixed-precision schemes aggressively compress the encoder but keep the autoregressive decoder at higher precision (4-16 bits) to prevent context collapse. However, standard integer quantization hits a strict structural lower bound of 1 bit per parameter, causing a compression deadlock in extreme edge scenarios where further model reduction is required but inaccessible due to the discrete grid.

## Method

LittleASR replaces dense weight matrices $W \in \mathbb{R}^{d_{out} \times d_{in}}$ with a variable-rank binary decomposition product: $\tilde{W} = \text{diag}(\mathbf{h}) \mathbf{U}_b \text{diag}(\boldsymbol{\ell}) \mathbf{V}_b^\top \text{diag}(\mathbf{g})$, where $\mathbf{U}_b$ and $\mathbf{V}_b$ are binary matrices in $\{\pm 1\}$ initialized from floating-point latent matrices, and $\mathbf{h}$, $\mathbf{g}$, and $\boldsymbol{\ell}$ are full-precision row, column, and latent scaling vectors kept in FP16. This structure allows efficient forward passes using binary matrix multiplications and element-wise scaling without materializing the dense weight matrix, substituting heavy FP16 GEMMs with lightweight binary GEMMs and bit operations.

To assign bits, the framework measures layer-wise sensitivity using accumulated squared gradients over a calibration set. It minimizes a continuous allocation loss combining an L1 budget penalty targeting a global bit-width $B_{target}$ and a sensitivity-weighted penalty on rank reduction, optimized via Adam. A post-optimization scalar shift via binary search enforces exact hard memory budgets. The model is then fine-tuned using Quantization-Aware Training (QAT) with the Straight-Through Estimator (STE) for discrete binary factor updates.

## Experimental setup

Evaluated on the 120M-parameter Conformer-Transducer Large (NVIDIA NeMo v1.9.0 checkpoint) trained on LibriSpeech (v1.9.0). Trained for 100 epochs on 8 A100 GPUs using a cosine annealing schedule with a peak learning rate of $5.0 \times 10^{-4}$, checkpoint selection based on dev-other Word Error Rate (WER). Compared against FP32 baseline, Round-to-Nearest (RTN) at INT4 and INT2, and group-wise/tensor-wise AbsMean at 1.0 bit, using 80 calibration utterances.

## Results

At 1.0 bpw, LittleASR with gradient-aware mixed rank achieves 6.01% WER on dev-other and 2.36% on dev-clean, outperforming the tensor-wise AbsMean baseline (6.30% dev-other). In the uniform configuration at 0.8 bpw (15.8 MB), it yields 6.93% dev-other WER, outperforming the INT2 RTN baseline (7.08% at 33.0 MB) while cutting model size in half. The gradient-aware mixed rank strategy further improves this to 6.41% at 0.8 bpw and extends operation down to 0.2 bpw (7.1 MB) with a 15.19% dev-other WER, a region where traditional integer quantization fails entirely. Ablations confirm that reversing this allocation (high encoder, low decoder) severely degrades performance to 12.79% dev-other WER at 0.4 bpw.

| Method | Configuration | W-Bit | Size (MB) | Dev Other | Dev Clean |
|---|---|---|---|---|---|
| Baseline | FP32 | 32.0 | 481.6 | 4.77 | 2.12 |
| RTN | INT4 channel-wise | 4.0 | 62.3 | 5.05 | 2.21 |
| RTN | INT2 channel-wise | 2.0 | 33.0 | 7.08 | 2.93 |
| AbsMean | Tensor-wise | 1.0 | 18.1 | 6.30 | 2.62 |
| LittleASR (Ours) | Uniform Rank | 0.8 | 15.8 | 6.93 | 2.67 |
| LittleASR (Ours) | Gradient-Aware Mixed | 1.0 | 18.8 | 6.01 | 2.36 |

## Limitations

Evaluated exclusively on the English LibriSpeech benchmark using a single model architecture (Conformer-Transducer Large). The work relies on theoretical operation counts (FLOPs and BOPs) rather than measuring real on-device wall-clock latency, throughput, or actual power consumption. Full-precision scaling vectors ($\mathbf{h}, \mathbf{g}, \boldsymbol{\ell}$) add storage overhead that is accounted for in file sizes but could constrain ultra-low budgets.

## Why read this

Researchers and engineers tackling extreme on-device speech model deployment will learn how variable-rank binary decomposition can transcend standard 1-bit quantization grids. It provides a principled recipe for gradient-aware bit allocation in sequence-to-sequence models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device automatic speech recognition, voice assistants, and edge speech processing in extremely memory-constrained environments.

## Institutions / 機構

Samsung Electronics

## Related

- (link related pages by id as the wiki grows)
