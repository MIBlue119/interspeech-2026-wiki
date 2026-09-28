---
id: bonzi26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1504
---

# Enhancing Audio Reasoning via Semantic Summary Prediction

**TL;DR** — SPARE adds a register token that predicts the final answer's semantic gist before Chain-of-Thought reasoning begins, fixing the "reasoning gap" where explicit reasoning otherwise hurts large audio language models' accuracy.

## Problem

Large audio language models often perform worse with explicit Chain-of-Thought reasoning than with direct answers, because long reasoning sequences appear to pull attention away from the audio input itself.

## Method

SPARE (Semantic Prediction for Audio REasoning) introduces a register token trained with a cosine-similarity loss against a Sentence-BERT embedding of the target answer, conditioning the model's latent state on the eventual conclusion before it generates its reasoning trace.

## Results

On MMAU and MMAR with the SALMONN model, SPARE improves zero-shot reasoning accuracy and produces stronger early attention to the audio input, without adding inference cost.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving reliability of audio question-answering and reasoning systems built on large audio-language models, where Chain-of-Thought prompting is otherwise a double-edged sword.

## Related

- (link related pages by id as the wiki grows)
