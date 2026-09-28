---
id: bartley26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1302
pdf: https://www.isca-archive.org/interspeech_2026/bartley26_interspeech.pdf
---

# Bootstrapping Endangered Language ASR with Short-Form Corpora

[PDF](https://www.isca-archive.org/interspeech_2026/bartley26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bartley26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1302)

**TL;DR** — This paper presents a pipeline that bootstraps ASR for endangered languages by using short-form speech corpora to force-align long-form audio, achieving strong out-of-domain performance at a fraction of the compute required by massive multilingual foundation models.

## Problem

Most of the world's ~7,000 languages are endangered and unsupported by modern speech technology because standard pipelines rigidly assume the availability of clean utterance-level supervised corpora (3–15 second segments). While industry and academic approaches rely on massive multilingual pretraining and fine-tuning (e.g., Whisper, MMS, OmniASR), these demand massive GPU compute that endangered-language communities cannot afford. Conversely, these communities frequently possess alternative formats like long-form unaligned narrations or crowdsourced short-form pronunciation snippets (0–2 seconds), which standard pipelines cannot ingest.

## Method

The authors first establish word-level viability using English LibriSpeech, demonstrating that segmenting training data down to ~1-second units (word/short-phrase level) preserves ASR performance. They then collect short-form data for 5 typologically diverse endangered languages (Cornish, Manx, Hawaiian, Jejueo, Mohawk), train a monophone GMM-HMM seed model using a Unicode graphemic lexicon, and use it to Viterbi force-align and segment long-form recordings. The resulting utterances are combined with short-form data to train CPU-accessible HMM-based systems (GMM-HMM and LF-MMI TDNN) utilizing external text-augmented 4-gram LMs, as well as fine-tuning Whisper large-v3 via LoRA for 1 epoch using SpeechBrain.

## Results

Tested across five endangered languages (Cornish, Manx, Hawaiian, Jejueo, Mohawk) on in-domain (test-id) and out-of-domain (test-ood) splits, the proposed HMM-based and fine-tuned models outperform zero-shot state-of-the-art multilingual models (OmniASR 7B, MMS 1B, Whisper large-v3) in almost all test cases. The naive GMM baseline beats zero-shot SOTA models in 4 out of 5 languages, while the DNN-HMM model with augmented language models achieves the strongest overall performance (e.g., Cornish ood WER drops to 8.10% compared to 52.30% for zero-shot Whisper and 45.70% for MMS). Whisper-FT (LoRA) achieves superior performance on extremely data-scarce languages like Jejueo and Mohawk out-of-domain tests.

## Code

- https://github.com/c-bartley/el-asr

## Applications

Speech and ML engineers, linguists, and endangered-language communities seeking to build custom, compute-efficient ASR systems for low-resource or unwritten languages using readily available non-utterance-level archival recordings.

## Limitations

The approach struggles with extremely degraded audio quality or heavy background music (as seen in Hawaiian broadcast data), and languages with extreme text scarcity (like Jejueo and Mohawk) remain highly challenging across all model classes.

## Related

- (link related pages by id as the wiki grows)
