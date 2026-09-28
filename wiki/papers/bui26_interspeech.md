---
id: bui26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3390
pdf: https://www.isca-archive.org/interspeech_2026/bui26_interspeech.pdf
---

# CSER: Semantic Evaluation of LLM Auto-Repair for Code-Switching ASR

[PDF](https://www.isca-archive.org/interspeech_2026/bui26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bui26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3390)

**TL;DR** — The paper introduces Code-Switching Semantic Error Rate (CSER), a new evaluation metric for ASR-LLM pipelines that measures semantic intent preservation rather than surface-level transcription accuracy.

## Problem

Traditional lexical metrics like WER, CER, and PIER rely on string-matching paradigms and fail to capture whether downstream LLMs can recover user intent from code-switched ASR errors. Because voice assistants depend on NLU modules to interpret imperfect transcripts, standard metrics penalize phonetic transliterations and homophones that are actually semantically equivalent and harmless to task success.

## Method

The CSER framework uses a four-stage pipeline: (1) LLM-based ASR repair and normalization with code-switching, structural, normalization, and hallucination-free constraints; (2) targeted question generation using an LLM to produce factoid questions focusing on code-switched entities and predicate-argument structures; (3) answer extraction via an extractor model; and (4) semantic equivalence discrimination yielding a failure-rate expectation score. The authors construct a diverse Vietnamese-English code-switching benchmark utilizing a hybrid dataset of human recordings (20 speakers, ~5.4 hours) and zero-shot TTS synthesis (~207 hours) across 4 test sets. In-house experiments leverage a Conformer-CTC (77M) model evaluated under monolingual, phonetic-transliteration, and bilingual code-switching regimes.

## Results

Evaluated across four test sets using Microsoft Azure, Google v1 Streaming, Google Chirp 3, and in-house Conformer-CTC models, results demonstrate a phonetic-semantic paradox where models with high lexical error rates (such as PIER of 58.65 for VN-EN Phonetic on Set 4) achieve strong semantic intent preservation with low CSER (12.16). On Set 1, the in-house Conformer-CTC (VN-EN) achieves a competitive CSER of 10.42 and WER of 9.53, matching commercial state-of-the-art engines like Google Chirp 3 (CSER 10.47, WER 10.46). Experiments prove that lexical and semantic metrics provide essential, complementary insights for speech pipelines.

## Code

- https://github.com/vincentbui-ai/CSER-Benchmark/

## Applications

Engineers and developers building multilingual voice assistants and task-oriented dialogue systems can use this framework to accurately evaluate downstream intent preservation under code-switching conditions.

## Related

- (link related pages by id as the wiki grows)
