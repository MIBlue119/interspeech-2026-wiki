---
id: adelson26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2041
pdf: https://www.isca-archive.org/interspeech_2026/adelson26_interspeech.pdf
---

# Beyond Deep Learning: Speech Segmentation and Phone Classification with Neural Assemblies

[PDF](https://www.isca-archive.org/interspeech_2026/adelson26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/adelson26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2041)

**TL;DR** — The paper introduces an Assembly Calculus (AC) speech processing framework using sparse neuronal assemblies, Hebbian plasticity, and winner-take-all competition, achieving phone/word boundary detection (F1=0.69/0.61) and phone/command recognition (47.5%/45.1% accuracy) without weight training or error backpropagation.

## Problem

Modern deep learning speech systems rely on massive datasets, heavy backpropagation training, and dense internal representations that complicate continual learning and resist compositional manipulation. Biological brains, by contrast, learn continuously from limited exposure under strict energy constraints using sparse, localized neural codes. The core challenge is bridging the gap between discrete, symbol-based Assembly Calculus and continuous, highly coarticulated real-world speech signals.

## Method

The framework combines three components: probabilistic mel-spectrogram binarization and Gaussian population-coded MFCCs for neural spike-pattern encoding; a fixed-weight refractory assembly hierarchy for temporal segmentation; and plastic, per-class recurrent areas optimized via local Hebbian and Artola-Bröcher-Singer (ABS) heterosynaptic LTD learning rules. The model operates without global gradient updates or backpropagation, relying instead on k-cap competitive activation and trajectory-based resonance scoring.

## Results

Evaluated on the TIMIT corpus for phone/word boundary detection and phone classification, as well as the Speech Commands dataset for keyword recognition. The system achieves phone boundary detection at F1=0.69 and word boundary detection at F1=0.61 without weight training. For classification tasks, it attains 47.5% accuracy on phone recognition and 45.1% on command recognition.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers exploring biologically inspired, energy-efficient, and continual-learning speech processing models that bypass traditional deep learning paradigms.

## Limitations

Accuracy remains below established deep learning baselines, and scaling to more complex vocabularies requires more expressive input representations or richer network structures.

## Related

- (link related pages by id as the wiki grows)
