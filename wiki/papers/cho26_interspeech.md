---
id: cho26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-885
---

# Acoustic Prompting via Stage-wise Modulation for Few-Shot Learning in Audio Language Models

**TL;DR** — Adding learnable prompts to the audio encoder of audio-language models, not just the text encoder, boosts few-shot classification performance across 11 datasets.

## Problem

Prior prompt-learning approaches for audio-language models (ALMs) focus solely on optimizing the text encoder's prompts, leaving the potential of learnable audio-side prompts unexplored.

## Method

The authors inject trainable prompts directly into the audio encoder to capture task-specific acoustic features, designed as a plug-and-play module that combines with existing text-side prompt tuning.

## Results

Across 11 datasets, integrating audio-side prompt learning alongside text prompt tuning generally improves few-shot adaptation performance over text-only prompting.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving few-shot audio classification and tagging systems built on top of audio-language foundation models with limited labeled examples per class.

## Related

- (link related pages by id as the wiki grows)
