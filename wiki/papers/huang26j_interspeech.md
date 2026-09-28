---
id: huang26j_interspeech
category: speech-translation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1546
pdf: https://www.isca-archive.org/interspeech_2026/huang26j_interspeech.pdf
---

# SignMatch: Aligning Pose Latent Diffusion via Multi-dimensional Rewards for Sign Language Video Generation

[PDF](https://www.isca-archive.org/interspeech_2026/huang26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1546)

**TL;DR** — SignMatch is a unified framework for sign language video generation that combines an LLM-guided pose-latent diffusion planner with a video renderer, optimized via multi-dimensional reinforcement learning rewards to achieve state-of-the-art semantic fidelity and realism.

## Problem

Sign language video generation suffers from weak spatial and temporal alignment between input text semantics and fine-grained signing motion. Existing methods struggle to simultaneously maintain linguistic correctness and visual realism because standard likelihood training fails to optimize directly for downstream perceptual and translation objectives. Overcoming this gap is essential for producing natural, accessible sign language content in educational and assistive applications.

## Method

The framework utilizes a staged architecture consisting of an LLM-empowered pose-latent diffusion model (using T5-Large and a flow-matching transformer) to map spoken text to motion conditions, paired with a motion-aware sign video diffusion renderer initialized from Stable Diffusion v1.5 and AnimateDiff. To optimize the pose generator without modifying the frozen video renderer, the model applies Flow-GRPO post-training using LoRA adapters of rank 64 on 8 A100 GPUs for 200K steps. A multi-dimensional reward function combines pose-level back-translation BLEU for semantic fidelity and structural similarity (SSIM) for visual quality, balanced equally with weights set to 0.5.

## Results

Evaluated on RWTH-2014T and How2Sign benchmarks, SignMatch outperforms baselines such as ProTran, MoMP, SignGAN, SignGen, and SignViP across semantic and visual metrics. On RWTH-2014T, it achieves a Fréchet Video Distance (FVD) of 914 (improving over SignViP's 967), an identity similarity (IDS) of 0.60, and a structural similarity (SSIM) of 0.70. On How2Sign, it attains an FVD of 2009, outperforming SignViP's 2103, along with improvements in BLEU and COMET translation metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building automated sign language translation systems, accessibility tools for the deaf and hard-of-hearing, and educational software for inclusive human-computer interaction.

## Limitations

The text does not state any specific limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
