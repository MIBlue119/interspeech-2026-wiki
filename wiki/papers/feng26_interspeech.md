---
id: feng26_interspeech
category: singing-voice
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-137
---

# MMGenre: Benchmarking Singing Voice Synthesis across Multiple Musical Genres

**TL;DR** — A new multi-genre benchmark reveals that current singing voice synthesis systems produce acoustically similar vocals regardless of target genre, exposing a genre-awareness gap that lightweight fine-tuning can partly close.

## Problem

Singing voice synthesis benchmarks are dominated by pop music, so it is unknown how well SVS models generalize across genres, and no standardized framework exists to measure genre-dependent behavior.

## Method

The authors build MMGenre, spanning 10 major genres and 26 subgenres with an automatic pipeline for constructing genre-aligned music scores, and evaluate representative SVS models for genre discrimination and adaptation under both zero-shot and lightweight continued-training conditions.

## Results

Synthesized vocals show weak separability across genres under zero-shot conditions with only marginal gains from zero-shot adaptation, while lightweight genre-specific continued training produces substantial improvement.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Standardized evaluation and diagnosis tool for building genre-aware singing voice synthesis systems for music production and content creation.

## Related

- (link related pages by id as the wiki grows)
