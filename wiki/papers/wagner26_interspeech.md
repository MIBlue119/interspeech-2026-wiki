---
id: wagner26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2792
---

# Transcription Policy as a Latent Variable: Activating Controllable Verbatim ASR with Word-Level Timing

**TL;DR** — Making transcription style (verbatim vs. cleaned-up) an explicit, controllable input rather than a hidden variable fixes major decoding instability in ASR, dramatically improves disfluency detection cross-lingually, and produces more reliable word-level timestamps.

## Problem

ASR models trained on heterogeneously annotated data implicitly treat transcription style — verbatim versus intended/cleaned — as an uncontrolled latent variable, which the authors show causes decoding instability, evaluation confounding (up to 60% of reported WER attributable to style mismatch), and unreliable word-level timing.

## Method

The authors introduce coverage-aware decoder task tokens trained on parallel verbatim/intended transcript pairs to make transcription style an explicit, controllable input, plus supervised cross-attention fine-tuning to improve word-level timestamps on disfluent speech beyond forced-alignment baselines.

## Results

The approach raises German disfluency F1 from 10% to 79% zero-shot from English-only training; full English-only fine-tuning surpasses all baselines in verbatim accuracy, disfluency detection, and intended-mode quality across both languages; the authors also introduce a new "verbatimize" task for scalable creation of high-quality verbatim transcript corpora.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Legal, medical, and research transcription pipelines that need reliably controllable verbatim-versus-cleaned output and accurate word timing, especially for disfluent speech.

## Related

- (link related pages by id as the wiki grows)
