---
id: sun26j_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3344
pdf: https://www.isca-archive.org/interspeech_2026/sun26j_interspeech.pdf
---

# MSU-Bench: Towards Understanding the Conversational Multi-Speaker Scenarios

[PDF](https://www.isca-archive.org/interspeech_2026/sun26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3344)

**TL;DR** — The paper introduces MSU-Bench, a diagnostic evaluation benchmark for speaker-centric spoken language understanding in conversational multi-speaker scenarios, revealing that current large audio language models struggle significantly with complex speaker grounding and multi-speaker reasoning.

## Problem

Current speech benchmarks and large audio language models primarily focus on single-speaker settings or isolated subtasks, leaving interaction-level understanding in multi-speaker conversations largely untested. Realistic interactions involve rapid turn-taking, overlaps, and speaker-dependent variations that require models to track identities, consistency, and discourse structures. Without proper diagnostic infrastructure, the specific bottlenecks of end-to-end models in speaker grounding and reasoning remain unclear.

## Method

The authors construct MSU-Bench, a two-tier framework spanning 16 speaker-centric tasks across 2,300 multiple-choice QA instances derived from diverse Chinese and English conversational and media corpora. The data pipeline utilizes Gemini and API-based diarization for automated annotation followed by rigorous human-in-the-loop verification to guarantee answer determinacy. The benchmark evaluates five distinct speaker-referencing schemes ranging from direct acoustic snippets to complex multi-cue alignments, and maps distractors to specific diagnostic error types like wrong-speaker attribution or hallucination.

## Results

Evaluating nine speech-language models zero-shot shows exact-match accuracies ranging from 0.19 (Qwen2.5-Omni) to 0.77 (Gemini-3-Flash). Closed-source systems systematically outperform open-source counterparts, with Gemini-3-Flash achieving the highest overall scores (0.73 on Tier 1 and 0.84 on Tier 2). Among open-source models, MiMoAudio leads with an overall score of 0.56, outperforming other open-source alternatives like Qwen3-Omni (0.39) and StepAudio2 (0.44). Ablations across speaker-referencing schemes indicate that time-based temporal grounding remains a major performance bottleneck compared to direct acoustic or combined complex indexing.

## Code

- https://github.com/ASLP-lab/MSU-Bench

## Applications

Engineers and researchers developing large audio language models and conversational speech agents can use this benchmark to systematically evaluate and diagnose multi-speaker understanding capabilities.

## Limitations

Evaluations rely on zero-shot multiple-choice QA which may not fully reflect open-ended conversational fluency, and prompt sensitivity remains a factor despite rigorous human filtering.

## Related

- (link related pages by id as the wiki grows)
