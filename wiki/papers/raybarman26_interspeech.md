---
id: raybarman26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3311
pdf: https://www.isca-archive.org/interspeech_2026/raybarman26_interspeech.pdf
---

# Towards a Phonology-Informed Evaluation of Multilingual TTS

[PDF](https://www.isca-archive.org/interspeech_2026/raybarman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/raybarman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3311)

**TL;DR** — The paper introduces a classifier-based diagnostic framework to audit multilingual TTS systems for phonological faithfulness, revealing that Meta's MMS TTS for Assamese systematically misrealizes [+ATR] mid vowels as [-ATR] in one-third of tokens.

## Problem

Standard TTS evaluation metrics like MOS and WER focus on perceived naturalness and intelligibility, failing to detect whether synthetic speech preserves subtle, grammar-conditioned phonological sound contrasts. In low-resource or underrepresented languages, a model can sound natural while completely neutralizing crucial linguistic patterns such as vowel harmony. This hides systematic errors that matter for authentic representation, educational tools, and linguistic diversity.

## Method

The framework learns an acoustic-to-phonology mapping from a human benchmark corpus (14 native Assamese speakers, 8,125 vowel tokens) and applies it cross-domain to synthesized speech (Meta's MMS TTS, 114 target words). Features include Lobanov-normalized first three formants (F1, F2, F3), first formant bandwidth (B1), duration, vowel height, and backness. Two models are tested for vowel-level ATR classification: a logistic regression (LR) and a random forest (RF) classifier. A phonological faithfulness audit then measures mismatch rates and error directions (overgeneration vs. underproduction) at the vowel and word levels.

## Results

In cross-domain evaluation, the LR classifier shows stable performance (H→H accuracy 81.7%, H→TTS 83.0%), whereas RF drops from 90.5% (H→H) to 74.7% (H→TTS). The faithfulness audit reveals a striking 7:1 underproduction-to-overgeneration bias in TTS for [+ATR] vowels (gold [+ATR] predicted as [-ATR] at 14.2%, compared to 2.1% the other way around), an asymmetry absent in human speech. Word-level harmony classification using acoustic and predicted ATR sequence features (A+B pred) achieves 62.8% to 69.3% accuracy, outperforming gold-label feature sets on cross-domain transfer because the TTS acoustic output diverges from intended phonology.

## Code

- https://github.com/snehagitrep/TTSEvalVH_interspeech2026.git

## Applications

Speech and ML engineers building multilingual or low-resource TTS systems can use this evaluation pipeline to diagnose phonological flaws, improve accent authenticity, and verify grammar-conditioned sound contrasts.

## Limitations

The study evaluates a single TTS system (Meta MMS TTS) on a single phonological phenomenon (Assamese ATR vowel harmony) using a small, class-imbalanced TTS dataset.

## Related

- (link related pages by id as the wiki grows)
