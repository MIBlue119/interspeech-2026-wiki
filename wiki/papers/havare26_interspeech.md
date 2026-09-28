---
id: havare26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/havare26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/havare26_interspeech.pdf
---

# CodeVaani: A Multilingual, Voice-Based Code Learning Assistant

[PDF](https://www.isca-archive.org/interspeech_2026/havare26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/havare26_interspeech.html)

**TL;DR** — CodeVaani is a multilingual, voice-enabled programming assistant that integrates ASR, code-aware LLM transcription refinement, and code generation, achieving a Word Error Rate as low as 8.1% on code-mixed human-speech queries.

## Problem

Programming education predominantly assumes English proficiency and text-based interaction, creating significant barriers for students in multilingual regions like India who transition from regional language schooling to English CS curricula. Spoken programming queries are typically code-mixed, syntactically irregular, and rich in out-of-vocabulary technical terms, which standard ASR systems frequently misinterpret and degrade downstream LLM performance.

## Method

CodeVaani features a three-stage pipeline consisting of speech recognition using Whisper for English and Indic-Conformer for Indic languages, a code-aware transcription refinement stage using instruction-tuned Gemma-27B optimized with Direct Preference Optimization to fix phonetic errors and technical keywords, and query response generation using Codestral-22B. The system architecture utilizes a ReactJS frontend, Django backend, PostgreSQL database, and Celery task queues running on a dedicated server with two H100 GPUs. The setup processes audio queries asynchronously and delivers both corrected transcripts and textual/audio responses.

## Results

In a lab evaluation with 28 beginner programmers across major Indian languages and 500 total spoken queries, CodeVaani achieved an 8.1% Word Error Rate (WER), 3.4% Phoneme Error Rate (PER), and 2.0% Weighted Feature Edit Distance (WFED), outperforming baseline models like Saaras V3 (which recorded a 24.6% to 70.5% WER across languages) and multimodal systems like Phi-4 and Qwen3-Omni-Flash. Over 89% of participants rated their usability experience as fair or above, and 25 out of 26 respondents indicated strong adoption intent.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Educational institutions and software training platforms seeking to provide inclusive, multilingual, voice-driven programming assistance to students with limited English proficiency.

## Limitations

Currently supports single-turn interactions, with multi-turn conversations and lower-latency unified ASR-generation models left for future work.

## Related

- (link related pages by id as the wiki grows)
