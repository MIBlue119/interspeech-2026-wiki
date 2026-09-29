---
id: ashikawa26_interspeech
category: asr
institutions: ["Toshiba"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-363
pdf: https://www.isca-archive.org/interspeech_2026/ashikawa26_interspeech.pdf
---

# Audio-KWS-Gated Error Memory Retrieval for Incremental ASR Post-Correction

*Taira Ashikawa, Daichi Hayakawa, Takehiko Kagoshima, Tomoki Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/ashikawa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ashikawa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-363)

**Category:** `asr`

**TL;DR** — The paper introduces an incremental ASR post-correction framework using open-vocabulary Audio-KWS-gated retrieval to fetch utterance-relevant historical error correction records, achieving ~70% prompt length reduction while improving WER, CER, and Bias-F1.

## Key contributions

- Proposes an incremental LLM-based ASR post-correction framework that scales past LLM context window limits by gating correction memory retrieval using Audio-KWS.
- Derives a dynamically expanding keyword inventory from LLM error analyses, indexing canonical forms, misrecognized variants, and phonetic readings (for Japanese).
- Demonstrates on Earnings-21 (English) and CSJ (Japanese) that ~70% prompt reduction is achievable while preserving or boosting transcription accuracy and rare/domain-specific bias-word recovery.

## Problem

End-to-end ASR systems struggle with rare and domain-specific terms (named entities, technical jargon) that emerge continuously in dynamic fields like finance and news. While LLM-based second-pass post-correction and cumulative "error memory" logs can fix recurring errors without retraining, full-history prompting quickly hits LLM context window limits. Furthermore, text-driven retrieval of correction history fails when the trigger term itself is misrecognized by the ASR system, highlighting the need for audio-grounded retrieval cues.

## Method

The pipeline operates incrementally across speech segments. When a human reference transcript becomes available, an LLM performs token-granularity alignment with the ASR hypothesis to extract span-level phrase pairs (hyp span ↔ ref phrase) along with error tags and edit cues. These are stored in an error memory H and indexed via an inverted index I into a dynamically expanding keyword inventory V. For Japanese, LLM-estimated phonetic readings are indexed as keywords to bypass kanji-surface mismatch issues during audio matching, while corrections apply to surface strings.

During inference, open-vocabulary Audio-KWS (AdaKWS, powered by a frozen Whisper-medium encoder and lightweight classification/conditioning modules) scores the audio against V. Keywords exceeding confidence threshold tau = 10^-4 are filtered, and the Top-N keywords are selected to retrieve associated error memory records H~t. To fit the LLM context window, retrieved records are capped at a maximum of M = 200 records by recency. The filtered memory subset alongside the ASR hypothesis hypt is fed into an LLM (openai/gpt-oss-20b) using deterministic decoding (temperature = 0.0, max completion tokens = 27000) under strict constraints to perform record-guided, conservative edits minimizing paraphrasing or deletion.

## Experimental setup

Evaluated on English Earnings-21 (earnings-call transcripts, ASR hypotheses from released dataset) and Japanese CSJ (lecture spontaneous speech, hypotheses generated via Whisper-large-v3). Evaluated on bias-word subsets comprising 417 English and 442 Japanese utterances containing frequent troublesome proper nouns/technical terms. Baselines include a standard ASR output and a capped recent-history baseline without KWS (w/o KWS) limited to M = 200 records. Metrics include WER (English), CER (Japanese), micro-averaged Bias-F1, Precision, Recall, and prompt-length reduction (micro and macro percentages based on character counts). AdaKWS was trained on VoxPopuli (English) and CSJ train sets.

## Results

On Earnings-21, Top-20 retrieval achieves 70.9% micro prompt reduction while improving WER from 29.06 to 28.92 and Bias-F1 from 0.836 to 0.856 compared to the w/o KWS baseline. Top-30 achieves the absolute best English WER (28.82) and Bias-F1 (0.875) with a 66.3% micro prompt reduction. On CSJ, Top-10 yields a 71.7% micro prompt reduction while improving CER from 14.86 to 14.62 and Bias-F1 from 0.648 to 0.673; Top-30 achieves the best Japanese CER (13.98) and Bias-F1 (0.728) with a 64.1% micro prompt reduction. Highly aggressive filtering (Top-1) heavily degrades WER/CER and bias recovery due to missed context.

| System | English WER | English Bias-F1 | Japanese CER | Japanese Bias-F1 | Prompt Red. (mic) |
|---|---|---|---|---|---|
| ASR (no post-correction) | 31.24 | 0.435 | 16.02 | 0.548 | — |
| w/o KWS (baseline) | 29.06 | 0.836 | 14.86 | 0.648 | — |
| w/ KWS Top-1 | 30.40 | 0.642 | 15.62 | 0.599 | 93.2% |
| w/ KWS Top-10 | 29.15 | 0.861 | 14.62 | 0.673 | 71.7% |
| w/ KWS Top-20 | 28.92 | 0.856 | 14.09 | 0.711 | 70.9% |
| w/ KWS Top-30 | 28.82 | 0.875 | 13.98 | 0.728 | 66.3% |

## Limitations

The framework relies on the availability of human-corrected reference transcripts to asynchronously update the error memory and keyword inventory. Performance depends heavily on Audio-KWS recall; false negatives in KWS lead to missing historical correction context. The evaluation is limited to English and Japanese datasets, and end-to-end inference latency is constrained by the compute overhead of separate error analysis, KWS scanning, and LLM generation steps.

## Why read this

Researchers and engineers building production-scale streaming ASR or post-correction systems should read this to see how audio-grounded retrieval effectively circumvents LLM context window bottlenecks and overcomes the text-retrieval brittleness of corrupted ASR hypotheses.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Streaming and batch conversational transcription, financial earnings call indexing, contact-center transcription post-processing, and domain-specific terminology correction.

## Institutions / 機構

Toshiba

## Related

- (link related pages by id as the wiki grows)
