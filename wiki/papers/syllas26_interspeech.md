---
id: syllas26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2481
pdf: https://www.isca-archive.org/interspeech_2026/syllas26_interspeech.pdf
---

# Deterministic Prompting for Speaker-Stable Low-Resource Greek TTS

[PDF](https://www.isca-archive.org/interspeech_2026/syllas26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/syllas26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2481)

**TL;DR** — This paper presents a two-stage adaptation recipe combining multilingual full fine-tuning, deterministic prompting, and speaker-specific LoRA to achieve stable low-resource Modern Greek text-to-speech with a 10.7% WER and near-human speaker consistency.

## Problem

Modern neural TTS architectures approach human quality in high-resource settings but degrade severely when clean, curated training data is scarce, an issue especially prominent for Modern Greek due to its rich morphology and limited clean corpora. Public multi-speaker datasets like Common Voice exhibit high acoustic noise, speaker variability, and transcription errors, leading fine-tuning procedures to drift into speaker-averaged, unstable voices. Additionally, standard prompt-conditioned TTS models rely on stochastic LLM-generated style prompts that induce generation-to-generation timbre instability.

## Method

The authors propose a data curation pipeline utilizing WhisperX forced alignment, duration constraints (1.5–10 s), and strict acoustic/transcription filtering on audiobook and Common Voice recordings to build standardized TTS clips and a clean 3.5 h single-speaker male dataset. They adopt Parler-TTS (an 880M-parameter multilingual codec language model with a frozen Flan-T5 text encoder and a 500M-parameter Transformer decoder) and execute a two-stage training recipe: first, full fine-tuning on a 23.0 h multi-speaker pool (Common Voice, CSS10, and audiobook data) using the AdamW optimizer for 50 epochs; second, a parameter-efficient LoRA stage targeting attention projection matrices (rank r=16, alpha=32, updating ~5% or 25M parameters) trained for 2 epochs on the 3.5 h single-speaker corpus. To fix prompt-induced variance, they replace stochastic LLM-generated style attributes with deterministic quantile-binned style descriptions.

## Results

Evaluated on a 50-utterance held-out Common Voice test set and 20 audiobook utterances, the proposed deterministic prompting combined with LoRA adaptation achieves a word error rate (WER) of 10.7% (only 2.9 percentage points above the 7.8% ASR floor) and a character error rate (CER) of 3.7%. In listening studies with 29 native Greek speakers, the deterministic LoRA system attains near-human speaker consistency with a MOS-C of 4.24 (compared to 4.30 for human speech), substantially outperforming the LLM-prompted LoRA baseline (MOS-C 3.56). Ablations reveal that while LLM prompts yield lower initial WER without LoRA, deterministic prompts are essential for stabilizing identity during the speaker-specific LoRA adaptation stage.

## Code

- https://github.com/gsyllas/greek-stable-tts/tree/main/scripts/data

## Applications

Speech engineers and developers building high-quality, voice-consistent, and controllable single-speaker TTS systems for low-resource languages using imperfect or limited audio data.

## Limitations

Absolute speaker similarity scores remain modest (SIM-S around 0.60), and residual errors like lexical-stress misplacement persist occasionally.

## Related

- (link related pages by id as the wiki grows)
