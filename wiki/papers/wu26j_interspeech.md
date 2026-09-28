---
id: wu26j_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2037
---

# AuscuTSLM: Patient-Level Multimodal Question Answering from Multi-Site Auscultation Recordings

**TL;DR** — Aligning recordings from multiple auscultation sites on a patient's body directly with a frozen LLM's embedding space via gated cross-attention gives state-of-the-art patient-level diagnostic question answering, beating general-purpose audio-language models.

## Problem

Auscultation is a vital diagnostic tool but its utility is limited by subjective interpretation, and general-purpose Audio-Language Models struggle with the specific nuances of physiological signals like heart and lung sounds.

## Method

The authors propose AuscuTSLM, a framework that aligns multi-site auscultation recordings directly with a frozen LLM embedding space via gated cross-attention, moving beyond isolated per-site classification toward holistic, patient-level assessment that leverages the LLM's latent world knowledge.

## Results

On the CaReSound benchmark, the model achieves a state-of-the-art 0.865 F1-macro and 0.952 BERTScore, with lightweight domain-specific encoders rivaling large-scale ALMs, and multi-site aggregation providing spatial redundancy that mitigates temporal truncation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical decision-support tools that interpret multi-site auscultation recordings for patient-level diagnostic question answering.

## Related

- (link related pages by id as the wiki grows)
