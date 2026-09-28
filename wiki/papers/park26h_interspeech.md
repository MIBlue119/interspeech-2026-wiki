---
id: park26h_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3025
---

# AnimeScore: A Preference-Based Dataset and Framework for Evaluating Anime-Like Speech Style

**TL;DR** — Because "anime-like" voice quality has no absolute scale like naturalness does, a pairwise-preference dataset and SSL-based ranking model provide the first objective metric for it, reaching 90.8% AUC.

## Problem

Evaluating how "anime-like" a synthesized voice sounds currently relies on costly subjective judgments, and no standardized objective metric exists, partly because anime-likeness — unlike naturalness — lacks a shared absolute scale, making conventional Mean Opinion Score protocols unreliable.

## Method

The authors propose AnimeScore, a preference-based framework for automatic anime-likeness evaluation via pairwise ranking, collecting 15,000 pairwise judgments from 187 evaluators with free-form descriptions and running acoustic analysis to identify what drives the perception.

## Results

Perceived anime-likeness is driven by controlled resonance shaping, prosodic continuity, and deliberate articulation rather than simple heuristics like high pitch; handcrafted acoustic features reach a 69.3% AUC ceiling, while SSL-based ranking models reach up to 90.8% AUC.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

An objective metric and reward signal for preference-based optimization of generative speech/voice-acting models targeting anime or character voice styles.

## Related

- (link related pages by id as the wiki grows)
