---
id: lo26_interspeech
category: prosody
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1494
---

# A Novel Sentence Stress Detection Framework Leveraging Auxiliary Word-Stress Modeling and Loss Optimization

**TL;DR** — Jointly modeling sentence-level and word-level stress, plus a new loss that concentrates stress probability within each stressed word span, improves automatic sentence-stress detection for pronunciation assessment.

## Problem

Prosodic stress detection is central to automatic pronunciation assessment, but sentence stress detection (SSD) and word stress detection (WSD) are usually treated as independent tasks, overlooking their shared reliance on prosodic cues like pitch, duration, and intensity.

## Method

The authors combine SSD with auxiliary WSD modeling in a joint paradigm and introduce a word-span stress regularizer (WSR) that concentrates token-level SSD probabilities within each stressed word's span.

## Results

On the TinyStress-15K benchmark, the proposed method outperforms strong baselines, with the full configuration (joint modeling plus WSR) achieving the best SSD result.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automatic pronunciation assessment tools for language learning that need to flag misplaced sentence stress, not just mispronounced words.

## Related

- (link related pages by id as the wiki grows)
