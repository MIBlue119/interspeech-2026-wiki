---
id: narasinghe26_interspeech
category: applications-other
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3316
pdf: https://www.isca-archive.org/interspeech_2026/narasinghe26_interspeech.pdf
---

# Causal Redundancy in Speech Representations: The Hydra Effect and Limits of Sparse Disentanglement in WavLM

*Patalee Narasinghe, Kasindu Bandara, Vilash Nawagamuwa, Janak Senevirathne, Uthayasanker Thayasivam*

[PDF](https://www.isca-archive.org/interspeech_2026/narasinghe26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/narasinghe26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3316)

**Category:** `applications-other` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates internal feature encoding in WavLM and discovers a "Hydra effect" where discrete neuron or sparse autoencoder latent ablations fail to suppress acoustic features due to massive representational redundancy. To achieve targeted feature removal, the authors show that Iterative Null-space Projection (INLP) must be used to erase entire continuous linear subspaces.

## Key contributions

- Demonstrates that raw WavLM early-layer neurons exhibit severe polysemanticity across low-level acoustic descriptors (GeMAPS).
- Applies JumpReLU Sparse Autoencoders (SAEs) to WavLM representations and identifies the "Hydra effect"—where zeroing out top-ranked interpretable latents fails to suppress acoustic features.
- Proves that continuous acoustic features in speech SSL models reside in distributed linear subspaces rather than isolated monosemantic neurons.
- Applies Iterative Null-space Projection (INLP) to successfully achieve targeted subspace erasure, showing that loudness occupies an isolated subspace while spectral features exhibit heavy mutual coupling.

## Problem

Self-supervised speech models like WavLM build hierarchical representations transitioning from low-level acoustics to high-level semantics, yet their internal mechanisms remain opaque. Prior interpretability methods rely heavily on linear probing, which is merely correlational, or attempt neuron-level feature disentanglement via Sparse Autoencoders (successful in NLP). However, the continuous, highly redundant nature of speech signals creates an interpretability gap: it is unknown whether acoustic features are encoded in isolated neurons or distributed manifolds, and whether standard neuron-level interventions can causally manipulate them.

## Method

The authors analyze WavLM-Base+ (94M parameters, 12 transformer layers, 768-dimensional hidden states, 12 attention heads), pretrained on 60k hours of English speech. They extract frame-wise hidden states from Layer 1 and pair them via linear interpolation with six openSMILE-derived GeMAPS descriptors (pitch, F1 frequency, Alpha Ratio, Hammarberg Index, HNR, Loudness) sampled at 10 ms vs WavLM's 20 ms stride.

To address polysemanticity, they train a JumpReLU Sparse Autoencoder mapping residual activations from $\mathbb{R}^{768}$ to a high-dimensional sparse latent space $\mathbb{R}^{8192}$ (expansion factor $\alpha \approx 10.67$). The JumpReLU SAE optimizes reconstruction error alongside an $L_0$ sparsity penalty controlled by learned per-feature thresholds $\theta_i$ and the Heaviside step function, avoiding $L_1$ magnitude shrinkage. The SAE is trained on 1M voice frames.

For causal analysis, the authors perform two types of intervention. First, they rank SAE latents using Lasso probe SHAP values and systematically ablate the top-N most critical latents to test for the Hydra effect. Second, to bypass this redundancy, they employ Iterative Null-space Projection (INLP) to learn linear predictors for specific features and project representations onto their null spaces, completely erasing the corresponding linear subspaces while checking for cross-feature selectivity via $R^2$ retention.

## Experimental setup

Evaluated on a multi-corpus, speaker-independent dataset combining RAVDESS, CREMA-D, and TIMIT (~6,000 utterances, ~10 hours of audio, 3s average duration). Baselines include random label shuffling (for probing) and random projection controls (for INLP). Metrics include coefficient of determination ($R^2$) for continuous probes, SAE reconstruction MSE, explained variance ($R^2$), and $L_0$ sparsity. All experiments are run on a single NVIDIA RTX 4070 GPU with 16 GB memory.

## Results

WavLM Layer 1 linear probes achieve high $R^2$ for acoustic features like $F_0$ and loudness, confirming linear encoding in early layers. The JumpReLU SAE achieves an $R^2$ reconstruction fidelity of 0.860 (MSE = 0.0069 vs mean baseline 0.0493) with a strict sparse bottleneck of mean $L_0 = 97.8$ active latents (~1.2% utilization). Despite this sparsity, iterative ablation of the top 50 to 100 SAE latents shows that pitch ($F_0$) and alpha ratio retain >98% of their probe $R^2$ (Ret. @ 50: 98.85% for pitch SAE, 98.31% for WavLM L1), proving the Hydra effect where discrete ablation fails.

In contrast, INLP subspace erasure successfully suppresses target features by >94% ($F_0$ drops 94.41%, loudness drops 94.66%, HNR drops 95.35%). Off-diagonal analysis reveals that loudness erasure is highly selective (<1.5% cross-drop on other probes), whereas spectral features (alphaRatio, hammarbergIndex, mfcc1) exhibit strong mutual coupling with cross-drops exceeding 75%, indicating a shared subspace.

| Feature & Space | Ret. @ 50 | $N_{critical}$ |
|---|---|---|
| Pitch ($F_0$) - WavLM L1 | 98.31% | > 500 |
| Pitch ($F_0$) - SAE Latent | 98.85% | 1000 |
| AlphaRatio - WavLM L1 | 98.42% | > 500 |
| AlphaRatio - SAE Latent | 98.98% | 1000 |
| Loudness - WavLM L1 | 96.96% | 500 |
| Loudness - SAE Latent | 97.07% | 500 |

## Limitations

The study is restricted to WavLM-Base+ and a relatively small 10-hour English subset combining RAVDESS, CREMA-D, and TIMIT, limiting generalization to larger speech models (e.g., Large/XL variants) and multilingual or noisy settings. The evaluation focuses exclusively on low-level continuous GeMAPS acoustic descriptors extracted from early layers, leaving higher-level semantic, linguistic, and speaker characteristics unexamined via subspace erasure. Additionally, INLP is limited to linear subspace removal, meaning potential non-linear distributed redundancy remains unmeasured.

## Why read this

Speech ML researchers and interpretability engineers studying self-supervised models should read this to understand why applying text-domain Sparse Autoencoders out-of-the-box fails to cleanly isolate speech features due to distributed redundancy (the Hydra effect). It provides a methodological roadmap demonstrating that subspace-level interventions like INLP are necessary for causal manipulation of continuous acoustic representations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Targeted editing, debiasing, or disentangling of continuous acoustic attributes in speech generation, voice conversion, and speech representation learning pipelines.

## Institutions / 機構

University of Moratuwa

## Related

- (link related pages by id as the wiki grows)
