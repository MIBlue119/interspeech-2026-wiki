---
id: jin26b_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1069
---

# Learning to Rescale: On-the-Fly Sequence Length Adaptation in Non-Autoregressive Speech Synthesis

**TL;DR** — A non-autoregressive TTS model that removes the usual dependence on accurate duration prediction by learning to rescale sequence length on the fly, producing natural speech from inputs of any length.

## Problem

Non-autoregressive TTS models synthesize speech in parallel with consistent style, but their quality is bottlenecked by dependence on accurate character-level or global duration predictions.

## Method

ElasticDLM introduces two functional tokens, a Differentiated Length-Scaling Training Scheme, and a Hierarchical Confidence-Guided Inference strategy so the model learns length-scaling behavior directly and automatically adjusts output sequence length at inference instead of relying on separate duration prediction.

## Results

ElasticDLM produces high-fidelity, natural speech from arbitrary-length inputs, offering a simpler and more flexible alternative to duration-predictor-based NAR TTS; audio samples are released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Simplified, robust non-autoregressive TTS pipelines that avoid brittle duration-prediction components, useful wherever input text length varies widely.

## Related

- (link related pages by id as the wiki grows)
