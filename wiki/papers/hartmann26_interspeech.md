---
id: hartmann26_interspeech
category: health-clinical
labels: [efficient-on-device, generative-model]
institutions: ["Ruhr University Bochum", "McMaster University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1872
pdf: https://www.isca-archive.org/interspeech_2026/hartmann26_interspeech.pdf
---

# Towards a Stochastic DNN Approximation of Cochlear Implant Auditory Models

*Theresa Hartmann, Ian C. Bruce, Benjamin Lentz, Rainer Martin, Anil Nagathil*

[PDF](https://www.isca-archive.org/interspeech_2026/hartmann26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hartmann26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1872)

**Category:** `health-clinical` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — This paper introduces a hierarchical VQ-VAE-2 network that approximates computationally heavy cochlear implant auditory models while capturing stochastic neural response variability via differentiable Gamma distribution sampling, achieving a speedup of several orders of magnitude over MATLAB-based solvers.

## Key contributions

- Proposes the first deep neural network architecture to approximate stochastic cochlear implant auditory nerve neurograms, moving beyond deterministic mean-rate models.
- Utilizes a hierarchical VQ-VAE-2 framework mapping Greenwood-spaced spectrograms to the shape (k) and scale (theta) parameters of a continuous Gamma distribution for differentiable stochastic sampling.
- Employs a composite loss combining negative log-likelihood of the Gamma distribution and an exponentiated MSE loss with a 0.3 factor to balance high-energy and low-energy components.
- Demonstrates massive inference acceleration, running in 4.6 ms on an RTX 4070 GPU compared to nearly 69 seconds for the reference MATLAB-based auditory model.

## Problem

Auditory models simulate how cochlear implant (CI) electrical pulse trains translate into neural responses across auditory nerve fibers, but their extreme computational complexity makes them impractical for large-scale simulations or real-time applications. Existing deep learning approximations exclusively target deterministic normal-hearing or hearing-impaired models, reducing neural responses to their temporal averages. This deterministic reduction ignores vital stochastic characteristics like response variability and probabilistic spike generation, which are critical for studying temporal coding, neural synchrony, and realistic CI perception.

## Method

The architecture is built on a VQ-VAE-2 containing 2,366,157 trainable parameters, operating on Greenwood spectrograms derived from STFT power spectra using 16 Greenwood-spaced triangular filter bands (330 Hz to 6.6 kHz) and decibel scaling. The network employs a two-stage hierarchical structure where a bottom encoder (five 2D conv layers plus residual stack) captures fine structures and a top encoder (two 2D conv layers plus residual stack) captures coarse structures, with vector quantization layers utilizing 512-entry codebooks at each level. Decoders integrate transposed convolutions and skip-connections to reconstruct spatial dimensions before outputting the shape (k) and scale (theta) parameters of a continuous Gamma distribution for each time-frequency bin. Because Poisson spike generation is discrete and non-differentiable, the continuous Gamma distribution serves as a differentiable approximation for stable backpropagation. Training is governed by a loss function summing the negative log-likelihood of the Gamma distribution and an exponentiated MSE term (with exponent 0.3 to suppress dominance from high-energy bins), plus a commitment loss with beta = 0.2.

## Experimental setup

The training and validation sets comprise 9000 audio segments (50% music from FMA, 50% speech from LibriVox mixed with UrbanSound and DEMAND noise at -15 to 30 dB SNR), split into 7200 training and 1800 validation samples. A separate test set of 100 audio segments uses TIMIT, VCTK, Sound Ideas, and MedleyDB v2. Audio files are 1 s long at 24 kHz. The reference neurograms are generated via the GMT auditory modeling toolbox (SpecRes strategy, 16 electrodes, 40 characteristic frequencies from 250 Hz to 16 kHz, 50 nerve fibers per CF). Models are trained in PyTorch using the Adam optimizer with a learning rate of 5e-5 and early stopping over a maximum of 100 epochs. Evaluation metrics include Jensen-Shannon divergence (JSD) for distributional similarity and Neurogram Similarity Index Measure (NSIM) for structural consistency across 100 stochastic realizations.

## Results

The DNN successfully reconstructs the global spectro-temporal structure and spontaneous fiber firing during silent intervals, yielding average NSIM scores of 0.91 for music, 0.91 for clean speech, and 0.90 for noisy speech when comparing 10-realization averages against the reference model. However, performance degrades in the 6 kHz to 7 kHz region due to low spectral energy and indirect spread-of-excitation activation that falls outside the explicit 6.6 kHz input filterbank limit. Furthermore, independent bin-wise sampling fails to model inter-bin spectrotemporal correlations, yielding noisier textures (DNN-DNN NSIM drops to 0.70-0.80).

| System / Condition | Music (Orig. vs DNN NSIM) | Clean Speech (Orig. vs DNN NSIM) | Noisy Speech (Orig. vs DNN NSIM) |
|---|---|---|---|
| Auditory Model (Orig. vs Orig.) | 0.90 | 0.94 | 0.91 |
| VQ-VAE-2 Approximation (Orig. vs DNN) | 0.91 | 0.91 | 0.90 |
| Model Consistency (DNN vs DNN) | 0.70 | 0.80 | 0.71 |

## Limitations

The model performs poorly at frequencies above 6.6 kHz because the input Greenwood spectrogram only extends up to this limit, leaving higher frequencies to be learned implicitly via spread-of-excitation. Independent sampling per time-frequency bin fails to capture fine-grained spectrotemporal correlations and coordinated firing across neighboring fibers. The data scale is limited to 9,000 short audio segments, and the evaluation relies on synthetic auditory model outputs rather than direct in-vivo neural data.

## Why read this

Speech and ML researchers focusing on cochlear implant simulation or neural response modeling will find this a blueprint for replacing slow numerical auditory models with differentiable neural networks. It demonstrates how to combine VQ-VAE hierarchies with continuous distribution parameterization to capture neural variability in real-time.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time cochlear implant fitting, perception-based speech and music enhancement algorithms for hearing devices, and large-scale auditory simulation studies.

## Institutions / 機構

Ruhr University Bochum, McMaster University

## Related

- (link related pages by id as the wiki grows)
