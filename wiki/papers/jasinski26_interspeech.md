---
id: jasinski26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-338
pdf: https://www.isca-archive.org/interspeech_2026/jasinski26_interspeech.pdf
---

# From Text Metrics to Model Internals: A Study of Whisper ASR Hallucination Detection

[PDF](https://www.isca-archive.org/interspeech_2026/jasinski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jasinski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-338)

**TL;DR** — This paper evaluates and improves ASR hallucination detection paradigms for Whisper large v3 using human-annotated real speech, demonstrating that a late-fusion meta-classifier combining text features and decoder internal states achieves the strongest detection performance.

## Problem

Automatic Speech Recognition (ASR) models trained via weak supervision frequently hallucinate fluent, highly plausible text that has no acoustic grounding, posing critical safety and reliability risks for downstream NLP applications. Existing detection methods rely heavily on oracle text metrics requiring ground-truth reference transcripts, non-speech synthetic data, or unverified zero-shot LLM prompts. This leaves a gap in robust, reference-free hallucination detection for spontaneous, real-world speech.

## Method

The study investigates three detection paradigms on the Whisper large v3 model using the human-annotated HALAS dataset: (1) text-based classifiers (Logistic Regression, Random Forest, XGBoost) trained on oracle and reference-free features selected via Recursive Feature Elimination; (2) LLM-based zero-shot detectors (GPT-4o-mini, Gemini 2.0/3.0 Flash) enhanced with domain-specific pathology prompts and few-shot examples; and (3) decoder internal state probing using linear probes and BLSTM classifiers across self-attention, cross-attention, and MLP representations in intermediate layers. A late-fusion meta-classifier is subsequently introduced to combine text and internal-state outputs.

## Results

Evaluated on the HALAS dataset (containing 858 hallucinations out of 3611 predictions for Whisper large v3) using 5-fold cross-validation and ROC AUC/F1 metrics. XGBoost on text features achieves an F1 score of 62.8% (Recall: 74.1%) in the oracle setting, but collapses to an F1 score of 37.7% without reference texts. Domain-specific prompt engineering improves Flash 3.0 LLM performance up to an F1 of 58.7%, but still underperforms lightweight text classifiers while incurring high latency. Probing Whisper's decoder layers reveals that mean-pooled sequence deltas reach an ROC AUC of 82% at layer 15, and a late-fusion meta-classifier combining text and internal states yields the best overall detection results.

## Code

- https://github.com/DSP-AGH/asr_hallucination_detection_prompts

## Applications

Speech engineers and developers building production ASR deployment pipelines or downstream conversational AI frontends can use these reference-free internal state probes to safely filter out fabricated or untrustworthy transcriptions.

## Limitations

The detectors are evaluated specifically on Whisper large v3 utterances and utterance-level span annotations from a single benchmark dataset (HALAS).

## Related

- (link related pages by id as the wiki grows)
