---
id: varadhan26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3366
pdf: https://www.isca-archive.org/interspeech_2026/varadhan26_interspeech.pdf
---

# IN-F5: Adapting an English TTS Foundation Model for Multilingual and Zero-Resource Indian Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/varadhan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/varadhan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3366)

**TL;DR** — The paper introduces IN-F5, adapting an English TTS foundation model for 11 Indian languages using direct fine-tuning on less than 2% of the original pretraining scale, achieving near-human naturalness and robust zero-shot cross-lingual capabilities.

## Problem

State-of-the-art TTS advancements like high naturalness and voice cloning are predominantly confined to English due to massive compute and large-scale data requirements. Extending these capabilities to low-resource Indian languages spoken by over a billion people remains challenging, as prior work focuses primarily on basic intelligibility rather than emergent cross-lingual and expressive behaviors.

## Method

The authors adapt the F5-TTS architecture by extending its token vocabulary to 685 raw character tokens covering 11 Indian native scripts, eliminating grapheme-to-phoneme conversion. Latent embeddings are initialized by sampling from the 100K-hour English pretrained checkpoint space. Three adaptation strategies are compared: training from scratch, direct fine-tuning on Indian data alone, and mixed fine-tuning with continued English exposure. Training uses the AdamW optimizer with a learning rate of 5e-5, batch size of 30,000 frames per GPU, and mixed precision on 32 NVIDIA H100 GPUs for up to 150K steps.

## Results

Using a 1417-hour dataset across 11 Indian languages (IN11), direct fine-tuning achieved an overall MUSHRA naturalness score of 73.4, outperforming fine-tuning with mixed English data (69.7) and training from scratch (43.2). For seen speakers, IN-F5 reached a naturalness score of 78.0 and speaker similarity of 86.8, rivaling human reference recordings (75.9 and 84.6). Zero-resource cross-lingual transfer to Tulu and Bhojpuri yielded MUSHRA scores as high as 93.6 using related script priors and human-in-the-loop filtering.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building inclusive, low-resource speech technology, voice cloning, and multilingual conversational interfaces for Indian languages.

## Limitations

Zero-resource language bootstrapping relies on related-script priors and text corpora alongside human verification to ensure correctness.

## Related

- (link related pages by id as the wiki grows)
