---
id: hao26_interspeech
category: singing-voice
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1547
---

# YingMusic-Singer: Controllable Singing Voice Synthesis with Flexible Lyric Manipulation and Annotation-free Melody Guidance

**TL;DR** — A diffusion model that can re-sing a song with new lyrics while preserving the original melody, from just a timbre reference, a melody clip, and the new lyrics — no manual lyric-melody alignment needed.

## Problem

Regenerating a singing performance with altered lyrics while preserving melody consistency is challenging, since existing methods either offer limited controllability or require laborious manual alignment between lyrics and melody.

## Method

The authors propose YingMusic-Singer, a fully diffusion-based model that takes an optional timbre reference, a melody-providing singing clip, and modified lyrics as input without manual alignment, trained with curriculum learning and Group Relative Policy Optimization; they also introduce LyricEditBench, a benchmark for melody-preserving lyric-modification evaluation.

## Results

YingMusic-Singer achieves stronger melody preservation and lyric adherence than Vevo2, the closest alignment-free baseline.

## Code

Code, weights, benchmark, and demos reported as publicly available at https://github.com/ASLP-lab/YingMusic-Singer-Plus — unverified by this wiki as of the `updated` date; please confirm and update this entry if you can.

## Applications

Music production tools for re-lyricizing existing songs or covers while preserving the original melody and singer timbre.

## Related

- (link related pages by id as the wiki grows)
