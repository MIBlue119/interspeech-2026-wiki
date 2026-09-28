---
id: chen26b_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-66
---

# The Binding Effect: Analysis of How Multi-Dimensional Cues Form Gender Bias in Instruction TTS

**TL;DR** — Instruction-following TTS models exhibit compositional gender bias — combinations of social status, career, and persona cues interact to produce bias patterns that simple single-cue tests miss, and generic diversity prompting fails to fix them.

## Problem

Existing bias evaluations for Instruction Text-to-Speech (ITTS) typically test one social cue at a time, overlooking how social dimensions compose and interact to produce more complex bias patterns.

## Method

The authors model ITTS prompts as combinations of Social Status, Career stereotypes, and Persona descriptors and analyze open-source ITTS models for systematic interaction effects across these dimensions.

## Results

They find social dimensions modulate one another to create bias patterns invisible to univariate testing, and that these biases are tied to the semantic priors of pretrained text encoders and skewed training data, with generic diversity prompting failing to override them.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Relevant to developers auditing instruction-controllable TTS systems for demographic bias before deploying assistants or narrators that respond to free-text style instructions.

## Related

- (link related pages by id as the wiki grows)
