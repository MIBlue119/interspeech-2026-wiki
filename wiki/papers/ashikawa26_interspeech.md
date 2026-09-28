---
id: ashikawa26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-363
pdf: https://www.isca-archive.org/interspeech_2026/ashikawa26_interspeech.pdf
---

# Audio-KWS-Gated Error Memory Retrieval for Incremental ASR Post-Correction

[PDF](https://www.isca-archive.org/interspeech_2026/ashikawa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ashikawa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-363)

**TL;DR** — The paper introduces an incremental ASR post-correction framework using Audio-KWS-gated error memory retrieval, achieving around 70% prompt length reduction while improving recognition accuracy and bias-word recovery.

## Problem

In long-running speech recognition deployments, accumulating past correction logs (error memory) helps fix recurring domain-specific errors without retraining the ASR model, but full-history prompting quickly exceeds LLM context windows. Furthermore, text-driven retrieval fails when trigger terms are misrecognized in the ASR hypothesis. Relying on audio-grounded cues is therefore essential to reliably retrieve relevant correction records.

## Method

The framework operates in three main steps: LLM-based error analysis extracts correction phrase pairs from past transcripts to update an error memory and a dynamic keyword inventory with an inverted index; open-vocabulary Audio-KWS (AdaKWS using a frozen Whisper-medium encoder) scans incoming audio to detect keywords and retrieve relevant memory records; and a 20-billion parameter LLM performs constrained post-correction guided by the retrieved context. For Japanese, phonetic readings estimated by the LLM are indexed as retrieval keys to handle Kanji surface variants. The system caps the retrieved history to a maximum of 200 recent records, filtering candidates using score thresholds and Top-N selection.

## Results

Evaluated on the English Earnings-21 and Japanese CSJ datasets on bias-word utterance subsets, the method achieves roughly 70% prompt length reduction using Top-20 (English) and Top-10 (Japanese) keyword configurations. It successfully preserves or improves word error rate (WER) and character error rate (CER) compared to full-history baselines and uncorrected ASR. It also demonstrates substantial gains in micro-averaged and macro-averaged bias-word F1 scores.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building production-grade, long-running ASR post-correction systems in dynamic domains like finance and news where rare terminology continuously emerges.

## Related

- (link related pages by id as the wiki grows)
