---
id: pang26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2044
pdf: https://www.isca-archive.org/interspeech_2026/pang26_interspeech.pdf
---

# USDnet++: Distilling Signal Processing Based Dereverberation for Unsupervised Neural Speech Dereverberation

*Ruizhe Pang, Shulin He, Jingqi Sun, Zhong-Qiu Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/pang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2044)

**TL;DR** — USDnet++ enhances unsupervised single-speaker speech dereverberation by incorporating signal-processing-based dereverberation (SPD) results as weak supervision and auxiliary input features, improving SI-SDR from 3.1 dB (vanilla USDnet) to 3.9 dB.

## Key contributions

- Refined USDnet training by introducing a new mixture-constraint (MC) loss term that encourages filtered DNN estimates to reconstruct signal processing-based dereverberation (SPD) results.
- Developed a multi-stage refinement framework that alternately applies DNN-based and signal-processing-based dereverberation to iteratively improve model performance.
- Proposed a dual-model architecture that integrates multi-channel SPD outputs as extra input features alongside original microphone mixtures to exploit complementary cues.

## Problem

Supervised DNN-based speech dereverberation relies heavily on simulated data, which fails to generalize to real-world acoustic recordings due to the mismatch between simulation and reality. While prior unsupervised methods circumvent this via reconstruction constraints or standard signal processing outputs (like WPE or WPD), they remain constrained by the limited accuracy of traditional algorithms. USDnet++ addresses this gap by creating an unsupervised learning loop where traditional signal processing and neural networks mutually reinforce each other without requiring clean reference speech.

## Method

The USDnet++ framework uses TFGridNet as the backbone DNN architecture (with parameters D=128, B=4, I=4, J=4, H=200, L=4, E=2) operating on 16 kHz audio sampled via STFT with a 32 ms window and 8 ms hop size. It predicts complex ratio masks for the direct-path speech and noise components given a monaural input, while leveraging multi-channel context. The core innovation is the SPD-constrained training loss, which extends the original mixture-constraint (MC) loss of USDnet by adding an extra term forcing the linearly-filtered DNN estimates to approximate SPD results (derived via weighted prediction error (WPE) or weighted predictive beamforming (WPD) using the DNN's own prior direct-path estimates).

In the multi-stage refinement strategy, the output direct-path speech from a trained USDnet++ model is used to re-compute higher-quality WPD targets, which then supervise subsequent fine-tuning stages. Additionally, a secondary USDnet++ model is introduced that takes both the original 8-channel microphone mixture and the 8-channel SPD output as joint input features. This architecture is trained end-to-end to leverage the spatial and temporal filtering advantages of convolutional beamforming combined with neural mask estimation.

## Experimental setup

Evaluated on the WSJ0CAM-DEREVERB dataset containing 39,293 training mixtures (~77.7 hours), 2,968 validation mixtures (~5.6 hours), and 3,262 test mixtures (~6.4 hours) generated with 8-microphone circular arrays (20 cm diameter), random room impulse responses (T60: 0.2–1.3s), and diffuse air-noise (5–25 dB SNR). Compared against raw mixtures, traditional WPE, and unsupervised USDnet baselines using PESQ, eSTOI, and SI-SDR metrics. Implemented with a batch size of 2, clipped RI components in [-5, 5], and loss weights set to alpha = 3/8 and beta = 1.

## Results

USDnet++ improves SI-SDR from -3.6 dB (mixture) and 3.1 dB (vanilla USDnet) up to 3.9 dB using USDnet-WPD supervision in a single stage, and up to 4.9 dB under oracle WPD constraints. Multi-stage refinement pushes the SI-SDR to 3.9 dB with PESQ reaching 2.90 and eSTOI reaching 0.828 by stage 3. Feeding 8-channel WPD results as extra input features to a second-stage USDnet++ model further elevates performance to 2.94 PESQ, 0.840 eSTOI, and 3.8 dB SI-SDR (or 5.2 dB SI-SDR with oracle WPD features).

| System | PESQ | eSTOI | SI-SDR (dB) |
|---|---|---|---|
| Mixture | 1.64 | 0.494 | -3.6 |
| WPE [3] | 2.02 | 0.690 | 2.0 |
| USDnet [22] | 2.64 | 0.794 | 3.1 |
| USDnet++ (USDnet-WPD) | 2.86 | 0.822 | 3.9 |
| USDnet++ (Stage 3 Refinement) | 2.90 | 0.828 | 3.9 |
| USDnet++ (Extra WPD Input) | 2.94 | 0.840 | 3.8 |

## Limitations

The evaluation is restricted to simulated single-speaker acoustic environments with fixed microphone array layouts, leaving multi-speaker scenarios and real-recorded acoustic conditions unexplored. The multi-stage framework and dual-model configurations also incur additional training overhead and inference latency compared to single-pass monaural networks.

## Why read this

Speech and ML engineers working on real-world dereverberation without clean training targets should read this paper to see how traditional multi-channel signal processing algorithms can effectively bootstrap and supervise deep neural networks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust front-ends for automatic speech recognition, hearing aids, and hands-free smart speakers operating in highly reverberant rooms.

## Related

- (link related pages by id as the wiki grows)
