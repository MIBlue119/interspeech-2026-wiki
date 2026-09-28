---
id: wang26i_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-433
pdf: https://www.isca-archive.org/interspeech_2026/wang26i_interspeech.pdf
---

# ES-3DF: Editable Speech-Driven 3D Face Reconstruction via Geometry Texture Disentanglement

*Jianrong Wang, Kaibin Bi, Jinghui Li, Ju Zhang, Qi Li, Ying Guo, Jing Zhao*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-433)

**TL;DR** — ES-3DF is a direct speech-driven 3D face reconstruction framework that decouples geometry and texture to achieve high-fidelity editable avatars with superior identity preservation and geometric accuracy compared to prior cascaded or 2D methods.

## Key contributions

- Proposes a unified end-to-end framework (ES-3DF) for direct 3D face reconstruction from speech, eliminating error propagation typical of cascaded 2D-to-3D pipelines.
- Introduces a Class-Aware Multi-Slot Memory Bank with a Multi-Slot InfoNCE loss to bridge the speech-texture modality gap and enhance speaker identity preservation.
- Implements a explicit Disentangle module separating 3DMM shape parameters from StyleGAN2-based UV texture maps for fine-grained geometric and stylistic editing.
- Demonstrates robust multi-view rendering capabilities and anatomical alignment between speech acoustics and facial features (e.g., nose, lips, upper face).

## Problem

Speech-driven facial generation is largely confined to 2D synthesis, which lacks explicit 3D representations, multi-view consistency, and fine-grained control over geometry. Cascaded methods that first generate 2D images and then perform 3D reconstruction suffer from severe error accumulation and propagation. Furthermore, mapping raw speech directly to complex identity-preserving face spaces is difficult due to the inherent modality gap and the confounding effects of speech rate, emotion, and prosody.

## Method

ES-3DF consists of two primary components: a Disentangle module and an Align module. The Disentangle module builds on a pretrained 3DDFAV3 feature extractor and geometry generator alongside a StyleGAN2-based UV generator to separate unified 3D features into 3DMM shape coefficients ($\alpha_{id} \in \mathbb{R}^{80}$, $\alpha_{exp} \in \mathbb{R}^{64}$) and high-resolution UV texture maps. Facial regions are masked using 3D-derived bounding masks, and training relies on a combination of pixel loss ($\lambda_{pix}=5.0$), cosine similarity loss ($\lambda_{cos}=1.0$), perceptual loss ($\lambda_{perc}=50.0$), UV regularization ($\lambda_{uv}=2.0$), and StyleGAN2 adversarial loss ($\lambda_{adv}=1.0$).

The Align module uses an ECAPA-TDNN encoder to extract 80-dimensional Mel filterbank speech features. An MLP directly regresses low-dimensional 3DMM shape coefficients via an MSE loss ($\L_{shape}$). For high-dimensional facial texture features, a Class-Aware Multi-Slot Memory Bank maintains $K=4$ latent prototypes per speaker class, updated via an Exponential Moving Average (EMA) with momentum $\mu=0.9$. A Multi-Slot InfoNCE loss pulls speech-derived texture embeddings toward valid speaker prototypes while pushing away inter-class negatives. The predicted components are fused via a differentiable renderer, supervised by a FaceNet-based perceptual loss.

## Experimental setup

Experiments utilize the intersection of VoxCeleb1 (voice) and VGGFace (images), totaling 1,225 speakers, split into 924 training speakers (initials F-Z) and 301 validation/test speakers. Audio is processed into 80-dimensional Mel filterbanks (16kHz, 25ms window, 10ms shift, 3-second padded/cropped segments). The framework is benchmarked against CMP and VoiceStyle using facial landmark L1/L2 distances, 3DMM coefficient L1/L2 errors, facial part segmentation IoU, and FaceNet-based feature similarity metrics.

## Results

ES-3DF achieves a landmark L1 distance of 1.33 and L2 of 19.65, substantially outperforming CMP (1.97 / 28.89) and VoiceStyle (1.86 / 27.25). In facial part segmentation IoU, the method reaches 87.94% for skin, 84.55% for nose, and ~60-67% for eye and eyebrow regions, beating VoiceStyle (83.64% skin, 80.20% nose). Ablations confirm that removing 3D disentanglement ("Ours w/o 3D") degrades landmark L1 to 2.11, and dropping the contrastive memory bank ("Ours w/o ctr") drops feature cosine similarity from 31.04% to 30.58%.

| System | Landmark L1 ↓ | Landmark L2 ↓ | Skin IoU (%) ↑ | Feature Cos (%) ↑ |
|---|---|---|---|---|
| CMP [10] | 1.97 | 28.89 | 82.30 | 20.63 |
| VoiceStyle [5] | 1.86 | 27.25 | 83.64 | 26.18 |
| Ours (w/o 3D) | 2.11 | 30.78 | 81.68 | N/A |
| Ours (w/o ctr) | N/A | N/A | N/A | 30.58 |
| Ours | **1.33** | **19.65** | **87.94** | **31.04** |

## Limitations

The evaluation relies on a filtered intersection of VoxCeleb1 and VGGFace, potentially limiting zero-shot cross-dataset generalization. Static lip morphology inference from dynamic speech signals remains an ill-posed challenge, evidenced by lower absolute IoU scores for lips (54-55%) compared to stable structures like the nose and general skin. The approach requires pre-computed 3DMM annotations for supervision during training, and memory bank scaling for large multi-speaker datasets is not fully evaluated.

## Why read this

Researchers building speech-driven 3D avatar animation systems should read this to see how explicit geometry-texture disentanglement and multi-slot contrastive learning solve identity preservation and geometric drift better than 2D-to-3D cascaded pipelines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Personalized virtual avatar animation, immersive teleconferencing, interactive gaming characters, and speech-driven 3D facial modeling.

## Related

- (link related pages by id as the wiki grows)
