---
id: shi26b_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-745
---

# Towards Fine-Grained Temporal Perception: Post-Training Large Audio-Language Models with Audio-Side Time Prompt

**TL;DR** — Post-trains large audio-language models with timestamp embeddings woven into the audio feature sequence, plus RL fine-tuning, to give them sharper, fine-grained event onset/offset perception.

## Problem

Large Audio-Language Models understand audio well overall but struggle with fine-grained temporal perception, such as inferring precise event onset and offset, limiting their utility in temporally sensitive scenarios.

## Method

Introduces Audio-Side Time Prompt, encoding timestamps as embeddings interleaved within the audio feature sequence as temporal coordinates, and TimePro-RL, which follows supervised fine-tuning with reinforcement learning to directly optimize temporal alignment.

## Results

TimePro-RL achieves significant performance gains across audio temporal tasks including audio grounding, sound event detection, and dense audio captioning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio-language systems that need precise event timing, such as surveillance audio analysis, meeting transcription with event tags, and dense audio captioning.

## Related

- (link related pages by id as the wiki grows)
