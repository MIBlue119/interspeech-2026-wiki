---
id: firc26b_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2430
pdf: https://www.isca-archive.org/interspeech_2026/firc26b_interspeech.pdf
---

# SpAArSIST: Sparsified AASIST for Efficient and Reliable Anti-Spoofing

[PDF](https://www.isca-archive.org/interspeech_2026/firc26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/firc26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2430)

**TL;DR** — SpAArSIST streamlines the AASIST graph-pooling backend for self-supervised anti-spoofing by removing redundant operations, cutting backend compute by 20.7% and model parameters by 4.1% while improving out-of-domain robustness.

## Problem

Popular graph pooling backends like AASIST contain redundant or weakly conditioned operations that inflate computational costs without proportional representational gains. This inefficiency hampers deployability, while models often suffer from poor generalization and calibration under cross-domain shifts. Addressing this requires a systematic pruning and simplification of backend graph operations without sacrificing in-domain accuracy.

## Method

The authors introduce SpAArSIST, a deployment-oriented refinement of the AASIST backend operating atop a Wav2Vec2.0 XLS-R (300M) front-end. Key modifications include decoupling train-time and inference-time pooling ratios (ktr, kinf) to aggressively shrink the graph during inference, replacing the parameterized learned scorer with an explicit feature magnitude proxy (squared l2-norm) for node ranking, and substituting attention-heavy stack node aggregation with a lightweight mean pooling. Models are trained using an Adam optimizer with a dual-stage schedule (frozen extractor followed by end-to-end fine-tuning) on ASVspoof 5 alongside a robust data augmentation suite.

## Results

Evaluated on ASVspoof 5 (in-domain) and In-the-Wild (out-of-domain) datasets, the top-performing SpAArSIST configuration (AST-03-01-Mag using ktr=0.3 and kinf=0.1) reduces backend compute from 195.045M to 154.706M MACs and parameter count from 611.8k to 586.4k. Out-of-domain robustness on In-the-Wild improves substantially, dropping Equal Error Rate (EER) from 4.64% to 2.82% and minDCF from 0.133 to 0.078, while remaining competitive on in-domain ASVspoof 5. A novel two-track composite score combining accuracy, calibration, and computational metrics is used to rank deployment trade-offs.

## Code

- https://github.com/Security-FIT/SpAArSIST

## Applications

Speech engineers and security practitioners building efficient, real-time on-device audio deepfake detectors and speaker verification anti-spoofing systems.

## Related

- (link related pages by id as the wiki grows)
