---
id: arumugam26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/arumugam26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/arumugam26_interspeech.pdf
---

# A Human-in-the-Loop Multi-Agent Companion for Real-Time Entity Extraction and SLU-Driven ASR Error Correction

[PDF](https://www.isca-archive.org/interspeech_2026/arumugam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arumugam26_interspeech.html)

**TL;DR** — MACE is a closed-loop multi-agent architecture that recycles live contact-center agent UI corrections into ASR biasing hints and post-ASR substitution rules, achieving a 17.1% relative reduction in named-entity word error rate.

## Problem

Contact-center speech processing frequently mishandles tail-frequency named entities like product SKUs, proper nouns, and customer identifiers, which causes downstream errors in CRM entries. Although human agents frequently correct these mistakes in live companion interfaces, this supervision signal is rarely fed back into the transcription pipeline. Consequently, streaming ASR engines repeatedly fail on the same domain-specific terminology without leveraging past corrections.

## Method

The system employs a multi-agent loop running off the audio path consisting of a streaming ASR engine, a post-ASR word-correction stage, an extraction sub-agent, and a reflection sub-agent. Human UI edits generate delta sets that are automatically translated into either dynamic ASR biasing entries or, if observed recurrently across at least two dialogues, post-ASR substitution rules. The architecture relies on Whisper-large-v3, keeps biasing lists capped at 500 entries and substitution rules at 200, and isolates data per tenant to prevent cross-contamination.

## Results

Evaluated on the English ContextASR-Dialogue split of ContextASR-Bench containing 5,273 multi-speaker dialogues, MACE Adaptive reduces named-entity word error rate (NE-WER) to 0.147 and EditRate to 0.247 using a T4 GPU. This represents a 17.1% decrease in NE-WER and an 18.6% decrease in EditRate compared to a baseline with no biasing, successfully closing over 22% of the performance gap to an oracle with a priori knowledge of entity lists. Both feedback channels saturate stably within 28 batches.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Contact-center voice software developers and speech engineering teams building real-time agent assist tools and automated CRM logging systems.

## Limitations

The approach assumes the availability of a companion UI where human agents actively correct named entities, and relies on deterministic surrogate extractors or LLMs to capture alignment deltas.

## Related

- (link related pages by id as the wiki grows)
