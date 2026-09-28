---
id: hartmann26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1872
pdf: https://www.isca-archive.org/interspeech_2026/hartmann26_interspeech.pdf
---

# Towards a Stochastic DNN Approximation of Cochlear Implant Auditory Models

[PDF](https://www.isca-archive.org/interspeech_2026/hartmann26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hartmann26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1872)

**TL;DR** — This paper presents a stochastic deep neural network approximation of a cochlear implant auditory model using a hierarchical VQ-VAE-2 to efficiently generate probabilistic mean-rate neurograms.

## Problem

Conventional auditory models used to simulate cochlear implant electrical stimulation have extremely high computational complexity, preventing their use in large-scale simulations or time-critical applications. Furthermore, existing deep learning approximations are purely deterministic, ignoring crucial stochastic behaviors like response variability and probabilistic spike generation that govern auditory coding. Omitting these stochastic properties limits the accuracy of predicting neural performance and studying temporal coding under electrical stimulation.

## Method

The authors propose a hierarchical vector-quantized variational autoencoder (VQ-VAE-2) containing 2.37 million parameters to map Greenwood-spaced spectrograms to the parameters of a Gamma distribution. The architecture employs two-stage top and bottom encoders and decoders utilizing 2D convolutions, residual stacks, and vector quantization codebooks with 512 entries per level. A continuous Gamma distribution is adopted instead of a discrete Poisson distribution to make spike generation fully differentiable and stable for gradient-based training. The custom loss function combines the negative log-likelihood of the Gamma distribution, an exponentiated MSE term with a power of 0.3 to balance high-energy components, and a vector quantization commitment loss.

## Results

The model was trained on 9,000 audio segments split evenly between music and speech, with speech corrupted by environmental noise across -15 dB to 30 dB SNRs, and evaluated on a separate 100-segment test set comprising TIMIT, VCTK, and MedleyDB recordings. Objective evaluations using the Jensen-Shannon divergence and the neurogram similarity index measure demonstrate that the approximation effectively replicates global spectro-temporal structures and stochastic properties, particularly in low and mid frequencies. The generated outputs visually capture the main patterns of auditory nerve activity across time and frequency, though independent bin-wise sampling leads to visibly noisier realizations compared to the reference model.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and hearing researchers building real-time cochlear implant simulations, hearing-loss compensation algorithms, or advanced speech enhancement systems.

## Limitations

Stochastic samples are drawn independently for each time-frequency bin, which fails to capture fine temporal and spectral correlations between neighboring bins.

## Related

- (link related pages by id as the wiki grows)
