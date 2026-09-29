---
id: chen26s_interspeech
category: enhancement-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1816
pdf: https://www.isca-archive.org/interspeech_2026/chen26s_interspeech.pdf
---

# LLM-Guided Reinforcement Learning for Audio-Visual Speech Enhancement

*Chih-Ning Chen, Jen-Cheng Hou, Hsin-Min Wang, Shao-Yi Chien, Yu Tsao, Fan-Gang Zeng*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1816)

**Category:** `enhancement-separation`

**TL;DR** — The paper introduces LR-AVSE, an audio-visual speech enhancement framework that uses reinforcement learning guided by an audio Large Language Model and a sentiment analysis model to convert natural language speech quality descriptions into scalar rewards. Evaluated on the AVSEC-4 dataset, it outperforms supervised and DNSMOS-based RL baselines, achieving a PESQ of 1.25 and a 67.6% preference rate in subjective tests.

## Key contributions

- Proposes a novel RL-based AVSE training framework (LR-AVSE) guided by LLM-generated textual descriptions of speech quality converted into rewards via sentiment analysis.
- Replaces an auxiliary critic network with a simplified single-step PPO policy optimization using relative reward improvements over a base model.
- Demonstrates that semantic, LLM-based feedback provides better alignment with human perception than scalar-only regression models like DNSMOS.
- Achieves superior performance over pretrained supervised and DNSMOS-RL baselines across objective metrics (PESQ 1.25, STOI 0.58, NISQA 1.29) and human listening tests.

## Problem

Standard audio-visual speech enhancement models rely on mathematical objectives such as SI-SNR and MSE, which correlate poorly with human perception and introduce unnatural artifacts. While recent GAN or metric-based methods incorporate objectives like PESQ, they remain black-box scalar metrics that lack interpretability and fail to capture nuances in clarity, distortion, and background noise. Prior reinforcement learning approaches use acoustic metrics or direct preference optimization via neural MOS predictors, leaving a gap for semantically rich, explainable reward signals in audio-visual speech enhancement.

## Method

The base architecture uses an encoder-separator-decoder design from AVSEC-4, where audio waveforms and visual frames are encoded, fused via a Temporal Convolutional Network (TCN) backbone, and decoded using a predicted time-domain mask. To reformulate speech enhancement as a reinforcement learning problem, Gaussian noise with standard deviation sigma = 0.05 is injected into the deterministic mask to create a stochastic policy action space. The enhanced output and the pretrained base model output are both passed to a frozen audio LLM (SALMONN) prompted with 'Give me an assessment of the quality of this speech sample'. The resulting natural language description is fed into a BERT-based sentiment analysis model to yield a 1-5 rating score. A relative reward formulation computes the difference between the RL-policy score and base-policy score to stabilize optimization. The training objective combines a PPO clip loss (with clip range epsilon = 0.1, KL divergence penalty beta = 0.0001) and an SI-SNR pretraining loss weighted by gamma = 1.0. A critic network is omitted because each episode is a single-step decision and the relative reward already embeds baseline information.

## Experimental setup

Evaluated on the 4th COG-MHEAR Audio-Visual Speech Enhancement Challenge (AVSEC-4) dataset containing 34,524 training scenes, 3,365 validation scenes, and 3,180 test scenes with real recorded room impulse responses at distances of 1-2 meters. Audio signals are downsampled to 16 kHz binaural format. Compared against a Pretrained Baseline (supervised SI-SNR training only) and an RL-DNSMOS baseline (using DNSMOS predicted MOS scores instead of SALMONN+BERT). Metrics include PESQ (wideband), STOI, NISQA-predicted MOS, VQscore, SpeechBERTScore (S-BERT), and A/B subjective listening preference tests with 21 participants.

## Results

LR-AVSE achieves a PESQ of 1.25, outperforming the Pretrained Baseline (1.20) and RL-DNSMOS (1.24). On intelligibility and quality metrics, it reaches an STOI of 0.58, NISQA of 1.29 (vs 0.99 for baseline), VQscore of 0.62, and S-BERT of 0.57. In subjective A/B preference tests, LR-AVSE is preferred 96.7% of the time over the Pretrained Baseline and 67.6% over the RL-DNSMOS baseline. Ablations demonstrate that the LLM-derived sentiment reward consistently outperforms scalar DNSMOS rewards by providing richer guidance on noise reduction and distortion removal.

| Method | PESQ | STOI | NISQA | VQscore | S-BERT |
|---|---|---|---|---|---|
| Noisy | 1.08 | 0.55 | 0.97 | 0.58 | 0.55 |
| Baseline | 1.20 | 0.48 | 0.99 | 0.61 | 0.54 |
| RL-DNSMOS | 1.24 | 0.57 | 1.15 | 0.62 | 0.56 |
| LR-AVSE | 1.25 | 0.58 | 1.29 | 0.62 | 0.57 |

## Limitations

The current LLM reward model suffers from repetitive phrasing patterns (e.g., repeatedly generating phrases like 'The quality of this speech sample is poor/good'), which can limit its ability to capture subtle acoustic variations. The framework relies on a frozen, compute-heavy audio LLM (SALMONN) and sentiment analyzer (BERT), increasing inference-time evaluation overhead. Evaluation is restricted to the AVSEC-4 dataset configuration without extensive cross-dataset generalization tests on highly diverse, unseen acoustic languages.

## Why read this

Researchers building speech enhancement systems or applying RLHF to audio domains should read this paper to see how natural language descriptions from audio LLMs can replace black-box scalar reward functions for more perceptually aligned optimization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication systems, hearing aids, video conferencing software, and audio-visual speech restoration tools operating in noisy environments.

## Institutions / 機構

National Taiwan University, Academia Sinica, University of California Irvine

## Related

- (link related pages by id as the wiki grows)
