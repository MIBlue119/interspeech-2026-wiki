---
id: husain26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-786
---

# Beyond WER: Entity and Disfluency Recall in Accented Conversational ASR

**TL;DR** — A three-stage ASR pipeline for accented English (India, Indonesia, Latin America) that greatly improves recognition of named entities and filled pauses, metrics WER misses, while matching a much larger zero-shot model.

## Problem

ASR systems optimized for word error rate often miss named entities and filled pauses in accented conversational English, both critical for language-learning feedback.

## Method

Curates entity-rich training data via heuristic SQL filters, fine-tunes regional LoRA adapters on Qwen2.5-Omni-3B to output both verbatim and corrected transcripts in a single forward pass, and validates errors with a six-category taxonomy checked by an LLM judge.

## Results

Entity recall rises from 53-55% to 80-85% and filler recall from under 5% to 76-86%, at 6-10% WER, beating Whisper and a commercial ASR on entity recall and matching a zero-shot 30B model with 10x fewer parameters; bootstrap tests attribute 2.8-4.2pp of the entity-recall gain to data curation alone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Language-learning feedback tools and accented-speech ASR systems that need entity- and disfluency-aware transcripts, not just low WER.

## Related

- (link related pages by id as the wiki grows)
