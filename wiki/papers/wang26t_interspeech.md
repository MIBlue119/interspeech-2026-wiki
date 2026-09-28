---
id: wang26t_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1212
pdf: https://www.isca-archive.org/interspeech_2026/wang26t_interspeech.pdf
---

# MATA: A Training-Free Approach to Mitigate Cross-Modal Attention Imbalance in Large Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/wang26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1212)

**TL;DR** — MATA is a training-free inference-time intervention that dynamically boosts audio attention weights to fix cross-modal attention imbalance in Large Audio Language Models, improving average accuracy on the MMAU benchmark by up to 5.4 percentage points.

## Problem

Large Audio Language Models (LALMs) suffer from an attention bias that heavily prioritizes text tokens over acoustic information during multi-modal decoding. This acoustic under-utilization is particularly severe in intermediate decoder layers, leading to poor audio reasoning performance, hallucinations, and a reliance on text priors rather than actual audio inputs. Addressing this imbalance is critical for robust explainable audio reasoning without incurring the massive computational costs of full model retraining.

## Method

The authors propose MATA (Pay More Attention To Audio), a training-free technique that intervenes directly in the self-attention mechanism after raw attention scores are calculated but before softmax normalization. MATA multiplies the attention weights of audio tokens by a factor of (1 + α) specifically for the last token in the sequence at intermediate layers (decoder layers 10 to 20 for 7B models). The method adds no trainable parameters and negligible computational overhead. Experiments are conducted using open-source baseline models including Qwen2-Audio-7B, Qwen2.5-Omni-7B, Ke-Omni-R-7B, and Qwen3-Omni-Thinking, with the hyperparameter alpha set to a default value of 0.10.

## Results

Evaluated on the MMAU Test-mini (1k audios) and MMAR benchmarks, MATA delivers consistent gains across sound, music, and speech tasks. For Qwen2-Audio-7B-Instruct, MATA raises average MMAU accuracy from 59.4% to 64.8%, and for Qwen2.5-Omni-7B from 71.1% to 73.6%. On MMAR, Qwen2.5-Omni-7B accuracy increases from 56.6% to 61.2%. When integrated with Qwen3-Omni-Thinking in the Interspeech 2026 Audio Reasoning Challenge (Single Model Track), MATA secures second place, improving final answer accuracy from 68.6% to 71.0% and the rubric-based reasoning chain quality score from 58.7% to 62.6%. Ablations confirm that intermediate layers (10-20) and an alpha of 0.10 are optimal, whereas early (0-10) or late (20-28) layer interventions fail or severely degrade performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working with Large Audio Language Models for complex audio question answering, audio reasoning, and chain-of-thought generation tasks.

## Limitations

Excessive audio attention amplification (e.g., poorly chosen alpha values) can disrupt the delicate multi-modal balance, and interventions outside the optimal intermediate layer range lead to poor performance or catastrophic drops.

## Related

- (link related pages by id as the wiki grows)
