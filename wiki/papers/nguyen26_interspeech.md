---
id: nguyen26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-110
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26_interspeech.pdf
---

# Direct Preference Optimization for English-Mandarin Code-Switching Speech Recognition in Audio LLMs

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-110)

**TL;DR** — This paper applies Direct Preference Optimization (DPO) to align audio large language models for English-Mandarin code-switching speech recognition, reducing Mixed Error Rates (MER) by up to 89.6% in-distribution and 20.0% out-of-distribution.

## Problem

Despite possessing general multilingual capabilities, modern Audio LLMs fail systematically when tasked with transcribing code-switching speech. The paper identifies three main failure modes: language omission, translation-instead-of-transcription, and hallucination. These errors limit the utility of speech foundation models in bilingual and multilingual regions where code-switching is standard.

## Method

The authors construct a preference dataset of approximately 100K pairs (~567 hours) using natural speech from CS-Dialogue and synthetic concatenations from EMILIA. Ground-truth code-switching transcripts serve as chosen responses, while dispreferred responses are synthetically generated using Qwen3-32B via two translation strategies: 80% global translation and 20% partial span translation. They train three Audio LLM architectures—MERaLiON-2-3B (full fine-tuning), Phi-4-multimodal-instruct (full fine-tuning), and Qwen2-Audio-7B-Instruct (LoRA rank 256)—for one epoch using vanilla DPO across 20 English and Chinese prompt variations.

## Results

Evaluated on SEAME dev man, SEAME dev sge, EMILIA-test, and CS-Dialogue-test using Mixed Error Rate (MER). MERaLiON-2-3B achieves an 11.1% relative MER reduction on in-distribution CS-Dialogue. Phi-4-multimodal-instruct drops MER from 70.98% to 7.38% on EMILIA (an 89.6% relative reduction). Qwen2-Audio-7B-Instruct achieves a 20.0% relative MER reduction on out-of-distribution SEAME dev man.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building multilingual voice assistants, transcription tools, or spoken dialogue systems for bilingual populations.

## Limitations

The study focuses exclusively on English-Mandarin code-switching, relies on synthetic rejected samples rather than live model generations, and uses vanilla DPO without advanced algorithmic modifications.

## Related

- (link related pages by id as the wiki grows)
