---
id: xu26k_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1160
---

# From Reactive to Proactive: Assessing the Proactivity of Voice Agents via ProVoice-Bench

**TL;DR** — ProVoice-Bench is the first benchmark specifically for evaluating proactive (not just reactive) voice agents, and it reveals that even state-of-the-art multimodal LLMs struggle with knowing when to intervene and with the reasoning proactivity requires.

## Problem

LLM agents are shifting from reactive, text-based interaction toward proactive, multimodal interaction, but existing benchmarks focus on reactive responses and overlook the complexity of proactive intervention and monitoring.

## Method

The authors build ProVoice-Bench with four novel tasks specifically targeting proactive voice agent behavior, using a multi-stage data synthesis pipeline to curate 1,182 high-quality test samples.

## Results

Evaluating state-of-the-art multimodal LLMs reveals a significant performance gap, particularly around over-triggering (intervening when they shouldn't) and reasoning capability for deciding when to proactively act.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Benchmarking and improving proactive voice assistants that need to decide when to speak up rather than only responding to explicit queries.

## Related

- (link related pages by id as the wiki grows)
