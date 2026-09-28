---
id: turavecino26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-803
pdf: https://www.isca-archive.org/interspeech_2026/turavecino26_interspeech.pdf
---

# Learnable Classifier-Free Guidance Null Embeddings for Enhanced Controllable Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/turavecino26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/turavecino26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-803)

**TL;DR** — Replacing fixed zero vectors with learnable null embeddings in classifier-free guidance for text-to-speech improves speaker similarity, stability, and robustness to larger guidance scales.

## Problem

Standard text-to-speech models using classifier-free guidance rely on a fixed zero vector for unconditional states, which fails to distinguish between orthogonal conditioning signals like speaker identity and text content. Furthermore, predefined static vectors often lie outside the model's training distribution, creating numerical instabilities and performance degradation at higher guidance scales. Addressing this is crucial for scaling controllable, high-fidelity generative speech synthesis.

## Method

The architecture comprises a 0.6B Qwen3-based autoregressive GPT backbone paired with a lightweight MLP diffusion head and a causal transformer VAE operating at 48 kHz. Instead of a single static zero vector, the system introduces distinct learnable null embeddings for speaker and text conditioning modalities, initialized from a normal distribution and jointly optimized during training via condition dropout set to 0.1. At inference, classifier-free guidance is extended to decouple speaker and text conditioning scales independently using modality-specific unconditional hidden states. This design permits independent tuning of guidance weights (e.g., setting speaker guidance to 1.2 and text guidance to 0.4) to govern expression and similarity.

## Results

Evaluated on 130 generated samples from 65 unseen expressive speakers, the learnable null embedding configuration at w = 0.8 achieved a speaker embedding cosine similarity (SECS) of 0.817 and prosody embedding similarity (PRO) of 0.841, outperforming the fixed zero-embedding baseline (0.755 SECS, 0.814 PRO). When using decoupled and tuned weights (ws = 1.2, wt = 0.4), SECS further increased to 0.841 while maintaining a competitive character error rate of 1.2%. In pairwise CMOS evaluations across 90 annotators, learnable null variants achieved positive preference scores for naturalness and similarity, whereas the fixed zero embedding scored negative across both.

## Code

- https://airtimemedia.github.io/IS2026-LearnableCFG/

## Applications

Speech/ML engineers building controllable, high-end text-to-speech and voice cloning pipelines requiring precise attribute manipulation and robustness to high classifier-free guidance scales.

## Limitations

Tuned decoupled guidance weights trade off absolute perceptual quality and naturalness scores in favor of enhanced speaker similarity and prosodic expressiveness.

## Related

- (link related pages by id as the wiki grows)
