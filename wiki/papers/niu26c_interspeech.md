---
id: niu26c_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1881
---

# Improving Stable Speech Synthesis Post-Training with ChatScorer and Margin-Based Preference Construction

**TL;DR** — Replacing a single fused reward metric with a learned auxiliary scorer and margin-based preference pairs stabilizes post-training of codec-based TTS models, reducing bad outputs while keeping intelligibility and speaker similarity competitive.

## Problem

Post-training methods for codec-based TTS often combine several automatic metrics like CER/WER and speaker similarity into one scalar reward, but this fusion can produce weakly separated candidate scores that give ambiguous training supervision.

## Method

The authors introduce ChatScorer as an auxiliary reward model, combined with margin-based preference construction to create better-separated training pairs, and instantiate this framework across different post-training methods for codec-based TTS.

## Results

Experiments show the framework reduces undesirable outputs and improves generation stability while maintaining competitive intelligibility and speaker similarity compared to standard fused-reward post-training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More stable and reliable post-training pipelines for commercial and research TTS systems built on neural audio codecs.

## Related

- (link related pages by id as the wiki grows)
