---
id: wang26i_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-433
pdf: https://www.isca-archive.org/interspeech_2026/wang26i_interspeech.pdf
---

# ES-3DF: Editable Speech-Driven 3D Face Reconstruction via Geometry Texture Disentanglement

[PDF](https://www.isca-archive.org/interspeech_2026/wang26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-433)

**TL;DR** — ES-3DF reconstructs editable, textured 3D faces directly from raw speech audio without intermediate 2D generation stages, achieving superior geometric accuracy and identity preservation compared to existing baselines.

## Problem

Current speech-driven facial generation methods predominantly rely on 2D synthesis, which inherently lacks explicit 3D representations, multi-view consistency, and fine-grained control over facial shape or expression. Cascaded pipelines that generate 2D images before attempting 3D reconstruction suffer from severe error accumulation and noise propagation. Furthermore, direct cross-modal mapping struggles with the ill-posed nature of inferring detailed geometry and identity from acoustic signals alone.

## Method

The framework comprises two main components: a Disentangle module and an Align module. The Disentangle module splits 3D facial features using 3DDFAV3 for geometry generation (regressing 80-dimensional identity and 64-dimensional expression 3DMM coefficients via MLPs) and a StyleGAN2-based UV generator for high-fidelity texture maps. The Align module uses an ECAPA-TDNN speech encoder alongside a dual-branch network to map audio features into the shape and texture spaces. To bridge the modality gap, a Class-Aware Multi-Slot Memory Bank maintains multiple latent texture prototypes per speaker, updated via Exponential Moving Average (EMA), and applies a novel Multi-Slot InfoNCE loss. Training uses a weighted combination of pixel loss, FaceNet-based cosine similarity and perceptual losses, UV regularization, adversarial loss, and shape MSE.

## Results

Evaluated on a subset of VoxCeleb1 and VGGFace comprising 1,225 speakers (924 for training, 301 for validation/testing), ES-3DF is benchmarked against CMP and VoiceStyle. ES-3DF achieves superior geometric performance, recording lower landmark L1 (5.25 vs 6.90 for CMP and 7.13 for VoiceStyle) and L2 distances, and higher segmentation IoU scores across facial components (e.g., 87.94% skin IoU). Feature-level evaluations show an improved FaceNet feature cosine similarity of 31.04% compared to 20.63% for CMP and 26.18% for VoiceStyle. Ablation studies confirm that removing either the 3D disentangling or the multi-slot contrastive learning strategy leads to noticeable drops in geometric consistency and identity retention.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-driven 3D avatar animation, personalized virtual reality, and interactive digital human avatars.

## Limitations

Inferred static lip morphology from dynamic speech signals exhibits lower absolute IoU accuracy due to the inherent ill-posedness of predicting resting mouth structures solely from acoustic input.

## Related

- (link related pages by id as the wiki grows)
