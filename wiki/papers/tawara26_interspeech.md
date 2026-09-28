---
id: tawara26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2912
pdf: https://www.isca-archive.org/interspeech_2026/tawara26_interspeech.pdf
---

# Who Spoke What When? Evaluating Spoken Language Models for Conversational ASR with Semantic and Overlap-Aware Metrics

[PDF](https://www.isca-archive.org/interspeech_2026/tawara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tawara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2912)

**TL;DR** — This paper evaluates speech and multimodal LLMs on conversational automatic speech recognition (CASR), introduces a time-constrained semantic error rate (tcpSemER) metric, and shows that modular pipelines still outperform LLMs as speaker count and overlap increase.

## Problem

Standard word error rate metrics like cpWER and tcpWER treat all token errors equally and are heavily sensitive to text normalization, failing to reflect true semantic impact in conversational speech. Furthermore, previous embedding-based semantic metrics are restricted to single-speaker utterances and do not support multispeaker long-form audio evaluation with permutation invariance and temporal constraints. This makes it difficult to reliably assess how well modern LLM-based speech transcription systems handle complex, overlapping multi-party conversations.

## Method

The authors introduce tcpSemER, which extends time-constrained permutation word error rate (tcpWER) by replacing Levenshtein distance with sentence embedding cosine similarity using MiniLML12v2 for aligned reference-hypothesis segments. They also propose an overlap-aware decomposition of tcpWER into overlapping and non-overlapping components to isolate error sources. They systematically compare three framework classes across three benchmark datasets: modular pipelines (DiCoW for single-channel and NTT CHiME-8 small system for multi-channel), task-specific LLMs (VibeVoice and Voxtral Mini Transcribe v2), and a general-purpose multimodal LLM (Gemini 3.0 Flash). Multi-channel integration is tested via the MOVER voting technique.

## Results

Evaluated on Mixer-6 (MX6, 2 speakers), NOTSOFAR-1 (NSF1, 3-7 speakers), and DiPCo (4 speakers) datasets from the CHiME-8 challenge. Task-specific LLMs like VibeVoice are competitive with modular pipelines in 2-speaker settings (achieving better DER than DiCoW on MX6), but degrade severely as speaker count and overlap increase (e.g., failing or performing 10-40% worse on cpWER/tcpWER). Gemini 3.0 Flash shows poor diarization and significantly higher tcpWER overall. Overlap-aware decomposition reveals that overlapping segments account for roughly 90% of total errors on NSF1 despite representing only 32% of segments. Combining multi-channel outputs using MOVER consistently boosts performance for VibeVoice and DiCoW.

## Code

- https://pcspeech-demo.fit.vut.cz/wsw2

## Applications

Speech and machine learning engineers developing or evaluating conversational automatic speech recognition, meeting transcription, and speaker diarization systems.

## Limitations

tcpSemER inherits tcpWER's speaker assignment and temporal alignment limitations, and its agreement with human semantic judgments requires further validation.

## Related

- (link related pages by id as the wiki grows)
