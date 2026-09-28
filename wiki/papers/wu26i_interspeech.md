---
id: wu26i_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2029
---

# AFG-Bias: Acoustic-Fusion-Gated Biasing for Plug-and-Play Hotword Customization in LLM-Based ASR

**TL;DR** — AFG-Bias grounds hotword biasing for LLM-based ASR in acoustic evidence rather than prompt injection, cutting character error rates by up to 74% in financial and medical domains without modifying the LLM's parameters.

## Problem

LLM-based ASR achieves strong general transcription but struggles with rare, domain-specific entities, and prior biasing methods either need architecture-specific training or rely on prompt injection, which suffers from scale collapse and hallucination as the hotword list grows.

## Method

AFG-Bias is a plug-and-play framework that grounds hotword biasing in acoustic evidence: Cross-Modal Acoustic Retrieval selects relevant hotwords from a large candidate list via sliding-window alignment, and Acoustic-Fusion Gating injects verified bias into decoding while suppressing hallucinations, all without touching the underlying LLM's parameters.

## Results

Across three LLM-ASR backbones, AFG-Bias achieves up to 74.1% relative CER reduction in financial and medical domains and improves AISHELL-1 hotword F1 by up to 5.4 points absolute.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Customizable domain-specific entity recognition (financial terms, medical terminology, product names) for enterprise ASR deployments built on LLM-based backbones.

## Related

- (link related pages by id as the wiki grows)
