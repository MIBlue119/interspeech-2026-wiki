---
id: lei26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-561
pdf: https://www.isca-archive.org/interspeech_2026/lei26_interspeech.pdf
---

# ARCHES: An Agent-Based Refinement Cycle for Hierarchical Synthesis of Sound Effects for Variety Shows

[PDF](https://www.isca-archive.org/interspeech_2026/lei26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lei26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-561)

**TL;DR** — ARCHES introduces an agent-based hierarchical refinement framework with retrieval-augmented generation and long-term memory to synthesize stylized, contextually appropriate sound effects for variety shows, achieving a Fréchet Audio Distance of 7.04 and an onset difference of 0.048 seconds.

## Problem

Automated audio generation models struggle with the dynamic, non-diegetic, and stylized demands of variety shows, failing to capture rare or stylized sounds like celebrity laughs. Existing video-to-audio methods focus primarily on natural physical sounds such as footsteps or collisions rather than comedic or emotional variety show enhancements. Furthermore, standard generation methods lack the fine-grained temporal and creative control required for precise synchronization.

## Method

The ARCHES framework mimics a professional post-production team through an iterative workflow involving planning, generation, and refinement stages. It relies on three core modules: Auditory Unified Retrieval Augmentation (AURA) using a Qwen2-Audio encoder and InfoNCE loss to retrieve professional exemplars from a 26k-sample database; Adaptive eXpert Intelligent Switch (AXIS) as a self-routing mechanism delegating corrections to specialized refiners like temporal and emotion adjusters; and Creative Experience Bank (CEB) acting as a long-term memory to store successful workflows. High-level cognitive functions utilize Gemini-2.5 Pro, while audio generation and editing follow MultiFoley structures.

## Results

Evaluated on the newly introduced VSSE-Bench comprising 1,000 full-length variety show episodes, ARCHES is compared against SOTA baselines MMAudio, Kling-Foley, HunyuanVideo-Foley, and FoleyCrafter. ARCHES achieves an LSD of 0.77 dB, an onset difference of 0.048 s, an FAD of 7.04, and an automated MOS of 2.68, outperforming all baselines. Ablation studies confirm that removing AURA increases FAD to 15.81, removing AXIS worsens onset difference to 0.122 s, and omitting CEB degrades performance.

## Code

- https://arches-bench.github.io/

## Applications

Audio engineers, content creators, and post-production studios use this framework to automatically generate stylized, synchronized, and context-appropriate sound effects for variety shows and comedic media.

## Limitations

The framework suffers from iterative generation latency and relies heavily on the capabilities of underlying multi-modal LLM backbones.

## Related

- (link related pages by id as the wiki grows)
