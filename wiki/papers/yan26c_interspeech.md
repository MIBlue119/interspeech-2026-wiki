---
id: yan26c_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1278
---

# Probing and Mitigating Hallucinations in Speech-augmented Language Models for Automatic Speech Recognition via Small Language Models

**TL;DR** — Causal-mediation probing traces ASR hallucinations in speech-augmented LLMs to excessive self-attention bias toward textual tokens, motivating AudioSLM, a compact small-language-model-based ASR framework that considerably eases hallucinations and beats some LLM-based ASR models.

## Problem

Speech-augmented language models (SLMs) extend LLM reasoning to spoken input but remain susceptible to hallucinations, posing challenges to practical ASR utility, and the internal cause of these hallucinations was unclear.

## Method

The authors first probe hallucinations in SLMs for ASR via causal mediation and behavioral analysis, then propose AudioSLM, a compact ASR framework built on a small language model that leverages alignment cues and cross-attention layers to jointly strengthen acoustic modeling and cross-modal interaction.

## Results

Experiments on LibriSpeech reveal hallucinations arise from multi-head self-attention modules with excessive attention bias toward textual tokens, and AudioSLM considerably eases ASR hallucinations while outperforming some LLM-based ASR models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Provides a compact, less hallucination-prone alternative to large LLM-based ASR systems for applications needing reliable transcription with lower compute cost.

## Related

- (link related pages by id as the wiki grows)
