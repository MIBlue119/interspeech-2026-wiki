---
id: lee26e_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-646
pdf: https://www.isca-archive.org/interspeech_2026/lee26e_interspeech.pdf
---

# RAF: Relativistic Adversarial Feedback For Universal Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/lee26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-646)

**TL;DR** — The paper introduces Relativistic Adversarial Feedback (RAF), a GAN vocoder training framework that utilizes speech self-supervised learning representations and relativistic pairing to improve in-domain fidelity and out-of-domain generalization.

## Problem

Standard GAN vocoder training objectives rely on absolute real/fake mapping using global decision boundaries, which limits their generalization to unseen speakers, styles, and acoustic conditions. While scaling up generators or shifting to diffusion/flow-matching improves robustness, it severely hurts inference speed and computational efficiency. RAF addresses this by enforcing non-separable, pairwise adversarial feedback guided by perceptual self-supervised representations to capture the true data distribution more completely.

## Method

RAF incorporates a quality gap and a discriminator gap into the adversarial objective. The quality gap calculates L2-normalized mean squared error over feature representations extracted from WavLM-large (last convolutional layer) and HuBERT-large (22nd layer), alongside a multi-resolution STFT magnitude and spectral convergence loss. The discriminator gap maps relative realness using a softplus transformation of the difference between discriminator outputs for real and fake samples, matching the multi-component quality gap dimensions. Training is stabilized using zero-centered gradient penalties (0-GP) on both real and fake audio alongside standard mel spectrogram and feature matching losses.

## Results

Evaluated across multiple representative GAN vocoders on seen and unseen datasets, RAF consistently improves both objective reconstruction and subjective perceptual metrics. Specifically, a BigVGAN-base trained with RAF outperforms the standard LSGAN-trained BigVGAN in perceptual quality while using only 12% of its total parameters. The framework demonstrates robust zero-shot generalization across diverse unseen acoustic domains and configurations.

## Code

- https://github.com/infected4098/Relativistic-Adversarial-Feedback

## Applications

Speech/ML engineers building neural vocoders for text-to-speech, voice conversion, and speech enhancement systems seeking higher audio fidelity and zero-shot generalization without sacrificing the inference speed of GANs.

## Limitations

The reliance on large speech self-supervised models for computing quality gaps increases the computational overhead during training.

## Related

- (link related pages by id as the wiki grows)
