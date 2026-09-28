---
id: jiang26d_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1121
pdf: https://www.isca-archive.org/interspeech_2026/jiang26d_interspeech.pdf
---

# FreeSonic: Training-Free Temporal-Aware Decoupled Attention for Precise Audio Editing

*Yuxuan Jiang, Mingyang Han, Yusheng Dai, Andong Wang, Tianhong Zhou, Jiaxin Ye, Dongxiao Wang, Haoxiang Shi, Boyu Li, Jun Song, Cheng Yu, Bo Zheng, Weibei Dou, Zehua Chen, Jun Zhu*

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1121)

**TL;DR** — FreeSonic is a training-free audio editing framework built on the Rectified Flow-based TangoFlux model that uses scheduled attention decoupling and task-oriented noise injection to achieve precise localized modifications while preserving temporal consistency and background acoustics. It outperforms existing training-free and training-based baselines across addition, removal, and replacement benchmarks.

## Key contributions

- Proposes the first rectified flow inversion-based, training-free audio editing framework that avoids costly specialized fine-tuning or triplet dataset collection.
- Introduces an automated temporal extraction mechanism using joint text-audio attention maps from MM-DiT double blocks to localize edited regions without external segmentation models.
- Implements a three-stage scheduled attention decoupling strategy in MM-DiT single blocks to blend source and target KV features dynamically for seamless editing.
- Develops a task-oriented noise injection strategy restricted to masked temporal regions to enable challenging non-rigid replacements and audio removals.

## Problem

Text-conditioned audio editing requires balancing temporal consistency (keeping unedited parts untouched) and background preservation (keeping background sounds intact during foreground changes). Existing diffusion or autoregressive editing methods struggle to decouple overlapping sound events in the additive audio domain, often causing global perturbations when a prompt is altered. Training-based alternatives demand complex triplet datasets and rigid architectural constraints, limiting their flexibility and practical utility.

## Method

FreeSonic builds on the TangoFlux text-to-audio architecture, which uses a Multi-Modal Diffusion Transformer (MM-DiT) backbone driven by Rectified Flow. The pipeline starts with an optimized deterministic inversion-reverse process utilizing first-order or second-order RF solvers over 25 total denoising steps, which establishes straight probability trajectories to minimize structural reconstruction error.

To localize where modifications should occur, FreeSonic extracts binary temporal masks from the text-audio cross-attention maps within the double blocks during the first five inversion steps, applying temporal dilation and smoothing to eliminate internal discontinuities. For the denoising phase, a three-stage scheduled attention decoupling strategy operates within the single blocks. In Stage 1 (early steps), source and target Key-Value (KV) features are mixed using a scheduling coefficient delta that linearly transitions from 0.85 to 1.0, while non-edited regions receive a full injection of source KV features based on the temporal mask. In Stage 2 (intermediate phase), delta is set to 1.0 to let the target prompt drive generation within the mask. In Stage 3 (final steps), standard unconstrained self-attention is restored for global acoustic harmonization.

To handle difficult tasks like audio removal or non-rigid replacement where source residual latents stubbornly persist, a task-oriented noise injection strategy perturbs the latent distribution exclusively inside the temporal mask during early steps. Gaussian noise scaled by a linear scheduler (intensity lambda ranging from 0.1 to 0.4 depending on the task, cut off at step t1 = 5) breaks the deterministic dependency on source acoustic attributes without harming the unedited background.

## Experimental setup

Evaluated on a benchmark composed of 10-second clips drawn from AudioCaps, AudioSet Strong, FSD50K, ESC-50, and VGG-Sound, spanning three tasks: addition (1,300 samples), removal (1,300 samples), and replacement (750 samples). Compared against training-free baselines SDEdit, AudioEditor, and ZETA, as well as the training-based baseline SAO-Instruct. Metrics include Fréchet Audio Distance (FAD), Kullback–Leibler Divergence (KL), Inception Score (IS), Fréchet Distance (FD), CLAP similarity, Real-Time Factor (RTF), and Mean Opinion Score (MOS); experiments executed on a single NVIDIA A800 GPU using 25 RF-Solver steps (150 total NFE including inversion and CFG).

## Results

On the Addition task, FreeSonic achieves an FAD of 1.55 and a CLAP similarity of 0.374, outperforming the best training-free baseline ZETA (FAD 1.69, CLAP 0.368) and training-based SAO-Instruct (FAD 1.87, CLAP 0.352). For Removal, FreeSonic scores 1.95 FAD and 0.420 CLAP, compared to ZETA's 2.49 FAD and 0.402 CLAP. For Replacement, FreeSonic records 1.83 FAD and 0.424 CLAP, leading ZETA (2.27 FAD, 0.378 CLAP). Ablation studies show that removing the temporal mask degrades FAD from 1.78 to 2.05, substituting scheduled decoupling with full KV replacement worsens FAD to 1.96, and omitting noise injection drops FAD to 2.11.

| System | Add FAD ↓ | Add CLAP ↑ | Remove FAD ↓ | Remove CLAP ↑ | Replace FAD ↓ | Replace CLAP ↑ |
|---|---|---|---|---|---|---|
| SDEdit | 2.35 | 0.319 | 4.93 | 0.352 | 3.67 | 0.338 |
| AudioEditor | 1.92 | 0.355 | 2.68 | 0.395 | 2.29 | 0.362 |
| ZETA | 1.69 | 0.368 | 2.49 | 0.402 | 2.27 | 0.378 |
| SAO-Instruct* | 1.87 | 0.352 | 3.60 | 0.408 | 3.14 | 0.316 |
| FreeSonic | 1.55 | 0.374 | 1.95 | 0.420 | 1.83 | 0.424 |

## Limitations

The framework relies heavily on the quality of attention maps generated by the underlying TangoFlux model during early inversion steps, meaning highly ambiguous prompts or poorly localized cross-modal alignments can reduce extraction precision. Additionally, the approach is tightly coupled to the MM-DiT architecture of flow-based models and inherits any language or acoustic domain biases present in the base generator.

## Why read this

Speech and audio ML researchers working on generative audio editing should read this to see how rectified flow inversion and scheduled attention decoupling can replace expensive fine-tuning and complex dataset curation for precise temporal audio control.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Post-production sound design, automated audio track remixing, movie sound effect editing, and content-based audio modification.

## Related

- (link related pages by id as the wiki grows)
