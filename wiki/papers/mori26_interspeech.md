---
id: mori26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2141
---

# Evaluating Automatic Laughter Phone Annotation for Socially-Situated Laughter Synthesis

**TL;DR** — Automatic laughter-phone annotation can substantially reduce the manual workload of building laughter synthesizers, but systems trained on automatic labels still fall short of those trained on manual labels, with audio-LLM and statistical-parametric synthesizers each excelling on different qualities.

## Problem

Modeling the diversity of individual, emotional, and social laughter for conversational agents requires phone-level laughter annotation, but manually annotating laughter phones is extremely labor-intensive.

## Method

Using a newly annotated eleven-speaker dataset, the authors build an improved laughter phone recognizer and construct two laughter synthesizers — a statistical parametric speech synthesis model and an audio-LLM-based model — trained with both manual and automatic phone labels, then run listening tests to compare them.

## Results

The audio-LLM-based synthesizer achieves higher naturalness while the SPSS-based synthesizer better reproduces the specific way a person laughs, and systems built with automatic labels do not match the performance of those built with manual labels.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building more natural, socially appropriate laughter generation for conversational agents and dialogue systems.

## Related

- (link related pages by id as the wiki grows)
