---
id: jiang26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-128
pdf: https://www.isca-archive.org/interspeech_2026/jiang26_interspeech.pdf
---

# DiffRhythm 2: Efficient and High Fidelity Song Generation via Block Flow Matching

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-128)

**TL;DR** — DiffRhythm 2 introduces an end-to-end semi-autoregressive block flow matching framework for controllable song generation, producing full-length songs up to 210 seconds with precise lyric-vocal alignment and high fidelity.

## Problem

Existing non-autoregressive music models struggle with temporal lyric alignment over long sequences unless constrained by rigid timestamps or auxiliary losses that harm musicality. Meanwhile, standard preference optimization techniques rely on merging independently tuned models, leading to performance averaging and degraded upper bounds.

## Method

The architecture combines a 5 Hz music VAE (compressing 24 kHz/48 kHz audio with a 4800x/9600x ratio) with a Diffusion Transformer. It utilizes block flow matching, partitioning latent representations into fixed-length blocks processed non-autoregressively while maintaining autoregressive dependencies across blocks via customized causal attention masks and timestep conditioning. Training is stabilized using a stochastic block representation alignment (REPA) loss derived from MuQ features and a cross-pair preference optimization strategy that jointly aligns multi-dimensional preferences without model merging.

## Results

DiffRhythm 2 generates full-length songs up to 210 seconds and outperforms existing open-source baselines across comprehensive subjective and objective evaluations for song aesthetics, lyric alignment, and structural coherence.

## Code

- https://github.com/xiaomi-research/diffrhythm2

## Applications

Speech and ML engineers building creative generative AI systems, interactive music tools, or full-length song generation pipelines from text prompts and lyrics.

## Related

- (link related pages by id as the wiki grows)
