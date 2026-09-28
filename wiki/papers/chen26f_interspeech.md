---
id: chen26f_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-838
pdf: https://www.isca-archive.org/interspeech_2026/chen26f_interspeech.pdf
---

# Toward Multimodal Industrial Fault Analysis: A Single-Speed Chain Conveyor Dataset with Audio and Vibration Signals

[PDF](https://www.isca-archive.org/interspeech_2026/chen26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-838)

**TL;DR** — The paper introduces a multimodal industrial fault analysis dataset from a single-speed chain conveyor system containing synchronized audio and vibration streams under realistic factory noise, establishing standardized evaluation protocols and showing that multimodal fusion improves fault detection and classification.

## Problem

Publicly available fault analysis datasets are typically collected in laboratory conditions on isolated components like bearings or motors using a single sensing modality while excluding real environmental noise. This creates a severe domain gap for industrial deployment where production-line machinery suffers from system-level faults and heavy acoustic interference. The proposed dataset bridges this gap by offering a complete chain conveyor benchmark with multi-channel audio, vibration, and real on-site factory noise.

## Method

The dataset captures 6,669 synchronized 5-second samples from a single-speed chain conveyor across 5 speed levels, 3 load levels, normal operations, and 4 fault types (lean, dry, loose, screwdrop) under both clean and factory-noise conditions. Signals are recorded via three parallel audio devices (Zoom recorder, iPhone, Xiaomi phone) and four vibration channels (single-axis on the motor, tri-axis at the system end). Evaluation is performed using a task-agnostic kNN framework via the SIREN toolkit over pre-trained audio encoders (BEATs, CED, DaSheng, EAT, ECHO, FISHER) to assess representation quality and multimodal fusion performance without task-specific model bias.

## Results

On the unsupervised fault detection task with normal-only training, FISHER achieves the highest audio-only AUROC of 0.954, while multimodal fusion elevates performance across models (e.g., boosting BEATs from 0.868 to 0.891). For supervised fault classification evaluated with held-out velocity 80 and partial velocity 100 splits, multimodal fusion consistently outperforms single-modality views, achieving up to 0.975 overall accuracy with FISHER and 0.969 with EAT. Across all evaluated self-supervised encoders, fusing audio and vibration channels yields robust gains in balanced accuracy and macro F1 scores.

## Code

- https://github.com/yucongzh/SSCC-Fault-Benchmark

## Applications

Speech and machine learning engineers working on industrial condition monitoring, predictive maintenance, anomalous sound detection, and multimodal sensor fusion.

## Limitations

Video recordings collected concurrently by the mobile devices are not incorporated into the current modeling pipeline and are only released as supplemental data.

## Related

- (link related pages by id as the wiki grows)
