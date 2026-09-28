---
id: kwak26_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-706
pdf: https://www.isca-archive.org/interspeech_2026/kwak26_interspeech.pdf
---

# Plug-and-Steer: Decoupling Separation and Selection in Audio-Visual Target Speaker Extraction

[PDF](https://www.isca-archive.org/interspeech_2026/kwak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kwak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-706)

**TL;DR** — Plug-and-Steer decouples audio separation and visual target selection in audio-visual target speaker extraction by keeping a high-fidelity audio separation backbone frozen and applying a minimalist linear transformation (Latent Steering Matrix) guided by lip motion to anchor the target speaker.

## Problem

Conventional audio-visual target speaker extraction systems deeply integrate audio and visual features via joint optimization to re-learn the entire separation process. Because large-scale audio-visual datasets are often noisy and reverberant, full-parameter training acts as a fidelity ceiling that underperforms compared to pure audio-only separation models trained on clean studio data. Decoupling high-fidelity separation from target selection preserves pre-trained acoustic priors while eliminating the permutation ambiguity of audio-only systems.

## Method

The framework utilizes a frozen audio-only speech separation (AOSS) backbone (such as Conv-TasNet, DPRNN, TF-GridNet, or MossFormer2) combined with a minimalist C x C Latent Steering Matrix (LSM) applied residual-style via a binary gate. A lightweight visual steering module—comprising a lip-reading visual encoder, temporal interpolation, a two-block modified Temporal Convolutional Network (TCN), and a sigmoid-activated gate head—processes visual lip embeddings and latent audio features to predict a frame-wise gate value. Training occurs in two frozen-backbone stages: first optimizing the LSM under a forced-swap condition using negative SI-SNR loss, and second training the visual steering module using a combined binary cross-entropy loss for the gate and signal-level SI-SNR loss.

## Results

Evaluated on the LRS2-2mix benchmark dataset using metrics including SI-SDRi, DNSMOS, and NISQA, the method achieves perceptual quality comparable to original audio-only backbones while outperforming or matching full-parameter AV-TSE baselines. When pre-trained on clean Libri2Mix, the plug-and-steer versions of TF-GridNet and MossFormer2 achieve SI-SDRi scores of 14.79 dB and 15.54 dB, respectively. Layer-wise analysis demonstrates that applying the LSM at the final separator block yields performance preservation rates of 96.22% for Conv-TasNet, 99.67% for DPRNN, 99.91% for TF-GridNet, and 99.43% for MossFormer2.

## Code

- https://plugandsteer.github.io

## Applications

Speech engineers and developers building real-world multi-speaker extraction systems, hearing aids, or video conferencing tools where clean target speaker isolation is required from noisy visual-audio recordings.

## Limitations

The current framework is demonstrated primarily on two-speaker mixtures and relies on accurate visual lip motion tracking.

## Related

- (link related pages by id as the wiki grows)
