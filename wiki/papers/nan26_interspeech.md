---
id: nan26_interspeech
category: resources-evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/nan26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/nan26_interspeech.pdf
---

# SpeechBench: A Unified Speech Annotation and Analysis Tool

*Zheng Nan, Tharmakulasingam Sirojan, Mostafa Shahin, Tünde Szalay, Vidhyasaharan Sethu, Beena Ahmed*

[PDF](https://www.isca-archive.org/interspeech_2026/nan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nan26_interspeech.html)

**Category:** `resources-evaluation`

**TL;DR** — SpeechBench is an open, containerized speech annotation and analysis platform featuring a visual pipeline builder for chaining pretrained models (VAD, diarization, ASR) and interactive tier editing for human-in-the-loop refinement.

## Key contributions

- A graphical interface allowing non-technical users to visually construct and execute multi-step speech processing pre-annotation pipelines.
- Tight integration of model pre-annotations directly into interactive tier-editing workspaces alongside acoustic analysis tools like Praat-equivalent pitch and formant tracking.
- A fully containerized frontend-backend Docker architecture supporting flexible, offline private server deployment for sensitive data protection.

## Problem

Modern human-in-the-loop annotation workflows combine general-purpose speech models with human refinement to scale up domain-specific dataset creation, but existing tools fail to support this paradigm. Traditional acoustic analysis software like Praat lacks automated model integration, while crowd-sourcing platforms like Label Studio offer task allocation without model assistance or multi-step pipeline chaining. Furthermore, web-based tools hosted on public servers pose severe data privacy risks when handling sensitive recordings, and programmatic libraries exclude non-technical linguistic experts.

## Method

SpeechBench utilizes a decoupled frontend-backend architecture wrapped in Docker containers for straightforward local or private server execution. The web-based frontend is built using Vue 3, integrating WaveSurfer.js to handle interactive audio playback, waveform/spectrogram rendering, and multi-tier annotation editing. The Python-based backend handles data management and model execution, leveraging the Parselmouth library to provide Praat-equivalent acoustic analysis such as pitch, formants, and vowel triangle plotting.

The core architectural innovation is the visual pipeline framework. Users map out directed speech processing workflows by dragging and dropping modular components representing distinct tasks like VAD, speaker diarization, phoneme recognition, forced alignment, and ASR. The structured output of each sequential node is passed automatically down the pipeline, bridging raw audio inputs to human-in-the-loop refinement tiers without requiring any code.

## Experimental setup

The tool is demonstrated running locally on an offline laptop using pre-recorded conversational speech audio files. It integrates standard pretrained backend models for voice activity detection, speaker diarization, automated speech recognition, phoneme recognition, and forced alignment. System performance and scalability are achieved through containerization using Docker images for both the Vue 3 frontend and Python backend environments.

## Results

SpeechBench provides an end-to-end framework rather than a novel ML model, omitting standard benchmark evaluations, accuracy comparisons, or latency tables. Its value proposition is demonstrated qualitatively through its workflow capabilities, successfully enabling offline deployment, visual pipeline composition, and synchronized acoustic analysis alongside tier-based human correction.

## Limitations

The paper does not provide quantitative evaluations regarding annotation speedups, throughput scalability, or pipeline execution latency under heavy loads. Its out-of-the-box model flexibility depends on the pre-integrated model library provided in the backend, meaning unsupported specialized architectures require custom integration by developers.

## Why read this

Speechographers, corpus creators, and speech researchers wanting to deploy a private, customizable human-in-the-loop annotation tool combining automated speech pipelines with manual tier correction should read this to understand SpeechBench's architecture.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building domain-specific speech corpora, cleaning and transcribing sensitive clinical or children's speech datasets, and interactive phonetic analysis.

## Institutions / 機構

UNSW, University of Sydney

## Related

- (link related pages by id as the wiki grows)
