---
id: syllas26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2481
---

# Deterministic Prompting for Speaker-Stable Low-Resource Greek TTS

**TL;DR** — Swapping LLM-generated style prompts for deterministic ones, plus a small speaker-specific LoRA stage, fixes speaker drift in a fine-tuned multilingual TTS model and delivers near-human-consistency Greek TTS from limited data.

## Problem

Modern TTS approaches human quality for high-resource languages but degrades when clean speech data is scarce, as is the case for Modern Greek, which lacks the curated corpora behind state-of-the-art synthesis systems.

## Method

The authors build a data-curation recipe converting audiobook recordings into TTS-ready data via WhisperX alignment and filtering, then fine-tune Parler-TTS (880M) — a prompt-based multilingual model with transferable phonetic priors — for Greek; discovering that LLM-generated style prompts cause speaker drift at inference, they replace them with deterministic prompts and add a speaker-specific LoRA stage trained on 3.5 hours of single-speaker data (updating ~5% of parameters) to anchor identity.

## Results

The system achieves WER 10.7% (2.9 points above the ASR floor), MOS-I 4.00 (vs. 4.36 for human speech), and near-human speaker consistency (MOS-C 4.24 vs. 4.30 human), showing robust single-speaker Greek TTS is achievable with limited curated data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building high-quality TTS for low-resource languages by fine-tuning existing multilingual prompt-based TTS models with limited curated data.

## Related

- (link related pages by id as the wiki grows)
