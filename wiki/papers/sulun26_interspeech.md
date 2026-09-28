---
id: sulun26_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/sulun26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/sulun26_interspeech.pdf
---

# Lightweight Emotion Recognition with Disjoint Modality Fusion

[PDF](https://www.isca-archive.org/interspeech_2026/sulun26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sulun26_interspeech.html)

**TL;DR** — Light-DMF is a lightweight, disjoint multimodal speech emotion recognition model with under 65k trainable parameters that achieves faster-than-real-time CPU inference.

## Problem

Modern speech emotion recognition systems rely on large models and heavy multimodal fusion architectures, rendering them too computationally expensive for resource-constrained consumer hardware. Furthermore, real-world conversational data often features conflicting emotional cues between audio tone and textual content, or missing modalities altogether, which standard models fail to handle flexibly.

## Method

The architecture utilizes frozen Distil-Whisper-large-v3 for audio feature extraction and all-MiniLM-L6-v2 for text embedding, eliminating the overhead of a separate ASR pipeline by probing Whisper internal activations. It employs four learned sentinel vectors combined with zero-padding and masking to natively handle mixed-modality training data where audio, text, or both might be absent or mismatched. Separate self-attention pathways process audio and text independently, while a unidirectional audio-to-text cross-attention fuses the features, using shared key-value pairs and a low hidden dimension of 32 with 4 attention heads to keep trainable parameters under 65k. The model outputs three distinct predictions—audio-only, text-only, and fused—by minimizing a multi-task cross-entropy loss weighted equally across available modalities.

## Results

Trained and evaluated on a mixture of datasets including IEMOCAP, MELD, CREMA-D, RAVDESS, TESS, and GoEmotions mapped to five unified emotion classes (angry, excited, happy, neutral, sad). The model achieves a real-time factor of 0.81 on a CPU-only Intel Core i7-5600U for one minute of input audio. It successfully operates with fewer than 65k trainable parameters while supporting arbitrary combinations of missing or conflicting audio-text modalities.

## Code

- https://sulun.org/lightdmf

## Applications

Engineers and developers building resource-efficient, real-time emotion recognition tools for healthcare, education, and multimedia analysis on consumer CPUs or edge devices.

## Limitations

The model relies on frozen large upstream feature extractors (Distil-Whisper and MiniLM) which limits end-to-end adaptation of the base representations.

## Related

- (link related pages by id as the wiki grows)
