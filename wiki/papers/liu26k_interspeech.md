---
id: liu26k_interspeech
category: speech-coding
labels: [efficient-on-device]
institutions: ["Inner Mongolia University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1498
pdf: https://www.isca-archive.org/interspeech_2026/liu26k_interspeech.pdf
---

# HWB-plus: A Lightweight Speech Bandwidth Extension Method with Separate Modeling for Consonants and Vowels

*Xin Liu, Xueliang Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1498)

**Category:** `speech-coding` · **Labels:** `efficient-on-device`

**TL;DR** — HWB-plus is a lightweight speech bandwidth extension (BWE) model for edge devices that decouples vowel and consonant modeling using a Dual-WGMM architecture, achieving state-of-the-art perceptual quality (DNSMOS 3.55, PESQ 3.83) with only 194K parameters and 12.39M MACs/s.

## Key contributions

- Dual-WGMM module: separates high-frequency consonant modeling (using a white-noise base signal via ConsWGMM) from mid-to-low frequency vowel modeling (using HWR-enriched features via VowelWGMM) based on STRAIGHT's periodic/aperiodic decomposition.
- Mel-scale-guided initialization: initializes VowelWGMM Gaussian means and bandwidths to align with mel-filter center frequencies and widths, focusing modeling capacity on perceptually relevant regions.
- Log-domain mixed spectrum processing: compresses the dynamic range of input magnitude spectra to balance low- and high-frequency weights and ensure numerical stability.
- Edge-deployable footprint: matches the ultra-low complexity of HWB-Net (194K parameters, 12.39M MACs/s) while significantly outperforming lightweight baselines like BAE-Lite across subjective and objective perceptual metrics.

## Problem

Traditional speech bandwidth extension (BWE) models face a severe trade-off between reconstruction performance and computational efficiency, making them unsuitable for resource-constrained edge devices. Existing lightweight models like HWB-Net employ Half-Wave Rectification (HWR) and a single Weighted Gaussian Mixture Model (WGMM), which introduces a structural mismatch because HWR relies on harmonic generation that fails to capture aperiodic, noise-like high-frequency consonants (fricatives above 2 kHz). Furthermore, empirical parameter initialization in prior WGMM designs ignores human auditory perception frequency resolution, leading to suboptimal training efficiency and spectral allocation. This work addresses these gaps to provide high-clarity real-time communication on edge hardware.

## Method

The HWB-plus architecture builds upon HWB-Net's encoder-decoder framework, utilizing 4 Conv1D layers and 2 Grouped GRU layers (hidden size 64) for temporal dependency modeling. The core innovation replaces the single WGMM with a DualWGMM module consisting of VowelWGMM and ConsWGMM, which share parallel structures using $N=32$ Gaussian components each. VowelWGMM takes the HWR-enriched log-magnitude mixed spectrum ($S_{\log}^{\text{Mix}}$) and initializes its Gaussian means to mel-filter center frequencies with standard deviations set to $1/6$ of the corresponding mel-filter bandwidths ($\Delta f_{\text{mel},k}$). ConsWGMM uses an aperiodic white Gaussian noise base signal (its STFT magnitude transformed into log-domain with a constant shift of $-1$) and uniform frequency initialization from 2 to 10 kHz with a fixed standard deviation of 10. 

For parameter prediction, the GRU output is passed through parallel linear layers to predict positive component weights via Softplus and standard deviation offsets. Frequency-bin masks are computed using Gaussian density functions, multiplying the respective base signals to yield high-frequency log-domain components ($S_{\log}^{\text{Vowel}}$ and $S_{\log}^{\text{Cons}}$). These are concatenated along the frequency dimension and passed through a $2F \to 1$ linear layer with a Sigmoid activation to generate frame-level fusion weights ($\alpha$) that balance vowel and consonant contributions via broadcast multiplication. The final prediction uses the flip-phase rule to determine high-frequency phase from the low-resolution input phase.

The training framework uses a 4-loss objective combining waveform $L_1$ loss ($L_{\text{wav}}$, weight 200), multi-resolution STFT loss ($L_{\text{stft}}$, weight 0.5), RaLSGAN-based generator adversarial loss ($L_G^{\text{adv}}$), and feature matching loss ($L_{\text{feat}}$, weight 10), alongside a corresponding discriminator loss.

## Experimental setup

Evaluated on the VCTK corpus containing clean speech from 110 speakers sampled at 48 kHz, partitioned into 90 speakers for training, 5 male/5 female speakers for validation, and a non-overlapping set of 5 male/5 female speakers for testing. Low-resolution signals are generated using a Butterworth low-pass filter with a cutoff frequency of 2 to 3 kHz (order 5-10), and high-resolution signals are resampled to 22050 Hz. Compared against baselines including Sinc upsampling, BAE, BAE-Lite (569K params, 26.23M MACs/s), and HWB-Net (194K params, 12.33M MACs/s). Metrics include LSD, DNSMOS P.808, PESQ, VISQOL, NISQA, parameter count, and MACs/s. Implemented using the Adam optimizer with a learning rate of $5\times 10^{-4}$, batch size of 32, and trained for 40 epochs.

## Results

HWB-plus achieves superior perceptual quality compared to lightweight BWE baselines, recording a DNSMOS P.808 of 3.55 (vs. 3.31 for HWB and 3.25 for BAE-Lite), a PESQ score of 3.83 (vs. 3.35 and 3.37), a VISQOL score of 3.96, and a NISQA score of 3.93 while maintaining an identical footprint of 194K parameters and 12.39M MACs/s. While full BAE achieves a lower LSD (0.84 vs. HWB-plus's 0.94), it requires over 14x more parameters (2827K) and 20x more MACs (246M/s), making it unsuitable for edge deployment.

Ablation studies confirm the vital contribution of each component: removing DualWGMM drops DNSMOS P.808 from 3.55 to 3.36 and PESQ from 3.83 to 3.64; removing mel-scale initialization increases LSD from 0.94 to 1.07 and drops PESQ to 3.62; and omitting log-domain processing degrades DNSMOS P.808 to 3.31.

| Methods | LSD ↓ | DNSMOS P.808 ↑ | PESQ ↑ | VISQOL ↑ | NISQA ↑ | Para. (K) | MACs (M/s) |
|---|---|---|---|---|---|---|---|
| Sinc | 3.19 | 2.99 | 3.30 | 2.84 | 3.15 | - | - |
| BAE | 0.84 | 3.34 | 3.78 | 3.72 | 3.76 | 2827 | 246 |
| BAE-Lite | 0.86 | 3.25 | 3.37 | 3.79 | 3.70 | 569 | 26.23 |
| HWB | 1.11 | 3.31 | 3.35 | 3.52 | 3.69 | 194 | 12.33 |
| HWB-plus | 0.94 | 3.55 | 3.83 | 3.96 | 3.93 | 194 | 12.39 |

## Limitations

The evaluation is restricted to clean English speech corpora (VCTK) with simulated low-pass narrowband filtering (2-3 kHz cutoff), leaving real-world acoustic noise and variable telephony codecs untested. The model relies on deterministic phase reconstruction via the flip-phase rule rather than generative phase prediction, which may constrain phase accuracy in highly reverberant environments. Additionally, language coverage is limited to English, and performance on heavily accented or highly tonal languages remains unverified.

## Why read this

Speech and ML engineers building on-device real-time communication systems should read this paper to learn how to inject domain-specific physical knowledge (STRAIGHT periodic/aperiodic decomposition and mel-scale priors) into lightweight neural architectures without increasing computational complexity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time telephony, smart speakers, hearing aids, and voice communication on resource-constrained edge microcontrollers and mobile devices.

## Institutions / 機構

Inner Mongolia University

**Funding / 經費:** Inner Mongolia Natural Science Foundation, Hohhot R&D Investment Incentive Program

## Related

- (link related pages by id as the wiki grows)
