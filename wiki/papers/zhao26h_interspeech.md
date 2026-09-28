---
id: zhao26h_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2400
pdf: https://www.isca-archive.org/interspeech_2026/zhao26h_interspeech.pdf
---

# Beyond Semantic Dominance: Cognitive Affective Reasoning and Empathetic Response Alignment in Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2400)

**TL;DR** — CogAudio-LLM is an audio language model framework that mitigates textual semantic dominance and enhances emotional reasoning, achieving state-of-the-art empathy scores of up to 3.16 on challenging conflicting-emotion test sets.

## Problem

Audio language models (ALMs) heavily rely on text-native pretraining, creating a 'semantic dominance' bias that causes them to ignore acoustic nuances when text and speech contradict (e.g., sarcasm). Furthermore, they lack cognitive depth, often falling back on generic, emotion-agnostic empathy templates instead of inferring underlying user intent.

## Method

The authors construct LIME-440K, a bilingual 440k-utterance dataset utilizing semantic-acoustic decoupling and distilled EIPS (Emotion Perception, Intent Extraction, Psychological Modeling, Strategy Formulation) 4-step Chain-of-Thought annotations. The model is built on Qwen2.5-omni-7B using a 3-stage training recipe: (1) explicit SFT for EIPS reasoning, (2) implicit internalization via mixed direct-response tasks, and (3) DR-SAPO (Dual-Route Soft Adaptive Policy Optimization) reinforcement learning to balance logical rigor and empathetic depth. LoRA (r=8, alpha=32) and A100 GPUs are utilized.

## Results

Evaluated on ESD-Test and HumDial-EIBench2 Task4 (spanning consistent and conflicting sentiment sets), CogAudio-LLM significantly outperforms baselines including Freeze-Omni, GLM-4-Voice, Kimi-Audio, Step-Audio-2-mini, Qwen2.5/3-Omni, and GPT-4o-Audio. On the challenging conflict subset, emotion perception accuracy reaches 46.0% (up from 24.0% for the base model), and human-evaluated empathy quality achieves 3.16 (compared to <=2.58 for baselines). Ablations confirm that LIME-440K decoupling halves conflict errors and DR-SAPO further elevates conflict empathy scores.

## Code

- https://github.com/zxzhao0/CogAudio-LLM

## Applications

Engineers and developers building emotionally intelligent spoken dialogue systems, conversational AI companions, and mental health support interfaces.

## Limitations

A subtle gap remains between synthetic TTS training data and spontaneous micro-prosody found in completely unconstrained, in-the-wild speech.

## Related

- (link related pages by id as the wiki grows)
