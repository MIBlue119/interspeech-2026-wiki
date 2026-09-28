---
id: liu26d_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-548
pdf: https://www.isca-archive.org/interspeech_2026/liu26d_interspeech.pdf
---

# Towards Array-Invariant Speech Enhancement via Geometry-Aware Dynamic Convolution

*Zhenglong Liu, Wangyou Zhang, Chenda Li, Yanmin Qian*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-548)

**TL;DR** — The paper introduces Geometry-Aware Dynamic Convolution (Geo-DConv), a framework that injects explicit microphone array coordinate priors into fixed-array speech enhancement models, turning them into array-invariant systems that generalize across arbitrary microphone counts and layouts. Evaluated on the RealMAN dataset, the proposed SpatialNet-Geo-DConv and TF-GridNet-Geo-DConv achieve robust multi-channel speech enhancement without requiring device-specific retraining.

## Key contributions

- Proposes Geo-DConv, a dynamic convolution module that adapts fixed-dimensional convolution kernels to arbitrary input channel counts and spatial configurations using explicit microphone coordinates.
- Introduces the Topology-Aware Coordinate Transformer (TACT) to process Fourier-encoded coordinate matrices via Multi-Head Self-Attention, yielding a permutation-equivariant dynamic transformation matrix.
- Bridges the gap between fixed-array and array-invariant speech enhancement, allowing powerful fixed-array models (SpatialNet, TF-GridNet) to operate across variable microphone numbers and topologies.
- Demonstrates robust zero-shot cross-dataset generalization from RealMAN (trained on up to 4 microphones) to the 6-microphone CHiME-4 test set without any fine-tuning.

## Problem

Multi-channel speech enhancement models typically rely on fixed microphone array geometries, causing performance degradation or complete failure when deployed on devices with different layouts, and forcing costly device-specific retraining. Existing array-agnostic methods either process channels independently (losing rich multi-channel spatial relationships) or rely on rigid geometric transformations like First-Order Ambisonics and virtual mic interpolation that fail for small arrays or lack explicit geometry modeling. Furthermore, conventional fixed-array models learn implicit spatial biases that collapse when trained on random, shifting array configurations, preventing them from benefiting from large-scale multi-channel pooling.

## Method

The framework takes STFT complex spectrograms concatenated across frequency as input features $X \in \mathbb{R}^{C \times F \times T}$ along with a relative coordinate matrix $G \in \mathbb{R}^{C \times 3}$ (formatted in spherical coordinates $r, \theta, \phi$). First, coordinates are mapped using Fourier Positional Encoding ($L=6$ bands) to yield $G_{pe} \in \mathbb{R}^{C \times d_{pe}}$. These embeddings are projected to a hidden dimension ($d_{hidden}=64$) and fed into the Topology-Aware Coordinate Transformer (TACT), consisting of 2 Transformer encoder layers with 4 attention heads, generating a topology-aware feature representation.

The resulting tokens produce a dynamic transformation coefficient matrix $M \in \mathbb{R}^{C \times b}$ (with basis dimension $b=8$), which combines through linear combination with basis convolution kernels $K \in \mathbb{R}^{b \times O \times K_f \times K_t}$ (output channel size $O=16$) to generate input-specific dynamic weights $W_{dyn} \in \mathbb{R}^{C \times O \times K_f \times K_t}$. Point-wise Fourier PE and permutation-equivariant multi-head self-attention ensure that spatial input permutations result in an identically permuted dynamic kernel, mathematically guaranteeing output invariance under channel reordering.

The dynamically weighted features pass through Layer Normalization (LN) and a PReLU activation function, converting standard fixed-array backbones like SpatialNet and TF-GridNet into array-invariant processors that map variable-dimensional inputs into fixed-dimensional representations.

## Experimental setup

Evaluated on the RealMAN dataset containing 83.7 hours of real-recorded multi-channel speech across 32 scenes and 144.5 hours of background noise across 31 scenes, alongside zero-shot cross-dataset evaluation on the 6-microphone CHiME-4 test set. Baselines include single-channel BSRNN, array-agnostic FaSNet-TAC and USES2-comp, and fixed-array SpatialNet and TF-GridNet. Signals are resampled to 8 kHz with a 256-point STFT window and 128-sample frame shift, evaluated using SDR, SI-SDR, PESQ, STOI, P808, SIG, BAK, and OVRL metrics.

## Results

SpatialNet-Geo-DConv achieves an SI-SDR of 4.22 dB and an OVRL of 2.68 under the geometry-invariant setting, closely matching or outperforming array-agnostic baselines while maintaining a tiny footprint (1.3M parameters, 6.08 G/s MACs). TF-GridNet-Geo-DConv reaches a PESQ of 2.59 and an OVRL of 2.77, establishing state-of-the-art performance among array-invariant models at the cost of higher compute (8.3M parameters, 73.12 G/s MACs). In zero-shot cross-dataset transfer to CHiME-4 (6 mics), SpatialNet-Geo-DConv and TF-GridNet-Geo-DConv improve the unprocessed DNSMOS OVRL score from 1.42 to 2.64 and 2.73, respectively, outperforming USES2-comp (2.55).

| System / Condition | SI-SDR (dB) | PESQ | OVRL |
|---|---|---|---|
| Unprocessed (RealMAN) | -9.47 | 1.54 | 1.49 |
| FaSNet-TAC (Array-Agnostic) | -0.81 | 1.74 | 2.05 |
| USES2-comp (Array-Agnostic) | 4.17 | 2.52 | 2.56 |
| SpatialNet-Geo-DConv (Ours) | 4.22 | 2.48 | 2.68 |
| TF-GridNet-Geo-DConv (Ours) | 3.90 | 2.59 | 2.77 |

## Limitations

The current evaluation is restricted to maximum 4-microphone training configurations, and performance on ultra-dense arrays or highly irregular non-coplanar geometries beyond those in RealMAN and CHiME-4 requires further study. The framework assumes accurate relative coordinate information is available for the active microphones. Computationally, incorporating TACT adds a modest transformer overhead over standard convolutions, though it remains efficient for lightweight architectures like SpatialNet.

## Why read this

Speech researchers and audio engineers seeking to merge disparate multi-channel datasets or deploy robust spatial audio models across arbitrary hardware form-factors should read this paper to learn how to inject explicit geometry priors into dynamic convolutional adapters.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-microphone smart speakers, hearing aids, wearable audio devices, and teleconferencing hardware requiring robust speech enhancement across diverse, unconstrained array geometries.

## Related

- (link related pages by id as the wiki grows)
