---
id: choudhury26_interspeech
category: deepfake-security
labels: [self-supervised, dataset-or-benchmark-release, robustness-noise]
institutions: ["IIIT-Delhi", "NTHU"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3500
pdf: https://www.isca-archive.org/interspeech_2026/choudhury26_interspeech.pdf
---

# Impact Analysis of Speech Representation Learning Models for Acoustic Side-Channel Attack

*Nitin Choudhury, Bikrant Bikram Pratap Maurya, Arun Balaji Buduru, Orchid Chetia Phukan*

[PDF](https://www.isca-archive.org/interspeech_2026/choudhury26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choudhury26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3500)

**Category:** `deepfake-security` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — This paper investigates the robustness of speech representation learning models for acoustic side-channel attacks (ASCA) on keyboards and introduces KEYAC, a multi-channel dataset capturing cross-device and VoIP codec variations. By replacing conventional classification heads with Kolmogorov-Arnold Networks (KAN), the proposed method establishes a new state-of-the-art, raising WavLM in-domain keyboard accuracy from 58.34% to 68.47%.

## Key contributions

- Introduces KEYAC, a public benchmark dataset comprising 37,440 keystroke samples across 37 keyboards captured via local laptop mics, smartphones, and real-time VoIP streaming pipelines (Zoom, Teams).
- Provides the first comprehensive evaluation of six speech pretrained models (Wav2Vec2, HuBERT, WavLM, Whisper, X-Vectors, XLS-R) for acoustic side-channel keystroke identification.
- Identifies a major vulnerability where conventional linear/convolutional adaptation layers fail under VoIP codec compression and cross-keyboard generalization.
- Proposes a KAN-based downstream fine-tuning strategy that explicitly models nonlinear feature interactions, consistently outperforming FCN and CNN adapters across all models and scenarios.

## Problem

Prior research on acoustic side-channel attacks (ASCA) typically relies on outdated hardware, small-scale custom datasets, and handcrafted spectral features evaluated solely under clean, in-domain conditions. Real-world adversaries, however, must attack passwords and confidential messages transmitted over VoIP conference platforms (like Zoom or Teams) or typed on diverse, unseen physical keyboards. This creates two critical research gaps: the absence of a standardized dataset capturing realistic codec and device variability, and the unknown capability of modern speech pretrained models to generalize under these severely distorted acoustic environments.

## Method

The authors evaluate six frozen speech representation backbones extracting fixed-dimensional embeddings: Wav2Vec2 (768-d), HuBERT (768-d), WavLM (768-d), XLS-R (1024-d), X-Vectors (512-d), and Whisper encoder (512-d), all operating on 16 kHz audio. Baseline downstream architectures consist of a Fully Connected Network (FCN) with 90 hidden neurons and a Convolutional Neural Network (CNN) comprising two convolutional blocks with kernel size 3 and max pooling. To better capture complex spectral-temporal distortions induced by VoIP compression, the authors replace these traditional heads with a Kolmogorov-Arnold Network (KAN) adapter containing a single hidden KAN layer of 30 units, a grid size of 5, and a spline order of 3 (using B-splines to parameterize learnable univariate functions along network connections).

Models are optimized using AdamW with binary/categorical cross-entropy loss for 20 epochs, a batch size of 16, and a learning rate of 2.2e-4, incorporating dropout and early stopping. Evaluation protocols include 5-fold cross-validation for in-domain (ID) setups, and out-of-domain (OOD) scenarios involving keyboard holdouts (unseen keyboards) and codec generalization (training on clean audio, testing on VoIP streams).

## Experimental setup

Evaluated on the KEYAC dataset containing 37,440 keystrokes from 37 keyboards evenly divided across laptop mics, smartphones, and VoIP pipelines. Compares six speech PTMs across three downstream architectures (FCN, CNN, and KAN). Performance is measured using Accuracy (%) and Macro-F1 (mF1) across in-domain and out-of-domain cross-validation splits.

## Results

Under standard in-domain conditions with a CNN downstream, WavLM achieves the strongest baseline performance with 58.34% accuracy and 56.92% mF1, while HuBERT and XLS-R lag significantly at 36.27% and 33.45% accuracy, respectively. Across all backbones, traditional FCN and CNN architectures suffer an 8-10% drop under keyboard holdout OOD settings, and performance degrades drastically under VoIP codec distortions (e.g., WavLM CNN drops to 44.12% ID and 35.86% OOD).

Replacing standard heads with the proposed KAN-based downstream consistently elevates performance across every model and setting. Using WavLM with KAN pushes in-domain standard keyboard accuracy to 68.47% (67.12% mF1), maintains 61.73% accuracy under keyboard OOD, and achieves 58.36% accuracy under codec generalization. KAN proves especially resilient under VoIP conditions, lifting WavLM VoIP accuracy from 44.12% up to 57.82%.

| System / Condition | Standard ID (Acc/mF1) | Standard OOD (Acc/mF1) | VoIP ID (Acc/mF1) | VoIP OOD (Acc/mF1) | Codec Gen ID (Acc/mF1) |
|---|---|---|---|---|---|
| WavLM + CNN (Baseline) | 58.34 / 56.92 | 49.47 / 48.16 | 44.12 / 42.73 | 35.86 / 34.54 | 45.21 / 43.86 |
| Whisper + CNN (Baseline) | 48.73 / 47.41 | 39.96 / 38.54 | 35.64 / 34.31 | 27.54 / 26.21 | 36.47 / 35.14 |
| WavLM + FCN (Baseline) | 55.81 / 54.36 | 46.94 / 45.52 | 40.35 / 39.02 | 32.48 / 31.14 | 41.72 / 40.41 |
| WavLM + KAN (Proposed) | 68.47 / 67.12 | 61.73 / 60.34 | 57.82 / 56.41 | 50.91 / 49.56 | 58.36 / 57.04 |
| Whisper + KAN (Proposed) | 65.74 / 64.39 | 59.12 / 57.83 | 54.83 / 53.46 | 48.92 / 47.63 | 55.63 / 54.28 |

## Limitations

The study is restricted to 37 distinct keyboards and specific VoIP pipelines (Zoom and Teams), meaning generalizability to broader hardware profiles (e.g., mechanical keyboards with custom switches) and different telecommunication platforms or variable bitrates remains untested. Furthermore, absolute accuracy values even with KAN remain under 70%, indicating that standard speech PTMs—originally optimized for phonetic or semantic content rather than ultra-short impulsive mechanical transients—still face inherent representation bottlenecks.

## Why read this

Security researchers and speech engineers working on audio-based side-channel vulnerabilities or robust adaptation techniques will find this paper vital for understanding how SSL representations behave under heavy compression artifacts. It offers a clear blueprint for substituting traditional multi-layer perceptrons with Kolmogorov-Arnold Networks to unlock nonlinear feature interactions in resource-constrained downstream setups.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Acoustic side-channel attack security auditing, threat modeling for remote meeting software, and robust fine-tuning of pretrained speech models for transient sound event classification.

## Institutions / 機構

IIIT-Delhi, NTHU

## Related

- [What Do Deepfake Speech Detectors Actually Hear?](stanek26_interspeech.md) — shared technique · relatedness 1.8/3
- [InsideSSL: Understanding Self-Supervised Speech Representations using a Model-Centric Perspective](sadok26_interspeech.md) — shared technique · relatedness 1.8/3
- [Who Synthesized This? Joint Deepfake Detection and Generative Source Attribution](kumar26f_interspeech.md) — shared technique · relatedness 1.8/3
- [Evidence Subspace Projection: Measuring How Much Evidence Explains Deepfake Detection in Self-Supervised Speech Models](xiao26c_interspeech.md) — same problem · relatedness 1.8/3
- [The First Environmental Sound Deepfake Detection Challenge: Benchmarking Robustness, Evaluation, and Insights](yin26_interspeech.md) — shared data / evaluation · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
