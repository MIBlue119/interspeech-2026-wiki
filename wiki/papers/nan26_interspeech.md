---
id: nan26_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/nan26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/nan26_interspeech.pdf
---

# SpeechBench: A Unified Speech Annotation and Analysis Tool

[PDF](https://www.isca-archive.org/interspeech_2026/nan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nan26_interspeech.html)

**TL;DR** — SpeechBench introduces an integrated, containerized speech annotation and analysis tool featuring a visual pipeline builder for model-assisted pre-annotation and human-in-the-loop refinement.

## Problem

Current speech annotation tools either function as isolated linguistic analyzers without model support, focus strictly on annotator management without model integration, or demand programming expertise to chain multi-step pipelines. Furthermore, many tools rely on public web servers that violate strict data privacy requirements needed for sensitive speech recordings.

## Method

SpeechBench uses a modular frontend-backend architecture containerized via Docker to support private local or server deployments. The Vue 3 and WaveSurfer.js frontend provides waveform/spectrogram visualization and tier editing, while the Python backend coordinates speech processing tasks using Parselmouth and pretrained models for voice activity detection, speaker diarization, ASR, phoneme recognition, and forced alignment. Users build multi-step processing pipelines via a drag-and-drop graphical canvas, chaining outputs from one task directly into structured inputs for subsequent steps without writing code.

## Results

The paper presents a system description and demonstration rather than quantitative benchmarks, showcasing an offline-capable workflow using pre-recorded conversational speech. It demonstrates end-to-end execution spanning user management, visual pipeline definition, automated pre-annotation, and tier-based human refinement combined with integrated acoustic analysis like pitch estimation and vowel triangles.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, linguists, and speech pathologists seeking a private, model-assisted annotation tool to build domain-specific speech corpora efficiently.

## Related

- (link related pages by id as the wiki grows)
