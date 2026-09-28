---
id: jeong26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1549
pdf: https://www.isca-archive.org/interspeech_2026/jeong26_interspeech.pdf
---

# An Empirical Analysis of Task-Induced Encoder Bias in Fréchet Audio Distance

[PDF](https://www.isca-archive.org/interspeech_2026/jeong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1549)

**TL;DR** — This paper analyzes task-induced encoder biases in Fréchet Audio Distance (FAD) across six audio encoders, revealing a fundamental four-axis trade-off involving Recall, Precision, Semantic Alignment, and Structural Alignment.

## Problem

Fréchet Audio Distance (FAD) is the standard metric for text-to-audio evaluation, but its scores rely entirely on the embedding space of a pretrained encoder. Because an encoder's training task dictates which acoustic features are kept or discarded, FAD inherits systematic biases and blind spots that can diverge significantly from human perception. Understanding these limitations is critical since optimizing models against single-encoder FAD risks penalizing legitimate variations or missing critical degradations.

## Method

The study evaluates six encoders spanning five paradigms: AudioMAE (masked reconstruction), EnCodec (neural audio compression), Wav2Vec 2.0 (SSL contrastive), VGGish (audio classification), CLAP (cross-modal contrastive), and Whisper (ASR). Evaluation is decomposed into a four-axis framework (Recall, Precision, Semantic Alignment, and Structural Alignment) using controlled perturbations across LibriSpeech test-clean and ESC-50 datasets. A log-scale self-reference normalization is introduced to handle dynamic-range disparities spanning multiple orders of magnitude across encoders, ensuring fair cross-encoder comparison.

## Results

Controlled experiments reveal distinct performance profiles: AudioMAE leads in precision sensitivity (signal artifacts), Whisper dominates structural and recall dimensions but is blind to signal degradation, and VGGish maximizes semantic alignment while severely penalizing intra-class recall variation. EnCodec shows a massive 32x FAD jump between 6 kHz and 8 kHz due to its sub-8 kHz residual vector quantization capacity concentration. VGGish registers an Snorm of 0.36 at +1 semitone pitch shift—nine times higher than Whisper's 0.04—illustrating a strict recall trap caused by classification training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing or benchmarking text-to-audio generation models, audio synthesis systems, and automated evaluation metrics.

## Limitations

The analysis is scoped to six selected encoders and two datasets (LibriSpeech and ESC-50), and relies on Gaussian distribution assumptions inherent to standard FAD calculations.

## Related

- (link related pages by id as the wiki grows)
