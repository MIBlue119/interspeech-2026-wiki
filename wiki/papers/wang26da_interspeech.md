---
id: wang26da_interspeech
category: audio-understanding
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2348
pdf: https://www.isca-archive.org/interspeech_2026/wang26da_interspeech.pdf
---

# GACA-DiT: Diffusion-based Dance-to-Music Generation with Genre-Adaptive Rhythm and Context-Aware Alignment

*Jinting Wang, Yan Rong, Chenxing Li, Li Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26da_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26da_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2348)

**Category:** `audio-understanding` · **Labels:** `generative-model`

**TL;DR** — GACA-DiT is a diffusion transformer-based framework for dance-to-music generation that combines a genre-adaptive rhythm extraction module and a context-aware temporal alignment module to achieve superior beat synchronization and audio quality. It outperforms prior state-of-the-art models on the AIST++ and TikTok datasets while requiring significantly fewer parameters (56M).

## Key contributions

- Proposes GACA-DiT, a diffusion transformer-based framework designed specifically for joint rhythmic consistency and temporal alignment in dance-to-music generation.
- Develops the Genre-Adaptive Rhythm Extraction (GARE) module, which blends multi-scale temporal wavelet analysis and spatial phase histograms with adaptive joint weighting.
- Introduces the Context-Aware Temporal Alignment (CATA) module utilizing learnable queries to bridge downsampled music latents with dense dance rhythm features.
- Achieves state-of-the-art objective and subjective performance on AIST++ and TikTok datasets while scaling model size down to 56.06 million parameters.

## Problem

Prior dance-to-music generation systems typically rely on coarse-grained global motion features or binarized joint rhythms extracted via methods like ST-GCNs, which fail to capture subtle tempo variations across diverse dance genres. Furthermore, shallow velocity-based formulations (e.g., in LORIS, MotionComposer) prove sensitive to noise and incapable of handling multi-scale temporal dependencies. Finally, feature downsampling during encoding introduces a critical temporal mismatch between dense dance rhythm representations and music latents, leading to poor cross-modal synchronization.

## Method

GACA-DiT takes video frames, pose sequences, and conditioning signals to produce high-fidelity music waveforms via a diffusion transformer (DiT) architecture. Given a pose sequence P ∈ R^(T × J × C), frame-wise motion and motion magnitudes M^mag are computed across joints. The GARE module then processes M^mag through multi-scale temporal Gabor wavelet kernels ψ_s (yielding W_t,j,s) and spatial multi-scale phase histograms. A joint-adaptive weighting mechanism dynamically scales informative joints per genre, and a temporal attention module fuses these signals into a final rhythm embedding R ∈ R^(T × D).

To resolve temporal length mismatches between the rhythm sequence length T and the downsampled music latent length T_m, the Context-Aware Temporal Alignment (CATA) module divides R into T_m segments S_i. Learnable context queries Q = [q_1, ..., q_{T_m}] ∈ R^(T_m × D) aggregate fine-grained segment information via query-guided attention pooling, generating aligned rhythm features R^~ ∈ R^(T_m × D).

The conditional music generation is formulated as a conditional flow matching framework driven by a DiT consisting of 8 transformer blocks with a 512-dimensional hidden size and 10-head self-attention. Ground-truth audio clips (5 seconds at 44,100 Hz) are encoded into music latents Z_m ∈ R^(T_m × d) using a pre-trained VAE from DiffRhythm. The DiT model learns a velocity field v_θ predicting the ODE path from Gaussian noise to target latents, conditioned on the aligned rhythm R^~, I3D-extracted video features V, and time steps t.

## Experimental setup

Evaluated on the AIST++ and TikTok datasets using 5-second audio clips sampled at 44.1 kHz, with 2D pose skeletons extracted via DWpose and video semantic features extracted using an ImageNet-pretrained I3D model. Compared against baselines D2M-GAN, CDCD, LORIS, and MotionComposer. Metrics include Beats Coverage Score (BCS), Beats Hit Score (BHS), their F1 score, standard deviations CSD and HSD, aesthetic metrics (CE, CU, PC, PQ), Fréchet Audio Distance (FAD), and Mean Opinion Score (MOS) user studies. Trained with batch size 4 for 100 epochs using Adam optimizer (learning rate 1e-4, β_1=0.9, β_2=0.95), utilizing a 32-step Euler ODE solver and classifier-free guidance of 4.

## Results

On the AIST++ dataset, GACA-DiT achieves a headline BCS of 98.13%, BHS of 98.72%, an F1 score of 98.47%, and an FAD of 20.14, outperforming the closest baseline MotionComposer (BCS 95.84%, BHS 95.09%, FAD 40.52%) while using only 56.06M parameters compared to MotionComposer's 731M parameters. On the TikTok dataset, GACA-DiT maintains superiority with a BCS of 91.55%, BHS of 91.73%, and F1 of 91.21%. Ablation studies demonstrate that adding multi-scale wavelet features, phase histograms, joint adaptive weighting, and finally the CATA module progressively improves BCS from 96.19% (video-only baseline) up to 98.13% and reduces CSD from 13.07 to 8.15.

| System | Params (M) | BCS (↑) | BHS (↑) | F1 (↑) | FAD (↓) |
|---|---|---|---|---|---|
| D2M-GAN | 63.63 | 89.09 | 88.95 | 88.84 | 49.49 |
| CDCD | 428.09 | 92.18 | 80.50 | 84.95 | 89.57 |
| LORIS | 780.16 | 92.13 | 91.71 | 92.05 | 83.64 |
| MotionComposer | 731.00 | 95.84 | 95.09 | 96.45 | 40.52 |
| GACA-DiT (Ours) | 56.06 | 98.13 | 98.72 | 98.47 | 20.14 |

## Limitations

The evaluation relies heavily on short 5-second video-music clips, leaving long-form structural coherence and multi-minute song generation unverified. The framework depends on accurate 2D pose estimations (DWpose), making it potentially sensitive to severe occlusion, complex multi-person framing, or noisy skeleton tracking in wild video data. Language and cultural diversity of dance genres are bound primarily to the distributions represented within the AIST++ and TikTok benchmark collections.

## Why read this

Researchers and audio-generative engineers working on conditional music synthesis or cross-modal alignment should read this paper to learn how learnable context queries can eliminate temporal downsampling mismatches. It provides a blueprint for building compact (56M parameter) diffusion transformers that achieve superior rhythm-to-audio synchronization compared to massive baseline pipelines.

## Code

- https://anonymous.4open.science/w/GACA-DiT/

## Applications

Automated background music generation for short-form user video platforms, interactive dance choreography companion software, and cross-modal rhythm conditioning systems.

## Institutions / 機構

Hong Kong University of Science and Technology, Tencent

**Funding / 經費:** National Natural Science Foundation of China, Guangdong Basic and Applied Basic Research Foundation, Tencent AI Lab Rhino-Bird Program

## Related

- (link related pages by id as the wiki grows)
