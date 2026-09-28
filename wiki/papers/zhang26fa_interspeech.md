---
id: zhang26fa_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2485
pdf: https://www.isca-archive.org/interspeech_2026/zhang26fa_interspeech.pdf
---

# MPA-KWS: Multi-Modal Phoneme-Level Alignment for Streaming Open-Vocabulary Keyword Spotting

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26fa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26fa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2485)

**TL;DR** — MPA-KWS is a streaming multi-modal open-vocabulary keyword spotting framework that leverages W-CTC forced alignment and phoneme-level contrastive learning, achieving a state-of-the-art equal error rate of 8.21% on the LibriPhrase-Hard benchmark under text-audio enrollment.

## Problem

Open-vocabulary keyword spotting must handle user-defined keywords without retraining, but discriminating acoustically confusable words remains difficult. While existing phoneme-level alignment methods improve discrimination, non-streaming strategies have high time complexity, and recent streaming CTC approaches are restricted to text-only enrollment and suffer from training-inference mismatch.

## Method

The architecture comprises a text feature extractor (G2P model, BiLSTM), a shared acoustic encoder (Conv1dNet with causal squeeze-and-excitation and a cross-attention keyword-bias module), a W-CTC forced alignment module for frame-to-phoneme mapping, a contrastive learning module, and a BiGRU-based verifier. The training recipe incorporates multi-task learning with asymmetric proxy loss (AsyP) for text-audio contrastive learning and symmetric InfoNCE for audio-audio contrastive learning. It also features a CTC beam-search data augmentation technique to dynamically mine hard negative samples using the model's own N-best hypotheses.

## Results

Evaluated on the LibriPhrase dataset (LibriPhrase-Hard and LibriPhrase-Easy splits), using Area Under the Curve (AUC) and Equal Error Rate (EER). Under text-only enrollment, MPA-KWS achieves 96.04% AUC and 9.53% EER on LibriPhrase-Hard, outperforming streaming W-CTC baselines. Under text-audio enrollment, it achieves 97.30% AUC and 8.21% EER on LibriPhrase-Hard, surpassing the prior PLCL method despite using a lightweight 4.0M parameter budget. Ablations confirm that replacing AsyP with InfoNCE, removing the bias module, dropping phoneme loss, or omitting data augmentation all lead to substantial EER increases (e.g., rising to 12.52% without data augmentation).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building on-device or streaming speech interfaces, virtual assistants, and customizable keyword spotters requiring open-vocabulary detection with low latency and high robustness to confusable words.

## Limitations

The framework requires 50% support-audio masking during training to simulate text-only enrollment scenarios, and relies on pre-computed G2P and beam-search decoding pipelines.

## Related

- (link related pages by id as the wiki grows)
