---
id: wang26c_interspeech
category: enhancement-separation
institutions: ["Zhejiang University", "Westlake University", "Westlake Institute for Advanced Study"]
code: https://github.com/Audio-WestlakeU/Rec-RIR
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-217
pdf: https://www.isca-archive.org/interspeech_2026/wang26c_interspeech.pdf
---

# Blind Room Impulse Response Identification via Reverberant Speech Spectrum Reconstruction

*Pengyu Wang, Xiaofei Li*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-217)

**Category:** `enhancement-separation`

**TL;DR** — Rec-RIR proposes a multi-task deep neural network for blind room impulse response (RIR) identification that formulates the task as supervised reverberant speech spectrum reconstruction via convolutive transfer function (CTF) approximation, achieving state-of-the-art accuracy on long RIR estimation without iterative computation.

## Key contributions

- Formulates blind RIR identification as a supervised reverberant speech spectrum reconstruction task, enabling accurate estimation of long CTF filters and RIRs.
- Proposes a multi-task DNN architecture that sequentially removes noise and reverberation from observations and fuses reverberant and clean speech features for CTF estimation.
- Delivers consistent state-of-the-art performance across both acoustic parameter estimation (RT60, DRR, C50) and RIR waveform estimation.
- Eliminates the need for iterative computation while enabling modeling of long RIRs up to a maximum duration of 0.96 seconds.

## Problem

Traditional intrusive room impulse response (RIR) measurement requires playing known excitation signals like maximum length sequences or sine sweeps, which is impractical in real-world scenarios. Prior deep learning-based blind RIR methods struggle with either long time-domain tap dimensions (e.g., S2IR-GAN, FiNS, SG-RIR) or rely on expensive iterative maximum likelihood estimation computations (e.g., BUDDy, VINP). Overcoming these limitations is crucial for deploying blind acoustic environment estimation in real-world speech enhancement, speech recognition, and virtual/augmented reality applications.

## Method

Rec-RIR maps single-channel time-frequency observations into a convolutive transfer function (CTF) filter estimate via a multi-task deep neural network, which is subsequently converted to an RIR using a pseudo intrusive measurement process. The network first takes the real and imaginary STFT components of the observation, applies a 1D temporal convolution (kernel size 5) with PReLU activation to extract an initial embedding, and feeds it into three sequential functional modules: a denoising module, a dereverberation module, and a CTF module.

The denoising module consists of M1 = 2 interleaved cross-band blocks (processing full-band frequency dependencies via frequency convolutions and linear layers) and narrow-band blocks (processing time-dependencies via forward and backward Mamba layers), producing a noise-free reverberant speech embedding. An auxiliary decoder maps this embedding to estimate the reverberant speech spectrum. The dereverberation module uses M2 = 6 identical interleaved blocks to extract a clean speech embedding, supervised via an auxiliary clean spectrum decoder.

The CTF module processes weighted embeddings from both reverberant and clean speech using M3 = 6 narrow-band Mamba blocks. A frame-wise weight block containing two linear layers, LeakyReLU, and a temporal SoftMax layer computes dynamic frame importance. The resulting embeddings are summarized along the frame axis and mapped via a decoder to the final CTF filter estimate H-hat. The primary loss function combines magnitude and real/imaginary (Mag+RI) mean square error for spectrum reconstruction, weighted alongside auxiliary denoising and dereverberation losses using scaling factors lambda_denoi = 1.0 and lambda_dereverb = 1.0.

During inference, the estimated CTF filter is converted to an RIR waveform by simulating a pseudo intrusive measurement using a logarithmic sine sweep excitation signal and its corresponding inverse filter via STFT domain multiplication and inverse STFT.

## Experimental setup

The training set comprises 200 hours of high-quality clean speech from the DNS Challenge, VCTK, and EARS datasets, paired with 100,000 reverberant/direct-path RIR pairs generated via gpuRIR (room dimensions 3-15m length/width, 2.5-6m height, RT60 uniformly distributed from 0.2s to 1.5s). Noise sources from NOISEX-92 and the REVERB Challenge training set were added at SNRs uniformly distributed between 5 dB and 20 dB. Evaluation is performed on the SimACE test set using clean speech from WSJ0, measured RIRs from the ACE Challenge, and REVERB Challenge noise at 20 dB SNR.

The model is implemented with F = 257 frequency bins (512-sample square-root Hann window, 50% overlap), embedding dimension C = 96, and CTF length L = 60 (covering 0.96s). Training uses 4-second utterances, 97,092 samples per epoch, batch size of 4, and the AdamW optimizer with a cosine-decaying learning rate restarting at 0.001. Rec-RIR contains 3.1 million parameters and a computational complexity of 35.2 GMACs/s.

## Results

Rec-RIR significantly outperforms state-of-the-art baselines (FiNS, BUDDy, VINP-TCN+SA+S, and VINP-oSpatialNet) across acoustic parameter and early reflection metrics on the SimACE dataset. For RIR-50 ms early reflections, Rec-RIR achieves an RMSE of 0.040 and a Pearson correlation coefficient (rho) of 0.805, outperforming VINP-oSpatialNet (RMSE 0.050, rho 0.703). For RT60 estimation, Rec-RIR achieves an MAE of 0.069 s and an RMSE of 0.104 s with a near-perfect rho of 0.994. For DRR estimation, it achieves an MAE of 0.794 dB and rho of 0.994, and for C50, an MAE of 1.019 dB and rho of 0.978.

Ablation studies confirm the effectiveness of the multi-task loss formulation: removing auxiliary denoising and dereverberation losses degrades DRR MAE from 0.684 dB up to 1.050 dB. A known limitation is that irregular impulses occurring within the first 2 ms near the direct-path impulse cannot be fully reconstructed due to deviations in direct-path speech alignment.

| System | RT60 MAE (s) | RT60 RMSE (s) | RT60 rho | DRR MAE (dB) | C50 MAE (dB) |
|---|---|---|---|---|---|
| FiNS [6] (2021) | 0.113 | 0.067 | 0.409 | 2.153 | 6.489 |
| BUDDy [9] (2025) | 0.122 | 0.057 | 0.621 | 3.673 | 4.109 |
| VINP-TCN+SA+S [10] (2025) | 0.089 | 0.050 | 0.695 | 3.256 | 0.914 |
| VINP-oSpatialNet [10] (2025) | 0.103 | 0.050 | 0.703 | 2.398 | 0.977 |
| Rec-RIR (prop.) | 0.069 | 0.040 | 0.805 | 0.684 | 0.858 |

## Limitations

The evaluation is restricted to single-channel 16 kHz simulated and recorded acoustic environments with a single speaker and microphone, potentially limiting generalization to multi-channel setups, highly dynamic acoustic spaces, or extreme noise conditions. The model assumes an upper limit on RIR effective duration of 0.96 seconds (L=60), restricting performance in extremely reverberant large spaces exceeding this window. Furthermore, minor reconstruction inaccuracies occur within the first 2 milliseconds near the direct-path impulse due to alignment constraints.

## Why read this

Researchers and audio engineers working on blind system identification, dereverberation, or acoustic environment estimation should read this paper to learn how formulating RIR estimation as a supervised multi-task spectrum reconstruction problem via CTF approximation eliminates iterative optimization while scaling to long reverberation tails.

## Code

- https://github.com/Audio-WestlakeU/Rec-RIR

## Applications

Speech enhancement, robust automatic speech recognition, and acoustic parameter estimation for augmented and virtual reality.

## Institutions / 機構

Zhejiang University, Westlake University, Westlake Institute for Advanced Study

## Related

- [Dual-Geometry Manifolds for Few-shot RIR Prediction](bhosale26b_interspeech.md) — same problem · relatedness 2.7/3
- [A Novel Transfer Learning Approach for Room Impulse Response Estimation and Speech Dereverberation Across Geometrically Diverse and Data-Scarce Environments](pasha26_interspeech.md) — same problem · relatedness 2.5/3
- [Room Impulse Response Completion Using Signal-Prediction Diffusion Models Conditioned on Simulated Early Reflections](xu26p_interspeech.md) — same problem · relatedness 2.4/3
- [Echoes after Edits: Room Impulse Response Estimation for Geometry Update](bhosale26_interspeech.md) — same problem · relatedness 2.3/3
- [Explicit Context-Driven Neural Acoustic Modeling for High-Fidelity RIR Generation](si26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
