---
id: chang26b_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1125
pdf: https://www.isca-archive.org/interspeech_2026/chang26b_interspeech.pdf
---

# A Two-Stage Defence for Robust Federated Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/chang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1125)

**TL;DR** — This paper proposes a two-stage federated adversarial learning framework for speech emotion recognition that preserves data privacy while significantly improving model robustness against white-box adversarial attacks.

## Problem

Speech emotion recognition (SER) models are increasingly deployed on edge devices to process sensitive health and paralinguistic data, creating severe privacy risks if raw data is pooled centrally. At the same time, deep neural networks used in SER are highly vulnerable to human-indistinguishable adversarial perturbations, which can maliciously flip emotion predictions or compromise mental health pre-screening. While federated learning (FL) safeguards data privacy by keeping training sets decentralised, vanilla FL models remain exposed to adversarial manipulation during both training and inference stages.

## Method

The proposed framework integrates federated learning with a two-stage defence pipeline combining training-time adversarial training and test-time randomisation. Raw speech signals are pre-processed into log Mel spectrograms locally on client devices, avoiding raw data transmission to the central server. During training, clients update local models using adversarial training to withstand perturbations, while parameter updates are aggregated globally via federated averaging. At inference time, a randomisation module introduces input transformations (resizing and padding) on log Mel spectrograms to neutralize iterative adversarial attacks.

## Results

The evaluation demonstrates that combining adversarial training with test-time randomisation within a federated framework consistently outperforms vanilla federated learning and single-stage defences across white-box attacks including Fast Gradient Sign Method (FGSM), Projected Gradient Descent (PGD), and DeepFool. The two-stage defense successfully mitigates both single-step and iterative attacks without requiring centralized data pooling. Ablation comparisons confirm that integrating randomisation with adversarial training yields superior robustness compared to adversarial training alone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building privacy-sensitive voice assistants, smart edge devices, and automated mental health monitoring tools where user data confidentiality and resistance to malicious audio spoofing are critical.

## Related

- (link related pages by id as the wiki grows)
