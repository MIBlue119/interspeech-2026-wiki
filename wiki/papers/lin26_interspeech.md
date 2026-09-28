---
id: lin26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-147
pdf: https://www.isca-archive.org/interspeech_2026/lin26_interspeech.pdf
---

# Progressive Learnable Counterfactual Attention for Music Classification

[PDF](https://www.isca-archive.org/interspeech_2026/lin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-147)

**TL;DR** — The paper introduces Progressive Learnable Counterfactual Attention (P-LCA), a multi-stage framework that refines attention via stage-wise representation projections to eliminate residual biases in music classification, improving song-level F1 score on Artist20 to 0.94.

## Problem

Standard attention mechanisms in deep learning models are typically trained under weak supervision using only final classification losses, making them vulnerable to spurious correlations and dataset-specific biases. While single-stage Learnable Counterfactual Attention (LCA) mitigates this by introducing a learnable counterfactual branch, it operates within a single representation space, leaving complex residual biases entangled with the main attention.

## Method

The proposed P-LCA framework extends single-stage LCA into a K-stage sequential architecture using genreMERT and Short-chunk ResNet backbones. After each counterfactual training stage, the main-branch attention-conditioned features are reprojected into a new latent space via a shared projection module, allowing subsequent stages to examine biases from transformed perspectives. Fixed sinusoidal stage embeddings are injected as contextual conditioning to provide stage awareness without adding extra stage-specific attention parameters. The overall training objective aggregates specialized losses across all K stages, including classification, counterfactual effect, entropy, and discrepancy losses.

## Results

Evaluated on Artist20 for singer identification, GTZAN for musical genre classification, and EMOPIA for musical emotion recognition. On the Artist20 dataset, P-LCA achieves an average song-level F1 score of 0.91 and a best song-level F1 score of 0.94 with K=3 refinement stages, outperforming single-stage baselines. Ablation studies on refinement depth K demonstrate that performance peaks around K=3 or K=4 stages before plateauing. Attention visualizations confirm that P-LCA successfully focuses the main branch on stable, task-relevant regions while suppressing bias cues.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio and machine learning engineers building robust music information retrieval systems, including artist identification, genre classification, and musical emotion recognition models.

## Limitations

The text does not explicitly state computational overhead limits or specific operational failure modes.

## Related

- (link related pages by id as the wiki grows)
