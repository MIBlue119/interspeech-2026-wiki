---
id: sadok26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-733
pdf: https://www.isca-archive.org/interspeech_2026/sadok26_interspeech.pdf
---

# InsideSSL: Understanding Self-Supervised Speech Representations using a Model-Centric Perspective

[PDF](https://www.isca-archive.org/interspeech_2026/sadok26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sadok26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-733)

**TL;DR** — The paper introduces INSIDE SSL, a model-centric, task-agnostic evaluation framework that tracks entropy, curvature, robustness, and cross-layer generative compatibility across self-supervised speech representations.

## Problem

While self-supervised learning (SSL) speech models like Wav2Vec2, HuBERT, and WavLM are ubiquitous, their internal layer-wise dynamics and representation geometry remain poorly understood through task-agnostic lenses. Without a systematic model-centric understanding of how information is compressed and organized across layers, designing more interpretable and task-aligned architectures relies on trial and error.

## Method

The framework analyzes representations via three per-layer perspectives: matrix-based von Neumann entropy for compression, token trajectory curvature for geometry, and InfoNCE mutual information bounds for input perturbation robustness. Additionally, it introduces the Generative Compatibility Matrix (GCM), using decoders trained on one layer and evaluated on another to measure cross-layer functional transferability. The paper evaluates several BASE, PLUS, and LARGE model variants (Wav2Vec2, HuBERT, WavLM, UniSpeech, and Data2Vec-Audio) using LibriSpeech test-clean and train-clean-100 subsets.

## Results

Experiments reveal distinct optimization regimes, such as late-stage entropy collapse in Wav2Vec2 compared to the geometric stability of WavLM. Task-specific linear probes show that phoneme classification correlates negatively with entropy (avg -0.46) and curvature (-0.57), benefiting from deep-layer compression and linearization. Conversely, paralinguistic tasks like pitch regression and speaker classification correlate positively with entropy (0.77 and 0.84) and curvature (0.82 and 0.74), depending heavily on early high-entropy states.

## Code

- https://insideSSL.github.io/

## Applications

Speech engineers and researchers designing, pruning, or distilling self-supervised speech recognition, speaker verification, and paralinguistic models.

## Limitations

The framework provides an empirical foundation without yet establishing formal causal links to isolate the exact mechanisms driving phenomena like extreme deep-layer compression.

## Related

- (link related pages by id as the wiki grows)
