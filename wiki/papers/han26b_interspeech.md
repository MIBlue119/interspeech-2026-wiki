---
id: han26b_interspeech
category: audio-understanding
institutions: ["Hanyang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-865
pdf: https://www.isca-archive.org/interspeech_2026/han26b_interspeech.pdf
---

# Branch-wise Complementary Attention for Acoustic Scene Classification

*Seung-Gyu Han, Jinwoo Jung, Pil Moo Byun, Won-Gook Choi, Joon-Hyuk Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/han26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-865)

**Category:** `audio-understanding`

**TL;DR** — The paper introduces Branch-wise Complementary Attention (BCA), a module that assigns channel, time, frequency, and joint attention maps across parallel convolutional branches according to their receptive field properties. Integrated into Rep-Mobile, BCA achieves state-of-the-art acoustic scene classification accuracies of 72.03% on TAU 2020 and 63.24% on TAU 2022.

## Key contributions

- Proposes the Branch-wise Complementary Attention (BCA) module to explicitly model and compensate for receptive field limitations across parallel multi-branch convolutions.
- Formulates a cross-branch attention allocation strategy where spectral-oriented branches receive time attention, temporal-oriented branches receive frequency attention, and 1x1 branches receive joint time-frequency attention.
- Introduces BCA-Lite, a channel-split variant that reduces parameters (125K) and MACs (274M) below the original Rep-Mobile backbone while preserving competitive accuracy.
- Demonstrates through Effective Receptive Field (ERF) analysis that BCA significantly broadens the contextual coverage of lightweight acoustic models.

## Problem

Lightweight convolutional networks for acoustic scene classification (ASC) employ multi-branch structures with varying kernel sizes (e.g., Rep-Mobile, CP-Mobile) to capture diverse spectro-temporal patterns, but typically aggregate them via naive concatenation or summation. Standard attention modules like Squeeze-and-Excitation (SE), Efficient Channel Attention (ECA), or channel-time-frequency attention (CTFA) operate on single-path representations and fail to exploit the distinct receptive field attributes of individual branches. Without explicit cross-branch compensation, networks miss critical complementary contextual cues, limiting their generalization on resource-constrained mobile devices.

## Method

The backbone is Rep-Mobile, which features parallel depthwise convolutional blocks with kernel sizes of 3x3 (local joint patterns), 3x1 (spectral context), 1x3 (temporal context), and 1x1 (cross-channel interactions). Unlike standard inference which collapses these branches via structural reparameterization, the framework preserves them to apply the BCA module. The BCA module takes the fused feature map X (C x F x T) and computes global descriptors via average pooling along different axes. These descriptors are transformed through 1D convolutions and sigmoid activations to generate channel (wc), time (wt), and frequency (wf) attention weights, alongside a joint time-frequency weight (wctf) derived via outer products (wt ⊗ wf).

An element-wise softmax is applied across the four attention tensors to normalize their relative importance, producing weights that are complementarily allocated to their corresponding branch outputs. For low-complexity deployments, the authors design BCA-Lite, which splits the input tensor channels into four groups of size C/4, routes each group to a dedicated convolutional branch with its specific kernel and single attention map, and concatenates the resulting outputs.

Models are trained for 150 epochs using the Adam optimizer with a batch size of 128. The learning rate warms up from 0 to 0.01 over the first 3,000 steps and decays via cosine annealing. Audio inputs are sampled at 32 kHz, converted to log-Mel spectrograms using a 3,072-sample window, 512 hop size, 4,096-point FFT, and 256 Mel filterbanks. Data augmentations include ±125ms time shifting, SpecAugment with 48 Mel frequency bins, and FreqMixStyle with α=0.3 and p=0.7.

## Experimental setup

Evaluated on TAU Urban Acoustic Scenes 2020 Mobile (TAU 2020, 10-second clips) and TAU Urban Acoustic Scenes 2022 Mobile (TAU 2022, 1-second clips) datasets containing single-channel recordings from 10 acoustic scenes across multiple real and simulated devices. Baselines include CP-Mobile, Rep-Mobile, and Rep-Mobile adapted with SE, ECA, and CTFA modules. Metrics are classification accuracy (%), parameter count, and multiply-accumulate operations (MACs).

## Results

On the TAU 2020 dataset, the Rep-Mobile baseline achieves 68.86% accuracy, while adding SE, ECA, and CTFA yields 69.10%, 68.09%, and 70.18%, respectively. The proposed BCA significantly outperforms them with 72.03% accuracy at 142K parameters and 299.5M MACs. On the TAU 2022 dataset, Rep-Mobile achieves 61.52%, SE reaches 61.83%, ECA reaches 62.46%, CTFA reaches 62.23%, and BCA achieves 63.24% accuracy at 30.4M MACs.

The lightweight variant BCA-Lite achieves 71.26% on TAU 2020 and 63.20% on TAU 2022 while cutting parameters down to 125K and MACs to 274.0M (TAU 2020) and 27.8M (TAU 2022), outperforming the baseline with fewer compute resources. Ablations confirm that removing any individual attention component degrades accuracy, with time attention proving most vital for 10-second clips (TAU 2020) and frequency attention most critical for shorter 1-second clips (TAU 2022). Effective receptive field area ratios at τ = 50% expand from 13.58% to 28.47% on TAU 2020 when using BCA.

| System | Params | MACs (TAU 2020) | TAU 2020 Acc (%) | TAU 2022 Acc (%) |
|---|---|---|---|---|
| CP-Mobile | 126K | 284.4M | 67.41 | 60.59 |
| Rep-Mobile (Baseline) | 126K | 286.5M | 68.86 | 61.52 |
| Rep-Mobile + SE | 145K | 299.2M | 69.10 | 61.83 |
| Rep-Mobile + ECA | 137K | 299.3M | 68.09 | 62.46 |
| Rep-Mobile + CTFA | 157K | 300.4M | 70.18 | 62.23 |
| Rep-Mobile + BCA (Ours) | 142K | 299.5M | **72.03** | **63.24** |

## Limitations

The evaluation is strictly confined to acoustic scene classification on the TAU 2020 and 2022 datasets, leaving the generalizability of BCA to other audio tasks like speech recognition or sound event detection untested. The method relies heavily on fixed multi-branch architectural designs like Rep-Mobile, requiring structural modifications that prevent standard deployment-time weight reparameterization without architectural adaptation (though mitigated via BCA-Lite).

## Why read this

Researchers and embedded ML engineers working on lightweight audio classification will learn how to design cross-branch attention mechanisms that overcome the limitations of naive multi-branch feature aggregation without sacrificing edge device efficiency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device acoustic monitoring, mobile context-aware sensing, smart home appliances, and embedded edge audio processing.

## Institutions / 機構

Hanyang University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- (link related pages by id as the wiki grows)
