---
id: lin26i_interspeech
category: audio-understanding
labels: [generative-model]
institutions: ["Duke University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1739
pdf: https://www.isca-archive.org/interspeech_2026/lin26i_interspeech.pdf
---

# RAISE: Resolving Ambiguity in Audio Understanding with Imagination and Selective Extraction

*Yueqian Lin, Qinsi Wang, Yudong Liu, Hancheng Ye, Hai Li, Yiran Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1739)

**Category:** `audio-understanding` · **Labels:** `generative-model`

**TL;DR** — RAISE is a training-free framework that equips Audio LLMs with a semantic router, generative auditory imagination, and selective extraction to resolve perceptual ambiguities at inference time, yielding up to a 12.4% accuracy gain on MMAR and MMAU benchmarks.

## Key contributions

- Formulates audio understanding as an active perception process using inference-time tool invocation instead of relying on brittle single-pass forward passes over ambiguous internal representations.
- Proposes a lightweight, zero-shot text-only Semantic Router (using GPT-4o-mini) that routes queries to DIRECT, IMAGINE, or EXTRACT strategies, successfully bypassing expensive tools on 75-82% of samples.
- Implements Auditory Imagination (using Stable Audio Open 1.0) to synthesize comparative reference audio clips for semantic discrimination and candidate verification.
- Implements Selective Extraction (using SAM-Audio with an energy threshold of 0.01) driven by LLM-generated physical acoustic descriptions to isolate target signals from background interference.
- Demonstrates robust double-digit and absolute gains across multiple backbone models (Qwen2-Audio, Qwen2.5-Omni, and Qwen3-Omni) on MMAR and MMAU without requiring any parameter updates or model fine-tuning.

## Problem

Audio Large Language Models frequently break down and hallucinate when encountering acoustic interference, overlapping speakers, or fine-grained acoustic ambiguity, such as the classic cocktail party scenario. Standard architectures rely on a rigid, single-pass forward pass that forces the model to guess from unverified internal representations without any mechanism to isolate targets or verify perceptions against raw signals. Prior modular tool-use approaches and offline augmentations fail to apply verification at inference time, leaving models brittle on recent complex reasoning benchmarks like MMAR and MMAU.

## Method

RAISE decomposes inference into three sequential stages: Semantic Routing, Tool-Augmented Instantiation, and Contextual Inference. In Stage 1, a lightweight text-only router (GPT-4o-mini) maps the input query and candidate choices to one of three strategies (DIRECT, IMAGINE, EXTRACT) based on task semantics.

In Stage 2, if routing is not DIRECT, the framework instantiates evidence. Under Path A (Auditory Imagination, for semantic ambiguity), the Audio LLM validates answer choices against physical realizability, and Stable Audio Open 1.0 (50 steps, guidance scale 7.0, 5-second clips) synthesizes a selective acoustic lineup of reference sounds. Under Path B (Selective Extraction, for high noise/interference), the Audio LLM generates a preliminary physical description of target acoustic characteristics, which is fed into an open-vocabulary segmentation model (SAM-Audio with an energy threshold of 0.01) to filter the mixture into a clean target waveform.

In Stage 3 (Contextual Inference), the backbone Audio LLM evaluates the query conditioned on the new evidence. For imagination, it processes the original audio alongside the generated reference set Z to enable relative discrimination rather than absolute classification. For extraction, it evaluates the query against the cleaner isolated waveform x prime. Both paths feature graceful fallback to DIRECT if tool generation or energy thresholds fail.

## Experimental setup

The framework is evaluated on two challenging benchmarks, MMAR and MMAU, which target complex auditory reasoning and fine-grained perception. Backbone models tested include Qwen2-Audio-7B, Qwen2.5-Omni-7B, and Qwen3-Omni-30B-A3B-Thinking. Comparisons are made against single-pass direct baselines, Chain-of-Thought (CoT) prompting, and Self-Refine two-pass inference. Experiments run on NVIDIA H200 GPUs.

## Results

RAISE achieves consistent performance improvements across all tested backbone models, delivering up to a +12.4% absolute accuracy boost. On MMAR, Qwen2-Audio improves from 45.1% to 57.5% (+12.4%), Qwen2.5-Omni from 61.8% to 73.0% (+11.2%), and Qwen3-Omni from 69.3% to 79.5% (+10.2%). On MMAU, Qwen2-Audio rises from 57.4% to 65.0% (+7.6%), Qwen2.5-Omni from 75.9% to 81.1% (+5.2%), and Qwen3-Omni from 78.3% to 84.9% (+6.6%). Ablations reveal that static tool policies (forcing extraction or imagination on all samples) degrade performance below baseline (dropping MMAR to 54.9% and 66.7% respectively) due to loss of context or mismatched generation, proving the absolute necessity of the semantic router. Gains are concentrated in perception (+12.6%), temporal reasoning (+26.8%), harmony (+15.1%), and emotion summarization (+18.2%). The primary limitation in regressions stems from Selective Extraction stripping necessary ambient context (like reverberation cues) or Auditory Imagination producing overly narrow references.

| Dataset | Model | Baseline (%) | RAISE (%) | Delta (%) |
|---|---|---|---|---|
| MMAR | Qwen2-Audio | 45.1 | 57.5 | +12.4 |
| MMAR | Qwen2.5-Omni | 61.8 | 73.0 | +11.2 |
| MMAR | Qwen3-Omni | 69.3 | 79.5 | +10.2 |
| MMAU | Qwen2-Audio | 57.4 | 65.0 | +7.6 |
| MMAU | Qwen2.5-Omni | 75.9 | 81.1 | +5.2 |
| MMAU | Qwen3-Omni | 78.3 | 84.9 | +6.6 |

## Limitations

The framework relies heavily on the quality and fidelity of external off-the-shelf generative and separation tools, which can fail or introduce artifacts if misconfigured. It incurs additional runtime latency for routed samples (averaging 9.1s on MMAR and 7.6s on MMAU amortized cost), though this is mitigated by the router bypassing tools on roughly 75% to 82% of queries. The scope is bounded by the capabilities of current open-vocabulary audio generators and segmenters, which may struggle with highly specialized, rare, or out-of-domain acoustic mixtures.

## Why read this

Speech and ML researchers working on Audio LLMs and multimodal reasoning should read this paper to learn how to convert passive black-box generators into active perceivers using zero-shot semantic routers and inference-time tool grounding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust audio understanding systems, complex multimedia question answering, automated acoustic surveillance, and fine-grained speech/sound event analysis in noisy environments.

## Institutions / 機構

Duke University

**Funding / 經費:** National Science Foundation, Army Research Office

## Related

- (link related pages by id as the wiki grows)
