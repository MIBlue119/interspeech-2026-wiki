---
id: meng26c_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1618
---

# BiEAR: A Human Auditory-Inspired Adaptive Binaural Front-end for Multi-Speaker Localisation and Distance Estimation

**TL;DR** — A binaural front-end inspired by the ear's own feedback mechanism that adaptively retunes its filterbank on the fly, improving multi-speaker localization and distance estimation robustness over fixed binaural front-ends.

## Problem

Fixed binaural front-ends for multi-speaker localization and distance estimation do not adapt to changing acoustic conditions, unlike the human auditory system, which limits robustness to unseen speakers and rooms.

## Method

BiEAR uses a neural controller, inspired by medial olivocochlear feedback in human hearing, to adaptively adjust the frequency selectivity of a binaural filterbank during inference, producing time-frequency adaptive representations for each ear.

## Results

On anechoic and real-room evaluations, BiEAR's adaptive front-end improves localization accuracy and robustness to unseen speakers and rooms compared with common fixed binaural front-ends, with learned filter adaptations shown to emphasize informative frequency bands over time.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust multi-speaker localization and distance estimation for hearing aids, robot audition, and smart-speaker microphone arrays in complex acoustic scenes.

## Related

- (link related pages by id as the wiki grows)
