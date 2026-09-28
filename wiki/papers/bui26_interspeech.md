---
id: bui26_interspeech
category: code-switching
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3390
pdf: https://www.isca-archive.org/interspeech_2026/bui26_interspeech.pdf
---

# CSER: Semantic Evaluation of LLM Auto-Repair for Code-Switching ASR

*Tien Dat Bui, Duy Le-Tuan Nguyen, Nhat Minh Le, Van Hai Do*

[PDF](https://www.isca-archive.org/interspeech_2026/bui26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bui26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3390)

**TL;DR** — The paper introduces Code-Switching Semantic Error Rate (CSER), an end-to-end evaluation metric and framework designed to quantify whether ASR errors in code-switched speech disrupt downstream LLM intent preservation. Experiments across commercial and in-house models demonstrate that traditional lexical metrics (WER, CER, PIER) severely overpenalize phonetic transliterations that downstream pipelines easily recover.

## Key contributions

- Proposes Code-Switching Semantic Error Rate (CSER), a semantic-aware metric combining LLM-based ASR repair, question generation, and answer discrimination.
- Establishes a multi-condition Vietnamese-English code-switching benchmark comprising over 2,500 human utterances and nearly 200,000 synthetic utterances.
- Demonstrates the 'phonetic-semantic paradox' where phonetic training strategies yield high lexical/PIER error rates while maintaining near-identical semantic intent preservation (CSER).
- Provides empirical analysis showing commercial and in-house systems diverge significantly when evaluated on intent-bearing tokens versus surface-level string matching.

## Problem

Code-switching (CS) poses major challenges for ASR, but traditional evaluation relies on string-matching lexical metrics like WER, CER, MER, and PIER. These metrics treat all tokens uniformly, failing to capture semantic equivalence or penalizing homophonic variants and phonetic transliterations that downstream LLM-powered NLU modules can naturally repair. Consequently, optimizing for traditional lexical metrics misaligns with real-world voice assistant performance, where the primary objective is end-user intent recovery rather than verbatim transcription.

## Method

The CSER framework operates as a four-stage pipeline. In Stage 1 (Normalization & Repair), an LLM transforms ASR hypotheses into normalized text under explicit constraints: code-switching repair (mapping OOV English phonetic approximations back to standard forms via map(w)), structural preservation, language-agnostic lowercasing/punctuation-stripping, and a strict hallucination-free constraint preventing the introduction of ungrounded information. In Stage 2 (Targeted Question Generation), an LLM generator decomposes the reference transcript into a set of factoid questions focusing on semantic entities and code-switched boundaries while avoiding redundancies. In Stages 3 and 4 (Answer Extraction & CSER Computation), an extraction model retrieves answers for both reference and normalized hypothesis questions, and an LLM discriminator yields a binary success score per question, aggregating into the final expectation of failure (CSER) ranging from 0 to 1.

The experimental evaluation utilizes in-house Conformer-CTC (77M parameters) models trained under three regimes: monolingual Vietnamese (VN), phonetically transliterated English-Vietnamese (VN-EN Phonetic), and standard orthography English-Vietnamese (VN-EN). The data pipeline combines YouTube-derived seed entities expanded via GPT-4o into natural conversational prompts, followed by dual recording paths: zero-shot TTS synthesis and human recordings across 20 speakers. Semantic probing stages utilize Gemini 2.0 Flash to avoid generator-evaluator familiarity bias.

## Experimental setup

Evaluations use four distinct test sets: Set 1 (intra-sentential human, 2,549 utterances, 3.1 hours), Set 2 (inter-sentential human, 2,315 utterances, 2.5 hours), Set 3 (diverse TTS, 97,549 utterances, 101.0 hours), and Set 4 (media domain TTS, 99,994 utterances, 107.0 hours), alongside a 794K utterance (1,274 hour) training corpus. Baselines include commercial engines (Microsoft Azure Speech, Google v1 Streaming, Google Chirp 3 Streaming, Google Chirp 3) and in-house Conformer-CTC (77M) models. Metrics reported are WER, CER, PIER, and CSER in percentages (lower is better).

## Results

On Set 4, the VN-EN Phonetic model yields a PIER of 58.65—more than double the VN-EN model's 24.72—yet achieves a comparable CSER (12.16 vs 10.08), demonstrating that downstream NLU modules successfully handle phonetic transliterations like 'phay buc' for 'Facebook'. Among commercial engines, Google Chirp 3 achieves the lowest CSER across all sets (10.47 on Set 1, 9.14 on Set 2, 22.03 on Set 3, and 23.52 on Set 4). Conversely, Google v1 Streaming displays a high CSER of 51.33 on Set 4 despite competitive WER, indicating its errors concentrate heavily on intent-bearing tokens.

| System / Condition | WER (%) | CER (%) | PIER (%) | CSER (%) |
|---|---|---|---|---|
| Microsoft Azure Speech (Set 1) | 25.88 | 15.82 | 61.88 | 41.23 |
| Google Chirp 3 (Set 1) | 10.46 | 5.64 | 27.24 | 10.47 |
| Conformer-CTC VN (Set 1) | 13.28 | 8.42 | 35.75 | 12.34 |
| Conformer-CTC VN-EN Phonetic (Set 1) | 9.45 | 6.63 | 29.72 | 11.07 |
| Conformer-CTC VN-EN (Set 1) | 9.53 | 6.26 | 24.16 | 10.42 |

## Limitations

The framework relies on LLM calls (Gemini 2.0 Flash) for question generation, answer extraction, and discrimination, introducing significantly higher inference overhead and computational latency compared to string-matching metrics like WER. The current dataset scope is restricted to Vietnamese-English code-switching, requiring further validation across broader multilingual pairings. Additionally, the metrics depend on the reasoning capabilities of the judge LLM, which could drift or exhibit subtle biases despite cross-model decoupling.

## Why read this

Speech and ML engineers building ASR-LLM spoken language pipelines should read this to understand why traditional lexical metrics like WER and PIER fail to evaluate code-switched intent preservation. It offers a concrete framework and benchmark to measure true downstream task success rather than penalizing functional phonetic variations.

## Code

- https://github.com/vincentbui-ai/CSER-Benchmark/

## Applications

Evaluating code-switching speech recognition and voice assistant pipelines where ASR outputs feed into downstream LLM NLU modules for intent execution.

## Related

- (link related pages by id as the wiki grows)
