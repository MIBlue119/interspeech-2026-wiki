---
id: zhao26h_interspeech
category: speech-llm-dialogue
labels: [dataset-or-benchmark-release]
institutions: ["Northwestern Polytechnical University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2400
pdf: https://www.isca-archive.org/interspeech_2026/zhao26h_interspeech.pdf
---

# Beyond Semantic Dominance: Cognitive Affective Reasoning and Empathetic Response Alignment in Audio Language Models

*Zhixian Zhao, Shuiyuan Wang, Wenjie Tian, Jingbin Hu, Ziyu Zhang, Lei Xie*

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2400)

**Category:** `speech-llm-dialogue` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — CogAudio-LLM is a cognitive affective reasoning framework for Audio Language Models that overcomes semantic dominance and enhances empathy via a specialized 4-step Chain-of-Thought dataset and a dual-route reinforcement learning alignment algorithm, achieving an LLM-evaluated empathy score of 2.91 on sarcastic/conflicting audio versus <1.8 for prior open and closed models.

## Key contributions

- Proposed the CogAudio-LLM framework, integrating explicit psychological Chain-of-Thought reasoning to enhance emotional insight and empathetic responses in Audio Language Models.
- Constructed and released LIME-440K, a bilingual 497-hour dataset featuring a semantic-acoustic decoupling strategy ('one-text, multi-emotion') to mitigate textual semantic dominance.
- Introduced a multi-stage training pipeline (SFT to implicit response-only mixed data) combined with DR-SAPO (Dual-Route Soft Adaptive Policy Optimization) to align logical CoT rigor with empathetic depth.
- Demonstrated state-of-the-art performance on fine-grained emotion recognition and empathy quality, particularly in challenging semantic-acoustic conflict scenarios (e.g., sarcasm and forced smiles).

## Problem

Audio Language Models (ALMs) built on text-native LLMs suffer from semantic dominance, where discrete textual semantics overshadow acoustic details, causing models to fail when paralinguistic cues contradict literal text (such as in sarcasm). Furthermore, current ALMs lack cognitive depth, often generating generic, emotion-agnostic empathy templates instead of deeply understanding latent intents and psychological needs. Existing CoT approaches in speech merely describe acoustic features (like pitch or rate) rather than true psychological reasoning. This modality gap leads to inappropriate responses in real-world emotional companionship tasks.

## Method

The framework builds upon Qwen2.5-omni-7B and operates in three distinct training stages. Stage I uses supervised fine-tuning (SFT) on the LIME-Core subset with Prompt A to establish explicit 4-step EIPS (Emotion Perception, Intent Extraction, Psychological Modeling, Strategy Formulation) Chain-of-Thought reasoning. Stage II introduces implicit internalization via mixed-task training, sampling explicit CoT data and direct response data (triggered by Prompt B) at a 1:1 ratio over shared parameters, enabling the model to internalize reasoning without outputting intermediate thoughts during standard inference.

Stage III applies Reinforcement Learning via Dual-Route Soft Adaptive Policy Optimization (DR-SAPO), using the Soft Adaptive Policy Optimization (SAPO) algorithm with a smooth gating mechanism for sequence stability. DR-SAPO defines two routes: Route 1 evaluates the explicit reasoning-to-response pipeline using format rewards and fine-grained CoT logic rewards evaluated by an LLM-as-a-Judge (Gemini 2.5 Pro), while Route 2 optimizes direct responses using only a Response Empathy Reward. Both routes share the response empathy reward to heavily penalize generic templates and reward psychological insight.

The LIME-440K dataset (438,884 utterances, 497.1 hours across Chinese and English) was generated using DeepSeek-V3 for ambiguous text generation across 20 interaction scenarios, DeepSeek-R1 for EIPS CoT distillation, and Index-TTS2 with emotion intensity control (low/mid/high) alongside Emo-Emilia environmental noise reference audio for expressive speech synthesis.

## Experimental setup

Evaluated on ESD-Test (1,000 real utterances, 2 held-out speakers, 5 emotions) and HumDial-EIBench Task4 (200 bilingual spontaneous speech utterances, 7 emotions, split into consistent and conflict subsets). Metrics include fine-grained emotion classification accuracy (Emo-Acc) and a subjective 1-4 Empathy Quality scale cross-validated by Gemini 2.5 Pro and 5 human experts (ICC = 0.78). Baseline models include Freeze-Omni, GLM-4-Voice, Kimi-Audio, Step-Audio-2-mini, Qwen2.5-Omni-7B, Qwen3-Omni-30B, and GPT-4o-Audio. Trained on 8 NVIDIA A100 GPUs using LoRA (rank r = 8, alpha = 32, learning rate 1e-5, batch size 512, 3 epochs for SFT; 1500 steps, learning rate 1e-6, batch size 64 for DR-SAPO).

## Results

On the semantic-acoustic conflict set (sarcasm/forced smiles), baseline models scored below 2.0 in empathy quality due to semantic dominance, whereas CogAudio-LLM achieved an LLM-evaluated score of 2.91 and a human evaluation score of 3.16. For fine-grained emotion perception accuracy on the conflict set, the base Qwen2.5-omni scored 24.0%, which improved to 46.0% with the full DR-SAPO framework. Ablation studies confirmed that removing RL (Model C) yielded an implicit empathy score of 2.61, which increased to 2.90 on ESD and 2.91 on conflict sets when applying the full DR-SAPO dual-route RL alignment (Model D).

| System / Condition | Emo-Acc (Conflict %) | LLM Empathy (Conflict) | Human Empathy (Conflict) |
|---|---|---|---|
| Qwen2.5-Omni-7B (Base) | 24.0 | 1.75 | 2.14 |
| GPT-4o-Audio | - | 1.82 | 1.68 |
| SFT Base (Direct) | - | 2.62 | - |
| CogAudio-LLM w/o RL | 44.0 | 2.61 | - |
| CogAudio-LLM (Full) | 46.0 | 2.91 | 3.16 |

## Limitations

A subtle gap remains between the synthetic TTS training data (Index-TTS2) and spontaneous micro-prosody in real human speech. The current dataset scale, while substantial at ~497 hours, covers roughly 230 speakers primarily across bilingual (CN/EN) settings, leaving broader multi-accent and low-resource language coverage unaddressed. The framework relies heavily on robust teacher models (DeepSeek-V3/R1 and Gemini 2.5 Pro) for data synthesis and reward modeling.

## Why read this

Researchers building empathetic spoken dialogue systems or Audio Language Models will find this paper essential for tackling semantic dominance and implementing efficient CoT reasoning via implicit internalization and dual-route reinforcement learning.

## Code

- https://github.com/zxzhao0/CogAudio-LLM

## Applications

Empathetic virtual assistants, mental health support chat agents, emotional companion robots, and customer service spoken dialogue systems.

## Institutions / 機構

Northwestern Polytechnical University

## Related

- (link related pages by id as the wiki grows)
