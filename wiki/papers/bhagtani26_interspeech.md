---
id: bhagtani26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3083
---

# Speak or Stay Silent: Context-Aware Turn-Taking in Multi-Party Dialogue

**TL;DR** — A 120K-conversation benchmark shows today's LLMs fail at deciding whether a voice assistant should speak or stay silent during pauses in multi-party dialogue, but supervised fine-tuning with reasoning traces lifts balanced accuracy by up to 23 points.

## Problem

In multi-party conversations, pauses are frequent and ambiguous, so a voice assistant that treats every pause as its cue to speak — as works in one-on-one dialogue — becomes disruptive rather than helpful.

## Method

The authors formalize context-aware turn-taking as a decision problem (speak vs. stay silent given full conversation context) and build a benchmark of over 120K labeled conversations from three multi-party corpora, then evaluate eight LLMs zero-shot before applying supervised fine-tuning with reasoning traces.

## Results

All eight tested LLMs fail consistently at context-aware turn-taking under zero-shot prompting, while supervised fine-tuning with reasoning traces improves balanced accuracy by up to 23 percentage points, indicating the skill must be explicitly trained rather than assumed to emerge.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice assistants and conversational agents that participate in group settings (meetings, smart speakers with multiple users) where knowing when not to speak is as important as knowing what to say.

## Related

- (link related pages by id as the wiki grows)
