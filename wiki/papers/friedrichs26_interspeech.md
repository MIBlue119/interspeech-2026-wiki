---
id: friedrichs26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1883
---

# Acoustic Pharyngometry as an Auditable Anchor for Cross-Speaker EMA Normalization

**TL;DR** — Combines palate-length scaling with a pharyngometry-derived vocal-tract landmark to normalize electromagnetic articulography data across speakers, reducing geometric variability but not fully removing speaker identity from the signal.

## Problem

Comparing tongue-movement (EMA) data across speakers is confounded by differences in vocal-tract shape, and existing normalization approaches are hard to audit or validate.

## Method

The authors anchor a low-parameter anterior-posterior warp using a pharyngometry-derived oral landmark combined with palate-length scaling, then test it on German diadochokinetic sequences, measuring both interspeaker trajectory dispersion and leave-one-speaker-out formant prediction.

## Results

Interspeaker dispersion of tongue trajectories drops from 31.28mm to 26.13mm (16.5% total, mostly from scaling alone), but the normalization does not improve F1/F2 prediction from EMA, and speaker identity remains detectable after removing static positional offsets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improves geometric comparability of articulatory (EMA) data across speakers for phonetics research, though it does not by itself yield speaker-independent articulatory-to-acoustic mapping.

## Related

- (link related pages by id as the wiki grows)
