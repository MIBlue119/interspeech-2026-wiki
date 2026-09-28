---
id: khan26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3008
pdf: https://www.isca-archive.org/interspeech_2026/khan26_interspeech.pdf
---

# Dual-Branch Gated Fusion for Open-Set Audio Deepfake Source Tracing

[PDF](https://www.isca-archive.org/interspeech_2026/khan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3008)

**TL;DR** — A dual-branch gated fusion framework pairs a frozen XLSR-53 SSL encoder with a new 66-dimensional handcrafted CORES descriptor, achieving 97.6% ID accuracy, 4.9% EERc, and an 83.5% relative reduction in FPR95 on the MLAAD open-set audio deepfake source tracing benchmark.

## Problem

Closed-set audio deepfake source tracing models fail to reject unseen synthesizers and produce overconfident predictions, while fine-tuning large self-supervised learning (SSL) representations end-to-end causes them to overcommit to the training distribution. The core conflict between in-distribution classification and out-of-distribution (OOD) detection cannot be solved by naive feature concatenation because the high-dimensional SSL representation numerically dominates the smaller handcrafted descriptor.

## Method

The framework utilizes two frozen/fixed feature extractors: a mean-pooled 1024-d XLSR-53 encoder pretrained on 56,000 hours of multilingual speech, and a 66-dimensional CORES (Cepstral, Oscillatory, Rhythmic, Energy, and Spectral) descriptor spanning 39 MFCC derivatives, 14 chroma features, 1-d zero-crossing rate, 1-d RMS energy, and 11 spectral metrics. Each branch projects into a shared 256-d space through two fully-connected layers, which are then adaptively weighted via an input-conditioned two-layer gating network using softmax. Training combines cross-entropy loss with label smoothing (epsilon=0.15), an energy margin loss using Dev-split OOD auxiliary data, and a gate diversity loss maximizing KL divergence between ID and OOD batch-mean gate distributions, alongside a gate entropy term. The model uses a 0.9M parameter footprint (excluding the frozen XLSR-53 encoder) and is trained for 150 epochs using AdamW with a gate freeze for the first 10 epochs.

## Results

Evaluated on the MLAAD benchmark containing 24 seen and 43 unseen (OOD) synthesis systems across 26 languages, the system achieves 97.65% ID accuracy, 10.4% FPR95, and 4.98% EERc using the Softmax Energy (SME) post-hoc scorer. On OOD Eval, it attains 94.3% OOD accuracy and 7.6% EER, outperforming an unaugmented reference ResNet34 baseline and reducing FPR95 by 83.5% relative to the 2025 baseline while using 350x fewer parameters than W2V2-AASIST. Ablations show that SSL-alone yields 96.2% FPR95, handcrafted-alone drops ID accuracy to 78.3%, and naive concatenation yields 82.3% FPR95, confirming the necessity of the adaptive gating mechanism.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Digital forensics and platform trust-and-safety engineers needing to trace audio deepfakes to their originating TTS or voice conversion pipelines while reliably rejecting unseen generators.

## Limitations

Adding highly diverse auxiliary OOD data such as ASVspoof5 degraded performance due to gate collapse caused by excessive source diversity exceeding the regularization capacity of the diversity loss.

## Related

- (link related pages by id as the wiki grows)
