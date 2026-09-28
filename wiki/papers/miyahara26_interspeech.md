---
id: miyahara26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1886
pdf: https://www.isca-archive.org/interspeech_2026/miyahara26_interspeech.pdf
---

# Evaluating Zero-Shot Cross-Lingual Stuttering Detection Based on Self-Attention Weights of Temporal Acoustic Vector Sequence

[PDF](https://www.isca-archive.org/interspeech_2026/miyahara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/miyahara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1886)

**TL;DR** — This paper evaluates self-attention weight features extracted from temporal acoustic vector sequences for zero-shot cross-lingual stuttering event detection, achieving competitive or superior performance to existing models especially on linguistic disfluencies.

## Problem

Stuttering event detection (SED) models typically require large in-domain labeled corpora, limiting their deployment to no- or low-resource languages where such data is unavailable. While cross-lingual transfer has been attempted, acoustic variations and language-specific properties of disfluencies make zero-shot transfer extremely challenging. Overcoming this gap is vital to automate the laborious manual transcription required for speech therapy and to build accessible speech technologies for persons who stutter.

## Method

The approach utilizes self-attention weight features (SAWF), calculated as the normalized inner product matrix of temporal acoustic vector sequences across all time pairs, which efficiently capture acoustic repetitions and prolongations regardless of language. The paper extracts multi-layer SAWFs from three frozen 24-layer Transformer backbones: language-specific ASR fine-tuned wav2vec 2.0, multilingual self-supervised wav2vec 2.0 (xlsr-53), and the Whisper encoder. These multi-layer 2D feature maps are fed into a modified VGG-19 image recognition network—where standard dense layers are replaced by global average pooling—to perform multi-label SED across six categories (no disfluency, block, interjection, prolongation, sound repetition, and word repetition).

## Results

Evaluated using the SEP-28k (English), AS-70 (Mandarin), and KSoF (German) corpora, zero-shot cross-lingual models reached F1 scores attaining 77% to 98% of monolingual baseline performance. In zero-shot transfer tests to German, multi-source training (Mandarin and English to German) using Whisper and xlsr-53 backbones outperformed single-source transfers. Notably, the SAWF model outperformed the state-of-the-art StutterFuse model by 20 absolute percentage points in word repetition detection (0.41 vs 0.20 F1 score) due to its strong ability to capture linguistic structures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and clinicians developing automated stuttering severity assessment tools and speech recognition systems tailored for persons who stutter across multiple languages.

## Limitations

Zero-shot cross-lingual models show performance drops compared to monolingual models (roughly 20% relative decreases in blocks, interjections, and prolongations), and Whisper-based models struggle with interjections because filler words are frequently omitted in Whisper's original ASR text standardization training.

## Related

- (link related pages by id as the wiki grows)
