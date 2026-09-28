---
id: arora26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1756
---

# Negation in Audio Generation Models

**TL;DR** — Introduces a million-prompt benchmark showing that today's text-to-audio models almost completely fail to omit sounds they are explicitly told to exclude.

## Problem

Text-to-audio generators are rarely tested on negated instructions (e.g. "without dog barking"), and it is unknown whether they can actually suppress a named sound rather than generating it anyway.

## Method

The authors build the Audio Negation Benchmark, one million negated prompts across four negation types and three scopes derived from AudioCaps, and evaluate models with an audio question-answering protocol that checks whether the excluded event is truly absent.

## Results

Across AudioGen, AudioLDM2, and TangoFlux, recall for correctly negated audio stays below 0.05 in every condition, meaning negated and affirmative prompts produce near-identical, mostly affirmative soundscapes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

A diagnostic benchmark and training signal for building text-to-audio and sound-design systems that must honor exclusion instructions, e.g. content filtering or controllable sound-effect generation.

## Related

- (link related pages by id as the wiki grows)
