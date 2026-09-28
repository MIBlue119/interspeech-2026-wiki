---
id: yang26c_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-530
pdf: https://www.isca-archive.org/interspeech_2026/yang26c_interspeech.pdf
---

# MUGEN: Evaluating and Improving Multi-audio Understanding of Large Audio-Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/yang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-530)

**TL;DR** — MUGEN is a comprehensive benchmark assessing multi-audio understanding in large audio-language models across 35 tasks, revealing severe input scaling bottlenecks and consistent non-semantic weaknesses that can be partially mitigated via audio-permutational self-consistency.

## Problem

Current large audio-language model evaluations are heavily restricted to isolated, single-audio environments, ignoring real-world requirements like multi-speaker analytics, speech RAG, and audio-based in-context learning. Existing multi-audio benchmarks typically feature narrow attribute coverage and tiny input scales, often bypassing acoustic reasoning through semantic shortcuts. Without rigorous multi-audio benchmarks, models' capabilities to jointly compare, aggregate, and reconcile information across multiple concurrent audio streams remain entirely unquantified.

## Method

The authors introduce MUGEN, comprising 35 audio-grounding tasks across 7 dimensions (spanning speech, general audio, and music) with a total of 1750 test instances and 9,250 audio clips. Each task uses an audio-as-option design where models choose from five audio candidates matching a textual constraint, with 10 tasks incorporating a reference audio. The benchmark uses natural audio from public corpora augmented with targeted synthetic generation for fine-grained attribute control. To address performance bottlenecks, the study evaluates training-free techniques including Chain-of-Thought prompting, standard Self-Consistency, and Audio-Permutational Self-Consistency (APSC), which randomizes candidate order before majority voting aggregation.

## Results

Evaluating seven advanced LALMs (including DeSTA2.5-Audio, Qwen2.5-Omni-7B, Audio Flamingo 3, Voxtral models, Phi-4-Multimodal, and Gemini-3-pro) and a Whisper-large-v3 plus Gemini cascade baseline against Claude Haiku 4.5-based LLM-as-a-judge (99% human agreement), open-source LALMs perform comparably to cascaded pipelines and drop significantly on non-semantic dimensions. Accuracy plummets consistently as the number of audio candidates scales from two to five, with Qwen2.5-Omni retaining only 48% to 66% of its two-audio accuracy. Combining Audio-Permutational Self-Consistency with Chain-of-Thought yields up to 6.74% accuracy gains on Gemini-3-pro.

## Code

- https://github.com/danielqwer/MUGEN

## Applications

Speech and ML engineers building voice agents, speech retrieval-augmented generation systems, and multi-speaker analytics tools can use MUGEN to benchmark and improve their models' multi-audio reasoning capabilities.

## Limitations

Ranking-based tasks had to be excluded from input scaling experiments because reducing the candidate set invalidates instructions like finding the third longest audio.

## Related

- (link related pages by id as the wiki grows)
