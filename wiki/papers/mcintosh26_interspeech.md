---
id: mcintosh26_interspeech
category: resources-evaluation
labels: [self-supervised]
institutions: ["University of Tokyo"]
code: https://github.com/stephenmac7/mfa-service
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/mcintosh26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/mcintosh26_interspeech.pdf
---

# Speech Playground: An Interactive Tool for Speech Analysis and Comparison

*Stephen McIntosh, Daisuke Saito, Nobuaki Minematsu*

[PDF](https://www.isca-archive.org/interspeech_2026/mcintosh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mcintosh26_interspeech.html)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`

**TL;DR** — Speech Playground is an interactive web-based visualization and comparison tool that bridges classical acoustic analysis (like Praat) with modern deep learning representations, featuring single-utterance analysis and multi-utterance diff modes.

## Key contributions

- Combines a SvelteKit frontend with a FastAPI Python backend to support continuous, discrete, and variable-length speech representations.
- Provides an Analysis mode for single-track visualization of waveforms, TextGrids, phonological features, and SSL-derived variable-length segments.
- Provides a Diff mode for utterance comparison via configurable distance metrics (e.g., dynamic time warping) and alignment settings.
- Supports integration with forced alignment services (like MFA) and local session persistence through IndexedDB.

## Problem

Traditional speech analysis tools like Praat lack native support for modern deep-learning representations such as self-supervised learning (SSL) embeddings, articulatory features, and discrete tokens. Consequently, researchers must rely on cumbersome Python scripts and ad-hoc visualization code to validate representations or inspect model-versus-learner discrepancies. This friction hinders exploratory speech research, representation debugging, and computer-aided pronunciation training (CAPT) development.

## Method

The tool uses a decoupled architecture: a SvelteKit frontend handles UI state, waveform rendering via WaveSurfer.js, and client-side persistence through IndexedDB, while a FastAPI backend lazily loads models to provide fast feature extraction and segmentation endpoints. The uniform speech-processing library encapsulates diverse encoders—ranging from standard SSL features to articulatory inversion and phonological vector tiers—allowing inputs to be transformed into continuous frames, discrete tokens, or variable-length segments (e.g., ZeroSyl). 

For utterance comparison in Diff mode, the backend calculates similarity matrices and performs alignments using dynamic time warping (DTW via dtw-python) for fixed-rate representations, alongside custom discrete and segment-based alignment methods supporting global and semi-global matching. These architectural choices decouple heavy model inference from client interactions, enabling smooth, real-time adjustments of encoders, distance measures, and alignment settings within a unified browser interface.

## Experimental setup

The paper presents an interactive software tool rather than a machine learning benchmark, so traditional datasets, training epochs, and hardware specifications are not evaluated. Notable implementation details include the use of SvelteKit for the web frontend, FastAPI for the backend server, WaveSurfer.js for audio rendering, IndexedDB for client storage, and dtw-python for dynamic time warping alignments.

## Results

Because this paper introduces a software tool rather than a novel predictive model, quantitative benchmark comparisons and baseline evaluations are absent. The utility of Speech Playground is instead demonstrated qualitatively through use cases such as side-by-side articulatory feature diff visualization and TextGrid-aligned phonological tier comparisons.

## Limitations

The tool relies heavily on browser-side performance for rendering waveforms and handling rich metadata, which may degrade with very long recordings. It depends on external Python packages and model loaders running on a backend server, meaning it is not a fully self-contained client-side application. Furthermore, comprehensive language coverage and cross-lingual alignment robustness are bound by the underlying encoders and forced alignment services integrated into the backend.

## Why read this

Speech and ML engineers building custom representations, SSL features, or CAPT systems should read this to discover an open-source, extensible visualization framework that replaces ad-hoc Jupyter notebooks for model inspection.

## Code

- https://github.com/stephenmac7/speech-playground

## Applications

Computer-aided pronunciation training (CAPT), speech representation debugging, and exploratory linguistic analysis.

## Institutions / 機構

University of Tokyo

## Related

- [SpeechBench: A Unified Speech Annotation and Analysis Tool](nan26_interspeech.md) — same problem · relatedness 2.2/3
- [TSExplorer: An interactive data annotation and exploration tool for time-series data](vaaras26_interspeech.md) — same problem · relatedness 2.1/3
- [NewAppVoice: Tools for Visualizing and Correcting Acoustic Measures](elmerich26_interspeech.md) — same problem · relatedness 1.9/3
- [From Rhythm Metrics to Latent Embeddings: Categorising English and Hindi Varieties in Northeast India](aheibam26_interspeech.md) — complementary · relatedness 1.9/3
- [Prosodic ABX: A Language-Agnostic Method for Measuring Prosodic Contrast in Speech Representations](sun26_interspeech.md) — complementary · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
