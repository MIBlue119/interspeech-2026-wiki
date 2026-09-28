---
id: annamdevula26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1744
pdf: https://www.isca-archive.org/interspeech_2026/annamdevula26_interspeech.pdf
---

# CrossAccent-TTS: Cross-Lingual Accent-Intensity Controllable Text-to-Speech via Disentangled Speaker and Accent Representations

[PDF](https://www.isca-archive.org/interspeech_2026/annamdevula26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/annamdevula26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1744)

**TL;DR** — CrossAccent-TTS introduces an accent intensity controller and adversarial suppression module for LLM-based text-to-speech, enabling fine-grained, continuous control over accent strength and cross-lingual accent conversion while preserving speaker identity.

## Problem

Disentangling speech accent from speaker-specific attributes like pitch and timbre is exceptionally difficult, and mainstream LLM-based TTS systems lack explicit, fine-grained control over accent characteristics and intensity. This limitation is particularly prominent in low-resource and phonetically diverse Indic languages, where uncontrolled accents can either sound inauthentic or degrade intelligibility.

## Method

The framework utilizes Neucodec as an FSQ-based neural speech codec operating at 50 tokens per second to convert audio into discrete acoustic tokens. A Perceiver Resampler with 32 latent slots and a 768-dimensional bottleneck encodes reference speaker and style features into fixed-length representations. An adversarial Accent Suppression Module uses a gradient reversal layer (GRL) with a weight of 0.1 to strip language and accent information from the speaker embeddings. An Accent Intensity Controller injects learnable, weighted language embeddings into the accent subspace, allowing linear interpolation of accent intensities. Finally, a Qwen 2.5 (0.5B) autoregressive decoder conditions on both text tokens and the combined speaker-language representations to predict output acoustic tokens.

## Results

Evaluated on a 986-hour multilingual Indic corpus (Hindi, Telugu, Tamil, Bengali, Marathi, English) and the 27-hour L2 Arctic dataset across 24 speakers, CrossAccent-TTS is compared against baselines including IndicF5, XTTS-v2, CVAE, and GST. The proposed model achieves lower accent leakage (e.g., 0.203 vs 0.312/0.284 on Indic data) and superior accent similarity, while maintaining strong speaker similarity (0.842 Resemblyzer score) and competitive UTMOS speech quality (3.181). Subjective MOS tests confirm that listeners perceive higher target accent similarity under controlled scaling intensities of 0, 0.3, 0.6, and 1.0.

## Code

- https://research.sri-media-analysis.com/interspeech26-cross-accent-tts/

## Applications

Engineers and developers building conversational bots, voice dubbing systems, and personalized text-to-speech applications requiring precise control over non-native (L2) or regional accents.

## Related

- (link related pages by id as the wiki grows)
