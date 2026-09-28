---
id: hartmann26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1872
---

# Towards a Stochastic DNN Approximation of Cochlear Implant Auditory Models

**TL;DR** — A hierarchical VQ-VAE learns to approximate the stochastic firing patterns of cochlear-implant auditory nerve models, capturing their random variability instead of just an average response.

## Problem

Existing computational models of electrically evoked auditory nerve responses in cochlear implants are deterministic, missing the inherent stochastic (random) characteristics of real neural responses.

## Method

The authors train a hierarchical vector-quantized variational autoencoder to map Greenwood-frequency-resolution spectrograms to the parameters of a Gamma distribution, from which probabilistic mean-rate neurograms are sampled, and evaluate the approximation using Jensen-Shannon divergence and a neurogram similarity index.

## Results

The model captures the global spectro-temporal structure and essential stochastic properties of the reference auditory model, especially at low and mid frequencies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Faster, more realistic simulation of cochlear implant auditory nerve responses for research on implant signal-processing algorithms.

## Related

- (link related pages by id as the wiki grows)
