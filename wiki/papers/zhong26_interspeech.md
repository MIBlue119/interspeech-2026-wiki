---
id: zhong26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-692
pdf: https://www.isca-archive.org/interspeech_2026/zhong26_interspeech.pdf
---

# Uncovering Dimension-Specific Layer Preferences in Wav2Vec2 for Fine-Grained Perceptual Assessment of Dysarthric Speech

*Zihan Zhong, Qianli Wang, Satwinder Singh, Clarion Mendes, Mark Hasegawa-Johnson, Waleed Abdulla, Seyed Reza Shahamiri*

[PDF](https://www.isca-archive.org/interspeech_2026/zhong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-692)

**TL;DR** — This paper investigates layer-wise representation preferences in Wav2Vec2 for predicting 25 clinical Darley–Aronson–Brown (DAB) perceptual dimensions of dysarthric speech, showing that optimal layers vary widely by dimension and that learnable scalar mixing across layers improves assessment accuracy. The approach achieves a mean Spearman correlation of 0.47 and MAE of 0.43 on the Speech Accessibility Project benchmark.

## Key contributions

- Applies Low-Rank Adaptation (LoRA) for unsupervised domain adaptation (UDA) of Wav2Vec2-Large on 315,102 unlabeled dysarthric utterances from the Speech Accessibility Project (SAP).
- Provides the first systematic layer-wise probing across 25 DAB perceptual dimensions, proving that the optimal layer is dimension-dependent and that the final layer is rarely optimal.
- Demonstrates that learnable scalar mixing (both global and per-dimension) outperforms single-layer selection, raising Spearman correlation from 0.38 to 0.47.
- Establishes and releases a reproducible speaker-disjoint stratification benchmark partitioning the SAP labeled subset into Train (8,637 samples, 346 speakers), Dev (1,029 samples, 36 speakers), and Test (1,392 samples, 53 speakers).

## Problem

Auditory-Perceptual Analysis (APA) using the Darley–Aronson–Brown (DAB) clinical framework is the gold standard for assessing motor speech disorders like dysarthria, but manual rating is subjective, time-consuming, and expertise-dependent. Automated machine learning approaches are constrained by data scarcity and reliance on coarse, speaker-level intelligibility labels rather than granular clinical dimensions. Furthermore, prior speech assessment pipelines default to extracting features from a single self-supervised layer—typically the final layer—which discards heterogeneous acoustic and linguistic cues distributed across different representation depths.

## Method

The authors employ a two-stage framework using Wav2Vec2-Large (317M parameters, 24 transformer layers, 1024-dim hidden states). In Stage 1, unsupervised domain adaptation (UDA) is performed on 315,102 unlabeled SAP utterances using Low-Rank Adaptation (LoRA) applied to query, key, value, output, and feed-forward layers with rank r = 32, alpha = 64, and dropout 0.05, introducing 9.4M trainable parameters while keeping the base encoder frozen. Training uses the standard Wav2Vec2 contrastive masked prediction objective (p = 0.065, span 10) for 12,000 steps with a learning rate of 3e-4 and effective batch size of 64.

In Stage 2, the adapted encoder is frozen and used to extract hidden states across all 25 layers (Layer 0 CNN output plus 24 transformer layers). To combine representations without picking a single arbitrary layer, learnable scalar mixing applies softmax-normalized weights over all 25 layers. Two configurations are tested: global (c=1, sharing one set of weights across all dimensions) and per-dimension (c=25, learning independent weights per DAB dimension). The fused representation passes through a refinement neck containing a 1D convolution (kernel size 3, 1024 channels), LayerNorm, a 1024-to-1024 linear layer, and dropout (p = 0.1). Final scoring uses masked mean pooling followed by dimension-specific Consistent Rank Logits (CORAL) loss heads to respect the 1-to-7 ordinal rating scale.

Models are trained using the AdamW optimizer with a learning rate of 5e-4, weight decay of 0.01, effective batch size of 32, and dropout p = 0.1 for a maximum of 15 epochs. Audio samples are resampled to 16 kHz, peak-normalized, and target labels are scaled to [0, 1].

## Experimental setup

Evaluated on the Speech Accessibility Project (SAP) corpus (version 2025-11-02), utilizing 30.0 hours for training, 4.1 hours for dev, and 5.0 hours for testing across 25 filtered DAB dimensions. Baselines include frozen Wav2Vec2-Large without LoRA, single best-layer probes, and single best-layer probes with a refinement neck. Metrics include Mean Absolute Error (MAE) and Spearman's rank correlation coefficient (rho) with 95% bootstrap confidence intervals (1,000 iterations). Experiments are implemented in PyTorch and HuggingFace using three NVIDIA GeForce RTX 3090 GPUs.

## Results

LoRA adaptation improves representation quality over the unadapted baseline across 23 of 25 layers for MAE and 21 of 25 layers for Spearman correlation. Layer-wise probing shows that the final layer (Layer 24) is optimal for 0 out of 25 dimensions for the adapted encoder, with optimal individual layers clustering in mid-to-late transformer layers (L9-L18). 

Adding a refinement neck to the best single layers improves MAE from 0.51 to 0.47 and Spearman from 0.38 to 0.41. Global scalar mixing (c=1) and per-dimension scalar mixing (c=25) achieve average MAEs of 0.44 and 0.44 respectively, and Spearman correlations of 0.46 and 0.47, outperforming all single-layer configurations. Dimension-specific mixing yields substantial gains on event-like dimensions such as Pitch breaks (rho rising from 0.11 to 0.24) and Audible inspiration (rho rising from 0.19 to 0.27). Both mixing methods struggle with prosodic-temporal dimensions like Pitch level (rho ~0.13), heavily constrained by severe label skew and dataset imbalance.

| System | MAE (downarrow) | Spearman rho (uparrow) |
|---|---|---|
| LoRA L16 Probe (Single Layer) | 0.51 [0.50, 0.52] | 0.36 [0.35, 0.38] |
| LoRA L18 Probe (Single Layer) | 0.52 [0.51, 0.53] | 0.38 [0.37, 0.40] |
| L16 + Refinement Neck | 0.471 [0.451, 0.483] | 0.409 [0.378, 0.441] |
| L18 + Refinement Neck | 0.464 [0.440, 0.472] | 0.413 [0.392, 0.453] |
| Scalar Mixing (Global, c=1) | 0.441 [0.433, 0.451] | 0.460 [0.450, 0.483] |
| Scalar Mixing (Per-dimension, c=25) | 0.440 [0.430, 0.450] | 0.469 [0.456, 0.488] |

## Limitations

The study evaluates only a single SSL architecture (Wav2Vec2-Large), utilizes a relatively lightweight scalar mixing and neck architecture, and does not explicitly address extreme label imbalance and skew present in clinical SAP ratings (where most samples concentrate on mild/typical values). Furthermore, language coverage is restricted to American English, and temporal modeling is limited by masked mean pooling which struggles with certain long-span prosodic-temporal attributes.

## Why read this

Speech and ML researchers building automated clinical speech assessment tools should read this paper to understand why default single-layer SSL feature extraction fails for multi-dimensional perception tasks, and how learnable scalar mixing can effectively exploit hierarchical multi-layer representations.

## Code

- https://github.com/Kanelmis/UDS

## Applications

Automated clinical speech assessment tools, computer-aided diagnosis and progress tracking for speech-language pathologists (SLPs), and multi-dimensional profiling of motor speech disorders.

## Related

- (link related pages by id as the wiki grows)
