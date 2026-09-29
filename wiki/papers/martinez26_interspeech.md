---
id: martinez26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
institutions: ["University of Pennsylvania"]
code: https://github.com/hjvm/findsylls
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-820
pdf: https://www.isca-archive.org/interspeech_2026/martinez26_interspeech.pdf
---

# findsylls: A Language‑Agnostic Toolkit for Syllable‑Level Speech Tokenization and Embedding

*Héctor Javier Vázquez Martínez*

[PDF](https://www.isca-archive.org/interspeech_2026/martinez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/martinez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-820)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — The paper introduces findsylls, a modular, language-agnostic open-source toolkit that unifies classical amplitude-envelope syllable detectors and neural syllabifiers (e.g., Sylber, VG-HuBERT) under a common interface for segmentation, embedding, and evaluation. Benchmarked across seven corpora in English, Spanish, and Kono, the toolkit demonstrates that recombining components (such as applying peakdetect to Sylber's cosine-similarity cue) achieves superior boundary F1 (69.9%) while producing efficient low-rate tokens (3.1–5.8 tok/s).

## Key contributions

- Introduces findsylls, a modular open-source toolkit unifying classical and neural syllabification pipelines under a single interface for segmentation, embedding, and evaluation.
- Provides a standardized, corpus-level evaluation pipeline for syllable nucleus, boundary, and span detection against time-aligned TextGrid annotations.
- Conducts a systematic evaluation across English, Spanish, and newly hand-annotated Kono data, analyzing segmentation accuracy, token rates, and computational cost.
- Uncovers cross-paradigm performance gains by mixing and matching components (e.g., using peakdetect with neural similarity cues to improve boundary F1).

## Problem

Syllable-level speech representations offer compact and linguistically meaningful units for spoken language modeling, reducing sequence lengths and FLOPs while preserving structure. However, prior research remains fragmented across disparate implementations, datasets, and evaluation protocols, making it difficult to reproduce results or separate representation quality from segmentation choices. Furthermore, existing end-to-end neural models inherit pretraining biases, and mismatches between pretraining languages and target domains can degrade segmentation accuracy by 20–30%.

## Method

findsylls organizes processing into three interoperable modules: envelope computation, frame-level feature extraction, and segmentation algorithms. The first module computes amplitude envelopes via RMS energy, low-pass filtered energy, Hilbert transforms, spectral band subtraction (SBS), and neurophysiologically inspired theta oscillators. The second module extracts frame-level representations from classical features (MFCCs, log-mels) or self-supervised encoders (HuBERT, VG-HuBERT, Sylber) without imposing fixed segmentations. The third module provides segmentation algorithms (Billauer's peakdetect, greedy cosine merging, optimized MinCut over self-similarity matrices, and CLS-attention thresholding). 

A key architectural innovation is exposing each feature-based cue as a pseudo-envelope (a scalar time series normalized and passed to peakdetect), decoupling native segmenters from their underlying representations. This enables cross-paradigm mixing, such as driving classical peak-picking with neural cosine similarity or self-similarity matrices. For downstream modeling, the toolkit aggregates features within each detected syllable using mean, max, median, or onset-nucleus-coda pooling to yield syllable-level embeddings.

## Experimental setup

Evaluated across seven corpora totaling over 100 hours of speech: LibriSpeech LS-100h (100h English adult read), WikiSpanish (25h Spanish adult read), TIMIT (5h English adult read), PHC (0.84h English child-directed), Ornat-Swingley (0.24h Spanish child-directed), Brent (0.11h English child-directed), and Kono (0.07h Central Mande fieldwork). Compares classical baselines (SBS, Theta) against neural configurations (Sylber, VG-HuBERT with featSSM+MinCut, VG-HuBERT with CLS-attention) and hybrid pairings using pseudo-envelope export. Metrics include Precision, Recall, and F1 at 50 ms tolerance for Nucleus (peak), Boundary (onset/offset), and Span (full interval), alongside token rate (tok/s audio) and inverse real-time factor (RTFx) measured on an Apple M1 Max.

## Results

End-to-end syllabifiers and hybrid recombinations achieve strong accuracy, though performance varies heavily across granularities. While classical SBS yields 91.2% nucleus F1, its span F1 drops to 37.1%. Standard Sylber with cosine-similarity configuration achieves top nucleus F1 (93.3%), whereas VG-HuBERT with featSSM and MinCut yields the best default boundary F1 (65.0%). Mixing components yields new state-of-the-art operating points: applying peakdetect to Sylber's cosine-similarity envelope boosts boundary F1 from 63.1% to 69.9% and span F1 from 45.7% to 47.0%. All methods compress speech into efficient rates of 3.1 to 5.8 tokens per second, with classical envelopes offering massive computational throughput (e.g., SBS at 684x RTFx) compared to heavy neural encoders.

| Systems / Conditions | Nucleus F1 | Boundary F1 | Span F1 | Tok/s | RTFx |
|---|---|---|---|---|---|
| Audio (raw) + SBS + peakdetect | 91.2 | 60.6 | 37.1 | 3.5 | 684x |
| Sylber + Cos. Sim. + Cos. thresh. | 93.3 | 63.1 | 45.7 | 3.4 | 36x |
| VG-HuBERT + featSSM + Mincut | 83.0 | 65.0 | 37.6 | 3.8 | 6x |
| Sylber + Cos. Sim. + peakdetect | 85.5 | 69.9 | 47.0 | 3.9 | 84x |
| VG-HuBERT + Cos. Sim. + peakdetect | 78.3 | 66.8 | 42.0 | 5.1 | 32x |

## Limitations

Some configurations remain sensitive to hyperparameter tuning and exact implementation details. Computational throughput metrics (RTFx) are tied to a single hardware/software platform (Apple M1 Max) and serve as relative indicators rather than absolute benchmarks. The current evaluation framework lacks tolerance regions for linguistically indeterminate boundaries (such as word edges and consonantal clusters), meaning some measured errors reflect genuine annotation ambiguity.

## Why read this

Speech and machine learning researchers working on low-resource spoken language modeling or unsupervised tokenization should read this paper to learn how to decouple representations from segmentation algorithms and leverage a unified benchmarking toolkit.

## Code

- https://github.com/hjvm/findsylls

## Applications

Unsupervised spoken language modeling, low-resource speech tokenization, and efficient long-context speech representation learning.

## Institutions / 機構

University of Pennsylvania

## Related

- (link related pages by id as the wiki grows)
