---
id: zhang26t_interspeech
category: speech-llm-dialogue
institutions: ["Tianjin University", "Chinese Academy of Sciences"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1313
pdf: https://www.isca-archive.org/interspeech_2026/zhang26t_interspeech.pdf
---

# EChO-Agent: Evidence Chain Orchestration Agent for Audio Reasoning

*Siyuan Zhang, Jian Zong, Junyu Wang, Peiyuan Jiang, Jiahao Yan, Jingyu Zhang, Tianrui Wang, Xiaobao Wang, Longbiao Wang, Jianwu Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1313)

**Category:** `speech-llm-dialogue`

**TL;DR** — EChO-Agent is a modular tool-augmented framework that reformulates complex audio question answering into a four-stage pipeline of tool execution, evidence integration, reasoning, and verification, achieving 71.0% accuracy on the MMAR benchmark.

## Key contributions

- Proposes a four-stage audio reasoning pipeline (Tool -> Evidence -> Reason -> Verify) to establish an auditable, checkable evidence chain.
- Introduces question-type-conditioned static tool dispatch utilizing specialized extractors for audio events, speech recognition, emotion, and music attributes.
- Applies DeepSeek-V3 as an evidence constructor for relevance filtering, cross-observation synthesis, and evidence structuring to prevent noisy raw tool outputs from distracting the reasoning model.
- Implements a dual-pass verification and arbitration protocol that checks format compliance, reasoning-answer consistency, and candidate agreement to eliminate last-mile errors.

## Problem

Large Audio Language Models struggle with complex audio reasoning because they lack question-conditioned perception, verifiable reasoning chains, and the ability to revisit raw audio once subtle cues are missed. Existing tool-augmented agents pass raw, verbose, and high-entropy tool outputs directly to the reasoner without proper filtering, which introduces distracting context, causes shortcut reasoning, and leads to weak grounding under strict instance-level rubric evaluations.

## Method

The framework processes an audio signal and a natural-language multiple-choice question through four sequential stages. First, a question-type-conditioned static tool dispatch strategy invokes specialized analyzers: YAMNet for audio event detection, Whisper for automatic speech recognition, a wav2vec2-based SpeechBrain model for speech emotion recognition, and Essentia for music analysis. Failed tool invocations are retried up to two times before being marked as [UNAVAILABLE].

In the second stage, DeepSeek-V3 acts as an evidence constructor to transform raw tool observations into a compact, structured evidence set via relevance filtering, cross-observation synthesis, and evidence structuring. This filtered evidence is then provided alongside the raw audio and question to the Qwen3-Omni-Instruct Large Audio Language Model (acting as the reasoner), which executes a prompted stepwise reasoning protocol to decompose the question, cite specific evidence entries, and produce candidate answers.

Finally, a dual-pass verification and arbitration protocol managed by the LLM orchestrator checks format compliance, evaluates reasoning-answer consistency, and arbitrates between two candidate responses generated with varied temperatures. If inconsistencies or malformed outputs are detected, diagnostic feedback is injected into a correction loop, or the verifier selects the candidate with stronger evidence alignment.

## Experimental setup

Evaluated on the MMAR benchmark using single-type and composite-type (mixed-modality) audio settings. Compared against multiple open and proprietary baseline models including AnyGPT-chat (8B), OpenOmni (8B), Baichuan-Omni-1.5 (11B), Qwen2.5-Omni (3B/7B), Gemini 2.0 Flash, and Qwen3-Omni-instruct/thinking (30B). Evaluated on accuracy and official MMAR rubric scores.

## Results

EChO-Agent achieves 71.0% average accuracy and a 63.0 rubric score on the MMAR benchmark, outperforming the Qwen3-Omni-Instruct baseline by +2.3 accuracy points (68.7 to 71.0) and +4.3 rubric points (58.7 to 63.0) and ranking 5th in the MMAR Agent Track. The gains are especially prominent on mixed-modality audio. Ablation studies demonstrate that removing evidence integration causes the largest degradation, dropping accuracy to 65.4% and rubrics to 56.9%—falling even below the end-to-end baseline due to un-filtered high-entropy tool noise. Removing observation tools decreases accuracy to 69.2%, and removing verification reduces accuracy to 69.1%.

| Systems / Conditions | Accuracy (%) | Rubric Score |
|---|---|---|
| Qwen2.5-Omni (7B) | 56.7 | – |
| Gemini 2.0 Flash | 65.6 | – |
| Qwen3-Omni-instruct (30B) | 68.7 | 58.7 |
| Qwen3-Omni-thinking (30B) | 69.0 | – |
| Ours (Full EChO-Agent) | 71.0 | 63.0 |
| w/o Evidence Integration | 65.4 | 56.9 |

## Limitations

The granularity of sound-modality reasoning is bounded by the capabilities of the underlying perception tools; for instance, coarse event labels from YAMNet limit fine-grained sound understanding and serve as a bottleneck on sound-centric questions. The framework currently lacks mechanisms to fully resolve tool uncertainty, cross-tool conflicts, and fine-grained temporal analysis dynamically.

## Why read this

Researchers and engineers working on audio reasoning agents and multimodal LALMs should read this paper to understand how explicit evidence integration bridges raw tool perception and reasoning models to improve both accuracy and process-level interpretability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Complex audio question answering, multimedia content analysis, educational audio assessment, and auditable spoken language understanding systems.

## Institutions / 機構

Tianjin University, Chinese Academy of Sciences

## Related

- [Multi-Source Evidence Fusion for Audio Question Answering](olev26_interspeech.md) — same problem · relatedness 3.0/3
- [VISA: A Visual Information Strengthened Audio-Reasoning System for the Interspeech 2026 ARC Agent Track](tu26b_interspeech.md) — same problem · relatedness 3.0/3
- [Structured Prompting vs. Self-Training for Audio Reasoning Under Limited Data and Compute: Lessons from Interspeech Audio Reasoning Challenge 2026](noronha26_interspeech.md) — shared data / evaluation · relatedness 3.0/3
- [Audio-Cogito: Towards Deep Audio Reasoning in Large Audio Language Models](li26o_interspeech.md) — same problem · relatedness 3.0/3
- [Audio-DeepThinker: Progressive Reasoning-Aware Reinforcement Learning for High-Quality Chain-of-Thought Emergence in Audio Language Models](he26e_interspeech.md) — same problem · relatedness 2.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
