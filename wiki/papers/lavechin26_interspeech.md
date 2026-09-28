---
id: lavechin26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1132
---

# BabAR: from phoneme recognition to developmental measures of young children's speech production

**TL;DR** — Trained on TinyVox, a new corpus of over half a million phonetically transcribed child vocalizations across five languages, BabAR is a cross-linguistic phoneme recognizer for child speech whose automatic maturity measures align with known developmental patterns.

## Problem

Studying early speech development at scale requires automatic tools, but automatic phoneme recognition for young children in particular remains largely unsolved, limiting large-scale developmental speech research.

## Method

Building on decades of prior data collection, the authors curate TinyVox, a corpus of over half a million phonetically transcribed child vocalizations in English, French, Portuguese, German, and Spanish, and use it to train BabAR, a cross-linguistic phoneme recognition system for child speech, examining the effects of multilingual daylong-recording pretraining and providing surrounding audio context during fine-tuning.

## Results

Pretraining on multilingual child-centered daylong recordings substantially outperforms alternatives, giving 20 seconds of surrounding audio context during fine-tuning further improves performance, and error analysis shows substitutions mostly stay within broad phonetic categories; BabAR's automatic speech-maturity measures align with developmental estimates from the literature.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Large-scale, automated developmental speech research and screening tools that track children's speech-production maturity across languages.

## Related

- (link related pages by id as the wiki grows)
