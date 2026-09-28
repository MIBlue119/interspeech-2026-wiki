---
id: mcintosh26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/mcintosh26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/mcintosh26_interspeech.pdf
---

# Speech Playground: An Interactive Tool for Speech Analysis and Comparison

[PDF](https://www.isca-archive.org/interspeech_2026/mcintosh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mcintosh26_interspeech.html)

**TL;DR** — Speech Playground introduces an interactive web-based visualization and comparison tool that bridges traditional speech analysis with modern deep learning representations like self-supervised and articulatory features.

## Problem

Traditional speech analysis tools like Praat lack native support for modern deep-learning-based representations, forcing researchers to rely on cumbersome ad-hoc scripts, custom alignment code, and fragmented Python modules. This friction makes it difficult to visually inspect, validate, and compare advanced continuous, discrete, or variable-length speech features side-by-side. Providing a unified interactive interface streamlines representation validation, speech research, and computer-aided pronunciation training (CAPT) experiments.

## Method

The tool uses a decoupled architecture with a SvelteKit frontend (utilizing WaveSurfer.js and IndexedDB for persistence) and a FastAPI Python backend that lazily loads models for fast startup. The backend implements a uniform encoder interface mapping waveforms to continuous, discrete, or variable-length representations (such as SSL features, articulatory models, and ZeroSyl tokenizations). For utterance comparison in Diff mode, it provides similarity matrices, forced alignment via an integrated Montreal Forced Aligner service, and adjustable alignment methods including dynamic time warping via dtw-python and segment-based matching.

## Results

As a systems and tool paper, no quantitative evaluation or benchmark dataset metrics are reported. Instead, the utility of the tool is demonstrated through qualitative feature visualizations, including single-track analysis, TextGrid and phonological vector tier overlays, frame-wise distance tracking, and articulatory inversion feature comparisons. It successfully integrates multiple distinct feature types and alignment algorithms into a single interactive environment.

## Code

- https://github.com/stephenmac7/mfa-service

## Applications

Speech researchers, ML engineers, and educators can use this tool to inspect modern deep learning representations, debug speech models, validate feature consistency, and build computer-aided pronunciation training systems.

## Limitations

The text does not state any explicit limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
