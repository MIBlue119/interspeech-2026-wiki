---
id: nguyen26c_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1031
---

# MamTra: A Hybrid Mamba-Transformer Backbone for Speech Synthesis

**TL;DR** — MamTra interleaves Mamba and Transformer layers in an LLM-based TTS backbone, cutting inference memory by up to 34% versus a pure Transformer without losing speech quality, and can be trained efficiently by distilling from a pretrained Transformer.

## Problem

LLM-based TTS systems rely on autoregressive Transformers, which give strong quality but scale quadratically in compute, severely limiting practical deployment; linear-time Mamba layers are more efficient but tend to lose the global context needed for expressive synthesis.

## Method

MamTra interleaves Mamba and Transformer layers to combine Mamba's efficiency with Transformer modeling capacity, and introduces knowledge transfer strategies to distill a pretrained Transformer's abilities into the hybrid architecture, avoiding the cost of training from scratch.

## Results

Systematic experiments identify an optimal hybrid configuration; MamTra cuts inference VRAM usage by up to 34% without compromising speech fidelity, even when trained on only 2% of the original training dataset; audio samples are available online.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More efficient LLM-based TTS deployment, especially where inference memory is constrained, such as on-device or high-concurrency serving.

## Related

- (link related pages by id as the wiki grows)
