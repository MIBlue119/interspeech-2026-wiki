---
id: wei26d_interspeech
category: audio-understanding
institutions: ["Northwestern University"]
code: https://github.com/weiyilan9/USV-DETR
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1492
pdf: https://www.isca-archive.org/interspeech_2026/wei26d_interspeech.pdf
---

# USV-DETR: High-Resolution and Densely Supervised Detection of Ultrasonic Vocalizations

*Yilan Wei, Kumiko Long, Arielle Granston, Adrian Rodriguez-Contreras*

[PDF](https://www.isca-archive.org/interspeech_2026/wei26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wei26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1492)

**Category:** `audio-understanding`

**TL;DR** — USV-DETR is an end-to-end transformer-based model optimized for detecting rodent ultrasonic vocalizations in spectrograms, achieving an AP of 78.7 on the SqueakOut dataset by combining a high-resolution P2 feature layer with the DEIM training framework.

## Key contributions

- Adapts RT-DETR for rodent ultrasonic vocalization (USV) detection by incorporating a high-resolution P2 feature layer with a 4x downsampling stride to preserve narrowband and short-duration acoustic details.
- Integrates the DEIM training framework, employing Dense O2O Matching (via Mosaic and Mixup augmentations) to increase positive sample density for sparse targets.
- Applies a Matchability-Aware Loss (MAL) to dynamically reweight low-quality matches, stabilizing and accelerating training convergence for hard small-object examples.
- Demonstrates state-of-the-art performance across two distinct datasets (SqueakOut and USVpic), outperforming RT-DETR variants, D-FINE, and DEIM baselines.

## Problem

Rodent ultrasonic vocalizations (USVs) are crucial biomarkers in neuroscience for studying social interaction, anxiety, and neurodevelopmental disorders, but automated detection remains difficult due to their small scale, narrow frequency bandwidth, and sparse distribution in spectrograms. Traditional rule-based tools require tedious manual parameter tuning, while existing deep learning approaches like Faster R-CNN (DeepSqueak) or standard convolutional networks yield only coarse localization. Furthermore, standard vision transformers and object detectors (like RT-DETR) are built for natural images, causing small acoustic patterns to be washed out by standard 8x downsampling and sparse one-to-one matching mechanisms.

## Method

USV-DETR builds upon the RT-DETR architecture, taking a 640 x 640 input spectrogram processed by an HGNet backbone that outputs four-scale features (P2 to P5) with downsampling strides of 4, 8, 16, and 32, and channel dimensions of [128, 512, 1024, 2048]. The standard RT-DETR starts at P3 (8x stride), which causes small USVs (~20x30 pixels) to lose critical spatial resolution; introducing the P2 layer (4x stride, 128 channels) expands the target's representation from ~9.4 feature units to ~37.5 feature units while keeping computational overhead low via deformable attention. The efficient hybrid encoder uses an AIFI module for global context on P5 and a CCFF module for top-down feature fusion.

For training, USV-DETR adopts the DEIM framework to tackle positive sample sparsity. It utilizes Dense O2O Matching driven by Mosaic and Mixup data augmentations (probability p = 0.5) to multiply target instances per sample and expose the model to scale variations. Instead of standard Varifocal Loss, it incorporates Matchability-Aware Loss (MAL), which dynamically weights matching pairs using classification confidence and Intersection-over-Union (IoU) to impose aggressive supervision on low-quality, hard-to-detect matches.

The overall multi-task objective combines MAL (weight 1.0), L1 bounding box regression loss (weight 5.0), GIoU loss (weight 2.0), Focal Loss for classification, and distribution refinement loss inherited from D-FINE (weight 1.5). Models are trained for 50 epochs using a batch size of 16.

## Experimental setup

Experiments are performed on the SqueakOut dataset (12,954 mouse USV spectrogram images at 512 x 512 pixels across 5 strains) and the USVpic dataset (3,000 rat USV spectrogram images at 640 x 640 pixels from 27 Wistar rats, annotated via SAM 3). Both datasets use a 70% train, 20% validation, and 10% test split. Baselines include DEIM, D-FINE, RT-DETRv4, and RT-DETRv2. Evaluation metrics include Average Precision (AP), AP50, AP75, and Average Precision for Small objects (APs). Training is conducted on NVIDIA H100 GPUs with a batch size of 16 for 50 epochs, and the USV-DETR model has 34.5M parameters.

## Results

On the SqueakOut dataset, USV-DETR achieves an AP of 78.7 and an AP50 of 94.5, outperforming baseline DEIM (74.8 AP), D-FINE (74.1 AP), RT-DETRv4 (74.5 AP), and RT-DETRv2 (73.9 AP). On the USVpic dataset, USV-DETR reaches 78.4 AP and 94.5 AP50, surpassing DEIM (75.0 AP) and RT-DETRv2 (77.0 AP). 

Ablation studies on SqueakOut demonstrate the crucial nature of both proposed modules: removing the DEIM training strategy drops AP by 0.9% (to 77.8), removing the P2 feature layer drops AP by 3.9% (to 74.8) and hits small-object metric APs hardest with a 5.0% drop (down to 69.9), while removing both drops AP by 4.2% and APs by 5.4%.

| System/Condition | AP | AP50 | AP75 | APs |
| :--- | :--- | :--- | :--- | :--- |
| USV-DETR (Ours) | 78.7 | 94.5 | 86.1 | 74.9 |
| w/o DEIM | 77.8 | 94.2 | 85.5 | 73.8 |
| w/o P2 | 74.8 | 93.9 | 83.0 | 69.9 |
| w/o DEIM + P2 | 74.5 | 93.6 | 82.9 | 69.5 |
| DEIM baseline | 74.8 | 93.9 | - | - |
| D-FINE baseline | 74.1 | 93.8 | - | - |

## Limitations

The evaluation is restricted to rodent species (mice and rats) across specific age ranges (postnatal days 5 to 15), meaning generalizability to broader mammalian or avian vocalizations remains untested. The approach relies heavily on high-quality supervised bounding box annotations, which for USVpic required Segment Anything Model (SAM 3) pre-annotation. The pipeline processes fixed-size spectrogram images rather than raw audio streams directly, requiring a preliminary acoustic-to-spectrogram conversion step.

## Why read this

Researchers and engineers building bioacoustic detection or fine-grained object detection systems should read this paper to see how combining high-resolution feature pyramids (P2 layer) with dense supervision matching strategies (DEIM) effectively resolves small-object sparsity in spectrogram analysis.

## Code

- https://github.com/weiyilan9/USV-DETR

## Applications

Automated rodent behavioral screening, neurological disorder indexing via vocalization biomarkers, and high-throughput bioacoustic analysis.

## Institutions / 機構

Northwestern University

## Related

- [Sleep Sound Event Detection Powered by Learnable Multi-Resolution Adaptive Line Enhancer](park26_interspeech.md) — shared technique · relatedness 1.7/3
- [Exploratory analysis of yellow mongoose vocalization: detection from in-the-wild recordings and call classification](hovsepyan26_interspeech.md) — same problem · relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
