---
id: akhtar26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2704
pdf: https://www.isca-archive.org/interspeech_2026/akhtar26_interspeech.pdf
---

# From Signals to Patterns: Non-Invasive Tuberculosis Detection from Cough Audio using Bandit Weighted Hyperbolic Prototypes

[PDF](https://www.isca-archive.org/interspeech_2026/akhtar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/akhtar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2704)

**TL;DR** — COBALT fuses speech foundation models with spectral descriptors using codebook-aligned hyperbolic prototypes and bandit-style reliability weighting, establishing a new state-of-the-art on the CODA TB benchmark for cough-based tuberculosis screening.

## Problem

Cough-based tuberculosis screening (CBTS) offers a rapid, low-cost alternative to sputum testing, but single-stream models struggle with cross-device variability, environmental artifacts, and the challenge of capturing both fine-grained acoustic details and higher-level temporal patterns. While individual pretrained audio models and spectral descriptors have shown promise, systematic methods for fusing these heterogeneous representations remain largely unexplored. Addressing this gap is critical for building robust, deployable acoustic triage tools that rely on true pathological cues rather than spurious recording artifacts.

## Method

The COBALT framework extracts dual streams from heterogeneous encoders (e.g., PaSST, Whisper, WavLM, x-vector, MFCC, LFCC), adapts them via 1D CNNs, and tokenizes the sequences. These tokens are mapped into a Poincaré ball hyperbolic space and softly aligned via a shared hyperbolic prototype codebook using vector quantization. A multi-armed bandit mechanism learns reliability weights for each prototype to emphasize informative evidence while suppressing unstable artifacts. The reweighed evidence vectors and their agreement term are concatenated and fed into an MLP classifier, trained end-to-end with cross-entropy, vector-quantization losses, and entropy regularization.

## Results

Evaluated on the CODA TB DREAM Challenge benchmark of solicited cough audio from seven countries using subject-disjoint five-fold cross-validation. Individual representation experiments show PaSST outperforms Whisper, WavLM, and x-vector, while MFCC leads the spectral features. A Euclidean ablation (COBALT-E) demonstrates that structured geometric fusion consistently beats naive feature concatenation. The best-performing configuration fuses MFCC with PaSST, achieving top-tier accuracy, F1-score, and AUC compared to all baseline pairs and individual encoders.

## Code

- https://github.com/Helixometry/COBALT.git

## Applications

Engineers and healthcare researchers developing non-invasive, automated acoustic screening tools for respiratory diseases like tuberculosis.

## Limitations

The framework's performance depends on the quality of alignment between heterogeneous streams, and the approach is evaluated exclusively on solicited cough audio datasets.

## Related

- (link related pages by id as the wiki grows)
