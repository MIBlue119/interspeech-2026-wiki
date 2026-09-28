---
id: kim26i_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1146
pdf: https://www.isca-archive.org/interspeech_2026/kim26i_interspeech.pdf
---

# Revisiting Label-Free Speaker Embedding Enhancement with vMF Profile Likelihood

[PDF](https://www.isca-archive.org/interspeech_2026/kim26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1146)

**TL;DR** — This paper proposes a von Mises-Fisher profile likelihood objective for label-free speaker embedding enhancement, achieving robust performance under acoustic mismatch without modifying frozen backbones.

## Problem

Acoustic mismatches such as noise, reverberation, and telephony degradation severely harm speaker verification performance when test conditions differ from training. While post-processing embedding enhancement avoids retraining high-capacity backbones, recent generative diffusion baselines rely on complex, highly structured formulations that can be unstable and difficult to train reliably.

## Method

The method frames enhancement as a direct matching problem on the unit hypersphere by modeling clean target embeddings with a von Mises-Fisher (vMF) density. By profiling out a sample-wise concentration parameter using maximum likelihood estimation, it yields a simple closed-form logarithmic loss with adaptive weighting. The enhancement network uses a restricted-capacity architecture of 3 residual MLP blocks with hidden width 2p, LayerNorm, and SiLU activations. Training is performed on a heterogeneous pool combining VoxCeleb2, LibriTTS-R, and Libri-Light using overlapping augmentations including MUSAN noise, simulated room impulse responses, and telephony effects.

## Results

Evaluated across VoxCeleb1 (Vox1-O, Vox1-E, Vox1-H), VoxSRC23, CN-Celeb, VOiCES, and VC-Mix using ECAPA-TDNN and ResNet-34 backbones, the proposed method matches or improves the frozen baseline in 13 of 14 backbone/dataset entries. It demonstrates superior stability under a broad single-view training recipe compared to a diffusion-based baseline (SEED). Metrics reported include Equal Error Rate (EER) and minimum Detection Cost Function (minDCF).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers looking to improve speaker verification robustness against acoustic mismatches in deployment environments without retraining large backbone extractors.

## Limitations

Evaluated primarily on verification tasks under specific acoustic corruption types defined by the training augmentation recipe.

## Related

- (link related pages by id as the wiki grows)
