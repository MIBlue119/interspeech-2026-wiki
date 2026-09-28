---
id: rathore26_interspeech
category: multilingual
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-291
---

# SᴜTRA: Structurally-Unified Tokenization with Root Awareness

**TL;DR** — A morphology-aware tokenizer for Indic languages that stops splitting roots and affixes apart mid-word, improving both morphological alignment and downstream machine translation quality.

## Problem

Existing subword tokenizers optimize statistical compression but ignore morphological structure, causing "Morphological Shattering" — arbitrary splitting of roots and affixes — that is especially harmful for morphologically rich Indic languages built on complex orthographic syllables (aksharas).

## Method

SᴜTRA is a morphology-aware tokenization algorithm that preserves akshara indivisibility and penalizes merges crossing morphological boundaries, accompanied by a new morphological segmentation dataset for Hindi, Marathi, and Gujarati.

## Results

Reduces shattering with peak gains of +14.7% in morphological alignment (Boundary F1) and +34% in semantic recoverability for Hindi over BPE, translating to an average +8.08 chrF2 improvement in machine translation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Better tokenization for NLP and speech-text pipelines (ASR text normalization, translation, TTS text frontends) in morphologically rich Indic languages.

## Related

- (link related pages by id as the wiki grows)
