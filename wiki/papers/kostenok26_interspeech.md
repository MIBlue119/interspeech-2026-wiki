---
id: kostenok26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2362
---

# Calibration-Reasoning Framework for Descriptive Speech Quality Assessment

**TL;DR** — A two-stage post-training method (perceptual-dimension calibration followed by GRPO reinforcement learning with dimension-specific rewards) tailors an audio LLM to describe and temporally localize speech-quality artifacts, reaching state-of-the-art results on a multidimensional quality benchmark.

## Problem

Explainable speech quality assessment requires moving beyond single Mean Opinion Scores to analyze underlying perceptual dimensions, which current systems don't do well.

## Method

The authors introduce a post-training method for an Audio Large Language Model: a calibration stage that aligns the model to predict predefined perceptual dimensions, followed by a GRPO reinforcement-learning stage with dimension-specific rewards to sharpen artifact description accuracy and temporal localization.

## Results

The method reaches a state-of-the-art 0.71 mean PCC on the multidimensional Qual-iSpeech benchmark and a 13% improvement in MOS prediction, with fine-grained GRPO rewards substantially improving artifact pinpointing and classification in time.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for building explainable audio quality assessment tools that tell engineers not just a quality score but what specifically is wrong and where, for codec/TTS/enhancement development.

## Related

- (link related pages by id as the wiki grows)
