---
id: sharma26c_interspeech
category: speech-coding
labels: [efficient-on-device, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2839
pdf: https://www.isca-archive.org/interspeech_2026/sharma26c_interspeech.pdf
---

# LavaSR: Fast and Flexible Audio Bandwidth Extension via Vocos

*Yatharth Sharma*

[PDF](https://www.isca-archive.org/interspeech_2026/sharma26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sharma26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2839)

**Category:** `speech-coding` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — LavaSR is a Vocos-based neural bandwidth extension system that recovers 48 kHz audio from low-rate inputs (8-48 kHz) using a single ConvNeXt backbone and a Linkwitz-Riley crossover refiner. It matches competitive spectral quality while reaching an extreme throughput of 0.0001 real-time factor on an NVIDIA A100 GPU and 0.0053 on an 8-core CPU.

## Key contributions

- Adapts the Vocos Fourier-domain neural vocoder architecture for bandwidth extension, predicting complex STFT coefficients in a single unified head.
- Introduces a Linkwitz-Riley-inspired frequency-domain crossover refiner that smoothly stitches original low-band anchors with generated high-frequency content without magnitude spikes.
- Demonstrates zero-shot generalization to arbitrary out-of-domain input sample rates by casting bandwidth extension as a fixed-grid spectral completion task after 48 kHz resampling.
- Achieves orders-of-magnitude faster inference than diffusion (AudioSR) and multi-scale GAN baselines (AP-BWE), running at 12,549x real-time at batch size 32 on an A100.

## Problem

Legacy recordings and telephony audio often suffer from severe bandwidth limitations that traditional DSP interpolation and spectral shaping fail to realistically reconstruct. While recent diffusion models like AudioSR achieve high generative quality, their iterative sampling is prohibitively slow for real-time or large-scale cloud applications. Conversely, existing high-throughput GAN approaches like AP-BWE rely on rigid, ratio-specific architectures or intricate multi-scale pipelines that restrict sampling flexibility. LavaSR addresses this gap by providing a unified, lightweight model capable of handling arbitrary input sample rates at extreme processing speeds.

## Method

The input audio at rate r (8-48 kHz) is first resampled to 48 kHz via sinc interpolation to establish a consistent baseband representation, avoiding ratio-specific sub-networks. A mel-spectrogram with 80 bins, n_fft = 2048, and hop length 512 is extracted from the 48 kHz resampled waveform and fed into a generator initialized from scratch. The backbone consists of 8 residual ConvNeXt-style blocks with a model dimension of C = 512, employing 7x1 depthwise convolutions for temporal modeling and feed-forward expansions to 1536 channels with LayerNorm and GELU activations. A linear output head predicts complex-valued STFT coefficients which are converted to a waveform via inverse STFT (iSTFT).

To correct minor inconsistencies where the input already contains reliable information, a lightweight frequency-domain refiner applies a polynomial crossover mask M(f) inspired by Linkwitz-Riley filters. This mask merges the original low-frequency anchor Y(f) with the generated high-frequency content X~(f) using a squared-magnitude response, ensuring a flat summation and suppressing phase discontinuities at the cutoff frequency fc without creating artificial magnitude spikes. The final waveform is produced via inverse real FFT (iRFFT).

The network is optimized using a combination of Multi-Resolution STFT loss (n_fft in {512, 1024, 2048}), L1 mel-spectrogram loss (128 mel bins, n_fft = 2048), a Multi-Resolution Discriminator (MRD) operating on complex STFTs, and a feature matching loss. Training uses the AdamW optimizer with a learning rate of 10^-4, weight decay of 10^-2, batch size of 16, and an exponential learning rate scheduler scaling by 0.99 every 64 steps on roughly 44 hours of VCTK speech data.

## Experimental setup

Models are trained on the VCTK corpus (~44 hours of speech split into segments of 1.28, 2.56, or 3.2 seconds) with random downsampling to 8, 12, and 16 kHz using sinc, zero-order hold, or linear interpolation alongside optional quantization noise. Baselines include standard sinc upsampling, AudioSR (diffusion-based), NVSR (neural GAN vocoder), and AP-BWE (APNet2-inspired GAN). Evaluation metrics comprise Log-Spectral Distance (LSD), ViSQOL (perceptual quality scale 1-4.75), and Scale-Invariant Signal-to-Distortion Ratio (SI-SDR in dB) over a fixed 4-second duration.

## Results

On the VCTK test set for 8 to 48 kHz bandwidth extension, the proposed model achieves an LSD of 0.85 (outperforming AudioSR at 1.61, NVSR at 1.22, and tying AP-BWE at 0.87). For ViSQOL perceptual scoring, it ties AP-BWE at 3.51 for 8 to 48 kHz and achieves 3.69 at 16 to 48 kHz. In time-domain waveform fidelity measured by SI-SDR, the proposed model obtains 18.02 dB, trailing AP-BWE's dual-backbone architecture (18.77 dB) but significantly beating NVSR (14.68 dB).

Ablations on spectral merging confirm the superiority of the Linkwitz-Riley-inspired refiner, yielding an LSD of 0.850 compared to 0.897 for no refiner, 0.865 for naive HP/LP cutoff, and 0.861 for a standard 4th-order Butterworth filter. While it trades away a minor phase optimization delta versus heavily engineered dual-stream GANs, it achieves an inference speed of 0.0053 RTF on an 8-core CPU (190.5x speed) and 0.0001 RTF at batch size 32 on an NVIDIA A100 GPU (12,549x speed), drastically outperforming AP-BWE's 0.0023 RTF under identical batching.

| Method | 8->48 kHz (LSD ↓) | 8->48 kHz (ViSQOL ↑) | 8->48 kHz (SI-SDR dB ↑) | GPU RTF (BS=1) |
|---|---|---|---|---|
| Sinc upsampling | 3.52 | 2.10 | - | - |
| AudioSR | 1.61 | 3.15 | - | 2.1175 |
| NVSR | 1.22 | 2.97 | 14.68 | 0.0103 |
| AP-BWE | 0.87 | 3.51 | 18.77 | 0.0034 |
| Proposed Model | 0.85 | 3.51 | 18.02 | 0.0006 |

## Limitations

The evaluation is restricted solely to clean and degraded English speech data from the VCTK corpus, leaving music, singing voices, and noisy acoustic conditions untested. The model relies on an initial sinc resampling step to 48 kHz, which may bake interpolation artifacts into the baseband before neural processing. Furthermore, out-of-domain sample rates were only evaluated via synthetic degradation profiles rather than diverse real-world telephony or legacy hardware recordings.

## Why read this

Speech and ML engineers building real-time, low-latency audio enhancement or telephony pipelines should read this paper to learn how to adapt the Vocos paradigm for high-throughput bandwidth extension. It provides a blueprint for replacing heavy diffusion or multi-stage GAN architectures with a single lightweight ConvNeXt stream and a Linkwitz-Riley crossover refiner.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time telephony enhancement, legacy audio restoration, and high-throughput cloud-based speech preprocessing pipelines.

## Related

- [STSR: High-Fidelity Speech Super-Resolution via Spectral-Transient Context Modeling](yuan26_interspeech.md) — same problem · relatedness 3.0/3
- [FastWave: Optimized Diffusion Model for Audio Super-Resolution](kuznetsov26_interspeech.md) — same problem · relatedness 2.9/3
- [HWB-plus: A Lightweight Speech Bandwidth Extension Method with Separate Modeling for Consonants and Vowels](liu26k_interspeech.md) — same problem · relatedness 2.9/3
- [VeRe-Flow: Guiding Flow Matching toward Clean Speech via Velocity Contrastive Regularization and Representation Alignment for Noise-Robust Bandwidth Expansion](koo26_interspeech.md) — same problem · relatedness 2.5/3
- [BridgeCodec: Mamba Enhanced Neural Audio Codec with Schrödinger Bridge at Low Bitrate](lin26d_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
