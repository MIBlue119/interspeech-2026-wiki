---
id: lee26_interspeech
category: speech-emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-80
pdf: https://www.isca-archive.org/interspeech_2026/lee26_interspeech.pdf
---

# AdaLTM: Adaptive Layer-wise Task Vector Merging for Categorical Speech Emotion Recognition with ASR Knowledge Integration

[PDF](https://www.isca-archive.org/interspeech_2026/lee26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-80)

**TL;DR** — The paper introduces AdaLTM, a parameter-efficient model-merging framework that integrates in-domain ASR knowledge into speech emotion recognition without gradient interference, achieving a 38.94% Unweighted Average Recall on MSP-Podcast.

## Problem

Integrating ASR knowledge into Speech Emotion Recognition (SER) typically relies on output-level fusion vulnerable to transcription errors or multi-task learning (MTL) that suffers from severe optimization conflicts. Specifically, ASR seeks emotion-invariant representations by suppressing paralinguistic variability, whereas SER depends on that exact variability. Joint backpropagation triggers gradient interference ("the seesaw effect"), degrading model performance.

## Method

The framework utilizes a frozen WavLM-Large backbone and algebraic task vectors derived by independently fine-tuning models on the target MSP-Podcast dataset for SER and in-domain ASR. Rather than joint optimization, the pre-trained weights are adapted layer-wise using learnable merging coefficients assigned to 25 distinct blocks (the frontend and 24 transformer layers). A learnable weighted sum aggregates hidden states across all transformer layers into an emotion prediction head, keeping backbone weights strictly frozen to prevent catastrophic forgetting. Only 0.46M parameters (0.14% of the total model size) are updated during training.

## Results

Evaluated on the 8-class MSP-Podcast corpus containing 89,752 training and 46,366 test samples, the proposed dual-vector adaptive merging strategy achieves a Unweighted Average Recall (UAR) of 38.94% and Macro-F1 of 35.20%. Compared to fully trainable MTL baselines that collapse to a UAR of 29.54% due to optimization conflicts, AdaLTM yields an absolute improvement of over 8.4%. Ablations confirm that in-domain ASR task vectors significantly outperform out-of-domain LibriSpeech alternatives, and that layer-wise adaptive merging outperforms static global merging variants.

## Code

- https://anonymous.4open.science/r/AdaLTM-62A2/

## Applications

Speech and machine learning engineers building speech emotion recognition systems can use this framework to leverage auxiliary linguistic context from ASR without destructive multi-task gradient conflicts.

## Limitations

The approach requires separate fine-tuning runs to extract individual task vectors prior to model merging.

## Related

- (link related pages by id as the wiki grows)
