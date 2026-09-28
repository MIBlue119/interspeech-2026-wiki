---
id: liu26p_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2125
pdf: https://www.isca-archive.org/interspeech_2026/liu26p_interspeech.pdf
---

# audiobook-cc: Controllable Long-context Speech Generation for Multicast Audiobook

[PDF](https://www.isca-archive.org/interspeech_2026/liu26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2125)

**TL;DR** — Audiobook-CC is a controllable long-context speech generation framework for multicast audiobooks that achieves a 4.25 M-MOS score on chapter-level generation, representing a 14% relative gain over strongest baselines.

## Problem

Existing text-to-speech systems are primarily designed for single-sentence synthesis, suffering from a lack of explicit inter-sentence contextual modeling and fine-grained control necessary for coherent multicast audiobooks. Standard prompt-based zero-shot systems rely on prompt audio that inadvertently carries over prosody, limiting semantic-prosodic alignment and leading to persona inconsistency and poor scenario adaptability across long-form narratives.

## Method

The framework builds upon the CosyVoice 2 architecture, retaining its text and speech tokenizers and flow-matching modules while replacing the HiFi-GAN vocoder with BigVGAN for improved audio fidelity. It introduces a structured contextual sequence representation incorporating pre-context and post-context delimited markers, and conditions an autoregressive speech language model on a decoupled speaker embedding V extracted from semantically unrelated speech of the target speaker via Cam++ to eliminate prosodic carryover. A controllability module normalizes decomposed LLM instruction outputs into discrete attribute tokens (covering nine emotions with four intensity levels, volume, and speaking rate). Training proceeds in three stages over 1M hours of diverse audio, 150k hours of context-aware audiobook data, and 100 hours of instruction-labeled data using 64 NVIDIA A800 GPUs, followed by a self-distillation strategy that uses iterative synthetic data filtering and augmentation to improve emotional stability and high-intensity discrimination.

## Results

Evaluated on Test-NAR (100 paragraphs), Test-DIA (570 dialog sentences), and Test-CHAP (15 chapters), the proposed Infer-ctx&inst configuration achieves chapter-level M-MOS of 4.25 and dialog S-MOS of 4.11, outperforming baseline models CosyVoice 2 and MOSS-TTSD. ABX preference tests demonstrate that the combined context and instruction model reaches a 73.0% preference rate at the chapter level and 61.4% on dialog compared to baselines. Ablation studies confirm that a decoupled training strategy with an optimized speaker similarity threshold (e.g., 0.68) successfully balances speaker timbre stability and prosodic diversity compared to non-decoupled variants.

## Code

- https://semisemi-ux.github.io/

## Applications

Engineers and content creators in the digital media and publishing industries can use this system for automated, expressive, long-form multicast audiobook production and interactive spoken dialogue generation.

## Limitations

The framework relies on extensive multi-stage training data and careful heuristic discretization of instructions, and minor distribution shifts between synthetic and human-recorded data can occasionally impact intermediate stability metrics.

## Related

- (link related pages by id as the wiki grows)
