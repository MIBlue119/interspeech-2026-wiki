---
id: halpern26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-946
pdf: https://www.isca-archive.org/interspeech_2026/halpern26_interspeech.pdf
---

# PathBench: Speech Intelligibility Benchmark for Automatic Pathological Speech Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/halpern26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/halpern26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-946)

**TL;DR** — The paper introduces PathBench, a unified evaluation benchmark for automatic pathological speech intelligibility assessment across public datasets, and proposes Dual-ASR Articulatory Precision (DArtP) as a strong reference-free method.

## Problem

Research on automatic pathological speech intelligibility assessment is fragmented due to heavy reliance on private datasets, inconsistent evaluation protocols, and varying target metrics like severity or articulation. This lack of standardization makes it nearly impossible to independently compare methods, verify whether performance differences stem from algorithms or data variations, or assess generalizability across languages and conditions.

## Method

PathBench evaluates reference-free, reference-text, and reference-audio methods across six public datasets using three standardized protocols: Matched Content (identical linguistic stimuli), Extended (all available utterances), and Full. To address the need for explainable assessment without transcriptions, the authors propose Dual-ASR Articulatory Precision (DArtP), which combines a semantic model (wav2vec2-large-xlsr-53) and an N-gram language model to generate a correction hypothesis via beam search, and a phonetic model (wav2vec2-xlsr-53-espeak-cv-ft with an espeak G2P backend) to score phonetic alignment via CTC force-decoding. The framework resamples all audio to 16 kHz and avoids energy-based VAD in favor of trimming silence via ASR forced alignment.

## Results

Evaluated on six datasets (UASpeech, NeuroVoz, EasyCall, COPAS, TORGO, and YouTube) measuring speaker-level Pearson Correlation Coefficients against human subjective ratings. Reference-text method ArtP and reference-audio method NAD tied for highest overall performance with average correlations of r = 0.71, while the proposed reference-free DArtP achieved the top reference-free average correlation of r = 0.66. Confounder analysis showed that patient age and WADA SNR generally exhibited weak correlations with scores (|r| < 0.4 and |r| < 0.3 respectively), confirming minimal systematic bias except for isolated exceptions like NeuroVoz age and COPAS-Word SNR. A Wilcoxon Signed-Rank Test across 96 pairs revealed that the Extended protocol yielded significantly higher correlations than the Matched Content protocol.

## Code

- https://github.com/karkirowle/pathbench

## Applications

Speech and machine learning engineers developing automated clinical tools for monitoring speech disorders, neurodegenerative conditions, or rehabilitation progress.

## Limitations

The benchmark is currently restricted to methods that do not require labeled intelligibility data for training, and certain reference models (like ArtP) require language-specific fine-tuning or adaptation for optimal performance.

## Related

- (link related pages by id as the wiki grows)
