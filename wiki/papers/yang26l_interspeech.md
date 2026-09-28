---
id: yang26l_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2018
---

# CraftTTS: Fine-Grained Prosody Control for Text-to-Speech

**TL;DR** — A three-stage training pipeline that gives zero-shot TTS stable word-level control over intensity and tempo, using auto-generated preference pairs, preference optimization, and a reward-driven RL stage, without hurting overall naturalness.

## Problem

Zero-shot TTS clones voices well globally but struggles with fine-grained, word-level prosodic control, since strict local intensity or tempo manipulation tends to disrupt the model's acoustic priors and introduce artifacts.

## Method

CraftTTS first auto-constructs large-scale preference pairs via a compute-driven zero-shot pipeline with no manual annotation, then applies joint supervised fine-tuning plus direct preference optimization to improve sensitivity to local prosodic tags, and finally uses group relative policy optimization with a multi-dimensional prosodic reward to balance local controllability against global naturalness.

## Results

CraftTTS achieves state-of-the-art fine-grained expressiveness while preserving zero-shot voice-cloning capability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Expressive, precisely directable TTS for audiobook narration, dubbing, and voice acting where specific words need controlled emphasis or pacing.

## Related

- (link related pages by id as the wiki grows)
