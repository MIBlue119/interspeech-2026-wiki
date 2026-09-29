---
id: jin26_interspeech
category: speaker
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-634
pdf: https://www.isca-archive.org/interspeech_2026/jin26_interspeech.pdf
---

# Beyond Residual Connections: Manifold-Constrained Hyper-Connections for Robust Speaker Representation Learning

*Zezhong Jin, Xiaoyu Wang, Zhe Li, Chong-xin Gan, Zilong Huang, Man-Wai Mak, Kong Aik Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/jin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-634)

**Category:** `speaker`

**TL;DR** — This paper introduces Manifold-Constrained Hyper-Connections (mHC) to speaker recognition, replacing single-path residual identity shortcuts with a multi-stream information-mixing protocol stabilized by Sinkhorn-Knopp iterations, achieving consistent EER reductions across multiple backbones with negligible computational overhead.

## Key contributions

- First application of Manifold-Constrained Hyper-Connections (mHC) to speaker verification, generalizing the conventional single-path residual connection into a multi-stream interaction protocol.
- Adopts an efficient static parameterization strategy using a standalone learnable mixing matrix W, reducing the mixing overhead from O(n C n^2) to O(n^2).
- Uses Sinkhorn-Knopp iterations (k=3) to project the mixing matrix onto a doubly stochastic manifold, ensuring energy conservation, scaling stability, and preventing gradient explosion/vanishing.
- Comprehensive empirical validation across four mainstream architectures (ResNet-34, Res2Net, ECAPA-TDNN-S, and ECAPA-TDNN-L) on VoxCeleb1 and VoxSRC21-val.

## Problem

Standard residual connections rely on point-to-point element-wise addition (y = x + f(x)), which processes each feature channel independently without inter-channel information exchange. As networks deepen, this restriction leads to feature redundancy, where successive layers produce highly correlated representations and fail to capture subtle discriminative patterns. While unconstrained Hyper-Connections (HC) introduce multi-stream mixing to solve this, they lack the fixed identity mapping property, leading to severe numerical instability (exploding or vanishing signal magnitudes) during training. This work addresses the lack of a stable, high-bandwidth information-mixing mechanism in deep speaker recognition models.

## Method

The mHC module reformulates the layer-wise hidden state into N parallel streams (h_l^1, h_l^2, ..., h_l^N). These streams are aggregated via concatenation (H_pre) into a unified feature map x_l fed into the transformation block F(·), and subsequently partitioned back into N disjoint streams via H_post. Inter-stream communication is governed by a learnable mixing matrix W in R^{N \times N}, enabling every stream to selectively aggregate and refresh content across all historical streams.

To maintain numerical stability, the mixing matrix is constrained to a doubly stochastic manifold using Sinkhorn-Knopp iterations. A nonnegative matrix A = exp(Θ) is constructed from a learnable parameter matrix Θ, followed by alternating row normalizations (A ← diag(A 1_N)^{-1} A) and column normalizations (A ← A diag(1^⊤_N A)^{-1}) for k = 3 iterations to enforce unit row and column sums. Unlike dynamic mapping, a static parameterization strategy is used where W is a standalone learnable matrix.

mHC is integrated as a drop-in replacement for standard residual shortcuts. In ResNet-34 and Res2Net, mHC replaces inter-block residual connections across the four stages, with 1×1 convolution shortcuts managing dimensional transitions between stages. In ECAPA-TDNN, mHC replaces the residual connection inside the SE-Res2Block (skipping over the bottleneck and SE attention layers).

## Experimental setup

Models are trained on the VoxCeleb2 development set (5,994 speakers) using data augmentation with MUSAN noise/music/babble and room impulse responses (RIR). Evaluated on VoxCeleb1 test sets (Vox-O with 37,611 trials, Vox-E with 579,818 trials, and Vox-H with 550,894 trials) and the VoxSRC 21 validation set (VoxSRC21-val with 60,000 trials). Backbones tested include ResNet-34 (6.34M params), Res2Net (4.03M params), ECAPA-TDNN-S (6.19M params), and ECAPA-TDNN-L (20.76M params). Trained using SGD with batch size 256, 3-second random crops, 80-dimensional Fbank features, linear learning rate warmup (5×10^-5 to 0.2 over 5 epochs), followed by cosine decay. Optimized using AAM-Softmax loss (scale=32, margin scheduler starting at 0.0, scaling to 0.3 at epoch 20, fixed at epoch 50). Evaluated via Equal Error Rate (EER) and minimum Detection Cost Function (minDCF).

## Results

Replacing standard residual connections with mHC consistently improves performance across all evaluated backbones while keeping parameter counts and GFLOPs nearly identical (~1.0 GFLOPs for small and ~3.8 GFLOPs for large variants). On VoxCeleb1-H, mHC-ECAPA-L reduces EER from 2.12% down to 1.88% (an 11.3% relative reduction) with a minDCF drop from 0.210 to 0.190. On the challenging VoxSRC21-val benchmark, mHC-ResNet34 achieves a notable relative EER reduction of 12.5% (dropping from 3.83% to 3.35%). Ablation studies on stream count N using ECAPA-TDNN-L demonstrate that N=4 yields the optimal trade-off between cross-stream exchange and convergence stability, with performance slightly degrading as N increases to 8, 16, or 32. Furthermore, comparing unconstrained HC to manifold-constrained mHC on ECAPA-TDNN-L confirms the necessity of the doubly stochastic constraint, with mHC outperforming HC (0.77% vs 0.84% EER on VoxCeleb1-O).

| System | Params (M) | Vox-O EER(%) | Vox-E EER(%) | Vox-H EER(%) |
|---|---|---|---|---|
| Res2Net | 4.03 | 1.56 | 1.41 | 2.48 |
| mHC-Res2Net | 4.03 | 1.41 | 1.40 | 2.43 |
| ResNet-34 | 6.34 | 1.05 | 1.11 | 1.99 |
| mHC-ResNet34 | 6.34 | 1.03 | 1.09 | 1.93 |
| ECAPA-TDNN-L | 20.76 | 0.87 | 1.12 | 2.12 |
| mHC-ECAPA-L | 20.76 | 0.77 | 0.94 | 1.88 |

## Limitations

The evaluation is restricted to standard speaker verification benchmarks (VoxCeleb1 and VoxSRC21-val) using English-heavy or multilingual corpora without exploring severe domain shift conditions like cross-lingual or severe mismatched channel acoustics. The paper only evaluates stream counts up N=32 and fixed static parameterizations, leaving dynamic input-dependent mixing matrix generation unexplored due to its prohibitive computational cost. The method's generalizability is verified only on CNN and TDNN-based speaker backbones, omitting modern Transformer-based speaker embedding architectures.

## Why read this

Speech and ML engineers building speaker recognition systems will learn how to seamlessly upgrade residual backbones (such as ECAPA-TDNN or ResNet) with manifold-constrained multi-stream connections for free performance gains without parameter inflation.

## Code

- https://github.com/modelscope/3D-Speaker

## Applications

Biometric speaker authentication, secure voice-driven financial transactions, and forensic speaker identification.

## Institutions / 機構

Hong Kong Polytechnic University, Baidu, University of Hong Kong

**Funding / 經費:** Research Grants Council of the Hong Kong SAR, The Hong Kong Polytechnic University

## Related

- (link related pages by id as the wiki grows)
