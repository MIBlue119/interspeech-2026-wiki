---
id: huang26g_interspeech
category: asr
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1354
pdf: https://www.isca-archive.org/interspeech_2026/huang26g_interspeech.pdf
---

# MSR-HuBERT: Self-supervised Pre-training for Adaptation to Multiple Sampling Rates

*Zikang Huang, Meng Ge, Tianrui Wang, Xuanchen Li, Xiaobao Wang, Longbiao Wang, Jianwu Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1354)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — MSRHuBERT introduces a multi-sampling-rate adaptive convolutional downsampling module to speech self-supervised learning, enabling unified mixed-rate pre-training without resampling while improving full-band speech reconstruction and maintaining robust ASR performance.

## Key contributions

- Identifies and formalizes the resolution mismatch problem in speech SSL when processing audio across diverse sampling rates.
- Proposes MSRHuBERT, featuring a multi-sampling-rate adaptive downsampling CNN with rate-specific strides and kernels paired with independent layer normalization branches.
- Enables mixed-rate pre-training using a single shared codebook and Transformer encoder without disrupting the core HuBERT loss function.
- Demonstrates compatibility with advanced HuBERT modifications, showing consistent gains when applying intermediate layer supervision and progressive decoupling.

## Problem

Standard speech self-supervised learning models like wav2vec 2.0, HuBERT, and WavLM rely on a fixed 320x temporal downsampling CNN optimized exclusively for 16 kHz audio, enforcing a rigid 20 ms frame shift. When processing audio at other sampling rates, this causes a severe temporal resolution mismatch that ruins pre-training and downstream adaptation. Simple workarounds like resampling high-rate audio to 16 kHz destroy valuable high-frequency details, while training separate models per rate is prohibitively costly. This work addresses the lack of sampling-rate compatibility in time-domain speech SSL architectures.

## Method

MSRHuBERT replaces the single-rate downsampling CNN of HuBERT with a multi-sampling-rate adaptive downsampling CNN consisting of rate-specific convolutional branches F_dr(·) for 16, 22.05, 24, and 48 kHz. Each branch is carefully configured with prime-factorized kernel widths and strides to compress incoming raw waveforms into a uniform temporal grid with a consistent 20 ms frame shift. Following each rate-specific convolutional branch, a layer normalization operator (LN_dr) independently normalizes mean and variance per branch, mapping features into a unified shared space and preventing aggregation inconsistencies.

Because all branch outputs share a common temporal scale and feature space, MSRHuBERT retains the standard HuBERT Transformer encoder, mask-prediction objective, and offline k-means clustering codebook. During pre-training, raw waveforms from different sampling rates are processed through their respective adaptive branches, masked, and trained via cross-entropy loss against discrete pseudo-labels using a single shared codebook. Pre-training uses batched multi-rate data updates via gradient accumulation, keeping model parameters nearly invariant (adding only ~3% parameters per extra sampling rate) and increasing training time by just 2.6% over single-rate baselines.

## Experimental setup

Pre-training combines the 960-hour LibriSpeech corpus at 16 kHz with a 193-hour clean subset of the DNS Challenge 2022 dataset resampled uniformly to 22.05 kHz, 24 kHz, and 48 kHz. Models are trained from scratch for 400k steps on four 24GB NVIDIA 4090D GPUs with an effective batch size matching standard HuBERT. Evaluation follows the SUPERB benchmark using LibriSpeech (16k), LJSpeech (22.05k), LibriTTS (24k), and VCTK (48k) for automatic speech recognition (ASR via WER) and full-band speech reconstruction (SR via STOI using an adapted HiFi-GAN vocoder).

## Results

MSRHuBERT achieves competitive or superior performance across all rates compared to baseline HuBERT and resampled variants. On ASR, MSRHuBERT achieves a WER of 5.89 at 16 kHz and 6.35 at 24 kHz, outperforming standard single-rate baselines. In mixed-rate fine-tuning, it scores 6.54 (16k), 2.90 (22.05k), 6.82 (24k), and 5.56 (48k) WER. On full-band speech reconstruction, MSRHuBERT reaches an STOI of 90.26 at 16k, 94.38 at 22.05k, 89.25 at 24k, and 85.79 at 48k, outperforming 16k-resampled baselines which max out at 89.35 and 82.49.

Ablations demonstrate that violating the temporal alignment via mismatched downstream evaluation leads to catastrophic failures (e.g., ASR WER jumping from 6.03 to 38.18 at 48 kHz). Furthermore, adding intermediate layer supervision and progressive decoupling pushes ASR WER down further to 5.56 (16k) and 5.94 (24k).

| Model | ASR 16k (WER↓) | ASR 48k (WER↓) | SR 16k (STOI↑) | SR 48k (STOI↑) |
|---|---|---|---|---|
| HuBERT Base (16k) | 6.41 | 5.96 | 88.46 | 81.42 |
| Re. 16kHz HuBERT Base | 6.03 | 5.61 | 89.35 | 82.49 |
| Re. 24kHz HuBERT Base | 6.15 | 5.70 | 89.61 | 83.75 |
| Re. 48kHz HuBERT Base | 6.37 | 5.95 | 89.75 | 85.93 |
| MSRHuBERT | 5.89 | 5.83 | 90.26 | 85.79 |

## Limitations

The current exploration is evaluated primarily on clean speech corpora (LibriSpeech, DNS Challenge clean subset, LJSpeech, LibriTTS, VCTK) and may require further tuning for highly noisy, reverberant, or domain-shifted multi-rate data. The approach currently relies on discrete k-means codebooks computed per dataset or sampling rate, and adding completely arbitrary new sampling rates requires designing custom CNN stride/kernel combinations via prime factorization.

## Why read this

Speech researchers and engineers working on universal, multi-rate speech foundational models will find this a clean, lightweight architectural blueprint that bypasses resampling overhead without breaking standard self-supervised objectives.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Unified speech pre-training models, multi-rate automatic speech recognition, and high-fidelity full-band speech generation or neural vocoding.

## Institutions / 機構

Tianjin University, Huiyan Technology Company, Shenzhen Institute of Advanced Technology

## Related

- (link related pages by id as the wiki grows)
