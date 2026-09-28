---
id: wang26q_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-984
---

# Empathy Omni: Enabling Empathetic Speech Response Generation Through Large Language Models

**TL;DR** — Empathy Omni generates emotionally aware speech responses from a speech LLM using only a moderate 200k-example dialogue dataset and no large-scale pretraining, matching instruction-following ability while beating existing models on empathy and speech quality.

## Problem

Speech LLMs let users interact via voice, but most existing models convert response content to speech without capturing the emotional cues in the user's query, even though the same words can mean different things depending on how they're said; building empathetic speech LLMs usually demands massive datasets and heavy compute.

## Method

The authors propose Empathy Omni (referred to in the paper text as Emotion Omni), a model that understands emotional content in user speech and generates empathetic responses, paired with a data pipeline that constructs a 200k-example emotional dialogue dataset to support training without large-scale pretraining.

## Results

Empathy Omni achieves instruction-following ability comparable to models trained with large-scale pretraining, while surpassing existing models on speech quality and empathy; demos are available online.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice assistants and companion agents that need to respond with appropriate emotional tone rather than flat, content-only speech.

## Related

- (link related pages by id as the wiki grows)
