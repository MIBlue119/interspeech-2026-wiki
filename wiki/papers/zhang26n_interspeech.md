---
id: zhang26n_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1023
pdf: https://www.isca-archive.org/interspeech_2026/zhang26n_interspeech.pdf
---

# SE-AGCNet: An End-to-End Framework for Joint Speech Enhancement and Loudness Control in Meeting Scenarios

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1023)

**TL;DR** — SE-AGCNet is an end-to-end framework for joint speech enhancement and automatic gain control that improves speech quality, restores target loudness (-23 LUFS), and reduces downstream ASR error rates in meeting scenarios.

## Problem

Conventional audio front-ends handle speech enhancement (SE) and automatic gain control (AGC) as separate cascaded modules, which causes problems because applying AGC first amplifies background noise while applying it second makes performance reliant on SE quality, and SE models tend to over-suppress low-volume speech. Jointly training these tasks prevents SE from misclassifying quiet speech as noise and stops AGC from amplifying residual background noise. Furthermore, public evaluation of AGC lacked standardized metrics and reproducible multi-speaker training data with realistic volume variations.

## Method

The framework employs a two-stage time-frequency architecture using MP-SENet as the SE backbone with an asymmetric reweighting strategy that applies a 10x penalty for predicting magnitudes lower than target speech to prevent over-suppression. The AGC module takes RMS-normalized enhanced magnitude spectra and processes them through two 2D convolution layers, a 2-layer bidirectional LSTM with a hidden size of 256 per direction, and transposed convolutions for spectral reconstruction. A companion data simulation pipeline named SE-AGC-DataGen generates 54 hours of training data from LibriTTS combined with DNS Challenge noise, applying volume fluctuations and acoustic variations. Training incorporates conditional AGC loss weighting to penalize noise amplification in silent regions and a curriculum strategy pre-training the SE backbone for 5 epochs.

## Results

Evaluated on the simulated LibriAGC test set and real-world datasets including MMCSG and AliMeeting-far, using metrics such as LUFS, Short-term LUFS (St LUFS), Loudness Range (LRA), PESQ, SIGMOS, DNSMOS, WER, and CER. SE-AGCNet successfully hits target loudness metrics (achieving LUFS and St LUFS around -23 and LRA between 3-6 LU) while outperforming cascaded baselines such as MP-SENet combined with pyagc. On AliMeeting-far, SE-AGCNet reduces Character Error Rate (CER) significantly compared to noisy inputs and baseline variants. Ablations confirm that joint optimization outperforms treating AGC purely as an off-the-shelf post-processor.

## Code

- https://jinming00.github.io/SE-AGCNet/

## Applications

Speech and ML engineers building audio front-ends for multi-speaker meeting assistants, conference systems, and automatic speech recognition pipelines operating in acoustic environments with severe volume imbalances and background noise.

## Related

- (link related pages by id as the wiki grows)
