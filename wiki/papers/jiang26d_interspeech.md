---
id: jiang26d_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1121
pdf: https://www.isca-archive.org/interspeech_2026/jiang26d_interspeech.pdf
---

# FreeSonic: Training-Free Temporal-Aware Decoupled Attention for Precise Audio Editing

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1121)

**TL;DR** — FreeSonic is a training-free, rectified flow-based audio editing framework that balances temporal consistency and background preservation, achieving superior performance on addition, removal, and replacement tasks without requiring task-specific fine-tuning.

## Problem

Text-conditioned audio editing is hindered by the additive nature of sound, where overlapping audio events make it difficult to modify foreground elements without causing unintended disruptions to the entire acoustic background. Existing training-free methods suffer from global latent shifts during editing, while training-based alternatives require expensive triplet datasets, specialized architectures, or external auxiliary models.

## Method

FreeSonic builds on the TangoFlux Multimodal Diffusion Transformer (MM-DiT) backbone, utilizing its rectified flow ODE inversion for stable and structurally faithful audio reconstruction. It extracts precise binary temporal masks from joint text-audio attention maps during the first five inversion steps, which are then refined via dilation and smoothing. A three-stage scheduled attention decoupling mechanism in the single blocks mixes source and target key-value features to dynamically guide modifications while injecting full source features in non-edited regions. Additionally, a task-oriented noise injection strategy perturbs the latent space exclusively within the masked target regions during early denoising steps to remove dependencies on original acoustic attributes for tasks like audio removal and replacement.

## Results

Evaluated on a benchmark combining AudioCaps, AudioSet Strong, FSD50K, ESC-50, and VGG-Sound across addition (1,300 samples), removal (1,300 samples), and replacement (750 samples) tasks against baselines including SDEdit, AudioEditor, ZETA, and SAO-Instruct. FreeSonic achieves superior FAD, KL divergence, Inception Score (IS), Fréchet Distance (FD), and CLAP similarity scores compared to training-free baselines and often outperforms the training-based SAO-Instruct. Ablation studies confirm that removing the temporal mask, full KV replacement, or omitting noise injection consistently degrades FAD, KL, and CLAP metrics. Efficiency analysis using RF-Solver with 25 steps demonstrates an RTF of 0.854 on a single NVIDIA A800 GPU.

## Code

- https://free-sonic.github.io/

## Applications

Speech and audio engineers, content creators, and developers building tools for targeted sound effect modification, audio cleanup, remixing, and semantic audio editing via text instructions.

## Related

- (link related pages by id as the wiki grows)
