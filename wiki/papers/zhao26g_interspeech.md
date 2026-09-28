---
id: zhao26g_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2159
---

# MSpoofTTS: Multi-Resolution Spoof-Guided Inference for Discrete Speech Synthesis

**TL;DR** — A training-free inference framework uses multi-resolution "spoof detectors" to prune and re-rank codec-based TTS candidates, improving realism without retraining or modifying model parameters.

## Problem

Neural codec language models produce high-quality discrete speech synthesis, but their inference remains vulnerable to token-level artifacts and distributional drift that degrade perceptual realism.

## Method

MSpoofTTS introduces a Multi-Resolution Token-based Spoof Detection framework that evaluates codec sequences at different temporal granularities to detect locally inconsistent or unnatural patterns, then integrates these spoof detectors into a hierarchical decoding strategy that progressively prunes low-quality candidates and re-ranks hypotheses, all without modifying model parameters.

## Results

Experiments validate the effectiveness of the framework for robust, high-quality codec-based zero-shot speech generation; demos are available online.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving the robustness and perceptual quality of any codec-language-model-based TTS system at inference time, without retraining.

## Related

- (link related pages by id as the wiki grows)
