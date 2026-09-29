---
id: lee26f_interspeech
category: enhancement-separation
labels: [robustness-noise]
institutions: ["Korea Advanced Institute of Science and Technology"]
code: https://sites.google.com/view/semambapp
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-665
pdf: https://www.isca-archive.org/interspeech_2026/lee26f_interspeech.pdf
---

# SEMamba++: A General Speech Restoration Framework Leveraging Global, Local, and Periodic Spectral Patterns

*Yongjoon Lee, Jung-Woo Choi*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-665)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — SEMamba++ is a general speech restoration framework that introduces speech-specific frequency inductive biases into State-Space Models, achieving state-of-the-art perceptual quality across multiple out-of-domain datasets with only 2.7M parameters.

## Key contributions

- Proposed Frequency GLP, a parallel global-local-periodic feature extraction block leveraging Fourier Analysis Networks (FAN) directly on frequency bins to model harmonic and periodic spectral structures.
- Designed a multi-resolution parallel time-frequency dual-processing (TFDP) block with frequency-only downsampling to capture complementary spectral patterns across scales without sacrificing temporal fidelity.
- Introduced a learnable band-specific softplus magnitude mapping function to handle arbitrary high-frequency generation required for bandwidth extension.
- Adopted a vocoder-style LSGAN objective paired with multi-scale sub-band CQT and multi-resolution discriminators instead of direct PESQ-optimizing MetricGAN losses.

## Problem

General speech restoration (GSR) requires handling overlapping degradations like noise, reverberation, bandwidth limitation, and clipping, demanding both signal cleanup and missing fragment generation. Prior discriminative and State-Space models (e.g., CMGAN, MP-SENet, SEMamba) process time and frequency domains using generic, uniform architectures that fail to capture spectral periodicity and local-global frequency selectivity. Furthermore, single-resolution TFDP architectures either suffer from heavy computational scaling or miss multi-scale cues, while pure generative/LM approaches require massive training data and struggle with signal fidelity.

## Method

SEMamba++ employs an encoder-bottleneck-decoder architecture taking STFT magnitude and phase representations processed via power-law compression and dilated DenseNets. The core bottleneck contains 4 blocks ($N=4$, hidden channel dimension $C=48$) executing multi-resolution parallel TFDP processing across 3 frequency resolutions downsampled by factors of $2^r$ exclusively along the frequency axis using strided convolutions. Each TFDP unit combines Time Mamba (expansion factor 2) and Frequency GLP. The Frequency GLP module splits processing into a Global Periodicity (GP) branch and a Local (L) branch. The GP branch applies Fourier Analysis Networks (FAN) directly across frequency bins ($F_text{eff}$), using sine and cosine activations with shared weights ($W_p$) to approximate Fourier series for harmonic structures, while the L branch uses 1D convolutions (kernel size 3) for sub-band local correlations. A pointwise convolution selection operator fuses both paths, followed by a channel FFN.

Following the parallel TFDP blocks, features are merged via channel-wise concatenation and pointwise convolutions across resolutions. Instead of magnitude masking, which fails in zero-energy bandwidth-limited regions, the decoder uses a learnable softplus mapping function with frequency-specific parameters $\beta_f$ for each frequency bin $f$. The framework is optimized via a vocoder-style Least Squares GAN (LSGAN) objective utilizing Multi-Scale Sub-Band Constant Q Transform Discriminators (MS-SB-CQTD) and Multi-Resolution Discriminators (MRD), supplemented by magnitude L1 ($L_text{mag}$), anti-wrapping phase ($L_text{awp}$), consistency ($L_text{con}$), complex ($L_text{RI}$), multi-scale mel spectrogram ($L_text{mel} = 0.1$), and feature matching ($L_text{FM} = 1.0$) losses.

## Experimental setup

Models were trained on 44 hours of speech data from VCTK (version 0.92, excluding p280/p315) mixed with WHAM! and DNS Challenge 2020 noises, plus Arni and DNS5 room impulse responses. Degradations simulated on the fly included SNR (-10 to 20 dB), multi-type bandwidth limits (2–7 kHz cutoff), and clipping. Evaluated on VCTK-GSR test (in-domain), URGENT 2025 val/test, CCF-AATC Challenge 2025 blind test, and DNS 2020 real test recordings. Baselines include MP-SENet, SEMamba, USEMamba, Universe++, LLaSE-G1, MaskSR, and VoiceFixer. Metrics include SCOREQ, UTMOS, DNSMOS (SIG, BAK, OVRL), PESQ, LSD, and LPS. Implemented in PyTorch with AdamW ($\beta_1=0.8, \beta_2=0.99$, lr=2e-4), batch size 8, 100 epochs, and 24,000-sample (1.5s) segment lengths on a single GPU.

## Results

SEMamba++ achieves top-tier perceptual scores across in-domain and out-of-domain benchmarks while maintaining a low Real-Time Factor (RTF 0.021) and 2.7M parameters. On the VCTK-GSR test, it scores 3.27 SCOREQ and 3.55 UTMOS (outperforming SEMamba's 2.34 UTMOS). On out-of-domain URGENT 2025 test data, it reaches 2.49 SCOREQ and 3.13 OVRL (significantly beating SEMamba's 2.84 OVRL and USEMamba's 2.91). On DNS 2020 real test set for joint denoising/dereverberation, it achieves a 3.206 OVRL, outperforming larger generative models like MaskSR (3.136) and LLaSE-G1 (3.177). Ablations confirm that removing the GP module or replacing FAN with a linear layer degrades out-of-domain UTMOS from 2.61 down to 2.51 and 2.50 respectively, and that parallel TFDP outperforms sequential TFDP (IoU 0.036 vs 0.045, $p<0.05$).

| System | Params (M) | RTF | VCTK UTMOS | URGENT Test OVRL | DNS 2020 OVRL |
|---|---|---|---|---|---|
| MP-SENet | 2.3 | 0.022 | 2.17 | 2.81 | - |
| SEMamba | 1.7 | 0.013 | 2.34 | 2.84 | - |
| USEMamba | 3.9 | 0.045 | 2.30 | 2.91 | 2.923 |
| Universe++ (50-step) | 42.8 | 0.118 | 2.93 | 2.71 | 2.731 |
| LLaSE-G1 | 1072 | 0.011 | 2.40 | 2.62 | 3.177 |
| SEMamba++ (Ours) | 2.7 | 0.021 | 3.55 | 3.13 | 3.206 |

## Limitations

The direct application of linear operations along the frequency axis in the Frequency GLP module makes the model sensitive to changes in sampling frequency, precluding out-of-the-box deployment across different audio sampling rates without retraining or resizing. Additionally, while perceptual scores improve drastically, optimizing solely via LSGAN and diverse losses rather than direct PESQ optimization requires careful hyperparameter balancing to avoid trade-offs with specific signal fidelity indicators.

## Why read this

Speech and audio researchers building real-time, resource-constrained general speech restoration systems should read this to learn how to inject frequency-specific inductive biases (periodicity via Fourier Analysis Networks and multi-resolution parallel processing) into State-Space Models to dramatically boost out-of-domain generalization without scaling parameter counts.

## Code

- https://sites.google.com/view/semambapp

## Applications

Real-time communication enhancement, robust speech recognition front-ends, hearing aid audio processing, and multi-distortion restoration for archival or telephony recordings.

## Institutions / 機構

Korea Advanced Institute of Science and Technology

**Funding / 經費:** National Research Foundation of Korea, Ministry of Science and ICT of Korea, Ministry of Education of Korea, Ministry of Trade, Industry and Energy, Korea Evaluation Institute of Industrial Technology

## Related

- (link related pages by id as the wiki grows)
