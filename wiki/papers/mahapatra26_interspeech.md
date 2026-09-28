---
id: mahapatra26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-831
pdf: https://www.isca-archive.org/interspeech_2026/mahapatra26_interspeech.pdf
---

# ProSDD: Learning Prosodic Representations for Speech Deepfake Detection against Expressive and Emotional Attacks

[PDF](https://www.isca-archive.org/interspeech_2026/mahapatra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mahapatra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-831)

**TL;DR** — ProSDD introduces a two-stage training framework that incorporates speaker-conditioned prosodic variation into self-supervised speech representations, reducing ASVspoof 2024 EER from 39.62% to 7.38% under 2024 training.

## Problem

Current speech deepfake detection systems often overfit to spoof-heavy training data and dataset-specific artifacts, causing their performance to degrade severely on out-of-domain expressive and emotional synthetic attacks. While humans detect deepfakes by recognizing deviations from natural prosodic and speaker-level variability, deepfake detectors typically rely on classification objectives that ignore these structural cues. This makes generalization to advanced emotional text-to-speech and voice conversion systems difficult.

## Method

The method uses a pretrained XLS-R backbone trained in two stages. Stage I fine-tunes the model exclusively on real speech (LibriSpeech train-clean-100) using a supervised masked prediction objective, predicting 448-dimensional targets combining a 192-dimensional ECAPA-TDNN speaker embedding and a 256-dimensional prosody embedding (pitch F0, voice activity, energy) via an InfoNCE contrastive loss. Stage II initializes weights from Stage I and jointly optimizes spoof classification with an auxiliary masked prosodic prediction task using a two-pass training strategy. The classification pass feeds mean-pooled unmasked Transformer representations into a lightweight classifier consisting of two linear layers with dropout and ReLU. Training uses batch size 64 for 50 epochs with RawBoost data augmentation.

## Results

Evaluated on ASVspoof 2019 LA, ASVspoof 2021 LA, ASVspoof 2024, EmoFake, and EmoSpoof-TTS against baselines including RawNet2, AASIST, and XLSR-SLS. When trained on ASVspoof 2019 LA, ProSDD achieves EERs of 0.42% (ASVspoof 2019), 3.87% (ASVspoof 2021), 16.14% (ASVspoof 2024), 3.70% (EmoFake), and 9.54% (EmoSpoof-TTS), outperforming XLSR-SLS (which scored 0.56%, 3.04%, 25.43%, 8.84%, and 18.92% respectively). When trained on ASVspoof 2024, ProSDD reduces the ASVspoof 2024 EER from 39.62% (XLSR-SLS baseline) down to 7.38%, while cutting EmoFake EER from 58.57% to 19.04%. Ablations demonstrate that removing both real-only pretraining and masked prediction severely impairs generalizability across all benchmarks.

## Code

- https://prosdd.github.io/ProSDD_website/

## Applications

Speech/ML engineers building robust audio security and anti-spoofing systems deployed against modern emotional and expressive text-to-speech or voice conversion attacks.

## Limitations

The framework requires a two-stage training pipeline and auxiliary prosodic feature extraction during training.

## Related

- (link related pages by id as the wiki grows)
