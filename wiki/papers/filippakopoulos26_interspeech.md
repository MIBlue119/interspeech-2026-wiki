---
id: filippakopoulos26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1299
pdf: https://www.isca-archive.org/interspeech_2026/filippakopoulos26_interspeech.pdf
---

# Segregate, Refine, Integrate: Decomposing Multimodal Fusion for Sentiment Analysis

*Alexios Filippakopoulos, Elias Kallioras, Nikolaos Xiros, Efthymios Georgiou, Alexandros Potamianos*

[PDF](https://www.isca-archive.org/interspeech_2026/filippakopoulos26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/filippakopoulos26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1299)

**TL;DR** — The paper introduces SeRIn, a multimodal language model fusion scheme that enforces interaction topology through structural segregation, achieving state-of-the-art sentiment analysis results on CH-SIMS and CMU-MOSEI across all metrics.

## Key contributions

- Frames interaction topology as a distinct fusion design axis separate from depth and capacity.
- Realizes segregation via parameter-free modality-constrained attention masks inside a frozen LLM backbone.
- Introduces Internally Gated Cross-Attention (IGCA) and Self-Attention (IGSA) with content-dependent element-wise gating.
- Reaches SOTA on CH-SIMS and CMU-MOSEI while demonstrating emergent modality reweighting under visual corruption.

## Problem

Multimodal sentiment analysis requires simultaneously refining modality-specific signals and modeling cross-modal interactions, but prior tensor, attention, and disentanglement methods entangle these objectives within a single unstructured operation or rely on soft optimization penalties. This lack of architectural constraints causes premature cross-modal mixing and lexical dominance, where strong text priors suppress subtle acoustic and visual cues like sarcasm or suppression. Establishing an explicit interaction topology during the forward pass resolves this bottleneck without needing heuristic objective balancing.

## Method

SeRIn builds upon a frozen pretrained decoder-only language model backbone (GPT2-base for SIMS, GPT2-large for MOSEI) augmented with learnable fusion tokens partitioned into disjoint modality-specific groups: audio, visual, and audiovisual (AV). The Segregate principle is enforced via parameter-free modality-constrained attention masks that isolate unimodal streams from auxiliary contamination throughout representation learning. The AV group forms a read-only cross-modal pathway that aggregates evolving unimodal states without writing back. 

Refinement occurs via Multimodal (MM) Blocks inserted at specific layer subsets. Each block applies Internally Gated Cross-Attention (IGCA) where fusion tokens query independent AV encoder streams (COVAREP/LibROSA for audio, Facet/OpenFace for video, projected to _d_enc), modulated element-wise by a content-dependent sigmoid gate prior to output projection. This is followed by Modality-Constrained Internally Gated Self-Attention (IGSA) to consolidate intra-group representations, and a gated feed-forward network initialized from the frozen LM weights. 

Finally, the Integrate stage lifts all segregation constraints at the prediction step. Summary vectors from text, fusion tokens, and AV encoders are aggregated by an Integration Head consisting of a small Transformer encoder over a prepended [CLS] token, feeding a linear regression/classification head. Auxiliary prediction heads provide direct supervision to intermediate streams during training alongside a multimodal language modeling loss and sequence augmentation (SeqAug) to prevent catastrophic forgetting.

## Experimental setup

Evaluated on CH-SIMS (2,281 monologue utterances, ~2.3 hours, balanced modalities) and CMU-MOSEI (23,453 clips, ~66 hours, text-dominant). Compared against baselines including MulT, Self-MM, TETFN, CENet, JTUM, DLF, DEVA, DRTSC, KuDA, MTFN, and DeepMLF. Metrics include Acc2, F1, MAE, Pearson correlation, Acc3, Acc5, and Acc7. Implemented in M-SENA using AdamW (lr=1e-4, batch size 32) on a single NVIDIA A100 GPU.

## Results

SeRIn establishes new state-of-the-art results across all metrics on both benchmarks. On CH-SIMS, it achieves 84.30 Acc2, 84.42 F1, 0.357 MAE, and 0.732 Pearson correlation, improving over the strong DeepMLF baseline by +1.72 Acc2 and +1.65 F1. On CMU-MOSEI, it reaches 87.79 Acc2, 87.78 F1, 0.493 MAE, and 0.810 correlation (+1.02 Acc2 over DeepMLF). Subtractive ablations reveal that removing the LM-level mask causes the steepest drops (falling to 81.07 Acc2 on SIMS and 85.47 on MOSEI), and a capacity-matched ablation retaining added parameters without the structural masks performs worse than DeepMLF, proving topology drives the gains.

| System / Condition | CH-SIMS Acc2 | CH-SIMS F1 | CMU-MOSEI Acc2 | CMU-MOSEI F1 |
|---|---|---|---|---|
| MulT | 78.56 | 79.66 | 84.63 | 84.52 |
| Self-MM | 80.04 | 80.44 | 85.15 | 84.90 |
| KuDA | 80.74 | 80.71 | 86.46 | 86.59 |
| MTFN | 81.56 | 81.27 | 86.60 | 85.80 |
| DeepMLF* | 82.58 | 82.77 | 86.77 | 86.77 |
| **SeRIn (Ours)** | **84.30** | **84.42** | **87.79** | **87.78** |

## Limitations

The study is scoped to utterance-level multimodal sentiment analysis using frozen monolingual GPT-2 backbones (English and Chinese) and standard frame-level feature extractors (COVAREP, OpenFace). Compute costs increase moderately for smaller backbones (e.g., 2.2x parameter increase on GPT2-base). The approach assumes clean architectural alignment of discrete modality pathways, making it less straightforward to apply to raw end-to-end multi-stream audio-visual-text LLMs without predefined stream partitions.

## Why read this

Speech and ML engineers working on multimodal fusion architectures will find a rigorous blueprint for replacing optimization-based regularization with architectural interaction topology. Readers will take away a clean recipe for freezing a backbone LLM while using structurally masked, internally gated token pathways to safely inject non-linguistic signals without cross-modal contamination.

## Code

- https://github.com/SeRIn-MSA

## Applications

Affective computing, conversational agents, mental health assessment, and social media opinion mining.

## Related

- (link related pages by id as the wiki grows)
