---
id: sharma26c_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2839
pdf: https://www.isca-archive.org/interspeech_2026/sharma26c_interspeech.pdf
---

# LavaSR: Fast and Flexible Audio Bandwidth Extension via Vocos

[PDF](https://www.isca-archive.org/interspeech_2026/sharma26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sharma26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2839)

**TL;DR** — LavaSR is a Vocos-based bandwidth extension model that reconstructs 8-48 kHz audio with an NVIDIA A100 real-time factor of 0.0001 while achieving competitive log-spectral distance.

## Problem

Traditional signal processing methods for bandwidth extension fail to recover convincing high-frequency details, while state-of-the-art diffusion models are too computationally expensive for real-time applications. Existing efficient GAN-based approaches either rely on fixed input-output sample-rate pairs or intricate multi-scale networks, restricting their flexibility. This work bridges the gap by offering a unified, single-stream architecture supporting arbitrary input rates at extreme throughput.

## Method

The model first resamples input audio to 48 kHz using sinc interpolation and extracts an 80-bin mel-spectrogram conditioning representation. The backbone consists of 8 residual ConvNeXt-style blocks with a model dimension of 512 and feed-forward intermediate expansion to 1536 channels. A linear output head predicts complex STFT coefficients simultaneously, converted to waveforms via iSTFT. A lightweight Linkwitz-Riley-inspired frequency refiner then constructs a polynomial crossover mask to smoothly blend the original low-band anchor with the generated high-frequency content. Training utilizes multi-resolution STFT loss, L1 mel-spectrogram loss, Multi-Resolution Discriminator adversarial loss, and feature matching loss with the AdamW optimizer.

## Results

Evaluated on the 44-hour VCTK corpus with inputs randomly downsampled to 8, 12, or 16 kHz, the model achieves a Log-Spectral Distance (LSD) of 0.85 at 8→48 kHz, outperforming AudioSR (1.61) and NVSR (1.22), and matching AP-BWE's LSD of 0.74 at 16→48 kHz. It attains a ViSQOL perceptual score of 3.51 at 8→48 kHz (competitive with AP-BWE's 3.51) and an SI-SDR of 18.02 dB. Ablations confirm that the Linkwitz-Riley refiner achieves the best LSD (0.850) compared to raw outputs (0.897) or standard Butterworth filters. Efficiency benchmarks show an NVIDIA A100 RTF of 0.0001 at batch size 32 (12,500x real-time) and an 8-core CPU RTF of 0.0053 with a 15M parameter footprint.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers deploying real-time speech enhancement, telephony super-resolution, or cloud-based audio processing pipelines on resource-constrained edge devices or high-throughput servers.

## Limitations

Evaluated primarily on clean speech datasets (VCTK), with future work needed for music and noisy acoustic environments.

## Related

- (link related pages by id as the wiki grows)
