---
id: lin26i_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1739
pdf: https://www.isca-archive.org/interspeech_2026/lin26i_interspeech.pdf
---

# RAISE: Resolving Ambiguity in Audio Understanding with Imagination and Selective Extraction

[PDF](https://www.isca-archive.org/interspeech_2026/lin26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1739)

**TL;DR** — RAISE is a training-free framework that equips Audio LLMs with inference-time selective extraction and auditory imagination, yielding accuracy gains of up to 12.4% on complex audio understanding benchmarks without any parameter updates.

## Problem

State-of-the-art Audio LLMs frequently suffer from perceptual hallucinations and brittleness when processing acoustically ambiguous or noisy mixtures because they rely on single-pass inference over corrupted internal representations. This limits their ability to handle fine-grained auditory tasks like source counting, subtle timbre comparison, and speech recognition in heavy interference. Standard chain-of-thought prompting or self-refinement cannot fix these failures because reasoning over flawed perception yields uncorrected errors.

## Method

RAISE decomposes inference into a three-stage pipeline consisting of Semantic Routing, Tool-Augmented Instantiation, and Contextual Inference. A zero-shot lightweight text router (GPT-4o-mini) classifies incoming queries into Direct, Imagine, or Extract paths based on task semantics, avoiding redundant audio-encoding passes. For the imagination path, Stable Audio Open 1.0 synthesizes candidate acoustic references from validated answer choices to enable relative comparative discrimination. For the extraction path, SAM-Audio isolates the target signal using descriptive characteristics derived from preliminary LLM analysis. The backbone Audio LLMs (Qwen2-Audio-7B, Qwen2.5-Omni-7B, and Qwen3-Omni-30B-A3B-Thinking) then perform contextual inference conditioned on this instantiated physical evidence.

## Results

Evaluated on the MMAR and MMAU benchmarks, RAISE achieves absolute accuracy improvements ranging from +5.2% to +12.4% across all tested Qwen backbone models. On Qwen3-Omni, RAISE boosts performance to 79.5% on MMAR and 84.9% on MMAU, with outsized gains in temporal reasoning (+26.8%) and perception (+12.6%). Error dynamics demonstrate high correction-to-regression ratios between 3:1 and 5:1 (e.g., 133 corrections vs. 31 regressions on MMAR). The semantic router successfully bypasses expensive tool usage for 75.8% to 82.2% of queries, keeping amortized overhead low at 7.6 to 9.1 seconds per sample on NVIDIA H200 GPUs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio and machine learning engineers building robust multimodal speech and audio assistants for complex acoustic environments, multimedia analysis, and fine-grained auditory reasoning.

## Limitations

The framework incurs additional inference latency on routed samples due to external tool execution and remains bounded by the performance limitations of the underlying audio generators and source separation models.

## Related

- (link related pages by id as the wiki grows)
