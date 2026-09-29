---
id: elsetohy26_interspeech
category: deepfake-security
labels: [multilingual, dataset-or-benchmark-release, generative-model]
institutions: ["Mohamed bin Zayed University of Artificial Intelligence", "Queen's University", "University of Waterloo"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2665
pdf: https://www.isca-archive.org/interspeech_2026/elsetohy26_interspeech.pdf
---

# ArFake: A Robust Framework for Multi-Dialect Arabic Speech Spoofing Detection Benchmark

*Mohamed Elsetohy, Alhassan Ehab, Ali Mekky, Besher Hassan, Shady Shehata*

[PDF](https://www.isca-archive.org/interspeech_2026/elsetohy26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/elsetohy26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2665)

**Category:** `deepfake-security` · **Labels:** `multilingual`, `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — ARFAKE is an end-to-end framework and benchmark for multi-dialect Arabic audio deepfake generation and detection, spanning eight dialects and four TTS systems with evaluation reaching up to 98.30% accuracy on unseen generators.

## Key contributions

- A five-phase pipeline spanning synthetic speech generation, intelligibility measurement, dataset construction, detector training, and robustness evaluation.
- A large-scale multi-dialect Arabic spoofed speech dataset comprising 54,413 utterances derived from the Casablanca corpus and three open-source TTS engines.
- Rigorous evaluation protocols establishing performance baselines under in-domain, leave-one-generator-out (LOGO), and leave-one-dialect-out (LODO) conditions.
- Comprehensive cross-generator and cross-dialect benchmarking showing that pretrained embedding models (Whisper-large/small) outperform traditional MFCC-SVM baselines.

## Problem

Audio deepfakes pose severe security risks via voice phishing and impersonation, yet anti-resilience literature remains heavily concentrated on high-resource languages like English. Arabic is particularly vulnerable due to uneven speech technology performance, complex morphology, non-standard orthography, and extreme dialectal diversity. Prior datasets either lack broad multi-dialect coverage or fail to provide comprehensive cross-generator evaluation protocols.

## Method

The ARFAKE framework processes speech from the Casablanca multi-dialectal corpus (covering 8 dialect regions, ~6 hours per region) through four distinct TTS engines: XTTS-v2, FishSpeech, ArTST, and VITS. Intelligibility and perceptual quality are evaluated using classifier separation, Whisper-large ASR Word Error Rate (WER) as a consistency diagnostic, and human Mean Opinion Scores (MOS). For detector training, a curated dataset of 54,413 utterances (30.43% bona fide, 69.57% spoofed from FishSpeech, XTTS-v2, and ArTST) is used to feed pretrained speech embedding extractors (HuBERT-base, Whisper-small, Whisper-large, wav2vec2.0) topped with a two-layer feed-forward classifier head utilizing ReLU activation and 0.5 dropout, trained via Adam optimizer at a learning rate of 1e-3. VITS is explicitly held out for Leave-One-Generator-Out (LOGO) zero-shot evaluation, while Leave-One-Dialect-Out (LODO) protocols test cross-dialect robustness.

The framework intentionally pairs zero-shot deep embedding models with traditional MFCC-based machine learning baselines (SVM, Random Forest, Extra Trees, Logistic Regression) to contrast raw acoustic artifacts against high-level semantic-acoustic representations. Gating protocols via ASR WER and MOS ensure that synthetic data anomalies do not trivially inflate detection metrics without realistic intelligibility.

## Experimental setup

The dataset contains 54,413 total utterances (31,302 train/val, 23,111 test), incorporating 70% of bona fide speech and varying proportions of FishSpeech (70%), XTTS-v2 (50%), and ArTST (40%). Baselines compared include classical ML classifiers (SVM, Logistic Regression, KNN, Decision Tree, Random Forest, Gradient Boosting, AdaBoost, Extra Trees, Naive Bayes) using MFCC features, alongside deep embedding models (HuBERT-base, wav2vec2.0, Whisper-small, Whisper-large) and RawNet2. Primary metrics are Equal Error Rate (EER %) and Accuracy (ACC %), complemented by ASR WER and 1-5 scale human MOS evaluations.

## Results

On the combined ARFAKE test set, Whisper-large achieved the best performance with an EER of 4.88% and 96.86% accuracy, outperforming Whisper-small (5.42% EER, 96.56% ACC) and HuBERT-base (7.96% EER, 96.11% ACC), while the MFCC-SVM baseline lagged at 10.76% EER. Under the unseen VITS generator evaluation (LOGO), Whisper-small and Whisper-large generalized exceptionally well, yielding 98.30% and 97.94% accuracy respectively, despite VITS audio exhibiting high ASR error rates (110.90% WER). In cross-dialect (LODO) evaluation using Whisper-large, accuracy remained robust across all eight Arabic variants, peaking at 93.51% for the Moroccan (MR) dialect and reaching its lowest point at 88.45% for the Palestinian (PS) dialect. Human MOS tests indicated FishSpeech generated the most natural-sounding speech (3.72 average MOS) while ArTST (1.93) and VITS (1.70) scored lowest.

| System / Condition | EER (%) ↓ | ACC (%) ↑ |
|---|---|---|
| HuBERT-base (Combined Test) | 7.96 | 96.11 |
| Whisper-small (Combined Test) | 5.42 | 96.56 |
| Whisper-large (Combined Test) | 4.88 | 96.86 |
| MFCC-SVM (Combined Test) | 10.76 | 92.08 |
| Whisper-small (Unseen VITS) | - | 98.30 |
| Whisper-large (Unseen VITS) | - | 97.94 |

## Limitations

The framework's evaluation is currently bounded by the eight specific dialects present in the Casablanca corpus, leaving other regional Arabic variants unverified. While zero-shot generalization to VITS was tested, broader robustness against modern commercial zero-shot voice cloning architectures and unseen in-the-wild acoustic conditions requires further validation. The dataset size (approx. 54k utterances) is modest compared to massive English anti-spoofing benchmarks, and human MOS evaluations were limited to a cohort of 12 native speakers.

## Why read this

Speech security researchers and engineers building anti-spoofing systems for low-resource or dialectal languages should read this paper to adopt its comprehensive multi-generator and multi-dialect evaluation pipeline. It provides clear empirical evidence on how pretrained representations like Whisper and HuBERT generalize to unseen TTS generators across fragmented dialectal domains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio deepfake detection, speech security systems, telecommunication fraud prevention, and automated multi-dialect verification.

## Institutions / 機構

Mohamed bin Zayed University of Artificial Intelligence, Queen's University, University of Waterloo

## Related

- (link related pages by id as the wiki grows)
