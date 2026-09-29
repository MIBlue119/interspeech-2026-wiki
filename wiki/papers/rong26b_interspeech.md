---
id: rong26b_interspeech
category: speech-llm-dialogue
institutions: ["Hong Kong University of Science and Technology", "Tencent"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2273
pdf: https://www.isca-archive.org/interspeech_2026/rong26b_interspeech.pdf
---

# Beyond Symmetric Interaction: Capability-Aware Asymmetric Multi-Agent Collaboration for Audio Deep Reasoning

*Yan Rong, Jinting Wang, Tianxin Xie, Xiang He, Chenxing Li, Dong Yu, Li Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/rong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2273)

**Category:** `speech-llm-dialogue`

**TL;DR** — AsymAudio is a capability-aware, asymmetric multi-agent framework designed for complex audio deep reasoning that achieves state-of-the-art results (74.80% on MMAR and 79.10% on MMAU-mini) by resolving agent performance bottlenecks and internal instability.

## Key contributions

- Proposes AsymAudio, the first asymmetric multi-agent collaboration framework for audio deep reasoning designed to eliminate capability mismatches and the bucket effect.
- Introduces a Role-Adaptive Asymmetric Strategy dividing models into hierarchical decision and auxiliary evidence roles with distinct interaction feedback mechanisms.
- Develops an Intra-Agent Consistency Refinement Module that uses internal resampling and objective guides to resolve self-contradictions prior to inter-agent dialogue.
- Provides comprehensive empirical analysis on the bucket effect, textual compensation, and stochastic instability across heterogeneous audio-language models.

## Problem

Vanilla multi-agent paradigms for audio reasoning suffer from three severe limitations: underutilization of complementary acoustic skills across disparate Large Audio-Language Models (LALMs), capability bias leading to the 'bucket effect' (where weaker agents drag down stronger peers), and 'textual compensation' (where superior models abandon acoustic perception for misleading textual logic). Furthermore, single-agent LALMs exhibit high sampling instability and internal inconsistencies when queried multiple times with identical audio-question pairs. These issues cause synergistic hallucination, where multi-agent systems perform worse than their individual components.

## Method

AsymAudio operates across three sequential stages: Intra-Agent Consistency Refinement, Inter-Agent Collaborative Interaction, and Final Decision and Reasoning Collection. In the first stage, each agent queries the input K times; if answers diverge, an LLM generates an internal objective guide (G_inter) forcing self-correction. In the second stage, three heterogeneous models (A1, A2, A3) interact under an asymmetric structure. A1 and A2 act as decision agents while A3 functions as an auxiliary evidence agent equipped with external tools (Whisper-large and a captioner). To prevent textual compensation and the bucket effect, interaction feedback is asymmetric: implicit objective acoustic guidance (G_imp) is given to A1 to prevent bias, while explicit peer context (C_exp) is given to A2 and A3 to allow teacher-student calibration. If agents fail to reach consensus within three rounds (T_max = 3), the stronger agent's output (A1) is enforced as the final prediction.

For training data and recipe, the framework utilizes pre-trained large-scale models without fine-tuning their core weights, orchestrating them via an external LLM coordinator (Qwen3-235B-A22B-Instruct-2507) and prompt templates. Decision agents leverage Qwen3-Omni-30B-A3B-Instruct (A1) and Qwen3-Omni-30B-A3B-Thinking (A2), while auxiliary tools handle fine-grained perception. Inference involves multi-round dialogue capped at three iterations to balance reasoning depth and information redundancy.

## Experimental setup

Evaluated on two audio deep reasoning benchmarks: MMAR and MMAU-mini. Performance is measured primarily via prediction accuracy, alongside reasoning quality scores in ablation settings. Implementation uses Qwen3-Omni-30B variants as base agents, Qwen3-235B-A22B-Instruct-2507 as the moderator LLM, and Whisper-large for tool-based action steps, with a maximum interaction round ceiling set to three.

## Results

AsymAudio ranked 3rd in the Interspeech 2026 Audio Deep Reasoning Challenge (Agent Track) and achieved top performance on MMAR with 71.52% on Sound, 65.05% on Music, and 80.27% on Speech, establishing a leading overall average score of 74.80%. On MMAU-mini, it secured an average accuracy of 79.10%, outperforming standalone models like Gemini-2.0-Flash (72.20%) and AudioGenie-Reasoner (72.60%). Ablation studies demonstrated that substituting symmetric interaction with the proposed role-adaptive asymmetric strategy improves average accuracy from 69.80% to 72.30% and reasoning score from 61.81 to 63.77. The framework shows marginal limitations in specific multi-audio combinatorial subsets where single models occasionally tie or outperform it.

| Systems / Conditions | Sound | Music | Speech | Average | | :--- | :--- | :--- | :--- | :--- | | Gemini-2.0-Flash [24] | 52.90 | 53.07 | 71.15 | 64.86 | | Qwen3-Omni-30B-Instruct [30] | 66.67 | 61.17 | 76.19 | 71.30 | | AudioGenie-Reasoner [15] | 49.68 | 43.26 | 69.23 | 58.85 | | AsymAudio (Ours) | 71.52 | 65.05 | 80.27 | 74.80 |

## Limitations

The framework relies on a fixed ensemble of massive pre-trained proprietary or large open-weights models, inheriting high compute costs and latency unsuitable for on-device real-time deployment. The scope is bounded by the reasoning capabilities of the underlying base models, and performance is susceptible to degradation if the external moderator LLM fails to synthesize accurate objective guidance.

## Why read this

Speech and ML researchers building multi-agent LLM systems will learn how to systematically prevent synergistic hallucinations and capability regression caused by weaker peers in heterogeneous ensembles.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Complex audio intelligence systems, autonomous driving perceptual debugging, interactive diagnostic assistants, and multi-modal conversational agents requiring expert audio perception and step-by-step logic.

## Institutions / 機構

Hong Kong University of Science and Technology, Tencent

**Funding / 經費:** National Natural Science Foundation of China, Guangdong Basic and Applied Basic Research Foundation, Tencent AI Lab Rhino-Bird Program

## Related

- (link related pages by id as the wiki grows)
