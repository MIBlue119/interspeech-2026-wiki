---
id: xu26q_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2614
---

# Continual Generalized Category Discovery for Acoustic Signals via Instance-Adaptive Regularization and Dynamic Teacher Guidance

**TL;DR** — Adapts continual generalized category discovery to audio, which vision-based methods handle poorly, using instance-adaptive regularization and an EMA teacher, improving both novel-sound discovery and retention of previously learned classes.

## Problem

Acoustic perception systems need to keep discovering new sound categories from unlabeled streaming data while retaining old ones, but directly applying vision-based continual generalized category discovery methods to audio degrades badly due to complex spectrotemporal structure, strong class overlap, and base-class bias.

## Method

The authors propose an audio-oriented framework combining instance-adaptive regularization to balance consolidating old knowledge against exploring new categories, GMM-based adaptive thresholding, and an EMA-updated dynamic teacher for stable pseudo-label generation.

## Results

On LibriSpeech and ShipsEar, the method shows consistent gains in novel-class discovery and old-class retention, reaching 74.14% cumulative average accuracy on ShipsEar, 4.84 points above the Happy baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Continually updating acoustic classification systems (e.g. environmental sound or vessel-type recognition) that must discover new categories from unlabeled streams while not forgetting known ones.

## Related

- (link related pages by id as the wiki grows)
