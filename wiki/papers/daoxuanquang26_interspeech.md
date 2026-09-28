---
id: daoxuanquang26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1542
pdf: https://www.isca-archive.org/interspeech_2026/daoxuanquang26_interspeech.pdf
---

# M-LAMA: Multimodal Automated Scoring of Long-form Spoken English

[PDF](https://www.isca-archive.org/interspeech_2026/daoxuanquang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/daoxuanquang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1542)

**TL;DR** — M-LAMA is a multimodal framework for automated scoring of multi-minute spontaneous speech that integrates dual-stream audio-text modeling and progressive distribution-aware training, reducing MAE by up to 29.8% over prior open-source baselines.

## Problem

Prior automated speech assessment models predominantly focus on short utterances or single-word pronunciation tasks, failing to capture the complexity of multi-minute, multi-criteria exam responses. High-stakes certification tests also feature heavily skewed, bell-curve score distributions with severe mid-score dominance, causing standard models to suffer from mean bias and low sensitivity at the tails.

## Method

M-LAMA employs a dual-stream encoder combining a frozen Whisper-Large-v3-turbo audio stream (with a bottleneck adapter and part-based temporal chunking) and a frozen Qwen2-1.5B text stream for ASR transcripts and question prompts. A cross-modal decoder uses question-aware text encoding and bidirectional attention to link acoustic delivery with linguistic content, followed by a gated multimodal fusion module. The model is trained via a progressive three-stage strategy: contrastive alignment, range-aware classification, and a fine-grained 21-bin regression head optimized with a combination of MAE and Focal Loss.

## Results

Evaluated on an exam-authentic proprietary dataset of 86,491 sessions (4,845 hours) across five criteria (Pronunciation, Fluency, Vocabulary, Grammar, and Discourse Management), M-LAMA outperforms open-source baselines like Qwen-2.5 Omni and commercial models like GPT-4o Audio. It achieves notable gains, reducing MAE by 26.5% to 29.8% and improving accuracy within error 1 (Acc@1) by up to 42.6% in Pronunciation. Ablations confirm that both the question-aware module and the multi-stage training strategy are essential for handling imbalanced score distributions.

## Code

- https://github.com/cssi87m/M-LAMA

## Applications

Engineers and researchers developing automated spoken language proficiency testing systems, educational platforms for language learning, and automated grading tools for standardized exams like IELTS or TOEFL.

## Limitations

The evaluation relies on a proprietary certification dataset restricted by confidentiality agreements, though source code and replication materials are provided.

## Related

- (link related pages by id as the wiki grows)
