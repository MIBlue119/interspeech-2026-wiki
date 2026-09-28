---
id: ni26b_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2291
pdf: https://www.isca-archive.org/interspeech_2026/ni26b_interspeech.pdf
---

# DTT-BSR+: A Generative-Regression Cascade for Music Source Restoration

[PDF](https://www.isca-archive.org/interspeech_2026/ni26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ni26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2291)

**TL;DR** — DTT-BSR+ is a two-stage generative-regression cascade for music source restoration that decouples semantic distribution fitting from signal reconstruction, outperforming state-of-the-art baselines on multi-mel signal-to-noise ratio across five out of eight stems.

## Problem

Music source restoration (MSR) aims to extract clean, unprocessed stems from finished mixes while reversing non-linear production effects like dynamic range compression and codec encoding. Existing single-stage generative systems match semantic distributions well but suffer from poor waveform-level reconstruction accuracy, whereas multi-stage systems can lack joint optimization. Addressing both source unmixing and inverse production effects simultaneously is inherently ill-posed and challenging.

## Method

The system uses a two-stage cascade architecture called DTT-BSR+. The first stage employs a pre-trained DTT-BSR generative separator with a dual-path TFC-TDF U-Net and RoPE transformer bottleneck to generate stems matching clean priors. The second stage processes this estimate using Demucs-L, a modified 1D convolutional U-Net with Gated Linear Units and 6 encoder-decoder layers (removing the BLSTM bottleneck to restrict receptive field to local waveform fitting). Demucs-L is trained using a composite regression loss combining time-domain L1 loss and multi-resolution STFT loss, with Adam optimization for 150 epochs, utilizing data augmentations like random frequency-phase offsets and 10% target-substitution.

## Results

Evaluated on MSRBench (3250 clips at 48 kHz), DTT-BSR+ is compared against BSRNN baseline, X-LANCE-MSR, and single-stage DTT-BSR using multi-mel signal-to-noise ratio (MMSNR), Zimtohrli, and FAD-CLAP. DTT-BSR+ improves MMSNR over single-stage DTT-BSR across all 8 stems (e.g., Bass from 2.49 to 9.29 dB, Drums from 2.24 to 8.79 dB, Vocals from 3.34 to 6.72 dB) and surpasses X-LANCE-MSR on 5 stems (Vocals, Guitars, Synthesizers, Bass, and Drums). It achieves the best Zimtohrli perceptual scores across all 8 stems, while FAD-CLAP analysis reveals an implicit trade-off where higher signal reconstruction accuracy occasionally increases FAD due to semantic mean shifts.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio engineers and music producers performing stem recovery, remixing, and audio restoration from finished commercial mixes.

## Limitations

Percussions remain highly challenging as severe first-stage signal distortion cannot be successfully restored by the second-stage regression network.

## Related

- (link related pages by id as the wiki grows)
