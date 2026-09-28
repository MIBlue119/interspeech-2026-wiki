---
id: han26c_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1869
---

# Exploring Hesitation as a Signal for Spoken Grammatical Error Correction

**TL;DR** — Instead of discarding disfluencies before grammatical error correction, marking hesitation positions and types as explicit signals improves spoken GEC by up to +2.78 points F0.5 near hesitation points.

## Problem

Traditional spoken grammatical error correction (GEC) pipelines strip out disfluencies as noise before correction, but the authors hypothesize that for L2 learner speech, hesitations actually signal grammatical uncertainty and could be a useful cue rather than noise to discard.

## Method

The proposed hesitation-aware approach preserves disfluency information via special marker tokens that indicate hesitation positions and types, plus hesitation-type embeddings that encode the disfluency context, rather than removing disfluencies before correction.

## Results

On the Speak & Improve Corpus 2025, the hesitation-aware method outperforms both rule-based disfluency removal (+2.05 points F0.5) and human-annotated fluent transcription (+1.84 points F0.5), with the largest gains (+2.78 points) concentrated near hesitation positions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Language-learning and writing-assistance tools that correct grammar directly from L2 learner speech, using disfluency patterns as an additional diagnostic signal.

## Related

- (link related pages by id as the wiki grows)
