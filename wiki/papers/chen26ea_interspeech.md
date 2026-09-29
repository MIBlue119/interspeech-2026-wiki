---
id: chen26ea_interspeech
category: speech-llm-dialogue
institutions: ["National Taiwan Normal University"]
code: https://github.com/boyan1001/SFL-MTSC
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3369
pdf: https://www.isca-archive.org/interspeech_2026/chen26ea_interspeech.pdf
---

# SFL-MTSC: Leveraging Semantic Frame-Level Multi-Task Self-Consistency for Robust Multi-Intent Spoken Language Understanding

*Po-Yen Chen, Berlin Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26ea_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26ea_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3369)

**Category:** `speech-llm-dialogue`

**TL;DR** — Semantic Frame-Level Multi-Task Self-Consistency (SFL-MTSC) is a structured inference aggregation framework that resolves decoding stochasticity in multi-intent spoken language understanding (SLU) by filtering and re-integrating intent-specific semantic frames across multiple paths. It improves end-to-end overall accuracy by up to 1.75% and slot F1 by up to 28.86% in zero-shot settings.

## Key contributions

- Proposes SFL-MTSC, a frame-level self-consistency aggregation framework operating below the output level to remove false intents and noisy slot predictions in multi-intent SLU.
- Introduces Hybrid Jaccard similarity for slot clustering, interpolating key-based and value-based matching to tolerate slot name variations across reasoning paths.
- Employs a value-first re-integration strategy using support-based value filtering and majority-voting key resolution.
- Demonstrates consistent zero-shot performance gains across text-only LLMs, ASR+LLM pipelines, and end-to-end large audio-language models (LALMs) on the MAC-SLU benchmark.

## Problem

Prompt-based spoken language understanding with large language models frequently struggles with inconsistent intent-slot structures due to decoding stochasticity, particularly in complex multi-intent utterances where a single sentence expresses multiple semantic frames across different domains. Conventional output-level majority voting is unsuited for multi-intent frame-structured outputs, while LLM-as-a-judge methods introduce high hallucination risks and excessive computational overhead. Without fine-grained structural alignment, conflicting paths yield fragmented semantic frames that degrade downstream task execution in automotive or smart home environments.

## Method

Given an input utterance, SFL-MTSC generates K = 5 reasoning paths using varying sampling temperatures (T from 0 to 1.0) via models like Qwen3-4B-Instruct or Qwen2.5-Omni-7B. Each predicted path yields a set of semantic frames consisting of a domain, an intent, and slot-value pairs. Frames are collected into a unified pool and partitioned into domain-intent buckets to narrow the search space.

Within each domain-intent bucket, SFL-MTSC performs slot clustering by constructing a threshold similarity graph based on a Hybrid Jaccard metric. This metric interpolates Key-Value Jaccard and Value-Based Jaccard using a mixing coefficient alpha = 0.3. Each resulting cluster represents a candidate semantic frame instance.

To evaluate cluster reliability, the framework counts the number of distinct reasoning paths supporting each cluster, discarding clusters backed by fewer than half of the paths (support threshold >= K/2). The final prediction is reconstructed via a value-first re-integration strategy: representative slot values are filtered by value support, and corresponding slot keys are determined via majority voting across supporting paths.

## Experimental setup

Evaluated on MAC-SLU, a Chinese multi-intent automotive spoken language understanding benchmark comprising 8 domains, 81 intents, 192 slot types, and up to 4 simultaneous intents per utterance. Tested across three architectures: text-only Qwen3-4B-Instruct-2507, an ASR pipeline using Whisper-Large-V3-Turbo (12.83% CER) paired with Qwen3-4B-Instruct, and the end-to-end LALM Qwen2.5-Omni-7B. Compared against Vanilla Prompting, CroPrompt, and GPT-SLU adapted for multi-intent inputs. Metrics include Intent Accuracy, Slot F1, and Overall Accuracy (strictest end-to-end match). Implemented using vLLM and vLLMOmni on an NVIDIA Titan RTX GPU with K=5 reasoning paths, similarity threshold tau = 0.55, and alpha = 0.3.

## Results

SFL-MTSC consistently improves Overall Accuracy and Slot F1 across all zero-shot configurations, with the most dramatic gains appearing under Vanilla Prompting where structural guidance is minimal. For text-only Vanilla Prompting, Overall Accuracy rises from 2.07% to 3.30% (+1.23%) and Slot F1 surges from 29.39% to 58.25% (+28.86%). In the Whisper ASR pipeline, Vanilla Prompting + SFL-MTSC achieves 49.53% Slot F1 compared to 22.15% baselines (+27.38%). 

Ablation studies show that slot-level support filtering is the primary engine of performance gains, raising Overall Accuracy from 2.52% (unfiltered) to 3.30%. Tuning the Hybrid Jaccard mixing coefficient alpha reveals that performance remains stable across alpha in [0.0, 0.7], peaking in Slot F1 (58.47%) at alpha = 0.1, indicating that slot clustering relies heavily on value-based similarity. SFL-MTSC does not universally win on Intent Accuracy, which occasionally drops slightly (e.g., from 46.84% to 44.22% under text Vanilla Prompting) as aggressive slot-level filtering prunes inconsistent structures.

| Systems / Conditions | Overall Acc. (%) | Intent Acc. (%) | Slot F1 (%) |
|---|---|---|---|
| Vanilla Prompting [12] | 2.07 | 46.84 | 29.39 |
| Vanilla + SFL-MTSC (Ours) | 3.30 | 44.22 | 58.25 |
| CroPropmt (Slot->Intent) [5] | 4.16 | 55.12 | 52.70 |
| CroPrompt + SFL-MTSC (Ours) | 4.52 | 53.26 | 52.23 |
| GPT-SLU [4] | 4.07 | 58.05 | 49.06 |
| GPT-SLU + SFL-MTSC (Ours) | 4.10 | 56.82 | 47.33 |

## Limitations

The framework occasionally suffers slight drops in Intent Accuracy due to aggressive frame-level filtering discarding valid semantic interpretations. Gains are more modest when applied to LALMs like Qwen2.5-Omni-7B due to high speech-to-semantics decoding variance. Evaluation is restricted to a single Chinese multi-intent dataset (MAC-SLU) in the automotive domain, leaving cross-lingual and broader domain generalizability unverified.

## Why read this

Speech and NLP engineers working on zero-shot multi-intent spoken language understanding will learn how to build robust structural self-consistency wrappers for LLMs and LALMs without fine-tuning, leveraging Hybrid Jaccard similarity and support-based frame aggregation.

## Code

- https://github.com/boyan1001/SFL-MTSC

## Applications

Smart home voice assistants, in-vehicle infotainment control systems, and task-oriented dialogue agents requiring robust multi-intent semantic extraction from speech or text.

## Institutions / 機構

National Taiwan Normal University

**Funding / 經費:** Realtek Semiconductor Corporation

## Related

- (link related pages by id as the wiki grows)
