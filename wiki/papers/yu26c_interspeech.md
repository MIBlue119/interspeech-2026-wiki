---
id: yu26c_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1075
---

# Learning to Attend to Depression-Related Patterns: An Adaptive Cross-Modal Gating Network for Depression Detection

**TL;DR** — An Adaptive Cross-Modal Gating network that reassigns frame-level weights across acoustic and textual modalities, rather than treating all frames equally, better captures the sparse, segment-specific nature of depression-related speech cues and outperforms baselines without such gating.

## Problem

Automatic depression detection from speech and text is promising for early diagnosis, but depression-related patterns are sparse — concentrated in specific segments rather than uniformly distributed — and most existing methods incorrectly treat all frames equally.

## Method

The authors propose a depression detection network based on Adaptive Cross-Modal Gating (ACMG) that adaptively reassigns frame-level weights across both acoustic and textual modalities, enabling selective attention to depression-related segments.

## Results

The depression detection system with ACMG outperforms baselines without it, and visualization analyses confirm ACMG automatically attends to clinically meaningful patterns, including low-energy acoustic segments and negatively-sentimented textual segments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Supports development of interpretable, multimodal speech-based screening tools for early depression detection in clinical or telehealth settings.

## Related

- (link related pages by id as the wiki grows)
