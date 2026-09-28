---
id: he26e_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1720
pdf: https://www.isca-archive.org/interspeech_2026/he26e_interspeech.pdf
---

# Audio-DeepThinker: Progressive Reasoning-Aware Reinforcement Learning for High-Quality Chain-of-Thought Emergence in Audio Language Models

*Xiang He, Chenxing Li, Jinting Wang, Yan Rong, Tianxin Xie, Zeyu Xie, Wenfu Wang, Li Liu, Dong Yu*

[PDF](https://www.isca-archive.org/interspeech_2026/he26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1720)

**TL;DR** — Audio-DeepThinker introduces a progressive two-stage reinforcement learning framework that elicits grounded chain-of-thought reasoning in large audio-language models without supervised demonstrations, achieving state-of-the-art results with 74.0% accuracy on MMAR.

## Key contributions

- Developed a hybrid reasoning similarity reward combining an LLM evaluator (for logical path alignment and key step coverage) and embedding similarity (BGE-M3 for semantic grounding against reference chains).
- Proposed a progressive two-stage RL curriculum (RL-Zero on foundational audio QA, followed by boundary case enhancement) that avoids supervised fine-tuning on reasoning traces.
- Created an automated data construction pipeline leveraging Qwen3-Omni-Captioner and DeepSeek V3.1 to generate over 68K training samples with reference CoT annotations.
- Achieved 1st Place in the Interspeech 2026 Audio Reasoning Challenge (Single Model Track), reaching 74.0% on MMAR and 78.5% on MMAU-Test-Mini.

## Problem

Large Audio-Language Models excel at perceptual tasks but lack explicitly grounded reasoning, treating audio queries as direct perception-and-answer steps. Prior supervised methods rely heavily on scarce, expensive human-crafted chain-of-thought demonstrations, restricting adaptability, while early reinforcement learning methods (like R1-AQA, OmniR1, and AudioMCQ) use coarse accuracy or format rewards that fail to evaluate whether intermediate reasoning steps are acoustically grounded or logically sound. Without fine-grained supervision on the reasoning process itself, models frequently generate logically ungrounded or hallucinated inference chains that decouple formal formatting from actual acoustic evidence.

## Method

The framework uses Qwen3-Omni-30B-A3B-Instruct (30B total, 3.0B active parameters via MoE) as its base policy model. Training data is synthesized via a 3-step automated pipeline: audio captioning via Qwen3-Omni-Captioner, QA generation via Qwen3-235B-Instruct, and reference CoT generation via DeepSeek V3.1, producing dataset $D_1$ (39,412 AVQA samples) and dataset $D_2$ (29,483 diverse boundary samples).

The reward function combines correctness, formatting, consistency, and a hybrid similarity score. The hybrid reward fuses an LLM logical evaluator ($\phi$, Qwen3-235B-Instruct) measuring path alignment and key step coverage with BGE-M3 embedding semantic similarity ($\mathbf{e}$) against reference chains. Critically, similarity rewards apply only when the predicted answer matches the ground truth.

Stage 1 (RL-Zero) optimizes on $D_1$ using a comprehensive reward combining accuracy, formatting, consistency, and the full hybrid similarity reward. Stage 2 shifts to $D_2$ (acoustically challenging boundary cases) using a streamlined reward consisting only of accuracy and the LLM-only similarity reward (dropping embedding and consistency constraints), allowing the model to freely explore diverse reasoning strategies. Optimization uses GDPO (Grouped DPO with independent reward normalization) to prevent reward collapse, with a global batch size of 224, learning rate of 1e-6, KL coefficient $\beta = 0.001$, and 8 rollouts per step.

## Experimental setup

Evaluated on MMAR (test set) and MMAU (test-mini and full test sets, averaging Sound, Music, and Speech domains). Baselines include closed-source models (GPT-4o Audio, Gemini 2.0/2.5 Flash), open-source perception models (Qwen2-Audio, Audio Flamingo 2/3, Step-Audio 2), and RL-tuned open models (Audio-Reasoner, Omni-R1, CESAR, Audio-Thinker, AudioMCQ). Implemented using the SWIFT framework and Megatron-LM across 8 nodes.

## Results

Audio-DeepThinker achieves a new state-of-the-art accuracy of 74.0% on MMAR, outperforming the base model (70.10%) and leading RL competitors like Audio-Thinker (65.30%) and CESAR (62.70%). Notable per-category gains include +6.80% in Music and +8.54% in Music-Speech tasks. On MMAU-Test-Mini, it reaches 78.50%, ranking first overall, with top speech performance (80.78%). Ablations show that replacing base rewards with the hybrid reasoning similarity reward boosts Stage 1 accuracy to 73.10% and Rubrics reasoning score to 64.33% (up from 49.17% baseline). Furthermore, skipping Stage 1 and training exclusively on Stage 2 boundary cases degrades performance (e.g., dropping accuracy on Qwen3-Omni-Thinking below the base model), proving that foundational training is mandatory before boundary refinement.

| System | MMAR Acc (%) | MMAR Rubrics (%) | MMAU Test-Mini (%) |
|---|---|---|---|
| Qwen3-Omni-Instruct (Baseline) | 70.10 | - | 77.80 |
| Omni-R1 | 61.20 | - | 77.00 |
| Audio-Thinker | 65.30 | - | 78.00 |
| AudioMCQ | 67.10 | - | 78.20 |
| CESAR | 62.70 | - | 77.10 |
| Audio-DeepThinker (Ours) | 74.00 | 65.29 | 78.50 |

## Limitations

The framework relies heavily on a frozen large LLM (Qwen3-235B-Instruct) as an online reward evaluator during training, introducing substantial computational and memory overhead. The synthetic data construction pipeline depends on proprietary or heavy captioning and reasoning models (Qwen3-Omni, DeepSeek V3.1), which may transfer distillation artifacts or pipeline errors into the reference chains. Evaluation is currently constrained to benchmark datasets (MMAR and MMAU) and may not fully expose failure modes in unconstrained, noisy, or extreme low-resource acoustic environments.

## Why read this

Speech and ML researchers working on audio-language reasoning should read this to learn how to design fine-grained semantic and logical reward functions for RL-driven chain-of-thought generation without supervised demonstrations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated spoken question answering, complex acoustic scene analysis, cross-modal multimedia indexing, and clinical or diagnostic audio event inspection.

## Related

- (link related pages by id as the wiki grows)
