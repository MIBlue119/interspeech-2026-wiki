---
id: narasinghe26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3316
pdf: https://www.isca-archive.org/interspeech_2026/narasinghe26_interspeech.pdf
---

# Causal Redundancy in Speech Representations: The Hydra Effect and Limits of Sparse Disentanglement in WavLM

[PDF](https://www.isca-archive.org/interspeech_2026/narasinghe26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/narasinghe26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3316)

**TL;DR** — The paper investigates the internal encoding of low-level acoustic properties in WavLM, revealing that discrete neuron-level ablation fails due to a 'Hydra effect', whereas Iterative Null-space Projection successfully achieves selective feature suppression at the subspace level.

## Problem

Self-supervised speech models build rich hierarchical representations, but their internal mechanics and how they encode low-level acoustic properties remain opaque. While Sparse Autoencoders (SAEs) successfully find monosemantic latents in LLMs, applying them to continuous, highly redundant speech domains leads to extreme polysemanticity where individual neurons are heavily entangled across multiple features simultaneously.

## Method

The authors analyze WavLM-Base+ (a 94M-parameter transformer with 12 layers and 768-dimensional hidden states) using linear probes, SHAP-based neuron ranking, and JumpReLU Sparse Autoencoders with an expansion factor of ~10.67 (mapping 768 dimensions to 8,192 latents). They train the SAEs on 1M voice frames using an L0 sparsity penalty with learned per-feature thresholds. To test causal relationships, they perform discrete latent ablation (zeroing out top critical latents) and apply Iterative Null-space Projection (INLP) to erase entire linear subspaces corresponding to acoustic features.

## Results

Evaluated on a multi-corpus dataset combining RAVDESS, CREMA-D, and TIMIT (~6,000 utterances, 10 hours), layer-wise probing shows low-level acoustic features like pitch and energy heavily peak at Layer 1. The trained JumpReLU SAE achieves an MSE of 0.0069 and an R2 of 0.860 with a mean active latent sparsity (L0) of 97.8 out of 8,192. Iterative latent ablation demonstrates a 'Hydra effect' where probe R2 retention remains near baseline levels (e.g., 98.31% to 98.85% for pitch) even after removing the top 50 critical latents, proving that continuous acoustic features occupy distributed subspaces rather than isolated neurons.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on mechanistic interpretability, representation editing, and controllable modification of self-supervised speech models.

## Limitations

The study focuses primarily on low-level acoustic descriptors from GeMAPS (such as pitch, spectral, and prosodic features) on WavLM-Base+, leaving higher-level semantic traits and other model architectures for future work.

## Related

- (link related pages by id as the wiki grows)
