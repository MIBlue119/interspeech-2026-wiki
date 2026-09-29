---
id: vaaras26_interspeech
category: resources-evaluation
institutions: ["Tampere University", "University of Helsinki"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/vaaras26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/vaaras26_interspeech.pdf
---

# TSExplorer: An interactive data annotation and exploration tool for time-series data

*Einari Vaaras, Manu Airaksinen, Okko Räsänen*

[PDF](https://www.isca-archive.org/interspeech_2026/vaaras26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/vaaras26_interspeech.html)

**Category:** `resources-evaluation`

**TL;DR** — TSExplorer is a cross-platform Python GUI tool designed for interactive annotation, exploratory analysis, and feature visualization of high-dimensional time-series data like speech, video, and physiological signals. It integrates multi-modal widgets with dynamic 2D dimensionality reduction projections to bridge the gap between static summaries and granular data inspection.

## Key contributions

- Provides a flexible, cross-platform graphical user interface (Windows, Linux, macOS) built using PySide6 and PyQtGraph for interactive time-series exploration.
- Supports multiple simultaneous 2D dimensionality reduction views—including t-SNE, PCA, and UMAP—computed over arbitrary learned or hand-crafted feature representations.
- Integrates synchronized multi-modal widgets (audio playback, video, interactive waveform, and spectrogram views) linked directly to scatter-plot data points.
- Implements multiple algorithmic sample selection strategies, such as random, sequential ordered, and farthest-first traversal, alongside a queuing system for efficient dataset curation.

## Problem

Standard speech and time-series analysis pipelines often rely on static summary statistics, aggregate feature variances, or sequential, text-only workflows that completely discard the internal structure of high-dimensional feature spaces. When working with large-scale datasets, these traditional approaches make it exceptionally difficult to inspect individual samples, identify subtle outliers, or understand cross-modal relationships. Furthermore, comparing how data distributes across various representations (such as log-mel spectrograms versus self-supervised wav2vec 2.0 embeddings) lacks intuitive visual feedback tools, hindering effective data annotation, label refinement, and quality assurance.

## Method

TSExplorer follows a decoupled workflow where high-dimensional feature representations (e.g., log-mel spectrograms, MFCCs, fundamental frequency F0, or self-supervised embeddings) are extracted offline from raw time-series data like audio, video, or physiological signals. These features are then mapped into 2D visual spaces (2DVs) using dimensionality reduction techniques such as t-SNE, PCA, or UMAP, which can be computed offline or on-demand within the tool and cached to avoid redundant computation.

The application is architected around a customizable dashboard utilizing PySide6 for the interface framework, PyQtGraph for rendering responsive scatter plots, and VLC Media Player for native media playback. The GUI dynamically links a global 2D scatter visualization—where sample colors represent current class labels and highlights indicate active selections—with specialized inspection widgets including audio players, video streams, waveforms, and spectrograms.

To accommodate diverse curation workflows, the system provides both manual selection (point-and-click or queue enqueuing) and algorithmic sample selection algorithms (random, sequential ordered, and farthest-first traversal). The modular system design allows researchers to easily inject custom widgets, alternative 2D projection algorithms, or new algorithmic sampling strategies into the Python codebase.

## Experimental setup

The tool's performance and memory scaling were evaluated using standard datasets like RAVDESS. Implementation relies on Python, PySide6, PyQtGraph, and VLC. Hardware resource demands were profiled on a single CPU core operating at 3.9 GHz, evaluating memory footprints ranging from unladen idle states up to datasets containing 100,000 samples.

## Results

Profiling tests demonstrate that computing a t-SNE embedding for 100,000 160-dimensional samples takes roughly 8 minutes and consumes 1.8 GB of RAM on a single 3.9 GHz CPU core. 

For a speech dataset of 100,000 utterances (average duration 1.5 seconds) with pre-loaded audio alongside log-mel, MFCC, and F0 features plus their respective 2DV projections, total RAM utilization reaches 5.1 GB. However, keeping audio files on disk and streaming samples on-demand successfully drops RAM consumption below 0.4 GB, while the empty application idles at approximately 0.3 GB.

| Configuration / Scale | Memory Usage (RAM) | Compute Time | Hardware |
|---|---|---|---|
| Application Idle | ~0.3 GB | - | Single CPU core (3.9 GHz) |
| On-Demand Audio Loading (100k samples) | <0.4 GB | - | Single CPU core (3.9 GHz) |
| t-SNE Embedding Computation (100k samples, 160-dim) | ~1.8 GB | ~8 minutes | Single CPU core (3.9 GHz) |
| Fully Pre-Loaded Feature & Audio Corpus (100k samples) | ~5.1 GB | - | Single CPU core (3.9 GHz) |

## Limitations

Computing heavy manifold learning algorithms like t-SNE and UMAP on-the-fly for millions of samples can become computationally burdensome without pre-computation and caching. The current architecture relies heavily on offline feature extraction, meaning users must generate their own embeddings prior to visual inspection. Additionally, while the tool supports multi-modal streams such as audio, video, and general signals, massive scaling of uncompressed audio/video data directly in memory requires careful disk-backed streaming configurations to avoid out-of-memory bottlenecks.

## Why read this

Speech and ML engineers building custom datasets, cleaning noisy web-scraped corpora, or auditing self-supervised representation spaces will find this paper a practical blueprint for human-in-the-loop data curation. Readers will walk away understanding how to couple high-dimensional feature projections with synchronized multi-modal exploration widgets.

## Code

- https://github.com/SPEECHCOG/TSExplorer

## Applications

Interactive audio-visual dataset annotation, exploratory data analysis, outlier identification, data quality assurance, and comparative visualization of learned speech representations.

## Institutions / 機構

Tampere University, University of Helsinki

**Funding / 經費:** Research Council of Finland, Sigrid Juselius Foundation

## Related

- (link related pages by id as the wiki grows)
