---
id: lee26w_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2996
---

# Diffusion Bridge Learning Between Overfitted and Underfitted Representations for speech emotion recognition

**TL;DR** — A diffusion-based representation-reshaping framework with class-prototype anchors improves cross-lingual speech emotion recognition by up to +6.42 points weighted average recall between English and Japanese.

## Problem

Recognizing emotion from speech reliably across domains and languages is hard because neural encoders tend to overfit to dataset-specific acoustic cues rather than learning class-centered, transferable emotion representations.

## Method

The proposed framework introduces class prototypes as anchors and learns stochastic sample-to-prototype transformations via a conditional denoising diffusion process, combined with paired alignment, cycle consistency, and classifier-based regularization, to reshape learned representations toward class-centered geometry.

## Results

On cross-lingual emotion recognition between English and Japanese, the method consistently improves weighted average recall, gaining up to +6.42 points for English-to-Japanese and +4.00 points for Japanese-to-English, demonstrating improved robustness to cross-language domain shift.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More robust cross-lingual and cross-domain speech emotion recognition for multilingual call-center analytics and affective computing systems.

## Related

- (link related pages by id as the wiki grows)
