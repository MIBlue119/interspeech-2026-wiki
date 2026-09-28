---
id: camara26c_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1386
---

# Acoustic Landmark Detector based on Conformer and HuBERT

**TL;DR** — A systematic study of Conformer-based acoustic landmark detectors finds that frozen HuBERT features with softly labeled temporal targets substantially improve detection of abrupt, linguistically meaningful speech events.

## Problem

Acoustic landmarks — abrupt changes tied to speech events — offer a linguistically grounded way to analyze speech, but there has been little systematic comparison of model designs for detecting them automatically.

## Method

The authors test 14 Conformer-based configurations spanning architecture, loss, label representation, feature extractor, and data conditions on 1,839 manually annotated utterances covering eight landmark types, introducing Gaussian soft labels with per-class temporal spread to model annotator uncertainty.

## Results

Soft labels improve F1@20ms by 7.0 points absolute over hard labels; frozen HuBERT features perform best without fine-tuning (F1@20ms=0.77); stops and fricatives are detected reliably (F1>0.80) while vowels remain harder (F1≈0.55); overall Landmark Error Rate is 13.8%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Linguistically grounded speech analysis tools for phonetics research, pronunciation assessment, and any pipeline that benefits from event-level rather than frame-level speech representations.

## Related

- (link related pages by id as the wiki grows)
