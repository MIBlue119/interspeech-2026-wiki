---
id: wei26d_interspeech
category: bioacoustics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1492
pdf: https://www.isca-archive.org/interspeech_2026/wei26d_interspeech.pdf
---

# USV-DETR: High-Resolution and Densely Supervised Detection of Ultrasonic Vocalizations

[PDF](https://www.isca-archive.org/interspeech_2026/wei26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wei26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1492)

**TL;DR** — USV-DETR is an end-to-end transformer-based object detection model optimized for rodent ultrasonic vocalizations, achieving an AP of 78.7 on the SqueakOut dataset.

## Problem

Automated detection of rodent ultrasonic vocalizations (USVs) in spectrograms remains difficult because these signals are small-scale, have narrow bandwidths, and are sparsely distributed. Traditional convolutional detectors and standard RT-DETR models lose crucial spatial and temporal details during downsampling and struggle with supervision sparsity. This impedes accurate time-frequency localization and downstream bioacoustic analysis.

## Method

Built upon the RT-DETR architecture with a 640x640 input resolution, USV-DETR introduces a high-resolution P2 feature layer (4x downsampling stride, 128 channels) using HGNet backbone and CCFF fusion to preserve fine-grained acoustic boundaries. It adopts the DEIM training framework, which applies Mosaic and Mixup data augmentation for Dense O2O Matching and incorporates a Matchability-Aware Loss (MAL) to stabilize supervision on hard, low-IoU matches. The model contains 34.5 million parameters and is trained for 50 epochs using a multi-task loss combining MAL, L1 bounding box regression, GIoU, Focal classification, and D-FINE distribution refinement losses.

## Results

Evaluated on the SqueakOut (mouse, 12,954 images) and USVpic (rat, 3,000 images) datasets, USV-DETR outperforms baseline models including DEIM, D-FINE, RT-DETRv4, and RT-DETRv2. On SqueakOut, it achieves an AP of 78.7 and AP50 of 94.5, compared to DEIM's 74.8 AP and RT-DETRv4's 74.5 AP. On USVpic, it reaches 78.4 AP and 94.5 AP50. Ablation studies show that removing the P2 feature layer causes a large drop of 3.9% in overall AP and 5.0% in small object AP (APs), while removing the DEIM training framework decreases AP by 0.9%.

## Code

- https://github.com/weiyilan9/USV-DETR

## Applications

Neuroscience and behavioral researchers studying rodent social interaction, emotional regulation, and neurological biomarkers for conditions such as autism or anxiety.

## Related

- (link related pages by id as the wiki grows)
