---
id: park26l_interspeech
category: speech-emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3486
pdf: https://www.isca-archive.org/interspeech_2026/park26l_interspeech.pdf
---

# Prosody-Aware Speech Representations for Emotion Recognition under Pragmatic Ambiguity

[PDF](https://www.isca-archive.org/interspeech_2026/park26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3486)

**TL;DR** — Injecting explicit pitch and energy features into a frozen Whisper encoder dramatically improves speech emotion recognition under pragmatic ambiguity, raising subset accuracy by 13.93%p and PAR performance by 11.6%p.

## Problem

Standard speech emotion recognition (SER) models and speech-to-text encoders prioritize semantic abstraction, which suppresses the fine-grained prosodic variations essential for identifying emotional intent in pragmatically ambiguous utterances. Conventional evaluation metrics like Hamming accuracy compress model differences, hiding the reality that large speech encoders often fail to resolve emotional ambiguity when lexical and acoustic cues conflict.

## Method

The authors use a frozen whisper-large-v3-turbo backbone to extract frame-level hidden representations, combining them with temporal-interpolated, threshold-linearized F0 and energy features extracted via Librosa and Parselmouth. These combined features are projected into a shared space and processed by a downstream classification head consisting of two Transformer encoder layers and three linear layers for multi-label prediction. Training uses a Korean emotional speech dataset (AI-Hub) comprising 457 hours across 59 emotion classes optimized with Binary Cross-Entropy loss and the AdamW optimizer.

## Results

Evaluated on a 59-class validation set and a custom unseen Pragmatic Ambiguity Resolution (PAR) test set of 1,000 Korean utterances where multimodal and text labels disagree. While Hamming accuracy showed minimal variation across models (96-98 range), subset accuracy and PAR exposed large gaps; baseline Whisper-large-v3-turbo achieved a subset accuracy of 12.46 and PAR of 21.00. Injecting F0 and energy into Whisper boosted subset accuracy to 26.39 (+13.93%p) and PAR to 32.60 (+11.6%p), outperforming text-based context conditioning and matching a strong text-based LLM baseline (GPT-4o mini at 31.10 PAR).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building emotion-aware subtitle generation, spoken dialogue systems, or voice assistants that must correctly interpret sarcasm, hesitation, or emotional subtext when lexical content is ambiguous.

## Limitations

The benefits of prosody injection scale with model capacity, showing limited effectiveness when applied to smaller Whisper architectures.

## Related

- (link related pages by id as the wiki grows)
