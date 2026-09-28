---
id: mousi26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1980
pdf: https://www.isca-archive.org/interspeech_2026/mousi26_interspeech.pdf
---

# Said Aloud, Read Different: Cross-Modal Instability in Multimodal Models

[PDF](https://www.isca-archive.org/interspeech_2026/mousi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mousi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1980)

**TL;DR** — The paper introduces a speech-augmented culturally grounded benchmark of 10,150 contrastive triplets across 18 MENA countries to evaluate multimodal models, revealing that speech inputs and non-English languages drastically amplify triplet-level decision instability despite strong aggregate accuracy.

## Problem

Current speech-first multimodal assistants are typically evaluated using aggregate accuracy on individual statements, which obscures whether models make consistent grounded judgments when presented with semantically equivalent queries across different modalities (text vs. speech) and languages (English vs. Arabic). Modality is not a neutral channel, and switching from text to speech can introduce subtle reasoning failures, fragmented logic, and hallucination-like behaviors that standard accuracy metrics fail to capture. To address this, the authors investigate whether visually grounded decisions remain consistent within a contrastive framework that forces models to discriminate between supported statements and plausible distractors.

## Method

The authors curate a visually grounded dataset spanning 18 Middle Eastern and North African (MENA) countries across themes like architecture, cuisine, and traditional clothing, resulting in 10,150 contrastive triplets (each comprising one visually supported statement and two plausible unsupported alternatives). They translate English statements into Arabic and generate natural zero-shot neural speech variants using matched male and female reference voices, further applying acoustic noise and reverberation perturbations for stress testing. They evaluate several multimodal foundation models supporting text and speech (Qwen2.5-Omni 3B/7B, Qwen3-Omni-30B, and Phi-4-multimodal-instruct) using vLLM-Omni under greedy decoding. They propose Contrastive Instability (CI), a conditional metric measuring the rate of internal inconsistency among triplets where the model achieves at least partial success.

## Results

Evaluating models on accuracy, F1, and Contrastive Instability (CI), the authors find that speech input substantially increases CI compared to text (e.g., Qwen2.5-3B Arabic CI rises from 0.43 in text to 0.71 in speech), demonstrating that speech degrades contrastive discrimination. Arabic consistently exhibits higher instability than English across all models, with the cross-lingual gap widening further under speech. While scaling models (up to Qwen3-30B) and employing joint speech-text signaling improve robustness and mitigate instability, they do not fully restore text-level coherence. Acoustic noise scaling tests further reveal that lower signal-to-noise ratios degrade consistency more severely in Arabic than in English.

## Code

- https://huggingface.co/datasets/QCRI

## Applications

Speech-first AI engineers and developers building multilingual, visually grounded multimodal assistants can use this benchmark and metric to diagnose and improve cross-modal robustness and cultural reasoning consistency.

## Limitations

The evaluation is scoped to English and Arabic across selected open-source omni-multimodal models and synthesized speech modalities.

## Related

- (link related pages by id as the wiki grows)
