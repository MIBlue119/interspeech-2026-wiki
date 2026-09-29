---
id: kopuklu26_interspeech
category: speaker
labels: [efficient-on-device, streaming-real-time]
institutions: ["Microsoft"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-448
pdf: https://www.isca-archive.org/interspeech_2026/kopuklu26_interspeech.pdf
---

# RT-ASDNet: Unified, Real-Time Active Speaker Detection

*Okan Köpüklü*

[PDF](https://www.isca-archive.org/interspeech_2026/kopuklu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kopuklu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-448)

**Category:** `speaker` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — RT-ASDNet is a unified, end-to-end audio-visual deep learning architecture that formulates active speaker detection as a single-stage, anchor-free detection problem, enabling constant-time inference per frame regardless of scene complexity. It achieves 77.3% mAP on the AVA-ActiveSpeaker benchmark while running in real-time.

## Key contributions

- Formulates active speaker detection (ASD) as a single-stage, anchor-free detection problem, eliminating the need for multi-stage pipelines, external face detectors, and separate cropping steps.
- Proposes a constant-time inference mechanism per video frame where computational cost does not scale with the number of people present in the scene.
- Combines a raw-waveform audio backbone (SincDSNet) with a multi-scale 3D-CNN video backbone featuring multi-stage fusion (MSF) and deformable convolutions to handle spatial misalignment.
- Establishes a rigorous baseline for simultaneous joint face localization and speaking classification under real-time constraints.

## Problem

Traditional state-of-the-art active speaker detection systems rely on multi-stage pipelines that first detect faces via off-the-shelf detectors, crop face regions, extract features, and finally classify speaking activity using GNNs, RNNs, or attention mechanisms. These approaches suffer from linear computational scaling with respect to the number of faces in a scene, error propagation across sequential modules, and an inability to perform end-to-end global optimization. Furthermore, while causal methods attempt to address deployment latency, they generally preserve the multi-stage, face-proposal paradigm, making them impractical for crowded environments and real-time streaming applications.

## Method

RT-ASDNet operates on a sliding-window clip of frames, making detections on the final key frame. The audio stream processes raw waveforms using 80 sinc filters (kernel size 251 at 16 kHz), applies log-compression $y = \log(|x| + 1)$, and passes the signal through six Depthwise Separable Convolutional (DSConv) blocks of 160 channels (except the final block which uses $C_a$ channels), followed by adaptive average pooling to yield a compact audio embedding $f_a \in \mathbb{R}^{C_a}$. The visual stream uses a 3D-CNN video backbone (such as 3D-ResNet-18) with a Feature Pyramid Network (FPN) and Multi-Stage Fusion (MSF) blocks utilizing deformable convolutions to output a visual feature map $f_v \in \mathbb{R}^{C_b \times H' \times W'}$ at one-quarter resolution ($H' = H/4, W' = W/4$). 

To fuse modalities, the audio embedding $f_a$ is spatially broadcast and concatenated channel-wise with the visual feature map $f_v$. Following the CenterNet paradigm, the detection head consists of three specialized branches: a heatmap head for class confidence ($C = 2$ for speaking vs. non-speaking) using focal loss; a size head regressing bounding box width and height via $L_1$ loss; and an offset head for sub-pixel localization refinement via $L_1$ loss. The multi-task objective combines these losses with weights $\lambda_{\text{hm}} = 1$, $\lambda_{\text{wh}} = 0.1$, and $\lambda_{\text{off}} = 1$. Inference uses a simple $3 \times 3$ max-pooling operation for non-maximum suppression (NMS) to extract bounding boxes and speaking labels directly in a single forward pass.

## Experimental setup

Evaluated on the AVA-ActiveSpeaker dataset containing 262 movie clips (120 training, 33 validation, 109 test), comprising 3.65 million annotated frames and 38.5 hours of labeled face tracks. Evaluated using mean Average Precision (mAP) at an Intersection-over-Union (IoU) threshold of 0.5. Implemented with the Adam optimizer starting at a learning rate of $1 \times 10^{-4}$ reduced by a factor of 10 after 40k iterations, using a default video resolution of $288 \times 288$, a 32-frame clip length, and trained on an Nvidia RTX 6000 GPU.

## Results

Using a 3D-ResNet-18 backbone and 32-frame clip input at $288 \times 288$ resolution, RT-ASDNet achieves an mAP of 77.3% at $\text{IoU} \ge 0.5$ while attaining a real-time factor (RTF) of 0.009. Lighter video backbones such as 3D-MobileNetV2-1.0x and 3D-ShuffleNetV1-1.0x yield 75.3% mAP (RTF 0.011) and 70.9% mAP (RTF 0.013) respectively, with parameter counts dropping from 33.2M down to 0.9M. Ablations on temporal context show performance saturates at 32 to 64 frames (77.3% mAP for both 32 and 64 frames, dropping to 73.3% for 8 frames). 

While offline methods like MSSG and MuSED report higher mAP values (95.6%), those methods utilize ground-truth face crops, whereas RT-ASDNet performs joint unconstrained detection and classification on full frames. RT-ASDNet's performance drops when facing crowded scenes or small faces, achieving 81.2% accuracy on single-face frames compared to 66.4% when 3 faces are present, and 42.1% mAP on small faces versus 84.1% on large faces.

| System / Backbone | Params | GFLOPs | mAP (@ IoU $\ge$ 0.5) | RTF |
|---|---|---|---|---|
| RT-ASDNet (3D-ResNet-18, 352$\times$352) | 33.2M | - | 77.5 | - |
| RT-ASDNet (3D-ResNet-18, 288$\times$288) | 33.2M | 54.4 | 77.3 | 0.009 |
| RT-ASDNet (3D-MobileNetV2-1.0x) | 1.5M | 3.5 | 75.3 | 0.011 |
| RT-ASDNet (3D-ShuffleNetV1-1.0x) | 0.9M | 1.8 | 70.9 | 0.013 |
| RT-ASDNet (3D-ResNet-18, 8-frame) | 33.2M | - | 73.3 | - |

## Limitations

The model exhibits a noticeable performance gap compared to offline pipelines, particularly for small-scale faces where processing full frames at fixed resolutions reduces effective face pixel counts. Computational complexity still grows with input resolution and temporal clip length. Furthermore, performance degrades in dense, multi-speaker scenes as the count of visible individuals increases.

## Why read this

Speech and ML engineers building real-time audio-visual systems or video conferencing tools should read this paper to learn how to replace complex multi-stage speaker detection pipelines with a single-stage, constant-time architecture.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time video conferencing, automated video editing, human-robot interaction, and live speaker diarization.

## Institutions / 機構

Microsoft

## Related

- (link related pages by id as the wiki grows)
