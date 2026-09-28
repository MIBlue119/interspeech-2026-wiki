---
id: havare26_interspeech
category: speech-recognition
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/havare26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/havare26_interspeech.pdf
---

# CodeVaani: A Multilingual, Voice-Based Code Learning Assistant

*Jayant Havare, Srikanth Tamilselvam, Ashish Mittal, Shalaka Thorat, Soham Jadia, Varsha Apte, Ganesh Ramakrishnan*

[PDF](https://www.isca-archive.org/interspeech_2026/havare26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/havare26_interspeech.html)

**TL;DR** — CodeVaani is a multilingual, voice-enabled programming assistant integrated into an LMS that helps non-English proficient students explore coding concepts via native speech, achieving a WER of 8.1% on Gujarati queries.

## Key contributions

- Built a complete end-to-end voice-based coding assistant architecture combining ASR, code-aware transcription refinement, and LLM code generation.
- Introduced a code-aware transcription refinement stage using instruction-tuned Gemma-27B optimized via DFP to fix phonetic errors in technical/symbolic terms.
- Evaluated the framework on a real-world dataset of 500 human-spoken queries across multiple Indian languages.
- Demonstrated significant performance gains over existing models like Saaras V3, Whisper, and Phi-4-multimodal on code-mixed speech.

## Problem

Programming education predominantly assumes English proficiency and text-based input, creating massive entry barriers for students in multilingual regions like India who transition from regional schooling to English-medium CS curricula. Survey results confirm that over 40% of regional programmers lack English proficiency while preferring voice interfaces. Standard ASR systems fail on these queries because spoken programming inputs are heavily code-mixed, syntactically irregular, and full of out-of-vocabulary technical terms. These residual ASR errors propagate into downstream LLMs, severely degrading response quality and rendering standard text-centric tools inaccessible.

## Method

CodeVaani processes user interactions through three sequential phases: ASR, transcription refinement, and query response generation. Audio is first transcribed using Whisper for English and Indic-Conformer for Indic languages to preserve mixed-language semantics better than standalone models.

Because raw ASR frequently botches variable names, operators, and keywords (e.g., transcribing 'ask key' as 'ASCII'), the system passes raw transcripts to a code-aware transcription refinement stage driven by Gemma-27B. This model is fine-tuned with Direct Preference Optimization to specifically map phonetically distorted technical terms back to valid code constructs and symbols.

Finally, the cleaned transcript is fed into Codestral-22B, which handles tasks ranging from code explanation to debugging in the user's native language. The infrastructure relies on a ReactJS frontend, Django backend, PostgreSQL database, and Celery workers, deployed on a dedicated server with 2 H100 GPUs dividing the compute workload between ASR/refinement and generation.

## Experimental setup

Evaluated using a user study of 28 beginner programmers and a benchmark set of 500 human-spoken code queries (100 per language across Gujarati, Bengali, Marathi, Hindi, and English). Baselines include Saaras V3 (SarvamAI), Whisper, Qwen3-Omni-Flash, and Phi-4-multimodal-instruct. Evaluation metrics consist of Word Error Rate (WER), Phoneme Error Rate (PER), and Weighted Feature Edit Distance (WFED).

## Results

CodeVaani achieves a Gujarati WER of 8.1% compared to 45.3% for Saaras V3, and a Bengali WER of 23.5% versus 43.3% for Saaras V3. Against global multimodal models on human-spoken queries, CodeVaani records an 8.1% WER, 3.4% PER, and 2.0% WFED, outperforming Phi-4 (9.2% WER) and Qwen3-Omni-Flash (11.61% WER), though Phi-4's evaluation was restricted to English due to a lack of Indic language support.

| System | WER ↓ | PER ↓ | WFED ↓ |
|---|---|---|---|
| Whisper | 28.19% | 15.9% | 6.7% |
| Qwen3-Omni-Flash | 11.61% | 3.52% | 2.05% |
| Phi-4 | 9.2% | 4.1% | 2.1% |
| CodeVaani (Ours) | 8.1% | 3.4% | 2.0% |

## Limitations

The evaluation relies on a relatively small user study of 28 beginner programmers and 500 total queries, restricting robust statistical validation across a broader demographic. The system currently supports a limited set of Indian languages and requires heavy computational resources (two H100 GPUs) that limit on-device or low-latency deployment. Furthermore, the architecture lacks multi-turn conversational capabilities, treating inputs as isolated single-shot queries.

## Why read this

Researchers and developers building vertical speech-to-text-to-intent pipelines for low-resource or code-mixed technical domains should read this paper to see how intermediate LLM-based preference-tuned error correction rescues downstream LLM performance.

## Code

- https://tinyurl.com/icse2026-artifacts

## Applications

Voice-activated educational coding assistants, multilingual programming learning management systems, and accessible software engineering tools for non-native English speakers.

## Related

- (link related pages by id as the wiki grows)
