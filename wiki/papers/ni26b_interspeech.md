---
id: ni26b_interspeech
category: enhancement-separation
labels: [generative-model, robustness-noise]
institutions: ["Wuhan University", "Tampere University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2291
pdf: https://www.isca-archive.org/interspeech_2026/ni26b_interspeech.pdf
---

# DTT-BSR+: A Generative-Regression Cascade for Music Source Restoration

*Youran Ni, Shihong Tan, Yuzhu Wang, Gongping Huang*

[PDF](https://www.isca-archive.org/interspeech_2026/ni26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ni26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2291)

**Category:** `enhancement-separation` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — DTT-BSR+ is a two-stage cascade music source restoration system that decouples distribution fitting from signal reconstruction, improving multi-mel signal-to-noise ratio (MMSNR) from 1.38 dB to 4.35 dB average over single-stage DTT-BSR.

## Key contributions

- Proposes a two-stage cascade architecture separating semantic distribution fitting (DTT-BSR) and local waveform-level reconstruction (modified Demucs-L).
- Removes the BLSTM bottleneck from standard Demucs to restrict temporal receptive field to local waveform alignment.
- Reveals an implicit trade-off between signal reconstruction accuracy and semantic distribution fitting using Fréchet Audio Distance (FAD-CLAP) decomposition.
- Demonstrates state-of-the-art multi-mel SNR (MMSNR) and perceptual scores across five out of eight music stems (Vocals, Guitars, Synthesizers, Bass, Drums) compared to X-LANCE-MSR.

## Problem

Music source restoration (MSR) aims to extract clean, unprocessed stems from finished audio mixtures by reversing both source unmixing and non-linear production effects like compression, harmonic distortion, and codec artifacts. Existing single-stage systems achieve good perceptual distributions (FAD) but low signal reconstruction accuracy (MMSNR), while current multi-stage pipelines like X-LANCE apply independent sub-stages without explicitly separating generative prior alignment from waveform regression. This coupling makes accurate stem reconstruction ill-posed and hard to optimize under a unified joint objective.

## Method

The system processes a degraded time-domain mixture through a two-stage pipeline targeting 8 distinct stems (Vocals, Guitars, Keyboards, Synthesizers, Bass, Orchestral, Drums, Percussions). The first stage (DTT-BSR) uses a dual-path TFC-TDF U-Net backbone with RoPE transformer bottlenecks, combining adversarial and reconstruction losses to generate estimates conforming to clean source priors. The second stage (Demucs-L) takes the first stage output and performs waveform-level regression using a 6-layer symmetric 1D convolutional U-Net with Gated Linear Units (GLU) and strided convolutions (kernel size 8, stride 4, starting with 64 channels doubling per layer). The bidirectional LSTM bottleneck is completely removed from Demucs to constrain temporal context to local windowing.

The Demucs-L network is optimized with a hybrid loss function combining L1 time-domain loss (lambda_1 = 10.0) and multi-resolution STFT (MR-STFT) spectral loss (lambda_2 = 1.0) across multiple FFT resolutions. Training uses the Adam optimizer at a learning rate of 2e-4 for 150 epochs with a batch size of 16 on an NVIDIA RTX 4090 GPU, processing 1-second chunks from 10-second clip pairs. Data augmentation involves frequency-domain random phase offsets and a 10% probability injection of clean target stems directly into the second-stage input to prevent distribution overfitting.

## Experimental setup

Evaluated on MSRBench containing 3250 stereo clips (48 kHz, 10 seconds), split into 2600 training, 325 validation, and 325 test clips. The first stage is pretrained on the disjoint RawStems dataset. Baselines include BSRNN (challenge baseline), X-LANCE-MSR (challenge winner), and single-stage DTT-BSR. Metrics used are scale-invariant multi-mel signal-to-noise ratio (MMSNR), Zimtohrli psychoacoustic perceptual metric, and FAD-CLAP semantic distribution distance.

## Results

DTT-BSR+ achieves an average MMSNR of 4.35 dB compared to 1.38 dB for DTT-BSR and 2.28 dB for X-LANCE-MSR, with particularly large gains on Bass (9.29 dB vs 4.22 dB for X-LANCE) and Drums (8.79 dB vs 2.48 dB). It achieves the best Zimtohrli score across all eight stems (avg 0.015 vs 0.021 for X-LANCE). FAD-CLAP decomposition reveals that improvements in MMSNR are accompanied by an unexpected semantic mean shift on four stems (Guitars, Keyboards, Synthesizers, Orchestral) while covariance remains unchanged. It fails on Percussions, where single-stage MSG yields 2.47 dB MMSNR compared to 0.42 dB for DTT-BSR+ due to unrecoverable first-stage distortion.

| System | Vocals MMSNR | Bass MMSNR | Drums MMSNR | Avg. MMSNR | Avg. Zimtohrli |
|---|---|---|---|---|---|
| BSRNN (Baseline) | 3.24 | 2.37 | 1.83 | 1.23 | 0.022 |
| X-LANCE-MSR | 3.36 | 4.22 | 2.48 | 2.28 | 0.021 |
| DTT-BSR | 3.34 | 2.49 | 2.24 | 1.38 | 0.022 |
| DTT-BSR+ (Ours) | 6.72 | 9.29 | 8.79 | 4.35 | 0.015 |

## Limitations

Evaluated exclusively on MSRBench (synthetic 10-second clips at 48 kHz), leaving real-world unconstrained long-form mixes untested. The system degrades significantly on percussive stems where the first stage introduces irreversible transient distortions. The multi-stage pipeline requires decoupled stage training, and certain stems exhibit a trade-off where maximizing signal reconstruction causes semantic mean shifts in CLAP space.

## Why read this

Audio researchers and ML engineers building source separation and restoration pipelines should read this to understand the concrete limits of joint generative-regression models and how decoupling distribution priors from waveform regression impacts MMSNR versus FAD trade-offs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Professional music production mastering suites, stem separation software, audio archiving, and automated remixing systems.

## Institutions / 機構

Wuhan University, Tampere University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
