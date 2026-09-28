---
id: yang26b_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-259
pdf: https://www.isca-archive.org/interspeech_2026/yang26b_interspeech.pdf
---

# Enroll-on-Wakeup: A First Comparative Study of Target Speech Extraction for Seamless Interaction in Real Noisy Human-Machine Dialogue Scenarios

[PDF](https://www.isca-archive.org/interspeech_2026/yang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-259)

**TL;DR** — This paper introduces the Enroll-on-Wakeup (EoW) target speech extraction paradigm, using a naturally captured wake-word segment as the speaker enrollment reference to enable seamless human-machine interaction.

## Problem

Traditional target speech extraction systems require a pre-recorded, clean enrollment sample from the user, which severely disrupts the spontaneity of human-machine dialogues. In real scenarios, relying instead on a transient wake-word segment introduces severe acoustic contamination, limited duration (around 1.0s), and information scarcity, leading to a major degradation in extraction performance.

## Method

The study evaluates four advanced TSE architectures: three discriminative models (SEF-PNet, LExt, and CIE-mDPTNet) and one generative model (SoloSpeech). To overcome enrollment corruption, the authors investigate LLM-based zero-shot text-to-speech models (IndexTTS2, xTTS, and CosyVoice3) for enrollment augmentation through Clean Re-synthesis (CR) and Extended Concatenation (EC). Discriminative models are trained on Libri2Mix train-100 subsets, while SoloSpeech utilizes its pretrained checkpoint. Evaluation spans five real-world recording scenarios featuring varying speaker distances (1m to 3m), reverberation times (RT60 of 0.4s to 0.6s), and SNRs (5dB and 10dB) under complex background TV noise and interfering speakers.

## Results

On the Libri2Mix 2-speaker plus noise baseline, LExt achieves an SI-SDR of 10.47 dB and PESQ of 1.88, while SoloSpeech attains an SI-SDR of 11.12 dB and PESQ of 1.89. In real-world EoW-TSE evaluations, generative models like SoloSpeech excel in perceptual quality (DNSMOS) but suffer from severe word error rate (WER) degradation under complex acoustic conditions. Conversely, discriminative models like CIE-mDPTNet maintain better ASR robustness. LLM-based TTS enrollment augmentation significantly enhances listening quality, though a performance gap in speech recognition accuracy remains.

## Code

- https://github.com/Yym-line/EoW-TSE

## Applications

Engineers building voice-controlled smart assistants, conversational agents, and edge devices can use this framework to eliminate manual voice enrollment steps for users.

## Limitations

Current TSE models under the EoW paradigm fail to outperform the raw noisy mixture's direct WER in difficult far-field and reverberant conditions, highlighting an ongoing tradeoff between perceptual enhancement and ASR intelligibility.

## Related

- (link related pages by id as the wiki grows)
