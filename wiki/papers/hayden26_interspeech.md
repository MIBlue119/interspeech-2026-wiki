---
id: hayden26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2749
pdf: https://www.isca-archive.org/interspeech_2026/hayden26_interspeech.pdf
---

# Accent-Emotion Entanglement in LM-Based Text-to-Speech Systems

[PDF](https://www.isca-archive.org/interspeech_2026/hayden26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hayden26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2749)

**TL;DR** — This paper identifies accent-emotion entanglement in LLM-based zero-shot text-to-speech, showing that emotional instructions can unintentionally alter a speaker's accent despite high standard speaker similarity scores.

## Problem

Zero-shot text-to-speech systems are frequently evaluated using simple automated speaker similarity metrics that fail to capture fine-grained characteristics like accent fidelity. The authors identify an overlooked phenomenon termed accent-emotion entanglement, where conditioning a model on specific emotions inadvertently distorts or hallucinates accents. This failure mode matters because it can mask critical synthesis errors and propagate harmful cultural or demographic stereotypes in synthetic media.

## Method

The study evaluates two prominent zero-shot TTS architectures: CosyVoice2 (built on the Qwen2.5-0.5B LLM, which accepts text instruction prompts for emotions) and MaskGCT (which relies purely on reference audio). Using the MEAD audio-visual dataset containing actors portraying happy, angry, and neutral emotions across intensity levels, the authors generate thousands of utterances from multiple reference speakers. They pass these synthesized outputs through GenAID—an accent recognition system—extracting accent embeddings from its penultimate layer to perform UMAP visualizations, entropy calculations, and cosine distance measurements against ground-truth centroids.

## Results

Subjective listening tests via Accent Mean Opinion Scores (SMOS) rated by 30 native English speakers demonstrate severe accent degradation in CosyVoice2, with scores ranging widely from 1.17 to 4.13 and high standard deviations averaging 1.16 compared to MaskGCT's stable 0.26. Objective cosine distance measurements to system centroids confirm that CosyVoice2 exhibits substantially higher accent variability across all test conditions. UMAP visualizations reveal that while MaskGCT embeddings cluster tightly around North American references, CosyVoice2 utterances drift into distinct regional accent clusters depending on the requested emotion.

## Code

- https://accemoentangle.github.io/

## Applications

Speech engineers and researchers designing zero-shot text-to-speech or conversational voice models can use these targeted subjective and objective evaluation protocols to audit their systems for unintended accent shifts.

## Limitations

The subjective evaluation was constrained to a single baseline reference speaker due to budget limitations, and only evaluated English-language prompts across three emotions.

## Related

- (link related pages by id as the wiki grows)
