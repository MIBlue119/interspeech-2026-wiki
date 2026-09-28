---
id: cao26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-861
pdf: https://www.isca-archive.org/interspeech_2026/cao26_interspeech.pdf
---

# X-OPD: Cross-Modal On-Policy Distillation for Capability Alignment in Speech LLMs

[PDF](https://www.isca-archive.org/interspeech_2026/cao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-861)

**TL;DR** — The paper introduces X-OPD, a cross-modal on-policy distillation framework that aligns speech LLMs with their text-based counterparts, reducing average performance drop from 11.29% to 3.43% on speech benchmarks.

## Problem

End-to-end speech large language models often suffer significant performance degradation in complex reasoning and instruction following compared to their text-based counterparts due to data scarcity and cross-modal misalignment. Standard supervised fine-tuning (SFT) and reinforcement learning (RL) methods fail to close this gap, and offline distillation suffers from exposure bias and error accumulation. This misalignment prevents speech models from leveraging the cognitive power of their textual foundations.

## Method

The paper proposes X-OPD (Cross-Modal On-Policy Distillation), an RL-style policy optimization framework utilizing a parallel dataset of semantic-invariant speech-text prompt pairs derived from Tulu 3 and NaturalReasoning (rewritten via Gemini-3-Flash, synthesized via CosyVoice3, and filtered with SenseVoice ASR). The student speech LLM performs autonomous multi-sample rollouts (n=4) across both speech and text modalities, while a text-based teacher model (Qwen3-A3B-Instruct) provides token-level feedback. The optimization combines an in-modal advantage (comparing teacher and student on text prompts) and a cross-modal advantage (comparing teacher text-prompted outputs to student speech-prompted outputs) using KL divergence and policy gradients. The base model used is Qwen3-Omni-A3B-Instruct, performing full-parameter training on the LLM backbone with the Adam optimizer.

## Results

Evaluated on BIG Bench Audio, Audio Multi-Challenge, and VoiceBench, comparing against baselines including standard SFT, Offline KD, and GKD (Forward KL). For Qwen3-Omni-A3B-Instruct, X-OPD successfully decreases the average speech performance drop from 11.29% to 3.43% and text performance drop from 15.02% to 0.97%. Standard SFT, Offline KD, and GKD paradoxically exacerbate performance degradation relative to the base model. Ablation studies confirm the effectiveness of combining both in-modal and cross-modal distillation objectives.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech/ML engineers and developers building end-to-end conversational spoken language agents and speech-based AI assistants requiring advanced logical reasoning and instruction-following capabilities.

## Limitations

The approach relies on a parallel dataset of aligned speech-text instruction pairs and requires a capable text-based teacher model for supervision.

## Related

- (link related pages by id as the wiki grows)
