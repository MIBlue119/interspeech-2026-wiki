---
id: liu26d_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-548
pdf: https://www.isca-archive.org/interspeech_2026/liu26d_interspeech.pdf
---

# Towards Array-Invariant Speech Enhancement via Geometry-Aware Dynamic Convolution

[PDF](https://www.isca-archive.org/interspeech_2026/liu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-548)

**TL;DR** — The paper introduces Geometry-Aware Dynamic Convolution (Geo-DConv), a framework that integrates explicit microphone array coordinates to transform standard fixed-array speech enhancement models into robust, array-invariant systems.

## Problem

Multi-channel speech enhancement architectures yield superior performance over single-channel baselines but are rigidly bound to fixed microphone array geometries, hindering cross-device deployment and large-scale multi-dataset training. Existing array-agnostic methods either process channels independently without cross-channel synergy or rely on generic feature representations, completely omitting explicit spatial array geometry priors. This structural gap prevents them from matching the spatial filtering capacity of traditional geometry-aware signal processing techniques or fixed-array deep models.

## Method

The Geo-DConv framework takes relative spherical or Cartesian microphone coordinates, applies Fourier positional encoding, and passes them through a Topology-Aware Coordinate Transformer (TACT) block using multi-head self-attention. TACT generates a dynamic transformation coefficient matrix that linearly combines a set of basis convolution kernels, producing geometry-adapted weights for variable-channel and arbitrarily permuted inputs. This universal adapter module is integrated directly into established fixed-array architectures like SpatialNet and TF-GridNet ahead of layer normalization and PReLU activations. The systems are trained on real-recorded multichannel data from the RealMAN dataset at 8 kHz using complex STFT features.

## Results

Evaluated on the 32-channel real-recorded RealMAN dataset against baselines including FaSNet-TAC, USES2-comp, SpatialNet, and TF-GridNet using metrics such as SDR, SI-SDR, PESQ, STOI, and DNSMOS. Integrating Geo-DConv successfully bridges the performance gap, enabling fixed-array models to adapt seamlessly to arbitrary microphone counts and array topologies without performance collapse. Training with randomized microphone numbers and configurations further bolsters generalization and weight generation stability. The proposed SpatialNet-Geo-DConv matches strong array-agnostic architectures while preserving permutation equivariance and spatial robustness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers deploying multi-channel speech enhancement and denoising systems on hardware platforms with diverse, unknown, or variable microphone array geometries.

## Related

- (link related pages by id as the wiki grows)
