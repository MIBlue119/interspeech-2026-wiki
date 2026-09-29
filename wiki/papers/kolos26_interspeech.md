---
id: kolos26_interspeech
category: deepfake-security
labels: [generative-model]
institutions: ["University of Stuttgart"]
code: https://github.com/katja-kolos/synthetic-speaker-vectors
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1464
pdf: https://www.isca-archive.org/interspeech_2026/kolos26_interspeech.pdf
---

# Controlled Generation of Synthetic Speaker Vectors for Voice Anonymization

*Ekaterina Kolos, Sarina Meyer, Ngoc Thang Vu*

[PDF](https://www.isca-archive.org/interspeech_2026/kolos26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kolos26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1464)

**Category:** `deepfake-security` · **Labels:** `generative-model`

**TL;DR** — This paper extends voice anonymization frameworks by introducing attribute-controlled generative models (conditional WGAN-QC and diffusion with classifier guidance) to synthesize pseudo-speaker vectors while maintaining privacy and utility. Evaluated on the Voice Privacy Challenge 2024 suite, the conditional WGAN-QC achieves 100% attribute control accuracy for gender while preserving competitive downstream EER and WER.

## Key contributions

- Replaces standard unconditional Wasserstein GANs with denoising diffusion models for speaker vector generation in voice anonymization.
- Enables fine-grained attribute-controlled speaker vector generation via conditional WGAN-QC (cWGAN-QC) using class-wise optimal transport.
- Introduces diffusion-based attribute conditioning via classifier guidance using a noise-robust time-dependent MLP gender classifier.
- Proposes intermediate proxy evaluation metrics for synthetic embedding pools (Wasserstein-2 distance, diversity via pairwise cosine distance, and copying similarity) to optimize voice pipelines prior to full TTS integration.

## Problem

Voice anonymization systems based on speech resynthesis substitute original speaker identities with artificial vectors to conceal identity while preserving linguistic content and prosody. However, unconditional generative models like WGANs or basic diffusion provide zero control over demographic attributes such as gender, age, or accent. While prior latent space exploration approaches permit vector manipulation, they focus on altering rather than preserving specific attributes, forcing reliance on inefficient trial-and-error random sampling pools to match source attributes.

## Method

The pipeline extracts global style token (GST) speaker embeddings (128-dimensional weighted averages), content, and prosody from source audio. For unconditional WGAN-QC, the model uses ResNet architectures (size 8, max 16 filters) trained with Adam (lr=1e-5, batch size 128) for 2,000 cycles, approximating optimal transport via linear programming. cWGAN-QC injects class-wise label conditioning and runs for 200 cycles (10 epochs/cycle) with lr=1e-6 and batch size 64. The unconditional diffusion model employs a timestep-conditioned residual MLP with 4 ResNet blocks, utilizing a DDIM scheduler with 2,000 training and 1,500 sampling timesteps, trained for 200 epochs (lr=1e-5, batch size 16).

For conditional diffusion, a noise-robust 2-layer MLP classifier predicts gender from noisy embeddings at timestep t via cross-entropy loss. During inference, classifier gradients scale the predicted noise via guidance scale s (0.22 for males, 0.72 for females) to steer generation toward the target gender. Synthetic vectors replace original speaker embeddings while preserving original ASR-derived content and prosody features, feeding into FastPitch, FastSpeech2, and the Avocodo vocoder.

## Experimental setup

Generative models are trained on a diverse pool combining LibriTTS train-clean-100 and train-clean-360 (1,151 speakers, 149,736 utterances), alongside the English Emotional Speech Dataset (ESD, 10 speakers) and RAVDESS (24 speakers). Voice privacy downstream evaluation uses the Voice Privacy Challenge 2024 suite comprising LibriSpeech (for EER/WER) and IEMOCAP (for UAR). Baselines include the VPC 2024 B3 WGAN-QC baseline and unconditional variants.

## Results

The unconditional diffusion model achieves a downstream EER of 27.96% (female) and 26.01% (male) on LibriSpeech, with an overall WER of 35.95%, matching the unconditioned WGAN-QC baseline EER (~27.74% f / ~25.85% m) and WER (36.15%). Conditional setups successfully enforce control: cWGAN-QC attains 99.86% female and 100.00% male gender classification accuracy on synthesized outputs, while Diffusion with Classifier Guidance achieves 99.59% (female) and 90.68% (male) accuracy.

In intermediate pool evaluations, diffusion models demonstrate superior originality (lower copying similarity to natural training data) compared to WGAN-QC models, though WGAN-QC achieves lower Wasserstein-2 distances and better downstream word accuracy on the phonetically difficult Harvard sentences.

| System | Conditional | EER (f) [%] | EER (m) [%] | Total WER [%] | Gender Acc. (f/m) [%] |
|---|---|---|---|---|---|
| WGAN-QC (B3 baseline) | No | 27.92 | 26.72 | 37.57 | 50.95 / 36.35 |
| WGAN-QC | No | 27.74 | 25.85 | 36.15 | 45.36 / 53.02 |
| Diffusion | No | 27.96 | 26.01 | 35.95 | 67.30 / 38.71 |
| cWGAN-QC | Yes | 28.29 | 26.10 | 38.28 | 99.86 / 100.00 |
| Diffusion + CG | Yes | 30.11 | 25.17 | 37.28 | 99.59 / 90.68 |

## Limitations

Evaluation is strictly restricted to binary gender attribute control using metadata labels, ignoring finer-grained multidimensional paralinguistic controls like age, accent, or emotional tone. The approach relies on pre-extracted GST speaker embeddings and is coupled to a specific resynthesis cascade (FastPitch/FastSpeech2/Avocodo), meaning transferability to modern end-to-end neural codec anonymizers remains untested.

## Why read this

Researchers and engineers building voice anonymization pipelines or controllable speech generation systems should read this paper to understand how to practically integrate attribute conditioning into GAN and diffusion-based speaker vector generators, complete with concrete intermediate evaluation metrics for pool optimization.

## Code

- https://github.com/katja-kolos/synthetic-speaker-vectors

## Applications

Privacy-preserving speech technologies, whistle-blowing tools, medical data anonymization, and secure multi-speaker text-to-speech synthesis.

## Institutions / 機構

University of Stuttgart

**Funding / 經費:** Deutsche Forschungsgemeinschaft

## Related

- (link related pages by id as the wiki grows)
