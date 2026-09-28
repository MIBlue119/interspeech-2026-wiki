---
id: ali26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2694
pdf: https://www.isca-archive.org/interspeech_2026/ali26c_interspeech.pdf
---

# WASIL: In-the-Wild Arabic Spoken Interactions with LLMs

[PDF](https://www.isca-archive.org/interspeech_2026/ali26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ali26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2694)

**TL;DR** — The paper introduces WASIL, an in-the-wild Arabic spoken interaction dataset pairing audio prompts across Modern Standard Arabic and four dialects with explicit user feedback, post-edited gold transcripts, and intrinsic answerability labels.

## Problem

Evaluating cascaded ASR-to-LLM voice assistants is difficult because user dissatisfaction can stem from multiple confounded sources, including speech recognition errors, ambiguous or unanswerable prompts, and downstream language model limitations. Existing resources predominantly target English or clean, curated settings, leaving a critical gap in understanding failure modes for dialectal Arabic spoken interactions.

## Method

The authors collected 9,304 spoken interaction prompts from 93 users across Algeria, Egypt, Sudan, and Syria using Fanar and Gemini APIs, gathering explicit like/dislike feedback and a 10-category failure taxonomy for disliked responses. They constructed 2,573 gold transcripts via multi-ASR agreement-guided manual post-editing, categorized dialects into MSA, English, code-switching, and regional dialects, and annotated intrinsic answerability into four categories using three annotators per utterance with moderate-to-substantial agreement (Gwet's AC1 of 0.65). The dataset is split into a 1,777-prompt test set, a 988-prompt feedback set, and a 6,602-prompt training set.

## Results

Across the 2,573 gold-transcribed turns, Fanar Aura ASR achieved an average word error rate (WER) of 0.190 and a semantic cosine similarity of 0.917 compared to post-edited references. Across dialect subsets, Fanar and Gemini yielded an identical average WER of 0.18, though Gemini achieved higher semantic agreement (0.92 vs. 0.89 cosine similarity). Evaluation protocols utilizing multi-judge LLM scoring enabled scalable reference-free response evaluation using both ASR hypotheses and gold transcripts.

## Code

- https://huggingface.co/datasets/QCRI/WASIL

## Applications

Speech and ML engineers building, evaluating, or aligning Arabic speech-to-text and spoken LLM voice assistant pipelines.

## Limitations

The evaluation and analysis subset focused on 2,573 turns out of the total collected 9,304 prompts.

## Related

- (link related pages by id as the wiki grows)
