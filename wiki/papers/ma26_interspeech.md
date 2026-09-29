---
id: ma26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Shanghai Jiao Tong University", "Nanyang Technological University", "Queen Mary University of London", "NVIDIA", "Carnegie Mellon University", "Alibaba Group", "Microsoft Corporation"]
code: https://github.com/ddlBoJack/MMAR
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-118
pdf: https://www.isca-archive.org/interspeech_2026/ma26_interspeech.pdf
---

# The Interspeech 2026 Audio Reasoning Challenge: Evaluating Reasoning Process Quality for Audio Reasoning Models and Agents

*Ziyang Ma, Ruiyang Xu, Yinghao Ma, Chao-Han Huck Yang, Bohan Li, Jaeyeon Kim, Jin Xu, Jinyu Li, Carlos Busso, Kai Yu, Eng Siong Chng, Xie Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/ma26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ma26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-118)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The Interspeech 2026 Audio Reasoning Challenge establishes the first shared task for evaluating Chain-of-Thought (CoT) reasoning quality in Large Audio Language Models using a novel instance-level rubric protocol, with agentic tool-use systems outperforming end-to-end models on reasoning rigor.

## Key contributions

- Introduces MMAR-Rubrics, an instance-level rubric-based evaluation protocol leveraging LLMs to assess the factuality, logic, and completeness of audio CoT paths.
- Establishes a dual-track challenge framework separating single end-to-end Large Audio Reasoning Models (LARMs) from multi-modal agent systems.
- Provides a comprehensive analysis of 156 participating teams from 18 countries, benchmarking top-tier techniques including two-stage GRPO, attention manipulation, and tool-orchestrating agents.
- Releases open evaluation scripts, datasets, and technical reports to foster explainable and transparent audio intelligence.

## Problem

Current Large Audio Language Models excel at direct perception tasks but function as black boxes with unstable and opaque reasoning capabilities. Existing audio reasoning benchmarks like MMAR, OmniBench, and MMAU-Pro focus exclusively on final-answer accuracy, ignoring whether models reach conclusions through sound logic or spurious correlations. This outcome-oriented evaluation hides hallucinations and creates safety risks in real-world scenarios where explainability and multi-step reasoning are essential. The challenge addresses this by shifting evaluation from final-answer accuracy to process-oriented reasoning quality using a stable metric.

## Method

The challenge evaluates systems across two distinct tracks: Single Model (Track 1) and Agent Track (Track 2). In Track 1, end-to-end models ingest audio inputs and generate a step-by-step reasoning chain followed by a final answer. Winning single-model entries utilized Qwen3-Omni backbones trained via a progressive two-stage reinforcement learning pipeline (an initial 'RL-zero' stage followed by 'Boundary Enhancement' using GRPO with semantic similarity rewards), training-free attention weight scaling over audio tokens, or LoRA supervised fine-tuning driven by high-quality Question-to-Reasoning pipelines.

In Track 2, agents decompose high-level audio questions into executable sub-tasks, execute multi-step tool calls, and verify evidence. Top-performing agents integrated over 40 specialized open-source audio tools covering speech recognition, source separation, spectral analysis, and music theory within iterative evidence-gathering loops. Other notable agent architectures employed vision-language models analyzing Mel, CQT, and RMS spectrogram images for numerical/temporal tasks, multi-agent debates, and cross-model consistency voting mechanisms.

Evaluation is governed by MMAR-Rubrics, which bypasses unstable system-level holistic grading by automatically generating k=5 instance-specific atomic criteria (binary True/False conditions) from ground-truth annotations using Gemini-2.5-Pro. GPT-4o then acts as a rater to check predicted reasoning paths against these criteria alongside textual justifications, producing a final score as the mean of binary outcomes.

## Experimental setup

The evaluation dataset consists of 1,000 diverse questions from the MMAR benchmark spanning speech, music, and environmental audio. The preliminary stage used 500 samples, narrowing the field to 23 single model teams and 24 agent teams, with 14 and 16 teams respectively successfully submitting to the final leaderboard of 1,000 samples. Metrics include instance-level reasoning quality scores via MMAR-Rubrics and final answer accuracy percentages.

## Results

In the final competition standings, agent-based systems outperformed end-to-end models on reasoning quality and final accuracy. The top-performing agent system achieved a rubric score of 69.83% and 76.90% accuracy, while the top single model achieved 65.29% rubric score and 74.00% accuracy. The performance gap was wider in reasoning quality than final accuracy, highlighting that single models often guess correctly without fully robust logic. Notable single-model strategies included progressive two-stage GRPO (1st place, 65.29% rubrics), training-free attention manipulation on audio tokens (2nd place, 62.55% rubrics), and LoRA SFT with dual-verification data pipelines (3rd place, 62.22% rubrics). Among agents, the champion integrated over 40 tools with iterative evidence gathering (69.83% rubrics), while the runner-up used VLM spectrogram analysis yielding the highest accuracy of 77.40% (66.23% rubrics).

| System / Track | Rubrics Score (%) | Final Accuracy (%) |
| --- | --- | --- |
| Agent Track - 1st Place | 69.83 | 76.90 |
| Agent Track - 2nd Place | 66.23 | 77.40 |
| Agent Track - 3rd Place | 66.09 | 75.10 |
| Single Model Track - 1st Place | 65.29 | 74.00 |
| Single Model Track - 2nd Place | 62.55 | 71.00 |
| Single Model Track - 3rd Place | 62.22 | 71.70 |

## Limitations

Evaluation relies heavily on LLM-as-a-judge frameworks (Gemini-2.5-Pro and GPT-4o) for rubric generation and verification, which can introduce underlying prompt biases or judge blind spots despite higher reliability than holistic grading. The benchmark is constrained to text-and-audio question answering tasks and does not evaluate real-time conversational streaming latency or interactive dialogue repair. Furthermore, compute constraints limited open participation, and multi-agent systems rely heavily on external open-source tool accuracy, which degrades when individual upstream tools fail.

## Why read this

Speech and ML researchers focusing on multi-modal reasoning and explainable audio AI should read this paper to understand the state-of-the-art in audio Chain-of-Thought evaluation and architecture design. It provides concrete engineering recipes—ranging from audio-tailored GRPO reinforcement learning loops to multi-agent tool orchestration frameworks—that consistently surpass monolithic end-to-end audio models.

## Code

- https://github.com/ddlBoJack/MMAR

## Applications

Building explainable voice assistants, audio analytics platforms, automated music transcription tools, and diagnostic hearing or acoustic monitoring systems that require verifiable multi-step logical deductions.

## Institutions / 機構

Shanghai Jiao Tong University, Nanyang Technological University, Queen Mary University of London, NVIDIA, Carnegie Mellon University, Alibaba Group, Microsoft Corporation

**Funding / 經費:** National Natural Science Foundation of China, Shanghai Municipal Science and Technology Major Project, Yangtze River Delta Science and Technology Innovation Community Joint Research Project

## Related

- [Multi-Source Evidence Fusion for Audio Question Answering](olev26_interspeech.md) — shared data / evaluation · relatedness 2.7/3
- [MATA: A Training-Free Approach to Mitigate Cross-Modal Attention Imbalance in Large Audio Language Models](wang26t_interspeech.md) — shared data / evaluation · relatedness 2.5/3
- [Structured Prompting vs. Self-Training for Audio Reasoning Under Limited Data and Compute: Lessons from Interspeech Audio Reasoning Challenge 2026](noronha26_interspeech.md) — shared data / evaluation · relatedness 2.5/3
- [VISA: A Visual Information Strengthened Audio-Reasoning System for the Interspeech 2026 ARC Agent Track](tu26b_interspeech.md) — same problem · relatedness 2.4/3
- [Audio-DeepThinker: Progressive Reasoning-Aware Reinforcement Learning for High-Quality Chain-of-Thought Emergence in Audio Language Models](he26e_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
