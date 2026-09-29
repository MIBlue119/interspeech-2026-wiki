---
id: ahn26_interspeech
category: audio-understanding
labels: [self-supervised, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2897
pdf: https://www.isca-archive.org/interspeech_2026/ahn26_interspeech.pdf
---

# Context-Adaptive Automated Audio Captioning with Symmetric Dual-MoE and Dynamic Reward Routing

*Seyun Ahn, Joon-Hyuk Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/ahn26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ahn26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2897)

**Category:** `audio-understanding` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — A context-adaptive automated audio captioning framework using a symmetric dual mixture-of-experts (MoE) architecture and Group Relative Policy Optimization (GRPO) achieves state-of-the-art semantic alignment and human preference scores on benchmark datasets.

## Key contributions

- Proposes a Symmetric Dual-MoE framework that introduces context-adaptive expert routing to both the policy decoder and the multi-dimensional reward model.
- Introduces an Audio-Text Fusion Transformer (ATFT) within the reward model to evaluate fine-grained, token-level audio-text alignment.
- Employs Group Relative Policy Optimization (GRPO) with variance-clamped group normalization to stabilize multi-dimensional reward learning without explicit value estimation.
- Applies cross-attention-guided routing inside the policy decoder, conditioning expert selection dynamically on evolving acoustic-linguistic hidden states.

## Problem

Traditional automated audio captioning (AAC) optimizes uniform objectives like maximum likelihood estimation, causing a mismatch with evaluation metrics and failing to capture fine-grained audio-text correspondences. Prior reinforcement learning approaches rely on static reward formulations and global similarity metrics that do not adapt to heterogeneous acoustic scenes. Furthermore, shared parameterization across all inputs restricts context-conditioned knowledge activation, while standard RL techniques like PPO or SCST introduce excessive computational complexity.

## Method

The policy network uses a pretrained BART-base decoder with hidden size 768, where LoRA-based experts (rank 8) are inserted into the feed-forward networks of the 4th and 5th decoder layers. A shared pathway preserves linguistic priors, while cross-attention states drive top-1 sparse expert routing. The reward model builds upon a frozen RoBERTa-base encoder with three LoRA experts estimating semantic relevance ($R_{sem}$), grammatical correctness ($R_{gra}$), and lexical diversity ($R_{div}$). 

An Audio-Text Fusion Transformer (ATFT) with an 8-head cross-attention mechanism computes fine-grained alignment ($R_{atft}$) between acoustic features ($A \in \mathbb{R}^{S \times d}$) and textual features ($T \in \mathbb{R}^{L \times d}$). A context-aware reward router takes the pooled global audio representation to dynamically weight these standardized reward components across a sampling group of $G$ candidate captions. 

Training proceeds in two stages: supervised cross-entropy pretraining followed by reinforcement learning via GRPO. For each audio clip, $G$ captions are sampled, and group-relative normalization computes advantages without a separate value network, optimizing a clipped policy objective.

## Experimental setup

Evaluated on Clotho v2.1 (15-30 second Freesound clips, 5 captions each) and AudioCaps (10-second YouTube clips, 1-5 captions each). Implemented in PyTorch Lightning on a single NVIDIA RTX 3090 GPU, comparing against supervised deep learning (DL) baselines and reinforcement learning methods (CIDEr [21], CRRP [22]). Metrics include BLEU-4, CIDEr, S-BERT similarity, FER, FENSE, SPIDEr-FL, and human MOS evaluations ($MOS_n$ for naturalness, $MOS_a$ for alignment) rated by 30 evaluators.

## Results

On Clotho v2.1, the proposed model achieves top performance with BLEU-4 of 0.1740, CIDEr of 0.4137, S-BERT similarity of 0.4803, FER of 0.0383, FENSE of 0.4642, and SPIDEr-FL of 0.2626, alongside human scores of $MOS_n 4.16$ and $MOS_a 4.52$. On AudioCaps, it achieves BLEU-4 of 0.2794, S-BERT of 0.6937, FENSE of 0.6117, SPIDEr-FL of 0.3570, $MOS_n 4.28$, and $MOS_a 3.96$, though CIDEr-optimized RL [21] edges out on pure CIDEr score (0.6777 vs 0.6596). Ablations show that removing policy MoE or reward MoE, or dropping individual reward components ($R_{sem}$, $R_{gra}$, $R_{div}$, $R_{atft}$), uniformly degrades alignment metrics.

| System | Dataset | BLEU-4 ↑ | CIDEr ↑ | S-BERT sim ↑ | FENSE ↑ | SPIDEr-FL ↑ |
|---|---|---|---|---|---|---|
| DL Baseline | Clotho v2.1 | 0.1575 | 0.3775 | 0.4745 | 0.4411 | 0.2358 |
| CIDEr [21] | Clotho v2.1 | 0.1601 | 0.3831 | 0.4743 | 0.4420 | 0.2393 |
| CRRP [22] | Clotho v2.1 | 0.0828 | 0.2566 | 0.4718 | 0.4371 | 0.2268 |
| Proposed | Clotho v2.1 | **0.1740** | **0.4137** | **0.4803** | **0.4642** | **0.2626** |
| Proposed | AudioCaps | **0.2794** | 0.6596 | **0.6937** | **0.6117** | **0.3570** |

## Limitations

The evaluation is restricted to English-language datasets (Clotho and AudioCaps) and relies on pretrained text (RoBERTa/BART) and audio (ConvNeXt-Tiny) encoders whose biases and capacity bound the overall framework. Vocabulary novelty, while improved over SFT baselines, still lags significantly behind human ground truth descriptions. Furthermore, compute requirements for group sampling during GRPO scale with group size $G$, though mitigated by lightweight LoRA adapters.

## Why read this

Researchers and engineers working on multimodal generation and reinforcement learning alignment will find this paper valuable for its design of symmetric, context-adaptive MoE structures on both policy and reward paths. It offers a practical template for pairing Group Relative Policy Optimization with fine-grained multi-dimensional reward routing to bypass value network overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated audio captioning for video accessibility, acoustic monitoring, digital media indexing, and smart home context-awareness systems.

## Institutions / 機構

Hanyang University

**Funding / 經費:** National Research Foundation of Korea

## Related

- (link related pages by id as the wiki grows)
