---
id: so26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3203
pdf: https://www.isca-archive.org/interspeech_2026/so26_interspeech.pdf
---

# Toward Open-Set Speaker Attribute Prediction with Keyword-Appended LLM Embeddings

[PDF](https://www.isca-archive.org/interspeech_2026/so26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/so26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3203)

**TL;DR** — This paper proposes an open-set speaker attribute prediction framework leveraging LLM embeddings and a keyword-appending strategy, outperforming closed-set benchmarks on LibriTTS-P while enabling zero-shot synonym generalization.

## Problem

Traditional speaker attribute prediction relies on fixed categorical labels via multi-label classification, lacking semantic richness and zero-shot generalizability to unseen descriptors. Furthermore, mapping acoustic attributes directly into pretrained LLM embedding spaces causes semantic ambiguity in crowded regions. Overcoming these limitations is crucial for interpretable voice control in speech synthesis and recognition.

## Method

The framework uses an ECAPA-TDNN backbone to map speech audio to a continuous semantic space aligned with GPT-OSS-20B LLM embeddings (output dimension 2,880). To bridge the modality gap, a keyword-appending strategy tacks domain-specific terms (e.g., 'speech') onto attribute descriptors before obtaining text embeddings. A weighted cosine similarity loss accounts for annotator-provided attribute intensities (weights 1.5, 1.0, 0.5 for very, normal, slightly). Additionally, a top-k negative penalization loss with a softplus function and margin parameter separates confusable semantic regions.

## Results

Evaluated on LibriTTS-P across 44 attribute categories using micro-averaged F1 scores at thresholds 0.2 to 0.8, the proposed model achieves an optimal F1 of 0.7625 compared to 0.7286 for the closed-set baseline. On zero-shot synonym prediction using Gemini 3.1 Pro generated synonyms, the model maintains robust performance (F1 around 0.762 at lower thresholds). Ablations demonstrate that keyword-appending with 'speech' and top-k negative loss provide consistent performance gains over unconstrained spaces.

## Code

- https://github.com/jaejunL/vove

## Applications

Speech and ML engineers building controllable, interpretable text-to-speech (TTS) systems, voice conversion, or speaker recognition pipelines requiring transparent voice attribute conditioning.

## Limitations

Evaluation relies on synthetic synonyms derived via an LLM from a single annotated dataset (LibriTTS-P) due to the scarcity of open-source corpora with speaker-wise attribute labels.

## Related

- (link related pages by id as the wiki grows)
