---
id: hu26g_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2090
pdf: https://www.isca-archive.org/interspeech_2026/hu26g_interspeech.pdf
---

# Singing Voice Conversion via Shared Speaker Space and Min-Pooling Adversarially Enhanced Flow Matching

[PDF](https://www.isca-archive.org/interspeech_2026/hu26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2090)

**TL;DR** — MinFlow-SVC is a singing voice conversion framework utilizing a shared speaker space via KNN and min-pooling adversarially enhanced conditional flow matching, improving naturalness and zero-shot conversion quality over baseline models.

## Problem

Existing singing voice conversion models struggle with an inherent trade-off between content-timbre disentanglement and generation quality, where insufficient separation causes source timbre leakage and aggressive separation discards key phonetic details. Furthermore, KNN-based feature mapping eliminates timbre effectively but introduces frame-level splicing discontinuities, while standard generative models often blur high-frequency harmonics and produce metallic artifacts.

## Method

The framework couples a content encoder and a vector field estimator, both backed by specialized discriminators using min-pooling adversarial training. First, WavLM semantic features are mapped to a shared speaker-independent space using cosine similarity matching against a pool of shared speaker frames to remove source timbre. A min-pooling adversarial loss (LS-GAN based) detects and penalizes the least confident, most discontinuous segments in the feature space. Second, optimal-transport conditional flow matching (OT-CFM) maps standard Gaussian noise to target mel-spectrograms conditioned on content features, target timbre embeddings, and F0. Finally, a harmonic-aware min-pooling adversarial loss incorporating Dynamic Harmonic Masking (DHM) focuses the discriminator on f0 harmonics to preserve high-frequency spectral clarity.

## Results

Evaluated on the M4singer dataset for training and OpenSinger for zero-shot testing, compared against So-Vits-SVC, DiffSVC, and NeuCoSVC. Evaluated using NMOS (up to 3.83 for 10-step sampling), SMOS (2.65), F0-CORR (0.948), speaker embedding cosine similarity (SECS), and MOSNet. Results show superior naturalness and prosody correlation compared to baselines while maintaining competitive timbre similarity. Ablation studies confirm that removing the min-pooling loss, content encoder, or dynamic harmonic masking leads to noticeable degradation in spectrogram continuity, high-frequency harmonic structure, and overall NMOS/F0-CORR scores.

## Code

- https://linoteye.github.io/minflowsvc/

## Applications

Audio engineers and developers building high-quality singing voice conversion systems, virtual singers, and cross-lingual or cross-singer voice transformation applications.

## Limitations

Requires a pre-computed matching pool from a shared speaker and multi-step ODE solver sampling during inference.

## Related

- (link related pages by id as the wiki grows)
