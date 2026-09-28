---
id: xiang26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1357
pdf: https://www.isca-archive.org/interspeech_2026/xiang26_interspeech.pdf
---

# Quantifying the Uncertainty of Blindly Estimated Room Embeddings Using a Dispersion-Calibrated Score

[PDF](https://www.isca-archive.org/interspeech_2026/xiang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xiang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1357)

**TL;DR** — This paper proposes a framework that learns task-agnostic room embeddings robust to speech-content variations alongside a dispersion-calibrated uncertainty score for reliable selective prediction.

## Problem

Room embeddings derived blindly from reverberant speech are often unreliable because non-room confounding factors such as speech content, noise, and recording dropouts alter the representation even when the physical room geometry remains unchanged. This lack of reliability degrades downstream acoustic estimation and verification tasks, creating a need for task-agnostic uncertainty scores that indicate when an embedding can be trusted.

## Method

The training pipeline comprises three stages: a Stage-1 variational autoencoder (VAE) trained on log-mel RIR spectrograms to yield a 64x4x16 latent space; a Stage-2 speech encoder (hybrid CNN-Transformer with 4096-dimensional output and attention pooling) using KL-based latent alignment combined with multi-positive contrastive learning over multi-view batches (16 RIRs by 16 utterances); and a Stage-3 lightweight two-layer MLP uncertainty head with a Softplus activation. The uncertainty head is trained without downstream supervision using a margin-based ranking loss supervised by the cosine dispersion of embeddings under waveform and spectrogram corruptions.

## Results

Evaluated on a curated collection of 3000 room impulse responses (RIRs) split across training, validation, and test sets representing roughly 111 total hours of generated reverberant speech from EARS anechoic utterances, the framework is assessed using RIR verification average precision (AP), log-mel reconstruction MAE, and T60/C50 acoustic parameter errors. The multi-view training strategy combined with multi-positive contrastive learning consistently outperforms single-view baselines across verification and parameter estimation metrics. Furthermore, the dispersion-calibrated uncertainty score demonstrates high Spearman correlation with actual embedding dispersion, enabling effective selective prediction under waveform and spectrogram corruptions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers working on robust acoustic parameter estimation, environment retrieval, dereverberation, and downstream speech processing systems that require reliability gating.

## Limitations

The evaluation scope is bounded by the considered set of waveform and spectrogram corruptions and relies on synthesized multi-view batches during training.

## Related

- (link related pages by id as the wiki grows)
