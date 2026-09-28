---
id: tu26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2381
pdf: https://www.isca-archive.org/interspeech_2026/tu26b_interspeech.pdf
---

# VISA: A Visual Information Strengthened Audio-Reasoning System for the Interspeech 2026 ARC Agent Track

*Wenming Tu, Jian Gao, Yanru Huo, Yixuan Wang, Jing Peng, Bohan Li, Ziyang Ma, Tao Liu, Shuai Fan, Kai Yu, Xie Chen, Zilong Zheng*

[PDF](https://www.isca-archive.org/interspeech_2026/tu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2381)

**TL;DR** — VISA is a multi-modal agent framework that enhances large audio language models with auxiliary acoustic descriptors, sound event detection, and spectrogram-based visual clues, achieving a top accuracy of 77.40% on the MMAR benchmark.

## Key contributions

- Proposes a 'LALM as a Tool' multi-modal feature extraction pipeline combining librosa low-level acoustic descriptors, Qwen3-Omni-Captioner, an LLM-guided and VLM-verified Agentic SED, and multi-view acoustic-visual analysis.
- Implements a hybrid stochastic-deterministic model-voting inference scheme (K=3, tau > 0 for sampling, fallback to tau = 0 greedy decoding on disagreement) across heterogeneous LALMs.
- Introduces a Disagree-then-Route mechanism governed by a taxonomy of 27 fine-grained audio reasoning categories, mapping sub-domains to LLM reasoning, VLM spectral reasoning, or direct expert selection.
- Achieves 2nd place overall in the Interspeech 2026 Audio Reasoning Challenge Agent Track with a Rubrics score of 66.23% and the highest overall accuracy of 77.40% across all entries.

## Problem

Audio reasoning requires multi-step, evidence-grounded inference over temporally dynamic and acoustically mixed signals, going far beyond traditional perception tasks like ASR or sound event detection. While recent Large Audio Language Models (LALMs) show strong perceptual capabilities, their reasoning remains brittle, uninterpretable, and prone to stochastic hallucinations and shortcut learning. Prior tool-based agents or direct end-to-end LALMs struggle to robustly integrate multi-modal clues across time without introducing orchestration complexity or transcription errors. This work addresses the gap in reliable, evidence-grounded audio reasoning and stable multi-model coordination in complex acoustic environments.

## Method

VISA operates under a "LALM as a Tool" paradigm structured into three consecutive phases: multi-modal feature extraction, model-voting inference, and fine-grained category-aware routing. First, the system gathers multi-faceted evidence: low-level acoustic features from librosa (energy, spectral centroid, MFCCs), high-level text descriptions from Qwen3-Omni-Captioner, candidate events matched via fuzzying to AudioSet labels and localized via FlexSED with visual heatmap verification from Qwen3-VL, and five types of visualized acoustic representations (Mel, CQT, RMS) interpreted by a VLM.

Second, an ensemble model M = {M_Qwen (Qwen3-Omni-Thinking), M_Step (Step-Audio-R1)} performs model voting. Each model generates K=3 stochastic samples at temperature tau > 0; if samples agree, majority voting yields the provisional answer. If all three samples disagree, the model falls back to greedy decoding (tau = 0) to ensure stability.

Third, when model predictions diverge, a Fine-Grained Category-Aware Router resolves disagreements across a refined 27-category taxonomy using three distinct strategies: (1) LLM Reasoning and Selection (using GLM-4.6) for high-level semantic and emotional tasks; (2) VLM-Empowered Spectral Reasoning for precise counting, rhythm, and pitch tasks using visual spectrogram analysis; and (3) Direct Expert Selection routing perception-dominant tasks to the empirically strongest model (e.g., Qwen3-Omni-Thinking for environmental/speech tasks, Step-Audio-R1 for source and duration analysis).

## Experimental setup

Evaluated on the MMAR benchmark containing 1,000 real-world audio QA instances spanning sound, music, speech, and mixtures. Compared against various closed-source models (GPT-4o Audio, Gemini 2.5 Flash), open-source LALMs (Audio-CoT, SALMONN, Audio-Reasoner, R1-AQA, Step-Audio-R1, Qwen3-Omni-Thinking), and multi-modal agents (AudioToolAgent, AudioGenie-Reasoner, SAR-LM). Evaluated using instance-level MMAR Rubrics scores (evaluating factuality, logical coherence, and completeness) and final prediction Accuracy. Utilizes Qwen3-Omni-Thinking (30B), Step-Audio-R1 (32B), GLM-4.6 as the LLM judge, and Qwen3-VL-235B-A22B as the VLM.

## Results

VISA achieves an overall average accuracy of 77.40% on the MMAR benchmark, outperforming open-source baselines such as Step-Audio-R1 (71.50%), Qwen3-Omni-Thinking (69.90%), and proprietary models like GPT-4o Audio (63.50%) and Gemini 2.5 Flash (68.40%). Within the Agent Track leaderboard, VISA secures a Rubrics score of 66.23% and ranks 2nd overall while maintaining the top accuracy (77.40%) across all single-model and agent submissions.

Ablation studies show that removing the fine-grained category-aware routing drops overall accuracy from 77.40% down to 73.30% and degrades the Rubrics score from 66.23% to 62.63%, confirming the critical role of structured task-specific routing. VISA does not dominate every single isolated sub-category; for instance, it scores lower on specific music-theory or aesthetic-analysis sub-tasks compared to specialized single models, but dominates aggregate metrics via robust routing.

| Systems / Conditions | Avg Accuracy (%) | Rubrics Score (%) |
|---|---|---|
| GPT-4o Audio | 63.50 | - |
| Gemini 2.5 Flash | 68.40 | - |
| Step-Audio-R1 (32B) | 71.50 | 58.76 |
| Qwen3-Omni-Thinking (30B) | 69.90 | 58.41 |
| SAR-LM (Agent) | 69.30 | - |
| VISA (Ours, Agent) | 77.40 | 66.23 |

## Limitations

The framework relies heavily on multiple large-scale foundation models (such as 235B VLM and 30B+ LALMs), incurring substantial computational and inference-latency overhead compared to single lightweight end-to-end models. The routing mechanism depends on a predefined heuristic taxonomy of 27 categories, which may fail to generalize smoothly to out-of-domain audio reasoning tasks not covered in the taxonomy. Additionally, the system's reliance on intermediate auxiliary tools (such as captioners and VLM heatmaps) introduces potential error propagation paths if perception modules hallucinate.

## Why read this

Speech and ML researchers focusing on multi-modal agent design and audio reasoning should read this paper to understand how to effectively combine heterogeneous LALMs and visual spectral analysis through structured category-aware routing rather than heavy prompt orchestration.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Complex multimedia content analysis, automated audio-visual surveillance, educational audio QA systems, and advanced conversational agents requiring multi-step logical reasoning over mixed acoustic scenes.

## Related

- (link related pages by id as the wiki grows)
