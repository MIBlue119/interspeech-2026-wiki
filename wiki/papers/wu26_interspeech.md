---
id: wu26_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-537
pdf: https://www.isca-archive.org/interspeech_2026/wu26_interspeech.pdf
---

# LISE : Listenable Interpretable Speaker Embeddings

[PDF](https://www.isca-archive.org/interspeech_2026/wu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-537)

**TL;DR** — The paper introduces LISE, a label-free unsupervised framework that decomposes pretrained speaker embeddings into a compact set of orthogonal and non-negative components, achieving 83.9% human listener discrimination accuracy while preserving verification performance.

## Problem

Current automatic speaker verification (ASV) systems use opaque high-dimensional embeddings lacking structured, perceptually verifiable explanations of vocal characteristics. Existing interpretability methods either depend on costly and privacy-risking attribute labels that degrade verification performance or use high-dimensional sparse binary representations whose components do not reliably correspond to differences humans can actually perceive.

## Method

The framework takes frozen utterance-level embeddings from pretrained models (512-dim x-vector and 192-dim ECAPA-TDNN) and performs post-hoc unsupervised reconstruction on the VoxCeleb2 training set containing 5,994 speakers. It decomposes speaker representation vector e into K orthogonal, non-negative components via non-negative least squares optimization augmented with an orthogonality regularization term (lambda = 0.05). The design enforces low dimensionality (choosing K = 35 after sweeping 5 to 50), non-negative continuous weights to represent graded perceptual differences, and component independence through orthogonality.

## Results

Evaluated on VoxCeleb1-O, LISE with K=35 achieves an Equal Error Rate of 3.08% for x-vector (compared to 2.30% original) and 2.10% for ECAPA-TDNN (compared to 1.80% original), outperforming unsupervised PCA (3.02% and 3.28%) and binary autoencoder baselines while avoiding the severe degradation of supervised attribute models like Luu et al. (6.70%). In a human listening evaluation with 25 participants across 35 components, LISE achieved an overall discrimination accuracy of 83.9%, substantially outperforming PCA (59.1%) and the binary autoencoder baseline (49.0%). Training on reduced data (75% or 50% of utterances) showed minimal EER degradation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers can use this framework for model bias diagnosis, auditable speaker analysis, and controllable voice synthesis.

## Related

- (link related pages by id as the wiki grows)
