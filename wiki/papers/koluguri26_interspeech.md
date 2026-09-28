---
id: koluguri26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-728
pdf: https://www.isca-archive.org/interspeech_2026/koluguri26_interspeech.pdf
---

# Preference-ASR: A Preference-Aware Test Set for Benchmarking ASR in the Era of Speech LLMs

[PDF](https://www.isca-archive.org/interspeech_2026/koluguri26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koluguri26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-728)

**TL;DR** — Preference-ASR is a 3,210-sample English ASR test set paired with a preference-aware normalizer that evaluates speech LLMs on following natural-language style instructions, exposing quality differences and hallucination failure modes invisible to standard WER.

## Problem

Popular ASR benchmarks exhibit inconsistent conventions for numbers, entities, disfluencies, and casing, while standard evaluation normalizers erase the precise format distinctions users care about. Current test sets therefore cannot measure whether modern speech-augmented LLMs actually follow natural-language user instructions for transcription style.

## Method

The benchmark draws 3,545 verified audio samples from seven open-source corpora and passes them through a two-stage LLM-assisted pipeline (using Qwen3-30B-Instruct) for preference categorization, instruction generation, and reference creation, yielding 3,210 deduplicated triples. It covers four categories: normalization (numbers, symbols, links), entities (company, product, people, location, etc.), disfluencies (fillers, repetitions, false starts), and case. The paper also introduces a preference-aware normalizer that selectively skips specific processing steps (e.g., text normalization, lowercasing) matching the active instruction to prevent penalizing correct formatting behavior.

## Results

Evaluated on four models (Parakeet-TDT-0.6B-v3, Canary-Qwen-2.5B, Phi-4-Multimodal at 5.6B, and Qwen3-Omni-30B) using standard vs. preference-aware WER. Qwen3-Omni achieved strong instruction compliance for normalization (5.25% standard WER) and case, but suffered from prompt-driven entity hallucination, where entity WER spiked from 5.12% to 12.85% when prompted with biasing terms absent from audio. Canary-Qwen showed flat responses to instructions overall (5.64% to 5.84%), proving that an LLM backbone without preference alignment is insufficient for instruction following.

## Code

- https://github.com/nithinraok/preference-asr-bench

## Applications

Speech engineers and developers evaluating speech-augmented LLMs on instruction-following, formatting control, contextual biasing, and rich transcription style requirements.

## Limitations

The benchmark is currently limited to English, omits multi-speaker preference interactions, and its construction pipeline requires substantial manual verification especially for normalization.

## Related

- (link related pages by id as the wiki grows)
