---
id: shah26_interspeech
category: singing-voice
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2573
---

# SingFox: A Multi-Lingual Singfake Detection Corpus

**TL;DR** — A 126-hour, 20-language, six-track dataset of real and fake singing voices, built for testing both singing-deepfake detection and source tracing, on which cross-dataset models top out at 77.84% accuracy.

## Problem

Robust evaluation of singing deepfake ("singfake") detection and source-tracing systems has lacked a comprehensive, large-scale, multilingual dataset covering diverse languages, genres, and generation methods.

## Method

The authors introduce SingFox, a dataset spanning six tracks (T1-T6) targeting different forms of novelty — language diversity (global and Indic), genre-specific music, and alternative fake generation methods — comprising over 113,802 audio clips across 20 languages (126.32+ hours) and 1,150 singers, designed to imitate real-life conditions for both the singfake detection and source verification tasks.

## Results

Cross-testing models trained on various datasets achieves a highest accuracy of 77.84%, indicating substantial room for improvement in cross-domain singing-deepfake detection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Benchmark resource for developing and stress-testing singing-voice deepfake detectors and source-tracing systems for the music industry.

## Related

- (link related pages by id as the wiki grows)
