---
id: klement26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2511
pdf: https://www.isca-archive.org/interspeech_2026/klement26_interspeech.pdf
---

# Analysing Adversarial Priors for Data-driven Unsupervised Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/klement26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/klement26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2511)

**TL;DR** — This paper presents a dual-branch unsupervised GAN-based speech enhancement framework that models both speech and noise to prevent source leakage, achieving superior PESQ and COVL scores.

## Problem

Unsupervised generative adversarial network (GAN) speech enhancement methods often rely on single-branch designs that estimate clean speech directly from noisy inputs without modeling the noise component. Consequently, when reconstruction consistency constraints dominate over the clean speech prior, environmental noise leaks into the clean speech estimate. This vulnerability highlights the need for explicit noise modeling strategies that can leverage environment-specific recordings.

## Method

The authors propose a dual-branch generative architecture built on top of the Descript Audio Codec (DAC), utilizing an encoder-decoder framework with initial weights initialized from pre-trained DAC. The noisy input is processed by a convolutional encoder, mapped to a latent representation, and split into two parallel transformer branches featuring rotary positional embeddings (RoFormer) to model noise and clean speech separately. A shared decoder maps these latents back to the time domain, and the signals are recombined using a closed-form amplitude scaling solution. Training uses adversarial least-squares GAN losses via three discriminator ensembles (for clean speech, noise, and noisy speech), multi-scale mel-spectrogram consistency losses, SI-SDR loss, feature matching loss, and an energy maximization loss to prevent mode collapse.

## Results

Evaluated on the VCTK+Demand benchmark, the model is compared against prior unsupervised baselines including MetricGAN-U, MOS-GAN, unSE, and unSE+. Using in-domain clean speech and noise priors, the proposed dual-branch model achieves a PESQ score of 2.98 and a COVL score of 3.49, outperforming single-branch variants and prior GAN-based architectures in perceptual speech quality. Ablations demonstrate that mismatched priors increase source leakage, whereas aligned noise priors successfully mitigate speech-noise leakage and improve overall enhancement performance.

## Code

- https://github.com/BUTSpeechFIT/USE

## Applications

Speech and machine learning engineers working on real-time speech enhancement, communication systems, or assistive listening devices who need unsupervised domain adaptation.

## Limitations

The dual-branch model yields lower CBAK scores compared to some baselines, indicating that background artifacts can occasionally appear in the estimated speech.

## Related

- (link related pages by id as the wiki grows)
