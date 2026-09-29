---
id: shi26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-877
pdf: https://www.isca-archive.org/interspeech_2026/shi26c_interspeech.pdf
---

# Entropy-Aware Domain-Routed Mixture-of-Experts Speech-LLM Framework: A Case Study of Multi-Domain Child-Adult ASR

*Mohan Shi, Kaiyuan Zhang, Zilai Wang, Natarajan Balaji Shankar, Eray Eren, Abeer Alwan*

[PDF](https://www.isca-archive.org/interspeech_2026/shi26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-877)

**Category:** `asr`

**TL;DR** — The paper introduces an Entropy-Aware Domain-Routed Mixture-of-Experts Speech-LLM framework (C-DR MoE with EAR) that unifies adult and child Automatic Speech Recognition (ASR) across diverse age groups and acoustic environments. It achieves a Word Error Rate (WER) of 17.64% on the OGI-S 4-7 age group and 8.58% on MyST, outperforming single-expert baselines without degrading adult speech performance.

## Key contributions

- Integrates both a Mixture-of-Projectors (MoP) and a Mixture-of-LoRAs (MoL) to jointly capture domain-specific acoustic characteristics and LLM-side linguistic variations.
- Proposes a Classifier-based Domain Router (C-DR) with a coarse-to-fine hierarchical strategy to distinguish between coarse domains (adult vs. child, environments) and fine sub-domains (child age groups).
- Introduces Entropy-Aware Routing (EAR) to dynamically blend a multi-domain shared expert based on routing uncertainty, mitigating errors near ambiguous domain boundaries.
- Demonstrates the first successful application of a unified Speech-LLM to public child ASR corpora (MyST and OGI-S) alongside adult benchmarks (LibriSpeech) without cross-domain performance degradation.

## Problem

Speech Large Language Models (Speech-LLMs) excel at adult ASR under clean conditions but fail on child speech due to vast acoustic-linguistic differences and scarce annotated data. Adapting a standard model to child speech via fine-tuning causes catastrophic forgetting and degrades adult speech performance. Furthermore, high acoustic and developmental variance across child age groups (e.g., ages 4-7 vs. 11-15) and recording environments prevents a single monolithic model or unguided MoE from robustly handling all domains simultaneously.

## Method

The framework builds upon the Canary-Qwen Speech-LLM backbone (frozen speech encoder and LLM parameters). Instead of a single adapter, it instantiates 5 domain experts (MyST, 3 OGI-S age groups: 4-7, 8-10, 11-15, and LibriSpeech). Each expert comprises a domain-specific modality projector and LoRA modules applied across LLM decoder layers (MoP + MoL). A Classifier-based Domain Router (C-DR) uses learnable layer weights over multi-layer encoder representations followed by a coarse-to-fine architecture (first classifying coarse dataset/environment domains, then fine child age sub-domains).

To handle routing uncertainty near domain boundaries where acoustic overlaps occur (e.g., transitional ages), Entropy-Aware Routing (EAR) computes the normalized entropy $H_{norm}(p)$ of the C-DR probability distribution. Under soft routing, high entropy dynamically interpolates the standard routed output with a shared expert trained on data aggregated from multiple domains. During training, the encoder and LLM are frozen; domain experts are trained with ground-truth hard routing, while the router uses weighted-sum encoder representations.

During inference, the input speech is fed into the frozen encoder, passed to the C-DR to obtain routing probabilities, routed through the mixture of projectors and LoRAs (with EAR soft-blending if uncertainty is high), and decoded into transcriptions by the LLM.

## Experimental setup

Evaluated on child speech corpora MyST (8-10 year olds with virtual tutors) and spontaneous OGI-S (split into age groups 4-7, 8-10, 11-15), plus the LibriSpeech test-clean subset (Libri-Clean) for adult speech. Baselines include zero-shot Canary-Qwen, a jointly fine-tuned single-expert model, and vanilla-routing MoEs with trainable gating networks. Models are trained on a single NVIDIA A6000 GPU using AdamW (peak LR 1e-4, cosine schedule, 500 warmup steps, 60k total steps, batch size 2, gradient accumulation 8). Evaluation metric is Word Error Rate (WER).

## Results

The proposed C-DR MoE with weighted-layer coarse-to-fine classification and EAR soft routing achieves a WER of 17.64% on OGI-S (Age 4-7), 10.28% (Age 8-10), 8.62% (Age 11-15), 11.08% average on OGI-S, 8.58% on MyST, and 1.61% on Libri-Clean. It consistently outperforms vanilla-routing MoE (which yields 12.08% to 12.89% average OGI-S WER) and single-expert baselines (13.63% average OGI-S WER, which severely harms Libri-Clean with 2.26% WER). Ablation studies show that removing either MoP or MoL degrades performance across all age groups (e.g., MoP-only yields 18.94% on OGI-S 4-7 compared to 18.65% for the full model under ground-truth routing). The model does not outperform dataset-specific single-dataset upper bounds (fine-tuning the entire encoder + projector + LoRA, which achieves 17.32% on OGI-S 4-7).

| System / Condition | OGI-S (4-7) | OGI-S (8-10) | OGI-S (11-15) | OGI-S Avg. | MyST | Libri-Clean |
| --- | --- | --- | --- | --- | --- | --- |
| Zero-shot Canary-Qwen | 24.97 | 14.86 | 13.34 | 16.31 | 8.96 | 1.61 |
| Single-Expert Baseline | 20.35 | 12.50 | 11.07 | 13.63 | 9.27 | 2.26 |
| Vanilla-Routing MoE (Joint) | 20.30 | 11.55 | 10.37 | 12.89 | 8.74 | 2.37 |
| C-DR MoE (Hard, Coarse-to-Fine) | 18.43 | 10.41 | 8.66 | 11.32 | 8.58 | 1.61 |
| C-DR MoE + EAR (Soft, Proposed) | 17.64 | 10.28 | 8.62 | 11.08 | 8.58 | 1.61 |
| Single Dataset Upper-Bound | 17.32 | 10.45 | 8.34 | 10.93 | 8.34 | - |

## Limitations

The framework relies on predefined domain and age boundaries for expert configuration rather than discovering domains in an entirely unsupervised manner. Evaluation is restricted to English corpora (MyST, OGI-S, LibriSpeech) and relies on fixed acoustic settings, leaving multi-lingual child ASR and extreme noise robustness unaddressed. Furthermore, parameter counts increase slightly due to domain-specific expert modules, and performance remains bounded by the capacity of the frozen base Speech-LLM encoder.

## Why read this

Researchers building multi-domain or child-adapted Speech-LLMs should read this paper to see how explicit coarse-to-fine routing and entropy-aware expert blending solve catastrophic forgetting and boundary ambiguity without retraining the backbone encoder.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Unified speech recognition systems for educational software, children's interactive voice assistants, and multi-demographic speech transcription pipelines.

## Institutions / 機構

University of California, Los Angeles

**Funding / 經費:** National Science Foundation, Institute of Education Sciences, U.S. Department of Education

## Related

- (link related pages by id as the wiki grows)
