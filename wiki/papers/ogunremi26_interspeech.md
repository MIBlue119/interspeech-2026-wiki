---
id: ogunremi26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2584
pdf: https://www.isca-archive.org/interspeech_2026/ogunremi26_interspeech.pdf
---

# Turning Speech Language Models into Multilingual Listeners

[PDF](https://www.isca-archive.org/interspeech_2026/ogunremi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ogunremi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2584)

**TL;DR** — The authors introduce MULTISPEECHQA, a 9200-hour synthetic multilingual spoken question-answering dataset spanning 23 languages, and use it to finetune Qwen2.5-Omni to achieve state-of-the-art open-weight performance on their new evaluation benchmark.

## Problem

State-of-the-art Speech Language Models (SLMs) are predominantly restricted to English and a handful of high-resource languages due to a severe shortage of multilingual instruction-tuning data. Existing evaluation benchmarks for SLMs also lack broad language coverage, restricting complex tasks like generative instruction following to English. This language disparity prevents millions of global speakers from accessing modern speech-language technologies.

## Method

The authors build MULTISPEECHQA by taking 470k English instruction-completion pairs from the Voice Assistant 400K dataset, translating them into 22 additional languages using Seamless M4T v2 Large and Aya Expanse 8B, and synthesizing speech via XTTS (for 15 languages, utilizing 37 distinct LibriVox voice-cloned speakers) and MMS TTS/Seamless for the remainder, totaling 10.8 million pairs across 9200 hours. They establish MULTISPEECH-BENCH, a multitask test suite combining a human-verified subset of these SQA pairs (200 per language, with translations heavily edited by native speakers) alongside CommonVoice ASR and CoVoST-2 AST data. Finally, they finetune Qwen2.5-Omni on MULTISPEECHQA and evaluate it using LLM-as-a-judge (CommandA and GPT-4o) against cascading ASR+LLM pipelines and other open/closed models.

## Results

Evaluated across 23 languages on MULTISPEECH-BENCH, finetuning Qwen2.5-Omni on MULTISPEECHQA improves its performance significantly, achieving a 60% win-rate over the base Qwen2.5-Omni and outfitting it with state-of-the-art capabilities among open-weight models. A cascading baseline (Whisper Large v3 plus Aya Expanse 8B) outperforms open-weight SLMs on average but falls short of top closed models. Human evaluations of the synthetic data reveal average content-understanding scores of 4.1 out of 5 and naturalness scores of 3.0 out of 5, with XTTS outperforming MMS TTS and SeamlessM4T. Furthermore, human audits of the benchmark translations required corrections in 72% of instances, ranging from 43% for Turkish to 86% for Chinese.

## Code

- https://multispeech.github.io

## Applications

Speech and ML engineers developing multilingual voice assistants, conversational agents, and zero-shot speech processing systems will use these resources to expand SLM language support.

## Limitations

Text-to-speech naturalness scores lag significantly behind content understanding scores, indicating that downstream speech generation quality remains a bottleneck for synthetic training data.

## Related

- (link related pages by id as the wiki grows)
