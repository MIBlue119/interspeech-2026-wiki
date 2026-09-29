---
id: lee26r_interspeech
category: tts
labels: [generative-model]
institutions: ["Seoul National University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1938
pdf: https://www.isca-archive.org/interspeech_2026/lee26r_interspeech.pdf
---

# GETS: Guiding EMG-to-Speech Synthesis via Silent Speech Recognition

*Jiwon Lee, Jaejun Lee, Kyogu Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1938)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — GETS is a novel electromyography-to-speech (ETS) framework that integrates a diffusion-based generative network with silent speech recognition (SSR) semantic guidance, achieving a new state-of-the-art word error rate (WER) of 11.89% on silent EMG test data.

## Key contributions

- Introduces GETS, setting a new SOTA WER of 11.89% on silent EMG test sets by fusing acoustic EMG cues with SSR-based semantic guidance.
- First application of diffusion-based classifier guidance combined with silent speech recognition to resolve underspecified EMG inputs without retraining the generative backbone.
- Provides extensive temporal alignment and energy contour analyses proving that the framework preserves underlying prosodic traits rather than acting as a naive text-to-speech system.

## Problem

Silent speech interfaces aim to recover audible speech from facial electromyography (EMG) to assist individuals with speech or motor impairments, but direct electromyography-to-speech (ETS) models struggle with semantic intelligibility and yield high word error rates exceeding 25%. Prior paradigms like direct acoustic mapping, soft unit prediction (SU-ETS), and initial diffusion models (DiffETS) prioritize acoustic reconstruction over linguistic correctness, failing to disambiguate inherently underspecified silent EMG signals. This gap matters because minimizing simple acoustic loss does not guarantee semantic or linguistic consistency, creating an intelligibility bottleneck that limits real-world usability.

## Method

The GETS framework consists of an EMG-conditioned mel generator and an SSR-guided semantic refinement mechanism. The core generator uses a DiffWave backbone combined with a shared EMG encoder containing convolutional and transformer layers. During training, Dynamic Time Warping (DTW) aligns asynchronous silent EMG features ($z_s$) to paired voiced EMG features ($z_v$), generating temporally aligned features ($\hat{z}_s$) that condition the DDPM forward and reverse processes alongside a classifier-free guidance weight $\omega_1 = 2.5$.

At inference time, silent speech recognition (using pre-trained MONA-LISA ensembled with fine-tuned GPT-4) produces a predicted text transcript $\hat{t}$. A frozen audio-only ASR model (AVEC variant pre-trained on LRS2/LRS3) acts as a classifier evaluating conditional log-likelihoods log $p(\hat{t}|\mathbf{x}_t)$ during reverse diffusion steps ($t \le 270$). The gradients of this classifier are integrated into the noise estimate via classifier guidance scaled by weight $\omega_2 = 1.5$ with a normalization factor $\gamma_t$.

The model is trained using the Adam optimizer with an initial learning rate of $2 \times 10^{-4}$, a batch size of 8 per A6000 GPU, and an $\ell_1$ loss over 400 epochs with $T = 400$ diffusion steps and conditional dropout $p = 0.2$. Generated mel-spectrograms are converted to waveforms using a pre-trained HiFi-GAN vocoder.

## Experimental setup

Evaluated on the Gaddy & Klein dataset consisting of 8-channel monopolar EMG signals sampled at 1 kHz (resampled to 800 Hz) and audio at 16 kHz, containing 1,285 silent-voiced parallel pairs and 5,470 non-parallel voiced training utterances from a single subject. Compared against baselines including Gaddy and Klein, SU-ETS, diff-ETS, transduction models, and optimized EMG encoder configurations. Metrics include Word Error Rate (WER evaluated via Whisper-medium and DeepSpeech), Mean Absolute Error (MAE) in milliseconds for word/pause onset and offset timing, and Root Mean Square Error (RMSE) for frame-level log-mel energy contours. Implemented on NVIDIA A6000 GPUs.

## Results

GETS achieves a headline WER of 11.89% using Whisper-medium evaluation, slashing error rates by more than half compared to prior single-subject ETS baselines (e.g., Gaddy and Klein at 25.74%, SU-ETS at 26.29%, and diff-ETS at 32.1%). When evaluated via DeepSpeech, GETS attains a WER of 21.32%, outperforming Transduction (33.51%) and Optimized EMG Encoder models (35.4%). Ablation studies demonstrate that neutralizing EMG guidance ($\omega_1 = 0$) causes WER to spike to 18.81% (and up to 32.78% when both components degrade), while removing semantic guidance ($\omega_2 = 0$) degrades WER to 12.93%. Prosodic evaluations confirm strong temporal alignment and an energy contour RMSE of 0.437, which collapses heavily under EMG-shuffling (RMSE 1.185) compared to text-shuffling (RMSE 0.608), confirming that prosody is successfully anchored to the raw biosignals.

| Model | WER (%) (Whisper) | WER (%) (DeepSpeech) |
|---|---|---|
| Gaddy and Klein | 25.74 | - |
| SU-ETS | 26.29 | - |
| diff-ETS | 32.10 | - |
| Transduction Model | - | 33.51 |
| Optimized EMG Encoder | - | 35.40 |
| GETS (Ours) | **11.89** | **21.32** |

## Limitations

The framework is evaluated exclusively on a single-subject dataset (Gaddy & Klein dataset), leaving multi-speaker generalization untested. The reliance on pre-trained silent speech recognition (MONA-LISA) and external LLM/ASR pipelines introduces cascading dependency risks, and the evaluation is limited to clean, controlled laboratory silent speech without real-world noise variations.

## Why read this

Speech and ML researchers focusing on biosignal processing and guided diffusion should read this paper to learn how to inject classifier-based semantic guidance into non-acoustic generative pipelines without destroying underlying signal-derived prosody.

## Code

- https://jiwonlee-0218.github.io/GETS_demo-page/

## Applications

Assistive communication devices for individuals with severe speech or motor impairments, and silent speech interfaces for secure or private communications.

## Institutions / 機構

Seoul National University

**Funding / 經費:** National Research Foundation of Korea, Institute of Information & Communications Technology Planning & Evaluation, Ministry of Science and ICT, National IT Industry Promotion Agency

## Related

- (link related pages by id as the wiki grows)
