---
id: huang26g_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1354
pdf: https://www.isca-archive.org/interspeech_2026/huang26g_interspeech.pdf
---

# MSR-HuBERT: Self-supervised Pre-training for Adaptation to Multiple Sampling Rates

[PDF](https://www.isca-archive.org/interspeech_2026/huang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1354)

**TL;DR** — MSR-HuBERT introduces a multi-sampling-rate adaptive pre-training method for speech self-supervised learning that unifies data from 16 to 48 kHz without resampling, matching or exceeding single-rate baselines across automatic speech recognition and full-band speech reconstruction.

## Problem

Mainstream speech self-supervised learning (SSL) models rely on a fixed downsampling rate tailored exclusively to 16 kHz audio, causing severe temporal resolution mismatch when fed multi-rate data. This mismatch prevents direct multi-rate pre-training, forces costly resampling that destroys high-frequency details, and restricts downstream applicability. Resolving this is critical to leverage diverse audio corpora efficiently.

## Method

The paper proposes MSR-HuBERT, modifying HuBERT by replacing its single-rate downsampling CNN with a multi-sampling-rate adaptive downsampling CNN containing rate-specific branches, strides, and kernel widths. Each branch maps raw waveforms from different sampling rates (16, 22.05, 24, and 48 kHz) to a shared 20 ms frame shift, followed by layer normalization per branch to map features into a unified space. The model retains the standard Transformer encoder, mask-prediction objective, and uses a single shared codebook for mixed-rate pre-training. Pre-training uses 960 hours of LibriSpeech (16 kHz) and ~193 hours per rate from DNS Challenge subsets (22.05, 24, 48 kHz) on four 24GB NVIDIA 4090D GPUs for 400k steps.

## Results

Evaluated on LibriSpeech (16 kHz), LJSpeech (22.05 kHz), LibriTTS (24 kHz), and VCTK (48 kHz) using automatic speech recognition (ASR) and full-band speech reconstruction (SR) downstream tasks under the SUPERB protocol. Results demonstrate that standard HuBERT models struggle when sampling rates mismatch or require resampling, whereas MSR-HuBERT successfully retains low-frequency semantic structures for robust ASR while capturing high-frequency details needed for speech reconstruction. Adding a new sampling rate to pre-training increases model parameters by only 3% and computational time by 2.6%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building universal speech foundation models that ingest uncurated multi-sampling-rate audio for downstream ASR, speech enhancement, and full-band speech generation.

## Related

- (link related pages by id as the wiki grows)
