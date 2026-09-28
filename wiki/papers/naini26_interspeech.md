---
id: naini26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2935
---

# Comparative Reasoning: Making an Audio Language Model Better at Comparing Emotions

**TL;DR** — Training an audio-language model with reasoning traces built from semantic and acoustic (GeMAPS) evidence teaches it to judge which of two utterances has higher arousal, valence, or dominance, using only 5% of the usual training data.

## Problem

Large audio-language models can reason about audio, but it's unclear whether they can make comparative judgments between two speech signals along dimensions like emotion, prosody, and interpersonal cues — here studied via ordinal speech emotion recognition (which of two utterances is higher in arousal, valence, or dominance).

## Method

The authors introduce a reasoning-guided ordinal SER framework that conditions an LALM on paired speech inputs, trained using reasoning traces generated from both semantic audio descriptions and acoustic evidence derived from GeMAPS features, and further apply direct preference optimization to sharpen separation between emotional differences.

## Results

The framework improves preference prediction over conventional ordinal SER systems while requiring only 5% of their training data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Data-efficient, interpretable comparative emotion analysis for call-center QA, media analysis, or affective computing applications.

## Related

- (link related pages by id as the wiki grows)
