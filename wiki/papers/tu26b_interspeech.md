---
id: tu26b_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2381
---

# VISA: A Visual Information Strengthened Audio-Reasoning System for the Interspeech 2026 ARC Agent Track

**TL;DR** — VISA strengthens a large audio language model with complementary visual evidence and multi-model voting, placing 2nd overall and achieving the top accuracy in the Interspeech 2026 Audio Reasoning Challenge's Agent Track.

## Problem

Audio reasoning requires multi-step, evidence-grounded inference over temporally dynamic and acoustically mixed signals, going beyond conventional perception tasks like ASR or captioning.

## Method

Under a "LALM as a Tool" paradigm, VISA strengthens a large audio language model with auxiliary multi-modal evidence while avoiding heavy orchestration, integrating multi-modal feature extraction for complementary audio and acoustic-visual clues, model-voting inference with consistency checking for stable predictions, and fine-grained category-aware routing to resolve disagreements and select rubric-aligned reasoning chains.

## Results

On the official Interspeech 2026 Audio Reasoning Challenge Agent Track leaderboard, VISA ranks 2nd overall with a Rubrics score of 66.23%, while achieving the top Accuracy (77.40%) across both the Single Model and Agent tracks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building competitive audio-reasoning agent systems that combine large audio language models with auxiliary visual evidence and multi-model consistency checking.

## Related

- (link related pages by id as the wiki grows)
