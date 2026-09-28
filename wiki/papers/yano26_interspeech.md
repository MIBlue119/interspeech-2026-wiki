---
id: yano26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2099
pdf: https://www.isca-archive.org/interspeech_2026/yano26_interspeech.pdf
---

# Adapting Text LLMs to Speech via Multimodal Depth Up-Scaling

*Kazuki Yano, Jun Suzuki, Shinji Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/yano26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yano26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2099)

**TL;DR** — Multimodal depth up-scaling inserts trainable transformer or E-Branchformer layers into frozen text LLMs during speech continual pre-training, matching full fine-tuning ASR performance while reducing text task degradation by over 75%.

## Key contributions

- Proposed multimodal depth up-scaling for cross-modal adaptation, freezing original LLM layers and training only newly inserted layers without needing text data replay.
- Introduced E-Branchformer as a specialized added-layer architecture containing parallel global self-attention and local convolutional gating units for acoustic processing.
- Designed a novel function-preserving initialization strategy for E-Branchformer using blocked merge projection matrices (W_Merge = [I; 0]) to ensure identical identity mapping at step zero.
- Demonstrated that added layers can be physically dropped at inference time to guarantee zero text degradation by perfectly recovering the base LLM.

## Problem

Continual pre-training of text LLMs on speech data (e.g., for Automatic Speech Recognition) notoriously causes catastrophic forgetting of original text capabilities. Prior strategies like experience replay require closed pre-training datasets and proportional compute overhead, whereas Parameter-Efficient Fine-Tuning methods such as LoRA fail to provide adequate capacity to absorb a new continuous acoustic modality. These shortcomings undermine the core advantage of building speech models directly on top of pre-trained linguistic knowledge.

## Method

The base models are SmolLM2-360M (32 layers) and SmolLM2-1.7B (24 layers). First, the tokenizer vocabulary is expanded with speech tokens derived from a combination of semantic and acoustic tokens (following OpusLM), resizing the input embedding matrix which is trained alongside newly inserted layers while all original model parameters remain strictly frozen. Depth up-scaling inserts m new layers (set to 25% of the original depth, i.e., 8 layers for 360M and 6 layers for 1.7B) using five placement strategies, with INTERLEAVED achieving the best ASR.

For the specialized architecture variant, E-Branchformer blocks are inserted as the trainable layers. Each E-Branchformer block utilizes a dual-branch design: a global extractor branch with Multi-Head Self-Attention (MHSA) for long-range context and a local extractor branch using a Convolutional Spatial Gating Unit (CSGU) within a gated MLP (cgMLP) applied exclusively to speech tokens. A merge module combines both branches via concatenation followed by a depthwise convolution and linear projection. Zero-initialization is applied to output projection matrices for standard transformers, while E-Branchformer uses W_Merge = [I; 0] alongside zeroed MHSA and depthwise convolution outputs to achieve strict function-preserving identity mapping (Y = X) at initialization.

Training uses the AdamW optimizer with a peak learning rate of 1e-4, a 25k-step linear warmup, decay to 2e-5, and an 8192 token maximum context length over ~48k hours of English ASR data from the OWSM v3.2 suite. At inference, the added layers can be entirely dropped to recover the pristine pre-trained model for text-only tasks, or retained for direct speech-conditioned text generation.

## Experimental setup

Experiments use the English ASR subset of the OWSM v3.2 suite (~48k hours). Baselines include full fine-tuning and LoRA configured with high ranks (r=144 for 360M, r=356 for 1.7B) to match the trainable parameter count of depth up-scaling (0.20B and 0.66B parameters). Evaluation metrics comprise Word Error Rate (WER) on LibriSpeech test-clean and test-other, and average accuracy across 8 text benchmarks (ARC-Easy, ARC-Challenge, BoolQ, HellaSwag, OpenBookQA, PIQA, WinoGrande, MMLU) evaluated via olmes.

## Results

On the 360M model, Interleaved depth up-scaling achieves a LibriSpeech WER of 3.1 (clean) / 6.7 (other) with a text score degradation of -1.9%, vastly outperforming full fine-tuning (WER 2.7 / 6.0, text drop -22.2%) and LoRA (WER 11.3 / 17.3, text drop -22.0%). On the 1.7B model with E-Branchformer added layers, depth up-scaling matches or beats full fine-tuning with a WER of 2.3 (clean) / 5.3 (other), while slashing text capability degradation to just -6.8% compared to -32.6% for full fine-tuning and -35.7% for LoRA, using 60% fewer trainable parameters than full fine-tuning.

Ablations demonstrate that Interleaved placement yields the best WER (3.1 vs 3.5 for TOP), while E-Branchformer added layers outperform standard transformer added layers (WER 2.3 vs 2.4 on 1.7B). Function-preserving initialization for E-Branchformer clearly beats random initialization (text drop -6.8% vs -7.0% and better clean WER). Qualitative tests confirm zero-shot translation, simplification, and summarization prompts succeed with depth up-scaling whereas full fine-tuning outputs degenerate loops.

| Model | Method | Trainable Params | LibriSpeech clean WER ↓ | LibriSpeech other WER ↓ | Text Avg Acc ↑ | Text Δ (%) |
|---|---|---|---|---|---|---|
| SmolLM2-360M | Pre-trained | – | – | – | 56.8 | 0.0 |
| SmolLM2-360M | Full Fine-Tuning | 2.70B | 2.7 | 6.0 | 34.6 | -22.2 |
| SmolLM2-360M | LoRA (r=144) | 0.20B | 11.3 | 17.3 | 34.9 | -22.0 |
| SmolLM2-360M | Depth Up-scaling (Interleaved) | 0.20B | 3.1 | 6.7 | 54.9 | -1.9 |
| SmolLM2-1.7B | E-Branchformer Up-scaling | 0.75B | 2.3 | 5.3 | 62.3 | -6.8 |
| SmolLM2-1.7B | Full Fine-Tuning | 1.87B | 2.3 | 5.6 | 36.5 | -32.6 |

## Limitations

The study evaluates solely English Automatic Speech Recognition using a single dataset suite (OWSM v3.2), leaving multilingual generalization and broader speech tasks (such as speech translation or dialogue) unverified. The compute overhead requires maintaining 20% to 25% additional layer parameters in memory during speech-inclusive inference unless explicitly dropped.

## Why read this

Researchers and engineers looking to adapt text LLMs into multimodal speech systems without sacrificing original text instruction-following or suffering catastrophic forgetting should read this paper to learn how depth up-scaling and E-Branchformer insertion outperform LoRA and full fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-enabled conversational LLMs, voice assistants, and on-device automatic speech recognition systems.

## Related

- (link related pages by id as the wiki grows)
