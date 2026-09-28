---
id: murata26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-208
pdf: https://www.isca-archive.org/interspeech_2026/murata26_interspeech.pdf
---

# Exploring Pre-training Benefits on Phoneme Addition through Fine-tuning in Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/murata26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/murata26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-208)

**TL;DR** — Pre-trained text-to-speech models improve voice naturalness during fine-tuning with new phonemes, but offer limited benefits for acquiring the target phonemes themselves compared to training from scratch.

## Problem

Transfer learning is standard practice for low-resource text-to-speech, often requiring models to expand their phoneme inventory with unseen target phonemes during fine-tuning (phoneme addition). However, it remains unclear whether pre-trained phoneme knowledge actually facilitates the acquisition of these new phonemes or merely improves overall acoustic quality. Determining this helps optimize low-resource TTS recipes and data requirements.

## Method

The study evaluates phoneme addition using a Conformer-FastSpeech2 (CFS2) architecture implemented via ESPnet, coupled with a pre-trained HiFi-GAN vocoder. Two experimental setups are used: a simulation framework leveraging Claude Opus 4.6 to generate phoneme-controlled English corpora (Limited vs. Full datasets matching VCTK statistics) to isolate confounding variables, and a real-speech cross-lingual transfer setting from English (VCTK, 44 hours, 108 speakers) to Japanese (JSUT basic5000, 10 hours, single speaker). In fine-tuning, the base 40-phoneme vocabulary is expanded with randomly initialized embeddings for target phonemes (e.g., plosives/front vowels in simulation, 20 Japanese-specific phonemes in cross-lingual), comparing performance against models trained entirely from scratch across training sizes ranging from 100 to 2,000 utterances.

## Results

Evaluated using wav2vec 2.0-based Target Phoneme Error Rate (Target PER) and UTMOS scores for naturalness. Across both the LLM-controlled simulation and English-to-Japanese real-speech settings, fine-tuned models achieved comparable or higher Target PER compared to scratch-trained models, requiring equal or more target data to reach the same PER. Conversely, fine-tuning consistently yielded superior UTMOS naturalness scores over scratch training across identical data budgets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers designing low-resource or cross-lingual text-to-speech systems, particularly when expanding phoneme inventories for under-resourced languages.

## Limitations

Evaluated on specific language pairs (English-to-Japanese cross-lingual) and synthetic simulations using a Conformer-FastSpeech2 architecture with naive phoneme embedding expansion.

## Related

- (link related pages by id as the wiki grows)
