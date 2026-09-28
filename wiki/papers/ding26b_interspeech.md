---
id: ding26b_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-814
pdf: https://www.isca-archive.org/interspeech_2026/ding26b_interspeech.pdf
---

# Learning to Evade: Adaptive Attacks on Audio Watermarking

*Weikang Ding, Hanqing Guo, Rui Duan, Guangjing Wang, Yuanda Wang, Mingzhe Chen, Qiben Yan*

[PDF](https://www.isca-archive.org/interspeech_2026/ding26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ding26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-814)

**TL;DR** — This paper presents AWM, an adaptive audio watermarking attack framework that uses a two-stage optimization procedure and distribution-matching strategies to bypass state-of-the-art outlier detection defenses while preserving perceptual audio quality.

## Key contributions

- Empirically demonstrates that decoded message probabilities from audio watermark decoders follow normal distributions (unimodal for clean audio, bimodal for watermarked audio), exposing a vulnerability exploited by distribution-based anomaly detectors.
- Proposes AWM, an adaptive audio watermark attack method supporting replacement, creation, and removal scenarios via a two-step optimization framework.
- Introduces a bit-to-bit adaptive optimization strategy that prioritizes updates on uncertain message probabilities and constrains them within estimated normal ranges to evade outlier detection.
- Implements an optional audio quality refinement stage (+opt) using a softmax-based spectrogram loss and extended probability bounds to balance perceptual fidelity and attack success.

## Problem

Deep-learning-based audio watermarking provides copyright protection and trace ownership via encoder-decoder structures, but existing adversarial attacks are highly visible to anomaly detectors. Defenders can flag tampered audio because attack methods cause decoded message probability distributions to significantly deviate from normal benign patterns. Prior attack strategies struggle to balance attack effectiveness and audio quality while evading these statistical detection mechanisms.

## Method

AWM operates through a two-stage optimization framework paired with a statistical estimation routine. First, the attacker queries the watermark decoder with a small auxiliary set of clean audio samples to estimate the target normal distribution's mean (mu) and standard deviation (sigma) via maximum likelihood estimation, distinguishing between unimodal (removal) and bimodal (replacement/creation) profiles.

In the primary attack stage, an adversarial perturbation delta is initialized and optimized using a strict bit-to-bit message loss (L_msg) that forces decoded probabilities toward a target message while constraining them to fall inside the estimated normal region [mu_est - sigma_est, mu_est + sigma_est]. This stage also incorporates signal-level and mel-spectrogram losses. Algorithm 1 dynamically tracks differing bits (msgdiff) to concentrate gradients on vulnerable message indices.

To recover audio quality without sacrificing attack performance, the second stage (+opt) expands the allowed probability boundary to [mu_est - 2*sigma_est, mu_est + 2*sigma_est], runs a fixed number of optimization epochs, and replaces mel-loss with a softmax-based spectrogram loss (L_spec) to better preserve loudness and perceptual similarity across the attacked and original signals.

## Experimental setup

Evaluated on three public corpora: LibriSpeech (small subset, 6.3 GB, 100.6 hours, 251 speakers), an AudioMarkData subset from Common Voice (20,000 samples, 5s each), and GigaSpeech (XS subset, 10 hours). Tested across two state-of-the-art watermarking backbones (Timbre and AudioSeal) with a fixed binary message length of 16 bits. Evaluated against AudioMarkBench baselines and five no-box perturbations (low-pass filtering at 5000Hz, amplitude scaling at 0.9, Gaussian noise at 40 dB, MP3 compression at 32 kbps, and high-pass filtering). Metrics include Detection Success Rate (DSR), False Acceptance Rate (FAR, kept around 5%), Attack Success Rate (ASR), Signal-to-Noise Ratio (SNR), and ViSQOL.

## Results

AWM successfully evades distribution-based detectors, dropping DSRs below 10% for watermark replacement and creation, and achieving 0% DSR (completely undetected) for watermark removal across all datasets. Against five no-box perturbations on watermark creation, AWM consistently maintains high robustness with ASR scores approaching or reaching 100%. 

In audio quality evaluations, the basic AWM model trades off some perceptual fidelity for attack strength, but the optimized variant AWM (+opt) recovers SNR and ViSQOL scores close to unattacked audio (e.g., matching AudioSeal/Timbre clean SNR baselines of ~26.6 dB and ~25.0 dB respectively).

| System / Condition | DSR (%) (LibriSpeech) | FAR (%) (LibriSpeech) | ASR (%) / Robustness | SNR (dB) (AudioSeal) |
|---|---|---|---|---|
| AudioMarkBench (Replacement) | 97.71 | 4.20 | - | 25.40 |
| AWM (Ours, Replacement) | 5.34 | 4.20 | ~100.00 | 23.89 |
| AWM +opt (Replacement) | 3.44 | 4.20 | ~100.00 | 26.27 |
| AudioMarkBench (Removal) | 100.00 | 5.73 | - | 26.49 |
| AWM (Ours, Removal) | 0.00 | 5.73 | ~100.00 | 25.49 |
| AWM +opt (Removal) | 0.00 | 5.73 | ~100.00 | 26.59 |

## Limitations

The attack assumes the adversary can query the watermark decoder to harvest enough samples for reliable distribution parameter estimation. The approach is evaluated primarily on fixed-length 16-bit binary message configurations and specific speech datasets, leaving variable-length payloads and music domains partially unexplored. Additionally, audio quality optimization (+opt) slightly increases detection risk (higher DSR) compared to the unoptimized aggressive attack variant.

## Why read this

Speech security and audio forensics researchers should read this to understand the fundamental vulnerabilities of distribution-based watermark detectors. It provides a blueprint for adaptive attacks that manipulate decoder confidence margins rather than raw pixel/sample spaces.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Testing the robustness and reliability of copyright protection systems, audio watermarking verification services, and forensic deepfake detection frameworks.

## Related

- (link related pages by id as the wiki grows)
