---
id: gong26_interspeech
category: on-device
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-182
---

# NCPSZ: A Nonlinear Control Network for Miniature Loudspeakers in Personal Sound Zone Applications

**TL;DR** — A data-driven nonlinear control network improves sound leakage suppression on smartphone-scale speakers by explicitly compensating for their nonlinear distortion.

## Problem

Linear control methods for personal sound zones (PSZ), which try to keep sound audible in one zone and silent in another, degrade badly on devices with miniature loudspeakers because of severe nonlinear distortion.

## Method

NCPSZ uses an asymmetric dual-network design: an offline "ModelNet" learns the loudspeaker's nonlinear behavior at high fidelity, and supervises a lightweight, causal "CtrlNet" for real-time control; an "anchor speaker" keeps target sound pressure in the bright zone while CtrlNet drives assisting speakers to actively cancel nonlinear leakage in the dark zone.

## Results

In a realistic smartphone leakage-prevention task, NCPSZ improves acoustic contrast by 3.78 dB over a linear baseline (VAST) and 1.80 dB over a parameter-matched causal CNN.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving audio playback on smartphones and other miniature-speaker devices where sound leakage to bystanders must be minimized.

## Related

- (link related pages by id as the wiki grows)
