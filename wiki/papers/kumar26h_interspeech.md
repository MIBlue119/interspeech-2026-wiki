---
id: kumar26h_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2607
pdf: https://www.isca-archive.org/interspeech_2026/kumar26h_interspeech.pdf
---

# VāṇīSetu: A Human-AI Collaborative Framework for Scalable Conversational Speech Corpus Creation in Low-Resource Settings

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2607)

**TL;DR** — VānīSetu introduces a human-AI collaborative framework combining automatic speech recognition, language model post-correction, and multi-stage human validation, achieving a 61.1% reduction in corpus annotation effort for low-resource agricultural speech.

## Problem

Building robust speech technologies for multilingual and low-literacy settings like rural India is severely bottlenecked by a scarcity of high-quality, domain-specific datasets. Curating such corpora manually is extremely labor-intensive and costly (6-8 times real-time) due to challenges like spontaneous noisy speech, regional accents, and dense code-mixing. Fully automated pipelines fail under these conditions, necessitating scalable frameworks that blend automation with rigorous human quality control.

## Method

The VānīSetu framework consists of four main stages: domain-guided data collection from YouTube, automated corpus construction using voice activity detection, PyAnnote speaker diarization, IndicWav2Vec/KVWav2Vec ASR transcription, and CTC-based forced alignment. For post-correction, it integrates lightweight sequence-to-sequence models (mT5-small, ByT5-small) and large language models (LLaMA-3-Nanda-10B, ChatGPT-4o mini). Finally, it employs an enhanced Vāgyojaka annotation tool featuring a role-separated, incentive-linked validation architecture (Annotator -> Validator -> Verifier) governed by threshold-gated reward mechanisms.

## Results

Evaluated on KrishiVānī, a newly curated 100-hour Hindi conversational agricultural corpus split into Known, Unknown, and Out-of-Domain (OOD) partitions. The domain-adapted KVWav2Vec model achieved WERs of 22.38%, 26.04%, and 24.61% on KV-Known, KV-Unknown, and KV-OOD, outperforming IndicConformer and baseline IndicWav2Vec on in-domain splits. For automatic post-correction, fine-tuned mT5-small outperformed larger LLMs in accuracy on in-domain splits with a fast latency of 0.97 seconds. Crucially, the collaborative pipeline reduced total human annotation time and effort by 61.1% compared to a fully manual baseline.

## Code

- https://github.com/KrishiVaani/KrishiVaani

## Applications

Engineers and researchers building speech recognition systems, domain-specific speech datasets, or conversational interfaces for low-resource, code-mixed, or specialized rural domains.

## Limitations

The framework achieved 20 percentage points lower effort reduction than clean read-speech benchmarks due to the extreme linguistic complexity of agricultural conversational Hindi, and generalist ASR models occasionally retained an advantage under severe out-of-domain topic drift.

## Related

- (link related pages by id as the wiki grows)
