---
id: si26_interspeech
category: enhancement-separation
labels: [generative-model, robustness-noise]
institutions: ["University of California San Diego", "Monash University", "University of Illinois Urbana-Champaign"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-513
pdf: https://www.isca-archive.org/interspeech_2026/si26_interspeech.pdf
---

# Explicit Context-Driven Neural Acoustic Modeling for High-Fidelity RIR Generation

*Chen Si, Qianyi Wu, Chaitanya Amballa, Romit Roy Choudhury*

[PDF](https://www.isca-archive.org/interspeech_2026/si26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/si26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-513)

**Category:** `enhancement-separation` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — MiNAF is a neural implicit model for room impulse response (RIR) generation that uses explicit local geometry features extracted from rough room meshes via ray casting. It outperforms state-of-the-art baselines across T60, C50, and EDT metrics while exhibiting robust performance under data-scarce and noisy mesh conditions.

## Key contributions

- Proposes a ray-based local context retrieval method that queries rough 3D room meshes using Fibonacci lattice sampling to extract direct explicit geometric features (distances, normals, proximity stats, occupancy histograms).
- Introduces an element-wise temporal embedding strategy to fuse the time index into the context matrix, preventing over-smoothed spectral predictions.
- Achieves superior per-scene RIR reconstruction accuracy compared to prior scene-specific implicit models (NAF, NACF, NeRAF, INRAS) and generative models (Mesh2IR) across SoundSpaces and GWA datasets.
- Demonstrates exceptional data-efficiency, outperforming full-dataset baselines using only 5% to 10% of training samples, and showing robustness to up to 30cm of Gaussian mesh noise or casually reconstructed multiview meshes.

## Problem

Simulating high-fidelity environmental acoustics requires estimating the Room Impulse Response (RIR), but prior neural implicit approaches rely exclusively on implicit global representations or indirect visual cues (such as RGB/depth images or latent NeRF grids) which obscure physical sound-surface interactions. Classical ray tracing and wave equation simulations are computationally prohibitive, while generative cross-scene mesh-to-RIR models struggle with per-scene accuracy due to a lack of local physical property modeling. This gap matters because accurate spatial audio is critical for AR/XR immersion, and failing to model explicit local obstacles, surface orientations, and multi-path reflections degrades acoustic realism.

## Method

MiNAF takes transmitter position pTx, receiver position pRx, orientation theta, channel index c, and time t to predict an STFT spectrum (log-magnitude and instantaneous frequency), which is converted back to a time-domain RIR via inverse STFT. For any given position p (Tx or Rx), a context retriever casts N uniformly distributed rays using Fibonacci lattice sampling against a rough room mesh. For each ray, it records the point of first hit (PoFH) distance d in R^N, surface normal n in R^(Nx3), neighbor distance statistics (mean mu and std dev sigma in R^N), and a global distance occupancy histogram occ in R^N_tau. These raw geometric features are projected into an h-dimensional space via nonlinear layers and concatenated to form a location context matrix Cp in R^(h x 5). 

To fuse spatial and temporal data, high-frequency sinusoidal position encodings of pTx and pRx are concatenated with Cp to yield a 12-channel context matrix. A separate sinusoidal position encoding of the time index t is projected to h dimensions and element-wise multiplied across the context columns, preserving matrix shape and injecting temporal awareness. Two identical MLPs (one for log-magnitude, one for instantaneous frequency) take this time-embedded context along with orientation theta and channel index c. The training objective combines an L1 loss on the spectral magnitude/IF with a Schroeder curve energy-decay matching loss scaled by alpha = 1.0, ensuring precise modeling of both frequency response and late reverberation tails.

## Experimental setup

Evaluated on the SoundSpaces dataset (18 indoor scenes from Replica across 6 specific test rooms: office 4, room 2, frl apartment 2/5, apartment 1/2; 80% train, 5% val, 15% test) and the GWA dataset (5 complex, sparse multi-room apartments from 3D-FRONT). Compared against baselines including AAC, Opus, INRAS, NAF, NACF, AV-NeRF, NeRAF, and Mesh2IR. Metrics include T60 relative error, C50 early-to-late energy ratio, EDT (Early Decay Time), spectral loss, SNR, and PSNR. Implemented using an NVIDIA RTX 4090 laptop GPU, taking ~3 hours to converge per scene on SoundSpaces (~2.2 minutes/epoch).

## Results

On SoundSpaces, using the Griffin-Lim phase reconstruction variant (MiNAF-GLim), MiNAF achieves a T60 error of 1.40% (a 22% reduction compared to NeRAF at 2.04%) with comparable C50 (0.40 vs 0.39 dB) and EDT (0.0020 vs 0.011 sec). Using ground-truth phase (MiNAF-GTP), it improves T60 by 40% and C50 by 26% over AV-NeRF. On the challenging GWA dataset, MiNAF-GLim achieves a T60 error of 2.44% and EDT of 0.0075 sec, vastly outperforming Mesh2IR (4.98% T60). Ablations reveal that removing surface normals (n) or the entire context (C) leads to catastrophic performance drops (e.g., ~31% increase in T60 error), and removing time-embedding worsens T60 by ~30%.

| System / Condition | T60 (%) ↓ | C50 (dB) ↓ | EDT (sec) ↓ |
|---|---|---|---|
| NeRAF [6] | 2.04 | 0.39 | 0.011 |
| AV-NeRF [18] | 2.47 | 0.57 | 0.016 |
| MiNAF(GTP) | 1.49 | 0.42 | 0.0023 |
| MiNAF(PreP) | 2.35 | 0.58 | 0.0042 |
| MiNAF(GLim) | 1.59 | 0.41 | 0.0022 |
| Mesh2IR [35] (GWA) | 4.98 | N/A | 0.22 |

## Limitations

MiNAF is a scene-specific model requiring training per environment, limiting zero-shot cross-scene generalizability without few-shot fine-tuning. Ray-mesh intersection preprocessing is computationally expensive for highly dense meshes (requiring ~15 minutes for complex Replica meshes containing over 1 million faces). Performance degrades sharply if mesh noise exceeds 50 cm variance or if probe ray counts drop below 512 rays. Evaluation is restricted to simulated indoor environments.

## Why read this

Researchers and engineers building spatial audio simulators, AR/XR audio engines, or neural acoustic fields should read this paper to understand how integrating explicit local geometry (surface normals and distance distributions via ray-casting) into implicit ML models dramatically improves RIR fidelity and data-efficiency under sparse recording conditions.

## Code

- https://chen-si-cs.github.io/projects/MiNAF/

## Applications

Augmented and virtual reality (AR/XR) spatial audio rendering, interactive video game sound propagation, virtual acoustic prototyping for architectural design, and digital twin simulation.

## Institutions / 機構

University of California San Diego, Monash University, University of Illinois Urbana-Champaign

## Related

- (link related pages by id as the wiki grows)
