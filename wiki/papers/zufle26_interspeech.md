---
id: zufle26_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-685
pdf: https://www.isca-archive.org/interspeech_2026/zufle26_interspeech.pdf
---

# Do What I Say: A Spoken Prompt Dataset for Instruction-Following

[PDF](https://www.isca-archive.org/interspeech_2026/zufle26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zufle26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-685)

**TL;DR** — The paper introduces DoWhatISay (DOWIS), a multilingual spoken prompt dataset containing parallel text and human-recorded audio instructions across 9 tasks and 11 languages, revealing that text prompts often overestimate speech LLM capabilities compared to spoken prompts.

## Problem

Current speech large language model instruction-following benchmarks rely primarily on text prompts or synthetic text-to-speech instructions, failing to evaluate models in realistic, natural spoken interaction scenarios. Furthermore, existing spoken benchmarks are restricted to English or Chinese, are tightly coupled to specific inputs rather than being reusable, and ignore cross-lingual or specialized speech-to-text tasks.

## Method

The authors created DOWIS by collecting 10 prompt variants per task-language pair across 5 styles (basic, detailed, short, formal, and informal) for 9 speech and language tasks (ASR, TTS, ST, MT, S2ST, SSUM, TSUM, ACHAP, SQA) across 11 languages (de, en, it, cs, es, fr, hu, nl, pt, ru, sv). 19 native speakers recorded the 90 prompts per language via phones or laptops to emulate real-world meeting setups, resulting in 3 hours and 17 minutes of audio with silence trimmed via loudness-based VAD (-40 dBFS threshold with 500 ms padding). State-of-the-art SLLMs, specifically Qwen2.5-Omni (7B) and Phi-4 Multimodal Instruct, are evaluated on these prompts combined with datasets like FLEURS, MCIF, and YTSeg using batch size 1 on an NVIDIA A100 GPU.

## Results

Evaluating Qwen2.5-Omni and Phi-4 across tasks shows that text prompts consistently outperform spoken prompts for tasks with text output, especially in low-resource and cross-lingual settings, where Phi-4 experienced severe failures on spoken ASR (WER exceeding 100). Conversely, for tasks with speech output like TTS and S2ST, spoken prompts perform on par with or better than text prompts (e.g., Qwen S2ST CometKiwi scores around 72.1). Informal prompt styles consistently perform worse across tasks, and models exhibited minor, inconsistent performance variations when using male versus female prompt speakers.

## Code

- https://github.com/MaikeZuefle/DOWIS

## Applications

Speech and ML engineers evaluating speech large language models, voice assistants, and spoken dialogue systems under realistic human instruction-following conditions.

## Limitations

Audio prompt generation is restricted to 11 languages, and speech-output model evaluations were limited to English generation due to model constraints.

## Related

- (link related pages by id as the wiki grows)
