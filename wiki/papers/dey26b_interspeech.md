---
id: dey26b_interspeech
category: asr
institutions: ["Samsung"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3115
pdf: https://www.isca-archive.org/interspeech_2026/dey26b_interspeech.pdf
---

# Rethinking Organization Entity Modeling in End-to-End Acoustic Named Entity Recognition

*Spandan Dey, Nidhi Mantri, Sambit Behera, Hirak Mondal, Sanjay Kurmi, Sreyasree Mandal, Atharv Joshi, Premjeet Singh, Gopal Agrawal*

[PDF](https://www.isca-archive.org/interspeech_2026/dey26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dey26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3115)

**Category:** `asr`

**TL;DR** — This paper presents an end-to-end acoustic named entity recognition (NER) framework that addresses poor organization entity recognition using a structure-constrained entity learning objective and LLM-based targeted semantic augmentation, improving organization F1-score from 19.04% to 51.40% over baseline.

## Key contributions

- Systematic analysis of organization recognition failures in end-to-end acoustic NER, pinpointing multi-word spans, acronyms, and lexical variability.
- A targeted semantic augmentation pipeline leveraging Phi-3-medium (14B) for abbreviation expansion and lexical variation, followed by multi-speaker XTTS-2 speech synthesis.
- Category-specific boundary supervision via a dedicated <org_end> token to improve span boundary marking for multi-word organization names.
- A novel sequence-level structure-constrained entity learning (SCEL) objective combining entity-modeling and structural-regularization losses.

## Problem

End-to-end acoustic NER integrates speech transcription and entity extraction into a unified model, avoiding the cascading error propagation of traditional two-stage ASR followed by text-domain NER pipelines. However, organization entities remain notoriously difficult to detect due to multi-word spans with embedded non-entity words, frequent acronym usage, and high lexical variability resulting in out-of-vocabulary terms. Conventional cross-entropy training fails to model these complex entity span dependencies and suffers from boundary instability since speech lacks punctuation and capitalization cues.

## Method

The architecture builds upon Whisper-small (frozen encoder, first 9 decoder layers frozen during fine-tuning). To address data scarcity and span variability for organization entities, the authors use Phi-3-medium-128k-instruct (14B parameter LLM) to generate semantically equivalent paraphrases, expand abbreviations (e.g., ICC to International Cricket Council), and correct entity tags, followed by rule-based cleanup and multi-speaker speech synthesis via XTTS-2 (with entity tokens removed from inputs).

The training objective combines cross-entropy with a Structure-Constrained Entity Learning (SCEL) framework comprising two loss categories: (i) Entity-modeling losses including an entity-aware differential loss (L_ne) for class imbalance, a tag suppression loss (L_sup) to penalize spurious entity activations, a span coverage constraint (L_cov) for coherent entity spans, and a boundary consistency loss (L_bnd) for multi-word NEs; (ii) Structural-regularization losses including entropy regularization (L_ent) for uncertain predictions and confidence calibration loss (L_conf) to align predicted token probabilities with empirical correctness. A dedicated <org_end> token is used during training for category-aware supervision, which is collapsed back to the standard <end> token at inference time.

## Experimental setup

Experiments use the English acoustic NER database containing 150 hours of manually annotated Common Voice and LibriSpeech data across 38,891 unique named entities, split 90:5:5. The backbone is Whisper-small optimized via Adam with a learning rate of 5e-4 and 2k warm-up steps up to 50k steps. Baselines include a two-stage ASR-NER pipeline (Whisper-small + Flair NER), Yadav et al.'s baseline (cross-entropy entity-aware ASR), and WhisperNER with bias values of 0 and 0.05. Evaluation metrics include Word Error Rate (WER) excluding tags, and precision, recall, and F1-score for overall and category-wise entities.

## Results

The final proposed framework (SCEL + TSA + <org_end>) achieves a WER of 9.53%, an overall F1 of 76.88%, and a primary organization F1 (Org-F1) of 51.40%. Compared to the two-stage pipeline (Org-F1: 19.04%) and the cross-entropy baseline (Org-F1: 30.35%), the proposed approach yields a 32.36% and 21.05% absolute improvement in Org-F1 respectively, while also improving overall ASR performance. Ablations on individual SCEL losses show that boundary consistency loss alone drops WER to 8.01% with 38.88% Org-F1, and combining SCEL with targeted semantic augmentation and organization-specific boundary tokens substantially boosts multi-span organization recognition.

| Framework | WER (%) | P (%) | R (%) | F1 (%) | Per-F1 (%) | Loc-F1 (%) | Org-F1 (%) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Two-Stage (Whisper + Flair) | 13.07 | 75.13 | 67.40 | 71.05 | 76.66 | 76.04 | 19.04 |
| Baseline [10] | 13.15 | 70.35 | 72.18 | 71.25 | 71.22 | 79.20 | 30.35 |
| WhisperNER (bias=0) [11] | 20.38 | 48.11 | 74.84 | 58.87 | 61.37 | 61.13 | 30.16 |
| WhisperNER (bias=0.05) [11] | 12.20 | 50.70 | 78.46 | 61.60 | 64.36 | 64.72 | 31.29 |
| SCEL (Proposed) | 8.27 | 74.67 | 81.89 | 78.11 | 79.33 | 79.65 | 40.00 |
| SCEL + TSA + org_end | 9.53 | 78.45 | 75.39 | 76.88 | 76.74 | 79.70 | 51.40 |

## Limitations

The study is restricted to English data and a single backbone scale (Whisper-small) due to compute constraints. The evaluation focuses specifically on person, location, and organization entities, and relies heavily on synthetic TTS augmentations for organization entity data balancing which may not capture full real-world acoustic complexity.

## Why read this

Researchers and engineers building end-to-end spoken language understanding or acoustic NER systems will learn how to design sequence-level structural loss functions and LLM-based data augmentation pipelines to solve span-boundary errors and multi-word entity challenges.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice-driven assistants, smart home devices, and conversational voice applications requiring real-time named entity extraction directly from speech.

## Institutions / 機構

Samsung

## Related

- [Post-ASR Proper Noun Grounding via Multi-View Phonetic and Semantic Retrieval](nema26_interspeech.md) — same problem · relatedness 1.9/3
- [A Human-in-the-Loop Multi-Agent Companion for Real-Time Entity Extraction and SLU-Driven ASR Error Correction](arumugam26_interspeech.md) — same problem · relatedness 1.9/3
- [Entity Binding Failures in Speech LLM Reasoning: Diagnosis and Chain-of-Thought Intervention](hsu26_interspeech.md) — same problem · relatedness 1.7/3
- [Beyond WER: Entity and Disfluency Recall in Accented Conversational ASR](husain26_interspeech.md) — same problem · relatedness 1.7/3
- [Towards Deep Contextual Reasoning from Broad Descriptions for ASR with Speech-LLM via Metadata-Driven Reasoning Chains](poncelet26b_interspeech.md) — same problem · relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
