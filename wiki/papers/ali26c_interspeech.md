---
id: ali26c_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2694
pdf: https://www.isca-archive.org/interspeech_2026/ali26c_interspeech.pdf
---

# WASIL: In-the-Wild Arabic Spoken Interactions with LLMs

*Zien Sheikh Ali, Hamdy Mubarak, Soon-Gyo Jung, Hunzalah Hassan Bhatti, Firoj Alam, Shammur Absar Chowdhury*

[PDF](https://www.isca-archive.org/interspeech_2026/ali26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ali26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2694)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — WASIL is a new dataset of 9,304 in-the-wild Arabic spoken interaction prompts covering Modern Standard Arabic and four major dialects, paired with explicit user feedback, post-edited gold transcripts, and intrinsic answerability labels to isolate ASR errors from LLM reasoning failures.

## Key contributions

- Released the WASIL dataset containing 9,304 spoken interaction prompts from 93 users with like/dislike feedback, fine-grained error categories, and dialect/answerability labels.
- Proposed a low-cost reference creation strategy using multi-ASR agreement (Fanar and Gemini) as a reliability proxy to prioritize human post-editing efforts.
- Introduced an intrinsic answerability annotation schema (AC1=0.65) separating transcription degradation from user-turn ambiguity and out-of-domain requests.
- Conducted extensive benchmarking of open-source and closed-source models (ALLaM-7B, Fanar-2, GPT-5, Gemini-2.5 Pro) under audio, ASR-transcript, and gold-transcript input conditions using multi-judge LLM scoring.

## Problem

Building speech voice assistants via a cascaded ASR-to-LLM architecture introduces confounded evaluation challenges: user dissatisfaction stems from ASR recognition errors distorting intent, intrinsically unanswerable or ambiguous user turns, and downstream LLM limitations. Prior datasets focus primarily on curated English prompts, text chat logs (e.g., WildChat), or controlled ASR benchmarks, lacking natural Arabic spoken interactions paired with explicit feedback that can untangle where speech pipeline failures originate.

## Method

WASIL collects interactions from 93 participants across Algeria, Egypt, Sudan, and Syria using APIs from Fanar (Fanar-Aura-STT-1 and Fanar-2 LLM / ALLaM-7B) and Gemini/GPT models. A post-editing approach using multi-ASR agreement filters out high-similarity pairs (68% exceeding 0.90 cosine similarity via paraphrase-multilingual-mpnet-base-v2) to reduce human annotation costs, producing 2,573 gold transcripts. Annotators also labeled utterances into MSA, English, code-switched Mix, or dialects (Egyptian, Sudanese, Syrian, Algerian), and categorized intrinsic answerability into four classes (Answerable/Clear, Ambiguous/Needs-Clarification, Out-of-Domain/Unsupported, Not-a-Request/Noise).

For LLM response evaluation, the authors adopt a reference-free, rubric-based LLM-as-a-judge protocol using Gemini 3 Pro across seven criteria: intent precision, context awareness, specificity, depth/thoroughness, grounding/honesty, format/language compliance, and coherence. Models are evaluated on two aggregated metrics: Average Pass Rate (APR, percentage satisfying all required checks) and Average Rubric Score (ARS, mean pass rate across all checks). Dislike reactions are mapped to a 5-dimension meta-feedback taxonomy (Helpfulness/Task Success, Correctness/Truthfulness, Safety/Harmlessness, Communication Quality, Cultural & Religious Alignment).

## Experimental setup

The dataset spans 9,304 total turns, with a test set of 2,573 turns (1,777 gold-transcribed prompts) and a feedback set of 988 turns. Evaluated open models include ALLaM-7B and Fanar-2 (on transcripts) and Qwen2.5-Omni-3B (audio); closed models include GPT-5 (transcripts), GPT-4o Audio (audio), and Gemini-2.5 Pro (both audio and transcripts).

## Results

Closed-source models heavily outperform open-source ones; Gemini-2.5 Pro achieves the top direct-audio performance with 82.01% APR and 91.97% ARS, rising to 89.20% APR / 94.56% ARS when using gold transcripts. In contrast, open-source Fanar-2 peaks at 41.22% APR using gold transcripts, while ALLaM-7B achieves 28.14% APR. Prompt-to-dislike analysis reveals that 72% of liked responses have high ASR similarity (>=0.9), whereas only 52% of disliked responses do. Helpfulness/task success accounts for 40.7% of negative feedback, followed by correctness/truthfulness at 29.9% and communication quality at 20.5%.

| System / Condition | Input Modality | APR (%) | ARS (%) |
|---|---|---|---|
| ALLaM-7B | Gemini-ASR | 28.53 | 69.21 |
| Fanar-2 | Gold-trans | 41.22 | 77.18 |
| GPT-5 | Gemini-ASR | 73.25 | 89.57 |
| GPT-4o Audio | Audio | 50.56 | 77.91 |
| Qwen2.5-Omni-3B | Audio | 3.30 | 40.34 |
| Gemini-2.5 Pro | Gold-trans | 89.20 | 94.56 |

## Limitations

The dataset reflects the specific user population from the collection pipeline, which may under-represent certain dialect sub-varieties and domain use cases. Like/dislike feedback signals do not capture all nuances of response quality, and rubric-based evaluations are susceptible to judge model biases and prompt interpretations.

## Why read this

Speech and ML researchers building Arabic voice assistants or studying multimodal error propagation should read this paper to understand how ASR dialectal variations explicitly drive downstream LLM failure modes.

## Code

- https://huggingface.co/datasets/QCRI/WASIL

## Applications

Development and evaluation of dialect-inclusive Arabic speech-to-text and speech-LLM conversational voice assistants.

## Institutions / 機構

Qatar Computing Research Institute

## Related

- (link related pages by id as the wiki grows)
