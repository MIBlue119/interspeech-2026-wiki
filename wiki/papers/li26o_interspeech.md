---
id: li26o_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-988
---

# Audio-Cogito: Towards Deep Audio Reasoning in Large Audio Language Models

**TL;DR** — A 545k-sample curated chain-of-thought dataset and self-distillation training give an open-source Audio LLM the best audio reasoning among open models, rivaling some closed-source systems.

## Problem

Reasoning models have advanced text and multimodal domains, but audio reasoning lags behind — only a few Large Audio Language Models (LALMs) support explicit Chain-of-Thought reasoning, and their capabilities are inconsistent on complex tasks.

## Method

The authors build Cogito-pipe, a pipeline for curating high-quality audio reasoning data that produces 545k reasoning samples, and use a self-distillation strategy to fine-tune a fully open-source LALM, Audio-Cogito, on this data.

## Results

On the MMAR benchmark (the only audio benchmark that evaluates the CoT process), Audio-Cogito achieves the best performance among open-source models and matches or surpasses certain closed-source models on specific metrics, and ranks among the top-tier systems in the Interspeech 2026 Audio Reasoning Challenge.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Open-source foundation for audio-reasoning applications — complex sound-scene QA, audio-based decision support — where closed models aren't an option.

## Related

- (link related pages by id as the wiki grows)
