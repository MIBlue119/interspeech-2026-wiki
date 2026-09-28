---
id: chen26ea_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3369
pdf: https://www.isca-archive.org/interspeech_2026/chen26ea_interspeech.pdf
---

# SFL-MTSC: Leveraging Semantic Frame-Level Multi-Task Self-Consistency for Robust Multi-Intent Spoken Language Understanding

[PDF](https://www.isca-archive.org/interspeech_2026/chen26ea_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26ea_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3369)

**TL;DR** — The paper introduces SFL-MTSC, a frame-level self-consistency framework for multi-intent spoken language understanding that decomposes model outputs into semantic frames and filters unreliable predictions via path support scoring, improving zero-shot overall accuracy and slot F1.

## Problem

Prompt-based spoken language understanding using large language models often produces inconsistent intent-slot structures due to decoding stochasticity, especially in multi-intent scenarios where utterances express multiple intents. Standard output-level majority voting is ineffective because it operates at too coarse a granularity to filter out false intents and noisy slot predictions. Existing methods cannot cleanly handle structured semantic frames without discarding valid partial information or requiring expensive additional LLM calls.

## Method

SFL-MTSC samples K reasoning paths at various temperatures, extracts semantic frames as triples of domain, intent, and slots, and groups them via coarse-to-fine clustering. It uses domain-intent buckets followed by slot-level clustering governed by a Hybrid Jaccard similarity metric that blends key-value and value-based matching (controlled by coefficient alpha). A support-based filtering mechanism retains clusters backed by at least half of the reasoning paths. Finally, a value-first re-integration strategy uses support voting to select representative slot values and majority voting to assign corresponding keys.

## Results

Evaluated zero-shot on the Chinese MAC-SLU automotive cabin benchmark dataset (8 domains, 81 intents, 192 slot types, up to 4 intents per utterance) across text LLMs (Qwen3-4B-Instruct), ASR+LLM pipelines (Whisper-Large-V3-Turbo + Qwen3-4B), and end-to-end LALMs (Qwen2.5-Omni-7B) compared against Vanilla Prompting, CroPrompt, and GPT-SLU baselines. With vanilla prompting on Qwen3-4B, SFL-MTSC improves overall accuracy from 2.07% to 3.30% and slot F1 from 29.39% to 58.25% (a +28.86% absolute gain). Ablation studies show that slot-level filtering is the primary driver of performance gains and that a hybrid Jaccard coefficient of alpha equals 0.1 achieves the best slot F1 of 58.47%.

## Code

- https://github.com/boyan1001/SFL-MTSC

## Applications

Engineers building task-oriented spoken dialogue systems, smart home assistants, or in-vehicle voice controls can use this framework to improve the robustness and accuracy of zero-shot multi-intent spoken language understanding.

## Limitations

The framework can experience occasional drops in intent accuracy and yields more limited gains under end-to-end large audio-language model settings due to high decoding variance; evaluation is currently restricted to a single dataset.

## Related

- (link related pages by id as the wiki grows)
