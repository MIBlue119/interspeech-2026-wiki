---
id: yang26p_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3086
---

# RobustSpeechFlow: Learning Robust Text-to-Speech Trajectories via Augmentation-based Contrastive Flow Matching

**TL;DR** — A training strategy for flow-matching TTS that directly penalizes skip and repeat errors using length-preserving latent augmentations, cutting error rates without needing external aligners or extra parameters.

## Problem

Flow-matching TTS achieves strong zero-shot speaker similarity and naturalness, but remains susceptible to content fidelity issues, especially skip and repeat errors from imperfect alignment.

## Method

RobustSpeechFlow extends contrastive flow matching with length-preserving repeat and skip latent augmentations, directly penalizing these realistic failure modes without requiring external aligners or preference data, and integrates readily into existing pipelines.

## Results

On Seed-TTS-eval, reduces WER from 1.44 to 1.38 using only 0.06B parameters; on the authors' ZERO500 benchmark at NFE=24, it reduces English CER from 0.48% to 0.35% and Korean CER from 0.81% to 0.57%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More reliable zero-shot TTS for production voice-cloning systems where skip/repeat errors are unacceptable.

## Related

- (link related pages by id as the wiki grows)
