---
id: li26u_interspeech
category: paralinguistics-emotion
labels: [self-supervised]
institutions: ["Xiangjiang Laboratory", "University of Exeter"]
code: https://github.com/secret-code-source/SOC
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1210
pdf: https://www.isca-archive.org/interspeech_2026/li26u_interspeech.pdf
---

# Geometric Second-Order Feature Correlation Learning for Self-Supervised Speech Emotion Recognition

*Shuanglin Li, Ruxiao Qian, Siyang Song*

[PDF](https://www.isca-archive.org/interspeech_2026/li26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1210)

**Category:** `paralinguistics-emotion` · **Labels:** `self-supervised`

**TL;DR** — The paper introduces a Second-Order Correlation (SOC) layer that models frame-level self-supervised speech embeddings as Symmetric Positive Definite (SPD) covariance manifolds, mapping them via Log-Euclidean Mapping (LEM) to a Euclidean tangent space. Tested across frozen SSL backbones on ESD and RAVDESS, SOC outperforms global average pooling by up to 4.68% Weighted Accuracy while eliminating high-dimensional quadratic complexity.

## Key contributions

- Formulates speech emotion feature correlations as Symmetric Positive Definite (SPD) manifold-valued representations, leveraging non-Euclidean geometry to capture emotional prosody and spectral synergies.
- Proposes a learnable subspace projection and trace normalization pipeline inside the SOC layer that circumvents the computational and numerical instability of high-dimensional SSL feature covariance calculation.
- Applies Log-Euclidean Mapping (LEM) to project Riemannian covariance descriptors onto a locally linear tangent space, allowing standard Euclidean linear classifiers to learn without geometric distortion.
- Demonstrates consistent, robust improvements across multiple frozen self-supervised backbones (Wav2Vec 2.0, HuBERT, WavLM) and two benchmark emotion datasets (ESD and RAVDESS).

## Problem

Traditional speech emotion recognition (SER) systems rely on first-order pooling mechanisms like Global Average Pooling (GAP) or attention, which treat latent frame representations as uncorrelated and discard second-order covariance synergies vital for identifying emotions. While early polynomial expansion methods captured these higher-order relationships, they suffered from intractable dimensional explosions when applied to modern high-dimensional SSL backbones (768-D or 1024-D). Conversely, naive bilinear pooling techniques perform operations directly in Euclidean space without tangent space projection, causing manifold deviation known as the 'swelling effect' that introduces spurious entropy and collapses class boundaries. This work bridges the gap by building efficient, geometry-aware second-order correlation modeling that respects the underlying Riemannian manifold of SSL features.

## Method

The framework consists of a frozen upstream SSL backbone (extracting frame-level representations $X \in \mathbb{R}^{T \times D_{in}}$), the proposed SOC layer, and a standard MLP classifier. First, the input features are centered by removing the global temporal mean and projected into a lower-dimensional compact subspace via a learnable linear mapping $W \in \mathbb{R}^{D_{in} \times d}$ to yield $Z \in \mathbb{R}^{T \times d}$ ($d \ll D_{in}$).

Next, the sample covariance matrix $C \in \mathbb{R}^{d \times d}$ is computed and divided by its trace (plus a small division constant $\epsilon_{div}$) to achieve scale-invariance and ensure the normalized covariance $\hat{C}$ resides on a unit-trace SPD manifold. To resolve the geometric incompatibility between the Riemannian manifold and downstream Euclidean classifiers, Log-Euclidean Mapping (LEM) is employed. Eigen-decomposition is applied to $\hat{C}$ with a small perturbation $\epsilon I_d$, and the matrix logarithm is taken in the spectral domain to map multiplicative geodesic distances into additive Euclidean distances: $S = U \text{diag}(\log(\lambda_1), \dots, \log(\lambda_d)) U^\top$.

Finally, the resulting tangent space matrix $S$ is half-vectorized using a $\text{vech}(\cdot)$ operator to isolate the $d(d+1)/2$ unique elements of the symmetric matrix, producing a compact vector $v$ fed directly into an end-to-end optimized MLP classifier. All matrix operations, including eigendecomposition, are fully differentiable, enabling joint optimization of the subspace projection and classifier.

## Experimental setup

Evaluated on the ESD dataset (bilingual English/Mandarin, 35,000 utterances, 20 speakers, 5-fold cross-validation) and the RAVDESS audio-only subset (1,440 recordings, 24 professional actors, 6-fold cross-validation) following the EmoBox speaker-independent protocol. Compared against baseline aggregation methods including Global Average Pooling (GAP), Attention-based Standard Pooling (ASP), and Amplitude-Aware Aggregation (FA). Implemented in PyTorch using a single NVIDIA RTX 4090, trained for 100 epochs with Cross-Entropy loss, AdamW optimizer (weight decay $10^{-4}$, peak LR $1 \times 10^{-4}$ with 10% linear warmup), and batch sizes of 64 (ESD) and 32 (RAVDESS). Evaluated using Weighted Accuracy (WA), Unweighted Accuracy (UA), and Macro F1-score across three base frozen SSL backbones: Wav2Vec 2.0, HuBERT, and WavLM ($D_{in} = 768$).

## Results

On the ESD dataset using the Wav2Vec 2.0 backbone, SOC achieves a Weighted Accuracy (WA) of 71.86%, outperforming GAP (67.18%), ASP (63.83%), and FA (68.94%) by significant margins. Across HuBERT and WavLM backbones, SOC consistently captures superior discriminative cues, achieving a peak WA of 73.50% on ESD with HuBERT. On the smaller RAVDESS dataset with Wav2Vec 2.0, SOC reaches 58.67% WA compared to 54.25% for GAP and 56.27% for FA, showing strong stability in data-scarce conditions where it beats the strongest baseline (FA) by 2.49% on WavLM. Ablation studies confirm the necessity of Log-Euclidean Mapping, as removing LEM (SOC w/o LEM) causes consistent performance drops (e.g., -1.45% on ESD and -1.65% on RAVDESS with HuBERT). Subspace dimension $d$ exhibits a unimodal curve where too small dimensions cause correlation starvation and too large dimensions trigger the curse of dimensionality.

| Backbone | Method | ESD (WA %) | RAVDESS (WA %) |
|---|---|---|---|
| Wav2Vec 2.0 | GAP | 67.18 | 54.25 |
| Wav2Vec 2.0 | FA | 68.94 | 56.27 |
| Wav2Vec 2.0 | SOC (Ours) | **71.86** | **58.67** |
| HuBERT | FA | 72.48 | 66.92 |
| HuBERT | SOC (Ours) | **73.50** | **69.75** |

## Limitations

The evaluation is restricted to clean, acted emotional speech databases (ESD and RAVDESS) under speaker-independent conditions, leaving performance unverified on noisy or in-the-wild conversational speech corpora. The method relies on frozen SSL backbones rather than end-to-end fine-tuning of the upstream encoder, which may bound the maximum capacity of the extracted frame features. Additionally, the computational cost of online eigen-decomposition within the SOC layer scales with the chosen subspace dimension $d$, requiring careful tuning to avoid training bottlenecks.

## Why read this

Researchers and engineers working on speech emotion recognition or downstream SSL aggregation modules should read this paper to learn how to inject Riemannian manifold geometry and second-order feature statistics into sequence representations without suffering from quadratic dimensionality blowups.

## Code

- https://github.com/secret-code-source/SOC

## Applications

Speech emotion recognition, paralinguistic analysis in spoken dialogue systems, and affective computing pipelines.

## Institutions / 機構

Xiangjiang Laboratory, University of Exeter

## Related

- (link related pages by id as the wiki grows)
