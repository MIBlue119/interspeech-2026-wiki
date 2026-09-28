---
id: sun26j_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3344
pdf: https://www.isca-archive.org/interspeech_2026/sun26j_interspeech.pdf
---

# MSU-Bench: Towards Understanding the Conversational Multi-Speaker Scenarios

*Zhaokai Sun, Shuai Wang, Zhennan Lin, Chengyou Wang, Dehui Gao, Yuang Cao, Chunjiang He, Pan Zhou, Lei Xie*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3344)

**TL;DR** — MSU-Bench is a diagnostic benchmark designed to evaluate large audio language models on speaker-centric understanding across realistic multi-speaker conversations, covering 16 tasks and 2,300 verified QA instances. Evaluation of nine models reveals a performance range from 0.19 to 0.77 exact-match accuracy, highlighting major bottlenecks in temporal grounding and speaker attribution.

## Key contributions

- Introduces MSU-Bench, a two-tier diagnostic benchmark containing 16 speaker-centric tasks across five capabilities and 2,300 QA instances.
- Combines eight diverse conversational and media-style corpora (totaling over 640 hours) to test robustness in meetings, telephone calls, podcasts, and movies in both Chinese and English.
- Proposes five distinct speaker-referencing schemes (No Index, Time Index, Transcript Index, Speaker Index, Complex Index) to systematically probe speaker grounding abilities.
- Implements a Gemini-assisted annotation and QA pipeline with human-in-the-loop verification, achieving 96%-98% human-ground truth agreement.

## Problem

Current speech benchmarks primarily evaluate single-speaker scenarios or isolate individual subtasks like standard ASR, simple emotion recognition, or standard speaker verification. Real-world audio interactions feature rapid turn-taking, overlaps, and background noise, requiring models to simultaneously track speaker identity, consistency, dialogue structure, and cross-turn reasoning. Prior evaluation infrastructure lacks the capacity to diagnose these multi-speaker conversational dynamics, leaving the precise failure modes of large audio language models (LALMs) unclear.

## Method

MSU-Bench establishes a hierarchical task structure divided into Tier 1 (Speaker Grounding and Identification, encompassing tasks like Speaker Retrieval, Speaker Counting, and Accent/Age/Gender/Emotion Recognition) and Tier 2 (Multi-Speaker Dialogue Reasoning, encompassing Background Inference, Role Identification, Dialogue Act Recognition, and Emotion Interaction Reasoning). Data is sourced from 8 corpora including Chinese/English telephone dialogues, AliMeeting (12h), CHiME-6 (12h), podcasts (97h), and movies (600h), preprocessed into clips ranging from 1 to 5 minutes.

The benchmark construction pipeline utilizes Gemini for dialogue quality assessment, Volcano API for initial diarization and transcripts, and Gemini for paralinguistic and identity metadata annotation. Gemini generates four-option multiple-choice QA pairs based on these annotations, using three diagnostic distractors: wrong-speaker (WS), hallucination (HAL), and unknown (UNK). Trained human annotators subsequently review, revise, or discard ambiguous samples to guarantee validity. Inference is evaluated zero-shot across nine speech-language models using identical instruction templates that demand a single option letter (A/B/C/D), measured via exact-match accuracy.

## Experimental setup

Evaluated nine speech-language models: six open-source systems (Qwen2.5-Omni, Qwen3-Omni, AudioFlamingo-3, Kimi-Audio, StepAudio2, MiMoAudio) and three closed-source Gemini systems (Gemini-2.5-Flash, Gemini-2.5-Pro, Gemini-3-Flash). Evaluated on 2,300 four-option QA instances derived from 8 datasets spanning telephone conversations, meetings, podcasts, and movies in Chinese and English. Metrics include exact-match accuracy across tiers, tasks, and referencing schemes, along with diagnostic error-type composition.

## Results

Exact-match accuracy spans widely from 0.19 (Qwen2.5-Omni) to 0.77 (Gemini-3-Flash). Closed-source models strictly dominate open-source counterparts: Gemini-3-Flash leads overall with 0.77 accuracy (0.73 Tier 1, 0.84 Tier 2), followed by Gemini-2.5-Pro (0.70) and Gemini-2.5-Flash (0.69). Among open-source models, MiMoAudio performs best with 0.56 overall (0.52 Tier 1, 0.64 Tier 2), outperforming StepAudio2 (0.44), Kimi-Audio (0.43), AudioFlamingo-3 (0.39), and Qwen3-Omni (0.39). 

Ablations over speaker-referencing schemes show that Time Index poses the hardest challenge (e.g., Gemini-3-Flash drops to 0.64 on Tier 1 and 0.76 on Tier 2), whereas Complex Index boosts performance (0.84 Tier 1, 0.92 Tier 2 for Gemini-3-Flash). Error analysis reveals that weaker open-source models frequently default to the unknown (UNK) option under high demands (e.g., Qwen3-Omni exhibits a 0.40 UNK rate on Tier 2), whereas advanced models commit errors predominantly via wrong-speaker (WS) attribution (e.g., Gemini-3-Flash reaches a 0.67 WS error rate on Tier 2).

| Systems | Tier 1 Acc | Tier 2 Acc | Overall Avg |
|---|---|---|---|
| Qwen2.5-Omni | 0.19 | 0.21 | 0.19 |
| AudioFlamingo-3 | 0.40 | 0.38 | 0.39 |
| Qwen3-Omni | 0.40 | 0.38 | 0.39 |
| Kimi-Audio | 0.41 | 0.47 | 0.43 |
| StepAudio2 | 0.44 | 0.46 | 0.44 |
| MiMoAudio | 0.52 | 0.64 | 0.56 |
| Gemini-2.5-Flash | 0.64 | 0.78 | 0.69 |
| Gemini-2.5-Pro | 0.67 | 0.82 | 0.70 |
| Gemini-3-Flash | 0.73 | 0.84 | 0.77 |

## Limitations

The evaluation is constrained to 2,300 English and Mandarin Chinese QA instances, leaving low-resource languages untested. Evaluating via multiple-choice tasks, while robust and deterministic, does not fully capture open-ended conversational generation behaviors or streaming dialogue scenarios. Additionally, while human-in-the-loop verification was enforced, utilizing Gemini for initial QA synthesis may introduce subtle dataset biases.

## Why read this

Researchers and engineers building conversational large audio language models should read this paper to understand the specific failure boundaries of current models in multi-speaker grounding and interaction reasoning. It provides an off-the-shelf diagnostic testbed to benchmark architectural improvements in temporal speaker tracking.

## Code

- https://github.com/ASLP-lab/MSU-Bench

## Applications

Diagnostic evaluation of conversational speech foundation models, multi-speaker meeting assistant refinement, and robust audio-language model architectural development.

## Related

- (link related pages by id as the wiki grows)
