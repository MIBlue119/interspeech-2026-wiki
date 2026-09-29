---
id: huang26j_interspeech
category: applications-other
labels: [generative-model]
institutions: ["Chinese University of Hong Kong"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1546
pdf: https://www.isca-archive.org/interspeech_2026/huang26j_interspeech.pdf
---

# SignMatch: Aligning Pose Latent Diffusion via Multi-dimensional Rewards for Sign Language Video Generation

*Rongjie Huang, Weidong Chen, Helen Meng, Xixin Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1546)

**Category:** `applications-other` · **Labels:** `generative-model`

**TL;DR** — SignMatch is a unified sign language video generation framework that combines an LLM-guided pose-latent diffusion model with a motion-aware video renderer, optimized via multi-dimensional Flow-GRPO to improve semantic and visual faithfulness. On RWTH-2014T, it raises BLEU-4 from 7.9 to 11.3 and improves FVD from 967 to 914 compared to the strongest baseline.

## Key contributions

- Proposes SignMatch, a staged sign language video generation framework coupling an LLM-empowered pose-latent diffusion planner with a motion-aware sign video diffusion renderer.
- Introduces a multi-dimensional RL post-training strategy using Flow-GRPO applied exclusively to the pose-latent generator via LoRA rank 64.
- Implements balanced semantic (pose-level back-translation BLEU) and visual (SSIM) rewards to prevent degradation in visual realism while optimizing linguistic correctness.
- Demonstrates state-of-the-art performance across semantic fidelity and video quality on both RWTH-2014T (German Sign Language) and How2Sign (American Sign Language).

## Problem

Sign language video generation suffers from weak spatio-temporal alignment between text semantics and fine-grained signing motion. Existing staged pipelines like ProTran, SignGen, and SignViP rely strictly on standard likelihood training, which fails to jointly optimize linguistic faithfulness and visual realism. This leads to generated sign videos that either lose key semantic meaning or exhibit temporal incoherence and identity drift.

## Method

SignMatch factorizes video generation into two stages: an LLM-empowered pose-latent diffusion planner and a motion-aware video diffusion renderer. The planner uses a T5-Large (770M) text encoder combined with a flow-matching transformer (sampled via torchdiffeq ODE solvers with step size 0.04) to map text to motion latents encoding body pose and hand motion. The renderer uses a Stable Diffusion v1.5 U-Net backbone warm-started with AnimateDiff for temporal attention, conditioned by a condition encoder for multi-scale motion features and a reference VAE encoder to preserve signer identity.

To align generation with downstream intents without rendering full videos at every RL step, Flow-GRPO is applied exclusively to the pose-latent generator using LoRA adapters of rank 64 while keeping the video renderer frozen. A group of G = 8 candidate motion latents is sampled per text input. The multi-dimensional reward combines a semantic reward (pose-level back-translation BLEU, R_BLEU) and a structural visual reward (SSIM against ground truth pose, R_SSIM), weighted equally at lambda_sem = 0.5 and lambda_vis = 0.5. Group standardization is applied to both dimensions before aggregating into a scalar advantage.

The training utilizes a randomly sampled single denoising step t to compute policy gradients, avoiding instability from backpropagating through all steps. A KL regularization term with coefficient beta = 0.04 prevents catastrophic policy drift relative to the reference policy (beta <= 0.01 leads to collapse). Training runs on 8 A100 GPUs up to 200K likelihood steps, with the final RL checkpoint selected at 4,000 steps.

## Experimental setup

Evaluated on RWTH-2014T (German Sign Language) and How2Sign (American Sign Language). Compared against baselines ProTran, MoMP, SignGAN, SignGen, and SignViP. Metrics include back-translation BLEU (1-4), ROUGE, COMET, Fréchet Video Distance (FVD), Identity Similarity (IDS), and Structural Similarity (SSIM). Notable implementation: 8 A100 GPUs, T5-Large text backbone, Stable Diffusion v1.5 U-Net renderer, LoRA rank 64, G=8 candidates per group.

## Results

On RWTH-2014T, SignMatch achieves a BLEU-4 of 11.3 (outperforming the strongest baseline SignViP at 7.9), a ROUGE score of 27.1, COMET of 0.62, and reduces FVD from 967 to 914 while improving IDS to 0.60 and SSIM to 0.70. On How2Sign, it achieves a BLEU-4 of 5.1 (vs 4.5 for SignViP), ROUGE of 17.1, COMET of 0.55, and FVD of 2009 (vs 2103). Ablations show that optimizing with BLEU reward alone raises BLEU-4 to 10.7 but worsens FVD to 978, whereas SSIM reward alone improves FVD to 901 but yields a lower BLEU-4 of 9.7; the combined reward achieves the best balance (BLEU-4 11.3, FVD 914). Replacing T5-Large with a larger decoder-only Qwen3-8B model causes a substantial drop in BLEU-4 to 11.04.

| System / Condition | BLEU-4 | FVD (↓) | SSIM (↑) | IDS (↑) |
| --- | --- | --- | --- | --- |
| SignGAN (RWTH-2014T) | 5.2 | 1212 | 0.62 | 0.49 |
| SignGen (RWTH-2014T) | 7.6 | 1566 | 0.59 | 0.54 |
| SignViP (RWTH-2014T) | 7.9 | 967 | 0.68 | 0.56 |
| SignMatch (RWTH-2014T) | 11.3 | 914 | 0.70 | 0.60 |
| SignViP (How2Sign) | 4.5 | 2103 | 0.63 | 0.59 |
| SignMatch (How2Sign) | 5.1 | 2009 | 0.65 | 0.61 |

## Limitations

The framework relies on pre-extracted 3D hand-lifted OpenPose skeletons for latent representations, meaning errors in keypoint estimation propagate to the generation stage. Evaluation is restricted to German and American Sign Languages on standard academic benchmarks, leaving generalization to low-resource sign languages untested. The approach freezes the video renderer during RL post-training, restricting policy optimization exclusively to the motion latent space.

## Why read this

Researchers and engineers working on controllable video diffusion, reinforcement learning for generative models, or assistive sign language generation should read this to see how multi-dimensional preference alignment can be efficiently applied to an intermediate latent space rather than a heavy video generator.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive communication systems for deaf and hard-of-hearing individuals, educational content creation, and automated translation interfaces for spoken-to-sign language.

## Institutions / 機構

Chinese University of Hong Kong

**Funding / 經費:** Centre for Perceptual and Interactive Intelligence, InnoHK

## Related

- (link related pages by id as the wiki grows)
