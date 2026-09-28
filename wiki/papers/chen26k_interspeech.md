---
id: chen26k_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1118
pdf: https://www.isca-archive.org/interspeech_2026/chen26k_interspeech.pdf
---

# Causal Tracing of Audio-Text Fusion in Large Audio Language Models

*Wei-Chih Chen, Chien-yu Huang, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1118)

**TL;DR** — This paper adapts causal tracing to Large Audio Language Models (LALMs) to reveal their internal multi-modal integration dynamics, showing that DeSTA uses progressive fusion, Qwen uses abrupt late-stage fusion, and the final sequence token acts as an informational bottleneck for audio retrieval.

## Key contributions

- Adapts the ROME causal tracing framework to LALMs using pure silence as a clean zero-information baseline to isolate acoustic contribution.
- Identifies divergent cross-modal fusion strategies across model families: progressive integration in DeSTA, late-stage fusion in Qwen, and early fusion in Voxtral.
- Reveals that the final sequence token serves as a critical information bottleneck where models decisively retrieve audio context for generation.
- Discovers an attention-like query mechanism at intermediate layers over object tokens that triggers the extraction of specific acoustic features.

## Problem

Although LALMs perform well across audio-text tasks, their internal mechanism for integrating continuous acoustic features with linguistic embeddings remains a black box. Prior research has relied entirely on macroscopic, task-level evaluations of final outputs—such as accuracy, bias, and hallucination—treating models end-to-end. Without understanding when across network depth and where across input sequences audio-text fusion actually occurs, the field lacks principles for efficient design, hallucination mitigation, and model interpretability.

## Method

The framework relies on three inference runs: a clean run with the original audio sequence $A$, a corrupted run replacing audio with pure silence $A_{	ext{corrupt}}$ (which eliminates acoustic context while preserving sequence length and prompt structure), and a patched run where cached clean hidden states $h_{	ext{clean}}^{(l)}$ or $h_{	ext{clean},i}^{(l)}$ are injected into the corrupted forward pass. Causal impact is quantified using the Recovery Rate (RR), measuring the restoration of target answer probability $P(y|A,T)$. Layer-wise tracing replaces all text token hidden states across a single layer $l$, while token-wise tracing isolates specific sequence positions partitioned into early prompt tokens, object tokens, late prompt tokens, and the final sequence token.

Evaluations span multiple architectures (DeSTA2, DeSTA2.5, Qwen, Qwen2, Voxtral) processing structured question-answering prompts (e.g., "What is the gender of the speaker... The speaker's gender is") designed to force the model to compute next-token probabilities over target classification choices. By systematically shifting patch locations across model depth and input token spans, the method isolates the exact layers and tokens responsible for multi-modal bridging.

## Experimental setup

Evaluations are conducted using the SAKURA dataset targeting four auditory attributes: animal, emotion, gender, and language. The study tests five prominent LALM architectures spanning distinct families: DeSTA2, DeSTA2.5, Qwen, Qwen2, and Voxtral. The primary evaluation metric is the Recovery Rate (RR) calculated from token probability shifts, filtering out samples where clean predictions fail or corrupted runs coincidentally match correct answers.

## Results

Layer-wise analysis demonstrates that DeSTA models exhibit progressive fusion, with recovery rates increasing gradually and stabilizing after layer 15. In contrast, Qwen models show polarized late-stage fusion, keeping causal impact near zero until a sharp rise in the final third of the network (layers 18 to 31). Voxtral achieves maximum recovery earlier, indicating an early-fusion strategy. Token-wise analysis consistently localizes peak recovery to the final sequence token across all models, acting as a universal information retrieval bottleneck. Furthermore, a secondary causal spike appears at intermediate layer object tokens (e.g., class option lists), indicating an attention-like query mechanism that triggers the extraction of specific target attributes.

## Limitations

The study focuses on classification and structured QA tasks via the SAKURA dataset, leaving open whether open-ended audio generation or complex multi-turn dialogue follow identical internal pathways. The investigated models are restricted to specific open-source families (DeSTA, Qwen, Voxtral), and the findings may not generalize directly to proprietary or drastically different architectures. Additionally, using silence as a corrupted baseline completely removes acoustic energy, which does not account for out-of-distribution acoustic degradation or background noise robustness.

## Why read this

Speech and ML researchers seeking to understand the mechanistic interpretability of multi-modal audio models should read this to see how causal tracing can map hidden information flow. It provides actionable insights into computational optimization (e.g., skipping early-layer processing in late-fusion models) and hallucination mitigation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Optimizing inference efficiency in late-fusion LALMs by bypassing redundant early-layer computations, and monitoring internal query mechanisms to detect and mitigate audio-text hallucinations.

## Related

- (link related pages by id as the wiki grows)
