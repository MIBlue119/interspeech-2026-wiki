---
id: lu26c_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1925
---

# Breaking Neutral Bias: Zero-Human-Annotation Fine-Grained Emotion Enrichment via Semantic Drift and Discriminative Re-ranking

**TL;DR** — A data-centric, annotation-free pipeline that generates and filters richer emotional labels for audio-language models, fixing their tendency to default to "neutral" instead of describing subtle emotional nuance.

## Problem

Large Audio Language Models suffer from "Neutral Bias," failing to capture subtle emotional nuances, and text-augmentation fixes tend to introduce acoustic hallucinations, all without wanting costly human annotation.

## Method

Uses an LLM to perform multi-dimensional semantic drift, generating diverse emotional hypotheses beyond a neutral baseline, then a discriminative judge model filters these drifted hypotheses via hard-negative contrastive learning to ground them in the actual acoustic signal.

## Results

Experiments confirm this hypothesize-and-verify mechanism turns coarse, neutral-biased labels into precise, acoustically grounded descriptions, enriching fine-grained emotional detail and downstream expressiveness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building richer emotion-labeled training data for expressive TTS and emotion-aware audio-language models without manual annotation.

## Related

- (link related pages by id as the wiki grows)
