---
id: park26c_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-952
pdf: https://www.isca-archive.org/interspeech_2026/park26c_interspeech.pdf
---

# LoRA-Tuned Large Language Models for Dementia Detection via Multi-View Speech-Derived Features

*Jonghyeon Park, Olivier Jiyoun Jung, Myungwoo Oh*

[PDF](https://www.isca-archive.org/interspeech_2026/park26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-952)

**Category:** `health-clinical`

**TL;DR** — A parameter-efficiently adapted LLM uses structured JSON prompts to jointly reason over multi-view speech features—lexical transcripts, temporal fluency, phonology, and discourse topics—achieving a state-of-the-art 90.14% F1-score for dementia detection on the ADReSSo dataset.

## Key contributions

- Proposes a unified multi-view prompt framework that eliminates the need for complex multi-encoder architectures or late-stage fusion for clinical speech tasks.
- Integrates four distinct complementary speech-derived views: Whisper transcripts with inline pause tokens, MFA-derived temporal fluency statistics, LLM-annotated discourse clusters, and HuPER phonological sequences.
- Conducts an effect-size analysis establishing 0.5 seconds as the optimal pause-duration threshold for maximizing group separation (Cohen's d = 0.282) between AD and CN groups.
- Achieves a new state-of-the-art speaker-level F1-score of 90.14% on the ADReSSo benchmark using a Qwen3-14B model tuned via LoRA.

## Problem

Early detection of Alzheimer's dementia using spontaneous speech is challenging because cognitive symptoms manifest heterogeneously across acoustic, temporal, and linguistic domains. Conventional machine learning approaches and recent multimodal systems either analyze a single representational dimension or rely on independent modality-specific encoders combined via late-stage fusion. Such isolated modeling limits integrative reasoning across interdependent symptoms, such as how hesitation patterns correlate with lexical retrieval difficulties or discourse coherence breakdowns.

## Method

The framework processes speech utterances into four complementary representations and serializes them into a unified JSON-structured prompt. First, lexical transcripts are generated using Whisper large-v3, with silence intervals of 0.5 seconds or longer (determined via Montreal Forced Aligner effect-size analysis showing peak Cohen's d = 0.282) inserted as inline <pause> tokens. Second, global temporal fluency features—including words per second, mean pause duration, and total pause counts—are appended. Third, discourse-level representation assigns each utterance to one of eight fixed semantic clusters and fine-grained topics (covering boy/girl actions, water overflow, counter objects, meta-discourse, etc.) via zero-shot inference with a commercial LLM (GPT-5.2) based on the Cookie Theft picture description task. Fourth, phonological sequences in ARPAbet format are extracted using HuPER, an adaptive phoneme recognizer robust to disfluencies.

Open-source LLMs including Qwen3 (4B, 8B, 14B) and Gemma-3 (12B-it) are fine-tuned using Low-Rank Adaptation (LoRA) applied to query and value projection matrices with rank r = 8 and alpha = 16. Training utilizes the AdamW optimizer with a cosine learning rate schedule, a peak learning rate of 1e-4, and a 10% linear warmup. Utterances are segmented by challenge-provided speaker turns, and final speaker-level predictions are aggregated via majority voting over utterance-level binary classifications (dementia vs. cognitively normal).

## Experimental setup

Evaluated on the ADReSSo challenge dataset derived from the DementiaBank Pitt corpus (Cookie Theft task), consisting of 237 balanced participants (166 train, 71 test). Compared against the eGeMAPS challenge baseline, WavBERT, a Whisper-based ASR pipeline, and Swin-BERT. The primary evaluation metric is speaker-level macro-averaged F1-score. Implemented using Qwen3 and Gemma-3 backbones with LoRA adaptation.

## Results

The best-performing system utilizing Qwen3-14B achieves a headline speaker-level F1-score of 90.14%, outperforming prior published systems including the eGeMAPS baseline (78.92%), WavBERT (83.10%), Whisper-based approaches (84.50%), and Swin-BERT (87.32%). Alternative scales like Qwen3-8B and Gemma-3-12B-it achieve 88.73% and 88.72% F1 respectively, while a smaller Qwen3-4B model scores 85.66%.

An incremental ablation study starting from a speech-transcription-only baseline (81.48% F1) demonstrates consistent gains: adding topic and cluster labels provides the largest jump (+5.81% to 87.29%), incorporating pause/duration statistics adds +1.44% (to 88.73%), and appending phonological sequences provides a final +1.41% boost to reach 90.14%.

| System | F1-score (%) |
|---|---|
| Challenge baseline [18] | 78.92 |
| WavBERT [6] | 83.10 |
| Whisper-based [11] | 84.50 |
| Swin-BERT [26] | 87.32 |
| Ours (Qwen3-8B) | 88.73 |
| Ours (Qwen3-14B) | 90.14 |

## Limitations

The framework relies on a commercial API model (GPT-5.2) for zero-shot discourse topic labeling, restricting full reproducibility and end-to-end open-source training control. Evaluation is restricted exclusively to English speech from the ADReSSo dataset, leaving cross-lingual generalizability unproven. The approach depends heavily on accurate speech segmentation and transcript quality from upstream pipelines.

## Why read this

Speech and ML researchers working on clinical audio classification or multimodal fusion will learn how to bypass complex late-stage fusion architectures by serializing heterogeneous linguistic, temporal, and phonological signals into structured text prompts for LoRA-tuned LLMs.

## Code

- https://github.com/vivivic/is26dementia

## Applications

Automated screening tools for early Alzheimer's disease and dementia detection from clinical or tele-health speech recordings.

## Institutions / 機構

NAVER Cloud, Ewha Womans University

## Related

- (link related pages by id as the wiki grows)
