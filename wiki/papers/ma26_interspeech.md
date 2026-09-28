---
id: ma26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-118
pdf: https://www.isca-archive.org/interspeech_2026/ma26_interspeech.pdf
---

# The Interspeech 2026 Audio Reasoning Challenge: Evaluating Reasoning Process Quality for Audio Reasoning Models and Agents

*Ziyang Ma, Ruiyang Xu, Yinghao Ma, Chao-Han Huck Yang, Bohan Li, Jaeyeon Kim, Jin Xu, Jinyu Li, Carlos Busso, Kai Yu, Eng Siong Chng, Xie Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/ma26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ma26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-118)

**TL;DR** — The Interspeech 2026 Audio Reasoning Challenge establishes a rigorous benchmark and evaluation protocol (MMAR-Rubrics) for assessing the intermediate Chain-of-Thought (CoT) quality of Large Audio Language Models and audio agents, with multi-agent tool-use systems achieving top reasoning scores of 69.83%.

## Key contributions

- Introduced MMAR-Rubrics, an instance-level rubric-based evaluation protocol for audio Chain-of-Thought reasoning that decomposes reasoning paths into verifiable binary criteria using Gemini-2.5-Pro and GPT-4o.
- Organized the first dual-track audio reasoning challenge featuring a Single Model Track for end-to-end Large Audio Reasoning Models (LARMs) and an Agent Track for tool-using multi-modal systems, attracting 156 registered teams.
- Evaluated and analyzed state-of-the-art post-training techniques for end-to-end models, including progressive two-stage reinforcement learning with GRPO, attention manipulation, and targeted LoRA SFT pipelines.
- Documented advanced agentic methodologies, such as iterative evidence gathering across 40+ specialized audio tools, VLM-based spectrogram analysis, and multi-agent debate frameworks for consensus building.
- Released the open-source MMAR-Rubrics benchmark dataset, evaluation scripts, and technical reports to foster explainable and transparent audio intelligence research.

## Problem

Current Large Audio Language Models (LALMs) suffer from a "black-box" limitation where they excel at final-answer accuracy while lacking transparent, stable intermediate reasoning. Existing benchmarks like MMAR, OmniBench, and MMAU-Pro evaluate only the final outcome, completely ignoring the factuality, logic, and completeness of the Chain-of-Thought (CoT). Furthermore, traditional LLM-as-a-judge approaches that rely on system-level holistic rubrics suffer from high inter-rater variance and poor human alignment. This lack of process-oriented evaluation and transparent reasoning poses significant safety and reliability risks in complex real-world auditory scenarios.

## Method

The challenge evaluates systems across two distinct tracks using the MMAR-Rubrics framework, which evaluates 1,000 test queries. In the Single Model Track, models process audio signals in a single forward pass without external tools; the winning team utilized Qwen3-Omni-Instruct trained via a progressive two-stage reinforcement learning scheme using Group Relative Policy Optimization (GRPO), starting with an "RL-zero" stage followed by a "Boundary Enhancement" stage with hard negatives and semantic similarity reward signals. Other top single-model entries experimented with training-free attention weight scaling specifically over audio token spans to force deeper acoustic focus, or used high-quality LoRA SFT with a "Question-to-Reasoning" annotation pipeline and LLM hallucination filtering.

In the Agent Track, systems decompose high-level auditory queries into structured sub-tasks using external tools, planners, and memory structures. The champion agent architecture integrated over 40 specialized audio tools spanning core speech processing (ASR, separation, diarization), signal analysis (spectral features, energy dynamics), and music theory (chord progression, rhythm patterns), executing an iterative evidence gathering loop. Other top agent designs utilized Vision-Language Models (VLMs) to process visual spectrogram representations (Mel, CQT, RMS) for fine-grained numerical tasks, or structured multi-agent debate pipelines governed by a central controller to resolve conflicts and mitigate hallucinations.

## Experimental setup

The evaluation utilized the MMAR-Rubrics benchmark comprising 1,000 test questions spanning speech, music, and environmental sounds. The challenge drew 156 registered teams from 18 countries, narrowing down to 23 single-model and 24 agent teams in the preliminary stage, with 14 single-model and 16 agent teams completing the final leaderboard stage. Metrics included the instance-level rubric-based reasoning quality score (Rubrics %) and final answer accuracy (Acc %). Reliability of the evaluation protocol was measured via Krippendorff's alpha across multiple LLM raters (GPT-4o, Gemini-2.5-Flash, GPT-5-mini) and human alignment preference studies.

## Results

In the final leaderboard, agent-based systems generally outperformed end-to-end models in reasoning quality. The top-performing agent system achieved a headline rubric score of 69.83% and 76.90% accuracy, while the second-ranked agent achieved a peak accuracy of 77.40%. In the Single Model Track, the 1st place team achieved a 65.29% rubric score and 74.00% accuracy using two-stage GRPO training on the Qwen3-Omni-Instruct backbone. The 2nd place single model achieved 62.55% rubric / 71.00% accuracy via training-free attention manipulation, while the 3rd place team scored 62.22% rubric / 71.70% accuracy using LoRA SFT. The performance gap between tracks shows that while end-to-end models can frequently guess correct final answers, agent systems yield more transparent, logically sound, and verifiable reasoning paths.

| System / Condition | Rubrics Score (%) | Final Accuracy (%) |
|---|---|---|
| Agent Track - 1st Place (Iterative Tools) | 69.83 | 76.90 |
| Agent Track - 2nd Place (VLM Spectrograms) | 66.23 | 77.40 |
| Agent Track - 3rd Place (Multi-agent Debate) | 66.09 | 75.10 |
| Single Model Track - 1st Place (Two-stage GRPO) | 65.29 | 74.00 |
| Single Model Track - 2nd Place (Attention Scaling) | 62.55 | 71.00 |
| Single Model Track - 3rd Place (LoRA SFT) | 62.22 | 71.70 |

## Limitations

The evaluation relies heavily on LLM-as-a-judge automation (using GPT-4o guided by Gemini-2.5-Pro generated criteria), which, despite higher reliability than system-level grading, still inherits proprietary model biases. The benchmark scope is bounded by the 1,000 questions in MMAR-Rubrics, which may not exhaustively cover every niche acoustic environment or dialect. Furthermore, agentic systems incur significantly higher inference latency and compute overhead due to multi-step tool orchestration and iterative evidence-gathering loops.

## Why read this

Researchers and engineers building multimodal audio models or conversational agents should read this paper to understand state-of-the-art practices in eliciting transparent Chain-of-Thought reasoning. It provides concrete empirical comparisons between monolithic reinforcement learning approaches and multi-agent tool-orchestration systems, accompanied by a robust, human-aligned evaluation protocol.

## Code

- https://github.com/ddlBoJack/MMAR

## Applications

Development of transparent, auditable, and reliable virtual assistants, automated acoustic diagnostic systems, and explainable multi-modal decision agents for complex real-world sound environments.

## Related

- (link related pages by id as the wiki grows)
