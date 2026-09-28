---
id: hegde26_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2052
---

# Aligning Audio Captions with Human Preferences

**TL;DR** — Fine-tuning audio captioning systems with RLHF, guided by a CLAP-based reward model trained on human preference pairs, produces captions people prefer without needing ground-truth caption annotations.

## Problem

Audio captioning normally relies on supervised learning with costly paired audio-caption data that may not actually reflect what humans prefer to read as a caption.

## Method

The authors train a Contrastive Language-Audio Pretraining (CLAP) based reward model on human-labeled pairwise preference data, then use it in a Reinforcement Learning from Human Feedback (RLHF) framework to fine-tune any baseline captioning system without needing ground-truth captions.

## Results

Human evaluations across multiple datasets show the RLHF-aligned captions are preferred over baseline outputs, especially when baselines produce incorrect or unnatural captions, and the framework matches performance of supervised approaches that use ground-truth data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Scaling up audio captioning system development without expensive human-written caption datasets, useful for accessibility tools and audio content indexing.

## Related

- (link related pages by id as the wiki grows)
