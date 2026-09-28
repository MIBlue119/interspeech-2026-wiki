---
id: liu26l_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1531
---

# Decoupling Search and Evaluation: Efficient Beam Decoding for Language Model-Based Text-to-Speech Synthesis

**TL;DR** — SaVE-Beam splits beam search for LM-based TTS into a cheap student model that proposes hypotheses and the full teacher model that scores them, delivering up to 5x faster decoding with much lower word error rate than sampling.

## Problem

LM-based TTS typically uses sampling-based decoding, which is unstable, while beam search would give more consistent maximization-based output but suffers from degeneration (e.g. temporal collapse) and high latency in speech generation, largely because search and evaluation costs are imbalanced.

## Method

SaVE-Beam decouples hypothesis expansion from sequence scoring: a lightweight student model performs chunk-wise beam construction while the full teacher LM retains exact scoring, and hard repetition constraints prevent degenerate loops.

## Results

SaVE-Beam achieves up to a 5.1x speedup over conventional beam search without degrading speech quality, and cuts word error rate by up to 50% compared to sampling-based decoding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Practical, stable maximization-based decoding for real-time LM-based TTS systems that currently rely on sampling.

## Related

- (link related pages by id as the wiki grows)
