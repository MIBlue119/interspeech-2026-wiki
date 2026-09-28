---
id: vaaras26_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/vaaras26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/vaaras26_interspeech.pdf
---

# TSExplorer: An interactive data annotation and exploration tool for time-series data

[PDF](https://www.isca-archive.org/interspeech_2026/vaaras26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/vaaras26_interspeech.html)

**TL;DR** — TSExplorer is an open-source, cross-platform graphical tool designed for interactive visualization, exploratory analysis, and human-in-the-loop annotation of high-dimensional time-series and speech datasets.

## Problem

Traditional time-series and speech data workflows either discard high-dimensional feature representations or rely on static summary statistics and sequential manual annotation, making it difficult to inspect individual samples or understand their structural relationships in the feature space. This limitation is particularly prominent in large-scale datasets and multimodal settings where comparing representations or spotting anomalies manually is inefficient.

## Method

The tool uses a Python-based architecture combining PySide6 for the GUI, PyQtGraph for rendering, and VLC Media Player for media playback, operating across Windows, Linux, and macOS. High-dimensional features like log-mel spectrograms, MFCCs, F0, or learned embeddings are computed offline, from which 2D visualizations are generated using t-SNE, PCA, or UMAP. The GUI provides fully customizable and extensible widgets for audio, video, scatter plots, waveforms, and spectrograms, alongside multiple algorithmic sample selection strategies including random, ordered, and farthest-first traversal.

## Results

The system demonstrates scalability to datasets of 100,000 samples, requiring approximately 1.8 GB of RAM and 8 minutes on a single CPU core to compute t-SNE embeddings for 160-dimensional features. RAM consumption stays below 0.4 GB when streaming audio files on demand from disk rather than keeping them entirely pre-loaded in memory. No predictive accuracy metrics or task-specific performance baselines are reported since the work presents a software tool rather than a predictive model.

## Code

- https://github.com/SPEECHCOG/TSExplorer

## Applications

Speech and machine learning engineers, researchers, and data annotators can use TSExplorer for exploratory data analysis, dataset annotation, outlier identification, label refinement, and cross-representation feature comparison.

## Limitations

Computing 2D projections online can become computationally demanding for large datasets, making pre-computation of embeddings recommended.

## Related

- (link related pages by id as the wiki grows)
