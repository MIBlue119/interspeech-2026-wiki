---
id: li26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-161
---

# XAI-Grounded Explanation Generation for Speech Deepfake Detection with Training-Free Multimodal Large Language Models

**TL;DR** — Feeding explainable-AI evidence into a multimodal LLM, with no extra training, produces grounded natural-language explanations for speech deepfake detection that are 45% more accurate than ungrounded LLM explanations.

## Problem

Speech deepfake detection needs trustworthy explanations, but traditional explainable-AI methods produce low-level attribution signals that are hard for humans to interpret, while LLM-generated natural-language explanations tend to be generic and ungrounded due to a lack of task-specific supervision and grounded explanation datasets.

## Method

The authors propose a training-free framework that feeds XAI evidence (e.g., gradient-based attribution) into a multimodal LLM to generate grounded, specific explanations, and construct a grounded explanation dataset using the PartialSpoof dataset.

## Results

Methods incorporating XAI evidence increase explanation accuracy by over 45%, verified through human evaluation and faithfulness checks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Trustworthy, human-interpretable speech deepfake detection systems for content moderation and forensic audio analysis.

## Related

- (link related pages by id as the wiki grows)
