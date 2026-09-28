---
id: gu26b_interspeech
category: prosody
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1303
---

# ProWhistress: An Enhanced Dual-Stream Transcription Architecture for Prosody-Aware Sentence Stress Detection

**TL;DR** — A dual-stream architecture that adds explicit acoustic modeling to alignment-free sentence-stress detection, paired with new synthetic and real Mandarin stress datasets, to substantially beat prior baselines.

## Problem

Alignment-free sentence-stress detection models tend to be dominated by semantic representations and struggle to capture the fine-grained prosodic cues that signal stress, and Mandarin stress data is scarce.

## Method

ProWhistress uses a dual-stream transcription architecture that explicitly models acoustic detail alongside semantic content, and the authors build a customized Mandarin data-generation pipeline yielding a 12-hour synthetic dataset (SinoStress-Syn) and a 3-hour human-recorded benchmark (SinoStress-Real).

## Results

Across five English and Mandarin datasets, ProWhistress clearly outperforms competitive baselines and shows strong zero-shot generalization to real-world speech; code is released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Prosody-aware speech understanding for language learning feedback, speech synthesis prosody control, and conversational AI that needs to detect emphasized words.

## Related

- (link related pages by id as the wiki grows)
