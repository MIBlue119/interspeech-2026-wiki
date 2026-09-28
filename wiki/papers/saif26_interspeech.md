---
id: saif26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2771
pdf: https://www.isca-archive.org/interspeech_2026/saif26_interspeech.pdf
---

# BELLA: Efficient Bilevel Learning with LoRA for Multilingual ASR

[PDF](https://www.isca-archive.org/interspeech_2026/saif26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/saif26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2771)

**TL;DR** — BELLA is an efficient bilevel learning framework for multilingual speech recognition that couples a Whisper encoder with a Qwen-family LLM decoder using a router, mixture-of-experts LoRA adapters, and an alignment bridge.

## Problem

Integrating speech encoders with large language models for multilingual automatic speech recognition often causes cross-language interference, where high-resource languages dominate and destabilize training. Traditional fine-tuning struggles to balance acoustic-text alignment with language-specific prediction tasks. A structured optimization approach is required to manage this bidirectional coupling without performing expensive full-model LLM retraining.

## Method

The framework utilizes a Whisper ASR encoder, a frozen Qwen2.5 7B LLM decoder, a bridge network, a shared adapter, and decoder-side MoE-LoRA expert adapters controlled by a routing mechanism. Training is formulated as a bilevel optimization problem: the lower level minimizes an alignment objective via embedding regression, cross-modal distillation, and weight decay on the bridge and shared adapter, while the upper level minimizes the ASR negative log-likelihood alongside load-balancing and entropy penalties on the router and expert LoRAs. An efficient single-loop penalty solver alternates updates between the lower and upper parameters without requiring expensive value-function inner loops.

## Results

Evaluated on five languages from the CoVoST 2 dataset, BELLA demonstrates consistent improvements over strong multilingual ASR baselines. The method effectively mitigates cross-language interference by combining task-specific routing with robust cross-modal feature alignment. Ablations confirm the importance of isolating alignment-driven modules at the lower level while optimizing prediction-driven adapters at the upper level.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers building multilingual automatic speech recognition systems powered by large language models.

## Related

- (link related pages by id as the wiki grows)
