---
id: benway26_interspeech
category: applications-other
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/benway26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/benway26_interspeech.pdf
---

# VoxKit: Desktop Phone Alignment and Goodness of Pronunciation Analysis

*Nina R Benway, Beckett Frey, Tristan Mahr, Michael McAuliffe, Prad Kadambi, Visar Berisha, Katherine Hustad*

[PDF](https://www.isca-archive.org/interspeech_2026/benway26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/benway26_interspeech.html)

**Category:** `applications-other`

**TL;DR** — VoxKit is an extensible desktop workbench integrating forced alignment and goodness of pronunciation analysis into a single cross-platform application for speech and clinical researchers. It streamlines pipelines from raw audio to frame-level phoneme log-posterior scoring without requiring command-line programming.

## Key contributions

- Provides a unified, cross-platform desktop application (Python 3.11, PyQt6) connecting dataset registration, alignment engines, alignment comparison, and goodness of pronunciation scoring in one pipeline.
- Implements a modular architecture built around stackers, alignment engine wrappers, and custom analyzers to allow extension without modifying core code.
- Supports multi-engine alignment workflows wrapping both the Montreal Forced Aligner (MFA) with acoustic model adaptation and Wav2TextGrid (Wav2Vec2-based training).
- Generates automated Goodness of Pronunciation (GOP) scores using frame-level phoneme log-posterior probabilities derived from a Wav2Vec2 model pretrained on 960 hours of LibriSpeech.
- Offers built-in alignment comparison views and exports detailed per-frame and aggregated CSV outputs for downstream clinical and child speech analysis.

## Problem

Segmental speech science and clinical analyses require known phone boundaries determined through forced alignment, which maps orthographic text to phonological intervals using acoustic models. Downstream applications like Goodness of Pronunciation (GOP) then evaluate pronunciation quality by measuring acoustic compatibility with target phonemes using likelihoods or posteriors. However, existing tools lack integration, forcing researchers to stitch together disparate command-line scripts for alignment, model training, and GOP scoring. This fragmentation creates a steep adoption barrier, particularly for speech and clinical researchers working with specialized populations who lack command-line programming expertise.

## Method

VoxKit is built as a cross-platform desktop executable using Python 3.11 and PyQt6, featuring a graphical user interface divided into Pipeline, Datasets, and Models panels running background tasks via QThread workers to maintain UI responsiveness.

The application's architecture relies on three primary software abstractions: stackers for pipeline steps, alignment engine wrappers, and custom analyzers for metadata extraction and visualization. It includes two alignment engines out of the box: an MFA wrapper supporting pronunciation dictionaries (defaulting to english_us_arpa) and acoustic model adaptation, and a Wav2TextGrid wrapper that trains Wav2Vec2 acoustic models directly from registered datasets containing audio and plain-text .lab files.

Following alignment, VoxKit computes Acoustic Goodness scores using a discriminative Wav2Vec2 acoustic model pretrained on 960 hours of LibriSpeech data. This model evaluates frame-level phoneme classification over a 42-phoneme inventory at 10 ms resolution, outputting log posterior probabilities $P(\text{phoneme} \mid \text{acoustics})$ as the primary goodness metric. Results are exported via two CSV formats: per-frame scores with positional and phoneme-type features, and aggregated summaries by phoneme, utterance, speaker, or category.

## Experimental setup

VoxKit expects speech datasets organized in speaker subdirectories containing audio files (WAV, FLAC, MP3, OGG, M4A) and matching .lab transcription files, with optional Praat TextGrids for manual alignment import. The integrated Goodness of Pronunciation scoring module utilizes a Wav2Vec2 acoustic model pretrained on 960 hours of adult LibriSpeech speech data operating over a 42-phoneme inventory at a 10 ms resolution. The application is distributed as a standalone executable downloadable via its web interface.

## Results

As a systems and software paper presenting an extensible desktop workbench, VoxKit does not report benchmark accuracy comparisons or quantitative performance evaluations against competing software toolkits. Instead, its utility is demonstrated through its functional integration of dataset management, multi-engine forced alignment, interactive Praat-like TextGrid visualization, corpus-level boundary comparison metrics (overlap rate and substitution patterns), and structured CSV export of acoustic log-posterior goodness scores tailored for clinical and child speech investigations.

## Limitations

The current version relies on pre-existing acoustic models such as those from the Montreal Forced Aligner and LibriSpeech-pretrained Wav2Vec2 backbones, which may exhibit domain mismatch when applied to atypical clinical or child speech without proper adaptation data. Dataset organization strictly enforces speaker subdirectories with matching base-name .lab files, constraining ingestion workflows. Additionally, language coverage depends heavily on the underlying alignment engines and pronunciation dictionaries available to MFA and Wav2TextGrid.

## Why read this

Speech and clinical researchers looking for an out-of-the-box, graphical desktop environment to perform forced alignment and goodness of pronunciation analysis without writing custom scripts should read this. It provides a blueprint for extensible speech software architecture and eliminates command-line barriers for specialized corpora analysis.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech quality assessment, clinical speech analysis for pathological or child populations, and phonetic research requiring streamlined alignment and pronunciation scoring pipelines.

## Institutions / 機構

University of Maryland, College Park, University of Wisconsin - Madison, Arizona State University

**Funding / 經費:** National Institute on Deafness and Other Communication Disorders

## Related

- (link related pages by id as the wiki grows)
