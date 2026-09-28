---
id: wazed26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-883
pdf: https://www.isca-archive.org/interspeech_2026/wazed26_interspeech.pdf
---

# CLEAR: Clinical LLM Embedding and Attention-based Reconstruction

[PDF](https://www.isca-archive.org/interspeech_2026/wazed26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wazed26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-883)

**TL;DR** — CLEAR uses a pretrained Whisper encoder, a masked Graph Attention Network, and a latent GAN to reconstruct clean heart sounds from noisy auscultation recordings, achieving a peak PESQ of 4.64 and SI-SDR of 64.35 dB under 10 dB SNR environmental noise.

## Problem

Heart sound analysis is critical for early cardiovascular diagnosis, but background hospital noise and patient respiration frequently mask subtle pathological murmurs like S1 and S2. Traditional signal processing and local CNN-based audio separation models fail in non-stationary acoustic environments because they lack long-range semantic context and fail to capture broader cardiac cycle dependencies.

## Method

The framework operates in three sequential modules: a pretrained Whisper encoder extracts global semantic acoustic embeddings with global self-attention paths; a Masked Graph Attention Network (GAT) models these embeddings as graph nodes to predict bounded masks in the range [0, 1] for noise disentanglement; and a Latent Generative Adversarial Network (GAN) heals the masked representations in a low-dimensional latent space using adversarial and cosine similarity semantic losses. An acoustic decoder maps the restored embeddings back to the time domain. The model avoids high-dimensional waveform manifold collapse by conducting adversarial training entirely within the compact embedding space.

## Results

Evaluated on the BUET Multi-Disease Heart Sound Dataset mixed with hospital ambient noise at 10 dB SNR. Under peak individual sample evaluation, the enhanced output reached a PESQ of 4.6433 and SI-SDR of 64.35.66 dB (up from 1.0304 PESQ and -29.3715 dB SI-SDR in the noisy input). Across average-case dataset evaluations, the full Whisper + GAT + GAN model achieved an average PESQ of 2.9958, LSD of 1.7898, CBAK of 2.6713, and COVL of 3.3865, outperforming ablations that substituted CNN encoders, CNN separation modules, or Diffusion reconstruction models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and healthcare developers building smart stethoscopes, telemedicine diagnostic platforms, and computer-aided cardiovascular disease classification systems.

## Related

- (link related pages by id as the wiki grows)
