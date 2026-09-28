---
id: ren26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://www.isca-archive.org/interspeech_2026/ren26_interspeech.html
---

# MOS-Bias: From Hidden Gender Bias to Gender-Aware Speech Quality Assessment

**TL;DR** — The first systematic study of gender bias in speech-quality MOS ratings finds male raters score consistently higher (especially on low-quality speech), and a gender-aware model that learns per-gender scoring patterns improves prediction accuracy.

## Problem

Mean Opinion Score (MOS) is the standard metric for speech quality assessment, but biases in the human annotations behind it remain underexplored, and automated MOS predictors trained on aggregated labels may inherit these biases.

## Method

The authors conduct the first systematic analysis of gender bias in MOS ratings, and propose a gender-aware model that learns gender-specific scoring patterns through abstract binary group embeddings.

## Results

Male listeners consistently assign higher MOS scores than female listeners, a gap most pronounced for low-quality speech that shrinks as quality improves and resists simple calibration fixes; automated MOS models trained on aggregated labels skew toward male perception standards, while the proposed gender-aware model improves both overall and gender-specific prediction accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Fairer, bias-aware automatic speech-quality evaluation for TTS/enhancement benchmarking pipelines that currently rely on aggregated MOS labels.

## Related

- (link related pages by id as the wiki grows)
