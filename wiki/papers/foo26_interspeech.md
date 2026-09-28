---
id: foo26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-913
---

# All That Glitters Is Not Audio: Rethinking Text Priors and Audio Reliance in Audio-Language Evaluation

**TL;DR** — Eight audio-language models keep 60-72% of their benchmark scores even with zero audio input, exposing how little most current benchmarks actually test auditory understanding.

## Problem

Large Audio-Language Models show consistent benchmark gains, but high scores may not reflect real auditory perception if questions can be answered from text and general knowledge alone without processing the audio signal.

## Method

The authors present a diagnostic framework with two axes — text prior (answerability from text/general knowledge alone) and audio reliance (actual dependency on the acoustic signal) — and evaluate eight LALMs across three benchmarks using it.

## Results

Models retain 60-72% of their full-audio scores with no audio input at all, and among the items that do require audio, only 3.0-4.2% need the complete clip — most are solvable using localized audio fragments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides more rigorous benchmark design and model evaluation practice for teams building or selecting audio-language systems.

## Related

- (link related pages by id as the wiki grows)
