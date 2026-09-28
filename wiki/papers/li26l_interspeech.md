---
id: li26l_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-722
pdf: https://www.isca-archive.org/interspeech_2026/li26l_interspeech.pdf
---

# HFMSE: Harmonic-Guided Speech Enhancement with Flow Matching

[PDF](https://www.isca-archive.org/interspeech_2026/li26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-722)

**TL;DR** — HFMSE is a harmonic-guided flow matching framework for speech enhancement that achieves state-of-the-art performance on the DNS Challenge 2020 dataset by leveraging explicit pitch-harmonic structural priors.

## Problem

Generative speech enhancement methods rely heavily on conditioning information, but current strategies either use noisy shallow features that fail to capture harmonic structures or depend on pre-trained semantic models that suffer from circular dependency under severe noise. This lack of reliable structural guidance leads to artificial spectral components, compromising speech naturalness and intelligibility.

## Method

The framework integrates a lightweight harmonic encoder, a Diffusion Transformer (DiT) flow matching backbone, and a BigVGAN neural vocoder. The harmonic encoder utilizes a Mel-scale Pitch-Harmonic Conversion Matrix (MPCM) for soft fundamental frequency localization and harmonic mask estimation via an attention-like gating mechanism. These extracted harmonic priors act as persistent structural conditioning throughout the entire ODE trajectory, guiding the velocity field learning from noise to clean speech. The model uses 1024 feature channels, 22 DiT layers, 16 attention heads, and a 64-dimensional harmonic encoder, trained on a massive 2000-hour multi-corpus dataset.

## Results

Evaluated on the DNS Challenge 2020 dataset, HFMSE achieves top-tier performance with a DNSMOS OVRL score of 3.422 (without reverb) and strong speaker similarity (Spk Sim of 0.958), outperforming traditional regression, diffusion, and flow-matching baselines like FlowSE and SGMSE. Ablation studies confirm that removing the harmonic encoder causes a larger degradation than removing the noisy speech condition, underscoring the robustness and necessity of the explicit harmonic prior.

## Code

- https://github.com/xxnhq/HFSE

## Applications

Engineers and researchers building robust speech enhancement systems for hearing aids, telecommunications, broadcasting, or robust automatic speech recognition front-ends.

## Related

- (link related pages by id as the wiki grows)
