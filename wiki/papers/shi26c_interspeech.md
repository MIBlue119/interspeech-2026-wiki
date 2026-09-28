---
id: shi26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-877
pdf: https://www.isca-archive.org/interspeech_2026/shi26c_interspeech.pdf
---

# Entropy-Aware Domain-Routed Mixture-of-Experts Speech-LLM Framework: A Case Study of Multi-Domain Child-Adult ASR

[PDF](https://www.isca-archive.org/interspeech_2026/shi26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-877)

**TL;DR** — The paper introduces an entropy-aware domain-routed Mixture-of-Experts Speech-LLM framework that achieves unified high-performance ASR across diverse adult and child speech domains.

## Problem

Speech LLMs excel at adult automatic speech recognition but struggle with child speech due to acoustic and linguistic divergence, while standard adaptation approaches often degrade adult performance. Furthermore, variance across child age groups and recording environments creates routing uncertainty and domain mismatch that single models or naive multi-domain setups fail to resolve.

## Method

The framework uses a Classifier-based Domain Router (C-DR) with a coarse-to-fine strategy combining multi-layer encoder representations via learnable weights to handle hierarchical domain variations. It integrates both a Mixture-of-Projectors (MoP) and a Mixture-of-LoRAs (MoL) to capture acoustic and linguistic differences across expert domains. To resolve routing uncertainty near domain boundaries, an Entropy-Aware Routing (EAR) mechanism calculates normalized entropy over routing probabilities to dynamically blend domain-specific experts with a shared expert trained on aggregated data.

## Results

Evaluated on MyST, OGI-S (split into age groups 4-7, 8-10, 11-15), and LibriSpeech test-clean, the proposed C-DR MoE with coarse-to-fine routing and soft routing combined with EAR achieves consistent WER reductions across child domains. Specifically, it drops word error rates on the challenging OGI-S 4-7 group down to 17.64% and MyST down to 10.28%, while preserving strong adult ASR performance on Libri-Clean at 1.61% WER. The approach outperforms zero-shot baselines, single-expert joint models, and vanilla-routing MoE counterparts.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building robust voice assistants, educational technology, or interactive child-facing systems that need to process diverse users ranging from young children to adults without performance degradation.

## Limitations

The current evaluation focuses primarily on English datasets and specific age-group boundaries, and routing logic relies on accurate domain definitions.

## Related

- (link related pages by id as the wiki grows)
