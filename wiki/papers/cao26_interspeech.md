---
id: cao26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-861
---

# X-OPD: Cross-Modal On-Policy Distillation for Capability Alignment in Speech LLMs

**TL;DR** — Having a text-LLM teacher score a speech LLM's own on-policy rollouts and distill token-level feedback back into it closes much of the capability gap that standard fine-tuning and RL leave behind.

## Problem

End-to-end speech LLMs offer latency and paralinguistic advantages over cascaded systems, but they still show significant performance degradation relative to their text-based counterparts, and standard supervised fine-tuning or RL fails to close this gap.

## Method

The authors propose X-OPD, a Cross-Modal On-Policy Distillation framework in which the speech LLM explores its own output distribution via on-policy rollouts, a text-based teacher model evaluates these trajectories, and token-level feedback distills the teacher's capability into the student's multimodal representations.

## Results

Across multiple benchmarks, X-OPD significantly narrows the capability gap on complex tasks while preserving the speech LLM's existing abilities.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Training end-to-end speech LLMs (voice assistants, spoken dialogue agents) to reach closer-to-text-LLM levels of reasoning and task capability.

## Related

- (link related pages by id as the wiki grows)
