---
id: jin26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-634
pdf: https://www.isca-archive.org/interspeech_2026/jin26_interspeech.pdf
---

# Beyond Residual Connections: Manifold-Constrained Hyper-Connections for Robust Speaker Representation Learning

[PDF](https://www.isca-archive.org/interspeech_2026/jin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-634)

**TL;DR** — This paper integrates Manifold-Constrained Hyper-Connections (mHC) into deep speaker recognition backbones, improving verification performance across multiple architectures without adding parameter overhead.

## Problem

Standard residual connections use point-to-point element-wise addition that restricts information to isolated paths, causing feature redundancy and limiting discriminative resolution in deep networks. While unconstrained hyper-connections introduce multi-stream mixing, they lack identity-preserving properties, resulting in catastrophic signal scale explosion or vanishing during deep network training. Ensuring robust signal propagation across parallel streams requires preserving the energy conservation and stability of traditional identity mappings.

## Method

The paper replaces standard residual shortcuts with Manifold-Constrained Hyper-Connections (mHC), splitting feature states into parallel streams that are mixed via a learnable matrix projected onto a doubly stochastic manifold using Sinkhorn-Knopp iterations. To maintain efficiency, the authors adopt a static parameterization strategy with a learnable mixing matrix $W \in \mathbb{R}^{n \times n}$, reducing overhead from $O(nC_{n}^{2})$ to $O(n^2)$. This approach is applied as a drop-in replacement across various backbones: inter-block skip connections for ResNet-34 and Res2Net, and internal bottleneck residual connections for ECAPA-TDNN-S and ECAPA-TDNN-L. Models are trained on the VoxCeleb2 development set using AAM-Softmax loss, SGD optimization, and standard speech augmentations.

## Results

Evaluated on VoxCeleb1 (splits O, E, H) and VoxSRC21-val using EER and minDCF metrics, mHC consistently outperforms standard baselines across all tested architectures. For instance, on the large ECAPA-TDNN-L model, mHC reduces the Equal Error Rate on VoxCeleb1-O/E/H from 0.87%/1.12%/2.12% down to 0.77%/0.94%/1.88%. On the challenging VoxSRC21-val set, ResNet-34 experiences a notable EER drop from 3.83% to 3.35%. Ablation studies over the parallel stream count $N \in \{4, 8, 16, 32\}$ indicate that an optimal performance trade-off is consistently achieved at $N = 4$.

## Code

- https://github.com/modelscope/3D-Speaker

## Applications

Speech engineers and researchers building robust speaker verification, biometric authentication, and forensic speaker recognition systems can use these plug-and-play modules to boost backbone accuracy.

## Related

- (link related pages by id as the wiki grows)
