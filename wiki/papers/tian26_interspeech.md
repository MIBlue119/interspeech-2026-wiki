---
id: tian26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-873
pdf: https://www.isca-archive.org/interspeech_2026/tian26_interspeech.pdf
---

# Bagpiper-TTS: Natural Language Guided Universal Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/tian26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tian26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-873)

**TL;DR** — Bagpiper-TTS uses a natural language interface and a three-stage planning-caption-generation workflow to support universal speech synthesis, achieving a 1.7% Word Error Rate on the Seed-TTS-Eval benchmark.

## Problem

Traditional text-to-speech systems rely on rigid input formats and predefined metadata slots, preventing them from accommodating fluid, unpredictable, and multi-faceted user requests. As speech applications expand to multi-talker dialogues, intent-to-speech, and immersive role-play, disjointed modules fail to integrate these tasks into a single, cohesive framework. This creates a mismatch between real-world user needs and the technical capabilities of modern rigid architectures.

## Method

Bagpiper-TTS builds upon the Bagpiper-Base foundational model, utilizing the Qwen3-38B-Base decoder-only LLM backbone and X-Codec operating at 50Hz with 8 discrete codes per frame. It processes free-form text requests via a hierarchical three-stage pipeline: textual planning for intent and constraints, synthesis of a detailed rich caption blueprint (up to hundreds of tokens), and rich-caption-guided speech generation. To train this, the authors curated a 738k-sample fine-tuning dataset using a simulation pipeline that reverse-engineers user requests from rich captions, runs planning simulations, and applies WER-based filtering and LLM consistency validation.

## Results

Evaluated on the Seed-TTS-Eval (En) benchmark for classical TTS, Bagpiper-TTS achieves a 1.7% Word Error Rate. Across specialized applications including multi-talker, intent-to-speech, role-play, and singing voice synthesis, the model matches the performance of dedicated models in LLM-as-a-judge and human subjective evaluations. The 738k fine-tuning corpus spans classical TTS (31.9%), general-purpose (20.8%), intent-to-speech (18.4%), multi-talker (13.8%), singing voice synthesis (8.8%), and role-play (6.4%).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers building flexible, conversational voice assistants, multi-speaker dialogue systems, and content creation tools that require dynamic control via natural language prompts.

## Related

- (link related pages by id as the wiki grows)
