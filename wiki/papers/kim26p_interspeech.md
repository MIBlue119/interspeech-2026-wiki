---
id: kim26p_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2055
pdf: https://www.isca-archive.org/interspeech_2026/kim26p_interspeech.pdf
---

# SALT: Selective Allophone-Level Tokenization for Korean Text-to-Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/kim26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2055)

**TL;DR** — The paper introduces Selective Allophone-Level Tokenization (SALT) for Korean text-to-speech, improving character error rate to 3.30% on a 12.75-hour dataset compared to 4.74% for raw graphemes.

## Problem

Korean orthography is morphophonemic, creating a mismatch between written text and actual pronunciation that simple grapheme-based implicit learning struggles to resolve, especially under low-resource conditions. While full phonemic or exhaustive allophonic transcriptions resolve some ambiguity, they introduce excessive vocabulary expansion or statistical imbalance that harms model training efficiency.

## Method

The authors propose SALT-N, which integrates a targeted subset of allophonic rules—specifically focusing on nasal codas—into the tokenization process to serve as an explicit linguistic inductive bias. The system builds on F5-TTS, a flow matching-based non-autoregressive architecture, using PEFT-TTS to fine-tune a pre-trained model on Korean data. The text input undergoes N2gk+ normalization, G2P conversion, and selective allophone tagging before waveform generation via Vocos. Training is conducted on two NVIDIA A100 GPUs using AdamW with a learning rate of 1e-5 across 150K steps.

## Results

Evaluated on the 12.75-hour KSS dataset, SALT-N achieved a character error rate (CER) of 3.30% and a word error rate (WER) of 11.24%, outperforming raw graphemes (CER 4.74%) and full phonemes (CER 3.74%). In an extremely low-resource 1-hour setting, SALT-N was uniquely capable of dropping below 10% CER (8.19%), whereas all baseline models suffered severe performance degradation. Vocabulary efficiency was quantified using the Gini coefficient and Rényi efficiency, showing that SALT-N successfully balances phonetic precision with token distribution balance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building high-quality or low-resource Korean text-to-speech synthesis systems.

## Related

- (link related pages by id as the wiki grows)
