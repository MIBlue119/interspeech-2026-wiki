---
id: wang26c_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-217
pdf: https://www.isca-archive.org/interspeech_2026/wang26c_interspeech.pdf
---

# Blind Room Impulse Response Identification via Reverberant Speech Spectrum Reconstruction

[PDF](https://www.isca-archive.org/interspeech_2026/wang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-217)

**TL;DR** — Rec-RIR is a blind room impulse response identification network that uses reverberant speech spectrum reconstruction and convolutive transfer function approximation, achieving state-of-the-art accuracy on acoustic parameter and waveform estimation.

## Problem

Intrusive room impulse response (RIR) measurements require known excitation signals and expensive setups, making them impractical for many real-world settings. Blind RIR identification estimates impulse responses directly from single-channel speech observations, but doing so in the time domain is difficult due to long taps comprising thousands of samples. Existing iterative or fixed-length methods either struggle with long observations or rely on computationally expensive estimation loops.

## Method

The Rec-RIR framework models reverberation through convolutive transfer function (CTF) approximation in the STFT domain and uses a multi-task deep neural network with 3.1M parameters and 35.2 GMACs/s. The architecture sequentially applies a denoising module ($M_1=2$ blocks) and a dereverberation module ($M_2=6$ blocks) built from interleaved cross-band and narrow-band Mamba blocks. A subsequent CTF module ($M_3=6$ blocks) fuses weighted reverberant and clean speech embeddings, utilizing a frame-wise weight block to handle inputs of arbitrary length up to 0.96 s ($L=60$). A pseudo intrusive measurement process then converts the estimated CTF filter into a time-domain RIR using inverse filtering of a logarithmic sine sweep.

## Results

Evaluated on the SimACE test set against baselines including FiNS, BUDDy, and VINP-oSpatialNet, Rec-RIR achieves an RIR-50 ms RMSE of 0.040 and a correlation $\bar{\rho}$ of 0.805. It reports an RT60 RMSE of 0.104 s and a C50 RMSE of 1.019 dB with a Pearson correlation of 0.978. The training recipe utilizes 200 hours of clean speech from DNS Challenge, VCTK, and EARS, combined with 100,000 simulated room impulse response pairs generated via gpuRIR with RT60s ranging from 0.2 s to 1.5 s.

## Code

- https://github.com/Audio-WestlakeU/Rec-RIR

## Applications

Speech and ML engineers working on speech enhancement, automatic speech recognition, and augmented or virtual reality acoustic simulation.

## Limitations

Irregular impulses occurring before 2 ms near the direct-path reflection cannot be fully reconstructed because the direct-path speech used for alignment deviates from an ideal Dirac delta.

## Related

- (link related pages by id as the wiki grows)
