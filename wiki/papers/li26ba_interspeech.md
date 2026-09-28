---
id: li26ba_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1823
---

# Resonate: Reinforcing Text-to-Audio Generation via Online Feedback from Large Audio Language Models

**TL;DR** — Applies online GRPO reinforcement learning with reward signals from large audio-language models to a flow-matching text-to-audio generator, setting a new state of the art on TTA-Bench with a comparatively small 470M-parameter model.

## Problem

Reinforcement learning has boosted LLMs and visual generative models, but its use in text-to-audio generation is largely unexplored, and prior alignment work relies on offline preference optimization with coarse CLAP-based reward signals.

## Method

The authors adapt online Group Relative Policy Optimization for flow-matching audio models and add reward signals from Large Audio Language Models, which provide fine-grained scoring more aligned with human perception than CLAP-based rewards.

## Results

Online RL significantly outperforms offline preference-optimization baselines, and the resulting 470M-parameter model, Resonate, sets a new state of the art on TTA-Bench for both audio quality and semantic alignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Higher-fidelity, better-aligned text-to-audio generation for sound design, media production, and audio content creation tools.

## Related

- (link related pages by id as the wiki grows)
