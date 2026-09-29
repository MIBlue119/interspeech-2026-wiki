---
id: wang26b_interspeech
category: audio-understanding
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-112
pdf: https://www.isca-archive.org/interspeech_2026/wang26b_interspeech.pdf
---

# FoleyGenEx: Unified Video-to-Audio Generation with Multi-Modal Control, Temporal Alignment, and Semantic Precision

*Shiyao Wang, Xijuan Zeng, Hui Wang, Shiwan Zhao, Feng Deng, Chen Zhang, Yong Qin*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-112)

**Category:** `audio-understanding` · **Labels:** `generative-model`

**TL;DR** — FoleyGenEx is a unified video-to-audio generation framework built on a Multi-modal Diffusion Transformer that integrates multi-modal control, frame-level temporal alignment, and fine-grained adverbial semantics, achieving an OnsetSyncAP of 69.71% and a VGGSound Fréchet Distance of 0.73.

## Key contributions

- A conditional injection mechanism that integrates audio latents via channel-wise concatenation and residual summation, enabling zero-shot audio-controlled VTA and Foley extension.
- A multi-modal dynamic masking strategy applied across audio, visual, and synchronization streams to eliminate shortcut biases and preserve train-inference temporal alignment.
- An adverb-based data augmentation pipeline combining signal processing operations (speed, distance via room reverberation, and volume dynamics) with LLM-generated captions to support nuanced physical semantics.
- Unification of six core generation capabilities into a single MMDiT model: TTA, VTA, TC-VTA, AC-VTA, Foley extension, and latent inversion-based temporal audio editing.

## Problem

Prior video-to-audio frameworks fall into a functional trade-off: methods like MultiFoley provide multi-modal conditioning but degrade temporal synchronization via simple feature upsampling, whereas models like MMAudio achieve frame-level synchronization using Multi-modal Diffusion Transformers (MMDiT) and Synchformer but lack a reference audio conditioning branch. Furthermore, standard datasets lack adverbial cues (such as speed or volume indicators), forcing models to fail when text prompts specify subtle qualitative modifications like 'fast knocking' versus 'slow knocking.'

## Method

FoleyGenEx builds upon an MMDiT backbone for multi-modal feature fusion and a single-modal DiT for iterative flow-matching audio generation. Audio latents are extracted via a pretrained DAC-VAE and subjected to a stochastic masking strategy (70-100% masked during training, with a 30% probability of complete zeroing for unconditional compatibility) to ensure consistency with inference-time reference audio injection. Text semantics are encoded via CLIP, while visual features use a CLIP visual encoder combined with Synchformer-derived temporal synchronization features.

To optimize cross-modal alignment without gradient dilution, FoleyGenEx implements a Masked Mean Squared Error (MSE) loss that isolates gradients strictly to the masked regions. For conditioning, projected text and video semantic features are average-pooled and combined with visual synchronization via an MLP, feeding into the model through adaptive layer normalization (adaLN). The framework supports diverse input tasks by toggling modality streams (e.g., zeroing video semantics for text-controlled VTA or prepending surrogate video segments to match reference audio durations during audio-controlled tasks).

The adverb-based data augmentation pipeline mines base text for opposing speed, distance, and volume adverbs. It applies targeted signal processing—SoX for 0.7x to 1.3x speed scaling, Pyroomacoustics for reverberant distance simulation, and FFmpeg for crescendo/decrescendo volume dynamics—followed by LLM-based caption rewriting and paraphrasing to construct an 88,370-sample augmented training subset.

## Experimental setup

The model is trained on a composite dataset containing ~500 hours of VGGSound video segments (truncated to 8 seconds), ~128 hours of AudioCaps, 7,600 hours of WavCaps, and 88,370 in-house adverb-augmented samples. Baselines include MMAudio, MultiFoley, FoleyCrafter, VTA-LDM, and CondFoleyGen. Evaluation metrics encompass Fréchet Distance (FDVGG), Inception Score (IS), Interspeech av-benchmark metrics including CLAPT and IB-score for semantic alignment, DeSync for temporal misalignment, and OnsetSyncAP, Resemblyzer, and CLAPA for audio-controlled tasks. Implementation uses 8 A100 GPUs with a batch size of 256 for 300,000 to 330,000 steps using Adam-based flow matching.

## Results

FoleyGenEx + AA achieves superior distribution matching and semantic relevance on AudioCaps, recording an FDVGG of 2.60 and a CLAPT score of 0.366, outperforming baseline MMAudio (FDVGG 4.03, CLAPT 0.303). On the VGGSound test set, FoleyGenEx + AA attains a VGGSound FD of 0.73, an Inception Score of 18.49, an IB-score of 38.06, and a DeSync of 0.403 under filtered evaluation, outperforming FoleyCrafter and MultiFoley.

In audio-controlled VTA (AC-VTA) on Greatest Hits, FoleyGenEx achieves an OnsetSyncAP of 69.71%, an FDVGG of 0.54, a Resemblyzer timbre score of 0.9128, and a CLAPA score of 0.7250, closely rivaling domain-specific CondFoleyGen without requiring in-domain training. Ablation tests demonstrate that removing multimodal masking or conditional injection degrades temporal alignment (OnsetSyncAP dropping below 67%) and stylistic transfer quality.

| System | FDVGG ↓ | IS ↑ | IB-score ↑ | DeSync ↓ |
|---|---|---|---|---|
| VTA-LDM [32] | 2.02 | 11.32 | 28.34 | 1.275 |
| FoleyCrafter [9] | 2.74 | 16.15 | 30.20 | 1.240 |
| MMAudio [13] | 1.13 | 17.59 | 37.85 | 0.393 |
| FoleyGenEx (Ours) | 0.87 | 18.64 | 37.23 | 0.409 |
| FoleyGenEx + AA (Ours) | 0.86 | 19.56 | 38.06 | 0.403 |

## Limitations

The framework relies on surrogate video padding to resolve duration mismatches during reference audio conditioning, which can introduce artifacts if structural dynamics diverge significantly. The adverb augmentation dataset is synthetically generated via signal processing rules and LLMs, which may not capture the full chaotic acoustic diversity of real-world physical environments.

## Why read this

Researchers and audio engineers working on generative multimodal audio should read this paper to see how an MMDiT backbone can be structurally augmented with stochastic masking and conditional injection to unify reference-guided and text-conditioned tasks without sacrificing frame-level temporal synchronization.

## Code

- https://foleygenex.github.io/FoleyGenEx

## Applications

Automated silent film dubbing, post-production Foley sound effect generation, damaged audio track restoration, and fine-grained video-to-audio editing.

## Institutions / 機構

Nankai University, Kuaishou Technology

## Related

- (link related pages by id as the wiki grows)
