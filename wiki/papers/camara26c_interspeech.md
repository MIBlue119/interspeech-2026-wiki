---
id: camara26c_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1386
pdf: https://www.isca-archive.org/interspeech_2026/camara26c_interspeech.pdf
---

# Acoustic Landmark Detector based on Conformer and HuBERT

[PDF](https://www.isca-archive.org/interspeech_2026/camara26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/camara26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1386)

**TL;DR** — This paper proposes a Conformer-based acoustic landmark detector trained with Gaussian soft labels, achieving an F1@20 ms of 0.77 using frozen HuBERT features.

## Problem

Automatic speech landmark detection traditionally relies on heuristic signal-processing rules or lacks precise temporal localization for sparse phonological events. Bridging raw acoustics to linguistic features is difficult because human annotations carry inherent temporal ambiguity that standard hard labels fail to capture.

## Method

The primary model uses a 12-layer Conformer encoder with d_model=256, 4 attention heads, and a feed-forward dimension of 1024, processing non-causal utterances to output per-frame logits for 8 landmark types plus background. A novel Gaussian soft-label strategy uses per-class temporal spreads (σ = 10–20 ms) to model human annotation variability and provide margins during training. The system evaluates four feature extractors (log-mel spectrograms, frozen wav2vec2-base, frozen HuBERT-base, and a mel+wav2vec2 hybrid) along with post-processing peak detection to extract discrete landmark instances.

## Results

Evaluated on a custom corpus of 1,839 annotated recordings (678 VCV syllables and 1,161 English words) split 90/10, frozen HuBERT features achieve the highest overall F1@20 ms of 0.77 (and F1@30 ms of 0.84), outperforming mel spectrograms (0.74) and wav2vec2 (0.70). Gaussian soft labels improve F1@20 ms by 7.0% absolute compared to hard labels, with the performance gap growing wider at larger tolerances (e.g., widening from 0.022 at 10 ms to 0.070 at 50 ms). Stops and fricatives are detected reliably (F1 > 0.80), whereas vowels and nasal releases remain challenging (F1 ≈ 0.55).

## Code

- https://mateocamara.github.io/acoustic-landmarks/

## Applications

Speech and machine learning engineers working on landmark-based lexical access, phonetic event detection, automatic speech recognition, and clinical speech assessment.

## Limitations

The evaluation relies on a relatively small corpus of 1,839 files across only three speakers with a single train/test split, and zero-shot transfer to continuous speech corpora like TIMIT shows limited cross-corpus generalization.

## Related

- (link related pages by id as the wiki grows)
