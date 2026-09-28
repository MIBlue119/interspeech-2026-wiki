---
id: chen26s_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1816
pdf: https://www.isca-archive.org/interspeech_2026/chen26s_interspeech.pdf
---

# LLM-Guided Reinforcement Learning for Audio-Visual Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/chen26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1816)

**TL;DR** — This paper proposes LR-AVSE, an audio-visual speech enhancement framework optimized via reinforcement learning using an LLM-derived text feedback reward, achieving superior objective scores and a 96.7% subjective preference over supervised baselines.

## Problem

Conventional audio-visual speech enhancement models rely heavily on numerical loss functions like SI-SNR or MSE, which correlate poorly with human perception and create a gap between optimization targets and actual listening quality. While scalar-based neural metric models attempt to bridge this gap, they lack interpretability regarding why specific enhancements succeed or fail. Providing semantic feedback helps guide models toward producing genuinely natural-sounding speech rather than merely optimizing black-box numbers.

## Method

The framework utilizes an encoder-separator-decoder architecture based on a Temporal Convolutional Network (TCN) that fuses audio and visual cues to predict time-domain masks. To reformulate speech enhancement as a reinforcement learning problem, the deterministic mask outputs are injected with Gaussian noise to create a stochastic policy. A frozen audio LLM (SALMONN) generates natural language descriptions of enhanced speech quality, which a sentiment analysis model (BERT) then converts into 1–5 scalar ratings to compute a relative reward against the base model. The policy is optimized using Proximal Policy Optimization (PPO) combined with an SI-SNR loss, eliminating the need for a separate critic network due to the relative reward structure.

## Results

Evaluated on the 4th COG-MHEAR Audio-Visual Speech Enhancement Challenge (AVSEC-4) test set, LR-AVSE achieves a PESQ of 1.25, STOI of 0.58, NISQA MOS of 1.29, VQscore of 0.62, and SpeechBERTScore of 0.57, outperforming both the supervised pretrained baseline (PESQ 1.20) and a DNSMOS-based RL baseline (PESQ 1.24). In an A/B preference test with 21 participants across 10 utterances each, LR-AVSE was preferred in 96.7% of comparisons against the pretrained baseline and 67.6% against the RL-DNSMOS baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building real-time communication systems, hearing aids, or robust Automatic Speech Recognition (ASR) front-ends in noisy multi-modal environments.

## Related

- (link related pages by id as the wiki grows)
