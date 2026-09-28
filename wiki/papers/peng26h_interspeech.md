---
id: peng26h_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2074
---

# Discrete vs. Continuous: A Comprehensive Study of Unified Audio Understanding in LALMs

**TL;DR** — A systematic study across speech, sound, and music domains using the UniARC framework finds that semantic constraints in tokenization are pivotal for audio understanding, and that simply scaling the backbone LLM cannot compensate for information loss from discrete audio representations, especially in data-limited tasks.

## Problem

Large Audio Language Models use either continuous features or discrete tokens for audio, but which representation paradigm is optimal for general audio understanding remains debated, with existing benchmarks often narrow or evaluating encoders outside LALM contexts.

## Method

The authors systematically evaluate continuous and discrete audio representations across speech, sound, and music domains using the UniARC framework with dual evaluation strategies, across model scales from SmolLM2-135M to Llama-3-8B, analyzing data volume, model capacity, and compute efficiency.

## Results

The results reveal the pivotal role of semantic constraints in tokenization for audio understanding, and show that scaling backbones fails to compensate for information loss in audio representation, especially in data-limited tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Provides practical guidance for LALM developers on how to balance semantic density, fidelity, and efficiency when choosing an audio tokenization strategy.

## Related

- (link related pages by id as the wiki grows)
