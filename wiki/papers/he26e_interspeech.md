---
id: he26e_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1720
pdf: https://www.isca-archive.org/interspeech_2026/he26e_interspeech.pdf
---

# Audio-DeepThinker: Progressive Reasoning-Aware Reinforcement Learning for High-Quality Chain-of-Thought Emergence in Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/he26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1720)

**TL;DR** — Audio-DeepThinker introduces a progressive two-stage reinforcement learning framework that elicits high-quality chain-of-thought reasoning in large audio-language models without human-annotated reasoning demonstrations, achieving state-of-the-art accuracy of 74.0% on MMAR.

## Problem

Current large audio-language models primarily function as perception-and-answer systems lacking explicit reasoning capabilities. While existing reinforcement learning methods improve question-answering performance, they rely on coarse rewards or lack fine-grained supervision, yielding chain-of-thought steps that are formally well-structured but semantically decoupled from actual acoustic evidence and logically flawed.

## Method

The framework utilizes an automated data pipeline combining Qwen3-Omni-Captioner and DeepSeek V3.1 to generate reference reasoning chains without human labeling. It implements a reasoning-aware multi-reward design featuring a hybrid similarity reward that merges an LLM-based logical evaluator (Qwen3-235B) with embedding-based semantic alignment (BGE-M3). A progressive two-stage reinforcement learning curriculum trains the 30-billion parameter Qwen3-Omni-Instruct model: Stage 1 establishes foundational reasoning patterns using foundational audio QA data and all reward signals via GDPO, while Stage 2 targets challenging boundary cases by streamlining the reward to focus solely on answer correctness and logical depth.

## Results

Evaluated on the MMAR benchmark, Audio-DeepThinker attains an average accuracy of 74.0%, outperforming the base Qwen3-Omni-Instruct model (70.1%) and previous reinforcement learning approaches like Audio-Thinker (65.3%) and AudioMCQ (67.1%). On the MMAU test-mini split, it achieves 78.5% accuracy, ranking first in the Single Model Track of the Interspeech 2026 Audio Reasoning Challenge. Ablations confirm that substituting the hybrid similarity reward raises instance-level Rubrics score from 57.44% to 64.33%, and that skipping Stage 1 degrades the stability of boundary-case training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing conversational assistants, audio-visual understanding systems, or complex acoustic diagnostic tools requiring transparent, step-by-step reasoning.

## Related

- (link related pages by id as the wiki grows)
