---
id: zhu26d_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3245
pdf: https://www.isca-archive.org/interspeech_2026/zhu26d_interspeech.pdf
---

# DASM: Detecting AI-Synthetic Music via Authentic Manifold Deviation Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/zhu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3245)

**TL;DR** — The paper introduces DASM, a framework that detects AI-generated music by measuring deviations from a learned authentic audio manifold, achieving an Equal Error Rate of 0.13% on the SONICS dataset.

## Problem

Current music deepfake detectors rely on discriminative training paradigms that fit decision boundaries to specific known fake distributions. As generative algorithms continuously evolve, these models suffer from structural vulnerability and blind spots when encountering unseen forgeries. Reframing detection around the intrinsic properties of authentic audio rather than generator-specific artifacts addresses this limitation.

## Method

The framework utilizes a two-phase training strategy built on top of a frozen MERT-330M encoder adapted via 10 learnable prompt tokens per layer (adding 10,240 parameters). Phase 1 trains a learnable memory bank exclusively on real music using reconstruction loss and an orthogonality regularizer to encode compressed manifold priors via sparse multi-head cross-attention (N=2048, k=64). Phase 2 freezes the memory bank and trains a dual-branch classifier that concatenates original feature representations with their element-wise deviation from the reconstructed features. The Phase 2 objective jointly optimizes Cross-Entropy and A-Softmax losses.

## Results

Evaluated primarily on the SONICS dataset containing 97,164 songs, DASM achieves a 0.13% Equal Error Rate, 99.89% Accuracy, and 99.98% Area Under Curve, outperforming baselines like SingGraph and WPT-XLSR-AASIST. Under diverse acoustic degradations, DASM maintains an average accuracy drop of only 1.74% compared to 4.7% for the best baseline. On cross-dataset evaluation using FakeMusicCaps, DASM reaches 25.59% EER and 75.77% accuracy, surpassing baseline models. Ablation studies confirm that removing either the memory bank, the dual-branch setup, or prompt tuning degrades performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio forensic analysts, streaming platforms, and copyright protection agencies can use this framework to identify counterfeit or AI-generated music tracks.

## Limitations

Cross-domain evaluation exhibits a performance drop with an absolute EER of 25.59% on FakeMusicCaps, indicating that cross-domain acoustic distribution shifts remain a challenge.

## Related

- (link related pages by id as the wiki grows)
