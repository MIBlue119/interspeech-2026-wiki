---
id: olev26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3297
pdf: https://www.isca-archive.org/interspeech_2026/olev26_interspeech.pdf
---

# Multi-Source Evidence Fusion for Audio Question Answering

*Aivo Olev, Tanel Alumäe*

[PDF](https://www.isca-archive.org/interspeech_2026/olev26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/olev26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3297)

**TL;DR** — A multi-source ensemble framework combining dual speech LLMs and 25 reliability-tiered acoustic tools achieved first place in the Interspeech 2026 Audio Reasoning Challenge, scoring 69.8 on reasoning quality and 76.9% accuracy on the MMAR benchmark.

## Key contributions

- Dual-source speech LLM evidence fusion using independent observations from StepAudioR1 and Qwen3-Omni across full-audio and segmented analyses.
- A four-tier tool reliability framework (Analytic, Probabilistic, Heuristic, LALM) featuring confidence caps, relevance scoring, corroboration bonuses, and domain appropriateness adjustments.
- A three-stage contradiction detection mechanism involving heuristic validation rules, an LLM-based verification prompt, and a deterministic Step 2 targeted tool execution loop.
- A two-stage decoupled output generation pipeline separating answer selection from multi-section prose reasoning generation to prevent narrative anchoring.

## Problem

Large audio language models (LALMs) process diverse audio modalities but generate opaque reasoning chains that resist verification, masked by benchmarks that solely measure final-answer accuracy. Existing agentic frameworks and multi-agent methods treat all tools and participants as equally reliable oracles, failing to account for the heterogeneous reliability spectrum of acoustic metrics, ASR, and hallucination-prone LALMs. This lack of explicit reliability grounding leads to unfaithful reasoning, anchoring bias, and sycophancy when integrating multi-source evidence.

## Method

The system ingests an audio file, a question, and multiple-choice options. Two open-weights LALMs (StepAudioR1 and Qwen3-Omni) independently analyze the full audio and three equal-duration segments without seeing final answer predictions. A synthesis step merges observations and applies corroboration bonuses. Concurrently, 25 specialized tools (e.g., Whisper, Canary, Demucs, CREPE, librosa-based features) generate measurements assigned to four reliability tiers: Analytic (weight 1.0, cap 0.90), Probabilistic (weight 0.75, cap 0.75), Heuristic (weight 0.50, cap 0.60), and LALMs (weight 0.40, cap 0.70). Evidence items receive confidence combining base tier values, a 1.5x corroboration multiplier, and a 1.3x direct-answer bonus, with LALM confidence strictly capped at 0.70.

Disagreements or low-confidence outputs trigger a three-stage contradiction detection mechanism. Step 1 applies deterministic bookkeeping and an LLM verification prompt to flag inter-tool conflicts, intra-tool inconsistencies, and hierarchy violations. Unresolved contradictions trigger Step 2 targeted tool calls over specified time ranges via a deterministic executor. The final stage uses two sequential calls to a reasoning LLM (Kimi-K2-Thinking): an answer selection prompt leveraging all reliability-weighted observations and tool outputs, followed by a reasoning generation prompt that structures a prose justification using a strict seven-section template.

## Experimental setup

Evaluated on the 1,000-sample MMAR benchmark from the Interspeech 2026 Audio Reasoning Challenge, spanning signal, perception, semantic, and cultural reasoning across speech, music, and mixed sounds. Compared against challenge competitors and single-model baselines including Gemini 2.5 Pro (74.7%), GPT-4o Audio (63.5%), and Qwen3-Omni-Thinking (66.4%). Metrics include raw accuracy and the MMAR-Rubrics composite reasoning quality score. The reasoning agent utilizes moonshotai/Kimi-K2-Thinking at temperature 0.6.

## Results

The system achieved first place on the Agent Track leaderboard with a reasoning quality score of 69.83 and 76.9% accuracy, outperforming all competing teams in reasoning transparency while matching strong commercial models. Ablation experiments at the argumentation replay level demonstrated that removing dual-source fusion—relying solely on Step-Audio-R1 or Qwen3-Omni—causes statistically significant accuracy drops of 4.3 pp (72.3%) and 3.2 pp (73.4%) respectively (McNemar's test, p < 0.01). Furthermore, acoustic tool evidence dynamically overrode LALM predictions in 85 out of 1,000 cases. The system experiences performance variations across MMAR reasoning layers, achieving highest accuracy on semantic tasks (84.0%) and lowest on music theory (61.9%) and temporal analysis (57.1%).

| System / Condition | Accuracy | Rubrics Score |
|---|---|---|
| TalTech (Ours) | 76.9% | 69.83 |
| Team B | 77.4% | 66.23 |
| Team C | 75.1% | 66.09 |
| Team D | 72.2% | 64.61 |
| Team E | 71.0% | 63.00 |
| Gemini 2.5 Pro (Single) | 74.7% | — |

## Limitations

The end-to-end latency averages 8 to 10 minutes per sample, precluding real-time applications without optimization. Certain specialized tools (e.g., source separation and rhythm pattern matching) were never observed in executed tool logs due to pipeline allow-listing constraints. Additionally, reliability weights and confidence caps were hand-tuned during challenge development rather than learned systematically from a dedicated calibration dataset.

## Why read this

Read this paper to learn how to construct agentic speech pipelines that combine heterogeneous, unreliable models and symbolic tools using rigorous reliability tiers, confidence caps, and decoupled verification loops.

## Code

- https://github.com/aivo0/audio-reasoning-solution

## Applications

Verifiable audio question answering, multi-modal educational tutoring systems, and auditable audio content moderation.

## Related

- (link related pages by id as the wiki grows)
