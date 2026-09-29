---
id: koh26_interspeech
category: applications-other
labels: [self-supervised]
institutions: ["University of Manchester"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1417
pdf: https://www.isca-archive.org/interspeech_2026/koh26_interspeech.pdf
---

# A Multi-Agent Framework to Automate Feedback Generation for IELTS Speaking Test using Multimodal SpeechLMs

*Hui Xin Koh, Yang Wang, Chenghua Lin*

[PDF](https://www.isca-archive.org/interspeech_2026/koh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1417)

**Category:** `applications-other` · **Labels:** `self-supervised`

**TL;DR** — A multi-agent framework utilizing native multimodal SpeechLMs (bypassing text transcription) to automate IELTS Speaking assessment and feedback generation, achieving up to 0.598 Spearman correlation with human examiners.

## Key contributions

- Proposes an end-to-end multimodal speech-language architecture for IELTS Speaking assessment that bypasses ASR intermediate transcription to avoid informational bottlenecks.
- Introduces a multi-agent evaluation paradigm with four role-based agents mapped directly to official IELTS criteria (Fluency, Pronunciation, Lexical Resource, Grammar) and a meta-reviewer.
- Constructs and validates a new 22.63-hour benchmark corpus of 270 IELTS Speaking mock test recordings with human-annotated band scores and expert feedback.
- Demonstrates that smaller dense models (e.g., 7B) combined with role-based multi-agent structures outperform massive MoE models and traditional regression/ASR+LLM baselines.

## Problem

Automated Speaking Assessment (ASA) systems traditionally rely on regression over handcrafted acoustic and linguistic features or cascaded ASR+LLM pipelines (waterfall architectures). Traditional regression suffers from poor construct coverage and centralizing scores, whereas ASR pipelines introduce an irreversible informational bottleneck by stripping away critical acoustic, prosodic, and temporal fluency cues (rhythm, intonation, pauses). Furthermore, general-purpose instruction-tuned SpeechLMs lack domain-specific calibration to consistently apply complex rubrics like IELTS, often overpredicting low-quality speech scores.

## Method

The framework models an assessment task using Qwen-Omni SpeechLMs as the underlying multimodal engine, taking raw audio x without transcription. Four role-based agents a_FC, a_P, a_LR, and a_GRA evaluate Fluency and Coherence, Pronunciation, Lexical Resource, and Grammatical Range respectively. A meta-reviewer agent M ingests the discrete band scores and targeted feedback dictionaries from these agents, cross-verifies them against the original audio to eliminate halo effects or cross-criterion contradictions, and outputs the final rounded half-band score and unified report.

For inference, each full IELTS speaking session is segmented into three parts (Part 1 intro/interview, Part 2 long turn, Part 3 discussion) because of differing styles and topic foci. Each segment is processed independently, and the final score is averaged from the segment-level predictions. In the few-shot condition, each agent prompt includes nine hand-picked, human-annotated examples covering Bands 1 through 9 across distinct topics.

## Experimental setup

Evaluated on a custom benchmark dataset of 270 IELTS Speaking mock tests totaling 22.63 hours of audio spanning 11 half-band levels (4.0 to 9.0), scored by certified examiners. Compared against a regression baseline using Multiple Linear Regression over handcrafted acoustic features (pause ratio, articulation ratio, duration, pitch/energy mean/std) and ASR (Whisper) transcripts with linguistic features, alongside an ASR+LLM (GPT-5-nano) baseline. Evaluated using Pearson's r, Spearman's rho, and Kendall's tau for scoring correlation, and SBERT all-MiniLM-L6-v2 semantic similarity for feedback quality against expert feedback. Model scales tested include Qwen2.5-Omni-3B, Qwen2.5-Omni-7B, and Qwen3-Omni-30B-A3B-Instruct.

## Results

The 3B multi-agent system achieves a Pearson r of 0.542, nearly four times that of the traditional regression baseline (r = 0.117). For feedback quality, the multi-agent framework achieves an average SBERT semantic similarity of ~0.82-0.83 against human expert feedback, substantially outperforming the ASR+LLM baseline (0.412). In model scaling ablations, the 30B MoE model underperforms compared to dense 3B and 7B models because its sparse activation mechanism (approx. 3B active parameters per pass) limits the effective capacity applied during each inference prediction.

| Method | 3B (r / ρ / τ) | 7B (r / ρ / τ) | 30B (r / ρ / τ) | Avg. (r / ρ / τ) |
|---|---|---|---|---|
| Single | 0.358 / 0.373 / 0.279 | 0.428 / 0.436 / 0.368 | 0.438 / 0.431 / 0.332 | 0.408 / 0.413 / 0.326 |
| Single+Few-shot | 0.253 / 0.263 / 0.207 | 0.334 / 0.310 / 0.262 | 0.497 / 0.466 / 0.351 | 0.361 / 0.346 / 0.273 |
| Multi | 0.542 / 0.540 / 0.422 | 0.413 / 0.415 / 0.313 | 0.371 / 0.380 / 0.284 | 0.442 / 0.445 / 0.340 |
| Multi+Few-shot | 0.536 / 0.551 / 0.422 | 0.492 / 0.598 / 0.460 | 0.411 / 0.414 / 0.307 | 0.480 / 0.521 / 0.396 |
| Regression | - | - | - | 0.117 / 0.177 / 0.138 |

## Limitations

The dataset scale is limited to 22.63 hours (270 recordings), which is modest compared to generic speech corpora. The study focuses specifically on IELTS testing formats and English-language proficiency, leaving cross-lingual and general-purpose conversational assessment largely unexplored. Furthermore, high inference costs of large multimodal speech models and segment-level processing overhead restrict lightweight on-device deployment.

## Why read this

Researchers and engineers working on spoken language models, automated assessment, or multi-agent orchestration should read this paper to see how architectural role-decomposition bypasses the ASR bottleneck and enables smaller speech models to outperform massive MoE models in complex multi-criteria scoring tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated language testing platforms, AI-powered spoken English tutors, and diagnostic feedback generation systems for high-stakes examinations.

## Institutions / 機構

University of Manchester

## Related

- (link related pages by id as the wiki grows)
