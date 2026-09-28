---
id: he26e_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1720
---

# Audio-DeepThinker: Progressive Reasoning-Aware Reinforcement Learning for High-Quality Chain-of-Thought Emergence in Audio Language Models

**TL;DR** — Audio-DeepThinker trains audio-language models to produce chain-of-thought reasoning that is actually grounded in the audio, using a reward that checks reasoning quality directly and a two-stage RL curriculum, and it won first place in an Interspeech reasoning challenge.

## Problem

Large audio-language models perceive audio well but reason poorly, and prior training either needs supervised chain-of-thought data or uses coarse RL rewards that don't check whether the reasoning is actually grounded in the audio, producing logically disconnected chains.

## Method

The authors combine a hybrid reasoning-similarity reward — an LLM evaluator scoring logical path alignment and key-step coverage plus embedding similarity to reference chains — with a progressive two-stage curriculum where Stage 1 uses this hybrid reward on foundational audio QA and Stage 2 shifts to boundary cases with an LLM-only reward for pure RL-driven reasoning diversity.

## Results

Audio-DeepThinker reaches state-of-the-art results on MMAR (74.0%) and MMAU-Test-Mini (78.5%) and won 1st place in the Interspeech 2026 Audio Reasoning Challenge's Single Model Track.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving reasoning-heavy audio question answering and any application that needs an audio-language model to explain its answers with genuinely audio-grounded chains of thought.

## Related

- (link related pages by id as the wiki grows)
