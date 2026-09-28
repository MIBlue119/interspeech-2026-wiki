---
id: guo26e_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3146
pdf: https://www.isca-archive.org/interspeech_2026/guo26e_interspeech.pdf
---

# DEBATE: A Dataset for Disentangling Textual Ambiguity in Mandarin Through Speech

[PDF](https://www.isca-archive.org/interspeech_2026/guo26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guo26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3146)

**TL;DR** — The paper introduces DEBATE, a Chinese speech-text dataset for Disambiguation Through Speech (DTS), demonstrating that current large speech-language models struggle to resolve textual ambiguity using acoustic cues compared to humans.

## Problem

While extensive research has addressed textual and visual disambiguation, disambiguation through speech remains underexplored largely due to a lack of suitable corpora. Mandarin Chinese heavily relies on semantic context and lacks morphological inflections, making written text prone to structural, lexical, and focus ambiguities that are naturally resolved in speech via pronunciation, pauses, and stress. The absence of speech-text benchmarks specifically targeting these phenomena hinders the evaluation and development of spoken language understanding models.

## Method

The DEBATE dataset was constructed via a three-stage pipeline combining raw text gathering from open corpora, social media, and civil service exams, LLM generation with human verification, and manual annotation of disambiguation strategies. It targets three specific tasks: polyphonic character ambiguity with pronunciation annotations, structural ambiguity marked by prosodic boundary slashes, and focus ambiguity annotated with stress markers. Ten native speakers (balanced by age and gender) recorded 10,010 utterances totaling 9.66 hours using personal microphones under a two-person monitoring setup. Audio quality was validated via manual checks and ASR transcription consistency using SenseVoice-small.

## Results

The dataset contains 10,010 samples across three categories: 2,000 for pronunciation, 4,010 for prosodic pausing, and 4,000 for stress and intonation. Three zero-shot large speech-language models—Qwen2-Audio, Qwen2.5-Omni, and Gemini 2.0 Flash—were benchmarked using a multiple-choice intent selection format across these tasks. Qwen2.5-Omni achieved the highest accuracy of 68.08% on prosodic pausing, while overall performance revealed a substantial gap relative to human intent understanding. ASR character error rates on the corpus were low at 4.75%, 2.82%, and 1.94% for the respective tasks, confirming high audio-text alignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers evaluating or training large speech-language models, conversational agents, and spoken language understanding systems on acoustic disambiguation.

## Limitations

The dataset is currently restricted to Mandarin Chinese and focuses on three specific categories of speech-based ambiguity.

## Related

- (link related pages by id as the wiki grows)
