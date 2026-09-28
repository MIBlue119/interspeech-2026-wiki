---
id: makarov26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3448
pdf: https://www.isca-archive.org/interspeech_2026/makarov26_interspeech.pdf
---

# Repurposing a Speech Classifier for Guided Diffusion-Based Speech Generation

[PDF](https://www.isca-archive.org/interspeech_2026/makarov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/makarov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3448)

**TL;DR** — This paper repurposes a conventionally trained noise-conditioned speech classifier into a score-based diffusion generator by freezing its backbone and training a lightweight adapter subnetwork, achieving competitive generation quality with fewer trainable parameters and lower compute.

## Problem

Standard classifier guidance for diffusion generation requires maintaining two separate, heavily parametrized models (a diffusion model and a noise-conditioned classifier) and evaluating both at every reverse sampling step, resulting in high memory footprint and computational cost. While joint energy-based models attempt to find a generator inside a classifier, direct joint training is plagued by intractable normalizing constants and training instability. Overcoming this gap allows for compact, single-backbone conditional speech synthesis without the overhead of dual-model pipelines.

## Method

The authors keep a noise-conditioned U-Net speech classifier completely frozen in log-Mel space and attach a lightweight, decoder-style Score Subnet trained solely via Denoising Score Matching. The backbone provides intermediate multi-scale feature maps (forward taps) and gradient taps derived by backpropagating joint energy-based model marginal log-densities. These taps are RMS-normalized, projected to a shared channel dimension, and fused using cross-attention blocks in a coarse-to-fine decoder architecture. The model uses 80-bin log-Mel filterbanks converted to waveforms via a pretrained HiFi-GAN vocoder, and applies variance-preserving SDE sampling with 100 Euler-Maruyama steps.

## Results

Evaluated on the SC09 spoken digit benchmark, the proposed Score Subnet achieves unconditional and classifier-guided generation competitive with or superior to full U-Net baselines and open-source models like DiffWave, SaShiMi, and EDMSound. Using only 4.4M trainable parameters (12.3M total) compared to a full U-Net's 16.6M parameters, the Score Subnet achieves a ScoreQ MOS of 3.26 and FAD of 1.02 under classifier guidance (gamma = 3.0). Furthermore, the approach consistently outperforms standard classifier-guided U-Nets in low-data and zero-shot guidance regimes.

## Code

- https://sp-uhh.github.io/classifier-to-diffusion/

## Applications

Speech and machine learning engineers developing resource-constrained or on-device speech generation systems who need class-conditional synthesis without maintaining separate diffusion and classification backbones.

## Limitations

The evaluation is restricted to the limited-vocabulary SC09 spoken digit dataset.

## Related

- (link related pages by id as the wiki grows)
