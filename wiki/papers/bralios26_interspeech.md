---
id: bralios26_interspeech
category: speech-coding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3031
pdf: https://www.isca-archive.org/interspeech_2026/bralios26_interspeech.pdf
---

# Elastic Time: Dynamic Frame Rate Bottlenecks for Neural Audio Coding

[PDF](https://www.isca-archive.org/interspeech_2026/bralios26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bralios26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3031)

**TL;DR** — Elastic Time is a dynamic frame-rate bottleneck module for neural audio autoencoders that skips predictable latent frames, improving compression and efficiency-quality tradeoffs while enabling deployment-time rate control.

## Problem

While neural audio autoencoders support variable bitrates, most operate at a fixed latent frame rate that wastes temporal budget on regions with low information density. This creates unnecessarily long latent sequences, bottlenecking downstream generative models and long-context tasks that scale with sequence length. Although some dynamic frame-rate methods exist, they often rely on external semantic foundation models or rigid two-stage training pipelines without flexible runtime rate allocation.

## Method

The method introduces a plug-in Re-Bottleneck framework using symmetric ConvNeXt-V2 encoder/decoder networks and a lightweight 0.5M-parameter autoregressive latent predictor based on 3 GRU layers and a SwiGLU FFN block. The predictor models short-term latent dynamics, estimating redundancy by measuring prediction accuracy over multi-step rollouts to determine which frames can be omitted. At inference, it uses either an efficient greedy algorithm or an exact dynamic programming procedure for optimal boundary selection given a user-specified kept fraction. The model is trained on a 4.8k-hour mix of audio and music data using a combined rollout prediction loss, valid prediction loss, reconstruction loss, adversarial objective, and feature matching loss while freezing the base Stable Audio Open VAE.

## Results

The paper compares Elastic Time against baselines including Conv-Downsample, CodecSlime, H-Net, and H-Net-YOTO using a frozen Stable Audio Open VAE base model operating on 44.1 kHz stereo audio. Experiments demonstrate that the proposed dynamic frame-rate approach achieves superior efficiency-quality tradeoffs across varying target kept lengths compared to static downsampling and alternative chunking techniques. The method successfully performs deployment-time rate control without sacrificing audio reconstruction fidelity.

## Code

- https://github.com/dbralios/elastic-time

## Applications

Speech and ML engineers working on neural audio compression, generative audio modeling, or latent diffusion frameworks can use this module to shorten latent sequence lengths and reduce compute overhead for long-context generation tasks.

## Limitations

The current scope focuses on the finite-segment, offline autoencoding setting where the full encoded segment must be available prior to temporal rate allocation.

## Related

- (link related pages by id as the wiki grows)
