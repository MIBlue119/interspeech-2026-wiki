---
id: sanchez26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2600
---

# An Evaluation Framework for Text-to-Speech Voice Reconstruction

**TL;DR** — A new evaluation framework for TTS-based voice reconstruction (for people with speech disorders) that replaces unreliable plain MOS scoring with Best-Worst Scaling and a dual-reference measure balancing intelligibility against speaker identity.

## Problem

TTS voice reconstruction for people with speech disorders aims to retain speaker identity while improving intelligibility, but standard Mean Opinion Score evaluation has limited sensitivity and reliability for this task, especially for highly unintelligible speakers.

## Method

Proposes a subjective-plus-objective framework: subjectively, Best-Worst Scaling with situational framing for perceived intelligibility and speaker identity; objectively, a novel dual-reference distributional measure to assess the intelligibility-versus-identity trade-off where standard measures fail.

## Results

Evaluating 17 zero-shot TTS systems across 193 speakers, the framework proves reliable and task-aligned, succeeding where standard measures fail to predict reconstruction success for highly unintelligible speakers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Rigorous benchmarking of voice-reconstruction/voice-banking TTS systems for people with dysarthria or other speech disorders.

## Related

- (link related pages by id as the wiki grows)
