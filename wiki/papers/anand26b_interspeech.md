---
id: anand26b_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3357
---

# Preferences of a Voice-First Nation: Large-Scale Pairwise Evaluation and Preference Analysis for TTS in Indian Languages

**TL;DR** — A large multilingual human-preference study of TTS systems across 10 Indic languages, pairing over 1,900 native raters' judgments with statistical modeling to build a reliable, perceptually grounded leaderboard.

## Problem

Crowdsourced pairwise comparison scales well for evaluating foundation models, but plain preference voting is noisy for TTS because speech perception is multidimensional and languages vary widely in how listeners judge quality.

## Method

The authors build a controlled multidimensional pairwise evaluation framework that combines linguistic control with perceptually grounded annotation, collecting 120K+ comparisons over 5K+ native and code-mixed sentences across 10 Indic languages and 7 state-of-the-art TTS systems, with raters scoring intelligibility, expressiveness, voice quality, liveliness, noise, and hallucinations.

## Results

Bradley-Terry modeling produces a multilingual TTS leaderboard, and SHAP-based analysis of the ratings surfaces which perceptual dimensions drive human preference along with each system's relative strengths and trade-offs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Benchmarking and model selection for Indic-language TTS products, and a template for building reliable, multidimensional human-preference leaderboards for other multilingual speech generation tasks.

## Related

- (link related pages by id as the wiki grows)
