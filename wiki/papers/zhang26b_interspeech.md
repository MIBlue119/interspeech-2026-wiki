---
id: zhang26b_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-256
---

# Step-Audio-R1: Why Audio LLMs Fail at Reasoning — The Trap of Textual Surrogates

**TL;DR** — Diagnoses why audio LLMs get worse at reasoning tasks the more they 'think' (they reason over transcript-like text instead of actual acoustic evidence), and fixes it with a self-distillation and RL framework that grounds reasoning in acoustic properties, matching Gemini 3 Pro.

## Problem

Unlike text and vision models, audio language models often perform worse when prompted to reason step by step, and the cause of this degradation was unclear.

## Method

The authors attribute the failure to 'textual surrogate reasoning' — models deliberating over transcript-like abstractions rather than acoustic evidence — and introduce Step-Audio-R1 with Modality-Grounded Reasoning Distillation (MGRD), an iterative framework using self-distillation and multimodal reinforcement learning to shift reasoning toward genuine acoustic properties.

## Results

Across speech, environmental-sound, and music benchmarks, Step-Audio-R1 outperforms Gemini 2.5 Pro and performs comparably to Gemini 3 Pro, and ablations show acoustically grounded reasoning reverses the usual degradation seen with longer deliberation chains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

A path toward audio LLMs that genuinely benefit from test-time reasoning, useful for complex audio understanding, music analysis, and environmental sound reasoning tasks.

## Related

- (link related pages by id as the wiki grows)
