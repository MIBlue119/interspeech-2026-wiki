---
id: zufle26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-685
---

# Do What I Say: A Spoken Prompt Dataset for Instruction-Following

**TL;DR** — A new multilingual spoken-prompt dataset reveals that speech LLMs consistently perform worse with spoken instructions than with text ones, especially for low-resource and cross-lingual tasks.

## Problem

Speech LLMs (SLLMs) are typically evaluated using text prompts, which may not reflect real-world scenarios where users actually interact by speaking, leaving a gap in realistic spoken-instruction evaluation.

## Method

The authors introduce DoWhatISay (DOWIS), a multilingual dataset of human-recorded spoken and written prompts designed to pair with any existing benchmark, spanning 9 tasks and 11 languages with 10 prompt variants per task-language pair across five styles, and use it to benchmark state-of-the-art SLLMs across prompt modality, style, language, and task type.

## Results

Text prompts consistently outperform spoken prompts, particularly for low-resource and cross-lingual settings; spoken prompts only close the gap for tasks that themselves produce speech output, highlighting a need for more speech-based prompting evaluation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More realistic benchmarking of speech LLMs under actual spoken-instruction usage conditions, informing which tasks/languages need better spoken-prompt robustness.

## Related

- (link related pages by id as the wiki grows)
