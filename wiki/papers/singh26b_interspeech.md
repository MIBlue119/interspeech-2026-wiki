---
id: singh26b_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1591
---

# CHUCKLE - When Humans Teach AI to Learn Emotions the Easy Way

**TL;DR** — A curriculum learning method (CHUCKLE) defines sample difficulty using crowd-annotator disagreement instead of heuristics, improving both accuracy and training efficiency for speech emotion recognition.

## Problem

Curriculum learning for emotion recognition typically defines sample difficulty using heuristic, data-driven, or model-based measures, ignoring how difficult a sample is for human perception, which matters for a subjective task like emotion recognition.

## Method

CHUCKLE (Crowdsourced Human Understanding Curriculum for Knowledge Led Emotion Recognition) uses annotator agreement and alignment in crowd-sourced datasets to define sample difficulty, under the assumption that clips hard for humans are similarly hard for neural networks.

## Results

CHUCKLE improves the performance of LSTMs and Transformers over non-curriculum baselines while reducing the number of gradient updates needed, improving both training efficiency and robustness in subject-dependent and subject-independent settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More efficient and accurate training pipelines for speech emotion recognition systems, leveraging existing crowd-annotation disagreement data.

## Related

- (link related pages by id as the wiki grows)
