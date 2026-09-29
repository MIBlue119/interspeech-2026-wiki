---
id: kheir26_interspeech
category: deepfake-security
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1366
pdf: https://www.isca-archive.org/interspeech_2026/kheir26_interspeech.pdf
---

# DeepFense: A Unified, Modular, and Extensible Framework for Robust Audio Deepfake Detection

*Yassine El Kheir, Arnab Das, Yixuan Xiao, Xin Wang, Feidi Kallel, Enes Erdem Erdogan, Ngoc Thang Vu, Tim Polzehl, Sebastian Möller*

[PDF](https://www.isca-archive.org/interspeech_2026/kheir26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kheir26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1366)

**Category:** `deepfake-security` · **Labels:** `self-supervised`

**TL;DR** — DeepFense is an open-source PyTorch toolkit for speech deepfake detection that unifies over 100 recipes and 400 pre-trained models. A large-scale evaluation of 96 systems across 13 datasets reveals that self-supervised front-end selection and training data composition dominate performance variance and fairness gaps.

## Key contributions

- Introduces a pure Python/PyTorch configuration-driven deepfake detection framework using YAML orchestration and a registry-based plugin architecture.
- Releases 152 unique YAML recipes and 456 pre-trained model checkpoints covering speech, singing voice, environmental audio, and music deepfake detection.
- Conducts a massive empirical evaluation covering 96 systems (4 front-ends × 4 back-ends × 6 training sets) across 13 diverse evaluation benchmarks.
- Performs a multi-axis fairness study evaluating audio quality, speaker gender, and cross-lingual performance disparities across 23 languages using the GARBE metric.

## Problem

Speech deepfake detection research is severely fragmented, with disparate implementations of feature front-ends, back-end classifiers, and augmentation pipelines scattered across isolated repositories. This methodological fragmentation makes it difficult to isolate true algorithmic contributions from implementation artifacts, hinders reproducibility, and obscures severe underlying biases regarding audio quality, gender, and language.

## Method

DeepFense is structured around a modular pipeline consisting of a YAML Configuration Orchestrator, Data Foundry, DeepFense Engine, and Trainer. The Data Foundry executes a four-stage pipeline (Construct via Parquet metadata, Transform for padding/resampling, Augment for sequential/parallel stochastic distortions, and Dataset loading into PyTorch DataLoaders). The DeepFense Engine modularly composes a Feature Front-end (e.g., Wav2Vec2, WavLM, HuBERT, EAT, MERT, Whisper, BEATs, Wav2Vec2-BERT, used frozen, fine-tuned, or via weighted-sum aggregation), a Back-end classifier (AASIST, ECAPA-TDNN, RawNet2, Nes2Net, TCM, MLP, Pool, BiCrossMamba-ST), and a Loss function (Cross-Entropy, OC-Softmax, AM-Softmax, A-Softmax). Optimization uses the Adam optimizer with a learning rate of 10^-6, early stopping on validation loss, and inputs padded or cropped to 4 seconds at 16 kHz.

The framework relies on a decorator-based plugin architecture (@REGISTRY.register) enabling seamless addition of custom components entirely through configuration changes without altering core source code. Pre-trained weights are natively loaded from Hugging Face, Fairseq, and Unilm. Logging and experiment tracking are natively integrated with Weights & Biases and TensorBoard.

## Experimental setup

Evaluated on 13 test sets across English (ASVspoof 2019, ASVspoof 2021 LA/DF, In-the-Wild, CodecFake, ReplayDF), Multilingual (MLAAD, ODSS), Chinese (ADD22-1/2, ADD23-1/2), and Spanish (HABLA), plus non-speech datasets (EnvSDD, CompSpoof, FakeMusicCaps, CtrSVDD). Models comprise 96 core system configurations trained with 3 random seeds (2, 42, 240) using Cross-Entropy loss and Adam optimizer (lr=10^-6). Metrics focus on Equal Error Rate (EER) and Gini Aggregation Rate for Biometric Equitability (GARBE).

## Results

Wav2Vec2 achieved the lowest macro-average EER of 25.5% across speech benchmarks, outperforming EAT (31.4%), WavLM (32.4%), and HuBERT (33.6%). Back-end choice had a negligible impact, with a spread of less than 1% between AASIST (30.3%) and MLP (31.1%). Training set generalization varied drastically: CodecFake yielded the best macro-average EER (22.3% with low variance), whereas ADD23-trained models catastrophically failed to generalize (50.8% EER). For non-speech audio, general-audio pre-trained EAT dominated music/environmental detection (16.9% avg EER, near 0.2% EER on FakeMusicCaps), while Wav2Vec2 excelled at singing voice detection (8.8% EER).

In fairness evaluations, EAT consistently achieved superior audio quality fairness (lowest GARBE scores) despite higher average EER, revealing a clear performance-fairness trade-off. Gender and language biases directly mirrored training corpus distributions, such as an 80.9% female skew in CodecFake inverting the gender error gap from female-disadvantaged to male-disadvantaged.

| System Configuration | Training Set | Macro-Avg EER (%) |
| :--- | :--- | :--- |
| Wav2Vec2 + MLP | CodecFake | 17.16 |
| Wav2Vec2 + AASIST | CodecFake | 17.20 |
| Wav2Vec2 + Nes2Net | CodecFake | 18.20 |
| Wav2Vec2 + AASIST | ASV19 | 20.16 |
| EAT + BiCrossMamba-ST | EnvSDD (CodecFake-A3 test) | 0.44 |

## Limitations

The current framework lacks a multi-dataset joint training pipeline to simultaneously leverage complementary knowledge across corpora without inheriting conflicting biases. Detection is currently the sole supported task, leaving out partial deepfake localization and source attribution tracing. Furthermore, training datasets exhibit severe demographic and qualitative imbalances that inherently propagate into deployed model biases.

## Why read this

Speech and ML engineers building or auditing deepfake detectors should read this to understand that front-end selection and training dataset composition vastly outweigh back-end architectural tuning, while exposing critical, often-overlooked fairness trade-offs across audio quality, gender, and language.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-world voice biometric security, synthetic speech moderation in communication platforms, and trustworthy verification systems across telephony and media streaming.

## Institutions / 機構

German Research Center for Artificial Intelligence, University of Stuttgart, National Institute of Informatics, Technical University of Berlin

**Funding / 經費:** Federal Ministry of Research, Technology and Space, Investitionsbank Berlin, JST PRESTO

## Related

- (link related pages by id as the wiki grows)
