---
id: tu26b_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2381
pdf: https://www.isca-archive.org/interspeech_2026/tu26b_interspeech.pdf
---

# VISA: A Visual Information Strengthened Audio-Reasoning System for the Interspeech 2026 ARC Agent Track

[PDF](https://www.isca-archive.org/interspeech_2026/tu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2381)

**TL;DR** — VISA is a multi-modal agent system that strengthens large audio language models with visualized acoustic evidence and category-aware routing, achieving 2nd place and a top accuracy of 77.40% on the MMAR benchmark for the Interspeech 2026 Audio Reasoning Challenge.

## Problem

Large audio language models (LALMs) struggle with multi-step reasoning, precise temporal localization, and complex auditory scenes containing mixed sources, noise, or dynamic changes. Standard transcription intermediates and unguided inference lead to recognition errors, shortcut learning, and hallucinated reasoning chains. Solving this requires robust multi-modal integration and evidence-grounded inference protocols that go beyond conventional perception tasks like ASR or captioning.

## Method

The VISA system integrates three main modules: multi-modal feature extraction, model-voting inference, and fine-grained category-aware routing. Feature extraction combines librosa acoustic descriptors, Qwen3-Omni-Captioner semantic outputs, FlexSED event timestamp detection, and a VLM (Qwen3-VL-235B-A22B) analyzing five types of acoustic visualizations (Mel, CQT, RMS) to capture temporal dynamics and spatial patterns. The reasoning module ensemblem-queries Qwen3-Omni-Thinking and Step-Audio-R1 using stochastic sampling ($K=3$, $	au>0$) with a deterministic greedy fallback ($	au=0$) for stability. Finally, a Disagree-then-Route mechanism classifies queries across 27 fine-grained categories to apply three specialized routing strategies: LLM reasoning/selection, VLM-empowered spectral reasoning, or direct expert selection.

## Results

Evaluated on the MMAR benchmark for the Interspeech 2026 Audio Reasoning Challenge (Agent Track), VISA achieved an overall accuracy of 77.40% (the highest across all submissions in both Agent and Single Model tracks) and an official MMAR Rubrics reasoning quality score of 66.23%, placing 2nd overall in the Agent Track. Ablations removing the fine-grained category-aware routing strategy dropped performance, demonstrating that specialized sub-category routing and VLM-based spectral analysis significantly improve metrics across signal, spatial, and temporal layers compared to unrouted voting or single models.

## Code

- https://audio-reasoning-challenge.github.io/

## Applications

Engineers and researchers building multi-modal voice assistants, audio-visual understanding systems, or automated audio reasoning agents for complex auditory scene analysis, event detection, and multi-step question answering.

## Limitations

The system relies on complex orchestration across multiple large foundational models (LALMs, VLMs, and LLM judges), which can introduce computational overhead during inference.

## Related

- (link related pages by id as the wiki grows)
