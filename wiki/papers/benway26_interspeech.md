---
id: benway26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/benway26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/benway26_interspeech.pdf
---

# VoxKit: Desktop Phone Alignment and Goodness of Pronunciation Analysis

[PDF](https://www.isca-archive.org/interspeech_2026/benway26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/benway26_interspeech.html)

**TL;DR** — VoxKit is an open-source cross-platform desktop workbench that integrates forced alignment and goodness of pronunciation analysis into a single graphical pipeline for speech and clinical researchers.

## Problem

Segmental speech science and clinical research rely on forced alignment and goodness of pronunciation (GOP) analysis, but existing tools lack a unified desktop interface. This fragmentation creates a major technical barrier for researchers working with clinical populations who may lack command-line programming expertise.

## Method

VoxKit is built with Python 3.11 and PyQt6 using a modular architecture with three main abstractions: stackers for pipeline steps, alignment engines for backends, and analyzers for metadata and visualization. It wraps both the Montreal Forced Aligner (MFA) and a wav2vec2-based Wav2TextGrid engine for acoustic model adaptation and training. Background processing runs on QThread workers to keep the interface responsive while generating phone and word boundaries. Goodness of pronunciation is computed via a pretrained Wav2Vec2 acoustic model (960 hours of LibriSpeech) producing frame-level log phoneme posterior probabilities over a 42-phoneme inventory.

## Results

The application supports multi-format audio registration (WAV, FLAC, MP3, OGG, M4A) structured by speaker subdirectories. It offers built-in comparative visualization of phone/word boundaries emulating Praat TextGrids, providing corpus-level metrics such as boundary overlap rates and phoneme substitution patterns. GOP scores are exported into CSV files containing per-frame data and aggregated metrics by phoneme occurrence, utterance, speaker, or phoneme type.

## Code

- https://voxkit-web.vercel.app/

## Applications

Speech scientists, phoneticians, and clinical researchers analyzing disordered or typical speech corpora can use VoxKit to perform automated forced alignment and pronunciation scoring without writing code.

## Limitations

The text does not state any specific technical limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
