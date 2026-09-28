---
id: park26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-130
---

# Sleep Sound Event Detection Powered by Learnable Multi-Resolution Adaptive Line Enhancer

**TL;DR** — ACF-SED is the first framework to inject an Adaptive Line Enhancer's per-frame confidence map directly into Transformer attention biasing and feature modulation (not just as preprocessing), achieving state-of-the-art microphone-only detection of snoring, hypopnea, and apnea events for sleep apnea screening.

## Problem

Obstructive sleep apnea severity is quantified via the Apnea-Hypopnea Index using costly, clinically demanding polysomnography, making noninvasive microphone-only detection an attractive but technically challenging alternative.

## Method

ACF-SED (ALE-Confidence Fusion Sound Event Detection) uses a Multi-Resolution ALE Bank aggregating three parallel NLMS filters at distinct decorrelation delays, and a Confidence-Guided Cross-Path block that couples event and noise streams via gated cross-attention, injecting the ALE's per-frame confidence map into Transformer attention biasing rather than treating it as mere preprocessing.

## Results

On the Audio-Polygraphy Dataset for Sleep Apnea Analysis, ACF-SED achieves state-of-the-art detection across Event-F1, Segment-F1, and PSDS metrics, enabling end-to-end AHI estimation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Supports low-cost, microphone-only home screening for obstructive sleep apnea as an alternative to full polysomnography.

## Related

- (link related pages by id as the wiki grows)
