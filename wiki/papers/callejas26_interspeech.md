---
id: callejas26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2352
pdf: https://www.isca-archive.org/interspeech_2026/callejas26_interspeech.pdf
---

# MultiLinguahah : A New Unsupervised Multilingual Acoustic Laughter Segmentation Method

*Sofia Callejas, Nahuel Gomez, Catherine Pelachaud, Brian Ravenet, Valentin Barriere*

[PDF](https://www.isca-archive.org/interspeech_2026/callejas26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/callejas26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2352)

**TL;DR** — MultiLinguahah is an unsupervised multilingual laughter segmentation method that bypasses manual annotations by combining energy-based audio segmentation, self-supervised BYOL-A audio encoding, and Isolation Forest anomaly detection, outperforming English-centric supervised baselines in diverse cross-lingual and in-the-wild settings.

## Key contributions

- Proposes a fully unsupervised laughter segmentation pipeline framing the task as anomaly detection over energy-segmented audio sequences.
- Leverages self-supervised non-semantic audio representations (BYOL-A) combined with Isolation Forest to exploit universal acoustic patterns of laughter across languages.
- Evaluates extensively across 4 datasets (StandUp4AI, AudioSet, Friends, Kuznetsova) spanning stand-up comedy in 7+ languages, sitcom TV shows, and YouTube clips.
- Demonstrates robustness against domain shifts and varying background noise, especially for longer laughter durations where ASR-pretrained supervised models degrade.

## Problem

Automatic laughter detection and temporal segmentation typically require large amounts of meticulous manual timestamp annotations, which are expensive and scarce outside of US English contexts. Existing state-of-the-art deep learning methods (such as those by Gillick et al. and Omine et al.) rely heavily on supervised training or English-centric Automatic Speech Recognition (ASR) backbones like wav2vec 2.0. Consequently, these models suffer severe performance degradation when applied to multilingual settings, diverse acoustic environments, heavy background noise, or cross-cultural variations where speech and laughter distributions differ from standard US training corpora.

## Method

The MultiLinguahah pipeline begins with a pre-processing voice removal stage. For studio-recorded TV shows with clean channel separation (e.g., the Friends dataset), non-voice audio is isolated via channel subtraction following FunnyNet protocols. For in-the-wild monophonic recordings (e.g., StandUp4AI), an off-the-shelf convolutional neural network source separation model is used to strip out direct human speech signals, leaving background ambience, music, and laughter.

Next, an energy-based peak detector (Auditok) segments the non-speech audio waveform into distinct temporal events using a waveform energy threshold set to filter out subtle background noise. Each segmented event is then transformed into a dense embedding vector using a pre-trained BYOL-A (Bootstrap Your Own Latent for Audio) self-supervised encoder. BYOL-A is initialized with weights pre-trained on AudioSet (approx. 5,455 hours across 1.96M segments) and FSD50K (80 hours), with additional domain adaptation performed via unsupervised pre-training on target unlabelled training splits (batch size 128, learning rate 0.0001, 100 epochs, seed 42).

Finally, an Isolation Forest model with its contamination parameter set to 'auto' acts as the anomaly detector. Because background music and environmental noises fluctuate randomly across domains while human laughter exhibits consistent, universal acoustic properties across cultures, the Isolation Forest treats non-laughter acoustic disturbances as anomalies or vice versa, cleanly segmenting laughter events without requiring task-specific manual labels.

## Experimental setup

Evaluated on four public and extended datasets: StandUp4AI (100 test videos, 8.53 hours, 3,453 laughter events across 7 languages), AudioSet (724 test videos, 1,252 artificial laughter instances), Friends (Season 3 episodes 21-25, ~10 hours, 924 laughter instances), and Kuznetsova (stand-up in US English and Russian, 1.18 hours, 617 instances). Baselines compared include Gillick et al. (supervised ResNet), Omine et al. (fine-tuned wav2vec 2.0 with data-augmented synthesis), and Liu et al. (FunnyNet unsupervised K-means clustering). Metrics include Recall and F1-score at Intersection over Union (IoU) thresholds of 0.3 (interval detection) and 0.7 (temporal segmentation). All experiments were run in PyTorch and scikit-learn on an NVIDIA GeForce RTX 2080.

## Results

MultiLinguahah demonstrates superior cross-lingual robustness compared to supervised baselines. While Omine et al. dominates US English stand-up and YouTube benchmarks (achieving an F1 of 0.679 at IoU=0.3 on stand-up), its performance drops severely on TV shows (F1=0.189 at IoU=0.3) due to long laughter segments and distribution shifts. In contrast, MultiLinguahah achieves an F1 of 0.910 at IoU=0.3 and 0.735 at IoU=0.7 on US TV shows, outperforming Liu et al. (0.503) and Omine (0.054).

In non-English settings, MultiLinguahah or its hybrid variant consistently wins across Spanish, French, Italian, Czech, Hungarian, and Russian. For example, in Hungarian (HU) stand-up, MultiLinguahah reaches an F1 of 0.796 at IoU=0.3 (vs. Omine's 0.706 and Gillick's 0.578), and in Italian (IT) achieves an F1 of 0.507 at IoU=0.3. Ablations show that BYOL-A encoder outperforms wav2clip on complex TV show and YouTube environments. MultiLinguahah struggles primarily on Portuguese (PT) stand-up where Liu et al.'s clustering baseline performs best (F1 0.402 vs 0.393), and on general short YouTube audio where dataset artificiality limits unsupervised audio anomaly separation.

| System / Condition | Language | Domain | F1 (IoU=0.3) | F1 (IoU=0.7) |
|---|---|---|---|---|
| Omine et al. [13] | US EN | Stand-up | 0.679 | 0.356 |
| MultiLinguahah (Ours) | US EN | TV Show | 0.910 | 0.735 |
| Omine et al. [13] | HU | Stand-up | 0.706 | 0.376 |
| MultiLinguahah (Ours) | HU | Stand-up | 0.796 | 0.501 |
| MultiLinguahah (Ours) | CS | Stand-up | 0.585 | 0.301 |

## Limitations

The method relies heavily on the quality of initial voice removal and energy-based segmentation, meaning highly overlapped speech and laughter in noisy unscripted environments can cause missed events or boundary leakage. Evaluation is currently constrained to stand-up comedy, sitcoms, and YouTube audio, lacking tests on conversational telephony or clinical dialogue. The approach remains unsupervised and relies on distributional anomalies, making it susceptible to false positives when background music or non-speech vocalisations share acoustic similarities with laughter.

## Why read this

Speech and ML engineers working on cross-lingual paralinguistics or acoustic event detection should read this paper to see how self-supervised general audio encoders paired with classical anomaly detection can bypass the expensive data-annotation bottleneck of supervised ASR-derived models.

## Code

- https://github.com/sofia-callejas/Multilinguahah

## Applications

Socially interactive agents, automated humor extraction, meeting analysis, and conversational analytics systems requiring language-agnostic laughter detection.

## Related

- (link related pages by id as the wiki grows)
