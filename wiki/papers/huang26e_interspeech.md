---
id: huang26e_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1262
pdf: https://www.isca-archive.org/interspeech_2026/huang26e_interspeech.pdf
---

# Stress Detection Across Daily Activities: A Context-Aware Multimodal Framework with Trajectory and Ambient Speech

[PDF](https://www.isca-archive.org/interspeech_2026/huang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1262)

**TL;DR** — The paper introduces Trajectory Speech Embedding (TSE), a context-aware multimodal framework that integrates speech and mobility trajectories to detect daily stress among hospital workers, improving the F1 score by 9.32% and Matthews correlation coefficient (MCC) by 0.038 over audio-only baselines.

## Problem

Stress detection methods often rely heavily on intrusive physiological signals like heart rate variability (HRV) or unimodal audio, both of which lack robustness across different real-world contexts and environments. Daily stress is inherently context-dependent and heavily influenced by spatial and environmental factors, especially for healthcare workers operating in high-pressure clinical environments. Addressing this gap requires a non-intrusive, scalable monitoring system that can effectively fuse behavioral mobility patterns with acoustic cues.

## Method

The proposed TSE framework consists of two modality-specific encoders: an acoustic encoder and a trajectory encoder, both utilizing two-layer Transformer architectures with GELU activation. The acoustic input comprises 360-dimensional daily feature vectors derived from openSMILE low-level descriptors (8 prosodic and 16 spectral) aggregated across 15 statistical functionals per day. The trajectory encoder models indoor room transitions captured via hospital Wi-Fi/Bluetooth infrastructure, converting minute-level location sequences into session-based trajectory tokens pre-trained via self-supervised next-location prediction. The daily acoustic and trajectory embeddings are concatenated via late fusion and fed into a multi-layer perceptron (MLP) classifier trained with auxiliary branch losses.

## Results

Evaluated on the TILES dataset containing real-world data from 212 hospital workers (binarized daily stress labels where 31.9% are positive), the model is assessed using accuracy, balanced accuracy (BACC), F1-score, and MCC under a subject-independent 80/10/10 split. The proposed Coordinate TSE framework achieves the best performance with an MCC of 0.147 and BACC of 58.91%, outperforming a Bi-LSTM acoustic baseline (MCC 0.094) and standard Transformer acoustic baseline (MCC 0.074). Ablations demonstrate that the multimodal fusion effectively compensates for unimodal failures, yielding peak performance under high mobility intensity (F1-score of 51.5%) and under low-mobility constrained conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Healthcare organizations and digital health engineers building non-intrusive, long-term occupational stress monitoring systems for frontline workers.

## Limitations

The framework currently operates at a day-level temporal resolution and relies on the availability of indoor positioning infrastructure.

## Related

- (link related pages by id as the wiki grows)
