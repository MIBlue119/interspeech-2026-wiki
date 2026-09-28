---
id: yang26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-127
pdf: https://www.isca-archive.org/interspeech_2026/yang26_interspeech.pdf
---

# Multi-Channel Differential ASR for Robust Wearer Speech Recognition on Smart Glasses

[PDF](https://www.isca-archive.org/interspeech_2026/yang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-127)

**TL;DR** — This paper proposes a multi-channel differential automatic speech recognition system for smart glasses that combines a beamformer, microphone selection, and a lightweight side-talk detector, achieving up to an 18.0% relative reduction in word error rate on side-talk speech.

## Problem

Wearer speech recognition on open-field wearable devices like smart glasses is highly vulnerable to bystander side-talk interference, which degrades transcription accuracy and cascades errors into downstream natural language processing tasks. Traditional frontend enhancement methods often introduce unacceptable latency or violate user privacy by explicitly modeling speaker identity.

## Method

The proposed differential ASR architecture combines a modified minimum variance distortionless response (MVDR) beamformer directed at the wearer's mouth, a microphone selection module choosing the highest-SNR nose microphone channel, and a ~2M-parameter streaming temporal convolutional network for privacy-preserving side-talk detection (STD). The frontends are frozen, and their outputs—log-Mel features from the beamformer and selected mic, along with STD logit embeddings—are concatenated and fed into a 70M-parameter Emformer-RNN-T streaming ASR backbone. The system operates with a 120 ms latency and is trained on multi-channel simulated LibriSpeech mixtures using 32 NVIDIA H100 GPUs.

## Results

Evaluated on simulated LibriSpeech datasets and a real recorded dataset captured using a head and torso simulator (HATS) with loudspeakers spanning 72 distinct spatial positions (varying angles, heights, and distances), the full system (ch-x + ch-0 + embed) achieves an average relative word error rate reduction (WERR) of up to 18.0% over the noisy-trained single-channel beamformer baseline. On clean evaluation data, the proposed noisy-trained differential model achieves a 6.29% WER, slightly outperforming the clean-trained baseline (6.30% WER). Ablations demonstrate that combining both microphone selection and side-talk embeddings yields complementary spatial and contrastive cues, outperforming configurations using either frontend alone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building speech-based AI assistants and conversational interfaces for smart glasses and other wearable hardware.

## Limitations

Performance varies across specific spatial angles (with 270°, 315°, and 0° overlap conditions posing higher difficulty), and the current side-talk detection model is evaluated primarily for single-bystander scenarios.

## Related

- (link related pages by id as the wiki grows)
