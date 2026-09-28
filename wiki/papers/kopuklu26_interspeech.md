---
id: kopuklu26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-448
pdf: https://www.isca-archive.org/interspeech_2026/kopuklu26_interspeech.pdf
---

# RT-ASDNet: Unified, Real-Time Active Speaker Detection

[PDF](https://www.isca-archive.org/interspeech_2026/kopuklu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kopuklu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-448)

**TL;DR** — RT-ASDNet is a unified, single-stage audio-visual architecture for real-time active speaker detection that eliminates multi-stage pipelines and achieves a 77.5 mAP on AVA-ActiveSpeaker.

## Problem

Traditional active speaker detection (ASD) pipelines rely on multi-stage workflows involving separate off-the-shelf face detectors, feature extraction, and graph or recurrent classifiers. This modular design causes error propagation, computational costs that scale linearly with the number of faces in a scene, and impractical latencies for crowded, real-time environments.

## Method

RT-ASDNet formulates ASD as a single-stage, anchor-free detection task that jointly localizes faces and classifies speaking status in one forward pass. The audio stream uses SincDSNet with 80 sinc-based convolution filters on raw waveforms followed by depthwise separable convolutions to yield a compact embedding. The visual stream extracts multi-scale spatiotemporal features using a 3D-CNN backbone (such as 3D-ResNet-18) coupled with a Feature Pyramid Network and deformable convolutions. Audio and visual representations are fused via channel-wise concatenation and fed into three anchor-free prediction heads: a heatmap head for classification, a size head for bounding box dimensions, and an offset head for sub-pixel refinement.

## Results

Evaluated on the AVA-ActiveSpeaker validation set, RT-ASDNet sets a strong baseline for joint detection and classification, achieving 77.5 mAP at an input resolution of 352x352 using a 3D-ResNet-18 backbone. Lightweight variants using 3D-MobileNetV2-1.0x and 3D-ShuffleNetV1-1.0x achieve 75.3 and 70.9 mAP with parameters reduced to 1.5M and 0.9M respectively. Increasing temporal context from 8 to 32 frames improves mAP and classification accuracy, while maintaining a constant inference cost per frame regardless of scene crowding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building video conferencing systems, human-robot interaction interfaces, automatic video editors, and speaker diarization pipelines.

## Related

- (link related pages by id as the wiki grows)
