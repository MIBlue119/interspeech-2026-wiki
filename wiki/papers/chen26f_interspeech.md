---
id: chen26f_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Duke Kunshan University", "Chinese University of Hong Kong", "Wuhan University"]
code: https://github.com/yucongzh/SSCC-Fault-Benchmark
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-838
pdf: https://www.isca-archive.org/interspeech_2026/chen26f_interspeech.pdf
---

# Toward Multimodal Industrial Fault Analysis: A Single-Speed Chain Conveyor Dataset with Audio and Vibration Signals

*Zhang Chen, Yucong Zhang, Xiaoxiao Miao, Ming Li*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-838)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces the SSCC dataset—a multimodal industrial condition monitoring benchmark featuring 6,669 synchronized audio and vibration clips from a chain conveyor system—and establishes unified kNN-based evaluation protocols for fault detection and classification.

## Key contributions

- Constructs the SSCC dataset capturing a complete chain conveyor system under 5 speed levels, 3 load levels, and realistic on-site factory noise reproduced via loudspeakers.
- Provides 7 synchronized sensing channels: 3 audio streams from heterogeneous devices (Zoom H5, iPhone 11, Xiaomi Mi 9 SE) and 4 vibration channels (1 single-axis motor sensor, 1 tri-axis structural sensor).
- Establishes a zero-shot cross-velocity unsupervised fault detection protocol using normal-only training and a supervised multi-class fault classification protocol holding out velocity 80 and select faults.
- Evaluates 6 pre-trained audio foundation models (BEATs, CED, DaSheng, EAT, ECHO, FISHER) via a unified channel-wise kNN probe to baseline representation quality.

## Problem

Most existing industrial fault analysis datasets (e.g., CWRU, IIEE, IICA) are collected under clean laboratory conditions, focus on isolated machine components like motors or bearings rather than complete systems, rely on a single modality, and simulate factory noise purely through post-hoc synthetic augmentation. This causes a significant domain gap when deploying data-driven models in real-world factories where strong environmental noise and structural fault propagation are prevalent. The SSCC dataset addresses this gap by providing a system-level, multi-sensor, noise-injected benchmark.

## Method

The dataset captures steady-state operation segmented into 5-second clips across normal operation and four fault types: lean (guide rail misalignment), dry (insufficient lubrication), loose (chain looseness), and screwdrop (foreign object intrusion). Audio signals are recorded at 44.1/48 kHz, while vibration signals are sampled at 100 kHz.

For evaluation, the authors adopt a unified channel-wise kNN inference framework using pre-trained foundation models (BEATs, CED, DaSheng, EAT, ECHO, FISHER) with ViT backbones without task-specific fine-tuning. In the unsupervised fault detection task (normal-only training, zero-shot evaluation at velocity 100), feature embeddings form a memory bank, and cosine/Euclidean distances to the k-th nearest neighbor (k=1) are computed per channel. Distances are normalized via ECDF-based quantile mapping into (0, 1) and fused via simple averaging to yield the final anomaly score.

For supervised fault classification (k=11), distance-weighted voting determines class probabilities per channel, which are aggregated via late fusion followed by argmax. This design isolates representation quality from model-specific tuning biases and allows direct assessment of audio-vibration complementarity.

## Experimental setup

The dataset contains 6,669 samples across 5 conveying speeds (20, 40, 60, 80, 100), 3 load levels (heavy, medium, light), and clean/noisy acoustic settings. Evaluated baselines include BEATs, CED, DaSheng, EAT, ECHO, and FISHER. Metrics include AUROC for fault detection, and Accuracy, Balanced Accuracy, and Macro-F1 for fault classification.

## Results

For unsupervised fault detection, audio-based feature spaces generally outperform vibration spaces (e.g., FISHER achieves 0.954 AUROC on audio vs 0.546 on vibration), showing that acoustic cues capture subtle operational anomalies better than vibration signals dominated by periodic components. Decision-level multimodal fusion reaches an AUROC of 0.891 with BEATs and 0.882 with FISHER.

For supervised fault classification, audio and vibration exhibit strong complementarity: vibration features excel at detecting impulsive screwdrop faults (F1 up to 0.999), while audio features achieve higher F1 scores for loose frictional/rattling sounds. Consequently, multimodal fusion achieves top-tier classification performance (e.g., DaSheng Fuses reaches 0.967 Accuracy and 0.965 Macro-F1), though single-modality ECHO and FISHER occasionally surpass their fused counterparts.

| System / Feature | Modality | Detection AUROC | Classification Acc | Classification Macro-F1 |
|---|---|---|---|---|
| BEATs | Fused | 0.891 | 0.941 | 0.937 |
| CED | Fused | 0.854 | 0.905 | 0.902 |
| DaSheng | Fused | 0.681 | 0.967 | 0.965 |
| EAT | Fused | 0.666 | 0.927 | 0.924 |
| ECHO | Fused | 0.658 | 0.907 | 0.894 |
| FISHER | Fused | 0.882 | 0.955 | 0.953 |

## Limitations

Data collection is restricted to a single-speed chain conveyor (SSCC) platform in a laboratory environment, limiting direct generalization to entirely different machinery types like compressors or multi-axis robots. Environmental noise is simulated via loudspeaker playback rather than capturing fully in-situ operational noise across diverse real-world factories. Additionally, auxiliary video data released with the dataset is left unexploited, and the benchmark focuses strictly on frozen pre-trained representations via kNN probes rather than end-to-end task-specific fine-tuning.

## Why read this

Researchers and engineers working on industrial condition monitoring or multimodal self-supervised learning should read this to understand how audio-vibration sensor fusion behaves under realistic factory noise and system-level fault propagation.

## Code

- https://github.com/yucongzh/SSCC-Fault-Benchmark

## Applications

Automated industrial production line monitoring, predictive maintenance, and real-time fault diagnosis in conveyor and transmission systems.

## Institutions / 機構

Duke Kunshan University, Chinese University of Hong Kong, Wuhan University

**Funding / 經費:** Science and Technology Program of Suzhou City

## Related

- (link related pages by id as the wiki grows)
