---
id: niu26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-533
pdf: https://www.isca-archive.org/interspeech_2026/niu26_interspeech.pdf
---

# Semantic-VAE: Semantic-Alignment Latent Representation for Better Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/niu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/niu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-533)

**TL;DR** — Semantic-VAE introduces semantic alignment regularization to continuous latent variational autoencoders, resolving the reconstruction-generation trade-off in zero-shot text-to-speech to achieve a 2.10% WER on LibriSpeech-PC.

## Problem

Continuous representation zero-shot text-to-speech models using variational autoencoders suffer from an optimization dilemma between reconstruction fidelity and generation intelligibility. Lower-dimensional latents capture core semantics but degrade acoustic reconstruction and speaker similarity, whereas higher-dimensional latents retain acoustic details but complicate semantic modeling. This trade-off hinders non-autoregressive flow-matching and diffusion TTS performance.

## Method

The paper proposes Semantic-VAE, which builds on a DAC-style convolutional encoder and AMP block decoder operating at a 64-dimensional latent space and 40 Hz frame rate. The VAE is optimized with ELBO reconstruction loss, KL divergence, multi-scale STFT discriminators, and a novel semantic alignment regularization term. This regularization uses interpolation and 1D convolutions to match VAE latents with hidden states extracted from a frozen pre-trained self-supervised learning speech model via cosine similarity. Semantic-VAE is integrated as the continuous backend for F5-TTS and E2-TTS, replacing mel-spectrograms.

## Results

Evaluated on LibriSpeech-PC test-clean in a low-resource setting (6k hours of LibriTTS training data), F5-TTS with Semantic-VAE achieves 2.10% WER, 0.64 speaker similarity, and 4.17 UTMOS, outperforming the mel-based F5-TTS baseline (2.23% WER, 0.60 SIM) and the vanilla VAE variant (2.65% WER, 0.59 SIM). When scaled up using 100k hours from the Emilia dataset under a 400k update budget, Semantic-VAE improves LibriSpeech-PC, SeedTTS-en, and SeedTTS-zh metrics. Reconstruction tests on LibriTTS test-other show Semantic-VAE achieves a PESQ of 3.75 and STOI of 0.97, matching vanilla VAE while outperforming Vocos.

## Code

- https://zhikangniu.github.io/semantic-vae/

## Applications

Speech and ML engineers building zero-shot text-to-speech, voice conversion, or high-fidelity generative speech systems can use Semantic-VAE to replace mel-spectrograms or vanilla continuous latents for better intelligibility and faster convergence.

## Related

- (link related pages by id as the wiki grows)
