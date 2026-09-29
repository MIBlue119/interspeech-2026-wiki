---
id: vo26_interspeech
category: paralinguistics-emotion
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1208
pdf: https://www.isca-archive.org/interspeech_2026/vo26_interspeech.pdf
---

# SETEAB: Multiscale approach with Squeeze-and-Excitation Temporal Enhanced Aware Block for Speech Emotion Recognition

*Duy Vo, Kiet Anh Hoang, Hao Do*

[PDF](https://www.isca-archive.org/interspeech_2026/vo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/vo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1208)

**Category:** `paralinguistics-emotion` · **Labels:** `efficient-on-device`

**TL;DR** — SETEAB is a lightweight multiscale speech emotion recognition architecture that integrates depthwise convolution subsampling, SE-Res2Blocks, and Temporal Enhanced Aware Blocks with weighted bidirectional fusion to achieve high accuracy at a fraction of the compute of self-supervised models. It establishes strong intra-corpus results and superior cross-corpus generalization.

## Key contributions

- Proposed the Temporal Enhanced Aware Block (TEAB) featuring pre-normalization, channel expansion, depthwise temporal filtering, and gated residual learning to upgrade standard TIM-Net temporal blocks.
- Designed a two-stage weighted bidirectional fusion module using global shared parameters (a, b) across directions and level-specific weights (λi) for hierarchical feature aggregation.
- Integrated an SE-Res2Block for local multi-scale pattern extraction and channel-wise recalibration prior to temporal sequence modeling.
- Employed depthwise convolution subsampling (rates R=2 or R=4) to compress early temporal redundancy and lower parameter/FLOP counts.

## Problem

End-to-end deep learning and self-supervised models like Wav2Vec 2.0 offer strong speech emotion recognition (SER) performance but possess high computational costs (e.g., 95M parameters, 33.53 GFLOPs) that restrict edge deployment. Existing lightweight alternatives such as TIM-Net and MS-SENet suffer from optimization instability due to lacking explicit normalization, feature redundancy from standard convolutions, and rigid bidirectional summation that assumes equal past-future contributions. Robust emotion understanding under domain shifts, speaking styles, and environmental noise remains an open bottleneck for practical edge devices.

## Method

The pipeline ingests raw audio converted to 80-dimensional log-Mel spectrograms ($T \times M$). A front-end depthwise convolution subsampling module reduces temporal dimensions by factor $R = 2^{NS}$ using $NS$ blocks (strides of 2, kernel size 3; the first block is a standard 2D convolution, remaining are depthwise separable with ReLU). Next, an SE-Res2Block refines local multi-scale and channel-wise discriminability using $1\times1$ convolutions ($\phi_1, \phi_3$), a Res2DilatedConv1D ($\phi_2$), Global Average Pooling, and channel scaling via sigmoid excitation.

The core temporal processing stack applies a sequence of 8 Temporal Enhanced Aware Blocks (TEABs) independently in forward and backward directions. Each TEAB takes input $F_{i-1} \in \mathbb{R}^{T' \times C}$ (channel dimension fixed at $C=64$), applies layer normalization, pointwise expansion (expansion ratio $e=4$), depthwise temporal convolution (kernel size 3, dilation factor $2^{i-1}$), a sigmoid gating mechanism, and gated residual learning. Dropout is set to 0.1.

Finally, a weighted bidirectional fusion (BiF) module combines forward and reverse representations using two global learnable parameters ($a$ and $b$) shared across all levels. Level-specific learnable parameters $\lambda_i$ aggregate features across all hierarchical layers into an utterance-level representation fed to a classification head trained via cross-entropy with label smoothing (factor 0.1).

## Experimental setup

Evaluated on five intra-corpus benchmark datasets (EMOVO, IEMOCAP, RAVDESS, MELD, CREMA-D) reporting Unweighted Accuracy (UA) and Macro-F1, and four cross-corpus evaluation sets (IEMOCAP, MELD, RAVDESS, SAVEE) reporting Weighted Accuracy (WA). Implemented with an Adam optimizer ($\alpha=0.001$, $\beta_1=0.93$, $\beta_2=0.98$, weight decay $10^{-6}$), batch sizes of 16 (MELD, IEMOCAP) or 32, stochastic data augmentation ($P=0.2$ time/pitch/speed/stretch perturbations, SpecAugment), and early stopping on an Intel Core i7-12800 CPU with an RTX A1000 GPU (4GB VRAM). Model size is ~0.4–0.5M parameters with 0.06–0.12 GFLOPs.

## Results

SETEAB ($R=2$) achieves the highest average intra-corpus UA of 47.69% and F1 of 45.14%, while SETEAB ($R=4$) achieves 47.61% UA and 45.23% F1, significantly outperforming TIM-Net (42.22% UA) and MS-SENet (42.97% UA) while consuming a tiny fraction of the footprint of Wav2Vec 2.0 base. In cross-corpus evaluations, SETEAB achieves a mean WA of 37.53% ± 8.20%, outperforming Wav2Vec 2.0 base (27.67%), TIM-Net (32.78%), and MS-SENet (34.31%), winning 7 out of 12 individual train-test transfer splits—especially dominating when testing on RAVDESS. Ablations confirm that combining BiF, SE-Res2, and directional depthwise subsampling yields cumulative gains over baseline BiF alone.

| System | Comp. (M / GFLOPs) | Intra-corpus Avg UA (%) | Intra-corpus Avg F1 (%) | Cross-corpus Mean WA (%) |
|---|---|---|---|---|
| wav2vec 2.0 base | ~95 / 33.53 | 45.14 | 44.17 | 27.67 |
| TIM-Net | ~0.12 / 0.05 | 42.22 | 39.83 | 32.78 |
| MS-SENet | ~0.15 / 0.13 | 42.97 | 40.22 | 34.31 |
| SETEAB (R=2) | ~0.5 / 0.12 | **47.69** | 45.14 | - |
| SETEAB (R=4) | ~0.4 / 0.06 | 47.61 | **45.23** | **37.53** |

## Limitations

Cross-corpus evaluation reveals higher standard deviation in WA (±8.20%), indicating vulnerability to extreme domain shifts despite higher mean accuracy. Evaluation is restricted to standard acted laboratory datasets (EMOVO, IEMOCAP, RAVDESS, MELD, CREMA-D, SAVEE) which may not fully reflect the acoustic variability, background noise, and spontaneous nature of real-world conversational speech.

## Why read this

Researchers and edge-AI engineers building low-resource or on-device speech emotion recognition systems should read this to see how lightweight CNN architectures can be restructured via specialized gating, feature recalibration, and weighted bidirectional fusion to rival or exceed massive self-supervised models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Healthcare monitoring, adaptive customer service, in-vehicle safety systems, and call-center analytics.

## Institutions / 機構

University of Science, Ho Chi Minh City, Vietnam National University, Ho Chi Minh City, UNEY

**Funding / 經費:** University of Science, VNU-HCM

## Related

- (link related pages by id as the wiki grows)
