---
id: kumar26b_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-670
---

# ML-KD-DRI-GAN: Teacher-Guided Denoising and Triplet-Adversarial Training for Robust Spoken Language Understanding

**TL;DR** — A teacher-guided adversarial denoising GAN maps noisy, ASR-error-corrupted semantic embeddings back onto a clean manifold, improving robust SLU on SLURP by up to 6.46% under severe ASR noise.

## Problem

ASR errors substantially degrade Spoken Language Understanding (SLU) by distorting the semantic representations downstream models rely on, and existing robustness approaches don't fully exploit teacher-student knowledge transfer for this denoising problem.

## Method

ML-KD-DRI-GAN trains a teacher model on clean transcripts, then trains a student model via multi-level latent alignment at the generator to denoise noisy embeddings, plus Bi-discriminator-cooperated distillation (Bi-DCD) at the discriminator to transfer the teacher's discriminative knowledge; a synthetic generator also produces hard negatives to enforce triplet separation between clean, denoised, and synthetic samples.

## Results

On noisy SLU benchmarks, ML-KD-DRI-GAN shows consistent gains over GAN-BERT baselines, and on the SLURP dataset achieves absolute improvements of 4.49% and 6.46% under moderate and severe ASR noise respectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Making voice assistants and spoken-language-understanding pipelines more robust to ASR transcription errors, particularly in noisy real-world audio conditions.

## Related

- (link related pages by id as the wiki grows)
