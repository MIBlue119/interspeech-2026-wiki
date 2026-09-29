---
id: hsu26_interspeech
category: speech-llm-dialogue
institutions: ["Chinese University of Hong Kong", "ByteDance", "Shenzhen Loop Area Institute", "Amphion Technology Co., Ltd"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-640
pdf: https://www.isca-archive.org/interspeech_2026/hsu26_interspeech.pdf
---

# Entity Binding Failures in Speech LLM Reasoning: Diagnosis and Chain-of-Thought Intervention

*Ming-Hao Hsu, Xiaohai Tian, Jun Zhang, Zhizheng Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/hsu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hsu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-640)

**Category:** `speech-llm-dialogue`

**TL;DR** — Speech Large Language Models (SLLMs) suffer from severe reasoning gaps exclusively on tasks requiring entity tracking due to continuous feature downsampling, which can be mitigated via an explicit Entity-Aware Chain-of-Thought (EA-CoT) prompt yielding up to a 24.4 percentage-point gain.

## Key contributions

- Demonstrated that the S2T/T2T modality gap is not a uniform cognitive deficit, remaining minimal on spatial, syntactic, and factual tasks while collapsing on entity-tracking tasks.
- Linked SLLM logical reasoning failures to encoder temporal pooling and downsampling, which blur discrete token boundaries and cause implicit entity binding failures.
- Proposed Entity-Aware Chain-of-Thought (EA-CoT), a lightweight prompt-based inference intervention requiring models to explicitly enumerate entities and bind them to claims.
- Proved that EA-CoT repairs reasoning even under phonetic name corruption, showing that speech reasoning failure is an elicitation issue rather than a missing capability.

## Problem

Prior work observed that Speech Large Language Models (SLLMs) underperform text counterparts on complex reasoning, often attributing this to generalized information dilution or modality divergence. However, these macroscopic evaluations obscure task-specific variations. The authors show that on tasks requiring entity tracking (such as web of lies), S2T accuracy collapses to chance levels while text counterparts achieve over 90% accuracy, rendering SLLMs unreliable for complex multi-entity dialogue scenarios.

## Method

The paper evaluates architecturally diverse SLLMs, specifically Qwen2.5-Omni-7B (which employs an internal thinker module) and Phi-4-Multimodal (which generates responses directly). To bypass fragile implicit tracking induced by encoder temporal pooling, the authors introduce Entity-Aware Chain-of-Thought (EA-CoT) for inference-time intervention on tasks like web of lies. EA-CoT prepends four explicit instructions: entity enumeration, claim recording, step-by-step reasoning, and answer extraction, expanding the maximum generation budget from 256 tokens to 1,024 tokens.

To ensure performance gains stem from structure rather than token budget, the authors isolate instruction effects using budget-controlled baselines BL(1024) and structured control prompts for non-entity tasks (e.g., hyperbaton, navigate, sports understanding). EA-CoT forces models to project continuous, smoothed acoustic features into explicit discrete textual anchors. This design choice succeeds because externalizing entities into text allows the LLM's frozen text-level reasoning capabilities to persist, remaining robust even if acoustic ASR transcripts misrecognize specific entity names (e.g., mapping 'Ka' to 'Cass').

## Experimental setup

Evaluated using four categories from the VoiceBench BBH split (hyperbaton, navigate, sports understanding, and web of lies) totaling 1,000 items (250 per category) presented as both synthesized speech and plain text. Baselines use a 256-token generation limit compared against 1,024 tokens for CoT interventions. Evaluation metrics rely on exact format-guarded accuracy with fallback parsing, and statistical significance is verified via McNemar's test on paired outcomes.

## Results

On web of lies, baseline S2T accuracy plummets to chance (~50.8% - 56.0%) while text baselines reach ~89.6% - 90.4%. Applying EA-CoT improves speech accuracy by +13.2 pp for Qwen and +24.4 pp for Phi-4, shrinking the modality gap significantly. Token budget controls demonstrate that merely extending generation limits to 1024 tokens yields negligible change (<= 1.5 pp), confirming the gains are strictly instruction-driven.

Ablation studies show that entity enumeration accounts for 59% of the total EA-CoT effect (+10.4 pp independently), while format enforcement and step-by-step reasoning provide smaller gains. Conversely, applying EA-CoT to acoustic-heavy benchmarks like MMSU yields zero improvement, confirming the method specifically targets semantic structural binding.

| System / Condition | Overall Acc (S2T/T2T) | Hyperbaton (S2T/T2T) | Navigate (S2T/T2T) | Sports (S2T/T2T) | Web of Lies (S2T/T2T) |
|---|---|---|---|---|---|
| Qwen2.5-Omni (BL 256t) | 60.9 / 71.5 | 72.4 / 74.4 | 58.0 / 58.0 | 57.2 / 64.0 | 56.0 / 89.6 |
| Qwen2.5-Omni (CoT 1024t) | 67.7 / 83.6 | 62.0 / 83.2 | 76.4 / 78.0 | 63.2 / 77.6 | 69.2 / 95.6 |
| Phi-4-Multimodal (BL 256t) | 53.3 / 65.7 | 55.6 / 58.8 | 58.8 / 58.0 | 48.0 / 55.6 | 50.8 / 90.4 |
| Phi-4-Multimodal (CoT 1024t) | 62.7 / 77.5 | 54.8 / 76.8 | 66.4 / 82.0 | 54.4 / 64.0 | 75.2 / 87.2 |

## Limitations

The evaluation is restricted to 7B-class models and synthesized text-to-speech (TTS) datasets, meaning real-world acoustic noise and larger scale architectures are not fully accounted for. Furthermore, EA-CoT relies on explicit prompting that approximately triples token generation and inference latency, presenting hurdles for real-time spoken dialogue systems.

## Why read this

Researchers and engineers building speech-based conversational agents or reasoning SLLMs should read this to understand why models fail at logic tasks and how simple structural prompting can unlock hidden text-level reasoning capabilities without model retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying robust speech assistants and spoken dialogue systems capable of complex multi-entity reasoning and logical tracking.

## Institutions / 機構

Chinese University of Hong Kong, ByteDance, Shenzhen Loop Area Institute, Amphion Technology Co., Ltd

**Funding / 經費:** Shenzhen Science and Technology Program, Internal Project Fund from Shenzhen Research Institute of Big Data

## Related

- (link related pages by id as the wiki grows)
