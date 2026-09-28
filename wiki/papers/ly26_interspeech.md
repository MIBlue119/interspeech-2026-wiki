---
id: ly26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-491
pdf: https://www.isca-archive.org/interspeech_2026/ly26_interspeech.pdf
---

# TinyGiantALM: A Compact Audio-Language Model for Intent-Aware Reasoning under Resource Constraints

[PDF](https://www.isca-archive.org/interspeech_2026/ly26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ly26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-491)

**TL;DR** — TinyGiantALM is a compact 1.5B audio-language model that uses instruction-aware feature refinement and semantic gating to achieve a 46.4% zero-shot accuracy on the MMAR benchmark, outperforming significantly larger 7B-13B baselines.

## Problem

Current audio reasoning models rely on massive parameter scaling (>7B-30B) and costly reinforcement learning, creating high computational barriers for resource-constrained edge environments. Furthermore, traditional audio-language models often suffer from performance collapse and "blindness" when attempting to disentangle complex, overlapping acoustic scenes.

## Method

The model features a triple-stream acoustic front-end utilizing frozen Whisper-Large-v3-turbo (16kHz), HTS-AT (48kHz), and CLAP encoders. A query-guided projector built from E-Branchformer blocks fuses local and global temporal contexts, while a cross-attention mechanism conditions audio features on textual user intent. Finally, a CLAP-driven semantic gating layer modulates the features via affine scaling before they are injected into a Qwen3-0.6B language model backbone.

## Results

Evaluated on the MMAR benchmark across 558,423 instruction-tuning samples from the CoTA dataset, TinyGiantALM achieves 46.4% zero-shot accuracy, outperforming Audio-Reasoner (8.4B) at 36.8% and Baichuan-Omni-1.5 (11B) at 40.7%. In mixed-modality tasks like Mix-Sound-Music, it attains 45.45% compared to near-random performance from vanilla baselines. Ablations show that combining instruction queries with the CLAP gate yields an 8.40% overall accuracy boost over the vanilla baseline, with notable gains in audio difference analysis (+37.50%) and aesthetic evaluation (+25.00%).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers looking to deploy robust audio-understanding and reasoning capabilities onto edge devices or resource-constrained environments.

## Limitations

The model exhibits a reasoning gap in generating long-context logical narratives compared to 30B+ foundation models (scoring 23.77% in rubric evaluation), and aggressive global semantic gating can introduce noise in overly dense multi-source scenes or spatial tasks.

## Related

- (link related pages by id as the wiki grows)
