---
id: cao26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-861
pdf: https://www.isca-archive.org/interspeech_2026/cao26_interspeech.pdf
---

# X-OPD: Cross-Modal On-Policy Distillation for Capability Alignment in Speech LLMs

*Di Cao, Dongjie Fu, Hai Yu, Siqi Zheng, Xu Tan, Tao Jin*

[PDF](https://www.isca-archive.org/interspeech_2026/cao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-861)

**TL;DR** — X-OPD is a cross-modal on-policy distillation framework designed to close the intelligence gap between speech LLMs and text-based LLMs through self-exploration rollouts and dual-advantage token feedback, reducing the average speech performance drop from 11.29% to 3.43% on Qwen3-Omni-A3B.

## Key contributions

- Proposes a cross-modal on-policy distillation framework (X-OPD) that eliminates exposure bias by allowing the student model to perform autonomous rollouts across speech and text modalities.
- Introduces a dual-advantage mechanism combining in-modal (text-based) and cross-modal advantage functions via KL divergence to transfer teacher logical knowledge into multi-modal student representations.
- Constructs a high-quality parallel alignment dataset of ~204.2 hours (27,847 pairs derived from Tulu 3 and NaturalReasoning) using Gemini-3-Flash for prompt re-writing, CosyVoice3 for synthesis, and SenseVoice for ASR verification.
- Demonstrates that X-OPD prevents catastrophic forgetting of acoustic and foundational skills, maintaining near-lossless performance on the MMAR benchmark (>69% vs 59.9% for standard SFT/Offline KD/GKD).

## Problem

End-to-end speech LLMs suffer from severe performance degradation in complex reasoning, logical deduction, and instruction-following compared to their text-based counterparts. Standard Supervised Fine-Tuning (SFT) and Reinforcement Learning (RL) fail to bridge this gap due to a scarcity of paired speech-reasoning data and inherent misalignment between continuous acoustic features and discrete text spaces. Furthermore, offline distillation methods suffer from exposure bias and error accumulation, while naive alignment attempts often trigger catastrophic forgetting of pre-trained acoustic priors.

## Method

The framework utilizes a parallel dataset of semantically invariant speech and text instructions, (Si, Ti). The student policy independently samples n = 4 candidate trajectories per prompt to mitigate gradient variance during multi-sample rollouts. The optimization objective integrates a dual-advantage policy gradient loss comprising an in-modal loss (Lim) and a cross-modal loss (Lcm), balanced by a hyperparameter lambda. The in-modal component computes the log-probability discrepancy between teacher and student conditioned on the text prompt, while the cross-modal component aligns the student's speech-conditioned output with the teacher's text-conditioned distribution. Full-parameter training is applied to the language model backbone using the verl framework, while the audio encoder and modal adapter remain frozen. Training uses the Adam optimizer with a learning rate of 2e-6, a batch size of 256, and lambda set to 0.5 to harness cross-modal synergy.

Key design choices include avoiding static ground-truth text targets in favor of on-policy student exploration to counteract exposure bias, utilizing a matched-capacity teacher (Qwen3-A3B-Instruct) rather than an overly large teacher to minimize the instruction gap, and employing a dual-objective loss to ensure that optimizing one modality reinforces rather than compromises the other.

## Experimental setup

Evaluated on BIG Bench Audio (1,000 synthetic samples measuring logical reasoning accuracy), Audio Multi-Challenge (1,712 rubrics across 452 conversations measuring multi-turn interaction via Average Pass Rate), and VoiceBench (5,783 single-turn samples across 7 subsets for general knowledge and instruction following). The training corpus comprises 10,934 pairs from Tulu 3 (136.7 hours) and 16,913 pairs from NaturalReasoning (95.5 hours) synthesized at 24kHz via CosyVoice3 and filtered by SenseVoice (WER < 5%). Baselines include Standard SFT, Offline KD, and Generalized Knowledge Distillation (GKD with forward KL). Built on Qwen3-Omni-A3B-Instruct using the verl framework for 1 epoch with Qwen3-A3B-Instruct as the primary teacher.

## Results

On Qwen3-Omni-A3B-Instruct, X-OPD reduces the average speech performance drop from 11.29% to 3.43% and the text performance drop from 5.51% to 0.97%. On BIG Bench Audio (Speech), X-OPD scores 93.41% compared to the baseline Omni's 85.67%, SFT's 87.52%, Offline KD's 87.08%, and GKD's 84.26%. On Audio Multi-Challenge (Speech), X-OPD achieves 28.14%, substantially outperforming SFT (15.04%), Offline KD (17.73%), and GKD (18.13%), while approaching the text-only Qwen3-A3B-Instruct performance of 29.31%. Ablations show that a matched-capacity teacher (A3B) outperforms an oversized teacher (A22B: 5.55% drop vs 3.43% drop), and a balanced objective (lambda = 0.5) maximizes overall performance compared to pure text (lambda = 1.0) or pure speech (lambda = 0.0) OPD. On the MMAR catastrophic forgetting benchmark, X-OPD preserves a 69.3% accuracy (lambda = 0.5) compared to the original model's 71.3%, whereas standard SFT drops to 60.3%.

| System/Condition | BIG Bench Audio (S) | Audio Multi-Chall. (S) | VoiceBench (S) | Avg. Drop (%) (S) |
|---|---|---|---|---|
| Qwen3-Omni-A3B-Instruct (Base) | 85.67 | 23.57 | 89.22 | 11.29 |
| + SFT | 87.52 | 15.04 | 82.66 | 22.76 |
| + Offline KD | 87.08 | 17.73 | 83.31 | 19.62 |
| + GKD (Forward KL) | 84.26 | 18.13 | 83.03 | 20.23 |
| + X-OPD (Ours, lambda=0.5) | 93.41 | 28.14 | 89.29 | 3.43 |

## Limitations

The framework assumes access to a capable text-based teacher model and relies on synthetic text-to-speech generation paired with ASR filtering, which may introduce synthetic artifacts or domain bias not fully representative of natural conversational speech. Evaluation is restricted to three specific benchmarks (BIG Bench Audio, Audio Multi-Challenge, VoiceBench) and English-centric or limited multilingual coverage based on the underlying base model. Furthermore, the audio encoder and modal adapter weights are frozen during training, meaning adaptation is strictly constrained to the LLM backbone.

## Why read this

Speech and ML researchers building end-to-end speech LLMs should read this paper to learn how to replace fragile static SFT/offline distillation pipelines with an efficient, on-policy RL distillation method that eliminates exposure bias and preserves acoustic priors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building end-to-end spoken dialogue agents, real-time voice assistants, and low-latency multilingual speech-language models with advanced reasoning capabilities.

## Related

- (link related pages by id as the wiki grows)
